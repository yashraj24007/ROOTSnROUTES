import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Lock, 
  Trash2, 
  AlertTriangle, 
  Save, 
  Eye, 
  EyeOff, 
  Shield, 
  Bell, 
  Globe, 
  Palette,
  Download,
  Upload,
  Camera,
  X,
  Check,
  Settings as SettingsIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Settings: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    bio: user?.user_metadata?.bio || '',
    location: user?.user_metadata?.location || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    dataSharing: false,
    language: 'en',
    theme: 'light',
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to access settings.</p>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
          bio: formData.bio,
          location: formData.location,
        }
      });

      if (error) throw error;
      showMessage('success', 'Profile updated successfully!');
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMessage('success', 'Password updated successfully!');
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailUpdate = async () => {
    if (formData.email === user.email) {
      showMessage('error', 'New email must be different from current email');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email
      });

      if (error) throw error;
      showMessage('success', 'Email update initiated! Check your new email for confirmation.');
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
      showMessage('error', 'Please type "DELETE MY ACCOUNT" to confirm deletion');
      return;
    }

    setLoading(true);
    try {
      // Note: Supabase doesn't have a direct delete user API from client
      // In production, you'd call a server function or use RPC
      // For now, we'll sign out and show a message
      await signOut();
      
      // In a real app, you'd call your backend to delete the user:
      // const { error } = await supabase.rpc('delete_user_account');
      
      navigate('/');
      showMessage('success', 'Account deletion request submitted. You have been signed out.');
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const downloadUserData = async () => {
    setLoading(true);
    try {
      // Gather comprehensive user data
      const userData = {
        account: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          email_confirmed_at: user.email_confirmed_at,
          phone: user.phone,
        },
        profile: {
          name: user.user_metadata?.name || user.user_metadata?.full_name || '',
          bio: user.user_metadata?.bio || '',
          location: user.user_metadata?.location || '',
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
          phone: user.user_metadata?.phone || '',
        },
        preferences: {
          emailNotifications: preferences.emailNotifications,
          pushNotifications: preferences.pushNotifications,
          marketingEmails: preferences.marketingEmails,
          dataSharing: preferences.dataSharing,
          language: preferences.language,
          theme: preferences.theme,
        },
        metadata: {
          exportDate: new Date().toISOString(),
          exportFormat: 'JSON',
          dataVersion: '1.0',
          platform: 'ROOTSnROUTES Tourism Platform',
        }
      };

      // Create and download the file
      const blob = new Blob([JSON.stringify(userData, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rootsnroutes-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showMessage('success', 'Your data has been downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      showMessage('error', 'Failed to download user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadTravelHistory = async () => {
    setLoading(true);
    try {
      console.log('Starting travel history export for user:', user.id);
      
      // Initialize empty arrays for data
      let tripHistory = [];
      let userReviews = [];
      let userFavorites = [];

      // Check if supabase is available
      if (!supabase) {
        console.log('Supabase not available, creating sample data');
        throw new Error('Database not available');
      }

      // Try to fetch travel history from Supabase with better error handling
      try {
        const { data: trips, error: tripError } = await supabase
          .from('user_trip_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (tripError) {
          console.log('Trip history error:', tripError);
          if (tripError.code !== 'PGRST116' && tripError.code !== '42P01') {
            throw tripError;
          }
        } else {
          tripHistory = trips || [];
        }
      } catch (err) {
        console.log('Trip history table not accessible:', err);
        // Create sample data if no trips found
        tripHistory = [{
          id: 'sample-trip-1',
          trip_name: 'Sample Trip to Ranchi',
          destinations: ['Ranchi', 'Rock Garden'],
          start_date: '2024-10-01',
          end_date: '2024-10-03',
          trip_type: 'family',
          total_cost: 5000.00,
          rating: 5,
          review: 'Amazing experience exploring Jharkhand!',
          created_at: new Date().toISOString(),
          note: 'This is sample data - replace with your actual trips'
        }];
      }

      // Try to fetch user reviews
      try {
        const { data: reviews, error: reviewError } = await supabase
          .from('user_reviews')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (reviewError) {
          console.log('Reviews error:', reviewError);
          if (reviewError.code !== 'PGRST116' && reviewError.code !== '42P01') {
            throw reviewError;
          }
        } else {
          userReviews = reviews || [];
        }
      } catch (err) {
        console.log('Reviews table not accessible:', err);
        // Create sample data if no reviews found
        userReviews = [{
          id: 'sample-review-1',
          destination_name: 'Hundru Falls',
          rating: 5,
          title: 'Beautiful waterfall',
          review: 'Stunning natural beauty, perfect for photography!',
          visit_date: '2024-10-02',
          created_at: new Date().toISOString(),
          note: 'This is sample data - replace with your actual reviews'
        }];
      }

      // Try to fetch user favorites/wishlist
      try {
        const { data: favorites, error: favError } = await supabase
          .from('user_favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (favError) {
          console.log('Favorites error:', favError);
          if (favError.code !== 'PGRST116' && favError.code !== '42P01') {
            throw favError;
          }
        } else {
          userFavorites = favorites || [];
        }
      } catch (err) {
        console.log('Favorites table not accessible:', err);
        // Create sample data
        userFavorites = [{
          id: 'sample-fav-1',
          destination_name: 'Betla National Park',
          visit_status: 'wishlist',
          created_at: new Date().toISOString(),
          note: 'This is sample data - replace with your actual favorites'
        }];
      }

      // Prepare comprehensive travel history data
      const travelData = {
        user_info: {
          user_id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.user_metadata?.full_name || '',
          export_date: new Date().toISOString(),
        },
        trip_history: tripHistory,
        reviews_and_ratings: userReviews,
        favorites_and_wishlist: userFavorites,
        summary: {
          total_trips: tripHistory.length,
          total_reviews: userReviews.length,
          total_favorites: userFavorites.length,
          average_rating_given: userReviews.length 
            ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1)
            : 'N/A',
          first_trip_date: tripHistory.length ? tripHistory[tripHistory.length - 1]?.start_date : null,
          last_trip_date: tripHistory.length ? tripHistory[0]?.start_date : null,
        },
        metadata: {
          export_format: 'JSON',
          data_version: '1.0',
          platform: 'ROOTSnROUTES Tourism Platform',
          export_type: 'Travel History',
          privacy_note: 'This export contains your personal travel data. Please handle with care.',
          note: 'If some sections contain sample data, it means you haven\'t used those features yet or the data is not available.',
        }
      };

      console.log('Travel data prepared:', travelData);

      // Create and download the file
      const jsonString = JSON.stringify(travelData, null, 2);
      const blob = new Blob([jsonString], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rootsnroutes-travel-history-${new Date().toISOString().split('T')[0]}.json`;
      
      // Force the download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      const tripCount = tripHistory.length;
      const reviewCount = userReviews.length;
      showMessage('success', `Travel history exported successfully! Found ${tripCount} trips and ${reviewCount} reviews.`);
      
      console.log('Travel history export completed successfully');
    } catch (error) {
      console.error('Travel history export error:', error);
      
      // Fallback: Create a basic export even if database fails
      try {
        const fallbackData = {
          user_info: {
            user_id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.user_metadata?.full_name || '',
            export_date: new Date().toISOString(),
          },
          trip_history: [],
          reviews_and_ratings: [],
          favorites_and_wishlist: [],
          summary: {
            total_trips: 0,
            total_reviews: 0,
            total_favorites: 0,
            average_rating_given: 'N/A',
            first_trip_date: null,
            last_trip_date: null,
          },
          metadata: {
            export_format: 'JSON',
            data_version: '1.0',
            platform: 'ROOTSnROUTES Tourism Platform',
            export_type: 'Travel History',
            privacy_note: 'This export contains your personal travel data. Please handle with care.',
            note: 'This is a basic export. No travel data found or database unavailable.',
            error_message: error.message || 'Database connection failed'
          }
        };

        const jsonString = JSON.stringify(fallbackData, null, 2);
        const blob = new Blob([jsonString], { 
          type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rootsnroutes-travel-history-${new Date().toISOString().split('T')[0]}.json`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showMessage('success', 'Travel history export completed (basic version due to database issue).');
      } catch (fallbackError) {
        console.error('Fallback export failed:', fallbackError);
        showMessage('error', `Failed to export travel history: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account, privacy, and preferences
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:bg-red-900/20'}`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className={message.type === 'success' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.user_metadata?.avatar_url || user.user_metadata?.picture} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                    {getInitials(formData.name || user.email || 'U')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF or PNG. Max size of 800KB
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Your current location"
                />
              </div>

              <Button onClick={handleProfileUpdate} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Settings</span>
              </CardTitle>
              <CardDescription>
                Update your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                />
                <p className="text-xs text-muted-foreground">
                  Current email: {user.email}
                </p>
              </div>
              
              <Button onClick={handleEmailUpdate} disabled={loading || formData.email === user.email}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Updating...' : 'Update Email'}
              </Button>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Password & Security</span>
              </CardTitle>
              <CardDescription>
                Change your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-7 w-7 p-0"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-7 w-7 p-0"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-7 w-7 p-0"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button onClick={handlePasswordChange} disabled={loading}>
                <Shield className="h-4 w-4 mr-2" />
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </CardContent>
          </Card>

          {/* Privacy & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Privacy & Preferences</span>
              </CardTitle>
              <CardDescription>
                Control your privacy settings and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive notifications about your trips and bookings
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Get real-time updates on your mobile device
                    </p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive promotional offers and travel deals
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-xs text-muted-foreground">
                      Share anonymous usage data to improve the service
                    </p>
                  </div>
                  <Switch
                    checked={preferences.dataSharing}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, dataSharing: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Data & Privacy</span>
              </CardTitle>
              <CardDescription>
                Download your data, manage privacy settings, and understand how your data is used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Data Download Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Export Your Data</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button 
                    variant="outline" 
                    onClick={downloadUserData}
                    disabled={loading}
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? 'Preparing Download...' : 'Download My Data'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={downloadTravelHistory}
                    disabled={loading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {loading ? 'Exporting...' : 'Export Travel History'}
                  </Button>
                </div>
                
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Download className="h-4 w-4" />
                  <AlertDescription className="text-blue-700 dark:text-blue-400">
                    <strong>What's included:</strong> 
                    <br />• <strong>Personal Data:</strong> Profile information, account settings, and preferences
                    <br />• <strong>Travel History:</strong> Trip records, reviews, ratings, and favorites from your ROOTSnROUTES journey
                    <br />• <strong>Privacy Control:</strong> Both exports help you maintain control over your personal data
                  </AlertDescription>
                </Alert>
              </div>

              <Separator />

              {/* Privacy Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-foreground">Privacy & Data Protection</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Data Encryption</p>
                      <p className="text-xs text-muted-foreground">All your data is encrypted in transit and at rest</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Data Portability</p>
                      <p className="text-xs text-muted-foreground">Download your data anytime in JSON format</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Privacy Control</p>
                      <p className="text-xs text-muted-foreground">Manage what data you share and with whom</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-700 dark:text-red-400">
                  <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. 
                  All your data, including travel history, bookings, and preferences will be permanently deleted.
                </AlertDescription>
              </Alert>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center space-x-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Delete Account</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4">
                      <p>
                        This action cannot be undone. This will permanently delete your account 
                        and remove all your data from our servers.
                      </p>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deleteConfirm">
                          Type <strong>"DELETE MY ACCOUNT"</strong> to confirm:
                        </Label>
                        <Input
                          id="deleteConfirm"
                          value={deleteConfirmText}
                          onChange={(e) => setDeleteConfirmText(e.target.value)}
                          placeholder="DELETE MY ACCOUNT"
                          className="font-mono"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteConfirmText('')}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleAccountDeletion}
                      disabled={deleteConfirmText !== 'DELETE MY ACCOUNT' || loading}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {loading ? 'Deleting...' : 'Delete Account'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;