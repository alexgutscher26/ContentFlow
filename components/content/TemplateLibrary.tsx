'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookTemplate as Template, Search, Filter, Sparkles, TrendingUp, FileText, User, Briefcase, Building, X, ChevronRight, Clock, Target } from 'lucide-react';
import { AI_TEMPLATES, TEMPLATE_CATEGORIES, Template as TemplateType, generateContentFromTemplate } from '@/lib/templates';
import { INDUSTRIES } from '@/lib/constants';

interface TemplateLibraryProps {
  onSelectTemplate: (template: TemplateType, customizations: Record<string, string>) => void;
  onClose: () => void;
}

export default function TemplateLibrary({ onSelectTemplate, onClose }: TemplateLibraryProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);
  const [customizations, setCustomizations] = useState<Record<string, string>>({});

  const filteredTemplates = AI_TEMPLATES.filter(template => {
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry;
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesIndustry && matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
    // Initialize customizations with empty values
    const initialCustomizations: Record<string, string> = {};
    template.placeholders.forEach(placeholder => {
      initialCustomizations[placeholder] = '';
    });
    setCustomizations(initialCustomizations);
  };

  const handleCustomizationChange = (placeholder: string, value: string) => {
    setCustomizations(prev => ({
      ...prev,
      [placeholder]: value
    }));
  };

  const handleGenerateContent = () => {
    if (!selectedTemplate) return;
    
    // Check if all required customizations are filled
    const missingCustomizations = selectedTemplate.placeholders.filter(
      placeholder => !customizations[placeholder]?.trim()
    );
    
    if (missingCustomizations.length > 0) {
      return;
    }

    onSelectTemplate(selectedTemplate, customizations);
    onClose();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'thought-leadership':
        return <TrendingUp className="h-4 w-4 text-purple-600" />;
      case 'case-study':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'industry-news':
        return <Sparkles className="h-4 w-4 text-green-600" />;
      case 'personal-story':
        return <User className="h-4 w-4 text-orange-600" />;
      case 'tips-advice':
        return <Target className="h-4 w-4 text-red-600" />;
      case 'company-update':
        return <Building className="h-4 w-4 text-gray-600" />;
      default:
        return <Template className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPlaceholder = (placeholder: string) => {
    return placeholder.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center space-x-2">
                <Template className="h-5 w-5 text-blue-600" />
                <span>AI Template Library</span>
              </DialogTitle>
              <DialogDescription>
                Choose from industry-specific templates to create engaging LinkedIn content
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-3 h-[70vh]">
          {/* Template Browser */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {INDUSTRIES.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Template Grid */}
            <div className="overflow-y-auto h-full space-y-3 pr-2">
              {filteredTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(template.category)}
                          <h3 className="font-medium text-sm">{template.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {template.industry}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {template.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>~{Math.round(template.estimatedLength / 200)} min read</span>
                          </div>
                          <Badge className={getEngagementColor(template.engagement)}>
                            {template.engagement} engagement
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {template.preview}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredTemplates.length === 0 && (
                <div className="text-center py-8">
                  <Template className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-sm text-gray-500">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Template Customization */}
          <div className="border-l pl-6">
            {selectedTemplate ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedTemplate.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedTemplate.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="outline">{selectedTemplate.industry}</Badge>
                    <Badge className={getEngagementColor(selectedTemplate.engagement)}>
                      {selectedTemplate.engagement} engagement
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Customize Template</h4>
                  
                  {selectedTemplate.placeholders.map((placeholder) => (
                    <div key={placeholder} className="space-y-2">
                      <Label htmlFor={placeholder}>
                        {formatPlaceholder(placeholder)}
                      </Label>
                      <Input
                        id={placeholder}
                        placeholder={`Enter ${formatPlaceholder(placeholder).toLowerCase()}`}
                        value={customizations[placeholder] || ''}
                        onChange={(e) => handleCustomizationChange(placeholder, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Content Structure</h4>
                  <div className="space-y-2">
                    {selectedTemplate.structure.map((section, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                          {index + 1}
                        </div>
                        <span className="text-gray-600">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    onClick={handleGenerateContent}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={selectedTemplate.placeholders.some(p => !customizations[p]?.trim())}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </Button>
                  {selectedTemplate.placeholders.some(p => !customizations[p]?.trim()) && (
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Please fill in all customization fields
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Template className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Select a Template</h3>
                <p className="text-sm text-gray-500">
                  Choose a template from the library to customize and generate content
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}