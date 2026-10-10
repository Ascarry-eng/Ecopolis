// gorsel_r.js — araştırma yöntemleri ve istatistik görselleri: RStudio panelleri, normal dağılım, merkezi limit
// teoremi, güven aralığı simülasyonu, hipotez testi, korelasyon, en küçük kareler regresyonu.
(function () {
  "use strict";
  const { el, formul, Grafik } = ECO;
  const { cerceve, kaydirici, secici, okuma, tus } = ECO.Gorsel;
  const G = ECO.gorseller;
  const n = (x, d = 2) => (x == null || !isFinite(x) ? "—" : (Math.round(x * 10 ** d) / 10 ** d).toString());
  const tx = (s) => formul(s, false);
  const not = (k, m, tur) => { k.className = "sekil-not" + (tur ? " " + tur : ""); k.innerHTML = m; };
  const kod = (s) => `<code style="font-family:var(--f-kod);font-size:.92em;background:var(--zemin-2);padding:.1em .35em;border-radius:3px">${s}</code>`;

  // ---------------------------------------------------------------- istatistik yardımcıları
  function erf(x) {   // Abramowitz–Stegun 7.1.26 (hata < 1.5e-7)
    const s = Math.sign(x); x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const pnorm = (x, m = 0, s = 1) => 0.5 * (1 + erf((x - m) / (s * Math.SQRT2)));
  const dnorm = (x, m = 0, s = 1) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
  function qnorm(p) {   // Acklam yaklaşımı
    const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
    const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
    const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
    const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
    const pl = 0.02425;
    if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
    if (p > 1 - pl) return -qnorm(1 - p);
    const q = p - 0.5, r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  // Student t dağılımı (sayısal integral) — p-değerleri için yeterli doğruluk
  function lgamma(z) { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z); z -= 1; let x = c[0]; for (let i = 1; i < g + 2; i++) x += c[i] / (z + i); const t = z + g + 0.5; return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x); }
  const dt = (x, v) => Math.exp(lgamma((v + 1) / 2) - lgamma(v / 2) - 0.5 * Math.log(v * Math.PI) - ((v + 1) / 2) * Math.log(1 + (x * x) / v));
  function pt(x, v) { if (v > 200) return pnorm(x); const a = 0, b = Math.abs(x), m = 400, h = (b - a) / m; let s = dt(a, v) + dt(b, v); for (let i = 1; i < m; i++) s += dt(a + i * h, v) * (i % 2 ? 4 : 2); const alan = (s * h) / 3; return x >= 0 ? 0.5 + alan : 0.5 - alan; }
  function qt(p, v) { let lo = -50, hi = 50; for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (pt(m, v) < p) lo = m; else hi = m; } return (lo + hi) / 2; }
  ECO.istat = { pnorm, dnorm, qnorm, pt, qt, dt };

  // tohumlanabilir rastgele sayı (simülasyonlar tekrar edilebilsin)
  function rasgele(tohum) { let s = tohum >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  const normalUret = (r) => () => { let u = 0, v = 0; while (u === 0) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

  // ================================================================ RStudio'nun dört paneli
  G["rstudio-paneller"] = (kap) => {
    const { sahne, not: nt } = cerceve(kap, { baslik: "RStudio'nun dört paneli: birine dokun" });
    const PANEL = {
      kaynak: ["Source (kaynak/betik)", "Kodunu yazdığın ve <b>kaydettiğin</b> yer (.R dosyaları). Bir satırı ya da seçimi çalıştırmak için <b>Ctrl+Enter</b> (Mac: Cmd+Enter); bütün betik için Ctrl+Shift+Enter. Ödevlerini her zaman burada yaz ve kaydet — konsola yazdığın kaybolur."],
      konsol: ["Console (konsol)", "R'ın kendisi: komut yazar, Enter'a basarsın, sonucu hemen görürsün. <b>&gt;</b> işareti R'ın komut beklediğini, <b>+</b> komutun tamamlanmadığını (eksik parantez!) gösterir. Takılırsa <b>Esc</b>. Önceki komutlar için ↑ tuşu."],
      ortam: ["Environment / History", "Oluşturduğun bütün nesneler (vektörler, veri çerçeveleri, modeller) burada listelenir. Bir veri çerçevesine tıklarsan tablo olarak açılır (View). History sekmesi çalıştırdığın komutların geçmişidir."],
      dosya: ["Files / Plots / Packages / Help", "<b>Files:</b> çalışma klasöründeki dosyalar. <b>Plots:</b> çizdiğin grafikler (Export ile kaydet). <b>Packages:</b> kurulu paketler. <b>Help:</b> ?mean gibi yardım sayfaları. <b>Viewer:</b> R Markdown/Quarto çıktıları."],
    };
    const svg = el("svg", { class: "grafik", viewBox: "0 0 400 260", role: "group", "aria-label": "RStudio paneli şeması" });
    const kutu = (k, x, y, w, h, alt) => {
      const g = el("g", { tabindex: "0", role: "button", style: "cursor:pointer", "aria-label": PANEL[k][0] });
      const r = el("rect", { x, y, width: w, height: h, rx: 4, style: "fill:var(--kart);stroke:var(--damar-koyu);stroke-width:1.5" });
      g.append(r, el("rect", { x, y, width: w, height: 18, rx: 4, style: "fill:var(--zemin-3)" }),
        el("text", { x: x + 8, y: y + 13, style: "font:700 11px var(--f-arayuz);fill:var(--murekkep-2)", text: PANEL[k][0] }));
      alt.forEach((s, i) => g.append(el("text", { x: x + 10, y: y + 36 + i * 15, style: "font:400 10.5px var(--f-kod);fill:var(--murekkep-3)", text: s })));
      const sec = () => { svg.querySelectorAll("g rect:first-child").forEach((q) => (q.style.stroke = "var(--damar-koyu)")); r.style.stroke = "var(--mavi)"; r.style.strokeWidth = "3"; not(nt, `<b>${PANEL[k][0]}:</b> ${PANEL[k][1]}`); };
      g.addEventListener("click", sec);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sec(); } });
      svg.append(g);
    };
    kutu("kaynak", 4, 4, 236, 132, ["# odev1.R", "veri <- read.csv(\"anket.csv\")", "summary(veri$not)", "hist(veri$not)"]);
    kutu("konsol", 4, 140, 236, 116, ["> 2 + 2", "[1] 4", "> mean(c(70, 85, 90))", "[1] 81.66667", "> "]);
    kutu("ortam", 244, 4, 152, 132, ["veri   120 obs. 6 var", "x      num [1:4]", "model  List of 12"]);
    kutu("dosya", 244, 140, 152, 116, ["📁 odev1.R", "📁 anket.csv", "(grafikler burada)"]);
    sahne.append(svg);
    not(nt, "Bir panele dokun. Varsayılan düzende sol üst betik, sol alt konsol, sağ üst ortam, sağ alt dosyalar/grafikler/yardımdır (Tools → Global Options → Pane Layout'tan değiştirilebilir).");
  };

  // ================================================================ normal dağılım
  G["normal-dagilim"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Normal dağılım: aralığın olasılığı" });
    let mu = 70, sd = 10, a = 60, b = 80;
    const g = Grafik(sahne, { x: [20, 120], y: [0, 0.045], xEtiket: "x (ör. sınav notu)", yEtiket: "yoğunluk", yBicim: (y) => n(y, 3), xAdim: 10 });
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Ortalama μ", min: 40, max: 100, adim: 1, deger: mu, degisti: (v) => { mu = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Standart sapma σ", min: 3, max: 25, adim: 0.5, deger: sd, bicim: (v) => n(v, 1), degisti: (v) => { sd = v; ciz(); } });
    secici(kontrol, { etiket: "Hazır aralık", secenekler: [["1", "μ ± 1σ"], ["2", "μ ± 2σ"], ["3", "μ ± 3σ"]], deger: "1", degisti: (v) => { a = mu - v * sd; b = mu + v * sd; ta.konum(a, 0); tb.konum(b, 0); ciz(); } });
    const ta = g.tutamac(a, 0, { etiket: "alt sınır a", surukle: (x) => { a = Math.min(x, b - 0.5); ciz(); } });
    const tb = g.tutamac(b, 0, { etiket: "üst sınır b", sinif: "kirmizi", surukle: (x) => { b = Math.max(x, a + 0.5); ciz(); } });
    function ciz() {
      g.sinirlar({ y: [0, dnorm(mu, mu, sd) * 1.15] });
      g.temizle();
      const f = (x) => dnorm(x, mu, sd);
      g.alan(f, 0, a, b, { sinif: "a-tuketici" });
      g.egri(f, { sinif: "r-1" });
      g.cizgi(mu, 0, mu, f(mu), { sinif: "r-5", kesik: true });
      ta.konum(a, 0); tb.konum(b, 0);
      const p = pnorm(b, mu, sd) - pnorm(a, mu, sd);
      ok.yaz([["P(a < X < b)", n(p, 4), "mavi"], ["z(a) = (a − μ)/σ", n((a - mu) / sd, 2)], ["z(b)", n((b - mu) / sd, 2)], ["P(X > b)", n(1 - pnorm(b, mu, sd), 4), "kirmizi"]]);
      not(nt, `R'da: ${kod(`pnorm(${n(b, 1)}, mean = ${mu}, sd = ${sd}) - pnorm(${n(a, 1)}, mean = ${mu}, sd = ${sd})`)} = ${n(p, 4)}. <b>68–95–99,7 kuralı:</b> verinin yaklaşık %68'i μ ± 1σ, %95'i μ ± 2σ, %99,7'si μ ± 3σ içindedir. z puanı bir değerin ortalamadan kaç standart sapma uzakta olduğunu söyler.`);
    }
    ciz();
  };

  // ================================================================ merkezi limit teoremi
  G["mlt"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Merkezi limit teoremi: örnek ortalamalarının dağılımı", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    let tur = "carpik", N = 5, ortalamalar = [], r = rasgele(42), nrm = normalUret(r);
    const POP = {
      tekduze: { ad: "Tekdüze (0–10)", uret: () => r() * 10, mu: 5, sd: Math.sqrt(100 / 12), yog: (x) => (x >= 0 && x <= 10 ? 0.1 : 0) },
      carpik: { ad: "Sağa çarpık (üstel, ort. 3)", uret: () => -3 * Math.log(1 - r()), mu: 3, sd: 3, yog: (x) => (x >= 0 ? Math.exp(-x / 3) / 3 : 0) },
      iki: { ad: "İki tepeli", uret: () => (r() < 0.5 ? 2.5 : 7.5) + nrm() * 0.9, mu: 5, sd: Math.sqrt(0.81 + 6.25), yog: (x) => 0.5 * dnorm(x, 2.5, 0.9) + 0.5 * dnorm(x, 7.5, 0.9) },
    };
    const g1 = Grafik(s1, { x: [0, 15], y: [0, 0.45], xEtiket: "anakütle", yEtiket: "yoğunluk", oran: 0.75, yBicim: (y) => n(y, 2) });
    const g2 = Grafik(s2, { x: [0, 15], y: [0, 1], xEtiket: "örnek ortalaması x̄", yEtiket: "yoğunluk", oran: 0.75, yBicim: (y) => n(y, 2) });
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Anakütle", secenekler: Object.entries(POP).map(([k, v]) => [k, v.ad]), deger: tur, degisti: (v) => { tur = v; ortalamalar = []; ciz(); } });
    kaydirici(kontrol, { etiket: "Örneklem büyüklüğü n", min: 1, max: 60, adim: 1, deger: N, degisti: (v) => { N = v; ortalamalar = []; ciz(); } });
    tus(kontrol, "1 örneklem çek", () => cek(1));
    tus(kontrol, "100 örneklem çek", () => cek(100));
    tus(kontrol, "1000 örneklem çek", () => cek(1000));
    function cek(k) { const P = POP[tur]; for (let j = 0; j < k; j++) { let s = 0; for (let i = 0; i < N; i++) s += P.uret(); ortalamalar.push(s / N); } ciz(); }
    function ciz() {
      const P = POP[tur];
      g1.temizle(); g2.temizle();
      g1.egri(P.yog, { sinif: "r-2", adim: 300 });
      g1.cizgi(P.mu, 0, P.mu, 0.45, { sinif: "r-5", kesik: true });
      const se = P.sd / Math.sqrt(N);
      const tepe = dnorm(P.mu, P.mu, se);
      g2.sinirlar({ y: [0, Math.max(0.3, tepe * 1.25)] });
      if (ortalamalar.length) {
        const gen = 0.25, kutu = {};
        for (const m of ortalamalar) { const k = Math.floor(m / gen); kutu[k] = (kutu[k] || 0) + 1; }
        for (const [k, c] of Object.entries(kutu)) g2.dikdortgen(+k * gen, 0, (+k + 1) * gen, c / (ortalamalar.length * gen), { sinif: "a-tuketici" });
      }
      g2.egri((x) => dnorm(x, P.mu, se), { sinif: "r-1", adim: 300 });
      const ort = ortalamalar.reduce((s, x) => s + x, 0) / (ortalamalar.length || 1);
      const ss = ortalamalar.length > 1 ? Math.sqrt(ortalamalar.reduce((s, x) => s + (x - ort) ** 2, 0) / (ortalamalar.length - 1)) : NaN;
      ok.yaz([["Çekilen örneklem", String(ortalamalar.length)], ["x̄'lerin ortalaması (μ = " + n(P.mu, 2) + ")", ortalamalar.length ? n(ort, 3) : "—", "mavi"], ["x̄'lerin std. sapması", n(ss, 3), "altin"], ["Kuram: σ/√n (standart hata)", n(se, 3), "yesil"]]);
      not(nt, `Anakütle ${tur === "carpik" ? "çarpık" : tur === "iki" ? "iki tepeli" : "tekdüze"} olsa bile, n büyüdükçe örnek ortalamalarının dağılımı <b>normale</b> yaklaşır ve yayılımı ${tx("\\sigma/\\sqrt{n}")} kadar daralır. n'yi 1'den 30'a çıkarıp karşılaştır. R'da aynı deney: ${kod(`replicate(1000, mean(rexp(${N}, rate = 1/3)))`)}`);
    }
    ciz();
  };

  // ================================================================ güven aralığı simülasyonu
  G["guven-araligi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "100 ayrı örneklem, 100 ayrı güven aralığı" });
    let duzey = 95, N = 25, tohum = 7;
    const mu = 50, sigma = 10;
    const g = Grafik(sahne, { x: [38, 62], y: [0, 101], xEtiket: "değer", yEtiket: "örneklem no", xAdim: 4, yAdim: 20, oran: 1.1, yBicim: (y) => n(y, 0) });
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Güven düzeyi", secenekler: [[90, "%90"], [95, "%95"], [99, "%99"]], deger: 95, degisti: (v) => { duzey = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Örneklem büyüklüğü n", min: 5, max: 200, adim: 5, deger: N, degisti: (v) => { N = v; ciz(); } });
    tus(kontrol, "Yeni 100 örneklem", () => { tohum++; ciz(); });
    function ciz() {
      g.temizle();
      const r = rasgele(tohum * 7919), z = normalUret(r);
      const tkrt = qt(1 - (1 - duzey / 100) / 2, N - 1);
      let iceren = 0;
      for (let i = 0; i < 100; i++) {
        let s = 0, s2 = 0;
        const x = []; for (let j = 0; j < N; j++) { const v = mu + sigma * z(); x.push(v); s += v; }
        const ort = s / N; for (const v of x) s2 += (v - ort) ** 2;
        const sd = Math.sqrt(s2 / (N - 1)), pay = tkrt * sd / Math.sqrt(N);
        const icinde = ort - pay <= mu && mu <= ort + pay;
        if (icinde) iceren++;
        g.cizgi(ort - pay, i + 1, ort + pay, i + 1, { sinif: icinde ? "r-1" : "r-2", kalin: icinde ? 1.4 : 2.4 });
      }
      g.cizgi(mu, 0, mu, 101, { sinif: "r-3", kalin: 2 });
      g.etiket(mu, 100, "gerçek μ = 50", { dx: 4, dy: -4, sinif: "r-3" });
      ok.yaz([["μ'yü içeren aralık", `${iceren} / 100`, iceren >= duzey - 5 ? "yesil" : "kirmizi"], ["Beklenen", `≈ ${duzey}`], ["t kritik değeri", n(tkrt, 3), "altin"]]);
      not(nt, `Her yatay çizgi bir örneklemden hesaplanan ${tx("\\bar x \\pm t^{*}\\, s/\\sqrt{n}")} aralığıdır. %${duzey} güven, <b>yöntemin</b> uzun vadede aralıkların yaklaşık %${duzey}'inde μ'yü yakalaması demektir — tek bir aralığın μ'yü %${duzey} olasılıkla içerdiği değil (μ sabittir; ya içindedir ya değildir). Kırmızılar ıskalayanlar. Güven düzeyini artırınca aralıklar genişler; n'yi artırınca daralır. R'da: ${kod("t.test(x, conf.level = 0.95)$conf.int")}`);
    }
    ciz();
  };

  // ================================================================ hipotez testi: p-değeri
  G["hipotez-testi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: "Tek örneklem t-testi: test istatistiği ve p-değeri" });
    let xbar = 72.5, mu0 = 70, s = 8, N = 30, yon = "iki", alfa = 0.05;
    const g = Grafik(sahne, { x: [-4.5, 4.5], y: [0, 0.45], xEtiket: "t", yEtiket: "yoğunluk", xAdim: 1, yBicim: (y) => n(y, 2), xBicim: (x) => n(x, 0) });
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Örneklem ortalaması x̄", min: 64, max: 76, adim: 0.1, deger: xbar, bicim: (v) => n(v, 1), degisti: (v) => { xbar = v; ciz(); } });
    kaydirici(kontrol, { etiket: "H₀ altındaki ortalama μ₀", min: 65, max: 75, adim: 0.5, deger: mu0, bicim: (v) => n(v, 1), degisti: (v) => { mu0 = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Örneklem std. sapması s", min: 2, max: 20, adim: 0.5, deger: s, bicim: (v) => n(v, 1), degisti: (v) => { s = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Örneklem büyüklüğü n", min: 5, max: 200, adim: 1, deger: N, degisti: (v) => { N = v; ciz(); } });
    secici(kontrol, { etiket: "H₁", secenekler: [["iki", "μ ≠ μ₀"], ["buyuk", "μ > μ₀"], ["kucuk", "μ < μ₀"]], deger: yon, degisti: (v) => { yon = v; ciz(); } });
    secici(kontrol, { etiket: "α", secenekler: [[0.1, "0.10"], [0.05, "0.05"], [0.01, "0.01"]], deger: 0.05, degisti: (v) => { alfa = v; ciz(); } });
    function ciz() {
      g.temizle();
      const v = N - 1, se = s / Math.sqrt(N), t = (xbar - mu0) / se;
      const f = (x) => dt(x, v);
      const tc = Math.min(4.5, Math.max(-4.5, t));
      if (yon === "iki") { g.alan(f, 0, Math.abs(tc), 4.5, { sinif: "a-uretici" }); g.alan(f, 0, -4.5, -Math.abs(tc), { sinif: "a-uretici" }); }
      else if (yon === "buyuk") g.alan(f, 0, tc, 4.5, { sinif: "a-uretici" });
      else g.alan(f, 0, -4.5, tc, { sinif: "a-uretici" });
      // red bölgesi sınırları
      const kr = yon === "iki" ? qt(1 - alfa / 2, v) : qt(1 - alfa, v);
      for (const k of yon === "iki" ? [-kr, kr] : yon === "buyuk" ? [kr] : [-kr]) g.cizgi(k, 0, k, 0.42, { sinif: "r-3", kesik: true });
      g.egri(f, { sinif: "r-1", adim: 300 });
      g.cizgi(tc, 0, tc, 0.42, { sinif: "r-2", kalin: 2.5 });
      g.etiket(tc, 0.42, `t = ${n(t, 2)}`, { dx: 4, dy: 4, sinif: "r-2" });
      const p = yon === "iki" ? 2 * (1 - pt(Math.abs(t), v)) : yon === "buyuk" ? 1 - pt(t, v) : pt(t, v);
      const red = p < alfa;
      ok.yaz([["Standart hata s/√n", n(se, 3)], ["Test istatistiği t", n(t, 3), "kirmizi"], ["p-değeri", p < 0.0001 ? "< 0.0001" : n(p, 4), red ? "yesil" : "altin"], ["Karar (α = " + alfa + ")", red ? "H₀ reddedilir" : "H₀ reddedilemez", red ? "yesil" : ""]]);
      not(nt, `${tx("t = \\dfrac{\\bar x - \\mu_0}{s/\\sqrt{n}}")} = ${n(t, 3)}, serbestlik derecesi ${v}. <b>p-değeri</b>, H₀ doğruyken en az bu kadar uç bir sonuç görme olasılığıdır (kırmızı alan). p < α ise H₀ reddedilir. Dikkat: "reddedilemez", H₀'ın doğru olduğu anlamına gelmez; yalnızca kanıt yetersizdir. n'yi büyütünce aynı farkın nasıl "anlamlı" hâle geldiğine bak. R'da: ${kod(`t.test(x, mu = ${mu0}${yon === "iki" ? "" : `, alternative = "${yon === "buyuk" ? "greater" : "less"}"`})`)}`, red ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ korelasyon ve regresyon (ortak çekirdek)
  function noktaGorseli(kap, ayar, tur) {
    const reg = tur === "regresyon";
    const { sahne, kontrol, okumaKap, not: nt } = cerceve(kap, { baslik: reg ? "En küçük kareler: noktaları sürükle, doğruyu izle" : "Korelasyon katsayısı: noktaları sürükle" });
    const HAZIR = {
      pozitif: [[1, 2.2], [2, 3.1], [3, 3.4], [4, 5.2], [5, 4.9], [6, 6.8], [7, 7.1], [8, 8.4], [9, 8.6], [10, 9.9]],
      negatif: [[1, 9.4], [2, 8.8], [3, 7.2], [4, 7.4], [5, 5.6], [6, 5.1], [7, 3.6], [8, 3.9], [9, 2.2], [10, 1.4]],
      yok: [[1, 5.2], [2, 8.1], [3, 2.4], [4, 6.6], [5, 4.1], [6, 9.0], [7, 3.2], [8, 7.3], [9, 1.8], [10, 5.9]],
      aykiri: [[1, 2.1], [2, 2.9], [3, 3.2], [4, 4.1], [5, 4.8], [6, 6.1], [7, 6.6], [8, 7.9], [9, 8.4], [10, 1.0]],
      egrisel: [[1, 9.5], [2, 6.3], [3, 3.9], [4, 2.2], [5, 1.4], [6, 1.5], [7, 2.3], [8, 4.0], [9, 6.2], [10, 9.3]],
    };
    let P = (HAZIR[ayar.hazir] || HAZIR.pozitif).map((p) => p.slice());
    let kendi = { a: 1, b: 0.5 }, kendiAcik = false;
    const g = Grafik(sahne, { x: [0, 11], y: [0, 11], xEtiket: reg ? "x (ör. çalışma saati)" : "x", yEtiket: reg ? "y (ör. not)" : "y", xAdim: 1, yAdim: 1 });
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Hazır veri", secenekler: [["pozitif", "Pozitif"], ["negatif", "Negatif"], ["yok", "İlişkisiz"], ["aykiri", "Aykırı değerli"], ["egrisel", "Eğrisel"]], deger: ayar.hazir || "pozitif", degisti: (v) => { P = HAZIR[v].map((p) => p.slice()); tlar.forEach((t, i) => t.konum(P[i][0], P[i][1])); ciz(); } });
    let kk = [];
    if (reg) {
      secici(kontrol, { etiket: "Kendi doğrunu dene", secenekler: [["hayir", "Kapalı"], ["evet", "Açık"]], deger: "hayir", degisti: (v) => { kendiAcik = v === "evet"; kk.forEach((k) => (k.kutu.hidden = !kendiAcik)); ciz(); } });
      kk = [kaydirici(kontrol, { etiket: "senin kesişimin", min: -3, max: 10, adim: 0.1, deger: 1, bicim: (v) => n(v, 1), degisti: (v) => { kendi.a = v; ciz(); } }),
        kaydirici(kontrol, { etiket: "senin eğimin", min: -1.5, max: 1.5, adim: 0.05, deger: 0.5, bicim: (v) => n(v, 2), degisti: (v) => { kendi.b = v; ciz(); } })];
      kk.forEach((k) => (k.kutu.hidden = true));
    }
    const tlar = P.map((p, i) => g.tutamac(p[0], p[1], { etiket: `nokta ${i + 1}`, surukle: (x, y) => { P[i] = [x, y]; ciz(); } }));
    const ozet = () => {
      const N = P.length, mx = P.reduce((s, p) => s + p[0], 0) / N, my = P.reduce((s, p) => s + p[1], 0) / N;
      let sxy = 0, sxx = 0, syy = 0; for (const [x, y] of P) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2; }
      const b = sxy / sxx, a = my - b * mx, r = sxy / Math.sqrt(sxx * syy);
      // Spearman: sıraların Pearson korelasyonu
      const sira = (v) => { const s = v.map((x, i) => [x, i]).sort((p, q) => p[0] - q[0]); const rk = new Array(v.length); s.forEach(([, i], k) => (rk[i] = k + 1)); return rk; };
      const rx = sira(P.map((p) => p[0])), ry = sira(P.map((p) => p[1]));
      const mr = (N + 1) / 2; let a1 = 0, a2 = 0, a3 = 0; for (let i = 0; i < N; i++) { a1 += (rx[i] - mr) * (ry[i] - mr); a2 += (rx[i] - mr) ** 2; a3 += (ry[i] - mr) ** 2; }
      return { mx, my, b, a, r, rho: a1 / Math.sqrt(a2 * a3), syy };
    };
    function ciz() {
      g.temizle();
      const o = ozet();
      if (reg) {
        let sse = 0;
        for (const [x, y] of P) { const yh = o.a + o.b * x; sse += (y - yh) ** 2; g.cizgi(x, y, x, yh, { sinif: "r-2", kesik: true }); }
        g.egri((x) => o.a + o.b * x, { sinif: "r-1", etiket: `ŷ = ${n(o.a, 2)} + ${n(o.b, 2)}x`, etiketX: 7.5, etiketDy: -12 });
        let sseK = 0;
        if (kendiAcik) { for (const [x, y] of P) sseK += (y - (kendi.a + kendi.b * x)) ** 2; g.egri((x) => kendi.a + kendi.b * x, { sinif: "r-3", kesik: true, etiket: "senin doğrun", etiketX: 1, etiketDy: -8 }); }
        const r2 = 1 - sse / o.syy;
        ok.yaz([["Kesişim b₀", n(o.a, 3), "mavi"], ["Eğim b₁", n(o.b, 3), "mavi"], ["R²", n(r2, 3), "yesil"], [kendiAcik ? "Artık kareler: EKK / senin" : "Artık kareler toplamı", kendiAcik ? `${n(sse, 2)} / ${n(sseK, 2)}` : n(sse, 2), "kirmizi"]]);
        not(nt, `En küçük kareler (EKK/OLS) doğrusu, kırmızı kesikli dikey uzaklıkların (artıkların) <b>karelerinin toplamını</b> en küçük yapan doğrudur: ${tx("b_1 = \\dfrac{\\sum (x-\\bar x)(y-\\bar y)}{\\sum (x-\\bar x)^2}")}, ${tx("b_0 = \\bar y - b_1 \\bar x")}. Eğim: x bir birim artınca y'nin ortalama ne kadar değiştiği. R² açıklanan varyans payı. ${kendiAcik ? "Kendi doğrunla EKK'yi yenebilir misin? Yenemezsin — tanımı gereği en küçük o." : "\"Kendi doğrunu dene\"yi açıp EKK'yi yenmeye çalış."} Aykırı değerli veriyi seç: tek bir nokta doğruyu nasıl çekiyor? R'da: ${kod("lm(y ~ x)")}`);
      } else {
        g.cizgi(o.mx, 0, o.mx, 11, { sinif: "r-5", kesik: true }); g.cizgi(0, o.my, 11, o.my, { sinif: "r-5", kesik: true });
        const guc = Math.abs(o.r) >= 0.7 ? "güçlü" : Math.abs(o.r) >= 0.4 ? "orta" : Math.abs(o.r) >= 0.2 ? "zayıf" : "çok zayıf / yok";
        ok.yaz([["Pearson r", n(o.r, 3), o.r > 0 ? "mavi" : "kirmizi"], ["Spearman ρ (sıra)", n(o.rho, 3), "altin"], ["r²", n(o.r * o.r, 3)], ["Yorum", `${guc}${Math.abs(o.r) >= 0.2 ? (o.r > 0 ? " pozitif" : " negatif") : ""}`]]);
        not(nt, `Pearson r, <b>doğrusal</b> ilişkinin yönünü ve gücünü −1 ile +1 arasında ölçer. Eğrisel veriyi seç: güçlü bir ilişki olduğu hâlde r ≈ 0 çıkar. Aykırı değerli veriyi seç: tek nokta r'yi çok değiştirir; sıralara dayalı Spearman daha dayanıklıdır. Ve her zaman: <b>korelasyon nedensellik değildir.</b> R'da: ${kod("cor(x, y)")}, ${kod('cor(x, y, method = "spearman")')}, ${kod("cor.test(x, y)")}`);
      }
      tlar.forEach((t, i) => t.konum(P[i][0], P[i][1]));
    }
    ciz();
  }
  G["korelasyon"] = (kap, ayar) => noktaGorseli(kap, ayar, "korelasyon");
  G["regresyon"] = (kap, ayar) => noktaGorseli(kap, ayar, "regresyon");
})();
