// src/services/artistService.ts
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { Artist } from "../types";
import {
  getFromCache,
  setInCache,
  invalidateCacheByPrefix,
  CACHE_KEYS,
} from "./cacheService";
import {
  sortByDisplayOrder,
  ARTISTS_DISPLAY_ORDER,
  DJS_DISPLAY_ORDER,
} from "../config/displayOrder";

// Classe d'erreur personnalisée pour les erreurs Firebase
export class FirebaseServiceError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'FirebaseServiceError';
  }
}

// Récupérer tous les artistes depuis Firebase (avec cache et tri)
export const getAllArtists = async (): Promise<Artist[]> => {
  // Vérifier le cache d'abord
  const cached = getFromCache<Artist[]>(CACHE_KEYS.ARTISTS);
  if (cached) {
    // Trier par displayOrder si disponible, sinon par l'ordre de configuration
    return cached.some(a => a.displayOrder !== undefined)
      ? [...cached].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
      : sortByDisplayOrder(cached, ARTISTS_DISPLAY_ORDER);
  }

  try {
    const artistsCollection = collection(db, "artists");
    const snapshot = await getDocs(artistsCollection);
    const artists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));

    // Stocker dans le cache
    setInCache(CACHE_KEYS.ARTISTS, artists);
    // Trier par displayOrder si disponible, sinon par l'ordre de configuration
    return artists.some(a => a.displayOrder !== undefined)
      ? [...artists].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
      : sortByDisplayOrder(artists, ARTISTS_DISPLAY_ORDER);
  } catch (error) {
    console.error("Erreur lors de la récupération des artistes:", error);
    throw new FirebaseServiceError("Impossible de charger les artistes", error);
  }
};

// Récupérer un artiste par ID (avec cache)
export const getArtistById = async (id: string): Promise<Artist | null> => {
  const cacheKey = CACHE_KEYS.ARTIST_BY_ID(id);
  const cached = getFromCache<Artist>(cacheKey);
  if (cached) return cached;

  try {
    const artistDoc = doc(db, "artists", id);
    const snapshot = await getDoc(artistDoc);

    if (snapshot.exists()) {
      const artist = { id: snapshot.id, ...snapshot.data() } as Artist;
      setInCache(cacheKey, artist);
      return artist;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'artiste:", error);
    throw new FirebaseServiceError("Impossible de charger l'artiste", error);
  }
};

// Ajouter un nouvel artiste
export const addArtist = async (
  artist: Omit<Artist, "id">
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "artists"), artist);
    invalidateCacheByPrefix("artist");
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'artiste:", error);
    throw new FirebaseServiceError("Impossible d'ajouter l'artiste", error);
  }
};

// Mettre à jour un artiste
export const updateArtist = async (
  id: string,
  artistData: Partial<Artist>
): Promise<void> => {
  try {
    const artistRef = doc(db, "artists", id);
    await updateDoc(artistRef, artistData);
    invalidateCacheByPrefix("artist");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'artiste:", error);
    throw new FirebaseServiceError("Impossible de mettre à jour l'artiste", error);
  }
};

// Supprimer un artiste
export const deleteArtist = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "artists", id));
    invalidateCacheByPrefix("artist");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'artiste:", error);
    throw new FirebaseServiceError("Impossible de supprimer l'artiste", error);
  }
};

// Récupérer tous les DJs depuis Firebase (avec cache et tri)
export const getAllDjs = async (): Promise<Artist[]> => {
  const cached = getFromCache<Artist[]>(CACHE_KEYS.DJS);
  if (cached) {
    // Trier par displayOrder si disponible, sinon par l'ordre de configuration
    return cached.some(d => d.displayOrder !== undefined)
      ? [...cached].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
      : sortByDisplayOrder(cached, DJS_DISPLAY_ORDER);
  }

  try {
    const djsCollection = collection(db, "djs");
    const snapshot = await getDocs(djsCollection);
    const djs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));

    setInCache(CACHE_KEYS.DJS, djs);
    // Trier par displayOrder si disponible, sinon par l'ordre de configuration
    return djs.some(d => d.displayOrder !== undefined)
      ? [...djs].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
      : sortByDisplayOrder(djs, DJS_DISPLAY_ORDER);
  } catch (error) {
    console.error("Erreur lors de la récupération des DJs:", error);
    throw new FirebaseServiceError("Impossible de charger les DJs", error);
  }
};

// Récupérer un DJ par ID (avec cache)
export const getDjById = async (id: string): Promise<Artist | null> => {
  const cacheKey = CACHE_KEYS.DJ_BY_ID(id);
  const cached = getFromCache<Artist>(cacheKey);
  if (cached) return cached;

  try {
    const djDoc = doc(db, "djs", id);
    const snapshot = await getDoc(djDoc);

    if (snapshot.exists()) {
      const dj = { id: snapshot.id, ...snapshot.data() } as Artist;
      setInCache(cacheKey, dj);
      return dj;
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération du DJ:", error);
    throw new FirebaseServiceError("Impossible de charger le DJ", error);
  }
};

// Ajouter un nouveau DJ
export const addDj = async (dj: Omit<Artist, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "djs"), dj);
    invalidateCacheByPrefix("dj");
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout du DJ:", error);
    throw new FirebaseServiceError("Impossible d'ajouter le DJ", error);
  }
};

// Mettre à jour un DJ
export const updateDj = async (
  id: string,
  djData: Partial<Artist>
): Promise<void> => {
  try {
    const djRef = doc(db, "djs", id);
    await updateDoc(djRef, djData);
    invalidateCacheByPrefix("dj");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du DJ:", error);
    throw new FirebaseServiceError("Impossible de mettre à jour le DJ", error);
  }
};

// Supprimer un DJ
export const deleteDj = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "djs", id));
    invalidateCacheByPrefix("dj");
  } catch (error) {
    console.error("Erreur lors de la suppression du DJ:", error);
    throw new FirebaseServiceError("Impossible de supprimer le DJ", error);
  }
};

// Mettre à jour l'ordre d'affichage de plusieurs artistes
export const updateArtistsOrder = async (
  artistsOrder: { id: string; displayOrder: number }[]
): Promise<void> => {
  try {
    // Mettre à jour tous les artistes en parallèle
    await Promise.all(
      artistsOrder.map(({ id, displayOrder }) =>
        updateDoc(doc(db, "artists", id), { displayOrder })
      )
    );
    invalidateCacheByPrefix("artist");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ordre des artistes:", error);
    throw new FirebaseServiceError("Impossible de mettre à jour l'ordre des artistes", error);
  }
};

// Mettre à jour l'ordre d'affichage de plusieurs DJs
export const updateDjsOrder = async (
  djsOrder: { id: string; displayOrder: number }[]
): Promise<void> => {
  try {
    // Mettre à jour tous les DJs en parallèle
    await Promise.all(
      djsOrder.map(({ id, displayOrder }) =>
        updateDoc(doc(db, "djs", id), { displayOrder })
      )
    );
    invalidateCacheByPrefix("dj");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ordre des DJs:", error);
    throw new FirebaseServiceError("Impossible de mettre à jour l'ordre des DJs", error);
  }
};
