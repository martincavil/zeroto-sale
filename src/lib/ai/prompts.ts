export interface ProjectContext {
  problem: string
  target: string
  name?: string | null
}

export function buildPrompt(step: number, ctx: ProjectContext): string {
  const base = `You are helping a SaaS builder launch their first product.

Their SaaS:
- Problem: ${ctx.problem}
- Target: ${ctx.target}
${ctx.name ? `- Name/URL: ${ctx.name}` : ""}

Be specific, actionable, and tailored to THEIR exact product. Never be generic.
Format output in clean markdown. Use real examples, real community names, real platform names.`

  const stepPrompts: Record<number, string> = {
    1: `${base}

Generate:
1. **ICP (Ideal Customer Profile)** — A vivid 1-paragraph description of their perfect customer. Name them (e.g. "Meet Sarah, a 32-year-old freelance designer..."). Include: job, frustrations, daily workflow, where they hang out online, what they've already tried.

2. **Competitive Advantage** — 3 bullet points explaining why their approach beats existing solutions. Be blunt and specific.

3. **The 10 Online Spots** — List exactly 10 places online where their target hangs out: subreddits, Discord servers, Facebook groups, Twitter communities, forums, Slack groups, newsletters. Include the platform name and URL/handle.

4. **Top 5 Competitors** — Table with: Name | Main weakness | How to beat them`,

    2: `${base}

Generate:
1. **5 Community Posts** — Ready-to-post content for 5 different communities (name each community). Each post must: describe the problem (NOT the product), ask for feedback, end with a question. ~150 words each.

2. **30 DM Templates** — 5 different DM templates (each to be used 6x) for different platforms (Twitter, Reddit, LinkedIn, Discord, etc.). Each template: personalized opener, problem acknowledgment, 1 question. Max 100 words.

3. **Target @Handles & Communities** — List 20 specific people/accounts to DM first (based on the target profile). Explain why each one.`,

    3: `${base}

Generate complete landing page copy:

1. **Hero** — Headline (max 8 words), subheadline (max 20 words), CTA button text

2. **Problem Section** — 3 pain points in the customer's own words

3. **Solution Section** — How it works (3 steps max)

4. **Social Proof** — 2 fake-but-realistic testimonials (will be replaced with real ones)

5. **Pricing** — Simple pricing block copy

6. **FAQ** — 4 questions + answers

7. **Footer CTA** — Last chance conversion copy

Write in 2nd person ("you"), conversational tone, no buzzwords.`,

    4: `${base}

Generate:
1. **10 Community Posts** — Different from the validation posts. Each one: share a learning, ask for feedback on the landing, or share a build-in-public update. Name the community for each post.

2. **30 Outreach DMs** — For people who saw the landing but didn't sign up. Subject: check in, add value, not sell.

3. **Show HN Post** — Full text for a "Show HN" submission (title + body)

4. **ProductHunt Ship** — Tagline + description for a ProductHunt Ship post`,

    5: `${base}

Generate a technical build plan:

1. **The 1 Core Feature** — Define the absolute minimum feature that delivers value. Be opinionated. Say what NOT to build.

2. **Database Schema** — Supabase tables needed (PostgreSQL). Include: table name, columns, types, relationships.

3. **API Routes** — List all Next.js API routes needed for the MVP. Method, path, what it does.

4. **Build Order** — Day-by-day plan to ship in 7 days. Be realistic.

5. **Stripe Setup** — Exact products/prices to create in Stripe dashboard.`,

    6: `${base}

Generate:
1. **Early Bird Email Sequence** — 3 emails:
   - Email 1 (Day 0): Launch announcement to waitlist. Subject + body.
   - Email 2 (Day 3): Follow-up for non-openers. Subject + body.
   - Email 3 (Day 7): Last chance. Subject + body.

2. **Discovery Call Script** — 15-minute call structure for talking to waitlisters. Opening, 5 questions to ask, how to close, objection handling.

3. **Early Bird Offer** — Suggested discount/bonus to incentivize first buyers. Why this offer works for their specific product.`,

    7: `${base}

They just made their first sale! Generate:

1. **Personal Thank You Message** — A genuine, non-corporate message to send directly to the first customer. Warm, founder-to-customer.

2. **Public Announcement** — Twitter/X thread (5 tweets) sharing the milestone. Include: what the product does, the journey, gratitude, what's next. Make it inspiring and authentic.

3. **Substack Post Outline** — Outline for a build-in-public post about getting to first sale.`,
  }

  return stepPrompts[step] || base
}
