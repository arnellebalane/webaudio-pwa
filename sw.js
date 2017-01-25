const cacheName = 'cache-v1';
const pathsToCache = [
  '/',
  '/main.css',
  '/main.js'
];


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(pathsToCache))
      .then(_ => console.info(`Caching for "${cacheName}" complete.`))
  );
});


self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      })))
      .then(_ => console.info(`Deleted old caches.`))
  );
});


self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
