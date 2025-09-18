import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, TrendingUp, AlertTriangle, Star, Filter, Send, Eye, BarChart3, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { feedbackAnalysisService, FeedbackData, FeedbackSummary, SentimentAnalysis } from '../services/feedbackAnalysisService';
import { toast } from '../hooks/use-toast';

interface FeedbackAnalysisProps {
  className?: string;
}

const FeedbackAnalysis: React.FC<FeedbackAnalysisProps> = ({ className = '' }) => {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [summary, setSummary] = useState<FeedbackSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [showFeedbackDetail, setShowFeedbackDetail] = useState<FeedbackData | null>(null);

  const categories = feedbackAnalysisService.getFeedbackCategories();

  const loadFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory || undefined,
        sentiment: selectedSentiment as 'positive' | 'negative' | 'neutral' || undefined,
        urgency: selectedUrgency as 'low' | 'medium' | 'high' || undefined,
        searchQuery: searchQuery || undefined
      };
      
      const feedbackData = await feedbackAnalysisService.getFeedback(filters);
      setFeedback(feedbackData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load feedback data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedSentiment, selectedUrgency, searchQuery]);

  useEffect(() => {
    loadFeedback();
    loadSummary();
  }, [loadFeedback]);

  const loadSummary = async () => {
    try {
      const summaryData = await feedbackAnalysisService.getFeedbackSummary();
      setSummary(summaryData);
    } catch (error) {
      console.error('Failed to load feedback summary:', error);
    }
  };

  const handleSubmitFeedback = async (formData: FormData) => {
    const feedbackData = {
      userId: 'current_user', // In real app, get from auth context
      userName: formData.get('userName') as string,
      userEmail: formData.get('userEmail') as string,
      category: formData.get('category') as FeedbackData['category'],
      rating: parseInt(formData.get('rating') as string),
      title: formData.get('title') as string,
      comment: formData.get('comment') as string,
      relatedName: formData.get('relatedName') as string,
      isAnonymous: formData.get('isAnonymous') === 'true',
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      await feedbackAnalysisService.submitFeedback(feedbackData);
      setShowSubmitForm(false);
      loadFeedback();
      loadSummary();
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! It will help us improve our services."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive"
      });
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'negative': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950 border-red-200 dark:border-red-800';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-950';
      default: return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const FeedbackCard = ({ feedbackItem }: { feedbackItem: FeedbackData }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {categories.find(c => c.value === feedbackItem.category)?.icon} {categories.find(c => c.value === feedbackItem.category)?.label}
            </Badge>
            {feedbackItem.sentiment?.urgency === 'high' && (
              <Badge className={getUrgencyColor('high')}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(feedbackItem.rating)}
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{feedbackItem.title}</CardTitle>
        <CardDescription>
          By {feedbackItem.isAnonymous ? 'Anonymous' : feedbackItem.userName} • {new Date(feedbackItem.timestamp).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm line-clamp-3">{feedbackItem.comment}</p>
        
        {feedbackItem.sentiment && (
          <div className="flex items-center space-x-4">
            <Badge className={getSentimentColor(feedbackItem.sentiment.overall)}>
              {feedbackItem.sentiment.overall}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Confidence: {Math.round(feedbackItem.sentiment.confidence * 100)}%
            </span>
          </div>
        )}

        {feedbackItem.relatedName && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{feedbackItem.relatedName}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {feedbackItem.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          onClick={() => setShowFeedbackDetail(feedbackItem)}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Analysis
        </Button>
      </CardFooter>
    </Card>
  );

  const SentimentChart = ({ sentiment }: { sentiment: SentimentAnalysis }) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Emotion Analysis</h4>
        <div className="space-y-2">
          {Object.entries(sentiment.emotions).map(([emotion, value]) => (
            <div key={emotion} className="flex items-center space-x-3">
              <span className="w-16 text-sm capitalize">{emotion}</span>
              <div className="flex-1">
                <Progress value={value * 100} className="h-2" />
              </div>
              <span className="text-sm w-12">{Math.round(value * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Key Themes</h4>
        <div className="flex flex-wrap gap-2">
          {sentiment.themes.map(theme => (
            <Badge key={theme} variant="outline" className="text-xs">
              {theme}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Key Phrases</h4>
        <div className="text-sm text-muted-foreground">
          {sentiment.keyPhrases.slice(0, 3).map((phrase, index) => (
            <span key={index} className="italic">"{phrase}"{index < 2 ? ', ' : ''}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`container mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">AI Feedback Analysis</h1>
          <p className="text-muted-foreground">
            Analyze tourist feedback with AI-powered sentiment analysis
          </p>
        </div>
        
        <Dialog open={showSubmitForm} onOpenChange={setShowSubmitForm}>
          <DialogTrigger asChild>
            <Button>
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Your Feedback</DialogTitle>
              <DialogDescription>
                Help us improve by sharing your experience
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitFeedback(new FormData(e.target as HTMLFormElement));
            }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userName">Name</Label>
                  <Input name="userName" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="userEmail">Email (optional)</Label>
                  <Input name="userEmail" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Select name="rating" required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                      <SelectItem value="2">⭐⭐ Fair</SelectItem>
                      <SelectItem value="1">⭐ Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input name="title" placeholder="Brief title for your feedback" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="comment">Your Experience</Label>
                  <Textarea 
                    name="comment" 
                    placeholder="Share your detailed experience, suggestions, or concerns..."
                    className="min-h-[100px]"
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="relatedName">Related Place/Service</Label>
                  <Input name="relatedName" placeholder="e.g., Hundru Falls, XYZ Hotel" />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input name="tags" placeholder="e.g., nature, guide, transport" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Checkbox name="isAnonymous" value="true" />
                  <Label htmlFor="isAnonymous">Submit anonymously</Label>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setShowSubmitForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Dashboard */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalFeedback}</div>
              <p className="text-xs text-muted-foreground">
                Average Rating: {summary.averageRating}/5
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Positive</span>
                  <span>{summary.sentimentDistribution.positive}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">Negative</span>
                  <span>{summary.sentimentDistribution.negative}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Neutral</span>
                  <span>{summary.sentimentDistribution.neutral}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Urgent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{summary.urgentIssues}</div>
              <p className="text-xs text-muted-foreground">
                Resolved: {summary.resolvedIssues}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Common Themes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {summary.commonThemes.slice(0, 3).map(theme => (
                  <div key={theme.theme} className="text-sm">
                    <span className="font-medium">{theme.theme}</span>
                    <span className="text-muted-foreground ml-2">({theme.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label>Search</Label>
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Sentiment</Label>
            <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
              <SelectTrigger>
                <SelectValue placeholder="All Sentiments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sentiments</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Urgency</Label>
            <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="All Urgency Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Urgency Levels</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Feedback List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Feedback ({feedback.length})</h2>
          <Button variant="outline" size="sm" onClick={loadFeedback}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : feedback.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedback.map(feedbackItem => (
              <FeedbackCard key={feedbackItem.id} feedbackItem={feedbackItem} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">No feedback found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later
            </p>
          </Card>
        )}
      </div>

      {/* Feedback Detail Modal */}
      <Dialog open={!!showFeedbackDetail} onOpenChange={() => setShowFeedbackDetail(null)}>
        {showFeedbackDetail && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{showFeedbackDetail.title}</DialogTitle>
              <DialogDescription>
                Detailed feedback analysis with AI-powered insights
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Feedback Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>User:</span>
                      <span>{showFeedbackDetail.isAnonymous ? 'Anonymous' : showFeedbackDetail.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{new Date(showFeedbackDetail.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <Badge variant="outline">
                        {categories.find(c => c.value === showFeedbackDetail.category)?.label}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(showFeedbackDetail.rating)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Comment</h3>
                  <p className="text-sm text-muted-foreground">
                    {showFeedbackDetail.comment}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {showFeedbackDetail.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {showFeedbackDetail.sentiment && (
                  <>
                    <h3 className="font-semibold mb-4">AI Sentiment Analysis</h3>
                    <SentimentChart sentiment={showFeedbackDetail.sentiment} />
                  </>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setShowFeedbackDetail(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default FeedbackAnalysis;