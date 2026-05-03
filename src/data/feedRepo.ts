import type { FeedItem } from '@/types';
import { getAllCheckIns } from './checkInRepo';
import { getRecentBadgeEvents } from './badgeRepo';
import { getFriendCheckIns, getFriendBadgeEvents } from './friendRepo';
import { getUserById } from './userRepo';
import { getLikeState, initLikes } from './likeRepo';
import { getBadgeById } from '@/constants/badges';

function seedLikes(): void {
  const friendCheckIns = getFriendCheckIns();
  const likeSeed = friendCheckIns.map((c, i) => ({
    userId: c.userId,
    checkInId: c.id,
    count: [3, 7, 5, 2, 1, 12, 8, 4][i % 8],
  }));
  initLikes(likeSeed);
}

let likesSeeded = false;

export function getFeed(): FeedItem[] {
  if (!likesSeeded) {
    seedLikes();
    likesSeeded = false; // allow re-seed for refresh; idempotent via initLikes guard
  }
  seedLikes();
  likesSeeded = true;

  const items: FeedItem[] = [];

  // Own check-ins
  const myCheckIns = getAllCheckIns();
  const me = getUserById('me');
  for (const checkIn of myCheckIns) {
    const myLike = getLikeState('me', checkIn.id);
    const likeCount = myLike.count;
    const likedByMe = myLike.likedByMe;
    items.push({ kind: 'checkin', checkIn, user: me, likeCount, likedByMe });
  }

  // Friend check-ins
  const friendCheckIns = getFriendCheckIns();
  for (const checkIn of friendCheckIns) {
    const user = getUserById(checkIn.userId);
    const likeState = getLikeState(checkIn.userId, checkIn.id);
    const likeCount = likeState.count;
    const likedByMe = likeState.likedByMe;
    items.push({ kind: 'checkin', checkIn, user, likeCount, likedByMe });
  }

  // Own badge events
  const myBadgeEvents = getRecentBadgeEvents();
  for (const { badge, earnedAt } of myBadgeEvents) {
    items.push({ kind: 'badge', user: me, badge, earnedAt });
  }

  // Friend badge events
  for (const event of getFriendBadgeEvents()) {
    const badge = getBadgeById(event.badgeId);
    if (!badge) continue;
    const user = getUserById(event.userId);
    items.push({ kind: 'badge', user, badge, earnedAt: event.earnedAt });
  }

  items.sort((a, b) => {
    const aTime = a.kind === 'checkin' ? a.checkIn.createdAt : a.earnedAt;
    const bTime = b.kind === 'checkin' ? b.checkIn.createdAt : b.earnedAt;
    return bTime.localeCompare(aTime);
  });

  return items;
}
