export const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'Starter',
    price: 0,
    aiCreditsLimit: 5,
    scheduledPostsLimit: 10,
    features: [
      '5 AI-generated posts per month',
      'Basic scheduling',
      'LinkedIn analytics',
      'Email support'
    ]
  },
  professional: {
    name: 'Professional', 
    price: 29,
    aiCreditsLimit: 50,
    scheduledPostsLimit: 100,
    features: [
      '50 AI-generated posts per month',
      'Advanced scheduling',
      'Detailed analytics',
      'Content calendar',
      'Priority support'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    aiCreditsLimit: -1, // unlimited
    scheduledPostsLimit: -1, // unlimited
    features: [
      'Unlimited AI-generated posts',
      'Team collaboration',
      'Advanced analytics',
      'Custom branding',
      'Dedicated support'
    ]
  }
} as const;

export const CONTENT_TONES = {
  professional: 'Professional',
  storytelling: 'Storytelling',
  casual: 'Casual',
  'thought-leader': 'Thought Leader'
} as const;

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Marketing',
  'Education',
  'Consulting',
  'Real Estate',
  'Manufacturing',
  'Retail',
  'Non-profit'
] as const;

export const POST_STATUSES = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  published: 'Published',
  failed: 'Failed'
} as const;

export const TEAM_ROLES = {
  admin: {
    name: 'Admin',
    description: 'Full access to all features and settings',
    permissions: {
      canEdit: true,
      canComment: true,
      canApprove: true,
      canInvite: true
    }
  },
  editor: {
    name: 'Editor',
    description: 'Can create and edit content',
    permissions: {
      canEdit: true,
      canComment: true,
      canApprove: false,
      canInvite: false
    }
  },
  approver: {
    name: 'Approver',
    description: 'Can approve content for publishing',
    permissions: {
      canEdit: false,
      canComment: true,
      canApprove: true,
      canInvite: false
    }
  },
  viewer: {
    name: 'Viewer',
    description: 'Can view and comment on content',
    permissions: {
      canEdit: false,
      canComment: true,
      canApprove: false,
      canInvite: false
    }
  }
} as const;

export const NOTIFICATION_TYPES = {
  comment: 'New Comment',
  approval_request: 'Approval Request',
  approval_granted: 'Content Approved',
  draft_shared: 'Draft Shared',
  mention: 'You were mentioned'
} as const;