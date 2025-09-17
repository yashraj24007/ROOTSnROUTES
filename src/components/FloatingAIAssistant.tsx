import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, X, Minimize2, MessageSquare, Users } from 'lucide-react';
import Community from './Community';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your Jharkhand travel assistant. Ask me about destinations, transportation, local culture, or anything else about your trip!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for custom event to open AI assistant
  useEffect(() => {
    const handleOpenAI = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setShowCommunity(false);
    };

    window.addEventListener('openAIAssistant', handleOpenAI);
    return () => window.removeEventListener('openAIAssistant', handleOpenAI);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!apiKey) {
      alert('Please set your VITE_GROQ_API_KEY in the environment variables');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful travel assistant specializing in Jharkhand tourism. Provide helpful, accurate information about destinations, transportation, culture, and travel tips for Jharkhand, India. Keep responses concise but informative.'
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: currentInput
            }
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      
      let errorMsg = 'Sorry, I encountered an error. Please try again later.';
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMsg = 'Network error: Unable to connect. Please check your internet connection.';
        } else if (error.message.includes('401')) {
          errorMsg = 'Authentication error: Invalid API key.';
        } else if (error.message.includes('429')) {
          errorMsg = 'Rate limit exceeded: Please try again in a moment.';
        } else {
          errorMsg = `Error: ${error.message}`;
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl border-0 transition-all duration-300 hover:scale-110"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <Card className={`w-[420px] shadow-2xl border-2 border-emerald-200 transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-[500px]'
      }`}>
        <CardHeader className="p-3 border-b bg-emerald-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Bot className="w-4 h-4" />
              Jharkhand Travel Assistant
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCommunity(true)}
                className="h-6 w-6 p-0 text-white hover:bg-emerald-700"
                title="Community Stories"
              >
                <Users className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-emerald-700"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-emerald-700"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-[440px] p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 items-start ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <Avatar className="w-7 h-7 flex-shrink-0 mt-1">
                      <AvatarFallback className="text-xs bg-emerald-100">
                        {message.role === 'user' ? (
                          <User className="w-3 h-3 text-emerald-700" />
                        ) : (
                          <Bot className="w-3 h-3 text-emerald-700" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                        message.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-br-sm'
                          : 'bg-card text-foreground border border-border rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p className={`text-xs mt-2 opacity-70 ${
                        message.role === 'user' ? 'text-emerald-100' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex gap-3 items-start">
                    <Avatar className="w-7 h-7 mt-1">
                      <AvatarFallback className="text-xs bg-emerald-100">
                        <Bot className="w-3 h-3 text-emerald-700" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="border-t bg-gray-50 p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Jharkhand tourism..."
                  disabled={loading}
                  className="flex-1 h-10 text-sm px-4 border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  size="sm"
                  className="h-10 w-10 p-0 bg-emerald-600 hover:bg-emerald-700 rounded-full shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Community Modal */}
      {showCommunity && <Community onClose={() => setShowCommunity(false)} />}
    </div>
  );
};

export default FloatingAIAssistant;