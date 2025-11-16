import type { UploadedFile, FurnitureItem } from '../../types';

export interface AiService {
  generateDesign(
    base64Image: string,
    mimeType: string,
    styleName: string,
    inspirationImage?: UploadedFile
  ): Promise<string>;

  analyzeFurniture(
    base64Image: string,
    mimeType: string
  ): Promise<FurnitureItem[]>;

  refineDesign(
    base64Image: string,
    mimeType: string,
    refinementRequest: string,
    currentStyle: string
  ): Promise<string>;
}
