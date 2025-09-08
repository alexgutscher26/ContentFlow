export interface InspirationPost {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    followers: number;
  };
  content: string;
  category: string[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  publishedAt: string;
  platform: 'linkedin';
  url: string;
  tags: string[];
}

export const INSPIRATION_CATEGORIES = {
  marketing: 'Marketing',
  entrepreneurship: 'Entrepreneurship',
  technology: 'Technology',
  leadership: 'Leadership',
  finance: 'Finance',
  healthcare: 'Healthcare',
  education: 'Education',
  consulting: 'Consulting',
  sales: 'Sales',
  productivity: 'Productivity',
  career: 'Career Development',
  innovation: 'Innovation'
} as const;

export type InspirationCategory = keyof typeof INSPIRATION_CATEGORIES;

// Mock inspiration posts - in production, these would come from your API
export const MOCK_INSPIRATION_POSTS: InspirationPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      title: 'VP of Marketing at TechCorp',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 15000
    },
    content: `The biggest marketing mistake I see companies make? 

Trying to be everywhere at once.

I learned this the hard way when I was leading marketing at a startup. We were posting on 8 different platforms, running 12 different campaigns, and spreading our team so thin that nothing was getting the attention it deserved.

Our engagement was mediocre across the board.

Then we made a radical decision: we picked 2 platforms and went all-in.

The results? 
→ 300% increase in engagement
→ 150% more qualified leads  
→ 50% reduction in marketing costs

Sometimes less really is more.

What's one thing you stopped doing that actually improved your results?`,
    category: ['marketing', 'entrepreneurship'],
    engagement: {
      likes: 1247,
      comments: 89,
      shares: 156,
      views: 12500
    },
    publishedAt: '2024-11-15T09:30:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/sarah-chen-marketing',
    tags: ['marketing strategy', 'focus', 'startup lessons']
  },
  {
    id: '2',
    author: {
      name: 'Marcus Johnson',
      title: 'CEO & Founder at InnovateLab',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 28000
    },
    content: `Leadership isn't about having all the answers.

It's about asking the right questions.

Yesterday, during our quarterly review, instead of presenting solutions, I asked my team:

"What would you do if you were running this company?"

The room went quiet for a moment. Then something magical happened.

Ideas started flowing:
• A junior developer suggested a feature that could save us 6 months of development
• Our newest hire identified a market opportunity we'd completely missed
• Someone from accounting proposed a cost-saving measure worth $200K annually

The best leaders don't just solve problems—they create environments where everyone feels empowered to contribute solutions.

Your team has more answers than you think. Sometimes you just need to ask.

What's the best idea that came from an unexpected source in your organization?`,
    category: ['leadership', 'entrepreneurship'],
    engagement: {
      likes: 2156,
      comments: 134,
      shares: 298,
      views: 18700
    },
    publishedAt: '2024-10-22T14:15:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/marcus-johnson-ceo',
    tags: ['leadership', 'team empowerment', 'innovation']
  },
  {
    id: '3',
    author: {
      name: 'Dr. Emily Rodriguez',
      title: 'Chief Technology Officer at HealthTech Solutions',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 22000
    },
    content: `The future of healthcare isn't in hospitals—it's in your pocket.

Last week, I witnessed something that perfectly illustrates this shift:

A 78-year-old patient used a smartphone app to:
✅ Monitor her blood pressure
✅ Track medication adherence  
✅ Schedule virtual consultations
✅ Share data with her care team

The result? Better health outcomes and 60% fewer emergency room visits.

This isn't science fiction. It's happening right now.

The convergence of AI, IoT, and mobile technology is creating unprecedented opportunities to deliver personalized, accessible healthcare at scale.

But here's the challenge: we need to ensure these innovations reach everyone, not just the tech-savvy.

The real measure of success in digital health isn't how advanced our technology is—it's how many lives we improve.

What role do you think technology should play in the future of healthcare?`,
    category: ['technology', 'healthcare', 'innovation'],
    engagement: {
      likes: 1834,
      comments: 167,
      shares: 203,
      views: 15600
    },
    publishedAt: '2024-12-03T11:45:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/dr-emily-rodriguez',
    tags: ['digital health', 'innovation', 'patient care']
  },
  {
    id: '4',
    author: {
      name: 'David Park',
      title: 'Senior Financial Analyst at Global Investments',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 12000
    },
    content: `The most expensive financial advice I ever received was free.

"Just put your money in index funds and forget about it."

While this isn't terrible advice for beginners, it cost me $47,000 in missed opportunities over 5 years.

Here's what I learned about building wealth that no one talks about:

1️⃣ **Diversification isn't just about asset classes**
It's about income streams, geographic exposure, and time horizons. I now have investments across 4 different time zones and 6 different sectors.

2️⃣ **The 1% rule compounds differently than you think**
Small improvements in investment selection, tax optimization, and fee reduction create exponential differences over time. A 1% annual improvement on a $100K portfolio equals $67,000 over 20 years.

3️⃣ **Your biggest risk isn't market volatility**
It's inflation and lifestyle inflation. The money sitting in your savings account is losing purchasing power every day.

4️⃣ **Time in the market beats timing the market**
But understanding market cycles beats both. Learning to recognize patterns helped me avoid major losses in 2022 and capitalize on opportunities in 2023.

The financial education system teaches us to be consumers, not investors. 

Real wealth building starts when you stop following generic advice and start creating a strategy tailored to your specific situation, goals, and risk tolerance.

What's one financial lesson you wish you'd learned earlier?`,
    category: ['finance', 'career'],
    engagement: {
      likes: 3421,
      comments: 245,
      shares: 412,
      views: 28900
    },
    publishedAt: '2024-09-18T16:20:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/david-park-finance',
    tags: ['investing', 'wealth building', 'financial planning']
  },
  {
    id: '5',
    author: {
      name: 'Lisa Thompson',
      title: 'Head of Sales at CloudScale',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 18500
    },
    content: `I just lost a $500K deal.

And I'm celebrating.

Here's why:

The prospect wanted us to cut our price by 40% and remove half of our core features. They wanted a "basic version" that would essentially be a completely different product.

Two years ago, I would have said yes. I would have bent over backwards to close the deal, even if it meant compromising our value proposition and setting unrealistic expectations.

But I've learned something important: not every deal is a good deal.

This prospect wasn't looking for a partner—they were looking for a vendor. They didn't value our expertise, our innovation, or our track record. They just wanted the cheapest option.

By walking away, I:
✅ Protected our brand positioning
✅ Freed up resources for better-fit prospects  
✅ Maintained pricing integrity for other clients
✅ Avoided a potentially problematic customer relationship

The best salespeople don't just close deals—they close the RIGHT deals.

Sometimes the most profitable thing you can do is say no.

Have you ever walked away from a deal that didn't feel right? What happened?`,
    category: ['sales', 'leadership', 'entrepreneurship'],
    engagement: {
      likes: 2789,
      comments: 198,
      shares: 334,
      views: 21400
    },
    publishedAt: '2024-08-07T13:10:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/lisa-thompson-sales',
    tags: ['sales strategy', 'qualification', 'value selling']
  },
  {
    id: '6',
    author: {
      name: 'Alex Kumar',
      title: 'Productivity Coach & Author',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 35000
    },
    content: `I tracked my productivity for 90 days. Here's what I discovered:

📊 **The Data:**
• Most productive hours: 6-9 AM (before emails)
• Biggest time wasters: Unnecessary meetings (4.2 hours/week)
• Peak focus duration: 52 minutes (then 10-minute break needed)
• Best days: Tuesday & Wednesday
• Worst days: Monday & Friday

🔍 **The Surprising Insights:**

1. **Multitasking is a myth**
When I focused on one task at a time, I completed 67% more work in the same timeframe.

2. **Email is an addiction**
I checked email 127 times per day on average. When I limited it to 3 scheduled times, my deep work increased by 3 hours daily.

3. **Environment matters more than motivation**
Changing my workspace setup increased productivity by 23% without any other changes.

4. **The 2-minute rule is gold**
Tasks under 2 minutes: do immediately. This eliminated 80% of my mental clutter.

5. **Energy management > Time management**
Scheduling demanding tasks during my natural energy peaks was more impactful than any time-blocking technique.

⚡ **The Game-Changer:**

The single most effective change? Turning off ALL notifications during focus blocks.

No Slack, no email, no phone. Just me and the work.

Result: 4x improvement in deep work quality and 50% faster task completion.

Your phone isn't just distracting you—it's training your brain to crave interruption.

What's one productivity habit that completely changed your work life?`,
    category: ['productivity', 'career'],
    engagement: {
      likes: 4567,
      comments: 312,
      shares: 578,
      views: 34200
    },
    publishedAt: '2024-07-12T08:00:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/alex-kumar-productivity',
    tags: ['productivity', 'time management', 'focus']
  },
  {
    id: '7',
    author: {
      name: 'Rachel Green',
      title: 'Innovation Director at FutureTech',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 19500
    },
    content: `Innovation isn't about having brilliant ideas.

It's about executing average ideas brilliantly.

Last year, our team was tasked with improving customer onboarding. Everyone expected us to develop some groundbreaking new technology.

Instead, we did something simple:

We called 100 customers and asked them about their experience.

What we discovered wasn't revolutionary—it was obvious:

• 73% got confused during step 3 of our setup process
• 45% didn't understand our pricing structure  
• 62% wanted more hands-on support in the first week
• 89% said they would recommend us IF they could get through onboarding successfully

The solution wasn't innovative technology. It was:
✅ Rewriting confusing instructions in plain English
✅ Creating a simple pricing calculator
✅ Adding live chat support for new users
✅ Sending personalized check-in emails

Cost to implement: $12,000
Result: 340% improvement in customer retention

The most innovative thing you can do is solve real problems for real people.

Stop looking for the next big breakthrough. Start looking for the obvious problems everyone else is ignoring.

What "obvious" problem in your industry is everyone overlooking?`,
    category: ['innovation', 'entrepreneurship', 'leadership'],
    engagement: {
      likes: 2934,
      comments: 187,
      shares: 267,
      views: 19800
    },
    publishedAt: '2024-06-28T15:30:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/rachel-green-innovation',
    tags: ['customer experience', 'problem solving', 'execution']
  },
  {
    id: '8',
    author: {
      name: 'James Wilson',
      title: 'Senior Software Engineer at DataFlow',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 8500
    },
    content: `Code review changed my career.

Not writing code. Not shipping features. Code review.

Here's why:

When I started as a junior developer, I dreaded code reviews. They felt like judgment sessions where senior developers would tear apart my work.

But my mentor, Sarah, changed my perspective with one simple question:

"What if code review wasn't about finding problems, but about sharing knowledge?"

She taught me to approach every review as a learning opportunity:

🔍 **What I learned from reviewing others' code:**
• Different approaches to solving the same problem
• Performance optimization techniques I'd never considered
• Design patterns that made code more maintainable
• Testing strategies that caught edge cases

📝 **What I learned from having my code reviewed:**
• How to write code that tells a story
• The importance of clear variable names and comments
• When to refactor and when to ship
• How to balance perfectionism with pragmatism

💡 **The unexpected benefit:**

Code review made me a better communicator. Learning to explain my technical decisions clearly improved how I interact with product managers, designers, and stakeholders.

Now, as a senior engineer, I see code review as mentorship in action. Every review is a chance to help someone grow while improving our codebase.

The developers who embrace code review as learning accelerate their careers faster than those who see it as criticism.

Your code will be reviewed. Your attitude about that review will shape your growth.

What's the most valuable lesson you learned from a code review?`,
    category: ['technology', 'career'],
    engagement: {
      likes: 1876,
      comments: 143,
      shares: 89,
      views: 14200
    },
    publishedAt: '2024-05-14T10:45:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/james-wilson-dev',
    tags: ['software development', 'mentorship', 'career growth']
  },
  {
    id: '9',
    author: {
      name: 'Maria Santos',
      title: 'Learning & Development Manager at EduCorp',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 11200
    },
    content: `The education system is broken. But not in the way you think.

Everyone talks about outdated curricula and teaching methods. Those are symptoms, not the disease.

The real problem? We're teaching students to be employees in a world that needs entrepreneurs.

I've spent 15 years in corporate training, and here's what I've observed:

🎓 **What schools teach:**
• Follow instructions precisely
• There's one right answer
• Failure is bad
• Work alone
• Memorize information

🚀 **What the modern workplace needs:**
• Question assumptions
• Find creative solutions
• Learn from failure
• Collaborate effectively
• Apply knowledge contextually

The gap is enormous.

But here's the good news: forward-thinking educators are already bridging this gap.

Last month, I visited a high school where students were:
• Running actual businesses as part of their economics class
• Solving real community problems through project-based learning
• Learning coding by building apps for local nonprofits
• Developing communication skills through peer teaching

These students aren't just learning subjects—they're developing capabilities.

The future belongs to learners, not knowers. And the best learning happens when education mirrors real-world challenges.

How do you think we can better prepare students for the future of work?`,
    category: ['education', 'innovation', 'career'],
    engagement: {
      likes: 2145,
      comments: 201,
      shares: 156,
      views: 16800
    },
    publishedAt: '2024-04-09T12:20:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/maria-santos-education',
    tags: ['education reform', 'future of work', 'skill development']
  },
  {
    id: '10',
    author: {
      name: 'Robert Kim',
      title: 'Management Consultant at Strategy Partners',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 12000
    },
    content: `The best strategy session I ever facilitated had no PowerPoint slides.

Instead, I walked into the boardroom with:
• 200 sticky notes
• 12 markers  
• 1 simple question

"What would our customers say is our biggest weakness?"

For the next 3 hours, the executive team wrote, discussed, and organized ideas without a single slide deck.

The breakthrough came when the CEO realized they'd been solving the wrong problem for 18 months.

They thought their challenge was pricing. It was actually positioning.

They thought they needed better features. They needed better communication.

They thought they were losing to competitors. They were losing to customer confusion.

💡 **The lesson:**

Sometimes the most sophisticated tool you can use is a conversation.

The best strategies emerge from honest dialogue, not elaborate presentations.

Your customers have already told you what you need to know. The question is: are you listening?

What's the most valuable insight you've gained from simply asking customers what they think?`,
    category: ['consulting', 'leadership', 'entrepreneurship'],
    engagement: {
      likes: 1654,
      comments: 98,
      shares: 134,
      views: 13200
    },
    publishedAt: '2024-03-25T09:15:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/robert-kim-consulting',
    tags: ['strategy', 'customer feedback', 'consulting']
  },
  {
    id: '11',
    author: {
      name: 'Jennifer Walsh',
      title: 'Digital Marketing Director at GrowthCo',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 14500
    },
    content: `I spent $50,000 on marketing last year.

Here's what I learned about what actually works:

❌ **What didn't work:**
• Expensive display ads: 0.02% CTR
• Generic email campaigns: 1.2% open rate
• Influencer partnerships: No measurable ROI
• Trade show booths: 3 qualified leads for $15K

✅ **What crushed it:**
• Customer success stories: 45% conversion rate
• Employee-generated content: 8x more engagement
• Webinar series: $200K in pipeline
• Referral program: 60% of new customers

The biggest revelation? Our best marketing content came from our customers and employees, not expensive agencies.

People trust people, not brands.

The most effective marketing strategy isn't about reaching more people—it's about reaching the right people with authentic stories.

What's the most effective (and cost-efficient) marketing tactic you've discovered?`,
    category: ['marketing', 'entrepreneurship'],
    engagement: {
      likes: 2341,
      comments: 156,
      shares: 289,
      views: 19700
    },
    publishedAt: '2024-02-14T11:00:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/jennifer-walsh-marketing',
    tags: ['marketing ROI', 'customer stories', 'authentic marketing']
  },
  {
    id: '12',
    author: {
      name: 'Dr. Michael Torres',
      title: 'Chief Medical Officer at HealthInnovate',
      avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      followers: 18900
    },
    content: `Yesterday, I saved a life with a smartphone.

Not directly—but the technology made it possible.

A patient in rural Montana was experiencing chest pain. The nearest hospital was 2 hours away. Using our telemedicine platform, I was able to:

📱 Review her symptoms via video call
📊 Analyze her vitals through connected devices
🚑 Coordinate with local EMS for immediate transport
💊 Prescribe emergency medication en route

She's alive today because technology eliminated distance as a barrier to care.

This is the future of healthcare: not replacing human connection, but amplifying human capability.

The most advanced medical technology in the world is meaningless if it can't reach the people who need it most.

We're not just building better tools—we're building bridges to better health outcomes for everyone, everywhere.

What role do you think technology should play in making healthcare more accessible?`,
    category: ['healthcare', 'technology', 'innovation'],
    engagement: {
      likes: 3156,
      comments: 234,
      shares: 445,
      views: 25600
    },
    publishedAt: '2024-01-22T08:30:00Z',
    platform: 'linkedin',
    url: 'https://linkedin.com/posts/dr-michael-torres',
    tags: ['telemedicine', 'healthcare access', 'rural healthcare']
  }
];

export const getInspirationPosts = (
  categories: InspirationCategory[] = [],
  limit: number = 10
): InspirationPost[] => {
  let filteredPosts = MOCK_INSPIRATION_POSTS;

  if (categories.length > 0) {
    filteredPosts = MOCK_INSPIRATION_POSTS.filter(post =>
      post.category.some(cat => categories.includes(cat as InspirationCategory))
    );
  }

  // Shuffle and return limited results
  const shuffled = [...filteredPosts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
};

export const getRandomInspirationPosts = (limit: number = 10): InspirationPost[] => {
  const shuffled = [...MOCK_INSPIRATION_POSTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
};

export const searchInspirationPosts = (
  query: string,
  categories: InspirationCategory[] = []
): InspirationPost[] => {
  let posts = categories.length > 0 
    ? getInspirationPosts(categories, MOCK_INSPIRATION_POSTS.length)
    : MOCK_INSPIRATION_POSTS;

  if (!query.trim()) return posts;

  const searchTerms = query.toLowerCase().split(' ');
  
  return posts.filter(post => {
    const searchableText = `
      ${post.content} 
      ${post.author.name} 
      ${post.author.title} 
      ${post.tags.join(' ')}
    `.toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
};