import { pgTable, text, timestamp, integer, boolean, uuid, jsonb, decimal, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  organizationId: text('organization_id').references(() => organizations.id),
  linkedinToken: text('linkedin_token'),
  linkedinProfile: jsonb('linkedin_profile'),
  subscriptionTier: text('subscription_tier').notNull().default('starter'),
  industry: text('industry'),
  jobTitle: text('job_title'),
  bio: text('bio'),
  timezone: text('timezone').default('America/New_York'),
  profileImage: text('profile_image'),
  onboardingCompleted: boolean('onboarding_completed').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Organizations table
export const organizations = pgTable('organizations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  subscriptionId: text('subscription_id'),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Posts table
export const posts = pgTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  content: text('content').notNull(),
  tone: text('tone').notNull(),
  industry: text('industry').notNull(),
  status: text('status').notNull().default('draft'),
  scheduledFor: timestamp('scheduled_for'),
  publishedAt: timestamp('published_at'),
  linkedinPostId: text('linkedin_post_id'),
  templateId: text('template_id'),
  aiGenerated: boolean('ai_generated').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    statusScheduledForIdx: index('posts_status_scheduled_for_idx').on(table.status, table.scheduledFor),
  }
});

// Analytics table
export const analytics = pgTable('analytics', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  postId: text('post_id').references(() => posts.id).notNull(),
  linkedinPostId: text('linkedin_post_id').notNull(),
  impressions: integer('impressions').default(0),
  likes: integer('likes').default(0),
  comments: integer('comments').default(0),
  shares: integer('shares').default(0),
  clickThroughRate: decimal('click_through_rate', { precision: 5, scale: 2 }),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
}, (table) => {
  return {
    recordedAtIdx: index('analytics_recorded_at_idx').on(table.recordedAt),
  }
});

// Team Members table
export const teamMembers = pgTable('team_members', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  role: text('role').notNull().default('viewer'),
  invitedBy: text('invited_by').references(() => users.id),
  invitedAt: timestamp('invited_at').defaultNow().notNull(),
  status: text('status').notNull().default('pending'),
  permissions: jsonb('permissions'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    statusIdx: index('team_members_status_idx').on(table.status),
    userIdOrganizationIdUnique: uniqueIndex('team_members_user_id_organization_id_unique').on(table.userId, table.organizationId), // Add composite unique constraint
  }
});

// Subscriptions table
export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  organizationId: text('organization_id').references(() => organizations.id).notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  tier: text('tier').notNull().default('starter'),
  status: text('status').notNull().default('active'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  aiCreditsUsed: integer('ai_credits_used').default(0),
  aiCreditsLimit: integer('ai_credits_limit').default(5),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Drafts table
export const drafts = pgTable('drafts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  postId: text('post_id').references(() => posts.id),
  content: text('content').notNull(),
  version: integer('version').default(1),
  createdBy: text('created_by').references(() => users.id).notNull(),
  status: text('status').notNull().default('draft'),
  collaborators: jsonb('collaborators'),
  approvers: jsonb('approvers'),
  approvedBy: text('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  organizationId: text('organization_id').references(() => organizations.id), // Add this missing field
}, (table) => {
  return {
    statusIdx: index('drafts_status_idx').on(table.status),
  }
});

// Comments table
export const comments = pgTable('comments', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  draftId: text('draft_id').references(() => drafts.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  type: text('type').notNull().default('comment'),
  position: jsonb('position'),
  resolved: boolean('resolved').default(false),
  resolvedBy: text('resolved_by').references(() => users.id),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  relatedId: text('related_id'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// User Settings table
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  userId: text('user_id').references(() => users.id).notNull().unique(),
  emailNotifications: boolean('email_notifications').default(true),
  postReminders: boolean('post_reminders').default(true),
  analyticsReports: boolean('analytics_reports').default(true),
  teamUpdates: boolean('team_updates').default(true),
  marketingEmails: boolean('marketing_emails').default(false),
  profileVisibility: text('profile_visibility').default('team'),
  dataSharing: boolean('data_sharing').default(false),
  analyticsTracking: boolean('analytics_tracking').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});