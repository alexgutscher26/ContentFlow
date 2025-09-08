# Database Seeding Script Enhancement Design

## Overview

This document outlines the design for enhancing the existing database seeding script to include comprehensive sample data for all tables in the ContentFlow application. Currently, the seed script only creates a basic organization and user, but the application has many more entities that would benefit from sample data for development and testing purposes.

## Architecture

The enhanced seeding script will follow a modular approach where each entity type is handled separately but in a coordinated sequence to maintain referential integrity. The script will:

1. Check for existing data to avoid duplication
2. Create sample data for all entity types in the correct order
3. Establish proper relationships between entities
4. Provide informative console output during the seeding process

## Data Models & Relationships

Based on the Prisma schema, the following entities need to be seeded with sample data:

1. **Organization** - Already partially implemented
2. **User** - Already partially implemented
3. **Subscription** - Related to Organization
4. **Post** - Related to User and Organization
5. **Analytics** - Related to Post
6. **TeamMember** - Related to User and Organization
7. **Draft** - Related to User and Organization
8. **Comment** - Related to Draft and User
9. **Notification** - Related to User
10. **UserSetting** - Related to User

## Seeding Logic Design

### 1. Organization Seeding
```javascript
// Enhanced organization creation with more realistic sample data
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
```

### 2. User Seeding
```javascript
// Enhanced user creation with more diverse sample data
const users = [
  {
    email: 'admin@testcompany.com',
    firstName: 'Test',
    lastName: 'Administrator',
    subscriptionTier: 'enterprise',
    industry: 'Technology',
    jobTitle: 'CTO',
    bio: 'Tech lead with 10+ years of experience',
    timezone: 'America/New_York'
  },
  {
    email: 'editor@testcompany.com',
    firstName: 'Jane',
    lastName: 'Editor',
    subscriptionTier: 'professional',
    industry: 'Marketing',
    jobTitle: 'Content Editor',
    bio: 'Content specialist focused on LinkedIn growth',
    timezone: 'America/Chicago'
  }
];
```

### 3. Subscription Seeding
```javascript
// Sample subscriptions for different tiers
const subscriptions = [
  {
    tier: 'starter',
    status: 'active',
    aiCreditsLimit: 5,
    aiCreditsUsed: 2
  },
  {
    tier: 'professional',
    status: 'active',
    aiCreditsLimit: 50,
    aiCreditsUsed: 35
  },
  {
    tier: 'enterprise',
    status: 'active',
    aiCreditsLimit: 500,
    aiCreditsUsed: 245
  }
];
```

### 4. Post Seeding
```javascript
// Sample posts with different statuses and content
const posts = [
  {
    content: 'Just launched our new product! Excited to see how it performs in the market. #productlaunch #innovation',
    tone: 'professional',
    industry: 'Technology',
    status: 'published',
    aiGenerated: true
  },
  {
    content: 'Working late on an exciting new feature that will revolutionize how teams collaborate. Stay tuned for updates!',
    tone: 'casual',
    industry: 'Software',
    status: 'draft',
    aiGenerated: false
  }
];
```

### 5. Analytics Seeding
```javascript
// Sample analytics data for posts
const analytics = [
  {
    impressions: 1250,
    likes: 42,
    comments: 8,
    shares: 15,
    clickThroughRate: 3.25
  },
  {
    impressions: 875,
    likes: 28,
    comments: 5,
    shares: 7,
    clickThroughRate: 2.10
  }
];
```

### 6. Team Member Seeding
```javascript
// Sample team members with different roles
const teamMembers = [
  {
    role: 'admin',
    status: 'active'
  },
  {
    role: 'editor',
    status: 'active'
  },
  {






























































































































































