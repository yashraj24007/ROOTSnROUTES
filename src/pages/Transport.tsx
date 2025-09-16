import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TransportCard from "@/components/TransportCard";
import { Bus, Car, Train, Truck, Phone, AlertTriangle } from "lucide-react";
import { useState } from "react";

const Transport = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const transportTypes = [
    { name: "All", count: 5, icon: "🚗" },
    { name: "Bus", count: 1, icon: "🚌" },
    { name: "Taxi", count: 1, icon: "🚕" },
    { name: "Train", count: 1, icon: "🚂" },
    { name: "Auto-rickshaw", count: 1, icon: "🛺" },
    { name: "Jeep", count: 1, icon: "🚙" },
  ];

  const transportServices = [
    {
      name: "Jharkhand Roadways Express",
      type: "Bus",
      rating: 4.5,
      description: "Affordable and reliable inter-city bus service connecting major towns and tourist spots across Jharkhand. Ideal for budget travelers and local commutes.",
      routes: ["Ranchi-Jamshedpur", "Hazaribagh-Netarhat", "Bokaro-Dhanbad", "Dumka-Deoghar"],
      timing: "Daily, 5 AM - 10 PM",
      avgFare: "₹250",
      contact: "+91-651-2456789",
      icon: <Bus className="w-6 h-6" />
    },
    {
      name: "Green Wheels Cabs",
      type: "Taxi",
      rating: 4.5,
      description: "Environmentally friendly taxi service with hybrid and electric vehicles, perfect for eco-tourism and comfortable travel.",
      routes: ["Ranchi Airport to Betla National Park", "Dalma Wildlife Sanctuary tours", "local city transfers in Jamshedpur"],
      timing: "24/7 on-demand via app or call",
      avgFare: "₹800",
      contact: "+91-700-1234567",
      icon: <Car className="w-6 h-6" />
    },
    {
      name: "Jharkhand Heritage Rail",
      type: "Train",
      rating: 4.5,
      description: "Scenic train journey through historical and natural landscapes, offering a unique cultural experience with vintage coaches.",
      routes: ["Chandil-Muri-Ranchi (heritage circuit)", "Tatanagar-Ghatshila (scenic route)"],
      timing: "Weekends only, 9 AM - 5 PM (seasonal)",
      avgFare: "₹450",
      contact: "+91-657-9876543",
      icon: <Train className="w-6 h-6" />
    },
    {
      name: "Ranchi Auto Connect",
      type: "Auto-rickshaw",
      rating: 4.5,
      description: "Convenient and quick local transport for short distances within cities and towns, easily accessible.",
      routes: ["Local city routes", "market areas", "short tourist hops to temples and parks in Ranchi, Jamshedpur, Dhanbad"],
      timing: "Daily, 6 AM - 11 PM",
      avgFare: "₹80",
      contact: "+91-987-6543210",
      icon: <Truck className="w-6 h-6" />
    },
    {
      name: "Jungle Safari Jeeps",
      type: "Jeep",
      rating: 4.5,
      description: "Robust 4x4 vehicles for off-road adventures and wildlife safaris in protected areas and dense forests.",
      routes: ["Palamu Tiger Reserve", "Dalma Wildlife Sanctuary", "Saranda Forest", "Netarhat plateau exploration"],
      timing: "Seasonal (Oct-May), 7 AM - 6 PM (pre-booked slots)",
      avgFare: "₹1500",
      contact: "+91-943-1234567",
      icon: <Truck className="w-6 h-6" />
    }
  ];

  const emergencyContacts = [
    {
      title: "Emergency Taxi",
      description: "24/7 emergency taxi services",
      contact: "+91 9876543210"
    },
    {
      title: "Tourist Helpline", 
      description: "Jharkhand Tourism Helpline",
      contact: "1363"
    },
    {
      title: "Railway Enquiry",
      description: "Indian Railways enquiry",
      contact: "139"
    }
  ];

  const filteredServices = activeFilter === "All" 
    ? transportServices 
    : transportServices.filter(service => service.type === activeFilter);

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Transportation Hub</h1>
            <p className="text-xl mb-8 max-w-4xl mx-auto">
              Real-time information on buses, trains, taxis, and local transport across Jharkhand
            </p>
          </div>
        </div>
      </section>

      {/* Transport Types Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {transportTypes.map((type, index) => (
              <Card 
                key={index} 
                className={`p-4 text-center cursor-pointer transition-all duration-300 hover:shadow-card ${
                  activeFilter === type.name ? 'border-primary bg-card' : 'border-border bg-card/50'
                }`}
                onClick={() => setActiveFilter(type.name)}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div className="font-medium text-foreground">{type.name}</div>
                <div className="text-sm text-muted-foreground">{type.count} Services</div>
              </Card>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <Input 
              type="text"
              placeholder="Search routes, services..."
              className="h-12 text-lg bg-card border-border"
            />
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Badge variant="secondary">All Transport Types</Badge>
            <Badge variant="outline">All</Badge>
            <Badge variant="outline">Bus</Badge>
            <Badge variant="outline">Taxi</Badge>
            <Badge variant="outline">Train</Badge>
            <Badge variant="outline">Auto-rickshaw</Badge>
          </div>
        </div>
      </section>

      {/* Transport Services */}
      <section className="py-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {activeFilter} Services
            </h2>
            <p className="text-muted-foreground">
              {filteredServices.length} Available
            </p>
          </div>

          <div className="space-y-6">
            {filteredServices.map((service, index) => (
              <TransportCard
                key={index}
                name={service.name}
                type={service.type}
                rating={service.rating}
                description={service.description}
                routes={service.routes}
                timing={service.timing}
                avgFare={service.avgFare}
                contact={service.contact}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <AlertTriangle className="w-10 h-10 text-destructive" />
              Emergency Transport Contacts
            </h2>
            <p className="text-xl text-muted-foreground">
              24/7 emergency transport services across Jharkhand
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="p-6 text-center bg-destructive/5 border-destructive/20 hover:bg-destructive/10 transition-colors">
                <Phone className="w-8 h-8 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">{contact.title}</h3>
                <p className="text-muted-foreground mb-4">{contact.description}</p>
                <Button variant="outline" size="lg" className="border-destructive text-destructive hover:bg-destructive hover:text-white">
                  {contact.contact}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Transport;