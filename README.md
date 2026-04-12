# Bean Trail

A cross-platform mobile app for discovering and tracking coffee trails, built with Expo and React Native.

## Tech Stack

- **Framework:** Expo SDK 52 + React Native 0.76
- **Routing:** Expo Router (file-based, similar to Next.js App Router)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Language:** TypeScript (strict mode)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Expo Go app on your phone (for device testing)
- iOS Simulator or Android Emulator (for local simulator testing)

### Installation

```bash
npm install
```

### Running the App

```bash
# Web browser
npm run web

# iOS simulator
npm run ios

# Android emulator
npm run android
```

## Project Structure

```
app/                  # Expo Router pages (file-based routing)
  ├── _layout.tsx     # Root layout
  └── index.tsx       # Home screen
src/
  ├── components/     # Reusable UI components
  ├── screens/        # Screen-level components
  ├── types/          # TypeScript type definitions
  └── utils/          # Helper functions
assets/               # Images, fonts, and other static files
global.css            # Tailwind CSS directives (NativeWind)
```

## Architecture

- **Mobile only** — this repo is the React Native app. The backend API (Next.js) lives in a separate repository and is consumed over HTTPS.
- **File-based routing** — screens are created by adding files to the `app/` directory. `app/index.tsx` maps to `/`, `app/profile.tsx` maps to `/profile`, and so on.
- **Styling** — use the `className` prop with Tailwind utility classes on any component via NativeWind.
- **Path aliases** — `@/*` maps to `src/*`, so you can import with `import { Foo } from '@/components/Foo'`.

## App Config

| Property | Value |
|---|---|
| Bundle ID (iOS) | `com.beantrail.app` |
| Package (Android) | `com.beantrail.app` |
| Deep link scheme | `beantrail://` |

## Contributing

All changes must go through a pull request. Direct pushes to `main` are not allowed. PRs require at least one approving review before merging.

```bash
# Create a feature branch
git checkout -b feat/your-feature-name

# Push and open a PR
git push -u origin feat/your-feature-name
```

## Code Quality

```bash
npm run lint        # ESLint
npm run type-check  # TypeScript
npm test            # Jest
```
