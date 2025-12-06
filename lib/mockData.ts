export const EXAMPLE_PROMPTS = [
  {
    id: 1,
    text: "Explain photosynthesis to a 10-year-old",
    category: "Education"
  },
  {
    id: 2,
    text: "Write a professional email declining a meeting",
    category: "Business"
  },
  {
    id: 3,
    text: "Summarize the key findings from a research abstract",
    category: "Research"
  }
]

export const MODELS = [
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  { id: 'phi3:latest', name: 'Phi-3 (3.8B) - Fastest', provider: 'Ollama (Local)' },
  { id: 'llama3:latest', name: 'Llama 3 (8B)', provider: 'Ollama (Local)' },
  { id: 'mistral:latest', name: 'Mistral (7B)', provider: 'Ollama (Local)' },
  { id: 'qwen3-coder:480b-cloud', name: 'Qwen 3 Coder (480B Cloud)', provider: 'Ollama (Local)' }
]

// This is a simplified version - in production, you'd have responses for each full scenario
// For now, we'll create generic conflict resolution framework responses

const CONFLICT_PROMPT_TEMPLATE = `How would you approach facilitating resolution for this conflict, focusing on identifying underlying interests, reframing positions, and finding creative solutions?`

export const MOCK_RESPONSES: Record<string, Record<string, any>> = {
  "Explain photosynthesis to a 10-year-old": {
    "claude-3-sonnet": {
      text: "Photosynthesis is how plants make their own food using sunlight! Think of it like a plant's kitchen. Plants take in sunlight, water from the soil, and a gas called carbon dioxide from the air. Then they mix these ingredients together and create sugar (food) and oxygen. The oxygen is the air we breathe! It's like plants are little solar-powered factories that turn light into food.",
      tokens: 87,
      speed: 0.045,
      cost: 0.015
    },
    "gpt-4": {
      text: "Imagine plants as tiny chefs! They use sunlight as their energy source. Plants take in water from the soil and carbon dioxide from the air. When sunlight hits their leaves, it's like turning on a stove. The plant uses this energy to mix water and carbon dioxide together to make sugar, which is their food. As a bonus, this process also makes oxygen—the air we breathe! So plants are basically making food and air at the same time.",
      tokens: 92,
      speed: 0.038,
      cost: 0.018
    },
    "gemini-pro": {
      text: "Photosynthesis is nature's way of converting light into energy! Here's how it works: plants have special structures in their leaves called chloroplasts. When sunlight enters the leaf, these chloroplasts capture the light energy. The plant also absorbs water through its roots and carbon dioxide from the air. Using the sun's energy, the plant combines these ingredients to create glucose (sugar) that feeds the plant. Oxygen is released as a waste product—which is lucky for us!",
      tokens: 98,
      speed: 0.041,
      cost: 0.016
    },
    "llama-2": {
      text: "Plants eat sunlight! Well, not really eat, but they use it. Photosynthesis is when plants use sunlight, water, and air (carbon dioxide) to make their own food. It happens in the green parts of plants called leaves. The green color comes from something called chlorophyll. When light hits the chlorophyll, it starts a process that turns water and carbon dioxide into sugar that the plant uses to grow. The plant also makes oxygen, which is what we breathe.",
      tokens: 95,
      speed: 0.052,
      cost: 0.008
    }
  },
  "Write a professional email declining a meeting": {
    "claude-3-sonnet": {
      text: "Subject: Re: Meeting Request\n\nHi [Name],\n\nThank you for reaching out and thinking of me for this meeting. I appreciate the opportunity, but unfortunately I have a prior commitment at that time that I cannot reschedule.\n\nI'd be happy to connect at a different time if you'd like. Please let me know what works for your schedule, and I'll do my best to accommodate.\n\nBest regards,\n[Your Name]",
      tokens: 68,
      speed: 0.042,
      cost: 0.012
    },
    "gpt-4": {
      text: "Subject: Unable to Attend Meeting\n\nDear [Name],\n\nThank you for the invitation to meet on [date]. While I'm genuinely interested in discussing the topics, I have a scheduling conflict that prevents me from attending.\n\nWould you be available at an alternative time? I'd prefer [suggest alternative times]. If none of these work, I'm happy to find another date that suits your calendar.\n\nLooking forward to connecting soon.\n\nSincerely,\n[Your Name]",
      tokens: 75,
      speed: 0.039,
      cost: 0.014
    },
    "gemini-pro": {
      text: "Subject: Meeting on [Date] - Unable to Attend\n\nDear [Name],\n\nThank you for inviting me to the meeting scheduled for [date and time]. I appreciate you thinking of me.\n\nUnfortunately, I already have a commitment during that time that I cannot move. However, I'm very interested in connecting. Would you have availability another day next week? I'm flexible and can work around your schedule.\n\nThank you for understanding.\n\nBest,\n[Your Name]",
      tokens: 72,
      speed: 0.044,
      cost: 0.013
    },
    "llama-2": {
      text: "Subject: Regarding Meeting Request\n\nHi [Name],\n\nThank you for inviting me to the meeting. I'm interested in the topic, but I have another commitment at that time and won't be able to make it.\n\nCould we schedule a call for another day? I'm available [mention your availability]. Let me know what works best for you.\n\nThanks,\n[Your Name]",
      tokens: 65,
      speed: 0.048,
      cost: 0.009
    }
  },
  "Summarize the key findings from a research abstract": {
    "claude-3-sonnet": {
      text: "The study examines the correlation between social media usage and academic performance in undergraduate students. Key findings include: (1) Students spending more than 3 hours daily on social media show a 15% decline in GPA compared to moderate users; (2) Platform type matters—interactive platforms correlate with higher distraction than passive consumption; (3) When social media use is purposeful (e.g., academic groups), negative correlations diminish significantly. The research suggests moderation and intentional use are critical factors.",
      tokens: 85,
      speed: 0.043,
      cost: 0.014
    },
    "gpt-4": {
      text: "This research investigates how social media impacts university students' academic outcomes. Main results: Heavy social media users (3+ hours/day) experienced 15% lower grades than those with moderate use. The type of platform matters—active engagement platforms cause more academic distraction than passive browsing. Importantly, when students use social media for academic purposes (joining study groups), the negative effects were substantially reduced. Conclusion: The relationship between social media and academics is nuanced and depends on usage patterns and purpose.",
      tokens: 88,
      speed: 0.040,
      cost: 0.016
    },
    "gemini-pro": {
      text: "This study explores the relationship between social media consumption and student performance. Key findings: Students who use social media for 3+ hours daily show 15% lower GPAs compared to light/moderate users. Platform choice influences impact—interactive platforms are more distracting than passive ones. However, academic-focused social media use (study groups, course-related communities) mitigates negative effects. The authors conclude that the relationship is context-dependent, emphasizing that quality and purpose of use matter more than quantity alone.",
      tokens: 90,
      speed: 0.045,
      cost: 0.015
    },
    "llama-2": {
      text: "Researchers studied how social media affects college student grades. They found: Students using social media 3+ hours a day had 15% lower grades. Different apps have different effects—some distract more than others. Interestingly, when students used social media for school purposes (like study groups), the negative effect went away. So it's not just about how much time you spend, but what you're doing on social media.",
      tokens: 78,
      speed: 0.050,
      cost: 0.010
    }
  }
}

// Generic conflict resolution responses for longer scenarios
const GENERIC_CONFLICT_RESPONSES = {
  'claude-3-sonnet': {
    text: `I would approach this systematically by first conducting separate conversations with each party to understand their underlying interests beneath their stated positions.

Key steps:
1. **Validate concerns**: Each side has legitimate concerns. Acknowledge them without agreeing to positions.
2. **Separate interests from positions**: "You say you want X. What problem does X solve?" Go deeper.
3. **Look for trade-offs**: What matters most to each party? This often reveals room for creative solutions.
4. **Reframe as joint problem-solving**: Shift from "you vs me" to "us vs the problem."
5. **Generate options without committing**: Brainstorm possibilities without evaluating yet.
6. **Use objective criteria**: Find independent standards both sides respect (fairness, market rates, data, precedent).

The goal isn't compromise (50-50 split). It's integration—finding solutions where both sides get what actually matters to them, even if they don't get everything they asked for.

Critical: Build trust by being impartial and transparent about the process.`,
    tokens: 168,
    speed: 0.044,
    cost: 0.028
  },
  'gpt-4': {
    text: `This requires a multi-stakeholder conflict resolution approach. Here's how I'd structure it:

**Phase 1: Understanding (1-2 weeks)**
- Individual interviews with key stakeholders
- Active listening to identify both explicit and implicit interests
- Map the "conflict map"—who depends on whom, what power dynamics exist

**Phase 2: Reframing (1 week)**
- Hold joint sessions where you explicitly separate interests from positions
- Use techniques like interest-based negotiation (Fisher, Ury)
- Ask: "What does success look like?" (often reveals mutual interests)

**Phase 3: Option Generation (2 weeks)**
- "Yes, and..." brainstorming (avoid killing ideas)
- Look for trades: "You get this, they get that"
- Consider sequencing: Can you do Part A, then re-evaluate Part B?

**Phase 4: Decision & Commitment**
- Establish objective criteria for evaluation
- Make sure everyone understands what they're committing to
- Build in review checkpoints

**Key principle**: Look for what economists call "Pareto improvements"—solutions where at least one side is better off and neither is worse off.`,
    tokens: 194,
    speed: 0.038,
    cost: 0.031
  },
  'gemini-pro': {
    text: `Effective conflict resolution here requires understanding that both sides usually have legitimate concerns, even when they disagree on solutions. My approach:

**1. Establish Psychological Safety**
- Meet with parties separately first. They need to feel heard before joint problem-solving.
- Be transparent about your process and role.
- No surprises.

**2. Uncover Interests, Not Just Positions**
A position is what someone says they want. An interest is WHY they want it.
- Position: "We need 3 days in office"
- Interest: "I'm worried collaboration is suffering"
- This opens doors. Maybe there are ways to improve collaboration without mandating office time.

**3. Identify Common Ground**
- Both sides want the organization to succeed
- Both probably care about employee wellbeing, even if they define it differently
- Start there

**4. Generate Creative Options**
- Pilots and experiments (lower risk)
- Sequencing (try this, then reassess)
- Hybrid solutions (meet the deeper interests without conceding positions)

**5. Use Objective Standards**
- Data, not opinion
- Market benchmarks
- Proven practices from similar situations

**Success metric**: Not that everyone gets what they asked for, but that they feel the process was fair and they got what they actually need.`,
    tokens: 201,
    speed: 0.041,
    cost: 0.030
  },
  'llama-2': {
    text: `I would start by bringing people together around shared goals, then work through the disagreement systematically.

First: Listen to each side. Understand what they really care about, not just what they're demanding.

Then: Look for what's underneath. Usually people disagree on how to solve the problem, but they often agree on what the problem is.

Next: Generate solutions together. Maybe the answer isn't A or B—it's something both sides hadn't thought of.

Finally: Test it out. Don't lock in forever. Agree to try something, then check if it actually works.

Why this works: When people feel heard and included in problem-solving, they're more likely to make it work. When you impose solutions, people find ways to sabotage them.

The key is separating the person from the problem. Say "We both want X to succeed, but we disagree on how" rather than "You're wrong and I'm right."`,
    tokens: 150,
    speed: 0.049,
    cost: 0.024
  }
}

export function getMockResponse(prompt: string, modelId: string) {
  // Check if it's a known example prompt
  const promptResponses = MOCK_RESPONSES[prompt as keyof typeof MOCK_RESPONSES]
  if (promptResponses && promptResponses[modelId]) {
    return promptResponses[modelId]
  }
  
  // For conflict scenarios or custom prompts, use generic responses
  // These simulate models handling conflict resolution scenarios
  if (prompt.length > 200) { // Likely a full scenario
    return GENERIC_CONFLICT_RESPONSES[modelId as keyof typeof GENERIC_CONFLICT_RESPONSES] || null
  }
  
  return null
}
