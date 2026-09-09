/* =====================================================
   sw.js v18 - Planning Activites
   Strategie : RESEAU D'ABORD pour tous les fichiers du site
   (plus jamais de version zombie servie depuis le cache),
   repli cache uniquement si hors ligne.
===================================================== */
const CACHE = 'pa-cache-v18';
const SHELL = ['./', './index.html', './aide.html', './firebase.js', './manifest.json', './icons/logo.svg', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  /* Navigations (index.html, aide.html) : reseau d'abord, repli cache si offline */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* Fichiers du site (firebase.js, sw.js, icons...) : RESEAU D'ABORD
     => garantit toujours la version publiee, jamais une copie zombie */
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  /* CDN externes (Tailwind, Chart.js, gstatic Firebase) : cache d'abord
     + rafraichissement en arriere-plan (URLs versionnees, sans risque) */
  e.respondWith(
    caches.match(e.request).then(hit => {
      const refresh = fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
        .catch(() => hit);
      return hit || refresh;
    })
  );
});
