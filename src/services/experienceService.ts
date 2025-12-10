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

// Récupérer toutes les expériences (Firebase uniquement)
export const getAllExperiences = async (): Promise<Experience[]> => {
  try {
    const experiencesCollection = collection(db, "experiences");
    const q = query(experiencesCollection, orderBy("year", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Experience));
  } catch (error) {
    console.error("Erreur lors du chargement des expériences:", error);
    return [];
  }
};

// Récupérer une expérience par ID
export const getExperienceById = async (id: string): Promise<Experience | null> => {
  try {
    const experienceDoc = doc(db, "experiences", id);
    const snapshot = await getDoc(experienceDoc);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Experience;
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
  return docRef.id;
};

// Mettre à jour une expérience
export const updateExperience = async (
  id: string,
  experienceData: Partial<Experience>
): Promise<void> => {
  const experienceRef = doc(db, "experiences", id);
  await updateDoc(experienceRef, experienceData);
};

// Supprimer une expérience
export const deleteExperience = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "experiences", id));
};
