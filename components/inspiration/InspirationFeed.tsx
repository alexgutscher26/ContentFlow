'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Lightbulb, 
  Shuffle, 
  Search, 
  Filter,
  Heart,
  MessageCircle,
  Share,
  Eye,
  ExternalLink,
  Copy,
  Bookmark,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  InspirationPost, 
  InspirationCategory, 
  INSPIRATION_CATEGORIES,
  getInspirationPosts,
  getRandomInspirationPosts,
  searchInspirationPosts
} from '@/lib/inspiration';

export default function InspirationFeed() {
  const [selectedCategories, setSelectedCategories] = useState<InspirationCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<InspirationPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial posts and restore session preferences
  useEffect(() => {
    // Restore categories from session storage
    const savedCategories = sessionStorage.getItem('inspiration-categories');
    if (savedCategories) {
      const categories = JSON.parse(savedCategories) as InspirationCategory[];
      setSelectedCategories(categories);
      setPosts(getInspirationPosts(categories, 6));
    } else {
      setPosts(getRandomInspirationPosts(6));
    }
  }, []);

  // Save categories to session storage
  useEffect(() => {
    sessionStorage.setItem('inspiration-categories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  const handleCategoryToggle = (category: InspirationCategory) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    
    // Update posts based on new categories
    if (searchQuery) {
      setPosts(searchInspirationPosts(searchQuery, newCategories));
    } else {
      setPosts(newCategories.length > 0 ? getInspirationPosts(newCategories, 6) : getRandomInspirationPosts(6));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setPosts(searchInspirationPosts(query, selectedCategories));
    } else {
      setPosts(selectedCategories.length > 0 ? getInspirationPosts(selectedCategories, 6) : getRandomInspirationPosts(6));
    }
  };

  const handleFetchMore = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newPosts = selectedCategories.length > 0 
        ? getInspirationPosts(selectedCategories, 6)
        : getRandomInspirationPosts(6);
      setPosts(newPosts);
      setIsLoading(false);
      toast.success('Fresh inspiration loaded!');
    }, 800);
  };

  const handleShuffle = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const shuffledPosts = getRandomInspirationPosts(6);
      setPosts(shuffledPosts);
      setIsLoading(false);
      toast.success('Posts shuffled!');
    }, 500);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setPosts(getRandomInspirationPosts(6));
  };

  const copyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Content copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  const formatEngagement = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post Inspiration</h1>
          <p className="text-muted-foreground">
            Discover high-performing LinkedIn posts to spark your content ideas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleShuffle} disabled={isLoading}>
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
          <Button onClick={handleFetchMore} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Fetch More
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Filters & Search</span>
          </CardTitle>
          <CardDescription>
            Filter inspiration posts by category and search for specific topics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search posts by content, author, or tags..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Categories</h3>
              {(selectedCategories.length > 0 || searchQuery) && (
                <Button size="sm" variant="ghost" onClick={handleClearFilters}>
                  Clear All
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(INSPIRATION_CATEGORIES).map(([key, label]) => {
                const isSelected = selectedCategories.includes(key as InspirationCategory);
                return (
                  <Button
                    key={key}
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleCategoryToggle(key as InspirationCategory)}
                    className={`transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategories.length > 0 || searchQuery) && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategories.map(category => (
                <Badge key={category} variant="secondary">
                  {INSPIRATION_CATEGORIES[category]}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inspiration Posts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{post.author.name}</h3>
                      <p className="text-xs text-muted-foreground">{post.author.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatEngagement(post.author.followers)} followers • {formatDate(post.publishedAt)}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-1">
                {post.category.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {INSPIRATION_CATEGORIES[cat as InspirationCategory]}
                  </Badge>
                ))}
              </div>

              {/* Content Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <ScrollArea className="h-32">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </ScrollArea>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{formatEngagement(post.engagement.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span>{formatEngagement(post.engagement.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3 text-blue-500" />
                    <span>{formatEngagement(post.engagement.comments)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share className="h-3 w-3 text-green-500" />
                    <span>{formatEngagement(post.engagement.shares)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyContent(post.content)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Bookmark className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag.replace(/\s+/g, '')}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && !isLoading && (
        <Card>
          <CardContent className="text-center py-12">
            <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No inspiration posts found</h3>
            <p className="text-sm text-gray-500 mb-4">
              Try adjusting your filters or search query to discover more content
            </p>
            <Button onClick={handleClearFilters}>
              <Sparkles className="mr-2 h-4 w-4" />
              Show All Posts
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}