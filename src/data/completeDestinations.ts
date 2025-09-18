// Comprehensive District-wise tourist destinations data for Jharkhand
export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Destination {
  id: number;
  name: string;
  district: string;
  type: 'famous' | 'hidden';
  category: string;
  rating: number;
  image: string;
  description: string;
  whyFamous: string;
  keyFeatures: string[];
  entryFee: string;
  timing: string;
  bestTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  reviews: Review[];
}

export const allDestinations: Destination[] = [
  // KHUNTI DISTRICT - Famous Places
  {
    id: 1,
    name: "Panchghagh Falls",
    district: "Khunti",
    type: "famous",
    category: "waterfalls",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A stunning five-tiered waterfall nestled in the dense forests of Khunti, offering a spectacular cascade falling from different levels.",
    whyFamous: "Famous for its unique five-tier structure where water cascades through multiple levels, creating a mesmerizing natural amphitheater.",
    keyFeatures: ["Five-tiered waterfall", "Dense forest surroundings", "Natural swimming pools", "Trekking opportunities", "Photography hotspot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.0315, lng: 85.2784 },
    reviews: [
      {
        author: "Rahul Sharma",
        rating: 5,
        comment: "Absolutely breathtaking! The five-tier fall is a sight to behold. Perfect for nature lovers and photographers.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 2,
    name: "Perwaghagh Falls",
    district: "Khunti",
    type: "famous",
    category: "waterfalls",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A magnificent waterfall known for its powerful cascade and pristine natural setting in the heart of Jharkhand's tribal region.",
    whyFamous: "Known for its powerful water flow and being one of the most accessible waterfalls in Khunti district, popular among local tourists.",
    keyFeatures: ["Powerful cascade", "Accessible location", "Natural pools", "Tribal heritage area", "Monsoon spectacle"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "June to October",
    coordinates: { lat: 23.0420, lng: 85.2650 },
    reviews: [
      {
        author: "Priya Singh",
        rating: 4,
        comment: "Beautiful waterfall with easy access. Great for family visits and picnics.",
        date: "2024-07-22"
      }
    ]
  },
  {
    id: 3,
    name: "Dombari Buru",
    district: "Khunti",
    type: "famous",
    category: "hills",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "The highest peak in Jharkhand at 3,060 feet, offering panoramic views and significant cultural importance in tribal traditions.",
    whyFamous: "Famous as Jharkhand's highest peak and sacred to tribal communities, offering spectacular sunrise views and trekking opportunities.",
    keyFeatures: ["Highest peak in Jharkhand", "Sacred tribal site", "Panoramic views", "Sunrise viewpoint", "Trekking trails"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.0200, lng: 85.2900 },
    reviews: [
      {
        author: "Tribal Heritage Explorer",
        rating: 5,
        comment: "Sacred mountain with incredible views. The trek is challenging but spiritually rewarding.",
        date: "2024-06-15"
      }
    ]
  },
  {
    id: 4,
    name: "Birsa Mrig Vihar (Deer Park)",
    district: "Khunti",
    type: "famous",
    category: "wildlife",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A wildlife sanctuary dedicated to deer conservation, named after the legendary tribal leader Birsa Munda.",
    whyFamous: "Named after Birsa Munda, famous for its deer conservation efforts and serving as an important wildlife corridor in the region.",
    keyFeatures: ["Large deer population", "Wildlife conservation", "Nature trails", "Bird watching", "Educational programs"],
    entryFee: "₹20 for adults, ₹10 for children",
    timing: "7:00 AM - 5:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.0400, lng: 85.2800 },
    reviews: [
      {
        author: "Wildlife Enthusiast",
        rating: 4,
        comment: "Great place for families. Kids loved seeing the deer up close. Well-maintained park.",
        date: "2024-01-10"
      }
    ]
  },
  {
    id: 5,
    name: "Rani Falls",
    district: "Khunti",
    type: "famous",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall known for its regal appearance and serene surroundings, hence named 'Rani' (Queen) Falls.",
    whyFamous: "Known as the Queen of waterfalls in the region for its elegant cascade and royal appearance, popular for photography.",
    keyFeatures: ["Elegant cascade", "Royal appearance", "Photography spot", "Peaceful environment", "Natural beauty"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to September",
    coordinates: { lat: 23.0350, lng: 85.2750 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 4,
        comment: "Lives up to its name! The waterfall has a majestic appearance, perfect for photography.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 6,
    name: "Angrabari (Amreshwar Dham) Temple",
    district: "Khunti",
    type: "famous",
    category: "temples",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple complex dedicated to Lord Shiva, known for its spiritual significance and architectural beauty.",
    whyFamous: "Famous as one of the most revered Shiva temples in Jharkhand, attracting devotees from across the state during festivals.",
    keyFeatures: ["Ancient Shiva temple", "Religious significance", "Beautiful architecture", "Festival celebrations", "Peaceful environment"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Year-round, special during Mahashivaratri",
    coordinates: { lat: 23.0500, lng: 85.2700 },
    reviews: [
      {
        author: "Devotee Ram",
        rating: 5,
        comment: "Very peaceful and spiritual place. The temple architecture is beautiful and atmosphere is serene.",
        date: "2024-02-20"
      }
    ]
  },
  {
    id: 7,
    name: "Torpa",
    district: "Khunti",
    type: "famous",
    category: "heritage",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic town known for its tribal heritage and as the birthplace of tribal leader Birsa Munda.",
    whyFamous: "Famous as the birthplace of Birsa Munda and for its rich tribal heritage, making it a significant cultural destination.",
    keyFeatures: ["Birsa Munda birthplace", "Tribal heritage", "Historical significance", "Cultural center", "Educational value"],
    entryFee: "Free",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.0100, lng: 85.3000 },
    reviews: [
      {
        author: "History Student",
        rating: 4,
        comment: "Important historical place with great cultural significance. Must visit for understanding tribal heritage.",
        date: "2024-03-15"
      }
    ]
  },

  // KHUNTI DISTRICT - Hidden Places
  {
    id: 8,
    name: "Pandupudding Waterfall",
    district: "Khunti",
    type: "hidden",
    category: "waterfalls",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
    description: "A hidden gem waterfall surrounded by pristine forests, offering a secluded natural paradise for adventure seekers.",
    whyFamous: "Hidden waterfall famous among trekkers for its untouched natural beauty and challenging trek route through dense forests.",
    keyFeatures: ["Pristine and untouched", "Challenging trek", "Crystal clear pools", "Rich biodiversity", "Secluded paradise"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "August to December",
    coordinates: { lat: 23.0200, lng: 85.2900 },
    reviews: [
      {
        author: "Adventure Seeker",
        rating: 5,
        comment: "Hidden paradise! The trek is challenging but absolutely worth it. Pristine and untouched beauty.",
        date: "2024-09-05"
      }
    ]
  },
  {
    id: 9,
    name: "Ulung Falls",
    district: "Khunti",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=800&h=600&fit=crop",
    description: "A seasonal waterfall that comes alive during monsoons, offering a spectacular display of nature's power.",
    whyFamous: "Hidden seasonal waterfall known only to locals, transforms dramatically during monsoons creating spectacular water displays.",
    keyFeatures: ["Seasonal waterfall", "Monsoon spectacle", "Local secret", "Natural drama", "Photography opportunity"],
    entryFee: "Free",
    timing: "Daylight hours",
    bestTime: "July to September",
    coordinates: { lat: 23.0150, lng: 85.2850 },
    reviews: [
      {
        author: "Local Guide",
        rating: 4,
        comment: "Amazing seasonal waterfall! Best visited during peak monsoon for the full experience.",
        date: "2024-08-20"
      }
    ]
  },
  {
    id: 10,
    name: "Sacred Forests (Sarna Sthals)",
    district: "Khunti",
    type: "hidden",
    category: "heritage",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Sacred groves preserved by tribal communities, representing ancient forest conservation practices and spiritual beliefs.",
    whyFamous: "Sacred to tribal communities, these ancient forest groves represent traditional conservation practices and spiritual connection with nature.",
    keyFeatures: ["Sacred groves", "Tribal spirituality", "Ancient conservation", "Biodiversity hotspot", "Cultural significance"],
    entryFee: "Free (Respect required)",
    timing: "Sunrise to Sunset",
    bestTime: "Year-round",
    coordinates: { lat: 23.0300, lng: 85.2600 },
    reviews: [
      {
        author: "Eco-Tourist",
        rating: 4,
        comment: "Deeply spiritual experience. These sacred forests show the wisdom of tribal conservation practices.",
        date: "2024-05-10"
      }
    ]
  },
  {
    id: 11,
    name: "Murhu",
    district: "Khunti",
    type: "hidden",
    category: "heritage",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "A small tribal village known for its traditional lifestyle and handicrafts, offering authentic cultural experiences.",
    whyFamous: "Hidden tribal village known for preserving traditional Munda culture, handicrafts, and offering authentic cultural immersion.",
    keyFeatures: ["Traditional tribal life", "Handicrafts", "Cultural immersion", "Authentic experience", "Village tourism"],
    entryFee: "₹50 (Community fee)",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.0080, lng: 85.3100 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 4,
        comment: "Authentic tribal village experience. Great insight into traditional Munda culture and lifestyle.",
        date: "2024-01-25"
      }
    ]
  },

  // KODARMA DISTRICT - Famous Places
  {
    id: 12,
    name: "Tilaiya Dam",
    district: "Kodarma",
    type: "famous",
    category: "lakes",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "One of the major dams in Jharkhand built across the Barakar River, creating a scenic reservoir perfect for water activities.",
    whyFamous: "Famous for being one of Jharkhand's largest dams and major hydroelectric power source, popular for boating and fishing.",
    keyFeatures: ["Major hydroelectric dam", "Boating facilities", "Fishing opportunities", "Scenic reservoir", "Water sports"],
    entryFee: "₹10 entry, boat rides extra",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.2167, lng: 85.8833 },
    reviews: [
      {
        author: "Tourist Guide",
        rating: 4,
        comment: "Great place for day trip. The boat ride across the reservoir is really enjoyable.",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 13,
    name: "Dhwajadhari Hill",
    district: "Kodarma",
    type: "famous",
    category: "hills",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "A prominent hill featuring ancient temples and offering panoramic views of the surrounding landscape.",
    whyFamous: "Famous for its religious significance with ancient temples at hilltop and spectacular sunrise/sunset views.",
    keyFeatures: ["Ancient hilltop temples", "Panoramic views", "Sunrise/sunset viewpoint", "Religious significance", "Trekking trails"],
    entryFee: "Free",
    timing: "5:00 AM - 8:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 24.4667, lng: 85.5833 },
    reviews: [
      {
        author: "Hill Climber",
        rating: 4,
        comment: "Amazing views from the top! The ancient temples add to the spiritual experience.",
        date: "2024-02-28"
      }
    ]
  },
  {
    id: 14,
    name: "Radha Krishna Mandir",
    district: "Kodarma",
    type: "famous",
    category: "temples",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    description: "A beautiful temple dedicated to Lord Krishna and Radha, known for its intricate architecture and peaceful atmosphere.",
    whyFamous: "Famous for its beautiful architecture, peaceful environment, and vibrant celebrations during Janmashtami festival.",
    keyFeatures: ["Beautiful architecture", "Peaceful atmosphere", "Festival celebrations", "Spiritual significance", "Community gathering"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Year-round, special during Janmashtami",
    coordinates: { lat: 24.4500, lng: 85.5700 },
    reviews: [
      {
        author: "Devotee Krishna",
        rating: 4,
        comment: "Beautiful temple with serene atmosphere. The Janmashtami celebrations are spectacular.",
        date: "2024-08-26"
      }
    ]
  },
  {
    id: 15,
    name: "Koderma Wildlife Sanctuary",
    district: "Kodarma",
    type: "famous",
    category: "wildlife",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "A wildlife sanctuary home to various species including leopards, wild boars, deer, and numerous bird species.",
    whyFamous: "Important wildlife corridor known for leopard sightings and paradise for birdwatchers with over 70 species recorded.",
    keyFeatures: ["Leopard habitat", "70+ bird species", "Nature trails", "Wildlife photography", "Forest safari"],
    entryFee: "₹50 per person, ₹200 for camera",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 24.4681, lng: 85.5986 },
    reviews: [
      {
        author: "Wildlife Photographer",
        rating: 4,
        comment: "Great place for wildlife enthusiasts. Spotted leopards and many bird species.",
        date: "2024-01-15"
      }
    ]
  },

  // KODARMA DISTRICT - Hidden Places
  {
    id: 16,
    name: "Makamaro Hills",
    district: "Kodarma",
    type: "hidden",
    category: "hills",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Hidden hill range offering pristine natural beauty, challenging treks, and breathtaking views of Chota Nagpur plateau.",
    whyFamous: "Hidden gem known among serious trekkers for untouched natural beauty and challenging trails through dense forests.",
    keyFeatures: ["Challenging trekking", "Pristine forests", "Wildlife spotting", "Panoramic views", "Photography paradise"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "October to March",
    coordinates: { lat: 24.4500, lng: 85.6000 },
    reviews: [
      {
        author: "Trek Master",
        rating: 5,
        comment: "Incredible hidden gem! The trek is challenging but views are absolutely worth it. Pure nature at its best.",
        date: "2024-03-10"
      }
    ]
  },

  // LATEHAR DISTRICT - Famous Places
  {
    id: 17,
    name: "Lodh (Budhaghaugh) Waterfalls",
    district: "Latehar",
    type: "famous",
    category: "waterfalls",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "The highest waterfall in Jharkhand cascading from 143 meters, creating a spectacular natural wonder.",
    whyFamous: "Famous as Jharkhand's highest waterfall and one of India's tallest waterfalls, attracting visitors with its massive 143-meter drop.",
    keyFeatures: ["Jharkhand's highest waterfall", "143m drop", "Natural amphitheater", "Rainbow formation", "Adventure photography"],
    entryFee: "₹30 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.9167, lng: 84.5833 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 5,
        comment: "Absolutely stunning! The highest waterfall in Jharkhand is a must-visit. The rainbow in mist is magical.",
        date: "2024-08-20"
      }
    ]
  },
  {
    id: 18,
    name: "Netarhat Hill Station",
    district: "Latehar",
    type: "famous",
    category: "hills",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Known as the 'Queen of Chotanagpur', this hill station offers cool climate, scenic beauty and spectacular sunrise views.",
    whyFamous: "Famous as the 'Queen of Chotanagpur' for its pleasant climate, magnificent sunrise/sunset views, and colonial-era charm.",
    keyFeatures: ["Queen of Chotanagpur", "Spectacular sunrise", "Cool climate", "Colonial architecture", "Scenic valleys"],
    entryFee: "Free",
    timing: "24/7 (viewpoints accessible till sunset)",
    bestTime: "October to March",
    coordinates: { lat: 23.4667, lng: 84.2500 },
    reviews: [
      {
        author: "Hill Station Lover",
        rating: 5,
        comment: "The sunrise view from Netarhat is absolutely magical! Truly the Queen of Chotanagpur.",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: 19,
    name: "Betla National Park",
    district: "Latehar",
    type: "famous",
    category: "wildlife",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Part of Palamu Tiger Reserve, famous for tiger population, elephants, leopards, and diverse flora with safari facilities.",
    whyFamous: "First tiger reserve of Jharkhand, renowned for successful tiger conservation and diverse wildlife including Royal Bengal Tigers.",
    keyFeatures: ["Tiger reserve", "Elephant safari", "Jeep safari", "Sal forests", "Wildlife diversity"],
    entryFee: "₹100 per person, ₹1500 for jeep safari",
    timing: "6:00 AM - 11:00 AM, 3:00 PM - 6:00 PM",
    bestTime: "November to May",
    coordinates: { lat: 23.9167, lng: 84.2000 },
    reviews: [
      {
        author: "Tiger Enthusiast",
        rating: 5,
        comment: "Incredible wildlife experience! Spotted tigers and elephants during safari. Must visit!",
        date: "2024-03-05"
      }
    ]
  },

  // LATEHAR DISTRICT - Hidden Places
  {
    id: 20,
    name: "Tubed Cave",
    district: "Latehar",
    type: "hidden",
    category: "heritage",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "Mysterious natural cave system with unique rock formations and underground chambers, perfect for spelunking enthusiasts.",
    whyFamous: "Hidden cave system famous among adventure enthusiasts for unique tubular rock formations and mysterious chambers.",
    keyFeatures: ["Natural cave system", "Tubular formations", "Underground chambers", "Spelunking opportunities", "Geological significance"],
    entryFee: "Free",
    timing: "Daylight hours only",
    bestTime: "November to March",
    coordinates: { lat: 23.4500, lng: 84.3000 },
    reviews: [
      {
        author: "Cave Explorer",
        rating: 5,
        comment: "Fascinating hidden cave! Perfect for adventure lovers. The rock formations are incredible.",
        date: "2024-02-15"
      }
    ]
  },

  // LOHARDAGA DISTRICT - Famous Places
  {
    id: 21,
    name: "Lavapani Waterfall",
    district: "Lohardaga",
    type: "famous",
    category: "waterfalls",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    description: "Beautiful multi-tiered waterfall surrounded by lush forests, offering perfect retreat for nature lovers.",
    whyFamous: "Famous for its multi-tiered cascade structure and therapeutic properties attributed to its mineral-rich waters.",
    keyFeatures: ["Multi-tiered waterfall", "Mineral-rich waters", "Forest surroundings", "Natural therapy", "Photography location"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to December",
    coordinates: { lat: 23.4167, lng: 84.6833 },
    reviews: [
      {
        author: "Nature Healer",
        rating: 4,
        comment: "Beautiful waterfall with supposedly therapeutic waters. The forest setting is very peaceful.",
        date: "2024-08-30"
      }
    ]
  },
  {
    id: 22,
    name: "Victoria Lake",
    district: "Lohardaga",
    type: "famous",
    category: "lakes",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Serene artificial lake created during British era, perfect for boating and peaceful evening walks.",
    whyFamous: "Famous as colonial-era lake named after Queen Victoria, popular for scenic beauty and recreational activities.",
    keyFeatures: ["Colonial heritage", "Boating facilities", "Evening walks", "Scenic surroundings", "Peaceful environment"],
    entryFee: "₹10 entry, boat charges separate",
    timing: "6:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.4333, lng: 84.6667 },
    reviews: [
      {
        author: "History Buff",
        rating: 4,
        comment: "Nice historical lake with colonial charm. Great for evening walks and boat rides.",
        date: "2024-02-10"
      }
    ]
  },

  // LOHARDAGA DISTRICT - Hidden Places
  {
    id: 23,
    name: "Dhardhari Waterfall",
    district: "Lohardaga",
    type: "hidden",
    category: "waterfalls",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    description: "Secluded waterfall hidden in dense forests, accessible only through adventurous trekking routes.",
    whyFamous: "Hidden gem known for pristine beauty and adventurous trek required to reach it, popular among serious nature enthusiasts.",
    keyFeatures: ["Secluded location", "Adventure trekking", "Pristine beauty", "Crystal clear water", "Wildlife spotting"],
    entryFee: "Free",
    timing: "Daylight hours",
    bestTime: "August to January",
    coordinates: { lat: 23.4000, lng: 84.7000 },
    reviews: [
      {
        author: "Trek Enthusiast",
        rating: 5,
        comment: "Amazing hidden waterfall! The trek is challenging but the pristine beauty makes it absolutely worth it.",
        date: "2024-09-15"
      }
    ]
  },

  // MISSING KHUNTI DESTINATIONS - More Hidden Places
  {
    id: 24,
    name: "Remix Falls",
    district: "Khunti",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=800&h=600&fit=crop",
    description: "Another seasonal waterfall that transforms dramatically during monsoons, offering spectacular water displays.",
    whyFamous: "Hidden seasonal waterfall known for its dramatic transformation during heavy rains, creating impressive water cascades.",
    keyFeatures: ["Seasonal cascade", "Monsoon transformation", "Hidden location", "Natural spectacle", "Adventure access"],
    entryFee: "Free",
    timing: "Daylight hours",
    bestTime: "July to September",
    coordinates: { lat: 23.0180, lng: 85.2880 },
    reviews: [
      {
        author: "Seasonal Explorer",
        rating: 4,
        comment: "Incredible transformation during monsoons! Best visited during peak rains for full experience.",
        date: "2024-08-25"
      }
    ]
  },
  {
    id: 25,
    name: "Dasam Falls",
    district: "Khunti",
    type: "hidden",
    category: "waterfalls",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=600&fit=crop",
    description: "Seasonal waterfall known for its powerful cascade during monsoons, hidden deep in the forest.",
    whyFamous: "Hidden waterfall famous for its thunderous roar during peak monsoon season, creating a natural amphitheater effect.",
    keyFeatures: ["Thunderous cascade", "Seasonal spectacle", "Forest hideaway", "Natural acoustics", "Photography challenge"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "July to October",
    coordinates: { lat: 23.0220, lng: 85.2920 },
    reviews: [
      {
        author: "Sound Explorer",
        rating: 4,
        comment: "The thunderous sound of water is incredible! A hidden gem for those who love powerful waterfalls.",
        date: "2024-08-30"
      }
    ]
  },

  // MISSING KODARMA DESTINATIONS
  {
    id: 26,
    name: "Satagawan Petro Falls",
    district: "Kodarma",
    type: "famous",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Beautiful waterfall named after the nearby petroleum exploration activities, offering scenic beauty.",
    whyFamous: "Famous for its unique name related to petroleum exploration history and beautiful cascade structure.",
    keyFeatures: ["Historical significance", "Beautiful cascade", "Petroleum exploration link", "Scenic location", "Easy access"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.4700, lng: 85.5900 },
    reviews: [
      {
        author: "History Enthusiast",
        rating: 4,
        comment: "Interesting combination of natural beauty and historical significance. Great waterfall with unique backstory.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 27,
    name: "Rajdah Dham",
    district: "Kodarma",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    description: "Sacred temple complex known for its spiritual significance and peaceful environment.",
    whyFamous: "Famous religious site attracting devotees for its spiritual atmosphere and temple architecture.",
    keyFeatures: ["Sacred temple", "Spiritual significance", "Peaceful environment", "Religious gatherings", "Traditional architecture"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Year-round",
    coordinates: { lat: 24.4600, lng: 85.5800 },
    reviews: [
      {
        author: "Spiritual Seeker",
        rating: 4,
        comment: "Very peaceful and spiritual place. Great for meditation and connecting with divine energy.",
        date: "2024-03-20"
      }
    ]
  },
  {
    id: 28,
    name: "Chanchal Dam",
    district: "Kodarma",
    type: "famous",
    category: "lakes",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Scenic dam creating a beautiful reservoir, perfect for picnics and water activities.",
    whyFamous: "Popular dam known for its scenic reservoir and recreational facilities for families.",
    keyFeatures: ["Scenic reservoir", "Family picnic spot", "Water activities", "Boating facilities", "Peaceful environment"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.4800, lng: 85.6000 },
    reviews: [
      {
        author: "Family Visitor",
        rating: 4,
        comment: "Great place for family outings. Kids enjoyed the boating and peaceful environment.",
        date: "2024-01-20"
      }
    ]
  },
  {
    id: 29,
    name: "Koderma Reservoir",
    district: "Kodarma",
    type: "famous",
    category: "lakes",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Large reservoir serving as water source and recreational area with beautiful surroundings.",
    whyFamous: "Major water reservoir known for its size and importance as water source for the region.",
    keyFeatures: ["Large reservoir", "Water source", "Scenic surroundings", "Bird watching", "Photography spot"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 24.4750, lng: 85.5950 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 4,
        comment: "Great for photography and bird watching. The large reservoir creates beautiful reflections.",
        date: "2024-02-05"
      }
    ]
  },

  // MISSING KODARMA HIDDEN PLACES
  {
    id: 30,
    name: "Tomb of Sant Paramhans Baba",
    district: "Kodarma",
    type: "hidden",
    category: "heritage",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Sacred tomb of a revered saint, known for its spiritual significance and peaceful atmosphere.",
    whyFamous: "Hidden spiritual site revered by locals for the tomb of Sant Paramhans Baba and associated miracles.",
    keyFeatures: ["Sacred tomb", "Spiritual significance", "Local reverence", "Peaceful atmosphere", "Religious heritage"],
    entryFee: "Free",
    timing: "5:00 AM - 8:00 PM",
    bestTime: "Year-round",
    coordinates: { lat: 24.4550, lng: 85.6050 },
    reviews: [
      {
        author: "Devotee Seeker",
        rating: 5,
        comment: "Very powerful spiritual energy here. The tomb of Sant Paramhans Baba is truly blessed.",
        date: "2024-04-15"
      }
    ]
  },
  {
    id: 31,
    name: "Panchkhero Dam",
    district: "Kodarma",
    type: "hidden",
    category: "lakes",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Lesser-known dam creating a peaceful reservoir, perfect for quiet contemplation and fishing.",
    whyFamous: "Hidden gem known among locals for fishing and peaceful environment away from crowds.",
    keyFeatures: ["Quiet reservoir", "Fishing opportunities", "Peaceful environment", "Less crowded", "Natural beauty"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "October to March",
    coordinates: { lat: 24.4400, lng: 85.6100 },
    reviews: [
      {
        author: "Fishing Enthusiast",
        rating: 4,
        comment: "Perfect hidden spot for fishing and peaceful time. Away from tourist crowds.",
        date: "2024-01-30"
      }
    ]
  },
  {
    id: 32,
    name: "Jain Mandir (Koderma town)",
    district: "Kodarma",
    type: "hidden",
    category: "temples",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    description: "Beautiful Jain temple in Koderma town known for its intricate architecture and peaceful atmosphere.",
    whyFamous: "Hidden Jain temple known for its beautiful architecture and serene environment for meditation.",
    keyFeatures: ["Jain architecture", "Intricate designs", "Peaceful meditation", "Religious significance", "Local heritage"],
    entryFee: "Free",
    timing: "5:00 AM - 8:00 PM",
    bestTime: "Year-round",
    coordinates: { lat: 24.4680, lng: 85.5990 },
    reviews: [
      {
        author: "Architecture Lover",
        rating: 4,
        comment: "Beautiful Jain temple with intricate architecture. Very peaceful place for meditation.",
        date: "2024-03-10"
      }
    ]
  },

  // MISSING LATEHAR DESTINATIONS
  {
    id: 33,
    name: "Upper Ghaghri Waterfall",
    district: "Latehar",
    type: "famous",
    category: "waterfalls",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    description: "Beautiful upper section of the Ghaghri waterfall system, offering spectacular multi-tier cascades.",
    whyFamous: "Famous as the upper section of Ghaghri falls, known for its powerful cascade and natural swimming pools.",
    keyFeatures: ["Multi-tier cascade", "Natural swimming pools", "Powerful water flow", "Scenic beauty", "Photography spot"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to December",
    coordinates: { lat: 23.9200, lng: 84.5900 },
    reviews: [
      {
        author: "Waterfall Explorer",
        rating: 4,
        comment: "Spectacular upper falls with powerful cascade. The natural pools are perfect for a refreshing dip.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 34,
    name: "Koel River Valley",
    district: "Latehar",
    type: "famous",
    category: "heritage",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Scenic river valley offering beautiful landscapes, riverside camping, and nature walks.",
    whyFamous: "Famous for its scenic beauty, riverside camping opportunities, and rich biodiversity along the river.",
    keyFeatures: ["Scenic river valley", "Camping opportunities", "Nature walks", "Biodiversity", "Peaceful environment"],
    entryFee: "Free",
    timing: "24/7",
    bestTime: "October to March",
    coordinates: { lat: 23.9300, lng: 84.5700 },
    reviews: [
      {
        author: "River Camper",
        rating: 4,
        comment: "Beautiful river valley perfect for camping. The sunrise views over the river are breathtaking.",
        date: "2024-02-20"
      }
    ]
  },
  {
    id: 35,
    name: "Lower Ghaghri Waterfall",
    district: "Latehar",
    type: "famous",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    description: "The lower section of Ghaghri falls, offering easier access and beautiful cascade views.",
    whyFamous: "Famous for being more accessible than upper falls while still offering spectacular cascade views.",
    keyFeatures: ["Easier access", "Beautiful cascade", "Family friendly", "Scenic surroundings", "Photography friendly"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.9100, lng: 84.5800 },
    reviews: [
      {
        author: "Family Explorer",
        rating: 4,
        comment: "Great for families with kids. Easier to access than upper falls but equally beautiful.",
        date: "2024-07-30"
      }
    ]
  },

  // MISSING LATEHAR HIDDEN PLACES
  {
    id: 36,
    name: "Sarju Valley",
    district: "Latehar",
    type: "hidden",
    category: "heritage",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Hidden valley offering pristine natural beauty, tribal culture, and peaceful environment.",
    whyFamous: "Hidden gem known for untouched natural beauty and authentic tribal cultural experiences.",
    keyFeatures: ["Pristine valley", "Tribal culture", "Untouched nature", "Cultural immersion", "Adventure trekking"],
    entryFee: "₹100 (Community fee)",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.4800, lng: 84.3200 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 5,
        comment: "Amazing hidden valley with authentic tribal culture. Untouched natural beauty is breathtaking.",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 37,
    name: "Mahuadanr Wolf Sanctuary",
    district: "Latehar",
    type: "hidden",
    category: "wildlife",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "Unique sanctuary dedicated to wolf conservation, offering rare wildlife viewing opportunities.",
    whyFamous: "Hidden sanctuary known for successful wolf conservation program and rare wildlife sightings.",
    keyFeatures: ["Wolf conservation", "Rare wildlife", "Research facility", "Educational programs", "Nature trails"],
    entryFee: "₹150 per person",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.4900, lng: 84.3300 },
    reviews: [
      {
        author: "Wildlife Researcher",
        rating: 4,
        comment: "Incredible wolf sanctuary! Rare opportunity to see wolves in their natural habitat. Educational experience.",
        date: "2024-02-28"
      }
    ]
  },
  {
    id: 38,
    name: "Narayanpur Fort",
    district: "Latehar",
    type: "hidden",
    category: "heritage",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Ancient fort ruins offering glimpse into historical architecture and strategic location.",
    whyFamous: "Hidden historical fort known for its strategic location and well-preserved ancient architecture.",
    keyFeatures: ["Ancient fort ruins", "Historical architecture", "Strategic location", "Archaeological value", "Panoramic views"],
    entryFee: "₹50 per person",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.4700, lng: 84.3100 },
    reviews: [
      {
        author: "History Buff",
        rating: 4,
        comment: "Fascinating fort ruins with great historical significance. The views from top are amazing.",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: 39,
    name: "Mirchaiya Waterfall",
    district: "Latehar",
    type: "hidden",
    category: "waterfalls",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    description: "Hidden waterfall accessible through adventurous trekking, offering pristine natural beauty.",
    whyFamous: "Hidden waterfall known for its pristine beauty and challenging trek through dense forests.",
    keyFeatures: ["Hidden location", "Adventure trekking", "Pristine beauty", "Forest surroundings", "Photography paradise"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "August to December",
    coordinates: { lat: 23.4600, lng: 84.3400 },
    reviews: [
      {
        author: "Adventure Trekker",
        rating: 5,
        comment: "Hidden gem! The trek is challenging but the pristine waterfall makes it absolutely worth it.",
        date: "2024-09-10"
      }
    ]
  },

  // MISSING LOHARDAGA DESTINATIONS
  {
    id: 40,
    name: "Prachin Shiv Temple (Khakparata)",
    district: "Lohardaga",
    type: "famous",
    category: "temples",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    description: "Ancient Shiva temple known for its historical significance and beautiful architecture.",
    whyFamous: "Famous ancient Shiva temple known for its historical importance and architectural beauty.",
    keyFeatures: ["Ancient Shiva temple", "Historical significance", "Beautiful architecture", "Religious importance", "Cultural heritage"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Year-round, special during Mahashivaratri",
    coordinates: { lat: 23.4200, lng: 84.6800 },
    reviews: [
      {
        author: "Temple Devotee",
        rating: 5,
        comment: "Beautiful ancient temple with incredible spiritual energy. The architecture is magnificent.",
        date: "2024-03-05"
      }
    ]
  },
  {
    id: 41,
    name: "Nandani Dam",
    district: "Lohardaga",
    type: "famous",
    category: "lakes",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Scenic dam creating beautiful reservoir, popular for picnics and water activities.",
    whyFamous: "Popular dam known for its scenic beauty and recreational facilities for visitors.",
    keyFeatures: ["Scenic dam", "Beautiful reservoir", "Picnic spot", "Water activities", "Family destination"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.4300, lng: 84.6900 },
    reviews: [
      {
        author: "Family Visitor",
        rating: 4,
        comment: "Great place for family picnics. The reservoir is beautiful and peaceful.",
        date: "2024-01-18"
      }
    ]
  },
  {
    id: 42,
    name: "Bhandra Wildlife Sanctuary",
    district: "Lohardaga",
    type: "famous",
    category: "wildlife",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "Wildlife sanctuary home to diverse flora and fauna, offering nature trails and wildlife viewing.",
    whyFamous: "Famous wildlife sanctuary known for its biodiversity and conservation efforts in the region.",
    keyFeatures: ["Diverse wildlife", "Nature trails", "Bird watching", "Conservation area", "Educational value"],
    entryFee: "₹75 per person",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.4100, lng: 84.7100 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Great wildlife sanctuary with good variety of animals and birds. Well-maintained nature trails.",
        date: "2024-02-12"
      }
    ]
  },
  {
    id: 43,
    name: "Kanti Waterfall",
    district: "Lohardaga",
    type: "famous",
    category: "waterfalls",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
    description: "Beautiful waterfall known for its graceful cascade and peaceful surroundings.",
    whyFamous: "Famous for its elegant cascade and serene environment, popular among nature photographers.",
    keyFeatures: ["Graceful cascade", "Peaceful surroundings", "Photography spot", "Natural beauty", "Easy access"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.4400, lng: 84.6600 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 4,
        comment: "Elegant waterfall with graceful cascade. Perfect for photography and peaceful moments.",
        date: "2024-08-20"
      }
    ]
  },
  {
    id: 44,
    name: "Sukri River Valley",
    district: "Lohardaga",
    type: "famous",
    category: "heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    description: "Scenic river valley offering beautiful landscapes and peaceful riverside environment.",
    whyFamous: "Famous for its scenic beauty and peaceful riverside environment perfect for relaxation.",
    keyFeatures: ["Scenic river valley", "Peaceful environment", "Natural beauty", "Riverside walks", "Bird watching"],
    entryFee: "Free",
    timing: "24/7",
    bestTime: "October to March",
    coordinates: { lat: 23.4500, lng: 84.6500 },
    reviews: [
      {
        author: "River Walker",
        rating: 4,
        comment: "Beautiful river valley perfect for peaceful walks. The scenery is very calming.",
        date: "2024-01-28"
      }
    ]
  },

  // MISSING LOHARDAGA HIDDEN PLACES
  {
    id: 45,
    name: "Korambe Hill",
    district: "Lohardaga",
    type: "hidden",
    category: "hills",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Hidden hill offering panoramic views and peaceful trekking opportunities away from crowds.",
    whyFamous: "Hidden gem known among trekkers for its panoramic views and peaceful hiking trails.",
    keyFeatures: ["Panoramic views", "Peaceful trekking", "Hidden location", "Sunrise viewpoint", "Less crowded"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "October to March",
    coordinates: { lat: 23.3900, lng: 84.7200 },
    reviews: [
      {
        author: "Hill Trekker",
        rating: 4,
        comment: "Amazing hidden hill with great views. Perfect for peaceful trekking away from tourist crowds.",
        date: "2024-02-15"
      }
    ]
  },
  {
    id: 46,
    name: "27 Number Bridge",
    district: "Lohardaga",
    type: "hidden",
    category: "heritage",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Historic bridge with unique architectural design and local significance.",
    whyFamous: "Hidden historic bridge known for its unique design and importance to local transportation history.",
    keyFeatures: ["Historic bridge", "Unique architecture", "Local significance", "Engineering marvel", "Photography spot"],
    entryFee: "Free",
    timing: "24/7",
    bestTime: "Year-round",
    coordinates: { lat: 23.3800, lng: 84.7300 },
    reviews: [
      {
        author: "Bridge Enthusiast",
        rating: 4,
        comment: "Interesting historic bridge with unique design. Great example of local engineering heritage.",
        date: "2024-03-08"
      }
    ]
  },
  {
    id: 47,
    name: "Banpur Dam (Bhusar Dam)",
    district: "Lohardaga",
    type: "hidden",
    category: "lakes",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Hidden dam creating peaceful reservoir, perfect for quiet contemplation and fishing.",
    whyFamous: "Hidden dam known among locals for peaceful environment and good fishing opportunities.",
    keyFeatures: ["Hidden reservoir", "Fishing opportunities", "Peaceful environment", "Local secret", "Natural beauty"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "October to March",
    coordinates: { lat: 23.3700, lng: 84.7400 },
    reviews: [
      {
        author: "Fishing Expert",
        rating: 4,
        comment: "Great hidden spot for fishing and peaceful time. Beautiful reservoir away from crowds.",
        date: "2024-01-22"
      }
    ]
  }
];

// Utility functions for filtering destinations
export const getDestinationsByDistrict = (district: string): Destination[] => {
  return allDestinations.filter(dest => dest.district === district);
};

export const getDestinationsByType = (type: 'famous' | 'hidden'): Destination[] => {
  return allDestinations.filter(dest => dest.type === type);
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  return allDestinations.filter(dest => dest.category === category);
};

export const getFeaturedDestinations = (): Destination[] => {
  return allDestinations.filter(dest => dest.rating >= 4.0);
};

export const getHiddenGems = (): Destination[] => {
  return allDestinations.filter(dest => dest.type === 'hidden');
};

// District statistics
export const getDistrictStats = () => {
  const districts = ['Khunti', 'Kodarma', 'Latehar', 'Lohardaga'];
  return districts.map(district => ({
    name: district,
    totalPlaces: getDestinationsByDistrict(district).length,
    famousPlaces: getDestinationsByDistrict(district).filter(d => d.type === 'famous').length,
    hiddenGems: getDestinationsByDistrict(district).filter(d => d.type === 'hidden').length,
    avgRating: getDestinationsByDistrict(district).reduce((acc, d) => acc + d.rating, 0) / getDestinationsByDistrict(district).length
  }));
};

// Export as default for easy importing
export { allDestinations as districtsData };
export default allDestinations;