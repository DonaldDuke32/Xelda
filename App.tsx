import React, { useState, useCallback, useEffect } from 'react';
import type { Style, Message, UploadedFile, FurnitureItem, GalleryItem } from './types';
import { UI_TEXT, STYLES, GENERATING_MESSAGES, MOCK_GALLERY_ITEMS } from './constants';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { StyleCarousel } from './components/StyleCarousel';
import { GenerationView } from './components/GenerationView';
import { InspirationPrompt } from './components/InspirationPrompt';
import { Loader } from './components/Loader';
import { GalleryView } from './components/GalleryView';
import { ProfileView } from './components/ProfileView';
import { ARViewModal } from './components/ARViewModal';
import aiService from './services/ai';

type AppState = 'upload' | 'style_select' | 'inspiration_prompt' | 'generating' | 'refining';
type AppView = 'creator' | 'gallery' | 'profile';

export default function App() {
  const [appView, setAppView] = useState<AppView>('creator');
  const [appState, setAppState] = useState<AppState>('upload');
  const [originalFile, setOriginalFile] = useState<UploadedFile | null>(null);
  const [inspirationFile, setInspirationFile] = useState<UploadedFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [furnitureItems, setFurnitureItems] = useState<FurnitureItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isChangingAmbiance, setIsChangingAmbiance] = useState(false);
  const [generatingText, setGeneratingText] = useState(GENERATING_MESSAGES[0]);
  
  // New states for advanced features
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(MOCK_GALLERY_ITEMS);
  const [styleProfile, setStyleProfile] = useState<Record<string, number>>({});
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [arItemName, setArItemName] = useState('');
  
  // State for view transitions
  const [isViewVisible, setIsViewVisible] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (appState === 'generating') {
      let index = 0;
      interval = setInterval(() => {
        index = (index + 1) % GENERATING_MESSAGES.length;
        setGeneratingText(GENERATING_MESSAGES[index]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [appState]);

  const resetToUpload = () => {
    handleNavigation('creator');
    setAppState('upload');
    setOriginalFile(null);
    setInspirationFile(null);
    setGeneratedImage(null);
    setSelectedStyle(null);
    setChatHistory([]);
    setError(null);
    setFurnitureItems([]);
  };
  
  const handleNavigation = (view: AppView) => {
    if (view === appView) return;
    setIsViewVisible(false);
    setTimeout(() => {
        setAppView(view);
        setIsViewVisible(true);
    }, 300); // Match transition duration
  };

  const handleImageUpload = (file: UploadedFile) => {
    setOriginalFile(file);
    setAppState('style_select');
    setError(null);
  };
  
  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style);
    setAppState('inspiration_prompt');
  };
  
  const updateStyleProfile = (styleName: string) => {
    const mainStyles = styleName.split(' + ');
    mainStyles.forEach(sName => {
        setStyleProfile(prev => ({ ...prev, [sName]: (prev[sName] || 0) + 1 }));
    });
  };

  const runGeneration = useCallback(async (styleToUse: Style, inspiration?: UploadedFile | null, promptOverride?: string) => {
    if (!originalFile) return;

    setAppState('generating');
    setGeneratingText(GENERATING_MESSAGES[0]);
    setError(null);
    setGeneratedImage(null);
    setFurnitureItems([]);
    setInspirationFile(inspiration || null);

    try {
      const result = await aiService.generateDesign(originalFile.base64, originalFile.mimeType, promptOverride || styleToUse.name, inspiration || undefined);
      setGeneratedImage(result);
      updateStyleProfile(styleToUse.name);
      
      setIsAnalyzing(true);
      const items = await aiService.analyzeFurniture(result, 'image/png');
      setFurnitureItems(items);
      setIsAnalyzing(false);
      
      setChatHistory([{ sender: 'ai', text: UI_TEXT.chatWelcome }]);
      setAppState('refining');
    } catch (err) {
      console.error(err);
      setError(UI_TEXT.errorGeneration);
      setAppState('style_select');
    }
  }, [originalFile]);

  const handleSurpriseMe = () => {
    let randomStyle1: Style, randomStyle2: Style;
    const profileStyles = Object.keys(styleProfile);

    if (profileStyles.length > 1 && Math.random() < 0.7) {
        // Smart surprise based on profile
        const sortedStyles = profileStyles.sort((a, b) => styleProfile[b] - styleProfile[a]);
        randomStyle1 = STYLES.find(s => s.name === sortedStyles[0])!;
        randomStyle2 = STYLES.find(s => s.name === sortedStyles[1])!;
    } else {
        // Pure random surprise
        randomStyle1 = STYLES[Math.floor(Math.random() * STYLES.length)];
        randomStyle2 = STYLES[Math.floor(Math.random() * STYLES.length)];
        while (randomStyle1.id === randomStyle2.id) {
            randomStyle2 = STYLES[Math.floor(Math.random() * STYLES.length)];
        }
    }
    
    const combinedStyle: Style = {
        ...randomStyle1,
        id: `${randomStyle1.id}+${randomStyle2.id}`,
        name: `${randomStyle1.name} + ${randomStyle2.name}`
    };
    setSelectedStyle(combinedStyle);
    runGeneration(combinedStyle, null, `a creative fusion of ${randomStyle1.id} and ${randomStyle2.id}`);
  };
  
  const handleInspirationSubmit = (inspiration?: UploadedFile) => {
    if(selectedStyle) {
      runGeneration(selectedStyle, inspiration);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!generatedImage || !selectedStyle || !originalFile) return;

    const newHistory: Message[] = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);
    setIsRefining(true);

    try {
      const result = await aiService.refineDesign(generatedImage, 'image/png', message, selectedStyle.name);
      setGeneratedImage(result);
      setChatHistory([...newHistory, { sender: 'ai', text: "Voici le design mis à jour. D'autres modifications ?" }]);
    } catch (err) {
      console.error(err);
      setChatHistory([...newHistory, { sender: 'ai', text: "Désolé, je n'ai pas pu appliquer cette modification. Veuillez réessayer." }]);
    } finally {
      setIsRefining(false);
    }
  };
  
  const handleAmbianceChange = async (ambiancePrompt: string) => {
    if (!generatedImage || !selectedStyle || !originalFile) return;
    setIsChangingAmbiance(true);
    try {
        const result = await aiService.refineDesign(generatedImage, 'image/png', ambiancePrompt, selectedStyle.name);
        setGeneratedImage(result);
    } catch (err) {
        console.error("Ambiance change failed", err);
    } finally {
        setIsChangingAmbiance(false);
    }
  };

  const handleTryAnotherStyle = () => {
    setAppState('style_select');
    setGeneratedImage(null);
    setSelectedStyle(null);
    setChatHistory([]);
    setInspirationFile(null);
    setFurnitureItems([]);
  };

  const backToStyleSelect = () => {
    setAppState('style_select');
  }

  const handlePublishToGallery = () => {
      if (!generatedImage || !selectedStyle) return;
      const newItem: GalleryItem = {
          id: new Date().toISOString(),
          imageUrl: `data:image/png;base64,${generatedImage}`,
          styleName: selectedStyle.name,
          prompt: selectedStyle.description,
          author: "Vous",
          likes: 0
      };
      setGalleryItems(prev => [newItem, ...prev]);
      alert("Design publié dans la galerie !");
      handleNavigation('gallery');
  }

  const handleViewInAR = (itemName: string) => {
      setArItemName(itemName);
      setIsARModalOpen(true);
  }

  const renderCurrentView = () => {
    switch(appView) {
        case 'creator':
            return renderCreatorContent();
        case 'gallery':
            return <GalleryView items={galleryItems} />;
        case 'profile':
            return <ProfileView styleProfile={styleProfile} />;
        default:
            return null;
    }
  }

  const renderCreatorContent = () => {
    switch(appState) {
        case 'upload':
            return (
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text mb-2">
                    {UI_TEXT.welcomeTitle}
                    </h1>
                    <p className="text-lg text-gray-300 mb-4">{UI_TEXT.welcomeSubtitle}</p>
                    <p className="text-xl text-gray-200 mb-8">{UI_TEXT.welcomeCTA}</p>
                    <UploadSection onImageUpload={handleImageUpload} />
                </div>
            );
        case 'style_select':
            return originalFile && (
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6">Choisissez un style</h2>
                    <StyleCarousel onStyleSelect={handleStyleSelect} onSurpriseMe={handleSurpriseMe} />
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </div>
            );
        case 'inspiration_prompt':
            return selectedStyle && (
                <InspirationPrompt
                    onGenerate={handleInspirationSubmit}
                    onBack={backToStyleSelect}
                    styleName={selectedStyle.name}
                />
            );
        case 'refining':
            return generatedImage && selectedStyle && originalFile && (
                <div className="w-full max-w-7xl mx-auto">
                    <GenerationView
                    originalImage={originalFile.base64}
                    generatedImage={generatedImage}
                    onSendMessage={handleSendMessage}
                    chatHistory={chatHistory}
                    isRefining={isRefining}
                    selectedStyle={selectedStyle}
                    onTryAnotherStyle={handleTryAnotherStyle}
                    originalFileName={originalFile.name}
                    furnitureItems={furnitureItems}
                    isAnalyzing={isAnalyzing}
                    inspirationFile={inspirationFile}
                    onAmbianceChange={handleAmbianceChange}
                    isChangingAmbiance={isChangingAmbiance}
                    onPublish={handlePublishToGallery}
                    onViewInAR={handleViewInAR}
                    />
                </div>
            );
        case 'generating':
            return (
                <div className="flex flex-col items-center justify-center flex-grow">
                    <Loader />
                    <h2 className="text-2xl font-bold mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
                    {UI_TEXT.generating}
                    </h2>
                    <p className="text-gray-300 mt-2 text-center" key={generatingText}>{generatingText}</p>
                </div>
            );
        default:
          return null;
    }
  }

  return (
    <div className="min-h-screen bg-black/50 text-white flex flex-col">
      <Header onLogoClick={resetToUpload} onNavClick={handleNavigation} activeView={appView}/>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className={`w-full h-full flex items-center justify-center transition-opacity duration-300 ${isViewVisible ? 'opacity-100' : 'opacity-0'}`}>
            {renderCurrentView()}
        </div>
      </main>
      {isARModalOpen && <ARViewModal itemName={arItemName} onClose={() => setIsARModalOpen(false)} />}
    </div>
  );
}