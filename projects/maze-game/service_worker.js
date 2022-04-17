importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
const plugin = maxEntries => {
  return [
    new workbox.expiration.Plugin({
      maxEntries: maxEntries,
      maxAgeSeconds: 7 * 24 * 60 * 60
    }),
    new workbox.cacheableResponse.Plugin({
      statuses: [0, 200]
    })
  ];
};

workbox.precaching.precacheAndRoute([
  {
    "url": "offline.html",
    "revision": "251c61f7b7ea7556054e7d60cab8611f"
  }
]);


const networkFirstHandler = new workbox.strategies.NetworkFirst({
  cacheName: "cache-name",
  plugins: plugin(10)
});

const FALLBACK_URL = workbox.precaching.getCacheKeyForURL("/offline.html");
const matcher = ({ event }) => event.request.mode === "navigate";
const handler = ({ event }) =>
  networkFirstHandler
    .handle({ event })
    .then(response => response || caches.match(FALLBACK_URL))
    .catch(() => caches.match(FALLBACK_URL));

workbox.routing.registerRoute(matcher, handler);
