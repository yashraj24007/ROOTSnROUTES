// District-wise tourist destinations data for Jharkhand - Updated Version
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

export const districtsData: Destination[] = [
  // KHUNTI DISTRICT
  {
    id: 1,
    name: "Hundru Falls",
    district: "Khunti",
    type: "famous",
    category: "waterfalls",
    rating: 4.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Hundru_Falls%2C_Jharkhand.jpg/1200px-Hundru_Falls%2C_Jharkhand.jpg",
    description: "One of the highest waterfalls in Jharkhand, Hundru Falls cascades from a height of 98 meters (320 feet). The waterfall is formed by the Subarnarekha River and offers breathtaking views especially during the monsoon season.",
    whyFamous: "Known as the 74th highest waterfall in India and one of Jharkhand's most spectacular natural attractions, drawing thousands of visitors annually for its majestic beauty and trekking opportunities.",
    keyFeatures: ["98m high waterfall", "Trekking trails", "Photography spots", "Natural pools", "Monsoon beauty", "Rock formations"],
    entryFee: "₹20 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to October (Monsoon season)",
    coordinates: { lat: 23.4726, lng: 85.5986 },
    reviews: [
      {
        author: "Adventure Seeker Raj",
        rating: 5,
        comment: "Absolutely breathtaking! The trek down is adventurous and the waterfall is magnificent. Best visited during monsoon when it's at full flow.",
        date: "2024-08-15"
      },
      {
        author: "Nature Photographer Maya",
        rating: 4,
        comment: "Perfect spot for photography. The sound of cascading water and misty atmosphere create magical moments. Carry proper trekking shoes.",
        date: "2024-07-22"
      }
    ]
  },
  {
    id: 2,
    name: "Jonha Falls (Gautamdhara)",
    district: "Khunti",
    type: "famous",
    category: "waterfalls",
    rating: 4.2,
    image: "https://www.jharkhandtourism.gov.in/content/dam/investjharkhand/tourism-department/destinations/jonha-falls/jonha-falls-banner.jpg",
    description: "A serene waterfall located about 40 km from Ranchi, Jonha Falls is also known as Gautamdhara. The water cascades from a height of about 43 meters, creating a beautiful misty environment surrounded by dense forests.",
    whyFamous: "Named after Gautam Buddha who is believed to have meditated here, making it both a natural wonder and a spiritual destination with historical significance.",
    keyFeatures: ["43m waterfall", "Buddha meditation site", "Dense forest", "Natural swimming pool", "Spiritual significance", "Easy accessibility"],
    entryFee: "₹15 per person",
    timing: "7:00 AM - 5:30 PM",
    bestTime: "June to September",
    coordinates: { lat: 23.5629, lng: 85.4419 },
    reviews: [
      {
        author: "Spiritual Traveler Arjun",
        rating: 4,
        comment: "Peaceful and spiritual place. The waterfall is beautiful and the legend of Buddha adds to its charm. Good for meditation and relaxation.",
        date: "2024-08-10"
      }
    ]
  },
  {
    id: 3,
    name: "Panchghagh Falls",
    district: "Khunti",
    type: "hidden",
    category: "waterfalls",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=800&h=600&fit=crop&crop=center",
    description: "A lesser-known gem where five streams converge to form a spectacular waterfall. The name 'Panchghagh' literally means 'five streams' in local language. This pristine location offers tranquility away from crowded tourist spots.",
    whyFamous: "Unique formation where five different streams merge into one magnificent waterfall, creating a rare natural phenomenon that's largely unexplored by mainstream tourism.",
    keyFeatures: ["Five streams convergence", "Untouched natural beauty", "Crystal clear water", "Dense jungle", "Wildlife spotting", "Photography paradise"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "July to September",
    coordinates: { lat: 23.4932, lng: 85.6243 },
    reviews: [
      {
        author: "Hidden Gems Explorer",
        rating: 5,
        comment: "Absolutely stunning hidden waterfall! The trek is challenging but worth every step. Perfect for those seeking offbeat destinations.",
        date: "2024-07-30"
      }
    ]
  },
  {
    id: 4,
    name: "Sita Falls",
    district: "Khunti",
    type: "hidden",
    category: "waterfalls",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    description: "A secluded waterfall nestled deep in the forests of Khunti district. Legend says that Goddess Sita rested here during her exile, giving the waterfall its name. The pristine natural environment makes it perfect for nature lovers.",
    whyFamous: "Mythological significance linked to Ramayana and its untouched natural beauty, making it a perfect blend of spirituality and nature for adventurous travelers.",
    keyFeatures: ["Mythological importance", "Pristine nature", "Secluded location", "Natural bathing pool", "Forest trek", "Spiritual ambiance"],
    entryFee: "Free",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "June to October",
    coordinates: { lat: 23.4567, lng: 85.6123 },
    reviews: [
      {
        author: "Mythology Enthusiast Priya",
        rating: 4,
        comment: "Beautiful secluded waterfall with rich mythology. The trek through forest is adventurous and the falls are pristine.",
        date: "2024-08-05"
      }
    ]
  },
  {
    id: 5,
    name: "Ranchi Hill (Pahari Mandir)",
    district: "Khunti",
    type: "famous",
    category: "temples",
    rating: 4.1,
    image: "https://www.ranchidiaries.com/wp-content/uploads/2019/12/ranchi-hill-temple.jpg",
    description: "Situated at a height of 2140 feet, this ancient Shiva temple offers panoramic views of Ranchi city. The temple is accessed by climbing 468 steps or by road. It's a perfect blend of spirituality and scenic beauty.",
    whyFamous: "Ancient hilltop Shiva temple providing the best panoramic views of Ranchi city, making it a popular pilgrimage site and viewpoint for both devotees and tourists.",
    keyFeatures: ["Hilltop temple", "468 steps climb", "Panoramic city views", "Ancient architecture", "Sunrise/sunset views", "Cable car facility"],
    entryFee: "Free (Parking: ₹10)",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "October to March",
    coordinates: { lat: 23.3441, lng: 85.3096 },
    reviews: [
      {
        author: "Temple Devotee Ramesh",
        rating: 4,
        comment: "Peaceful temple with amazing city views. The climb is worth it for the spiritual experience and beautiful sunset views.",
        date: "2024-08-20"
      }
    ]
  },

  // KODARMA DISTRICT
  {
    id: 6,
    name: "Koderma Wildlife Sanctuary",
    district: "Kodarma",
    type: "famous",
    category: "wildlife",
    rating: 4.0,
    image: "https://www.jharkhandtourism.gov.in/content/dam/investjharkhand/tourism-department/destinations/koderma-wildlife-sanctuary/koderma-wildlife-sanctuary-banner.jpg",
    description: "Spread over an area of 177.95 sq km, this wildlife sanctuary is home to various species including leopards, wild boars, deer, and numerous bird species. The sanctuary offers excellent opportunities for wildlife photography and nature walks.",
    whyFamous: "One of Jharkhand's important wildlife corridors, known for leopard sightings and being a paradise for birdwatchers with over 70 bird species recorded.",
    keyFeatures: ["Leopard habitat", "70+ bird species", "Nature trails", "Wildlife photography", "Forest safari", "Eco-tourism"],
    entryFee: "₹50 per person, ₹200 for camera",
    timing: "6:00 AM - 5:00 PM",
    bestTime: "November to March",
    coordinates: { lat: 24.4681, lng: 85.5986 },
    reviews: [
      {
        author: "Wildlife Photographer Sam",
        rating: 4,
        comment: "Great place for wildlife enthusiasts. Spotted leopards and many bird species. The forest is well-maintained and guides are knowledgeable.",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 7,
    name: "Tilaiya Dam",
    district: "Kodarma",
    type: "famous",
    category: "lakes",
    rating: 3.9,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Tilaiya_Dam.jpg/1200px-Tilaiya_Dam.jpg",
    description: "Built across the Barakar River, Tilaiya Dam is one of the oldest dams in India. The reservoir offers boating facilities and the surrounding area is perfect for picnics. The dam also has historical significance in India's industrial development.",
    whyFamous: "One of India's oldest dams with significant role in the country's industrial development, offering scenic beauty, boating activities, and historical importance.",
    keyFeatures: ["Historic dam", "Boating facility", "Scenic reservoir", "Picnic spots", "Industrial heritage", "Photography"],
    entryFee: "₹20 per person, ₹100 for boating",
    timing: "8:00 AM - 6:00 PM",
    bestTime: "October to February",
    coordinates: { lat: 24.4103, lng: 85.7219 },
    reviews: [
      {
        author: "History Buff Anjali",
        rating: 4,
        comment: "Beautiful dam with rich history. Boating was enjoyable and the sunset views are spectacular. Great for family outings.",
        date: "2024-02-10"
      }
    ]
  },
  {
    id: 8,
    name: "Koderma Caves (Hidden Jain Caves)",
    district: "Kodarma",
    type: "hidden",
    category: "heritage",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center",
    description: "Ancient caves carved into rocky hillsides, believed to be meditation retreats for Jain monks centuries ago. These lesser-known caves feature intricate rock-cut architecture and offer insights into the region's spiritual heritage.",
    whyFamous: "Rare example of Jain cave architecture in Jharkhand, providing glimpses into ancient spiritual practices and architectural techniques of medieval period.",
    keyFeatures: ["Ancient Jain caves", "Rock-cut architecture", "Meditation chambers", "Historical inscriptions", "Archaeological value", "Spiritual heritage"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "October to March",
    coordinates: { lat: 24.4521, lng: 85.6789 },
    reviews: [
      {
        author: "Heritage Explorer Vikash",
        rating: 4,
        comment: "Fascinating hidden caves with amazing architecture. Not many visitors, so you can explore peacefully. Historical significance is remarkable.",
        date: "2024-01-28"
      }
    ]
  },

  // LATEHAR DISTRICT
  {
    id: 9,
    name: "Betla National Park",
    district: "Latehar",
    type: "famous",
    category: "wildlife",
    rating: 4.3,
    image: "https://www.jharkhandtourism.gov.in/content/dam/investjharkhand/tourism-department/destinations/betla-national-park/betla-national-park-banner.jpg",
    description: "Part of Palamu Tiger Reserve, Betla National Park is famous for its tiger population, elephants, leopards, and diverse flora. The park offers jeep safari, elephant safari, and nature walks through dense Sal forests.",
    whyFamous: "First tiger reserve of Jharkhand and part of Project Tiger, renowned for successful tiger conservation efforts and diverse wildlife including the majestic Royal Bengal Tigers.",
    keyFeatures: ["Tiger reserve", "Elephant safari", "Jeep safari", "Sal forests", "Wildlife diversity", "Conservation success"],
    entryFee: "₹100 per person, ₹1500 for jeep safari",
    timing: "6:00 AM - 11:00 AM, 3:00 PM - 6:00 PM",
    bestTime: "November to May",
    coordinates: { lat: 23.9167, lng: 84.2000 },
    reviews: [
      {
        author: "Tiger Enthusiast Ravi",
        rating: 5,
        comment: "Incredible wildlife experience! Spotted tigers and elephants during safari. The forest is pristine and guides are excellent. Must visit!",
        date: "2024-03-05"
      }
    ]
  },
  {
    id: 10,
    name: "Lodh Falls (Budha Ghagh)",
    district: "Latehar",
    type: "famous",
    category: "waterfalls",
    rating: 4.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Lodh_Falls.jpg/1200px-Lodh_Falls.jpg",
    description: "The highest waterfall in Jharkhand at 143 meters (469 feet), Lodh Falls is a spectacular sight especially during monsoons. The waterfall is formed by the Budha River and offers breathtaking views and trekking opportunities.",
    whyFamous: "Highest waterfall in Jharkhand and among the highest in India, attracting adventure seekers and nature photographers for its dramatic height and pristine surroundings.",
    keyFeatures: ["143m high waterfall", "Highest in Jharkhand", "Adventure trekking", "Photography hotspot", "Natural pools", "Monsoon spectacle"],
    entryFee: "₹30 per person",
    timing: "6:00 AM - 6:00 PM",
    bestTime: "July to September",
    coordinates: { lat: 23.5167, lng: 84.1500 },
    reviews: [
      {
        author: "Adventure Blogger Sneha",
        rating: 5,
        comment: "Absolutely stunning! The highest waterfall in Jharkhand is a sight to behold. Trek is challenging but the view is worth every step.",
        date: "2024-08-12"
      }
    ]
  },
  {
    id: 11,
    name: "Magnolia Point (Hidden Sunset Point)",
    district: "Latehar",
    type: "hidden",
    category: "hills",
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1506145482053-9de2eba4fbb4?w=800&h=600&fit=crop&crop=center",
    description: "A secluded hilltop offering panoramic views of the Palamu landscape. This hidden gem is perfect for sunrise and sunset photography, surrounded by dense forests and offering a 360-degree view of the region.",
    whyFamous: "Secret viewpoint known only to local trekkers, offering some of the most spectacular sunrise and sunset views in the entire Palamu region without tourist crowds.",
    keyFeatures: ["360-degree views", "Sunrise/sunset point", "Secluded location", "Trekking trails", "Photography paradise", "Forest camping"],
    entryFee: "Free",
    timing: "24 hours (camping allowed)",
    bestTime: "October to February",
    coordinates: { lat: 23.8456, lng: 84.1234 },
    reviews: [
      {
        author: "Sunset Chaser Kabir",
        rating: 5,
        comment: "Hidden paradise! One of the best sunset points I've ever been to. Completely secluded and peaceful. Perfect for photography.",
        date: "2024-02-20"
      }
    ]
  },

  // LOHARDAGA DISTRICT
  {
    id: 12,
    name: "Kauleshwari Devi Temple",
    district: "Lohardaga",
    type: "famous",
    category: "temples",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&crop=center",
    description: "An ancient temple dedicated to Goddess Kauleshwari, located on a hilltop offering scenic views of the surrounding landscape. The temple is known for its spiritual significance and architectural beauty.",
    whyFamous: "Ancient hilltop temple with over 500 years of history, known for fulfilling devotees' wishes and its strategic location offering panoramic views of Lohardaga district.",
    keyFeatures: ["Ancient temple", "Hilltop location", "Spiritual significance", "Architectural beauty", "Scenic views", "Annual festivals"],
    entryFee: "Free",
    timing: "5:00 AM - 9:00 PM",
    bestTime: "September to March",
    coordinates: { lat: 23.4333, lng: 84.6833 },
    reviews: [
      {
        author: "Devotee Lakshmi",
        rating: 4,
        comment: "Very peaceful and spiritual place. The temple architecture is beautiful and the hilltop location provides great views of the city.",
        date: "2024-03-15"
      }
    ]
  },
  {
    id: 13,
    name: "Netarhat (Queen of Chotanagpur)",
    district: "Lohardaga",
    type: "famous",
    category: "hills",
    rating: 4.5,
    image: "https://www.jharkhandtourism.gov.in/content/dam/investjharkhand/tourism-department/destinations/netarhat/netarhat-banner.jpg",
    description: "Known as the 'Queen of Chotanagpur', Netarhat is a beautiful hill station famous for its sunrise and sunset views. The cool climate and scenic beauty make it a popular destination for nature lovers.",
    whyFamous: "Queen of Chotanagpur plateau, renowned for spectacular sunrise and sunset views from Magnolia Point, and being Jharkhand's most popular hill station with colonial-era charm.",
    keyFeatures: ["Hill station", "Sunrise/sunset views", "Cool climate", "Magnolia Point", "Pine forests", "Colonial architecture"],
    entryFee: "Free",
    timing: "24 hours",
    bestTime: "October to March",
    coordinates: { lat: 23.4667, lng: 84.2500 },
    reviews: [
      {
        author: "Hill Station Lover Meera",
        rating: 5,
        comment: "Absolutely beautiful hill station! The sunrise and sunset views are breathtaking. Cool climate is perfect for relaxation.",
        date: "2024-02-28"
      }
    ]
  },
  {
    id: 14,
    name: "Serenity Valley (Hidden Forest Valley)",
    district: "Lohardaga",
    type: "hidden",
    category: "parks",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    description: "A secluded valley surrounded by dense forests, perfect for eco-tourism and nature walks. This hidden gem offers tranquility away from the crowds and is home to diverse flora and fauna.",
    whyFamous: "Completely unexplored valley known only to local forest guides, offering pristine wilderness experience with rare medicinal plants and undisturbed wildlife habitat.",
    keyFeatures: ["Pristine wilderness", "Medicinal plants", "Wildlife habitat", "Eco-tourism", "Nature photography", "Forest camping"],
    entryFee: "Free (Guide recommended: ₹300/day)",
    timing: "Sunrise to Sunset",
    bestTime: "November to February",
    coordinates: { lat: 23.3890, lng: 84.7123 },
    reviews: [
      {
        author: "Eco Tourist Rahul",
        rating: 4,
        comment: "Amazing hidden valley! Perfect for those seeking untouched nature. The biodiversity here is incredible and it's completely peaceful.",
        date: "2024-01-18"
      }
    ]
  },

  // Additional destinations to complete the collection
  {
    id: 15,
    name: "Subarnarekha River Origin",
    district: "Lohardaga",
    type: "hidden",
    category: "heritage",
    rating: 3.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    description: "The origin point of the famous Subarnarekha River (Golden Line River), surrounded by hills and forests. This sacred spot has mythological significance and offers pristine natural beauty.",
    whyFamous: "Birthplace of Subarnarekha River with mythological significance as mentioned in ancient texts, and known for its natural purity where the river starts its 395km journey to Bay of Bengal.",
    keyFeatures: ["River origin", "Mythological importance", "Sacred spot", "Natural spring", "Forest surroundings", "Photography spot"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "October to April",
    coordinates: { lat: 23.4102, lng: 84.6891 },
    reviews: [
      {
        author: "River Explorer Deepak",
        rating: 4,
        comment: "Sacred and beautiful place where Subarnarekha begins. Very peaceful and spiritually uplifting. Great for meditation and photography.",
        date: "2024-03-10"
      }
    ]
  },
  {
    id: 16,
    name: "Ghagri Falls (Secret Cascade)",
    district: "Kodarma",
    type: "hidden",
    category: "waterfalls",
    rating: 3.7,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&crop=center",
    description: "A hidden waterfall cascading through rocky terrain in the heart of Kodarma forests. Known only to locals, this pristine waterfall offers crystal clear water and natural rock pools perfect for a refreshing dip.",
    whyFamous: "Completely undiscovered cascade hidden deep in Kodarma forests, known for its pristine water quality and natural rock formations creating perfect natural swimming pools.",
    keyFeatures: ["Hidden cascade", "Natural rock pools", "Crystal clear water", "Forest trek", "Swimming spot", "Untouched beauty"],
    entryFee: "Free",
    timing: "Sunrise to Sunset",
    bestTime: "July to October",
    coordinates: { lat: 24.4789, lng: 85.6234 },
    reviews: [
      {
        author: "Secret Spots Hunter Nisha",
        rating: 5,
        comment: "Incredible hidden waterfall! The trek through forest is adventurous and the falls are absolutely pristine. Perfect natural swimming pool!",
        date: "2024-07-25"
      }
    ]
  },
  {
    id: 17,
    name: "Ancient Tribal Village (Kurukh Heritage)",
    district: "Latehar",
    type: "hidden",
    category: "heritage",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center",
    description: "A living tribal village where the indigenous Kurukh (Oraon) community preserves their ancient traditions, crafts, and lifestyle. Visitors can experience authentic tribal culture, traditional dances, and local cuisine.",
    whyFamous: "One of the few remaining authentic tribal settlements where visitors can experience 2000-year-old Kurukh traditions, indigenous crafts, and participate in traditional festivals and ceremonies.",
    keyFeatures: ["Authentic tribal culture", "Traditional crafts", "Indigenous lifestyle", "Cultural immersion", "Traditional festivals", "Local cuisine"],
    entryFee: "₹50 per person (Community tourism fee)",
    timing: "8:00 AM - 6:00 PM (Advance booking required)",
    bestTime: "November to March",
    coordinates: { lat: 23.7845, lng: 84.0923 },
    reviews: [
      {
        author: "Cultural Explorer Pradeep",
        rating: 5,
        comment: "Incredible cultural experience! The tribal community is very welcoming and their traditions are fascinating. Learned so much about indigenous lifestyle.",
        date: "2024-02-15"
      }
    ]
  }
];

// Utility functions for filtering destinations
export const getDestinationsByDistrict = (district: string): Destination[] => {
  return districtsData.filter(dest => dest.district === district);
};

export const getDestinationsByType = (type: 'famous' | 'hidden'): Destination[] => {
  return districtsData.filter(dest => dest.type === type);
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  return districtsData.filter(dest => dest.category === category);
};

export const getFeaturedDestinations = (): Destination[] => {
  return districtsData.filter(dest => dest.rating >= 4.0);
};

export const getHiddenGems = (): Destination[] => {
  return districtsData.filter(dest => dest.type === 'hidden');
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