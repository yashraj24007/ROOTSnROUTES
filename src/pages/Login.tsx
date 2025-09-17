import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface LoginPageProps {
  onClose: () => void;
}

const LoginPage = ({ onClose }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Google sign in failed";
      setError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-forest-900 border-forest-200 dark:border-forest-700 shadow-organic-lg">
        <CardHeader className="space-y-1 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <CardTitle className="text-2xl text-center text-forest-900 dark:text-forest-100">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center text-earth-700 dark:text-earth-200">
            {isLogin 
              ? "Sign in to access your personalized travel dashboard" 
              : "Join ROOTSnROUTES to start your Jharkhand adventure"
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-forest-900 dark:text-forest-100">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-forest-200 dark:border-forest-700 focus:border-autumn-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-forest-900 dark:text-forest-100">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border-forest-200 dark:border-forest-700 focus:border-autumn-500"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-forest-500 to-autumn-500 hover:from-forest-600 hover:to-autumn-600 text-white"
              disabled={loading}
            >
              {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-forest-900 px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-forest-200 dark:border-forest-700 hover:bg-forest-50 dark:hover:bg-forest-800"
            onClick={handleGoogleSignIn}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <Button
              variant="link"
              className="p-0 ml-1 h-auto text-forest-600 dark:text-forest-400"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="link"
              className="p-0 h-auto text-autumn-600 dark:text-autumn-400"
              onClick={onClose}
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;