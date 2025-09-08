'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  UserPlus,
  Mail,
  Crown,
  Shield,
  FileText,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CollaborationHub() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('editor');

  const [teamMembers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      avatar: '/avatars/john.jpg',
      status: 'active',
      joinedAt: '2025-01-01'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'editor',
      avatar: '/avatars/sarah.jpg',
      status: 'active',
      joinedAt: '2025-01-05'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'approver',
      avatar: '/avatars/mike.jpg',
      status: 'active',
      joinedAt: '2025-01-08'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      role: 'viewer',
      avatar: '/avatars/emma.jpg',
      status: 'pending',
      joinedAt: '2025-01-12'
    }
  ]);

  const [drafts] = useState([
    {
      id: '1',
      title: 'The Future of AI in Content Marketing',
      content: 'The landscape of content marketing is rapidly evolving...',
      status: 'in_review',
      createdBy: 'John Doe',
      createdAt: '2025-01-14T10:30:00Z',
      collaborators: ['Sarah Wilson', 'Mike Chen'],
      comments: 3,
      pendingApprovals: 1,
      lastActivity: '2025-01-14T15:45:00Z'
    },
    {
      id: '2',
      title: '5 LinkedIn Strategies That Actually Work',
      content: 'After analyzing thousands of LinkedIn posts...',
      status: 'draft',
      createdBy: 'Sarah Wilson',
      createdAt: '2025-01-13T14:20:00Z',
      collaborators: ['John Doe'],
      comments: 1,
      pendingApprovals: 0,
      lastActivity: '2025-01-13T16:30:00Z'
    },
    {
      id: '3',
      title: 'Building a Personal Brand: A Complete Guide',
      content: 'Personal branding has become essential...',
      status: 'approved',
      createdBy: 'Mike Chen',
      createdAt: '2025-01-12T09:15:00Z',
      collaborators: ['John Doe', 'Sarah Wilson'],
      comments: 5,
      pendingApprovals: 0,
      lastActivity: '2025-01-14T11:20:00Z'
    }
  ]);

  const handleInviteTeamMember = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    // In production, send invitation email and create pending team member
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setIsInviteOpen(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-3 w-3 text-yellow-600" />;
      case 'approver':
        return <Shield className="h-3 w-3 text-green-600" />;
      case 'editor':
        return <Edit className="h-3 w-3 text-blue-600" />;
      default:
        return <Eye className="h-3 w-3 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
          <p className="text-muted-foreground">
            Work together on content creation and approval workflows
          </p>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Add a new team member to collaborate on content creation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer - Can view and comment</SelectItem>
                    <SelectItem value="editor">Editor - Can edit and comment</SelectItem>
                    <SelectItem value="approver">Approver - Can approve content</SelectItem>
                    <SelectItem value="admin">Admin - Full access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleInviteTeamMember} className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Team Members</span>
            </CardTitle>
            <CardDescription>
              Manage your content collaboration team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(member.role)}
                      <span className="text-xs capitalize">{member.role}</span>
                    </div>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Collaboration Drafts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span>Collaborative Drafts</span>
            </CardTitle>
            <CardDescription>
              Content being worked on by your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {drafts.map((draft) => (
                <Card key={draft.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <Link href={`/dashboard/collaborate/${draft.id}`}>
                          <h3 className="font-medium text-sm mb-1 hover:text-blue-600 cursor-pointer">
                            {draft.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mb-2">
                          Created by {draft.createdBy} • {formatDate(draft.createdAt)}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                          {draft.content}
                        </p>
                      </div>
                      <Badge className={getStatusColor(draft.status)}>
                        {draft.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{draft.collaborators.length} collaborators</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{draft.comments} comments</span>
                        </div>
                        {draft.pendingApprovals > 0 && (
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Clock className="h-3 w-3" />
                            <span>{draft.pendingApprovals} pending approval</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/dashboard/collaborate/${draft.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Button>
                        </Link>
                        {draft.status === 'approved' && (
                          <Link href="/dashboard/schedule">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Calendar className="mr-1 h-3 w-3" />
                              Schedule
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drafts</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Posts</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Ready to schedule</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}