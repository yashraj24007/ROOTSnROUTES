import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, Trash2, Download, Copy, MapPin, Hotel, Utensils, Car, CloudSun, Lightbulb, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DevelopmentNotice from '@/components/DevelopmentNotice';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌟 Welcome to Jharkhand! I\'m your AI travel guide 🗺️\n\nI can help you with:\n🏔️ Tourist destinations\n🏨 Hotels & accommodations\n🍽️ Local cuisine\n🚗 Transportation\n🌤️ Weather updates\n\nWhat would you like to explore today? ✨',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Quick suggestion buttons
  const quickSuggestions = [
    { icon: MapPin, text: 'Best places to visit', color: 'bg-emerald-500' },
    { icon: Hotel, text: 'Hotels in Ranchi', color: 'bg-amber-500' },
    { icon: Utensils, text: 'Local food specialties', color: 'bg-orange-500' },
    { icon: Car, text: 'Transportation options', color: 'bg-green-500' },
    { icon: CloudSun, text: 'Best time to visit', color: 'bg-yellow-500' },
  ];

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  // Debug: Log API key status (without exposing the actual key)
  useEffect(() => {
    console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    console.log('API Key starts with gsk_:', apiKey ? apiKey.startsWith('gsk_') : false);
  }, [apiKey]);

  useEffect(() => {
    // Scroll to bottom when new messages are added with smooth animation
    if (scrollAreaRef.current && shouldAutoScroll) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
      if (scrollElement) {
        setTimeout(() => {
          scrollElement.scrollTo({
            top: scrollElement.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [messages, shouldAutoScroll]);

  // Handle scroll events to detect if user is manually scrolling
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const isNearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 100;
    setShouldAutoScroll(isNearBottom);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: '🌟 Welcome to Jharkhand! I\'m your AI travel guide 🗺️\n\nI can help you with:\n🏔️ Tourist destinations\n🏨 Hotels & accommodations\n🍽️ Local cuisine\n🚗 Transportation\n🌤️ Weather updates\n\nWhat would you like to explore today? ✨',
      timestamp: new Date()
    }]);
    toast({
      title: "Chat cleared",
      description: "Starting fresh conversation"
    });
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard"
    });
  };

  const exportChat = () => {
    const chatText = messages.map(m => 
      `[${m.timestamp.toLocaleTimeString()}] ${m.role === 'user' ? 'You' : 'Assistant'}: ${m.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jharkhand-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat exported!",
      description: "Your conversation has been downloaded"
    });
  };

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || input.trim();
    if (!messageToSend || loading) return;

    if (!apiKey) {
      console.error('Groq API key not found');
      toast({
        title: "Configuration Error",
        description: "API key not found. Please check environment variables.",
        variant: "destructive"
      });
      return;
    }

    console.log('Sending message to Groq API...');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setShouldAutoScroll(true);

    try {
      console.log('Making API request to Groq...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Fast and reliable model
          messages: [
            {
              role: 'system',
              content: 'You are a helpful travel assistant specializing in Jharkhand tourism. Provide helpful, accurate information about destinations, transportation, culture, and travel tips for Jharkhand, India.'
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: messageToSend
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      
      // More detailed error message for debugging
      let errorMsg = 'Sorry, I encountered an error. Please try again later.';
      if (error instanceof Error) {
        errorMsg = `Error: ${error.message}`;
        console.error('Detailed error:', error.message);
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

  return (
    <>
      <DevelopmentNotice />
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 dark:from-emerald-950/30 dark:via-amber-950/20 dark:to-orange-950/30 pt-20 pb-4 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="relative">
                <Bot className="w-10 h-10 text-emerald-600 dark:text-emerald-500 animate-pulse" />
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 absolute -top-1 -right-1 animate-bounce" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 dark:from-emerald-400 dark:to-amber-400 bg-clip-text text-transparent">
                Jharkhand Travel Assistant
              </h1>
            </div>
            <p className="text-muted-foreground text-base">
              Your AI-powered guide to explore the beauty of Jharkhand
            </p>
          </div>

          {/* Main Chat Card */}
          <Card className="shadow-2xl border-2 border-emerald-200 dark:border-border h-[calc(100vh-180px)] flex flex-col backdrop-blur-sm bg-white/95 dark:bg-card overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-emerald-500/10 to-orange-500/10 dark:from-emerald-500/5 dark:to-orange-500/5 flex-shrink-0 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {messages.length - 1} messages
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={exportChat}
                    className="hover:bg-emerald-500/10"
                    title="Export chat"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="hover:bg-red-500/10 hover:text-red-600"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Scrollable Messages Area */}
              <ScrollArea 
                className="flex-1 p-3 md:p-4" 
                ref={scrollAreaRef}
              >
                <div className="space-y-4 pb-2" onScroll={handleScroll}>
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 group animate-slide-up ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Avatar className={`w-8 h-8 flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-br from-orange-500 to-amber-500' 
                          : 'bg-gradient-to-br from-emerald-500 to-teal-500'
                      }`}>
                        <AvatarFallback className="bg-transparent">
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex flex-col max-w-[75%] md:max-w-[70%]">
                        <div
                          className={`p-3 rounded-2xl shadow-md transition-all hover:shadow-lg ${
                            message.role === 'user'
                              ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-tr-none'
                              : 'bg-white dark:bg-muted border-2 border-emerald-200 dark:border-border rounded-tl-none text-foreground'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        </div>
                        <div className={`flex items-center gap-2 mt-1 px-2 ${
                          message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                        }`}>
                          <p className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-5 px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {loading && (
                    <div className="flex gap-2 animate-slide-up">
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500">
                        <AvatarFallback className="bg-transparent">
                          <Bot className="w-4 h-4 text-white" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-white dark:bg-muted border-2 border-emerald-200 dark:border-border p-3 rounded-2xl rounded-tl-none shadow-md">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Quick Suggestions */}
              {messages.length === 1 && !loading && showSuggestions && (
                <div className="px-4 pb-3 flex-shrink-0 border-t pt-3 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-muted/50 dark:to-muted/50 animate-slide-up">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <p className="text-xs text-foreground font-medium">Quick suggestions:</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSuggestions(false)}
                      className="h-6 px-2 hover:bg-destructive/10 hover:text-destructive"
                      title="Hide suggestions"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => sendMessage(suggestion.text)}
                          className="text-xs hover:scale-105 transition-transform"
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {suggestion.text}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Show Suggestions Toggle (when hidden) */}
              {messages.length === 1 && !loading && !showSuggestions && (
                <div className="px-4 pb-3 flex-shrink-0 border-t pt-3 bg-muted/30">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSuggestions(true)}
                    className="w-full text-xs hover:bg-primary/10 hover:text-primary"
                  >
                    <Lightbulb className="w-3 h-3 mr-2" />
                    Show quick suggestions
                  </Button>
                </div>
              )}
              
              {/* Input Area */}
              <div className="border-t p-3 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/50 dark:to-amber-950/50 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Jharkhand tourism..."
                    disabled={loading}
                    className="flex-1 h-11 text-base bg-white dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700 shadow-sm focus:border-emerald-500 dark:focus:border-emerald-500"
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={loading || !input.trim()}
                    size="lg"
                    className="h-11 px-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all hover:scale-105 shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">
                  Press Enter to send • Powered by AI
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Multilingual Chatbot Notice */}
      <div className="bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-emerald-950/30 dark:to-amber-950/30 border-t border-emerald-200 dark:border-emerald-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 flex-wrap">
            <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Multilingual AI Chatbot</span>
            <span>•</span>
            <span>Powered by Groq AI</span>
            <span>•</span>
            <span>Supports 7+ Languages (English, Hindi, Santali, Ho, Mundari, Kurukh, Kharia)</span>
          </p>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Chatbot;
