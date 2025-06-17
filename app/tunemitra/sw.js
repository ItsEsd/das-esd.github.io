const CACHE_NAME = "app-page-cache-tunemitra";
const urlsToCache = [
  "index.html",
  "assets/css/styles.css",
  "assets/js/saavn-search.js",
  "logo.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
