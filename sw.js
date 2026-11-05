const CACHE_NAME = 'slim76-gym-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/machine_mag_lat.jpg',
  './images/machine_lat_plate.jpg',
  './images/machine_seated_row.jpg',
  './images/machine_chest_press.jpg',
  './images/machine_pec_deck.jpg',
  './images/machine_arm_curl.jpg',
  './images/machine_leg_press.jpg',
  './images/machine_leg_extension.jpg',
  './images/machine_leg_curl.jpg',
  './images/machine_inner_thigh.jpg',
  './images/machine_treadmill.jpg',
  './images/machine_skip_hip.jpg',
  './images/machine_skip_legpress45.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.includes('restful-api.dev') || url.includes('ntfy.sh')) {
    return;
  }
  // Network-first for HTML/navigation so app updates appear immediately
  if (event.request.mode === 'navigate' || url.endsWith('index.html') || url.endsWith('/slim76-gym-app/')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
