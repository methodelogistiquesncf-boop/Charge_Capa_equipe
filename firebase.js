/* =====================================================
   firebase.js — Paramétrage centralisé
   Application "Semaine Type - Charge / Capacité"
   Projet Firebase : pilotage-equipe-12517
   ⚠️ Fichier à placer à côté de index.html (GitHub Pages)
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

/* =====================================================
   1. PARAMÈTRES À PERSONNALISER
===================================================== */

// Email qui devient ADMIN automatiquement au 1er lancement
export const ADMIN_EMAIL = "votre.email@entreprise.com";   // ← REMPLACEZ par votre email

const firebaseConfig = {
  apiKey: "AIzaSyAoe39w3q89D2i3dzeHVE8ulz-g0Go5IqQ",
  authDomain: "pilotage-equipe-12517.firebaseapp.com",

  /* ⚠️️⚠️ LIGNE CRITIQUE ⚠️⚠️⚠️
     Copiez l'URL EXACTE affichée dans :
     Console Firebase → Realtime Database → onglet Données (en haut de page)
     Deux formats possibles selon la région choisie à la création :
       - https://pilotage-equipe-12517-default-rtdb.firebaseio.com            (us-central1)
       - https://pilotage-equipe-12517-default-rtdb.europe-west1.firebasedatabase.app  (Belgique)
     Si la base n'existe pas encore : créez-la d'abord (région europe-west1),
     puis collez l'URL affichée. */
  databaseURL: "https://pilotage-equipe-12517-default-rtdb.firebaseio.com",

  projectId: "pilotage-equipe-12517",
  storageBucket: "pilotage-equipe-12517.firebasestorage.app",
  messagingSenderId: "972121598212",
  appId: "1:972121598212:web:4e4976d2a753af54120851"
  // (measurementId / Analytics : inutile pour cette app, retiré volontairement)
};

/* =====================================================
   2. NOMS DES NŒUDS Realtime Database
===================================================== */
export const PATHS = {
  users:  "cc_users",    // comptes + rôles (agent / manager / admin)
  blocks: "cc_blocks",   // blocs d'activités des calendriers
  config: "cc_config",   // paramètres de projection annuelle
  refs:   "cc_refs"      // référentiels d'activités par catégorie
};

/* =====================================================
   3. INITIALISATION DES INSTANCES
===================================================== */
export const app  = initializeApp(firebaseConfig);
export const db   = getDatabase(app);
export const auth = getAuth(app);

// Instance secondaire : permet à l'admin de créer des comptes
// SANS perdre sa propre session (pattern officiel Firebase)
export const secondaryApp  = initializeApp(firebaseConfig, "secondary");
export const secondaryAuth = getAuth(secondaryApp);   // ✅ getAuth(secondaryApp), pas autre chose

/* =====================================================
   4. DIAGNOSTIC DE CONNEXION (aide au débogage)
   Ouvre la console (F12) :
     - "RTDB connecté : true"  → l'URL de la base est la bonne ✅
     - "RTDB connecté : false" → databaseURL incorrect ❌ (recopiez l'URL de la console)
===================================================== */
onValue(ref(db, ".info/connected"), snap => {
  console.log("RTDB connecté :", snap.val() === true);
});

/* =====================================================
   5. RÉ-EXPORT des méthodes SDK utilisées par index.html
===================================================== */
export {
  ref, set, update, remove, onValue,
  query, orderByChild, equalTo,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, createUserWithEmailAndPassword
};
