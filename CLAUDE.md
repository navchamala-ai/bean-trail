# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bean Trail is a cross-platform mobile application built with Expo (React Native) and TypeScript, targeting iOS and Android.

## Development Commands

```bash
# Install dependencies (first time setup)
npm install

# Start development server
npm start

# Run on specific platforms
npm run ios       # iOS simulator
npm run android   # Android emulator
npm run web       # Web browser

# Code quality
npm run lint           # ESLint check
npm run type-check     # TypeScript type checking
npm test               # Run Jest tests
```

## Architecture

**Tech Stack:**
- Expo SDK 52 with React Native 0.76
- Expo Router (file-based routing, similar to Next.js App Router)
- NativeWind (Tailwind CSS for React Native)
- TypeScript with strict mode enabled

**Architecture Note:**
This is the mobile app portion of Bean Trail. The backend API (Next.js) will be in a separate repository and consumed by this app over HTTPS.

**Project Structure:**
```
app/                 # Expo Router pages (file-based routing)
  ├── _layout.tsx    # Root layout
  └── index.tsx      # Home screen
src/
  ├── components/    # Reusable UI components
  ├── screens/       # Screen-level components (for complex screens)
  ├── utils/         # Helper functions and utilities
  └── types/         # TypeScript type definitions
```

**Routing:**
- Uses Expo Router for file-based navigation
- Files in `app/` directory automatically become routes
- `app/index.tsx` → home screen
- `app/profile.tsx` → /profile route

**Styling:**
- NativeWind provides Tailwind utility classes for React Native
- Use `className` prop on components: `<View className="flex-1 bg-white">`
- Configured in `tailwind.config.js` and `babel.config.js`

**Path Aliases:**
- `@/*` maps to `src/*` (configured in tsconfig.json)
- Use absolute imports: `import { Component } from '@/components/Component'`

**Platform Configuration:**
- iOS bundle identifier: `com.beantrail.app`
- Android package: `com.beantrail.app`
- Deep link scheme: `beantrail://`
- Assets directory: `./assets/`

## Key Configuration Files

- `app.json` - Expo configuration (app name, bundle IDs, icons, Expo Router plugin)
- `tsconfig.json` - TypeScript config with strict mode and path aliases
- `tailwind.config.js` - Tailwind CSS configuration for NativeWind
- `babel.config.js` - Babel config with NativeWind plugin
- `global.d.ts` - TypeScript declarations for NativeWind types
- `.eslintrc.js` - ESLint configuration extends expo preset

## Project-Specific Agents

Agent definitions are stored in `.claude/agents/` for project-specific workflows. Use the Agent tool with `agent_file=".claude/agents/[agent-name].md"` to invoke them.
