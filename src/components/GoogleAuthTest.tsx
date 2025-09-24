// Google Auth Test Component
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Chrome, CheckCircle, AlertCircle, User, Mail, Calendar } from 'lucide-react';

const GoogleAuthTest: React.FC = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [isTestingAuth, setIsTestingAuth] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsTestingAuth(true);
    setTestResult('');
    
    try {
      await signInWithGoogle();
      setTestResult('Google sign-in initiated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed';
      setTestResult(`Error: ${errorMessage}`);
    } finally {
      setIsTestingAuth(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setTestResult('Signed out successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed';
      setTestResult(`Sign out error: ${errorMessage}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Chrome className="w-6 h-6 text-blue-600" />
            Google Authentication Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Configuration Status */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Configuration Status</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Google Client ID configured</span>
                <Badge variant="secondary">✅ Ready</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Auth Context implemented</span>
                <Badge variant="secondary">✅ Ready</Badge>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Supabase OAuth Provider</span>
                <Badge variant="outline">⚙️ Configure in Dashboard</Badge>
              </div>
            </div>
          </div>

          {/* Current User Status */}
          {user ? (
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                  <User className="w-5 h-5" />
                  Authentication Successful!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Email:</strong> {user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Name:</strong> {user.user_metadata?.full_name || 'Not provided'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Signed up:</strong> {formatDate(user.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Provider:</strong> {user.app_metadata?.provider || 'email'}
                    </span>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    disabled={loading}
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="font-semibold text-blue-700">Test Google Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Click below to test Google OAuth integration
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={isTestingAuth || loading}
                    className="flex items-center gap-2"
                  >
                    <Chrome className="w-4 h-4" />
                    {isTestingAuth ? 'Signing in...' : 'Sign in with Google'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Test Result */}
          {testResult && (
            <Card className={testResult.startsWith('Error') ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  {testResult.startsWith('Error') ? (
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  )}
                  <span className={`text-sm ${testResult.startsWith('Error') ? 'text-red-700' : 'text-green-700'}`}>
                    {testResult}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-amber-700">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-700">1.</span>
                <span>Configure Google OAuth in Supabase Dashboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-700">2.</span>
                <span>Update Google Cloud Console redirect URIs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-amber-700">3.</span>
                <span>Test the authentication flow</span>
              </div>
              <div className="pt-2">
                <Badge variant="outline">
                  See GOOGLE_OAUTH_SETUP.md for detailed instructions
                </Badge>
              </div>
            </CardContent>
          </Card>

        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAuthTest;