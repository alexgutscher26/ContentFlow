const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database seeding...');
    
    // Execute seeding functions in order to maintain referential integrity
    await seedOrganizations(prisma);
    await seedUsers(prisma);
    await seedSubscriptions(prisma);
    await seedPosts(prisma);
    await seedAnalytics(prisma);
    await seedTeamMembers(prisma);
    await seedDrafts(prisma);
    await seedComments(prisma);
    await seedNotifications(prisma);
    await seedUserSettings(prisma);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Individual seeding functions
async function seedOrganizations(prisma) {
  console.log('Seeding organizations...');
  
  const organizations = [
    {
      name: 'Test Company',
      slug: 'test-company'
    },
    {
      name: 'Acme Corporation',
      slug: 'acme-corp'
    },
    {
      name: 'Globex Inc.',
      slug: 'globex-inc'
    }
  ];
  
  for (const orgData of organizations) {
    let organization = await prisma.organization.findUnique({
      where: { slug: orgData.slug }
    });
    
    if (!organization) {
      organization = await prisma.organization.create({
        data: orgData
      });
      console.log(`Created organization: ${organization.name}`);
    } else {
      console.log(`Organization already exists: ${organization.name}`);
    }
  }
}

async function seedUsers(prisma) {
  console.log('Seeding users...');
  
  // Get all organizations to link users to them
  const organizations = await prisma.organization.findMany();
  
  if (organizations.length === 0) {
    console.log('No organizations found. Please seed organizations first.');
    return;
  }
  
  const users = [
    {
      email: 'admin@testcompany.com',
      firstName: 'Test',
      lastName: 'Administrator',
      organizationId: organizations[0].id, // Link to first organization
      subscriptionTier: 'enterprise',
      industry: 'Technology',
      jobTitle: 'CTO',
      bio: 'Tech lead with 10+ years of experience',
      timezone: 'America/New_York',
      onboardingCompleted: true
    },
    {
      email: 'editor@testcompany.com',
      firstName: 'Jane',
      lastName: 'Editor',
      organizationId: organizations[0].id, // Link to first organization
      subscriptionTier: 'professional',
      industry: 'Marketing',
      jobTitle: 'Content Editor',
      bio: 'Content specialist focused on LinkedIn growth',
      timezone: 'America/Chicago',
      onboardingCompleted: true
    },
    {
      email: 'user@acme.com',
      firstName: 'John',
      lastName: 'Doe',
      organizationId: organizations[1].id, // Link to second organization
      subscriptionTier: 'starter',
      industry: 'Finance',
      jobTitle: 'Analyst',
      bio: 'Financial analyst interested in content marketing',
      timezone: 'America/Denver',
      onboardingCompleted: true
    }
  ];
  
  for (const userData of users) {
    let user = await prisma.user.findUnique({
      where: { email: userData.email }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: userData
      });
      console.log(`Created user: ${user.firstName} ${user.lastName}`);
    } else {
      // Update user to link to organization if not already linked
      if (!user.organizationId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            organizationId: userData.organizationId,
            onboardingCompleted: true
          }
        });
        console.log(`Updated user: ${user.firstName} ${user.lastName}`);
      } else {
        console.log(`User already exists: ${user.firstName} ${user.lastName}`);
      }
    }
  }
}

async function seedSubscriptions(prisma) {
  console.log('Seeding subscriptions...');
  
  // Get all organizations to link subscriptions to them
  const organizations = await prisma.organization.findMany();
  
  if (organizations.length === 0) {
    console.log('No organizations found. Please seed organizations first.');
    return;
  }
  
  const subscriptions = [
    {
      organizationId: organizations[0].id, // Link to first organization
      tier: 'starter',
      status: 'active',
      aiCreditsLimit: 5,
      aiCreditsUsed: 2
    },
    {
      organizationId: organizations[1].id, // Link to second organization
      tier: 'professional',
      status: 'active',
      aiCreditsLimit: 50,
      aiCreditsUsed: 35
    },
    {
      organizationId: organizations[2].id, // Link to third organization
      tier: 'enterprise',
      status: 'active',
      aiCreditsLimit: 500,
      aiCreditsUsed: 245
    }
  ];
  
  for (const subscriptionData of subscriptions) {
    // Check if subscription already exists for this organization
    let existingSubscription = await prisma.subscription.findFirst({
      where: { organizationId: subscriptionData.organizationId }
    });
    
    if (!existingSubscription) {
      const subscription = await prisma.subscription.create({
        data: subscriptionData
      });
      console.log(`Created subscription for organization ID: ${subscription.organizationId}`);
    } else {
      console.log(`Subscription already exists for organization ID: ${subscriptionData.organizationId}`);
    }
  }
}

async function seedPosts(prisma) {
  console.log('Seeding posts...');
  
  // Get users and organizations to link posts to them
  const users = await prisma.user.findMany();
  const organizations = await prisma.organization.findMany();
  
  if (users.length === 0 || organizations.length === 0) {
    console.log('No users or organizations found. Please seed them first.');
    return;
  }
  
  const posts = [
    {
      userId: users[0].id, // First user
      organizationId: organizations[0].id, // First organization
      content: 'Just launched our new product! Excited to see how it performs in the market. #productlaunch #innovation',
      tone: 'professional',
      industry: 'Technology',
      status: 'published',
      aiGenerated: true
    },
    {
      userId: users[1].id, // Second user
      organizationId: organizations[0].id, // First organization
      content: 'Working late on an exciting new feature that will revolutionize how teams collaborate. Stay tuned for updates!',
      tone: 'casual',
      industry: 'Software',
      status: 'draft',
      aiGenerated: false
    },
    {
      userId: users[2].id, // Third user
      organizationId: organizations[1].id, // Second organization
      content: 'Our quarterly results show significant growth in all key metrics. Proud of our team\'s hard work and dedication.',
      tone: 'professional',
      industry: 'Finance',
      status: 'scheduled',
      aiGenerated: true
    }
  ];
  
  for (const postData of posts) {
    // Check if post with same content already exists
    let existingPost = await prisma.post.findFirst({
      where: { 
        content: postData.content,
        userId: postData.userId
      }
    });
    
    if (!existingPost) {
      const post = await prisma.post.create({
        data: postData
      });
      console.log(`Created post with status: ${post.status}`);
    } else {
      console.log(`Post already exists: ${existingPost.status}`);
    }
  }
}

async function seedAnalytics(prisma) {
  console.log('Seeding analytics...');
  
  // Get posts to link analytics to them
  const posts = await prisma.post.findMany();
  
  if (posts.length === 0) {
    console.log('No posts found. Please seed posts first.');
    return;
  }
  
  const analytics = [
    {
      postId: posts[0].id, // First post
      linkedinPostId: 'linkedin-001',
      impressions: 1250,
      likes: 42,
      comments: 8,
      shares: 15,
      clickThroughRate: 3.25
    },
    {
      postId: posts[1].id, // Second post
      linkedinPostId: 'linkedin-002',
      impressions: 875,
      likes: 28,
      comments: 5,
      shares: 7,
      clickThroughRate: 2.10
    },
    {
      postId: posts[2].id, // Third post
      linkedinPostId: 'linkedin-003',
      impressions: 2100,
      likes: 87,
      comments: 12,
      shares: 22,
      clickThroughRate: 4.80
    }
  ];
  
  for (const analyticsData of analytics) {
    // Check if analytics already exists for this post
    let existingAnalytics = await prisma.analytics.findFirst({
      where: { postId: analyticsData.postId }
    });
    
    if (!existingAnalytics) {
      const analytic = await prisma.analytics.create({
        data: analyticsData
      });
      console.log(`Created analytics for post ID: ${analytic.postId}`);
    } else {
      console.log(`Analytics already exists for post ID: ${analyticsData.postId}`);
    }
  }
}

async function seedTeamMembers(prisma) {
  console.log('Seeding team members...');
  
  // Get users and organizations to link team members to them
  const users = await prisma.user.findMany();
  const organizations = await prisma.organization.findMany();
  
  if (users.length === 0 || organizations.length === 0) {
    console.log('No users or organizations found. Please seed them first.');
    return;
  }
  
  const teamMembers = [
    {
      userId: users[0].id, // First user
      organizationId: organizations[0].id, // First organization
      role: 'admin',
      status: 'active'
    },
    {
      userId: users[1].id, // Second user
      organizationId: organizations[0].id, // First organization
      role: 'editor',
      status: 'active'
    },
    {
      userId: users[2].id, // Third user
      organizationId: organizations[1].id, // Second organization
      role: 'viewer',
      status: 'pending'
    }
  ];
  
  for (const teamMemberData of teamMembers) {
    // Check if team member already exists
    let existingTeamMember = await prisma.teamMember.findFirst({
      where: { 
        userId: teamMemberData.userId,
        organizationId: teamMemberData.organizationId
      }
    });
    
    if (!existingTeamMember) {
      const teamMember = await prisma.teamMember.create({
        data: teamMemberData
      });
      console.log(`Created team member with role: ${teamMember.role}`);
    } else {
      console.log(`Team member already exists with role: ${existingTeamMember.role}`);
    }
  }
}

async function seedDrafts(prisma) {
  console.log('Seeding drafts...');
  
  // Get users and organizations to link drafts to them
  const users = await prisma.user.findMany();
  const organizations = await prisma.organization.findMany();
  
  if (users.length === 0 || organizations.length === 0) {
    console.log('No users or organizations found. Please seed them first.');
    return;
  }
  
  const drafts = [
    {
      content: 'Draft content for review. Please provide feedback on tone and messaging.',
      createdBy: users[0].id, // First user
      organizationId: organizations[0].id, // First organization
      status: 'draft',
      version: 1
    },
    {
      content: 'Final version ready for approval. All feedback has been incorporated.',
      createdBy: users[1].id, // Second user
      organizationId: organizations[0].id, // First organization
      status: 'pending_approval',
      version: 3
    },
    {
      content: 'Content outline for next quarter\'s marketing campaign. Needs more research.',
      createdBy: users[2].id, // Third user
      organizationId: organizations[1].id, // Second organization
      status: 'draft',
      version: 1
    }
  ];
  
  for (const draftData of drafts) {
    // Check if draft with same content already exists
    let existingDraft = await prisma.draft.findFirst({
      where: { 
        content: draftData.content,
        createdBy: draftData.createdBy
      }
    });
    
    if (!existingDraft) {
      const draft = await prisma.draft.create({
        data: draftData
      });
      console.log(`Created draft with status: ${draft.status}`);
    } else {
      console.log(`Draft already exists with status: ${existingDraft.status}`);
    }
  }
}

async function seedComments(prisma) {
  console.log('Seeding comments...');
  
  // Get drafts and users to link comments to them
  const drafts = await prisma.draft.findMany();
  const users = await prisma.user.findMany();
  
  if (drafts.length === 0 || users.length === 0) {
    console.log('No drafts or users found. Please seed them first.');
    return;
  }
  
  const comments = [
    {
      draftId: drafts[0].id, // First draft
      userId: users[1].id, // Second user
      content: 'This looks great! Just a few minor suggestions for improvement.',
      type: 'comment'
    },
    {
      draftId: drafts[1].id, // Second draft
      userId: users[0].id, // First user
      content: 'Please add more data to support the claims in paragraph 2.',
      type: 'suggestion'
    },
    {
      draftId: drafts[0].id, // First draft
      userId: users[2].id, // Third user
      content: 'Consider adding a call-to-action at the end to increase engagement.',
      type: 'comment'
    }
  ];
  
  for (const commentData of comments) {
    // Check if comment with same content already exists
    let existingComment = await prisma.comment.findFirst({
      where: { 
        content: commentData.content,
        draftId: commentData.draftId,
        userId: commentData.userId
      }
    });
    
    if (!existingComment) {
      const comment = await prisma.comment.create({
        data: commentData
      });
      console.log(`Created comment of type: ${comment.type}`);
    } else {
      console.log(`Comment already exists of type: ${existingComment.type}`);
    }
  }
}

async function seedNotifications(prisma) {
  console.log('Seeding notifications...');
  
  // Get users to link notifications to them
  const users = await prisma.user.findMany();
  
  if (users.length === 0) {
    console.log('No users found. Please seed users first.');
    return;
  }
  
  const notifications = [
    {
      userId: users[0].id, // First user
      type: 'post_scheduled',
      title: 'Post Scheduled',
      message: 'Your post has been scheduled for publication tomorrow at 9:00 AM.'
    },
    {
      userId: users[1].id, // Second user
      type: 'draft_comment',
      title: 'New Comment',
      message: 'Jane Editor has commented on your draft.'
    },
    {
      userId: users[2].id, // Third user
      type: 'subscription_update',
      title: 'Subscription Renewed',
      message: 'Your subscription has been successfully renewed for another year.'
    }
  ];
  
  for (const notificationData of notifications) {
    // Check if notification with same content already exists
    let existingNotification = await prisma.notification.findFirst({
      where: { 
        title: notificationData.title,
        userId: notificationData.userId
      }
    });
    
    if (!existingNotification) {
      const notification = await prisma.notification.create({
        data: notificationData
      });
      console.log(`Created notification of type: ${notification.type}`);
    } else {
      console.log(`Notification already exists of type: ${existingNotification.type}`);
    }
  }
}

async function seedUserSettings(prisma) {
  console.log('Seeding user settings...');
  
  // Get users to link settings to them
  const users = await prisma.user.findMany();
  
  if (users.length === 0) {
    console.log('No users found. Please seed users first.');
    return;
  }
  
  const userSettings = [
    {
      userId: users[0].id, // First user
      emailNotifications: true,
      postReminders: true,
      analyticsReports: true,
      teamUpdates: true,
      marketingEmails: false,
      profileVisibility: 'team',
      dataSharing: false,
      analyticsTracking: true
    },
    {
      userId: users[1].id, // Second user
      emailNotifications: true,
      postReminders: false,
      analyticsReports: true,
      teamUpdates: true,
      marketingEmails: true,
      profileVisibility: 'public',
      dataSharing: false,
      analyticsTracking: true
    },
    {
      userId: users[2].id, // Third user
      emailNotifications: false,
      postReminders: true,
      analyticsReports: false,
      teamUpdates: false,
      marketingEmails: false,
      profileVisibility: 'private',
      dataSharing: true,
      analyticsTracking: false
    }
  ];
  
  for (const userSettingData of userSettings) {
    // Check if user settings already exist
    let existingUserSetting = await prisma.userSetting.findUnique({
      where: { userId: userSettingData.userId }
    });
    
    if (!existingUserSetting) {
      const userSetting = await prisma.userSetting.create({
        data: userSettingData
      });
      console.log(`Created user settings for user ID: ${userSetting.userId}`);
    } else {
      console.log(`User settings already exist for user ID: ${userSettingData.userId}`);
    }
  }
}

main();