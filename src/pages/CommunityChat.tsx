import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Activity, Lock, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/LoginModal';
import LocalChat from '@/components/LocalChat';

const CommunityChat = () => {
  const { user, loading } = useAuth();
  const [activeUsers] = useState(2847);
  const [todayMessages] = useState(12459);
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-100 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-forest-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-forest-100 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Community Chat
            </h1>
            <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8 drop-shadow-md">
              Connect with fellow travelers and locals in Jharkhand
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Lock className="h-16 w-16 text-forest-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Login Required
                  </h2>
                  <p className="text-gray-600">
                    Please log in to access the community chat and connect with other travelers.
                  </p>
                </div>
                <Button 
                  onClick={() => setShowLoginModal(true)}
                  className="w-full bg-forest-600 hover:bg-forest-700 text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login to Join Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Community Chat
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-md">
            Connect with fellow travelers and locals in Jharkhand
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Community Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LocalChat />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5" />
                  Live Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-forest-600" />
                      Active Users
                    </span>
                    <Badge variant="secondary">{activeUsers.toLocaleString()}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-forest-600" />
                      Today's Messages
                    </span>
                    <Badge variant="secondary">{todayMessages.toLocaleString()}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;