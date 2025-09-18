import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2, 
  MessageSquare, 
  Globe, 
  AlertTriangle, 
  MapPin,
  Car,
  Utensils,
  Heart,
  Volume2
} from 'lucide-react';
import { multilingualChatbotService, ChatMessage } from '@/services/multilingualChatbotService';

const MultilingualChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('auto');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with multilingual greeting
  useEffect(() => {
    const initialGreeting: ChatMessage = {
      id: '1',
      role: 'assistant',
      content: multilingualChatbotService.getGreeting('en'),
      timestamp: new Date(),
      language: 'en',
      category: 'general',
      confidence: 1.0
    };
    setMessages([initialGreeting]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      language: currentLanguage === 'auto' ? 'detected' : currentLanguage,
      category: 'general'
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await multilingualChatbotService.generateResponse(
        currentInput, 
        messages
      );
      
      setIsTyping(false);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      setIsTyping(false);
      console.error('Chat Error:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error. Please try again.',
        timestamp: new Date(),
        language: 'en',
        category: 'general',
        confidence: 0
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

  const clearChat = () => {
    const initialGreeting: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: multilingualChatbotService.getGreeting(currentLanguage === 'auto' ? 'en' : currentLanguage),
      timestamp: new Date(),
      language: currentLanguage === 'auto' ? 'en' : currentLanguage,
      category: 'general',
      confidence: 1.0
    };
    setMessages([initialGreeting]);
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'emergency': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'destination': return <MapPin className="h-4 w-4 text-blue-500" />;
      case 'transport': return <Car className="h-4 w-4 text-green-500" />;
      case 'food': return <Utensils className="h-4 w-4 text-orange-500" />;
      case 'culture': return <Heart className="h-4 w-4 text-purple-500" />;
      default: return <Bot className="h-4 w-4 text-primary" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'destination': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'transport': return 'bg-green-100 text-green-800 border-green-200';
      case 'food': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'culture': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderMessage = (message: ChatMessage) => (
    <div
      key={message.id}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="w-8 h-8 mx-2">
          <AvatarFallback>
            {message.role === 'user' ? <User className="h-4 w-4" /> : getCategoryIcon(message.category)}
          </AvatarFallback>
        </Avatar>
        <div className={`rounded-lg px-3 py-2 ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}>
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          
          {/* Message metadata for assistant messages */}
          {message.role === 'assistant' && (
            <div className="flex items-center gap-2 mt-2">
              {message.category && (
                <Badge variant="secondary" className={`text-xs ${getCategoryColor(message.category)}`}>
                  {message.category}
                </Badge>
              )}
              {message.language && message.language !== 'en' && (
                <Badge variant="outline" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  {message.language}
                </Badge>
              )}
              {message.confidence && message.confidence < 0.5 && (
                <Badge variant="destructive" className="text-xs">
                  Low Confidence
                </Badge>
              )}
            </div>
          )}
          
          <div className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );

  const quickActions = [
    { text: 'Emergency Help', category: 'emergency', icon: '🚨' },
    { text: 'Popular Destinations', category: 'destination', icon: '🏞️' },
    { text: 'Transportation Options', category: 'transport', icon: '🚗' },
    { text: 'Local Food', category: 'food', icon: '🍛' },
    { text: 'Cultural Activities', category: 'culture', icon: '🎭' },
  ];

  const handleQuickAction = (action: typeof quickActions[0]) => {
    setInput(action.text);
    // Auto-send after a short delay
    setTimeout(() => sendMessage(), 100);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 sm:w-96 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[500px]'
      } shadow-xl border-2`}>
        
        {/* Header */}
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Multilingual Guide
          </CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Language Selector */}
            <div className="px-4 pb-2">
              <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect Language</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="santali">Santali (ᱥᱟᱱᱛᱟᱲᱤ)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea ref={scrollAreaRef} className="h-80 px-4 pb-2">
                {messages.map(renderMessage)}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="flex max-w-[80%]">
                      <Avatar className="w-8 h-8 mx-2">
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-3 py-2 bg-muted">
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse animate-delay-200"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse animate-delay-400"></div>
                          </div>
                          <span className="text-xs ml-2">Typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>

              {/* Quick Actions */}
              <div className="px-4 pb-2">
                <div className="text-xs font-medium text-muted-foreground mb-2">Quick Actions:</div>
                <div className="flex flex-wrap gap-1">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={() => handleQuickAction(action)}
                      disabled={loading}
                    >
                      <span className="mr-1">{action.icon}</span>
                      {action.text}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      currentLanguage === 'hi' ? 'अपना सवाल यहाँ लिखें...' :
                      currentLanguage === 'santali' ? 'Amaṅ katha bhanau...' :
                      'Type your message...'
                    }
                    disabled={loading}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Statistics */}
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{messages.length - 1} messages</span>
                  <Button variant="ghost" size="sm" onClick={clearChat} className="h-6 px-2">
                    Clear Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default MultilingualChatbot;