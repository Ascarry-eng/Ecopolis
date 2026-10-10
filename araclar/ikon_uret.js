// ikon_uret.js — img/ikon.svg'den PNG simgeleri üretir (Chrome ile). Kullanım: node araclar/ikon_uret.js
const path = require("path"), fs = require("fs");
const puppeteer = require(path.join(__dirname, "..", "_npm", "node_modules", "puppeteer-core"));
const KOK = path.join(__dirname, "..");
const svg = fs.readFileSync(path.join(KOK, "img", "ikon.svg"), "utf8");
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
  const s = await b.newPage();
  const uret = async (boyut, ad, maskable) => {
    await s.setViewport({ width: boyut, height: boyut, deviceScaleFactor: 1 });
    // maskable: güvenli alan için köşesiz ve %80 içerik
    const ic = maskable
      ? svg.replace('rx="112"', 'rx="0"').replace("<g ", '<g transform="translate(51 51) scale(0.8)" ').replace('<path d="M146', '<path transform="translate(51 51) scale(0.8)" d="M146')
      : svg;
    await s.setContent(`<html><body style="margin:0;background:transparent">${ic.replace("<svg ", `<svg width="${boyut}" height="${boyut}" `)}</body></html>`);
    await s.screenshot({ path: path.join(KOK, "img", ad), omitBackground: true });
  };
  await uret(180, "ikon-180.png");
  await uret(192, "ikon-192.png");
  await uret(512, "ikon-512.png");
  await uret(512, "ikon-maskable-512.png", true);
  await b.close();
  console.log("simgeler üretildi");
})();
