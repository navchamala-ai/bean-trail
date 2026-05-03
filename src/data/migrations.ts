import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('beantrail.db');

export function runMigrations(): void {
  const row = db.getFirstSync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;

  if (version < 1) {
    db.execSync(`
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

    const newCols: string[] = [
      `ALTER TABLE checkins ADD COLUMN user_id TEXT NOT NULL DEFAULT 'me'`,
      `ALTER TABLE checkins ADD COLUMN flavor_notes TEXT NOT NULL DEFAULT '[]'`,
      `ALTER TABLE checkins ADD COLUMN photo_uri TEXT`,
    ];
    for (const stmt of newCols) {
      try { db.execSync(stmt); } catch { /* column already exists */ }
    }

    db.execSync(`
      CREATE TABLE IF NOT EXISTS user_badges (
        badge_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        earned_at TEXT NOT NULL,
        PRIMARY KEY (badge_id, user_id)
      );
    `);

    db.execSync('PRAGMA user_version = 1');
  }
}

export { db };
