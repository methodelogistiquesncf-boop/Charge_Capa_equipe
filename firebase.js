/* =====================================================
   firebase.js — Paramétrage centralisé
   Application "Semaine Type - Charge / Capacité"
   ⚠️ Doit être placé à côté de index.html (GitHub Pages)
===================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase, ref, set, update, remove, onValue,
  query, orderByChild, equalTo
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import {
  getAuth, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ---------- 1. PARAMÈTRES À PERSONNALISER ---------- */

// Email qui devient ADMIN automatiquement au 1er lancement
export const ADMIN_EMAIL = "votre.email@entreprise.com";

// Projet Firebase (partagé avec Pilotage_Projet / Ticket_GLPI)
const firebaseConfig = {
  apiKey: "AIzaSyAoe39w3q89D2i3dzeHVE8ulz-g0Go5IqQ",
  authDomain: "pilotage-equipe-12517.firebaseapp.com",
  projectId: "pilotage-equipe-12517",
  storageBucket: "pilotage-equipe-12517.firebasestorage.app",
  messagingSenderId: "972121598212",
  appId: "1:972121598212:web:4e4976d2a753af54120851",
  measurementId: "G-BVL2N1VGKV"
};

/* ---------- 2. NOMS DES NŒUDS Realtime Database ---------- */
export const PATHS = {
  users:  "cc_users",
  blocks: "cc_blocks",
  config: "cc_config",
  refs:   "cc_refs"
};

/* ---------- 3. INITIALISATION DES INSTANCES ---------- */
export const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
export const auth = getAuth(app);

// Instance secondaire : permet à l'admin de créer des comptes
// SANS perdre sa propre session
export const secondaryApp  = initializeApp(firebaseConfig, "secondary");
export const secondaryAuth = getAuth(secondaryAuth.app);

/* ---------- 4. RÉ-EXPORT des méthodes SDK utilisées par l'app ---------- */
export {
  ref, set, update, remove, onValue,
  query, orderByChild, equalTo,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword
};
