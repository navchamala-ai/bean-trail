# Data Model

All persistence is handled by a single SQLite database (`beantrail.db`) opened
via `expo-sqlite`. There is exactly one table.

## Schema

Defined in `src/utils/database.ts` (`initDatabase`):

```sql
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS checkins (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  coffee_name   TEXT NOT NULL,
  bean_type     TEXT NOT NULL,
  roaster       TEXT NOT NULL,
  brew_method   TEXT NOT NULL,
  rating        INTEGER NOT NULL,
  tasting_notes TEXT DEFAULT '',
  venue_name    TEXT DEFAULT '',
  latitude      REAL,
  longitude     REAL,
  created_at    TEXT NOT NULL
);
```

Notes:
- WAL journal mode is enabled for concurrent reads while a writer is active.
- `latitude` / `longitude` are nullable because location is optional.
- `created_at` is stored as an ISO-8601 string (`new Date().toISOString()`).
- `tasting_notes` and `venue_name` default to empty strings rather than NULL,
  so consumers can treat them as plain `string` without null checks.

The table is created lazily on app launch from the root layout
(`app/_layout.tsx`), so no separate migration step exists yet. Any future
schema change will need an explicit migration path.

## TypeScript types

From `src/types/index.ts`:

```ts
interface CheckIn {
  id: number;
  coffeeName: string;
  beanType: string;
  roaster: string;
  brewMethod: string;
  rating: number;          // 1–5
  tastingNotes: string;
  venueName: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;       // ISO-8601
}

type NewCheckIn = Omit<CheckIn, 'id' | 'createdAt'>;
```

Field names use camelCase in TypeScript and snake_case in SQL. Conversion
happens in `rowToCheckIn` inside `src/utils/database.ts:39`.

## Enumerated values

Bean types and brew methods are not enforced at the DB level — they are stored
as free-form strings. The UI restricts choices to constants exported from
`src/types/index.ts:17`:

```ts
BEAN_TYPES    = ['Arabica', 'Robusta', 'Liberica', 'Blend', 'Other'];
BREW_METHODS  = ['Espresso', 'Pour Over', 'French Press', 'AeroPress',
                 'Cold Brew', 'Drip', 'Moka Pot', 'Other'];
```

If a user upgrades to a build that removes one of these values, existing rows
with the removed value still render fine because the column is a plain string.

## Database access API

All SQL lives in `src/utils/database.ts`. The module exports:

| Function | Purpose |
|---|---|
| `initDatabase()` | Create table if missing. Called once from root layout. |
| `getAllCheckIns()` | Return all rows, newest first. Used by Feed. |
| `getCheckInById(id)` | Return one row or `null`. Used by detail screen. |
| `insertCheckIn(newCheckIn)` | Insert; returns the new `lastInsertRowId`. |
| `deleteCheckIn(id)` | Delete by id. |
| `getProfileStats()` | Aggregate query for the Profile screen. |

All calls are synchronous (`db.getAllSync` / `db.runSync` / `db.getFirstSync`).
SQLite on-device is fast enough at this scale that sync calls don't block the
UI noticeably, and they keep call sites simple (no `await`).

### Profile stats aggregation

`getProfileStats()` issues four queries:

1. `SELECT COUNT(*)` — total check-ins
2. `SELECT AVG(rating)` — average rating across all rows
3. `SELECT roaster, COUNT(*) GROUP BY roaster ORDER BY count DESC LIMIT 5`
4. Same shape for `brew_method`

The returned `ProfileStats` shape is:

```ts
interface ProfileStats {
  totalCheckIns: number;
  avgRating: number;
  topRoasters:    { roaster:    string; count: number }[];
  topBrewMethods: { brewMethod: string; count: number }[];
}
```

`avgRating` is `0` when there are no rows; the Profile screen renders `'—'` in
that case rather than `0.0`.
