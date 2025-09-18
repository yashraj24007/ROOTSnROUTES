import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { messageService, UserMessage } from '@/services/messageService';
import { allDestinations } from '@/data/completeDestinations';

interface FeedbackFormProps {
  destinationId?: string;
  destinationName?: string;
  onSuccess?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  destinationId, 
  destinationName, 
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message_type: 'feedback' as const,
    subject: '',
    message: '',
    rating: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const messageTypes = [
    { value: 'feedback', label: 'General Feedback', icon: '💬' },
    { value: 'support', label: 'Support Request', icon: '🆘' },
    { value: 'bug_report', label: 'Bug Report', icon: '🐛' },
    { value: 'suggestion', label: 'Suggestion', icon: '💡' }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_name.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in your name and message.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const messageData: Omit<UserMessage, 'id' | 'created_at' | 'status'> = {
        ...formData,
        destination_id: destinationId,
        destination_name: destinationName,
        user_email: formData.user_email || undefined,
        rating: formData.rating > 0 ? formData.rating : undefined
      };

      const result = await messageService.submitUserMessage(messageData);

      if (result) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your message has been submitted successfully.');
        
        // Reset form
        setFormData({
          user_name: '',
          user_email: '',
          message_type: 'feedback',
          subject: '',
          message: '',
          rating: 0
        });

        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error('Failed to submit message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your message. Please try again.');
      console.error('Feedback submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="text-primary" />
          Share Your Experience
        </CardTitle>
        {destinationName && (
          <p className="text-sm text-muted-foreground">
            About: <span className="font-semibold">{destinationName}</span>
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle size={20} />
              <span className="font-semibold">Success!</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              {submitMessage}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertCircle size={20} />
              <span className="font-semibold">Error</span>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              {submitMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Your Name *
              </label>
              <Input
                value={formData.user_name}
                onChange={(e) => handleInputChange('user_name', e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Email (Optional)
              </label>
              <Input
                type="email"
                value={formData.user_email}
                onChange={(e) => handleInputChange('user_email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Message Type
            </label>
            <Select 
              value={formData.message_type} 
              onValueChange={(value) => handleInputChange('message_type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {messageTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      {type.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Subject
            </label>
            <Input
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Brief summary of your message"
            />
          </div>

          {destinationName && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rating (Optional)
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      size={24}
                      className={`${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } hover:text-yellow-400`}
                    />
                  </button>
                ))}
                {formData.rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formData.rating}/5 stars
                  </span>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">
              Your Message *
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Share your thoughts, feedback, or questions..."
              rows={6}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} className="mr-2" />
                Submit Message
              </>
            )}
          </Button>
        </form>

        <div className="text-xs text-muted-foreground text-center pt-4 border-t">
          Your message will be reviewed by our team. We appreciate your feedback and will respond if needed.
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;