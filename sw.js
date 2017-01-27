const cacheName = 'cache-v2';
const pathsToCache = [
  '/',
  '/main.css',
  '/main.js',
  '/logo.png',
  '/manifest.json'
];


self.addEventListener('install', e => e.waitUntil(
  caches.open(cacheName)
    .then(cache => cache.addAll(pathsToCache))
    .then(_ => self.skipWaiting())
));


self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.map(key => (key !== cacheName) && caches.delete(key))))
    .then(_ => self.clients.claim())
));


self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request)
    .then(response => response || fetch(e.request))
));
