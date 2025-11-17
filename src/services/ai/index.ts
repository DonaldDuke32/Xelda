import geminiService from './gemini';
import type { AiService } from './interface';

// This is the single point of control for switching AI services.
// To use a different AI model (e.g., DALL-E), you would create a new
// implementation file (e.g., 'dalle.ts') and change the import here.
const aiService: AiService = geminiService;

export default aiService;
