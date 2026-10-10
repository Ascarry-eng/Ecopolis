// icerik_test.js — bütün ders içeriklerini denetler: zorunlu alanlar, quiz cevap indeksleri, KaTeX derlemesi
// (throwOnError), {{görsel}} adlarının kayıtlı olması, ::: yönergelerinin kapanması, dizindeki her bölümün dosyası.
// Kullanım: node test/icerik_test.js [--sessiz]
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const katex = require(path.join(__dirname, "..", "_npm", "node_modules", "katex"));

const KOK = path.join(__dirname, "..");
const hatalar = [], uyarilar = [];
const hata = (m) => hatalar.push(m), uyari = (m) => uyarilar.push(m);

// Dizin
const ECO = { icerik: {}, betikYukle: () => Promise.resolve() };
const ctx = vm.createContext({ ECO, window: {}, console });
vm.runInContext(fs.readFileSync(path.join(KOK, "icerik", "dizin.js"), "utf8"), ctx);
const yukleyici = ECO.icerikEkle;   // dizin.js'teki normalleştiren yükleyici
ECO.icerikEkle = (o) => { if (ECO.icerik[o.id]) hata(`${o.id}: iki kez tanımlanmış`); yukleyici(o); };

// Kayıtlı görsel adları (kaynak koddan)
const gorselAdlari = new Set();
for (const f of fs.readdirSync(path.join(KOK, "js")).filter((f) => f.startsWith("gorsel_"))) {
  const s = fs.readFileSync(path.join(KOK, "js", f), "utf8");
  for (const m of s.matchAll(/G\["([\w-]+)"\]\s*=/g)) gorselAdlari.add(m[1]);
}

// Kod çitleri: uygulamadaki (cekirdek.js) kuralın aynısı — aynı uzunlukta çitle kapanır
const CIT = /^(`{3,})[^\n]*\n[\s\S]*?^\1`*[ \t]*$/gm;

function formulleriDenetle(id, yer, md) {
  if (!md) return;
  let t = String(md).replace(CIT, "").replace(/`[^`\n]+`/g, "");
  const parca = [];
  t = t.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => { parca.push([m, true]); return " "; });
  t.replace(/(^|[^\\$])\$(?!\s)((?:[^$\n\\]|\\.)+?)(?<!\s)\$(?!\d)/g, (_, on, m) => { parca.push([m, false]); return ""; });
  for (const [m, blok] of parca) {
    try { katex.renderToString(m, { displayMode: blok, throwOnError: true, strict: "ignore" }); }
    catch (e) { hata(`${id} ${yer}: KaTeX hatası "${m.slice(0, 60)}" → ${e.message.split("\n")[0]}`); }
  }
  // Kod dışı satırlarda: (a) tek kalmış $ (kapanmamış formül), (b) R'ın $ operatörü (veri$sutun) — ikisi de
  // formül sınırlayıcısıyla karışır. Satır içi kod (`…`) ve kaçışlı \$ yok sayılır.
  for (const satir of String(md).replace(CIT, "").replace(/\$\$[\s\S]+?\$\$/g, "").split("\n")) {
    const kodsuz = satir.replace(/`[^`]*`/g, "").replace(/\\\$/g, "");
    const n = (kodsuz.match(/\$/g) || []).length;
    if (n % 2) uyari(`${id} ${yer}: satırda tek sayıda $ var → "${satir.trim().slice(0, 70)}"`);
    if (/[A-Za-z0-9_)\]]\$[A-Za-z_]/.test(kodsuz)) hata(`${id} ${yer}: R'ın $ operatörü kod dışında (backtick içine al) → "${satir.trim().slice(0, 70)}"`);
  }
}

function mdDenetle(id, yer, md) {
  formulleriDenetle(id, yer, md);
  const satirlar = String(md).split("\n");
  let acik = null;
  satirlar.forEach((s, i) => {
    const m = s.match(/^:::(\w*)/);
    if (!m) return;
    if (m[1]) { if (acik) hata(`${id} ${yer}: :::${acik.tur} kapanmadan :::${m[1]} açılmış (satır ${i + 1})`); acik = { tur: m[1], satir: i + 1 }; if (!["tanim", "ipucu", "dikkat", "gercek", "ornek", "not"].includes(m[1])) hata(`${id} ${yer}: bilinmeyen yönerge :::${m[1]}`); }
    else { if (!acik) hata(`${id} ${yer}: açılmamış ::: kapanışı (satır ${i + 1})`); acik = null; }
  });
  if (acik) hata(`${id} ${yer}: :::${acik.tur} kapanmamış (satır ${acik.satir})`);
  for (const m of String(md).matchAll(/^\{\{([\w-]+)(?:\|(.*))?\}\}\s*$/gm)) {
    if (!gorselAdlari.has(m[1])) hata(`${id} ${yer}: görsel yok: {{${m[1]}}}`);
    if (m[2]) { try { JSON.parse(m[2]); } catch (e) { hata(`${id} ${yer}: {{${m[1]}}} ayarı geçersiz JSON: ${m[2]}`); } }
  }
  if (/\{\{[^}]*\}\}/.test(String(md).replace(/^\{\{.*\}\}\s*$/gm, ""))) uyari(`${id} ${yer}: satır içinde {{…}} var (görsel kendi satırında olmalı)`);
}

let bolumSay = 0, soruSay = 0, terimSay = 0, alistirmaSay = 0, gorselKullanim = new Set();
for (const ders of Object.values(ECO.dersler)) {
  for (const g of ders.gruplar) for (const b of g.bolumler) {
    const dosya = path.join(KOK, "icerik", ders.id, b.id + ".js");
    if (!fs.existsSync(dosya)) { uyari(`${b.id}: içerik dosyası yok (${ders.id}/${b.id}.js)`); continue; }
    try { vm.runInContext(fs.readFileSync(dosya, "utf8"), ctx, { filename: dosya }); }
    catch (e) { hata(`${b.id}: dosya çalışmadı → ${e.message}`); continue; }
    const ic = ECO.icerik[b.id];
    if (!ic) { hata(`${b.id}: ECO.icerikEkle çağrılmamış ya da id yanlış`); continue; }
    bolumSay++;
    for (const alan of ["hedefler", "bolumler", "ozet", "terimler", "quiz"]) if (!Array.isArray(ic[alan]) || !ic[alan].length) hata(`${b.id}: "${alan}" eksik ya da boş`);
    (ic.bolumler || []).forEach((k, i) => {
      if (!k.baslik || !k.md) hata(`${b.id}: ${i + 1}. kesimde baslik/md eksik`);
      mdDenetle(b.id, `kesim ${i + 1} (${k.baslik})`, k.md);
      for (const m of String(k.md).matchAll(/^\{\{([\w-]+)/gm)) gorselKullanim.add(m[1]);
    });
    (ic.quiz || []).forEach((q, i) => {
      soruSay++;
      if (!q.s || !Array.isArray(q.c) || q.c.length < 2) hata(`${b.id}: quiz ${i + 1} biçimi bozuk`);
      if (!Number.isInteger(q.d) || q.d < 0 || q.d >= (q.c || []).length) hata(`${b.id}: quiz ${i + 1} doğru indeks geçersiz (${q.d})`);
      if (!q.a) uyari(`${b.id}: quiz ${i + 1} açıklamasız`);
      if (new Set(q.c).size !== q.c.length) hata(`${b.id}: quiz ${i + 1} aynı seçenek iki kez`);
      formulleriDenetle(b.id, `quiz ${i + 1}`, q.s); (q.c || []).forEach((c) => formulleriDenetle(b.id, `quiz ${i + 1} seçenek`, c)); formulleriDenetle(b.id, `quiz ${i + 1} açıklama`, q.a);
    });
    (ic.terimler || []).forEach((t, i) => { terimSay++; if (!Array.isArray(t) || t.length < 2 || !t[0] || !t[1]) hata(`${b.id}: terim ${i + 1} bozuk`); });
    (ic.ozet || []).forEach((o) => formulleriDenetle(b.id, "özet", o));
    (ic.alistirmalar || []).forEach((a, i) => {
      alistirmaSay++;
      if (!a.soru || a.kontrol == null || a.cozum == null) hata(`${b.id}: alıştırma ${i + 1} eksik (soru/kontrol/cozum)`);
      mdDenetle(b.id, `alıştırma ${i + 1}`, a.soru);
    });
  }
}
const kullanilmayan = [...gorselAdlari].filter((g) => !gorselKullanim.has(g));
if (kullanilmayan.length) uyari(`hiçbir bölümde kullanılmayan görseller: ${kullanilmayan.join(", ")}`);

console.log(`${bolumSay} bölüm · ${soruSay} soru · ${terimSay} terim · ${alistirmaSay} alıştırma · ${gorselAdlari.size} görsel (${gorselKullanim.size} kullanılıyor)`);
if (!process.argv.includes("--sessiz") && uyarilar.length) { console.log(`\nUYARILAR (${uyarilar.length}):`); uyarilar.forEach((u) => console.log("  · " + u)); }
if (hatalar.length) { console.log(`\nHATALAR (${hatalar.length}):`); hatalar.forEach((h) => console.log("  ✗ " + h)); process.exitCode = 1; }
else console.log("\nhata yok");
