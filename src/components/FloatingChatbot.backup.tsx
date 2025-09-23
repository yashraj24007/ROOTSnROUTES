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
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [lastHelpMessageTime, setLastHelpMessageTime] = useState<number>(Date.now());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);

  const helpNotifications = [
    { emoji: "👋", text: "Hey! Can I help you explore? 😊" },
    { emoji: "🔍", text: "Searching for something? I can help! ✨" },
    { emoji: "🗺️", text: "Need travel guidance? Let's chat! 🌟" },
    { emoji: "💬", text: "Got questions? I'm here to assist! 🚀" },
    { emoji: "🎒", text: "Planning your adventure? Ask me! 🌄" },
    { emoji: "📍", text: "Looking for destinations? I know them! 🏞️" },
    { emoji: "🤝", text: "Need recommendations? Happy to help! ✨" }
  ];
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [lastHelpMessageTime, setLastHelpMessageTime] = useState<number>(Date.now());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);

  const helpNotifications = [
    { emoji: "👋", text: "Hey! Can I help you? 😊" },
    { emoji: "🤝", text: "Need assistance exploring? �" },
    { emoji: "💬", text: "Got questions? I'm here! ✨" },
    { emoji: "🗺️", text: "Ready to explore Jharkhand? 🌄" },
    { emoji: "🎒", text: "Planning your trip? Let's chat! �" }
  ];

  // Periodic help notifications
  useEffect(() => {
    // Show first notification immediately when component mounts (user opens site)
    const firstTimeout = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
        setNotificationIndex(0);
        setLastHelpMessageTime(Date.now());
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 2000); // Show after 2 seconds of site load

    const interval = setInterval(() => {
      const now = Date.now();
      // Show notification every 30 seconds regardless of user activity (as long as chatbot is closed)
      if (!isOpen && (now - lastHelpMessageTime) >= 30000) {
        setShowNotification(true);
        setNotificationIndex((prev) => (prev + 1) % helpNotifications.length);
        setLastHelpMessageTime(now);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false);
        }, 5000);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [isOpen, lastHelpMessageTime, helpNotifications]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot-messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: Omit<Message, 'timestamp'> & { timestamp: string }) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        // Initialize with welcome message if parsing fails
        initializeWelcomeMessage();
      }
    } else {
      // Initialize with welcome message
      initializeWelcomeMessage();
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  const initializeWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: 'hey traveller how can i help u',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

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
    if (scrollAreaRef.current && shouldAutoScroll) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, shouldAutoScroll]);

  // Handle scroll events to detect if user is manually scrolling
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const isNearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 50;
    setShouldAutoScroll(isNearBottom);
  };

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
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false);
          }}
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
              <rect x="14" y="24" width="36" height="32" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="2"/>
              
              {/* Robot Head */}
              <rect x="20" y="8" width="24" height="20" rx="6" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
              
              {/* Robot Eyes */}
              <circle cx="28" cy="16" r="3" fill="#1E40AF"/>
              <circle cx="36" cy="16" r="3" fill="#1E40AF"/>
              <circle cx="28" cy="16" r="1.5" fill="#60A5FA"/>
              <circle cx="36" cy="16" r="1.5" fill="#60A5FA"/>
              
              {/* Robot Antenna */}
              <line x1="32" y1="8" x2="32" y2="4" stroke="#2563EB" strokeWidth="2"/>
              <circle cx="32" cy="4" r="2" fill="#A855F7"/>
              
              {/* Robot Arms */}
              <rect x="6" y="28" width="8" height="16" rx="4" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
              <rect x="50" y="28" width="8" height="16" rx="4" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
              
              {/* Robot Legs */}
              <rect x="20" y="56" width="6" height="6" rx="2" fill="#2563EB"/>
              <rect x="38" y="56" width="6" height="6" rx="2" fill="#2563EB"/>
              
              {/* Robot Chest Panel */}
              <rect x="26" y="32" width="12" height="8" rx="2" fill="#1E40AF"/>
              <circle cx="32" cy="36" r="2" fill="#60A5FA"/>
              
              {/* Purple accent */}
              <rect x="28" y="38" width="8" height="2" rx="1" fill="#A855F7"/>
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
    <>
      {/* Help Notification - Separate fixed position */}
      {showNotification && !isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-[10000]">
          <div className="animate-bounce">
            <div 
              className="bg-white/95 backdrop-blur-md text-gray-800 px-4 py-3 rounded-2xl shadow-2xl border-2 border-blue-200 relative cursor-pointer hover:scale-105 hover:bg-white transition-all duration-300"
              onClick={() => {
                setIsOpen(true);
                setShowNotification(false);
              }}
              style={{ minWidth: '250px', maxWidth: '300px' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{helpNotifications[notificationIndex].emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{helpNotifications[notificationIndex].text}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotification(false);
                }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs transition-all duration-200 font-bold"
                aria-label="Close notification"
              >
                ×
              </button>
              {/* Notification arrow pointing to chatbot */}
              <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chatbot Container */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end">
      <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-1 shadow-2xl">
        <Card className={`w-[380px] max-w-[calc(100vw-2rem)] shadow-xl border-2 border-blue-200/50 bg-white backdrop-blur-sm transition-all duration-300 rounded-xl ${
          isMinimized ? 'h-14' : 'h-[500px] max-h-[calc(100vh-8rem)]'
        }`}>
          <CardHeader className="p-3 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl shadow-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Bot className="w-5 h-5 animate-pulse" />
                🤖 Jharkhand AI Guide
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  aria-label="Close chat"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="flex flex-col h-[440px] max-h-[calc(100vh-12rem)] p-0 bg-gradient-to-b from-gray-50 to-white">
            <ScrollArea 
              className="flex-1 p-4 chatbot-scroll" 
              ref={scrollAreaRef}
              onScrollCapture={handleScroll}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 items-start animate-fadeIn ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <Avatar className={`w-8 h-8 flex-shrink-0 mt-1 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    }`}>
                      <AvatarFallback className={`text-xs ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div
                      className={`max-w-[75%] p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-md transition-all duration-200 hover:shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md'
                          : 'bg-white text-gray-900 border border-gray-300 rounded-2xl rounded-bl-md'
                      }`}
                    >
                      <p className="break-words font-medium">{message.content}</p>
                      <p className={`text-xs mt-3 opacity-70 font-normal ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex gap-3 items-start animate-fadeIn">
                    <Avatar className="w-8 h-8 mt-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                      <AvatarFallback className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md border border-gray-300 shadow-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Scroll to bottom button */}
            {!shouldAutoScroll && (
              <div className="absolute bottom-20 right-4">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full shadow-lg"
                  onClick={() => {
                    setShouldAutoScroll(true);
                    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
                    if (scrollElement) {
                      scrollElement.scrollTop = scrollElement.scrollHeight;
                    }
                  }}
                >
                  <span className="text-xs">↓</span>
                </Button>
              </div>
            )}
            
            {/* Modern input area */}
            <div className="border-t bg-white/90 backdrop-blur-sm p-4 rounded-b-xl shadow-inner">
              <div className="flex gap-3 items-center">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Jharkhand tourism..."
                  disabled={loading}
                  className="flex-1 h-12 text-sm px-4 bg-gray-50 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-600 text-gray-900 font-medium"
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  size="sm"
                  className="h-12 w-12 p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      </div>
      </div>
    </>
  );
};

export default FloatingChatbot;