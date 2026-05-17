# Components

Two reusable components live in `src/components/`. Everything else is a screen
or a one-off view inside a screen.

## `<CheckInCard />`

`src/components/CheckInCard.tsx`

A tappable summary card used to render one row in the Feed `FlatList`.

```tsx
<CheckInCard checkIn={checkIn} />
```

**Props**

| Prop | Type | Notes |
|---|---|---|
| `checkIn` | `CheckIn` | The full row to render. |

**Layout**

- Header row: coffee name (bold) + roaster (amber-700) on the left; small
  `StarRating` on the right.
- Pill row: bean type pill (amber) and brew method pill (stone).
- Tasting notes (italic, 2-line clamp) — rendered only if non-empty.
- Footer row: venue (or "Unknown location") and short date
  (`Mon DD, YYYY` via `toLocaleDateString`).

Tapping the card routes to `/checkin/[id]`. The card is a `TouchableOpacity`
with `activeOpacity={0.7}` for press feedback.

## `<StarRating />`

`src/components/StarRating.tsx`

Renders a row of five star glyphs. Used both as a read-only display (Feed
card, detail screen header) and as an interactive control (New Check-in
form).

```tsx
<StarRating rating={4} />                       // read-only
<StarRating rating={rating} onRate={setRating} size="lg" />  // interactive
```

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `rating` | `number` | (required) | 1–5. Stars 1..rating are filled. |
| `onRate` | `(n: number) => void` | `undefined` | When omitted, the control is read-only and the touchables are `disabled`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Maps to font sizes 16 / 22 / 30. |

**Visual**

- Filled star: `★` in `#d97706` (amber-600).
- Empty star: `★` in `#d1d5db` (gray-300).
- `hitSlop` expands the touch target vertically so tapping is comfortable
  even at `sm`.

The component is intentionally tiny — no half-star support, no animation,
no custom icons. If we ever need precision better than whole stars, the
component will need a redesign.
