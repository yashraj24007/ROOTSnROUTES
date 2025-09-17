import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageSquare, HelpCircle, BookOpen, Users, Bot, Zap } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { Link } from "react-router-dom";

const Support = () => {
  const { t } = useLanguage();

  const supportOptions = [
    {
      icon: Phone,
      titleKey: 'support.contactOptions.call.title',
      descriptionKey: 'support.contactOptions.call.description',
      contactKey: 'support.contactOptions.call.contact',
      availabilityKey: 'support.contactOptions.call.availability'
    },
    {
      icon: Mail,
      titleKey: 'support.contactOptions.email.title',
      descriptionKey: 'support.contactOptions.email.description',
      contactKey: 'support.contactOptions.email.contact',
      availabilityKey: 'support.contactOptions.email.availability'
    },
    {
      icon: MessageSquare,
      titleKey: 'support.contactOptions.chat.title',
      descriptionKey: 'support.contactOptions.chat.description',
      contactKey: 'support.contactOptions.chat.contact',
      availabilityKey: 'support.contactOptions.chat.availability'
    },
    {
      icon: MapPin,
      titleKey: 'support.contactOptions.office.title',
      descriptionKey: 'support.contactOptions.office.description',
      contactKey: 'support.contactOptions.office.contact',
      availabilityKey: 'support.contactOptions.office.availability'
    }
  ];

  const faqItems = [
    {
      questionKey: 'support.faq.items.booking.question',
      answerKey: 'support.faq.items.booking.answer'
    },
    {
      questionKey: 'support.faq.items.includes.question',
      answerKey: 'support.faq.items.includes.answer'
    },
    {
      questionKey: 'support.faq.items.customize.question',
      answerKey: 'support.faq.items.customize.answer'
    },
    {
      questionKey: 'support.faq.items.safety.question',
      answerKey: 'support.faq.items.safety.answer'
    },
    {
      questionKey: 'support.faq.items.insurance.question',
      answerKey: 'support.faq.items.insurance.answer'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 mt-16 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('support.title')}
          </h1>
          <p className="text-xl text-forest-300 max-w-3xl mx-auto">
            {t('support.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('support.contactOptions.getInTouch')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <CardTitle className="text-xl">{t(option.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{t(option.descriptionKey)}</p>
                    <p className="font-semibold text-emerald-600 mb-2">{t(option.contactKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(option.availabilityKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 24/7 AI Support Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">24/7 AI Travel Assistant</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get instant support anytime, anywhere with our intelligent AI assistant powered by advanced language models
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-organic-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle>Instant Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get immediate answers to your travel questions, 24 hours a day, 7 days a week.
                </p>
                <Link to="/chatbot" className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Chat with AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-organic-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Receive personalized travel suggestions based on your preferences and interests.
                </p>
                <Link to="/chatbot" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Get Recommendations
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-organic-lg transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access emergency travel assistance and connect with local support when needed.
                </p>
                <Link to="/chatbot" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    Emergency Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Start Your AI-Powered Support Experience</h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Our AI assistant is trained on comprehensive Jharkhand travel information and can help with bookings, 
                  itinerary planning, local insights, and emergency situations.
                </p>
                <Link to="/chatbot">
                  <Button 
                    size="lg" 
                    className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold"
                  >
                    <Bot className="w-5 h-5 mr-2" />
                    Launch AI Assistant
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">{t('support.sendMessage')}</h2>
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('support.firstName')}</label>
                      <Input placeholder={t('support.firstNamePlaceholder')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('support.lastName')}</label>
                      <Input placeholder={t('support.lastNamePlaceholder')} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('support.email')}</label>
                    <Input type="email" placeholder={t('support.emailPlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('support.phone')}</label>
                    <Input type="tel" placeholder={t('support.phonePlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('support.subject')}</label>
                    <Input placeholder={t('support.subjectPlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('support.message')}</label>
                    <Textarea 
                      placeholder={t('support.messagePlaceholder')} 
                      rows={5}
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    {t('support.sendMessage')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('support.faq.title')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600" />
                    {t(faq.questionKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t(faq.answerKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-6">{t('support.emergency.title')}</h2>
          <p className="text-lg text-red-700 mb-8">
            {t('support.emergency.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="destructive">
              <Phone className="w-5 h-5 mr-2" />
              {t('support.emergency.call')}
            </Button>
            <Link to="/chatbot">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-red-600 text-red-600"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                AI Emergency Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Support;