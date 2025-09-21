import santhaliHome from "@/assets/santhali-home.jpg";
import ecoLodge from "@/assets/eco-lodge.jpg";

export interface Stay {
  id: number;
  name: string;
  location: string;
  district: string;
  type: string;
  rating: number;
  image: string;
  description: string;
  priceRange: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  amenities: string[];
  roomTypes: Array<{
    name: string;
    price: string;
    description: string;
  }>;
}

export const authenticStays: Stay[] = [
  {
    id: 1,
    name: "Santhal Heritage Homestay",
    location: "Village Kudra, Dumka",
    district: "Dumka",
    type: "Tribal Homestay",
    rating: 4.9,
    image: santhaliHome,
    description: "Experience traditional Santhal tribal lifestyle in an authentic mud house with organic farming and cultural activities.",
    priceRange: "₹1500-3000",
    phone: "+91-9876543210",
    checkIn: "1:00 PM",
    checkOut: "10:00 AM",
    amenities: ["Cultural Programs", "Craft Workshops", "Traditional Meals", "Village Tours", "Music Sessions", "Storytelling"],
    roomTypes: [
      { name: "Traditional Mud House", price: "₹1500", description: "Authentic mud house with traditional furnishings" },
      { name: "Eco Bamboo Cottage", price: "₹2200", description: "Sustainable bamboo cottage with garden view" },
      { name: "Heritage Suite", price: "₹3000", description: "Spacious suite with traditional decor" }
    ]
  },
  {
    id: 2,
    name: "Forest View Eco Lodge",
    location: "Betla National Park, Latehar",
    district: "Latehar",
    type: "Eco Lodge",
    rating: 4.6,
    image: ecoLodge,
    description: "Luxury eco lodge nestled in the beautiful hills near Betla National Park. Offers stunning forest views and wildlife experiences.",
    priceRange: "₹3000-8000",
    phone: "+91-9876543211",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    amenities: ["Wildlife Safari", "Spa", "Restaurant", "Adventure Sports", "Conference Hall", "Free WiFi"],
    roomTypes: [
      { name: "Deluxe Room", price: "₹3500", description: "Comfortable room with valley view" },
      { name: "Premium Suite", price: "₹5500", description: "Spacious suite with private balcony" },
      { name: "Presidential Villa", price: "₹8000", description: "Luxury villa with private garden" }
    ]
  },
  {
    id: 3,
    name: "Tribal Village Stay",
    location: "Khunti Village, Khunti",
    district: "Khunti",
    type: "Village Stay",
    rating: 4.7,
    image: santhaliHome,
    description: "Immerse yourself in Munda tribal culture with this unique village stay experience. Learn traditional crafts and enjoy folk music.",
    priceRange: "₹1200-2500",
    phone: "+91-9876543212",
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    amenities: ["Traditional Meals", "Cultural Activities", "Nature Walks", "Bonfire", "Local Guide", "Organic Garden"],
    roomTypes: [
      { name: "Village Hut", price: "₹1200", description: "Traditional thatched hut with basic amenities" },
      { name: "Community House", price: "₹1800", description: "Shared accommodation in traditional house" },
      { name: "Artisan Cottage", price: "₹2500", description: "Private cottage with craft workshop space" }
    ]
  },
  {
    id: 4,
    name: "Hill Station Resort",
    location: "Netarhat, Latehar",
    district: "Latehar",
    type: "Resort",
    rating: 4.5,
    image: ecoLodge,
    description: "Beautiful hill station resort offering panoramic views of the surrounding valleys and forests.",
    priceRange: "₹4000-10000",
    phone: "+91-9876543213",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    amenities: ["Swimming Pool", "Restaurant", "Bar", "Gym", "Spa", "Conference Rooms"],
    roomTypes: [
      { name: "Standard Room", price: "₹4200", description: "Comfortable accommodation with mountain views" },
      { name: "Deluxe Suite", price: "₹6500", description: "Spacious suite with living area" },
      { name: "Royal Villa", price: "₹10000", description: "Premium villa with panoramic views" }
    ]
  },
  {
    id: 5,
    name: "Riverside Camping",
    location: "Hundru Falls, Ranchi",
    district: "Ranchi", 
    type: "Camping",
    rating: 4.3,
    image: santhaliHome,
    description: "Adventure camping experience near the famous Hundru Falls with river activities and nature exploration.",
    priceRange: "₹800-2000",
    phone: "+91-9876543214",
    checkIn: "4:00 PM",
    checkOut: "10:00 AM",
    amenities: ["Bonfire", "River Activities", "Trekking", "Photography Tours", "Camp Meals", "Nature Guides"],
    roomTypes: [
      { name: "Tent Stay", price: "₹800", description: "Basic camping tent with shared facilities" },
      { name: "Deluxe Tent", price: "₹1200", description: "Comfortable tent with attached bathroom" },
      { name: "Riverside Cottage", price: "₹2000", description: "Private cottage with river view" }
    ]
  }
];

export const generateStayId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const findStayById = (id: string): Stay | undefined => {
  const stayId = parseInt(id);
  return authenticStays.find(stay => stay.id === stayId);
};