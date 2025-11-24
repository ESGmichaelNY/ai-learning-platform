# Setting Up Conflict Resolution Scenarios

## Quick Start: Use Local Mock Data (No Database Required)

The app currently uses mock data loaded from `lib/scenarioData.ts`. This means:
- ✅ All 10 scenarios are available immediately
- ✅ No database setup required
- ✅ No API integration yet
- ✅ Responses are static but realistic

To use the scenarios right now: Just run `npm run dev` and they'll be available.

## Option 1: Keep Scenarios in Code (Current Setup)

The scenarios are defined in `lib/scenarioData.ts` as TypeScript objects. This is perfect for:
- MVP development
- Teaching environments
- Quick iteration
- No database overhead

**Pros:**
- Fast, no latency
- Version controlled with your code
- Easy to modify

**Cons:**
- Can't update scenarios without deploying
- Not scalable if you want hundreds of scenarios
- No user contributions

## Option 2: Move Scenarios to Supabase (When Ready)

If you want to store scenarios in a database for easier management, follow these steps:

### Step 1: Create the Table

In your Supabase SQL editor, run:

```sql
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  context TEXT NOT NULL,
  description TEXT NOT NULL,
  full_scenario_text TEXT NOT NULL,
  learning_focus TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scenarios_context ON scenarios(context);
```

### Step 2: Insert the 10 Scenarios

Use the SQL file at `migrations/001_create_scenarios.sql` (copy and paste the INSERT statements into Supabase).

### Step 3: Update Your Code

Create a new file `lib/supabaseScenarios.ts`:

```typescript
import { supabase } from './supabase'
import { ConflictScenario } from './scenarioData'

export async function getScenarios(): Promise<ConflictScenario[]> {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .order('context')
  
  if (error) throw error
  return data as ConflictScenario[]
}

export async function getScenariosByContext(context: string): Promise<ConflictScenario[]> {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('context', context)
  
  if (error) throw error
  return data as ConflictScenario[]
}

export async function createScenario(scenario: Omit<ConflictScenario, 'id'>): Promise<ConflictScenario> {
  const { data, error } = await supabase
    .from('scenarios')
    .insert([scenario])
    .select()
    .single()
  
  if (error) throw error
  return data as ConflictScenario
}
```

### Step 4: Update `app/page.tsx`

Replace the import:

```typescript
// OLD:
import { CONFLICT_SCENARIOS } from '@/lib/scenarioData'

// NEW:
import { getScenarios } from '@/lib/supabaseScenarios'

// In component:
const [scenarios, setScenarios] = useState<ConflictScenario[]>([])

useEffect(() => {
  getScenarios().then(setScenarios).catch(console.error)
}, [])
```

## Data Model

Each scenario has:

```typescript
{
  id: string (UUID)
  title: string - Short name
  context: string - One of: 'organizational', 'interpersonal', 'community', 'geopolitical', 'nonprofit'
  description: string - One-liner summary
  fullScenarioText: string - Full narrative (200+ words)
  learningFocus: string[] - Tags like 'interests vs positions', 'power imbalance'
  created_at: timestamp
}
```

## Current Scenarios (10 Total)

### Organizational (3)
1. Resource Allocation Dispute
2. Remote Work Policy Standoff
3. Acquisition Integration Crisis

### Interpersonal (2)
4. Inheritance and Business Legacy
5. Co-Parenting School Choice

### Community (2)
6. Affordable Housing vs Neighborhood Preservation
7. Water Rights in Drought

### Geopolitical (2)
8. Tech Company and Government Privacy
9. Trade Tariff Negotiation

### Nonprofit (1)
10. Mission Creep vs Growth

## Adding Custom Scenarios

To add a new scenario:

**Option A: Update code directly**

Edit `lib/scenarioData.ts` and add to the `CONFLICT_SCENARIOS` array.

**Option B: Use Supabase (if migrated)**

Call the `createScenario` function from your API or admin panel.

## Learning Features

Each scenario teaches conflict resolution concepts:
- Identifying interests vs positions
- Power dynamics and imbalance
- Cultural and value differences
- Multiple stakeholder claims
- Creative problem-solving
- Ethical considerations

Faculty can use scenarios to:
1. Compare how different models approach the same conflict
2. Identify frameworks each model uses
3. Discuss strengths/weaknesses of each approach
4. Practice negotiation strategies

## Next Steps

1. **MVP**: Use local scenarios (no database needed)
2. **After Testing**: Move to Supabase if you want dynamic updates
3. **Growth**: Add user ability to create/share custom scenarios

For now, the local setup is recommended. It's fast and you can always migrate later.
