import dokraElephant from "@/assets/dokra-elephant.jpg";

export interface MarketplaceItem {
  name: string;
  artist: string;
  price: string;
  category: string;
  rating: number;
  image: string;
  description: string;
  artisan: string;
  delivery: string;
  location?: string;
}

export const handicrafts: MarketplaceItem[] = [
  {
    name: "Dokra Art Elephant",
    artist: "Sunil Mahto",
    price: "₹2850",
    category: "metal-art",
    rating: 4.9,
    image: dokraElephant,
    description: "Handcrafted brass elephant using traditional Dokra lost-wax casting technique, passed down through generations.",
    artisan: "Verified Artisan",
    delivery: "7-10 days",
    location: "Khunti"
  },
  {
    name: "Paitkar Painting Scroll",
    artist: "Rani Devi",
    price: "₹1800", 
    category: "folk-art",
    rating: 4.8,
    image: dokraElephant,
    description: "Traditional narrative scroll painting depicting tribal folklore and mythological stories of Jharkhand.",
    artisan: "Master Craftsperson",
    delivery: "5-7 days",
    location: "Dumka"
  },
  {
    name: "Tribal Bamboo Basket Set",
    artist: "Mangal Oraon",
    price: "₹1200",
    category: "basketry",
    rating: 4.6,
    image: dokraElephant,
    description: "Eco-friendly bamboo baskets woven using traditional techniques, perfect for home organization.",
    artisan: "Certified Weaver", 
    delivery: "3-5 days",
    location: "Ranchi"
  },
  {
    name: "Haatpara Market Crafts",
    artist: "Haatpara Artisans",
    price: "₹800",
    category: "others",
    rating: 4.2,
    image: dokraElephant,
    description: "Traditional handicrafts and local products from the vibrant Haatpara Market in Pakur.",
    artisan: "Market Collective",
    delivery: "5-7 days",
    location: "Pakur"
  },
  {
    name: "Harindanga Bazar Specialties",
    artist: "Harindanga Vendors",
    price: "₹600",
    category: "textiles",
    rating: 4.0,
    image: dokraElephant,
    description: "Quality textiles and handicrafts from the bustling Harindanga Bazar marketplace.",
    artisan: "Bazar Vendors",
    delivery: "7-10 days",
    location: "Pakur"
  },
  {
    name: "Krishna Plaza Collections",
    artist: "Krishna Plaza Merchants",
    price: "₹950",
    category: "others",
    rating: 4.3,
    image: dokraElephant,
    description: "Modern and traditional crafts from Krishna Plaza shopping center in Pakur.",
    artisan: "Plaza Collective",
    delivery: "5-8 days",
    location: "Pakur"
  },
  {
    name: "Padmani Chowk Market Items",
    artist: "Padmani Chowk Traders",
    price: "₹1200",
    category: "tribal-art",
    rating: 4.4,
    image: dokraElephant,
    description: "Authentic local handicrafts from the popular Padmani Chowk marketplace.",
    artisan: "Chowk Artisans",
    delivery: "4-6 days",
    location: "Pakur"
  },
  {
    name: "Hajrat Ali Market Products",
    artist: "Hajrat Ali Vendors",
    price: "₹1500",
    category: "folk-art",
    rating: 4.1,
    image: dokraElephant,
    description: "Diverse handicrafts and traditional items from Hajrat Ali Market.",
    artisan: "Market Vendors",
    delivery: "6-8 days",
    location: "Pakur"
  }
];

export const generateItemId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const findItemById = (id: string): MarketplaceItem | undefined => {
  return handicrafts.find(item => generateItemId(item.name) === id);
};