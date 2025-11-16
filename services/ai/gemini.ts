import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { GenerateContentResponse, Part } from "@google/genai";
import type { FurnitureItem, UploadedFile } from "../../types";
import type { AiService } from './interface';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

const geminiService: AiService = {
    async generateDesign(base64Image: string, mimeType: string, styleName: string, inspirationImage?: UploadedFile) {
        const model = 'gemini-2.5-flash-image';
        const roomImagePart = fileToGenerativePart(base64Image, mimeType);
        
        const parts: Part[] = [roomImagePart];
        let textPrompt = `Redesign this bedroom photo in a photorealistic, high-resolution ${styleName} interior design style. Key rules:
1.  **Preserve Structure:** Keep original walls, ceiling, floor, windows, and doors intact.
2.  **Maintain Proportions:** Ensure all new furniture is scaled appropriately for the room.
3.  **Respect Windows:** Windows must remain visible and be a source of natural light.
4.  **Style Consistency:** All furniture, decor, lighting, and textiles must strictly adhere to the ${styleName} aesthetic.
5.  **Automatic Bed:** If no bed is clearly visible, add a bed that is the focal point and fits the ${styleName} style.
6.  **Realistic Details:** Include realistic shadows, reflections, and material textures.`;

        if (inspirationImage) {
            const inspirationImagePart = fileToGenerativePart(inspirationImage.base64, inspirationImage.mimeType);
            parts.push(inspirationImagePart);
            textPrompt = `IMPORTANT: Use the first image (the bedroom) for the structure and layout. Use the second image SOLELY for its color palette and mood. Do NOT include objects from the second image.

Redesign the bedroom from the first image in a photorealistic, high-resolution ${styleName} interior design style, applying the color scheme and atmosphere from the second image. Key rules:
1.  **Preserve Structure:** Keep original walls, ceiling, floor, windows, and doors from the FIRST image.
2.  **Color Palette:** Apply colors from the SECOND image to walls, furniture, and textiles.
3.  **Style Consistency:** All elements must adhere to the ${styleName} aesthetic.
4.  **Realistic Details:** Include realistic shadows, reflections, and material textures.`
        }
        
        parts.push({ text: textPrompt });

        const response = await ai.models.generateContent({
            model,
            contents: { parts },
            config: { responseModalities: [Modality.IMAGE] },
        });
        
        return extractImage(response);
    },

    async analyzeFurniture(base64Image: string, mimeType: string): Promise<FurnitureItem[]> {
        const model = 'gemini-2.5-flash';
        const imagePart = fileToGenerativePart(base64Image, mimeType);
        const textPart = { text: "Identify the 3 to 5 main furniture and decor items in this image (e.g., bed, chair, lamp, rug, artwork). For each item, provide a short, one-sentence description suitable for a shopping list. Provide the output as a JSON array of objects, each with 'name' and 'description' keys." };
        
        const schema = {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "The name of the furniture item." },
                description: { type: Type.STRING, description: "A brief description of the item." },
              },
              required: ['name', 'description'],
            },
          };

        const response = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        try {
            const jsonText = response.text.trim();
            return JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse furniture analysis JSON:", e);
            return []; // Return empty array on failure
        }
    },

    async refineDesign(base64Image: string, mimeType: string, refinementRequest: string, currentStyle: string) {
        const model = 'gemini-2.5-flash-image';
        const imagePart = fileToGenerativePart(base64Image, mimeType);
        const textPart = { text: `Given this bedroom image designed in a ${currentStyle} style, apply the following modification: "${refinementRequest}".
Key rules:
1.  **Preserve Structure:** Do not change the original walls, windows, or doors.
2.  **Maintain Style:** The modification must be consistent with the existing ${currentStyle} aesthetic.
3.  **Photorealistic Output:** Ensure the result is a high-resolution, photorealistic image with realistic lighting and textures.` };

        const response = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, textPart] },
            config: { responseModalities: [Modality.IMAGE] },
        });

        return extractImage(response);
    }
};

export default geminiService;
