import React from 'react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ChatPanel } from './ChatPanel';
import { DownloadIcon, RetryIcon, SunIcon, MoonIcon, ZapIcon, InfoIcon, ARIcon, GalleryIcon } from './icons';
import type { Message, Style, UploadedFile, FurnitureItem } from '../types';
import { UI_TEXT, AMBIANCE_PRESETS } from '../constants';
import { Loader } from './Loader';

interface GenerationViewProps {
  originalImage: string;
  generatedImage: string;
  onSendMessage: (message: string) => void;
  chatHistory: Message[];
  isRefining: boolean;
  selectedStyle: Style;
  onTryAnotherStyle: () => void;
  originalFileName: string;
  furnitureItems: FurnitureItem[];
  isAnalyzing: boolean;
  inspirationFile: UploadedFile | null;
  onAmbianceChange: (prompt: string) => void;
  isChangingAmbiance: boolean;
  onPublish: () => void;
  onViewInAR: (itemName: string) => void;
}

const AmbianceButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    children: React.ReactNode;
    Icon: React.ElementType;
}> = ({ onClick, disabled, children, Icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-zinc-800/70 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <Icon className="w-4 h-4" />
        {children}
    </button>
);

export const GenerationView: React.FC<GenerationViewProps> = ({
  originalImage,
  generatedImage,
  onSendMessage,
  chatHistory,
  isRefining,
  selectedStyle,
  onTryAnotherStyle,
  furnitureItems,
  isAnalyzing,
  inspirationFile,
  onAmbianceChange,
  isChangingAmbiance,
  onPublish,
  onViewInAR,
}) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    const fileName = `XELDA_${selectedStyle.id}_${date}.png`;
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6">
      <div className="flex-grow lg:w-2/3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <h2 className="text-2xl font-bold">
                Style: <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">{selectedStyle.name}</span>
            </h2>
            <div className="flex gap-2">
                <button onClick={onTryAnotherStyle} className="px-4 py-2 text-sm font-semibold text-white bg-zinc-800/70 rounded-lg hover:bg-zinc-800 transition-colors flex items-center gap-2">
                    <RetryIcon className="w-4 h-4"/>
                    {UI_TEXT.tryAnotherStyle}
                </button>
                <button onClick={handleDownload} className="px-4 py-2 text-sm font-semibold text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2">
                    <DownloadIcon className="w-4 h-4" />
                    {UI_TEXT.download}
                </button>
                 <button onClick={onPublish} className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                    <GalleryIcon className="w-4 h-4"/>
                    {UI_TEXT.publishToGallery}
                </button>
            </div>
        </div>
        
        <div className="relative flex-grow aspect-[16/9] bg-black/30 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
           <BeforeAfterSlider beforeImage={`data:image/jpeg;base64,${originalImage}`} afterImage={`data:image/png;base64,${generatedImage}`} />
           {inspirationFile && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                    <img src={`data:${inspirationFile.mimeType};base64,${inspirationFile.base64}`} alt="Inspiration" className="w-10 h-10 rounded-md object-cover" />
                    <div>
                        <p className="text-xs text-gray-400">Palette d'inspiration</p>
                        <p className="text-sm font-semibold text-white">{inspirationFile.name}</p>
                    </div>
                </div>
            )}
            {isChangingAmbiance && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <div className="flex flex-col items-center">
                        <Loader />
                        <p className="mt-4 text-white font-semibold">Changement d'ambiance...</p>
                    </div>
                </div>
            )}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-3">{UI_TEXT.ambianceTitle}</h3>
                <div className="flex gap-2">
                    <AmbianceButton onClick={() => onAmbianceChange(AMBIANCE_PRESETS[0].prompt)} disabled={isChangingAmbiance || isRefining} Icon={SunIcon}>{AMBIANCE_PRESETS[0].name}</AmbianceButton>
                    <AmbianceButton onClick={() => onAmbianceChange(AMBIANCE_PRESETS[1].prompt)} disabled={isChangingAmbiance || isRefining} Icon={MoonIcon}>{AMBIANCE_PRESETS[1].name}</AmbianceButton>
                    <AmbianceButton onClick={() => onAmbianceChange(AMBIANCE_PRESETS[2].prompt)} disabled={isChangingAmbiance || isRefining} Icon={ZapIcon}>{AMBIANCE_PRESETS[2].name}</AmbianceButton>
                </div>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/10">
                <h3 className="font-bold mb-3 flex items-center gap-2"><InfoIcon className="w-5 h-5"/>{UI_TEXT.furnitureAnalysisTitle}</h3>
                {isAnalyzing ? (
                    <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-zinc-800/50 h-12 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : furnitureItems.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                        {furnitureItems.map((item, index) => (
                            <li key={index} className="p-2 bg-zinc-800/50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-orange-400">{item.name}</p>
                                    <p className="text-gray-300">{item.description}</p>
                                </div>
                                <button onClick={() => onViewInAR(item.name)} className="p-2 bg-zinc-700 rounded-full hover:bg-orange-600 transition-colors">
                                    <ARIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-400">Aucun élément spécifique n'a pu être identifié.</p>
                )}
            </div>
        </div>
      </div>
      <div className="lg:w-1/3 h-[75vh] lg:h-auto">
        <ChatPanel
          messages={chatHistory}
          onSendMessage={onSendMessage}
          isLoading={isRefining || isChangingAmbiance}
        />
      </div>
    </div>
  );
};