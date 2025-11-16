import React from 'react';
import type { GalleryItem } from '../types';
import { UI_TEXT } from '../constants';
import { HeartIcon, RemixIcon, DownloadIcon } from './icons';

interface GalleryViewProps {
  items: GalleryItem[];
}

const GalleryCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    const link = document.createElement('a');
    const fileName = `XELDA_${item.styleName.replace(/\s/g, '_')}_${item.author.replace(/\s/g, '')}.png`;
    link.href = item.imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  return (
    <div className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 cursor-pointer">
      <img src={item.imageUrl} alt={item.styleName} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={handleDownload} className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-orange-500 transition-colors" title="Télécharger">
            <DownloadIcon className="w-5 h-5" />
        </button>
        <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-orange-500 transition-colors" title="Remixer ce style">
            <RemixIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="font-bold text-white">{item.styleName}</h3>
        <p className="text-sm text-gray-300">par {item.author}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-red-400">
            <HeartIcon className="w-5 h-5 fill-current" />
            <span className="font-semibold">{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GalleryView: React.FC<GalleryViewProps> = ({ items }) => {
  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text mb-2">
          {UI_TEXT.galleryTitle}
        </h1>
        <p className="text-lg text-gray-300">{UI_TEXT.gallerySubtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};