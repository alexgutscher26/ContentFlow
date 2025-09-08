export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId: string;
  linkedinToken?: string;
  subscriptionTier: 'starter' | 'professional' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  subscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  organizationId: string;
  content: string;
  tone: 'professional' | 'storytelling' | 'casual' | 'thought-leader';
  industry: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: Date;
  publishedAt?: Date;
  linkedinPostId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  organizationId: string;
  stripeSubscriptionId: string;
  tier: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  id: string;
  postId: string;
  linkedinPostId: string;
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  clickThroughRate: number;
  recordedAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  organizationId: string;
  role: 'admin' | 'editor' | 'viewer' | 'approver';
  invitedBy: string;
  invitedAt: Date;
  status: 'pending' | 'active' | 'inactive';
  permissions: {
    canEdit: boolean;
    canComment: boolean;
    canApprove: boolean;
    canInvite: boolean;
  };
}

export interface Draft {
  id: string;
  postId: string;
  content: string;
  version: number;
  createdBy: string;
  status: 'draft' | 'in_review' | 'approved' | 'rejected';
  collaborators: string[];
  approvers: string[];
  approvedBy?: string;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  draftId: string;
  userId: string;
  content: string;
  type: 'comment' | 'suggestion' | 'approval_request';
  position?: {
    start: number;
    end: number;
  };
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'comment' | 'approval_request' | 'approval_granted' | 'draft_shared' | 'mention';
  title: string;
  message: string;
  relatedId: string; // draftId, commentId, etc.
  read: boolean;
  createdAt: Date;
}

export interface ContentGenerationRequest {
  topic: string;
  tone: 'professional' | 'storytelling' | 'casual' | 'thought-leader';
  industry: string;
  userId: string;
  organizationId: string;
}

export interface SchedulePostRequest {
  content: string;
  scheduledFor: Date;
  userId: string;
  organizationId: string;
}