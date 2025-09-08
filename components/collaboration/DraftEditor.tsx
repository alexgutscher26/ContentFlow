'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  CheckCircle, 
  XCircle,
  Clock,
  Users,
  Calendar,
  ArrowLeft,
  Plus,
  Edit,
  Save,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface DraftEditorProps {
  draftId: string;
}

export default function DraftEditor({ draftId }: DraftEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [draftContent, setDraftContent] = useState('');

  const [draft] = useState({
    id: draftId,
    title: 'The Future of AI in Content Marketing',
    content: `The landscape of content marketing is rapidly evolving, and artificial intelligence is at the forefront of this transformation. As we step into 2025, it's becoming increasingly clear that AI isn't just a tool—it's becoming the backbone of how we create, distribute, and optimize content.

🔍 **What's Changed in the Last Year?**

The integration of AI in content marketing has moved from experimental to essential. Companies that embraced AI-powered content strategies in 2024 saw an average increase of 40% in engagement rates and a 35% reduction in content creation time.

But here's what most people miss: AI isn't replacing human creativity—it's amplifying it.

💡 **The Three Pillars of AI-Driven Content Marketing:**

1. **Personalization at Scale**
   AI enables us to create personalized content for different audience segments without sacrificing quality or authenticity. Machine learning algorithms can analyze user behavior, preferences, and engagement patterns to suggest content variations that resonate with specific demographics.

2. **Predictive Content Performance**
   Advanced analytics now allow us to predict how content will perform before it's published. By analyzing historical data, trending topics, and audience sentiment, AI can recommend optimal posting times, content formats, and even suggest modifications to improve engagement.

3. **Automated Content Optimization**
   Real-time optimization based on performance metrics means content can be automatically adjusted for better results. This includes everything from headline variations to call-to-action placement.

🚀 **Real-World Impact:**

Last month, I worked with a B2B SaaS company that implemented an AI-driven content strategy. The results were remarkable:
- 300% increase in qualified leads from LinkedIn content
- 50% reduction in content creation time
- 85% improvement in engagement rates
- 60% increase in brand awareness metrics

The key wasn't just using AI tools—it was integrating them strategically into their existing workflow.

🎯 **Looking Ahead: What's Next?**

As we move forward, I see three major trends emerging:

**1. Hyper-Personalization**
AI will enable content that adapts in real-time based on who's viewing it. Imagine LinkedIn posts that automatically adjust their tone, examples, and call-to-action based on the viewer's industry, role, and previous interactions.

**2. Cross-Platform Content Orchestration**
AI will seamlessly adapt content across different platforms while maintaining brand voice and message consistency. A single piece of content will automatically transform for LinkedIn, Twitter, email newsletters, and blog posts.

**3. Predictive Content Planning**
AI will not just suggest what to post, but when market conditions, industry trends, and audience behavior patterns indicate the optimal time for specific types of content.

💭 **The Human Element Remains Critical**

Despite all these technological advances, the most successful content strategies will still require human insight, creativity, and authentic storytelling. AI amplifies our capabilities—it doesn't replace our judgment.

The companies that will win in this new landscape are those that view AI as a collaborative partner, not a replacement for human creativity.

**What's your experience with AI in content marketing? Have you seen similar results, or are you still exploring how to integrate these tools into your strategy?**

I'd love to hear your thoughts and experiences in the comments below. Let's discuss how we can collectively navigate this exciting evolution in content marketing.

#AIContentMarketing #DigitalMarketing #ContentStrategy #ArtificialIntelligence #MarketingTechnology #B2BMarketing #ContentCreation #MarketingAutomation #FutureOfMarketing #LinkedInStrategy`,
    status: 'in_review',
    createdBy: 'John Doe',
    createdAt: '2025-01-14T10:30:00Z',
    collaborators: [
      { id: '2', name: 'Sarah Wilson', role: 'editor', avatar: '/avatars/sarah.jpg' },
      { id: '3', name: 'Mike Chen', role: 'approver', avatar: '/avatars/mike.jpg' }
    ],
    version: 3,
    lastActivity: '2025-01-14T15:45:00Z'
  });

  const [comments] = useState([
    {
      id: '1',
      userId: '2',
      userName: 'Sarah Wilson',
      userAvatar: '/avatars/sarah.jpg',
      content: 'Great insights! I think we should add more specific data points in the "Real-World Impact" section to make it more compelling.',
      type: 'comment',
      createdAt: '2025-01-14T11:30:00Z',
      resolved: false
    },
    {
      id: '2',
      userId: '3',
      userName: 'Mike Chen',
      userAvatar: '/avatars/mike.jpg',
      content: 'The content is excellent, but I suggest shortening the introduction slightly. LinkedIn users prefer more direct openings.',
      type: 'suggestion',
      createdAt: '2025-01-14T14:15:00Z',
      resolved: false
    },
    {
      id: '3',
      userId: '2',
      userName: 'Sarah Wilson',
      userAvatar: '/avatars/sarah.jpg',
      content: 'Should we include a call-to-action for our upcoming webinar on AI marketing strategies?',
      type: 'comment',
      createdAt: '2025-01-14T15:45:00Z',
      resolved: false
    }
  ]);

  useEffect(() => {
    setDraftContent(draft.content);
  }, [draft.content]);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    // In production, save comment to database and send notifications
    toast.success('Comment added successfully');
    setNewComment('');
  };

  const handleSaveDraft = () => {
    // In production, save draft content to database
    toast.success('Draft saved successfully');
    setIsEditing(false);
  };

  const handleApprove = () => {
    // In production, update draft status and send notifications
    toast.success('Content approved! Ready for scheduling.');
  };

  const handleRequestChanges = () => {
    // In production, update status and notify team
    toast.success('Change request sent to team');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/collaborate">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Collaboration
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{draft.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Created by {draft.createdBy}</span>
              <span>•</span>
              <span>Version {draft.version}</span>
              <span>•</span>
              <span>Last updated {formatDate(draft.lastActivity)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={draft.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
            {draft.status.replace('_', ' ')}
          </Badge>
          {draft.status === 'approved' && (
            <Link href="/dashboard/schedule">
              <Button className="bg-green-600 hover:bg-green-700">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Edit className="h-5 w-5 text-blue-600" />
                <span>Content Editor</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveDraft}>
                      <Save className="mr-1 h-3 w-3" />
                      Save
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
            <CardDescription>
              Collaborate on content with your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    value={draftContent}
                    onChange={(e) => setDraftContent(e.target.value)}
                    className="min-h-96 resize-none"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{draftContent.length} characters</span>
                    <span>LinkedIn recommended: 1,300+ characters for long-form</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {draft.content}
                </div>
              </div>
            )}

            {/* Collaborators */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-sm">Collaborators</h3>
                <Button size="sm" variant="outline">
                  <Plus className="mr-1 h-3 w-3" />
                  Add
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                {draft.collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback className="text-xs">{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{collaborator.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {collaborator.role}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Actions */}
            {draft.status === 'in_review' && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium text-sm mb-3">Approval Actions</h3>
                <div className="flex items-center space-x-2">
                  <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Content
                  </Button>
                  <Button variant="outline" onClick={handleRequestChanges}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Request Changes
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comments & Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <span>Comments</span>
            </CardTitle>
            <CardDescription>
              Team feedback and discussions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 pr-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                      <AvatarFallback className="text-xs">{comment.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{comment.userName}</span>
                        <Badge variant="outline" className="text-xs">
                          {comment.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                      {!comment.resolved && (
                        <Button size="sm" variant="ghost" className="text-xs h-6">
                          Mark as resolved
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Add Comment */}
            <div className="space-y-3">
              <Label htmlFor="newComment">Add Comment</Label>
              <Textarea
                id="newComment"
                placeholder="Share your feedback or suggestions..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-20 resize-none"
              />
              <Button onClick={handleAddComment} size="sm" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>
            Recent changes and interactions on this draft
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'comment',
                user: 'Sarah Wilson',
                action: 'added a comment',
                time: '2 hours ago',
                icon: <MessageCircle className="h-4 w-4 text-blue-600" />
              },
              {
                type: 'edit',
                user: 'John Doe',
                action: 'updated the content',
                time: '4 hours ago',
                icon: <Edit className="h-4 w-4 text-green-600" />
              },
              {
                type: 'collaboration',
                user: 'Mike Chen',
                action: 'was added as collaborator',
                time: '1 day ago',
                icon: <Users className="h-4 w-4 text-purple-600" />
              },
              {
                type: 'creation',
                user: 'John Doe',
                action: 'created this draft',
                time: '2 days ago',
                icon: <Plus className="h-4 w-4 text-gray-600" />
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}