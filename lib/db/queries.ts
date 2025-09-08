import { prisma } from './index';

// User queries
export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email }
    });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const createUser = async (userData: {
  email: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
  industry?: string;
  jobTitle?: string;
  bio?: string;
}) => {
  try {
    return await prisma.user.create({
      data: {
        ...userData,
        subscriptionTier: 'starter',
        onboardingCompleted: false
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, updates: Partial<any>) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { ...updates, updatedAt: new Date() }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Organization queries
export const getOrganizationById = async (id: string) => {
  try {
    return await prisma.organization.findUnique({
      where: { id }
    });
  } catch (error) {
    console.error('Error fetching organization by ID:', error);
    return null;
  }
};

export const createOrganization = async (orgData: {
  name: string;
  slug: string;
}) => {
  try {
    return await prisma.organization.create({
      data: {
        ...orgData,
        subscriptionId: null,
        stripeCustomerId: null
      }
    });
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
};

// Post queries
export const getPostsByUserId = async (userId: string) => {
  try {
    return await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching posts by user ID:', error);
    return [];
  }
};

export const getPostsByOrganizationId = async (organizationId: string) => {
  try {
    return await prisma.post.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching posts by organization ID:', error);
    return [];
  }
};

export const createPost = async (postData: {
  userId: string;
  organizationId: string;
  content: string;
  tone: string;
  industry: string;
  status?: string;
  scheduledFor?: Date;
  templateId?: string;
  aiGenerated?: boolean;
}) => {
  try {
    return await prisma.post.create({
      data: {
        ...postData,
        status: postData.status || 'draft',
        aiGenerated: postData.aiGenerated || false
      }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id: string, updates: Partial<any>) => {
  try {
    return await prisma.post.update({
      where: { id },
      data: { ...updates, updatedAt: new Date() }
    });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Subscription queries
export const getSubscriptionByOrganizationId = async (organizationId: string) => {
  try {
    return await prisma.subscription.findFirst({
      where: { organizationId }
    });
  } catch (error) {
    console.error('Error fetching subscription by organization ID:', error);
    return null;
  }
};

export const createSubscription = async (subData: {
  organizationId: string;
  tier: string;
  stripeSubscriptionId?: string;
  aiCreditsLimit: number;
}) => {
  try {
    return await prisma.subscription.create({
      data: subData
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const updateSubscription = async (id: string, updates: Partial<any>) => {
  try {
    return await prisma.subscription.update({
      where: { id },
      data: { ...updates, updatedAt: new Date() }
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// Analytics queries
export const getAnalyticsByPostId = async (postId: string) => {
  try {
    return await prisma.analytics.findFirst({
      where: { postId }
    });
  } catch (error) {
    console.error('Error fetching analytics by post ID:', error);
    return null;
  }
};

export const createAnalytics = async (analyticsData: {
  postId: string;
  linkedinPostId: string;
  impressions?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  clickThroughRate?: string;
}) => {
  try {
    return await prisma.analytics.create({
      data: analyticsData
    });
  } catch (error) {
    console.error('Error creating analytics:', error);
    throw error;
  }
};

// User Settings queries
export const getUserSettings = async (userId: string) => {
  try {
    return await prisma.userSetting.findFirst({
      where: { userId }
    });
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return null;
  }
};

export const createUserSettings = async (userId: string, settings?: Partial<any>) => {
  try {
    return await prisma.userSetting.create({
      data: {
        userId,
        ...settings
      }
    });
  } catch (error) {
    console.error('Error creating user settings:', error);
    throw error;
  }
};

export const updateUserSettings = async (userId: string, updates: Partial<any>) => {
  try {
    return await prisma.userSetting.update({
      where: { userId },
      data: { ...updates, updatedAt: new Date() }
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};

// Team collaboration queries
export const getTeamMembersByOrganizationId = async (organizationId: string) => {
  try {
    return await prisma.teamMember.findMany({
      where: { organizationId },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching team members by organization ID:', error);
    return [];
  }
};

export const createTeamMember = async (memberData: {
  userId: string;
  organizationId: string;
  role: string;
  invitedBy: string;
  permissions?: any;
}) => {
  try {
    return await prisma.teamMember.create({
      data: memberData
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
};

// Draft queries
export const getDraftsByOrganizationId = async (organizationId: string) => {
  try {
    return await prisma.draft.findMany({
      where: { organizationId },
      include: {
        creator: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching drafts by organization ID:', error);
    return [];
  }
};

export const createDraft = async (draftData: {
  postId?: string;
  content: string;
  createdBy: string;
  collaborators?: any;
  approvers?: any;
}) => {
  try {
    return await prisma.draft.create({
      data: draftData
    });
  } catch (error) {
    console.error('Error creating draft:', error);
    throw error;
  }
};

// Notification queries
export const getNotificationsByUserId = async (userId: string) => {
  try {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching notifications by user ID:', error);
    return [];
  }
};

export const createNotification = async (notificationData: {
  userId: string;
  type: string;
  title: string;
  message: string;
  relatedId?: string;
}) => {
  try {
    return await prisma.notification.create({
      data: notificationData
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (id: string) => {
  try {
    return await prisma.notification.update({
      where: { id },
      data: { read: true }
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Dashboard stats queries
export const getDashboardStats = async (userId: string) => {
  try {
    const totalPosts = await prisma.post.count({
      where: { userId }
    });
    
    const scheduledPosts = await prisma.post.count({
      where: {
        userId,
        status: 'scheduled'
      }
    });
    
    return {
      totalPosts,
      scheduledPosts
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalPosts: 0,
      scheduledPosts: 0
    };
  }
};