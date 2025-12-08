// src/services/cloudinaryService.ts

const CLOUD_NAME = 'da8ia2pmv';
const UPLOAD_PRESET = 'glitter_unsigned'; // Preset à créer dans Cloudinary

export interface CloudinaryUploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

/**
 * Upload une image vers Cloudinary
 * @param file - Le fichier image à uploader
 * @param folder - Le dossier de destination (ex: "artists", "djs")
 */
export const uploadImage = async (
  file: File,
  folder: string = 'artists'
): Promise<CloudinaryUploadResult> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', `glitter/${folder}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erreur lors de l\'upload');
    }

    const data = await response.json();

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Erreur upload Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
};

/**
 * Génère une URL optimisée pour une image Cloudinary
 * @param publicId - L'ID public de l'image
 * @param options - Options de transformation
 */
export const getOptimizedImageUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  } = {}
): string => {
  const { width = 500, height = 500, crop = 'fill' } = options;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_${crop},w_${width},h_${height},q_auto,f_auto/${publicId}`;
};

/**
 * Vérifie si une URL est une URL Cloudinary
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
};
