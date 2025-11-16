import type { UploadedFile, FurnitureItem } from '../../types';

export interface ColorPalette {
  colors: Array<{
    hex: string;
    name: string;
    usage: 'primary' | 'secondary' | 'accent';
    percentage: number;
  }>;
}

export interface StyleProfile {
  preferences: Record<string, number>;
  recommendations: string[];
  dominantStyles: string[];
}

export interface GenerateDesignParams {
  originalImage: string;
  mimeType: string;
  style: string;
  inspirationImage?: UploadedFile;
  ambiance?: string;
  userPreferences?: StyleProfile;
}

export interface GenerateDesignResult {
  generatedImage: string;
  generationTime: number;
  modelUsed: string;
  prompt: string;
}

export interface RefineDesignParams {
  currentImage: string;
  mimeType: string;
  refinementRequest: string;
  currentStyle: string;
  chatHistory?: Array<{sender: string; text: string}>;
}

export interface RefineDesignResult {
  refinedImage: string;
  refinementTime: number;
  appliedChanges: string[];
}

export interface FurnitureAnalysis {
  items: Array<{
    name: string;
    category: string;
    position: string;
    confidence: number;
    description: string;
    estimatedPrice?: string;
    shoppingLinks?: string[];
  }>;
  recommendations: string[];
  roomAnalysis: {
    size: 'small' | 'medium' | 'large';
    lightingType: string;
    dominantColors: string[];
    style: string;
  };
}

export interface AiService {
  generateDesign(params: GenerateDesignParams): Promise<GenerateDesignResult>;
  
  refineDesign(params: RefineDesignParams): Promise<RefineDesignResult>;
  
  analyzeFurniture(imageUrl: string, mimeType: string): Promise<FurnitureAnalysis>;
  
  extractPalette(imageUrl: string): Promise<ColorPalette>;
  
  analyzeStyleProfile(designs: Array<{style: string; liked: boolean}>): Promise<StyleProfile>;
  
  generateSurpriseStyle(userPreferences?: StyleProfile): Promise<{
    style: string;
    fusedStyles: string[];
    reasoning: string;
  }>;
}
