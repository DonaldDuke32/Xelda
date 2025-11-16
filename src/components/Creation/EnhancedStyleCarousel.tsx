import React, { useState, useEffect } from 'react';
import { STYLES, UI_TEXT } from '../../constants';
import { useAuthStore } from '../../stores/authStore';
import { useDesignStore } from '../../stores/designStore';
import type { Style } from '../../types';
import { SparkleIcon, CrownIcon, LockIcon } from '../icons';
import aiService from '../../services/ai';

interface EnhancedStyleCarouselProps {
  onStyleSelect: (style: Style) => void;
  onSurpriseMe: () => void;
}

interface StyleFeatures {
  style: Style;
  isPremium: boolean;
  description: string;
  examples: string[];
  popularity: number;
}

export const EnhancedStyleCarousel: React.FC<EnhancedStyleCarouselProps> = ({ 
  onStyleSelect, 
  onSurpriseMe 
}) => {
  const [surpriseStyle, setSurpriseStyle] = useState<string>('');
  const [surpriseReasoning, setSurpriseReasoning] = useState<string>('');
  const { user } = useAuthStore();
  const { userDesigns } = useDesignStore();

  // Enhanced style features
  const styleFeatures: StyleFeatures[] = STYLES.map(style => ({
    style,
    isPremium: ['luxury', 'futuristic'].includes(style.id), // Some premium styles
    description: style.description,
    examples: getStyleExamples(style.id),
    popularity: getStylePopularity(style.id)
  }));

  function getStyleExamples(styleId: string): string[] {
    const examples = {
      minimalist: ['Lit plateforme blanc', 'Table de chevet épurée', 'Éclairage indirect'],
      scandinavian: ['Bois naturel', 'Textiles en laine', 'Couleurs douces'],
      modern: ['Formes géométriques', 'Matériaux high-tech', 'Couleurs contrastées'],
      bohemian: ['Tapisseries colorées', 'Plantes suspendues', 'Coussins ethniques'],
      luxury: ['Velours doré', 'Marbre blanc', 'Lustres cristal'],
      industrial: ['Briques apparentes', 'Métal patiné', 'Éclairage Edison'],
      vintage: ['Meubles chinés', 'Papier peint rétro', 'Objets d\'époque'],
      gamer_setup: ['RGB multicolore', 'Station de jeu', 'Néons futuristes'],
      futuristic: ['Surfaces chromées', 'LED intégrées', 'Formes organiques'],
      cozy: ['Plaids tricotés', 'Bougies parfumées', 'Coin lecture']
    };
    return examples[styleId as keyof typeof examples] || [];
  }

  function getStylePopularity(styleId: string): number {
    const popularity = {
      minimalist: 95,
      scandinavian: 88,
      modern: 92,
      bohemian: 85,
      luxury: 78,
      industrial: 82,
      vintage: 75,
      gamer_setup: 68,
      futuristic: 71,
      cozy: 90
    };
    return popularity[styleId as keyof typeof popularity] || 70;
  }

  // Smart surprise me with AI recommendations
  const handleSurpriseMe = async () => {
    try {
      const userStyleData = userDesigns.map(design => ({
        style: design.style,
        liked: design.like_count > 0
      }));

      const styleProfile = await aiService.analyzeStyleProfile(userStyleData);
      const surpriseData = await aiService.generateSurpriseStyle(styleProfile);

      setSurpriseStyle(surpriseData.style);
      setSurpriseReasoning(surpriseData.reasoning);
      
      const selectedStyle = STYLES.find(s => s.id === surpriseData.style);
      if (selectedStyle) {
        onStyleSelect(selectedStyle);
      }
    } catch (error) {
      // Fallback to random selection
      onSurpriseMe();
    }
  };

  const canAccessStyle = (styleFeature: StyleFeatures) => {
    if (!styleFeature.isPremium) return true;
    return user?.plan !== 'free';
  };

  const StyleCard: React.FC<{ styleFeature: StyleFeatures }> = ({ styleFeature }) => {
    const { style, isPremium, examples, popularity } = styleFeature;
    const canAccess = canAccessStyle(styleFeature);
    
    return (
      <div
        onClick={() => canAccess ? onStyleSelect(style) : null}
        className={`group relative flex-shrink-0 w-48 h-64 bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-4 flex flex-col text-center cursor-pointer overflow-hidden transition-all duration-300 border border-white/10 ${
          canAccess 
            ? 'hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 hover:border-orange-500/50'
            : 'opacity-60 cursor-not-allowed'
        }`}
      >
        {/* Premium Badge */}
        {isPremium && (
          <div className="absolute top-3 right-3">
            {canAccess ? (
              <CrownIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <LockIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>
        )}

        {/* Popularity Indicator */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-1 text-xs">
            <div className={`w-2 h-2 rounded-full ${
              popularity >= 90 ? 'bg-green-400' : 
              popularity >= 80 ? 'bg-yellow-400' : 'bg-orange-400'
            }`}></div>
            <span className="text-gray-400">{popularity}%</span>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center">
            <style.icon className={`w-12 h-12 mb-3 transition-colors duration-300 ${
              canAccess ? 'text-yellow-400 group-hover:text-white' : 'text-gray-500'
            }`} />
            
            <h3 className="font-bold text-white mb-2">{style.name}</h3>
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{style.description}</p>
          </div>
          
          {/* Examples */}
          <div className="w-full">
            <div className="text-xs text-gray-500 mb-2">Inclut:</div>
            <div className="space-y-1">
              {examples.slice(0, 3).map((example, idx) => (
                <div key={idx} className="text-xs text-gray-400 truncate">
                  • {example}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lock Overlay */}
        {!canAccess && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <div className="text-center">
              <LockIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400 px-2">
                Plan Pro requis
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Style Grid */}
      <div className="relative w-full">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-600">
          {styleFeatures.map(styleFeature => (
            <StyleCard key={styleFeature.style.id} styleFeature={styleFeature} />
          ))}
        </div>
      </div>

      {/* Enhanced Surprise Me */}
      <div className="text-center space-y-4">
        <button
          onClick={handleSurpriseMe}
          className="group shimmer-button relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black"
        >
          <SparkleIcon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-12" />
          {UI_TEXT.surpriseMe}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </button>

        {/* AI Reasoning Display */}
        {surpriseReasoning && (
          <div className="max-w-md mx-auto p-4 bg-zinc-800/50 rounded-xl border border-orange-500/20">
            <div className="flex items-center gap-2 mb-2">
              <SparkleIcon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">IA Recommendation</span>
            </div>
            <p className="text-sm text-gray-300">{surpriseReasoning}</p>
            {surpriseStyle && (
              <div className="mt-2 text-xs text-gray-400">
                Style suggéré: <span className="text-orange-400 font-medium capitalize">{surpriseStyle}</span>
              </div>
            )}
          </div>
        )}

        {/* Style Stats for Logged Users */}
        {user && userDesigns.length > 0 && (
          <div className="max-w-lg mx-auto p-4 bg-zinc-900/30 rounded-xl border border-white/10">
            <h3 className="text-sm font-medium text-gray-300 mb-3 text-center">Vos styles préférés</h3>
            <div className="flex justify-center gap-6">
              {Object.entries(
                userDesigns.reduce((acc, design) => {
                  acc[design.style] = (acc[design.style] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([style, count]) => (
                  <div key={style} className="text-center">
                    <div className="text-lg font-bold text-orange-400">{count}</div>
                    <div className="text-xs text-gray-400 capitalize">{style}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};