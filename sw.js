/* =====================================================
   sw.js — Service Worker "Planning Activités"
   ⚠️ À chaque nouvelle version publiée : incrémentez CACHE (v3, v4…)
===================================================== */
const CACHE = 'pa-cache-v2';
const SHELL = [
  './',
  './index.html',
  './aide.html',
  './firebase.js',
  './manifest.json',
  './icons/logo.svg',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
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

  /* Navigations : réseau d'abord (pages toujours à jour), repli cache si offline */
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  /* Même origine (fichiers du repo) : cache d'abord */
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
      }))
    );
    return;
  }

  /* CDN (Tailwind, Chart.js, Firebase gstatic, fonts) : cache + revalidation */
  e.respondWith(
    caches.match(e.request).then(hit => {
      const fresher = fetch(e.request).then(res => {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
      }).catch(() => hit);
      return hit || fresher;
    })
  );
});
