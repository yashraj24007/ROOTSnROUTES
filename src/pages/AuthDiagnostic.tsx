import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
}

const AuthDiagnostic: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('testpassword123');

  const addResult = (name: string, status: 'success' | 'error' | 'warning', message: string) => {
    setResults(prev => [...prev, { name, status, message }]);
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setResults([]);

    // Test 1: Environment Variables
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        addResult('Environment Variables', 'error', 'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
      } else {
        addResult('Environment Variables', 'success', 'Environment variables are properly configured');
      }
    } catch (error) {
      addResult('Environment Variables', 'error', `Error checking env vars: ${error}`);
    }

    // Test 2: Supabase Connection
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        addResult('Supabase Connection', 'error', `Connection failed: ${error.message}`);
      } else {
        addResult('Supabase Connection', 'success', 'Successfully connected to Supabase');
      }
    } catch (error) {
      addResult('Supabase Connection', 'error', `Connection error: ${error}`);
    }

    // Test 3: Auth Configuration
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error && error.message !== 'Auth session missing!') {
        addResult('Auth Configuration', 'error', `Auth config error: ${error.message}`);
      } else {
        addResult('Auth Configuration', 'success', 'Auth configuration is working');
      }
    } catch (error) {
      addResult('Auth Configuration', 'error', `Auth error: ${error}`);
    }

    // Test 4: Sign Up Test
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          addResult('Sign Up Test', 'warning', 'User already exists (this is normal)');
        } else {
          addResult('Sign Up Test', 'error', `Sign up failed: ${error.message}`);
        }
      } else {
        if (data.user && !data.session) {
          addResult('Sign Up Test', 'warning', 'Email confirmation required - check Supabase settings');
        } else {
          addResult('Sign Up Test', 'success', 'Sign up working correctly');
        }
      }
    } catch (error) {
      addResult('Sign Up Test', 'error', `Sign up error: ${error}`);
    }

    // Test 5: Sign In Test
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });
      
      if (error) {
        addResult('Sign In Test', 'error', `Sign in failed: ${error.message}`);
      } else {
        addResult('Sign In Test', 'success', 'Sign in working correctly');
        // Sign out after test
        await supabase.auth.signOut();
      }
    } catch (error) {
      addResult('Sign In Test', 'error', `Sign in error: ${error}`);
    }

    // Test 6: Google OAuth Configuration
    try {
      // This will show if Google OAuth is configured
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/test`,
          skipBrowserRedirect: true,
        }
      });
      
      if (error) {
        addResult('Google OAuth', 'error', `Google OAuth not configured: ${error.message}`);
      } else {
        addResult('Google OAuth', 'success', 'Google OAuth is configured');
      }
    } catch (error) {
      addResult('Google OAuth', 'error', `Google OAuth error: ${error}`);
    }

    setTesting(false);
  };

  const getIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Authentication Diagnostic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="testEmail">Test Email</Label>
              <Input
                id="testEmail"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            <div>
              <Label htmlFor="testPassword">Test Password</Label>
              <Input
                id="testPassword"
                type="password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="testpassword123"
              />
            </div>
          </div>

          <Button 
            onClick={runDiagnostics} 
            disabled={testing}
            className="w-full"
          >
            {testing ? 'Running Diagnostics...' : 'Run Authentication Diagnostics'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Diagnostic Results:</h3>
              {results.map((result, index) => (
                <Alert key={index} className={`border-l-4 ${
                  result.status === 'success' ? 'border-l-green-500' :
                  result.status === 'error' ? 'border-l-red-500' :
                  'border-l-yellow-500'
                }`}>
                  <div className="flex items-center space-x-2">
                    {getIcon(result.status)}
                    <div>
                      <div className="font-medium">{result.name}</div>
                      <AlertDescription>{result.message}</AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Common Supabase Setup Issues:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Email confirmation is enabled by default - disable it in Auth settings for testing</li>
              <li>• Google OAuth requires configuration in the Supabase dashboard</li>
              <li>• Row Level Security (RLS) policies might be blocking operations</li>
              <li>• Check your Supabase project URL and anon key are correct</li>
              <li>• Ensure auth.users table exists and is accessible</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthDiagnostic;