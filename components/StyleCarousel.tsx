import React from 'react';
import { STYLES, UI_TEXT } from '../constants';
import type { Style } from '../types';
import { SparkleIcon } from './icons';

interface StyleCarouselProps {
  onStyleSelect: (style: Style) => void;
  onSurpriseMe: () => void;
}

const StyleCard: React.FC<{ style: Style; onClick: () => void }> = ({ style, onClick }) => (
  <div
    onClick={onClick}
    className="group relative flex-shrink-0 w-40 h-48 bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 border border-white/10 hover:border-orange-500/50"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="relative z-10 flex flex-col items-center justify-center">
      <style.icon className="w-12 h-12 mb-3 text-yellow-400 transition-colors duration-300 group-hover:text-white" />
      <h3 className="font-bold text-white">{style.name}</h3>
      <p className="text-xs text-gray-400 mt-1">{style.description}</p>
    </div>
  </div>
);

export const StyleCarousel: React.FC<StyleCarouselProps> = ({ onStyleSelect, onSurpriseMe }) => {
  return (
    <div className="w-full flex flex-col items-center gap-8">
       <div className="relative w-full">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 scrollbar-thin">
            {STYLES.map(style => (
            <StyleCard key={style.id} style={style} onClick={() => onStyleSelect(style)} />
            ))}
        </div>
      </div>
      <button
        onClick={onSurpriseMe}
        className="group shimmer-button relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-black"
      >
        <SparkleIcon className="w-6 h-6 mr-2 transition-transform duration-300 group-hover:rotate-12" />
        {UI_TEXT.surpriseMe}
      </button>
    </div>
  );
};