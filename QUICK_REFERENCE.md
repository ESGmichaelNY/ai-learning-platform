# AI Model Comparison Lab - Quick Reference

## What You Got

A fully functional Next.js web app with:
- ✅ Interactive UI to compare AI models
- ✅ Side-by-side output display
- ✅ Cost/speed metrics with rankings
- ✅ Save & load experiments
- ✅ 3 example prompts to start
- ✅ Mock data (zero cost)
- ✅ Backend proxy pattern (keys stay secure)
- ✅ Supabase integration ready
- ✅ TypeScript + Tailwind CSS

---

## Get It Running (5 minutes)

### Step 1: Install
```bash
cd ai-learning-platform
npm install
```

### Step 2: Set Up Supabase (optional for MVP)
- Go to https://supabase.com, create free account
- Create a project
- Copy `.env.local.example` → `.env.local`
- Paste your Supabase URL and key into `.env.local`
- Create the two tables (SQL in SETUP.md)

### Step 3: Run
```bash
npm run dev
```
Open http://localhost:3000

---

## How It Works

**User Flow:**
1. Enter prompt (or use example)
2. Select models to compare (Claude, GPT, Gemini, Llama)
3. Click "Compare Models"
4. See results side-by-side with cost/speed rankings
5. Save experiment (stored locally for now)

**Behind the Scenes:**
- Frontend (React) → Backend API route → Mock data (for now)
- No API keys needed yet (mock data only)
- When you're ready, swap mock data for real API calls

---

## File Map

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main UI (all the UI code) |
| `app/api/compare/route.ts` | Comparison engine |
| `lib/mockData.ts` | Mock responses + example prompts |
| `lib/supabase.ts` | Database connection |
| `.env.local` | Your secrets (API keys) |
| `SETUP.md` | Detailed setup guide |
| `README.md` | Full documentation |

---

## Key Features to Understand

### Mock Data Strategy
Currently using pre-written responses. This means:
- ✅ UI works perfectly without real APIs
- ✅ Zero cost during development
- ✅ Predictable for testing
- ↪️ When ready: Replace `getMockResponse()` with real API calls

### Backend Proxy
API keys never touch the browser:
- Frontend calls `/api/compare` (public)
- Backend handles authentication (private)
- Results returned to frontend
- Users never see your keys ✓

### Experiment Saving
Current state: Saves to browser memory (resets on refresh)
Next step: Uncomment Supabase calls in UI to persist to database

---

## Next Steps (When Ready)

### Add Real APIs (30 min)
1. Get API keys (Claude, OpenAI, Google)
2. Install SDKs: `npm install @anthropic-ai/sdk openai @google/generative-ai`
3. Update `app/api/compare/route.ts` to use real calls instead of mock data
4. Add keys to `.env.local`
5. Done!

### Activate Database Saving (15 min)
1. Create Supabase tables (SQL in SETUP.md)
2. Uncomment the save/load functions in UI
3. Test saving and loading experiments

### Deploy (5 min)
```bash
vercel deploy
```
Or use any Node.js hosting (Railway, Render, etc.)

---

## Example: How Mock Data Works

File: `lib/mockData.ts`
```typescript
export const MOCK_RESPONSES = {
  "Explain photosynthesis to a 10-year-old": {
    "claude-3-sonnet": {
      text: "Photosynthesis is how plants make their own food...",
      tokens: 87,
      speed: 0.045,
      cost: 0.015
    },
    "gpt-4": { ... },
    // etc
  }
}
```

When user clicks compare, the backend:
```typescript
const response = getMockResponse(prompt, modelId)
// Returns the pre-written text + metrics
```

To switch to real API:
```typescript
const response = await anthropic.messages.create({...})
// Actually calls the API
```

---

## Faculty Learning Workflow

**Session 1:** "Same prompt, different models"
- Use example prompts or try their own
- Compare outputs side-by-side
- Notice differences in tone, length, accuracy
- Discuss: Which model is "best"? For what?

**Session 2:** (Coming) "Prompt matters"
- Slightly change the prompt
- See how outputs change
- Learn: Good prompts help all models

**Session 3:** (Coming) "Speed & cost trade-offs"
- Understand when to use each model
- Fast models vs. smart models
- Budget implications for large-scale use

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Missing dependencies | `npm install` |
| Blank screen | Check browser console for errors |
| No mock data | Verify `lib/mockData.ts` exists |
| Supabase errors | Check URL/key in `.env.local` |

---

## File Checklist

You should have these files:
```
ai-learning-platform/
├── app/page.tsx ✓
├── app/api/compare/route.ts ✓
├── app/layout.tsx ✓
├── app/globals.css ✓
├── lib/supabase.ts ✓
├── lib/mockData.ts ✓
├── package.json ✓
├── next.config.js ✓
├── tailwind.config.js ✓
├── tsconfig.json ✓
├── postcss.config.js ✓
├── .env.local.example ✓
├── .gitignore ✓
├── README.md ✓
├── SETUP.md ✓
└── This file (QUICK_REFERENCE.md) ✓
```

---

## Ready to Go!

1. Run `npm install`
2. Run `npm run dev`
3. Open http://localhost:3000
4. Try the example prompts
5. Explore the UI

Questions? Check SETUP.md or README.md for details.

Good luck! 🚀
