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
import { artists as hardcodedArtists, dj as hardcodedDjs } from "../data/artists";

// Récupérer tous les artistes (Firebase + hardcoded)
export const getAllArtists = async (): Promise<Artist[]> => {
  try {
    const artistsCollection = collection(db, "artists");
    const snapshot = await getDocs(artistsCollection);
    const firebaseArtists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));

    // Combiner Firebase + hardcoded (hardcoded en premier)
    return [...hardcodedArtists, ...firebaseArtists];
  } catch (error) {
    console.error("Erreur Firebase, utilisation des données hardcoded:", error);
    // En cas d'erreur Firebase, retourner les données hardcoded
    return hardcodedArtists;
  }
};

// Récupérer un artiste par ID
export const getArtistById = async (id: string): Promise<Artist | null> => {
  // Vérifier d'abord dans les hardcoded
  const hardcodedArtist = hardcodedArtists.find(a => a.id === id);
  if (hardcodedArtist) {
    return hardcodedArtist;
  }

  try {
    const artistDoc = doc(db, "artists", id);
    const snapshot = await getDoc(artistDoc);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Artist;
    }
  } catch (error) {
    console.error("Erreur Firebase lors de la récupération de l'artiste:", error);
  }

  return null;
};

// Ajouter un nouvel artiste
export const addArtist = async (
  artist: Omit<Artist, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "artists"), artist);
  return docRef.id;
};

// Mettre à jour un artiste
export const updateArtist = async (
  id: string,
  artistData: Partial<Artist>
): Promise<void> => {
  const artistRef = doc(db, "artists", id);
  await updateDoc(artistRef, artistData);
};

// Supprimer un artiste
export const deleteArtist = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "artists", id));
};

// Récupérer tous les DJs (Firebase + hardcoded)
export const getAllDjs = async (): Promise<Artist[]> => {
  try {
    const djsCollection = collection(db, "djs");
    const snapshot = await getDocs(djsCollection);
    const firebaseDjs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));

    // Combiner Firebase + hardcoded (hardcoded en premier)
    return [...hardcodedDjs, ...firebaseDjs];
  } catch (error) {
    console.error("Erreur Firebase, utilisation des données hardcoded:", error);
    // En cas d'erreur Firebase, retourner les données hardcoded
    return hardcodedDjs;
  }
};

// Récupérer un DJ par ID
export const getDjById = async (id: string): Promise<Artist | null> => {
  // Vérifier d'abord dans les hardcoded
  const hardcodedDj = hardcodedDjs.find(dj => dj.id === id);
  if (hardcodedDj) {
    return hardcodedDj;
  }

  try {
    const djDoc = doc(db, "djs", id);
    const snapshot = await getDoc(djDoc);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Artist;
    }
  } catch (error) {
    console.error("Erreur Firebase lors de la récupération du DJ:", error);
  }

  return null;
};

// Ajouter un nouveau DJ
export const addDj = async (dj: Omit<Artist, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, "djs"), dj);
  return docRef.id;
};

// Mettre à jour un DJ
export const updateDj = async (
  id: string,
  djData: Partial<Artist>
): Promise<void> => {
  const djRef = doc(db, "djs", id);
  await updateDoc(djRef, djData);
};

// Supprimer un DJ
export const deleteDj = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "djs", id));
};
