export interface Template {
  id: string;
  name: string;
  description: string;
  industry: string;
  category: 'thought-leadership' | 'case-study' | 'industry-news' | 'personal-story' | 'tips-advice' | 'company-update';
  tone: 'professional' | 'storytelling' | 'casual' | 'thought-leader';
  structure: string[];
  placeholders: string[];
  estimatedLength: number;
  engagement: 'high' | 'medium' | 'low';
  preview: string;
}

export const TEMPLATE_CATEGORIES = {
  'thought-leadership': 'Thought Leadership',
  'case-study': 'Case Study',
  'industry-news': 'Industry News',
  'personal-story': 'Personal Story',
  'tips-advice': 'Tips & Advice',
  'company-update': 'Company Update'
} as const;

export const AI_TEMPLATES: Template[] = [
  // Technology Templates
  {
    id: 'tech-thought-leadership',
    name: 'Tech Innovation Insights',
    description: 'Share insights on emerging technologies and their business impact',
    industry: 'Technology',
    category: 'thought-leadership',
    tone: 'thought-leader',
    structure: [
      'Hook with industry trend or statistic',
      'Personal perspective or experience',
      'Deep dive into implications',
      'Practical applications',
      'Future predictions',
      'Call to action for discussion'
    ],
    placeholders: ['technology_trend', 'personal_experience', 'business_impact', 'future_prediction'],
    estimatedLength: 3000,
    engagement: 'high',
    preview: 'The [technology_trend] is reshaping how we think about [business_impact]. Here\'s what I\'ve learned from [personal_experience]...'
  },
  {
    id: 'tech-case-study',
    name: 'Technical Case Study',
    description: 'Detailed analysis of a technical implementation or project',
    industry: 'Technology',
    category: 'case-study',
    tone: 'professional',
    structure: [
      'Problem statement',
      'Technical challenges',
      'Solution approach',
      'Implementation details',
      'Results and metrics',
      'Lessons learned',
      'Key takeaways'
    ],
    placeholders: ['project_name', 'technical_challenge', 'solution_approach', 'key_metrics'],
    estimatedLength: 2800,
    engagement: 'high',
    preview: 'How we solved [technical_challenge] at [project_name] and achieved [key_metrics] improvement...'
  },

  // Finance Templates
  {
    id: 'finance-market-analysis',
    name: 'Market Analysis & Trends',
    description: 'In-depth analysis of financial markets and economic trends',
    industry: 'Finance',
    category: 'industry-news',
    tone: 'professional',
    structure: [
      'Market overview and current state',
      'Key driving factors',
      'Historical context and comparisons',
      'Risk assessment',
      'Investment implications',
      'Strategic recommendations',
      'Long-term outlook'
    ],
    placeholders: ['market_sector', 'key_trend', 'risk_factors', 'investment_strategy'],
    estimatedLength: 3200,
    engagement: 'high',
    preview: 'The [market_sector] is experiencing [key_trend]. Here\'s my analysis of what this means for investors...'
  },
  {
    id: 'finance-personal-story',
    name: 'Financial Career Journey',
    description: 'Share personal experiences and lessons from your finance career',
    industry: 'Finance',
    category: 'personal-story',
    tone: 'storytelling',
    structure: [
      'Career milestone or challenge',
      'Initial approach and mindset',
      'Obstacles encountered',
      'Learning moments',
      'Strategy adjustments',
      'Outcomes and results',
      'Advice for others'
    ],
    placeholders: ['career_milestone', 'key_challenge', 'lesson_learned', 'advice'],
    estimatedLength: 2900,
    engagement: 'high',
    preview: 'When I faced [career_milestone], I learned [lesson_learned]. Here\'s what I wish I knew earlier...'
  },

  // Healthcare Templates
  {
    id: 'healthcare-innovation',
    name: 'Healthcare Innovation Spotlight',
    description: 'Highlight breakthrough innovations in healthcare technology',
    industry: 'Healthcare',
    category: 'industry-news',
    tone: 'professional',
    structure: [
      'Innovation introduction',
      'Current healthcare challenges',
      'How the innovation addresses challenges',
      'Clinical evidence and trials',
      'Implementation considerations',
      'Patient impact',
      'Future implications'
    ],
    placeholders: ['innovation_name', 'healthcare_challenge', 'patient_benefit', 'implementation_timeline'],
    estimatedLength: 3100,
    engagement: 'high',
    preview: '[innovation_name] is revolutionizing how we approach [healthcare_challenge], with [patient_benefit] for patients...'
  },

  // Marketing Templates
  {
    id: 'marketing-strategy-guide',
    name: 'Marketing Strategy Deep Dive',
    description: 'Comprehensive guide to modern marketing strategies and tactics',
    industry: 'Marketing',
    category: 'tips-advice',
    tone: 'professional',
    structure: [
      'Strategy overview and importance',
      'Current market landscape',
      'Step-by-step implementation',
      'Tools and resources needed',
      'Common pitfalls to avoid',
      'Success metrics and KPIs',
      'Advanced optimization techniques'
    ],
    placeholders: ['marketing_strategy', 'target_audience', 'key_metrics', 'optimization_tip'],
    estimatedLength: 3000,
    engagement: 'high',
    preview: 'The complete guide to [marketing_strategy] for [target_audience]. Here\'s how to achieve [key_metrics]...'
  },

  // Education Templates
  {
    id: 'education-methodology',
    name: 'Educational Methodology Analysis',
    description: 'Explore innovative teaching methods and educational approaches',
    industry: 'Education',
    category: 'thought-leadership',
    tone: 'professional',
    structure: [
      'Educational challenge or opportunity',
      'Traditional vs. innovative approaches',
      'Research and evidence base',
      'Implementation strategies',
      'Student outcomes and feedback',
      'Scalability considerations',
      'Future of education'
    ],
    placeholders: ['teaching_method', 'educational_challenge', 'student_outcome', 'implementation_strategy'],
    estimatedLength: 2950,
    engagement: 'high',
    preview: 'How [teaching_method] is transforming education by addressing [educational_challenge]...'
  },

  // Consulting Templates
  {
    id: 'consulting-framework',
    name: 'Strategic Framework Analysis',
    description: 'Present strategic frameworks and consulting methodologies',
    industry: 'Consulting',
    category: 'tips-advice',
    tone: 'thought-leader',
    structure: [
      'Business challenge introduction',
      'Framework overview and components',
      'Step-by-step application process',
      'Real-world case examples',
      'Common implementation challenges',
      'Success factors and best practices',
      'Measurable outcomes'
    ],
    placeholders: ['business_challenge', 'framework_name', 'case_example', 'success_metric'],
    estimatedLength: 3150,
    engagement: 'high',
    preview: 'The [framework_name] approach to solving [business_challenge]. Here\'s how we achieved [success_metric]...'
  },

  // Real Estate Templates
  {
    id: 'realestate-market-insights',
    name: 'Real Estate Market Insights',
    description: 'Analyze real estate market trends and investment opportunities',
    industry: 'Real Estate',
    category: 'industry-news',
    tone: 'professional',
    structure: [
      'Market overview and current conditions',
      'Key trend analysis',
      'Geographic considerations',
      'Investment opportunities',
      'Risk factors and mitigation',
      'Buyer/seller implications',
      'Market predictions'
    ],
    placeholders: ['market_location', 'key_trend', 'investment_opportunity', 'market_prediction'],
    estimatedLength: 2850,
    engagement: 'medium',
    preview: 'The [market_location] real estate market is showing [key_trend]. Here\'s what investors need to know...'
  },

  // Manufacturing Templates
  {
    id: 'manufacturing-efficiency',
    name: 'Manufacturing Efficiency Case Study',
    description: 'Share operational improvements and efficiency gains in manufacturing',
    industry: 'Manufacturing',
    category: 'case-study',
    tone: 'professional',
    structure: [
      'Operational challenge description',
      'Current state analysis',
      'Improvement methodology',
      'Implementation timeline',
      'Technology and tools used',
      'Results and ROI',
      'Scalability and next steps'
    ],
    placeholders: ['operational_challenge', 'improvement_method', 'roi_percentage', 'technology_used'],
    estimatedLength: 2750,
    engagement: 'medium',
    preview: 'How we improved [operational_challenge] using [improvement_method] and achieved [roi_percentage] ROI...'
  },

  // Retail Templates
  {
    id: 'retail-customer-experience',
    name: 'Customer Experience Innovation',
    description: 'Explore customer experience strategies and retail innovations',
    industry: 'Retail',
    category: 'tips-advice',
    tone: 'storytelling',
    structure: [
      'Customer experience challenge',
      'Traditional retail approach',
      'Innovative solution development',
      'Customer feedback and testing',
      'Implementation across channels',
      'Business impact and metrics',
      'Future customer expectations'
    ],
    placeholders: ['cx_challenge', 'innovative_solution', 'customer_feedback', 'business_impact'],
    estimatedLength: 2900,
    engagement: 'high',
    preview: 'Transforming [cx_challenge] with [innovative_solution] led to [business_impact] in customer satisfaction...'
  },

  // Non-profit Templates
  {
    id: 'nonprofit-impact-story',
    name: 'Impact Story & Mission',
    description: 'Share compelling stories about non-profit impact and mission work',
    industry: 'Non-profit',
    category: 'personal-story',
    tone: 'storytelling',
    structure: [
      'Mission statement and purpose',
      'Community challenge addressed',
      'Program or initiative details',
      'Beneficiary stories and testimonials',
      'Measurable impact and outcomes',
      'Community partnerships',
      'Call to action for support'
    ],
    placeholders: ['mission_focus', 'community_challenge', 'impact_metric', 'call_to_action'],
    estimatedLength: 2800,
    engagement: 'high',
    preview: 'Our work in [mission_focus] has helped address [community_challenge], achieving [impact_metric]...'
  }
];

export const getTemplatesByIndustry = (industry: string): Template[] => {
  return AI_TEMPLATES.filter(template => template.industry === industry);
};

export const getTemplatesByCategory = (category: string): Template[] => {
  return AI_TEMPLATES.filter(template => template.category === category);
};

export const getTemplateById = (id: string): Template | undefined => {
  return AI_TEMPLATES.find(template => template.id === id);
};

export const generateContentFromTemplate = (
  template: Template, 
  customizations: Record<string, string>
): string => {
  // This would integrate with OpenAI in production
  // For now, return a mock generated post based on the template
  
  let content = template.preview;
  
  // Replace placeholders with customizations
  template.placeholders.forEach(placeholder => {
    const value = customizations[placeholder] || `[${placeholder}]`;
    content = content.replace(new RegExp(`\\[${placeholder}\\]`, 'g'), value);
  });

  // Generate full content based on template structure
  const sections = template.structure.map((section, index) => {
    switch (section.toLowerCase()) {
      case 'hook with industry trend or statistic':
        return `🚀 **${customizations.technology_trend || 'Industry Innovation'}**\n\nThe latest data shows that ${customizations.business_impact || 'significant transformation'} is happening faster than ever before. According to recent studies, companies that embrace this change are seeing remarkable results.`;
      
      case 'personal perspective or experience':
        return `💭 **My Experience**\n\nHaving worked in this space for several years, I've witnessed firsthand how ${customizations.personal_experience || 'this transformation'} has evolved. Last month, I had a conversation with a colleague that completely shifted my perspective on this topic.`;
      
      case 'deep dive into implications':
        return `🔍 **The Deeper Impact**\n\nWhat many people don't realize is that this goes far beyond surface-level changes. The implications touch every aspect of how we work, collaborate, and deliver value to our customers. Here's what I've observed:\n\n• Strategic shifts in organizational priorities\n• New skill requirements for professionals\n• Evolving customer expectations and behaviors\n• Technology adoption acceleration`;
      
      case 'practical applications':
        return `⚡ **Real-World Applications**\n\nLet me share some concrete examples of how this is being implemented:\n\n1. **Process Optimization**: Companies are streamlining workflows and reducing manual tasks by 40-60%\n\n2. **Customer Experience**: Enhanced personalization leading to 25% higher satisfaction scores\n\n3. **Decision Making**: Data-driven insights enabling faster, more accurate strategic decisions\n\n4. **Innovation Cycles**: Reduced time-to-market for new products and services`;
      
      case 'future predictions':
        return `🔮 **Looking Ahead**\n\n${customizations.future_prediction || 'The next 12-18 months'} will be critical for organizations that want to stay competitive. I predict we'll see:\n\n• Increased investment in automation and AI capabilities\n• Greater emphasis on employee reskilling and development\n• More strategic partnerships and ecosystem thinking\n• Shift towards outcome-based business models`;
      
      case 'call to action for discussion':
        return `💬 **Let's Discuss**\n\nI'm curious about your experiences with this transformation. Have you seen similar trends in your industry? What challenges or opportunities are you navigating?\n\nShare your thoughts in the comments below - I read and respond to every one!\n\n#Innovation #DigitalTransformation #FutureOfWork #Technology #Leadership #Strategy #BusinessGrowth #ProfessionalDevelopment #IndustryTrends #ThoughtLeadership`;
      
      default:
        return `**${section}**\n\nThis section would contain detailed content about ${section.toLowerCase()}, providing valuable insights and actionable information for the reader.`;
    }
  }).join('\n\n');

  return sections;
};