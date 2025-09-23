import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DevelopmentNotice from "@/components/DevelopmentNotice";
import EmergencyDialer from "@/components/EmergencyDialer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageSquare, HelpCircle, BookOpen, Users } from "lucide-react";
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
      <DevelopmentNotice />
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
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{t('support.contactOptions.getInTouch')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-card border-border">
                  <CardHeader>
                    <div className="w-16 h-16 bg-forest-100 dark:bg-forest-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-forest-600 dark:text-forest-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{t(option.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground mb-3">{t(option.descriptionKey)}</p>
                    <p className="font-semibold text-forest-600 dark:text-forest-400 mb-2">{t(option.contactKey)}</p>
                    <p className="text-sm text-muted-foreground">{t(option.availabilityKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Support Section */}
      <section className="py-20 bg-red-50 dark:bg-red-950/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-800 dark:text-red-200 mb-4">
              🚨 Emergency Support
            </h2>
            <p className="text-lg text-red-700 dark:text-red-300 max-w-2xl mx-auto">
              In case of emergency during your travel, use these quick dial options for immediate assistance
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <EmergencyDialer />
          </div>
        </div>
      </section>

      {/* Jharkhand Specialized Support Services */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">🌿 Specialized Jharkhand Support Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get expert assistance from our local teams who understand Jharkhand's unique culture, traditions, and landscapes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-card border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-foreground">Tribal Community Guides 🏕️</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  Connect with certified local guides from Santhal, Ho, Munda, and other tribal communities for authentic cultural experiences.
                </p>
                <Link to="/local-guides" className="w-full">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Find Local Guides
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-card border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-foreground">Multi-Language Support 🗣️</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  Get assistance in Hindi, English, Santhali, Ho, Mundari, Kurukh, and other regional languages spoken in Jharkhand.
                </p>
                <Link to="/chatbot" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30"
                  >
                    Language Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-all duration-300 bg-card border-border">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-foreground">Regional Expertise 🗺️</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">
                  Access specialized knowledge about all 24 districts, seasonal festivals, wildlife sanctuaries, and traditional crafts.
                </p>
                <Link to="/explore-districts" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    Explore Districts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <Card className="bg-gradient-hero text-white border-0 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Experience Authentic Jharkhand 🌺</h3>
                <p className="text-forest-100 mb-6 max-w-2xl mx-auto">
                  Our support team includes local experts, tribal community representatives, and cultural ambassadors who can provide 
                  insider knowledge about Jharkhand's hidden gems, traditional practices, and sustainable tourism opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/local-guides">
                    <Button 
                      size="lg" 
                      className="bg-white text-forest-700 hover:bg-forest-50 font-semibold border-2 border-white"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Connect with Local Experts
                    </Button>
                  </Link>
                  <Link to="/chatbot">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white/10 font-semibold"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Get Instant Help
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">{t('support.sendMessage')}</h2>
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">{t('support.firstName')}</label>
                      <Input 
                        placeholder={t('support.firstNamePlaceholder')} 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">{t('support.lastName')}</label>
                      <Input 
                        placeholder={t('support.lastNamePlaceholder')} 
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">{t('support.email')}</label>
                    <Input 
                      type="email" 
                      placeholder={t('support.emailPlaceholder')} 
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">{t('support.phone')}</label>
                    <Input 
                      type="tel" 
                      placeholder={t('support.phonePlaceholder')} 
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">{t('support.subject')}</label>
                    <Input 
                      placeholder={t('support.subjectPlaceholder')} 
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">{t('support.message')}</label>
                    <Textarea 
                      placeholder={t('support.messagePlaceholder')} 
                      rows={5}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white" size="lg">
                    {t('support.sendMessage')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{t('support.faq.title')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-foreground">
                    <HelpCircle className="w-5 h-5 text-forest-600 dark:text-forest-400" />
                    {t(faq.questionKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{t(faq.answerKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-red-100 border-t-4 border-red-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-red-900 mb-6">{t('support.emergency.title')}</h2>
          <p className="text-lg text-red-800 mb-8 font-medium">
            {t('support.emergency.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="destructive" className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
              <Phone className="w-5 h-5 mr-2" />
              {t('support.emergency.call')}
            </Button>
            <Link to="/chatbot">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-red-600 text-red-700 bg-white hover:bg-red-50 shadow-lg"
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