// Choose a cache name
const cacheName = 'cache-v1';
// List the files to precache
const precacheResources = [
  './',
  './index.html',
  './css/style.css',
  './js/controller.js',
  './img/logo72.png',
  './img/logo96.png',
  './img/logo120.png',
  './img/logo128.png',
  './img/logo144.png',
  './img/logo152.png',
  './img/logo180.png',
  './img/logo192.png',
  './img/logo256.png',
  './img/logo384.png',
  './img/logo512.png',
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log(`Fetch intercepted for: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
