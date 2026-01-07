// Service de migration des images hardcodées vers la base de données

import {
  getAllArtists,
  getAllDjs,
  updateArtist,
  updateDj,
} from "./artistService";

/**
 * Normalise un nom d'artiste pour le matching avec les fichiers
 * Supprime les espaces, accents, caractères spéciaux et met en minuscules
 */
function normalizeArtistName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9]/g, "") // Garde seulement lettres et chiffres
    .trim();
}

/**
 * Génère toutes les variantes possibles d'un nom d'artiste pour le matching
 */
function getNameVariants(name: string): string[] {
  const variants: string[] = [];

  // Version normalisée de base
  const normalized = normalizeArtistName(name);
  variants.push(normalized);

  // Version avec tirets au lieu d'espaces
  const withDashes = name.toLowerCase().replace(/\s+/g, "-");
  variants.push(withDashes);

  // Version sans espaces
  const noSpaces = name.toLowerCase().replace(/\s+/g, "");
  variants.push(noSpaces);

  // Version avec underscores
  const withUnderscores = name.toLowerCase().replace(/\s+/g, "_");
  variants.push(withUnderscores);

  return [...new Set(variants)]; // Déduplique
}

/**
 * Cherche les images correspondant à un artiste
 * Retourne un tableau d'URLs d'images trouvées
 */
function findArtistImages(name: string, type: "artist" | "dj"): string[] {
  const folder = type === "artist" ? "artists" : "djs";
  const variants = getNameVariants(name);
  const images: string[] = [];

  // Mapping manuel pour les cas spéciaux (noms avec caractères spéciaux, etc.)
  const manualMappings: Record<string, string[]> = {
    // Artistes
    "kimia": ["kimia.webp"],
    "kairos": ["kairos.webp"],
    "amaliajaulin": ["amaliajaulin.webp", "amaliajaulin1.webp"],
    "altessego": ["altess.webp"],
    "forrodalua": ["forro.webp"],
    "rodolphe macabeo": ["rodolphe.webp"],
    "rodolphemacabeo": ["rodolphe.webp"],
    "soleneweinachter": ["solene.webp"],
    "dartala": ["dartala.webp"],
    "lauraoneill": ["laura.webp"],
    "manongasseng": ["manongasseng.webp", "manongasseng2.webp"],
    "melanielesage": ["melanie.webp"],
    "zingabe": ["zingabe.webp", "zingabe2.webp", "zingabe3.webp"],
    "ciedelcaravaggio": ["ciedelcaravaggio.webp"],

    // DJs
    "darta": ["darta.webp"],
    "damefleuraux": ["damefleuraux.webp"],
    "bonniespacey": ["bonnie.webp"],
    "aimee": ["aimee.webp"],
    "antix2000": ["antix2000.webp", "antix20001.webp"],
    "babzilla": ["babzilla.webp", "babzilla2.webp"],
    "pierino": ["pierino.webp"],
    "marius": ["marius.webp", "marius1.webp", "marius2.webp"],
    "karlpeoti": ["karl.webp"],
    "edarta": ["E-DARTA.webp"],
    "elona": ["elona.webp"],
    "kheymysterio": ["kheymysterio.webp"],
    "marieprude": ["marieprude.webp"],
    "threehomies": ["threehomies.webp", "threehomies1.webp", "threehomies2.webp"],
  };

  // Cherche d'abord dans le mapping manuel
  const normalizedName = normalizeArtistName(name);
  if (manualMappings[normalizedName]) {
    return manualMappings[normalizedName].map(img => `/images/${folder}/${img}`);
  }

  // Sinon, essaie les variantes automatiques
  for (const variant of variants) {
    // Cherche image principale
    images.push(`/images/${folder}/${variant}.webp`);

    // Cherche images numérotées (jusqu'à 5)
    for (let i = 1; i <= 5; i++) {
      images.push(`/images/${folder}/${variant}${i}.webp`);
    }
  }

  return images;
}

/**
 * Vérifie si une image existe (en essayant de la charger)
 */
async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Migre les images pour un artiste/DJ
 */
async function migrateArtistImages(
  id: string,
  name: string,
  currentImage: string | string[] | undefined,
  type: "artist" | "dj"
): Promise<{ success: boolean; images: string[]; error?: string }> {
  try {
    // Si l'artiste a déjà des images uploadées (Cloudinary), on les garde
    const existingImages = Array.isArray(currentImage) ? currentImage : currentImage ? [currentImage] : [];
    const cloudinaryImages = existingImages.filter(img => img.includes("cloudinary.com"));

    // Si déjà des images Cloudinary, on ne fait rien
    if (cloudinaryImages.length > 0) {
      return { success: true, images: cloudinaryImages };
    }

    // Cherche les images hardcodées
    const potentialImages = findArtistImages(name, type);
    const validImages: string[] = [];

    // Vérifie quelles images existent réellement
    for (const imageUrl of potentialImages) {
      const exists = await imageExists(imageUrl);
      if (exists) {
        validImages.push(imageUrl);
      }
    }

    // Si aucune image trouvée, utilise le placeholder
    const finalImages = validImages.length > 0 ? validImages : ["/images/placeholder.jpg"];

    // Met à jour dans la base de données
    const imageData = finalImages.length === 1 ? finalImages[0] : finalImages;

    if (type === "artist") {
      await updateArtist(id, { image: imageData });
    } else {
      await updateDj(id, { image: imageData });
    }

    return { success: true, images: finalImages };
  } catch (error) {
    console.error(`Erreur migration ${name}:`, error);
    return {
      success: false,
      images: [],
      error: error instanceof Error ? error.message : "Erreur inconnue",
    };
  }
}

/**
 * Migre toutes les images des artistes et DJs
 */
export async function migrateAllImages(
  onProgress?: (current: number, total: number, message: string) => void
): Promise<{
  success: boolean;
  artistsUpdated: number;
  djsUpdated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let artistsUpdated = 0;
  let djsUpdated = 0;

  try {
    // Récupère tous les artistes et DJs
    const [artists, djs] = await Promise.all([getAllArtists(), getAllDjs()]);

    const totalItems = artists.length + djs.length;
    let currentItem = 0;

    // Migre les artistes
    for (const artist of artists) {
      currentItem++;
      onProgress?.(currentItem, totalItems, `Migration de ${artist.name}...`);

      const result = await migrateArtistImages(
        artist.id,
        artist.name,
        artist.image,
        "artist"
      );

      if (result.success) {
        artistsUpdated++;
      } else {
        errors.push(`${artist.name}: ${result.error}`);
      }
    }

    // Migre les DJs
    for (const dj of djs) {
      currentItem++;
      onProgress?.(currentItem, totalItems, `Migration de ${dj.name}...`);

      const result = await migrateArtistImages(
        dj.id,
        dj.name,
        dj.image,
        "dj"
      );

      if (result.success) {
        djsUpdated++;
      } else {
        errors.push(`${dj.name}: ${result.error}`);
      }
    }

    return {
      success: true,
      artistsUpdated,
      djsUpdated,
      errors,
    };
  } catch (error) {
    console.error("Erreur migration globale:", error);
    return {
      success: false,
      artistsUpdated,
      djsUpdated,
      errors: [error instanceof Error ? error.message : "Erreur inconnue"],
    };
  }
}
