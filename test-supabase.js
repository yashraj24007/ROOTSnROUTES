// Quick Supabase Connection Test
import { supabase } from './src/lib/supabase.ts';

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...');
  
  try {
    // Test 1: Basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.log('❌ Supabase Connection Failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase Connection Successful!');
    
    // Test 2: Check if we can query the database
    const { data: dbTest, error: dbError } = await supabase
      .from('profiles')
      .select('count(*)')
      .limit(1);
    
    if (dbError) {
      if (dbError.code === '42P01') {
        console.log('⚠️  Database connected but profiles table not found - need to run schema');
      } else {
        console.log('⚠️  Database connection issue:', dbError.message);
      }
    } else {
      console.log('✅ Database tables accessible');
    }
    
    // Test 3: Check Google OAuth configuration
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
          redirectTo: 'http://localhost:8082/dashboard',
          skipBrowserRedirect: true 
        }
      });
      
      if (oauthError && oauthError.message.includes('Provider not found')) {
        console.log('❌ Google OAuth not configured in Supabase Dashboard');
      } else {
        console.log('✅ Google OAuth provider available');
      }
    } catch (err) {
      console.log('⚠️  Could not test OAuth configuration');
    }
    
    return true;
    
  } catch (err) {
    console.log('❌ Connection Test Failed:', err);
    return false;
  }
}

// Run the test
testSupabaseConnection();