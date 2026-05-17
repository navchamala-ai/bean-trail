# Screens & Navigation

Bean Trail uses **Expo Router 6** with a stack-on-top-of-tabs structure.

## Route tree

```
RootStack                       app/_layout.tsx
├── (tabs)                      app/(tabs)/_layout.tsx       headerShown: false
│   ├── index   (Feed)          app/(tabs)/index.tsx
│   └── profile (Profile)       app/(tabs)/profile.tsx
├── checkin/new                 app/checkin/new.tsx          presentation: modal
└── checkin/[id]                app/checkin/[id].tsx
```

`(tabs)` is a route group — the parens keep it out of the URL path while still
giving it its own layout file. The tab navigator renders inside the root stack,
with stack headers suppressed for the tabs group because the tab layout
provides its own header.

## Root layout

`app/_layout.tsx` is responsible for two things:

1. **Initializing the database** in a `useEffect` on first mount
   (`initDatabase()`). This runs before any screen tries to read.
2. **Configuring the root stack**, including modal presentation and the shared
   `#92400e` (amber-800) header style.

```tsx
<Stack>
  <Stack.Screen name="(tabs)"      options={{ headerShown: false }} />
  <Stack.Screen name="checkin/new" options={{ presentation: 'modal', ... }} />
  <Stack.Screen name="checkin/[id]" options={{ ... }} />
</Stack>
```

## Tab layout

`app/(tabs)/_layout.tsx` defines two tabs with emoji icons:

| Tab | Icon | Route | Title |
|---|---|---|---|
| Feed | ☕ | `/` (index) | "Bean Trail" |
| Profile | 👤 | `/profile` | "My Profile" |

Active tint: `#92400e` (amber-800). Inactive: `#9ca3af` (gray-400).

## Screen-by-screen

### Feed (`app/(tabs)/index.tsx`)

- Renders a `FlatList` of `CheckInCard` items.
- Data refreshed via `useFocusEffect` → `getAllCheckIns()`.
- Empty state: centered coffee emoji + hint.
- Floating action button (bottom-right) → push `/checkin/new`.

### Profile (`app/(tabs)/profile.tsx`)

- ScrollView of stats cards.
- Data refreshed via `useFocusEffect` → `getProfileStats()`.
- See [feature-profile-stats.md](./feature-profile-stats.md).

### New Check-in (`app/checkin/new.tsx`)

- Presented as a **modal** so the user feels a clear "I'm in compose mode"
  context separate from the rest of the app.
- Form fields: text inputs, pill selectors for bean type and brew method,
  `StarRating`, multiline tasting notes, venue name.
- Triggers GPS capture on mount (see
  [feature-coffee-check-ins.md](./feature-coffee-check-ins.md)).
- Save calls `insertCheckIn(...)` then `router.back()` (dismisses the modal).

### Check-in Detail (`app/checkin/[id]/.tsx`)

- Dynamic route — `id` is read from `useLocalSearchParams`.
- Read-only view with a destructive "Delete Check-in" action.
- If `getCheckInById(id)` returns `null` (deleted, bad id), renders a
  "Check-in not found" message.

## Path aliases

`tsconfig.json` maps `@/*` → `src/*`. All non-route code is imported as
`@/components/...`, `@/utils/...`, `@/types`.

## Deep linking

`app.json` declares `"scheme": "beantrail"`, so URLs like
`beantrail:///checkin/42` would resolve to the detail screen for check-in 42.
This isn't actively used today but the routes already support it because
Expo Router maps file paths to URL paths automatically.
