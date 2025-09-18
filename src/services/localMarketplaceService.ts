// Local Marketplace Service for tribal handicrafts, homestays, events, and ecotourism packages
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'handicraft' | 'homestay' | 'event' | 'ecotour' | 'food' | 'souvenir';
  vendorId: string;
  vendorName: string;
  images: string[];
  district: string;
  rating: number;
  reviews: Review[];
  availability: boolean;
  inStock?: number;
  features?: string[];
  duration?: string; // for events/tours
  capacity?: number; // for homestays/tours
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  category: 'artisan' | 'homestay_owner' | 'tour_operator' | 'event_organizer' | 'food_vendor';
  district: string;
  address: string;
  verified: boolean;
  rating: number;
  totalProducts: number;
  totalSales: number;
  joinedAt: string;
  avatar?: string;
  specialties: string[];
  certifications: string[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  vendorId: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  orderDate: string;
  expectedDate?: string;
  deliveryAddress?: string;
  specialRequests?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
  helpful: number;
}

class LocalMarketplaceService {
  private mockProducts: Product[] = [
    {
      id: 'prod_001',
      name: 'Hand-woven Sohrai Art Wall Hanging',
      description: 'Traditional tribal art depicting harvest festival themes, hand-painted by Santhal artisans using natural colors.',
      price: 1200,
      category: 'handicraft',
      vendorId: 'vendor_001',
      vendorName: 'Kamala Soren Handicrafts',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400'
      ],
      district: 'Hazaribagh',
      rating: 4.8,
      reviews: [],
      availability: true,
      inStock: 15,
      features: ['Handmade', 'Natural colors', 'Tribal authentic', 'Ready to hang'],
      tags: ['sohrai', 'tribal-art', 'wall-decor', 'handmade'],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    },
    {
      id: 'prod_002',
      name: 'Eco-friendly Bamboo Homestay',
      description: 'Experience authentic tribal village life in our eco-friendly bamboo huts. Includes traditional meals and cultural activities.',
      price: 2500,
      category: 'homestay',
      vendorId: 'vendor_002',
      vendorName: 'Munda Village Homestay',
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
      ],
      district: 'Khunti',
      rating: 4.6,
      reviews: [],
      availability: true,
      capacity: 6,
      features: ['Traditional meals', 'Cultural activities', 'Nature walks', 'Organic farming'],
      tags: ['homestay', 'eco-tourism', 'tribal-experience', 'nature'],
      location: {
        lat: 23.0315,
        lng: 85.2784,
        address: 'Munda Village, Khunti, Jharkhand'
      },
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-18T16:45:00Z'
    },
    {
      id: 'prod_003',
      name: 'Karma Festival Cultural Tour',
      description: 'Join the vibrant Karma festival celebrations with traditional dance, music, and rituals. Includes meals and local guide.',
      price: 1800,
      category: 'event',
      vendorId: 'vendor_003',
      vendorName: 'Jharkhand Cultural Tours',
      images: [
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400'
      ],
      district: 'Ranchi',
      rating: 4.9,
      reviews: [],
      availability: true,
      duration: '1 day',
      capacity: 25,
      features: ['Traditional dance', 'Local cuisine', 'Cultural guide', 'Transportation'],
      tags: ['festival', 'cultural-tour', 'karma', 'traditional'],
      location: {
        lat: 23.3441,
        lng: 85.3096,
        address: 'Ranchi Cultural Center, Jharkhand'
      },
      createdAt: '2024-01-12T12:00:00Z',
      updatedAt: '2024-01-22T10:15:00Z'
    },
    {
      id: 'prod_004',
      name: 'Dokra Metal Craft Elephant',
      description: 'Traditional lost-wax casting technique elephant sculpture made by skilled tribal artisans.',
      price: 850,
      category: 'handicraft',
      vendorId: 'vendor_004',
      vendorName: 'Tribal Art Collective',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      district: 'West Singhbhum',
      rating: 4.7,
      reviews: [],
      availability: true,
      inStock: 8,
      features: ['Traditional dokra art', 'Antique finish', 'Handcrafted', 'Unique design'],
      tags: ['dokra', 'metal-craft', 'elephant', 'tribal-art'],
      createdAt: '2024-01-08T14:00:00Z',
      updatedAt: '2024-01-19T11:20:00Z'
    },
    {
      id: 'prod_005',
      name: 'Waterfalls Trek & Picnic Package',
      description: 'Guided trek to hidden waterfalls with picnic lunch and nature photography session.',
      price: 1200,
      category: 'ecotour',
      vendorId: 'vendor_005',
      vendorName: 'Adventure Jharkhand',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      ],
      district: 'Khunti',
      rating: 4.5,
      reviews: [],
      availability: true,
      duration: '6 hours',
      capacity: 15,
      features: ['Professional guide', 'Picnic lunch', 'Photography tips', 'Safety equipment'],
      tags: ['trekking', 'waterfalls', 'nature', 'photography'],
      location: {
        lat: 23.0315,
        lng: 85.2784,
        address: 'Panchghagh Falls, Khunti'
      },
      createdAt: '2024-01-05T09:30:00Z',
      updatedAt: '2024-01-21T15:10:00Z'
    }
  ];

  private mockVendors: Vendor[] = [
    {
      id: 'vendor_001',
      name: 'Kamala Soren',
      email: 'kamala.soren@example.com',
      phone: '+91-9876543201',
      description: 'Third-generation Sohrai artist specializing in traditional tribal wall paintings and handicrafts.',
      category: 'artisan',
      district: 'Hazaribagh',
      address: 'Isko Village, Hazaribagh, Jharkhand',
      verified: true,
      rating: 4.8,
      totalProducts: 25,
      totalSales: 150,
      joinedAt: '2023-06-15T00:00:00Z',
      specialties: ['Sohrai Art', 'Natural Dyes', 'Wall Paintings'],
      certifications: ['Tribal Artisan Certificate', 'Fair Trade Certified']
    },
    {
      id: 'vendor_002',
      name: 'Ravi Munda',
      email: 'ravi.munda@example.com',
      phone: '+91-9876543202',
      description: 'Eco-tourism advocate offering authentic tribal village experiences and sustainable homestays.',
      category: 'homestay_owner',
      district: 'Khunti',
      address: 'Munda Village, Khunti, Jharkhand',
      verified: true,
      rating: 4.6,
      totalProducts: 3,
      totalSales: 75,
      joinedAt: '2023-08-20T00:00:00Z',
      specialties: ['Village Tourism', 'Organic Farming', 'Cultural Activities'],
      certifications: ['Tourism Board Certified', 'Eco-Tourism Award']
    }
  ];

  async getProducts(filters?: {
    category?: string;
    district?: string;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
  }): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    let products = [...this.mockProducts];

    if (filters) {
      if (filters.category && filters.category !== 'all') {
        products = products.filter(p => p.category === filters.category);
      }
      
      if (filters.district) {
        products = products.filter(p => p.district.toLowerCase().includes(filters.district!.toLowerCase()));
      }
      
      if (filters.minPrice !== undefined) {
        products = products.filter(p => p.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice !== undefined) {
        products = products.filter(p => p.price <= filters.maxPrice!);
      }
      
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.includes(query))
        );
      }
    }

    return products.sort((a, b) => b.rating - a.rating);
  }

  async getProductById(productId: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockProducts.find(p => p.id === productId) || null;
  }

  async getVendors(): Promise<Vendor[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...this.mockVendors];
  }

  async getVendorById(vendorId: string): Promise<Vendor | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockVendors.find(v => v.id === vendorId) || null;
  }

  async createOrder(orderData: Omit<Order, 'id' | 'orderDate'>): Promise<Order> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const order: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderDate: new Date().toISOString()
    };

    // In real implementation, save to database
    console.log('Order created:', order);
    
    return order;
  }

  async registerVendor(vendorData: Omit<Vendor, 'id' | 'verified' | 'rating' | 'totalProducts' | 'totalSales' | 'joinedAt'>): Promise<Vendor> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const vendor: Vendor = {
      ...vendorData,
      id: `vendor_${Date.now()}`,
      verified: false,
      rating: 0,
      totalProducts: 0,
      totalSales: 0,
      joinedAt: new Date().toISOString()
    };

    // In real implementation, save to database and start verification process
    console.log('Vendor registered:', vendor);
    
    return vendor;
  }

  async addProduct(productData: Omit<Product, 'id' | 'rating' | 'reviews' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const product: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      rating: 0,
      reviews: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In real implementation, save to database
    console.log('Product added:', product);
    
    return product;
  }

  async addReview(reviewData: Omit<Review, 'id' | 'date' | 'helpful'>): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const review: Review = {
      ...reviewData,
      id: `review_${Date.now()}`,
      date: new Date().toISOString(),
      helpful: 0
    };

    // In real implementation, save to database and update product rating
    console.log('Review added:', review);
    
    return review;
  }

  getCategories(): Array<{ value: string; label: string; icon: string }> {
    return [
      { value: 'handicraft', label: 'Handicrafts', icon: '🎨' },
      { value: 'homestay', label: 'Homestays', icon: '🏠' },
      { value: 'event', label: 'Cultural Events', icon: '🎭' },
      { value: 'ecotour', label: 'Eco Tours', icon: '🌿' },
      { value: 'food', label: 'Local Food', icon: '🍽️' },
      { value: 'souvenir', label: 'Souvenirs', icon: '🎁' }
    ];
  }

  getDistricts(): string[] {
    return [
      'Ranchi', 'Dhanbad', 'Jamshedpur', 'Bokaro', 'Deoghar', 'Hazaribagh',
      'Khunti', 'Gumla', 'Simdega', 'West Singhbhum', 'East Singhbhum',
      'Seraikela-Kharsawan', 'Ramgarh', 'Dumka', 'Jamtara', 'Sahibganj',
      'Pakur', 'Godda', 'Koderma', 'Chatra', 'Palamu', 'Latehar',
      'Garhwa', 'Lohardaga'
    ];
  }
}

export const localMarketplaceService = new LocalMarketplaceService();