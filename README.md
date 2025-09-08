# ContentFlow - LinkedIn Content Generator SaaS MVP

A comprehensive SaaS platform for AI-powered LinkedIn content generation, scheduling, and analytics.

## 🚀 Features

### Core Features
- **Multi-tenant Authentication**: User accounts with company/organization linking
- **Subscription Management**: Stripe integration with free trials and paid tiers
- **AI Content Generation**: Generate engaging LinkedIn posts with customizable tones
- **Post Scheduling**: Schedule posts with optimal timing recommendations
- **Analytics Dashboard**: Track engagement metrics and performance
- **LinkedIn Integration**: OAuth connection and automated posting

### Technical Stack
- **Frontend**: Next.js 13 + TypeScript + Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Clerk (multi-tenant ready)
- **Payments**: Stripe (subscriptions, trials, metered billing)
- **AI**: OpenAI GPT integration for content generation
- **API**: LinkedIn API for posting and analytics

## 📊 Database Schema

### Core Tables
- **Users**: Basic info, subscription tier, LinkedIn OAuth tokens
- **Organizations**: Multi-tenant grouping with subscription management
- **Posts**: Content, status, scheduling, and LinkedIn integration
- **Subscriptions**: Stripe integration with usage tracking
- **Analytics**: LinkedIn engagement metrics per post

## 🎨 Design Principles

- **Professional SaaS Aesthetic**: Clean, modern interface inspired by Linear and Notion
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Micro-interactions**: Smooth animations and hover effects
- **Accessible**: High contrast ratios and proper ARIA labels
- **Performance**: Optimized loading and smooth transitions

## 🔧 Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Set up environment variables (see `.env.example`)

4. Configure Supabase database schema

5. Set up Clerk authentication

6. Configure Stripe webhooks and plans

## 🚀 Deployment

The application is configured for static export and can be deployed to:
- Vercel
- Netlify  
- Cloudflare Pages
- Any static hosting provider

## 📝 MVP Scope

### Included
✅ User authentication and multi-tenancy
✅ Subscription management with Stripe
✅ AI content generation with multiple tones
✅ Post scheduling with calendar interface
✅ Analytics dashboard with engagement metrics
✅ LinkedIn OAuth integration mockup
✅ Responsive design across all devices

### Future Enhancements
- Team collaboration features
- Advanced AI templates and customization
- Multi-organization hierarchy
- Advanced analytics and reporting
- Content performance AI optimization
- Bulk scheduling and content libraries

## 🔐 Security Features

- Row Level Security (RLS) for multi-tenancy
- Secure API endpoints with proper authentication
- Environment variable management
- CORS configuration for API access
- Input validation and sanitization

## 📈 Subscription Tiers

### Starter (Free)
- 5 AI-generated posts/month
- Basic scheduling
- LinkedIn analytics
- Email support

### Professional ($29/month)
- 50 AI-generated posts/month
- Advanced scheduling
- Detailed analytics
- Content calendar
- Priority support

### Enterprise ($99/month)
- Unlimited AI-generated posts
- Team collaboration
- Advanced analytics
- Custom branding
- Dedicated support

## 🤝 Contributing

This is an MVP implementation. For production deployment, ensure proper:
- Environment variable configuration
- Database security setup
- API rate limiting
- Error handling and logging
- Performance monitoring