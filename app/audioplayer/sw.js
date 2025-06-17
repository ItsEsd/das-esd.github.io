const CACHE_NAME = "app-page-cache-dsmusic";
const urlsToCache = [
  "index.html",
  "player-tw.css",
  "player.css",
  "player.js",
  "datascript.js",
  "dsmlogo.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
