// World News Monitor — Service Worker v2
const CACHE = 'news-monitor-v2';

// Install: skip waiting immediately, no pre-caching (avoids install failures)
self.addEventListener('install', () => self.skipWaiting());

// Activate: take control of all clients right away
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Fetch: network-first, silent fail (required for PWA installability)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
