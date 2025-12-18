/**
 * Script de mise à jour des données Firebase
 *
 * Pour exécuter ce script :
 * 1. Assure-toi d'être dans le dossier du projet
 * 2. Lance : npx ts-node scripts/updateData.ts
 *
 * Ou copie le contenu dans la console du navigateur sur /admin/dashboard
 * après avoir modifié l'import Firebase
 */

import * as dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  deleteField,
} from "firebase/firestore";

// Charger les variables d'environnement depuis .env
dotenv.config();

// Configuration Firebase (utilise les variables d'environnement)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Vérifier que la configuration est valide
console.log("🔧 Configuration Firebase:");
console.log("  - Project ID:", firebaseConfig.projectId || "❌ MANQUANT");
console.log("  - Auth Domain:", firebaseConfig.authDomain || "❌ MANQUANT");

if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  console.error("\n❌ Erreur: Configuration Firebase incomplète!");
  console.error("Assurez-vous que le fichier .env existe avec les bonnes valeurs.");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================
// DONNÉES DES EXPÉRIENCES À AJOUTER/MODIFIER
// ============================================================

const experiencesData = [
  {
    id: "cridacompany",
    title: "Cridacompany",
    location: "Toulouse",
    description:
      "Cridacompany est une compagnie de cirque franco-catalane créée à Toulouse en 2006 suite à la rencontre au Lido (Centre des Arts du Cirque de Toulouse) de Jur Domingo et Julien Vittecoq, metteurs en scène et chorégraphes.",
    services: ["Gestion administrative", "Gestionnaire de paies"],
    logo: "", // À ajouter via l'admin
    website: "https://www.cridacompany.com",
  },
  {
    id: "collektifin-art",
    title: "Collektifin'Art",
    location: "Toulouse",
    description:
      "Promotion de la culture Amazigh au travers des échanges interculturels.",
    services: ["Structuration", "Gestionnaire des paies"],
    logo: "",
    website: "",
  },
  {
    id: "le-circus",
    title: "Le Circus",
    location: "Toulouse",
    description:
      "Centre d'arts alternatif. La philosophie du lieu est définie par le partage, la bienveillance, la bonne humeur, les échanges, le respect, l'écologie, l'humilité et la tolérance.",
    services: ["Gestion administrative", "Gestionnaire de paies"],
    logo: "",
    website: "",
  },
  {
    id: "ulysse",
    title: "Ulysse, Maison d'artistes",
    location: "Figeac",
    description:
      "Depuis 18 ans, Ulysse Maison d'Artistes, coopérative culturelle basée à Figeac, a pour projet de rapprocher et mener conjointement un projet culturel de territoire et un projet d'accompagnement, de soutien à la création, de production, de diffusion au niveau national et international d'artistes musicien.nes.",
    services: ["Gestionnaire de subventions"],
    logo: "",
    website: "https://www.ulyssemaisondartistes.com",
  },
];

// Mises à jour des expériences existantes
const experiencesUpdates: Record<string, Partial<{
  description: string;
  location: string;
  services: string[];
  website: string;
  year: null; // Pour supprimer le champ
}>> = {
  // Regarts - enlever les étiquettes services
  osX9fdgwHxBeuvbNlSgU: {
    description:
      "Structure toulousaine créée en 2001 ayant pour but de promouvoir les musiques actuelles et alternatives. Depuis plus de 20 ans, nos équipes œuvrent dans la production et l'organisation de concerts et de clubs. Son champ d'activités s'est élargi grâce à son service d'accompagnement d'artistes (Incubateur) et ses prestations de services pour les professionnels.",
    services: [], // Enlever les étiquettes
    website: "https://www.regarts.org",
  },
  // La Cavale - Lieu = Concots
  YtelMi6fcMRTLqzZEokq: {
    location: "Concots",
    website: "",
  },
  // Electrik Park - Lieu = Chatou
  CCXKVjhSkXEh8J0PHEHg: {
    location: "Chatou",
    website: "https://www.electrikpark.com",
  },
  // Rio Loco - Juste régie artistes
  "7LVmM3gMi9WMza79HzWv": {
    services: ["Régie artistes"],
    website: "https://www.rio-loco.org",
  },
  // Bulles de Jazz - Lieu = Lisle sur Tarn
  omnIbL7IOSfvzw10v2CF: {
    location: "Lisle sur Tarn",
    services: ["Direction de production", "Régie artistes"],
    website: "",
  },
  // L'Été de Vaour
  etzHTjv7ur2HCkEysSL1: {
    services: ["Administration", "Production", "Régie artistes"],
    website: "https://www.vaour.com",
  },
  // Little Festival - entre électro et street art
  KlQwIysPmCifcXs7I9Iz: {
    description:
      "Festival à taille humaine proposant une programmation éclectique entre électro et street art.",
    services: ["Régie bénévoles"],
    website: "",
  },
  // Ocean Fest - Régie entrées
  "8oF59NcG86qsUu5qnglw": {
    services: ["Direction de production", "Régie entrées"],
    website: "",
  },
  // Electro Alternativ
  W2YHZw0nNtO90zRk0pkL: {
    website: "https://www.electro-alternativ.com",
  },
};

// ============================================================
// DONNÉES DES DJS À METTRE À JOUR
// ============================================================

const djsUpdates: Record<string, {
  description?: string;
  image?: string;
}> = {
  // Aimée
  W1ejbdKjSzBG4xBRcSFe: {
    description: "",
    image: "/images/placeholder.jpg",
  },
  // Antix 2000
  B978NlDlxzE6csc2uiB5: {
    description: "",
    image: "/images/placeholder.jpg",
  },
  // Babzilla, Darta - séparer en deux entrées?
  RrCFYXeKiNSg5BQX5L2H: {
    description: "",
    image: "/images/placeholder.jpg",
  },
  // Pierino
  "8EglL7XIWx8g9jZq6B4q": {
    description: "",
    image: "/images/placeholder.jpg",
  },
  // Marius
  b83nyhTWUEtkk6VxDmAh: {
    description: "",
    image: "/images/placeholder.jpg",
  },
  // Karl Peöti
  rUXWCJ8rSus4VoDW1grh: {
    description: "",
    image: "/images/placeholder.jpg",
  },
};

// DJs à ajouter (Darta séparé)
const djsToAdd = [
  {
    name: "DARTA",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
];

// ============================================================
// ARTISTES MANQUANTS À AJOUTER
// ============================================================

const artistsToAdd = [
  {
    name: "Amalia Jaulin",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
  {
    name: "Rodolphe Macabéo",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
  {
    name: "Solène Weinachter",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
  {
    name: "Darta La",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
  {
    name: "Laura O'neill",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
  {
    name: "Manon Gasseng",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
  {
    name: "Zingabe",
    description: "",
    image: "/images/placeholder.jpg",
    socialLinks: {},
  },
];

// ============================================================
// FONCTIONS D'EXÉCUTION
// ============================================================

async function updateExperiences() {
  console.log("📝 Mise à jour des expériences...");

  // Ajouter les nouvelles expériences
  for (const exp of experiencesData) {
    try {
      await setDoc(doc(db, "experiences", exp.id), exp);
      console.log(`  ✅ Ajouté: ${exp.title}`);
    } catch (error) {
      console.error(`  ❌ Erreur pour ${exp.title}:`, error);
    }
  }

  // Mettre à jour les expériences existantes
  for (const [id, updates] of Object.entries(experiencesUpdates)) {
    try {
      const docRef = doc(db, "experiences", id);

      // Préparer les mises à jour (supprimer year si présent)
      const updateData: Record<string, unknown> = { ...updates };
      updateData.year = deleteField(); // Supprimer le champ year

      await updateDoc(docRef, updateData);
      console.log(`  ✅ Mis à jour: ${id}`);
    } catch (error) {
      console.error(`  ❌ Erreur pour ${id}:`, error);
    }
  }

  // Supprimer le champ year de toutes les expériences
  const experiencesSnapshot = await getDocs(collection(db, "experiences"));
  for (const docSnap of experiencesSnapshot.docs) {
    try {
      await updateDoc(doc(db, "experiences", docSnap.id), {
        year: deleteField(),
      });
      console.log(`  🗑️ Supprimé year de: ${docSnap.id}`);
    } catch (error) {
      // Ignorer si le champ n'existe pas
    }
  }
}

async function updateDjs() {
  console.log("\n🎧 Mise à jour des DJs...");

  // Mettre à jour les DJs existants
  for (const [id, updates] of Object.entries(djsUpdates)) {
    try {
      const docRef = doc(db, "djs", id);
      await updateDoc(docRef, updates);
      console.log(`  ✅ Mis à jour: ${id}`);
    } catch (error) {
      console.error(`  ❌ Erreur pour ${id}:`, error);
    }
  }

  // Ajouter les nouveaux DJs
  for (const dj of djsToAdd) {
    try {
      const docRef = doc(collection(db, "djs"));
      await setDoc(docRef, dj);
      console.log(`  ✅ Ajouté: ${dj.name}`);
    } catch (error) {
      console.error(`  ❌ Erreur pour ${dj.name}:`, error);
    }
  }
}

async function addMissingArtists() {
  console.log("\n🎨 Ajout des artistes manquants...");

  for (const artist of artistsToAdd) {
    try {
      const docRef = doc(collection(db, "artists"));
      await setDoc(docRef, artist);
      console.log(`  ✅ Ajouté: ${artist.name}`);
    } catch (error) {
      console.error(`  ❌ Erreur pour ${artist.name}:`, error);
    }
  }
}

// ============================================================
// EXÉCUTION PRINCIPALE
// ============================================================

async function main() {
  console.log("🚀 Début de la mise à jour des données...\n");

  try {
    await updateExperiences();
    await updateDjs();
    await addMissingArtists();

    console.log("\n✨ Mise à jour terminée avec succès!");
  } catch (error) {
    console.error("\n❌ Erreur lors de la mise à jour:", error);
  }
}

main();
