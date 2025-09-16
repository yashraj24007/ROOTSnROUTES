import { Card } from "@/components/ui/card";
import { Zap, Shield, Users, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Planning",
      description: "Get personalized itineraries with our intelligent travel assistant",
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Secure payments and verified services through blockchain technology",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with local communities and authentic cultural experiences",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your travel needs",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Experience the Future of Travel
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Powered by cutting-edge technology to deliver authentic, sustainable, and secure travel experiences
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 bg-card/50 border-border hover:bg-card/80 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-card rounded-3xl flex items-center justify-center mb-6 group-hover:shadow-pink transition-all duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;