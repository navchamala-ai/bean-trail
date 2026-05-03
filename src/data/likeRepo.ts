type LikeState = { count: number; likedByMe: boolean };

const likeStore = new Map<string, LikeState>();

function key(userId: string, checkInId: number): string {
  return `${userId}:${checkInId}`;
}

export function initLikes(entries: { userId: string; checkInId: number; count: number }[]): void {
  for (const entry of entries) {
    const k = key(entry.userId, entry.checkInId);
    if (!likeStore.has(k)) {
      likeStore.set(k, { count: entry.count, likedByMe: false });
    }
  }
}

export function getLikeState(userId: string, checkInId: number): LikeState {
  return likeStore.get(key(userId, checkInId)) ?? { count: 0, likedByMe: false };
}

export function toggleLike(userId: string, checkInId: number): LikeState {
  const k = key(userId, checkInId);
  const current = likeStore.get(k) ?? { count: 0, likedByMe: false };
  const next: LikeState = current.likedByMe
    ? { count: Math.max(0, current.count - 1), likedByMe: false }
    : { count: current.count + 1, likedByMe: true };
  likeStore.set(k, next);
  return next;
}
