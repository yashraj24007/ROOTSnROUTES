// AI-powered feedback and sentiment analysis service
export interface FeedbackData {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  category: 'destination' | 'transport' | 'accommodation' | 'service' | 'overall' | 'guide' | 'marketplace';
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  images?: string[];
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  relatedId?: string; // ID of destination, service, etc.
  relatedName?: string; // Name of destination, service, etc.
  timestamp: string;
  isAnonymous: boolean;
  tags: string[];
  sentiment?: SentimentAnalysis;
  status: 'pending' | 'reviewed' | 'resolved' | 'archived';
  adminResponse?: AdminResponse;
}

export interface SentimentAnalysis {
  overall: 'positive' | 'negative' | 'neutral';
  score: number; // -1 to 1, where -1 is very negative, 1 is very positive
  confidence: number; // 0 to 1
  emotions: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
    disgust: number;
  };
  keyPhrases: string[];
  themes: string[];
  urgency: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  suggestedCategory?: string;
}

export interface AdminResponse {
  responderId: string;
  responderName: string;
  message: string;
  timestamp: string;
  actions: string[];
}

export interface FeedbackFilters {
  category?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  rating?: number;
  urgency?: 'low' | 'medium' | 'high';
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  location?: string;
  searchQuery?: string;
}

export interface FeedbackSummary {
  totalFeedback: number;
  averageRating: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  categoryBreakdown: Record<string, number>;
  urgentIssues: number;
  resolvedIssues: number;
  commonThemes: Array<{ theme: string; count: number; sentiment: string }>;
  trendingIssues: Array<{ issue: string; count: number; trend: 'rising' | 'falling' | 'stable' }>;
}

class FeedbackAnalysisService {
  private mockFeedback: FeedbackData[] = [
    {
      id: 'fb_001',
      userId: 'user_001',
      userName: 'Priya Sharma',
      userEmail: 'priya@example.com',
      category: 'destination',
      rating: 5,
      title: 'Amazing experience at Hundru Falls',
      comment: 'The waterfalls were absolutely breathtaking! The trek was well-maintained and our guide was very knowledgeable about the local flora and fauna. Perfect spot for photography.',
      location: {
        lat: 23.4208,
        lng: 85.5908,
        address: 'Hundru Falls, Ranchi, Jharkhand'
      },
      relatedId: 'dest_hundru_falls',
      relatedName: 'Hundru Falls',
      timestamp: '2024-01-20T14:30:00Z',
      isAnonymous: false,
      tags: ['waterfalls', 'trekking', 'photography', 'nature'],
      sentiment: {
        overall: 'positive',
        score: 0.85,
        confidence: 0.92,
        emotions: {
          joy: 0.75,
          sadness: 0.1,
          anger: 0.05,
          fear: 0.05,
          surprise: 0.3,
          disgust: 0.02
        },
        keyPhrases: ['breathtaking', 'well-maintained', 'knowledgeable guide', 'perfect spot'],
        themes: ['nature appreciation', 'guide service', 'maintenance quality'],
        urgency: 'low',
        actionRequired: false
      },
      status: 'reviewed'
    },
    {
      id: 'fb_002',
      userId: 'user_002',
      userName: 'Rajesh Kumar',
      category: 'transport',
      rating: 2,
      title: 'Poor bus connectivity to tribal villages',
      comment: 'Very disappointed with the public transport system. Buses are irregular, overcrowded, and often break down. We waited for 3 hours to get transport to the village. This needs urgent attention for tourism development.',
      timestamp: '2024-01-18T09:15:00Z',
      isAnonymous: false,
      tags: ['transport', 'buses', 'villages', 'infrastructure'],
      sentiment: {
        overall: 'negative',
        score: -0.72,
        confidence: 0.89,
        emotions: {
          joy: 0.1,
          sadness: 0.4,
          anger: 0.65,
          fear: 0.2,
          surprise: 0.1,
          disgust: 0.5
        },
        keyPhrases: ['very disappointed', 'irregular', 'overcrowded', 'urgent attention'],
        themes: ['transport reliability', 'infrastructure problems', 'service quality'],
        urgency: 'high',
        actionRequired: true,
        suggestedCategory: 'infrastructure'
      },
      status: 'pending'
    },
    {
      id: 'fb_003',
      userId: 'user_003',
      userName: 'Anonymous User',
      category: 'accommodation',
      rating: 4,
      title: 'Great homestay experience',
      comment: 'Stayed at a tribal homestay in Khunti. The family was incredibly welcoming and the food was authentic and delicious. Only minor issue was the lack of hot water in the morning.',
      location: {
        lat: 23.0315,
        lng: 85.2784,
        address: 'Khunti, Jharkhand'
      },
      timestamp: '2024-01-15T20:45:00Z',
      isAnonymous: true,
      tags: ['homestay', 'tribal', 'food', 'hospitality'],
      sentiment: {
        overall: 'positive',
        score: 0.68,
        confidence: 0.85,
        emotions: {
          joy: 0.6,
          sadness: 0.15,
          anger: 0.1,
          fear: 0.05,
          surprise: 0.2,
          disgust: 0.1
        },
        keyPhrases: ['incredibly welcoming', 'authentic and delicious', 'minor issue'],
        themes: ['hospitality', 'authentic food', 'basic amenities'],
        urgency: 'low',
        actionRequired: true
      },
      status: 'reviewed'
    },
    {
      id: 'fb_004',
      userId: 'user_004',
      userName: 'Tourist Guide Association',
      category: 'service',
      rating: 1,
      title: 'Urgent: Safety concerns at Betla National Park',
      comment: 'There have been multiple incidents of tourists getting lost due to inadequate signage and lack of proper safety measures. The forest department needs to install better trail markers and emergency communication systems immediately.',
      relatedId: 'dest_betla_park',
      relatedName: 'Betla National Park',
      timestamp: '2024-01-22T11:00:00Z',
      isAnonymous: false,
      tags: ['safety', 'signage', 'emergency', 'national-park'],
      sentiment: {
        overall: 'negative',
        score: -0.88,
        confidence: 0.95,
        emotions: {
          joy: 0.05,
          sadness: 0.3,
          anger: 0.7,
          fear: 0.8,
          surprise: 0.1,
          disgust: 0.4
        },
        keyPhrases: ['urgent', 'safety concerns', 'multiple incidents', 'immediately'],
        themes: ['safety measures', 'infrastructure', 'emergency preparedness'],
        urgency: 'high',
        actionRequired: true,
        suggestedCategory: 'safety'
      },
      status: 'pending'
    }
  ];

  async submitFeedback(feedbackData: Omit<FeedbackData, 'id' | 'timestamp' | 'sentiment' | 'status'>): Promise<FeedbackData> {
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simulate AI sentiment analysis
    const sentiment = await this.analyzeSentiment(feedbackData.comment, feedbackData.rating);
    
    const feedback: FeedbackData = {
      ...feedbackData,
      id: `fb_${Date.now()}`,
      timestamp: new Date().toISOString(),
      sentiment,
      status: 'pending'
    };

    // In real implementation, save to database
    console.log('Feedback submitted:', feedback);
    
    return feedback;
  }

  async analyzeSentiment(text: string, rating: number): Promise<SentimentAnalysis> {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock AI sentiment analysis - in real implementation, use AI service like Groq
    let overall: 'positive' | 'negative' | 'neutral' = 'neutral';
    let score = 0;
    
    if (rating >= 4) {
      overall = 'positive';
      score = 0.3 + (rating - 4) * 0.35; // 0.3 to 0.65 for 4-5 stars
    } else if (rating <= 2) {
      overall = 'negative';
      score = -0.3 - (2 - rating) * 0.35; // -0.3 to -0.65 for 2-1 stars
    }

    // Adjust based on text content
    const positiveWords = ['amazing', 'great', 'excellent', 'wonderful', 'beautiful', 'perfect', 'love', 'fantastic'];
    const negativeWords = ['terrible', 'awful', 'horrible', 'disappointing', 'poor', 'bad', 'worst', 'urgent'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      overall = 'positive';
      score = Math.max(score, 0.4 + positiveCount * 0.15);
    } else if (negativeCount > positiveCount) {
      overall = 'negative';
      score = Math.min(score, -0.4 - negativeCount * 0.15);
    }

    // Extract key phrases (simplified)
    const keyPhrases = this.extractKeyPhrases(text);
    const themes = this.extractThemes(text);
    const urgency = this.determineUrgency(text, rating);

    return {
      overall,
      score: Math.max(-1, Math.min(1, score)),
      confidence: 0.8 + Math.random() * 0.2,
      emotions: {
        joy: overall === 'positive' ? 0.6 + Math.random() * 0.3 : 0.1 + Math.random() * 0.2,
        sadness: overall === 'negative' ? 0.3 + Math.random() * 0.3 : 0.1 + Math.random() * 0.1,
        anger: negativeCount > 0 ? 0.4 + Math.random() * 0.4 : 0.05 + Math.random() * 0.1,
        fear: text.includes('safety') || text.includes('danger') ? 0.5 + Math.random() * 0.3 : 0.05 + Math.random() * 0.1,
        surprise: 0.1 + Math.random() * 0.3,
        disgust: overall === 'negative' ? 0.2 + Math.random() * 0.3 : 0.02 + Math.random() * 0.08
      },
      keyPhrases,
      themes,
      urgency,
      actionRequired: urgency === 'high' || rating <= 2 || text.includes('urgent')
    };
  }

  private extractKeyPhrases(text: string): string[] {
    // Simplified key phrase extraction
    const phrases = text.match(/\b[\w\s]{10,30}\b/g) || [];
    return phrases.slice(0, 5).map(phrase => phrase.trim());
  }

  private extractThemes(text: string): string[] {
    const themeKeywords = {
      'infrastructure': ['transport', 'road', 'facility', 'maintenance', 'connectivity'],
      'safety': ['safety', 'security', 'danger', 'risk', 'emergency'],
      'hospitality': ['staff', 'service', 'welcoming', 'friendly', 'helpful'],
      'cleanliness': ['clean', 'dirty', 'hygiene', 'sanitation'],
      'accessibility': ['wheelchair', 'disabled', 'access', 'barrier'],
      'nature': ['nature', 'wildlife', 'forest', 'natural', 'environment']
    };

    const lowerText = text.toLowerCase();
    const themes: string[] = [];

    for (const [theme, keywords] of Object.entries(themeKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        themes.push(theme);
      }
    }

    return themes;
  }

  private determineUrgency(text: string, rating: number): 'low' | 'medium' | 'high' {
    const lowerText = text.toLowerCase();
    const urgentWords = ['urgent', 'emergency', 'immediate', 'critical', 'dangerous'];
    const hasUrgentWords = urgentWords.some(word => lowerText.includes(word));

    if (hasUrgentWords || rating === 1) return 'high';
    if (rating === 2 || lowerText.includes('problem') || lowerText.includes('issue')) return 'medium';
    return 'low';
  }

  async getFeedback(filters?: FeedbackFilters): Promise<FeedbackData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    let feedback = [...this.mockFeedback];

    if (filters) {
      if (filters.category) {
        feedback = feedback.filter(f => f.category === filters.category);
      }
      
      if (filters.sentiment) {
        feedback = feedback.filter(f => f.sentiment?.overall === filters.sentiment);
      }
      
      if (filters.rating) {
        feedback = feedback.filter(f => f.rating === filters.rating);
      }
      
      if (filters.urgency) {
        feedback = feedback.filter(f => f.sentiment?.urgency === filters.urgency);
      }
      
      if (filters.status) {
        feedback = feedback.filter(f => f.status === filters.status);
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        feedback = feedback.filter(f => 
          f.title.toLowerCase().includes(query) ||
          f.comment.toLowerCase().includes(query) ||
          f.tags.some(tag => tag.includes(query))
        );
      }
    }

    return feedback.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getFeedbackSummary(): Promise<FeedbackSummary> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const feedback = this.mockFeedback;
    const totalFeedback = feedback.length;
    const averageRating = feedback.reduce((sum, f) => sum + f.rating, 0) / totalFeedback;

    const sentimentDistribution = feedback.reduce((acc, f) => {
      const sentiment = f.sentiment?.overall || 'neutral';
      acc[sentiment] = (acc[sentiment] || 0) + 1;
      return acc;
    }, { positive: 0, negative: 0, neutral: 0 });

    const categoryBreakdown = feedback.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const urgentIssues = feedback.filter(f => f.sentiment?.urgency === 'high').length;
    const resolvedIssues = feedback.filter(f => f.status === 'resolved').length;

    // Extract common themes
    const allThemes = feedback.flatMap(f => f.sentiment?.themes || []);
    const themeCount = allThemes.reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const commonThemes = Object.entries(themeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([theme, count]) => ({
        theme,
        count,
        sentiment: 'mixed' // In real implementation, analyze sentiment for each theme
      }));

    return {
      totalFeedback,
      averageRating: Math.round(averageRating * 10) / 10,
      sentimentDistribution,
      categoryBreakdown,
      urgentIssues,
      resolvedIssues,
      commonThemes,
      trendingIssues: [
        { issue: 'Transport connectivity', count: 5, trend: 'rising' },
        { issue: 'Safety measures', count: 3, trend: 'stable' },
        { issue: 'Guide services', count: 2, trend: 'falling' }
      ]
    };
  }

  async updateFeedbackStatus(feedbackId: string, status: FeedbackData['status'], adminResponse?: Omit<AdminResponse, 'timestamp'>): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));

    // In real implementation, update database
    console.log(`Feedback ${feedbackId} status updated to ${status}`, adminResponse);
  }

  getFeedbackCategories(): Array<{ value: string; label: string; icon: string }> {
    return [
      { value: 'destination', label: 'Destinations', icon: '🏞️' },
      { value: 'transport', label: 'Transport', icon: '🚌' },
      { value: 'accommodation', label: 'Accommodation', icon: '🏠' },
      { value: 'service', label: 'Services', icon: '🛎️' },
      { value: 'guide', label: 'Tour Guides', icon: '👨‍🏫' },
      { value: 'marketplace', label: 'Marketplace', icon: '🛍️' },
      { value: 'overall', label: 'Overall Experience', icon: '⭐' }
    ];
  }
}

export const feedbackAnalysisService = new FeedbackAnalysisService();