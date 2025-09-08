'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Crown, 
  Check, 
  Zap, 
  Calendar, 
  CreditCard,
  TrendingUp,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

export default function SubscriptionManagement() {
  const [currentPlan] = useState({
    name: 'Professional',
    price: 29,
    billingCycle: 'monthly',
    status: 'active',
    nextBilling: '2025-02-15',
    features: [
      '50 AI-generated posts per month',
      'Advanced scheduling',
      'Detailed analytics',
      'Content calendar',
      'Priority support'
    ]
  });

  const [usage] = useState({
    aiCredits: { used: 32, limit: 50 },
    scheduledPosts: { used: 8, limit: 50 },
    analyticsAccess: true
  });

  const plans = [
    {
      name: 'Starter',
      price: 0,
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '5 AI-generated posts per month',
        'Basic scheduling',
        'LinkedIn analytics',
        'Email support'
      ],
      current: false,
      popular: false
    },
    {
      name: 'Professional',
      price: 29,
      period: '/month',
      description: 'For growing professionals',
      features: [
        '50 AI-generated posts per month',
        'Advanced scheduling',
        'Detailed analytics',
        'Content calendar',
        'Priority support'
      ],
      current: true,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 99,
      period: '/month',
      description: 'For teams and agencies',
      features: [
        'Unlimited AI-generated posts',
        'Team collaboration',
        'Advanced analytics',
        'Custom branding',
        'Dedicated support'
      ],
      current: false,
      popular: false
    }
  ];

  const handleUpgrade = (planName: string) => {
    // In production, integrate with Stripe for plan changes
    toast.success(`Upgrading to ${planName} plan...`);
  };

  const handleDowngrade = () => {
    toast.success('Plan change will take effect at the end of your billing cycle');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
          <p className="text-muted-foreground">
            Manage your plan and billing information
          </p>
        </div>
      </div>

      {/* Current Plan */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-blue-600" />
              <CardTitle>Current Plan</CardTitle>
            </div>
            <Badge className="bg-blue-600 hover:bg-blue-700">
              {currentPlan.status.charAt(0).toUpperCase() + currentPlan.status.slice(1)}
            </Badge>
          </div>
          <CardDescription>
            You're currently on the {currentPlan.name} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Plan Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{currentPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">${currentPlan.price}/{currentPlan.billingCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next billing:</span>
                  <span className="font-medium">{new Date(currentPlan.nextBilling).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Usage This Month</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>AI Credits</span>
                    <span>{usage.aiCredits.used}/{usage.aiCredits.limit}</span>
                  </div>
                  <Progress value={(usage.aiCredits.used / usage.aiCredits.limit) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Scheduled Posts</span>
                    <span>{usage.scheduledPosts.used}/{usage.scheduledPosts.limit}</span>
                  </div>
                  <Progress value={(usage.scheduledPosts.used / usage.scheduledPosts.limit) * 100} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} ${plan.popular && !plan.current ? 'border-purple-500' : ''}`}>
                {plan.popular && !plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Star className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600">
                      Current Plan
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.name}</span>
                    {plan.current && <Crown className="h-4 w-4 text-blue-600" />}
                  </CardTitle>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.current ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.price > currentPlan.price ? (
                    <Button 
                      onClick={() => handleUpgrade(plan.name)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <TrendingUp className="mr-2 h-3 w-3" />
                      Upgrade
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={handleDowngrade}
                      className="w-full"
                    >
                      Downgrade
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Billing History</span>
          </CardTitle>
          <CardDescription>
            Your recent invoices and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2025-01-15', amount: '$29.00', status: 'Paid', period: 'Jan 15 - Feb 15, 2025' },
              { date: '2024-12-15', amount: '$29.00', status: 'Paid', period: 'Dec 15 - Jan 15, 2025' },
              { date: '2024-11-15', amount: '$29.00', status: 'Paid', period: 'Nov 15 - Dec 15, 2024' }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{invoice.amount}</p>
                    <p className="text-xs text-muted-foreground">{invoice.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {invoice.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{invoice.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}