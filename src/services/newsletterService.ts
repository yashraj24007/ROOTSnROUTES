// Newsletter Service with Local Storage Fallback
// Use this service when Supabase is not available

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  source: string;
}

export class NewsletterService {
  private static readonly STORAGE_KEY = 'newsletter_subscriptions';

  // Save subscription to local storage as fallback
  static saveToLocalStorage(email: string, source: string = 'footer'): boolean {
    try {
      const subscriptions = this.getLocalSubscriptions();
      
      // Check if email already exists
      if (subscriptions.some(sub => sub.email === email)) {
        return false; // Already subscribed
      }

      const newSubscription: NewsletterSubscription = {
        email,
        subscribedAt: new Date().toISOString(),
        source
      };

      subscriptions.push(newSubscription);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscriptions));
      
      return true; // Successfully saved
    } catch (error) {
      console.error('Failed to save to local storage:', error);
      return false;
    }
  }

  // Get all local subscriptions
  static getLocalSubscriptions(): NewsletterSubscription[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to read from local storage:', error);
      return [];
    }
  }

  // Check if email is already subscribed locally
  static isSubscribedLocally(email: string): boolean {
    const subscriptions = this.getLocalSubscriptions();
    return subscriptions.some(sub => sub.email === email);
  }

  // Export subscriptions for later sync with Supabase
  static exportSubscriptions(): NewsletterSubscription[] {
    return this.getLocalSubscriptions();
  }

  // Clear local subscriptions (after successful sync)
  static clearLocalSubscriptions(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear local subscriptions:', error);
    }
  }

  // Send email to backend service (when available)
  static async sendToBackend(email: string): Promise<boolean> {
    try {
      // This could be implemented to send to your backend service
      // For now, we'll just log it
      console.log('Email subscription to be processed:', email);
      
      // In a real implementation, you might:
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // return response.ok;
      
      return true;
    } catch (error) {
      console.error('Failed to send to backend:', error);
      return false;
    }
  }
}

export default NewsletterService;