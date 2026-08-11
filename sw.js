/* Money Note — Service Worker
   យុទ្ធសាស្ត្រ៖ សំណើទៅ Supabase និង CDN → network តែម្តង (មិន cache)
                ឯកសារកម្មវិធី → cache-first ហើយធ្វើបច្ចុប្បន្នភាពនៅផ្ទៃខាងក្រោយ */
const CACHE  = 'money-note-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))   // កុំឱ្យ install បរាជ័យបើ icon ខ្វះ
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // ទិន្នន័យផ្ទាល់ខ្លួន និង script ខាងក្រៅ — កុំ cache
  if (url.hostname.endsWith('.supabase.co') || url.hostname.endsWith('jsdelivr.net')) return;

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok && url.origin === location.origin) {
          const cp = res.clone();
          caches.open(CACHE).then(c => c.put(req, cp));
        }
        return res;
      }).catch(() => hit || caches.match('./index.html'));
      return hit || net;
    })
  );
});
