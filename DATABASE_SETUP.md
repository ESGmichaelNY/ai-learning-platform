# Database Setup Guide

## Enable Experiments Persistence with Supabase

The app now supports saving experiments to a Supabase database. This allows experiments to persist across browser sessions and be accessed from different devices.

### Quick Setup (5 minutes)

#### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up (free tier works great)
3. Create a new project
4. Copy your project credentials:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Anon Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

#### Step 2: Configure Environment Variables
1. In your `ai-learning-platform` folder, copy `.env.local.example` to `.env.local`
2. Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

#### Step 3: Create Database Tables
1. In Supabase, go to **SQL Editor**
2. Create a new query
3. Copy and paste the SQL from `migrations/002_create_experiments.sql`:
   ```sql
   -- Create experiments table
   CREATE TABLE experiments (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     prompt TEXT NOT NULL,
     scenario_title TEXT,
     scenario_context TEXT,
     models_used TEXT[] NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create responses table
   CREATE TABLE responses (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
     model_name TEXT NOT NULL,
     response_text TEXT NOT NULL,
     cost DECIMAL NOT NULL DEFAULT 0,
     speed_ms DECIMAL NOT NULL DEFAULT 0,
     tokens_used INTEGER NOT NULL DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create indexes for faster queries
   CREATE INDEX idx_experiments_created_at ON experiments(created_at DESC);
   CREATE INDEX idx_responses_experiment_id ON responses(experiment_id);
   ```
4. Click **Run** to execute

#### Step 4: Run Your App
```bash
npm run dev
```

**That's it!** Experiments will now auto-save to your Supabase database.

### How It Works

#### Saving Experiments
When you click "Save Experiment" after running a comparison:
1. The app calls `/api/experiments` (POST)
2. Data is saved to:
   - `experiments` table (prompt, scenario info, models used)
   - `responses` table (model outputs, metrics)
3. Success confirmation appears
4. Experiments appear in the sidebar

#### Loading Experiments
When the app loads:
1. It calls `/api/experiments` (GET)
2. All past experiments are fetched from the database
3. They appear in the sidebar automatically
4. Click any to reload and modify

### Data Structure

#### Experiments Table
```
id              - UUID (auto-generated)
prompt          - The scenario text sent to models
scenario_title  - Title of the scenario (for display)
scenario_context - Context type (organizational, interpersonal, etc)
models_used     - Array of model IDs that were compared
created_at      - Timestamp when saved
```

#### Responses Table
```
id              - UUID (auto-generated)
experiment_id   - Foreign key to experiments
model_name      - Which model (claude-3-sonnet, gpt-4, etc)
response_text   - The model's full response
cost            - Cost per 1K tokens
speed_ms        - Response time in milliseconds
tokens_used     - Number of tokens used
created_at      - Timestamp when saved
```

### Fallback Behavior

If Supabase is not configured or unavailable:
- Experiments still save to browser memory (session only)
- A message indicates "Saved locally (database save failed)"
- Everything works, but data won't persist after closing the browser

### Optional: Set Up Row Level Security (RLS)

For production, you should secure your tables with Row Level Security so users can only see their own data:

1. In Supabase, go to **Authentication → Users** to set up user authentication
2. Create RLS policies to restrict access:
   ```sql
   -- Allow users to see their own experiments
   ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Users can view own experiments"
     ON experiments
     FOR SELECT
     USING (auth.uid() = user_id);
   ```

For now, the anon key allows public access (fine for development/demo).

### Troubleshooting

**"Missing Supabase environment variables"**
→ Check `.env.local` has both variables

**Experiments don't save**
→ Check `.env.local` is correct
→ Verify tables were created in Supabase SQL Editor

**"Failed to fetch experiments"**
→ Check network tab (browser dev tools)
→ Verify Supabase credentials are correct

**Experiments visible to everyone**
→ This is expected without RLS set up
→ Follow "Set Up Row Level Security" section to secure

### Migration from Browser Storage

If you already have experiments saved in browser storage:
1. They'll continue to work locally
2. When you save new experiments, they go to Supabase
3. On next load, Supabase experiments appear in sidebar
4. You can manually re-create important old experiments if needed

### Next Steps

- Add user authentication (Supabase Auth)
- Add RLS policies to secure data
- Add ability to share experiments with colleagues
- Export experiments to PDF/CSV
- Create a dashboard of all past experiments
