// gorsel_mate.js — Mathematics I görselleri: fonksiyon çizici, doğru ve sistemler, başabaş, parabol ve kâr,
// üstel büyüme, faiz türleri, kredi tablosu, NBD/İVO, türev ve teğet, marjinal–ortalama, optimizasyon,
// Riemann toplamı, integralle artıklar, Lorenz–Gini, gelir akışı, Leontief.
// Matematik dersinde ondalık ayırıcı NOKTA (ders ve sınav İngilizce, hesap makinesiyle uyumlu).
(function () {
  "use strict";
  const { el, formul, Grafik, Ifade } = ECO;
  const { cerceve, kaydirici, secici, okuma, tus } = ECO.Gorsel;
  const G = ECO.gorseller;
  const n = (x, d = 2) => (x == null || !isFinite(x) ? "—" : (Math.round(x * 10 ** d) / 10 ** d).toString());
  const nTL = (x) => (isFinite(x) ? Math.round(x).toLocaleString("en-US") : "—");
  const tx = (s) => formul(s, false);
  const not = (k, m, tur) => { k.className = "sekil-not" + (tur ? " " + tur : ""); k.innerHTML = m; };
  const nokta = { xBicim: (v) => n(v, 2), yBicim: (v) => n(v, 2) };

  function girisKutusu(kap, etiket, deger, degisti) {
    const id = "f" + Math.random().toString(36).slice(2, 8);
    const g = el("input", { class: "giris", id, value: deger, spellcheck: "false", autocomplete: "off", style: "font-family:var(--f-kod)" });
    const kutu = el("div", { class: "alan-grup", style: "grid-column:1/-1;margin:0" }, el("label", { for: id, text: etiket }), g);
    g.addEventListener("input", () => degisti(g.value));
    kap.append(kutu);
    return g;
  }

  // ================================================================ 1. hafta — fonksiyon çizici ve iki nokta arası eğim
  G["fonksiyon-cizici"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Fonksiyon çizici: yaz, çizilsin; iki noktayı sürükle, eğimi gör" });
    let ifade = "0.5x^2 - 2x + 3", f = Ifade.derle(ifade), x1 = 1, x2 = 4;
    const g = Grafik(sahne, Object.assign({ x: [-2, 8], y: [-4, 12], xEtiket: "x", yEtiket: "y" }, nokta));
    const ok = okuma(okumaKap);
    girisKutusu(kontrol, "f(x) =", ifade, (v) => { try { f = Ifade.derle(v); ifade = v; ciz(); } catch (e) { not(nt, "İfade okunamadı: " + e.message, "uyari"); } });
    secici(kontrol, { etiket: "Hazır", secenekler: [["0.5x^2 - 2x + 3", "parabol"], ["2x + 1", "doğru"], ["sqrt(x)", "kök"], ["e^(0.3x)", "üstel"], ["ln(x)", "ln"], ["10/(x+1)", "hiperbol"]], deger: "", degisti: (v) => { ifade = v; f = Ifade.derle(v); kontrol.querySelector("input.giris").value = v; ciz(); } });
    const t1 = g.tutamac(x1, 0, { etiket: "x₁", surukle: (x) => { x1 = x; ciz(); } });
    const t2 = g.tutamac(x2, 0, { etiket: "x₂", sinif: "kirmizi", surukle: (x) => { x2 = x; ciz(); } });
    function ciz() {
      g.temizle();
      g.egri(f, { sinif: "r-1", etiket: "f(x)", etiketX: 6.6 });
      const y1 = f(x1), y2 = f(x2);
      const m = (y2 - y1) / (x2 - x1);
      if (isFinite(m)) g.egri((x) => y1 + m * (x - x1), { sinif: "r-3", kesik: true });
      if (isFinite(y1)) { g.kilavuz(x1, y1); t1.konum(x1, y1); }
      if (isFinite(y2)) { g.kilavuz(x2, y2); t2.konum(x2, y2); }
      ok.yaz([["f(x₁)", `f(${n(x1)}) = ${n(y1)}`, "mavi"], ["f(x₂)", `f(${n(x2)}) = ${n(y2)}`, "kirmizi"], ["Ortalama değişim (eğim)", n(m, 3), "altin"]]);
      not(nt, `Kesen doğrusunun eğimi ${tx("\\dfrac{\\Delta y}{\\Delta x} = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}")} = ${n(m, 3)}. İki noktayı birbirine yaklaştırdıkça bu oran, 9. haftada göreceğin <b>türeve</b> yaklaşır. Desteklenenler: + − * / ^, sqrt, ln, log, exp, e, pi.`);
    }
    ciz();
  };

  // ================================================================ 2. hafta — doğrusal sistem: iki doğrunun kesişimi
  G["dogrusal-sistem"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "İki doğru: kesişiyor mu, paralel mi, çakışık mı?" });
    let m1 = 1, b1 = 1, m2 = -0.5, b2 = 7;
    const g = Grafik(sahne, Object.assign({ x: [-2, 10], y: [-2, 10], xEtiket: "x", yEtiket: "y" }, nokta));
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "1. doğru eğim m₁", min: -3, max: 3, adim: 0.25, deger: m1, bicim: (v) => n(v), degisti: (v) => { m1 = v; ciz(); } });
    kaydirici(kontrol, { etiket: "1. doğru kesişim b₁", min: -2, max: 10, adim: 0.5, deger: b1, bicim: (v) => n(v), degisti: (v) => { b1 = v; ciz(); } });
    kaydirici(kontrol, { etiket: "2. doğru eğim m₂", min: -3, max: 3, adim: 0.25, deger: m2, bicim: (v) => n(v), degisti: (v) => { m2 = v; ciz(); } });
    kaydirici(kontrol, { etiket: "2. doğru kesişim b₂", min: -2, max: 10, adim: 0.5, deger: b2, bicim: (v) => n(v), degisti: (v) => { b2 = v; ciz(); } });
    function ciz() {
      g.temizle();
      g.egri((x) => m1 * x + b1, { sinif: "r-1", etiket: `y = ${n(m1)}x + ${n(b1)}`, etiketX: 6.5 });
      g.egri((x) => m2 * x + b2, { sinif: "r-2", etiket: `y = ${n(m2)}x + ${n(b2)}`, etiketX: 0.4, etiketDy: 18 });
      let durum;
      if (Math.abs(m1 - m2) < 1e-9) durum = Math.abs(b1 - b2) < 1e-9 ? "cakisik" : "paralel";
      else {
        const x = (b2 - b1) / (m1 - m2), y = m1 * x + b1;
        g.kilavuz(x, y); g.nokta(x, y, { etiket: `(${n(x)}, ${n(y)})` });
        ok.yaz([["Çözüm x", n(x, 3), "mavi"], ["Çözüm y", n(y, 3), "kirmizi"]]);
        durum = "tek";
      }
      if (durum !== "tek") ok.yaz([["Çözüm", durum === "paralel" ? "yok" : "sonsuz", "altin"]]);
      not(nt, durum === "tek" ? `Eğimler farklı: doğrular <b>tek bir noktada</b> kesişir. Cebirle: ${tx("m_1x + b_1 = m_2x + b_2 \\Rightarrow x = \\dfrac{b_2 - b_1}{m_1 - m_2}")}. Arz–talep dengesi tam olarak budur.`
        : durum === "paralel" ? "Eğimler eşit, kesişimler farklı: doğrular <b>paralel</b>, sistemin çözümü yok." : "Eğimler ve kesişimler aynı: doğrular <b>çakışık</b>, sonsuz çözüm var.", durum === "tek" ? "" : "uyari");
    }
    ciz();
  };

  // ================================================================ 2. hafta — başabaş
  G["basabas"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Başabaş noktası: toplam gelir = toplam maliyet" });
    let FC = 2000, v = 30, p = 50;
    const g = Grafik(sahne, { x: [0, 250], y: [0, 12000], xEtiket: "Miktar Q", yEtiket: "TL", yAdim: 2000, xBicim: (x) => n(x, 0), yBicim: (y) => nTL(y) });
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Sabit maliyet FC", min: 0, max: 5000, adim: 100, deger: FC, bicim: nTL, degisti: (x) => { FC = x; ciz(); } });
    kaydirici(kontrol, { etiket: "Birim değişken maliyet v", min: 0, max: 60, adim: 1, deger: v, degisti: (x) => { v = x; ciz(); } });
    kaydirici(kontrol, { etiket: "Fiyat p", min: 10, max: 80, adim: 1, deger: p, degisti: (x) => { p = x; ciz(); } });
    function ciz() {
      g.temizle();
      const TC = (q) => FC + v * q, TR = (q) => p * q;
      const qBE = p > v ? FC / (p - v) : Infinity;
      if (isFinite(qBE)) { g.alan(TC, TR, 0, Math.min(qBE, 250), { sinif: "a-zarar", etiket: "zarar" }); if (qBE < 250) g.alan(TR, TC, qBE, 250, { sinif: "a-kar", etiket: "kâr", etiketOran: 0.6 }); }
      g.egri(TR, { sinif: "r-1", etiket: "TR = pQ", etiketX: 200 });
      g.egri(TC, { sinif: "r-2", etiket: "TC = FC + vQ", etiketX: 220, etiketDy: 18 });
      g.egri(() => FC, { sinif: "r-4", kesik: true, etiket: "FC", etiketX: 240 });
      if (isFinite(qBE) && qBE <= 250) { g.kilavuz(qBE, TR(qBE)); g.nokta(qBE, TR(qBE), { etiket: "başabaş" }); }
      ok.yaz([["Katkı payı p − v", n(p - v, 2), "mavi"], ["Başabaş miktarı", isFinite(qBE) ? n(qBE, 2) : "yok", "altin"], ["Başabaş geliri", isFinite(qBE) ? nTL(p * qBE) : "—"]]);
      not(nt, p > v ? `${tx("Q_{BE} = \\dfrac{FC}{p - v}")} = ${nTL(FC)} / ${n(p - v)} = ${n(qBE, 2)}. Her birim, sabit maliyeti karşılamaya ${n(p - v)} TL katkı yapar; ${n(qBE, 1)} birimden sonra kâr başlar.` : "Fiyat birim değişken maliyetin altında ya da ona eşit: her birim zarar ettirir, başabaş noktası yok.", p > v ? "" : "uyari");
    }
    ciz();
  };

  // ================================================================ 3. hafta — parabol
  G["parabol"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "İkinci derece fonksiyon: a, b, c'yi değiştir" });
    let a = 1, b = -4, c = 3;
    const g = Grafik(sahne, Object.assign({ x: [-4, 8], y: [-8, 12], xEtiket: "x", yEtiket: "y" }, nokta));
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "a", min: -3, max: 3, adim: 0.25, deger: a, bicim: (v) => n(v), degisti: (v) => { a = v || 0.25; ciz(); } });
    kaydirici(kontrol, { etiket: "b", min: -8, max: 8, adim: 0.5, deger: b, bicim: (v) => n(v), degisti: (v) => { b = v; ciz(); } });
    kaydirici(kontrol, { etiket: "c", min: -8, max: 8, adim: 0.5, deger: c, bicim: (v) => n(v), degisti: (v) => { c = v; ciz(); } });
    function ciz() {
      g.temizle();
      const f = (x) => a * x * x + b * x + c;
      const D = b * b - 4 * a * c, xT = -b / (2 * a), yT = f(xT);
      g.egri(f, { sinif: "r-1", etiket: "f(x)", etiketX: xT + 3 });
      g.cizgi(xT, -8, xT, 12, { sinif: "r-5", kesik: true });
      g.nokta(xT, yT, { sinif: "altin", etiket: `tepe (${n(xT)}, ${n(yT)})`, dx: 8, dy: a > 0 ? 18 : -10 });
      let kokler = "reel kök yok";
      if (D >= 0) {
        const k1 = (-b - Math.sqrt(D)) / (2 * a), k2 = (-b + Math.sqrt(D)) / (2 * a);
        g.nokta(k1, 0, { sinif: "kirmizi" }); if (D > 0) g.nokta(k2, 0, { sinif: "kirmizi" });
        kokler = D > 0 ? `x₁ = ${n(Math.min(k1, k2), 3)}, x₂ = ${n(Math.max(k1, k2), 3)}` : `çift kök x = ${n(k1, 3)}`;
      }
      ok.yaz([["Diskriminant Δ = b² − 4ac", n(D, 2), D > 0 ? "yesil" : D === 0 ? "altin" : "kirmizi"], ["Kökler", kokler, "kirmizi"], ["Tepe x = −b/2a", n(xT, 3), "altin"], ["Kollar", a > 0 ? "yukarı (tepe en düşük)" : "aşağı (tepe en yüksek)"]]);
      not(nt, `${tx("x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}")}. Δ > 0 iki kök, Δ = 0 parabol eksene teğet, Δ < 0 eksene hiç değmez. İktisatta kâr parabolünün kökleri başabaş noktaları, tepesi en büyük kârdır.`);
    }
    ciz();
  };

  // ================================================================ 3./11. hafta — kâr parabolü: TR, TC, π
  G["kar-parabol"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Toplam gelir parabolü, maliyet doğrusu ve kâr", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    let a = 100, bq = 2, v = 10, FC = 400;
    const g1 = Grafik(s1, { x: [0, 50], y: [0, 1400], xEtiket: "Q", yEtiket: "TR, TC", oran: 0.8, yBicim: (y) => n(y, 0) });
    const g2 = Grafik(s2, { x: [0, 50], y: [-500, 800], xEtiket: "Q", yEtiket: "kâr π", oran: 0.8, yBicim: (y) => n(y, 0) });
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Talep: P = a − bQ, a", min: 60, max: 140, adim: 5, deger: a, degisti: (x) => { a = x; ciz(); } });
    kaydirici(kontrol, { etiket: "b", min: 1, max: 4, adim: 0.25, deger: bq, bicim: (x) => n(x), degisti: (x) => { bq = x; ciz(); } });
    kaydirici(kontrol, { etiket: "Birim maliyet v", min: 0, max: 50, adim: 1, deger: v, degisti: (x) => { v = x; ciz(); } });
    kaydirici(kontrol, { etiket: "Sabit maliyet FC", min: 0, max: 1000, adim: 50, deger: FC, degisti: (x) => { FC = x; ciz(); } });
    function ciz() {
      g1.temizle(); g2.temizle();
      const TR = (q) => a * q - bq * q * q, TC = (q) => FC + v * q, pi = (q) => TR(q) - TC(q);
      g1.egri(TR, { sinif: "r-1", etiket: "TR", etiketX: a / bq / 2 });
      g1.egri(TC, { sinif: "r-2", etiket: "TC", etiketX: 45 });
      g2.cizgi(0, 0, 50, 0, { sinif: "r-5" });
      g2.egri(pi, { sinif: "r-4", etiket: "π = TR − TC", etiketX: 6 });
      // π = −bQ² + (a − v)Q − FC
      const A = -bq, B = a - v, C = -FC, D = B * B - 4 * A * C;
      const qs = -B / (2 * A);
      g2.kilavuz(qs, pi(qs)); g2.nokta(qs, pi(qs), { sinif: "yesil", etiket: "en büyük kâr", dx: 8, dy: -8 });
      let be = "yok";
      if (D >= 0) {
        const r1 = (-B + Math.sqrt(D)) / (2 * A), r2 = (-B - Math.sqrt(D)) / (2 * A);
        for (const r of [r1, r2]) if (r >= 0) { g2.nokta(r, 0, { sinif: "kirmizi" }); g1.nokta(r, TR(r), { sinif: "kirmizi" }); }
        be = `Q = ${n(Math.min(r1, r2), 2)} ve ${n(Math.max(r1, r2), 2)}`;
      }
      ok.yaz([["Kârı en büyük yapan Q", n(qs, 2), "yesil"], ["Fiyat P = a − bQ", n(a - bq * qs, 2), "mavi"], ["En büyük kâr", n(pi(qs), 2), "yesil"], ["Başabaş noktaları", be, "kirmizi"]]);
      not(nt, `${tx("\\pi(Q) = -" + n(bq) + "Q^2 + " + n(a - v) + "Q - " + n(FC, 0))}. Tepe noktası ${tx("Q^* = -\\dfrac{B}{2A}")} = ${n(qs, 2)}. 11. haftada aynı sonucu ${tx("\\pi'(Q) = 0 \\iff MR = MC")} ile bulacaksın: ${tx(n(a) + " - " + n(2 * bq) + "Q = " + n(v))}.`);
    }
    ciz();
  };

  // ================================================================ 4. hafta — üstel büyüme ve logaritma
  G["ustel"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Üstel büyüme: oran sabit, artış hızlanır" });
    let g0 = 8, y0 = 100, logOlcek = false;
    const g = Grafik(sahne, { x: [0, 40], y: [0, 2200], xEtiket: "yıl t", yEtiket: "y(t)", xAdim: 5, yBicim: (y) => n(y, 0) });
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Yıllık büyüme oranı g", min: 1, max: 20, adim: 0.5, deger: g0, bicim: (v) => `%${n(v, 1)}`, degisti: (v) => { g0 = v; ciz(); } });
    secici(kontrol, { etiket: "Dikey eksen", secenekler: [["normal", "Doğal ölçek"], ["log", "ln y (log ölçek)"]], deger: "normal", degisti: (v) => { logOlcek = v === "log"; g.sinirlar(logOlcek ? { y: [4, 9] } : { y: [0, 2200] }); ciz(); } });
    function ciz() {
      g.temizle();
      const r = g0 / 100, f = (t) => y0 * (1 + r) ** t, lin = (t) => y0 * (1 + r * t);
      const tr = logOlcek ? (fn) => (t) => Math.log(fn(t)) : (fn) => fn;
      g.egri(tr(lin), { sinif: "r-5", kesik: true, etiket: "doğrusal (basit)", etiketX: 30 });
      g.egri(tr(f), { sinif: "r-1", etiket: "üstel (bileşik)", etiketX: logOlcek ? 30 : Math.min(35, Math.log(20) / Math.log(1 + r)) });
      const katla = Math.log(2) / Math.log(1 + r);
      for (let k = 1; k <= 4 && katla * k <= 40; k++) { const y = y0 * 2 ** k; g.nokta(katla * k, logOlcek ? Math.log(y) : y, { r: 3.5, sinif: "altin", etiket: k === 1 ? "×2" : `×${2 ** k}`, dx: -8, dy: -10 }); }
      ok.yaz([["Katlanma süresi ln2 / ln(1+g)", `${n(katla, 2)} yıl`, "altin"], ["70 kuralı 70/g", `${n(70 / g0, 2)} yıl`], ["40 yıl sonra", n(f(40), 0), "mavi"]]);
      not(nt, logOlcek ? `Log ölçekte üstel büyüme <b>düz bir doğru</b> olur: ${tx("\\ln y_t = \\ln y_0 + t\\ln(1+g)")}. Eğim ${tx("\\ln(1+g)")} büyüme hızıdır. İktisatçılar GSYH ve fiyat serilerini bu yüzden log ölçekte çizer.`
        : `${tx("y_t = y_0(1+g)^t")}: her yıl aynı ORANDA büyür, bu yüzden mutlak artış her yıl büyür. Katlanma süresi sabittir: ${n(katla, 1)} yılda bir iki katına çıkar.`);
    }
    ciz();
  };

  // ================================================================ 5. hafta — basit, bileşik, sürekli faiz
  G["faiz"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Basit, bileşik ve sürekli faiz" });
    let P = 10000, r = 12, m = 12, T = 10;
    const g = Grafik(sahne, { x: [0, 10], y: [0, 35000], xEtiket: "yıl", yEtiket: "birikim (TL)", yBicim: nTL, xAdim: 1 });
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Anapara P", min: 1000, max: 20000, adim: 500, deger: P, bicim: nTL, degisti: (v) => { P = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Yıllık nominal faiz r", min: 1, max: 60, adim: 1, deger: r, bicim: (v) => `%${v}`, degisti: (v) => { r = v; ciz(); } });
    secici(kontrol, { etiket: "Yılda kaç kez bileşik (m)", secenekler: [[1, "yıllık"], [4, "üç aylık"], [12, "aylık"], [365, "günlük"]], deger: 12, degisti: (v) => { m = v; ciz(); } });
    function ciz() {
      const R = r / 100;
      const ust = Math.max(P * Math.exp(R * T) * 1.08, P * 2);
      g.sinirlar({ y: [0, ust] });
      g.temizle();
      const basit = (t) => P * (1 + R * t), bilesik = (t) => P * (1 + R / m) ** (m * t), surekli = (t) => P * Math.exp(R * t);
      g.egri(surekli, { sinif: "r-4", etiket: "sürekli", etiketX: 9.2, etiketDy: -12 });
      g.egri(bilesik, { sinif: "r-1", etiket: "bileşik", etiketX: 8.6, etiketDy: 16 });
      g.egri(basit, { sinif: "r-2", etiket: "basit", etiketX: 9 });
      g.nokta(T, bilesik(T), { sinif: "mavi" });
      const ef = (1 + R / m) ** m - 1;
      ok.yaz([["Basit " + tx("P(1+rt)"), nTL(basit(T)), "kirmizi"], ["Bileşik " + tx("P(1+r/m)^{mt}"), nTL(bilesik(T)), "mavi"], ["Sürekli " + tx("Pe^{rt}"), nTL(surekli(T)), "yesil"], ["Efektif yıllık faiz", `%${n(ef * 100, 2)}`, "altin"]]);
      not(nt, `10 yıl sonunda bileşik faiz basit faizden ${nTL(bilesik(T) - basit(T))} TL fazla: faizin de faiz kazanmasının etkisi. Bileşik sayısı arttıkça (m büyüdükçe) sonuç büyür ama ${tx("Pe^{rt}")} sınırını aşamaz, çünkü ${tx("\\lim_{m\\to\\infty}(1 + r/m)^m = e^r")}. Aylık %${n(r / 12, 2)} ilan edilen faizin yıllık efektif karşılığı %${n(((1 + R / 12) ** 12 - 1) * 100, 2)}.`);
    }
    ciz();
  };

  // ================================================================ 6. hafta — kredi taksiti ve ödeme tablosu
  G["kredi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Kredi: eşit taksit ve her taksitte faiz–anapara payı" });
    let PV = 100000, i = 3, N = 12;
    const g = Grafik(sahne, { x: [0.5, 12.5], y: [0, 12000], xEtiket: "taksit no", yEtiket: "TL", xAdim: 1, yBicim: nTL, xBicim: (x) => n(x, 0) });
    const tablo = el("div", { class: "tablo-kaydir" });
    sahne.append(tablo);
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Kredi tutarı", min: 10000, max: 500000, adim: 10000, deger: PV, bicim: nTL, degisti: (v) => { PV = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Aylık faiz i", min: 0.5, max: 6, adim: 0.25, deger: i, bicim: (v) => `%${n(v, 2)}`, degisti: (v) => { i = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Taksit sayısı n", min: 3, max: 36, adim: 1, deger: N, degisti: (v) => { N = v; ciz(); } });
    function ciz() {
      const r = i / 100, PMT = PV * r / (1 - (1 + r) ** -N);
      g.sinirlar({ x: [0.5, N + 0.5], y: [0, PMT * 1.15] });
      g.temizle();
      let borc = PV, satirlar = "";
      for (let k = 1; k <= N; k++) {
        const faiz = borc * r, ana = PMT - faiz;
        g.dikdortgen(k - 0.38, 0, k + 0.38, ana, { sinif: "a-tuketici" });
        g.dikdortgen(k - 0.38, ana, k + 0.38, PMT, { sinif: "a-uretici" });
        borc -= ana;
        if (k <= 6 || k === N) satirlar += `<tr><td>${k}</td><td>${nTL(PMT)}</td><td>${nTL(faiz)}</td><td>${nTL(ana)}</td><td>${nTL(Math.max(0, borc))}</td></tr>`;
        else if (k === 7) satirlar += `<tr><td colspan="5" style="text-align:center">…</td></tr>`;
      }
      g.etiket(1, PMT * 1.06, "kırmızı: faiz · mavi: anapara", { sinif: "r-5" });
      tablo.innerHTML = `<table class="tablo-kucuk"><tr><th>No</th><th>Taksit</th><th>Faiz</th><th>Anapara</th><th>Kalan borç</th></tr>${satirlar}</table>`;
      ok.yaz([["Aylık taksit", nTL(PMT), "mavi"], ["Toplam ödeme", nTL(PMT * N)], ["Toplam faiz", nTL(PMT * N - PV), "kirmizi"]]);
      not(nt, `${tx("PMT = PV\\,\\dfrac{i}{1 - (1+i)^{-n}}")}. Her taksitte önce kalan borcun faizi ödenir, artanı anaparayı düşürür: ilk taksitlerde faiz payı büyük, sona doğru küçük. Toplam faizi "oran × anapara × süre" diye hesaplamak yanlıştır, çünkü borç her ay azalır.`);
    }
    ciz();
  };

  // ================================================================ 7. hafta — NBD ve İVO
  G["nbd"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Net bugünkü değer ve iç verim oranı" });
    let akis = [-1000, 300, 400, 500], r = 10;
    const g = Grafik(sahne, { x: [0, 30], y: [-400, 400], xEtiket: "iskonto oranı r (%)", yEtiket: "NBD", xAdim: 5, yBicim: (y) => n(y, 0) });
    const ok = okuma(okumaKap);
    girisKutusu(kontrol, "Nakit akışları (virgülle: t=0, t=1, …)", akis.join(", "), (v) => { const a = v.split(/[,;\s]+/).map(Number).filter((x) => !isNaN(x)); if (a.length >= 2) { akis = a; ciz(); } });
    kaydirici(kontrol, { etiket: "İskonto oranı r", min: 0, max: 30, adim: 0.5, deger: r, bicim: (v) => `%${n(v, 1)}`, degisti: (v) => { r = v; ciz(); } });
    const nbd = (rr) => akis.reduce((s, cf, t) => s + cf / (1 + rr / 100) ** t, 0);
    function ivo() { let lo = -50, hi = 200; if (nbd(lo) * nbd(hi) > 0) return null; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; if (nbd(lo) * nbd(m) <= 0) hi = m; else lo = m; } return (lo + hi) / 2; }
    function ciz() {
      g.sinirlar({ y: [-Math.max(200, Math.abs(akis[0]) * 0.6), Math.max(200, nbd(0) * 1.1)] });
      g.temizle();
      g.cizgi(0, 0, 30, 0, { sinif: "r-5" });
      g.egri(nbd, { sinif: "r-1", etiket: "NBD(r)", etiketX: 2 });
      const v = nbd(r), irr = ivo();
      g.kilavuz(r, v); g.nokta(r, v, { sinif: v >= 0 ? "yesil" : "kirmizi" });
      if (irr != null && irr >= 0 && irr <= 30) g.nokta(irr, 0, { sinif: "altin", etiket: `İVO ≈ %${n(irr, 2)}`, dx: 6, dy: -10 });
      ok.yaz([["NBD (r = %" + n(r, 1) + ")", n(v, 2), v >= 0 ? "yesil" : "kirmizi"], ["İç verim oranı", irr != null ? `%${n(irr, 2)}` : "bulunamadı", "altin"], ["Karar", v >= 0 ? "Yatırım yap" : "Yapma", v >= 0 ? "yesil" : "kirmizi"]]);
      not(nt, `${tx("NBD = \\sum_{t=0}^{n} \\dfrac{CF_t}{(1+r)^t}")}. İskonto oranı arttıkça gelecekteki akışlar küçülür, NBD düşer. Eğrinin yatay ekseni kestiği oran <b>iç verim oranıdır</b>: İVO > r ise NBD > 0. Varsayılan örnek (−1000, 300, 400, 500) için %10'da NBD = −21.04: yatırım yapılmamalı.`);
    }
    ciz();
  };

  // ================================================================ 9. hafta — türev: kesenden teğete
  G["turev-teget"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Türev: kesen doğrusu teğete dönüşürken" });
    const FN = {
      "x^2": { f: (x) => x * x, d: (x) => 2 * x, tex: "x^2", ft: "2x" },
      "x^3 - 3x": { f: (x) => x ** 3 - 3 * x, d: (x) => 3 * x * x - 3, tex: "x^3 - 3x", ft: "3x^2 - 3" },
      "e^x": { f: Math.exp, d: Math.exp, tex: "e^x", ft: "e^x" },
      "ln x": { f: Math.log, d: (x) => 1 / x, tex: "\\ln x", ft: "1/x" },
      "sqrt x": { f: Math.sqrt, d: (x) => 0.5 / Math.sqrt(x), tex: "\\sqrt{x}", ft: "\\dfrac{1}{2\\sqrt{x}}" },
    };
    let ad = "x^2", x0 = 1, h = 1.5;
    const g = Grafik(sahne, Object.assign({ x: [-3, 4], y: [-4, 9], xEtiket: "x", yEtiket: "y" }, nokta));
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "f(x)", secenekler: Object.keys(FN).map((k) => [k, k]), deger: ad, degisti: (v) => { ad = v; if ((v === "ln x" || v === "sqrt x") && x0 <= 0.2) { x0 = 1; tx0.konum(1, FN[v].f(1)); } ciz(); } });
    const hk = kaydirici(kontrol, { etiket: "h (iki nokta arası uzaklık)", min: 0.01, max: 2.5, adim: 0.01, deger: h, bicim: (v) => n(v, 2), degisti: (v) => { h = v; ciz(); } });
    tus(kontrol, "h → 0 animasyonu", () => { let k = 2.5; const z = setInterval(() => { k *= 0.9; if (k < 0.01) { k = 0.01; clearInterval(z); } h = k; hk.ayarla(k, true); ciz(); }, 70); });
    const tx0 = g.tutamac(x0, 0, { etiket: "x₀", surukle: (x) => { x0 = (ad === "ln x" || ad === "sqrt x") ? Math.max(0.15, x) : x; ciz(); } });
    function ciz() {
      const F = FN[ad];
      g.temizle();
      g.egri(F.f, { sinif: "r-1", etiket: "f(x)", etiketX: 2.6 });
      const y0 = F.f(x0), y1 = F.f(x0 + h), kesen = (y1 - y0) / h, teg = F.d(x0);
      g.egri((x) => y0 + kesen * (x - x0), { sinif: "r-3", kesik: true, etiket: "kesen", etiketX: x0 + h + 0.3 });
      g.egri((x) => y0 + teg * (x - x0), { sinif: "r-2", etiket: "teğet", etiketX: x0 - 1.6 });
      g.nokta(x0 + h, y1, { sinif: "altin" });
      tx0.konum(x0, y0);
      ok.yaz([["Kesen eğimi [f(x₀+h) − f(x₀)]/h", n(kesen, 4), "altin"], ["Teğet eğimi f′(x₀)", n(teg, 4), "kirmizi"], ["Fark", n(kesen - teg, 4)]]);
      not(nt, `${tx("f'(x_0) = \\lim_{h\\to 0}\\dfrac{f(x_0+h) - f(x_0)}{h}")}. h küçüldükçe kesen teğete yapışır. Burada ${tx("f(x) = " + F.tex)} için ${tx("f'(x) = " + F.ft)}, yani ${tx("f'(" + n(x0, 2) + ") = " + n(teg, 3))}. Noktayı sürükle: türev, eğrinin her noktadaki anlık eğimidir.`);
    }
    ciz();
  };

  // ================================================================ 10. hafta — marjinal ve ortalama maliyet (kalkülüs)
  G["marjinal-ortalama"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "TC = 0.1Q³ − 2Q² + 15Q + 100: MC türev, AC bölüm" });
    let q = 10;
    const TC = (x) => 0.1 * x ** 3 - 2 * x * x + 15 * x + 100, MC = (x) => 0.3 * x * x - 4 * x + 15, AC = (x) => TC(x) / x;
    const g = Grafik(sahne, Object.assign({ x: [0, 20], y: [0, 60], xEtiket: "Q", yEtiket: "MC, AC", xAdim: 2 }, nokta));
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Q", min: 1, max: 19, adim: 0.5, deger: q, bicim: (v) => n(v, 1), degisti: (v) => { q = v; ciz(); } });
    // AC en düşük: MC = AC → 0.3Q² − 4Q + 15 = 0.1Q² − 2Q + 15 + 100/Q → 0.2Q³ − 2Q² − 100 = 0
    let qmin = 12; for (let k = 0; k < 60; k++) { const f = 0.2 * qmin ** 3 - 2 * qmin ** 2 - 100, d = 0.6 * qmin ** 2 - 4 * qmin; qmin -= f / d; }
    function ciz() {
      g.temizle();
      g.egri(MC, { sinif: "r-2", etiket: "MC = TC′(Q)", etiketX: 16.5 });
      g.egri(AC, { sinif: "r-1", etiket: "AC = TC/Q", etiketX: 18, x0: 1.5, etiketDy: 16 });
      g.nokta(qmin, AC(qmin), { sinif: "altin", etiket: "MC = AC", dx: 8, dy: 18 });
      g.cizgi(q, 0, q, 60, { sinif: "r-5", kesik: true });
      g.nokta(q, MC(q), { sinif: "kirmizi" }); g.nokta(q, AC(q), { sinif: "mavi" });
      const fark = TC(q + 1) - TC(q);
      ok.yaz([["MC(Q) = 0.3Q² − 4Q + 15", n(MC(q), 3), "kirmizi"], ["Gerçek fark TC(Q+1) − TC(Q)", n(fark, 3), "altin"], ["AC(Q)", n(AC(q), 3), "mavi"], ["AC en düşük", `Q ≈ ${n(qmin, 2)}`]]);
      not(nt, `Türev bir birimlik gerçek farkın yaklaşığıdır: Q = ${n(q, 1)}'da MC = ${n(MC(q), 2)}, gerçek fark ${n(fark, 2)}. MC, AC'nin ${MC(q) < AC(q) ? "altında: AC düşüyor" : "üstünde: AC yükseliyor"}. ${tx("\\dfrac{d}{dQ}\\left(\\dfrac{TC}{Q}\\right) = \\dfrac{MC - AC}{Q}")} olduğu için AC'nin en düşük olduğu yerde MC = AC.`);
    }
    ciz();
  };

  // ================================================================ 11. hafta — optimizasyon: MR = MC, FOC/SOC
  G["optimizasyon"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Kâr maksimizasyonu: π′(Q) = 0 ve π″(Q) < 0", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    let q = 10;
    // P = 100 − 2Q, TC = 50 + 10Q + 0.5Q²
    const TR = (x) => 100 * x - 2 * x * x, TC = (x) => 50 + 10 * x + 0.5 * x * x, pi = (x) => TR(x) - TC(x);
    const MR = (x) => 100 - 4 * x, MC = (x) => 10 + x, dpi = (x) => MR(x) - MC(x);
    const g1 = Grafik(s1, Object.assign({ x: [0, 30], y: [-200, 900], xEtiket: "Q", yEtiket: "π(Q)", oran: 0.8, xAdim: 5 }, { yBicim: (y) => n(y, 0) }));
    const g2 = Grafik(s2, Object.assign({ x: [0, 30], y: [-20, 100], xEtiket: "Q", yEtiket: "MR, MC", oran: 0.8, xAdim: 5 }, { yBicim: (y) => n(y, 0) }));
    const ok = okuma(okumaKap);
    const t = g1.tutamac(q, pi(q), { etiket: "Q", surukle: (x) => { q = x; ciz(); } });
    function ciz() {
      g1.temizle(); g2.temizle();
      g1.cizgi(0, 0, 30, 0, { sinif: "r-5" });
      g1.egri(pi, { sinif: "r-4", etiket: "π", etiketX: 26 });
      g1.egri((x) => pi(q) + dpi(q) * (x - q), { sinif: "r-3", kesik: true, x0: Math.max(0, q - 6), x1: Math.min(30, q + 6) });
      g1.nokta(18, pi(18), { r: 3.5, sinif: "altin", etiket: "π′ = 0", dx: 6, dy: -8 });
      t.konum(q, pi(q));
      g2.egri(MR, { sinif: "r-1", etiket: "MR = 100 − 4Q", etiketX: 6 });
      g2.egri(MC, { sinif: "r-2", etiket: "MC = 10 + Q", etiketX: 24 });
      g2.nokta(18, 28, { sinif: "altin", etiket: "MR = MC", dx: 6, dy: -8 });
      g2.cizgi(q, -20, q, 100, { sinif: "r-5", kesik: true });
      ok.yaz([["π(Q)", n(pi(q), 2), "yesil"], ["π′(Q) = MR − MC", n(dpi(q), 2), dpi(q) > 0 ? "mavi" : "kirmizi"], ["π″(Q) = −4 − 1", "−5 (içbükey → maksimum)"], ["Optimum", "Q* = 18, P* = 64, π* = 760", "altin"]]);
      not(nt, dpi(q) > 0.05 ? `π′ > 0: kâr hâlâ artıyor (MR > MC) — üretimi artır. Teğetin eğimi pozitif.` : dpi(q) < -0.05 ? `π′ < 0: kâr azalıyor (MR < MC) — üretimi azalt.` : `π′ = 0: tepedesin. İkinci sıra koşul π″ = −5 < 0 olduğu için bu nokta bir <b>maksimumdur</b>.`, Math.abs(dpi(q)) <= 0.05 ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 12. hafta — Riemann toplamı ve belirli integral
  G["riemann"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Belirli integral: dikdörtgenleri incelt, alan yakınsasın" });
    let ifade = "3x^2 - 4x + 5", f = Ifade.derle(ifade), a = 0, b = 2, N = 4, tur = "orta";
    const g = Grafik(sahne, Object.assign({ x: [-1, 4], y: [-2, 30], xEtiket: "x", yEtiket: "f(x)" }, nokta));
    const ok = okuma(okumaKap);
    girisKutusu(kontrol, "f(x) =", ifade, (v) => { try { f = Ifade.derle(v); ifade = v; ciz(); } catch (e) { /* */ } });
    kaydirici(kontrol, { etiket: "Alt sınır a", min: -1, max: 3, adim: 0.5, deger: a, bicim: (v) => n(v, 1), degisti: (v) => { a = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Üst sınır b", min: 0, max: 4, adim: 0.5, deger: b, bicim: (v) => n(v, 1), degisti: (v) => { b = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Dikdörtgen sayısı n", min: 1, max: 100, adim: 1, deger: N, degisti: (v) => { N = v; ciz(); } });
    secici(kontrol, { etiket: "Yükseklik", secenekler: [["sol", "Sol uç"], ["orta", "Orta nokta"], ["sag", "Sağ uç"]], deger: tur, degisti: (v) => { tur = v; ciz(); } });
    function simpson(lo, hi) { const m = 400, hh = (hi - lo) / m; let s = f(lo) + f(hi); for (let k = 1; k < m; k++) s += f(lo + k * hh) * (k % 2 ? 4 : 2); return (s * hh) / 3; }
    function ciz() {
      g.temizle();
      if (!(b > a)) { not(nt, "Üst sınır alt sınırdan büyük olmalı.", "uyari"); return; }
      const dx = (b - a) / N;
      let toplam = 0;
      for (let k = 0; k < N; k++) {
        const xx = a + k * dx + (tur === "sol" ? 0 : tur === "sag" ? dx : dx / 2);
        const y = f(xx);
        toplam += y * dx;
        g.dikdortgen(a + k * dx, 0, a + (k + 1) * dx, y, { sinif: y >= 0 ? "a-tuketici" : "a-zarar" });
      }
      g.egri(f, { sinif: "r-1", etiket: "f(x)", etiketX: 3.4 });
      const kesin = simpson(a, b);
      ok.yaz([[`Riemann toplamı (n = ${N})`, n(toplam, 4), "mavi"], ["Kesin integral", n(kesin, 4), "yesil"], ["Hata", n(toplam - kesin, 4), "altin"]]);
      not(nt, `${tx("\\int_a^b f(x)\\,dx = \\lim_{n\\to\\infty}\\sum_{k=1}^{n} f(x_k)\\,\\Delta x")}. n arttıkça toplam kesin değere yaklaşır. Analizin temel teoremiyle kesin değer ilkel fonksiyondan hesaplanır: ${tx("\\int_a^b f\\,dx = F(b) - F(a)")}. Varsayılan örnek: ${tx("\\int_0^2 (3x^2 - 4x + 5)\\,dx = [x^3 - 2x^2 + 5x]_0^2 = 10")}. Eksenin altındaki alan (kırmızı) negatif sayılır.`);
    }
    ciz();
  };

  // ================================================================ 13. hafta — integralle tüketici ve üretici artığı
  G["artik-integral"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Doğrusal olmayan talepte artıklar: integral şart" });
    let A = 120;
    const g = Grafik(sahne, Object.assign({ x: [0, 12], y: [0, 140], xEtiket: "Q", yEtiket: "P", xAdim: 2 }, { yBicim: (y) => n(y, 0) }));
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Talep: P = A − Q², A", min: 80, max: 140, adim: 5, deger: A, degisti: (v) => { A = v; ciz(); } });
    function ciz() {
      g.temizle();
      const D = (q) => A - q * q, S = (q) => 20 + 3 * q;
      const q = (-3 + Math.sqrt(9 + 4 * (A - 20))) / 2, p = S(q);
      g.alan(D, () => p, 0, q, { sinif: "a-tuketici", etiket: "TA", etiketOran: 0.3 });
      g.alan(() => p, S, 0, q, { sinif: "a-uretici", etiket: "ÜA", etiketOran: 0.3 });
      g.egri(D, { sinif: "r-1", etiket: `D: P = ${A} − Q²`, etiketX: 2.2, etiketDy: -10 });
      g.egri(S, { sinif: "r-2", etiket: "S: P = 20 + 3Q", etiketX: 9.6, etiketDy: 20 });
      g.kilavuz(q, p); g.nokta(q, p, { etiket: "denge" });
      const TA = A * q - q ** 3 / 3 - p * q, UA = p * q - (20 * q + 1.5 * q * q);
      ok.yaz([["Q*", n(q, 3)], ["P*", n(p, 3)], ["Tüketici artığı", n(TA, 2), "mavi"], ["Üretici artığı", n(UA, 2), "kirmizi"]]);
      not(nt, `${tx("TA = \\int_0^{Q^*} D(Q)\\,dQ - P^*Q^* = \\int_0^{" + n(q, 2) + "} (" + A + " - Q^2)\\,dQ - " + n(p * q, 1))} = ${n(TA, 1)}. Talep doğrusal olmadığı için üçgen formülü işe yaramaz; alanı integral verir. Üretici tarafı doğrusal: ${tx("ÜA = P^*Q^* - \\int_0^{Q^*}(20 + 3Q)\\,dQ = 1.5\\,Q^{*2}")} = ${n(UA, 1)}.`);
    }
    ciz();
  };

  // ================================================================ 13. hafta — Lorenz eğrisi L(x) = x^k ve Gini
  G["lorenz-integral"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Gini = 2∫₀¹ [x − L(x)] dx" });
    let k = 2;
    const g = Grafik(sahne, Object.assign({ x: [0, 1], y: [0, 1], xEtiket: "nüfus payı x", yEtiket: "gelir payı L(x)", xAdim: 0.2, yAdim: 0.2 }, nokta));
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "L(x) = xᵏ, k", min: 1, max: 6, adim: 0.1, deger: k, bicim: (v) => n(v, 1), degisti: (v) => { k = v; ciz(); } });
    function ciz() {
      g.temizle();
      const L = (x) => x ** k;
      g.alan((x) => x, L, 0, 1, { sinif: "a-olu", etiket: "A", etiketX: 0.62, etiketY: 0.5 });
      g.cizgi(0, 0, 1, 1, { sinif: "r-5", kesik: true });
      g.egri(L, { sinif: "r-1", etiket: "L(x)", etiketX: 0.86 });
      const gini = (k - 1) / (k + 1);
      ok.yaz([["∫₀¹ L(x) dx = 1/(k+1)", n(1 / (k + 1), 4)], ["Gini = 1 − 2/(k+1)", n(gini, 4), "altin"], ["En yoksul %50'nin payı", `%${n(0.5 ** k * 100, 1)}`, "mavi"]]);
      not(nt, `${tx("G = 2\\int_0^1 [x - x^k]\\,dx = 2\\left(\\tfrac12 - \\tfrac{1}{k+1}\\right) = \\dfrac{k-1}{k+1}")}. k = 2 için G = 1/3. k = 1 tam eşitlik (G = 0); k büyüdükçe eğri sarkar, G 1'e yaklaşır.`);
    }
    ciz();
  };

  // ================================================================ 14. hafta — gelir akışının bugünkü değeri
  G["gelir-akisi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Sürekli gelir akışının bugünkü değeri" });
    let R = 1000, r = 8, T = 20;
    const g = Grafik(sahne, Object.assign({ x: [0, 50], y: [0, 1100], xEtiket: "zaman t (yıl)", yEtiket: "R e^(−rt)", xAdim: 10 }, { yBicim: (y) => n(y, 0) }));
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Yıllık akış R", min: 100, max: 1000, adim: 50, deger: R, degisti: (v) => { R = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Sürekli faiz r", min: 1, max: 20, adim: 0.5, deger: r, bicim: (v) => `%${n(v, 1)}`, degisti: (v) => { r = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Süre T", min: 1, max: 50, adim: 1, deger: T, bicim: (v) => `${v} yıl`, degisti: (v) => { T = v; ciz(); } });
    function ciz() {
      g.temizle();
      const k = r / 100, f = (t) => R * Math.exp(-k * t);
      g.alan(f, 0, 0, T, { sinif: "a-vergi", etiket: "PV", etiketOran: 0.3 });
      g.egri(() => R, { sinif: "r-5", kesik: true, etiket: "nominal akış R", etiketX: 38, etiketDy: -6 });
      g.egri(f, { sinif: "r-1", etiket: "iskontolu akış", etiketX: 30 });
      const PV = R * (1 - Math.exp(-k * T)) / k, sonsuz = R / k;
      ok.yaz([["PV = R(1 − e^{−rT})/r", nTL(PV), "yesil"], ["Toplam nominal gelir R·T", nTL(R * T)], ["T → ∞: R/r", nTL(sonsuz), "altin"]]);
      not(nt, `${tx("PV = \\int_0^T R\\,e^{-rt}\\,dt = R\\,\\dfrac{1 - e^{-rT}}{r}")}. Yeşil alan bugünkü değerdir; uzak yıllardaki gelir iskonto yüzünden küçülür. Süre sonsuza giderse ${tx("PV \\to R/r")} = ${nTL(sonsuz)} (perpetüitenin sürekli karşılığı).`);
    }
    ciz();
  };

  // ================================================================ Ek konu — Leontief iki sektörlü model
  G["leontief"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Leontief girdi–çıktı modeli: x = (I − A)⁻¹ d" });
    let A = [[0.2, 0.3], [0.4, 0.1]], d = [100, 200];
    const sonuc = el("div", { class: "metin", style: "padding:10px 14px;font-size:1rem" });
    sahne.append(sonuc);
    const ok = okuma(okumaKap);
    const ad = ["Tarım", "Sanayi"];
    [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([i, j]) => kaydirici(kontrol, { etiket: `a${i + 1}${j + 1}: ${ad[j]}'in 1 birimi için ${ad[i]} girdisi`, min: 0, max: 0.6, adim: 0.05, deger: A[i][j], bicim: (v) => n(v, 2), degisti: (v) => { A[i][j] = v; ciz(); } }));
    kaydirici(kontrol, { etiket: `Nihai talep d₁ (${ad[0]})`, min: 0, max: 400, adim: 10, deger: d[0], degisti: (v) => { d[0] = v; ciz(); } });
    kaydirici(kontrol, { etiket: `Nihai talep d₂ (${ad[1]})`, min: 0, max: 400, adim: 10, deger: d[1], degisti: (v) => { d[1] = v; ciz(); } });
    function ciz() {
      const I_A = [[1 - A[0][0], -A[0][1]], [-A[1][0], 1 - A[1][1]]];
      const det = I_A[0][0] * I_A[1][1] - I_A[0][1] * I_A[1][0];
      if (Math.abs(det) < 1e-9) { not(nt, "det(I − A) = 0: matris tekil, tek çözüm yok.", "uyari"); return; }
      const inv = [[I_A[1][1] / det, -I_A[0][1] / det], [-I_A[1][0] / det, I_A[0][0] / det]];
      const x = [inv[0][0] * d[0] + inv[0][1] * d[1], inv[1][0] * d[0] + inv[1][1] * d[1]];
      const m = (M) => `\\begin{bmatrix}${n(M[0][0], 3)} & ${n(M[0][1], 3)}\\\\ ${n(M[1][0], 3)} & ${n(M[1][1], 3)}\\end{bmatrix}`;
      sonuc.innerHTML = formul(`I - A = ${m(I_A)},\\quad (I - A)^{-1} = ${m(inv)}`, true) + formul(`x = (I-A)^{-1}d = ${m(inv)}\\begin{bmatrix}${d[0]}\\\\ ${d[1]}\\end{bmatrix} = \\begin{bmatrix}${n(x[0], 2)}\\\\ ${n(x[1], 2)}\\end{bmatrix}`, true);
      const gecerli = x[0] >= 0 && x[1] >= 0;
      ok.yaz([["det(I − A)", n(det, 4), "altin"], [`Toplam üretim x₁ (${ad[0]})`, n(x[0], 2), "mavi"], [`Toplam üretim x₂ (${ad[1]})`, n(x[1], 2), "kirmizi"]]);
      not(nt, gecerli ? `Nihai talebi karşılamak için sektörlerin, birbirine sattıkları ara malları da üretmesi gerekir: toplam üretim nihai talepten büyüktür. (I − A)⁻¹ matrisinin her sütunu, o sektöre 1 birim ek nihai talep geldiğinde bütün sektörlerin üretiminin ne kadar artacağını gösterir (çarpanlar).` : "Negatif üretim çıktı: girdi katsayıları çok büyük, ekonomi üretken değil (her sektör ürettiğinden fazlasını tüketiyor).", gecerli ? "" : "uyari");
    }
    ciz();
  };
})();
