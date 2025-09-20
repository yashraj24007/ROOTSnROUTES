import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star, MapPin, Phone, Mail, MessageCircle, Award, Camera,
  Clock, Users, Globe, Search, Filter, MessageSquare, Calendar,
  Shield, TrendingUp, Heart, Mountain, TreePine, Building, Car
} from "lucide-react";
import { useState, useMemo } from "react";

interface Guide {
  id: number;
  name: string;
  location: string;
  district: string;
  specialties: string[];
  rating: number;
  reviews: number;
  languages: string[];
  experience: string;
  image: string;
  phone: string;
  email: string;
  whatsapp: string;
  priceRange: string;
  availability: string;
  certifications: string[];
  expertise: string[];
  description: string;
  totalTours: number;
  successRate: number;
  preferredAreas: string[];
  groupSizeLimit: string;
  vehicleAvailable: boolean;
  emergencyTrained: boolean;
  photographySkills: boolean;
  testimonials: Array<{
    client: string;
    review: string;
    rating: number;
    date: string;
  }>;
}

const LocalGuides = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const guides: Guide[] = [
    {
      id: 1,
      name: "Rajesh Kumar Mahto",
      location: "Ranchi",
      district: "Ranchi",
      specialties: ["Tribal Culture", "Waterfalls", "Adventure Tourism", "Photography Tours"],
      rating: 4.9,
      reviews: 267,
      languages: ["Hindi", "English", "Mundari", "Ho"],
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9431847262",
      email: "rajesh.guide@gmail.com",
      whatsapp: "+91 9431847262",
      priceRange: "₹1,500-3,000/day",
      availability: "Available",
      certifications: ["Licensed Tour Guide", "First Aid Certified", "Wildlife Guide Certified"],
      expertise: ["Hundru Falls", "Rock Garden", "Tagore Hill", "Tribal Villages", "Local Cuisine"],
      description: "Born and raised in Ranchi, I've been exploring Jharkhand's hidden treasures for over a decade. My passion lies in sharing the rich tribal heritage and natural wonders with travelers from around the world.",
      totalTours: 1240,
      successRate: 98,
      preferredAreas: ["Ranchi", "Khunti", "Gumla"],
      groupSizeLimit: "1-15 people",
      vehicleAvailable: true,
      emergencyTrained: true,
      photographySkills: true,
      testimonials: [
        {
          client: "Sarah Johnson (USA)",
          review: "Rajesh made our Jharkhand trip unforgettable! His knowledge of tribal culture is incredible.",
          rating: 5,
          date: "2024-08-15"
        },
        {
          client: "Kumar Families (Delhi)",
          review: "Best guide we've had in India. Very professional and caring.",
          rating: 5,
          date: "2024-09-02"
        }
      ]
    },
    {
      id: 2,
      name: "Priya Devi Sinha",
      location: "Jamshedpur",
      district: "East Singhbhum",
      specialties: ["Industrial Heritage", "Urban Tours", "Food Tours", "Shopping Guide"],
      rating: 4.8,
      reviews: 189,
      languages: ["Hindi", "English", "Bengali", "Odia"],
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9835627184",
      email: "priya.jamshedpur@gmail.com",
      whatsapp: "+91 9835627184",
      priceRange: "₹1,200-2,500/day",
      availability: "Available",
      certifications: ["City Tour Guide License", "Food Safety Certified", "Cultural Heritage Guide"],
      expertise: ["Tata Steel Plant", "Jubilee Park", "Dalma Wildlife Sanctuary", "Local Markets", "Street Food"],
      description: "Jamshedpur local with deep knowledge of industrial heritage and modern development. I love showing visitors how tradition and modernity coexist in our steel city.",
      totalTours: 856,
      successRate: 96,
      preferredAreas: ["Jamshedpur", "Dalma", "Ghatsila"],
      groupSizeLimit: "1-12 people",
      vehicleAvailable: true,
      emergencyTrained: true,
      photographySkills: false,
      testimonials: [
        {
          client: "Business Delegation (Japan)",
          review: "Excellent understanding of industrial processes and local culture.",
          rating: 5,
          date: "2024-07-20"
        }
      ]
    },
    {
      id: 3,
      name: "Santosh Oraon",
      location: "Chaibasa",
      district: "West Singhbhum",
      specialties: ["Tribal Culture", "Forest Trekking", "Traditional Arts", "Wildlife Safari"],
      rating: 4.9,
      reviews: 145,
      languages: ["Hindi", "Kurukh", "Ho", "Santali", "English"],
      experience: "15 years",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9934728561",
      email: "santosh.tribal@gmail.com",
      whatsapp: "+91 9934728561",
      priceRange: "₹1,800-3,500/day",
      availability: "Available",
      certifications: ["Tribal Culture Expert", "Forest Guide License", "Wildlife Conservation Certified"],
      expertise: ["Saranda Forest", "Tribal Villages", "Traditional Dance", "Handicrafts", "Sacred Groves"],
      description: "Indigenous guide from the Oraon community with extensive knowledge of tribal traditions, forest ecology, and wildlife. I offer authentic cultural experiences and nature immersion.",
      totalTours: 678,
      successRate: 99,
      preferredAreas: ["Chaibasa", "Saranda", "Noamundi", "Kiriburu"],
      groupSizeLimit: "1-8 people",
      vehicleAvailable: false,
      emergencyTrained: true,
      photographySkills: true,
      testimonials: [
        {
          client: "Nature Photographers (Mumbai)",
          review: "Santosh's knowledge of forest and wildlife is unmatched. Highly recommended!",
          rating: 5,
          date: "2024-08-30"
        }
      ]
    },
    {
      id: 4,
      name: "Anita Singh Verma",
      location: "Deoghar",
      district: "Deoghar",
      specialties: ["Religious Tourism", "Pilgrimage Tours", "Temple Architecture", "Spiritual Guidance"],
      rating: 4.7,
      reviews: 298,
      languages: ["Hindi", "English", "Sanskrit", "Bengali"],
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9431256789",
      email: "anita.deoghar@gmail.com",
      whatsapp: "+91 9431256789",
      priceRange: "₹1,000-2,000/day",
      availability: "Available",
      certifications: ["Religious Tour Guide", "Temple Architecture Expert", "Sanskrit Scholar"],
      expertise: ["Baidyanath Temple", "Satsang Ashram", "Naulakha Mandir", "Spiritual Practices", "Temple Rituals"],
      description: "Spiritual guide with deep knowledge of Hindu traditions and temple architecture. I help pilgrims and tourists understand the religious significance of Deoghar's sacred sites.",
      totalTours: 1456,
      successRate: 97,
      preferredAreas: ["Deoghar", "Jasidih", "Madhupur"],
      groupSizeLimit: "1-20 people",
      vehicleAvailable: true,
      emergencyTrained: false,
      photographySkills: false,
      testimonials: [
        {
          client: "Pilgrimage Group (Kolkata)",
          review: "Very knowledgeable about religious practices and temple history.",
          rating: 5,
          date: "2024-07-15"
        }
      ]
    },
    {
      id: 5,
      name: "Manoj Kumar Singh",
      location: "Hazaribagh",
      district: "Hazaribagh",
      specialties: ["National Park Safari", "Wildlife Photography", "Nature Walks", "Bird Watching"],
      rating: 4.8,
      reviews: 156,
      languages: ["Hindi", "English", "Magahi"],
      experience: "9 years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9835471923",
      email: "manoj.wildlife@gmail.com",
      whatsapp: "+91 9835471923",
      priceRange: "₹2,000-4,000/day",
      availability: "Available",
      certifications: ["Wildlife Guide Licensed", "Photography Certified", "Nature Conservation Expert"],
      expertise: ["Hazaribagh National Park", "Wildlife Tracking", "Bird Species", "Photography Spots", "Night Safari"],
      description: "Wildlife enthusiast and certified naturalist specializing in Hazaribagh's diverse ecosystem. Perfect for wildlife photographers and nature lovers seeking authentic jungle experiences.",
      totalTours: 543,
      successRate: 98,
      preferredAreas: ["Hazaribagh", "Koderma", "Giridih"],
      groupSizeLimit: "1-6 people",
      vehicleAvailable: true,
      emergencyTrained: true,
      photographySkills: true,
      testimonials: [
        {
          client: "Wildlife Photographers (Bangalore)",
          review: "Amazing wildlife knowledge and patience during photography sessions.",
          rating: 5,
          date: "2024-09-10"
        }
      ]
    },
    {
      id: 6,
      name: "Sunita Kumari Mahato",
      location: "Dhanbad",
      district: "Dhanbad",
      specialties: ["Coal Mining Heritage", "Industrial Tours", "Local Markets", "Cultural Events"],
      rating: 4.6,
      reviews: 112,
      languages: ["Hindi", "English", "Bengali"],
      experience: "6 years",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9932847261",
      email: "sunita.dhanbad@gmail.com",
      whatsapp: "+91 9932847261",
      priceRange: "₹1,300-2,200/day",
      availability: "Available",
      certifications: ["Industrial Heritage Guide", "Safety Certified", "Local History Expert"],
      expertise: ["Coal Mines", "Railway Heritage", "Maithon Dam", "Local Festivals", "Shopping Areas"],
      description: "Local expert in Dhanbad's coal mining heritage and industrial development. I provide insights into the region's economic importance and cultural adaptation.",
      totalTours: 387,
      successRate: 95,
      preferredAreas: ["Dhanbad", "Jharia", "Bokaro"],
      groupSizeLimit: "1-10 people",
      vehicleAvailable: false,
      emergencyTrained: true,
      photographySkills: false,
      testimonials: [
        {
          client: "Engineering Students (IIT Delhi)",
          review: "Great insights into mining operations and local development.",
          rating: 4,
          date: "2024-08-05"
        }
      ]
    },
    {
      id: 7,
      name: "Ravi Prasad Soren",
      location: "Dumka",
      district: "Dumka",
      specialties: ["Santali Culture", "Folk Music", "Traditional Dance", "Handicraft Villages"],
      rating: 4.9,
      reviews: 87,
      languages: ["Hindi", "Santali", "Bengali", "English"],
      experience: "11 years",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9434628172",
      email: "ravi.santali@gmail.com",
      whatsapp: "+91 9434628172",
      priceRange: "₹1,600-3,000/day",
      availability: "Available",
      certifications: ["Cultural Heritage Expert", "Folk Art Specialist", "Community Tourism Certified"],
      expertise: ["Santali Traditions", "Folk Music", "Handicrafts", "Village Tourism", "Cultural Festivals"],
      description: "Indigenous Santali guide passionate about preserving and sharing our rich cultural heritage. I offer authentic village experiences and traditional art workshops.",
      totalTours: 329,
      successRate: 99,
      preferredAreas: ["Dumka", "Godda", "Sahebganj"],
      groupSizeLimit: "1-12 people",
      vehicleAvailable: false,
      emergencyTrained: false,
      photographySkills: true,
      testimonials: [
        {
          client: "Cultural Researchers (Germany)",
          review: "Incredible cultural knowledge and authentic village experiences.",
          rating: 5,
          date: "2024-09-01"
        }
      ]
    },
    {
      id: 8,
      name: "Deepak Kumar Tiwari",
      location: "Palamu",
      district: "Palamu",
      specialties: ["Betla National Park", "Tiger Safari", "Eco-Tourism", "Adventure Sports"],
      rating: 4.8,
      reviews: 203,
      languages: ["Hindi", "English", "Bhojpuri"],
      experience: "13 years",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
      phone: "+91 9852637492",
      email: "deepak.betla@gmail.com",
      whatsapp: "+91 9852637492",
      priceRange: "₹2,500-5,000/day",
      availability: "Available",
      certifications: ["Tiger Reserve Guide", "Eco-Tourism Certified", "Adventure Sports Licensed"],
      expertise: ["Tiger Tracking", "Betla National Park", "Wildlife Safari", "Rock Climbing", "Camping"],
      description: "Expert safari guide with specialization in tiger behavior and forest ecology. I provide thrilling wildlife experiences while ensuring safety and conservation awareness.",
      totalTours: 892,
      successRate: 98,
      preferredAreas: ["Betla", "Palamu", "Latehar"],
      groupSizeLimit: "1-8 people",
      vehicleAvailable: true,
      emergencyTrained: true,
      photographySkills: true,
      testimonials: [
        {
          client: "Wildlife Enthusiasts (UK)",
          review: "Best tiger safari experience! Deepak's knowledge is exceptional.",
          rating: 5,
          date: "2024-08-25"
        }
      ]
    }
  ];

  // Filter guides based on search and filters
  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          guide.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDistrict = selectedDistrict === "all" || guide.district === selectedDistrict;
      const matchesSpecialty = selectedSpecialty === "all" || guide.specialties.some(s => s.includes(selectedSpecialty));
      const matchesLanguage = selectedLanguage === "all" || guide.languages.includes(selectedLanguage);
      
      return matchesSearch && matchesDistrict && matchesSpecialty && matchesLanguage;
    });
  }, [guides, searchQuery, selectedDistrict, selectedSpecialty, selectedLanguage]);

  const districts = Array.from(new Set(guides.map(g => g.district))).sort();
  const specialties = Array.from(new Set(guides.flatMap(g => g.specialties))).sort();
  const languages = Array.from(new Set(guides.flatMap(g => g.languages))).sort();

  const handleWhatsAppContact = (phone: string, guideName: string) => {
    const message = `Hello ${guideName}, I found your profile on ROOTSnROUTES and would like to inquire about your guide services for Jharkhand tourism.`;
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-emerald-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-amber-600/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('localGuides.title', 'Meet Your Local Guides')}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              {t('localGuides.subtitle', 'Connect with certified local experts who know Jharkhand like the back of their hand')}
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search guides, locations, specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map(language => (
                      <SelectItem key={language} value={language}>{language}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Results Counter */}
              <p className="text-gray-600 mb-8">
                Found {filteredGuides.length} certified local guides
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-green-100">
                    <AvatarImage src={guide.image} alt={guide.name} className="object-cover" />
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-green-500 to-amber-500 text-white">
                      {guide.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-bold text-gray-900">{guide.name}</CardTitle>
                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1 text-green-600" />
                    <span>{guide.location}, {guide.district}</span>
                  </div>
                  
                  {/* Rating and Stats */}
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{guide.rating}</span>
                      <span className="text-gray-500 ml-1">({guide.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-blue-600" />
                      <span>{guide.totalTours} tours</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
                      <span>{guide.successRate}%</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Experience and Price */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-medium">{guide.experience}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-600">{guide.priceRange}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {specialty}
                        </Badge>
                      ))}
                      {guide.specialties.length > 3 && (
                        <Badge variant="secondary" className="text-xs">+{guide.specialties.length - 3}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">{guide.languages.join(', ')}</span>
                  </div>

                  {/* Key Features */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {guide.vehicleAvailable && (
                      <Badge variant="outline" className="text-blue-600">
                        <Car className="w-3 h-3 mr-1" />
                        Vehicle Available
                      </Badge>
                    )}
                    {guide.emergencyTrained && (
                      <Badge variant="outline" className="text-red-600">
                        <Shield className="w-3 h-3 mr-1" />
                        First Aid
                      </Badge>
                    )}
                    {guide.photographySkills && (
                      <Badge variant="outline" className="text-purple-600">
                        <Camera className="w-3 h-3 mr-1" />
                        Photography
                      </Badge>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        guide.availability === 'Available' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-sm font-medium">{guide.availability}</span>
                    </div>
                    <div className="text-xs text-gray-500">{guide.groupSizeLimit}</div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <Button 
                      onClick={() => handleWhatsAppContact(guide.whatsapp, guide.name)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      onClick={() => handlePhoneCall(guide.phone)}
                      variant="outline" 
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      size="sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>

                  {/* View Details Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full text-gray-600 hover:text-green-600 hover:bg-green-50"
                    size="sm"
                  >
                    View Full Profile & Reviews
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results Message */}
          {filteredGuides.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDistrict("all");
                  setSelectedSpecialty("all");
                  setSelectedLanguage("all");
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Local Guides?</h2>
              <p className="text-lg text-gray-700">Experience authentic Jharkhand through the eyes of local experts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-amber-500 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verified & Certified</h3>
                <p className="text-gray-600">All our guides are verified, licensed, and have undergone safety training</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                <p className="text-gray-600">Deep knowledge of local culture, hidden gems, and authentic experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-lingual</h3>
                <p className="text-gray-600">Communicate in your preferred language for better understanding</p>
              </div>
            </div>

            {/* How It Works */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl text-center">How to Book Your Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-green-600">1</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900">Choose Your Guide</h3>
                    <p className="text-sm text-gray-600">
                      Browse profiles and select based on specialties, location, and reviews
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-blue-600">2</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900">Contact Directly</h3>
                    <p className="text-sm text-gray-600">
                      WhatsApp or call directly to discuss your requirements and customize your tour
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900">Enjoy Your Experience</h3>
                    <p className="text-sm text-gray-600">
                      Discover authentic Jharkhand with personalized insights and local stories
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Included */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What's Included with Our Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">✓ Standard Services</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Local area expertise and navigation</li>
                      <li>• Cultural interpretation and storytelling</li>
                      <li>• Hidden gems and off-beaten path locations</li>
                      <li>• Local cuisine recommendations</li>
                      <li>• Shopping assistance and negotiation</li>
                      <li>• Basic safety and emergency assistance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-600">+ Additional Services</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Transportation (where available)</li>
                      <li>• Photography assistance and tips</li>
                      <li>• First aid and emergency training</li>
                      <li>• Special interest tours (wildlife, culture, etc.)</li>
                      <li>• Multi-day trek planning</li>
                      <li>• Festival and event coordination</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Need Help Choosing?</h4>
                      <p className="text-sm text-amber-700 mb-2">
                        Our team can help match you with the perfect guide based on your interests and requirements.
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-2" />
                          <span>+91 7004567890 (ROOTSnROUTES Support)</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-3 h-3 mr-2" />
                          <span>guides@rootsnroutes.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocalGuides;