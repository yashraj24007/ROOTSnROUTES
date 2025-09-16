import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TeamMember from "@/components/TeamMember";
import FAQ from "@/components/FAQ";
import { Zap, Shield, Leaf, Users, Heart, Award, Globe, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import jharkhandHero from "@/assets/jharkhand-hero.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Authenticity",
      description: "We showcase the genuine culture, traditions, and natural beauty of Jharkhand without commercialization."
    },
    {
      icon: Leaf,
      title: "Environmental Responsibility", 
      description: "Every aspect of our platform promotes sustainable practices and environmental conservation."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "All services and experiences are verified and rated to ensure the highest standards for travelers."
    },
    {
      icon: TreePine,
      title: "Cultural Preservation",
      description: "Supporting local traditions, languages, and heritage through responsible tourism initiatives."
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Experiences",
      description: "Intelligent travel planning with personalized recommendations based on your preferences and real-time data analysis."
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Secure, transparent transactions and verified service providers through cutting-edge blockchain technology."
    },
    {
      icon: Leaf,
      title: "Sustainable Tourism",
      description: "Promoting eco-friendly travel practices that preserve Jharkhand's natural beauty for future generations."
    },
    {
      icon: Users,
      title: "Community Empowerment",
      description: "Direct support to local communities, artisans, and service providers, ensuring tourism benefits reach grassroots level."
    }
  ];

  const team = [
    {
      name: "Tanish Oberoi",
      role:"Team Lead",
      description: "Visionary leader with a passion for sustainable tourism and technology integration",
      image: ""
    },
    {
      name: "Yash Raj",
      role: "Tech Lead",
      description: "",
      image: ""
    },
    {
      name: "Shreesh Kambampally", 
      role: "",
      description: "",
      image: ""
    },
    {
      name: "Nihal Reddy",
      role: "", 
      description: "",
      image: ""
    },
    {
      name: "Sriya Gaytri",
      role: "Design Lead",
      description: "Creative mind behind our user-centric designs and seamless experiences", 
      image: ""
    },
    {
      name: "Kulkarni Sahithi",
      role: "",
      description: "", 
      image: ""
    }
  ];

  const stats = [
    { number: "50+", label: "Destinations Mapped", desc: "Comprehensive coverage of Jharkhand's tourist spots" },
    { number: "200+", label: "Local Partners", desc: "Verified homestays, guides, and service providers" },
    { number: "500+", label: "Artisans Supported", desc: "Direct marketplace access for local craftspeople" },
    { number: "10K+", label: "Travelers Served", desc: "Happy visitors experiencing authentic Jharkhand" }
  ];

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${jharkhandHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">About ROOTSnROUTES</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed">
            Connecting travelers with the authentic soul of Jharkhand through technology, sustainability, and community empowerment
          </p>
          <Link to="/destinations">
            <Button variant="hero" size="lg">Start Your Journey</Button>
          </Link>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              ROOTSnROUTES is more than a travel platform—it's a bridge between modern technology and ancient wisdom, 
              between curious travelers and vibrant communities, between sustainable practices and unforgettable experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that tourism should benefit everyone: travelers seeking authentic experiences, local communities 
              preserving their heritage, and the environment that sustains us all. Through AI-powered personalization 
              and blockchain-secured transactions, we're creating the future of responsible travel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/destinations">
                <Button variant="default" size="lg">Plan Your Trip</Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="outline" size="lg">Join Our Community</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Powered by Innovation</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets traditional wisdom to create unparalleled travel experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-card/50 border-border hover:bg-card/80 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-card rounded-2xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Real numbers, real impact on Jharkhand's tourism ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-card/30 border-border hover:bg-card/50 transition-all duration-300">
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-medium text-foreground mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide every decision and shape every experience we create
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-8 bg-card/50 border-border hover:bg-card/80 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-nature rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate individuals dedicated to transforming Jharkhand's tourism landscape
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                description={member.description}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-hero p-12 text-center border-0 shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Explore Jharkhand?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Join thousands of travelers discovering the authentic beauty of Jharkhand through sustainable tourism
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/destinations">
                  <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                    Start Planning Now
                  </Button>
                </Link>
                <Button variant="hero-outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Contact Our Team
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;