const CACHE_NAME = '非遗工坊-v1';
const ASSETS_TO_CACHE = [
  '/index.html',
  '/kecheng.html',
  '/heritage.html',
  '/course-list.html',
  '/aa/suxiu4.jpg',
  '/aa/piyingxi.jpg',
  '/aa/cixiu.jpg',
  '/aa/guqin2.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});