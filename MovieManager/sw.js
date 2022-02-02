self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./add.html",
        "./js/Ajouter.js",
        "./js/Recherche.js",
        "./manifest.json",
        "./css/style.css",
        "./css/add.css",
        "./sw.js",
        
      ]);
    })
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request).then((response) => {
          return caches.open("v1").then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});