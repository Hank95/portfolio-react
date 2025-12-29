// Skip service worker entirely in development
const isLocalhost = self.location.hostname === 'localhost' ||
                    self.location.hostname === '127.0.0.1' ||
                    self.location.hostname === '[::1]';

if (isLocalhost) {
  // In development, unregister this service worker and skip all caching
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name))))
        .then(() => self.clients.claim())
        .then(() => self.registration.unregister())
    );
  });
  // Don't set up any fetch handlers in dev mode
} else {
  // Production service worker code below
  initProductionServiceWorker();
}

function initProductionServiceWorker() {
const CACHE_NAME = 'portfolio-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  // Add other critical assets
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first strategy for static assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.url.includes('/static/')) {
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              const responseToCache = response.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
              
              return response;
            });
        })
    );
  }
  // Network-first strategy for API calls and dynamic content
  else if (request.url.includes('/api/') || 
           request.method === 'POST' ||
           request.headers.get('content-type')?.includes('application/json')) {
    
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful GET requests
          if (request.method === 'GET' && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
  }
  // Stale-while-revalidate for HTML pages
  else {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          const fetchPromise = fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseToCache = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseToCache);
                  });
              }
              return response;
            });
          
          return cachedResponse || fetchPromise;
        })
    );
  }
});

// Background sync for failed network requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Retry failed requests from IndexedDB
      retryFailedRequests()
    );
  }
});

// Handle failed requests
async function retryFailedRequests() {
  // Implementation would depend on your specific needs
  // This is a placeholder for background sync functionality
  console.log('Retrying failed requests...');
}

// Handle service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const start = performance.now();
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const duration = performance.now() - start;
        
        // Send performance data to analytics
        if (duration > 1000) { // Log slow requests
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({
                type: 'SLOW_REQUEST',
                url: event.request.url,
                duration
              });
            });
          });
        }
        
        return response;
      })
  );
});
} // End initProductionServiceWorker