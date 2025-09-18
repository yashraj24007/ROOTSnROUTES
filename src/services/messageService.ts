import { supabase } from '@/lib/supabase';

export interface UserMessage {
  id?: string;
  user_name: string;
  user_email?: string;
  message_type: 'feedback' | 'support' | 'bug_report' | 'suggestion';
  subject: string;
  message: string;
  destination_id?: string;
  destination_name?: string;
  rating?: number;
  created_at?: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
  response?: string;
  response_at?: string;
}

export interface ChatMessage {
  id?: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  destination_id?: string;
  destination_name?: string;
  message: string;
  message_type: 'text' | 'image' | 'location';
  created_at?: string;
  likes?: number;
  replies_count?: number;
}

export interface ChatReply {
  id?: string;
  message_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  reply: string;
  created_at?: string;
}

class MessageService {
  // Store user feedback and support messages
  async submitUserMessage(message: Omit<UserMessage, 'id' | 'created_at' | 'status'>): Promise<UserMessage | null> {
    try {
      const { data, error } = await supabase
        .from('user_messages')
        .insert([{
          ...message,
          status: 'new',
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error submitting message:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in submitUserMessage:', error);
      return null;
    }
  }

  // Get user messages (for admin/support dashboard)
  async getUserMessages(filters?: {
    message_type?: string;
    status?: string;
    destination_id?: string;
  }): Promise<UserMessage[]> {
    try {
      let query = supabase
        .from('user_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.message_type) {
        query = query.eq('message_type', filters.message_type);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.destination_id) {
        query = query.eq('destination_id', filters.destination_id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserMessages:', error);
      return [];
    }
  }

  // Chat functionality for community discussions
  async submitChatMessage(message: Omit<ChatMessage, 'id' | 'created_at' | 'likes' | 'replies_count'>): Promise<ChatMessage | null> {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          ...message,
          created_at: new Date().toISOString(),
          likes: 0,
          replies_count: 0
        }])
        .select()
        .single();

      if (error) {
        console.error('Error submitting chat message:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in submitChatMessage:', error);
      return null;
    }
  }

  // Get chat messages for a destination or general chat
  async getChatMessages(destinationId?: string, limit = 50): Promise<ChatMessage[]> {
    try {
      let query = supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (destinationId) {
        query = query.eq('destination_id', destinationId);
      } else {
        query = query.is('destination_id', null);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching chat messages:', error);
        return [];
      }

      return (data || []).reverse(); // Reverse to show chronological order
    } catch (error) {
      console.error('Error in getChatMessages:', error);
      return [];
    }
  }

  // Like a chat message
  async likeChatMessage(messageId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .rpc('increment_message_likes', { message_id: messageId });

      if (error) {
        console.error('Error liking message:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in likeChatMessage:', error);
      return false;
    }
  }

  // Submit reply to a chat message
  async submitChatReply(reply: Omit<ChatReply, 'id' | 'created_at'>): Promise<ChatReply | null> {
    try {
      const { data, error } = await supabase
        .from('chat_replies')
        .insert([{
          ...reply,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error submitting reply:', error);
        return null;
      }

      // Increment replies count
      await supabase
        .rpc('increment_message_replies', { message_id: reply.message_id });

      return data;
    } catch (error) {
      console.error('Error in submitChatReply:', error);
      return null;
    }
  }

  // Get replies for a message
  async getChatReplies(messageId: string): Promise<ChatReply[]> {
    try {
      const { data, error } = await supabase
        .from('chat_replies')
        .select('*')
        .eq('message_id', messageId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching replies:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getChatReplies:', error);
      return [];
    }
  }

  // Real-time subscription for chat messages
  subscribeToChat(
    callback: (payload: { eventType: string; new: ChatMessage; old: ChatMessage }) => void,
    destinationId?: string
  ) {
    // Note: Real-time subscriptions will need proper Supabase setup with RLS policies
    const channel = supabase.channel('chat_messages');
    return channel.subscribe();
  }

  // Unsubscribe from real-time updates
  unsubscribeFromChat(channel: ReturnType<typeof supabase.channel>) {
    return supabase.removeChannel(channel);
  }
}

export const messageService = new MessageService();