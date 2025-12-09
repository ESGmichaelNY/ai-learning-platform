# Codebase Review

## Overview
The application is a Next.js (App Router) project using TypeScript, Tailwind CSS, and Supabase. It functions as an "AI Conflict Resolution Lab," allowing users to compare different AI model responses to conflict scenarios.

Current State: **Functional Prototype**
- Comparison logic relies on mock data (`getMockResponse`).
- UI is centralized in a single "God Component" (`app/page.tsx`).
- Data persistence is implemented with Supabase but has performance bottlenecks.

## Critical Issues

### 1. Performance: `GET /api/experiments`
**Location:** `app/api/experiments/route.ts`
**Severity:** High
**Issue:** The API fetches the *entire* `responses` table to join it with experiments in JavaScript.
```typescript
// Current implementation
const { data: responses } = await supabase.from('responses').select('*') // Fetches EVERYTHING
```
**Impact:** As the database grows, this request will become extremely slow, consume excessive memory, and likely time out.
**Fix:** Use Supabase's relational queries to fetch related data in a single request.
```typescript
// Recommended Fix
const { data: experiments } = await supabase
  .from('experiments')
  .select('*, responses(*)')
  .order('created_at', { ascending: false })
```
*Note: This requires Foreign Keys to be correctly set up in the database.*

### 2. Architecture: Monolithic `page.tsx`
**Location:** `app/page.tsx`
**Severity:** Medium
**Issue:** The main page component handles all UI states (`scenarios`, `detail`, `create`, `results`) and logic in one file (over 400 lines).
**Impact:** Hard to maintain, test, and read. State management is cluttered.
**Fix:** Refactor into smaller components:
- `components/ScenarioList.tsx`
- `components/ScenarioDetail.tsx`
- `components/ExperimentResults.tsx`
- `components/CreateScenarioForm.tsx`

## Suggestions for Improvement

### Code Quality & Types
- **Loose Typing:** Usage of `any` in API responses map logic (e.g., `data.experiments.map((exp: any) => ...)`).
  - **Action:** Define shared interfaces (e.g., in `types/index.ts`) for DB entities to ensure type safety across Client and Server.
- **Hardcoded Data:** `CONTEXT_OPTIONS` and `LEARNING_FOCUS_OPTIONS` in `page.tsx` should be moved to a constants file or loaded from the database to allow for easier updates.

### User Experience (UX)
- **Feedback:** The app uses `alert()` for success/error messages.
  - **Action:** Replace with a toast notification library (e.g., `sonner` or `react-hot-toast`) for non-blocking feedback.
- **Loading States:** While `loading` state exists, granular loading states (e.g., specifically for the "Save" button) would improve perceived performance.

### API Logic
- **Mock Data:** Currently `app/api/compare/route.ts` uses mock data. Ensure there is a clear path/interface to swap this for real LLM API calls (OpenAI/Anthropic SDKs) when ready.

## Security
- **Env Vars:** `lib/supabase.ts` correctly checks for env vars, which is good practice. Ensure RLS (Row Level Security) is enabled on Supabase tables if the app becomes multi-user or public.

## Next Steps
1. **Refactor API:** specificially the `GET /api/experiments` query.
2. **Component Split:** Break down `page.tsx`.
3. **Type Hardening:** Remove `any` usage.
