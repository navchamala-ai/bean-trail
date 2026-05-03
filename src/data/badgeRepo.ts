import { db } from './migrations';
import { BADGE_CATALOG, getBadgeById } from '@/constants/badges';
import type { CheckIn, EarnedBadge } from '@/types';

type BadgeRow = { badge_id: string; user_id: string; earned_at: string };

function computeEarnedBadgeIds(checkIns: CheckIn[]): string[] {
  const earned: string[] = [];
  const total = checkIns.length;
  const beanTypes = new Set(checkIns.map(c => c.beanType));
  const brewMethods = new Set(checkIns.map(c => c.brewMethod));
  const roasters = new Set(checkIns.map(c => c.roaster));
  const venues = checkIns.map(c => c.venueName).filter(v => v.trim() !== '');
  const uniqueVenues = new Set(venues);
  const venueCounts: Record<string, number> = {};
  for (const v of venues) { venueCounts[v] = (venueCounts[v] ?? 0) + 1; }
  const maxVenueCount = Math.max(0, ...Object.values(venueCounts));

  if (total >= 1) earned.push('first_sip');
  if (total >= 10) earned.push('double_digits');
  if (total >= 50) earned.push('connoisseur');
  if (total >= 100) earned.push('centurion');

  if (beanTypes.size >= 3) earned.push('bean_explorer');
  if (brewMethods.size >= 5) earned.push('brew_master');
  if (roasters.size >= 5) earned.push('roaster_tour');
  if (roasters.size >= 10) earned.push('roaster_world_tour');

  if (uniqueVenues.size >= 3) earned.push('cafe_hopper');
  if (uniqueVenues.size >= 5) earned.push('neighborhood_explorer');
  if (maxVenueCount >= 5) earned.push('local_regular');

  const streakResult = computeLongestStreak(checkIns);
  if (streakResult.longest >= 3) earned.push('streak_3');
  if (streakResult.longest >= 7) earned.push('streak_7');

  const weeklyStreak = computeWeeklyStreak(checkIns);
  if (weeklyStreak >= 4) earned.push('weekly_regular');

  return earned;
}

function toDateString(iso: string): string {
  return iso.slice(0, 10);
}

function computeLongestStreak(checkIns: CheckIn[]): { longest: number } {
  if (checkIns.length === 0) return { longest: 0 };
  const days = [...new Set(checkIns.map(c => toDateString(c.createdAt)))].sort();
  let longest = 1;
  let current = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const curr = new Date(days[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffMs / 86400000);
    if (diffDays === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return { longest };
}

function getISOWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNum}`;
}

function computeWeeklyStreak(checkIns: CheckIn[]): number {
  if (checkIns.length === 0) return 0;
  const weeks = [...new Set(checkIns.map(c => getISOWeek(new Date(c.createdAt))))].sort();
  let longest = 1;
  let current = 1;
  for (let i = 1; i < weeks.length; i++) {
    const [y1, w1] = weeks[i - 1].split('-W').map(Number);
    const [y2, w2] = weeks[i].split('-W').map(Number);
    const totalWeeks1 = y1 * 53 + w1;
    const totalWeeks2 = y2 * 53 + w2;
    if (totalWeeks2 - totalWeeks1 === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

export function evaluateAndPersist(checkIns: CheckIn[]): void {
  const earnedIds = computeEarnedBadgeIds(checkIns);
  const now = new Date().toISOString();
  for (const badgeId of earnedIds) {
    try {
      db.runSync(
        `INSERT OR IGNORE INTO user_badges (badge_id, user_id, earned_at) VALUES (?, 'me', ?)`,
        [badgeId, now]
      );
    } catch { /* ignore */ }
  }
}

export function getEarnedBadges(): EarnedBadge[] {
  const rows = db.getAllSync<BadgeRow>(
    "SELECT * FROM user_badges WHERE user_id = 'me' ORDER BY earned_at DESC"
  );
  return rows.flatMap(row => {
    const badge = getBadgeById(row.badge_id);
    if (!badge) return [];
    return [{ badge, earnedAt: row.earned_at }];
  });
}

export function getRecentBadgeEvents(since?: string): EarnedBadge[] {
  const cutoff = since ?? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const rows = db.getAllSync<BadgeRow>(
    "SELECT * FROM user_badges WHERE user_id = 'me' AND earned_at >= ? ORDER BY earned_at DESC",
    [cutoff]
  );
  return rows.flatMap(row => {
    const badge = getBadgeById(row.badge_id);
    if (!badge) return [];
    return [{ badge, earnedAt: row.earned_at }];
  });
}

export { BADGE_CATALOG };
