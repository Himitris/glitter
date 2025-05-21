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

// Récupérer tous les artistes
export const getAllArtists = async (): Promise<Artist[]> => {
  const artistsCollection = collection(db, "artists");
  const snapshot = await getDocs(artistsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));
};

// Récupérer un artiste par ID
export const getArtistById = async (id: string): Promise<Artist | null> => {
  const artistDoc = doc(db, "artists", id);
  const snapshot = await getDoc(artistDoc);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Artist;
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

// Récupérer tous les DJs
export const getAllDjs = async (): Promise<Artist[]> => {
  const djsCollection = collection(db, "djs");
  const snapshot = await getDocs(djsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Artist));
};

// Récupérer un DJ par ID
export const getDjById = async (id: string): Promise<Artist | null> => {
  const djDoc = doc(db, "djs", id);
  const snapshot = await getDoc(djDoc);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Artist;
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
