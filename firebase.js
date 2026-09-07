/* =====================================================
   firebase.js — Paramétrage centralisé
   Application "Semaine Type - Charge / Capacité"
   Projet : pilotage-equipe-12517
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
export const ADMIN_EMAIL = "votre.email@entreprise.com";   // ← remplacez par votre email

const firebaseConfig = {
  apiKey: "AIzaSyAoe39w3q89D2i3dzeHVE8ulz-g0Go5IqQ",
  authDomain: "pilotage-equipe-12517.firebaseapp.com",
  databaseURL: "https://pilotage-equipe-12517-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pilotage-equipe-12517",
  storageBucket: "pilotage-equipe-12517.firebasestorage.app",
  messagingSenderId: "972121598212",
  appId: "1:972121598212:web:4e4976d2a753af54120851"
};

/* ---------- 2. Nœuds Realtime Database ---------- */
export const PATHS = {
  users:  "cc_users",
  blocks: "cc_blocks",
  config: "cc_config",
  refs:   "cc_refs"
};

/* ---------- 3. Initialisation ---------- */
export const app  = initializeApp(firebaseConfig);
export const db   = getDatabase(app);
export const auth = getAuth(app);

/* Instance secondaire (création de comptes par l'admin sans perdre sa session) */
export const secondaryApp  = initializeApp(firebaseConfig, "secondary");
export const secondaryAuth = getAuth(secondaryApp);

/* ---------- 4. Ré-export des méthodes SDK ---------- */
export {
  ref, set, update, remove, onValue,
  query, orderByChild, equalTo,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword
};
