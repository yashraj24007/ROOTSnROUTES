import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [details, setDetails] = useState<string[]>([]);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const testResults: string[] = [];
    
    try {
      // Test 1: Check environment variables
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        setStatus('❌ Environment variables missing');
        testResults.push('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
        setDetails(testResults);
        return;
      }
      
      testResults.push('✅ Environment variables found');
      testResults.push(`URL: ${url}`);
      testResults.push(`Key: ${key.substring(0, 20)}...`);

      // Test 2: Check Supabase connection
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus('❌ Supabase connection failed');
        testResults.push(`Connection error: ${error.message}`);
        setDetails(testResults);
        return;
      }
      
      testResults.push('✅ Supabase connection successful');

      // Test 3: Test database access
      const { error: dbError } = await supabase
        .from('profiles')
        .select('count(*)')
        .limit(1);
      
      if (dbError) {
        if (dbError.code === '42P01') {
          testResults.push('⚠️ Database connected but profiles table missing');
          testResults.push('Need to run: supabase_schema.sql');
        } else {
          testResults.push(`Database error: ${dbError.message}`);
        }
      } else {
        testResults.push('✅ Database tables accessible');
      }

      // Test 4: Test Google OAuth availability
      try {
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { 
            redirectTo: window.location.origin + '/dashboard',
            skipBrowserRedirect: true 
          }
        });
        
        if (oauthError && oauthError.message.includes('Provider not found')) {
          testResults.push('❌ Google OAuth not configured in Supabase');
          testResults.push('Enable Google provider in Supabase Dashboard');
        } else {
          testResults.push('✅ Google OAuth provider configured');
        }
      } catch (err) {
        testResults.push('⚠️ Could not test Google OAuth');
      }

      setStatus('✅ Supabase connection test complete');
      
    } catch (err) {
      setStatus('❌ Test failed');
      testResults.push(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    
    setDetails(testResults);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🔍 Supabase Connection Test</h2>
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {status}
      </div>
      <div>
        <strong>Details:</strong>
        <ul style={{ marginTop: '10px' }}>
          {details.map((detail, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              {detail}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <strong>Next Steps:</strong>
        <ol>
          <li>If connection failed: Check .env file</li>
          <li>If Google OAuth failed: Enable in Supabase Dashboard</li>
          <li>If database tables missing: Run supabase_schema.sql</li>
        </ol>
      </div>
    </div>
  );
};

export default SupabaseConnectionTest;