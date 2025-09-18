// District-wise tourist destinations data for Jharkhand
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
    name: 'Panchghagh Falls',
    district: 'Khunti',
    category: 'waterfalls',
    type: 'famous',
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/p/AF1QipNtVj8_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A stunning five-tiered waterfall nestled in the dense forests of Khunti, offering a spectacular cascade falling from different levels.',
    whyFamous: 'Famous for its unique five-tier structure where water cascades through multiple levels, creating a mesmerizing natural amphitheater.',
    keyFeatures: [
      'Five-tiered waterfall structure',
      'Dense forest surroundings',
      'Natural swimming pools',
      'Trekking opportunities',
      'Photography hotspot'
    ],
    entryFee: 'Free',
    timing: '6:00 AM - 6:00 PM',
    bestTime: 'July to November (Monsoon to Post-monsoon)',
    reviews: [
      {
        author: 'Rahul Sharma',
        rating: 5,
        comment: 'Absolutely breathtaking! The five-tier fall is a sight to behold. Perfect for nature lovers and photographers.',
        date: '2024-08-15'
      },
      {
        author: 'Priya Singh',
        rating: 4,
        comment: 'Beautiful waterfall but requires a bit of trekking. Worth the effort for the stunning views.',
        date: '2024-07-22'
      }
    ],
    coordinates: { lat: 23.0315, lng: 85.2784 }
  },
  {
    id: 2,
    name: 'Birsa Mrig Vihar (Deer Park)',
    district: 'Khunti',
    category: 'wildlife',
    type: 'famous',
    rating: 4.3,
    image: 'https://lh3.googleusercontent.com/p/AF1QipMzK8FRW5_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A wildlife sanctuary dedicated to the conservation of deer and other local fauna, named after the legendary tribal leader Birsa Munda.',
    whyFamous: 'Named after Birsa Munda, this park is famous for its deer conservation efforts and serves as an important wildlife corridor.',
    keyFeatures: [
      'Large deer population',
      'Wildlife conservation center',
      'Nature trails',
      'Bird watching opportunities',
      'Educational programs'
    ],
    entryFee: '₹20 for adults, ₹10 for children',
    timing: '7:00 AM - 5:00 PM',
    bestTime: 'November to March',
    reviews: [
      {
        author: 'Amit Kumar',
        rating: 4,
        comment: 'Great place for families. Kids loved seeing the deer up close. Well-maintained park.',
        date: '2024-01-10'
      }
    ],
    coordinates: { lat: 23.0400, lng: 85.2800 }
  },
  {
    id: 3,
    name: 'Pandupudding Waterfall',
    district: 'Khunti',
    category: 'waterfalls',
    type: 'hidden',
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/p/AF1QipOvHJ2k_9m3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A hidden gem waterfall surrounded by pristine forests, offering a secluded natural paradise for adventure seekers.',
    whyFamous: 'This hidden waterfall is famous among trekkers and adventure enthusiasts for its untouched natural beauty and challenging trek route.',
    keyFeatures: [
      'Pristine and untouched',
      'Challenging trek route',
      'Crystal clear natural pools',
      'Rich biodiversity',
      'Peaceful and secluded'
    ],
    entryFee: 'Free',
    timing: 'Sunrise to Sunset',
    bestTime: 'August to December',
    reviews: [
      {
        author: 'Adventure Seeker',
        rating: 5,
        comment: 'Hidden paradise! The trek is challenging but absolutely worth it. Pristine and untouched beauty.',
        date: '2024-09-05'
      }
    ],
    location: {
      coordinates: [23.0200, 85.2900],
      address: 'Pandupudding, Khunti District, Jharkhand'
    }
  },
  {
    id: 'khunti-angrabari-temple',
    name: 'Angrabari (Amreshwar Dham) Temple',
    district: 'Khunti',
    category: 'temples',
    type: 'famous',
    rating: 4.5,
    image: 'https://lh3.googleusercontent.com/p/AF1QipP8k_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'An ancient temple complex dedicated to Lord Shiva, known for its spiritual significance and architectural beauty.',
    whyFamous: 'Famous as one of the most revered Shiva temples in Jharkhand, attracting devotees from across the state, especially during Mahashivaratri.',
    keyFeatures: [
      'Ancient Shiva temple',
      'Religious significance',
      'Beautiful architecture',
      'Peaceful environment',
      'Festival celebrations'
    ],
    entryFee: 'Free',
    timing: '5:00 AM - 9:00 PM',
    bestTime: 'Year-round, special during Mahashivaratri',
    reviews: [
      {
        author: 'Devotee Ram',
        rating: 5,
        comment: 'Very peaceful and spiritual place. The temple architecture is beautiful and the environment is serene.',
        date: '2024-02-20'
      }
    ],
    location: {
      coordinates: [23.0500, 85.2700],
      address: 'Angrabari, Khunti District, Jharkhand'
    }
  },

  // KODARMA DISTRICT
  {
    id: 'kodarma-tilaiya-dam',
    name: 'Tilaiya Dam',
    district: 'Kodarma',
    category: 'lakes',
    type: 'famous',
    rating: 4.4,
    image: 'https://lh3.googleusercontent.com/p/AF1QipNvGH7k_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'One of the major dams in Jharkhand, built across the Barakar River, creating a scenic reservoir perfect for water activities.',
    whyFamous: 'Famous for being one of Jharkhand\'s largest dams and a major source of hydroelectric power, also popular for boating and fishing.',
    keyFeatures: [
      'Major hydroelectric dam',
      'Boating facilities',
      'Fishing opportunities',
      'Scenic reservoir views',
      'Water sports activities'
    ],
    entryFee: '₹10 entry, boat rides extra',
    timing: '6:00 AM - 6:00 PM',
    bestTime: 'October to March',
    reviews: [
      {
        author: 'Tourist Guide',
        rating: 4,
        comment: 'Great place for a day trip. The boat ride across the reservoir is really enjoyable.',
        date: '2024-01-15'
      }
    ],
    location: {
      coordinates: [24.2167, 85.8833],
      address: 'Tilaiya, Kodarma District, Jharkhand 825413'
    }
  },
  {
    id: 'kodarma-dhwajadhari-hill',
    name: 'Dhwajadhari Hill',
    district: 'Kodarma',
    category: 'hills',
    type: 'famous',
    rating: 4.2,
    image: 'https://lh3.googleusercontent.com/p/AF1QipMzSH8k_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A prominent hill featuring ancient temples and offering panoramic views of the surrounding landscape.',
    whyFamous: 'Famous for its religious significance with ancient temples at the hilltop and spectacular sunrise/sunset views.',
    keyFeatures: [
      'Ancient hilltop temples',
      'Panoramic valley views',
      'Sunrise/sunset viewpoint',
      'Religious significance',
      'Trekking trails'
    ],
    entryFee: 'Free',
    timing: '5:00 AM - 8:00 PM',
    bestTime: 'November to February',
    reviews: [
      {
        author: 'Hill Climber',
        rating: 4,
        comment: 'Amazing views from the top! The ancient temples add to the spiritual experience.',
        date: '2024-02-28'
      }
    ],
    location: {
      coordinates: [24.4667, 85.5833],
      address: 'Dhwajadhari Hill, Kodarma District, Jharkhand'
    }
  },
  {
    id: 'kodarma-makamaro-hills',
    name: 'Makamaro Hills',
    district: 'Kodarma',
    category: 'hills',
    type: 'hidden',
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/p/AF1QipOkJH5k_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A hidden hill range offering pristine natural beauty, challenging treks, and breathtaking views of the Chota Nagpur plateau.',
    whyFamous: 'Hidden gem known among serious trekkers for its untouched natural beauty and challenging trails through dense forests.',
    keyFeatures: [
      'Challenging trekking routes',
      'Pristine forest cover',
      'Wildlife spotting opportunities',
      'Panoramic plateau views',
      'Photography paradise'
    ],
    entryFee: 'Free',
    timing: 'Sunrise to Sunset',
    bestTime: 'October to March',
    reviews: [
      {
        author: 'Trek Master',
        rating: 5,
        comment: 'Incredible hidden gem! The trek is challenging but the views are absolutely worth it. Pure nature at its best.',
        date: '2024-03-10'
      }
    ],
    location: {
      coordinates: [24.4500, 85.6000],
      address: 'Makamaro Hills, Kodarma District, Jharkhand'
    }
  },

  // LATEHAR DISTRICT  
  {
    id: 'latehar-lodh-falls',
    name: 'Lodh (Budhaghaugh) Waterfalls',
    district: 'Latehar',
    category: 'waterfalls',
    type: 'famous',
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/p/AF1QipNRK8vk_Xm3YjGzWPzQfQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'The highest waterfall in Jharkhand, cascading from a height of 143 meters, creating a spectacular natural wonder.',
    whyFamous: 'Famous as Jharkhand\'s highest waterfall and one of India\'s tallest waterfalls, attracting visitors with its massive 143-meter drop.',
    keyFeatures: [
      'Jharkhand\'s highest waterfall (143m)',
      'Spectacular natural amphitheater',
      'Rainbow formation in mist',
      'Adventure photography spot',
      'Monsoon spectacle'
    ],
    entryFee: 'Free',
    timing: '6:00 AM - 6:00 PM',
    bestTime: 'July to November',
    reviews: [
      {
        author: 'Nature Photographer',
        rating: 5,
        comment: 'Absolutely stunning! The highest waterfall in Jharkhand is a must-visit. The rainbow in the mist is magical.',
        date: '2024-08-20'
      },
      {
        author: 'Adventure Tourist',
        rating: 5,
        comment: 'Breathtaking experience! The sound and sight of water falling from 143 meters is incredible.',
        date: '2024-09-01'
      }
    ],
    location: {
      coordinates: [23.9167, 84.5833],
      address: 'Lodh Falls, Latehar District, Jharkhand 822124'
    }
  },
  {
    id: 'latehar-netarhat',
    name: 'Netarhat Hill Station',
    district: 'Latehar',
    category: 'hills',
    type: 'famous',
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/p/AF1QipOHJ2k_Xm3YjGzWPzQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'Known as the "Queen of Chotanagpur", this hill station offers cool climate, scenic beauty, and spectacular sunrise views.',
    whyFamous: 'Famous as the "Queen of Chotanagpur" for its pleasant climate, magnificent sunrise/sunset views, and colonial-era charm.',
    keyFeatures: [
      'Queen of Chotanagpur',
      'Spectacular sunrise views',
      'Pleasant cool climate',
      'Colonial architecture',
      'Scenic valley views'
    ],
    entryFee: 'Free',
    timing: '24/7 (viewpoints accessible till sunset)',
    bestTime: 'October to March',
    reviews: [
      {
        author: 'Hill Station Lover',
        rating: 5,
        comment: 'The sunrise view from Netarhat is absolutely magical! Truly the Queen of Chotanagpur.',
        date: '2024-01-25'
      }
    ],
    location: {
      coordinates: [23.4667, 84.2500],
      address: 'Netarhat, Latehar District, Jharkhand 822124'
    }
  },
  {
    id: 'latehar-tubed-cave',
    name: 'Tubed Cave',
    district: 'Latehar',
    category: 'heritage',
    type: 'hidden',
    rating: 4.5,
    image: 'https://lh3.googleusercontent.com/p/AF1QipPLK9vk_Xm3YjGzWPzQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A mysterious natural cave system with unique rock formations and underground chambers, perfect for spelunking enthusiasts.',
    whyFamous: 'Hidden cave system famous among adventure enthusiasts and spelunkers for its unique tubular rock formations and mysterious chambers.',
    keyFeatures: [
      'Natural cave system',
      'Unique tubular formations',
      'Underground chambers',
      'Spelunking opportunities',
      'Geological significance'
    ],
    entryFee: 'Free',
    timing: 'Daylight hours only',
    bestTime: 'November to March',
    reviews: [
      {
        author: 'Cave Explorer',
        rating: 5,
        comment: 'Fascinating hidden cave! Perfect for adventure lovers. The rock formations are incredible.',
        date: '2024-02-15'
      }
    ],
    location: {
      coordinates: [23.4500, 84.3000],
      address: 'Tubed Cave, Latehar District, Jharkhand'
    }
  },

  // LOHARDAGA DISTRICT
  {
    id: 'lohardaga-lavapani-waterfall',
    name: 'Lavapani Waterfall',
    district: 'Lohardaga',
    category: 'waterfalls',
    type: 'famous',
    rating: 4.4,
    image: 'https://lh3.googleusercontent.com/p/AF1QipMzK8Fk_Xm3YjGzWPzQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A beautiful multi-tiered waterfall surrounded by lush green forests, offering a perfect retreat for nature lovers.',
    whyFamous: 'Famous for its multi-tiered cascade structure and the therapeutic properties attributed to its mineral-rich waters.',
    keyFeatures: [
      'Multi-tiered waterfall',
      'Mineral-rich waters',
      'Dense forest surroundings',
      'Natural therapy spot',
      'Photography location'
    ],
    entryFee: 'Free',
    timing: '6:00 AM - 6:00 PM',
    bestTime: 'July to December',
    reviews: [
      {
        author: 'Nature Healer',
        rating: 4,
        comment: 'Beautiful waterfall with supposedly therapeutic waters. The forest setting is very peaceful.',
        date: '2024-08-30'
      }
    ],
    location: {
      coordinates: [23.4167, 84.6833],
      address: 'Lavapani, Lohardaga District, Jharkhand 835302'
    }
  },
  {
    id: 'lohardaga-victoria-lake',
    name: 'Victoria Lake',
    district: 'Lohardaga',
    category: 'lakes',
    type: 'famous',
    rating: 4.3,
    image: 'https://lh3.googleusercontent.com/p/AF1QipOHJ2k_9m3YjGzWPzQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A serene artificial lake created during the British era, perfect for boating and peaceful evening walks.',
    whyFamous: 'Famous as a colonial-era lake named after Queen Victoria, popular for its scenic beauty and recreational activities.',
    keyFeatures: [
      'Colonial-era heritage',
      'Boating facilities',
      'Evening walk pathways',
      'Scenic surroundings',
      'Peaceful environment'
    ],
    entryFee: '₹10 entry, boat charges separate',
    timing: '6:00 AM - 7:00 PM',
    bestTime: 'October to March',
    reviews: [
      {
        author: 'History Buff',
        rating: 4,
        comment: 'Nice historical lake with colonial charm. Great for evening walks and boat rides.',
        date: '2024-02-10'
      }
    ],
    location: {
      coordinates: [23.4333, 84.6667],
      address: 'Victoria Lake, Lohardaga, Jharkhand 835302'
    }
  },
  {
    id: 'lohardaga-dhardhari-waterfall',
    name: 'Dhardhari Waterfall',
    district: 'Lohardaga',
    category: 'waterfalls',
    type: 'hidden',
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/p/AF1QipPzK8Fk_Xm3YjGzWPzQJ9HkN5p6ZRVJQoXMWEy=s1600-w1600-h1600',
    description: 'A secluded waterfall hidden in dense forests, accessible only through adventurous trekking routes.',
    whyFamous: 'Hidden gem known for its pristine beauty and the adventurous trek required to reach it, popular among serious nature enthusiasts.',
    keyFeatures: [
      'Secluded location',
      'Adventure trekking required',
      'Pristine natural beauty',
      'Crystal clear water',
      'Wildlife spotting opportunities'
    ],
    entryFee: 'Free',
    timing: 'Daylight hours',
    bestTime: 'August to January',
    reviews: [
      {
        author: 'Trek Enthusiast',
        rating: 5,
        comment: 'Amazing hidden waterfall! The trek is challenging but the pristine beauty makes it absolutely worth it.',
        date: '2024-09-15'
      }
    ],
    location: {
      coordinates: [23.4000, 84.7000],
      address: 'Dhardhari, Lohardaga District, Jharkhand'
    }
  }
];

export const getDestinationsByDistrict = (district: string): Destination[] => {
  return districtsData.filter(dest => dest.district === district);
};

export const getDestinationsByType = (type: 'famous' | 'hidden'): Destination[] => {
  return districtsData.filter(dest => dest.type === type);
};

export const getDestinationsByCategory = (category: string): Destination[] => {
  return districtsData.filter(dest => dest.category === category);
};