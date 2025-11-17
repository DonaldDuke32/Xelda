import React from 'react';

export interface Style {
  id: string;
  name: string;
  description: string;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export interface UploadedFile {
  base64: string;
  mimeType: string;
  name: string;
}

export interface FurnitureItem {
  name: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  styleName: string;
  prompt: string;
  author: string;
  likes: number;
}