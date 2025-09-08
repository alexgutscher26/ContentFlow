'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  PenTool, 
  Users, 
  Eye,
  Heart,
  MessageCircle,
  Share,
  Plus,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const stats = [
    {
      title: 'Total Posts',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: <PenTool className="h-4 w-4" />
    },
    {
      title: 'Total Views',
      value: '12.5K',
      change: '+25%',
      changeType: 'positive',
      icon: <Eye className="h-4 w-4" />
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+0.5%',
      changeType: 'positive',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'Scheduled Posts',
      value: '8',
      change: 'This month',
      changeType: 'neutral',
      icon: <Calendar className="h-4 w-4" />
    }
  ];

  const recentPosts = [
    {
      title: 'The Future of Remote Work: 5 Trends to Watch in 2025',
      scheduledFor: '2025-01-15 09:00',
      status: 'scheduled',
      engagement: { views: 0, likes: 0, comments: 0 }
    },
    {
      title: 'How AI is Transforming Content Creation',
      scheduledFor: '2025-01-12 14:30',
      status: 'published',
      engagement: { views: 1250, likes: 45, comments: 12 }
    },
    {
      title: '3 Lessons I Learned from Building a SaaS Product',
      scheduledFor: '2025-01-10 10:15',
      status: 'published',
      engagement: { views: 890, likes: 32, comments: 8 }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your content.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/generate">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Generate Content
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="p-2 bg-blue-50 rounded-lg">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-muted-foreground'}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Posts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Your latest content and its performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{post.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{post.scheduledFor}</span>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </div>
                  </div>
                  {post.status === 'published' && (
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.engagement.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{post.engagement.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.engagement.comments}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/generate">
              <Button variant="outline" className="w-full justify-start">
                <PenTool className="mr-2 h-4 w-4" />
                Generate New Content
              </Button>
            </Link>
            <Link href="/dashboard/schedule">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Monthly Usage</span>
                <span className="text-xs text-muted-foreground">32/50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}