// Example Church - Service Worker
// Version: 1.1.3
// Update this string to bust the cache when deploying changed assets.
const CACHE_NAME = 'grace-memorial-v5';

// Core pages and assets cached during install so the site still opens offline.
const PRECACHE_URLS = [
  '/index.html',
  '/pages/beliefs.html',
  '/pages/romans-road.html',
  '/pages/new-believer.html',
  '/pages/prayer-request.html',
  '/pages/plan-your-visit.html',
  '/pages/resources.html',
  '/pages/discipleship.html',
  '/pages/ask-a-pastor.html',
  '/pages/need-help.html',
  '/pages/questions.html',
  '/testimonies/pastor-testimony.html',
  '/testimonies/worship-leader-testimony.html',
  '/testimonies/administrator-testimony.html',
  '/testimonies/pianist-testimony.html',
  '/testimonies/media-director-testimony.html',
  '/assets/css/site-enhancements.css',
  '/assets/js/site-enhancements.js',
  '/assets/manifest.json',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Ubuntu:wght@300;400;500&display=swap',
];

// INSTALL
// Cache all core pages when the service worker is first installed.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS);
    }).then(function() {
      // Activate immediately without waiting for old tabs to close.
      return self.skipWaiting();
    })
  );
});

// ACTIVATE
// Clean up old caches when a new service worker takes over.
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// FETCH
// HTML uses network-first so visitors see fresh content when online.
// Assets use cache-first so repeat visits stay fast.
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);

  // Skip non-GET requests. Form submissions and API writes should stay live.
  if (event.request.method !== 'GET') return;

  // Skip dynamic feeds and third-party embeds that should always stay live.
  if (url.pathname.indexOf('/api/') === 0) return;
  if (url.pathname === '/assets/data/site-events.json') return;
  if (url.hostname.includes('googleapis.com') && url.pathname.includes('youtube')) return;
  if (url.hostname.includes('youtube.com')) return;
  if (url.hostname.includes('googlemaps') || url.hostname.includes('maps.googleapis')) return;

  // Network-first for HTML pages.
  if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Cache the fresh response for offline fallback.
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(function() {
          // Offline: serve the cached page, falling back to the home page.
          return caches.match(event.request).then(function(cached) {
            return cached || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Cache-first for everything else, including fonts, images, CSS, and JS.
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
        return response;
      });
    })
  );
});
