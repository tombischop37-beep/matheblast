const CACHE_NAME = 'matheblast-v7';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Netlify Functions und externe APIs NIEMALS cachen — immer direkt ans Netz
  if (url.includes('/.netlify/functions/') ||
      url.includes('api.stripe.com') ||
      url.includes('checkout.stripe.com') ||
      !url.startsWith(self.location.origin)) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Alles andere: Cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
