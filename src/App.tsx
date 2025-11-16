import React, { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { useDesignStore } from './stores/designStore';
import type { Style, Message, UploadedFile, FurnitureItem, GalleryItem } from '../types';
import { UI_TEXT, STYLES, GENERATING_MESSAGES, MOCK_GALLERY_ITEMS } from '../constants';
import { Header } from './components/Layout/Header';
import { AuthModal } from './components/Auth/AuthModal';
import { UploadSection } from '../components/UploadSection';
import { StyleCarousel } from '../components/StyleCarousel';
import { GenerationView } from '../components/GenerationView';
import { InspirationPrompt } from '../components/InspirationPrompt';
import { EnhancedGalleryView } from './components/Gallery/EnhancedGalleryView';
import { EnhancedProfileView } from './components/Profile/EnhancedProfileView';
import { ARViewModal } from '../components/ARViewModal';
import { QuotaLimitModal } from './components/Creation/QuotaLimitModal';
import { UpgradeModal } from './components/Subscription/UpgradeModal';
import { Loader } from '../components/Loader';

function App() {
  const [currentView, setCurrentView] = useState<'creator' | 'gallery' | 'profile'>('creator');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [showARModal, setShowARModal] = useState(false);
  const [selectedFurnitureItem, setSelectedFurnitureItem] = useState<string | null>(null);
  const [showInspirationPrompt, setShowInspirationPrompt] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Auth store
  const { user, loading: authLoading, checkAuth } = useAuthStore();
  
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
    reset,
    clearError
  } = useDesignStore();

  // Initialize auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle image upload
  const handleImageUpload = useCallback((file: UploadedFile) => {
    uploadImage(file);
  }, [uploadImage]);

  // Handle style selection with inspiration prompt
  const handleStyleSelect = useCallback(async (style: Style) => {
    if (!originalFile) return;
    
    // Check quota first
    if (!checkQuotaLimit()) {
      setShowQuotaModal(true);
      return;
    }
    
    // Show inspiration prompt before generating
    setShowInspirationPrompt(true);
    await selectStyle(style);
  }, [originalFile, selectStyle, checkQuotaLimit]);

  // Handle surprise me
  const handleSurpriseMe = useCallback(() => {
    // TODO: Use style preferences for better recommendations
    const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)];
    handleStyleSelect(randomStyle);
  }, [handleStyleSelect]);

  // Handle inspiration selection
  const handleInspirationSelect = useCallback(async (file: UploadedFile | null) => {
    setInspirationImage(file);
    setShowInspirationPrompt(false);
    
    if (selectedStyle) {
      await generateDesign();
    }
  }, [setInspirationImage, selectedStyle, generateDesign]);

  // Handle chat messages
  const handleSendMessage = useCallback(async (message: string) => {
    await refineDesign(message);
  }, [refineDesign]);

  // Handle ambiance changes
  const handleAmbianceChange = useCallback(async (prompt: string) => {
    await changeAmbiance(prompt);
  }, [changeAmbiance]);

  // Handle try another style
  const handleTryAnotherStyle = useCallback(() => {
    reset();
  }, [reset]);

  // Handle AR viewing
  const handleViewInAR = useCallback((itemName: string) => {
    setSelectedFurnitureItem(itemName);
    setShowARModal(true);
  }, []);

  // Handle auth modal
  const handleAuthOpen = useCallback((tab: 'login' | 'signup' = 'login') => {
    setAuthTab(tab);
    setShowAuthModal(true);
  }, []);

  const handleAuthClose = useCallback(() => {
    setShowAuthModal(false);
  }, []);

  // Handle publish to gallery
  const handlePublish = useCallback(async () => {
    if (!user) {
      handleAuthOpen('signup');
      return;
    }
    await publishToGallery();
  }, [user, publishToGallery, handleAuthOpen]);

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Creator view content
  const renderCreatorView = () => {
    // Show inspiration prompt
    if (showInspirationPrompt && selectedStyle) {
      return (
        <InspirationPrompt 
          onInspirationSelect={handleInspirationSelect}
        />
      );
    }

    // Show generation process
    if (isGenerating) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader />
            <h2 className="text-2xl font-bold mt-8">{UI_TEXT.generating}</h2>
            <p className="text-gray-400 mt-2">{UI_TEXT.generatingSubtitle}</p>
          </div>
        </div>
      );
    }

    // Show results
    if (generatedImage && originalImage && selectedStyle) {
      return (
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
      );
    }

    // Show style selection
    if (originalImage) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Choisissez votre <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">style</span>
            </h2>
            <p className="text-gray-400">Sélectionnez le style qui vous inspire le plus</p>
          </div>
          <StyleCarousel onStyleSelect={handleStyleSelect} onSurpriseMe={handleSurpriseMe} />
        </div>
      );
    }

    // Show upload section
    return (
      <div className="flex-grow flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{UI_TEXT.welcomeTitle}</h1>
          <p className="text-xl text-gray-300 mb-2">{UI_TEXT.welcomeSubtitle}</p>
          <p className="text-gray-400">{UI_TEXT.welcomeCTA}</p>
        </div>
        <UploadSection onImageUpload={handleImageUpload} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onAuthOpen={() => handleAuthOpen('login')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={clearError}
              className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Main Content */}
        {currentView === 'creator' && renderCreatorView()}
        {currentView === 'gallery' && <EnhancedGalleryView />}
        {currentView === 'profile' && <EnhancedProfileView />}
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthClose}
        defaultTab={authTab}
      />
      
      <ARViewModal 
        isOpen={showARModal} 
        onClose={() => setShowARModal(false)}
        itemName={selectedFurnitureItem || ''}
      />
      
      <QuotaLimitModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        onUpgrade={() => {
          setShowQuotaModal(false);
          setShowUpgradeModal(true);
        }}
      />
      
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
}

export default App;