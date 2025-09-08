// Authentication utilities for ContentFlow
// In production, integrate with Clerk or your preferred auth provider

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
  subscriptionTier: string;
  onboardingCompleted: boolean;
}

// Mock authentication for development
// Replace with actual auth provider integration in production
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  // In production, get user from Clerk or your auth provider
  // For now, return a mock user for development
  return {
    id: 'user_1',
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    organizationId: 'org_1',
    subscriptionTier: 'professional',
    onboardingCompleted: true
  };
};

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  // Mock sign in - integrate with your auth provider
  return {
    id: 'user_1',
    email,
    firstName: 'John',
    lastName: 'Doe',
    organizationId: 'org_1',
    subscriptionTier: 'starter',
    onboardingCompleted: false
  };
};

export const signUp = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
}): Promise<AuthUser> => {
  // Mock sign up - integrate with your auth provider
  return {
    id: 'user_new',
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    subscriptionTier: 'starter',
    onboardingCompleted: false
  };
};

export const signOut = async (): Promise<void> => {
  // Mock sign out - integrate with your auth provider
  return;
};

// LinkedIn OAuth utilities
export const initiateLinkedInOAuth = async (): Promise<string> => {
  // In production, generate actual LinkedIn OAuth URL
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || 'mock_client_id';
  const redirectUri = encodeURIComponent(`${window.location.origin}/auth/linkedin/callback`);
  const scope = encodeURIComponent('r_liteprofile w_member_social');
  const state = Math.random().toString(36).substring(7);
  
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
};

export const handleLinkedInCallback = async (code: string, state: string): Promise<{
  accessToken: string;
  profile: any;
}> => {
  // In production, exchange code for access token and fetch profile
  // Mock response for development
  return {
    accessToken: 'mock_linkedin_token',
    profile: {
      id: 'linkedin_user_id',
      firstName: 'John',
      lastName: 'Doe',
      profilePicture: 'https://media.licdn.com/dms/image/...',
      headline: 'Senior Marketing Manager at TechCorp'
    }
  };
};