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

// Récupérer tous les artistes depuis Firebase (avec cache)
export const getAllArtists = async (): Promise<Artist[]> => {
  // Vérifier le cache d'abord
  const cached = getFromCache<Artist[]>(CACHE_KEYS.ARTISTS);
  if (cached) return cached;

  try {
    const artistsCollection = collection(db, "artists");
    const snapshot = await getDocs(artistsCollection);
    const artists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));

    // Stocker dans le cache
    setInCache(CACHE_KEYS.ARTISTS, artists);
    return artists;
  } catch (error) {
    console.error("Erreur lors de la récupération des artistes:", error);
    return [];
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
  } catch (error) {
    console.error("Erreur lors de la récupération de l'artiste:", error);
  }

  return null;
};

// Ajouter un nouvel artiste
export const addArtist = async (
  artist: Omit<Artist, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "artists"), artist);
  // Invalider le cache de la liste
  invalidateCacheByPrefix("artist");
  return docRef.id;
};

// Mettre à jour un artiste
export const updateArtist = async (
  id: string,
  artistData: Partial<Artist>
): Promise<void> => {
  const artistRef = doc(db, "artists", id);
  await updateDoc(artistRef, artistData);
  // Invalider le cache
  invalidateCacheByPrefix("artist");
};

// Supprimer un artiste
export const deleteArtist = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "artists", id));
  // Invalider le cache
  invalidateCacheByPrefix("artist");
};

// Récupérer tous les DJs depuis Firebase (avec cache)
export const getAllDjs = async (): Promise<Artist[]> => {
  const cached = getFromCache<Artist[]>(CACHE_KEYS.DJS);
  if (cached) return cached;

  try {
    const djsCollection = collection(db, "djs");
    const snapshot = await getDocs(djsCollection);
    const djs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));

    setInCache(CACHE_KEYS.DJS, djs);
    return djs;
  } catch (error) {
    console.error("Erreur lors de la récupération des DJs:", error);
    return [];
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
  } catch (error) {
    console.error("Erreur lors de la récupération du DJ:", error);
  }

  return null;
};

// Ajouter un nouveau DJ
export const addDj = async (dj: Omit<Artist, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, "djs"), dj);
  invalidateCacheByPrefix("dj");
  return docRef.id;
};

// Mettre à jour un DJ
export const updateDj = async (
  id: string,
  djData: Partial<Artist>
): Promise<void> => {
  const djRef = doc(db, "djs", id);
  await updateDoc(djRef, djData);
  invalidateCacheByPrefix("dj");
};

// Supprimer un DJ
export const deleteDj = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "djs", id));
  invalidateCacheByPrefix("dj");
};
