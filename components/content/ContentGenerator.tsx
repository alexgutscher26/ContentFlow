'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Zap, 
  Copy, 
  Save, 
  Calendar,
  RefreshCw,
  Sparkles,
  PenTool,
  BookTemplate,
  Lightbulb,
  FileText,
  Download,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { CONTENT_TONES, INDUSTRIES } from '@/lib/constants';
import TemplateLibrary from './TemplateLibrary';
import { Template } from '@/lib/templates';

import { Linkedin } from 'lucide-react';

export default function ContentGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [industry, setIndustry] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<string[]>([]);
  const [contentType, setContentType] = useState<'linkedin' | 'blog'>('linkedin');
  const [blogTitle, setBlogTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'templates'>('quick');

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'storytelling', label: 'Storytelling' },
    { value: 'casual', label: 'Casual' },
    { value: 'thought-leader', label: 'Thought Leader' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'education', label: 'Education' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const handleGenerate = async () => {
    if (!topic || !tone || !industry || (contentType === 'blog' && !blogTitle)) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsGenerating(true);
    
    try {
      const endpoint = contentType === 'blog' ? '/api/generate-blog' : '/api/generate-content';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          tone,
          industry,
          ...(contentType === 'blog' && {
            title: blogTitle,
            targetAudience,
            keyPoints
          })
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate content');
      }

      if (result.success && result.data) {
        setGeneratedPosts(result.data);
        toast.success('Content generated successfully!');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Content generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Content copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  const saveAsDraft = (content: string) => {
    const saveData = async () => {
      try {
        console.log('Saving draft to Neon database...');
        const response = await fetch('/api/save-post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            tone,
            industry,
            userId: 'user_1', // In production, get from auth context
            organizationId: 'org_1', // In production, get from auth context
            status: 'draft',
            aiGenerated: true
          }),
        });

        const result = await response.json();
        if (result.success) {
          toast.success('Content saved as draft!');
          console.log('Draft saved successfully:', result.data.id);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Save error:', error);
        toast.error(`Failed to save draft: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    saveData();
  };

  const downloadBlogPost = (content: string, title: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Blog post downloaded!');
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Generate engaging LinkedIn posts and comprehensive blog articles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Type Selection */}
          <div className="space-y-2">
            <Label>Content Type</Label>
            <div className="flex space-x-2">
              <Button
                variant={contentType === 'linkedin' ? 'default' : 'outline'}
                onClick={() => setContentType('linkedin')}
                className="flex-1"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn Posts
              </Button>
              <Button
                variant={contentType === 'blog' ? 'default' : 'outline'}
                onClick={() => setContentType('blog')}
                className="flex-1"
              >
                <FileText className="mr-2 h-4 w-4" />
                Blog Articles (3,000+ words)
              </Button>
            </div>
          </div>

          {/* Blog-specific fields */}
          {contentType === 'blog' && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-800">Blog Article Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blogTitle">Article Title *</Label>
                  <Input
                    id="blogTitle"
                    placeholder="e.g., The Complete Guide to AI in Healthcare"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Healthcare professionals, CTOs"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyPoints">Key Points to Cover (Optional)</Label>
                <Textarea
                  id="keyPoints"
                  placeholder="List specific topics, statistics, or examples you want included..."
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  className="min-h-20"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder={contentType === 'blog' ? "e.g., Digital Transformation" : "e.g., AI in Healthcare"}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((i) => (
                    <SelectItem key={i.value} value={i.value}>
                      {i.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/inspiration">
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Inspiration
              </Link>
            </Button>
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !topic || !tone || !industry || (contentType === 'blog' && !blogTitle)}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                {contentType === 'blog' ? 'Generating Blog Article...' : 'Generating Content...'}
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                {contentType === 'blog' ? 'Generate Blog Article' : 'Generate Content'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {contentType === 'blog' ? 'Generated Blog Article' : 'Generated Content'}
            </h3>
            {contentType === 'blog' && generatedPosts[0] && (
              <Badge variant="outline" className="text-blue-600">
                {getWordCount(generatedPosts[0])} words
              </Badge>
            )}
          </div>
          {generatedPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {contentType === 'blog' ? blogTitle || `Blog Article ${index + 1}` : `Generated Post ${index + 1}`}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(post)}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => saveAsDraft(post)}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save Draft
                    </Button>
                    {contentType === 'blog' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadBlogPost(post, blogTitle || `blog-article-${index + 1}`)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                    <Link href="/dashboard/schedule">
                      <Button size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={post}
                  onChange={(e) => {
                    const newPosts = [...generatedPosts];
                    newPosts[index] = e.target.value;
                    setGeneratedPosts(newPosts);
                  }}
                  className={`${contentType === 'blog' ? 'min-h-[600px]' : 'min-h-[400px]'} font-mono text-sm`}
                />
                {contentType === 'blog' && (
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{getWordCount(post)} words</span>
                    <span>Target: 3,000+ words for comprehensive blog articles</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}