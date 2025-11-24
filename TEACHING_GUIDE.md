# Quick Teaching Guide: Using Conflict Scenarios

## 30-Second Overview

Your app now has **10 real-world conflict scenarios**. Instead of asking students to imagine conflicts, show them actual model responses to realistic situations:

- Select a scenario (e.g., "Remote Work Policy")
- Compare how Claude, GPT, Gemini approach it
- Discuss: Which model identified interests vs positions?
- Debrief: What would you do differently?

**Time to run**: 2-5 minutes
**Setup time**: 30 seconds (just load the app)

---

## The 10 Scenarios at a Glance

| Scenario | Context | Main Tension | Best For |
|----------|---------|--------------|----------|
| Resource Allocation | Org | Budget scarcity, competing priorities | Show zero-sum thinking vs integration |
| Remote Work | Org | Culture vs flexibility | Power of data in resolving disagreement |
| M&A Integration | Org | Trust & autonomy | Addressing unspoken fears |
| Inheritance | Family | Legacy vs practicality | Values-based conflict |
| School Choice | Family | Parenting styles | Different worldviews |
| Housing | Community | Equity vs preservation | Bias in "neutral" arguments |
| Water Rights | Community | Resource scarcity + history | Long-term agreements under change |
| Privacy | Geopolitical | Innovation vs regulation | Power imbalance, mutual distrust |
| Tariffs | Geopolitical | Trade & jobs | Political constraints |
| Nonprofit | Org/Non | Mission vs growth | Founder syndrome, succession |

---

## 5-Minute Class Activity

### Setup (30 seconds)
1. Pull up the app: http://localhost:3000
2. Make sure you're in "Select Scenario" mode
3. Browser projected/shared

### Activity (4 minutes)

**Step 1: Pick scenario (30 sec)**
- "Today we're looking at the Remote Work Policy conflict"
- Read the description aloud
- Students get the setup: Half the company wants people in office; half wants remote

**Step 2: Select models (30 sec)**
- "Let's compare how Claude and GPT-4 approach this"
- (Select both checkboxes)

**Step 3: Compare (2 min)**
- "Click 'Compare Models'"
- Wait for results
- Display side-by-side
- Read both responses aloud or have students read silently

**Step 4: Discuss (1 min)**
- **Key question**: "What framework did each model use?"
  - Claude emphasizes: interests vs positions, joint problem-solving
  - GPT emphasizes: structured phases, stakeholder mapping
  
- **Follow-up**: "Which approach would you take?"
  - Hint: Good answers involve understanding why people want what they want

---

## Common Discussion Prompts

Use these after comparing models:

### About Interests
- "Did the model identify what people *really care about*?"
- "Distinguish: Are they fighting over positions or interests?"
- Example: Position = "3 days in office." Interest = "I'm worried collaboration is suffering."

### About Problem-Solving
- "Did the model suggest a creative solution, or just compromise?"
- "What might satisfy both sides without 50-50 splitting?"

### About Feasibility
- "Is the suggested solution realistic?"
- "Who would resist it, and how would you address them?"

### About Process
- "How should you talk to each side first?"
- "What data would you gather before deciding?"

### About Power
- "Who has more power in this situation?"
- "How does that affect possible solutions?"

---

## 20-Minute Deep Dive

### Part 1: Compare (10 min)
- Pick scenario
- Run comparison (2 models or all 4)
- Discuss responses

### Part 2: Analyze (7 min)

Create a simple rubric:

| Criteria | Claude | GPT | Gemini | Llama |
|----------|--------|-----|--------|-------|
| **Identifies interests?** | Y/N | Y/N | Y/N | Y/N |
| **Suggests creative options?** | Y/N | Y/N | Y/N | Y/N |
| **Addresses power imbalance?** | Y/N | Y/N | Y/N | Y/N |
| **Feasible?** | Y/N | Y/N | Y/N | Y/N |

Have students vote or discuss which model scores highest.

### Part 3: Debrief (3 min)
- "What did all models miss?"
- "What would you do differently?"
- "When would you use Claude's approach vs GPT's?"

---

## Lesson Plan Ideas

### Lesson 1: "Interests vs Positions"
- Use: Resource Allocation or Remote Work scenario
- Focus: Can your model tell the difference?
- Outcome: Students understand this is a critical skill

### Lesson 2: "Stakeholder Analysis"
- Use: M&A Integration or Housing scenario
- Focus: Which stakeholders did the model identify? Miss?
- Outcome: Students learn to map power and interests

### Lesson 3: "Creative Problem-Solving"
- Use: Tariffs or Water Rights scenario
- Focus: Did the model suggest integration or compromise?
- Outcome: Students see the difference between solving and splitting

### Lesson 4: "Bias & Framing"
- Use: Housing or Privacy scenario
- Focus: Does the model acknowledge both sides, or favor one?
- Outcome: Students notice how framing affects analysis

### Lesson 5: "Real-World Application"
- Use: Any scenario
- Focus: "If you were the mediator, what would you do?"
- Outcome: Students apply frameworks learned

---

## Homework Ideas

### Analysis Assignment
"Write a 2-page response comparing how two models approached a conflict scenario. Which framework was better? Why?"

### Role-Play Prep
"Review the scenario for next class. We'll act it out—you'll negotiate like one of the stakeholders. The model responses will guide the discussion."

### Debate Prep
"Based on the model responses, argue for each side of the conflict. Which model's approach better supports each side?"

### Design Your Own
"Create your own conflict scenario from your experience or discipline. Run it through the app. What did the models get right/wrong?"

---

## Scenarios by Discipline

### For Negotiation Classes
All 10 scenarios work, but especially:
- Resource Allocation (resource scarcity)
- Tariffs (international negotiation)
- Acquisition Integration (complex stakeholders)

### For Leadership/Org Behavior
- Remote Work (change management)
- M&A Integration (organizational culture)
- Nonprofit Mission (strategy & vision)

### For Ethics/Values
- School Choice (different worldviews)
- Housing (equity vs property rights)
- Privacy (innovation vs regulation)

### For Conflict Resolution
All 10 are designed for this.

### For Environmental/Sustainability
- Water Rights (resource management)
- Housing (development vs community)
- Tariffs (labor & environmental standards)

---

## Tech Specs for Teachers

### To Run This
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000
4. It works (no database setup required)

### The Scenarios Live In:
`lib/scenarioData.ts` — Easy to modify or add to

### To Add a New Scenario
1. Open `lib/scenarioData.ts`
2. Add to the `CONFLICT_SCENARIOS` array
3. Refresh the page (Next.js hot reload)
4. It appears in the app

### To Make Responses Specific to Your Scenario
Edit `lib/mockData.ts` — currently generic conflict responses work for any scenario. You can make them specific to your context.

---

## Assessment Ideas

### Quick Poll
After comparing models: "Which approach is best?" → Vote → Discuss

### Rubric (Create Your Own)
What makes a good conflict analysis?
- Identifies interests?
- Acknowledges all stakeholders?
- Suggests feasible solutions?
- Addresses underlying causes?

### Reflection Prompt
"Which model's framework would you use for [your context]? Why?"

### Comparative Analysis
"Compare how GPT and Claude differ in their approach. What does each emphasize?"

---

## Tips for Smooth Use

### Before Class
- Test it once (make sure it runs)
- Pick your scenario in advance
- Think about 2-3 discussion questions

### During Class
- Start with the scenario description (read it aloud)
- Run the comparison with 2 models (faster than 4)
- Display on projector
- Let results speak—then discuss

### Common Questions from Students
- **"Which model is right?"** → "None of them. But which framework works for YOUR context?"
- **"Why are the responses so long?"** → "Good conflict analysis is complex. Notice what each model emphasized."
- **"Can we try a different scenario?"** → Yes. (Takes 2 minutes.)

---

## Variations & Extensions

### Variation 1: Time-Constrained Decisions
"The company has to decide this week. How do you accelerate the process?"

### Variation 2: Adding Stakeholders
"What if we add [new person/group]? How does that change the analysis?"

### Variation 3: Cultural Context
"Same conflict, but in [different country/culture]. Does the approach change?"

### Variation 4: Historical Perspective
"How would this conflict have been different 20 years ago?"

### Variation 5: AI's Role
"Is AI good at conflict resolution? What can it help with? What must humans do?"

---

## Common Scenarios (Pick One)

**First time?** Start with **"Remote Work Policy"**
- Relatable (everyone works somewhere)
- Balanced arguments (both sides have a point)
- Real data involved
- Triggers good discussion

**Want complexity?** Try **"Acquisition Integration"**
- Multiple stakeholders
- Trust issues
- Different cultures
- No obvious "right answer"

**Want real-world impact?** Try **"Housing"** or **"Water Rights"**
- Stakes are high
- Values matter
- Data vs emotion
- Systemic issues

**Want family drama?** Try **"Inheritance"** or **"School Choice"**
- Personal values
- Power dynamics
- Emotional undercurrents
- Educational institutions

---

## One Last Thing

The whole point is: **AI doesn't solve conflicts. But comparing how different models frame conflicts teaches students how to think about them.**

Good luck! 🚀
