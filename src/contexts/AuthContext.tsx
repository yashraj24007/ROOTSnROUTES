import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error('Sign in error:', error)
        throw new Error(error.message || 'Failed to sign in')
      }
      console.log('Sign in successful:', data)
    } catch (err) {
      console.error('Sign in catch block:', err)
      throw err
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) {
        console.error('Sign up error:', error)
        throw new Error(error.message || 'Failed to sign up')
      }
      console.log('Sign up successful:', data)
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        throw new Error('Please check your email and click the confirmation link to complete registration.')
      }
    } catch (err) {
      console.error('Sign up catch block:', err)
      throw err
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })
      if (error) {
        console.error('Google sign in error:', error)
        throw new Error(error.message || 'Failed to sign in with Google')
      }
      console.log('Google sign in initiated:', data)
    } catch (err) {
      console.error('Google sign in catch block:', err)
      throw err
    }
  }

  const deleteAccount = async () => {
    try {
      // Note: Supabase doesn't have direct client-side user deletion
      // In production, you would typically:
      // 1. Call a server function to handle account deletion
      // 2. Use the management API from your backend
      // 3. Or use a Supabase Edge Function
      
      // For now, we'll demonstrate the concept by signing out
      // In a real implementation, you'd call:
      // const { error } = await supabase.rpc('delete_user_account');
      
      console.log('Account deletion requested for user:', user?.id)
      await signOut()
      throw new Error('Account deletion functionality requires server-side implementation')
    } catch (err) {
      console.error('Delete account error:', err)
      throw err
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    deleteAccount,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}