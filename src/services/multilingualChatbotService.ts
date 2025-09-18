import Groq from "groq-sdk";
import { allDestinations } from "@/data/completeDestinations";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language: string;
  confidence?: number;
  category?: 'general' | 'destination' | 'transport' | 'emergency' | 'culture' | 'food';
}

export interface LanguageDetectionResult {
  language: string;
  confidence: number;
  isSupported: boolean;
}

// Language translations for common responses
const translations = {
  en: {
    greeting: "Hello! I'm your Jharkhand travel assistant. I can help you in English, Hindi, or local tribal languages. How can I assist you today?",
    emergency: "🚨 For emergencies, please contact: Police (100), Fire (101), Ambulance (102)",
    noApiKey: "I'm sorry, but the AI service is not available right now. Please try again later.",
    error: "I encountered an error processing your request. Please try again.",
    typing: "I'm thinking...",
    goodbye: "Thank you for using our service. Have a safe and enjoyable trip to Jharkhand!"
  },
  hi: {
    greeting: "नमस्ते! मैं आपका झारखंड यात्रा सहायक हूँ। मैं आपकी हिंदी, अंग्रेजी या स्थानीय आदिवासी भाषाओं में सहायता कर सकता हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    emergency: "🚨 आपातकाल के लिए, कृपया संपर्क करें: पुलिस (100), अग्निशामक (101), एम्बुलेंस (102)",
    noApiKey: "मुझे खुशी है, लेकिन AI सेवा अभी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।",
    error: "आपके अनुरोध को संसाधित करने में मुझे एक त्रुटि आई है। कृपया पुनः प्रयास करें।",
    typing: "मैं सोच रहा हूँ...",
    goodbye: "हमारी सेवा का उपयोग करने के लिए धन्यवाद। झारखंड की आपकी यात्रा सुरक्षित और आनंदमय हो!"
  },
  // Santali (tribal language) - basic phrases
  santali: {
    greeting: "Johar! Amaḥ Jharkhand bamna sanhati kan. Ami English, Hindi ar jangali katha re roṅ dariṅ em. Din kemon sahayata dariṅ em?",
    emergency: "🚨 Asobidha holey sampark korem: Police (100), Fire (101), Ambulance (102)",
    typing: "Ami bhabi raghey...",
    goodbye: "Ami sebakatey babohar katakateyey dhanyabad. Jharkhand katey ami yatra sukher ar raksha hokey!"
  }
};

class MultilingualChatbotService {
  private supportedLanguages = ['en', 'hi', 'santali'];
  
  private destinationContext = allDestinations.map(dest => ({
    name: dest.name,
    district: dest.district,
    category: dest.category,
    description: dest.description,
    features: dest.keyFeatures,
    timing: dest.timing,
    fee: dest.entryFee,
    bestTime: dest.bestTime
  }));

  detectLanguage(text: string): LanguageDetectionResult {
    // Simple language detection based on script and common words
    const hindiPattern = /[\u0900-\u097F]/;
    const englishPattern = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
    
    // Check for Hindi script
    if (hindiPattern.test(text)) {
      return { language: 'hi', confidence: 0.9, isSupported: true };
    }
    
    // Check for common Hindi words in roman script
    const hindiWords = ['namaste', 'kaise', 'kya', 'kahan', 'jharkhand', 'yatra'];
    const lowerText = text.toLowerCase();
    const hindiWordCount = hindiWords.filter(word => lowerText.includes(word)).length;
    
    if (hindiWordCount > 0) {
      return { language: 'hi', confidence: 0.7, isSupported: true };
    }

    // Check for Santali words
    const santaliWords = ['johar', 'amaḥ', 'kemon', 'katey'];
    const santaliWordCount = santaliWords.filter(word => lowerText.includes(word)).length;
    
    if (santaliWordCount > 0) {
      return { language: 'santali', confidence: 0.8, isSupported: true };
    }
    
    // Default to English
    return { language: 'en', confidence: 0.8, isSupported: true };
  }

  categorizeQuery(text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('emergency') || lowerText.includes('help') || lowerText.includes('police') || 
        lowerText.includes('hospital') || lowerText.includes('accident')) {
      return 'emergency';
    }
    
    if (lowerText.includes('transport') || lowerText.includes('bus') || lowerText.includes('train') ||
        lowerText.includes('taxi') || lowerText.includes('how to reach')) {
      return 'transport';
    }
    
    if (lowerText.includes('food') || lowerText.includes('restaurant') || lowerText.includes('eat') ||
        lowerText.includes('cuisine') || lowerText.includes('dish')) {
      return 'food';
    }
    
    if (lowerText.includes('culture') || lowerText.includes('festival') || lowerText.includes('tradition') ||
        lowerText.includes('tribal') || lowerText.includes('dance') || lowerText.includes('music')) {
      return 'culture';
    }
    
    // Check if asking about specific destination
    const hasDestination = this.destinationContext.some(dest => 
      lowerText.includes(dest.name.toLowerCase()) || lowerText.includes(dest.district.toLowerCase())
    );
    
    if (hasDestination || lowerText.includes('visit') || lowerText.includes('place') || 
        lowerText.includes('destination') || lowerText.includes('tour')) {
      return 'destination';
    }
    
    return 'general';
  }

  private buildContextPrompt(userMessage: string, language: string, category: string): string {
    const baseContext = `You are a multilingual tourism assistant for Jharkhand, India. You should respond in ${language === 'hi' ? 'Hindi' : language === 'santali' ? 'Santali (tribal language)' : 'English'}.

IMPORTANT LANGUAGE GUIDELINES:
- If user writes in Hindi (Devanagari script), respond in Hindi
- If user writes "johar" or uses Santali words, respond in Santali with Roman script
- If user writes in English, respond in English
- Be culturally sensitive and respectful of local traditions

EMERGENCY CONTACTS:
- Police: 100
- Fire: 101  
- Ambulance: 102
- Tourist Helpline: 1363

JHARKHAND DESTINATIONS AVAILABLE:
${this.destinationContext.slice(0, 10).map(dest => 
  `- ${dest.name} (${dest.district}): ${dest.description}`
).join('\n')}

CULTURAL CONTEXT:
- Jharkhand has rich tribal heritage with Santhal, Munda, Ho, and other tribes
- "Johar" is a traditional greeting meaning "respect/salute"
- Local festivals include Sarhul, Karma, Sohrai
- Traditional dances: Chhau, Jhumair, Domkach
- Local cuisine features rice, dal, vegetables, and tribal delicacies

TRANSPORT OPTIONS:
- Railways: Major stations in Ranchi, Dhanbad, Jamshedpur
- Airways: Birsa Munda Airport (Ranchi)
- Roadways: State buses and private taxis
- Local transport: Auto-rickshaws, cycle rickshaws`;

    // Add category-specific context
    if (category === 'emergency') {
      return baseContext + `\n\nEMERGENCY RESPONSE: The user seems to need emergency help. Prioritize safety information and emergency contacts.`;
    } else if (category === 'destination') {
      return baseContext + `\n\nDESTINATION QUERY: The user is asking about places to visit. Provide detailed destination information with practical details.`;
    } else if (category === 'transport') {
      return baseContext + `\n\nTRANSPORT QUERY: The user needs transportation information. Provide practical travel options and routes.`;
    } else if (category === 'culture') {
      return baseContext + `\n\nCULTURAL QUERY: The user is interested in local culture. Share information about traditions, festivals, and cultural experiences.`;
    } else if (category === 'food') {
      return baseContext + `\n\nFOOD QUERY: The user is asking about local cuisine. Recommend authentic dishes and good restaurants.`;
    }

    return baseContext + `\n\nGENERAL QUERY: Provide helpful tourism information based on the user's question.`;
  }

  async generateResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<ChatMessage> {
    try {
      const detectedLang = this.detectLanguage(userMessage);
      const category = this.categorizeQuery(userMessage);
      
      console.log('🌐 Language detected:', detectedLang.language, 'Category:', category);

      if (!import.meta.env.VITE_GROQ_API_KEY) {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: translations[detectedLang.language as keyof typeof translations]?.noApiKey || translations.en.noApiKey,
          timestamp: new Date(),
          language: detectedLang.language,
          category
        };
      }

      // Handle emergency queries immediately
      if (category === 'emergency') {
        return {
          id: Date.now().toString(),
          role: 'assistant',
          content: translations[detectedLang.language as keyof typeof translations]?.emergency || translations.en.emergency,
          timestamp: new Date(),
          language: detectedLang.language,
          category,
          confidence: 1.0
        };
      }

      const contextPrompt = this.buildContextPrompt(userMessage, detectedLang.language, category);
      
      // Build conversation history for context
      const messages = [
        { role: 'system', content: contextPrompt },
        ...conversationHistory.slice(-5).map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const completion = await groq.chat.completions.create({
        messages: messages as any,
        model: "llama-3.1-70b-versatile",
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
      });

      const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";

      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        language: detectedLang.language,
        category,
        confidence: detectedLang.confidence
      };

    } catch (error) {
      console.error('Chatbot Error:', error);
      const detectedLang = this.detectLanguage(userMessage);
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: translations[detectedLang.language as keyof typeof translations]?.error || translations.en.error,
        timestamp: new Date(),
        language: detectedLang.language,
        category: 'general',
        confidence: 0
      };
    }
  }

  getGreeting(language: string = 'en'): string {
    return translations[language as keyof typeof translations]?.greeting || translations.en.greeting;
  }

  getTypingMessage(language: string = 'en'): string {
    return translations[language as keyof typeof translations]?.typing || translations.en.typing;
  }
}

export const multilingualChatbotService = new MultilingualChatbotService();