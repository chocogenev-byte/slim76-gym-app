const CACHE_NAME = 'slim76-gym-v1';
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
