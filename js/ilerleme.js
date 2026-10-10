// ilerleme.js — okunan bölümler, quiz sonuçları, yanlış defteri, günlük etkinlik (seri), drahmi,
// dışa/içe aktarma (telefon ↔ bilgisayar). Hepsi bu cihazın localStorage'ında.
(function () {
  "use strict";
  const { depo, bugun, gunFarki, gunEkle } = ECO;

  const al = () => depo.al("ilerleme", { b: {}, gun: {}, drahmi: 0 });
  const koy = (v) => depo.koy("ilerleme", v);

  function bolum(id) {
    const v = al();
    return v.b[id] || { okunan: [], toplam: 0, tamam: false, quiz: null };
  }
  function bolumGuncelle(id, f) {
    const v = al();
    const b = v.b[id] || { okunan: [], toplam: 0, tamam: false, quiz: null };
    f(b, v);
    b.son = bugun();
    v.b[id] = b;
    koy(v);
    ECO.ilerleme.dinleyiciler.forEach((d) => d(id));
    return b;
  }

  function etkinlik(tur, n = 1) {
    const v = al();
    const g = bugun();
    const k = v.gun[g] || { dk: 0, soru: 0, dogru: 0, kart: 0, okuma: 0, drahmi: 0 };
    k[tur] = (k[tur] || 0) + n;
    v.gun[g] = k;
    // 120 günden eskiyi buda
    for (const t of Object.keys(v.gun)) if (gunFarki(t, g) > 120) delete v.gun[t];
    koy(v);
  }

  function drahmi(n) {
    const v = al();
    v.drahmi = (v.drahmi || 0) + n;
    const g = bugun();
    const k = v.gun[g] || { dk: 0, soru: 0, dogru: 0, kart: 0, okuma: 0, drahmi: 0 };
    k.drahmi = (k.drahmi || 0) + n;
    v.gun[g] = k;
    koy(v);
    const s = document.getElementById("drahmi-sayi");
    if (s) s.textContent = v.drahmi;
  }

  const P = {
    dinleyiciler: [],
    bolum,
    okundu(id, i, toplam) {
      let yeni = false;
      bolumGuncelle(id, (b) => { b.toplam = toplam; if (!b.okunan.includes(i)) { b.okunan.push(i); yeni = true; } });
      if (yeni) { etkinlik("okuma"); drahmi(1); }
      return yeni;
    },
    tamamla(id, evet = true) {
      const once = bolum(id).tamam;
      bolumGuncelle(id, (b) => { b.tamam = evet; if (evet && b.toplam) b.okunan = Array.from({ length: b.toplam }, (_, i) => i); });
      if (evet && !once) drahmi(10);
    },
    quizKaydet(id, dogru, toplam, yanlislar = [], dogrular = []) {
      const oran = toplam ? dogru / toplam : 0;
      if (id) bolumGuncelle(id, (b) => {
        const q = b.quiz || { en: 0, son: 0, deneme: 0 };
        q.son = oran; q.en = Math.max(q.en, oran); q.deneme++;
        b.quiz = q;
      });
      const y = depo.al("yanlislar", {});
      for (const k of yanlislar) y[k] = { kez: ((y[k] && y[k].kez) || 0) + 1, son: bugun() };
      for (const k of dogrular) if (y[k]) { y[k].dogru = (y[k].dogru || 0) + 1; if (y[k].dogru >= 2) delete y[k]; }
      depo.koy("yanlislar", y);
    },
    soruCevap(dogru) { etkinlik("soru"); if (dogru) { etkinlik("dogru"); drahmi(2); } },
    kartGozden() { etkinlik("kart"); drahmi(1); },
    dakika(n) { etkinlik("dk", n); drahmi(Math.round(n / 5)); },
    yanlislar() { return depo.al("yanlislar", {}); },

    // 0..1 ilerleme (tambur doluluğu) ve rozet
    durum(id) {
      const b = bolum(id);
      const okuma = b.tamam ? 1 : b.toplam ? b.okunan.length / b.toplam : 0;
      const q = b.quiz ? b.quiz.en : 0;
      return { okuma, quiz: b.quiz, tamam: b.tamam, defne: b.tamam && q >= 0.8, baslandi: okuma > 0 || !!b.quiz };
    },
    dersOzet(dersId) {
      const liste = ECO.tumBolumler(dersId);
      let tamam = 0, defne = 0;
      for (const bl of liste) { const d = P.durum(bl.id); if (d.tamam) tamam++; if (d.defne) defne++; }
      return { tamam, defne, toplam: liste.length };
    },
    // En son dokunulan, bitmemiş bölüm
    devam() {
      const v = al();
      let en = null;
      for (const [id, b] of Object.entries(v.b)) if (!b.tamam && b.son && ECO.dersBul(id) && (!en || b.son >= en.son)) en = { id, son: b.son };
      if (en) return en.id;
      // hiçbiri yoksa: mikronun ilk bitmemiş bölümü
      const ilk = ECO.tumBolumler("mikro").find((bl) => !P.durum(bl.id).tamam);
      return ilk ? ilk.id : null;
    },
    seri() {
      const v = al();
      let n = 0, g = bugun();
      const aktif = (t) => { const k = v.gun[t]; return k && (k.okuma || k.soru || k.kart || k.dk); };
      if (!aktif(g)) g = gunEkle(g, -1);   // bugün henüz çalışmadıysa seri dünden sayılır
      while (aktif(g)) { n++; g = gunEkle(g, -1); }
      return { gun: n, bugunVar: !!aktif(bugun()) };
    },
    bugunku() { return al().gun[bugun()] || { dk: 0, soru: 0, dogru: 0, kart: 0, okuma: 0, drahmi: 0 }; },
    sonGunler(n = 14) {
      const v = al(), out = [];
      for (let i = n - 1; i >= 0; i--) { const g = gunEkle(bugun(), -i); out.push([g, v.gun[g] || null]); }
      return out;
    },
    drahmiToplam() { return al().drahmi || 0; },

    // ---- yedekleme
    disaAktar() {
      const veri = depo.hepsi();
      delete veri.anahtar;   // DeepSeek anahtarı yedeğe girmez
      return JSON.stringify({ uygulama: "ecopolis", surum: 1, tarih: new Date().toISOString(), veri }, null, 1);
    },
    iceAktar(metin) {
      const o = JSON.parse(metin);
      if (!o || o.uygulama !== "ecopolis" || !o.veri) throw new Error("Bu bir Ecopolis yedeği değil");
      for (const [k, v] of Object.entries(o.veri)) if (k !== "anahtar") depo.koy(k, v);
      return Object.keys(o.veri).length;
    },
  };
  ECO.ilerleme = P;
})();
