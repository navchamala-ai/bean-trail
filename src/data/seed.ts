let seeded = false;

export function ensureSeeded(): void {
  if (seeded) return;
  seeded = true;
  // Seed triggers happen lazily through in-memory repos (notificationRepo, friendRepo).
  // No DB writes needed here — those repos initialize at import time.
}
