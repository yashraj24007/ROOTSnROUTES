// Supabase Configuration Checker
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, RefreshCw, Database, Key, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ConfigCheck {
  name: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  message: string;
  action?: string;
}

const SupabaseConfigChecker: React.FC = () => {
  const [checks, setChecks] = useState<ConfigCheck[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const runChecks = async () => {
    setIsChecking(true);
    const newChecks: ConfigCheck[] = [];

    // Check 1: Environment Variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase') || supabaseKey.includes('your_supabase')) {
      newChecks.push({
        name: 'Environment Variables',
        status: 'error',
        message: 'Supabase URL and/or Anon Key not configured in .env file',
        action: 'Add your Supabase credentials to .env file'
      });
    } else {
      newChecks.push({
        name: 'Environment Variables',
        status: 'success',
        message: 'Supabase credentials found in environment'
      });
    }

    // Check 2: Supabase Connection
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        newChecks.push({
          name: 'Supabase Connection',
          status: 'error',
          message: `Connection failed: ${error.message}`,
          action: 'Check your Supabase URL and key'
        });
      } else {
        newChecks.push({
          name: 'Supabase Connection',
          status: 'success',
          message: 'Successfully connected to Supabase'
        });
      }
    } catch (error) {
      newChecks.push({
        name: 'Supabase Connection',
        status: 'error',
        message: 'Failed to connect to Supabase',
        action: 'Check network connection and credentials'
      });
    }

    // Check 3: Google OAuth Configuration (client-side check)
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const googleClientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    
    if (!googleClientId || !googleClientSecret) {
      newChecks.push({
        name: 'Google OAuth Credentials',
        status: 'error',
        message: 'Google OAuth credentials not found',
        action: 'Add Google Client ID and Secret to .env'
      });
    } else {
      newChecks.push({
        name: 'Google OAuth Credentials',
        status: 'success',
        message: 'Google OAuth credentials configured'
      });
    }

    // Check 4: Test Google OAuth Provider (this will fail until Supabase is configured)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/dashboard', skipBrowserRedirect: true }
      });
      
      if (error && error.message.includes('Provider not found')) {
        newChecks.push({
          name: 'Supabase Google Provider',
          status: 'error',
          message: 'Google OAuth not enabled in Supabase Dashboard',
          action: 'Enable Google provider in Supabase Authentication settings'
        });
      } else if (error && error.message.includes('redirect_uri')) {
        newChecks.push({
          name: 'Supabase Google Provider',
          status: 'warning',
          message: 'Google provider enabled but redirect URI needs configuration',
          action: 'Configure redirect URIs in Google Cloud Console'
        });
      } else if (data) {
        newChecks.push({
          name: 'Supabase Google Provider',
          status: 'success',
          message: 'Google OAuth provider properly configured'
        });
      }
    } catch (error) {
      newChecks.push({
        name: 'Supabase Google Provider',
        status: 'warning',
        message: 'Unable to test Google OAuth - may need Supabase configuration',
        action: 'Check SUPABASE_OAUTH_SETUP.md for configuration steps'
      });
    }

    // Check 5: Database Schema
    try {
      const { data, error } = await supabase.from('profiles').select('count(*)').single();
      if (error && error.code === '42P01') {
        newChecks.push({
          name: 'Database Schema',
          status: 'warning',
          message: 'User profiles table not found',
          action: 'Run the SQL commands from supabase_schema.sql'
        });
      } else if (error) {
        newChecks.push({
          name: 'Database Schema',
          status: 'error',
          message: `Database error: ${error.message}`,
          action: 'Check your database permissions'
        });
      } else {
        newChecks.push({
          name: 'Database Schema',
          status: 'success',
          message: 'User profiles table exists and accessible'
        });
      }
    } catch (error) {
      newChecks.push({
        name: 'Database Schema',
        status: 'warning',
        message: 'Could not verify database schema',
        action: 'Ensure database is accessible'
      });
    }

    setChecks(newChecks);
    setIsChecking(false);
  };

  useEffect(() => {
    runChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-100 text-green-800">✅ Ready</Badge>;
      case 'warning': return <Badge variant="outline" className="border-yellow-500 text-yellow-700">⚠️ Needs Attention</Badge>;
      case 'error': return <Badge variant="destructive">❌ Error</Badge>;
      default: return <Badge variant="secondary">⏳ Checking...</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            Supabase Configuration Status
          </CardTitle>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Check your Supabase and Google OAuth configuration
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={runChecks}
              disabled={isChecking}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Checking...' : 'Recheck'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checks.map((check, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <div className="mt-0.5">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">{check.name}</h4>
                    {getStatusBadge(check.status)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{check.message}</p>
                  {check.action && (
                    <div className="bg-blue-50 p-2 rounded text-sm text-blue-700">
                      <strong>Action:</strong> {check.action}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Configuration Steps */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-amber-800">Configuration Required</h4>
            </div>
            <div className="text-sm text-amber-700 space-y-1">
              <p>📋 <strong>Step 1:</strong> Configure Supabase credentials in .env file</p>
              <p>🔑 <strong>Step 2:</strong> Enable Google OAuth in Supabase Dashboard</p>
              <p>🌐 <strong>Step 3:</strong> Set redirect URLs in Google Cloud Console</p>
              <p>📚 <strong>Guide:</strong> See <code>SUPABASE_OAUTH_SETUP.md</code> for detailed instructions</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
            >
              <Globe className="w-4 h-4 mr-2" />
              Supabase Dashboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://console.cloud.google.com/', '_blank')}
            >
              <Globe className="w-4 h-4 mr-2" />
              Google Cloud Console
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseConfigChecker;