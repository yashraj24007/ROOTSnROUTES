export interface Restaurant {
  id: number;
  name: string;
  location: string;
  district?: string;
  cuisine: string;
  type?: string;
  category?: string;
  rating: number;
  price: string;
  specialty: string;
  image: string;
  timings: string;
  phone: string;
  dishes: string[];
}

export const allRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Santhal Tribal Kitchen",
    location: "Dumka",
    district: "Dumka",
    cuisine: "Tribal Cuisine",
    type: "restaurant",
    category: "family",
    rating: 4.8,
    price: "₹₹",
    specialty: "Authentic Santhal dishes with organic ingredients",
    image: "https://picsum.photos/400/300?random=1",
    timings: "11:00 AM - 10:00 PM",
    phone: "+91 9876543210",
    dishes: ["Handia Rice", "Pitha", "Mahua Flowers", "Wild Honey"]
  },
  {
    id: 2,
    name: "Jharkhand Thali House",
    location: "Ranchi",
    district: "Ranchi",
    cuisine: "Traditional",
    type: "restaurant",
    category: "family",
    rating: 4.6,
    price: "₹₹",
    specialty: "Complete Jharkhand thali with 15+ items",
    image: "https://picsum.photos/400/300?random=2",
    timings: "12:00 PM - 11:00 PM",
    phone: "+91 9876543211",
    dishes: ["Dhuska", "Aloo Chokha", "Rugra", "Bamboo Shoot Curry"]
  },
  {
    id: 3,
    name: "Munda Heritage Restaurant",
    location: "Khunti",
    cuisine: "Munda Cuisine",
    rating: 4.7,
    price: "₹₹₹",
    specialty: "Traditional Munda recipes passed down generations",
    image: "https://picsum.photos/400/300?random=3",
    timings: "10:00 AM - 9:00 PM",
    phone: "+91 9876543212",
    dishes: ["Chilka Roti", "Kurthi Dal", "Wild Mushrooms", "Forest Greens"]
  },
  {
    id: 4,
    name: "Forest Flavors",
    location: "Jamshedpur",
    district: "Purbi Singhbhum",
    cuisine: "Tribal Fusion",
    type: "restaurant",
    category: "casual",
    rating: 4.5,
    price: "₹₹₹",
    specialty: "Modern twist on traditional tribal recipes",
    image: "https://picsum.photos/400/300?random=4",
    timings: "11:30 AM - 10:30 PM",
    phone: "+91 9876543213",
    dishes: ["Fusion Dhuska", "Tribal Pizza", "Mahua Cocktails", "Modern Pitha"]
  },
  {
    id: 5,
    name: "Paharia Hill Station Cafe",
    location: "Rajmahal Hills",
    district: "Sahibganj",
    cuisine: "Continental & Local",
    type: "cafe",
    category: "casual",
    rating: 4.3,
    price: "₹₹",
    specialty: "Hill station cafe with local tribal flavors",
    image: "https://picsum.photos/400/300?random=5",
    timings: "9:00 AM - 9:00 PM",
    phone: "+91 9876543214",
    dishes: ["Tribal Coffee", "Hill Pancakes", "Local Honey Toast", "Tribal Tea"]
  }
];

export const generateRestaurantId = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

export const findRestaurantById = (id: string): Restaurant | undefined => {
  return allRestaurants.find(restaurant => generateRestaurantId(restaurant.name) === id);
};