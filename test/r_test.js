// r_test.js — webR'ın uygulama içinde çalıştığını sınar: R konsolunda kod çalıştırır, çıktı/grafik/hata/paket
// kurulumunu denetler. İnternet gerekir (webR CDN'den iner). Kullanım: node test/r_test.js [çıktı-klasörü] [--paket]
const path = require("path");
const fs = require("fs");
const http = require("http");
const puppeteer = require(path.join(__dirname, "..", "_npm", "node_modules", "puppeteer-core"));
const KOK = path.join(__dirname, "..");
const CIKTI = process.argv.find((a, i) => i > 1 && !a.startsWith("--")) || path.join(__dirname, "r_cikti");
const PAKET = process.argv.includes("--paket");
const TUR = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json" };

(async () => {
  fs.mkdirSync(CIKTI, { recursive: true });
  const srv = http.createServer((q, r) => {
    let p = decodeURIComponent(q.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
    const d = path.join(KOK, p);
    if (!d.startsWith(KOK) || !fs.existsSync(d) || fs.statSync(d).isDirectory()) { r.writeHead(404); r.end(); return; }
    r.writeHead(200, { "Content-Type": TUR[path.extname(d)] || "application/octet-stream" }); fs.createReadStream(d).pipe(r);
  }).listen(0, "127.0.0.1");
  await new Promise((ok) => srv.on("listening", ok));
  const ADRES = `http://127.0.0.1:${srv.address().port}/index.html`;
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
  const s = await b.newPage();
  await s.setViewport({ width: 900, height: 1000 });
  const kayit = [];
  s.on("console", (m) => kayit.push(`[${m.type()}] ${m.text()}`));
  s.on("pageerror", (e) => kayit.push(`[pageerror] ${e.message}`));
  await s.goto(ADRES + "#/rkonsol", { waitUntil: "load" });
  const sonuc = {};
  const t0 = Date.now();
  async function calistir(kod, bekle = 180000) {
    return s.evaluate(async (k, bk) => {
      const r = await Promise.race([ECO.R.calistir(k), new Promise((_, h) => setTimeout(() => h(new Error("zaman aşımı")), bk))]);
      return { cikti: r.cikti.map((c) => c.tur + ": " + c.metin).join(""), resim: r.resimler.length, hata: r.hata };
    }, kod, bekle);
  }
  try {
    sonuc.ilk = await calistir("x <- c(2, 4, 6, 8)\nmean(x)\nsd(x)");
    sonuc.ilkSure = ((Date.now() - t0) / 1000).toFixed(1) + " sn";
    sonuc.ortak = await calistir("x * 10");   // oturum ortak mı?
    sonuc.grafik = await calistir("plot(LifeCycleSavings$dpi, LifeCycleSavings$sr, main = 'deneme')");
    sonuc.hata = await calistir("log(-1)\nstop('kasıtlı hata')");
    sonuc.uyari = await calistir("as.numeric('abc')");
    sonuc.mesaj = await calistir("message('merhaba')");
    sonuc.lm = await calistir("m <- lm(sr ~ dpi, data = LifeCycleSavings)\nround(coef(m), 4)");
    sonuc.mantiksal = await s.evaluate(() => ECO.R.mantiksal("identical(x, c(2, 4, 6, 8))"));
    sonuc.plotAbline = await calistir("plot(1:10)\nabline(h = 5, col = 'red')\nlines(1:10, (1:10)/2)");
    sonuc.sozdizimi = await calistir("x <- c(1, 2\ny <- 3");
    sonuc.bulunamadi = await calistir("1 + 1\nmean(olmayan_nesne)");
    sonuc.gizliDegisken = await calistir("ls()");
    if (PAKET) { const t1 = Date.now(); sonuc.dplyr = await calistir("library(dplyr)\nmtcars |> group_by(cyl) |> summarise(ort = mean(mpg))", 400000); sonuc.dplyrSure = ((Date.now() - t1) / 1000).toFixed(1) + " sn"; }
  } catch (e) { sonuc.istisna = e.message; }
  console.log(JSON.stringify(sonuc, null, 2));
  // Konsol arayüzü üzerinden de bir çalıştırma + ekran görüntüsü
  try {
    await s.evaluate(() => { const t = document.querySelector("textarea.r-duzen"); t.value = "summary(mtcars$mpg)\nhist(mtcars$mpg, col = 'steelblue')"; });
    await s.click(".r-calistir");
    await s.waitForFunction(() => document.querySelector(".r-cikti canvas"), { timeout: 60000 });
    await s.screenshot({ path: path.join(CIKTI, "rkonsol.png"), fullPage: true });
    console.log("konsol ekran görüntüsü alındı");
  } catch (e) { console.log("konsol arayüzü sınaması başarısız:", e.message); }
  const hatalar = kayit.filter((k) => /pageerror|\[error\]/.test(k) && !/404|manifest/i.test(k));
  if (hatalar.length) { console.log("\nKONSOL HATALARI:"); hatalar.forEach((h) => console.log(h)); }
  await b.close(); srv.close();
})();
