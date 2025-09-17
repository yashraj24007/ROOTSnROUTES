import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, MapPin, Star, Heart, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface CommunityMessage {
  id: string;
  user_name: string;
  message: string;
  location: string;
  rating?: number;
  created_at: string;
  likes: number;
}

interface CommunityProps {
  onClose: () => void;
}

const Community = ({ onClose }: CommunityProps) => {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('community_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load community messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMessages();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('community_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_messages'
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as CommunityMessage]);
        scrollToBottom();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchMessages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName.trim() || !location.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('community_messages')
        .insert([
          {
            user_name: userName.trim(),
            message: newMessage.trim(),
            location: location.trim(),
            rating: rating,
            likes: 0,
          }
        ]);

      if (error) throw error;

      setNewMessage("");
      setRating(null);
      toast({
        title: "Message shared!",
        description: "Thank you for sharing your experience with the community.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast({
        title: "Failed to share",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-white dark:bg-forest-900 border-forest-200 dark:border-forest-700 shadow-organic-lg flex flex-col">
        <CardHeader className="relative border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <CardTitle className="flex items-center space-x-2 text-forest-900 dark:text-forest-100">
            <MessageSquare className="h-5 w-5 text-forest-500" />
            <span>Community Stories</span>
          </CardTitle>
          <CardDescription className="text-earth-700 dark:text-earth-200">
            Share your experiences and discover hidden gems through local insights
          </CardDescription>
        </CardHeader>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-muted-foreground">Loading community stories...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Be the first to share your experience!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 rounded-lg bg-gradient-organic/10 border border-forest-100 dark:border-forest-800">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-forest-500 to-autumn-500 text-white">
                            {getInitials(message.user_name)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-forest-900 dark:text-forest-100">
                              {message.user_name}
                            </h4>
                            <div className="flex items-center space-x-1 text-earth-600 dark:text-earth-300">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs">{message.location}</span>
                            </div>
                            {message.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-golden-500 fill-current" />
                                <span className="text-xs text-golden-600 dark:text-golden-400">
                                  {message.rating}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-forest-900 dark:text-forest-100 mb-2">
                            {message.message}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{formatDate(message.created_at)}</span>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{message.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Message Form */}
          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-border p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-900 dark:text-forest-100">
                  Your Name *
                </label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="border-forest-200 dark:border-forest-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-900 dark:text-forest-100">
                  Place Visited *
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Hundru Falls, Ranchi"
                  className="border-forest-200 dark:border-forest-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-900 dark:text-forest-100">
                  Rating (Optional)
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      className={`w-6 h-6 ${
                        rating && star <= rating
                          ? 'text-golden-500 fill-current'
                          : 'text-muted-foreground hover:text-golden-400'
                      }`}
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-forest-900 dark:text-forest-100">
                  Share Your Experience *
                </label>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tell us about your visit, what you loved, tips for other travelers..."
                  className="border-forest-200 dark:border-forest-700 resize-none"
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-forest-500 to-autumn-500 hover:from-forest-600 hover:to-autumn-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sharing..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Share Experience
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Community;