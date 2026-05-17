# Feature: Profile Stats

The Profile tab summarizes a user's check-in history. It is read-only and
purely aggregated from the local database — there is no editable profile
information (no name, avatar, bio, etc.).

## Where it lives

- Screen: `app/(tabs)/profile.tsx`
- Data: `getProfileStats()` in `src/utils/database.ts:102`
- Refresh: `useFocusEffect` re-runs the stats query every time the tab is
  focused, so newly created check-ins are reflected immediately.

## What's displayed

The screen renders three sections, all wrapped in white rounded-2xl cards on
the amber-50 background.

### 1. Summary tiles (two side-by-side cards)

| Tile | Value | Source |
|---|---|---|
| Check-ins | total row count | `SELECT COUNT(*) FROM checkins` |
| Avg Rating | average of all `rating` values, one decimal | `SELECT AVG(rating) FROM checkins` |

When there are no check-ins, **Avg Rating renders as `—`** instead of `0.0`.

### 2. Top Roasters

A ranked list of up to the **top 5 roasters** by count, with the form
`1. {roaster}  {count}×`. Empty state: "No data yet" (gray).

Query:
```sql
SELECT roaster, COUNT(*) as count
FROM checkins
GROUP BY roaster
ORDER BY count DESC
LIMIT 5;
```

### 3. Brew Methods

Same shape as Top Roasters but grouped by `brew_method`. Up to 5 entries,
ranked by count.

## Behavior notes

- **Grouping is case-sensitive and exact.** "Blue Bottle" and "blue bottle"
  count as different roasters. There is no normalization step today; if this
  becomes a problem the fix would be to either normalize on insert or
  `GROUP BY LOWER(roaster)` in the query.
- **Ties are broken by SQLite's internal ordering** (effectively insertion
  order), which is good enough for a personal journal.
- **No time filters** — the stats are lifetime totals. There is no "this
  month" / "last 30 days" view.

## Non-goals

- No charts or trend lines.
- No streak / cadence tracking ("you've logged 12 days in a row").
- No map of venues visited.
- No export / share of stats.
