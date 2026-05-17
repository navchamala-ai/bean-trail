# Bean Trail — Overview

Bean Trail is a cross-platform mobile app for logging and reflecting on coffee
experiences. Users record what they drank, how it was brewed, where they were,
and how they rated it. Logs are stored locally on the device and surfaced in a
chronological feed plus a profile with aggregate stats.

The app is intentionally local-first today: there is no backend, account system,
or sync. Every check-in lives in an on-device SQLite database.

## Tech stack

- **Expo SDK 54** with **React Native 0.81** and **React 19**
- **Expo Router 6** for file-based navigation
- **NativeWind 4** (Tailwind utility classes for React Native)
- **expo-sqlite** for local persistence
- **expo-location** for GPS capture
- **TypeScript** in strict mode

## Top-level structure

```
app/                       Expo Router routes
  _layout.tsx              Root stack; initializes SQLite on mount
  (tabs)/
    _layout.tsx            Bottom tab bar (Feed, Profile)
    index.tsx              Feed screen (list of check-ins)
    profile.tsx            Profile screen (stats)
  checkin/
    new.tsx                Modal: create a check-in
    [id].tsx               Detail screen for one check-in
src/
  components/              Reusable UI (CheckInCard, StarRating)
  types/                   Shared TypeScript types and enum constants
  utils/database.ts        SQLite access layer
```

## Feature surface (what currently exists)

1. **Coffee check-ins** — create, list, view, delete. See
   [feature-coffee-check-ins.md](./feature-coffee-check-ins.md).
2. **Profile stats** — totals, average rating, top roasters, top brew methods.
   See [feature-profile-stats.md](./feature-profile-stats.md).
3. **Location capture** — optional GPS coordinates attached to a check-in via
   `expo-location` with foreground permission.

## Design system (informal)

- Background: `amber-50` (warm cream)
- Primary accent: `amber-800` / `amber-700` (espresso brown)
- Cards: white, rounded-2xl, soft shadow
- Typography: system default; bold weights for headings, gray-400 for meta

Tab bar and screen headers share the `#92400e` (amber-800) tint defined in
`app/_layout.tsx` and `app/(tabs)/_layout.tsx`.

## Non-goals (today)

- No authentication or multi-user support
- No cloud sync — uninstalling the app loses the data
- No photos / image attachments
- No map view (coordinates are stored but not rendered on a map)
- No editing of an existing check-in (only create + delete)

These are deliberate omissions, not bugs. See individual feature specs for the
boundaries of what is implemented.
