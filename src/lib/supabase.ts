import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables - using demo mode')
  // Use placeholder values for development
  const demoUrl = 'https://demo.supabase.co'
  const demoKey = 'demo-key'
}

export const supabase = createClient(
  supabaseUrl || 'https://demo.supabase.co',
  supabaseKey || 'demo-key'
)

// Database Types
export interface User {
  id: string
  auth_id: string
  email: string
  username: string
  avatar_url?: string
  plan: 'free' | 'pro' | 'expert'
  monthly_generations_used: number
  monthly_generations_limit: number
  storage_used_mb: number
  storage_limit_mb: number
  style_preferences?: Record<string, any>
  custom_gemini_api_key_encrypted?: string
  api_key_provider: 'xelda' | 'custom'
  created_at: string
  updated_at: string
}

export interface Design {
  id: string
  user_id: string
  name: string
  original_image_url: string
  generated_image_url: string
  style: string
  room_type: string
  ai_provider: string
  model_used: string
  generation_time_ms: number
  chat_history?: Record<string, any>
  detected_furniture?: Record<string, any>
  inspiration_image_url?: string
  extracted_palette?: Record<string, any>
  ambiance: string
  is_public: boolean
  is_shared_to_gallery: boolean
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_name: string
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  billing_cycle: 'monthly' | 'yearly'
  billing_amount_cents: number
  currency: string
  fedapay_subscription_id?: string
  fedapay_customer_id?: string
  auto_renew: boolean
  created_at: string
  updated_at: string
}