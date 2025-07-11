const CACHE_NAME = 'tuana-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/anilar.html',
  '/sayfa1.html',
  '/sayfa2.html',
  'https://cdn.glitch.global/1f733d54-6e4f-42d5-b510-8606e0142e4f/192g%C3%BCncel.png',
  'https://cdn.glitch.global/1f733d54-6e4f-42d5-b510-8606e0142e4f/512512guncel.png',
  'https://fonts.googleapis.com/css2?family=Segoe+UI'
];

// Yükleme anında önbelleğe alma
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ağ isteği yapılınca cache'ten ver
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Eski cache'leri temizle
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

