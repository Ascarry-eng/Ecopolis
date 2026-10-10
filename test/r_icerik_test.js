// r_icerik_test.js — R derslerinin içeriğini gerçek webR'da sınar:
//  (1) her alıştırmada ÇÖZÜM denetimden geçmeli, BAŞLANGIÇ kodu geçmemeli (denetim gerçekten yakalıyor mu?)
//  (2) derslerdeki bütün çalıştırılabilir ```r blokları sırayla hatasız çalışmalı (bilerek hatalı olanlar hariç)
// İnternet gerekir (webR + paketler). Kullanım: node test/r_icerik_test.js [r04,r05,…]
const path = require("path"), fs = require("fs"), http = require("http"), vm = require("vm");
const puppeteer = require(path.join(__dirname, "..", "_npm", "node_modules", "puppeteer-core"));
const KOK = path.join(__dirname, "..");
const SECIM = (process.argv[2] || "").split(",").filter(Boolean);

// Bilerek hata veren bloklar (öğretim amaçlı)
const BEKLENEN_HATA = [/gelir <- Fiyat \* miktar/];

// İçerikleri Node'da yükle (blok kodlarını ve alıştırmaları çıkarmak için)
const ECO = { icerik: {}, betikYukle: () => Promise.resolve() };
const ctx = vm.createContext({ ECO, window: {}, console });
vm.runInContext(fs.readFileSync(path.join(KOK, "icerik", "dizin.js"), "utf8"), ctx);
const dersler = ECO.tumBolumler("r").map((b) => b.id).filter((id) => !SECIM.length || SECIM.includes(id));
for (const id of dersler) vm.runInContext(fs.readFileSync(path.join(KOK, "icerik", "r", id + ".js"), "utf8"), ctx);

function bloklar(md) {
  const out = [];
  const re = /^(`{3,})(\S*)([^\n]*)\n([\s\S]*?)^\1[ \t]*$/gm;
  let m;
  while ((m = re.exec(md))) { const dil = m[2].toLowerCase(), ayar = m[3]; if (dil === "r" && !/\bsalt\b/.test(ayar)) out.push(m[4]); }
  return out;
}

(async () => {
  const TUR = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
  const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split("?")[0]); if (p.endsWith("/")) p += "index.html"; const d = path.join(KOK, p); if (!d.startsWith(KOK) || !fs.existsSync(d) || fs.statSync(d).isDirectory()) { r.writeHead(404); r.end(); return; } r.writeHead(200, { "Content-Type": TUR[path.extname(d)] || "application/octet-stream" }); fs.createReadStream(d).pipe(r); }).listen(0, "127.0.0.1");
  await new Promise((ok) => srv.on("listening", ok));
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
  const s = await b.newPage();
  s.setDefaultTimeout(600000);
  await s.goto(`http://127.0.0.1:${srv.address().port}/index.html#/rkonsol`, { waitUntil: "load" });
  await s.evaluate(() => ECO.R.hazirla());
  const calistir = (kod) => s.evaluate(async (k) => { const r = await ECO.R.calistir(k); return { hata: r.hata, metin: r.cikti.filter((c) => c.tur === "hata").map((c) => c.metin).join(" ").slice(0, 300) }; }, kod);
  const mantiksal = (ifade) => s.evaluate((i) => ECO.R.mantiksal(i), ifade);
  const temizle = () => calistir("rm(list = ls()); graphics.off(); invisible(file.remove(setdiff(list.files(), c())))");
  const sorunlar = [];
  let blokSay = 0, alistirmaSay = 0;
  for (const id of dersler) {
    const ic = ECO.icerik[id];
    if (ic.dosyalar) await s.evaluate((d) => ECO.R.dosyaEkle(d), ic.dosyalar);
    // (2) bloklar, ders sırasıyla
    await calistir("rm(list = ls())");
    if (ic.dosyalar) await s.evaluate((d) => ECO.R.dosyaEkle(d), ic.dosyalar);
    for (const [i, k] of ic.bolumler.entries()) {
      for (const kod of bloklar(k.md)) {
        blokSay++;
        const r = await calistir(kod);
        const beklenen = BEKLENEN_HATA.some((re) => re.test(kod));
        if (r.hata && !beklenen) sorunlar.push(`${id} kesim ${i + 1} blok hatası: ${r.metin}\n      kod: ${kod.split("\n")[0].slice(0, 80)}`);
        if (!r.hata && beklenen) sorunlar.push(`${id} kesim ${i + 1}: hata vermesi beklenen blok hatasız çalıştı`);
      }
    }
    // (1) alıştırmalar: her biri temiz ortamda
    for (const [i, a] of (ic.alistirmalar || []).entries()) {
      alistirmaSay++;
      await calistir("rm(list = ls()); suppressWarnings(file.remove(c('calisanlar.csv', 'fiyat.csv')))");
      if (ic.dosyalar) await s.evaluate((d) => ECO.R.dosyaEkle(d), ic.dosyalar);
      const rc = await calistir(a.cozum);
      const okC = !rc.hata && (await mantiksal(a.kontrol));
      if (!okC) sorunlar.push(`${id} alıştırma ${i + 1}: ÇÖZÜM denetimden geçmedi${rc.hata ? " (hata: " + rc.metin + ")" : ""}`);
      await calistir("rm(list = ls()); suppressWarnings(file.remove(c('calisanlar.csv', 'fiyat.csv')))");
      if (ic.dosyalar) await s.evaluate((d) => ECO.R.dosyaEkle(d), ic.dosyalar);
      await calistir(a.baslangic || "");
      const okB = await mantiksal(a.kontrol);
      if (okB) sorunlar.push(`${id} alıştırma ${i + 1}: BAŞLANGIÇ kodu da denetimden geçti — denetim hiçbir şeyi yakalamıyor`);
    }
    process.stdout.write(`✓ ${id} `);
  }
  console.log(`\n\n${dersler.length} ders · ${blokSay} R bloğu · ${alistirmaSay} alıştırma`);
  if (sorunlar.length) { console.log(`\nSORUNLAR (${sorunlar.length}):`); sorunlar.forEach((x) => console.log("  ✗ " + x)); process.exitCode = 1; }
  else console.log("bütün bloklar çalıştı, bütün alıştırma denetimleri iki yönde doğru");
  void temizle;
  await b.close(); srv.close();
})();
