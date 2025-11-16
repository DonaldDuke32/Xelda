import React from 'react';
import { UI_TEXT } from '../constants';
import { SparkleIcon, GalleryIcon, ProfileIcon } from './icons';

type AppView = 'creator' | 'gallery' | 'profile';

interface HeaderProps {
    onLogoClick: () => void;
    onNavClick: (view: AppView) => void;
    activeView: AppView;
}

const NavButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
    Icon: React.ElementType;
}> = ({ onClick, isActive, children, Icon }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            isActive 
            ? 'bg-orange-500/20 text-orange-400' 
            : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
        }`}
    >
        <Icon className="w-5 h-5" />
        {children}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ onLogoClick, onNavClick, activeView }) => {
  return (
    <header className="w-full p-4 bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div onClick={onLogoClick} className="flex items-center gap-3 cursor-pointer w-fit">
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
                XELDA
            </span>
        </div>
        <nav className="flex items-center gap-2 bg-zinc-900/50 p-1 rounded-full border border-white/10">
            <NavButton onClick={() => onNavClick('creator')} isActive={activeView === 'creator'} Icon={SparkleIcon}>{UI_TEXT.navCreator}</NavButton>
            <NavButton onClick={() => onNavClick('gallery')} isActive={activeView === 'gallery'} Icon={GalleryIcon}>{UI_TEXT.navGallery}</NavButton>
            <NavButton onClick={() => onNavClick('profile')} isActive={activeView === 'profile'} Icon={ProfileIcon}>{UI_TEXT.navProfile}</NavButton>
        </nav>
      </div>
    </header>
  );
};