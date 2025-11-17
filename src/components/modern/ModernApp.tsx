import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import { useDesignStore } from '../../stores/designStore'
import { ModernHeader } from './ModernHeader'
import { HeroSection } from './HeroSection'
import { ModernUploadSection } from './ModernUploadSection'
import { ModernStyleCarousel } from './ModernStyleCarousel'
import { AuthModal } from '../Auth/AuthModal'
import { QuotaLimitModal } from '../Creation/QuotaLimitModal'
import { UpgradeModal } from '../Subscription/UpgradeModal'
import { ModernGallery } from './ModernGallery'
import { EnhancedProfileView } from '../Profile/EnhancedProfileView'
import { GenerationView } from '../GenerationView'
import { InspirationPrompt } from '../InspirationPrompt'
import { ARViewModal } from '../ARViewModal'
import { Loader } from '../Loader'
import { FloatingActionButton } from './FloatingActionButton'
import { ProgressIndicator } from './ProgressIndicator'
import { ToastNotification, useToast } from './ToastNotification'
import { FeatureSpotlight } from './FeatureSpotlight'
import { LiveChatWidget } from './LiveChatWidget'
import { CommandPalette } from './CommandPalette'
import type { Style, UploadedFile } from '../../types'
import { STYLES } from '../../constants'

export const ModernApp: React.FC = () => {
  // View states
  const [currentView, setCurrentView] = useState<'creator' | 'gallery' | 'profile'>('creator')
  const [creatorStep, setCreatorStep] = useState<'hero' | 'upload' | 'style' | 'inspiration' | 'generating' | 'result'>('hero')
  
  // Modal states
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login')
  const [showQuotaModal, setShowQuotaModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [showARModal, setShowARModal] = useState(false)
  const [selectedFurnitureItem, setSelectedFurnitureItem] = useState<string | null>(null)
  const [showInspirationPrompt, setShowInspirationPrompt] = useState(false)
  
  // New state for premium features
  const [isNewUser, setIsNewUser] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  
  // Toast notifications
  const toast = useToast()
  
  // Auth store
  const { user, loading: authLoading, checkAuth } = useAuthStore()
  
  // Design store  
  const {
    originalFile,
    originalImage,
    generatedImage,
    selectedStyle,
    inspirationFile,
    furnitureItems,
    chatHistory,
    isGenerating,
    isAnalyzing,
    isRefining,
    isChangingAmbiance,
    error,
    uploadImage,
    selectStyle,
    setInspirationImage,
    generateDesign,
    refineDesign,
    changeAmbiance,
    saveDesign,
    publishToGallery,
    checkQuotaLimit,
    reset,
    clearError
  } = useDesignStore()

  // Initialize auth check
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle view transitions
  const handleViewChange = useCallback((view: 'creator' | 'gallery' | 'profile') => {
    setCurrentView(view)
    if (view === 'creator') {
      setCreatorStep('hero')
    }
  }, [])

  // Handle getting started
  const handleGetStarted = useCallback(() => {
    if (!user) {
      setAuthTab('signup')
      setShowAuthModal(true)
      return
    }
    setCreatorStep('upload')
  }, [user])

  // Handle image upload
  const handleImageUpload = useCallback((file: UploadedFile) => {
    uploadImage(file)
    setCompletedSteps(prev => [...prev, 'upload'])
    setCreatorStep('style')
    toast.success('Image Uploaded!', 'Your room photo has been processed successfully.')
  }, [uploadImage, toast])

  // Handle style selection
  const handleStyleSelect = useCallback(async (style: Style) => {
    if (!originalFile) return
    
    // Check quota first
    if (!checkQuotaLimit()) {
      setShowQuotaModal(true)
      toast.warning('Quota Reached', 'You\'ve used all your free generations. Upgrade to continue!')
      return
    }
    
    setCompletedSteps(prev => [...prev, 'style'])
    // Show inspiration prompt before generating
    setShowInspirationPrompt(true)
    await selectStyle(style)
    toast.info('Style Selected', `${style.name} style will be applied to your design.`)
  }, [originalFile, selectStyle, checkQuotaLimit, toast])

  // Handle surprise me
  const handleSurpriseMe = useCallback(() => {
    // TODO: Use style preferences for better recommendations
    const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)]
    handleStyleSelect(randomStyle)
  }, [handleStyleSelect])

  // Handle inspiration selection
  const handleInspirationSelect = useCallback(async (file: UploadedFile | null) => {
    setInspirationImage(file)
    setShowInspirationPrompt(false)
    setCreatorStep('generating')
    setCompletedSteps(prev => [...prev, 'generate'])
    
    if (file) {
      toast.info('Inspiration Added', 'Color palette will be extracted from your inspiration image.')
    }
    
    if (selectedStyle) {
      await generateDesign()
      setCreatorStep('result')
      setCompletedSteps(prev => [...prev, 'result'])
      toast.success('Design Complete!', 'Your AI-generated design is ready. You can now refine it with chat.')
    }
  }, [setInspirationImage, selectedStyle, generateDesign, toast])

  // Handle chat messages
  const handleSendMessage = useCallback(async (message: string) => {
    await refineDesign(message)
  }, [refineDesign])

  // Handle ambiance changes
  const handleAmbianceChange = useCallback(async (prompt: string) => {
    await changeAmbiance(prompt)
  }, [changeAmbiance])

  // Handle try another style
  const handleTryAnotherStyle = useCallback(() => {
    reset()
    setCreatorStep('style')
  }, [reset])

  // Handle AR viewing
  const handleViewInAR = useCallback((itemName: string) => {
    setSelectedFurnitureItem(itemName)
    setShowARModal(true)
  }, [])

  // Handle auth modal
  const handleAuthOpen = useCallback((tab: 'login' | 'signup' = 'login') => {
    setAuthTab(tab)
    setShowAuthModal(true)
  }, [])

  const handleAuthClose = useCallback(() => {
    setShowAuthModal(false)
  }, [])

  // Handle publish to gallery
  const handlePublish = useCallback(async () => {
    if (!user) {
      handleAuthOpen('signup')
      return
    }
    await publishToGallery()
    toast.success('Published!', 'Your design has been shared with the community.', {
      label: 'View Gallery',
      onClick: () => setCurrentView('gallery')
    })
  }, [user, publishToGallery, handleAuthOpen, toast])

  // Handle floating action button actions
  const handleNewDesign = useCallback(() => {
    reset()
    setCreatorStep('upload')
    setCompletedSteps([])
  }, [reset])

  const handleHelp = useCallback(() => {
    toast.info('Need Help?', 'Check our documentation or contact support for assistance.')
  }, [toast])

  // Handle feature spotlight actions
  const handleFeatureSpotlightAction = useCallback((featureId: string) => {
    switch (featureId) {
      case 'ai-chat':
        toast.info('AI Chat', 'Start generating a design to access AI chat features!')
        break
      case 'pro-upgrade':
        setShowUpgradeModal(true)
        break
      case 'style-fusion':
        setCreatorStep('style')
        toast.info('Style Fusion', 'Try the "Surprise Me" button for AI-powered style combinations!')
        break
    }
  }, [toast])

  const handleFeatureSpotlightDismiss = useCallback((featureId: string) => {
    // Store dismissed features in localStorage or user preferences
    localStorage.setItem(`feature-dismissed-${featureId}`, 'true')
  }, [])

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-600 font-medium"
          >
            Loading your creative space...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  // Creator view content
  const renderCreatorContent = () => {
    switch (creatorStep) {
      case 'hero':
        return <HeroSection onGetStarted={handleGetStarted} />
      
      case 'upload':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Upload Your Room Photo
                </h1>
                <p className="text-xl text-gray-600">
                  Let's start transforming your space
                </p>
              </motion.div>
              <ModernUploadSection onImageUpload={handleImageUpload} />
            </div>
          </div>
        )
      
      case 'style':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-20">
            <div className="container mx-auto px-4">
              <ModernStyleCarousel 
                onStyleSelect={handleStyleSelect} 
                onSurpriseMe={handleSurpriseMe} 
              />
            </div>
          </div>
        )
      
      case 'generating':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Loader />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-4"
              >
                <h2 className="text-3xl font-bold text-gray-900">
                  Creating Your Dream Space
                </h2>
                <p className="text-lg text-gray-600">
                  Our AI is working its magic...
                </p>
                {selectedStyle && (
                  <p className="text-sm text-gray-500">
                    Applying <span className="font-medium text-orange-600">{selectedStyle.name}</span> style
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        )
      
      case 'result':
        if (generatedImage && originalImage && selectedStyle) {
          return (
            <div className="min-h-screen bg-gray-50 py-8">
              <div className="container mx-auto px-4">
                <GenerationView
                  originalImage={originalImage}
                  generatedImage={generatedImage}
                  onSendMessage={handleSendMessage}
                  chatHistory={chatHistory}
                  isRefining={isRefining}
                  selectedStyle={selectedStyle}
                  onTryAnotherStyle={handleTryAnotherStyle}
                  originalFileName={originalFile?.name || ''}
                  furnitureItems={furnitureItems}
                  isAnalyzing={isAnalyzing}
                  inspirationFile={inspirationFile}
                  onAmbianceChange={handleAmbianceChange}
                  isChangingAmbiance={isChangingAmbiance}
                  onPublish={handlePublish}
                  onViewInAR={handleViewInAR}
                />
              </div>
            </div>
          )
        }
        return null
      
      default:
        return <HeroSection onGetStarted={handleGetStarted} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader
        currentView={currentView}
        onViewChange={handleViewChange}
        onAuthOpen={() => handleAuthOpen('login')}
      />

      <main className="relative">
        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              <p className="font-medium">{error}</p>
              <button 
                onClick={clearError}
                className="ml-4 text-red-200 hover:text-white underline text-sm"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        {currentView === 'creator' && creatorStep !== 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-6"
          >
            <ProgressIndicator 
              currentStep={creatorStep} 
              completedSteps={completedSteps} 
            />
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {currentView === 'creator' && (
            <motion.div
              key="creator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderCreatorContent()}
            </motion.div>
          )}
          
          {currentView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ModernGallery />
            </motion.div>
          )}
          
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EnhancedProfileView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthClose}
        defaultTab={authTab}
      />
      
      <QuotaLimitModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        onUpgrade={() => {
          setShowQuotaModal(false)
          setShowUpgradeModal(true)
        }}
      />
      
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />

      {showInspirationPrompt && selectedStyle && (
        <InspirationPrompt 
          onInspirationSelect={handleInspirationSelect}
        />
      )}
      
      <ARViewModal 
        isOpen={showARModal} 
        onClose={() => setShowARModal(false)}
        itemName={selectedFurnitureItem || ''}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        onNewDesign={handleNewDesign}
        onHelp={handleHelp}
        currentStep={creatorStep}
      />

      {/* Toast Notifications */}
      <ToastNotification
        toasts={toast.toasts}
        onRemove={toast.removeToast}
      />

      {/* Feature Spotlight */}
      <FeatureSpotlight
        userPlan={user?.plan || null}
        isNewUser={isNewUser}
        onAction={handleFeatureSpotlightAction}
        onDismiss={handleFeatureSpotlightDismiss}
      />

      {/* Live Chat Widget */}
      <LiveChatWidget
        isOpen={showLiveChat}
        onToggle={() => setShowLiveChat(!showLiveChat)}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onNavigate={(view) => {
          setCurrentView(view as any)
          setShowCommandPalette(false)
        }}
        onNewDesign={() => {
          handleNewDesign()
          setShowCommandPalette(false)
        }}
        onShowUpgrade={() => {
          setShowUpgradeModal(true)
          setShowCommandPalette(false)
        }}
        onShowHelp={() => {
          setShowLiveChat(true)
          setShowCommandPalette(false)
        }}
      />
    </div>
  )
}