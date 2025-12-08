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
 *
 * IMPORTANT: Vous devez créer un "upload preset" dans Cloudinary:
 * 1. Allez sur https://console.cloudinary.com/settings/upload
 * 2. Cliquez sur "Add upload preset"
 * 3. Nommez-le "glitter_unsigned"
 * 4. Mode: "Unsigned"
 * 5. Folder: "glitter" (optionnel)
 * 6. Sauvegardez
 *
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
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || 'Erreur lors de l\'upload';

      // Message d'erreur plus explicite pour le preset manquant
      if (errorMessage.includes('Upload preset not found') || errorMessage.includes('upload_preset')) {
        throw new Error(
          'Upload preset non trouvé. Créez un preset "glitter_unsigned" dans Cloudinary: ' +
          'Settings > Upload > Add upload preset (mode: Unsigned)'
        );
      }

      throw new Error(errorMessage);
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
