# Project-Local Agents

This directory contains agents specific to the Bean Trail project.

## How to Use

Create agent definition files (`.md` or `.txt`) in this directory. Each agent should define:

1. **Purpose** - What the agent specializes in
2. **When to Use** - Trigger conditions
3. **Instructions** - Specific guidelines and workflows

## Example Agent Structure

```markdown
# Agent Name

## Purpose
Specialized in [specific task]

## When to Use
- [Condition 1]
- [Condition 2]

## Instructions
[Detailed steps and guidelines]
```

## Invoking Agents

From the main Claude Code session:
```
Use the Agent tool with task="[your task]" and agent_file=".claude/agents/[agent-name].md"
```

## Example Agents for Bean Trail

Consider creating:
- **mobile-ui-reviewer.md** - Reviews mobile UI components for iOS/Android compatibility
- **expo-specialist.md** - Handles Expo-specific configuration and native modules
- **feature-planner.md** - Plans new features with mobile-first considerations
- **navigation-architect.md** - Designs app navigation structure
