'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  Users,
  Calendar,
  BarChart3,
  Download
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const overviewStats = [
    {
      title: 'Total Impressions',
      value: '45.2K',
      change: '+12.5%',
      changeType: 'positive',
      icon: <Eye className="h-4 w-4" />
    },
    {
      title: 'Total Engagements',
      value: '2.1K',
      change: '+18.2%',
      changeType: 'positive',
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: 'Click Rate',
      value: '4.8%',
      change: '+0.3%',
      changeType: 'positive',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'Follower Growth',
      value: '+127',
      change: 'This month',
      changeType: 'neutral',
      icon: <Users className="h-4 w-4" />
    }
  ];

  const topPosts = [
    {
      title: 'How AI is Transforming Content Creation',
      publishedAt: '2025-01-12',
      impressions: 8500,
      likes: 145,
      comments: 32,
      shares: 18,
      clickRate: '6.2%'
    },
    {
      title: '5 LinkedIn Strategies That Actually Work in 2025',
      publishedAt: '2025-01-10',
      impressions: 6200,
      likes: 98,
      comments: 24,
      shares: 12,
      clickRate: '4.1%'
    },
    {
      title: 'Building a Personal Brand: Lessons from 1000+ Posts',
      publishedAt: '2025-01-08',
      impressions: 5800,
      likes: 87,
      comments: 19,
      shares: 15,
      clickRate: '5.3%'
    }
  ];

  const weeklyData = [
    { day: 'Mon', impressions: 1200, engagements: 45 },
    { day: 'Tue', impressions: 1800, engagements: 72 },
    { day: 'Wed', impressions: 2100, engagements: 89 },
    { day: 'Thu', impressions: 1600, engagements: 58 },
    { day: 'Fri', impressions: 1400, engagements: 51 },
    { day: 'Sat', impressions: 800, engagements: 28 },
    { day: 'Sun', impressions: 600, engagements: 22 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your LinkedIn performance and optimize your content strategy
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Top Posts</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Weekly Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>
                Impressions and engagements over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1 flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Impressions</span>
                          <span>{day.impressions.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(day.impressions / 2100) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Engagements</span>
                          <span>{day.engagements}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(day.engagements / 89) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>
                Your best content from the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPosts.map((post, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm mb-1">{post.title}</h3>
                          <p className="text-xs text-muted-foreground mb-3">
                            Published on {new Date(post.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {post.clickRate} CTR
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Eye className="h-3 w-3 text-blue-600 mr-1" />
                            <span className="text-sm font-medium">{post.impressions.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Impressions</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Heart className="h-3 w-3 text-red-600 mr-1" />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Likes</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <MessageCircle className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Comments</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Share className="h-3 w-3 text-purple-600 mr-1" />
                            <span className="text-sm font-medium">{post.shares}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Shares</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>
                  Breakdown of your LinkedIn followers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Technology</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Marketing</span>
                      <span>28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Finance</span>
                      <span>18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Other</span>
                      <span>9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '9%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
                <CardDescription>
                  New followers over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">+127</div>
                  <p className="text-sm text-muted-foreground mb-4">New followers this month</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">78% of monthly goal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}