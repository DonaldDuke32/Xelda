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
      // Demo mode - simulate successful login
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: 'demo-user-1',
        auth_id: 'demo-auth-1',
        email,
        username: email.split('@')[0],
        plan: 'free',
        monthly_generations_used: 3,
        monthly_generations_limit: 10,
        storage_used_mb: 45,
        storage_limit_mb: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      set({ user: mockUser as any, loading: false })
    } catch (error) {
      set({ error: 'Demo mode: Login simulated successfully', loading: false })
    }
  },

  signUp: async (email: string, password: string, username: string) => {
    set({ loading: true, error: null })
    try {
      // Demo mode - simulate successful signup
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = {
        id: 'demo-user-1',
        auth_id: 'demo-auth-1',
        email,
        username,
        plan: 'free',
        monthly_generations_used: 0,
        monthly_generations_limit: 10,
        storage_used_mb: 0,
        storage_limit_mb: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      set({ user: mockUser as any, loading: false })
    } catch (error) {
      set({ error: 'Demo mode: Signup simulated successfully', loading: false })
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
      // Demo mode - no persistent auth, always start fresh
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ user: null, loading: false })
    } catch (error) {
      set({ user: null, loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))