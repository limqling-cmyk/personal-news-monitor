// World News Monitor — Service Worker
// Minimal SW required for PWA installability
const CACHE = 'news-monitor-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['./']))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Network-first: always fetch fresh news, fall back to cache if offline
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
