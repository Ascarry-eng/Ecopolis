// kutuphane_kopyala.js — _npm/node_modules'tan uygulamanın ihtiyaç duyduğu dosyaları kopyalar:
// yazı tipleri (yalnız latin, latin-ext, greek alt kümeleri) + css/fontlar.css, KaTeX, marked.
// Kullanım: cd _npm && npm install && cd .. && node kutuphane_kopyala.js
const fs = require("fs");
const path = require("path");

const KOK = __dirname;
const NM = path.join(KOK, "_npm", "node_modules");
const FONT_HEDEF = path.join(KOK, "fonts");
const ALT_KUMELER = ["latin", "latin-ext", "greek"];

const AILELER = [
  { paket: "cinzel", agirliklar: ["500", "700"] },
  { paket: "alegreya", agirliklar: ["400", "400-italic", "500", "700", "700-italic"] },
  { paket: "alegreya-sans", agirliklar: ["400", "400-italic", "500", "700"] },
  { paket: "jetbrains-mono", agirliklar: ["400", "600"] },
];

fs.mkdirSync(FONT_HEDEF, { recursive: true });
let css = "/* fontlar.css — kutuphane_kopyala.js üretir, elle düzenleme. Kaynak: @fontsource (SIL OFL 1.1) */\n";
let sayac = 0;
for (const { paket, agirliklar } of AILELER) {
  const dizin = path.join(NM, "@fontsource", paket);
  for (const a of agirliklar) {
    const kaynak = fs.readFileSync(path.join(dizin, a + ".css"), "utf8");
    for (const blok of kaynak.split("@font-face").slice(1)) {
      const ad = (blok.match(/files\/([^)]+?\.woff2)/) || [])[1];
      if (!ad) continue;
      const alt = ad.slice(paket.length + 1).replace(/-\d+-(normal|italic)\.woff2$/, "");
      if (!ALT_KUMELER.includes(alt)) continue;
      fs.copyFileSync(path.join(dizin, "files", ad), path.join(FONT_HEDEF, ad));
      sayac++;
      const govde = blok.replace(/src:[^;]+;/, `src: url(../fonts/${ad}) format('woff2');`);
      css += "@font-face" + govde.replace(/\n\n\/\*[\s\S]*$/, "\n").trimEnd() + "\n";
    }
  }
}
fs.writeFileSync(path.join(KOK, "css", "fontlar.css"), css);
console.log(`${sayac} yazı tipi dosyası kopyalandı, css/fontlar.css yazıldı`);

// KaTeX + marked
const LIB = path.join(KOK, "lib");
fs.mkdirSync(path.join(LIB, "katex", "fonts"), { recursive: true });
const kdist = path.join(NM, "katex", "dist");
fs.copyFileSync(path.join(kdist, "katex.min.js"), path.join(LIB, "katex", "katex.min.js"));
fs.copyFileSync(path.join(kdist, "katex.min.css"), path.join(LIB, "katex", "katex.min.css"));
for (const f of fs.readdirSync(path.join(kdist, "fonts"))) if (f.endsWith(".woff2")) fs.copyFileSync(path.join(kdist, "fonts", f), path.join(LIB, "katex", "fonts", f));
fs.copyFileSync(path.join(NM, "marked", "lib", "marked.umd.js"), path.join(LIB, "marked.js"));

// Lisans metinleri
const LIS = path.join(LIB, "lisanslar");
fs.mkdirSync(LIS, { recursive: true });
const lisans = (paketYolu, hedef) => {
  for (const ad of ["LICENSE", "LICENSE.md", "LICENSE.txt", "OFL.txt"]) {
    const p = path.join(NM, paketYolu, ad);
    if (fs.existsSync(p)) { fs.copyFileSync(p, path.join(LIS, hedef)); return; }
  }
  console.warn("lisans bulunamadı:", paketYolu);
};
lisans("katex", "katex.txt");
lisans("marked", "marked.txt");
for (const { paket } of AILELER) lisans(path.join("@fontsource", paket), paket + ".txt");
console.log("KaTeX, marked ve lisanslar kopyalandı");
