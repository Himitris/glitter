// src/services/experienceService.ts
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Experience } from "../types";
import {
  getFromCache,
  setInCache,
  invalidateCacheByPrefix,
  CACHE_KEYS,
} from "./cacheService";

// Récupérer toutes les expériences (avec cache)
export const getAllExperiences = async (): Promise<Experience[]> => {
  const cached = getFromCache<Experience[]>(CACHE_KEYS.EXPERIENCES);
  if (cached) return cached;

  try {
    const experiencesCollection = collection(db, "experiences");
    const q = query(experiencesCollection, orderBy("year", "desc"));
    const snapshot = await getDocs(q);
    const experiences = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Experience));

    setInCache(CACHE_KEYS.EXPERIENCES, experiences);
    return experiences;
  } catch (error) {
    console.error("Erreur lors du chargement des expériences:", error);
    return [];
  }
};

// Récupérer une expérience par ID (avec cache)
export const getExperienceById = async (id: string): Promise<Experience | null> => {
  const cacheKey = CACHE_KEYS.EXPERIENCE_BY_ID(id);
  const cached = getFromCache<Experience>(cacheKey);
  if (cached) return cached;

  try {
    const experienceDoc = doc(db, "experiences", id);
    const snapshot = await getDoc(experienceDoc);

    if (snapshot.exists()) {
      const experience = { id: snapshot.id, ...snapshot.data() } as Experience;
      setInCache(cacheKey, experience);
      return experience;
    }

    return null;
  } catch (error) {
    console.error("Erreur lors du chargement de l'expérience:", error);
    return null;
  }
};

// Ajouter une nouvelle expérience
export const addExperience = async (
  experience: Omit<Experience, "id">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "experiences"), experience);
  invalidateCacheByPrefix("experience");
  return docRef.id;
};

// Mettre à jour une expérience
export const updateExperience = async (
  id: string,
  experienceData: Partial<Experience>
): Promise<void> => {
  const experienceRef = doc(db, "experiences", id);
  await updateDoc(experienceRef, experienceData);
  invalidateCacheByPrefix("experience");
};

// Supprimer une expérience
export const deleteExperience = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "experiences", id));
  invalidateCacheByPrefix("experience");
};
