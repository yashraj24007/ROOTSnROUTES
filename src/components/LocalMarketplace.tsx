import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, ShoppingCart, Plus, Store, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { localMarketplaceService, Product, Vendor, Order } from '../services/localMarketplaceService';
import { toast } from '../hooks/use-toast';

interface LocalMarketplaceProps {
  className?: string;
}

const LocalMarketplace: React.FC<LocalMarketplaceProps> = ({ className = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState<Product | null>(null);

  const categories = localMarketplaceService.getCategories();
  const districts = localMarketplaceService.getDistricts();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory,
        district: selectedDistrict,
        searchQuery: searchQuery,
        minPrice: priceRange.min,
        maxPrice: priceRange.max
      };
      
      const productData = await localMarketplaceService.getProducts(filters);
      setProducts(productData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load marketplace products",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedDistrict, searchQuery, priceRange]);

  useEffect(() => {
    loadProducts();
    loadVendors();
  }, [loadProducts]);

  const loadVendors = async () => {
    try {
      const vendorData = await localMarketplaceService.getVendors();
      setVendors(vendorData);
    } catch (error) {
      console.error('Failed to load vendors:', error);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} added to your cart`
    });
  };

  const getTotalCartAmount = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    try {
      const orderItems = cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        subtotal: item.product.price * item.quantity
      }));

      const orderData = {
        customerId: 'customer_001', // In real app, get from auth context
        customerName: 'Tourist User',
        vendorId: cart[0].product.vendorId,
        products: orderItems,
        totalAmount: getTotalCartAmount(),
        status: 'pending' as const,
        paymentStatus: 'pending' as const
      };

      await localMarketplaceService.createOrder(orderData);
      setCart([]);
      
      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive"
      });
    }
  };

  const handleVendorRegistration = async (formData: FormData) => {
    const vendorData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as 'artisan' | 'homestay_owner' | 'tour_operator' | 'event_organizer' | 'food_vendor',
      district: formData.get('district') as string,
      address: formData.get('address') as string,
      specialties: (formData.get('specialties') as string).split(',').map(s => s.trim()),
      certifications: []
    };

    try {
      await localMarketplaceService.registerVendor(vendorData);
      setShowVendorForm(false);
      toast({
        title: "Registration Submitted",
        description: "Your vendor registration has been submitted for review"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register as vendor",
        variant: "destructive"
      });
    }
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          {categories.find(c => c.value === product.category)?.icon} {categories.find(c => c.value === product.category)?.label}
        </Badge>
        {product.availability && (
          <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500">
            Available
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{product.district}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Store className="w-4 h-4" />
          <span>{product.vendorName}</span>
        </div>

        {product.duration && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{product.duration}</span>
          </div>
        )}

        {product.capacity && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Up to {product.capacity} guests</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="space-x-2">
        <Button
          onClick={() => setShowProductDetail(product)}
          variant="outline"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          onClick={() => addToCart(product)}
          className="flex-1"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );

  const VendorCard = ({ vendor }: { vendor: Vendor }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={vendor.avatar} />
            <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="flex items-center space-x-2">
              <span>{vendor.name}</span>
              {vendor.verified && (
                <Badge className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500">Verified</Badge>
              )}
            </CardTitle>
            <CardDescription>{vendor.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{vendor.rating}</span>
          </div>
          <Badge variant="outline">
            {vendor.category.replace('_', ' ')}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{vendor.district}</span>
        </div>

        <div className="text-sm">
          <span className="font-medium">{vendor.totalProducts}</span> products • 
          <span className="font-medium ml-1">{vendor.totalSales}</span> sales
        </div>

        <div className="flex flex-wrap gap-1">
          {vendor.specialties.slice(0, 2).map(specialty => (
            <Badge key={specialty} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`container mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Local Marketplace</h1>
          <p className="text-muted-foreground">
            Discover authentic tribal handicrafts, homestays, and cultural experiences
          </p>
        </div>

        <div className="flex space-x-2">
          <Dialog open={showVendorForm} onOpenChange={setShowVendorForm}>
            <DialogTrigger asChild>
              <Button>
                <User className="w-4 h-4 mr-2" />
                Become a Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Vendor Registration</DialogTitle>
                <DialogDescription>
                  Join our marketplace and showcase your products to tourists
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleVendorRegistration(new FormData(e.target as HTMLFormElement));
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input name="phone" required />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select name="category" required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artisan">Artisan</SelectItem>
                        <SelectItem value="homestay_owner">Homestay Owner</SelectItem>
                        <SelectItem value="tour_operator">Tour Operator</SelectItem>
                        <SelectItem value="event_organizer">Event Organizer</SelectItem>
                        <SelectItem value="food_vendor">Food Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Select name="district" required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map(district => (
                          <SelectItem key={district} value={district}>{district}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input name="address" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="specialties">Specialties (comma-separated)</Label>
                    <Input name="specialties" placeholder="e.g. Traditional Art, Handicrafts, Cultural Tours" />
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setShowVendorForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Register
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {cart.length > 0 && (
            <Button onClick={placeOrder} className="relative">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({cart.length})
              <Badge className="absolute -top-2 -right-2 bg-destructive hover:bg-destructive/90">
                ₹{getTotalCartAmount()}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>District</Label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Districts</SelectItem>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Price Range</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 10000 }))}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
          <TabsTrigger value="vendors">Vendors ({vendors.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="vendors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map(vendor => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Detail Modal */}
      <Dialog open={!!showProductDetail} onOpenChange={() => setShowProductDetail(null)}>
        {showProductDetail && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{showProductDetail.name}</DialogTitle>
              <DialogDescription>{showProductDetail.vendorName}</DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={showProductDetail.images[0]}
                  alt={showProductDetail.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">
                  ₹{showProductDetail.price}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span>{showProductDetail.rating}</span>
                  </div>
                  <Badge variant={showProductDetail.availability ? "default" : "secondary"}>
                    {showProductDetail.availability ? "Available" : "Unavailable"}
                  </Badge>
                </div>

                {showProductDetail.features && (
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {showProductDetail.features.map((feature, index) => (
                        <li key={index} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {showProductDetail.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description:</h4>
                <p className="text-sm text-muted-foreground">
                  {showProductDetail.description}
                </p>
              </div>

              {showProductDetail.location && (
                <div>
                  <h4 className="font-semibold mb-2">Location:</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{showProductDetail.location.address}</span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={() => {
                  addToCart(showProductDetail);
                  setShowProductDetail(null);
                }}
                className="w-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default LocalMarketplace;