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
import { pastExperiences } from "../data/services";

// Récupérer toutes les expériences (Firebase + hardcoded)
export const getAllExperiences = async (): Promise<Experience[]> => {
  try {
    // Récupérer les expériences depuis Firebase
    const experiencesCollection = collection(db, "experiences");
    const q = query(experiencesCollection, orderBy("year", "desc"));
    const snapshot = await getDocs(q);
    const firebaseExperiences = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Experience));

    // Combiner avec les expériences hardcoded (leur donner un id basé sur l'index)
    const hardcodedWithIds = pastExperiences.map((exp, index) => ({
      ...exp,
      id: `hardcoded-${index}`,
      isHardcoded: true,
    }));

    // Retourner Firebase d'abord, puis hardcoded
    return [...firebaseExperiences, ...hardcodedWithIds] as Experience[];
  } catch (error) {
    console.error("Erreur lors du chargement des expériences:", error);
    // En cas d'erreur, retourner juste les hardcoded
    return pastExperiences.map((exp, index) => ({
      ...exp,
      id: `hardcoded-${index}`,
    })) as Experience[];
  }
};

// Récupérer uniquement les expériences Firebase (pour l'admin)
export const getFirebaseExperiences = async (): Promise<Experience[]> => {
  try {
    const experiencesCollection = collection(db, "experiences");
    const q = query(experiencesCollection, orderBy("year", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Experience));
  } catch (error) {
    console.error("Erreur Firebase lors du chargement des expériences:", error);
    // Retourner un tableau vide en cas d'erreur
    return [];
  }
};

// Récupérer une expérience par ID
export const getExperienceById = async (id: string): Promise<Experience | null> => {
  // Vérifier si c'est une expérience hardcoded
  if (id.startsWith("hardcoded-")) {
    const index = parseInt(id.replace("hardcoded-", ""));
    const exp = pastExperiences[index];
    if (exp) {
      return { ...exp, id } as Experience;
    }
    return null;
  }

  const experienceDoc = doc(db, "experiences", id);
  const snapshot = await getDoc(experienceDoc);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Experience;
  }

  return null;
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
