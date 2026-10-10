// ekran.js — uygulamayı yerel sunucudan Chrome'da açar, rotaların ekran görüntüsünü alır, konsol/sayfa hatalarını toplar.
// Kullanım: node test/ekran.js <çıktı-klasörü> [--masaustu] [--koyu] [--tam] [--hazirla=JS] rota1 rota2 ...
//   rota: "" (ana sayfa), "mikro", "mikro/m04", "mikro/m04/quiz" …
//   --tam: sayfanın tamamı · --hazirla: her sayfadan önce çalışacak JS (localStorage doldurmak vb.)
const path = require("path");
const fs = require("fs");
const http = require("http");
const puppeteer = require(path.join(__dirname, "..", "_npm", "node_modules", "puppeteer-core"));

const args = process.argv.slice(2);
const CIKTI = args.find((a) => !a.startsWith("--")) || path.join(__dirname, "ekran");
const bayrak = (b) => args.includes(b);
const hazirla = (args.find((a) => a.startsWith("--hazirla=")) || "").slice(10);
const bekle = +((args.find((a) => a.startsWith("--bekle=")) || "").slice(8) || 600);
const rotalar = args.filter((a) => !a.startsWith("--")).slice(1);
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const KOK = path.join(__dirname, "..");

const TUR = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2" };
function sunucu() {
  return new Promise((ok) => {
    const s = http.createServer((q, r) => {
      let p = decodeURIComponent(q.url.split("?")[0]);
      if (p.endsWith("/")) p += "index.html";
      const dosya = path.join(KOK, p);
      if (!dosya.startsWith(KOK) || !fs.existsSync(dosya) || fs.statSync(dosya).isDirectory()) { r.writeHead(404); r.end("yok"); return; }
      r.writeHead(200, { "Content-Type": TUR[path.extname(dosya)] || "application/octet-stream", "Cache-Control": "no-store" });
      fs.createReadStream(dosya).pipe(r);
    });
    s.listen(0, "127.0.0.1", () => ok(s));
  });
}

(async () => {
  fs.mkdirSync(CIKTI, { recursive: true });
  const srv = await sunucu();
  const ADRES = `http://127.0.0.1:${srv.address().port}/index.html`;
  const tarayici = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
  const sayfa = await tarayici.newPage();
  const masa = bayrak("--masaustu");
  const gen = masa ? 1366 : 412, yuk = masa ? 900 : 915;
  await sayfa.emulate({
    viewport: { width: gen, height: yuk, deviceScaleFactor: masa ? 1 : 2, isMobile: !masa, hasTouch: !masa },
    userAgent: masa ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36" : "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Mobile Safari/537.36",
  });
  if (bayrak("--koyu")) await sayfa.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  const hatalar = [];
  sayfa.on("console", (m) => { if (["error", "warning"].includes(m.type())) hatalar.push(`[${m.type()}] ${m.text()}`); });
  sayfa.on("pageerror", (e) => hatalar.push(`[pageerror] ${e.message}`));
  await sayfa.goto(ADRES, { waitUntil: "load" });
  await sayfa.evaluate(() => localStorage.clear());
  if (hazirla) await sayfa.evaluate(hazirla);
  for (const r of rotalar.length ? rotalar : [""]) {
    await sayfa.goto(ADRES + "#/" + r, { waitUntil: "load" });
    await sayfa.evaluate(() => document.fonts.ready);
    await new Promise((ok) => setTimeout(ok, bekle));
    const ad = (r || "akropolis").replace(/[\/,]/g, "_") + (masa ? "_m" : "") + (bayrak("--koyu") ? "_k" : "");
    if (bayrak("--tam")) {
      // Uzun sayfayı ekran boyu parçalara böl (tek dev görüntü okunamayacak kadar küçülür)
      const boy = await sayfa.evaluate(() => document.documentElement.scrollHeight);
      const parca = Math.min(12, Math.ceil(boy / yuk));
      for (let i = 0; i < parca; i++) {
        await sayfa.evaluate((y) => window.scrollTo(0, y), i * yuk);
        await new Promise((ok) => setTimeout(ok, 120));
        await sayfa.screenshot({ path: path.join(CIKTI, `${ad}_${i + 1}.png`) });
      }
      await sayfa.evaluate(() => window.scrollTo(0, 0));
    } else await sayfa.screenshot({ path: path.join(CIKTI, ad + ".png") });
    const tasma = await sayfa.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (tasma > 0) hatalar.push(`[taşma] #/${r}: yatay ${tasma}px`);
    console.log("✓", r || "(ana sayfa)");
  }
  await tarayici.close();
  srv.close();
  if (hatalar.length) { console.log("\nHATALAR:"); hatalar.forEach((h) => console.log(h)); process.exitCode = 1; }
  else console.log("\nkonsol temiz");
})();
