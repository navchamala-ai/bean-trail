# Feature: Coffee Check-ins

A check-in is one entry in the user's coffee journal. This is the core feature
of Bean Trail; every other screen exists to create, list, or summarize
check-ins.

## User-facing capabilities

| Capability | Where | File |
|---|---|---|
| See all past check-ins, newest first | Feed tab | `app/(tabs)/index.tsx` |
| Create a new check-in | "+" FAB → modal | `app/checkin/new.tsx` |
| View a single check-in's full detail | Tap a card in the feed | `app/checkin/[id].tsx` |
| Delete a check-in | Detail screen → "Delete Check-in" | `app/checkin/[id].tsx:39` |

Editing an existing check-in is **not supported** — the only mutations are
insert and delete.

## Check-in fields

Captured on the New Check-in form (`app/checkin/new.tsx`):

| Field | Required | Input type | Default |
|---|---|---|---|
| Coffee Name | yes | text | empty |
| Roaster | yes | text | empty |
| Bean Type | yes | pill selector | `Arabica` |
| Brew Method | yes | pill selector | `Espresso` |
| Rating | yes | 5-star tap | `3` |
| Tasting Notes | no | multiline text | empty |
| Venue | no | text | empty |
| GPS coordinates | no | auto-captured | none |

Validation: `coffeeName` and `roaster` must be non-empty after trimming.
Anything else passes — empty strings are allowed for optional fields. Failure
shows a native `Alert.alert` and does not save.

## Creation flow

1. User taps the FAB on the Feed (`app/(tabs)/index.tsx:34`).
2. Router pushes `/checkin/new` as a **modal** stack screen
   (`app/_layout.tsx:14`, with `presentation: 'modal'`).
3. On mount, the screen calls `fetchLocation()` which:
   - Requests foreground location permission via `expo-location`.
   - On grant, captures lat/lng with `Accuracy.Balanced`.
   - On denial or failure, surfaces a tappable "tap to retry" hint.
   - The save button does **not** wait for location — the user can submit
     without GPS.
4. User fills required fields, picks pills, taps stars, optionally writes notes
   and venue name.
5. "Log Coffee" calls `insertCheckIn(...)` (sync), then `router.back()`.
6. Returning to the Feed triggers `useFocusEffect` which re-runs
   `getAllCheckIns()` and re-renders the list.

## Read flow (Feed)

`app/(tabs)/index.tsx` is a `FlatList` of `CheckInCard` components.

- Data source: `getAllCheckIns()` returns rows ordered by `created_at DESC`.
- Refresh trigger: `useFocusEffect` re-fetches every time the screen is
  focused. There is no pull-to-refresh and no manual reload button — the focus
  effect covers the only entry points (returning from a create or delete).
- Empty state: a centered coffee emoji + "No check-ins yet" hint with a nudge
  toward the FAB.
- Tap a card → navigate to `/checkin/[id]`.

## Detail flow

`app/checkin/[id].tsx`:

1. Reads `id` from `useLocalSearchParams`.
2. Fetches the row with `getCheckInById(Number(id))` on mount.
3. Renders three cards: header (name + roaster + rating), details (bean type,
   brew method, venue if set, coordinates if set, formatted date), and tasting
   notes (only if non-empty).
4. Date is rendered via `toLocaleDateString` with weekday, month name, day,
   year, and time.
5. Coordinates are shown to four decimal places (~11 m precision) — there's no
   reverse geocoding or map rendering.

## Delete flow

The "Delete Check-in" button at the bottom of the detail screen:

1. Shows a native `Alert.alert` confirmation with a destructive style button.
2. On confirm, calls `deleteCheckIn(id)` then `router.back()`.
3. The Feed's `useFocusEffect` repopulates the list without the deleted row.

There is no soft-delete / trash — rows are removed immediately and
permanently.

## Edge cases & current behavior

- **Location permission denied:** the check-in still saves; lat/lng are
  `null`. The detail screen omits the Coordinates row in that case.
- **No internet:** irrelevant — the feature is fully offline.
- **App killed mid-form:** unsaved input is lost; there is no draft
  persistence.
- **Duplicate roaster spelling** ("Blue Bottle" vs "Blue bottle"): these are
  treated as different roasters by the Profile stats aggregation. There is no
  normalization or autocomplete today.
