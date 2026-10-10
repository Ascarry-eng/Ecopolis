// sw.js — Ecopolis service worker. Uygulama kabuğu ve içerikler kurulumda önbelleğe alınır (çevrimdışı çalışır);
// webR (R'ın kendisi ve paketleri) ilk kullanımda ayrı bir önbelleğe alınır, sonra internetsiz de çalışır.
// DeepSeek istekleri asla önbelleğe alınmaz. Liste ve sürüm araclar/sw_uret.js ile üretilir — elle düzenleme.
const SURUM = "30648efe6048";
const ON = "ecopolis-";
const KABUK = ON + "kabuk-" + SURUM;
const WEBR = ON + "webr-v1";
const DOSYALAR = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/ecopolis.css",
  "./css/fontlar.css",
  "./js/araclar.js",
  "./js/cekirdek.js",
  "./js/gorsel_mate.js",
  "./js/gorsel_mikro.js",
  "./js/gorsel_mikro2.js",
  "./js/gorsel_r.js",
  "./js/grafik.js",
  "./js/ikonlar.js",
  "./js/ilerleme.js",
  "./js/kahin.js",
  "./js/quiz.js",
  "./js/r.js",
  "./js/sayfalar.js",
  "./js/uygulama.js",
  "./icerik/dizin.js",
  "./icerik/mate/h01.js",
  "./icerik/mate/h02.js",
  "./icerik/mate/h03.js",
  "./icerik/mate/h04.js",
  "./icerik/mate/h05.js",
  "./icerik/mate/h06.js",
  "./icerik/mate/h07.js",
  "./icerik/mate/h09.js",
  "./icerik/mate/h10.js",
  "./icerik/mate/h11.js",
  "./icerik/mate/h12.js",
  "./icerik/mate/h13.js",
  "./icerik/mate/h14.js",
  "./icerik/mate/h16.js",
  "./icerik/mikro/m01.js",
  "./icerik/mikro/m02.js",
  "./icerik/mikro/m03.js",
  "./icerik/mikro/m04.js",
  "./icerik/mikro/m05.js",
  "./icerik/mikro/m06.js",
  "./icerik/mikro/m07.js",
  "./icerik/mikro/m08.js",
  "./icerik/mikro/m09.js",
  "./icerik/mikro/m10.js",
  "./icerik/mikro/m11.js",
  "./icerik/mikro/m12.js",
  "./icerik/mikro/m13.js",
  "./icerik/mikro/m14.js",
  "./icerik/mikro/m15.js",
  "./icerik/mikro/m16.js",
  "./icerik/mikro/m17.js",
  "./icerik/mikro/m18.js",
  "./icerik/mikro/m19.js",
  "./icerik/mikro/m20.js",
  "./icerik/mikro/m21.js",
  "./icerik/mikro/m22.js",
  "./icerik/mikro/m23.js",
  "./icerik/r/r01.js",
  "./icerik/r/r02.js",
  "./icerik/r/r03.js",
  "./icerik/r/r04.js",
  "./icerik/r/r05.js",
  "./icerik/r/r06.js",
  "./icerik/r/r07.js",
  "./icerik/r/r08.js",
  "./icerik/r/r09.js",
  "./icerik/r/r10.js",
  "./icerik/r/r11.js",
  "./icerik/r/r12.js",
  "./icerik/r/r13.js",
  "./icerik/r/r14.js",
  "./icerik/r/r15.js",
  "./icerik/r/r16.js",
  "./icerik/r/r17.js",
  "./icerik/r/r18.js",
  "./icerik/r/r19.js",
  "./icerik/r/r20.js",
  "./lib/katex/fonts/KaTeX_AMS-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "./lib/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "./lib/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Main-Bold.woff2",
  "./lib/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "./lib/katex/fonts/KaTeX_Main-Italic.woff2",
  "./lib/katex/fonts/KaTeX_Main-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "./lib/katex/fonts/KaTeX_Math-Italic.woff2",
  "./lib/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "./lib/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "./lib/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Script-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Size1-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Size2-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Size3-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Size4-Regular.woff2",
  "./lib/katex/fonts/KaTeX_Typewriter-Regular.woff2",
  "./lib/katex/katex.min.css",
  "./lib/katex/katex.min.js",
  "./lib/marked.js",
  "./fonts/alegreya-greek-400-italic.woff2",
  "./fonts/alegreya-greek-400-normal.woff2",
  "./fonts/alegreya-greek-500-normal.woff2",
  "./fonts/alegreya-greek-700-italic.woff2",
  "./fonts/alegreya-greek-700-normal.woff2",
  "./fonts/alegreya-latin-400-italic.woff2",
  "./fonts/alegreya-latin-400-normal.woff2",
  "./fonts/alegreya-latin-500-normal.woff2",
  "./fonts/alegreya-latin-700-italic.woff2",
  "./fonts/alegreya-latin-700-normal.woff2",
  "./fonts/alegreya-latin-ext-400-italic.woff2",
  "./fonts/alegreya-latin-ext-400-normal.woff2",
  "./fonts/alegreya-latin-ext-500-normal.woff2",
  "./fonts/alegreya-latin-ext-700-italic.woff2",
  "./fonts/alegreya-latin-ext-700-normal.woff2",
  "./fonts/alegreya-sans-greek-400-italic.woff2",
  "./fonts/alegreya-sans-greek-400-normal.woff2",
  "./fonts/alegreya-sans-greek-500-normal.woff2",
  "./fonts/alegreya-sans-greek-700-normal.woff2",
  "./fonts/alegreya-sans-latin-400-italic.woff2",
  "./fonts/alegreya-sans-latin-400-normal.woff2",
  "./fonts/alegreya-sans-latin-500-normal.woff2",
  "./fonts/alegreya-sans-latin-700-normal.woff2",
  "./fonts/alegreya-sans-latin-ext-400-italic.woff2",
  "./fonts/alegreya-sans-latin-ext-400-normal.woff2",
  "./fonts/alegreya-sans-latin-ext-500-normal.woff2",
  "./fonts/alegreya-sans-latin-ext-700-normal.woff2",
  "./fonts/cinzel-latin-500-normal.woff2",
  "./fonts/cinzel-latin-700-normal.woff2",
  "./fonts/cinzel-latin-ext-500-normal.woff2",
  "./fonts/cinzel-latin-ext-700-normal.woff2",
  "./fonts/jetbrains-mono-greek-400-normal.woff2",
  "./fonts/jetbrains-mono-greek-600-normal.woff2",
  "./fonts/jetbrains-mono-latin-400-normal.woff2",
  "./fonts/jetbrains-mono-latin-600-normal.woff2",
  "./fonts/jetbrains-mono-latin-ext-400-normal.woff2",
  "./fonts/jetbrains-mono-latin-ext-600-normal.woff2",
  "./img/ikon-180.png",
  "./img/ikon-192.png",
  "./img/ikon-512.png",
  "./img/ikon-maskable-512.png",
  "./img/ikon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(KABUK).then((c) => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((adlar) => Promise.all(adlar.filter((a) => a.startsWith(ON + "kabuk-") && a !== KABUK).map((a) => caches.delete(a))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const istek = e.request;
  if (istek.method !== "GET") return;
  const url = new URL(istek.url);
  if (url.hostname.endsWith("deepseek.com")) return;   // yapay zekâ: hiç dokunma

  // webR ve paket deposu: sürüm adresli, değişmez dosyalar → önce önbellek
  if (url.hostname === "webr.r-wasm.org" || url.hostname === "repo.r-wasm.org") {
    e.respondWith(caches.open(WEBR).then(async (c) => {
      const var_ = await c.match(istek);
      if (var_) return var_;
      const yanit = await fetch(istek);
      if (yanit.ok) c.put(istek, yanit.clone());
      return yanit;
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Uygulama dosyaları: önbellekten hemen ver, arka planda tazele (stale-while-revalidate)
  e.respondWith(caches.open(KABUK).then(async (c) => {
    const anahtar = url.pathname.endsWith("/") ? "./" : istek;
    const var_ = await c.match(anahtar, { ignoreSearch: true });
    const ag = fetch(istek).then((y) => { if (y.ok) c.put(anahtar, y.clone()); return y; }).catch(() => null);
    if (var_) { e.waitUntil(ag); return var_; }
    const y = await ag;
    return y || new Response("Çevrimdışı ve bu dosya önbellekte yok.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }));
});
