import type { Badge } from '@/types';

export const BADGE_CATALOG: Badge[] = [
  // Milestones
  { id: 'first_sip', name: 'First Sip', emoji: '☕', description: 'Log your first check-in', category: 'milestone' },
  { id: 'double_digits', name: 'Double Digits', emoji: '🔟', description: 'Log 10 check-ins', category: 'milestone' },
  { id: 'connoisseur', name: 'Connoisseur', emoji: '🏆', description: 'Log 50 check-ins', category: 'milestone' },
  { id: 'centurion', name: 'Centurion', emoji: '💯', description: 'Log 100 check-ins', category: 'milestone' },
  // Variety
  { id: 'bean_explorer', name: 'Bean Explorer', emoji: '🌱', description: 'Try 3 different bean types', category: 'variety' },
  { id: 'brew_master', name: 'Brew Master', emoji: '⚗️', description: 'Try 5 different brew methods', category: 'variety' },
  { id: 'roaster_tour', name: 'Roaster Tour', emoji: '🗺️', description: 'Try 5 different roasters', category: 'variety' },
  { id: 'roaster_world_tour', name: 'World Tour', emoji: '🌍', description: 'Try 10 different roasters', category: 'variety' },
  // Streaks
  { id: 'streak_3', name: '3-Day Streak', emoji: '🔥', description: 'Check in 3 days in a row', category: 'streak' },
  { id: 'streak_7', name: 'Week Warrior', emoji: '⚡', description: 'Check in 7 days in a row', category: 'streak' },
  { id: 'weekly_regular', name: 'Weekly Regular', emoji: '📅', description: 'Check in every week for 4 weeks', category: 'streak' },
  // Location
  { id: 'cafe_hopper', name: 'Cafe Hopper', emoji: '🚶', description: 'Visit 3 different cafes', category: 'location' },
  { id: 'neighborhood_explorer', name: 'Explorer', emoji: '🧭', description: 'Visit 5 different cafes', category: 'location' },
  { id: 'local_regular', name: 'Local Regular', emoji: '🏠', description: 'Visit the same cafe 5 times', category: 'location' },
];

export function getBadgeById(id: string): Badge | undefined {
  return BADGE_CATALOG.find(b => b.id === id);
}
