# AI Conflict Resolution Lab - Changes Summary

## What Was Added

Your app has been updated to include **10 realistic conflict resolution scenarios** organized by context. Faculty can now:

1. **Select conflict scenarios** from a curated list (instead of just entering text)
2. **Compare how different AI models** approach the same conflict
3. **See learning frameworks** each model emphasizes
4. **Toggle between scenario mode and custom prompt mode**

## New Files

### Core Scenario Data
- **`lib/scenarioData.ts`** (New)
  - 10 conflict scenarios with full narratives
  - Learning focus tags for each scenario
  - Helper functions to query by context

- **`migrations/001_create_scenarios.sql`** (New)
  - SQL to create `scenarios` table in Supabase (optional)
  - Ready for future database migration

### Documentation
- **`README_CONFLICTS.md`** (New)
  - Complete guide for using scenarios in teaching
  - Learning outcomes and classroom examples
  - Discussion prompts for each scenario

- **`SCENARIOS_SETUP.md`** (New)
  - How to use local scenarios (no database needed)
  - How to migrate to Supabase when ready
  - Adding custom scenarios

### Updated Core Files
- **`app/page.tsx`** (Updated)
  - Added scenario selector UI
  - Mode toggle: "Select Scenario" vs "Custom Prompt"
  - Display selected scenario details
  - Organize scenarios by context (organizational, interpersonal, etc)

- **`lib/mockData.ts`** (Updated)
  - Added generic conflict resolution responses
  - Support for long scenario text
  - Realistic model responses to conflict scenarios

## The 10 Scenarios

### By Context

**Organizational (3)**
1. Resource Allocation Dispute
2. Remote Work Policy Standoff
3. Acquisition Integration Crisis

**Interpersonal (2)**
4. Inheritance and Business Legacy
5. Co-Parenting School Choice

**Community (2)**
6. Affordable Housing vs Neighborhood Preservation
7. Water Rights in Drought

**Geopolitical (2)**
8. Tech Company and Government Privacy
9. Trade Tariff Negotiation

**Nonprofit (1)**
10. Nonprofit Mission Creep vs Growth

## How the UI Changed

### Before
```
[Enter Your Prompt]
[Text area]
[Choose Models]
[Compare Models button]
```

### Now
```
[Choose Your Approach: Select Scenario | Custom Prompt]

If "Select Scenario":
  [Conflict Scenarios organized by context]
  [Education | Business | Research | etc]
  [Selected scenario details display]
  
If "Custom Prompt":
  [Text area for entering custom prompt]

[Choose Models]
[Compare Models button]
```

## What Stays the Same

- Model selection and comparison logic
- Cost/speed metrics and rankings
- Save/load experiments (now includes scenario metadata)
- Backend API structure
- Mock data approach (no real API calls yet)

## No Breaking Changes

- All existing features work as before
- The app will run with `npm install && npm run dev`
- No new dependencies added
- No Supabase required (scenarios loaded locally)

## Next Steps (Optional)

### To Use Right Now:
Just run `npm run dev` and scenarios are available.

### To Add More Scenarios:
Edit `lib/scenarioData.ts` and add to `CONFLICT_SCENARIOS` array.

### To Move to Supabase (Later):
1. Follow `SCENARIOS_SETUP.md`
2. Create table in Supabase
3. Run SQL migrations
4. Update code to fetch from DB

### To Add Real APIs (Later):
Update `lib/mockData.ts` to call actual Claude, GPT, etc.

## Teaching Examples

**Quick 15-minute classroom use:**

1. Open the app (already running)
2. Select a scenario (e.g., "Remote Work Policy")
3. Choose 2 models (Claude vs GPT)
4. Compare how they approach it
5. Discuss: "Which model better identified underlying interests?"

**Deeper analysis:**

1. Have students select different scenarios
2. Run comparisons
3. Create a rubric: Rate models on interest-identification, stakeholder awareness, creative solutions
4. Debate: Which model's framework is best for this type of conflict?

## File Changes Detail

```
ai-learning-platform/
├── lib/
│   ├── scenarioData.ts          ← NEW: 10 scenarios
│   ├── mockData.ts              ← UPDATED: conflict responses
│   └── supabase.ts              (unchanged)
├── app/
│   ├── page.tsx                 ← UPDATED: scenario selector UI
│   ├── api/compare/route.ts     (unchanged)
│   └── globals.css              (unchanged)
├── migrations/
│   └── 001_create_scenarios.sql ← NEW: optional Supabase setup
├── README_CONFLICTS.md           ← NEW: teaching guide
├── SCENARIOS_SETUP.md            ← NEW: scenarios documentation
├── SETUP.md                      (still valid)
├── QUICK_REFERENCE.md           (still valid)
└── package.json                 (unchanged)
```

## Technical Details

### Mock Responses
Each model now has a generic conflict resolution response framework:
- Claude: Emphasizes interests vs positions, joint problem-solving
- GPT: Structured phases (understand → reframe → generate → decide)
- Gemini: Psychological safety, common ground
- Llama: Simplicity, shared goals, experimentation

This simulates different frameworks each model might use.

### Scenario Structure
```typescript
{
  id: string
  title: string
  context: 'organizational' | 'interpersonal' | 'community' | 'geopolitical' | 'nonprofit'
  description: string (one-liner)
  fullScenarioText: string (full narrative 200-500 words)
  learningFocus: string[] (tags like 'power imbalance', 'interests vs positions')
}
```

## Performance

- Scenarios load instantly (local data)
- No new API calls
- UI responsive even with long scenario text
- Can add 50+ scenarios with no performance impact

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge).
Mobile friendly (though scenarios better on desktop).

## What Didn't Change

- All existing setup instructions still valid
- Deployment process unchanged
- Supabase integration optional (not required)
- Mock data approach continues (no API costs)

## Questions?

- **How to use scenarios?** → See `README_CONFLICTS.md`
- **How to set up database?** → See `SCENARIOS_SETUP.md`
- **General setup?** → See `SETUP.md`
- **Quick reference?** → See `QUICK_REFERENCE.md`

---

**Version**: 0.2.0 (Conflict Scenarios Edition)
**Date**: November 21, 2024
**Status**: MVP Ready for Teaching
