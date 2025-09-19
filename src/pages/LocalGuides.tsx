import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const LocalGuides = () => {
  const { t } = useLanguage();

  const guides = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Ranchi",
      specialties: ["Cultural Sites", "Trekking", "Wildlife"],
      rating: 4.8,
      reviews: 156,
      languages: ["Hindi", "English", "Mundari"],
      experience: "8 years",
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 2,
      name: "Priya Devi",
      location: "Jamshedpur",
      specialties: ["Industrial Tours", "Local Markets", "Food Tours"],
      rating: 4.9,
      reviews: 203,
      languages: ["Hindi", "English", "Bengali"],
      experience: "5 years",
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 3,
      name: "Santosh Oraon",
      location: "Chaibasa",
      specialties: ["Tribal Culture", "Nature Walks", "Traditional Arts"],
      rating: 4.7,
      reviews: 89,
      languages: ["Hindi", "Kurukh", "Ho"],
      experience: "12 years",
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 4,
      name: "Anita Singh",
      location: "Deoghar",
      specialties: ["Religious Sites", "Temple Tours", "Pilgrimage"],
      rating: 4.9,
      reviews: 178,
      languages: ["Hindi", "English", "Sanskrit"],
      experience: "6 years",
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 5,
      name: "Vikram Munda",
      location: "Hazaribagh",
      specialties: ["National Parks", "Wildlife Safari", "Photography"],
      rating: 4.6,
      reviews: 124,
      languages: ["Hindi", "English", "Mundari"],
      experience: "10 years",
      image: "/placeholder-avatar.jpg"
    },
    {
      id: 6,
      name: "Geeta Mahli",
      location: "Dumka",
      specialties: ["Santhal Culture", "Handicrafts", "Folk Dance"],
      rating: 4.8,
      reviews: 95,
      languages: ["Hindi", "Santali", "Bengali"],
      experience: "7 years",
      image: "/placeholder-avatar.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Local Guides in Jharkhand</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with experienced local guides who know the authentic culture, hidden gems, and stories of Jharkhand
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm">Certified Guides</Badge>
              <Badge variant="secondary" className="text-sm">Local Experts</Badge>
              <Badge variant="secondary" className="text-sm">Cultural Specialists</Badge>
              <Badge variant="secondary" className="text-sm">Multi-lingual</Badge>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={guide.image} alt={guide.name} />
                      <AvatarFallback className="text-lg font-semibold">
                        {guide.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{guide.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {guide.location}
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{guide.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({guide.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {guide.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <strong>Experience:</strong> {guide.experience}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How to Book Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">How to Book a Local Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse through our verified local guides and select based on your interests and location
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Contact & Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach out to discuss your requirements, duration, and customize your experience
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Enjoy Your Tour</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience authentic Jharkhand with insider knowledge and local stories
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Need Help Finding a Guide?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-muted-foreground mb-4">
                    Our team can help you find the perfect local guide based on your specific interests, 
                    group size, and travel dates.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-primary mr-2" />
                      <span>+91 9876543210</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-primary mr-2" />
                      <span>guides@rootsnroutes.com</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Guide Services Include:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Local transportation coordination</li>
                    <li>• Cultural interpretation and stories</li>
                    <li>• Hidden gems and off-beaten paths</li>
                    <li>• Local cuisine recommendations</li>
                    <li>• Safety and emergency assistance</li>
                    <li>• Photography assistance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LocalGuides;