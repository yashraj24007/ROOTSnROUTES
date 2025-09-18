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
  },

  // PAKUR DISTRICT
  {
    id: 48,
    name: "Sidhu-Kanhu Murmu Park",
    district: "Pakur",
    type: "famous",
    category: "parks",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful park dedicated to the tribal heroes Sidhu and Kanhu Murmu, who led the Santhal rebellion. The park offers lush greenery and peaceful environment.",
    whyFamous: "Famous for being named after the tribal freedom fighters Sidhu and Kanhu Murmu, and for its beautiful landscaped gardens and recreational facilities.",
    keyFeatures: ["Memorial of tribal heroes", "Landscaped gardens", "Walking trails", "Children's play area", "Cultural significance"],
    entryFee: "₹5 per person",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.6350, lng: 87.8450 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 4,
        comment: "Beautiful park with rich tribal heritage. Great for families and history enthusiasts.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 49,
    name: "Nitya Kali Mandir",
    district: "Pakur",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple dedicated to Goddess Kali, known for its spiritual significance and beautiful architecture in traditional Bengali style.",
    whyFamous: "Famous for its powerful spiritual energy and being one of the important Kali temples in the region, attracting devotees throughout the year.",
    keyFeatures: ["Ancient temple architecture", "Spiritual significance", "Bengali temple style", "Religious festivals", "Peaceful atmosphere"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "September to March",
    coordinates: { lat: 24.6280, lng: 87.8520 },
    reviews: [
      {
        author: "Devotee Kumar",
        rating: 4,
        comment: "Very peaceful temple with strong spiritual vibes. Beautiful architecture and well-maintained premises.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 50,
    name: "Dharni Pahar",
    district: "Pakur",
    type: "hidden",
    category: "hills",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic hill offering panoramic views of the surrounding landscape, perfect for trekking and nature photography.",
    whyFamous: "Known for its scenic beauty and being a perfect spot for sunrise and sunset views, popular among local trekkers.",
    keyFeatures: ["Panoramic views", "Trekking trails", "Sunrise/sunset point", "Natural beauty", "Photography spot"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.6400, lng: 87.8600 },
    reviews: [
      {
        author: "Trek Enthusiast",
        rating: 4,
        comment: "Great hill for trekking with beautiful views. Perfect for morning and evening visits.",
        date: "2024-06-20"
      }
    ]
  },
  {
    id: 51,
    name: "Kanchangarh Cave",
    district: "Pakur",
    type: "hidden",
    category: "caves",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient cave system with historical significance and natural formations, offering adventure and exploration opportunities.",
    whyFamous: "Famous for its mysterious cave formations and historical significance, believed to have been used by ancient civilizations.",
    keyFeatures: ["Ancient cave system", "Historical significance", "Natural formations", "Adventure exploration", "Archaeological interest"],
    entryFee: "₹10 per person",
    timing: "8:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 24.6200, lng: 87.8700 },
    reviews: [
      {
        author: "Adventure Seeker",
        rating: 4,
        comment: "Fascinating cave system with interesting formations. Great for adventure lovers and history buffs.",
        date: "2024-05-25"
      }
    ]
  },
  {
    id: 52,
    name: "Hot Spring (Sidpur)",
    district: "Pakur",
    type: "hidden",
    category: "hot springs",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1571104508999-893933ded431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Natural hot spring with therapeutic properties, located in Sidpur village, known for its healing benefits and natural mineral content.",
    whyFamous: "Famous for its natural therapeutic properties and mineral-rich waters that are believed to have healing benefits for various ailments.",
    keyFeatures: ["Natural hot spring", "Therapeutic properties", "Mineral-rich water", "Healing benefits", "Rural setting"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 24.6500, lng: 87.8300 },
    reviews: [
      {
        author: "Wellness Seeker",
        rating: 4,
        comment: "Amazing natural hot spring with great healing properties. Very relaxing experience.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 53,
    name: "Shiv Sheetla Mandir",
    district: "Pakur",
    type: "famous",
    category: "temples",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A temple dedicated to Lord Shiva and Goddess Sheetla, known for its religious significance and annual festivals.",
    whyFamous: "Famous for its dual deity worship and being a significant pilgrimage site for devotees of both Lord Shiva and Goddess Sheetla.",
    keyFeatures: ["Dual deity temple", "Religious festivals", "Pilgrimage site", "Traditional architecture", "Spiritual atmosphere"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.6320, lng: 87.8480 },
    reviews: [
      {
        author: "Pilgrimage Visitor",
        rating: 4,
        comment: "Beautiful temple with peaceful atmosphere. Great place for spiritual seeking and prayer.",
        date: "2024-07-08"
      }
    ]
  },
  {
    id: 54,
    name: "Diwan-e-Pir",
    district: "Pakur",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historical site with Islamic heritage and architectural significance, representing the cultural diversity of the region.",
    whyFamous: "Known for its historical importance and Islamic architectural style, representing the rich cultural heritage of Pakur district.",
    keyFeatures: ["Islamic heritage", "Historical significance", "Architectural beauty", "Cultural diversity", "Religious importance"],
    entryFee: "Free",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.6250, lng: 87.8550 },
    reviews: [
      {
        author: "Heritage Lover",
        rating: 4,
        comment: "Interesting historical site with beautiful Islamic architecture. Good for understanding local history.",
        date: "2024-06-12"
      }
    ]
  },
  {
    id: 55,
    name: "Devinagar",
    district: "Pakur",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic village known for its traditional architecture and cultural significance, offering glimpses into rural heritage.",
    whyFamous: "Known for its well-preserved traditional village architecture and being a showcase of rural heritage and customs.",
    keyFeatures: ["Traditional village", "Rural heritage", "Cultural significance", "Historic architecture", "Local customs"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 24.6100, lng: 87.8650 },
    reviews: [
      {
        author: "Culture Explorer",
        rating: 4,
        comment: "Beautiful traditional village with rich cultural heritage. Great for understanding rural life.",
        date: "2024-05-18"
      }
    ]
  },
  {
    id: 56,
    name: "Birkitti",
    district: "Pakur",
    type: "hidden",
    category: "heritage",
    rating: 3.6,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A small heritage site with historical importance and local significance, known for its peaceful rural setting.",
    whyFamous: "Known for its local historical significance and being a quiet rural destination perfect for experiencing traditional life.",
    keyFeatures: ["Local heritage", "Rural setting", "Peaceful environment", "Traditional life", "Historical significance"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "October to March",
    coordinates: { lat: 24.6050, lng: 87.8750 },
    reviews: [
      {
        author: "Rural Explorer",
        rating: 3,
        comment: "Quiet rural destination with local charm. Good for understanding village life and traditions.",
        date: "2024-04-22"
      }
    ]
  },
  {
    id: 57,
    name: "Lilatari Waterfall",
    district: "Pakur",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A hidden waterfall surrounded by dense forest, offering a serene natural environment perfect for nature lovers.",
    whyFamous: "Famous for its pristine natural beauty and being one of the hidden gems of Pakur, perfect for peaceful retreats.",
    keyFeatures: ["Hidden waterfall", "Dense forest", "Natural beauty", "Peaceful environment", "Photography spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.6180, lng: 87.8800 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Beautiful hidden waterfall with pristine natural surroundings. Perfect for peaceful meditation.",
        date: "2024-08-28"
      }
    ]
  },
  {
    id: 58,
    name: "Hathimara Sunset View Point",
    district: "Pakur",
    type: "hidden",
    category: "viewpoints",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A spectacular viewpoint offering breathtaking sunset views over the surrounding landscape, perfect for photography and romantic evenings.",
    whyFamous: "Famous for offering some of the most spectacular sunset views in Pakur district, making it a popular spot for photographers and couples.",
    keyFeatures: ["Spectacular sunsets", "Panoramic views", "Photography spot", "Romantic setting", "Natural beauty"],
    entryFee: "Free",
    timing: "5:00 AM - 7:30 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.6350, lng: 87.8900 },
    reviews: [
      {
        author: "Photography Enthusiast",
        rating: 5,
        comment: "Absolutely stunning sunset views! Perfect for photography and romantic evenings.",
        date: "2024-07-30"
      }
    ]
  },
  {
    id: 59,
    name: "Mahakal Shakti Pith",
    district: "Pakur",
    type: "famous",
    category: "temples",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A powerful Shakti Pith dedicated to Goddess Durga and Lord Mahakal (Shiva), known for its spiritual energy and religious significance.",
    whyFamous: "Famous as a Shakti Pith with immense spiritual power, attracting devotees from across the region for its divine energy and religious festivals.",
    keyFeatures: ["Shakti Pith temple", "Spiritual energy", "Religious festivals", "Pilgrimage site", "Divine atmosphere"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.6420, lng: 87.8350 },
    reviews: [
      {
        author: "Spiritual Seeker",
        rating: 5,
        comment: "Incredibly powerful Shakti Pith with amazing spiritual energy. Life-changing experience for devotees.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 60,
    name: "Martello Tower",
    district: "Pakur",
    type: "hidden",
    category: "heritage",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic British-era tower with architectural significance and historical importance, representing colonial heritage in the region.",
    whyFamous: "Known for its British colonial architecture and historical significance as a watchtower from the colonial period.",
    keyFeatures: ["British colonial tower", "Historical architecture", "Colonial heritage", "Watchtower design", "Archaeological importance"],
    entryFee: "₹10 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 24.6300, lng: 87.8400 },
    reviews: [
      {
        author: "History Buff",
        rating: 4,
        comment: "Interesting colonial-era tower with good historical significance. Worth visiting for history enthusiasts.",
        date: "2024-06-05"
      }
    ]
  },

  // PALAMU DISTRICT
  {
    id: 61,
    name: "Palamau Fort",
    district: "Palamu",
    type: "famous",
    category: "heritage",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1520637736862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient fort with rich historical significance, showcasing medieval architecture and strategic military importance in the region.",
    whyFamous: "Famous for its historical importance as a medieval fortification and its architectural significance representing the region's royal heritage.",
    keyFeatures: ["Medieval fort", "Historical architecture", "Strategic location", "Royal heritage", "Archaeological importance"],
    entryFee: "₹15 per person",
    timing: "9:00 AM - 5:30 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.0550, lng: 83.9650 },
    reviews: [
      {
        author: "History Explorer",
        rating: 4,
        comment: "Magnificent fort with great historical value. Well-preserved architecture and interesting stories.",
        date: "2024-07-20"
      }
    ]
  },
  {
    id: 62,
    name: "Betla National Park",
    district: "Palamu",
    type: "famous",
    category: "wildlife",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "One of the first national parks of India, known for its rich biodiversity, tigers, elephants, and dense forest cover.",
    whyFamous: "Famous as one of India's first national parks and part of Palamau Tiger Reserve, known for tiger sightings and diverse wildlife.",
    keyFeatures: ["Tiger reserve", "Rich biodiversity", "Elephant population", "Dense forests", "Wildlife safari"],
    entryFee: "₹100 per person (Indians), ₹500 (Foreigners)",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to April",
    coordinates: { lat: 23.8833, lng: 84.1833 },
    reviews: [
      {
        author: "Wildlife Photographer",
        rating: 5,
        comment: "Amazing national park with incredible wildlife diversity. Great tiger sightings and beautiful landscapes.",
        date: "2024-08-12"
      }
    ]
  },
  {
    id: 63,
    name: "Palamau Tiger Reserve",
    district: "Palamu",
    type: "famous",
    category: "wildlife",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A significant tiger reserve encompassing Betla National Park, known for conservation efforts and wildlife protection.",
    whyFamous: "Famous for its tiger conservation program and being one of the original Project Tiger reserves in India.",
    keyFeatures: ["Tiger conservation", "Project Tiger reserve", "Wildlife protection", "Research facility", "Eco-tourism"],
    entryFee: "₹100 per person (Indians), ₹500 (Foreigners)",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to April",
    coordinates: { lat: 23.9000, lng: 84.2000 },
    reviews: [
      {
        author: "Conservation Enthusiast",
        rating: 4,
        comment: "Excellent conservation efforts and great wildlife viewing opportunities. Important tiger habitat.",
        date: "2024-07-25"
      }
    ]
  },
  {
    id: 64,
    name: "Lodh Falls",
    district: "Palamu",
    type: "famous",
    category: "waterfalls",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "The highest waterfall in Jharkhand at 468 feet, offering spectacular cascades and natural beauty in pristine surroundings.",
    whyFamous: "Famous for being Jharkhand's highest waterfall and one of India's most spectacular waterfalls, attracting tourists from across the country.",
    keyFeatures: ["Highest waterfall in Jharkhand", "468 feet height", "Spectacular cascade", "Natural beauty", "Photography paradise"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.5833, lng: 84.3833 },
    reviews: [
      {
        author: "Waterfall Explorer",
        rating: 5,
        comment: "Absolutely breathtaking! The highest waterfall in Jharkhand is truly spectacular. A must-visit destination.",
        date: "2024-08-18"
      }
    ]
  },
  {
    id: 65,
    name: "Sukhaldari Water Fall",
    district: "Palamu",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall surrounded by dense forest, offering a serene and peaceful environment for nature lovers.",
    whyFamous: "Known for its pristine natural beauty and being a hidden gem perfect for peaceful retreats and nature photography.",
    keyFeatures: ["Hidden waterfall", "Dense forest surroundings", "Peaceful environment", "Natural beauty", "Photography spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.6000, lng: 84.4000 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Beautiful hidden waterfall with tranquil surroundings. Perfect for a peaceful day in nature.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 66,
    name: "Mirchaiya Waterfall",
    district: "Palamu",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic waterfall known for its natural beauty and peaceful atmosphere, perfect for trekking and nature exploration.",
    whyFamous: "Known for its scenic beauty and being an excellent trekking destination with beautiful natural surroundings.",
    keyFeatures: ["Scenic waterfall", "Trekking destination", "Natural beauty", "Peaceful atmosphere", "Adventure spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to October",
    coordinates: { lat: 23.6200, lng: 84.3700 },
    reviews: [
      {
        author: "Trekking Enthusiast",
        rating: 4,
        comment: "Great waterfall for trekking and adventure. Beautiful natural scenery and peaceful environment.",
        date: "2024-06-28"
      }
    ]
  },
  {
    id: 67,
    name: "Bhim Chulha",
    district: "Palamu",
    type: "hidden",
    category: "heritage",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient stone structure with mythological significance, believed to be associated with Bhima from Mahabharata.",
    whyFamous: "Famous for its mythological connection to the Mahabharata and unique stone formations that resemble cooking hearths.",
    keyFeatures: ["Mythological significance", "Ancient stone structure", "Mahabharata connection", "Unique formations", "Archaeological interest"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "October to March",
    coordinates: { lat: 23.7000, lng: 84.2500 },
    reviews: [
      {
        author: "Mythology Enthusiast",
        rating: 4,
        comment: "Fascinating site with interesting mythological connections. Unique stone formations worth exploring.",
        date: "2024-05-20"
      }
    ]
  },
  {
    id: 68,
    name: "Shahpur Village",
    district: "Palamu",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A traditional village showcasing rural life and local culture, offering insights into traditional Jharkhand lifestyle.",
    whyFamous: "Known for its authentic rural culture and traditional way of life, representing the heritage of Palamu region.",
    keyFeatures: ["Traditional village", "Rural culture", "Local lifestyle", "Heritage value", "Cultural experience"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 23.7500, lng: 84.3000 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 4,
        comment: "Authentic village experience with rich cultural heritage. Great for understanding rural life.",
        date: "2024-04-15"
      }
    ]
  },
  {
    id: 69,
    name: "Ranital Dam",
    district: "Palamu",
    type: "hidden",
    category: "dams",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a beautiful reservoir, perfect for picnics and peaceful retreats with water activities.",
    whyFamous: "Known for its scenic beauty and recreational opportunities, popular among locals for picnics and water sports.",
    keyFeatures: ["Scenic reservoir", "Water activities", "Picnic spot", "Peaceful environment", "Recreational facility"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.8000, lng: 84.3500 },
    reviews: [
      {
        author: "Family Visitor",
        rating: 4,
        comment: "Beautiful dam with great picnic facilities. Perfect for family outings and water activities.",
        date: "2024-07-10"
      }
    ]
  },
  {
    id: 70,
    name: "Raj Chainpur Fort",
    district: "Palamu",
    type: "hidden",
    category: "heritage",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient fort ruins with historical significance, showcasing medieval architecture and strategic importance.",
    whyFamous: "Famous for its historical importance and architectural remains representing the medieval period of Palamu region.",
    keyFeatures: ["Ancient fort ruins", "Medieval architecture", "Historical significance", "Archaeological site", "Strategic location"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 23.8500, lng: 84.4000 },
    reviews: [
      {
        author: "Archaeology Enthusiast",
        rating: 4,
        comment: "Interesting fort ruins with good historical value. Great for understanding medieval architecture.",
        date: "2024-06-18"
      }
    ]
  },
  {
    id: 71,
    name: "Deori Sone Nadi River",
    district: "Palamu",
    type: "hidden",
    category: "rivers",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful river known for its clear waters and scenic surroundings, perfect for nature photography and peaceful retreats.",
    whyFamous: "Known for its pristine waters and beautiful natural surroundings, popular among nature lovers and photographers.",
    keyFeatures: ["Clear river waters", "Scenic surroundings", "Nature photography", "Peaceful environment", "Natural beauty"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "October to March",
    coordinates: { lat: 23.9000, lng: 84.4500 },
    reviews: [
      {
        author: "River Explorer",
        rating: 4,
        comment: "Beautiful river with crystal clear waters. Perfect for peaceful nature experiences and photography.",
        date: "2024-05-25"
      }
    ]
  },
  {
    id: 72,
    name: "Chianki Hill",
    district: "Palamu",
    type: "hidden",
    category: "hills",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic hill offering panoramic views and trekking opportunities, perfect for adventure enthusiasts and nature lovers.",
    whyFamous: "Known for its scenic beauty and being an excellent trekking destination with panoramic views of the surrounding landscape.",
    keyFeatures: ["Scenic hill views", "Trekking opportunities", "Panoramic landscape", "Adventure destination", "Natural beauty"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.9500, lng: 84.5000 },
    reviews: [
      {
        author: "Hill Trekker",
        rating: 4,
        comment: "Great hill for trekking with beautiful panoramic views. Perfect for adventure and nature photography.",
        date: "2024-07-05"
      }
    ]
  },
  {
    id: 73,
    name: "Uprailli Khad Forest",
    district: "Palamu",
    type: "hidden",
    category: "forests",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A dense forest area known for its biodiversity and natural beauty, perfect for nature walks and wildlife observation.",
    whyFamous: "Known for its rich biodiversity and being a perfect spot for nature enthusiasts to explore forest trails and wildlife.",
    keyFeatures: ["Dense forest", "Rich biodiversity", "Nature trails", "Wildlife observation", "Peaceful environment"],
    entryFee: "Free",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 24.0000, lng: 84.5500 },
    reviews: [
      {
        author: "Nature Explorer",
        rating: 4,
        comment: "Beautiful dense forest with great biodiversity. Perfect for nature walks and peaceful retreats.",
        date: "2024-06-12"
      }
    ]
  },
  {
    id: 74,
    name: "Gauridah Small Waterfall",
    district: "Palamu",
    type: "hidden",
    category: "waterfalls",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A charming small waterfall perfect for intimate nature experiences and peaceful meditation in natural surroundings.",
    whyFamous: "Known for its intimate size and peaceful atmosphere, perfect for quiet contemplation and small group visits.",
    keyFeatures: ["Small waterfall", "Intimate setting", "Peaceful atmosphere", "Natural beauty", "Meditation spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.0500, lng: 84.6000 },
    reviews: [
      {
        author: "Peace Seeker",
        rating: 4,
        comment: "Lovely small waterfall perfect for peaceful moments. Beautiful intimate setting in nature.",
        date: "2024-05-30"
      }
    ]
  },
  {
    id: 75,
    name: "Mountain of Qamar",
    district: "Palamu",
    type: "hidden",
    category: "hills",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A mystical mountain with unique geological formations and panoramic views, known for its spiritual significance.",
    whyFamous: "Famous for its mystical atmosphere and unique geological features, believed to have spiritual significance by locals.",
    keyFeatures: ["Mystical mountain", "Unique geology", "Spiritual significance", "Panoramic views", "Cultural importance"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.1000, lng: 84.6500 },
    reviews: [
      {
        author: "Spiritual Seeker",
        rating: 4,
        comment: "Mystical mountain with incredible spiritual energy. Unique geological formations and beautiful views.",
        date: "2024-04-22"
      }
    ]
  },
  {
    id: 76,
    name: "Hadhadwa Tourist Place",
    district: "Palamu",
    type: "hidden",
    category: "tourist spots",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A local tourist destination known for its natural beauty and peaceful environment, perfect for family outings.",
    whyFamous: "Known for its local charm and being a perfect spot for family picnics and peaceful retreats in natural surroundings.",
    keyFeatures: ["Local tourist spot", "Natural beauty", "Family-friendly", "Peaceful environment", "Picnic destination"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 24.1500, lng: 84.7000 },
    reviews: [
      {
        author: "Family Explorer",
        rating: 4,
        comment: "Nice local tourist spot perfect for family outings. Peaceful environment and natural beauty.",
        date: "2024-03-18"
      }
    ]
  },
  {
    id: 77,
    name: "Baba Ramjanam Singh Gate",
    district: "Palamu",
    type: "hidden",
    category: "heritage",
    rating: 3.6,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historical gate with religious significance, representing the cultural heritage of the region.",
    whyFamous: "Known for its religious and historical significance, dedicated to Baba Ramjanam Singh, a revered local figure.",
    keyFeatures: ["Historical gate", "Religious significance", "Cultural heritage", "Local importance", "Architectural value"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.2000, lng: 84.7500 },
    reviews: [
      {
        author: "Heritage Enthusiast",
        rating: 4,
        comment: "Interesting historical gate with good cultural significance. Important local heritage site.",
        date: "2024-02-25"
      }
    ]
  },
  {
    id: 78,
    name: "Atardandi Aahar",
    district: "Palamu",
    type: "hidden",
    category: "heritage",
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An archaeological site with historical importance, showcasing ancient structures and cultural significance.",
    whyFamous: "Known for its archaeological value and ancient structures that provide insights into historical settlements.",
    keyFeatures: ["Archaeological site", "Ancient structures", "Historical importance", "Cultural value", "Research interest"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 24.2500, lng: 84.8000 },
    reviews: [
      {
        author: "Archaeology Student",
        rating: 3,
        comment: "Interesting archaeological site with ancient remains. Good for understanding historical settlements.",
        date: "2024-01-20"
      }
    ]
  },
  {
    id: 79,
    name: "Babhnikhar Reservoir",
    district: "Palamu",
    type: "hidden",
    category: "dams",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic reservoir perfect for water activities and peaceful retreats, surrounded by natural beauty.",
    whyFamous: "Known for its peaceful environment and scenic beauty, popular among locals for fishing and picnics.",
    keyFeatures: ["Scenic reservoir", "Water activities", "Fishing spot", "Peaceful environment", "Natural surroundings"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 24.3000, lng: 84.8500 },
    reviews: [
      {
        author: "Fishing Enthusiast",
        rating: 4,
        comment: "Great reservoir for fishing and peaceful moments. Beautiful natural setting and clean waters.",
        date: "2024-04-10"
      }
    ]
  },
  {
    id: 80,
    name: "Kacharwa Dam",
    district: "Palamu",
    type: "hidden",
    category: "dams",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A well-constructed dam creating a beautiful water body, perfect for recreational activities and scenic views.",
    whyFamous: "Known for its engineering excellence and scenic beauty, popular for boating and water sports activities.",
    keyFeatures: ["Well-built dam", "Water sports", "Boating facility", "Scenic views", "Engineering marvel"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 24.3500, lng: 84.9000 },
    reviews: [
      {
        author: "Water Sports Lover",
        rating: 4,
        comment: "Excellent dam with great facilities for water activities. Beautiful scenic location.",
        date: "2024-05-15"
      }
    ]
  },
  {
    id: 81,
    name: "Mini Waterfall Manika",
    district: "Palamu",
    type: "hidden",
    category: "waterfalls",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A charming mini waterfall perfect for intimate nature experiences and photography, surrounded by lush greenery.",
    whyFamous: "Known for its small size and beautiful natural setting, perfect for photography and peaceful moments in nature.",
    keyFeatures: ["Mini waterfall", "Photography spot", "Lush surroundings", "Intimate setting", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.4000, lng: 84.9500 },
    reviews: [
      {
        author: "Photography Lover",
        rating: 4,
        comment: "Beautiful mini waterfall perfect for photography. Lovely natural surroundings and peaceful atmosphere.",
        date: "2024-06-08"
      }
    ]
  },
  {
    id: 82,
    name: "Rameshwar Dam",
    district: "Palamu",
    type: "hidden",
    category: "dams",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam with religious significance, named after Lord Rama, offering peaceful surroundings and water activities.",
    whyFamous: "Famous for its religious significance and scenic beauty, popular among pilgrims and nature lovers alike.",
    keyFeatures: ["Religious significance", "Scenic dam", "Water activities", "Peaceful surroundings", "Spiritual atmosphere"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.4500, lng: 85.0000 },
    reviews: [
      {
        author: "Spiritual Visitor",
        rating: 4,
        comment: "Beautiful dam with great spiritual significance. Peaceful environment perfect for meditation and prayer.",
        date: "2024-07-22"
      }
    ]
  },
  {
    id: 83,
    name: "Udaigarh Haveli",
    district: "Palamu",
    type: "hidden",
    category: "heritage",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic haveli showcasing traditional architecture and royal heritage, representing the grandeur of bygone era.",
    whyFamous: "Famous for its traditional haveli architecture and representing the royal heritage of the Palamu region.",
    keyFeatures: ["Traditional haveli", "Royal architecture", "Historical heritage", "Cultural significance", "Architectural beauty"],
    entryFee: "₹20 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 24.5000, lng: 85.0500 },
    reviews: [
      {
        author: "Architecture Enthusiast",
        rating: 4,
        comment: "Beautiful traditional haveli with excellent architecture. Great example of royal heritage preservation.",
        date: "2024-04-28"
      }
    ]
  },

  // RAMGARH DISTRICT
  {
    id: 84,
    name: "Rajrappa Mandir",
    district: "Ramgarh",
    type: "famous",
    category: "temples",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A famous temple dedicated to Goddess Chinnamasta, situated at the confluence of rivers Damodar and Bhairavi, known for its spiritual significance.",
    whyFamous: "Famous as one of the 51 Shakti Peethas and for its unique location at the confluence of two rivers, attracting thousands of devotees.",
    keyFeatures: ["Shakti Peetha temple", "River confluence", "Spiritual significance", "Religious festivals", "Ancient architecture"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.6300, lng: 85.5200 },
    reviews: [
      {
        author: "Devotee Pilgrim",
        rating: 5,
        comment: "Incredibly powerful Shakti Peetha with amazing spiritual energy. Divine experience at river confluence.",
        date: "2024-08-20"
      }
    ]
  },
  {
    id: 85,
    name: "Patratu Dam",
    district: "Ramgarh",
    type: "famous",
    category: "dams",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A major hydroelectric dam on river Damodar, creating a large reservoir surrounded by hills, popular for water sports and tourism.",
    whyFamous: "Famous for being one of the major dams in Jharkhand and for its scenic beauty surrounded by hills, popular for boating and water sports.",
    keyFeatures: ["Hydroelectric dam", "Large reservoir", "Water sports", "Scenic hills", "Boating facility"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.6700, lng: 85.4800 },
    reviews: [
      {
        author: "Water Adventure",
        rating: 4,
        comment: "Beautiful dam with excellent water sports facilities. Great scenic location surrounded by hills.",
        date: "2024-07-18"
      }
    ]
  },
  {
    id: 86,
    name: "Tuti Jharna",
    district: "Ramgarh",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful hidden waterfall known for its pristine natural beauty and peaceful surroundings, perfect for nature lovers.",
    whyFamous: "Known as a hidden gem with spectacular natural beauty, perfect for peaceful retreats and photography enthusiasts.",
    keyFeatures: ["Hidden waterfall", "Pristine nature", "Photography spot", "Peaceful surroundings", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7000, lng: 85.5000 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 4,
        comment: "Stunning hidden waterfall with pristine beauty. Perfect spot for nature photography and peaceful moments.",
        date: "2024-08-12"
      }
    ]
  },
  {
    id: 87,
    name: "Patratu Valley",
    district: "Ramgarh",
    type: "famous",
    category: "valleys",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic valley offering breathtaking panoramic views, popular for its natural beauty and adventure activities.",
    whyFamous: "Famous for its spectacular valley views and being one of the most scenic destinations in Ramgarh, popular among adventure enthusiasts.",
    keyFeatures: ["Scenic valley", "Panoramic views", "Adventure activities", "Natural beauty", "Photography paradise"],
    entryFee: "₹15 per person",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7200, lng: 85.4600 },
    reviews: [
      {
        author: "Adventure Seeker",
        rating: 5,
        comment: "Absolutely breathtaking valley with incredible panoramic views. Perfect for adventure and photography.",
        date: "2024-07-25"
      }
    ]
  },
  {
    id: 88,
    name: "Chutupalu Valley",
    district: "Ramgarh",
    type: "hidden",
    category: "valleys",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A lesser-known valley with unique rock formations and natural beauty, perfect for trekking and exploration.",
    whyFamous: "Known for its unique geological formations and being a perfect destination for trekkers and geology enthusiasts.",
    keyFeatures: ["Unique rock formations", "Trekking destination", "Geological interest", "Natural beauty", "Hidden gem"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.7400, lng: 85.4400 },
    reviews: [
      {
        author: "Geology Enthusiast",
        rating: 4,
        comment: "Fascinating valley with unique rock formations. Great for trekking and understanding geological structures.",
        date: "2024-06-15"
      }
    ]
  },
  {
    id: 89,
    name: "Mayatungri Temple",
    district: "Ramgarh",
    type: "hidden",
    category: "temples",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple with spiritual significance and beautiful traditional architecture, known for its peaceful atmosphere.",
    whyFamous: "Known for its ancient architecture and spiritual significance, popular among devotees seeking peaceful worship experience.",
    keyFeatures: ["Ancient temple", "Traditional architecture", "Spiritual significance", "Peaceful atmosphere", "Religious festivals"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.7600, lng: 85.4200 },
    reviews: [
      {
        author: "Temple Visitor",
        rating: 4,
        comment: "Beautiful ancient temple with peaceful surroundings. Great place for spiritual contemplation and prayer.",
        date: "2024-05-20"
      }
    ]
  },
  {
    id: 90,
    name: "Nalkari Dam",
    district: "Ramgarh",
    type: "hidden",
    category: "dams",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a peaceful water body, perfect for fishing and peaceful retreats in natural surroundings.",
    whyFamous: "Known for its serene environment and being a popular spot for fishing enthusiasts and nature lovers seeking tranquility.",
    keyFeatures: ["Peaceful dam", "Fishing spot", "Natural surroundings", "Quiet environment", "Water activities"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.7800, lng: 85.4000 },
    reviews: [
      {
        author: "Fishing Lover",
        rating: 4,
        comment: "Perfect spot for peaceful fishing and relaxation. Beautiful calm waters in serene natural setting.",
        date: "2024-06-08"
      }
    ]
  },
  {
    id: 91,
    name: "Dhordhoria Waterfall",
    district: "Ramgarh",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A hidden waterfall with natural beauty and peaceful surroundings, perfect for nature photography and meditation.",
    whyFamous: "Known as a hidden gem with pristine natural beauty, perfect for photography enthusiasts and those seeking solitude in nature.",
    keyFeatures: ["Hidden waterfall", "Natural beauty", "Photography spot", "Peaceful environment", "Meditation spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.8000, lng: 85.3800 },
    reviews: [
      {
        author: "Nature Seeker",
        rating: 4,
        comment: "Beautiful hidden waterfall perfect for peaceful meditation. Great natural beauty and tranquil atmosphere.",
        date: "2024-07-30"
      }
    ]
  },
  {
    id: 92,
    name: "Masmohna View Point",
    district: "Ramgarh",
    type: "hidden",
    category: "viewpoints",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A spectacular viewpoint offering panoramic views of the surrounding landscape, perfect for sunrise and sunset photography.",
    whyFamous: "Famous for its breathtaking panoramic views and being one of the best sunrise and sunset viewing spots in Ramgarh district.",
    keyFeatures: ["Panoramic views", "Sunrise/sunset point", "Photography paradise", "Scenic beauty", "Natural viewpoint"],
    entryFee: "Free",
    timing: "5:00 AM - 7:30 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.8200, lng: 85.3600 },
    reviews: [
      {
        author: "Photography Expert",
        rating: 5,
        comment: "Incredible viewpoint with spectacular sunrise and sunset views. Perfect for photography enthusiasts.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 93,
    name: "Lilmari Waterfalls",
    district: "Ramgarh",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A series of beautiful waterfalls cascading through rocky terrain, offering adventure and natural beauty to visitors.",
    whyFamous: "Known for its series of cascading waterfalls and rocky terrain, popular among adventure seekers and nature enthusiasts.",
    keyFeatures: ["Cascading waterfalls", "Rocky terrain", "Adventure destination", "Natural beauty", "Trekking spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.8400, lng: 85.3400 },
    reviews: [
      {
        author: "Adventure Lover",
        rating: 4,
        comment: "Beautiful series of waterfalls with exciting rocky terrain. Great for adventure and trekking activities.",
        date: "2024-07-12"
      }
    ]
  },
  {
    id: 94,
    name: "Gauridah Small Waterfall",
    district: "Ramgarh",
    type: "hidden",
    category: "waterfalls",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A charming small waterfall perfect for intimate nature experiences and peaceful moments in serene surroundings.",
    whyFamous: "Known for its intimate size and peaceful atmosphere, perfect for quiet contemplation and small group nature experiences.",
    keyFeatures: ["Small waterfall", "Intimate setting", "Peaceful atmosphere", "Natural serenity", "Quiet environment"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.8600, lng: 85.3200 },
    reviews: [
      {
        author: "Peace Lover",
        rating: 4,
        comment: "Perfect small waterfall for peaceful moments. Beautiful intimate setting in nature's embrace.",
        date: "2024-06-22"
      }
    ]
  },
  {
    id: 95,
    name: "Sikidiri Ghati",
    district: "Ramgarh",
    type: "hidden",
    category: "valleys",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic mountain pass with breathtaking views and natural beauty, perfect for trekking and adventure activities.",
    whyFamous: "Known for its scenic mountain pass views and being a popular trekking destination with stunning natural landscapes.",
    keyFeatures: ["Mountain pass", "Scenic views", "Trekking destination", "Natural beauty", "Adventure spot"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.8800, lng: 85.3000 },
    reviews: [
      {
        author: "Mountain Trekker",
        rating: 4,
        comment: "Beautiful mountain pass with incredible views. Great trekking experience through scenic natural landscapes.",
        date: "2024-05-28"
      }
    ]
  },
  {
    id: 96,
    name: "Ladhra Waterfall",
    district: "Ramgarh",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A hidden waterfall with pristine natural beauty and peaceful surroundings, perfect for nature enthusiasts.",
    whyFamous: "Known for its hidden location and natural beauty, popular among local nature enthusiasts and photography lovers.",
    keyFeatures: ["Hidden waterfall", "Pristine nature", "Peaceful surroundings", "Photography spot", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.9000, lng: 85.2800 },
    reviews: [
      {
        author: "Local Explorer",
        rating: 4,
        comment: "Beautiful hidden waterfall with pristine natural beauty. Great spot for photography and peaceful nature experience.",
        date: "2024-04-18"
      }
    ]
  },
  {
    id: 97,
    name: "China Cemetery",
    district: "Ramgarh",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historical cemetery with unique cultural significance and architectural elements, representing diverse heritage.",
    whyFamous: "Known for its unique cultural significance and representing the diverse heritage of different communities in the region.",
    keyFeatures: ["Historical cemetery", "Cultural significance", "Diverse heritage", "Unique architecture", "Historical importance"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 23.9200, lng: 85.2600 },
    reviews: [
      {
        author: "Heritage Researcher",
        rating: 4,
        comment: "Interesting historical cemetery with unique cultural elements. Important for understanding diverse heritage.",
        date: "2024-03-25"
      }
    ]
  },
  {
    id: 98,
    name: "Mahatma Gandhi Samadhi Sthal",
    district: "Ramgarh",
    type: "famous",
    category: "heritage",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A memorial dedicated to Mahatma Gandhi, representing the Father of Nation's connection with the region and freedom struggle.",
    whyFamous: "Famous for its connection to Mahatma Gandhi and representing his influence in the independence movement in Jharkhand region.",
    keyFeatures: ["Gandhi memorial", "Freedom struggle history", "National importance", "Peaceful atmosphere", "Educational value"],
    entryFee: "Free",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.9400, lng: 85.2400 },
    reviews: [
      {
        author: "History Student",
        rating: 4,
        comment: "Important memorial with great historical significance. Perfect for understanding Gandhi's connection to the region.",
        date: "2024-08-15"
      }
    ]
  },

  // RANCHI DISTRICT (Same as Ramgarh)
  {
    id: 99,
    name: "Rajrappa Mandir",
    district: "Ranchi",
    type: "famous",
    category: "temples",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A famous temple dedicated to Goddess Chinnamasta, situated at the confluence of rivers Damodar and Bhairavi, known for its spiritual significance.",
    whyFamous: "Famous as one of the 51 Shakti Peethas and for its unique location at the confluence of two rivers, attracting thousands of devotees.",
    keyFeatures: ["Shakti Peetha temple", "River confluence", "Spiritual significance", "Religious festivals", "Ancient architecture"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.6300, lng: 85.5200 },
    reviews: [
      {
        author: "Devotee Pilgrim",
        rating: 5,
        comment: "Incredibly powerful Shakti Peetha with amazing spiritual energy. Divine experience at river confluence.",
        date: "2024-08-20"
      }
    ]
  },
  {
    id: 100,
    name: "Patratu Dam",
    district: "Ranchi",
    type: "famous",
    category: "dams",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A major hydroelectric dam on river Damodar, creating a large reservoir surrounded by hills, popular for water sports and tourism.",
    whyFamous: "Famous for being one of the major dams in Jharkhand and for its scenic beauty surrounded by hills, popular for boating and water sports.",
    keyFeatures: ["Hydroelectric dam", "Large reservoir", "Water sports", "Scenic hills", "Boating facility"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.6700, lng: 85.4800 },
    reviews: [
      {
        author: "Water Adventure",
        rating: 4,
        comment: "Beautiful dam with excellent water sports facilities. Great scenic location surrounded by hills.",
        date: "2024-07-18"
      }
    ]
  },
  {
    id: 101,
    name: "Tuti Jharna",
    district: "Ranchi",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful hidden waterfall known for its pristine natural beauty and peaceful surroundings, perfect for nature lovers.",
    whyFamous: "Known as a hidden gem with spectacular natural beauty, perfect for peaceful retreats and photography enthusiasts.",
    keyFeatures: ["Hidden waterfall", "Pristine nature", "Photography spot", "Peaceful surroundings", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7000, lng: 85.5000 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 4,
        comment: "Stunning hidden waterfall with pristine beauty. Perfect spot for nature photography and peaceful moments.",
        date: "2024-08-12"
      }
    ]
  },
  {
    id: 102,
    name: "Patratu Valley",
    district: "Ranchi",
    type: "famous",
    category: "valleys",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic valley offering breathtaking panoramic views, popular for its natural beauty and adventure activities.",
    whyFamous: "Famous for its spectacular valley views and being one of the most scenic destinations in Ranchi, popular among adventure enthusiasts.",
    keyFeatures: ["Scenic valley", "Panoramic views", "Adventure activities", "Natural beauty", "Photography paradise"],
    entryFee: "₹15 per person",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7200, lng: 85.4600 },
    reviews: [
      {
        author: "Adventure Seeker",
        rating: 5,
        comment: "Absolutely breathtaking valley with incredible panoramic views. Perfect for adventure and photography.",
        date: "2024-07-25"
      }
    ]
  },
  {
    id: 171,
    name: "Chutupalu Valley",
    district: "Ranchi",
    type: "famous",
    category: "valleys",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful valley known for its scenic beauty and peaceful environment, perfect for nature walks and photography.",
    whyFamous: "Known for its pristine natural beauty and being an excellent destination for nature enthusiasts and photographers.",
    keyFeatures: ["Scenic valley", "Nature walks", "Photography spot", "Peaceful environment", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7300, lng: 85.4700 },
    reviews: [
      {
        author: "Nature Walker",
        rating: 4,
        comment: "Beautiful valley perfect for peaceful nature walks. Great scenic beauty and photography opportunities.",
        date: "2024-08-18"
      }
    ]
  },
  {
    id: 172,
    name: "Mayatungri Temple",
    district: "Ranchi",
    type: "famous",
    category: "temples",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple with spiritual significance, known for its peaceful atmosphere and religious importance in the region.",
    whyFamous: "Famous for its ancient spiritual significance and being an important pilgrimage site for local devotees.",
    keyFeatures: ["Ancient temple", "Spiritual significance", "Pilgrimage site", "Peaceful atmosphere", "Religious importance"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.7400, lng: 85.4800 },
    reviews: [
      {
        author: "Spiritual Visitor",
        rating: 4,
        comment: "Peaceful ancient temple with great spiritual energy. Important local pilgrimage site.",
        date: "2024-07-12"
      }
    ]
  },
  {
    id: 173,
    name: "Nalkari Dam",
    district: "Ranchi",
    type: "hidden",
    category: "dams",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a peaceful reservoir, perfect for fishing and quiet retreats away from city crowds.",
    whyFamous: "Known for its tranquil environment and being an excellent spot for fishing enthusiasts and nature lovers.",
    keyFeatures: ["Scenic dam", "Peaceful reservoir", "Fishing spot", "Quiet retreat", "Natural environment"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.7500, lng: 85.4900 },
    reviews: [
      {
        author: "Fishing Enthusiast",
        rating: 4,
        comment: "Great peaceful dam for fishing and relaxation. Beautiful natural setting with clean waters.",
        date: "2024-06-25"
      }
    ]
  },
  {
    id: 174,
    name: "Dhordhoria Waterfall",
    district: "Ranchi",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A hidden waterfall surrounded by dense forest, offering pristine natural beauty and peaceful surroundings.",
    whyFamous: "Known for its hidden location and pristine natural beauty, perfect for adventure seekers and nature photographers.",
    keyFeatures: ["Hidden waterfall", "Dense forest", "Pristine beauty", "Adventure destination", "Photography spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7600, lng: 85.5100 },
    reviews: [
      {
        author: "Adventure Seeker",
        rating: 4,
        comment: "Beautiful hidden waterfall with pristine forest surroundings. Perfect for adventure and nature photography.",
        date: "2024-08-22"
      }
    ]
  },
  {
    id: 175,
    name: "Masmohna View Point",
    district: "Ranchi",
    type: "hidden",
    category: "viewpoints",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A spectacular viewpoint offering panoramic views of the surrounding landscape, perfect for sunrise and sunset watching.",
    whyFamous: "Famous for offering some of the best panoramic views in Ranchi district, ideal for photography and peaceful contemplation.",
    keyFeatures: ["Panoramic viewpoint", "Sunrise/sunset views", "Photography spot", "Peaceful setting", "Landscape views"],
    entryFee: "Free",
    timing: "5:00 AM - 7:30 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7700, lng: 85.5200 },
    reviews: [
      {
        author: "Photography Enthusiast",
        rating: 5,
        comment: "Absolutely stunning viewpoint with incredible panoramic views. Perfect for sunrise/sunset photography.",
        date: "2024-07-30"
      }
    ]
  },
  {
    id: 176,
    name: "Lilmari Waterfalls",
    district: "Ranchi",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A series of cascading waterfalls creating natural pools, perfect for swimming and relaxation in natural surroundings.",
    whyFamous: "Known for its multiple cascading falls and natural swimming pools, offering refreshing natural experiences.",
    keyFeatures: ["Cascading waterfalls", "Natural pools", "Swimming spot", "Natural beauty", "Refreshing waters"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7800, lng: 85.5300 },
    reviews: [
      {
        author: "Swimming Enthusiast",
        rating: 4,
        comment: "Great waterfalls with natural swimming pools. Perfect for refreshing swims and relaxation.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 177,
    name: "Gauridah Small Waterfall",
    district: "Ranchi",
    type: "hidden",
    category: "waterfalls",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A charming small waterfall perfect for intimate nature experiences and peaceful meditation in natural surroundings.",
    whyFamous: "Known for its intimate size and peaceful atmosphere, perfect for quiet contemplation and small group visits.",
    keyFeatures: ["Small waterfall", "Intimate setting", "Peaceful atmosphere", "Natural beauty", "Meditation spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7900, lng: 85.5400 },
    reviews: [
      {
        author: "Peace Seeker",
        rating: 4,
        comment: "Lovely small waterfall perfect for peaceful moments. Beautiful intimate setting in nature.",
        date: "2024-07-08"
      }
    ]
  },
  {
    id: 178,
    name: "Sikidiri Ghati",
    district: "Ranchi",
    type: "hidden",
    category: "valleys",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic valley pass offering beautiful mountain views and excellent trekking opportunities for adventure enthusiasts.",
    whyFamous: "Known for its scenic mountain pass and being an excellent trekking destination with beautiful valley views.",
    keyFeatures: ["Mountain pass", "Scenic valley", "Trekking destination", "Adventure activities", "Natural beauty"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.8000, lng: 85.5500 },
    reviews: [
      {
        author: "Trekking Enthusiast",
        rating: 4,
        comment: "Great valley pass with excellent trekking opportunities. Beautiful mountain views and adventure activities.",
        date: "2024-06-18"
      }
    ]
  },
  {
    id: 179,
    name: "Ladhra Waterfall",
    district: "Ranchi",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A spectacular waterfall cascading from great heights, offering breathtaking views and adventure opportunities.",
    whyFamous: "Famous for its spectacular cascade and being one of the most impressive waterfalls in Ranchi district for adventure seekers.",
    keyFeatures: ["Spectacular cascade", "Great heights", "Breathtaking views", "Adventure opportunities", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.8100, lng: 85.5600 },
    reviews: [
      {
        author: "Waterfall Explorer",
        rating: 4,
        comment: "Impressive waterfall with spectacular cascade. Great for adventure activities and nature photography.",
        date: "2024-08-28"
      }
    ]
  },
  {
    id: 180,
    name: "China Cemetery",
    district: "Ranchi",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historical cemetery with unique cultural significance, representing the multicultural heritage of Ranchi.",
    whyFamous: "Known for its unique cultural and historical significance, representing the diverse heritage of the region.",
    keyFeatures: ["Historical cemetery", "Cultural significance", "Heritage value", "Multicultural history", "Archaeological interest"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 23.8200, lng: 85.5700 },
    reviews: [
      {
        author: "Heritage Researcher",
        rating: 4,
        comment: "Interesting historical site with unique cultural significance. Important for understanding regional heritage.",
        date: "2024-05-15"
      }
    ]
  },
  {
    id: 181,
    name: "Mahatma Gandhi Samadhi Sthal",
    district: "Ranchi",
    type: "famous",
    category: "heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A memorial dedicated to Mahatma Gandhi, representing his connection to Jharkhand and the freedom struggle.",
    whyFamous: "Famous for commemorating Gandhi's connection to the region and his role in India's independence movement.",
    keyFeatures: ["Gandhi memorial", "Freedom struggle history", "National importance", "Educational value", "Peaceful environment"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.8300, lng: 85.5800 },
    reviews: [
      {
        author: "History Student",
        rating: 4,
        comment: "Important memorial with great historical significance. Perfect for understanding Gandhi's connection to the region.",
        date: "2024-08-15"
      }
    ]
  },

  // BOKARO DISTRICT
  {
    id: 103,
    name: "Jawaharlal Nehru Biological Park",
    district: "Bokaro",
    type: "famous",
    category: "parks",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A well-maintained biological park with diverse flora and fauna, perfect for family outings and nature education.",
    whyFamous: "Famous for being one of the major biological parks in Jharkhand with diverse wildlife and excellent facilities for education and recreation.",
    keyFeatures: ["Biological diversity", "Educational facility", "Family-friendly", "Wildlife viewing", "Nature trails"],
    entryFee: "₹20 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.6700, lng: 86.1500 },
    reviews: [
      {
        author: "Family Visitor",
        rating: 4,
        comment: "Great biological park with diverse wildlife. Perfect for family education and recreation.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 104,
    name: "Bokaro Steel City",
    district: "Bokaro",
    type: "famous",
    category: "industrial heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "One of India's major steel cities, showcasing industrial heritage and modern urban planning with steel plant tours.",
    whyFamous: "Famous for being one of India's largest steel plants and representing the industrial development of modern Jharkhand.",
    keyFeatures: ["Industrial heritage", "Steel plant tours", "Modern city planning", "Educational tours", "Industrial significance"],
    entryFee: "Tour charges apply",
    timing: "9:00 AM - 5:00 PM (Tours by appointment)",
    bestTime: "October to March",
    coordinates: { lat: 23.6693, lng: 86.1511 },
    reviews: [
      {
        author: "Industrial Enthusiast",
        rating: 4,
        comment: "Impressive steel city with great industrial heritage. Informative tours and modern infrastructure.",
        date: "2024-06-20"
      }
    ]
  },
  {
    id: 105,
    name: "City Park and Lake",
    district: "Bokaro",
    type: "famous",
    category: "parks",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful urban park with an artificial lake, offering recreational facilities and peaceful environment in the heart of the city.",
    whyFamous: "Famous for being a major recreational hub in Bokaro city with beautiful lake and well-maintained park facilities.",
    keyFeatures: ["Urban park", "Artificial lake", "Recreational facilities", "Peaceful environment", "City landmark"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.6750, lng: 86.1600 },
    reviews: [
      {
        author: "City Explorer",
        rating: 4,
        comment: "Beautiful city park with lovely lake. Perfect for evening walks and family recreation.",
        date: "2024-08-08"
      }
    ]
  },
  {
    id: 106,
    name: "Jagannath Temple",
    district: "Bokaro",
    type: "famous",
    category: "temples",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful temple dedicated to Lord Jagannath, known for its traditional architecture and religious significance.",
    whyFamous: "Famous for its beautiful architecture and being an important pilgrimage site for devotees of Lord Jagannath in the region.",
    keyFeatures: ["Traditional temple", "Religious significance", "Beautiful architecture", "Pilgrimage site", "Spiritual atmosphere"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.6800, lng: 86.1650 },
    reviews: [
      {
        author: "Temple Devotee",
        rating: 4,
        comment: "Beautiful Jagannath temple with peaceful atmosphere. Great place for spiritual contemplation.",
        date: "2024-07-28"
      }
    ]
  },
  {
    id: 142,
    name: "Ayyappa Temple",
    district: "Bokaro",
    type: "famous",
    category: "temples",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful temple dedicated to Lord Ayyappa, known for its South Indian architectural style and spiritual significance.",
    whyFamous: "Famous for bringing South Indian temple architecture to Jharkhand and being an important pilgrimage site for Ayyappa devotees.",
    keyFeatures: ["South Indian architecture", "Ayyappa worship", "Pilgrimage site", "Spiritual significance", "Cultural diversity"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.6850, lng: 86.1700 },
    reviews: [
      {
        author: "Ayyappa Devotee",
        rating: 4,
        comment: "Beautiful South Indian style temple. Peaceful atmosphere and well-maintained premises.",
        date: "2024-08-12"
      }
    ]
  },
  {
    id: 143,
    name: "Garga Dam",
    district: "Bokaro",
    type: "famous",
    category: "dams",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a beautiful reservoir, perfect for water activities and peaceful picnics surrounded by natural beauty.",
    whyFamous: "Known for its scenic beauty and recreational facilities, popular among locals for picnics and water-based activities.",
    keyFeatures: ["Scenic reservoir", "Water activities", "Picnic spot", "Natural beauty", "Recreational facility"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.6900, lng: 86.1800 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Beautiful dam with great natural surroundings. Perfect for family picnics and water activities.",
        date: "2024-07-20"
      }
    ]
  },
  {
    id: 144,
    name: "Parasnath Hills",
    district: "Bokaro",
    type: "famous",
    category: "hills",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Part of the famous Parasnath range, offering excellent trekking opportunities and panoramic views of the surrounding landscape.",
    whyFamous: "Famous for being part of Jharkhand's highest mountain range and offering spectacular trekking and hiking opportunities.",
    keyFeatures: ["Mountain range", "Trekking trails", "Panoramic views", "Hiking opportunities", "Natural beauty"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7000, lng: 86.2000 },
    reviews: [
      {
        author: "Trekking Enthusiast",
        rating: 5,
        comment: "Amazing trekking experience with breathtaking views. Perfect for adventure enthusiasts and nature lovers.",
        date: "2024-06-15"
      }
    ]
  },
  {
    id: 145,
    name: "Shikharji Dham",
    district: "Bokaro",
    type: "famous",
    category: "temples",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A sacred Jain pilgrimage site located on Parasnath Hills, known for its spiritual significance and beautiful temples.",
    whyFamous: "Famous as one of the most sacred Jain pilgrimage sites where multiple Jain Tirthankaras attained moksha.",
    keyFeatures: ["Jain pilgrimage site", "Sacred temples", "Spiritual significance", "Mountain location", "Religious importance"],
    entryFee: "Free",
    timing: "4:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7050, lng: 86.2050 },
    reviews: [
      {
        author: "Jain Pilgrim",
        rating: 5,
        comment: "Extremely sacred and peaceful place. Incredible spiritual energy and beautiful temple architecture.",
        date: "2024-08-18"
      }
    ]
  },
  {
    id: 146,
    name: "Tenughar Dam",
    district: "Bokaro",
    type: "hidden",
    category: "dams",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A peaceful dam surrounded by hills, perfect for fishing and quiet retreats away from city crowds.",
    whyFamous: "Known for its tranquil environment and being an excellent fishing spot popular among angling enthusiasts.",
    keyFeatures: ["Peaceful dam", "Fishing spot", "Hill surroundings", "Quiet retreat", "Natural environment"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.7100, lng: 86.2100 },
    reviews: [
      {
        author: "Fishing Expert",
        rating: 4,
        comment: "Excellent fishing spot with beautiful peaceful surroundings. Perfect for quiet nature retreats.",
        date: "2024-05-25"
      }
    ]
  },
  {
    id: 147,
    name: "Luguburu",
    district: "Bokaro",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A traditional village known for its cultural heritage and rural charm, offering insights into local tribal life.",
    whyFamous: "Known for preserving traditional tribal culture and offering authentic rural experience to visitors.",
    keyFeatures: ["Traditional village", "Tribal culture", "Rural heritage", "Cultural experience", "Local traditions"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 23.7150, lng: 86.2150 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 4,
        comment: "Authentic village experience with rich tribal culture. Great for understanding local traditions.",
        date: "2024-04-10"
      }
    ]
  },
  {
    id: 148,
    name: "Dalahi Kund",
    district: "Bokaro",
    type: "hidden",
    category: "natural pools",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1571104508999-893933ded431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A natural water pool formed by springs, known for its crystal clear waters and peaceful natural surroundings.",
    whyFamous: "Famous for its natural spring water pool and being a hidden gem perfect for swimming and relaxation.",
    keyFeatures: ["Natural water pool", "Spring water", "Crystal clear water", "Swimming spot", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "March to June",
    coordinates: { lat: 23.7200, lng: 86.2200 },
    reviews: [
      {
        author: "Swimming Enthusiast",
        rating: 4,
        comment: "Beautiful natural pool with crystal clear spring water. Perfect for swimming and relaxation.",
        date: "2024-05-15"
      }
    ]
  },
  {
    id: 149,
    name: "Sita Falls",
    district: "Bokaro",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall with mythological significance, believed to be associated with Goddess Sita from Ramayana.",
    whyFamous: "Famous for its mythological connection to Ramayana and its pristine natural beauty surrounded by forests.",
    keyFeatures: ["Mythological significance", "Pristine waterfall", "Forest surroundings", "Religious connection", "Natural beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7250, lng: 86.2250 },
    reviews: [
      {
        author: "Mythology Lover",
        rating: 4,
        comment: "Beautiful waterfall with interesting mythological connections. Pristine natural setting and peaceful atmosphere.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 150,
    name: "Ram Lakhan Tungi",
    district: "Bokaro",
    type: "hidden",
    category: "hills",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Twin peaks named after Ram and Lakhan from Ramayana, offering excellent trekking opportunities and panoramic views.",
    whyFamous: "Known for its mythological significance and being excellent twin peaks for trekking and adventure activities.",
    keyFeatures: ["Twin peaks", "Mythological significance", "Trekking destination", "Panoramic views", "Adventure spot"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.7300, lng: 86.2300 },
    reviews: [
      {
        author: "Adventure Trekker",
        rating: 4,
        comment: "Great twin peaks for trekking with mythological significance. Excellent views and adventure opportunities.",
        date: "2024-06-28"
      }
    ]
  },
  {
    id: 151,
    name: "Chechaka Dham",
    district: "Bokaro",
    type: "hidden",
    category: "temples",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A peaceful temple complex known for its spiritual atmosphere and traditional architecture.",
    whyFamous: "Known for its peaceful spiritual atmosphere and being a significant religious site for local devotees.",
    keyFeatures: ["Temple complex", "Spiritual atmosphere", "Traditional architecture", "Religious significance", "Peaceful environment"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.7350, lng: 86.2350 },
    reviews: [
      {
        author: "Spiritual Visitor",
        rating: 4,
        comment: "Peaceful temple with great spiritual energy. Beautiful traditional architecture and serene atmosphere.",
        date: "2024-07-12"
      }
    ]
  },
  {
    id: 152,
    name: "Konar Dam",
    district: "Bokaro",
    type: "famous",
    category: "dams",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A major dam creating a large reservoir, popular for water sports, boating, and scenic picnics.",
    whyFamous: "Famous for being one of the major dams in the region with excellent water sports facilities and scenic beauty.",
    keyFeatures: ["Major dam", "Large reservoir", "Water sports", "Boating facility", "Scenic picnic spot"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.7400, lng: 86.2400 },
    reviews: [
      {
        author: "Water Sports Enthusiast",
        rating: 4,
        comment: "Excellent dam with great water sports facilities. Beautiful scenic location perfect for recreation.",
        date: "2024-08-22"
      }
    ]
  },
  {
    id: 153,
    name: "Mrugi Khoh",
    district: "Bokaro",
    type: "hidden",
    category: "caves",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient cave system with natural formations and historical significance, perfect for exploration and adventure.",
    whyFamous: "Known for its ancient cave formations and being an excellent spot for cave exploration and adventure activities.",
    keyFeatures: ["Ancient caves", "Natural formations", "Cave exploration", "Adventure activity", "Historical significance"],
    entryFee: "₹10 per person",
    timing: "8:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 23.7450, lng: 86.2450 },
    reviews: [
      {
        author: "Cave Explorer",
        rating: 4,
        comment: "Fascinating cave system with interesting formations. Great for adventure and exploration activities.",
        date: "2024-05-30"
      }
    ]
  },
  {
    id: 154,
    name: "Sri Sri Kalika Maharani Temple",
    district: "Bokaro",
    type: "famous",
    category: "temples",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A powerful temple dedicated to Goddess Kalika, known for its spiritual energy and beautiful traditional architecture.",
    whyFamous: "Famous for its powerful spiritual energy and being an important Shakti temple attracting devotees from across the region.",
    keyFeatures: ["Goddess Kalika temple", "Spiritual energy", "Traditional architecture", "Shakti worship", "Religious festivals"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.7500, lng: 86.2500 },
    reviews: [
      {
        author: "Devotee Visitor",
        rating: 5,
        comment: "Incredibly powerful Kalika temple with amazing spiritual energy. Beautiful architecture and divine atmosphere.",
        date: "2024-08-28"
      }
    ]
  },
  {
    id: 155,
    name: "Mohan Kumar Mangalam Stadium",
    district: "Bokaro",
    type: "famous",
    category: "sports venues",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A modern sports stadium hosting various sporting events and activities, contributing to the city's sports culture.",
    whyFamous: "Known for hosting major sporting events and being an important sports facility in the Bokaro Steel City.",
    keyFeatures: ["Modern stadium", "Sports events", "Athletic facility", "Sports culture", "Community venue"],
    entryFee: "Event dependent",
    timing: "Event schedules vary",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.7550, lng: 86.2550 },
    reviews: [
      {
        author: "Sports Enthusiast",
        rating: 4,
        comment: "Great modern stadium with excellent facilities. Hosts many exciting sporting events throughout the year.",
        date: "2024-07-08"
      }
    ]
  },

  // DEOGHAR DISTRICT
  {
    id: 107,
    name: "Baba Baidyanath Temple",
    district: "Deoghar",
    type: "famous",
    category: "temples",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "One of the 12 Jyotirlingas in India, this ancient temple is dedicated to Lord Shiva and attracts millions of devotees annually.",
    whyFamous: "Famous as one of the 12 sacred Jyotirlingas of Lord Shiva, making it one of the most important pilgrimage sites in India.",
    keyFeatures: ["Jyotirlinga temple", "Ancient architecture", "Major pilgrimage site", "Spiritual significance", "Religious festivals"],
    entryFee: "Free",
    timing: "4:00 AM - 11:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.4845, lng: 86.7004 },
    reviews: [
      {
        author: "Spiritual Pilgrim",
        rating: 5,
        comment: "Divine experience at one of the most sacred Jyotirlingas. Incredible spiritual energy and ancient architecture.",
        date: "2024-08-25"
      }
    ]
  },
  {
    id: 108,
    name: "Naulakha Temple",
    district: "Deoghar",
    type: "famous",
    category: "temples",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful temple known for its intricate architecture and unique design, built at a cost of nine lakh rupees in ancient times.",
    whyFamous: "Famous for its name meaning 'nine lakhs' representing its construction cost and for its beautiful architectural craftsmanship.",
    keyFeatures: ["Unique architecture", "Historical significance", "Beautiful craftsmanship", "Religious importance", "Artistic value"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.4900, lng: 86.7050 },
    reviews: [
      {
        author: "Architecture Lover",
        rating: 4,
        comment: "Stunning temple with incredible architectural details. Beautiful craftsmanship and peaceful atmosphere.",
        date: "2024-07-18"
      }
    ]
  },
  {
    id: 109,
    name: "Nandan Pahar",
    district: "Deoghar",
    type: "famous",
    category: "hills",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic hill offering panoramic views and recreational facilities, perfect for family outings and adventure activities.",
    whyFamous: "Famous for its scenic beauty and recreational facilities including ropeway, making it a popular tourist destination in Deoghar.",
    keyFeatures: ["Scenic hill views", "Ropeway facility", "Adventure activities", "Family recreation", "Panoramic views"],
    entryFee: "₹30 per person",
    timing: "9:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.5000, lng: 86.7100 },
    reviews: [
      {
        author: "Family Tourist",
        rating: 4,
        comment: "Great hill station with excellent ropeway. Perfect for family outings and scenic views.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 163,
    name: "Trikut Hill",
    district: "Deoghar",
    type: "famous",
    category: "hills",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A three-peaked hill offering excellent cable car rides and panoramic views, perfect for adventure tourism and family outings.",
    whyFamous: "Famous for its unique three-peaked structure and excellent cable car facility, making it a major tourist attraction in Deoghar.",
    keyFeatures: ["Three-peaked hill", "Cable car facility", "Panoramic views", "Adventure tourism", "Family destination"],
    entryFee: "₹50 per person (Cable car extra)",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.5200, lng: 86.7200 },
    reviews: [
      {
        author: "Cable Car Enthusiast",
        rating: 5,
        comment: "Amazing cable car ride with spectacular views. Perfect three-peaked hill with excellent facilities.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 164,
    name: "Tapovan Caves and Hills",
    district: "Deoghar",
    type: "famous",
    category: "caves",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Ancient caves with spiritual significance and beautiful hill surroundings, perfect for meditation and spiritual exploration.",
    whyFamous: "Famous for its ancient caves used for meditation by sages and being an important spiritual destination with natural beauty.",
    keyFeatures: ["Ancient caves", "Spiritual significance", "Meditation spots", "Hill surroundings", "Religious importance"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.5300, lng: 86.7300 },
    reviews: [
      {
        author: "Spiritual Explorer",
        rating: 4,
        comment: "Peaceful ancient caves perfect for meditation. Beautiful hill location with great spiritual atmosphere.",
        date: "2024-07-25"
      }
    ]
  },
  {
    id: 165,
    name: "Satsang Ashram",
    district: "Deoghar",
    type: "famous",
    category: "spiritual centers",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A peaceful spiritual center offering meditation facilities and spiritual guidance, perfect for those seeking inner peace.",
    whyFamous: "Famous for its spiritual teachings and peaceful environment, attracting seekers from across the country for meditation and yoga.",
    keyFeatures: ["Spiritual center", "Meditation facility", "Yoga classes", "Peaceful environment", "Spiritual guidance"],
    entryFee: "Free (Donations welcome)",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.5400, lng: 86.7400 },
    reviews: [
      {
        author: "Meditation Seeker",
        rating: 4,
        comment: "Wonderful spiritual center with great meditation facilities. Peaceful environment and excellent guidance.",
        date: "2024-06-30"
      }
    ]
  },
  {
    id: 166,
    name: "Basukinath Temple",
    district: "Deoghar",
    type: "famous",
    category: "temples",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An important Shiva temple known for its spiritual significance and beautiful traditional architecture.",
    whyFamous: "Famous as an important pilgrimage site dedicated to Lord Shiva and for its connection to the Baidyanath temple complex.",
    keyFeatures: ["Shiva temple", "Pilgrimage site", "Traditional architecture", "Spiritual significance", "Religious festivals"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.5500, lng: 86.7500 },
    reviews: [
      {
        author: "Shiva Devotee",
        rating: 4,
        comment: "Beautiful Shiva temple with great spiritual energy. Important pilgrimage site with peaceful atmosphere.",
        date: "2024-08-20"
      }
    ]
  },

  // DHANBAD DISTRICT
  {
    id: 110,
    name: "Bhatinda Falls",
    district: "Dhanbad",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall surrounded by coal mining areas, offering a surprising natural oasis in an industrial region.",
    whyFamous: "Known for its unique location in a coal mining region and for providing a natural retreat amidst industrial surroundings.",
    keyFeatures: ["Industrial area waterfall", "Natural oasis", "Coal mining region", "Unique location", "Peaceful retreat"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.7967, lng: 86.4304 },
    reviews: [
      {
        author: "Nature Seeker",
        rating: 4,
        comment: "Surprising natural beauty in an industrial area. Beautiful waterfall providing peaceful escape.",
        date: "2024-07-22"
      }
    ]
  },
  {
    id: 111,
    name: "Maithon Dam",
    district: "Dhanbad",
    type: "famous",
    category: "dams",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A major hydroelectric dam on river Barakar, creating a large reservoir popular for water sports and scenic beauty.",
    whyFamous: "Famous for being one of the major dams in Jharkhand and for its scenic reservoir perfect for boating and water activities.",
    keyFeatures: ["Major hydroelectric dam", "Large reservoir", "Water sports", "Scenic beauty", "Engineering marvel"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.8333, lng: 86.8667 },
    reviews: [
      {
        author: "Water Sports Enthusiast",
        rating: 4,
        comment: "Excellent dam with great water sports facilities. Beautiful scenic location and well-maintained facilities.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 112,
    name: "Topchanchi Lake",
    district: "Dhanbad",
    type: "famous",
    category: "lakes",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic lake surrounded by hills, perfect for boating, fishing, and peaceful retreats with beautiful natural surroundings.",
    whyFamous: "Famous for its scenic beauty surrounded by hills and for being a popular destination for water activities and nature tourism.",
    keyFeatures: ["Scenic lake", "Hill surroundings", "Boating facility", "Fishing spot", "Natural beauty"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.9167, lng: 86.2333 },
    reviews: [
      {
        author: "Lake Explorer",
        rating: 4,
        comment: "Beautiful lake with great boating facilities. Perfect scenic location surrounded by hills.",
        date: "2024-06-18"
      }
    ]
  },
  {
    id: 167,
    name: "Birsa Munda Park",
    district: "Dhanbad",
    type: "famous",
    category: "parks",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A well-maintained urban park dedicated to tribal hero Birsa Munda, offering recreational facilities and green space in the city.",
    whyFamous: "Famous for being dedicated to the great tribal freedom fighter Birsa Munda and providing recreational facilities in industrial Dhanbad.",
    keyFeatures: ["Tribal hero memorial", "Urban green space", "Recreational facilities", "Family-friendly", "Cultural significance"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.8000, lng: 86.4500 },
    reviews: [
      {
        author: "Family Visitor",
        rating: 4,
        comment: "Nice urban park with good facilities. Great place to remember Birsa Munda and enjoy family time.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 168,
    name: "Kalyaneshwari Temple",
    district: "Dhanbad",
    type: "famous",
    category: "temples",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple dedicated to Goddess Kalyaneshwari, known for its spiritual significance and beautiful traditional architecture.",
    whyFamous: "Famous for its powerful goddess worship and being an important pilgrimage site in Dhanbad region with ancient significance.",
    keyFeatures: ["Goddess temple", "Ancient architecture", "Spiritual significance", "Pilgrimage site", "Religious festivals"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.8100, lng: 86.4600 },
    reviews: [
      {
        author: "Temple Devotee",
        rating: 4,
        comment: "Beautiful ancient temple with great spiritual energy. Important pilgrimage site with peaceful atmosphere.",
        date: "2024-07-28"
      }
    ]
  },
  {
    id: 169,
    name: "Shakti Mandir",
    district: "Dhanbad",
    type: "famous",
    category: "temples",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A powerful Shakti temple known for its divine energy and being an important center for goddess worship in the region.",
    whyFamous: "Famous for its powerful Shakti worship and divine energy, attracting devotees seeking blessings from the Divine Mother.",
    keyFeatures: ["Shakti temple", "Divine energy", "Goddess worship", "Spiritual power", "Devotee attraction"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.8200, lng: 86.4700 },
    reviews: [
      {
        author: "Shakti Devotee",
        rating: 5,
        comment: "Incredibly powerful Shakti temple with amazing divine energy. Life-changing spiritual experience.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 170,
    name: "Jagannath Temple",
    district: "Dhanbad",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful temple dedicated to Lord Jagannath, known for its traditional Odishan architectural style and religious significance.",
    whyFamous: "Famous for bringing traditional Jagannath worship to Jharkhand and for its beautiful Odishan temple architecture.",
    keyFeatures: ["Jagannath temple", "Odishan architecture", "Traditional worship", "Religious significance", "Cultural diversity"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.8300, lng: 86.4800 },
    reviews: [
      {
        author: "Jagannath Devotee",
        rating: 4,
        comment: "Beautiful Jagannath temple with traditional architecture. Great place for worship and cultural experience.",
        date: "2024-06-22"
      }
    ]
  },

  // SAHIBGANJ DISTRICT
  {
    id: 113,
    name: "Rajmahal",
    district: "Sahibganj",
    type: "famous",
    category: "heritage",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient city with rich Mughal heritage, featuring historical monuments and archaeological significance.",
    whyFamous: "Famous for its Mughal heritage and being the former capital of Bengal under Man Singh, rich in historical monuments.",
    keyFeatures: ["Mughal heritage", "Historical monuments", "Former capital", "Archaeological significance", "Cultural importance"],
    entryFee: "₹15 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 25.0504, lng: 87.8331 },
    reviews: [
      {
        author: "History Enthusiast",
        rating: 4,
        comment: "Rich historical site with great Mughal heritage. Fascinating monuments and cultural significance.",
        date: "2024-07-12"
      }
    ]
  },
  {
    id: 114,
    name: "Udhwa Bird Sanctuary",
    district: "Sahibganj",
    type: "famous",
    category: "wildlife",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful bird sanctuary around Patauda Lake, perfect for bird watching and nature photography.",
    whyFamous: "Famous for its diverse bird species and being an important bird sanctuary in Jharkhand, especially during migratory seasons.",
    keyFeatures: ["Bird sanctuary", "Diverse species", "Patauda Lake", "Bird watching", "Photography spot"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 25.0200, lng: 87.6200 },
    reviews: [
      {
        author: "Bird Watcher",
        rating: 4,
        comment: "Excellent bird sanctuary with diverse species. Great for photography and nature observation.",
        date: "2024-06-28"
      }
    ]
  },
  {
    id: 196,
    name: "Singhi Dalan",
    district: "Sahibganj",
    type: "famous",
    category: "heritage",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic building with Mughal architecture, representing the rich heritage of Sahibganj district.",
    whyFamous: "Famous for its Mughal architectural style and historical significance as part of Rajmahal's heritage complex.",
    keyFeatures: ["Mughal architecture", "Historic building", "Heritage complex", "Cultural significance", "Architectural beauty"],
    entryFee: "₹10 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 25.0600, lng: 87.8400 },
    reviews: [
      {
        author: "Architecture Lover",
        rating: 4,
        comment: "Beautiful Mughal architecture with great historical significance. Part of impressive heritage complex.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 197,
    name: "Akbari Masjid",
    district: "Sahibganj",
    type: "famous",
    category: "heritage",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient mosque built during Akbar's era, showcasing beautiful Islamic architecture and historical importance.",
    whyFamous: "Famous for being built during Emperor Akbar's time and representing excellent Islamic architecture from the Mughal period.",
    keyFeatures: ["Akbar era mosque", "Islamic architecture", "Mughal period", "Historical importance", "Religious significance"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 25.0700, lng: 87.8500 },
    reviews: [
      {
        author: "Islamic Architecture Enthusiast",
        rating: 4,
        comment: "Magnificent Akbar-era mosque with beautiful Islamic architecture. Impressive historical and religious significance.",
        date: "2024-06-20"
      }
    ]
  },
  {
    id: 198,
    name: "Tomb of Maina-Bibi",
    district: "Sahibganj",
    type: "famous",
    category: "heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic tomb with beautiful Mughal architecture, representing the royal heritage of the region.",
    whyFamous: "Famous for its beautiful Mughal tomb architecture and historical significance in the royal heritage of Sahibganj.",
    keyFeatures: ["Mughal tomb", "Royal heritage", "Beautiful architecture", "Historical significance", "Cultural importance"],
    entryFee: "₹10 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 25.0800, lng: 87.8600 },
    reviews: [
      {
        author: "Heritage Explorer",
        rating: 4,
        comment: "Beautiful Mughal tomb with impressive architecture. Important part of regional royal heritage.",
        date: "2024-05-28"
      }
    ]
  },
  {
    id: 199,
    name: "Tomb of Miran",
    district: "Sahibganj",
    type: "famous",
    category: "heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient tomb showcasing Mughal architectural style and historical importance in the region's heritage.",
    whyFamous: "Known for its Mughal architectural elements and being an important historical monument in Sahibganj's heritage collection.",
    keyFeatures: ["Ancient tomb", "Mughal architecture", "Historical monument", "Cultural heritage", "Architectural significance"],
    entryFee: "₹10 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 25.0900, lng: 87.8700 },
    reviews: [
      {
        author: "History Student",
        rating: 4,
        comment: "Important historical tomb with good Mughal architecture. Significant part of Sahibganj's heritage.",
        date: "2024-04-15"
      }
    ]
  },
  {
    id: 200,
    name: "Mangalhat",
    district: "Sahibganj",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A traditional market area with historical significance and local cultural importance.",
    whyFamous: "Known for its traditional market culture and historical significance as an important trading center.",
    keyFeatures: ["Traditional market", "Historical significance", "Trading center", "Local culture", "Commercial heritage"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 25.1000, lng: 87.8800 },
    reviews: [
      {
        author: "Local Culture Explorer",
        rating: 4,
        comment: "Interesting traditional market with good historical significance. Great for understanding local trade culture.",
        date: "2024-03-22"
      }
    ]
  },
  {
    id: 201,
    name: "Kanhaiyasthan",
    district: "Sahibganj",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A temple dedicated to Lord Krishna, known for its spiritual significance and beautiful traditional architecture.",
    whyFamous: "Famous for its Krishna worship and being an important pilgrimage site for devotees in the Sahibganj region.",
    keyFeatures: ["Krishna temple", "Spiritual significance", "Pilgrimage site", "Traditional architecture", "Religious importance"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 25.1100, lng: 87.8900 },
    reviews: [
      {
        author: "Krishna Devotee",
        rating: 4,
        comment: "Beautiful Krishna temple with great spiritual atmosphere. Important pilgrimage site with peaceful environment.",
        date: "2024-08-18"
      }
    ]
  },
  {
    id: 202,
    name: "Binduvasini Temple",
    district: "Sahibganj",
    type: "famous",
    category: "temples",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A powerful goddess temple known for its spiritual energy and religious significance in the region.",
    whyFamous: "Famous for its powerful goddess worship and being an important Shakti temple attracting devotees from across the region.",
    keyFeatures: ["Goddess temple", "Spiritual energy", "Shakti worship", "Religious significance", "Devotee attraction"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 25.1200, lng: 87.9000 },
    reviews: [
      {
        author: "Goddess Devotee",
        rating: 4,
        comment: "Powerful goddess temple with amazing spiritual energy. Important Shakti worship site.",
        date: "2024-07-25"
      }
    ]
  },
  {
    id: 203,
    name: "Shukravasini Temple",
    district: "Sahibganj",
    type: "famous",
    category: "temples",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple with spiritual significance and traditional architecture, important for local worship.",
    whyFamous: "Known for its ancient spiritual significance and being an important temple for traditional worship in the region.",
    keyFeatures: ["Ancient temple", "Spiritual significance", "Traditional worship", "Religious importance", "Local pilgrimage"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 25.1300, lng: 87.9100 },
    reviews: [
      {
        author: "Traditional Devotee",
        rating: 4,
        comment: "Ancient temple with great spiritual significance. Important for traditional worship and local pilgrimage.",
        date: "2024-06-10"
      }
    ]
  },
  {
    id: 204,
    name: "Raksisthan",
    district: "Sahibganj",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historical site with cultural importance and local significance in the region's heritage.",
    whyFamous: "Known for its historical and cultural importance, representing the local heritage of Sahibganj district.",
    keyFeatures: ["Historical site", "Cultural importance", "Local heritage", "Regional significance", "Traditional value"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 25.1400, lng: 87.9200 },
    reviews: [
      {
        author: "Heritage Researcher",
        rating: 4,
        comment: "Interesting historical site with good cultural importance. Valuable for understanding local heritage.",
        date: "2024-02-18"
      }
    ]
  },
  {
    id: 205,
    name: "Bhoganadih",
    district: "Sahibganj",
    type: "hidden",
    category: "heritage",
    rating: 3.6,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A traditional village with local cultural significance and heritage value in the region.",
    whyFamous: "Known for preserving traditional culture and representing authentic village heritage of Sahibganj district.",
    keyFeatures: ["Traditional village", "Local culture", "Heritage value", "Cultural preservation", "Rural authenticity"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 25.1500, lng: 87.9300 },
    reviews: [
      {
        author: "Village Explorer",
        rating: 4,
        comment: "Authentic traditional village with good cultural heritage. Great for understanding rural traditions.",
        date: "2024-01-25"
      }
    ]
  },
  {
    id: 206,
    name: "Panchkathiya",
    district: "Sahibganj",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historical site with architectural remnants and cultural significance in the region's heritage.",
    whyFamous: "Known for its historical significance and architectural remnants representing the cultural heritage of the area.",
    keyFeatures: ["Historical site", "Architectural remnants", "Cultural significance", "Heritage value", "Regional importance"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 25.1600, lng: 87.9400 },
    reviews: [
      {
        author: "Heritage Enthusiast",
        rating: 4,
        comment: "Interesting historical site with good architectural remnants. Important for regional heritage understanding.",
        date: "2024-05-12"
      }
    ]
  },
  {
    id: 207,
    name: "Moti Jharna",
    district: "Sahibganj",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall known for its pearl-like water drops, creating a mesmerizing natural spectacle.",
    whyFamous: "Famous for its name meaning 'Pearl Waterfall' due to its pearl-like water droplets and beautiful natural setting.",
    keyFeatures: ["Pearl-like droplets", "Beautiful waterfall", "Natural spectacle", "Scenic beauty", "Photography spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 25.1700, lng: 87.9500 },
    reviews: [
      {
        author: "Waterfall Explorer",
        rating: 4,
        comment: "Beautiful waterfall with pearl-like droplets. Mesmerizing natural spectacle perfect for photography.",
        date: "2024-08-12"
      }
    ]
  },

  // SARAIKELA-KHARSAWAN DISTRICT
  {
    id: 115,
    name: "Chandil Dam",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "dams",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A multi-purpose dam creating a beautiful reservoir, perfect for water activities and scenic picnics.",
    whyFamous: "Known for its multi-purpose engineering and scenic beauty, popular for water sports and recreational activities.",
    keyFeatures: ["Multi-purpose dam", "Beautiful reservoir", "Water activities", "Scenic beauty", "Recreation facility"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 22.9667, lng: 86.0500 },
    reviews: [
      {
        author: "Dam Explorer",
        rating: 4,
        comment: "Beautiful dam with great water activities. Perfect scenic location for picnics and recreation.",
        date: "2024-05-15"
      }
    ]
  },
  {
    id: 116,
    name: "Seraikela Kharsawan Palace",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "heritage",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A royal palace showcasing traditional architecture and rich cultural heritage of the region.",
    whyFamous: "Famous for its royal heritage and traditional architecture, representing the cultural legacy of Saraikela-Kharsawan rulers.",
    keyFeatures: ["Royal palace", "Traditional architecture", "Cultural heritage", "Royal legacy", "Historical importance"],
    entryFee: "₹20 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.7000, lng: 85.9200 },
    reviews: [
      {
        author: "Heritage Lover",
        rating: 4,
        comment: "Beautiful royal palace with rich heritage. Excellent architecture and cultural significance.",
        date: "2024-04-20"
      }
    ]
  },
  {
    id: 117,
    name: "Chhau Dance Centre",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "cultural centers",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A cultural center dedicated to the famous Chhau dance form, showcasing traditional performing arts.",
    whyFamous: "Famous as the birthplace of Chhau dance, a UNESCO recognized intangible cultural heritage of humanity.",
    keyFeatures: ["Chhau dance heritage", "UNESCO recognition", "Cultural performances", "Traditional arts", "Educational center"],
    entryFee: "₹25 per person",
    timing: "10:00 AM - 5:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.7100, lng: 85.9300 },
    reviews: [
      {
        author: "Cultural Enthusiast",
        rating: 5,
        comment: "Amazing cultural center showcasing UNESCO heritage Chhau dance. Incredible performances and cultural education.",
        date: "2024-03-18"
      }
    ]
  },

  // WEST SINGHBHUM DISTRICT
  {
    id: 118,
    name: "Shahid Park (Chaibasa)",
    district: "West Singhbhum",
    type: "famous",
    category: "parks",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A memorial park dedicated to freedom fighters, offering peaceful environment and recreational facilities.",
    whyFamous: "Famous for commemorating freedom fighters and being a major recreational facility in Chaibasa town.",
    keyFeatures: ["Memorial park", "Freedom fighters tribute", "Recreational facilities", "Peaceful environment", "Educational value"],
    entryFee: "₹5 per person",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.5541, lng: 85.8088 },
    reviews: [
      {
        author: "Local Visitor",
        rating: 4,
        comment: "Nice memorial park with good facilities. Perfect for family recreation and remembering our heroes.",
        date: "2024-07-05"
      }
    ]
  },
  {
    id: 119,
    name: "Thakora Waterfall",
    district: "West Singhbhum",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful hidden waterfall surrounded by dense forest, perfect for trekking and nature photography.",
    whyFamous: "Known as a hidden gem with pristine natural beauty and excellent trekking opportunities through dense forests.",
    keyFeatures: ["Hidden waterfall", "Dense forest", "Trekking destination", "Nature photography", "Pristine beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 22.5800, lng: 85.7500 },
    reviews: [
      {
        author: "Trekking Enthusiast",
        rating: 4,
        comment: "Spectacular hidden waterfall with great trekking trails. Perfect for adventure and nature photography.",
        date: "2024-08-22"
      }
    ]
  },
  {
    id: 182,
    name: "Bidri",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A traditional village known for its cultural heritage and local crafts, offering insights into tribal life and traditions.",
    whyFamous: "Known for preserving traditional tribal culture and local craftsmanship, representing authentic rural heritage.",
    keyFeatures: ["Traditional village", "Tribal culture", "Local crafts", "Cultural heritage", "Rural authenticity"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.5600, lng: 85.7600 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 4,
        comment: "Authentic village with rich tribal culture. Great for understanding traditional crafts and rural life.",
        date: "2024-06-15"
      }
    ]
  },
  {
    id: 183,
    name: "Hirni Waterfall",
    district: "West Singhbhum",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall nestled in forest surroundings, perfect for nature lovers and adventure seekers.",
    whyFamous: "Known for its pristine natural beauty and being an excellent destination for trekking and nature photography.",
    keyFeatures: ["Forest waterfall", "Natural beauty", "Trekking destination", "Adventure spot", "Photography location"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 22.5700, lng: 85.7700 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Beautiful waterfall with excellent forest surroundings. Perfect for trekking and nature photography.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 184,
    name: "Chainpur",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic town with cultural significance and traditional architecture, representing the heritage of the region.",
    whyFamous: "Known for its historical importance and traditional architecture, representing the cultural heritage of West Singhbhum.",
    keyFeatures: ["Historic town", "Cultural significance", "Traditional architecture", "Regional heritage", "Local history"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.5800, lng: 85.7800 },
    reviews: [
      {
        author: "Heritage Enthusiast",
        rating: 4,
        comment: "Interesting historic town with good cultural significance. Great for understanding local heritage.",
        date: "2024-05-22"
      }
    ]
  },
  {
    id: 185,
    name: "Jagannathpur",
    district: "West Singhbhum",
    type: "hidden",
    category: "temples",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A temple town dedicated to Lord Jagannath, known for its religious significance and peaceful spiritual atmosphere.",
    whyFamous: "Famous for its Jagannath temple and being an important pilgrimage site for devotees in the region.",
    keyFeatures: ["Jagannath temple", "Pilgrimage site", "Religious significance", "Spiritual atmosphere", "Traditional worship"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.5900, lng: 85.7900 },
    reviews: [
      {
        author: "Jagannath Devotee",
        rating: 4,
        comment: "Peaceful Jagannath temple with great spiritual atmosphere. Important local pilgrimage site.",
        date: "2024-07-18"
      }
    ]
  },
  {
    id: 186,
    name: "Jojohatu",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A traditional village with local cultural significance, offering insights into rural life and tribal customs.",
    whyFamous: "Known for preserving traditional tribal customs and offering authentic rural cultural experiences.",
    keyFeatures: ["Traditional village", "Tribal customs", "Rural culture", "Cultural authenticity", "Local traditions"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.6000, lng: 85.8000 },
    reviews: [
      {
        author: "Rural Explorer",
        rating: 4,
        comment: "Authentic village experience with rich tribal customs. Great for cultural understanding.",
        date: "2024-04-25"
      }
    ]
  },
  {
    id: 187,
    name: "Kera",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.6,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A small village known for its peaceful rural setting and traditional way of life.",
    whyFamous: "Known for its peaceful rural atmosphere and representing traditional village life in West Singhbhum.",
    keyFeatures: ["Peaceful village", "Rural setting", "Traditional life", "Cultural experience", "Natural environment"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.6100, lng: 85.8100 },
    reviews: [
      {
        author: "Peace Seeker",
        rating: 3,
        comment: "Quiet peaceful village with traditional charm. Good for understanding rural life.",
        date: "2024-03-15"
      }
    ]
  },
  {
    id: 188,
    name: "Kotgarh",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic site with fort ruins and archaeological significance, representing the region's medieval history.",
    whyFamous: "Known for its historic fort ruins and archaeological importance, representing medieval heritage of the region.",
    keyFeatures: ["Historic fort ruins", "Archaeological site", "Medieval history", "Cultural heritage", "Historical importance"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.6200, lng: 85.8200 },
    reviews: [
      {
        author: "History Buff",
        rating: 4,
        comment: "Interesting fort ruins with good historical significance. Worth visiting for archaeology enthusiasts.",
        date: "2024-06-08"
      }
    ]
  },
  {
    id: 189,
    name: "Lupungutu",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A remote village with traditional tribal culture and natural surroundings, perfect for cultural exploration.",
    whyFamous: "Known for its remote location and well-preserved tribal culture, offering authentic cultural experiences.",
    keyFeatures: ["Remote village", "Tribal culture", "Natural surroundings", "Cultural authenticity", "Traditional lifestyle"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.6300, lng: 85.8300 },
    reviews: [
      {
        author: "Cultural Anthropologist",
        rating: 4,
        comment: "Remote village with authentic tribal culture. Excellent for cultural research and understanding.",
        date: "2024-02-20"
      }
    ]
  },
  {
    id: 190,
    name: "Mahadebsal",
    district: "West Singhbhum",
    type: "hidden",
    category: "temples",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A temple dedicated to Lord Shiva in a natural forest setting, known for its spiritual significance.",
    whyFamous: "Famous for its natural forest temple setting and being an important Shiva worship site in the region.",
    keyFeatures: ["Forest temple", "Shiva worship", "Natural setting", "Spiritual significance", "Peaceful environment"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.6400, lng: 85.8400 },
    reviews: [
      {
        author: "Shiva Devotee",
        rating: 4,
        comment: "Beautiful forest temple with great spiritual energy. Peaceful natural setting for worship.",
        date: "2024-08-25"
      }
    ]
  },
  {
    id: 191,
    name: "Ponga",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.6,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A small village known for its traditional culture and peaceful rural environment.",
    whyFamous: "Known for its traditional village culture and being a representative of authentic rural life in the region.",
    keyFeatures: ["Traditional village", "Rural culture", "Peaceful environment", "Cultural authenticity", "Local traditions"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.6500, lng: 85.8500 },
    reviews: [
      {
        author: "Village Explorer",
        rating: 3,
        comment: "Small peaceful village with traditional culture. Good for understanding rural lifestyle.",
        date: "2024-01-18"
      }
    ]
  },
  {
    id: 192,
    name: "Porahat",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A town with historical significance and cultural importance, representing the regional heritage.",
    whyFamous: "Known for its historical importance and being a significant town in West Singhbhum's cultural heritage.",
    keyFeatures: ["Historic town", "Cultural importance", "Regional heritage", "Traditional significance", "Local history"],
    entryFee: "Free",
    timing: "Dawn to Dusk",
    bestTime: "November to February",
    coordinates: { lat: 22.6600, lng: 85.8600 },
    reviews: [
      {
        author: "Local Historian",
        rating: 4,
        comment: "Important historic town with good cultural significance. Interesting for understanding regional heritage.",
        date: "2024-05-10"
      }
    ]
  },
  {
    id: 193,
    name: "Ramtirtha",
    district: "West Singhbhum",
    type: "hidden",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A sacred site associated with Lord Rama, known for its religious significance and spiritual atmosphere.",
    whyFamous: "Famous for its connection to Lord Rama and being an important pilgrimage site with spiritual significance.",
    keyFeatures: ["Sacred Ram site", "Religious significance", "Pilgrimage destination", "Spiritual atmosphere", "Mythological connection"],
    entryFee: "Free",
    timing: "5:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.6700, lng: 85.8700 },
    reviews: [
      {
        author: "Ram Devotee",
        rating: 4,
        comment: "Sacred Ram site with great spiritual energy. Important pilgrimage destination with peaceful atmosphere.",
        date: "2024-07-30"
      }
    ]
  },
  {
    id: 194,
    name: "Tholkobad",
    district: "West Singhbhum",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A historic site with archaeological importance and cultural significance in the region.",
    whyFamous: "Known for its archaeological importance and historical significance, representing the ancient heritage of the area.",
    keyFeatures: ["Archaeological site", "Historical importance", "Cultural heritage", "Ancient significance", "Research value"],
    entryFee: "Free",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.6800, lng: 85.8800 },
    reviews: [
      {
        author: "Archaeology Student",
        rating: 4,
        comment: "Interesting archaeological site with good historical value. Important for understanding ancient heritage.",
        date: "2024-04-12"
      }
    ]
  },
  {
    id: 195,
    name: "Benisagar",
    district: "West Singhbhum",
    type: "hidden",
    category: "lakes",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic lake surrounded by natural beauty, perfect for peaceful retreats and water activities.",
    whyFamous: "Known for its scenic beauty and peaceful environment, popular among locals for fishing and picnics.",
    keyFeatures: ["Scenic lake", "Natural beauty", "Peaceful environment", "Fishing spot", "Picnic destination"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.6900, lng: 85.8900 },
    reviews: [
      {
        author: "Lake Explorer",
        rating: 4,
        comment: "Beautiful scenic lake with peaceful surroundings. Perfect for fishing and family picnics.",
        date: "2024-06-20"
      }
    ]
  },

  // EAST SINGHBHUM DISTRICT
  {
    id: 120,
    name: "Dimna Lake",
    district: "East Singhbhum",
    type: "famous",
    category: "lakes",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic artificial lake perfect for boating, water sports, and peaceful retreats surrounded by hills.",
    whyFamous: "Famous for its scenic beauty and excellent water sports facilities, popular among tourists visiting Jamshedpur.",
    keyFeatures: ["Artificial lake", "Water sports", "Boating facility", "Scenic hills", "Tourist attraction"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.8463, lng: 86.2136 },
    reviews: [
      {
        author: "Water Sports Lover",
        rating: 4,
        comment: "Beautiful lake with excellent water sports. Great scenic location and well-maintained facilities.",
        date: "2024-06-25"
      }
    ]
  },
  {
    id: 121,
    name: "Dalma Wildlife Sanctuary",
    district: "East Singhbhum",
    type: "famous",
    category: "wildlife",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A wildlife sanctuary known for its elephant population and diverse flora and fauna, perfect for wildlife enthusiasts.",
    whyFamous: "Famous for its large elephant population and being a significant wildlife sanctuary in eastern India.",
    keyFeatures: ["Elephant sanctuary", "Wildlife diversity", "Flora and fauna", "Wildlife viewing", "Conservation area"],
    entryFee: "₹50 per person",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to April",
    coordinates: { lat: 22.8667, lng: 86.1833 },
    reviews: [
      {
        author: "Wildlife Enthusiast",
        rating: 4,
        comment: "Excellent wildlife sanctuary with great elephant sightings. Perfect for wildlife photography and nature education.",
        date: "2024-05-30"
      }
    ]
  },

  // DUMKA DISTRICT
  {
    id: 122,
    name: "Baba Basukinath Dham",
    district: "Dumka",
    type: "famous",
    category: "temples",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An important Shiva temple known for its spiritual significance and beautiful traditional architecture.",
    whyFamous: "Famous as an important pilgrimage site dedicated to Lord Shiva, attracting devotees from across the region.",
    keyFeatures: ["Shiva temple", "Pilgrimage site", "Traditional architecture", "Spiritual significance", "Religious festivals"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.4167, lng: 87.0167 },
    reviews: [
      {
        author: "Devotee Visitor",
        rating: 5,
        comment: "Powerful Shiva temple with great spiritual energy. Beautiful architecture and peaceful atmosphere.",
        date: "2024-08-15"
      }
    ]
  },
  {
    id: 123,
    name: "Masanjore Dam",
    district: "Dumka",
    type: "famous",
    category: "dams",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A major dam creating a large reservoir, perfect for water activities and scenic boat rides.",
    whyFamous: "Known for its large reservoir and scenic beauty, popular for boating and water-based recreational activities.",
    keyFeatures: ["Major dam", "Large reservoir", "Boating facility", "Water activities", "Scenic beauty"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 24.4500, lng: 87.2000 },
    reviews: [
      {
        author: "Boating Enthusiast",
        rating: 4,
        comment: "Great dam with excellent boating facilities. Beautiful scenic location and peaceful water body.",
        date: "2024-07-08"
      }
    ]
  },

  // GARHWA DISTRICT
  {
    id: 124,
    name: "Anraj Dam",
    district: "Garhwa",
    type: "hidden",
    category: "dams",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a peaceful water body, perfect for fishing and quiet retreats in natural surroundings.",
    whyFamous: "Known for its peaceful environment and being a perfect spot for fishing enthusiasts and nature lovers.",
    keyFeatures: ["Peaceful dam", "Fishing spot", "Natural surroundings", "Quiet environment", "Water body"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 24.1000, lng: 83.8000 },
    reviews: [
      {
        author: "Fishing Enthusiast",
        rating: 4,
        comment: "Great peaceful dam for fishing and relaxation. Beautiful natural setting and clean waters.",
        date: "2024-06-15"
      }
    ]
  },
  {
    id: 125,
    name: "Sukhaldari Waterfalls",
    district: "Garhwa",
    type: "famous",
    category: "waterfalls",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Beautiful waterfalls cascading through rocky terrain, offering spectacular views and natural beauty.",
    whyFamous: "Famous for its spectacular cascade and being one of the major waterfalls in Garhwa district.",
    keyFeatures: ["Spectacular cascade", "Rocky terrain", "Natural beauty", "Photography spot", "Scenic views"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.1200, lng: 83.8200 },
    reviews: [
      {
        author: "Waterfall Explorer",
        rating: 4,
        comment: "Stunning waterfalls with great natural beauty. Perfect for photography and nature appreciation.",
        date: "2024-08-12"
      }
    ]
  },

  // GIRIDIH DISTRICT
  {
    id: 126,
    name: "Parasnath Hills / Shri Sammet Shikharji",
    district: "Giridih",
    type: "famous",
    category: "hills",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "The highest peak in Jharkhand and most sacred Jain pilgrimage site with 24 Jain temples, attracting devotees worldwide.",
    whyFamous: "Famous as the highest peak in Jharkhand and the most sacred Jain pilgrimage site where 20 out of 24 Jain Tirthankaras attained moksha.",
    keyFeatures: ["Highest peak in Jharkhand", "Sacred Jain site", "24 temples", "Pilgrimage destination", "Spiritual significance"],
    entryFee: "Free",
    timing: "4:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.9633, lng: 86.1531 },
    reviews: [
      {
        author: "Jain Pilgrim",
        rating: 5,
        comment: "Most sacred Jain pilgrimage site with incredible spiritual energy. Life-changing spiritual experience.",
        date: "2024-08-20"
      }
    ]
  },
  {
    id: 127,
    name: "Usri Falls",
    district: "Giridih",
    type: "famous",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful three-tiered waterfall cascading through rocky landscape, perfect for adventure and photography.",
    whyFamous: "Known for its three-tiered cascade and being one of the most photographed waterfalls in Jharkhand.",
    keyFeatures: ["Three-tiered waterfall", "Rocky landscape", "Photography spot", "Adventure destination", "Natural beauty"],
    entryFee: "₹15 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.1833, lng: 86.2167 },
    reviews: [
      {
        author: "Adventure Photographer",
        rating: 4,
        comment: "Spectacular three-tiered waterfall with amazing photographic opportunities. Great adventure destination.",
        date: "2024-07-28"
      }
    ]
  },

  // HAZARIBAGH DISTRICT
  {
    id: 128,
    name: "Hazaribagh Lake",
    district: "Hazaribagh",
    type: "famous",
    category: "lakes",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic lake in the heart of Hazaribagh town, perfect for boating and peaceful evening walks.",
    whyFamous: "Famous for being a major recreational facility in Hazaribagh and for its beautiful lake-side park.",
    keyFeatures: ["Urban lake", "Boating facility", "Lake-side park", "Evening walks", "Recreation center"],
    entryFee: "₹10 per person",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.9981, lng: 85.3644 },
    reviews: [
      {
        author: "Local Visitor",
        rating: 4,
        comment: "Beautiful lake in the city center. Great for evening walks and family recreation.",
        date: "2024-06-20"
      }
    ]
  },
  {
    id: 129,
    name: "Hazaribagh Wildlife Sanctuary",
    district: "Hazaribagh",
    type: "famous",
    category: "wildlife",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A wildlife sanctuary known for its diverse flora and fauna, perfect for wildlife enthusiasts and nature education.",
    whyFamous: "Famous for its wildlife diversity and being one of the important wildlife sanctuaries in Jharkhand.",
    keyFeatures: ["Wildlife diversity", "Flora and fauna", "Nature education", "Wildlife viewing", "Conservation area"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to April",
    coordinates: { lat: 23.9000, lng: 85.4000 },
    reviews: [
      {
        author: "Wildlife Observer",
        rating: 4,
        comment: "Great wildlife sanctuary with diverse species. Perfect for nature education and wildlife photography.",
        date: "2024-05-18"
      }
    ]
  },
  {
    id: 130,
    name: "Surajkund Hot Springs",
    district: "Hazaribagh",
    type: "famous",
    category: "hot springs",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1571104508999-893933ded431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Natural hot springs with therapeutic properties, perfect for relaxation and wellness treatments.",
    whyFamous: "Famous for its natural therapeutic hot springs and wellness benefits, attracting visitors seeking natural healing.",
    keyFeatures: ["Natural hot springs", "Therapeutic properties", "Wellness benefits", "Relaxation spot", "Natural healing"],
    entryFee: "₹30 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 23.9500, lng: 85.4500 },
    reviews: [
      {
        author: "Wellness Seeker",
        rating: 4,
        comment: "Excellent natural hot springs with great therapeutic benefits. Very relaxing and rejuvenating experience.",
        date: "2024-04-25"
      }
    ]
  },

  // JAMTARA DISTRICT
  {
    id: 131,
    name: "Ladhna Dam",
    district: "Jamtara",
    type: "hidden",
    category: "dams",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A peaceful dam creating a serene water body, perfect for fishing and quiet nature retreats.",
    whyFamous: "Known for its peaceful environment and being a perfect spot for local fishing enthusiasts and quiet retreats.",
    keyFeatures: ["Peaceful dam", "Fishing spot", "Quiet environment", "Nature retreat", "Serene water body"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 23.9600, lng: 86.9000 },
    reviews: [
      {
        author: "Local Angler",
        rating: 4,
        comment: "Great peaceful spot for fishing and relaxation. Beautiful quiet environment away from crowds.",
        date: "2024-05-12"
      }
    ]
  },
  {
    id: 132,
    name: "Parwat Vihar Park",
    district: "Jamtara",
    type: "hidden",
    category: "parks",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A local park with recreational facilities and peaceful environment, perfect for family outings.",
    whyFamous: "Known as a local recreational facility and peaceful park perfect for family gatherings and community events.",
    keyFeatures: ["Local park", "Recreational facilities", "Family-friendly", "Peaceful environment", "Community space"],
    entryFee: "₹5 per person",
    timing: "6:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.9700, lng: 86.9100 },
    reviews: [
      {
        author: "Family Visitor",
        rating: 4,
        comment: "Nice local park with good facilities for families. Perfect for evening relaxation and children's play.",
        date: "2024-06-08"
      }
    ]
  },

  // GODDA DISTRICT
  {
    id: 133,
    name: "Yogini Shakti Peeth (Lakhanpahari)",
    district: "Godda",
    type: "famous",
    category: "temples",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90bi1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A sacred Shakti Peetha dedicated to Goddess Yogini, known for its spiritual power and religious significance.",
    whyFamous: "Famous as one of the 51 Shakti Peethas and for its immense spiritual power, attracting devotees from across India.",
    keyFeatures: ["Shakti Peetha temple", "Spiritual power", "Religious significance", "Goddess worship", "Pilgrimage site"],
    entryFee: "Free",
    timing: "4:00 AM - 10:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.8167, lng: 87.2167 },
    reviews: [
      {
        author: "Shakti Devotee",
        rating: 5,
        comment: "Incredibly powerful Shakti Peetha with amazing divine energy. Life-transforming spiritual experience.",
        date: "2024-08-18"
      }
    ]
  },
  {
    id: 134,
    name: "Sunder Dam",
    district: "Godda",
    type: "hidden",
    category: "dams",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a beautiful water reservoir, perfect for peaceful retreats and water activities.",
    whyFamous: "Known for its scenic beauty and peaceful environment, popular among locals for picnics and water activities.",
    keyFeatures: ["Scenic dam", "Water reservoir", "Peaceful environment", "Water activities", "Picnic spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 24.8300, lng: 87.2300 },
    reviews: [
      {
        author: "Dam Explorer",
        rating: 4,
        comment: "Beautiful scenic dam with peaceful water body. Great for relaxation and family picnics.",
        date: "2024-07-10"
      }
    ]
  },

  // GUMLA DISTRICT
  {
    id: 135,
    name: "Mahasadashiv Temple",
    district: "Gumla",
    type: "famous",
    category: "temples",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple dedicated to Lord Shiva, known for its spiritual significance and beautiful traditional architecture.",
    whyFamous: "Famous for its ancient Shiva worship traditions and being an important pilgrimage site in the Gumla region.",
    keyFeatures: ["Ancient Shiva temple", "Traditional architecture", "Spiritual significance", "Pilgrimage site", "Religious festivals"],
    entryFee: "Free",
    timing: "4:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 23.0433, lng: 84.5400 },
    reviews: [
      {
        author: "Shiva Devotee",
        rating: 4,
        comment: "Powerful ancient Shiva temple with great spiritual atmosphere. Beautiful traditional architecture.",
        date: "2024-06-28"
      }
    ]
  },
  {
    id: 136,
    name: "Basudevkona Waterfall",
    district: "Gumla",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful hidden waterfall surrounded by dense forest, perfect for trekking and nature photography.",
    whyFamous: "Known as a hidden gem with pristine natural beauty and excellent trekking opportunities through forest trails.",
    keyFeatures: ["Hidden waterfall", "Dense forest", "Trekking destination", "Nature photography", "Pristine beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 23.0500, lng: 84.5500 },
    reviews: [
      {
        author: "Forest Trekker",
        rating: 4,
        comment: "Amazing hidden waterfall with beautiful forest trek. Perfect for nature lovers and photography.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 137,
    name: "Palkot Wildlife Sanctuary",
    district: "Gumla",
    type: "hidden",
    category: "wildlife",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A wildlife sanctuary known for its biodiversity and peaceful environment, perfect for wildlife observation and birdwatching.",
    whyFamous: "Known for its rich biodiversity and being a quiet sanctuary perfect for birdwatching and nature trails.",
    keyFeatures: ["Wildlife sanctuary", "Rich biodiversity", "Birdwatching", "Nature trails", "Peaceful environment"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to April",
    coordinates: { lat: 23.0600, lng: 84.5600 },
    reviews: [
      {
        author: "Bird Watcher",
        rating: 4,
        comment: "Great wildlife sanctuary for birdwatching and peaceful nature walks. Rich biodiversity and quiet environment.",
        date: "2024-05-22"
      }
    ]
  },

  // CHATRA DISTRICT
  {
    id: 138,
    name: "Bhadrakali Temple",
    district: "Chatra",
    type: "famous",
    category: "temples",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple dedicated to Goddess Bhadrakali, known for its spiritual power and religious significance.",
    whyFamous: "Famous for its powerful goddess worship and being an important religious center in Chatra district.",
    keyFeatures: ["Goddess temple", "Spiritual power", "Religious significance", "Ancient worship", "Festival celebrations"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 24.2067, lng: 84.8717 },
    reviews: [
      {
        author: "Goddess Devotee",
        rating: 4,
        comment: "Powerful Bhadrakali temple with great spiritual energy. Important religious site with peaceful atmosphere.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 139,
    name: "Maludah Waterfall",
    district: "Chatra",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall cascading through rocky terrain, perfect for adventure seekers and nature photographers.",
    whyFamous: "Known for its scenic beauty and being a perfect adventure destination with rocky landscape and natural pools.",
    keyFeatures: ["Scenic waterfall", "Rocky terrain", "Adventure destination", "Natural pools", "Photography spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.2200, lng: 84.8900 },
    reviews: [
      {
        author: "Adventure Seeker",
        rating: 4,
        comment: "Great waterfall with exciting rocky terrain. Perfect for adventure activities and nature photography.",
        date: "2024-08-18"
      }
    ]
  },
  {
    id: 156,
    name: "Kauleshwari Hill and Temple",
    district: "Chatra",
    type: "famous",
    category: "hills",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A sacred hill with an ancient temple dedicated to Goddess Kauleshwari, offering panoramic views and spiritual significance.",
    whyFamous: "Famous for its ancient temple on hilltop and being an important pilgrimage site with spectacular panoramic views.",
    keyFeatures: ["Sacred hilltop temple", "Panoramic views", "Pilgrimage site", "Ancient worship", "Spiritual significance"],
    entryFee: "Free",
    timing: "5:00 AM - 8:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.2300, lng: 84.9000 },
    reviews: [
      {
        author: "Hilltop Pilgrim",
        rating: 4,
        comment: "Beautiful hilltop temple with amazing views. Great spiritual significance and peaceful atmosphere.",
        date: "2024-07-22"
      }
    ]
  },
  {
    id: 157,
    name: "Kolhua Hill",
    district: "Chatra",
    type: "hidden",
    category: "hills",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic hill offering excellent trekking opportunities and beautiful natural surroundings perfect for adventure enthusiasts.",
    whyFamous: "Known for its excellent trekking trails and being a hidden gem for adventure activities and nature exploration.",
    keyFeatures: ["Trekking hill", "Adventure activities", "Natural surroundings", "Scenic beauty", "Hidden gem"],
    entryFee: "Free",
    timing: "5:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 24.2400, lng: 84.9100 },
    reviews: [
      {
        author: "Trekking Explorer",
        rating: 4,
        comment: "Great hill for trekking with beautiful natural scenery. Perfect for adventure and nature photography.",
        date: "2024-06-18"
      }
    ]
  },
  {
    id: 158,
    name: "Tamasin Waterfall",
    district: "Chatra",
    type: "hidden",
    category: "waterfalls",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful waterfall surrounded by dense forest, perfect for nature lovers and peaceful retreats.",
    whyFamous: "Known for its pristine natural beauty and peaceful forest surroundings, ideal for nature meditation and photography.",
    keyFeatures: ["Forest waterfall", "Dense surroundings", "Nature retreat", "Peaceful environment", "Photography spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.2500, lng: 84.9200 },
    reviews: [
      {
        author: "Nature Photographer",
        rating: 4,
        comment: "Stunning waterfall with beautiful forest surroundings. Perfect for nature photography and peaceful moments.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 159,
    name: "Dumer Sumer Waterfall",
    district: "Chatra",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A cascading waterfall with unique rock formations, offering excellent opportunities for adventure and exploration.",
    whyFamous: "Famous for its unique rock formations and cascading waters, perfect for adventure seekers and geology enthusiasts.",
    keyFeatures: ["Cascading waterfall", "Unique rock formations", "Adventure spot", "Geological interest", "Exploration opportunity"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to October",
    coordinates: { lat: 24.2600, lng: 84.9300 },
    reviews: [
      {
        author: "Geology Enthusiast",
        rating: 4,
        comment: "Fascinating waterfall with interesting rock formations. Great for adventure and geological exploration.",
        date: "2024-07-05"
      }
    ]
  },
  {
    id: 160,
    name: "Bario Waterfall",
    district: "Chatra",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A serene waterfall in a secluded location, perfect for those seeking tranquility and natural beauty.",
    whyFamous: "Known for its secluded location and tranquil atmosphere, ideal for peaceful meditation and nature contemplation.",
    keyFeatures: ["Secluded waterfall", "Tranquil atmosphere", "Natural beauty", "Peaceful retreat", "Meditation spot"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.2700, lng: 84.9400 },
    reviews: [
      {
        author: "Peace Seeker",
        rating: 4,
        comment: "Beautiful secluded waterfall perfect for peaceful moments. Great natural beauty and tranquil surroundings.",
        date: "2024-06-12"
      }
    ]
  },
  {
    id: 161,
    name: "Khaywa Banaroo Waterfall",
    district: "Chatra",
    type: "hidden",
    category: "waterfalls",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A hidden waterfall accessible through forest trails, offering adventure and natural beauty to explorers.",
    whyFamous: "Known for being a hidden gem accessible only through forest trekking, perfect for adventure enthusiasts.",
    keyFeatures: ["Hidden waterfall", "Forest trails", "Adventure trekking", "Natural exploration", "Off-beat destination"],
    entryFee: "Free",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "July to October",
    coordinates: { lat: 24.2800, lng: 84.9500 },
    reviews: [
      {
        author: "Adventure Trekker",
        rating: 4,
        comment: "Exciting hidden waterfall requiring good trekking. Worth the adventure with beautiful natural scenery.",
        date: "2024-08-25"
      }
    ]
  },
  {
    id: 162,
    name: "Goa Waterfall",
    district: "Chatra",
    type: "hidden",
    category: "waterfalls",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A picturesque waterfall with clear pools, perfect for swimming and relaxation in natural surroundings.",
    whyFamous: "Famous for its clear natural pools and being perfect for swimming activities, offering refreshing natural experience.",
    keyFeatures: ["Swimming waterfall", "Clear pools", "Natural swimming", "Refreshing waters", "Recreational activity"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 24.2900, lng: 84.9600 },
    reviews: [
      {
        author: "Swimming Enthusiast",
        rating: 4,
        comment: "Perfect waterfall for swimming with clear natural pools. Refreshing and beautiful natural setting.",
        date: "2024-07-30"
      }
    ]
  },
  {
    id: 208,
    name: "Kharkai Barrage",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "dams",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A major barrage on River Kharkai, serving irrigation and water supply needs with beautiful water views.",
    whyFamous: "Important for irrigation and water supply in the region, known for its engineering significance and scenic water views.",
    keyFeatures: ["River barrage", "Irrigation facility", "Water supply", "Engineering marvel", "Scenic views"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.7500, lng: 85.8500 },
    reviews: [
      {
        author: "Engineering Student",
        rating: 4,
        comment: "Important barrage with good engineering significance. Beautiful water views and peaceful environment.",
        date: "2024-06-15"
      }
    ]
  },
  {
    id: 209,
    name: "Chandil Lake",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "lakes",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A beautiful lake formed by dam construction, popular for boating and offering scenic natural beauty.",
    whyFamous: "Known for its scenic beauty, boating facilities, and being a popular spot for nature lovers and photographers.",
    keyFeatures: ["Scenic lake", "Boating facility", "Dam lake", "Natural beauty", "Photography spot"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 7:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.7600, lng: 85.8600 },
    reviews: [
      {
        author: "Lake Enthusiast",
        rating: 4,
        comment: "Beautiful dam lake with excellent boating facilities. Perfect spot for nature photography and relaxation.",
        date: "2024-07-20"
      }
    ]
  },
  {
    id: 210,
    name: "Ichagarh Fort",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1520637736862-4d197d17c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient fort with historical significance and architectural remains showcasing the region's royal heritage.",
    whyFamous: "Known for its historical importance as a royal fort and architectural remains representing the heritage of Saraikela kingdom.",
    keyFeatures: ["Ancient fort", "Royal heritage", "Historical significance", "Architectural remains", "Kingdom history"],
    entryFee: "₹15 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.7700, lng: 85.8700 },
    reviews: [
      {
        author: "Fort Explorer",
        rating: 4,
        comment: "Impressive ancient fort with good royal heritage. Important architectural remains from Saraikela kingdom.",
        date: "2024-05-18"
      }
    ]
  },
  {
    id: 211,
    name: "Gamharia Hills",
    district: "Saraikela-Kharsawan",
    type: "hidden",
    category: "hills",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Scenic hills offering trekking opportunities and beautiful views of the surrounding landscape.",
    whyFamous: "Known for trekking trails, scenic beauty, and panoramic views of the Saraikela-Kharsawan region.",
    keyFeatures: ["Scenic hills", "Trekking trails", "Panoramic views", "Natural beauty", "Adventure activity"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.7800, lng: 85.8800 },
    reviews: [
      {
        author: "Trekking Enthusiast",
        rating: 4,
        comment: "Great hills for trekking with beautiful panoramic views. Perfect for adventure lovers and nature enthusiasts.",
        date: "2024-04-12"
      }
    ]
  },
  {
    id: 212,
    name: "Kharsawan Forest",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "parks",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Dense forest area with rich biodiversity, offering nature trails and wildlife spotting opportunities.",
    whyFamous: "Known for its rich biodiversity, nature trails, and being an important forest ecosystem in the region.",
    keyFeatures: ["Dense forest", "Rich biodiversity", "Nature trails", "Wildlife spotting", "Ecosystem preservation"],
    entryFee: "₹25 per person",
    timing: "7:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.7900, lng: 85.8900 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Beautiful dense forest with excellent biodiversity. Great nature trails for wildlife enthusiasts.",
        date: "2024-03-25"
      }
    ]
  },
  {
    id: 213,
    name: "Seraikela Palace Complex",
    district: "Saraikela-Kharsawan",
    type: "famous",
    category: "heritage",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A magnificent palace complex showcasing royal architecture and the cultural heritage of Seraikela kingdom.",
    whyFamous: "Famous for its royal architecture, cultural heritage, and being the seat of the historic Seraikela kingdom.",
    keyFeatures: ["Royal palace", "Kingdom heritage", "Cultural architecture", "Historical importance", "Royal complex"],
    entryFee: "₹30 per person",
    timing: "9:00 AM - 5:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.8000, lng: 85.9000 },
    reviews: [
      {
        author: "Palace Explorer",
        rating: 4,
        comment: "Magnificent royal palace with excellent architecture. Important cultural heritage of Seraikela kingdom.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 214,
    name: "Kuchai Hills",
    district: "Saraikela-Kharsawan",
    type: "hidden",
    category: "hills",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Peaceful hills offering solitude and natural beauty, perfect for hiking and nature photography.",
    whyFamous: "Known for its peaceful environment, natural beauty, and being a hidden gem for hiking and photography enthusiasts.",
    keyFeatures: ["Peaceful hills", "Natural solitude", "Hiking trails", "Photography spot", "Hidden gem"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.8100, lng: 85.9100 },
    reviews: [
      {
        author: "Hiking Enthusiast",
        rating: 4,
        comment: "Beautiful peaceful hills perfect for hiking. Hidden gem with excellent natural beauty and photography opportunities.",
        date: "2024-02-20"
      }
    ]
  },

  // SIMDEGA DISTRICT
  {
    id: 140,
    name: "Ram Rekha Dham",
    district: "Simdega",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A religious site dedicated to Lord Rama, known for its spiritual significance and peaceful environment.",
    whyFamous: "Famous for its connection to Lord Rama and being an important pilgrimage site for devotees in the region.",
    keyFeatures: ["Rama temple", "Spiritual significance", "Pilgrimage site", "Peaceful environment", "Religious importance"],
    entryFee: "Free",
    timing: "5:00 AM - 8:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.6167, lng: 84.5167 },
    reviews: [
      {
        author: "Ram Devotee",
        rating: 4,
        comment: "Beautiful Ram temple with peaceful spiritual atmosphere. Important pilgrimage site with good facilities.",
        date: "2024-06-25"
      }
    ]
  },
  {
    id: 141,
    name: "Kelaghagh Dam",
    district: "Simdega",
    type: "hidden",
    category: "dams",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A scenic dam creating a peaceful reservoir, perfect for fishing and quiet nature retreats.",
    whyFamous: "Known for its peaceful environment and being a perfect spot for local fishing enthusiasts and nature lovers.",
    keyFeatures: ["Peaceful dam", "Fishing spot", "Nature retreat", "Quiet environment", "Scenic reservoir"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to April",
    coordinates: { lat: 22.6300, lng: 84.5300 },
    reviews: [
      {
        author: "Nature Lover",
        rating: 4,
        comment: "Peaceful dam with beautiful natural surroundings. Perfect for quiet fishing and relaxation.",
        date: "2024-05-15"
      }
    ]
  },
  {
    id: 215,
    name: "Rihand Dam Reservoir",
    district: "Simdega",
    type: "famous",
    category: "dams",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A large reservoir created by Rihand Dam, offering scenic water views and recreational activities.",
    whyFamous: "One of the largest reservoirs in the region, known for its scenic beauty, boating facilities, and peaceful environment.",
    keyFeatures: ["Large reservoir", "Scenic water views", "Boating facility", "Recreational activities", "Peaceful environment"],
    entryFee: "₹25 per person",
    timing: "6:00 AM - 7:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 22.5200, lng: 84.4200 },
    reviews: [
      {
        author: "Water Sports Enthusiast",
        rating: 4,
        comment: "Beautiful large reservoir with excellent boating facilities. Perfect for water sports and relaxation.",
        date: "2024-07-15"
      }
    ]
  },
  {
    id: 216,
    name: "Kolebira Hills",
    district: "Simdega",
    type: "hidden",
    category: "hills",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Beautiful hills with panoramic views and trekking opportunities, representing the natural beauty of Simdega.",
    whyFamous: "Known for its scenic trekking trails, panoramic views, and being a hidden gem for nature lovers.",
    keyFeatures: ["Scenic hills", "Trekking trails", "Panoramic views", "Natural beauty", "Hidden gem"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.5300, lng: 84.4300 },
    reviews: [
      {
        author: "Mountain Trekker",
        rating: 4,
        comment: "Excellent hills for trekking with amazing panoramic views. Hidden gem perfect for adventure enthusiasts.",
        date: "2024-06-20"
      }
    ]
  },
  {
    id: 217,
    name: "Jaldega Temple",
    district: "Simdega",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "An ancient temple with spiritual significance and beautiful traditional architecture in the Simdega region.",
    whyFamous: "Known for its ancient spiritual significance, traditional architecture, and being an important pilgrimage site.",
    keyFeatures: ["Ancient temple", "Spiritual significance", "Traditional architecture", "Pilgrimage site", "Religious importance"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "Throughout the year",
    coordinates: { lat: 22.5400, lng: 84.4400 },
    reviews: [
      {
        author: "Temple Visitor",
        rating: 4,
        comment: "Beautiful ancient temple with great spiritual atmosphere. Important pilgrimage site with peaceful environment.",
        date: "2024-08-12"
      }
    ]
  },
  {
    id: 218,
    name: "Bansjor Hills",
    district: "Simdega",
    type: "hidden",
    category: "hills",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Serene hills covered with dense forest, offering trekking opportunities and wildlife spotting.",
    whyFamous: "Known for its dense forest cover, diverse wildlife, and excellent trekking trails for adventure seekers.",
    keyFeatures: ["Dense forest hills", "Wildlife spotting", "Trekking trails", "Natural serenity", "Adventure activity"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.5500, lng: 84.4500 },
    reviews: [
      {
        author: "Wildlife Enthusiast",
        rating: 4,
        comment: "Beautiful forest hills with good wildlife spotting opportunities. Excellent for nature lovers and trekkers.",
        date: "2024-05-18"
      }
    ]
  },
  {
    id: 219,
    name: "Simdega Forest Reserve",
    district: "Simdega",
    type: "famous",
    category: "parks",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A protected forest reserve with rich biodiversity and nature conservation programs.",
    whyFamous: "Important for biodiversity conservation, nature education, and being a protected ecosystem in Simdega district.",
    keyFeatures: ["Protected forest", "Rich biodiversity", "Conservation programs", "Nature education", "Ecosystem protection"],
    entryFee: "₹30 per person",
    timing: "7:00 AM - 5:00 PM",
    bestTime: "November to February",
    coordinates: { lat: 22.5600, lng: 84.4600 },
    reviews: [
      {
        author: "Conservation Supporter",
        rating: 4,
        comment: "Important protected forest with excellent biodiversity. Great for nature education and conservation awareness.",
        date: "2024-04-22"
      }
    ]
  },
  {
    id: 220,
    name: "Thethaitangar Hills",
    district: "Simdega",
    type: "hidden",
    category: "hills",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Remote hills with untouched natural beauty and traditional tribal culture preservation.",
    whyFamous: "Known for preserving traditional tribal culture and offering pristine natural beauty away from crowds.",
    keyFeatures: ["Remote hills", "Untouched nature", "Tribal culture", "Cultural preservation", "Pristine beauty"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 22.5700, lng: 84.4700 },
    reviews: [
      {
        author: "Cultural Explorer",
        rating: 4,
        comment: "Beautiful remote hills with authentic tribal culture. Great for understanding traditional lifestyle and pristine nature.",
        date: "2024-03-15"
      }
    ]
  },
  {
    id: 221,
    name: "Kurdeg Waterfall",
    district: "Simdega",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "A hidden waterfall surrounded by dense forest, offering natural beauty and peaceful environment.",
    whyFamous: "A hidden gem known for its pristine natural setting, peaceful environment, and beautiful waterfall formation.",
    keyFeatures: ["Hidden waterfall", "Dense forest setting", "Natural beauty", "Peaceful environment", "Pristine location"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to November",
    coordinates: { lat: 22.5800, lng: 84.4800 },
    reviews: [
      {
        author: "Waterfall Hunter",
        rating: 4,
        comment: "Beautiful hidden waterfall in pristine forest setting. Perfect peaceful spot for nature lovers.",
        date: "2024-08-25"
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
  const districts = [
    'Khunti', 'Kodarma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi',
    'Sahibganj', 'Saraikela-Kharsawan', 'Simdega', 'West Singhbhum', 'Bokaro', 'Chatra',
    'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda',
    'Gumla', 'Hazaribagh', 'Jamtara'
  ];
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