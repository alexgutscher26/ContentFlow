'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Linkedin, 
  Bell, 
  Shield, 
  CreditCard,
  Settings as SettingsIcon,
  Save,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Unlink
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    company: 'TechCorp Inc.',
    title: 'Senior Marketing Manager',
    bio: 'Passionate about digital marketing and content creation. Helping businesses grow through strategic LinkedIn presence.',
    industry: 'Technology',
    timezone: 'America/New_York'
  });

  const [linkedinConnection, setLinkedinConnection] = useState({
    connected: true,
    profileUrl: 'https://linkedin.com/in/johndoe',
    lastSync: '2025-01-14T10:30:00Z',
    permissions: ['r_liteprofile', 'w_member_social']
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    postReminders: true,
    analyticsReports: true,
    teamUpdates: true,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'team',
    dataSharing: false,
    analyticsTracking: true
  });

  const handleSaveProfile = () => {
    // In production, save to database
    toast.success('Profile updated successfully!');
  };

  const handleConnectLinkedIn = () => {
    // In production, initiate LinkedIn OAuth flow
    toast.success('Redirecting to LinkedIn...');
    // Simulate OAuth flow
    setTimeout(() => {
      setLinkedinConnection({
        connected: true,
        profileUrl: 'https://linkedin.com/in/johndoe',
        lastSync: new Date().toISOString(),
        permissions: ['r_liteprofile', 'w_member_social']
      });
      toast.success('LinkedIn account connected successfully!');
    }, 2000);
  };

  const handleDisconnectLinkedIn = () => {
    setLinkedinConnection({
      connected: false,
      profileUrl: '',
      lastSync: '',
      permissions: []
    });
    toast.success('LinkedIn account disconnected');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated');
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.success('Privacy settings updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and integrations
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center space-x-2">
            <Linkedin className="h-4 w-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal and professional information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatars/user.jpg" alt="Profile" />
                  <AvatarFallback className="text-lg">
                    {profile.firstName[0]}{profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your professional background..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-20"
                />
                <p className="text-xs text-muted-foreground">
                  {profile.bio.length}/500 characters
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={profile.industry} onValueChange={(value) => setProfile({ ...profile, industry: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={profile.timezone} onValueChange={(value) => setProfile({ ...profile, timezone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">GMT</SelectItem>
                      <SelectItem value="Europe/Paris">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linkedin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <span>LinkedIn Integration</span>
              </CardTitle>
              <CardDescription>
                Connect your LinkedIn account to enable post scheduling and analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {linkedinConnection.connected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">LinkedIn Connected</p>
                        <p className="text-sm text-green-600">
                          Last synced: {new Date(linkedinConnection.lastSync).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={linkedinConnection.profileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Profile
                      </a>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium">Connected Permissions</h3>
                    <div className="space-y-2">
                      {linkedinConnection.permissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">
                            {permission === 'r_liteprofile' && 'Read profile information'}
                            {permission === 'w_member_social' && 'Post on your behalf'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Disconnect LinkedIn</h3>
                      <p className="text-sm text-muted-foreground">
                        This will disable post scheduling and analytics features
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDisconnectLinkedIn}>
                      <Unlink className="mr-2 h-4 w-4" />
                      Disconnect
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <Linkedin className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Connect Your LinkedIn Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect your LinkedIn account to enable automatic post scheduling and detailed analytics
                    </p>
                  </div>
                  <Button onClick={handleConnectLinkedIn} className="bg-blue-600 hover:bg-blue-700">
                    <Linkedin className="mr-2 h-4 w-4" />
                    Connect LinkedIn
                  </Button>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">What you'll get:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Automatic post scheduling</li>
                      <li>• Real-time engagement analytics</li>
                      <li>• Audience insights and demographics</li>
                      <li>• Optimal posting time recommendations</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="postReminders">Post Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about scheduled posts
                    </p>
                  </div>
                  <Switch
                    id="postReminders"
                    checked={notifications.postReminders}
                    onCheckedChange={(checked) => handleNotificationChange('postReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analyticsReports">Analytics Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Weekly performance summaries
                    </p>
                  </div>
                  <Switch
                    id="analyticsReports"
                    checked={notifications.analyticsReports}
                    onCheckedChange={(checked) => handleNotificationChange('analyticsReports', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="teamUpdates">Team Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about team collaboration
                    </p>
                  </div>
                  <Switch
                    id="teamUpdates"
                    checked={notifications.teamUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('teamUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Product updates and tips
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Control your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="team">Team Only - Visible to team members</SelectItem>
                      <SelectItem value="private">Private - Only visible to you</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Share anonymized usage data to improve the platform
                    </p>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analyticsTracking">Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow tracking for personalized recommendations
                    </p>
                  </div>
                  <Switch
                    id="analyticsTracking"
                    checked={privacy.analyticsTracking}
                    onCheckedChange={(checked) => handlePrivacyChange('analyticsTracking', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-medium text-red-600">Danger Zone</h3>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-800">Delete Account</h4>
                      <p className="text-sm text-red-600">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>
                Manage your subscription and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Billing settings moved</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Billing and subscription management is now available on the dedicated subscription page
                </p>
                <Button asChild>
                  <a href="/dashboard/subscription">
                    Go to Subscription
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}