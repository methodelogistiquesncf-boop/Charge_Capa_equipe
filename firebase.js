/* =====================================================
   firebase.js — Paramétrage centralisé
   Application "Planning Activités" (Charge / Capacité)
   Projet : pilotage-equipe-12517  •  Base : FIRESTORE
   ⚠️ Ce fichier ne doit JAMAIS contenir les règles Firestore
   (elles se publient dans la console Firebase → Firestore → Règles)
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

/* ---------- 1. CONFIGURATION ---------- */
export const ADMIN_EMAIL = "michael.frischherz@sncf.fr";

const firebaseConfig = {
  apiKey: "AIzaSyAoe39w3q89D2i3dzeHVE8ulz-g0Go5IqQ",
  authDomain: "pilotage-equipe-12517.firebaseapp.com",
  projectId: "pilotage-equipe-12517",
  storageBucket: "pilotage-equipe-12517.firebasestorage.app",
  messagingSenderId: "972121598212",
  appId: "1:972121598212:web:4e4976d2a753af54120851"
};

/* ---------- 2. COLLECTIONS ---------- */
export const PATHS = {
  users:    "cc_users",
  blocks:   "cc_blocks",
  projects: "cc_projects",
  config:   "cc_config",
  refs:     "cc_refs"
};

/* ---------- 3. INITIALISATION ---------- */
export const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);

/* Instance secondaire : création de comptes par l'admin sans perdre sa session */
export const secondaryApp  = initializeApp(firebaseConfig, "secondary");
export const secondaryAuth = getAuth(secondaryApp);

/* ---------- 4. RÉ-EXPORT SDK ---------- */
export {
  collection, doc, setDoc, updateDoc, deleteDoc,
  onSnapshot, query, where, getDocs,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword, sendPasswordResetEmail
};
