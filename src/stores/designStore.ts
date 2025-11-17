import { create } from 'zustand'
import { supabase, type Design } from '../lib/supabase'
import aiService from '../services/ai'
import type { Style, UploadedFile, Message, FurnitureItem } from '../types'

interface DesignState {
  // Current design session
  originalImage: string | null
  originalFile: UploadedFile | null
  generatedImage: string | null
  selectedStyle: Style | null
  inspirationFile: UploadedFile | null
  furnitureItems: FurnitureItem[]
  chatHistory: Message[]
  currentDesign: Design | null
  
  // UI states
  isGenerating: boolean
  isAnalyzing: boolean
  isRefining: boolean
  isChangingAmbiance: boolean
  error: string | null
  
  // User designs
  userDesigns: Design[]
  publicGallery: Design[]
  
  // Actions
  uploadImage: (file: UploadedFile) => void
  selectStyle: (style: Style) => Promise<void>
  setInspirationImage: (file: UploadedFile | null) => void
  generateDesign: (style?: Style) => Promise<void>;
  checkQuotaLimit: () => boolean;
  incrementQuota: () => Promise<void>;
  refineDesign: (message: string) => Promise<void>
  changeAmbiance: (prompt: string) => Promise<void>
  saveDesign: (name?: string) => Promise<void>
  publishToGallery: () => Promise<void>
  loadUserDesigns: () => Promise<void>
  loadPublicGallery: () => Promise<void>
  likeDesign: (designId: string) => Promise<void>
  reset: () => void
  clearError: () => void
}

export const useDesignStore = create<DesignState>((set, get) => ({
  // Initial state
  originalImage: null,
  originalFile: null,
  generatedImage: null,
  selectedStyle: null,
  inspirationFile: null,
  furnitureItems: [],
  chatHistory: [],
  currentDesign: null,
  
  isGenerating: false,
  isAnalyzing: false,
  isRefining: false,
  isChangingAmbiance: false,
  error: null,
  
  userDesigns: [],
  publicGallery: [],

  uploadImage: (file: UploadedFile) => {
    set({
      originalFile: file,
      originalImage: file.base64,
      generatedImage: null,
      selectedStyle: null,
      inspirationFile: null,
      furnitureItems: [],
      chatHistory: [],
      currentDesign: null,
      error: null
    })
  },

  selectStyle: async (style: Style) => {
    set({ selectedStyle: style })
    // Auto-generate after style selection
    await get().generateDesign()
  },

  setInspirationImage: (file: UploadedFile | null) => {
    set({ inspirationFile: file })
  },

  checkQuotaLimit: () => {
    // Demo mode - always allow for testing
    return true
  },

  incrementQuota: async () => {
    // Demo mode - no quota tracking needed
  },

  generateDesign: async (style?: Style) => {
    const { originalFile, selectedStyle: currentStyle, inspirationFile, checkQuotaLimit, incrementQuota } = get()
    const targetStyle = style || currentStyle
    
    if (!originalFile || !targetStyle) return

    // Check quota limits
    if (!checkQuotaLimit()) {
      set({ error: 'Quota mensuel épuisé. Passez au plan Pro pour des générations illimitées.' })
      return
    }

    set({ isGenerating: true, error: null })
    
    try {
      // Generate design image using new interface
      const result = await aiService.generateDesign({
        originalImage: originalFile.base64,
        mimeType: originalFile.mimeType,
        style: targetStyle.id,
        inspirationImage: inspirationFile || undefined,
        ambiance: 'daylight'
      })
      
      // Increment quota for free users
      await incrementQuota()
      
      set({ 
        selectedStyle: targetStyle,
        generatedImage: result.generatedImage,
        isGenerating: false,
        isAnalyzing: true,
        chatHistory: [{
          sender: 'ai' as const,
          text: 'Votre design est prêt ! Que souhaitez-vous modifier ?'
        }]
      })
      
      // Analyze furniture in background
      const furnitureAnalysis = await aiService.analyzeFurniture(
        result.generatedImage,
        'image/png'
      )
      
      // Convert to old interface format for compatibility
      const furniture = furnitureAnalysis.items.map(item => ({
        name: item.name,
        description: item.description
      }))
      
      set({ furnitureItems: furniture, isAnalyzing: false })
      
    } catch (error) {
      set({ 
        error: 'Erreur lors de la génération. Veuillez réessayer.',
        isGenerating: false,
        isAnalyzing: false
      })
      console.error('Generation error:', error)
    }
  },

  refineDesign: async (message: string) => {
    const { generatedImage, selectedStyle, chatHistory } = get()
    if (!generatedImage || !selectedStyle) return

    set({ 
      isRefining: true,
      chatHistory: [...chatHistory, { sender: 'user', text: message }]
    })
    
    try {
      const result = await aiService.refineDesign({
        currentImage: generatedImage,
        mimeType: 'image/png',
        refinementRequest: message,
        currentStyle: selectedStyle.id,
        chatHistory
      })
      
      set({
        generatedImage: result.refinedImage,
        isRefining: false,
        chatHistory: [...get().chatHistory, {
          sender: 'ai',
          text: 'Design mis à jour ! Autre chose à modifier ?'
        }]
      })
      
    } catch (error) {
      set({ 
        error: 'Erreur lors de l\'affinage. Veuillez réessayer.',
        isRefining: false
      })
      console.error('Refinement error:', error)
    }
  },

  changeAmbiance: async (prompt: string) => {
    const { generatedImage, selectedStyle, chatHistory } = get()
    if (!generatedImage || !selectedStyle) return

    set({ isChangingAmbiance: true })
    
    try {
      const result = await aiService.refineDesign({
        currentImage: generatedImage,
        mimeType: 'image/png',
        refinementRequest: prompt,
        currentStyle: selectedStyle.id,
        chatHistory
      })
      
      set({
        generatedImage: result.refinedImage,
        isChangingAmbiance: false
      })
      
    } catch (error) {
      set({ 
        error: 'Erreur lors du changement d\'ambiance.',
        isChangingAmbiance: false
      })
      console.error('Ambiance change error:', error)
    }
  },

  saveDesign: async (name?: string) => {
    const state = get()
    if (!state.originalImage || !state.generatedImage || !state.selectedStyle) return

    try {
      // Upload images to Supabase Storage
      const originalImageFile = new File(
        [new Uint8Array(Buffer.from(state.originalImage, 'base64'))],
        'original.jpg',
        { type: 'image/jpeg' }
      )
      
      const generatedImageFile = new File(
        [new Uint8Array(Buffer.from(state.generatedImage, 'base64'))],
        'generated.png',
        { type: 'image/png' }
      )
      
      const { data: originalUpload } = await supabase.storage
        .from('designs')
        .upload(`original-${Date.now()}.jpg`, originalImageFile)
      
      const { data: generatedUpload } = await supabase.storage
        .from('designs')
        .upload(`generated-${Date.now()}.png`, generatedImageFile)
      
      if (!originalUpload || !generatedUpload) {
        throw new Error('Failed to upload images')
      }
      
      // Save design to database
      const { data: design } = await supabase
        .from('designs')
        .insert({
          name: name || `${state.selectedStyle.name} Design`,
          original_image_url: originalUpload.path,
          generated_image_url: generatedUpload.path,
          style: state.selectedStyle.id,
          room_type: 'bedroom',
          ai_provider: 'gemini',
          model_used: 'gemini-2.5-flash-image',
          generation_time_ms: 0,
          chat_history: state.chatHistory,
          detected_furniture: state.furnitureItems,
          inspiration_image_url: state.inspirationFile ? 'inspiration-url' : null,
          ambiance: 'daylight',
          is_public: false,
          is_shared_to_gallery: false,
          view_count: 0,
          like_count: 0
        })
        .select()
        .single()
      
      set({ currentDesign: design })
      
    } catch (error) {
      set({ error: 'Erreur lors de la sauvegarde.' })
      console.error('Save error:', error)
    }
  },

  publishToGallery: async () => {
    const { currentDesign } = get()
    if (!currentDesign) {
      await get().saveDesign()
    }
    
    try {
      await supabase
        .from('designs')
        .update({ is_shared_to_gallery: true, is_public: true })
        .eq('id', get().currentDesign?.id)
      
      set({ 
        currentDesign: { 
          ...get().currentDesign!, 
          is_shared_to_gallery: true, 
          is_public: true 
        }
      })
      
    } catch (error) {
      set({ error: 'Erreur lors de la publication.' })
      console.error('Publish error:', error)
    }
  },

  loadUserDesigns: async () => {
    try {
      const { data } = await supabase
        .from('designs')
        .select('*')
        .order('created_at', { ascending: false })
      
      set({ userDesigns: data || [] })
    } catch (error) {
      console.error('Load user designs error:', error)
    }
  },

  loadPublicGallery: async () => {
    try {
      const { data } = await supabase
        .from('designs')
        .select('*')
        .eq('is_shared_to_gallery', true)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(50)
      
      set({ publicGallery: data || [] })
    } catch (error) {
      console.error('Load gallery error:', error)
    }
  },

  likeDesign: async (designId: string) => {
    try {
      // Add like logic here
      await supabase
        .from('design_likes')
        .insert({ design_id: designId })
      
      // Update like count
      await supabase.rpc('increment_design_likes', { design_id: designId })
      
    } catch (error) {
      console.error('Like error:', error)
    }
  },

  reset: () => {
    set({
      originalImage: null,
      originalFile: null,
      generatedImage: null,
      selectedStyle: null,
      inspirationFile: null,
      furnitureItems: [],
      chatHistory: [],
      currentDesign: null,
      isGenerating: false,
      isAnalyzing: false,
      isRefining: false,
      isChangingAmbiance: false,
      error: null
    })
  },

  clearError: () => set({ error: null }),
}))