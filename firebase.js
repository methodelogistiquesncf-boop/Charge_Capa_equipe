/* =====================================================
   firebase.js — Paramétrage centralisé
   Application "Planning Activités" (Charge / Capacité)
   Projet : pilotage-equipe-12517  •  Base : FIRESTORE
===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, updateDoc, deleteDoc,
  onSnapshot, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword, sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =====================================================
   1. CONFIGURATION FIREBASE
   ===================================================== */

export const ADMIN_EMAIL = "michael.frischherz@sncf.fr";

const firebaseConfig = {
  apiKey: "AIzaSyAoe39w3q89D2i3dzeHVE8ulz-g0Go5IqQ",
  authDomain: "pilotage-equipe-12517.firebaseapp.com",
  projectId: "pilotage-equipe-12517",
  storageBucket: "pilotage-equipe-12517.firebasestorage.app",
  messagingSenderId: "972121598212",
  appId: "1:972121598212:web:4e4976d2a753af54120851"
};

/* =====================================================
   2. NOMS DES COLLECTIONS FIRESTORE
   ===================================================== */

export const PATHS = {
  users:    "cc_users",       // Comptes utilisateurs (rôles, modes saisie)
  blocks:   "cc_blocks",      // Blocs d'activités (plannings)
  projects: "cc_projects",    // Budgets projets (code, nom, budget h, actif)
  config:   "cc_config",      // Paramètres globaux (heures, semaines, ETP, taux)
  refs:     "cc_refs"         // Référentiels d'activités (MCO, support, transverse, absences)
};

/* =====================================================
   3. INITIALISATION FIREBASE
   ===================================================== */

// Instance principale : utilisée pour toutes les opérations courantes
export const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);

// Instance secondaire : permet à l'admin de créer des comptes
// sans perdre sa propre session (Firebase Auth ne permet qu'un utilisateur actif par app)
export const secondaryApp  = initializeApp(firebaseConfig, "secondary");
export const secondaryAuth = getAuth(secondaryApp);

/* =====================================================
   4. RÉ-EXPORT DES MÉTHODES SDK
   ===================================================== */

export {
  // Firestore
  collection, doc, setDoc, updateDoc, deleteDoc,
  onSnapshot, query, where, getDocs,
  
  // Auth
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword, sendPasswordResetEmail
};
