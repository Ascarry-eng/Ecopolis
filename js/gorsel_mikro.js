// gorsel_mikro.js — mikroekonomi görselleri I (Colander 1–8. bölümler): marjinal karar, ÜOE, karşılaştırmalı
// üstünlük, talep/arz kaymaları, denge, kayma analizi, refah (tavan/taban/vergi/kota), vergi yükü, esneklik, dışsallık.
// Doğrusal eğriler: talep P = a − bQ, arz P = c + dQ.
(function () {
  "use strict";
  const { el, sayi, formul, Grafik } = ECO;
  const { cerceve, kaydirici, secici, okuma, tus } = ECO.Gorsel;
  const G = ECO.gorseller;

  // ---------------------------------------------------------------- yardımcılar
  const Y = {
    talep: (a, b) => (q) => a - b * q,
    arz: (c, d) => (q) => c + d * q,
    kes(a, b, c, d) { const q = (a - c) / (b + d); return { q, p: a - b * q }; },
    // talep miktarı (P verildiğinde): Q = (a − P)/b ; arz miktarı: Q = (P − c)/d
    qd: (a, b, p) => Math.max(0, (a - p) / b),
    qs: (c, d, p) => Math.max(0, (p - c) / d),
    tl: (v, o = 1) => sayi(v, o),
    tx: (s) => formul(s, false),
    // Monoton kübik ara değerleme (Fritsch–Carlson): tablo noktalarından pürüzsüz ve sıçramasız eğri
    monoton(xs, ys) {
      const n = xs.length, h = [], m = [], t = new Array(n);
      for (let i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; m[i] = (ys[i + 1] - ys[i]) / h[i]; }
      t[0] = m[0]; t[n - 1] = m[n - 2];
      for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (3 * (h[i - 1] + h[i])) / ((2 * h[i] + h[i - 1]) / m[i - 1] + (h[i] + 2 * h[i - 1]) / m[i]);
      return (x) => {
        if (x <= xs[0]) return ys[0];
        if (x >= xs[n - 1]) return ys[n - 1];
        let i = 0; while (x > xs[i + 1]) i++;
        const s = (x - xs[i]) / h[i], s2 = s * s, s3 = s2 * s;
        return (2 * s3 - 3 * s2 + 1) * ys[i] + (s3 - 2 * s2 + s) * h[i] * t[i] + (-2 * s3 + 3 * s2) * ys[i + 1] + (s3 - s2) * h[i] * t[i + 1];
      };
    },
    notYaz(notKap, metin, tur) { notKap.className = "sekil-not" + (tur ? " " + tur : ""); notKap.innerHTML = metin; },
  };
  ECO.mikroYard = Y;

  // ================================================================ 1. bölüm — marjinal karar kuralı
  G["marjinal-karar"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: ayar.baslik || "Bir saat daha çalışmalı mıyım? MB ile MC'yi karşılaştır" });
    const g = Grafik(sahne, { x: [0, 10], y: [0, 22], xEtiket: "Sınava çalışılan saat", yEtiket: "Fayda / maliyet (puan)", xAdim: 1 });
    const MB = (h) => 20 - 2 * h, MC = (h) => 2 + h;
    const ok = okuma(okumaKap);
    const s = kaydirici(kontrol, { etiket: "Kaçıncı saat?", min: 1, max: 10, adim: 1, deger: 2, bicim: (v) => `${v}. saat`, degisti: ciz });
    function ciz() {
      g.temizle();
      const h = s.deger;
      g.alan(MB, MC, 0, Math.min(h, 6), { sinif: "a-vergi", etiket: h >= 2 ? "net fayda" : "", etiketOran: 0.55 });
      if (h > 6) g.alan(MC, MB, 6, h, { sinif: "a-zarar", etiket: "kayıp" });
      g.egri(MB, { sinif: "r-1", etiket: "MB (marjinal fayda)", etiketX: 2.4, etiketDy: -12 });
      g.egri(MC, { sinif: "r-2", etiket: "MC (marjinal maliyet)", etiketX: 6.6, etiketDy: 22 });
      g.cizgi(h, 0, h, 22, { sinif: "r-5", kesik: true });
      g.nokta(h, MB(h), { sinif: "mavi" }); g.nokta(h, MC(h), { sinif: "kirmizi" });
      g.nokta(6, 8, { etiket: "MB = MC", dx: 10, dy: -10 });
      const mb = MB(h), mc = MC(h);
      ok.yaz([["Bu saatin marjinal faydası", Y.tl(mb), "mavi"], ["Bu saatin marjinal maliyeti", Y.tl(mc), "kirmizi"], ["Karar", mb > mc ? "Çalış (MB > MC)" : mb === mc ? "Fark etmez (MB = MC)" : "Dur (MC > MB)", mb >= mc ? "yesil" : "kirmizi"]]);
      Y.notYaz(not, mb > mc ? `${h}. saat sana ${Y.tl(mb - mc)} puan net fayda getiriyor: <b>yap</b>. Kural: MB &gt; MC olduğu sürece devam et.`
        : mb === mc ? `${h}. saatte MB ile MC eşit: tam sınırdasın. İktisatçı burada durur; toplam net fayda en büyük.`
          : `${h}. saat ${Y.tl(mc - mb)} puan kaybettiriyor: uykudan, arkadaşlarından ya da başka dersten vazgeçtiğin şey kazandığından değerli. <b>Yapma.</b>`, mb >= mc ? "iyi" : "uyari");
    }
    ciz();
  };

  // ================================================================ 2. bölüm — üretim olanakları eğrisi
  G["uoe"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Üretim olanakları eğrisi: noktayı sürükle" });
    // Colander'ın "silah ve tereyağı" tablosu (A–F)
    const tablo = [["A", 0, 15], ["B", 4, 14], ["C", 7, 12], ["D", 9, 9], ["E", 11, 5], ["F", 12, 0]];
    const xs = tablo.map((r) => r[1]), ys = tablo.map((r) => r[2]);
    const g = Grafik(sahne, { x: [0, 16], y: [0, 20], xEtiket: "Silah (adet)", yEtiket: "Tereyağı (ton)", xAdim: 2, yAdim: 5 });
    let kayma = 0, tarafli = false;
    let px = 5, py = 9;
    const temel = Y.monoton(xs, ys);
    const egri = (x) => {
      // teknoloji: tarafsız → iki eksende de genişle; taraflı → yalnız silah ekseni
      const ox = 1 + kayma / 100, oy = tarafli ? 1 : 1 + kayma / 100;
      return x > 12 * ox ? NaN : temel(x / ox) * oy;
    };
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Büyüme", secenekler: [["tarafsiz", "Tarafsız teknoloji"], ["tarafli", "Yalnız silah teknolojisi"]], deger: "tarafsiz", degisti: (v) => { tarafli = v === "tarafli"; ciz(); } });
    kaydirici(kontrol, { etiket: "Teknoloji / kaynak artışı", min: 0, max: 30, adim: 5, deger: 0, bicim: (v) => (v ? `%${v}` : "yok"), degisti: (v) => { kayma = v; ciz(); } });
    const t = g.tutamac(px, py, { etiket: "Üretim noktası", surukle: (x, y) => { px = x; py = y; ciz(); } });
    function ciz() {
      g.temizle();
      if (kayma) g.egri((x) => (x > 12 ? NaN : temel(x)), { sinif: "r-5 soluk", kesik: true, x1: 12 });
      g.alan((x) => egri(x), 0, 0, 12 * (1 + kayma / 100), { sinif: "a-notr" });
      g.egri(egri, { sinif: "r-1", etiket: "ÜOE", x1: 12 * (1 + kayma / 100), etiketX: 6 * (1 + kayma / 100), etiketDy: -12 });
      if (!kayma) tablo.forEach(([h, x, y]) => g.nokta(x, y, { r: 3.5, etiket: h, dx: 6, dy: -6, sinif: "bos" }));
      t.konum(px, py);
      const sinir = egri(px);
      const fark = isFinite(sinir) ? py - sinir : 1;
      const durum = Math.abs(fark) < 0.45 ? "etkin" : fark < 0 ? "etkinsiz" : "disarida";
      g.kilavuz(px, py);
      // marjinal fırsat maliyeti: eğrinin o silah düzeyindeki eğimi (sayısal türev)
      const xx = Math.min(Math.max(px, 0.2), 12 * (1 + kayma / 100) - 0.2);
      const egim = -(egri(xx + 0.1) - egri(xx - 0.1)) / 0.2;
      ok.yaz([
        ["Silah", Y.tl(px)], ["Tereyağı", Y.tl(py)],
        ["Nokta", { etkin: "Etkin (eğri üzerinde)", etkinsiz: "Etkinsiz (eğrinin içinde)", disarida: "Ulaşılamaz (eğrinin dışında)" }[durum], durum === "etkin" ? "yesil" : durum === "etkinsiz" ? "altin" : "kirmizi"],
        ["1 silah daha = vazgeçilen tereyağı", `≈ ${Y.tl(egim, 2)} ton`, "mavi"],
      ]);
      Y.notYaz(not, durum === "etkin" ? `Eğri üzerindesin: tereyağından vazgeçmeden daha fazla silah üretemezsin. Silah arttıkça eğri dikleşir — <b>artan marjinal fırsat maliyeti</b>: tereyağına daha uygun kaynakları da silaha kaydırmak zorunda kalırsın.`
        : durum === "etkinsiz" ? `Eğrinin içindesin: kaynakların bir kısmı boşta ya da yanlış işte. Hiçbir şeyden vazgeçmeden ikisinden de daha fazla üretebilirsin.`
          : `Eğrinin dışındasın: bugünkü kaynak ve teknolojiyle ulaşılamaz. Oraya ancak büyüme (kaydırıcıyı dene) ya da ticaretle varılır.`, durum === "etkin" ? "iyi" : durum === "etkinsiz" ? "" : "uyari");
    }
    ciz();
  };

  // ================================================================ 2./9. bölüm — karşılaştırmalı üstünlük ve ticaret
  G["karsilastirmali"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Karşılaştırmalı üstünlük: uzmanlaş, ticaret yap, eğrinin dışında tüket", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    const dg = ayar.degerler || [[20, 40], [30, 30]];
    const ulke = [{ ad: ayar.a || "Türkiye", x: dg[0][0], y: dg[0][1] }, { ad: ayar.b || "Almanya", x: dg[1][0], y: dg[1][1] }];
    const mal = ayar.mal || ["Fındık (ton)", "Makine (adet)"];
    const ok = okuma(okumaKap);
    let hadde = ayar.hadde || 1.25, takas = ayar.takas || 8;
    const gA = Grafik(s1, { x: [0, 45], y: [0, 50], xEtiket: mal[0], yEtiket: mal[1], oran: 0.85 });
    const gB = Grafik(s2, { x: [0, 45], y: [0, 50], xEtiket: mal[0], yEtiket: mal[1], oran: 0.85 });
    const kh = [];
    ulke.forEach((u, i) => {
      kh.push(kaydirici(kontrol, { etiket: `${u.ad}: en çok ${mal[0].split(" ")[0].toLocaleLowerCase("tr-TR")}`, min: 5, max: 45, adim: 1, deger: u.x, degisti: (v) => { u.x = v; ciz(); } }));
      kh.push(kaydirici(kontrol, { etiket: `${u.ad}: en çok ${mal[1].split(" ")[0].toLocaleLowerCase("tr-TR")}`, min: 5, max: 50, adim: 1, deger: u.y, degisti: (v) => { u.y = v; ciz(); } }));
    });
    const hk = kaydirici(kontrol, { etiket: `Ticaret haddi: 1 ${mal[0].split(" ")[0].toLocaleLowerCase("tr-TR")} = ? ${mal[1].split(" ")[0].toLocaleLowerCase("tr-TR")}`, min: 0.1, max: 3, adim: 0.05, deger: hadde, bicim: (v) => sayi(v, 2), degisti: (v) => { hadde = v; ciz(); } });
    const tk = kaydirici(kontrol, { etiket: `Takas edilen ${mal[0].split(" ")[0].toLocaleLowerCase("tr-TR")}`, min: 0, max: 30, adim: 1, deger: takas, degisti: (v) => { takas = v; ciz(); } });
    function ciz() {
      // fırsat maliyeti: 1 X = (y/x) Y
      const fm = ulke.map((u) => u.y / u.x);
      const xUstun = fm[0] < fm[1] ? 0 : fm[1] < fm[0] ? 1 : -1;   // X'te karşılaştırmalı üstün olan (X'in fırsat maliyeti düşük)
      const lo = Math.min(...fm), hi = Math.max(...fm);
      [gA, gB].forEach((g, i) => {
        g.temizle();
        const u = ulke[i];
        g.egri((x) => u.y - (u.y / u.x) * x, { sinif: i ? "r-2" : "r-1", x1: u.x, etiket: u.ad, etiketX: u.x * 0.55, etiketDy: -10 });
      });
      let mesaj = "";
      if (xUstun < 0) {
        ok.yaz([[`${ulke[0].ad}: 1 birim ${mal[0].split(" ")[0]}`, `${sayi(fm[0], 2)} ${mal[1].split(" ")[0]}`], [`${ulke[1].ad}: 1 birim ${mal[0].split(" ")[0]}`, `${sayi(fm[1], 2)} ${mal[1].split(" ")[0]}`]]);
        Y.notYaz(not, "Fırsat maliyetleri eşit: kimsenin karşılaştırmalı üstünlüğü yok, ticaretten kazanç da yok. Bir kaydırıcıyı oynat.", "");
        return;
      }
      const yUstun = 1 - xUstun;
      // Uzmanlaşma: X'te üstün olan yalnız X, öteki yalnız Y üretir; X üreten 'takas' kadar X'i hadde ile Y'ye çevirir
      const ux = ulke[xUstun], uy = ulke[yUstun];
      const tak = Math.min(takas, ux.x);
      const tuketim = [];
      tuketim[xUstun] = [ux.x - tak, tak * hadde];
      tuketim[yUstun] = [tak, uy.y - tak * hadde];
      const haddeAraligi = hadde > lo && hadde < hi;
      [gA, gB].forEach((g, i) => {
        const u = ulke[i], [cx, cy] = tuketim[i];
        const uretim = i === xUstun ? [u.x, 0] : [0, u.y];
        g.nokta(uretim[0], uretim[1], { etiket: "üretim", sinif: "bos", dx: uretim[0] ? -52 : 8, dy: uretim[0] ? -10 : 14 });
        const pptAltinda = cy <= u.y - (u.y / u.x) * cx + 1e-9;
        if (cy >= 0) { g.kilavuz(cx, cy); g.nokta(cx, cy, { sinif: pptAltinda ? "kirmizi" : "yesil", etiket: "ticaretle tüketim", dx: 8, dy: -8 }); }
        g.ok(uretim[0], uretim[1], Math.max(0, cx), Math.max(0, cy), { kesik: true });
      });
      const k = (i) => { const u = ulke[i], [cx, cy] = tuketim[i]; return cy - (u.y - (u.y / u.x) * cx); };
      ok.yaz([
        [`${ulke[0].ad}: 1 ${mal[0].split(" ")[0]}'ın fırsat maliyeti`, `${sayi(fm[0], 2)} ${mal[1].split(" ")[0]}`, xUstun === 0 ? "yesil" : ""],
        [`${ulke[1].ad}: 1 ${mal[0].split(" ")[0]}'ın fırsat maliyeti`, `${sayi(fm[1], 2)} ${mal[1].split(" ")[0]}`, xUstun === 1 ? "yesil" : ""],
        [`Karşılaştırmalı üstünlük`, `${ux.ad} → ${mal[0].split(" ")[0]}, ${uy.ad} → ${mal[1].split(" ")[0]}`, "mavi"],
        [`Kazanç (eğrinin üstünde)`, `${ulke[0].ad}: ${sayi(k(0), 1)} · ${ulke[1].ad}: ${sayi(k(1), 1)}`, k(0) > 0 && k(1) > 0 ? "yesil" : "kirmizi"],
      ]);
      const mutlak = ulke[0].x > ulke[1].x && ulke[0].y > ulke[1].y ? ulke[0].ad : ulke[1].x > ulke[0].x && ulke[1].y > ulke[0].y ? ulke[1].ad : null;
      mesaj = haddeAraligi
        ? `Ticaret haddi iki fırsat maliyetinin arasında (${sayi(lo, 2)} ile ${sayi(hi, 2)}): <b>iki ülke de</b> kendi üretim olanakları eğrisinin dışında tüketiyor.`
        : `Ticaret haddi ${sayi(lo, 2)}–${sayi(hi, 2)} aralığının dışında: taraflardan biri ticaretten zarar ediyor (kırmızı nokta eğrinin içinde). Gerçekte o taraf bu ticareti kabul etmez.`;
      if (mutlak) mesaj += ` Dikkat: ${mutlak} iki malda da <i>mutlak</i> üstün, yine de ticaret ikisine de yarıyor — belirleyici olan <b>karşılaştırmalı</b> üstünlük.`;
      Y.notYaz(not, mesaj, haddeAraligi ? "iyi" : "uyari");
    }
    ciz();
  };

  // ================================================================ 4. bölüm — talep: hareket mi, kayma mı?
  function kaymaGorseli(kap, ayar, tur) {
    const talepMi = tur === "talep";
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: talepMi ? "Talep miktarındaki değişim mi, talepteki değişim mi?" : "Arz miktarındaki değişim mi, arzdaki değişim mi?" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    const a0 = talepMi ? 90 : 10, b = talepMi ? 0.8 : 0.8;
    let a = a0, p = 50;
    const f = (k) => (talepMi ? (q) => k - b * q : (q) => k + b * q);
    const miktar = (k, fiyat) => (talepMi ? (k - fiyat) / b : (fiyat - k) / b);
    const ok = okuma(okumaKap);
    const KAYDIRICILAR = talepMi ? [
      ["Gelir artar (normal mal)", +16, "Gelir arttı: normal malda her fiyatta daha çok talep edilir — <b>talep arttı</b>, eğri sağa kaydı."],
      ["Gelir artar (düşük mal)", -16, "Gelir arttı ama bu bir düşük mal (inferior good): insanlar daha iyisine geçer — <b>talep azaldı</b>, eğri sola kaydı."],
      ["İkame malın fiyatı artar", +14, "İkamesi pahalandı (ör. çay pahalanınca kahve): her fiyatta daha çok bu mal talep edilir — eğri sağa."],
      ["Tamamlayıcı malın fiyatı artar", -14, "Tamamlayıcısı pahalandı (ör. benzin pahalanınca otomobil): bu malın talebi azalır — eğri sola."],
      ["Fiyat artışı beklentisi", +12, "İnsanlar fiyatın yükseleceğini bekliyor: bugünden alırlar — talep bugün artar, eğri sağa."],
      ["Zevkler aleyhine döner", -12, "Moda geçti ya da sağlığa zararı duyuldu: her fiyatta daha az talep — eğri sola."],
      ["Tüketiciye sübvansiyon", +10, "Alıcıya sübvansiyon (ya da alıcıdan alınan verginin kalkması): her fiyatta daha çok talep — eğri sağa."],
    ] : [
      ["Girdi fiyatları artar", +16, "Girdi (hammadde, ücret, enerji) pahalandı: her fiyatta daha az üretmek kârlı — <b>arz azaldı</b>, eğri sola (yukarı) kaydı."],
      ["Teknoloji ilerler", -16, "Teknoloji maliyeti düşürdü: her fiyatta daha çok üretilir — <b>arz arttı</b>, eğri sağa (aşağı) kaydı."],
      ["Fiyat artışı beklentisi", +10, "Üreticiler fiyatın yükseleceğini bekliyor: bugün stok tutarlar — bugünkü arz azalır, eğri sola."],
      ["Üreticiye vergi", +12, "Satıcıdan birim başına vergi alındı: maliyet gibi davranır — arz azalır, eğri sola (yukarı)."],
      ["Üreticiye sübvansiyon", -12, "Satıcıya sübvansiyon: maliyeti düşürür — arz artar, eğri sağa (aşağı)."],
    ];
    const tuslar = el("div", { class: "secici" }, el("span", { class: "secici-ad", text: "Bir kaydırıcı seç:" }));
    let sonMesaj = "";
    for (const [ad, d, m] of KAYDIRICILAR) tuslar.append(el("button", { type: "button", "aria-checked": "false", text: ad, onclick: (e) => { a = a0 + d; sonMesaj = m; tuslar.querySelectorAll("button").forEach((x) => x.setAttribute("aria-checked", String(x === e.target))); ciz("kayma"); } }));
    tuslar.append(el("button", { type: "button", text: "Sıfırla", onclick: () => { a = a0; p = 50; fs.ayarla(50, true); tuslar.querySelectorAll("button").forEach((x) => x.setAttribute("aria-checked", "false")); ciz(); } }));
    kontrol.append(tuslar);
    const fs = kaydirici(kontrol, { etiket: "Malın kendi fiyatı (P)", min: 15, max: 85, adim: 1, deger: 50, degisti: (v) => { p = v; ciz("hareket"); } });
    function ciz(neden) {
      g.temizle();
      const ad = talepMi ? "D" : "S";
      if (a !== a0) g.egri(f(a0), { sinif: (talepMi ? "r-1" : "r-2") + " soluk", etiket: ad + "₀", etiketX: talepMi ? 8 : 88 });
      g.egri(f(a), { sinif: talepMi ? "r-1" : "r-2", etiket: a !== a0 ? ad + "₁" : ad, etiketX: talepMi ? 12 : 84 });
      const q0 = miktar(a0, p), q1 = miktar(a, p);
      if (a !== a0 && q0 >= 0 && q0 <= 100 && q1 >= 0 && q1 <= 100) { g.nokta(q0, p, { sinif: "bos" }); g.ok(q0, p, q1, p); }
      if (q1 >= 0 && q1 <= 100) { g.kilavuz(q1, p); g.nokta(q1, p, { sinif: talepMi ? "mavi" : "kirmizi" }); }
      ok.yaz([["Fiyat", Y.tl(p)], [talepMi ? "Talep miktarı (Qd)" : "Arz miktarı (Qs)", Y.tl(Math.max(0, q1)), talepMi ? "mavi" : "kirmizi"], ["Eğri", a === a0 ? "başlangıçtaki yerinde" : (talepMi ? a > a0 : a < a0) ? "sağa kaydı" : "sola kaydı"]]);
      if (neden === "hareket") Y.notYaz(not, talepMi
        ? `Malın <b>kendi fiyatı</b> değişti: eğri yerinde duruyor, eğrinin <b>üzerinde</b> hareket ediyoruz. Buna <b>talep miktarındaki değişim</b> (change in quantity demanded) denir. Talep yasası: fiyat ↑ → talep miktarı ↓.`
        : `Malın kendi fiyatı değişti: eğrinin üzerinde hareket — <b>arz miktarındaki değişim</b> (change in quantity supplied). Arz yasası: fiyat ↑ → arz miktarı ↑.`);
      else if (neden === "kayma") Y.notYaz(not, sonMesaj + " Fiyat aynı kaldığı hâlde miktar değişti; bu yüzden buna eğri boyunca hareket değil <b>kayma</b> denir.", "iyi");
      else Y.notYaz(not, "Önce fiyat kaydırıcısıyla oyna (eğri üzerinde hareket), sonra bir kaydırıcı düğmesine bas (eğrinin kayması). Sınavda bu ikisini karıştırmak en sık yapılan hatadır.");
    }
    ciz();
  }
  G["talep-kayma"] = (kap, ayar) => kaymaGorseli(kap, ayar, "talep");
  G["arz-kayma"] = (kap, ayar) => kaymaGorseli(kap, ayar, "arz");

  // ================================================================ 4. bölüm — denge ve görünmez el
  G["denge"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Piyasa dengesi: fiyatı sürükle, görünmez eli izle" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    const a = 90, b = 0.8, c = 10, d = 0.8;
    const E = Y.kes(a, b, c, d);
    let p = 75, zaman = 0;
    const ok = okuma(okumaKap);
    const t = g.tutamac(0, p, { etiket: "Fiyat", surukle: (x, y) => { p = Math.max(12, Math.min(88, y)); ciz(); } });
    tus(kontrol, "Görünmez eli çalıştır", () => {
      clearInterval(zaman);
      zaman = setInterval(() => { p += (E.p - p) * 0.18; if (Math.abs(p - E.p) < 0.25) { p = E.p; clearInterval(zaman); } ciz(); }, 90);
    });
    tus(kontrol, "Fiyatı tavana çek", () => { clearInterval(zaman); p = 75; ciz(); });
    tus(kontrol, "Fiyatı dibe çek", () => { clearInterval(zaman); p = 25; ciz(); });
    function ciz() {
      g.temizle();
      g.egri(Y.talep(a, b), { sinif: "r-1", etiket: "D", etiketX: 92 });
      g.egri(Y.arz(c, d), { sinif: "r-2", etiket: "S", etiketX: 92 });
      const qd = Y.qd(a, b, p), qs = Y.qs(c, d, p);
      g.cizgi(0, p, 100, p, { sinif: "r-5", kesik: true });
      t.konum(0, p);
      g.nokta(qd, p, { sinif: "mavi" }); g.nokta(qs, p, { sinif: "kirmizi" });
      g.kilavuz(qd, p, { yatay: false, xYazi: "Qd" }); g.kilavuz(qs, p, { yatay: false, xYazi: "Qs" });
      if (Math.abs(qd - qs) > 1) {
        g.cizgi(Math.min(qd, qs), p + (p > E.p ? 4 : -4), Math.max(qd, qs), p + (p > E.p ? 4 : -4), { sinif: p > E.p ? "r-2" : "r-1", ustte: true });
        g.etiket((qd + qs) / 2, p + (p > E.p ? 4 : -4), p > E.p ? "arz fazlası" : "talep fazlası (kıtlık)", { hiza: "middle", dy: p > E.p ? -6 : 16, sinif: p > E.p ? "r-2" : "r-1" });
        g.ok(6, p, 6, p + (p > E.p ? -9 : 9));
      } else g.nokta(E.q, E.p, { etiket: "E (denge)" });
      const fark = qd - qs;
      ok.yaz([["Fiyat", Y.tl(p)], ["Talep miktarı Qd", Y.tl(qd), "mavi"], ["Arz miktarı Qs", Y.tl(qs), "kirmizi"], [fark > 1 ? "Talep fazlası" : fark < -1 ? "Arz fazlası" : "Durum", Math.abs(fark) > 1 ? Y.tl(Math.abs(fark)) : "Denge: Qd = Qs", Math.abs(fark) > 1 ? "altin" : "yesil"]]);
      Y.notYaz(not, fark < -1 ? `Fiyat dengenin üstünde: satıcılar ${Y.tl(qs)} satmak istiyor, alıcılar ${Y.tl(qd)} istiyor. Elde kalan mal satıcıları fiyat kırmaya iter: <b>fiyat düşer</b>.`
        : fark > 1 ? `Fiyat dengenin altında: alıcılar ${Y.tl(qd)} istiyor ama ancak ${Y.tl(qs)} var. Kuyruklar, karaborsa… Alıcılar daha fazla öder, satıcılar fiyatı yükseltir: <b>fiyat yükselir</b>.`
          : `Denge: P* = ${Y.tl(E.p)}, Q* = ${Y.tl(E.q)}. Alıcıların almak istediği tam satıcıların satmak istediği kadar; fiyatı değiştirecek bir baskı kalmadı.`, Math.abs(fark) <= 1 ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 5. bölüm — iki eğri birden kayarsa
  G["kayma-analizi"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Talep ve arz birlikte kayarsa: fiyat ve miktara ne olur?" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    const a0 = 90, b = 0.8, c0 = 10, d = 0.8;
    let dt = 0, ds = 0;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Talep kayması (+ sağa)", min: -25, max: 25, adim: 1, deger: 0, bicim: (v) => (v > 0 ? "+" : "") + v, degisti: (v) => { dt = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Arz kayması (+ sağa)", min: -25, max: 25, adim: 1, deger: 0, bicim: (v) => (v > 0 ? "+" : "") + v, degisti: (v) => { ds = v; ciz(); } });
    const yon = (x) => (x > 0.3 ? "↑ artar" : x < -0.3 ? "↓ azalır" : "değişmez");
    function ciz() {
      g.temizle();
      const a = a0 + dt, c = c0 - ds;   // talep sağa: a↑ ; arz sağa: c↓
      const E0 = Y.kes(a0, b, c0, d), E1 = Y.kes(a, b, c, d);
      if (dt) g.egri(Y.talep(a0, b), { sinif: "r-1 soluk" });
      if (ds) g.egri(Y.arz(c0, d), { sinif: "r-2 soluk" });
      g.egri(Y.talep(a, b), { sinif: "r-1", etiket: dt ? "D₁" : "D", etiketX: 90 });
      g.egri(Y.arz(c, d), { sinif: "r-2", etiket: ds ? "S₁" : "S", etiketX: 90 });
      g.nokta(E0.q, E0.p, { sinif: "bos", etiket: dt || ds ? "E₀" : "E", dx: -24 });
      if (dt || ds) { g.ok(E0.q, E0.p, E1.q, E1.p, { kesik: true }); g.kilavuz(E1.q, E1.p); g.nokta(E1.q, E1.p, { etiket: "E₁" }); }
      ok.yaz([["Denge fiyatı", `${Y.tl(E0.p)} → ${Y.tl(E1.p)}`, "mavi"], ["Denge miktarı", `${Y.tl(E0.q)} → ${Y.tl(E1.q)}`, "kirmizi"], ["Fiyat", yon(E1.p - E0.p)], ["Miktar", yon(E1.q - E0.q)]]);
      let m;
      if (!dt && !ds) m = "İki kaydırıcıyı oynat. Önce birini, sonra ikisini birden: aynı yönde kaydırınca hangisinin belirsiz kaldığına dikkat et.";
      else if (dt && !ds) m = dt > 0 ? "Yalnız talep arttı: fiyat da miktar da artar." : "Yalnız talep azaldı: fiyat da miktar da azalır.";
      else if (!dt && ds) m = ds > 0 ? "Yalnız arz arttı: fiyat düşer, miktar artar." : "Yalnız arz azaldı: fiyat yükselir, miktar azalır.";
      else if (dt * ds > 0) m = `Talep ve arz <b>aynı yönde</b> kaydı: miktarın yönü kesin (${dt > 0 ? "artar" : "azalır"}), fiyatın yönü ise <b>kaymaların büyüklüğüne bağlı — belirsiz</b>. Büyüklükleri değiştirip dene.`;
      else m = `Talep ve arz <b>ters yönde</b> kaydı: fiyatın yönü kesin (${dt > 0 ? "artar" : "azalır"}), miktarın yönü <b>belirsiz</b> — hangi kaymanın büyük olduğuna bağlı.`;
      Y.notYaz(not, m, dt && ds ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 5./7. bölüm — refah: tavan, taban, vergi, kota
  G["refah"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: ayar.baslik || "Tüketici artığı, üretici artığı ve müdahalenin bedeli" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    const a = 90, b = 0.8, c = 10, d = 0.8;
    const D = Y.talep(a, b), S = Y.arz(c, d), E = Y.kes(a, b, c, d);
    let mod = ayar.mod || "serbest", seviye = { tavan: 35, taban: 65, vergi: 20, kota: 30 };
    const ok = okuma(okumaKap);
    const kutu = el("div", { style: "grid-column:1/-1" });
    secici(kontrol, { etiket: "Müdahale", secenekler: [["serbest", "Yok"], ["tavan", "Tavan fiyat"], ["taban", "Taban fiyat"], ["vergi", "Birim vergi"], ["kota", "Miktar kısıtı"]], deger: mod, degisti: (v) => { mod = v; ayarCiz(); ciz(); } });
    kontrol.append(kutu);
    function ayarCiz() {
      kutu.innerHTML = "";
      if (mod === "serbest") return;
      const o = { tavan: ["Tavan fiyat", 15, 60], taban: ["Taban fiyat", 40, 85], vergi: ["Birim başına vergi", 0, 50], kota: ["İzin verilen miktar", 5, 60] }[mod];
      kaydirici(kutu, { etiket: o[0], min: o[1], max: o[2], adim: 1, deger: seviye[mod], degisti: (v) => { seviye[mod] = v; ciz(); } });
    }
    const ucgen = (q0, q1, f, g2) => { let s = 0; const n = 200; for (let i = 0; i < n; i++) { const q = q0 + ((q1 - q0) * (i + 0.5)) / n; s += Math.max(0, f(q) - g2(q)); } return (s * (q1 - q0)) / n; };
    function ciz() {
      g.temizle();
      let Q = E.q, Pc = E.p, Ps = E.p, gelir = 0, kirmizi = "", rant = 0;
      if (mod === "tavan") { const pt = seviye.tavan; if (pt < E.p) { Q = Y.qs(c, d, pt); Pc = Ps = pt; kirmizi = `Kıtlık: alıcılar ${Y.tl(Y.qd(a, b, pt))} istiyor, satıcılar yalnız ${Y.tl(Q)} sunuyor.`; } else kirmizi = "Tavan dengenin üstünde: bağlayıcı değil, hiçbir şey değişmez."; }
      if (mod === "taban") { const pt = seviye.taban; if (pt > E.p) { Q = Y.qd(a, b, pt); Pc = Ps = pt; kirmizi = `Fazla arz: satıcılar ${Y.tl(Y.qs(c, d, pt))} sunuyor, alıcılar yalnız ${Y.tl(Q)} alıyor.`; } else kirmizi = "Taban dengenin altında: bağlayıcı değil."; }
      if (mod === "vergi") { const t = seviye.vergi; Q = Math.max(0, (a - c - t) / (b + d)); Pc = D(Q); Ps = S(Q); gelir = t * Q; }
      if (mod === "kota") { const qk = seviye.kota; if (qk < E.q) { Q = qk; Pc = D(Q); Ps = S(Q); rant = (Pc - Ps) * Q; kirmizi = `Kısıt bağlayıcı: alıcılar ${Y.tl(Pc)} öder, üretimin marjinal maliyeti ${Y.tl(Ps)}. Aradaki fark izin belgesi sahiplerinin rantı (ör. taksi plakası).`; } else kirmizi = "Kısıt denge miktarının üstünde: bağlayıcı değil."; }
      // alanlar
      const pcF = () => Pc, psF = () => Ps;
      g.alan(D, pcF, 0, Q, { sinif: "a-tuketici", etiket: "TA", etiketOran: 0.28 });
      g.alan(psF, S, 0, Q, { sinif: "a-uretici", etiket: "ÜA", etiketOran: 0.28 });
      if (mod === "vergi" && Q > 0) g.dikdortgen(0, Ps, Q, Pc, { sinif: "a-vergi", etiket: "vergi geliri", etiketX: Q / 2 });
      if (mod === "kota" && rant > 0) g.dikdortgen(0, Ps, Q, Pc, { sinif: "a-vergi", etiket: "kota rantı", etiketX: Q / 2 });
      if (mod === "tavan" && Pc < E.p) g.dikdortgen(0, Pc, Q, Pc, { sinif: "a-notr" });
      const olu = Q < E.q - 0.01 ? ucgen(Q, E.q, D, S) : 0;
      if (olu > 0) g.alan(D, S, Q, E.q, { sinif: "a-olu", etiket: "ÖAK", etiketOran: 0.38 });
      g.egri(D, { sinif: "r-1", etiket: "D", etiketX: 92 });
      g.egri(S, { sinif: "r-2", etiket: "S", etiketX: 92 });
      if (mod === "tavan" || mod === "taban") g.cizgi(0, seviye[mod], 100, seviye[mod], { sinif: "r-3", kesik: false });
      if (mod === "tavan" || mod === "taban") g.etiket(98, seviye[mod], mod === "tavan" ? "tavan" : "taban", { hiza: "end", dy: -7, sinif: "r-3" });
      if (mod === "kota") g.cizgi(seviye.kota, 0, seviye.kota, 100, { sinif: "r-3" });
      g.nokta(E.q, E.p, { sinif: "bos", etiket: Q < E.q - 0.01 ? "E" : "", dx: 8, dy: -6 });
      if (Q < E.q - 0.01) { g.kilavuz(Q, Pc, { yYazi: mod === "vergi" ? "Pₐ" : "" }); if (Ps !== Pc) g.kilavuz(Q, Ps, { yYazi: mod === "vergi" ? "Pₛ" : "" }); }
      const TA = ucgen(0, Q, D, pcF), UA = ucgen(0, Q, psF, S);
      const TA0 = ucgen(0, E.q, D, () => E.p), UA0 = ucgen(0, E.q, () => E.p, S);
      ok.yaz([
        ["Tüketici artığı (TA)", `${Y.tl(TA, 0)} <small>(önce ${Y.tl(TA0, 0)})</small>`, "mavi"],
        ["Üretici artığı (ÜA)", `${Y.tl(UA, 0)} <small>(önce ${Y.tl(UA0, 0)})</small>`, "kirmizi"],
        [mod === "kota" ? "Kota rantı" : "Vergi geliri", Y.tl(mod === "kota" ? rant : gelir, 0), "yesil"],
        ["Ölü ağırlık kaybı (ÖAK)", Y.tl(olu, 0), "altin"],
      ]);
      const ozet = mod === "serbest" ? `Serbest piyasada toplam artık (TA + ÜA = ${Y.tl(TA0 + UA0, 0)}) en büyüktür: üretilen her birimin alıcıya değeri, maliyetinden yüksektir.`
        : mod === "vergi" ? `Vergi ${Y.tl(seviye.vergi)}: alıcı ${Y.tl(Pc)} öder, satıcının eline ${Y.tl(Ps)} geçer. Miktar ${Y.tl(E.q)}'dan ${Y.tl(Q)}'ya düştü; artık kaybının ${Y.tl(gelir, 0)}'i devlete gelir oldu, ${Y.tl(olu, 0)}'i kimsenin olmadı: <b>ölü ağırlık kaybı</b> (Harberger üçgeni).`
          : kirmizi + (olu > 0 ? ` Gerçekleşmeyen alışverişlerin kaybı ${Y.tl(olu, 0)}: ölü ağırlık kaybı.` : "");
      Y.notYaz(not, ozet, olu > 0 ? "uyari" : "");
    }
    ayarCiz(); ciz();
  };

  // ================================================================ 7. bölüm — vergi yükünü kim taşır?
  G["vergi-yuku"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Vergi yükü: kanunun kime yazdığı değil, esneklikler belirler" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    let b = 0.8, d = 0.8, t = 20, kime = "satici";
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Vergi kimden alınıyor?", secenekler: [["satici", "Satıcıdan"], ["alici", "Alıcıdan"]], deger: kime, degisti: (v) => { kime = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Talebin eğimi (dik = esnek değil)", min: 0.2, max: 3, adim: 0.1, deger: b, bicim: (v) => sayi(v, 1), degisti: (v) => { b = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Arzın eğimi (dik = esnek değil)", min: 0.2, max: 3, adim: 0.1, deger: d, bicim: (v) => sayi(v, 1), degisti: (v) => { d = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Birim vergi", min: 0, max: 40, adim: 1, deger: t, degisti: (v) => { t = v; ciz(); } });
    function ciz() {
      g.temizle();
      // dengeyi (50, 50)'de sabitle: a = 50 + 50b, c = 50 − 50d
      const a = 50 + 50 * b, c = 50 - 50 * d;
      const Q = Math.max(0, (a - c - t) / (b + d)), Pc = a - b * Q, Ps = c + d * Q;
      g.dikdortgen(0, 50, Q, Pc, { sinif: "a-tuketici" });
      g.dikdortgen(0, Ps, Q, 50, { sinif: "a-uretici" });
      g.alan(Y.talep(a, b), Y.arz(c, d), Q, 50, { sinif: "a-olu" });
      g.egri(Y.talep(a, b), { sinif: "r-1", etiket: "D", etiketX: Math.min(95, (a - 6) / b) });
      g.egri(Y.arz(c, d), { sinif: "r-2", etiket: "S", etiketX: Math.min(95, (94 - c) / d) });
      if (kime === "satici") g.egri(Y.arz(c + t, d), { sinif: "r-2", kesik: true, etiket: "S + t", etiketX: Math.min(90, (90 - c - t) / d) });
      else g.egri(Y.talep(a - t, b), { sinif: "r-1", kesik: true, etiket: "D − t", etiketX: Math.min(90, (a - t - 8) / b) });
      g.nokta(50, 50, { sinif: "bos", etiket: "E₀", dx: 8, dy: 16 });
      g.kilavuz(Q, Pc, { yYazi: "alıcının ödediği" }); g.kilavuz(Q, Ps, { yYazi: "satıcıya kalan" });
      g.nokta(Q, Pc, { sinif: "mavi" }); g.nokta(Q, Ps, { sinif: "kirmizi" });
      const tPay = t ? (Pc - 50) / t : 0;
      ok.yaz([["Alıcının ödediği fiyat", `${Y.tl(Pc)} (+${Y.tl(Pc - 50)})`, "mavi"], ["Satıcıya kalan fiyat", `${Y.tl(Ps)} (−${Y.tl(50 - Ps)})`, "kirmizi"], ["Yükün alıcıdaki payı", `%${Y.tl(tPay * 100, 0)}`, "mavi"], ["Yükün satıcıdaki payı", `%${Y.tl((1 - tPay) * 100, 0)}`, "kirmizi"]]);
      Y.notYaz(not, `${kime === "satici" ? "Satıcıdan" : "Alıcıdan"} alınsa da sonuç aynı: alıcı ${Y.tl(Pc)} öder, satıcıya ${Y.tl(Ps)} kalır. Yükün büyüğü <b>daha az esnek (daha dik) taraf</b>ta kalır. Vergiyi kimin devlete ödediğine yasal yük, fiyatlara yansıyan gerçek dağılıma <b>iktisadi yük</b> (tax incidence) denir. Kanunu “satıcı ödesin” diye yazmak yükü satıcıya bırakmaz.`, "iyi");
    }
    ciz();
  };

  // ================================================================ 6. bölüm — fiyat esnekliği ve toplam gelir
  G["esneklik"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Doğrusal talepte esneklik değişir: noktayı sürükle", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    const a = 100, b = 1;
    const g = Grafik(s1, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)", oran: 0.85 });
    const g2 = Grafik(s2, { x: [0, 100], y: [0, 2600], xEtiket: "Miktar (Q)", yEtiket: "Toplam gelir TR = P·Q", oran: 0.85, yAdim: 500 });
    let q = 30;
    const ok = okuma(okumaKap);
    const t = g.tutamac(q, a - b * q, { etiket: "Talep üzerindeki nokta", surukle: (x) => { q = Math.max(2, Math.min(98, x)); ciz(); } });
    const t2 = g2.tutamac(q, q * (a - b * q), { etiket: "Toplam gelir", surukle: (x) => { q = Math.max(2, Math.min(98, x)); ciz(); } });
    function ciz() {
      g.temizle(); g2.temizle();
      const p = a - b * q, e = (1 / b) * (p / q);
      g.egri(Y.talep(a, b), { sinif: "r-1", x0: 0, x1: 50 });
      g.egri(Y.talep(a, b), { sinif: "r-3", x0: 50, x1: 100 });
      g.etiket(14, 92, "esnek |ε| > 1", { sinif: "r-1" });
      g.etiket(62, 30, "esnek değil |ε| < 1", { sinif: "r-3" });
      g.nokta(50, 50, { r: 3.5, etiket: "|ε| = 1", dx: 8, dy: -8 });
      g.dikdortgen(0, 0, q, p, { sinif: "a-tuketici", etiket: "TR", etiketX: q / 2, etiketY: p / 2 });
      g.kilavuz(q, p);
      t.konum(q, p);
      g2.egri((x) => x * (a - b * x), { sinif: "r-4", etiket: "TR", etiketX: 80 });
      g2.cizgi(50, 0, 50, 2500, { sinif: "r-5", kesik: true });
      g2.kilavuz(q, q * p);
      t2.konum(q, q * p);
      const sinif = Math.abs(e - 1) < 0.04 ? "birim esnek" : e > 1 ? "esnek" : "esnek değil";
      ok.yaz([["Fiyat P", Y.tl(p)], ["Miktar Q", Y.tl(q)], ["Fiyat esnekliği |ε|", Y.tl(e, 2), e > 1 ? "mavi" : "altin"], ["Toplam gelir", Y.tl(p * q, 0), "yesil"]]);
      Y.notYaz(not, sinif === "esnek" ? `Talep <b>esnek</b> (|ε| = ${Y.tl(e, 2)} > 1): fiyattaki %1'lik artış miktarı %1'den fazla düşürür, <b>toplam gelir azalır</b>. Fiyatı düşürmek geliri artırır — sağdaki eğride yukarı doğru tırmanırsın.`
        : sinif === "esnek değil" ? `Talep <b>esnek değil</b> (|ε| = ${Y.tl(e, 2)} < 1): fiyat artışı miktarı orantısından az düşürür, <b>toplam gelir artar</b>. Doğru üzerinde aşağı indikçe eğim aynı kaldığı hâlde esneklik küçülür.`
          : `<b>Birim esnek</b> nokta (|ε| = 1): toplam gelir en yüksek. Doğrusal talebin tam ortası.`, sinif === "birim esnek" ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 6. bölüm — yay (orta nokta) esnekliği
  G["yay-esneklik"] = (kap, ayar) => {
    const { sahne, okumaKap, not } = cerceve(kap, { baslik: "Orta nokta (yay) yöntemi: iki noktayı sürükle" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    const a = 90, b = 0.8, D = Y.talep(a, b);
    let q1 = 30, q2 = 50;
    const ok = okuma(okumaKap);
    const t1 = g.tutamac(q1, D(q1), { etiket: "Birinci nokta", surukle: (x) => { q1 = Math.max(1, Math.min(110, x)); ciz(); } });
    const t2 = g.tutamac(q2, D(q2), { etiket: "İkinci nokta", sinif: "kirmizi", surukle: (x) => { q2 = Math.max(1, Math.min(110, x)); ciz(); } });
    function ciz() {
      g.temizle();
      q1 = Math.min(q1, a / b - 1); q2 = Math.min(q2, a / b - 1);
      const p1 = D(q1), p2 = D(q2);
      g.egri(D, { sinif: "r-1", etiket: "D", etiketX: 90 });
      g.kilavuz(q1, p1, { xYazi: "Q₁", yYazi: "P₁" }); g.kilavuz(q2, p2, { xYazi: "Q₂", yYazi: "P₂" });
      t1.konum(q1, p1); t2.konum(q2, p2);
      const yuzdeQ = (q2 - q1) / ((q1 + q2) / 2), yuzdeP = (p2 - p1) / ((p1 + p2) / 2);
      const e = Math.abs(yuzdeQ / yuzdeP);
      const ileri = Math.abs(((q2 - q1) / q1) / ((p2 - p1) / p1)), geri = Math.abs(((q1 - q2) / q2) / ((p1 - p2) / p2));
      ok.yaz([["%ΔQ (orta nokta)", `%${Y.tl(yuzdeQ * 100, 1)}`], ["%ΔP (orta nokta)", `%${Y.tl(yuzdeP * 100, 1)}`], ["Yay esnekliği |ε|", isFinite(e) ? Y.tl(e, 2) : "—", "mavi"], ["Basit yöntem: 1→2 / 2→1", `${Y.tl(ileri, 2)} / ${Y.tl(geri, 2)}`, "altin"]]);
      Y.notYaz(not, `${Y.tx(String.raw`\varepsilon = \dfrac{(Q_2-Q_1)\,/\,\tfrac{Q_1+Q_2}{2}}{(P_2-P_1)\,/\,\tfrac{P_1+P_2}{2}}`)}<br>Basit yüzde değişim hangi noktadan başladığına göre farklı sonuç verir (${Y.tl(ileri, 2)} ile ${Y.tl(geri, 2)}). Orta nokta yöntemi iki yönde de aynı sayıyı verir: <b>${isFinite(e) ? Y.tl(e, 2) : "—"}</b>. Colander'ın sınav sorularında bu formül kullanılır.`);
    }
    ciz();
  };

  // ================================================================ 8. bölüm — dışsallık ve Pigou vergisi
  G["dissallik"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Dışsallık: piyasa sosyal maliyeti görmezse" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat, maliyet" });
    let tur = "negatif", dis = 20, vergi = 0;
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Dışsallık", secenekler: [["negatif", "Negatif (kirlilik)"], ["pozitif", "Pozitif (aşı, eğitim)"]], deger: tur, degisti: (v) => { tur = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Birim başına dışsal etki", min: 0, max: 35, adim: 1, deger: dis, degisti: (v) => { dis = v; ciz(); } });
    const vk = kaydirici(kontrol, { etiket: "Pigou vergisi / sübvansiyonu", min: 0, max: 35, adim: 1, deger: 0, degisti: (v) => { vergi = v; ciz(); } });
    function ciz() {
      g.temizle();
      const a = 90, b = 0.8, c = 10, d = 0.8;
      const MPB = Y.talep(a, b), MPC = Y.arz(c, d);
      const neg = tur === "negatif";
      const MSC = neg ? Y.arz(c + dis, d) : MPC, MSB = neg ? MPB : Y.talep(a + dis, b);
      const Qp = neg ? Math.max(0, (a - c - vergi) / (b + d)) : (a + vergi - c) / (b + d);   // vergi/sübvansiyon sonrası piyasa miktarı
      const Qs = neg ? (a - c - dis) / (b + d) : (a + dis - c) / (b + d);
      const Qm = (a - c) / (b + d);
      // ÖAK: gerçekleşen miktar ile sosyal optimum arasında MSC ile MSB farkı
      const kayip = (() => { const lo = Math.min(Qp, Qs), hi = Math.max(Qp, Qs); let s = 0; const n = 100; for (let i = 0; i < n; i++) { const q = lo + ((hi - lo) * (i + 0.5)) / n; s += Math.abs(MSB(q) - MSC(q)); } return (s * (hi - lo)) / n; })();
      if (Math.abs(Qp - Qs) > 0.3) g.alan((q) => Math.max(MSB(q), MSC(q)), (q) => Math.min(MSB(q), MSC(q)), Math.min(Qp, Qs), Math.max(Qp, Qs), { sinif: "a-olu", etiket: "kayıp", etiketOran: 0.5 });
      g.egri(MPB, { sinif: "r-1", etiket: neg ? "D = MSB" : "D = MPB", etiketX: 86 });
      g.egri(MPC, { sinif: "r-2", etiket: neg ? "S = MPC" : "S = MSC", etiketX: 86 });
      if (dis) neg ? g.egri(MSC, { sinif: "r-6", etiket: "MSC", etiketX: 72 }) : g.egri(MSB, { sinif: "r-6", etiket: "MSB", etiketX: 86 });
      g.kilavuz(Qm, MPB(Qm), { xYazi: "Qpiyasa" });
      g.nokta(Qm, MPB(Qm), { sinif: "bos" });
      g.kilavuz(Qs, MSB(Qs), { xYazi: "Q*" });
      g.nokta(Qs, MSB(Qs), { sinif: "altin", etiket: "sosyal optimum", dx: neg ? -110 : 8, dy: -10 });
      if (vergi) { g.kilavuz(Qp, MPB(Qp)); g.nokta(Qp, neg ? MPB(Qp) : MPB(Qp), { sinif: "yesil" }); }
      ok.yaz([["Piyasanın ürettiği", Y.tl(vergi ? Qp : Qm)], ["Sosyal optimum Q*", Y.tl(Qs), "altin"], [neg ? "Aşırı üretim" : "Eksik üretim", Y.tl(Math.abs((vergi ? Qp : Qm) - Qs))], ["Toplumsal kayıp", Y.tl(kayip, 0), "kirmizi"]]);
      const tam = Math.abs(vergi - dis) < 0.5 && dis > 0;
      Y.notYaz(not, !dis ? "Dışsal etki yokken özel ve sosyal maliyet/fayda aynıdır; piyasa doğru miktarı üretir."
        : tam ? `Vergi/sübvansiyon dışsal etkiye eşitlendi (${dis}): piyasa artık sosyal optimumu üretiyor. <b>Pigou vergisi</b> dışsallığı içselleştirdi; yasak koymadan, fiyat aracılığıyla.`
          : neg ? `Üretici kirliliğin maliyetini (birim başına ${dis}) ödemiyor, bu yüzden piyasa sosyal optimumdan <b>fazla</b> üretir. Pigou vergisini ${dis}'e getir ve ne olduğunu izle.`
            : `Aşı olanın komşusu da korunur ama bu fayda alıcının hesabına girmez: piyasa sosyal optimumdan <b>az</b> üretir. Birim başına ${dis} sübvansiyon dene.`, tam ? "iyi" : "uyari");
    }
    ciz();
  };
})();
