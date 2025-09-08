'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Send, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function PostScheduler() {
  const [newPost, setNewPost] = useState({
    content: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const [scheduledPosts] = useState([
    {
      id: 1,
      content: '🚀 The future of remote work is being shaped by AI and automation. Here\'s what every professional should know:\n\n1️⃣ Innovation drives transformation\n2️⃣ Adaptation is key to success\n3️⃣ Collaboration amplifies results\n\nThe companies that embrace these principles today will lead tomorrow\'s market.\n\nWhat\'s your take on this trend? Share your thoughts below! 👇',
      scheduledFor: '2025-01-15T09:00',
      status: 'scheduled'
    },
    {
      id: 2,
      content: 'I\'ve been thinking a lot about digital transformation lately...\n\nLast week, I had a conversation with a colleague that completely changed my perspective. They shared how technology professionals are adapting to new challenges, and it reminded me of an important lesson:\n\nGrowth happens outside our comfort zone.',
      scheduledFor: '2025-01-16T14:30',
      status: 'scheduled'
    },
    {
      id: 3,
      content: 'Quick question for my tech network:\n\nWhat\'s the biggest misconception people have about AI in the workplace?\n\nI\'ll share the most interesting responses in my next post!\n\nDrop your thoughts below 👇',
      scheduledFor: '2025-01-18T10:15',
      status: 'scheduled'
    }
  ]);

  const handleSchedulePost = () => {
    if (!newPost.content || !newPost.scheduledDate || !newPost.scheduledTime) {
      toast.error('Please fill in all fields');
      return;
    }

    const scheduleData = async () => {
      try {
        console.log('Scheduling post to Neon database...');
        const scheduledFor = `${newPost.scheduledDate}T${newPost.scheduledTime}:00`;
        
        const response = await fetch('/api/schedule-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newPost.content,
            scheduledFor,
            userId: 'user_1', // In production, get from auth context
            organizationId: 'org_1', // In production, get from auth context
            tone: 'professional',
            industry: 'Technology'
          }),
        });

        const result = await response.json();
        if (result.success) {
          toast.success('Post scheduled successfully!');
          console.log('Post scheduled successfully:', result.data.id);
          setNewPost({ content: '', scheduledDate: '', scheduledTime: '' });
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Schedule error:', error);
        toast.error(`Failed to schedule post: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    scheduleData();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Posts</h1>
          <p className="text-muted-foreground">
            Plan and schedule your LinkedIn content for optimal engagement
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* New Post Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-600" />
              <span>New Post</span>
            </CardTitle>
            <CardDescription>
              Create and schedule a new LinkedIn post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                placeholder="Write your LinkedIn post content here..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="min-h-32 resize-none"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{newPost.content.length}/3000 characters</span>
                <span>LinkedIn recommended: 150-300 characters</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newPost.scheduledDate}
                  onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newPost.scheduledTime}
                  onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                />
              </div>
            </div>

            <Button 
              onClick={handleSchedulePost}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Post
            </Button>
          </CardContent>
        </Card>

        {/* Scheduled Posts Queue */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Scheduled Posts</span>
                </CardTitle>
                <CardDescription>
                  Manage your upcoming LinkedIn posts
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-blue-600">
                {scheduledPosts.length} Scheduled
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{formatDate(post.scheduledFor)}</p>
                          <p className="text-xs text-muted-foreground">{formatTime(post.scheduledFor)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="mr-1 h-3 w-3" />
                          Post Now
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm line-clamp-3">{post.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimal Posting Times */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Optimal Posting Times</CardTitle>
          <CardDescription>
            Based on your audience and industry trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Best Time</h3>
              <p className="text-2xl font-bold text-green-600">9:00 AM</p>
              <p className="text-sm text-green-700">Tuesday - Thursday</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Good Time</h3>
              <p className="text-2xl font-bold text-blue-600">2:00 PM</p>
              <p className="text-sm text-blue-700">Monday - Friday</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-amber-800">Avoid</h3>
              <p className="text-2xl font-bold text-amber-600">7:00 PM</p>
              <p className="text-sm text-amber-700">Weekends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}