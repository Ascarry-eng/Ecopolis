// sw_uret.js — sw.js'teki önbellek listesini ve sürüm özetini dosyalardan üretir. Yayından önce çalıştır:
//   node araclar/sw_uret.js
// Bir dosya değişince özet değişir → yeni service worker kurulur → kullanıcıda eski önbellek temizlenir.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const KOK = path.join(__dirname, "..");
const DAHIL = ["index.html", "manifest.webmanifest", "css", "js", "icerik", "lib", "fonts", "img"];
const HARIC = /lisanslar|\.map$/;
const liste = [];
function gez(g) {
  const tam = path.join(KOK, g);
  if (fs.statSync(tam).isDirectory()) for (const a of fs.readdirSync(tam).sort()) gez(g + "/" + a);
  else if (!HARIC.test(g)) liste.push(g);
}
DAHIL.forEach(gez);
const ozet = crypto.createHash("sha256");
for (const f of liste) ozet.update(f).update(fs.readFileSync(path.join(KOK, f)));
const surum = ozet.digest("hex").slice(0, 12);
const sw = path.join(KOK, "sw.js");
let s = fs.readFileSync(sw, "utf8");
s = s.replace(/const SURUM = "[^"]*";/, `const SURUM = "${surum}";`)
  .replace(/const DOSYALAR = \[[\s\S]*?\];/, "const DOSYALAR = [\n" + ["./"].concat(liste.map((f) => "./" + f)).map((f) => `  ${JSON.stringify(f)},`).join("\n") + "\n];");
fs.writeFileSync(sw, s);
console.log(`sw.js: ${liste.length} dosya, sürüm ${surum}`);
