# AI Conflict Resolution Learning Lab

An interactive web application for faculty to see how different AI models approach real-world conflict resolution and negotiation scenarios. Compare Claude, GPT-4, Gemini, and Llama 2 side-by-side with metrics on speed and cost.

## What's Different: Conflict Scenarios

Instead of generic prompts, this MVP includes **10 realistic conflict scenarios** covering:

- **Organizational**: Budget disputes, remote work policy, M&A integration
- **Interpersonal**: Family business inheritance, co-parenting disagreements
- **Community**: Housing development, water rights, environmental cleanup
- **Geopolitical**: Trade disputes, privacy regulation, tech governance
- **Nonprofit**: Mission creep vs growth, founder syndrome

Each scenario includes:
- Full narrative with stakeholders, interests, and complications
- Learning focus tags (e.g., "power imbalance," "interests vs positions")
- Context for faculty to discuss with students

## Quick Start

### 1. Install
```bash
cd ai-learning-platform
npm install
```

### 2. Run Locally
```bash
npm run dev
```

Open http://localhost:3000

### 3. Use It
- Click "Select Scenario" (default mode)
- Browse conflicts by category (organizational, interpersonal, etc)
- Pick a scenario
- Select models to compare (Claude, GPT, Gemini, Llama)
- Click "Compare Models"
- See how each model approaches the conflict
- Save your analysis for later

## How Faculty Use This

**Classroom Scenario:**

"Class, let's see how different AI models handle this real conflict. We have a nonprofit founder who wants to stay focused, and a board pushing for expansion."

1. Open the "Nonprofit Mission Creep" scenario
2. Have models analyze it (compare their frameworks)
3. Discuss: Which model identified the best underlying interests?
4. Debate: Are there solutions both approaches missed?
5. Reflect: What would YOU recommend, and why?

**Learning Outcomes:**

After using this tool, students/faculty understand:
- AI doesn't solve conflicts—it frames them
- Different models emphasize different frameworks (interests vs positions, stakeholder analysis, creative solutions)
- Good conflict resolution requires understanding what people *actually care about*
- Real conflicts have no "right answer"—only better or worse processes

## Features

### Current MVP
- ✅ 10 conflict scenarios organized by context
- ✅ Scenario selector (browse by category)
- ✅ Custom prompt mode (enter your own scenarios)
- ✅ Compare 4 models simultaneously
- ✅ Side-by-side outputs with metrics
- ✅ Speed & cost rankings (normalized)
- ✅ Save & load experiments
- ✅ Learning focus tags per scenario

### How It Works
- **No API costs**: Uses mock data for realistic responses
- **Backend proxy pattern**: Ready for real APIs when you add them
- **Local state management**: Experiments save to browser memory (can persist to Supabase)

## File Structure

```
ai-learning-platform/
├── lib/
│   ├── scenarioData.ts       # 10 conflict scenarios (TypeScript)
│   ├── mockData.ts           # Mock responses + example prompts
│   └── supabase.ts           # Database client
├── app/
│   ├── page.tsx              # Main UI with scenario selector
│   ├── api/compare/route.ts  # Model comparison endpoint
│   └── globals.css           # Tailwind styles
├── migrations/
│   └── 001_create_scenarios.sql  # Optional: Supabase schema
├── SCENARIOS_SETUP.md        # Guide for scenarios & Supabase
├── SETUP.md                  # General setup guide
├── README.md                 # This file
└── package.json
```

## The 10 Scenarios

### Organizational Conflicts
1. **Resource Allocation Dispute**: Product dev vs customer support fighting for budget
2. **Remote Work Policy**: Executive team split on office requirements; employees already relocated
3. **Acquisition Integration**: Larger company acquiring startup; layoff fears and culture clash

### Interpersonal Conflicts
4. **Inheritance and Business Legacy**: Siblings disagree on selling family business after parent's death
5. **Co-Parenting School Choice**: Divorced parents disagree on school; kids caught in middle

### Community Conflicts
6. **Affordable Housing vs Preservation**: City wants housing on vacant lot; neighbors resist density
7. **Water Rights in Drought**: Farmers vs city; vague 1887 water rights agreement; tribal claims

### Geopolitical Conflicts
8. **Tech Company and Government Privacy**: Data collection vs regulation; mutual distrust
9. **Trade Tariff Negotiation**: Countries propose tariffs; both face domestic political pressure

### Nonprofit Conflict
10. **Mission Creep vs Growth**: Board wants expansion; founder insists narrow focus is what works

## Using Scenarios in Teaching

### Example Class Session (45 minutes)

1. **Introduction (5 min)**
   - "Conflict resolution isn't about compromise. It's about understanding interests."
   - "Let's see how AI approaches it."

2. **Compare Models (20 min)**
   - Select a scenario (e.g., "Remote Work Policy")
   - Run comparison with 2-3 models
   - Display side-by-side results on projector

3. **Analyze Approaches (15 min)**
   - Which model identified interests vs positions?
   - Which suggested creative solutions?
   - Which missed important stakeholders?
   - What frameworks did each use?

4. **Discuss & Reflect (5 min)**
   - "Which approach would you take?"
   - "What would you do differently?"
   - "What did AI miss?"

### Discussion Prompts

**After comparing models on a scenario:**

- "What assumptions did each model make?"
- "Did any model identify power imbalances?"
- "Which approach focuses most on fairness?"
- "How would you verify which model's analysis is actually better?"
- "What information would you need before deciding?"

## Mock Data Strategy

All responses are pre-written but realistic. They simulate how each model might approach conflict resolution.

**Why mock data?**
- Zero cost to test UI
- Predictable for teaching
- Demonstrates framework differences

**When ready for real APIs:**
- Update `lib/mockData.ts` to call actual AI models
- Use backend proxy (API keys stay server-side)
- Add rate limiting to control costs

See `SETUP.md` for integration details.

## Next Phases

### Phase 1 (Current): Compare models on same scenarios
✅ Users see different frameworks each model uses

### Phase 2: Prompt variations
Users slightly modify a scenario and re-compare
- "What if we added a time constraint?"
- "What if this was international?"
- Learn: How do small changes affect analysis?

### Phase 3: Custom scenario builder
Faculty create their own conflict scenarios
- Add to teachable moments
- Create discipline-specific examples
- Share with colleagues

### Phase 4: Evaluation framework
Score models on:
- Interest identification
- Stakeholder analysis
- Creative options generation
- Feasibility of solutions

## Database Setup (Optional)

Scenarios are currently in code (`lib/scenarioData.ts`). To move to Supabase:

1. See `SCENARIOS_SETUP.md`
2. Create Supabase table
3. Run SQL migrations
4. Update code to fetch from database

This is optional—local data works great for MVP.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Scenarios not showing | Check `lib/scenarioData.ts` exists |
| Models not comparing | Verify at least 1 model selected |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Blank results | Check browser console for errors |

## Faculty Resources

After class, faculty might want to:
- Save the comparison as a PDF (future feature)
- Export scenario + model responses for student analysis
- Create a follow-up assignment: "Which model's framework would work best here?"

## Contributing

Ideas for improvements:
- Add scenarios from your discipline
- Create discussion prompts for each scenario
- Build evaluation rubrics
- Add models (when real APIs are connected)
- Create scenario variants (same conflict, different context)

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Other Platforms
Works on any Node.js host (Railway, Render, Heroku, AWS).

## What's Next?

1. **Test with faculty**: Are the scenarios useful? Do they teach what you want?
2. **Add more scenarios**: Domain-specific conflicts (healthcare, education, etc)
3. **Enable real APIs**: Replace mock data with live Claude, GPT, Gemini
4. **Build evaluation tools**: Help faculty assess model quality
5. **Collect feedback**: What's working? What's missing?

## Questions?

- **Scenarios**: See `SCENARIOS_SETUP.md`
- **Setup & deployment**: See `SETUP.md`
- **General info**: See `QUICK_REFERENCE.md`

---

Built for Columbia NECR program. Designed to teach how AI can help (and not help) with conflict resolution.
