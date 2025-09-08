'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  MessageCircle, 
  CheckCircle, 
  FileText, 
  Users,
  Clock,
  X
} from 'lucide-react';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'comment',
      title: 'New comment on your draft',
      message: 'Sarah Wilson commented on "The Future of AI in Content Marketing"',
      relatedId: 'draft-1',
      read: false,
      createdAt: '2025-01-14T15:45:00Z',
      user: {
        name: 'Sarah Wilson',
        avatar: '/avatars/sarah.jpg'
      }
    },
    {
      id: '2',
      type: 'approval_request',
      title: 'Approval requested',
      message: 'John Doe requested approval for "5 LinkedIn Strategies That Work"',
      relatedId: 'draft-2',
      read: false,
      createdAt: '2025-01-14T14:20:00Z',
      user: {
        name: 'John Doe',
        avatar: '/avatars/john.jpg'
      }
    },
    {
      id: '3',
      type: 'approval_granted',
      title: 'Content approved',
      message: 'Mike Chen approved "Building a Personal Brand Guide"',
      relatedId: 'draft-3',
      read: true,
      createdAt: '2025-01-14T11:30:00Z',
      user: {
        name: 'Mike Chen',
        avatar: '/avatars/mike.jpg'
      }
    },
    {
      id: '4',
      type: 'draft_shared',
      title: 'Draft shared with you',
      message: 'Emma Davis shared "Content Marketing Trends 2025" for collaboration',
      relatedId: 'draft-4',
      read: true,
      createdAt: '2025-01-14T09:15:00Z',
      user: {
        name: 'Emma Davis',
        avatar: '/avatars/emma.jpg'
      }
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'approval_request':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'approval_granted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'draft_shared':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'mention':
        return <Users className="h-4 w-4 text-orange-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button size="sm" variant="ghost" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-1 p-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                  notification.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback className="text-xs">
                      {notification.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getNotificationIcon(notification.type)}
                      <span className="font-medium text-sm">{notification.title}</span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}