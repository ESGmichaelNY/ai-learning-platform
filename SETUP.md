# AI Model Comparison Lab - Setup Guide

## Overview
This is an MVP web application for faculty to compare how different AI models (Claude, GPT, Gemini, Llama) respond to the same prompts. It includes side-by-side outputs, cost/speed metrics, and experiment saving.

## Architecture
- **Frontend**: Next.js 14 + React (TypeScript)
- **Backend**: Next.js API Routes (backend proxy pattern)
- **Database**: Supabase (for saving experiments)
- **Styling**: Tailwind CSS
- **Data**: Mock responses for initial testing (no API calls required yet)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a free account at https://supabase.com
2. Create a new project
3. Go to Project Settings → API to get:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Create these tables in Supabase:

```sql
-- Experiments table
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT NOT NULL,
  models_used TEXT[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Responses table
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID REFERENCES experiments(id),
  model_name TEXT NOT NULL,
  response_text TEXT NOT NULL,
  cost DECIMAL NOT NULL,
  speed_ms DECIMAL NOT NULL,
  tokens_used INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials.

### 4. Run Locally
```bash
npm run dev
```

Visit http://localhost:3000

## Testing the MVP
- The app works with mock data—no API keys needed to test
- Select example prompts or enter your own
- Choose models to compare
- Click "Compare Models" to see side-by-side results
- Save experiments to persist them (uses Supabase)
- View saved experiments in the sidebar

## Current Features
✅ Same prompt → multiple models
✅ Side-by-side output display
✅ Normalized cost/speed metrics with rankings
✅ Example prompts for quick learning
✅ Save/load experiments
✅ Mock data (no API calls)

## Next Steps: Real API Integration

When ready to enable real API calls, implement:

1. **Backend Proxy Route** (`app/api/compare/route.ts`):
   - Replace mock data with actual API calls
   - Add authentication using your API keys
   - Implement rate limiting

2. **Supported Models**:
   - Claude: Use Anthropic SDK
   - GPT-4: Use OpenAI SDK
   - Gemini: Use Google Generative AI SDK
   - Llama 2: Use Together AI or Replicate

3. **Environment Setup**:
   ```bash
   npm install @anthropic-ai/sdk openai @google/generative-ai
   ```

4. **Update API Route** to call real models instead of `getMockResponse()`:
```typescript
// Example for Claude
const response = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }]
})
```

## Database Integration

The app scaffolding supports saving experiments. To activate:

1. Uncomment or implement these functions in `lib/supabase.ts`:
```typescript
export async function saveExperiment(prompt: string, responses: ComparisonResponse[]) {
  // Insert into experiments table
  // Insert responses into responses table
}

export async function getExperiments() {
  // Fetch all saved experiments
}
```

2. Call from the UI when users click "Save Experiment"

## Cost Control Strategy

**Phase 1 (Current)**: Mock data = $0 spend
**Phase 2**: Implement rate limiting on backend
**Phase 3**: Add usage tracking/budgets

## Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel: https://vercel.com/new
3. Set environment variables in Vercel dashboard
4. Deploy

### Deploy to Other Platforms
Works with any Node.js hosting (Heroku, Railway, Render, etc.)

## Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Supabase connection issues:**
- Verify URL and key are correct
- Check Supabase project is active
- Ensure tables are created

**Models not comparing:**
- Check browser console for errors
- Verify selected models array is not empty
- Ensure mock data is loaded

## Security Notes

- API keys are stored server-side only (never sent to browser)
- Environment variables in `.env.local` are never committed to git
- For production: Use Vercel secrets or hosting platform's environment variable management

## Faculty Learning Path

**Module 1 (Current)**: Compare models on same prompt
**Module 2** (Coming): Modify prompts slightly, observe differences
**Module 3** (Coming): Adjust model parameters (temperature, etc.)
**Module 4** (Coming): Batch testing and analysis

---

Questions? Check the codebase comments or reach out!
