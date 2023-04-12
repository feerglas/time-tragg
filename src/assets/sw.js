/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

const cacheName = 'time-gragg-app-cash';
const filesToCache = [
  '/assets/fonts/RobotoMono-Light.ttf',
  '/assets/fonts/RobotoMono-Regular.ttf',
  '/assets/fonts/RobotoMono-SemiBold.ttf',
  '/assets/favicon.ico',
];

self.addEventListener('install', (evt) => {
  console.log('[Service Worker] Install');

  evt.waitUntil(async () => {
    const cache = await caches.open(cacheName);

    console.log('[Service Worker] Add assets to cache');

    await cache.addAll(filesToCache);
  });
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    (async () => {
      const r = await caches.match(evt.request);

      console.log(`[Service Worker] Fetching resource: ${evt.request.url}`);

      if (r) {
        return r;
      }

      const response = await fetch(evt.request);
      const cache = await caches.open(cacheName);

      console.log(`[Service Worker] Caching new resource: ${evt.request.url}`);

      cache.put(evt.request, response.clone());

      return response;
    })(),
  );
});
