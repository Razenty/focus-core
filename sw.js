const cacheName = 'razenty-v1';
const staticAssets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    (async () => {
      const res = await fetch(e.request).catch(() => caches.match(e.request));
      return res;
    })()
  );
});