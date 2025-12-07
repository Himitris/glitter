// src/services/eventService.ts
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
  where,
  orderBy,
} from "firebase/firestore";
import { Event } from "../types";

const COLLECTION_NAME = "events";

// Récupérer tous les événements
export const getAllEvents = async (): Promise<Event[]> => {
  const eventsCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(eventsCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

// Récupérer les événements à venir (date >= aujourd'hui)
export const getUpcomingEvents = async (): Promise<Event[]> => {
  const eventsCollection = collection(db, COLLECTION_NAME);
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    eventsCollection,
    where("date", ">=", today),
    orderBy("date", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

// Récupérer les événements passés
export const getPastEvents = async (): Promise<Event[]> => {
  const eventsCollection = collection(db, COLLECTION_NAME);
  const today = new Date().toISOString().split('T')[0];
  const q = query(
    eventsCollection,
    where("date", "<", today),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

// Récupérer un événement par ID
export const getEventById = async (id: string): Promise<Event | null> => {
  const eventDoc = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(eventDoc);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Event;
  }

  return null;
};

// Récupérer les événements par type
export const getEventsByType = async (type: Event['type']): Promise<Event[]> => {
  const eventsCollection = collection(db, COLLECTION_NAME);
  const q = query(eventsCollection, where("type", "==", type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));
};

// Ajouter un nouvel événement
export const addEvent = async (event: Omit<Event, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), event);
  return docRef.id;
};

// Mettre à jour un événement
export const updateEvent = async (
  id: string,
  eventData: Partial<Event>
): Promise<void> => {
  const eventRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(eventRef, eventData);
};

// Supprimer un événement
export const deleteEvent = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};
