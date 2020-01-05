const cacheName = 'cache-v1';
const assets = ['/','index.html','app.css'];

self.addEventListener('install',event=>{
console.log('Services worker installed');
event.waitUntil(
  caches.open(cacheName)
  .then(cache=>{
    return cache.addAll(assets);
  })
)
});

self.addEventListener('activate', event=>{
console.log('serviceworker activated');
});

self.addEventListener('fetch',event=>{
  console.log('fetch event', event.request.url);
  event.respondWith(caches.match(event.request))
  .then(cachedResponse=>{
    if(cachedResponse){
      return cachedResponse;
    }
    return fetch(event.request)
  })
  
})