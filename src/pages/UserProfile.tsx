import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, MapPin, LogOut, Settings, Heart, Camera } from 'lucide-react';
import Footer from '@/components/Footer';

interface UserProfileProps {
  onClose?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onClose) onClose();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Extract user details
  const userEmail = user.email || 'No email provided';
  const userName = user.user_metadata?.name || user.user_metadata?.full_name || 'Traveler';
  const userPhone = user.user_metadata?.phone || 'Not provided';
  const userAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const createdAt = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="relative mx-auto">
            <Avatar className="h-24 w-24 mx-auto border-4 border-blue-100 dark:border-blue-900">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Online
              </Badge>
            </div>
          </div>
          
          <div className="mt-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {userName}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Jharkhand Explorer
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{userEmail}</p>
              </div>
            </div>

            {userPhone !== 'Not provided' && (
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Phone</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{userPhone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Member Since</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{createdAt}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Exploring</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Jharkhand's Hidden Gems</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Travel Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Places Visited</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">8</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Reviews</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Bookmarks</p>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Heart className="h-4 w-4 mr-2" />
              My Favorites
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <Camera className="h-4 w-4 mr-2" />
              My Photos
            </Button>
          </div>

          <Separator />

          {/* Sign Out Button */}
          <Button 
            onClick={handleSignOut}
            variant="destructive" 
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default UserProfile;