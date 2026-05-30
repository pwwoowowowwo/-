const CACHE_NAME = 'sheftak-cache-v5';
const assets = [
  'index.html',
  'admin.html',
  'manifest.json',
  'icon.png'
];

// تثبيت وتخزين الملفات الأساسية
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل وتحديث الكاش عند وجود نسخة جديدة
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// استدعاء الملفات وسرعة التصفح offline
self.addEventListener('fetch', e => {
  if (e.request.url.includes('firebaseio.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});

// الاستماع لإشعارات العداد (Badges)
self.addEventListener('message', e => {
  if (e.data.type === 'SET_BADGE') {
    if (navigator.setAppBadge) {
      navigator.setAppBadge(e.data.count);
    }
  } else if (e.data.type === 'CLEAR_BADGE') {
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
    }
  }
});
