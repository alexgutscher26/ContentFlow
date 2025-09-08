'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  User, 
  Linkedin, 
  Target, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  BarChart3
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    title: '',
    industry: '',
    bio: '',
    goals: [] as string[]
  });

  const [linkedinConnected, setLinkedinConnected] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const industries = [
    'Technology',
    'Finance', 
    'Healthcare',
    'Marketing',
    'Education',
    'Consulting',
    'Real Estate',
    'Manufacturing',
    'Retail',
    'Non-profit'
  ];

  const contentGoals = [
    { id: 'thought-leadership', label: 'Establish Thought Leadership', icon: '🎯' },
    { id: 'brand-awareness', label: 'Build Brand Awareness', icon: '🚀' },
    { id: 'lead-generation', label: 'Generate Leads', icon: '📈' },
    { id: 'networking', label: 'Professional Networking', icon: '🤝' },
    { id: 'recruitment', label: 'Talent Recruitment', icon: '👥' },
    { id: 'education', label: 'Share Knowledge & Educate', icon: '📚' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    setProfileData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleLinkedinConnect = () => {
    setIsLoading(true);
    // Mock LinkedIn OAuth flow
    setTimeout(() => {
      setLinkedinConnected(true);
      setIsLoading(false);
      toast.success('LinkedIn account connected successfully!');
    }, 2000);
  };

  const handleComplete = () => {
    setIsLoading(true);
    // In production, save onboarding data and redirect to dashboard
    setTimeout(() => {
      toast.success('Welcome to ContentFlow! Your account is ready.');
      router.push('/dashboard');
    }, 1000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profileData.firstName && profileData.lastName && profileData.company;
      case 2:
        return profileData.industry && profileData.title;
      case 3:
        return profileData.goals.length > 0;
      case 4:
        return linkedinConnected;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to ContentFlow</CardTitle>
          <CardDescription>
            Let's set up your account to create amazing LinkedIn content
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <User className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold">Tell us about yourself</h2>
                <p className="text-muted-foreground">
                  We'll use this information to personalize your experience
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold">Your professional details</h2>
                <p className="text-muted-foreground">
                  Help us understand your industry and role
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={profileData.industry} onValueChange={(value) => setProfileData({ ...profileData, industry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Marketing Manager, Software Engineer"
                    value={profileData.title}
                    onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your professional background and expertise..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="min-h-20"
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps us generate more relevant content for you
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Content Goals */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold">What are your content goals?</h2>
                <p className="text-muted-foreground">
                  Select all that apply to personalize your content recommendations
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {contentGoals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      profileData.goals.includes(goal.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{goal.label}</h3>
                        </div>
                        {profileData.goals.includes(goal.id) && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {profileData.goals.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Great! We'll customize your content recommendations based on these goals.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: LinkedIn Connection */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Linkedin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h2 className="text-xl font-semibold">Connect your LinkedIn account</h2>
                <p className="text-muted-foreground">
                  Enable automatic posting and analytics tracking
                </p>
              </div>

              {linkedinConnected ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 mb-2">LinkedIn Connected!</h3>
                    <p className="text-sm text-green-600">
                      Your account is now connected and ready for content scheduling
                    </p>
                  </div>
                  
                  <div className="grid gap-3 md:grid-cols-3 mt-6">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <h4 className="font-medium text-sm text-green-800">Auto Scheduling</h4>
                      <p className="text-xs text-green-600">Schedule posts directly to LinkedIn</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-medium text-sm text-blue-800">Real-time Analytics</h4>
                      <p className="text-xs text-blue-600">Track engagement and performance</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Target className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-medium text-sm text-purple-800">Optimal Timing</h4>
                      <p className="text-xs text-purple-600">AI-powered posting recommendations</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50">
                    <Linkedin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Connect LinkedIn Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We'll redirect you to LinkedIn to authorize ContentFlow
                    </p>
                    <Button 
                      onClick={handleLinkedinConnect}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <>Connecting...</>
                      ) : (
                        <>
                          <Linkedin className="mr-2 h-4 w-4" />
                          Connect LinkedIn
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="text-left p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">What we'll access:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Your basic profile information</li>
                      <li>• Permission to post on your behalf</li>
                      <li>• Access to post analytics and engagement data</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3">
                      We never access your private messages or connections
                    </p>
                  </div>

                  <div className="text-center">
                    <Button variant="ghost" onClick={() => setLinkedinConnected(true)}>
                      Skip for now (you can connect later in settings)
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleComplete}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? 'Setting up...' : 'Complete Setup'}
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}