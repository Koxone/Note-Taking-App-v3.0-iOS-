const CACHE_NAME = 'koxnotes-v1';
const urlsToCache = [
  './',
  './index.html',
  './offline.html',
  './styles/main.css',
  './styles/ios.css',
  './javascript/main.js',
  './javascript/auth.js',
  './javascript/sw-register.js',
  './javascript/ios-touch.js',
  './assets/images/Feather.png',
  './manifest.json',
  './assets/images/favicon.ico',
  './assets/images/favicon-16x16.png',
  './assets/images/favicon-32x32.png',
  './assets/images/android-chrome-192x192.png',
  './assets/images/android-chrome-512x512.png',
  './assets/images/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en caché, devolver directamente
        if (response) {
          return response;
        }
        
        // Si no está en caché, intentar obtenerlo de la red
        return fetch(event.request.clone())
          .then((response) => {
            // Verificar respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar la respuesta para poder usarla y cachearla
            const responseToCache = response.clone();
            
            // Almacenar en caché
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // Si falla la red y es una página HTML, mostrar offline.html
            if (event.request.mode === 'navigate') {
              return caches.match('./offline.html');
            }
            
            // Para otros recursos, intentar encontrar algo similar
            return caches.match('./assets/images/favicon.ico');
          });
      })
  );
});