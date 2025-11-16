import React, { useCallback, useState } from 'react';
import type { UploadedFile } from '../types';
import { UI_TEXT } from '../constants';
import { UploadIcon } from './icons';

interface UploadSectionProps {
  onImageUpload: (file: UploadedFile) => void;
}

const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string, name: string}> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const dataUrl = reader.result as string;
            const base64 = dataUrl.split(',')[1];
            resolve({ base64, mimeType: file.type, name: file.name });
        };
        reader.onerror = error => reject(error);
    });
};

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File is too large. Max 10MB.");
        return;
      }
      try {
        const uploadedFile = await fileToBase64(file);
        onImageUpload(uploadedFile);
      } catch (error) {
        console.error("Error converting file to base64", error);
        alert("Error processing file.");
      }
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`relative block w-full h-64 rounded-xl border-2 border-dashed flex flex-col justify-center items-center p-6 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-orange-500 bg-zinc-900/50' : 'border-gray-600 hover:border-orange-500'}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-500/20 rounded-xl transition-opacity duration-300 ${isDragging ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="relative z-10 flex flex-col items-center">
            <UploadIcon className={`w-12 h-12 mb-4 text-gray-400 transition-all duration-300 ${isDragging ? 'scale-110 text-orange-400' : ''}`} />
            <span className="text-xl font-semibold text-white">{UI_TEXT.uploadTitle}</span>
            <span className="text-sm text-gray-400 mt-2">{UI_TEXT.uploadSubtitle}</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </label>
    </div>
  );
};