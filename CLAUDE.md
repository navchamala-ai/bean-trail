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
- TypeScript with strict mode enabled
- Entry point: `App.tsx`

**Project Structure:**
```
src/
  ├── components/   # Reusable UI components
  ├── screens/      # Screen-level components
  ├── utils/        # Helper functions and utilities
  └── types/        # TypeScript type definitions
```

**Path Aliases:**
- `@/*` maps to `src/*` (configured in tsconfig.json)
- Use absolute imports: `import { Component } from '@/components/Component'`

**Platform Configuration:**
- iOS bundle identifier: `com.beantrail.app`
- Android package: `com.beantrail.app`
- Assets directory: `./assets/`

## Key Configuration Files

- `app.json` - Expo configuration (app name, bundle IDs, icons)
- `tsconfig.json` - TypeScript config with strict mode and path aliases
- `.eslintrc.js` - ESLint configuration extends expo preset

## Project-Specific Agents

Agent definitions are stored in `.claude/agents/` for project-specific workflows. Use the Agent tool with `agent_file=".claude/agents/[agent-name].md"` to invoke them.
