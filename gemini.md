# Custom Instructions for Gemini

This file contains custom instructions and preferences for the Gemini CLI agent.

## Core Preferences
- **Tone:** Concise and professional.
- **Output:** Minimize verbosity; focus on code and direct answers.

## Project Context
- **Frameworks:** Next.js (App Router), Tailwind CSS, Supabase.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS with standard utility classes.

## Workflow Rules
1. Always check for existing code before creating new files.
2. Run `npm run lint` after significant changes.
3. specific architectural patterns:
   - Use Server Actions for data mutations where possible.
   - Keep client components at the leaves of the component tree.
