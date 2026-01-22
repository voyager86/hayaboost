const CACHE_NAME = 'devtoolbox-v1';
const ASSETS = ['./', './index.html', './style.css', './md5.html', './base64.html'];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});