# AI Model Comparison Lab

An interactive web application for faculty to learn how different AI models respond to the same prompts. Compare Claude, GPT-4, Gemini, and Llama 2 side-by-side with normalized cost and speed metrics.

## Features

### Current Capabilities
- **Real AI Integration**: Live comparison with Claude, GPT-4, Gemini, and Llama models
- **Local Model Support**: Run Ollama models locally for privacy and zero API costs
- **Easy Comparison**: Enter a prompt, select models, see side-by-side outputs
- **Cost & Speed Metrics**: Real-time rankings showing actual performance and costs
- **Custom Instructions**: Personalized Gemini model behavior with custom instructions
- **Example Prompts**: Quick-start templates across education, business, and research
- **Save Experiments**: Store and review past comparisons
- **Backend Proxy**: API keys stay server-side for security

### Architecture Highlights
- Built with Next.js 14 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Supabase for persistence
- Real-time API integration with major AI providers
- Ollama integration for local model deployment

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

2. **Configure Environment**
   - Create project at https://supabase.com
   - Copy `.env.local.example` → `.env.local`
   - Add your Supabase URL and anon key
   - Create the required tables (see SETUP.md)
   - Add API keys for AI providers you want to use:
     ```
     ANTHROPIC_API_KEY=sk-ant-...
     OPENAI_API_KEY=sk-...
     GOOGLE_API_KEY=...
     ```

3. **Optional: Install Ollama** (for local models)
   - Download from https://ollama.com
   - Pull models: `ollama pull llama2` or `ollama pull codellama`
   - Models run locally with no API costs

4. **Run Locally**
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

### API Integration
The app now uses real AI APIs through secure backend routes:
- **Claude**: Anthropic SDK via `/api/compare` route
- **GPT-4**: OpenAI SDK for ChatGPT models
- **Gemini**: Google Generative AI SDK with custom instructions
- **Ollama**: Local models for privacy-first deployment

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

## Using Local Models with Ollama

Ollama allows you to run models locally for complete privacy and zero API costs:

1. **Install Ollama**:
   - Download from https://ollama.com
   - Install for your platform

2. **Pull models**:
   ```bash
   ollama pull llama2
   ollama pull codellama
   ollama pull mistral
   ```

3. **Verify Ollama is running**:
   ```bash
   ollama list
   ```

4. **Use in the app**: Local models appear alongside cloud models in the comparison interface

## Custom Gemini Instructions

You can customize Gemini's behavior with system instructions:

1. Create/edit `.gemini-instructions` in the project root
2. Add custom instructions (e.g., "You are an expert educator...")
3. Restart the dev server
4. Gemini will use these instructions for all responses

## Deployment

### Vercel (Recommended)
```bash
vercel
```
Set environment variables in Vercel dashboard.

### Other Platforms
Works on any Node.js host (Railway, Render, Heroku).

## Roadmap

Potential future enhancements:

- [ ] Enhanced experiment saving/loading UI
- [ ] Batch testing (multiple prompts at once)
- [ ] Custom model parameters (temperature, max_tokens) in UI
- [ ] Export results to CSV
- [ ] Sharing experiments with other faculty
- [ ] Usage analytics and cost tracking
- [ ] Support for additional model providers

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
