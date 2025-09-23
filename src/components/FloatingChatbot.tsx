import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, X, Minimize2, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'hey traveller how can i help u',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const testAPIConnection = useCallback(async () => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      
      console.log('🧪 API test response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API connection successful! Available models:', data.data?.length || 0);
      } else {
        const errorText = await response.text();
        console.log('❌ API test failed:', response.status, errorText);
      }
    } catch (error) {
      console.log('❌ API test error:', error);
    }
  }, [apiKey]);

  useEffect(() => {
    // Debug API key
    console.log('🔑 FloatingChatbot - API Key loaded:', apiKey ? 'Yes' : 'No');
    console.log('🔑 API Key length:', apiKey ? apiKey.length : 0);
    console.log('🔑 API Key starts with gsk_:', apiKey ? apiKey.startsWith('gsk_') : false);
    
    // Test API connection
    if (apiKey) {
      console.log('🧪 Testing API connection...');
      testAPIConnection();
    }
  }, [apiKey, testAPIConnection]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!apiKey) {
      console.error('❌ No API key found');
      alert('Please set your VITE_GROQ_API_KEY in the environment variables');
      return;
    }

    console.log('🚀 FloatingChatbot - Starting API call...');
    console.log('📝 User input:', input);

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
      const requestBody = {
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
      };

      console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Response data:', data);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.',
        timestamp: new Date()
      };

      console.log('💬 Assistant response:', assistantMessage.content);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('💥 Detailed error:', error);
      
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
        <button
          onClick={() => setIsOpen(true)}
          className="bg-transparent border-0 p-0 transition-all duration-300 hover:scale-110 group animate-bounce hover:animate-none"
          aria-label="Open Jharkhand Travel Assistant"
          style={{ animationDuration: '2s' }}
        >
          <div className="relative">
            {/* Custom Robot SVG Icon */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl group-hover:scale-110 transition-transform duration-200"
            >
              {/* Robot Body */}
              <rect x="14" y="24" width="36" height="32" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2"/>
              
              {/* Robot Head */}
              <rect x="20" y="8" width="24" height="20" rx="6" fill="#34D399" stroke="#10B981" strokeWidth="2"/>
              
              {/* Robot Eyes */}
              <circle cx="28" cy="16" r="3" fill="#065F46"/>
              <circle cx="36" cy="16" r="3" fill="#065F46"/>
              <circle cx="28" cy="16" r="1.5" fill="#10B981"/>
              <circle cx="36" cy="16" r="1.5" fill="#10B981"/>
              
              {/* Robot Antenna */}
              <line x1="32" y1="8" x2="32" y2="4" stroke="#059669" strokeWidth="2"/>
              <circle cx="32" cy="4" r="2" fill="#F59E0B"/>
              
              {/* Robot Arms */}
              <rect x="6" y="28" width="8" height="16" rx="4" fill="#34D399" stroke="#10B981" strokeWidth="2"/>
              <rect x="50" y="28" width="8" height="16" rx="4" fill="#34D399" stroke="#10B981" strokeWidth="2"/>
              
              {/* Robot Legs */}
              <rect x="20" y="56" width="6" height="6" rx="2" fill="#059669"/>
              <rect x="38" y="56" width="6" height="6" rx="2" fill="#059669"/>
              
              {/* Robot Chest Panel */}
              <rect x="26" y="32" width="12" height="8" rx="2" fill="#065F46"/>
              <circle cx="32" cy="36" r="2" fill="#10B981"/>
              
              {/* Robot Mouth */}
              <rect x="28" y="20" width="8" height="2" rx="1" fill="#065F46"/>
            </svg>
            
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end">
      <Card className={`w-[380px] max-w-[calc(100vw-2rem)] shadow-2xl border-2 border-emerald-200 transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-[500px] max-h-[calc(100vh-8rem)]'
      }`}>
        <CardHeader className="p-3 border-b bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Bot className="w-5 h-5 animate-pulse" />
              🤖 Jharkhand AI Guide
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-emerald-700"
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-emerald-700"
                aria-label="Close chat"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-[440px] max-h-[calc(100vh-12rem)] p-0">
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
    </div>
  );
};

export default FloatingChatbot;