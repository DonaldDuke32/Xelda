import { create } from 'zustand'
import { supabase, type User } from '../lib/supabase'
import type { AuthError } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      if (data.user) {
        // Fetch user profile from our users table
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', data.user.id)
          .single()
        
        set({ user: profile, loading: false })
      }
    } catch (error) {
      set({ error: (error as AuthError).message, loading: false })
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      if (data.user) {
        // Create user profile in our users table
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .insert({
            auth_id: data.user.id,
            email,
            username,
            plan: 'free',
            monthly_generations_used: 0,
            monthly_generations_limit: 10,
            storage_used_mb: 0,
            storage_limit_mb: 100,
            api_key_provider: 'xelda',
          })
          .select()
          .single()
        
        if (profileError) throw profileError
        
        set({ user: profile, loading: false })
      }
    } catch (error) {
      set({ error: (error as AuthError).message, loading: false })
    }
  },

  signOut: async () => {
    set({ loading: true })
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ user: null, loading: false })
    } catch (error) {
      set({ error: (error as AuthError).message, loading: false })
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      set({ error: (error as AuthError).message, loading: false })
    }
  },

  resetPassword: async (email: string) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      if (error) throw error
      set({ loading: false })
    } catch (error) {
      set({ error: (error as AuthError).message, loading: false })
    }
  },

  updateProfile: async (updates: Partial<User>) => {
    set({ loading: true, error: null })
    const currentUser = get().user
    if (!currentUser) return

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', currentUser.id)
        .select()
        .single()
      
      if (error) throw error
      set({ user: data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  checkAuth: async () => {
    set({ loading: true })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', user.id)
          .single()
        
        set({ user: profile, loading: false })
      } else {
        set({ user: null, loading: false })
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))