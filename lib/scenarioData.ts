export interface ConflictScenario {
  id: string
  title: string
  context: 'organizational' | 'interpersonal' | 'community' | 'geopolitical' | 'nonprofit'
  description: string
  fullScenarioText: string
  learningFocus: string[]
}

export const CONFLICT_SCENARIOS: ConflictScenario[] = [
  {
    id: '1',
    title: 'Resource Allocation Dispute',
    context: 'organizational',
    description: 'Two department heads competing for the same budget for different strategic initiatives.',
    fullScenarioText: `Two department heads need the same budget for competing initiatives. The product development head argues innovation drives revenue growth. The customer support head argues retention prevents churn and maintains customer lifetime value. Both leaders are respected and both have solid data supporting their positions. The CFO has given them one week to present a unified recommendation or decisions will be made without their input.

Key stakeholders: CFO, product development team, customer support team, executive leadership, employees awaiting clarity.

Background: Last quarter, product innovation contributed 12% to revenue growth. Support quality scores improved 18% and retention increased 4%. Both are genuine wins, and neither department can achieve their goals with half the requested budget.

Complication: The company recently had a failed product launch that cost $2M. There's political pressure to show discipline. Meanwhile, customer churn is accelerating in a key segment because support quality has degraded.`,
    learningFocus: ['interests vs positions', 'resource scarcity', 'organizational politics', 'data interpretation']
  },
  {
    id: '2',
    title: 'Remote Work Policy Standoff',
    context: 'organizational',
    description: 'Executive team divided on mandatory office presence; employees have already made life decisions.',
    fullScenarioText: `Half the executive team (4 executives) wants mandatory 3 days onsite weekly, arguing collaboration and culture require physical presence. The other half (4 executives) supports fully remote, arguing it improves retention and reduces real estate costs.

The company operates across three cities with a distributed team of 120 people. Many employees have already made relocation decisions based on conflicting signals from leadership. Some moved closer to cities; others moved away. A few key people have already started looking at competitors because of uncertainty.

Background: Productivity metrics show no decline in remote work. However, new product ideation (historically high-value output) has decreased 30% since going fully remote. But the company also hired more diverse talent and reduced turnover by 8% by offering flexibility.

Complication: A major client has pushed back on meeting schedules due to timezone complexity. Some teams function better remotely; others (design, sales engineering) feel collaboration is suffering.`,
    learningFocus: ['organizational culture', 'hidden interests', 'data vs perception', 'power dynamics']
  },
  {
    id: '3',
    title: 'Acquisition Integration Crisis',
    context: 'organizational',
    description: 'Larger company acquires competitor; smaller team fears loss of autonomy and layoffs.',
    fullScenarioText: `A 500-person tech company acquires a 50-person startup in the same space. On paper, it's a good fit: complementary products, overlapping markets, some redundant roles.

The acquiring company's leadership says: "This is exciting! We'll integrate your best talent and combine capabilities for a stronger product."

The acquired company's team hears: "Layoffs are coming. Our way of working will be eliminated. We'll be assimilated."

Background: The startup was growing 40% YoY but capital was running out. Founder and early employees negotiated earnouts based on integration success and retention milestones. But the definition of "integration success" is vague.

The acquiring company has a track record: of the last 3 acquisitions, it laid off 20-30% of acquired teams within 18 months. But this time leadership genuinely wants to preserve talent. The problem: no one trusts the stated intentions.

Cultural clash: The startup is informal, rapid iteration, high autonomy. The larger company is process-driven, quarterly planning, structured approval workflows. Neither is wrong; they're genuinely different operating models.`,
    learningFocus: ['trust and credibility', 'culture clash', 'power imbalance', 'uncertainty', 'alignment on values']
  },
  {
    id: '4',
    title: 'Inheritance and Business Legacy',
    context: 'interpersonal',
    description: 'Adult siblings divided on selling vs preserving family business; parent recently passed.',
    fullScenarioText: `Three adult siblings inherited equal stakes in a family manufacturing business (50 years old, $15M annual revenue, highly profitable). Their parent just passed away.

Sibling A (40, operations leader): "We should sell to the larger industrial firm that's made an offer. We'll get $50M, secure everyone's financial future, and avoid the stress of running a business we didn't choose."

Sibling B (38, product innovation): "This business is Mom and Dad's legacy. We have an obligation to keep it going. They built it from nothing. Selling feels like betrayal. Plus, we could grow it—I have ideas for new markets."

Sibling C (35, finance): "I haven't worked here. I have no emotional attachment. But I do care about doing right by the family. I'm open but frustrated that A and B aren't listening to each other."

Complication: The business is healthy but faces a succession challenge. No clear next-generation leader beyond Sibling B. The offer is time-limited (60 days). There's pressure from the bank, vendors, and employees who are anxious about the future. Extended family members have opinions based on their own financial dependencies.`,
    learningFocus: ['family dynamics', 'legacy vs practicality', 'grief', 'hidden resentments', 'generational values']
  },
  {
    id: '5',
    title: 'Co-Parenting School Choice',
    context: 'interpersonal',
    description: 'Ex-partners disagree on school; kids are caught in middle; financial means exist but values conflict.',
    fullScenarioText: `Former couple with two kids (ages 8 and 11) are divorced but share custody. The choice of school for the older child's middle school transition has become a flashpoint.

Parent A (has majority custody): "We should send them to Westridge Academy—it's the #1 school in the state. Rigorous academics, prep for college, connections. Our kids deserve the best start."

Parent B: "Westridge is $35K/year per child. We have money, yes, but it's excessive. Plus, the school is hypercompetitive and anxiety-producing. The public school is excellent AND has strong social-emotional learning programs. Our kids will be happier."

Background: Parent A is a high-achiever (lawyer, Ivy League grad); Parent B is a therapist focused on wellness. Their marriage dissolved partly over these different values. Parent A sees education as path to opportunity; Parent B sees childhood as time to develop resilience and self-worth.

The kids: The 11-year-old has already heard both arguments and is anxious. The 8-year-old will follow big sibling. Both kids like their current school and friends.

Complication: The court order says "mutual agreement on major decisions." If they can't agree, it goes to mediation (costly, stressful). Parent A has been researching schools obsessively; Parent B feels unheard and patronized.`,
    learningFocus: ['different worldviews', 'parental identity', 'child welfare vs parental values', 'financial ethics']
  },
  {
    id: '6',
    title: 'Affordable Housing vs Neighborhood Preservation',
    context: 'community',
    description: 'City wants affordable housing on vacant lot; neighbors fear disruption; developers need project viability.',
    fullScenarioText: `A 2-acre vacant lot in an established neighborhood is zoned for development. The city has identified it as a priority site for 120 units of affordable housing to address a severe shortage (median rent has risen 35% in 5 years).

The developer (hired by the city through an RFP) proposes a 6-story mixed-income building: 60 affordable units, 40 market-rate units (for financial viability), 100 parking spaces, ground-floor retail.

The neighbors (350+ households on adjacent streets) are concerned:
- "Parking will overflow onto our streets. We already have a problem."
- "6 stories doesn't fit the neighborhood character (2-3 story homes)."
- "We're not against affordable housing, but not here. Not this big. Not this fast."
- "Property values will drop. We worked hard to buy here."

The city argues:
- "This is the best site. It's public land (former community center). Moving the project costs time and money we don't have. The housing crisis is now."
- "Affordable housing benefits the entire city—teachers, nurses, service workers can't afford to live here anymore."

The developer argues:
- "The 40 market-rate units are crucial to make the numbers work. We can't do 120 affordable units alone—it's not economically feasible. And I'm taking a risk on a controversial project."

Complication: The neighborhood is majority white, relatively affluent. The affordable units would serve predominantly people of color and lower-income families. Some arguments about "preservation" feel tinged with exclusion, though that's not how neighbors frame it. There are legitimate planning questions mixed with real bias.`,
    learningFocus: ['nimbyism and bias', 'housing justice', 'community identity', 'economic viability', 'public good vs private interest']
  },
  {
    id: '7',
    title: 'Water Rights in Drought',
    context: 'community',
    description: 'Rural farming community vs downstream city; ancient water rights agreements are vague.',
    fullScenarioText: `A river flows through three jurisdictions: Mountain County (rural, farming-based), River County (mixed), and Urban County (the city).

For 80+ years, Mountain County farmers have used river water for irrigation. They operate under an 1887 water rights agreement that's... vague. It says farmers have "prior claim to sufficient water for agricultural purposes." But it doesn't define "sufficient."

Now Urban County is growing rapidly (population up 60% in 15 years). The city needs more water for drinking, sanitation, parks. They've always had excess; now they don't. They're asking Mountain County to reduce agricultural water use by 30%.

Farmers say: "You can recycle wastewater, implement meters, reduce lawn irrigation in suburbs. We feed the region. Water reduction will devastate the harvest, bankrupt farms, destroy our way of life."

City says: "We've done conservation. We've invested $200M in infrastructure. We still fall short. People need to drink and shower. Besides, your 80-year-old agreement predates environmental law, tribal water claims, and ecological flows for fish. It's outdated."

Complication: A historic drought is real. Water levels are 40% below normal. Tribal nations have junior claims but are asserting that environmental flows for fish and indigenous practices deserve priority. Environmental groups argue the river ecosystem is collapsing. Meanwhile, farmers are in growing season and can't just pivot crops.

The state water authority is overwhelmed and hasn't updated regulations in 30 years.`,
    learningFocus: ['resource scarcity', 'historical agreements vs modern needs', 'power imbalance', 'multiple stakeholder claims', 'climate change']
  },
  {
    id: '8',
    title: 'Tech Company and Government Privacy',
    context: 'geopolitical',
    description: 'Tech company collects user data; government wants privacy regulations; mutual distrust.',
    fullScenarioText: `A major tech company (500M+ users globally) collects behavioral data—location, search history, contacts, purchase history—to power its recommendation algorithm and advertising platform. This data is the core of its $200B valuation.

A government (let's say the EU or a national government) is proposing strict privacy regulations: users must explicitly opt-in (not opt-out), data must be encrypted end-to-end, third-party data sales are prohibited, and regulators get audit access.

Tech company position: "These regulations will cripple innovation. Our entire service depends on data insights. Encryption will break personalization. We'll have to move operations and engineering talent to countries with less regulation. And we can't give governments unchecked audit access—that's a security risk and privacy violation for users."

Government position: "You've built a surveillance apparatus. Users don't truly understand what data you're collecting or how it's used. You've proven you can't self-regulate—data breaches, misuse, sale to third parties. Citizens are demanding privacy. We have a mandate to protect them."

Complication: The tech company genuinely believes its data practices are ethical and legally compliant. It donates to privacy causes and has invested in security. But it also has financial incentives to collect maximum data. The government has a point about power imbalance—users can't meaningfully "opt out" of a platform billions rely on.

Meanwhile, authoritarian governments are using this debate to push for even MORE access to user data "for security." Neither the tech company nor the democratic government wants to enable that, but regulation could create precedent.`,
    learningFocus: ['power imbalance', 'innovation vs regulation', 'trust and transparency', 'global stakes', 'conflicting values']
  },
  {
    id: '9',
    title: 'Trade Tariff Negotiation',
    context: 'geopolitical',
    description: 'Two countries negotiate tariffs; both have domestic political pressure.',
    fullScenarioText: `Country A (manufacturing-based) proposes 25% tariffs on Country B's goods, claiming Country B uses unfair labor practices (wages 60% lower) and lax environmental standards.

Country A's position: "Our workers are priced out of competition. You're dumping cheap goods on our market. Workers are losing jobs. We need tariffs to level the playing field and force you to improve labor and environmental standards."

Country B's position: "Our labor costs reflect our economy. Tariffs will raise prices for your consumers, hurt our small exporters, and trigger retaliation. Plus, you're cherry-picking labor issues while ignoring your own supply chain abuses."

Domestic political pressures:
- Country A has an election coming up. Manufacturing voters are angry and demanding protection. Politicians are competing to sound tougher on trade.
- Country B's export industry is 15% of GDP and has powerful lobbying influence. Tariffs would be economically catastrophic for farmers and factories.

Complication: There are real labor and environmental issues in Country B's factories. But tariffs don't necessarily improve working conditions—they may just shift production or cause job losses without raising wages. Country A's domestic manufacturing isn't actually competitive on cost; automation is the real trend, not cheap imports.

Both countries genuinely believe they're in the right. Both face domestic constituencies that won't accept nuance.`,
    learningFocus: ['protectionism vs free trade', 'labor and environmental justice', 'political pressure', 'economic asymmetry', 'zero-sum thinking']
  },
  {
    id: '10',
    title: 'Nonprofit Mission Creep',
    context: 'nonprofit',
    description: 'Board wants to expand focus for funding; founder insists narrow mission is what works.',
    fullScenarioText: `A nonprofit founded 25 years ago focuses exclusively on literacy tutoring for low-income kids in one city. It operates 12 centers, serves 2,000 kids/year, has a 95% high school graduation rate (vs 60% regional average), and has strong community trust. Annual budget: $8M, all from local donors and grants.

The board chair and three new board members argue: "We should expand to three other cities. Literacy is critical, but so is math, science, early childhood. We could be a comprehensive tutoring and mentorship platform. We could raise $30M annually and serve 15,000 kids. Our model works."

The founder (still executive director): "No. Our strength is focus and depth. We know literacy backward and forward. We have relationships. When we've tried math tutoring as a pilot, quality suffered. If we expand, we lose what makes us special. Funders will chase big promises; we'll become a mediocre multi-service organization instead of a world-class literacy one."

Board argument: "You're leaving impact on the table. Other cities have the same problems. Growth is how we maximize our mission."

Founder argument: "Growth is how you maximize revenue and ambition. Our mission is literacy excellence in our city. That's not small; that's focused."

Complication: The founder is aging (close to retirement). The board rightly thinks about succession and sustainability. But the founder built this culture and they're worried that expansion will dilute it. Also, board members have connections to national ed-tech funders who want something bigger and flashier.

Staff is divided. Some want growth and career advancement. Others chose this organization precisely because it was focused and excellent at one thing.`,
    learningFocus: ['mission vs growth', 'founder syndrome', 'organizational identity', 'risk and sustainability', 'stakeholder values']
  }
]

// Helper to get scenario by ID
export function getScenarioById(id: string): ConflictScenario | undefined {
  return CONFLICT_SCENARIOS.find(s => s.id === id)
}

// Helper to get scenarios by context
export function getScenariosByContext(context: string): ConflictScenario[] {
  return CONFLICT_SCENARIOS.filter(s => s.context === context)
}
