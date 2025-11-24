# AI Model Comparison Lab

An interactive web application for faculty to learn how different AI models respond to the same prompts. Compare Claude, GPT-4, Gemini, and Llama 2 side-by-side with normalized cost and speed metrics.

## Features

### Current MVP
- **Easy Comparison**: Enter a prompt, select models, see side-by-side outputs
- **Cost & Speed Metrics**: Normalized rankings show which model is fastest/cheapest
- **Example Prompts**: Quick-start templates across education, business, and research
- **Save Experiments**: Store and review past comparisons
- **No Costs**: Mock data means zero API spend during development
- **Backend Proxy**: API keys stay server-side (ready for real API integration)

### Architecture Highlights
- Built with Next.js 14 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Supabase for persistence
- Ready for real API integration

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account (free tier works)

### Installation

1. **Clone/Set Up**
   ```bash
   cd ai-learning-platform
   npm install
   ```

2. **Configure Supabase**
   - Create project at https://supabase.com
   - Copy `.env.local.example` → `.env.local`
   - Add your Supabase URL and anon key
   - Create the required tables (see SETUP.md)

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## How Faculty Use It

1. **See the Difference**: Pick an example prompt or write your own
2. **Select Models**: Check which AI models to compare
3. **Compare**: Click the button and observe side-by-side responses
4. **Learn**: Notice how models differ in tone, length, approach, cost, speed
5. **Save**: Store experiments for reflection or discussion

## File Structure

```
ai-learning-platform/
├── app/
│   ├── api/compare/route.ts      # API endpoint for model comparison
│   ├── page.tsx                  # Main UI component
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Tailwind styles
├── lib/
│   ├── supabase.ts              # Supabase client
│   └── mockData.ts              # Mock responses & examples
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── SETUP.md                     # Detailed setup guide
└── README.md                    # This file
```

## Development Notes

### Mock Data Strategy
The app currently uses mock responses in `lib/mockData.ts`. This allows:
- **Zero Cost**: Test the UI without spending on API calls
- **Predictable Results**: Same output every time (good for testing)
- **Easy Swap**: Replace mock data with real API calls when ready

### Backend Proxy Pattern
API keys are never exposed to the frontend:
1. User submits prompt in browser
2. Frontend calls `/api/compare` route
3. Backend (Next.js) handles API authentication
4. Backend returns results to frontend

This keeps credentials safe and lets you control costs centrally.

### Supabase Integration
Currently scaffolded for saving experiments:
- `experiments` table: stores prompts and selected models
- `responses` table: stores model outputs and metrics

See `SETUP.md` for SQL to create tables.

## Next Phase: Real API Integration

When ready to use actual models:

1. **Add SDK packages**:
   ```bash
   npm install @anthropic-ai/sdk openai @google/generative-ai
   ```

2. **Update `/app/api/compare/route.ts`** to replace mock data with real calls

3. **Set API keys in `.env.local`**:
   ```
   ANTHROPIC_API_KEY=sk-...
   OPENAI_API_KEY=sk-...
   GOOGLE_API_KEY=...
   ```

4. **Implement rate limiting** to control costs

Example: Calling Claude via backend proxy
```typescript
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const response = await client.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: [{ role: "user", content: prompt }]
})
```

## Deployment

### Vercel (Recommended)
```bash
vercel
```
Set environment variables in Vercel dashboard.

### Other Platforms
Works on any Node.js host (Railway, Render, Heroku).

## Scaffolded Features (Not Yet Implemented)

These features are designed into the data model but not active in the UI:

- [ ] Saving experiments to Supabase (UI ready, just needs DB calls)
- [ ] Loading past experiments from database
- [ ] Batch testing (multiple prompts at once)
- [ ] Custom model parameters (temperature, max_tokens)
- [ ] Export results to CSV
- [ ] Sharing experiments with other faculty

## For Faculty: Learning Outcomes

After using this tool, faculty should understand:

1. Different models produce different outputs for the same prompt
2. Prompt clarity affects all models
3. Speed and cost vary significantly across providers
4. No single "best" model—trade-offs exist
5. How to evaluate AI for their specific teaching context

## Troubleshooting

**"Cannot find module '@supabase/supabase-js'"**
→ Run `npm install`

**Port 3000 in use**
→ Run `npm run dev -- -p 3001`

**Supabase tables not created**
→ Follow SQL in SETUP.md

**Mock data not loading**
→ Check browser console for errors, verify `lib/mockData.ts` exists

## Contributing

Feedback and improvements welcome! Key areas:
- Additional example prompts for different disciplines
- More detailed cost/speed visualization
- Advanced filtering/sorting of results
- Mobile responsiveness improvements

## License

MIT

## Questions?

Refer to `SETUP.md` for detailed documentation or review inline code comments.
