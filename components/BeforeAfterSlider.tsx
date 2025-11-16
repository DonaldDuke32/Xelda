import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeftRightIcon } from './icons';
import { UI_TEXT } from '../constants';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
  
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove, handleMouseUp]);


  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden rounded-2xl">
      <img src={beforeImage} alt="Before" className="absolute w-full h-full object-cover" />
      <div 
        className="absolute w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt="After" className="absolute w-full h-full object-cover" />
      </div>

      <div 
        className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${isDragging ? 'shadow-orange-500/50 shadow-2xl scale-110' : 'shadow-black/30'}`}
        >
          <ChevronLeftRightIcon className="w-6 h-6 text-gray-800"/>
        </div>
      </div>
      <div className="absolute top-2 left-2 px-3 py-1 bg-black/50 rounded-full text-white font-bold text-sm pointer-events-none">{UI_TEXT.before}</div>
      <div className="absolute top-2 right-2 px-3 py-1 bg-black/50 rounded-full text-white font-bold text-sm pointer-events-none">{UI_TEXT.after}</div>
    </div>
  );
};