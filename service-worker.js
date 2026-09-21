const CACHE_NAME = 'five-squared-v19';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => Promise.all(
        APP_SHELL.map(url =>
          fetch(new Request(url, { cache: 'reload' }))
            .then(response => {
              if (!response || !response.ok) {
                throw new Error(`Failed to cache ${url}`);
              }
              return cache.put(url, response);
            })
        )
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key.startsWith('five-squared-') && key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // For page loads, prefer the current network version when online.
  // Update the offline copy at the same time; fall back to cache if offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(async response => {
          if (!response || !response.ok) throw new Error('Page unavailable');
          if (response && response.ok) {
            const copy = response.clone();
            await caches.open(CACHE_NAME)
              .then(cache => cache.put('./index.html', copy)).catch(() => {});
          }
          return response;
        })
        .catch(() =>
          caches.match('./index.html')
            .then(cached => cached || caches.match('./'))
        )
    );
    return;
  }

  // Static assets are stable and can remain cache-first.
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        return fetch(event.request)
          .then(async response => {
            if (!response || !response.ok || response.type === 'opaque') {
              return response;
            }

            const copy = response.clone();
            await caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, copy)).catch(() => {});

            return response;
          });
      })
  );
});
