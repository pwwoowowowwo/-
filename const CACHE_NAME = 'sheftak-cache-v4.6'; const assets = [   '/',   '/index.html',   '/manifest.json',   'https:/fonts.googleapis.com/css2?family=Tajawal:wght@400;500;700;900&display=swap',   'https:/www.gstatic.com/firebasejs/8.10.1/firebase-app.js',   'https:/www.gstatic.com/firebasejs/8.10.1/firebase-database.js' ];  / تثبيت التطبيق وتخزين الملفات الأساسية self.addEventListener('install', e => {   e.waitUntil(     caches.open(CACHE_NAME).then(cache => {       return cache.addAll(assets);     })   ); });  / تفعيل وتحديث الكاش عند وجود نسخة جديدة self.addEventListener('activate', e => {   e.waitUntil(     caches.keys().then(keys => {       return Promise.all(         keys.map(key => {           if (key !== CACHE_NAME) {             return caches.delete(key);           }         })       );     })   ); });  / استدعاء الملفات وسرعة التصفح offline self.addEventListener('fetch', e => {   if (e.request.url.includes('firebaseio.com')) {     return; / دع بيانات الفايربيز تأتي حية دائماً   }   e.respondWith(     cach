const CACHE_NAME = 'sheftak-cache-v4.6';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js'
];

// تثبيت التطبيق وتخزين الملفات الأساسية
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
    return; // دع بيانات الفايربيز تأتي حية دائماً
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
    if (navigator.setAppBadge) navigator.setAppBadge(e.data.count);
  } else if (e.data.type === 'CLEAR_BADGE') {
    if (navigator.clearAppBadge) navigator.clearAppBadge();
  }
});
