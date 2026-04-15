import * as SQLite from 'expo-sqlite';
import type { CheckIn, NewCheckIn } from '@/types';

const db = SQLite.openDatabaseSync('beantrail.db');

export function initDatabase(): void {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      coffee_name TEXT NOT NULL,
      bean_type TEXT NOT NULL,
      roaster TEXT NOT NULL,
      brew_method TEXT NOT NULL,
      rating INTEGER NOT NULL,
      tasting_notes TEXT DEFAULT '',
      venue_name TEXT DEFAULT '',
      latitude REAL,
      longitude REAL,
      created_at TEXT NOT NULL
    );
  `);
}

type CheckInRow = {
  id: number;
  coffee_name: string;
  bean_type: string;
  roaster: string;
  brew_method: string;
  rating: number;
  tasting_notes: string;
  venue_name: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};

function rowToCheckIn(row: CheckInRow): CheckIn {
  return {
    id: row.id,
    coffeeName: row.coffee_name,
    beanType: row.bean_type,
    roaster: row.roaster,
    brewMethod: row.brew_method,
    rating: row.rating,
    tastingNotes: row.tasting_notes,
    venueName: row.venue_name,
    latitude: row.latitude,
    longitude: row.longitude,
    createdAt: row.created_at,
  };
}

export function getAllCheckIns(): CheckIn[] {
  const rows = db.getAllSync<CheckInRow>(
    'SELECT * FROM checkins ORDER BY created_at DESC'
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
      (coffee_name, bean_type, roaster, brew_method, rating, tasting_notes, venue_name, latitude, longitude, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      checkIn.coffeeName,
      checkIn.beanType,
      checkIn.roaster,
      checkIn.brewMethod,
      checkIn.rating,
      checkIn.tastingNotes,
      checkIn.venueName,
      checkIn.latitude,
      checkIn.longitude,
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
    'SELECT COUNT(*) as count FROM checkins'
  );
  const avgRow = db.getFirstSync<{ avg: number | null }>(
    'SELECT AVG(rating) as avg FROM checkins'
  );
  const roasterRows = db.getAllSync<{ roaster: string; count: number }>(
    'SELECT roaster, COUNT(*) as count FROM checkins GROUP BY roaster ORDER BY count DESC LIMIT 5'
  );
  const brewRows = db.getAllSync<{ brew_method: string; count: number }>(
    'SELECT brew_method, COUNT(*) as count FROM checkins GROUP BY brew_method ORDER BY count DESC LIMIT 5'
  );

  return {
    totalCheckIns: totalRow?.count ?? 0,
    avgRating: avgRow?.avg ?? 0,
    topRoasters: roasterRows.map(r => ({ roaster: r.roaster, count: r.count })),
    topBrewMethods: brewRows.map(r => ({ brewMethod: r.brew_method, count: r.count })),
  };
}
