import { db } from './migrations';
import type { CheckIn, NewCheckIn } from '@/types';

type CheckInRow = {
  id: number;
  user_id: string;
  coffee_name: string;
  bean_type: string;
  roaster: string;
  brew_method: string;
  rating: number;
  tasting_notes: string;
  flavor_notes: string;
  photo_uri: string | null;
  venue_name: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};

function rowToCheckIn(row: CheckInRow): CheckIn {
  return {
    id: row.id,
    userId: row.user_id,
    coffeeName: row.coffee_name,
    beanType: row.bean_type,
    roaster: row.roaster,
    brewMethod: row.brew_method,
    rating: row.rating,
    tastingNotes: row.tasting_notes,
    flavorNotes: safeParseJson(row.flavor_notes),
    photoUri: row.photo_uri,
    venueName: row.venue_name,
    latitude: row.latitude,
    longitude: row.longitude,
    createdAt: row.created_at,
  };
}

function safeParseJson(value: string | null): string[] {
  try {
    const parsed = JSON.parse(value ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getAllCheckIns(): CheckIn[] {
  const rows = db.getAllSync<CheckInRow>(
    "SELECT * FROM checkins WHERE user_id = 'me' ORDER BY created_at DESC"
  );
  return rows.map(rowToCheckIn);
}

export function getCheckInById(id: number): CheckIn | null {
  const row = db.getFirstSync<CheckInRow>(
    'SELECT * FROM checkins WHERE id = ?',
    [id]
  );
  return row ? rowToCheckIn(row) : null;
}

export function insertCheckIn(checkIn: NewCheckIn): number {
  const result = db.runSync(
    `INSERT INTO checkins
      (user_id, coffee_name, bean_type, roaster, brew_method, rating, tasting_notes, flavor_notes, photo_uri, venue_name, latitude, longitude, created_at)
     VALUES ('me', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      checkIn.coffeeName,
      checkIn.beanType,
      checkIn.roaster,
      checkIn.brewMethod,
      checkIn.rating,
      checkIn.tastingNotes,
      JSON.stringify(checkIn.flavorNotes),
      checkIn.photoUri ?? null,
      checkIn.venueName,
      checkIn.latitude ?? null,
      checkIn.longitude ?? null,
      new Date().toISOString(),
    ]
  );
  return result.lastInsertRowId;
}

export function deleteCheckIn(id: number): void {
  db.runSync('DELETE FROM checkins WHERE id = ?', [id]);
}

export interface ProfileStats {
  totalCheckIns: number;
  avgRating: number;
  topRoasters: { roaster: string; count: number }[];
  topBrewMethods: { brewMethod: string; count: number }[];
}

export function getProfileStats(): ProfileStats {
  const totalRow = db.getFirstSync<{ count: number }>(
    "SELECT COUNT(*) as count FROM checkins WHERE user_id = 'me'"
  );
  const avgRow = db.getFirstSync<{ avg: number | null }>(
    "SELECT AVG(rating) as avg FROM checkins WHERE user_id = 'me'"
  );
  const roasterRows = db.getAllSync<{ roaster: string; count: number }>(
    "SELECT roaster, COUNT(*) as count FROM checkins WHERE user_id = 'me' GROUP BY roaster ORDER BY count DESC LIMIT 5"
  );
  const brewRows = db.getAllSync<{ brew_method: string; count: number }>(
    "SELECT brew_method, COUNT(*) as count FROM checkins WHERE user_id = 'me' GROUP BY brew_method ORDER BY count DESC LIMIT 5"
  );

  return {
    totalCheckIns: totalRow?.count ?? 0,
    avgRating: avgRow?.avg ?? 0,
    topRoasters: roasterRows.map(r => ({ roaster: r.roaster, count: r.count })),
    topBrewMethods: brewRows.map(r => ({ brewMethod: r.brew_method, count: r.count })),
  };
}
