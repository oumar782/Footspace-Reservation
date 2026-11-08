import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

self.skipWaiting();
clientsClaim();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request, url }) => url.origin === self.location.origin && (
    request.destination === 'script' || request.destination === 'style'
  ),
  new StaleWhileRevalidate({
    cacheName: 'pf-page-assets',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 })],
  })
);

registerRoute(
  ({ request, url }) => url.origin === 'https://fonts.gstatic.com' && request.destination === 'font',
  new CacheFirst({
    cacheName: 'pf-fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 180 })],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'pf-images',
    plugins: [new ExpirationPlugin({ maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 })],
  })
);

registerRoute(
  ({ url }) => /^https:\/\/backend-foot-omega\.vercel\.app\/api\//i.test(url.href),
  new NetworkFirst({
    cacheName: 'pf-api-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 60 * 5 })],
  })
);

registerRoute(
  ({ url }) => /^https:\/\/localhost:5000\/api\//i.test(url.href),
  new NetworkFirst({
    cacheName: 'pf-local-api-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 60 * 5 })],
  })
);

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data?.json() || {};
  } catch {
    payload = { body: event.data?.text() || '' };
  }

  const notification = payload.notification || payload;
  const title = notification.title || 'PlayForest';
  const targetUrl = payload.url || payload.data?.url || '/communities';

  event.waitUntil(self.registration.showNotification(title, {
    body: notification.body || payload.body || 'Une nouveauté vous attend dans votre communauté.',
    icon: notification.icon || '/favicon.png',
    badge: notification.badge || '/favicon.png',
    tag: payload.tag || payload.data?.tag || 'playforest-community',
    data: { url: targetUrl },
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const requestedUrl = event.notification.data?.url || '/communities';
  const targetUrl = new URL(requestedUrl, self.location.origin);
  const safeUrl = targetUrl.origin === self.location.origin ? targetUrl.href : `${self.location.origin}/communities`;

  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
    const matchingWindow = windows.find((windowClient) => new URL(windowClient.url).origin === self.location.origin);
    if (matchingWindow) {
      matchingWindow.navigate(safeUrl);
      return matchingWindow.focus();
    }
    return self.clients.openWindow(safeUrl);
  }));
});
