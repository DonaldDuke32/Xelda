import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";
import type { FurnitureItem, UploadedFile } from "../../types";
import type { 
  AiService, 
  GenerateDesignParams, 
  GenerateDesignResult, 
  RefineDesignParams, 
  RefineDesignResult, 
  FurnitureAnalysis, 
  ColorPalette, 
  StyleProfile 
} from './interface';
import { STYLES } from '../../constants';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string): Part => {
    return {
        inlineData: {
            data: base64,
            mimeType,
        },
    };
};

const extractImage = (response: GenerateContentResponse): string => {
    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error("No image data found in response");
};

// Enhanced style prompts for professional results
const STYLE_PROMPTS = {
    minimalist: "Clean lines, neutral colors (white, beige, gray), minimal furniture, plenty of white space, simple geometric shapes, natural materials like wood and stone, hidden storage solutions.",
    scandinavian: "Light wood furniture (pine, birch, oak), cozy textiles (wool, linen), muted colors (white, cream, soft grays), hygge atmosphere, natural light emphasis, functional design.",
    cozy: "Warm colors (earth tones, warm grays, soft browns), soft textures (knitted throws, plush pillows), layered lighting (table lamps, string lights), comfortable seating, personal touches.",
    modern: "Bold geometric shapes, contrasting colors, sleek materials (metal, glass, concrete), statement pieces, clean lines, minimal ornamentation, high-tech elements.",
    bohemian: "Rich colors (deep purples, oranges, reds), mixed patterns, lots of plants, vintage rugs, tapestries, eclectic furniture mix, natural materials, artistic elements.",
    industrial: "Raw materials (exposed brick, metal, concrete), dark colors, Edison bulb lighting, vintage leather furniture, metal fixtures, urban loft aesthetic.",
    luxury: "High-end materials (marble, velvet, gold accents), rich colors, statement chandeliers, premium furniture, elegant details, sophisticated color palette.",
    vintage: "Retro furniture, warm nostalgic colors, antique pieces, classic patterns, aged textures, traditional craftsmanship elements.",
    gamer_setup: "RGB lighting, modern tech aesthetic, gaming chairs, multiple monitors setup, LED strips, sleek black/neon color scheme, high-tech atmosphere.",
    futuristic: "Metallic surfaces, LED lighting, geometric shapes, white/chrome/blue color scheme, minimal furniture with tech integration, holographic elements."
};

const geminiService: AiService = {
    async generateDesign(params: GenerateDesignParams): Promise<GenerateDesignResult> {
        const startTime = Date.now();
        const { originalImage, mimeType, style, inspirationImage, ambiance = 'daylight' } = params;
        
        const model = 'gemini-2.5-flash-image';
        const roomImagePart = fileToGenerativePart(originalImage, mimeType);
        
        const stylePrompt = STYLE_PROMPTS[style as keyof typeof STYLE_PROMPTS] || STYLE_PROMPTS.modern;
        
        const parts: Part[] = [roomImagePart];
        let textPrompt = `Transform this bedroom into a stunning ${style} interior design.

STYLE SPECIFICATION: ${stylePrompt}

TRANSFORMATION RULES:
1. **Preserve Architecture**: Keep original walls, windows, doors, and room structure intact
2. **Style Consistency**: Every element must follow ${style} aesthetic principles  
3. **Furniture Placement**: Ensure proper scale and proportion for the room size
4. **Color Harmony**: Use ${style}-appropriate color palette
5. **Photorealism**: Generate high-quality, realistic textures and materials
6. **Bed Focal Point**: If no bed visible, add one that fits the ${style} style perfectly

Generate a photorealistic, high-resolution interior design transformation.`;

        if (inspirationImage) {
            const inspirationImagePart = fileToGenerativePart(inspirationImage.base64, inspirationImage.mimeType);
            parts.push(inspirationImagePart);
            textPrompt = `Transform the bedroom (first image) using the color palette and mood from the inspiration image (second image).

IMPORTANT: Use ONLY the bedroom's structure and layout. Extract colors, mood, and atmosphere from the second image.

STYLE: ${style} - ${stylePrompt}

Apply the inspiration's color scheme while maintaining ${style} aesthetic principles.
Generate a photorealistic, high-resolution result.`;
        }
        
        parts.push({ text: textPrompt });

        try {
            const response = await ai.models.generateContent({
                model,
                contents: { parts },
                config: { 
                    responseModalities: [Modality.IMAGE],
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                },
            });
            
            const generatedImage = extractImage(response);
            const generationTime = Date.now() - startTime;

            return {
                generatedImage,
                generationTime,
                modelUsed: model,
                prompt: textPrompt
            };
        } catch (error) {
            console.error('Design generation failed:', error);
            throw new Error('Failed to generate design. Please try again.');
        }
    },

    async analyzeFurniture(imageUrl: string, mimeType: string): Promise<FurnitureAnalysis> {
        const model = 'gemini-2.5-flash';
        const imagePart = fileToGenerativePart(imageUrl, mimeType);
        
        const analysisPrompt = `Analyze this bedroom image and provide detailed furniture and decor analysis.

Return a JSON object with this exact structure:
{
  "items": [
    {
      "name": "item name",
      "category": "furniture|decor|lighting|textile",
      "position": "location in room",
      "confidence": 0.95,
      "description": "detailed description",
      "estimatedPrice": "$X - $Y"
    }
  ],
  "recommendations": ["improvement suggestions"],
  "roomAnalysis": {
    "size": "small|medium|large",
    "lightingType": "natural|artificial|mixed",
    "dominantColors": ["color1", "color2", "color3"],
    "style": "detected style"
  }
}

Identify 5-8 key items with high confidence scores.`;

        const schema = {
            type: Type.OBJECT,
            properties: {
                items: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            category: { type: Type.STRING },
                            position: { type: Type.STRING },
                            confidence: { type: Type.NUMBER },
                            description: { type: Type.STRING },
                            estimatedPrice: { type: Type.STRING },
                        },
                        required: ['name', 'category', 'position', 'confidence', 'description']
                    }
                },
                recommendations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                roomAnalysis: {
                    type: Type.OBJECT,
                    properties: {
                        size: { type: Type.STRING },
                        lightingType: { type: Type.STRING },
                        dominantColors: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        style: { type: Type.STRING }
                    },
                    required: ['size', 'lightingType', 'dominantColors', 'style']
                }
            },
            required: ['items', 'recommendations', 'roomAnalysis']
        };

        try {
            const response = await ai.models.generateContent({
                model,
                contents: { parts: [imagePart, { text: analysisPrompt }] },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                    temperature: 0.3,
                },
            });

            return JSON.parse(response.text.trim());
        } catch (error) {
            console.error("Furniture analysis failed:", error);
            return {
                items: [],
                recommendations: ["Unable to analyze furniture at this time."],
                roomAnalysis: {
                    size: 'medium',
                    lightingType: 'mixed',
                    dominantColors: ['neutral'],
                    style: 'contemporary'
                }
            };
        }
    },

    async refineDesign(params: RefineDesignParams): Promise<RefineDesignResult> {
        const startTime = Date.now();
        const { currentImage, mimeType, refinementRequest, currentStyle, chatHistory = [] } = params;
        
        const model = 'gemini-2.5-flash-image';
        const imagePart = fileToGenerativePart(currentImage, mimeType);
        
        // Build context from chat history
        const context = chatHistory.length > 0 
            ? `Previous modifications: ${chatHistory.slice(-3).map(msg => `${msg.sender}: ${msg.text}`).join('; ')}`
            : '';

        const textPrompt = `Modify this ${currentStyle} bedroom design based on this request: "${refinementRequest}"

${context ? `Context: ${context}` : ''}

REFINEMENT RULES:
1. **Targeted Changes**: Apply ONLY the requested modification
2. **Preserve Style**: Maintain ${currentStyle} aesthetic throughout
3. **Keep Structure**: Do not alter walls, windows, or room architecture  
4. **Consistency**: Ensure changes blend naturally with existing design
5. **Quality**: Maintain photorealistic quality and lighting
6. **Proportions**: Keep all furniture and elements properly scaled

Generate the refined design with the requested changes applied.`;

        try {
            const response = await ai.models.generateContent({
                model,
                contents: { parts: [imagePart, { text: textPrompt }] },
                config: { 
                    responseModalities: [Modality.IMAGE],
                    temperature: 0.6,
                    topK: 30,
                },
            });

            const refinedImage = extractImage(response);
            const refinementTime = Date.now() - startTime;

            return {
                refinedImage,
                refinementTime,
                appliedChanges: [refinementRequest]
            };
        } catch (error) {
            console.error('Design refinement failed:', error);
            throw new Error('Failed to refine design. Please try again.');
        }
    },

    async extractPalette(imageUrl: string): Promise<ColorPalette> {
        const model = 'gemini-2.5-flash';
        const imagePart = fileToGenerativePart(imageUrl, 'image/png');
        
        const palettePrompt = `Extract the 5-7 most prominent colors from this image.

Return JSON:
{
  "colors": [
    {
      "hex": "#HEXCODE",
      "name": "Color Name",
      "usage": "primary|secondary|accent",
      "percentage": 25
    }
  ]
}

Focus on colors that would work well in interior design.`;

        try {
            const response = await ai.models.generateContent({
                model,
                contents: { parts: [imagePart, { text: palettePrompt }] },
                config: {
                    responseMimeType: "application/json",
                },
            });

            return JSON.parse(response.text.trim());
        } catch (error) {
            console.error("Palette extraction failed:", error);
            return {
                colors: [
                    { hex: "#FFFFFF", name: "White", usage: "primary", percentage: 30 },
                    { hex: "#F5F5F5", name: "Light Gray", usage: "secondary", percentage: 25 },
                    { hex: "#8B4513", name: "Brown", usage: "accent", percentage: 20 }
                ]
            };
        }
    },

    async analyzeStyleProfile(designs: Array<{style: string; liked: boolean}>): Promise<StyleProfile> {
        if (designs.length === 0) {
            return {
                preferences: {},
                recommendations: ["Create more designs to build your style profile!"],
                dominantStyles: []
            };
        }

        // Calculate preferences based on user's design history
        const styleCount: Record<string, number> = {};
        const likedStyles: Record<string, number> = {};
        
        designs.forEach(design => {
            styleCount[design.style] = (styleCount[design.style] || 0) + 1;
            if (design.liked) {
                likedStyles[design.style] = (likedStyles[design.style] || 0) + 1;
            }
        });

        // Calculate preference scores (liked designs weighted more)
        const preferences: Record<string, number> = {};
        Object.keys(styleCount).forEach(style => {
            const totalCount = styleCount[style];
            const likedCount = likedStyles[style] || 0;
            preferences[style] = Math.round(((totalCount + likedCount * 2) / designs.length) * 100);
        });

        // Get dominant styles (top 3)
        const dominantStyles = Object.entries(preferences)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([style]) => style);

        // Generate recommendations
        const recommendations = [];
        if (dominantStyles.includes('minimalist')) {
            recommendations.push("Try Scandinavian style for similar clean aesthetics with more warmth");
        }
        if (dominantStyles.includes('bohemian')) {
            recommendations.push("Explore Vintage style for eclectic charm with classic elements");
        }
        if (dominantStyles.includes('modern')) {
            recommendations.push("Consider Industrial style for bold, contemporary vibes");
        }
        
        if (recommendations.length === 0) {
            recommendations.push("Experiment with contrasting styles to discover new preferences!");
        }

        return {
            preferences,
            recommendations,
            dominantStyles
        };
    },

    async generateSurpriseStyle(userPreferences?: StyleProfile): Promise<{
        style: string;
        fusedStyles: string[];
        reasoning: string;
    }> {
        if (!userPreferences || Object.keys(userPreferences.preferences).length === 0) {
            // Random fusion for new users
            const randomStyles = STYLES.sort(() => 0.5 - Math.random()).slice(0, 2);
            return {
                style: randomStyles[0].id,
                fusedStyles: randomStyles.map(s => s.id),
                reasoning: `Surprise fusion! Combining ${randomStyles.map(s => s.name).join(' + ')} for a unique look.`
            };
        }

        // Smart fusion based on user preferences
        const topStyles = Object.entries(userPreferences.preferences)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);

        if (topStyles.length >= 2) {
            const [primary, secondary] = topStyles;
            const complementaryStyles = {
                minimalist: ['scandinavian', 'modern'],
                bohemian: ['vintage', 'cozy'],
                modern: ['industrial', 'futuristic'],
                luxury: ['vintage', 'modern'],
                scandinavian: ['cozy', 'minimalist']
            };

            const suggestedStyles = complementaryStyles[primary[0] as keyof typeof complementaryStyles] || [secondary[0]];
            const fusionStyle = suggestedStyles[0];

            return {
                style: fusionStyle,
                fusedStyles: [primary[0], fusionStyle],
                reasoning: `Based on your love for ${primary[0]}, try ${fusionStyle} for a complementary aesthetic!`
            };
        }

        // Fallback to exploration
        const lessUsedStyles = STYLES.filter(style => 
            !Object.keys(userPreferences.preferences).includes(style.id)
        );
        
        const explorationStyle = lessUsedStyles[Math.floor(Math.random() * lessUsedStyles.length)] || STYLES[0];

        return {
            style: explorationStyle.id,
            fusedStyles: [explorationStyle.id],
            reasoning: `Time to explore! Try ${explorationStyle.name} for something completely new.`
        };
    }
};

export default geminiService;
