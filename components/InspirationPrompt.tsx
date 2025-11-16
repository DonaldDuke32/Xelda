import React, { useState } from 'react';
import type { UploadedFile } from '../types';
import { UI_TEXT } from '../constants';
import { UploadSection } from './UploadSection';
import { PaletteIcon } from './icons';

interface InspirationPromptProps {
    onGenerate: (inspirationFile?: UploadedFile) => void;
    onBack: () => void;
    styleName: string;
}

export const InspirationPrompt: React.FC<InspirationPromptProps> = ({ onGenerate, onBack, styleName }) => {
    const [inspirationFile, setInspirationFile] = useState<UploadedFile | null>(null);

    const handleImageUpload = (file: UploadedFile) => {
        setInspirationFile(file);
    };

    return (
        <div className="w-full max-w-2xl mx-auto text-center animate-fade-in">
            <PaletteIcon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-3xl font-bold mb-2">{UI_TEXT.inspirationTitle}</h2>
            <p className="text-gray-400 mb-6">{UI_TEXT.inspirationSubtitle}</p>
            
            <UploadSection onImageUpload={handleImageUpload} />

            {inspirationFile && (
                 <div className="mt-4 p-3 bg-zinc-900/50 rounded-lg flex items-center gap-3 border border-white/10">
                    <img src={`data:${inspirationFile.mimeType};base64,${inspirationFile.base64}`} alt="Inspiration Preview" className="w-16 h-16 rounded-md object-cover" />
                    <div className="text-left">
                        <p className="font-semibold text-white">Palette d'inspiration chargée :</p>
                        <p className="text-sm text-gray-300">{inspirationFile.name}</p>
                    </div>
                </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                    onClick={() => onGenerate(inspirationFile || undefined)}
                    className="group shimmer-button relative inline-flex items-center justify-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105"
                >
                    {inspirationFile ? UI_TEXT.inspirationCTA : UI_TEXT.inspirationSkip}
                </button>
                <button
                    onClick={onBack}
                    className="px-6 py-3 text-lg font-bold text-gray-300 bg-zinc-800/70 rounded-full hover:bg-zinc-700 transition-colors"
                >
                    {UI_TEXT.inspirationBack}
                </button>
            </div>
        </div>
    );
};
