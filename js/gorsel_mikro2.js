// gorsel_mikro2.js — mikroekonomi görselleri II (Colander 3., 9–23. bölümler).
(function () {
  "use strict";
  const { el, sayi, formul, Grafik, depo } = ECO;
  const { cerceve, kaydirici, secici, okuma, tus } = ECO.Gorsel;
  const Y = ECO.mikroYard;
  const G = ECO.gorseller;
  const tl = Y.tl;

  // ================================================================ 3. bölüm — dairesel akım
  G["dairesel-akis"] = (kap) => {
    const { sahne, kontrol, not } = cerceve(kap, { baslik: "Dairesel akım: mal ve faktörler bir yöne, para öbür yöne" });
    const svg = el("svg", { class: "grafik akis", viewBox: "0 0 380 320", role: "img", "aria-label": "Dairesel akım şeması" });
    const defs = el("defs");
    for (const [ad, renk] of [["m", "var(--mavi)"], ["k", "var(--kirmizi)"], ["a", "var(--altin)"]]) defs.append(el("marker", { id: "ak-" + ad, viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto" }, el("path", { d: "M0 0L10 5L0 10z", style: `fill:${renk}` })));
    svg.append(defs);
    const kutu = (x, y, w, h, yazi, alt) => {
      svg.append(el("rect", { x, y, width: w, height: h, rx: 3, style: "fill:var(--kart);stroke:var(--damar-koyu);stroke-width:1.2" }));
      svg.append(el("text", { x: x + w / 2, y: y + h / 2 + (alt ? -2 : 4), "text-anchor": "middle", style: "font:700 12.5px var(--f-arayuz);fill:var(--murekkep)", text: yazi }));
      if (alt) svg.append(el("text", { x: x + w / 2, y: y + h / 2 + 12, "text-anchor": "middle", style: "font:500 9.5px var(--f-arayuz);fill:var(--murekkep-3)", text: alt }));
    };
    const gruplar = { reel: el("g"), para: el("g"), devlet: el("g") };
    const ok = (grup, d, renk, yazi, tx, ty, hiza = "middle") => {
      gruplar[grup].append(el("path", { d, style: `fill:none;stroke:${renk === "m" ? "var(--mavi)" : renk === "k" ? "var(--kirmizi)" : "var(--altin)"};stroke-width:2;${grup === "devlet" ? "stroke-dasharray:5 4" : ""}`, "marker-end": `url(#ak-${renk})` }));
      gruplar[grup].append(el("text", { x: tx, y: ty, "text-anchor": hiza, style: `font:600 9.5px var(--f-arayuz);fill:${renk === "m" ? "var(--mavi)" : renk === "k" ? "var(--kirmizi)" : "var(--altin-yazi)"}`, text: yazi }));
    };
    // reel (iç, mavi)
    ok("reel", "M310 140V46H248", "m", "mal ve hizmet", 292, 70, "end");
    ok("reel", "M132 46H72V138", "m", "mal ve hizmet", 86, 70, "start");
    ok("reel", "M72 182V274H132", "m", "emek, sermaye", 86, 254, "start");
    ok("reel", "M248 274H310V182", "m", "emek, sermaye", 292, 254, "end");
    // para (dış, kırmızı)
    ok("para", "M40 140V24H132", "k", "harcama", 86, 18);
    ok("para", "M248 24H342V138", "k", "satış geliri", 296, 18);
    ok("para", "M342 182V296H248", "k", "ücret, kira, faiz, kâr", 296, 312);
    ok("para", "M132 296H40V184", "k", "gelir", 86, 312);
    // devlet
    ok("devlet", "M100 152H143", "a", "vergi", 121, 146);
    ok("devlet", "M143 170H100", "a", "transfer", 121, 183);
    ok("devlet", "M280 152H237", "a", "vergi", 259, 146);
    ok("devlet", "M237 170H280", "a", "kamu alımı", 259, 183);
    ok("devlet", "M190 140V58", "a", "kamu harcaması", 194, 104, "start");
    svg.append(gruplar.reel, gruplar.para, gruplar.devlet);
    kutu(134, 14, 112, 42, "Mal piyasası");
    kutu(134, 264, 112, 42, "Faktör piyasası");
    kutu(8, 140, 92, 42, "Haneler");
    kutu(280, 140, 92, 42, "İşletmeler");
    kutu(143, 140, 94, 42, "Devlet");
    sahne.append(svg);
    const aciklama = {
      hepsi: "İç döngü (mavi) gerçek akımdır: işletmeler mal ve hizmet üretip hanelere satar, haneler işletmelere emek ve sermaye verir. Dış döngü (kırmızı) bunların para karşılığıdır. Devlet (kesikli) iki tarafla da vergi, transfer ve harcamayla bağlantılıdır.",
      reel: "Gerçek akım: işletmeler mal piyasasında mal ve hizmet sunar; haneler faktör piyasasında emeklerini ve sermayelerini sunar.",
      para: "Para akımı: hanelerin harcaması işletmelerin satış geliridir; işletmelerin faktörlere ödediği ücret, kira, faiz ve kâr da hanelerin geliridir. Birinin harcaması ötekinin gelirdir.",
      devlet: "Devlet hanelerden ve işletmelerden vergi alır; hanelere transfer (emekli maaşı, sosyal yardım) yapar, mal piyasasından alım yapar. Hem hakem hem oyuncu.",
    };
    secici(kontrol, { etiket: "Göster", secenekler: [["hepsi", "Hepsi"], ["reel", "Mal ve faktör"], ["para", "Para"], ["devlet", "Devlet"]], deger: "hepsi", degisti: (v) => {
      for (const [k, g] of Object.entries(gruplar)) g.style.opacity = v === "hepsi" || v === k ? "1" : "0.12";
      Y.notYaz(not, aciklama[v]);
    } });
    Y.notYaz(not, aciklama.hepsi);
  };

  // ================================================================ 9. bölüm — döviz piyasası
  G["doviz-piyasasi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Döviz piyasası: doların fiyatı (kur) neden değişir?" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Dolar miktarı", yEtiket: "Kur (TL / $, temsili)" });
    const a0 = 90, b = 0.8, c0 = 10, d = 0.8;
    let dt = 0, ds = 0, son = "";
    const ok = okuma(okumaKap);
    const OLAY = [
      ["Merkez bankası faizi artırır", 0, +14, "Faiz artınca TL varlıklar cazipleşir: yabancı yatırımcı dolar getirip TL'ye çevirir — <b>dolar arzı artar</b>. Kur düşer: <b>TL değer kazanır</b> (appreciation)."],
      ["İhracat artar", 0, +12, "İhracatçılar kazandıkları dolarları bozdurur: dolar arzı artar, kur düşer."],
      ["Turizm geliri artar", 0, +10, "Yabancı turistler döviz getirir: dolar arzı artar, kur düşer."],
      ["Enerji ithalatının faturası büyür", +14, 0, "İthalatçılar daha çok dolar alır: <b>dolar talebi artar</b>. Kur yükselir: <b>TL değer kaybeder</b> (depreciation)."],
      ["Haneler dolara kaçar", +16, 0, "Yerleşikler tasarruflarını dolara çevirir (dolarizasyon): dolar talebi artar, kur yükselir."],
      ["Türkiye'de enflasyon yükselir", +10, -8, "Yerli mallar pahalanır: ithalat cazipleşir (dolar talebi ↑), ihracat zorlaşır (dolar arzı ↓). Kur yükselir."],
    ];
    const tuslar = el("div", { class: "secici" }, el("span", { class: "secici-ad", text: "Bir olay seç:" }));
    for (const [ad, x, y, m] of OLAY) tuslar.append(el("button", { type: "button", "aria-checked": "false", text: ad, onclick: (e) => { dt = x; ds = y; son = m; tuslar.querySelectorAll("button").forEach((t) => t.setAttribute("aria-checked", String(t === e.target))); ciz(); } }));
    tuslar.append(el("button", { type: "button", text: "Sıfırla", onclick: () => { dt = ds = 0; son = ""; tuslar.querySelectorAll("button").forEach((t) => t.setAttribute("aria-checked", "false")); ciz(); } }));
    kontrol.append(tuslar);
    function ciz() {
      g.temizle();
      const a = a0 + dt, c = c0 - ds;
      const E0 = Y.kes(a0, b, c0, d), E1 = Y.kes(a, b, c, d);
      if (dt) g.egri(Y.talep(a0, b), { sinif: "r-1 soluk" });
      if (ds) g.egri(Y.arz(c0, d), { sinif: "r-2 soluk" });
      g.egri(Y.talep(a, b), { sinif: "r-1", etiket: "$ talebi", etiketX: 74 });
      g.egri(Y.arz(c, d), { sinif: "r-2", etiket: "$ arzı", etiketX: 80 });
      g.nokta(E0.q, E0.p, { sinif: "bos" });
      if (dt || ds) g.ok(E0.q, E0.p, E1.q, E1.p, { kesik: true });
      g.kilavuz(E1.q, E1.p); g.nokta(E1.q, E1.p);
      const deg = E1.p - E0.p;
      ok.yaz([["Kur", `${tl(E0.p)} → ${tl(E1.p)}`, "mavi"], ["TL", Math.abs(deg) < 0.3 ? "değişmedi" : deg > 0 ? "değer kaybetti" : "değer kazandı", deg > 0.3 ? "kirmizi" : deg < -0.3 ? "yesil" : ""], ["El değiştiren dolar", `${tl(E0.q)} → ${tl(E1.q)}`]]);
      Y.notYaz(not, son || "Kur, doların TL cinsinden fiyatıdır; doların arz ve talebiyle belirlenir. <b>Kurun yükselmesi TL'nin değer kaybıdır.</b> Bir olay seç ve hangi eğrinin kaydığına bak.", son ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 10. bölüm — gümrük vergisi ve kota
  G["gumruk"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Gümrük vergisi ve kota: kim kazanır, kim kaybeder?" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat (P)" });
    const D = (q) => 100 - q, S = (q) => 10 + q;
    let pw = 30, t = 10, mod = "vergi";
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Araç", secenekler: [["vergi", "Gümrük vergisi"], ["kota", "Eşdeğer kota"]], deger: mod, degisti: (v) => { mod = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Dünya fiyatı", min: 12, max: 54, adim: 1, deger: pw, degisti: (v) => { pw = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Gümrük vergisi (birim)", min: 0, max: 30, adim: 1, deger: t, degisti: (v) => { t = v; ciz(); } });
    const qd = (p) => Math.max(0, 100 - p), qs = (p) => Math.max(0, p - 10);
    function ciz() {
      g.temizle();
      const pIc = Math.min(pw + t, 55);   // iç fiyat, kapalı ekonomi dengesini (55) aşamaz
      const d0 = qd(pw), s0 = qs(pw), d1 = qd(pIc), s1 = qs(pIc);
      g.alan(D, () => pIc, 0, d1, { sinif: "a-tuketici", etiket: "TA", etiketOran: 0.2 });
      g.alan(() => pIc, S, 0, s1, { sinif: "a-uretici", etiket: "ÜA", etiketOran: 0.3 });
      if (pIc > pw) {
        g.dikdortgen(s1, pw, d1, pIc, { sinif: "a-vergi", etiket: mod === "vergi" ? "vergi geliri" : "kota rantı" });
        g.cokgen([[s0, pw], [s1, pw], [s1, pIc]], { sinif: "a-olu" });
        g.cokgen([[d1, pw], [d0, pw], [d1, pIc]], { sinif: "a-olu" });
      }
      g.egri(D, { sinif: "r-1", etiket: "D (iç talep)", etiketX: 70 });
      g.egri(S, { sinif: "r-2", etiket: "S (iç arz)", etiketX: 76 });
      g.cizgi(0, pw, 100, pw, { sinif: "r-5", kesik: true });
      g.etiket(98, pw, "dünya fiyatı", { hiza: "end", dy: 16, sinif: "r-5" });
      if (pIc > pw) { g.cizgi(0, pIc, 100, pIc, { sinif: "r-3" }); g.etiket(98, pIc, mod === "vergi" ? "dünya fiyatı + vergi" : "kotalı iç fiyat", { hiza: "end", dy: -7, sinif: "r-3" }); }
      g.kilavuz(s1, pIc, { yatay: false, xYazi: "üretim" }); g.kilavuz(d1, pIc, { yatay: false, xYazi: "tüketim" });
      const ithalat0 = Math.max(0, d0 - s0), ithalat1 = Math.max(0, d1 - s1);
      const gelir = (pIc - pw) * ithalat1;
      const olu = 0.5 * (pIc - pw) * (s1 - s0) + 0.5 * (pIc - pw) * (d0 - d1);
      ok.yaz([["İthalat", `${tl(ithalat0)} → ${tl(ithalat1)}`], ["İç üretim", `${tl(s0)} → ${tl(s1)}`, "kirmizi"], [mod === "vergi" ? "Vergi geliri" : "Kota rantı", tl(gelir, 0), "yesil"], ["Ölü ağırlık kaybı", tl(olu, 0), "altin"]]);
      Y.notYaz(not, !t ? "Serbest ticarette iç fiyat dünya fiyatına eşit; aradaki fark ithal ediliyor. Gümrük vergisini artır."
        : mod === "vergi" ? `Vergi iç fiyatı ${tl(pIc)}'ye çıkardı. Yerli üreticiler kazandı (üretim ${tl(s0)} → ${tl(s1)}), tüketiciler kaybetti, devlet ${tl(gelir, 0)} gelir elde etti. İki altın üçgen kimsenin olmayan kayıptır: soldaki pahalı yerli üretimin, sağdaki vazgeçilen tüketimin bedeli.`
          : `Aynı ithalat miktarına (${tl(ithalat1)}) bir kotayla da inilebilir: fiyatlar ve miktarlar aynı olur, ama yeşil alan devlete değil <b>kota lisansı sahiplerine</b> (çoğu zaman ithalatçılara ya da yabancı ihracatçılara) gider. Bu yüzden iktisatçılar kotayı vergiden daha zararlı bulur.`, t ? "uyari" : "");
    }
    ciz();
  };

  // ================================================================ 11. bölüm — üretim fonksiyonu
  G["uretim-fonksiyonu"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Azalan marjinal verim: işçi ekledikçe ne olur?", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    const TP = (L) => 6 * L * L - 0.2 * L ** 3, MP = (L) => 12 * L - 0.6 * L * L, AP = (L) => 6 * L - 0.2 * L * L;
    const g1 = Grafik(s1, { x: [0, 24], y: [0, 900], xEtiket: "Emek (L)", yEtiket: "Toplam ürün TP", oran: 0.8, xAdim: 4 });
    const g2 = Grafik(s2, { x: [0, 24], y: [-20, 70], xEtiket: "Emek (L)", yEtiket: "MP ve AP", oran: 0.8, xAdim: 4 });
    let L = 6;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "İşçi sayısı (L)", min: 1, max: 23, adim: 1, deger: L, degisti: (v) => { L = v; ciz(); } });
    function ciz() {
      g1.temizle(); g2.temizle();
      g1.egri(TP, { sinif: "r-4", etiket: "TP", etiketX: 16, x1: 23 });
      g1.kilavuz(L, TP(L)); g1.nokta(L, TP(L), { sinif: "yesil" });
      g2.cizgi(0, 0, 24, 0, { sinif: "r-5" });
      g2.egri(MP, { sinif: "r-2", etiket: "MP", etiketX: 19 });
      g2.egri(AP, { sinif: "r-1", etiket: "AP", etiketX: 21 });
      g2.nokta(10, 60, { r: 3.5, etiket: "MP en yüksek", dx: 6, dy: -8 });
      g2.nokta(15, 45, { r: 3.5, etiket: "MP = AP", dx: 6, dy: -8 });
      g2.cizgi(L, -20, L, 70, { sinif: "r-5", kesik: true });
      g2.nokta(L, MP(L), { sinif: "kirmizi" }); g2.nokta(L, AP(L), { sinif: "mavi" });
      const evre = L < 10 ? "Artan marjinal verim" : L < 20 ? "Azalan marjinal verim" : "Negatif marjinal verim";
      ok.yaz([["Toplam ürün TP", tl(TP(L), 0), "yesil"], ["Marjinal ürün MP", tl(MP(L), 1), "kirmizi"], ["Ortalama ürün AP", tl(AP(L), 1), "mavi"], ["Evre", evre]]);
      Y.notYaz(not, L < 10 ? `İlk işçiler uzmanlaşıp birbirine yardım ediyor: her yeni işçi bir öncekinden daha fazla katkı yapıyor (MP artıyor).`
        : L < 20 ? `<b>Azalan marjinal verim yasası</b> devrede: makine ve alan sabitken her yeni işçinin ek katkısı azalıyor. TP hâlâ artıyor ama giderek yavaşlıyor.${L >= 15 ? " MP, AP'nin altına indi: ortalama da düşmeye başladı." : " MP hâlâ AP'nin üstünde olduğu için ortalama yükseliyor."}`
          : `Çok fazla işçi birbirinin ayağına basıyor: MP negatif, toplam ürün azalıyor. Akılcı bir firma buraya hiç gelmez.`, L >= 10 && L < 20 ? "iyi" : L >= 20 ? "uyari" : "");
    }
    ciz();
  };

  // ================================================================ 11. bölüm — maliyet eğrileri
  const MAL = {   // TC = 100 + 30Q − 3Q² + 0,15Q³
    FC: 100,
    VC: (q) => 30 * q - 3 * q * q + 0.15 * q ** 3,
    TC: (q) => 100 + 30 * q - 3 * q * q + 0.15 * q ** 3,
    MC: (q) => 30 - 6 * q + 0.45 * q * q,
    AVC: (q) => 30 - 3 * q + 0.15 * q * q,
    ATC: (q) => 100 / q + 30 - 3 * q + 0.15 * q * q,
    AFC: (q) => 100 / q,
  };
  ECO.mikroMaliyet = MAL;
  G["maliyet-egrileri"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Maliyet eğrileri: toplamlar ve birim başına maliyetler", ikili: true });
    const s1 = el("div"), s2 = el("div");
    sahne.append(s1, s2);
    const g1 = Grafik(s1, { x: [0, 20], y: [0, 900], xEtiket: "Miktar (Q)", yEtiket: "TC, VC, FC", oran: 0.85, xAdim: 4 });
    const g2 = Grafik(s2, { x: [0, 20], y: [0, 70], xEtiket: "Miktar (Q)", yEtiket: "Birim maliyet", oran: 0.85, xAdim: 4 });
    let q = 8;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Üretim miktarı (Q)", min: 1, max: 20, adim: 0.5, deger: q, bicim: (v) => sayi(v, 1), degisti: (v) => { q = v; ciz(); } });
    function ciz() {
      g1.temizle(); g2.temizle();
      g1.egri(MAL.TC, { sinif: "r-5", etiket: "TC", etiketX: 17 });
      g1.egri(MAL.VC, { sinif: "r-3", etiket: "VC", etiketX: 18.5, etiketDy: 14 });
      g1.egri(() => MAL.FC, { sinif: "r-4", etiket: "FC", etiketX: 17, etiketDy: -6 });
      g1.cizgi(q, 0, q, 900, { sinif: "r-5", kesik: true });
      g1.nokta(q, MAL.TC(q)); g1.nokta(q, MAL.VC(q), { sinif: "altin" });
      g2.egri(MAL.MC, { sinif: "r-2", etiket: "MC", etiketX: 17.2 });
      g2.egri(MAL.ATC, { sinif: "r-1", etiket: "ATC", etiketX: 19, x0: 1.5 });
      g2.egri(MAL.AVC, { sinif: "r-3", etiket: "AVC", etiketX: 19.3, etiketDy: 14 });
      g2.egri(MAL.AFC, { sinif: "r-4", etiket: "AFC", etiketX: 17, x0: 1.5, etiketDy: -6 });
      g2.nokta(10, 15, { r: 3.5, sinif: "altin", etiket: "min AVC", dx: -12, dy: 18 });
      g2.nokta(12.23, 23.93, { r: 3.5, sinif: "mavi", etiket: "min ATC", dx: -58, dy: -6 });
      g2.cizgi(q, 0, q, 70, { sinif: "r-5", kesik: true });
      for (const [f, s] of [[MAL.MC, "kirmizi"], [MAL.ATC, "mavi"], [MAL.AVC, "altin"]]) g2.nokta(q, f(q), { sinif: s, r: 4 });
      ok.yaz([["FC", tl(MAL.FC, 0), "yesil"], ["VC", tl(MAL.VC(q), 1), "altin"], ["TC", tl(MAL.TC(q), 1)], ["MC", tl(MAL.MC(q), 2), "kirmizi"], ["AVC", tl(MAL.AVC(q), 2), "altin"], ["ATC", tl(MAL.ATC(q), 2), "mavi"]]);
      const mc = MAL.MC(q), atc = MAL.ATC(q), avc = MAL.AVC(q);
      Y.notYaz(not, `Ortalama–marjinal kuralı: MC ortalamanın <b>altındaysa</b> ortalamayı aşağı çeker, <b>üstündeyse</b> yukarı iter. Bu yüzden MC, AVC'yi ve ATC'yi en düşük noktalarından keser. Şu an MC = ${tl(mc, 1)}: ATC (${tl(atc, 1)}) ${mc < atc ? "düşüyor" : "yükseliyor"}, AVC (${tl(avc, 1)}) ${mc < avc ? "düşüyor" : "yükseliyor"}. AFC hep düşer (sabit maliyet daha çok birime yayılır), bu yüzden ATC ile AVC arasındaki fark daralır.`);
    }
    ciz();
  };

  // ================================================================ 12. bölüm — uzun dönem ortalama maliyet
  G["uzun-donem"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Uzun dönem: her fabrika büyüklüğünün kısa dönem eğrisi, zarfları LRATC" });
    const g = Grafik(sahne, { x: [0, 110], y: [10, 40], xEtiket: "Miktar (Q)", yEtiket: "Birim maliyet" });
    const LR = (q) => (q < 40 ? 18 + 0.008 * (40 - q) ** 2 : q <= 70 ? 18 : 18 + 0.008 * (q - 70) ** 2);
    const fabrikalar = [12, 28, 45, 62, 80, 96];
    let k = 1;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Fabrika büyüklüğü", min: 0, max: 5, adim: 1, deger: k, bicim: (v) => ["Atölye", "Küçük", "Orta", "Büyük", "Çok büyük", "Dev"][v], degisti: (v) => { k = v; ciz(); } });
    function ciz() {
      g.temizle();
      g.alan(() => 40, () => 10, 0, 40, { sinif: "a-tuketici" });
      g.alan(() => 40, () => 10, 70, 110, { sinif: "a-uretici" });
      g.etiket(4, 38.5, "ölçek ekonomileri", { sinif: "r-1" });
      g.etiket(44, 38.5, "sabit getiri", { sinif: "r-5" });
      g.etiket(74, 38.5, "ölçek eksi ekonomileri", { sinif: "r-2" });
      fabrikalar.forEach((q0, i) => g.egri((q) => LR(q) + 0.012 * (q - q0) ** 2, { sinif: i === k ? "r-3" : "r-5 soluk", x0: Math.max(0, q0 - 32), x1: Math.min(110, q0 + 32), kalin: i === k ? 2.8 : 1.4 }));
      g.egri(LR, { sinif: "r-1", etiket: "LRATC", etiketX: 100, kalin: 3 });
      g.nokta(40, 18, { r: 4, etiket: "MES", dx: -14, dy: 22 });
      const q0 = fabrikalar[k];
      g.kilavuz(q0, LR(q0)); g.nokta(q0, LR(q0), { sinif: "altin" });
      ok.yaz([["Bu fabrikanın en iyi üretimi", tl(q0, 0)], ["Birim maliyet", tl(LR(q0), 2), "altin"], ["Bölge", q0 < 40 ? "Ölçek ekonomileri" : q0 <= 70 ? "Sabit getiri" : "Ölçek eksi ekonomileri", q0 < 40 ? "mavi" : q0 <= 70 ? "" : "kirmizi"]]);
      Y.notYaz(not, q0 < 40 ? "Fabrika büyüdükçe birim maliyet düşüyor: iş bölümü, daha verimli makineler, toplu alım. Bunlara <b>ölçek ekonomileri</b> denir."
        : q0 <= 70 ? "Ortalama maliyetin en düşük olduğu düz bölge: büyümek ne ucuzlatıyor ne pahalılaştırıyor. Bu düzlüğün başladığı nokta <b>en küçük etkin ölçek</b> (MES)."
          : "Çok büyük örgütlerde yönetim, koordinasyon ve denetim zorlaşır; birim maliyet yeniden artar: <b>ölçek eksi ekonomileri</b> (diseconomies of scale).", "");
    }
    ciz();
  };

  // ================================================================ 12. bölüm eki — eş-ürün ve eş-maliyet
  G["esurun"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Eş-ürün ve eş-maliyet: en ucuz girdi bileşimi" });
    const g = Grafik(sahne, { x: [0, 60], y: [0, 60], xEtiket: "Emek (L)", yEtiket: "Sermaye (K)" });
    let w = 10, r = 20, C = 600;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Ücret (w)", min: 4, max: 40, adim: 1, deger: w, degisti: (v) => { w = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Sermayenin fiyatı (r)", min: 4, max: 40, adim: 1, deger: r, degisti: (v) => { r = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Toplam maliyet (C)", min: 200, max: 1200, adim: 20, deger: C, degisti: (v) => { C = v; ciz(); } });
    const Q = (L, K) => 2 * Math.sqrt(L * K);
    function ciz() {
      g.temizle();
      const L = C / (2 * w), K = C / (2 * r), q = Q(L, K);
      for (const oran of [0.6, 1.5]) g.egri((x) => (q * oran / 2) ** 2 / x, { sinif: "r-5 soluk", x0: 0.5 });
      g.egri((x) => (q / 2) ** 2 / x, { sinif: "r-4", etiket: `Q = ${tl(q, 0)}`, etiketX: 52, x0: 0.5 });
      g.egri((x) => C / r - (w / r) * x, { sinif: "r-2", etiket: "eş-maliyet", etiketX: Math.min(54, (C / w) * 0.75) });
      g.kilavuz(L, K); g.nokta(L, K, { etiket: "en ucuz bileşim", dx: 8, dy: -10 });
      ok.yaz([["Emek L*", tl(L, 1)], ["Sermaye K*", tl(K, 1)], ["Üretim Q", tl(q, 1), "yesil"], ["w / r (fiyat oranı)", tl(w / r, 2), "kirmizi"]]);
      Y.notYaz(not, `Teğet noktada eş-ürün eğrisinin eğimi (teknik ikame oranı, ${formul("MP_L/MP_K", false)}) girdi fiyatları oranına eşit: ${formul("\\dfrac{MP_L}{w} = \\dfrac{MP_K}{r}", false)}. Son liranın emeğe de sermayeye de aynı ek ürünü getirdiği nokta. Ücreti artırırsan firma emekten sermayeye kayar — makineleşme böyle teşvik edilir.`);
    }
    ciz();
  };

  // ================================================================ 13. bölüm — tam rekabette firma
  G["tam-rekabet"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Tam rekabetçi firma: fiyatı değiştir, firmanın kararını izle" });
    const g = Grafik(sahne, { x: [0, 20], y: [0, 60], xEtiket: "Miktar (Q)", yEtiket: "Fiyat, maliyet", xAdim: 2 });
    let P = 35;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Piyasa fiyatı (P = MR)", min: 8, max: 55, adim: 0.5, deger: P, bicim: (v) => sayi(v, 1), degisti: (v) => { P = v; ciz(); } });
    const qSec = (p) => { const d = 36 - 1.8 * (30 - p); return d < 0 ? 0 : (6 + Math.sqrt(d)) / 0.9; };
    function ciz() {
      g.temizle();
      const kapan = P < 15;
      const q = kapan ? 0 : qSec(P);
      const atc = q ? MAL.ATC(q) : 0;
      if (q) g.dikdortgen(0, Math.min(P, atc), q, Math.max(P, atc), { sinif: P >= atc ? "a-kar" : "a-zarar", etiket: P >= atc ? "kâr" : "zarar", etiketX: q / 2 });
      g.egri(MAL.MC, { sinif: "r-2", etiket: "MC", etiketX: 17.3 });
      g.egri(MAL.ATC, { sinif: "r-1", etiket: "ATC", etiketX: 19, x0: 2 });
      g.egri(MAL.AVC, { sinif: "r-3", etiket: "AVC", etiketX: 19.3, etiketDy: 14 });
      g.egri(() => P, { sinif: "r-4", etiket: "P = MR = D", etiketX: 0.3, etiketDy: -8 });
      g.nokta(10, 15, { r: 3.5, etiket: "kapanma", dx: -20, dy: 20, sinif: "altin" });
      g.nokta(12.23, 23.93, { r: 3.5, etiket: "başabaş", dx: 6, dy: 22, sinif: "mavi" });
      if (q) { g.kilavuz(q, P); g.nokta(q, P, { etiket: "MR = MC" }); g.kilavuz(q, atc, { dikey: false }); }
      const kar = q ? (P - atc) * q : -MAL.FC;
      const durum = kapan ? "Kapan" : P >= 23.93 + 0.05 ? "Kâr ediyor" : P >= 23.93 - 0.05 ? "Başabaş" : "Zararda ama üretiyor";
      ok.yaz([["Üretim (MR = MC)", tl(q, 2)], ["ATC", q ? tl(atc, 2) : "—", "mavi"], [kar >= 0 ? "Kâr" : "Zarar", tl(Math.abs(kar), 1), kar >= 0 ? "yesil" : "kirmizi"], ["Karar", durum, kapan ? "kirmizi" : ""]]);
      Y.notYaz(not, kapan ? `Fiyat (${tl(P, 1)}) en düşük AVC'nin (15) altında: üretmek değişken maliyetleri bile karşılamıyor. <b>Kapanmak</b> daha az kaybettirir — yalnız sabit maliyet kadar (${MAL.FC}) zarar.`
        : P < 23.93 ? `Fiyat AVC'nin üstünde ama ATC'nin altında: firma zarar ediyor, yine de <b>üretmeye devam etmeli</b>. Çünkü gelir değişken maliyeti karşılayıp sabit maliyetin bir kısmını ödüyor; kapansa zararı ${MAL.FC} olurdu, üretince ${tl(-kar, 1)}.`
          : `Fiyat ATC'nin üstünde: firma <b>ekonomik kâr</b> ediyor. Tam rekabette bu kalıcı değildir — kâr yeni firmaları çeker, piyasa arzı artar, fiyat en düşük ATC'ye (${tl(23.93, 2)}) inene kadar düşer.`, kapan ? "uyari" : P >= 23.93 ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 14. bölüm — tekel
  G["tekel"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Tekel: MR = MC'de üret, fiyatı talepten oku" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat, maliyet" });
    let a = 10, kiyas = true;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Marjinal maliyetin düzeyi", min: 0, max: 40, adim: 1, deger: a, degisti: (v) => { a = v; ciz(); } });
    secici(kontrol, { etiket: "Karşılaştır", secenekler: [["evet", "Tam rekabeti göster"], ["hayir", "Gizle"]], deger: "evet", degisti: (v) => { kiyas = v === "evet"; ciz(); } });
    function ciz() {
      g.temizle();
      const D = (q) => 100 - q, MR = (q) => 100 - 2 * q, MC = (q) => a + 0.5 * q, ATC = (q) => 400 / q + a + 0.25 * q;
      const qm = (100 - a) / 2.5, pm = D(qm), atc = ATC(qm);
      const qc = (100 - a) / 1.5, pc = D(qc);
      const kar = (pm - atc) * qm;
      g.dikdortgen(0, Math.min(pm, atc), qm, Math.max(pm, atc), { sinif: kar >= 0 ? "a-kar" : "a-zarar", etiket: kar >= 0 ? "tekel kârı" : "zarar", etiketX: qm / 2 });
      if (kiyas) g.alan(D, MC, qm, qc, { sinif: "a-olu", etiket: "ÖAK", etiketOran: 0.35 });
      g.egri(D, { sinif: "r-1", etiket: "D", etiketX: 92 });
      g.egri(MR, { sinif: "r-1", kesik: true, etiket: "MR", etiketX: 46, x1: 50 });
      g.egri(MC, { sinif: "r-2", etiket: "MC", etiketX: 88 });
      g.egri(ATC, { sinif: "r-3", etiket: "ATC", etiketX: 92, x0: 4 });
      g.kilavuz(qm, pm, { xYazi: "Qₘ", yYazi: "Pₘ" }); g.nokta(qm, pm, { sinif: "mavi" }); g.nokta(qm, MR(qm), { sinif: "bos", etiket: "MR = MC", dx: 8, dy: 14 });
      if (kiyas) { g.kilavuz(qc, pc, { xYazi: "Qr" }); g.nokta(qc, pc, { sinif: "bos", etiket: "rekabetçi", dx: 6, dy: -8 }); }
      const e = pm / qm;
      ok.yaz([["Tekel fiyatı / miktarı", `${tl(pm, 1)} / ${tl(qm, 1)}`, "mavi"], ["Rekabetçi fiyat / miktar", `${tl(pc, 1)} / ${tl(qc, 1)}`], [kar >= 0 ? "Tekel kârı" : "Zarar", tl(Math.abs(kar), 0), kar >= 0 ? "yesil" : "kirmizi"], ["Ölü ağırlık kaybı", tl(0.5 * (qc - qm) * (pm - MC(qm)), 0), "altin"]]);
      Y.notYaz(not, `Tekelci fiyatı yükseltirse daha az satar; bu yüzden ek bir birimin getirdiği gelir (MR) fiyatın altındadır. Kâr MR = MC'de en büyük: ${tl(qm, 1)} birim, fiyat talep eğrisinden ${tl(pm, 1)}. Rekabetçi piyasaya göre <b>daha az miktar, daha yüksek fiyat</b>; altın üçgen tekelin refah kaybı. Bu noktada talep esnekliği ${tl(e, 2)} > 1 — tekelci hep esnek bölgede üretir.`);
    }
    ciz();
  };

  // ================================================================ 14. bölüm — tekelci rekabet
  G["tekelci-rekabet"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Tekelci rekabet: giriş oldukça kâr erir" });
    const g = Grafik(sahne, { x: [0, 25], y: [0, 70], xEtiket: "Firmanın miktarı (Q)", yEtiket: "Fiyat, maliyet", xAdim: 5 });
    let A = 60;
    const ok = okuma(okumaKap);
    const AUZ = 10 + 4 * Math.sqrt(50);   // uzun dönem: talep ATC'ye teğet
    kaydirici(kontrol, { etiket: "Piyasaya giren rakipler", min: 0, max: 100, adim: 1, deger: 0, bicim: (v) => (v >= 100 ? "uzun dönem" : v ? `%${v}` : "henüz yok"), degisti: (v) => { A = 60 - (60 - AUZ) * (v / 100); ciz(); } });
    const ATC = (q) => 100 / q + 10 + 0.5 * q, MC = (q) => 10 + q;
    function ciz() {
      g.temizle();
      const D = (q) => A - 1.5 * q, MR = (q) => A - 3 * q;
      const q = (A - 10) / 4, p = D(q), atc = ATC(q), kar = (p - atc) * q;
      if (Math.abs(p - atc) > 0.05) g.dikdortgen(0, Math.min(p, atc), q, Math.max(p, atc), { sinif: kar > 0 ? "a-kar" : "a-zarar", etiket: "kâr", etiketX: q / 2 });
      g.egri(D, { sinif: "r-1", etiket: "d (firmanın talebi)", etiketX: Math.min(20, A / 1.5 - 4) });
      g.egri(MR, { sinif: "r-1", kesik: true, etiket: "MR", etiketX: Math.min(16, A / 3 - 2) });
      g.egri(MC, { sinif: "r-2", etiket: "MC", etiketX: 22 });
      g.egri(ATC, { sinif: "r-3", etiket: "ATC", etiketX: 23, x0: 1.6 });
      g.kilavuz(q, p); g.nokta(q, p, { sinif: "mavi" });
      g.nokta(Math.sqrt(200), ATC(Math.sqrt(200)), { r: 3.5, sinif: "altin", etiket: "min ATC", dx: 6, dy: 18 });
      const uzun = A - AUZ < 0.05;
      ok.yaz([["Fiyat", tl(p, 2), "mavi"], ["Miktar", tl(q, 2)], ["Kâr", tl(kar, 1), kar > 0.5 ? "yesil" : ""], ["Atıl kapasite", tl(Math.sqrt(200) - q, 2) + " birim", "altin"]]);
      Y.notYaz(not, uzun ? `<b>Uzun dönem dengesi:</b> talep eğrisi ATC'ye teğet, P = ATC, ekonomik kâr sıfır. Ama fiyat MC'nin üstünde ve firma en düşük ortalama maliyetin solunda üretiyor: <b>atıl kapasite</b>. Tüketicinin ödediği bu ek maliyet, ürün çeşitliliğinin bedelidir.`
        : `Firma ürününü farklılaştırdığı için kendi aşağı eğimli talebi var ve kısa dönemde kâr ediyor. Ama giriş serbest: kâr yeni rakipleri çeker, her firmanın talebi sola kayar. Kaydırıcıyı sona kadar götür.`, uzun ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 15. bölüm — kırık talep eğrisi
  G["kirik-talep"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Kırık talep eğrisi: oligopolde fiyat neden yapışkan?" });
    const g = Grafik(sahne, { x: [0, 100], y: [-10, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat, maliyet" });
    let c = 20;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Marjinal maliyet düzeyi", min: 0, max: 45, adim: 1, deger: c, degisti: (v) => { c = v; ciz(); } });
    function ciz() {
      g.temizle();
      const Du = (q) => 80 - 0.5 * q, Dl = (q) => 100 - q, MRu = (q) => 80 - q, MRl = (q) => 100 - 2 * q, MC = (q) => c + 0.25 * q;
      g.egri(Du, { sinif: "r-1", x1: 40 });
      g.egri(Dl, { sinif: "r-1", x0: 40, etiket: "D", etiketX: 80 });
      g.egri(MRu, { sinif: "r-1", kesik: true, x1: 40 });
      g.egri(MRl, { sinif: "r-1", kesik: true, x0: 40, x1: 55, etiket: "MR", etiketX: 52 });
      g.cizgi(40, 40, 40, 20, { sinif: "r-3", kalin: 4 });
      g.etiket(42, 30, "MR'deki boşluk", { sinif: "r-3" });
      g.egri(MC, { sinif: "r-2", etiket: "MC", etiketX: 85 });
      const mc40 = MC(40);
      let q, p;
      if (mc40 > 40) { q = (80 - c) / 1.25; p = Du(q); }
      else if (mc40 < 20) { q = (100 - c) / 2.25; p = Dl(q); }
      else { q = 40; p = 60; }
      g.kilavuz(q, p); g.nokta(q, p, { etiket: q === 40 ? "kırılma" : "", dx: 8, dy: -8 });
      ok.yaz([["Fiyat", tl(p, 1), "mavi"], ["Miktar", tl(q, 1)], ["MC (Q = 40'ta)", tl(mc40, 1), "kirmizi"]]);
      Y.notYaz(not, q === 40 ? `MC, MR'deki boşluğun içinde kaldıkça fiyat 60'ta sabit. Mantık: firma fiyatı artırırsa rakipler izlemez (üstteki esnek talep, müşteri kaçar); düşürürse rakipler de düşürür (alttaki esnek olmayan talep, pazar payı kazanılmaz). Bu yüzden maliyet değişse bile fiyat değişmez.`
        : `MC boşluğun dışına çıktı: artık firma fiyatı ${mc40 > 40 ? "artırıyor" : "düşürüyor"}. Kırık talep modeli fiyatın neden yapışkan olduğunu açıklar, ama fiyatın ilk başta neden 60 olduğunu açıklamaz — modelin bilinen zayıflığı.`, q === 40 ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 15./20. bölüm — oyun matrisi (Nash dengesi bulucu)
  const OYUNLAR = {
    mahkum: { ad: "Mahkûm ikilemi", s: ["Sus", "İtiraf et"], o: [[[-1, -1], [-10, 0]], [[0, -10], [-5, -5]]], birim: "yıl hapis (eksi)" },
    kartel: { ad: "Kartel (iki firma)", s: ["Anlaşmaya uy", "Hile yap"], o: [[[60, 60], [20, 80]], [[80, 20], [40, 40]]], birim: "milyon TL kâr" },
    reklam: { ad: "Reklam savaşı", s: ["Reklam yapma", "Reklam yap"], o: [[[50, 50], [20, 70]], [[70, 20], [30, 30]]], birim: "milyon TL kâr" },
    koordinasyon: { ad: "Koordinasyon (standart)", s: ["Standart A", "Standart B"], o: [[[30, 30], [0, 0]], [[0, 0], [20, 20]]], birim: "kazanç" },
    korkak: { ad: "Korkak (chicken)", s: ["Yoldan çekil", "Devam et"], o: [[[0, 0], [-1, 1]], [[1, -1], [-10, -10]]], birim: "kazanç" },
  };
  G["oyun-matrisi"] = (kap, ayar) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Ödemeler matrisi: en iyi cevaplar ve Nash dengesi" });
    let oyun = JSON.parse(JSON.stringify(OYUNLAR[ayar.oyun || "kartel"]));
    secici(kontrol, { etiket: "Oyun", secenekler: Object.entries(OYUNLAR).map(([k, v]) => [k, v.ad]), deger: ayar.oyun || "kartel", degisti: (v) => { oyun = JSON.parse(JSON.stringify(OYUNLAR[v])); ciz(); } });
    const matris = el("div", { class: "matris", style: "grid-template-columns: 1.1fr 1fr 1fr" });
    sahne.append(matris);
    function analiz() {
      const o = oyun.o;
      const enIyiSatir = [0, 1].map((j) => Math.max(o[0][j][0], o[1][j][0]));   // sütun j verildiğinde satır oyuncusunun en iyisi
      const enIyiSutun = [0, 1].map((i) => Math.max(o[i][0][1], o[i][1][1]));
      const nash = [];
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (o[i][j][0] === enIyiSatir[j] && o[i][j][1] === enIyiSutun[i]) nash.push([i, j]);
      const baskinSatir = [0, 1].find((i) => o[i][0][0] >= o[1 - i][0][0] && o[i][1][0] >= o[1 - i][1][0] && (o[i][0][0] > o[1 - i][0][0] || o[i][1][0] > o[1 - i][1][0]));
      const baskinSutun = [0, 1].find((j) => o[0][j][1] >= o[0][1 - j][1] && o[1][j][1] >= o[1][1 - j][1] && (o[0][j][1] > o[0][1 - j][1] || o[1][j][1] > o[1][1 - j][1]));
      return { enIyiSatir, enIyiSutun, nash, baskinSatir, baskinSutun };
    }
    function ciz() {
      const a = analiz();
      matris.innerHTML = "";
      matris.append(el("div", { class: "bas", html: `<span style="color:var(--mavi)">Sen (satır)</span>&nbsp;/&nbsp;<span style="color:var(--kirmizi)">Rakip</span>` }));
      oyun.s.forEach((s) => matris.append(el("div", { class: "bas", style: "color:var(--kirmizi)", text: s })));
      for (let i = 0; i < 2; i++) {
        matris.append(el("div", { class: "bas", style: "color:var(--mavi)", text: oyun.s[i] }));
        for (let j = 0; j < 2; j++) {
          const [x, y] = oyun.o[i][j];
          const nash = a.nash.some(([p, q]) => p === i && q === j);
          const giris = (deger, k) => {
            const inp = el("input", { type: "number", value: deger, "aria-label": `${oyun.s[i]} / ${oyun.s[j]} ${k ? "rakip" : "sen"}`, style: `width:3.4em;font:700 1rem var(--f-arayuz);text-align:center;border:1px solid transparent;background:transparent;color:${k ? "var(--kirmizi)" : "var(--mavi)"};${(k ? y === a.enIyiSutun[i] : x === a.enIyiSatir[j]) ? "text-decoration:underline;text-decoration-thickness:2px" : ""}` });
            inp.addEventListener("change", () => { oyun.o[i][j][k] = +inp.value || 0; ciz(); });
            return inp;
          };
          matris.append(el("div", { class: "hucre" + (nash ? " nash" : "") }, giris(x, 0), ", ", giris(y, 1), nash ? el("div", { style: "font-size:.75rem;color:var(--altin-yazi);font-weight:700", text: "Nash dengesi" }) : null));
        }
      }
      const ok = okuma(okumaKap);
      const toplam = (i, j) => oyun.o[i][j][0] + oyun.o[i][j][1];
      ok.yaz([["Senin baskın stratejin", a.baskinSatir != null ? oyun.s[a.baskinSatir] : "yok", "mavi"], ["Rakibin baskın stratejisi", a.baskinSutun != null ? oyun.s[a.baskinSutun] : "yok", "kirmizi"], ["Nash dengesi", a.nash.length ? a.nash.map(([i, j]) => `${oyun.s[i]} / ${oyun.s[j]}`).join(" ; ") : "saf stratejide yok", "altin"]]);
      let m = `Altı çizili sayılar, rakibin her seçimine karşı <b>en iyi cevaptır</b>. İki oyuncunun da en iyi cevap verdiği hücre <b>Nash dengesidir</b>: kimse tek başına stratejisini değiştirmek istemez. Sayılara tıklayıp değiştirebilirsin (birim: ${oyun.birim}).`;
      if (a.nash.length === 1) {
        const [i, j] = a.nash[0];
        const enIyiToplam = Math.max(...[0, 1].flatMap((p) => [0, 1].map((q) => toplam(p, q))));
        if (toplam(i, j) < enIyiToplam) m += ` <b>İkilem burada:</b> denge iki taraf için de daha iyi olan "${oyun.s[0]} / ${oyun.s[0]}" sonucundan kötü. Bireysel akılcılık ortak kötü sonuca götürüyor — kartellerin neden dağıldığının ve işbirliğinin neden zor olduğunun özeti.`;
      } else if (a.nash.length === 2) m += " İki denge var: hangisine varılacağını oyun değil, beklentiler, gelenek ya da ilk hamle belirler.";
      else if (!a.nash.length) m += " Saf stratejide denge yok: oyuncular hamlelerini tahmin edilemez kılmak (karma strateji) ister.";
      Y.notYaz(not, m);
    }
    ciz();
  };

  // ================================================================ 15. bölüm — yoğunlaşma: CR4 ve HHI
  G["hhi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Piyasa yoğunlaşması: dört firma oranı ve Herfindahl–Hirschman endeksi" });
    let paylar = [35, 25, 20, 10, 5, 5];
    const hazir = { ucOperator: [45, 32, 23, 0, 0, 0], rekabetci: [6, 5, 5, 4, 4, 3], tekel: [100, 0, 0, 0, 0, 0], ornek: [35, 25, 20, 10, 5, 5] };
    const cubuk = el("div", { style: "display:grid;gap:6px;padding:10px 14px" });
    sahne.append(cubuk);
    secici(kontrol, { etiket: "Hazır piyasa", secenekler: [["ornek", "Örnek"], ["ucOperator", "Üç büyük (temsili)"], ["rekabetci", "Parçalı"], ["tekel", "Tekel"]], deger: "ornek", degisti: (v) => { paylar = hazir[v].slice(); kh.forEach((k, i) => k.ayarla(paylar[i], true)); ciz(); } });
    const kh = paylar.map((p, i) => kaydirici(kontrol, { etiket: `${i + 1}. firmanın payı`, min: 0, max: 100, adim: 1, deger: p, bicim: (v) => `%${v}`, degisti: (v) => { paylar[i] = v; ciz(); } }));
    function ciz() {
      const top = paylar.reduce((s, x) => s + x, 0);
      const fazla = top > 100;
      const sirali = paylar.slice().sort((a, b) => b - a);
      const cr4 = sirali.slice(0, 4).reduce((s, x) => s + x, 0);
      const hhi = paylar.reduce((s, x) => s + x * x, 0);
      cubuk.innerHTML = "";
      paylar.forEach((p, i) => cubuk.append(el("div", { style: "display:grid;grid-template-columns:5.5rem 1fr 3rem;gap:8px;align-items:center;font:500 .9rem var(--f-arayuz)" }, el("span", { text: `${i + 1}. firma` }), el("span", { class: "ilerleme-cubuk", style: "height:12px" }, el("span", { style: `width:${Math.min(100, p)}%;background:${i < 4 ? "var(--mavi)" : "var(--damar-koyu)"}` })), el("span", { text: `%${p}` }))));
      if (!fazla && top < 100) cubuk.append(el("div", { style: "font:italic .9rem var(--f-metin);color:var(--murekkep-3)", text: `Kalan %${100 - top}: çok sayıda küçük firma (HHI'ye katkısı yok sayılır).` }));
      const sinif = hhi < 1500 ? "Yoğunlaşmamış (rekabetçi)" : hhi <= 2500 ? "Orta derecede yoğun" : "Yüksek derecede yoğun";
      okuma(okumaKap).yaz([["Dört firma oranı (CR4)", `%${cr4}`, "mavi"], ["HHI", fazla ? "—" : sayi(hhi, 0), "altin"], ["Sınıf (ABD 2010 rehberi)", fazla ? "Paylar %100'ü aşıyor" : sinif, fazla ? "kirmizi" : ""]]);
      Y.notYaz(not, fazla ? "Payların toplamı %100'ü aşamaz; bir kaydırıcıyı azalt."
        : `HHI, bütün firmaların pazar paylarının (yüzde olarak) <b>karelerinin toplamıdır</b>: ${paylar.filter((p) => p).map((p) => p + "²").join(" + ")} = ${sayi(hhi, 0)}. Tam tekel 10.000, çok parçalı piyasa sıfıra yakın. CR4 en büyük dört firmanın payını toplar ama aralarındaki dağılımı görmez; HHI büyük firmalara karesi kadar ağırlık verdiği için daha bilgilidir. (Colander'daki eşikler 1500 ve 2500; ABD'nin 2023 rehberi bunları 1000 ve 1800'e indirdi.)`, "");
    }
    ciz();
  };

  // ================================================================ 16. bölüm — doğal tekelin düzenlenmesi
  G["dogal-tekel"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Doğal tekel: düzenleyici fiyatı nereye koymalı?" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Miktar (Q)", yEtiket: "Fiyat, maliyet" });
    let rejim = "serbest";
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Fiyat kuralı", secenekler: [["serbest", "Düzenleme yok"], ["mc", "P = MC"], ["ac", "P = ATC"]], deger: rejim, degisti: (v) => { rejim = v; ciz(); } });
    const D = (q) => 100 - q, MR = (q) => 100 - 2 * q, MC = () => 10, ATC = (q) => 1200 / q + 10;
    function ciz() {
      g.temizle();
      let q, p;
      if (rejim === "serbest") { q = 45; p = 55; }
      else if (rejim === "mc") { q = 90; p = 10; }
      else { q = (90 + Math.sqrt(8100 - 4800)) / 2; p = D(q); }
      const atc = ATC(q), kar = (p - atc) * q;
      if (Math.abs(kar) > 1) g.dikdortgen(0, Math.min(p, atc), q, Math.max(p, atc), { sinif: kar > 0 ? "a-kar" : "a-zarar", etiket: kar > 0 ? "kâr" : "zarar", etiketX: q / 2 });
      if (q < 90) g.alan(D, MC, q, 90, { sinif: "a-olu", etiket: "ÖAK", etiketOran: 0.4 });
      g.egri(D, { sinif: "r-1", etiket: "D", etiketX: 92 });
      g.egri(MR, { sinif: "r-1", kesik: true, etiket: "MR", etiketX: 44, x1: 50 });
      g.egri(MC, { sinif: "r-2", etiket: "MC", etiketX: 96, etiketDy: -6 });
      g.egri(ATC, { sinif: "r-3", etiket: "ATC (sürekli düşen)", etiketX: 58, x0: 12 });
      g.kilavuz(q, p); g.nokta(q, p);
      ok.yaz([["Fiyat", tl(p, 1), "mavi"], ["Miktar", tl(q, 1)], [kar >= 0 ? "Kâr" : "Zarar", tl(Math.abs(kar), 0), kar > 1 ? "yesil" : kar < -1 ? "kirmizi" : ""], ["Ölü ağırlık kaybı", tl(0.5 * (90 - q) * (p - 10), 0), "altin"]]);
      Y.notYaz(not, {
        serbest: "Sabit maliyet (şebeke, boru hattı) çok büyük, marjinal maliyet küçük: ATC hep düşüyor, tek firma en ucuz üretici. Serbest bırakılan tekelci MR = MC'de üretir: yüksek fiyat, düşük miktar, büyük refah kaybı.",
        mc: "P = MC etkin miktarı sağlar (refah kaybı yok), ama fiyat ortalama maliyetin altında: firma sabit maliyeti karşılayamaz, zarar eder. Ya devlet sübvansiyon vermeli ya da firma batar.",
        ac: "P = ATC'de firma sıfır ekonomik kâr eder, sübvansiyon gerekmez. Bedeli: miktar etkin düzeyin biraz altında, küçük bir refah kaybı kalır. Gerçek düzenleyicilerin (elektrik, doğalgaz dağıtımı) çoğunun yaklaşımı budur — ama maliyetleri düşürme teşviki zayıftır.",
      }[rejim], rejim === "ac" ? "iyi" : rejim === "mc" ? "uyari" : "");
    }
    ciz();
  };

  // ================================================================ 17. bölüm — emek piyasası, asgari ücret, monopson
  G["emek-piyasasi"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Asgari ücret: rekabetçi piyasada ve monopsonda" });
    const g = Grafik(sahne, { x: [0, 80], y: [0, 60], xEtiket: "İşçi sayısı (L)", yEtiket: "Ücret (W)" });
    let wmin = 0, mod = "rekabet";
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "İşveren", secenekler: [["rekabet", "Çok sayıda işveren"], ["monopson", "Tek işveren (monopson)"]], deger: mod, degisti: (v) => { mod = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Asgari ücret", min: 0, max: 45, adim: 0.5, deger: 0, bicim: (v) => (v ? sayi(v, 1) : "yok"), degisti: (v) => { wmin = v; ciz(); } });
    const MRP = (L) => 50 - 0.5 * L, Sw = (L) => 10 + 0.5 * L, MFC = (L) => 10 + L;
    const Ld = (w) => Math.max(0, (50 - w) / 0.5), Ls = (w) => Math.max(0, (w - 10) / 0.5);
    function ciz() {
      g.temizle();
      g.egri(MRP, { sinif: "r-1", etiket: "D = MRP", etiketX: 70 });
      g.egri(Sw, { sinif: "r-2", etiket: "S (emek arzı)", etiketX: 68 });
      if (mod === "monopson") g.egri(MFC, { sinif: "r-6", etiket: "MFC", etiketX: 42 });
      let L, W, issiz = 0;
      if (mod === "rekabet") {
        if (wmin > 30) { L = Ld(wmin); W = wmin; issiz = Ls(wmin) - L; } else { L = 40; W = 30; }
      } else {
        if (wmin <= 23.34) { L = 80 / 3; W = Sw(L); }
        else if (wmin <= 30) { L = Ls(wmin); W = wmin; }
        else { L = Ld(wmin); W = wmin; issiz = Ls(wmin) - L; }
      }
      if (wmin) { g.cizgi(0, wmin, 80, wmin, { sinif: "r-3" }); g.etiket(79, wmin, "asgari ücret", { hiza: "end", dy: -7, sinif: "r-3" }); }
      if (issiz > 0.2) { g.cizgi(L, wmin, Ls(wmin), wmin, { sinif: "r-2", kalin: 5, ustte: true }); g.etiket((L + Ls(wmin)) / 2, wmin, "işsizlik", { hiza: "middle", dy: 18, sinif: "r-2" }); }
      if (mod === "monopson" && wmin <= 23.34) { g.nokta(L, MRP(L), { sinif: "bos", etiket: "MRP = MFC", dx: 8, dy: -6 }); }
      g.kilavuz(L, W); g.nokta(L, W, { sinif: "yesil" });
      ok.yaz([["İstihdam", tl(L, 1), "yesil"], ["Ücret", tl(W, 1), "mavi"], ["İşsizlik (iş arayan − bulan)", tl(issiz, 1), issiz > 0.2 ? "kirmizi" : ""]]);
      Y.notYaz(not, mod === "rekabet"
        ? (wmin > 30 ? `Rekabetçi piyasada denge ücretinin (30) üstündeki asgari ücret, çalışmak isteyenlerin sayısını artırıp işverenlerin talebini azaltır: ${tl(issiz, 1)} kişilik işsizlik. İşini koruyanların ücreti arttı, işini kaybedenler kaybetti.` : "Asgari ücret denge ücretinin (30) altında ya da hiç yok: bağlayıcı değil. Denge: 40 işçi, ücret 30. Kaydırıcıyı 30'un üstüne çıkar.")
        : (wmin <= 23.34 ? `Tek işveren ücreti kendisi belirler: bir işçi daha almak için herkesin ücretini yükseltmek zorunda olduğundan, bir işçinin marjinal maliyeti (MFC) ücretten yüksektir. Monopsonist MRP = MFC'de ${tl(L, 1)} işçi alır ve arz eğrisinden okunan ${tl(W, 1)} ücret öder — rekabetçi piyasadan az istihdam, düşük ücret.`
          : wmin <= 30 ? `<b>Şaşırtıcı sonuç:</b> monopsonda 23,3 ile 30 arasındaki bir asgari ücret, hem ücreti hem <b>istihdamı artırır</b> (${tl(L, 1)} işçi). Çünkü işveren artık ek işçi için herkesin ücretini yükseltmek zorunda değil. Asgari ücret tartışmasında bazı iktisatçıların "istihdamı azaltmayabilir" demesinin bir nedeni budur.`
            : `Asgari ücret 30'u geçince monopsonda da istihdam düşmeye başlar ve işsizlik ortaya çıkar.`), mod === "monopson" && wmin > 23.34 && wmin <= 30 ? "iyi" : issiz > 0.2 ? "uyari" : "");
    }
    ciz();
  };

  // ================================================================ 18. bölüm — Lorenz eğrisi ve Gini
  G["lorenz"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Lorenz eğrisi ve Gini katsayısı: dilimlerin payını değiştir" });
    const g = Grafik(sahne, { x: [0, 100], y: [0, 100], xEtiket: "Nüfusun birikimli yüzdesi (yoksuldan zengine)", yEtiket: "Gelirin birikimli yüzdesi", xAdim: 20, yAdim: 20 });
    let p = [7, 12, 17, 23, 41];
    const hazir = { esit: [20, 20, 20, 20, 20], orta: [7, 12, 17, 23, 41], yuksek: [4, 8, 13, 20, 55], cokyuksek: [2, 5, 9, 16, 68] };
    const ok = okuma(okumaKap);
    secici(kontrol, { etiket: "Hazır dağılım", secenekler: [["esit", "Tam eşitlik"], ["orta", "Orta eşitsizlik"], ["yuksek", "Yüksek eşitsizlik"], ["cokyuksek", "Çok yüksek"]], deger: "orta", degisti: (v) => { p = hazir[v].slice(); kh.forEach((k, i) => i < 4 && k.ayarla(p[i], true)); ciz(); } });
    const ad = ["En yoksul %20", "İkinci %20", "Üçüncü %20", "Dördüncü %20"];
    const kh = ad.map((a, i) => kaydirici(kontrol, { etiket: `${a}'nin payı`, min: 0, max: 40, adim: 1, deger: p[i], bicim: (v) => `%${v}`, degisti: (v) => { p[i] = v; ciz(); } }));
    function ciz() {
      g.temizle();
      // sıralı olmalı ve en zengin dilim kalanı alır
      const q = p.slice(0, 4);
      const kalan = 100 - q.reduce((s, x) => s + x, 0);
      const dilimler = q.concat([kalan]);
      const gecerli = kalan >= q[3] && q.every((x, i) => i === 0 || x >= q[i - 1]);
      const noktalar = [[0, 0]];
      let t = 0;
      dilimler.forEach((x, i) => { t += x; noktalar.push([(i + 1) * 20, t]); });
      g.cokgen(noktalar.concat([[100, 0]]), { sinif: "a-notr", etiket: "B", etiketX: 75, etiketY: 18 });
      g.cokgen([[0, 0], [100, 100]].concat(noktalar.slice().reverse()), { sinif: "a-olu", etiket: "A", etiketX: 62, etiketY: 52 });
      g.cizgi(0, 0, 100, 100, { sinif: "r-5", kesik: true });
      g.etiket(55, 62, "tam eşitlik doğrusu", { sinif: "r-5" });
      g.noktalar(noktalar, { sinif: "r-1", isaret: true, etiket: "Lorenz", etiketI: 4, etiketDx: -64, etiketDy: 6 });
      // Gini = 1 − Σ (x_k − x_{k−1})(Y_k + Y_{k−1}) (x ve Y 0–1 ölçeğinde)
      let alan = 0;
      for (let i = 1; i < noktalar.length; i++) alan += 0.2 * (noktalar[i][1] + noktalar[i - 1][1]) / 100;
      const gini = 1 - alan;
      ok.yaz([["En zengin %20'nin payı", `%${kalan}`, "kirmizi"], ["Gini katsayısı", gecerli ? sayi(gini, 3) : "—", "altin"], ["En zengin / en yoksul %20", gecerli && dilimler[0] ? sayi(kalan / dilimler[0], 1) + " kat" : "—", "mavi"]]);
      Y.notYaz(not, !gecerli ? "Dilimler yoksuldan zengine sıralı olmalı: her dilim bir öncekinden az alamaz, en zengin dilim (kalan) de dördüncüden az olamaz."
        : `Gini = (altın alan) / (eşitlik doğrusunun altındaki bütün üçgen). 0 tam eşitlik, 1 bütün gelirin tek kişide olması. Beş dilimle hesaplanan Gini gerçek değerin biraz altında kalır, çünkü dilimlerin içindeki eşitsizliği görmez. Karşılaştırma için: İskandinav ülkelerinde harcanabilir gelir Ginisi 0,25–0,30 civarındayken Türkiye'de 0,40'ın üstündedir (TÜİK).`, "");
    }
    ciz();
  };

  // ================================================================ 19. bölüm — marjinal fayda ve bütçe
  G["fayda"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "200 TL'lik bütçeyi paylaştır: son lira nerede daha çok fayda getiriyor?" });
    const mal = [
      { ad: "Kahve", fiyat: 40, mu: [120, 100, 80, 60, 40, 20], n: 1 },
      { ad: "Simit", fiyat: 20, mu: [70, 60, 50, 40, 30, 20, 10, 5], n: 1 },
    ];
    const butce = 200;
    const tablo = el("div", { class: "tablo-kaydir" });
    sahne.append(tablo);
    const satir = el("div", { style: "display:flex;gap:14px;flex-wrap:wrap;grid-column:1/-1" });
    kontrol.append(satir);
    mal.forEach((m) => {
      const s = el("div", { style: "display:flex;align-items:center;gap:8px" }, el("b", { text: `${m.ad} (${m.fiyat} TL)` }));
      s.append(el("button", { class: "kucuk-tus", type: "button", text: "−", "aria-label": m.ad + " azalt", onclick: () => { if (m.n > 0) { m.n--; ciz(); } } }), el("span", { class: "say", style: "min-width:1.5em;text-align:center;font-weight:700" }), el("button", { class: "kucuk-tus", type: "button", text: "+", "aria-label": m.ad + " artır", onclick: () => { if (m.n < m.mu.length) { m.n++; ciz(); } } }));
      m.kutu = s;
      satir.append(s);
    });
    tus(kontrol, "En iyi sepeti göster", () => { mal[0].n = 3; mal[1].n = 4; ciz(); });
    function ciz() {
      mal.forEach((m) => (m.kutu.querySelector(".say").textContent = m.n));
      const harcama = mal.reduce((s, m) => s + m.n * m.fiyat, 0);
      const fayda = mal.reduce((s, m) => s + m.mu.slice(0, m.n).reduce((a, b) => a + b, 0), 0);
      const n = Math.max(...mal.map((m) => m.mu.length));
      let h = `<table class="tablo-kucuk"><tr><th>Birim</th>${mal.map((m) => `<th>${m.ad} MU</th><th>MU/P</th>`).join("")}</tr>`;
      for (let i = 0; i < n; i++) h += `<tr>${[`<td>${i + 1}.</td>`].concat(mal.map((m) => (i < m.mu.length ? `<td${i < m.n ? ' style="background:var(--mavi-soluk);font-weight:700"' : ""}>${m.mu[i]}</td><td${i < m.n ? ' style="background:var(--mavi-soluk);font-weight:700"' : ""}>${sayi(m.mu[i] / m.fiyat, 2)}</td>` : "<td></td><td></td>"))).join("")}</tr>`;
      tablo.innerHTML = h + "</table>";
      const son = mal.map((m) => (m.n ? m.mu[m.n - 1] / m.fiyat : null));
      okuma(okumaKap).yaz([["Harcama", `${harcama} / ${butce} TL`, harcama > butce ? "kirmizi" : ""], ["Toplam fayda", String(fayda), "yesil"], ["Son kahvenin MU/P", son[0] != null ? sayi(son[0], 2) : "—", "mavi"], ["Son simidin MU/P", son[1] != null ? sayi(son[1], 2) : "—", "mavi"]]);
      const en = mal[0].n === 3 && mal[1].n === 4;
      Y.notYaz(not, harcama > butce ? "Bütçeyi aştın: 200 TL'den fazla harcayamazsın."
        : en ? `<b>En iyi sepet:</b> 3 kahve + 4 simit, bütçe tam bitti, toplam fayda 520. Son liranın kahvede de simitte de getirdiği fayda aynı (MU/P = 2): ${formul("\\dfrac{MU_K}{P_K} = \\dfrac{MU_S}{P_S}", false)}. Bu eşitlik bozulsaydı parayı MU/P'si yüksek mala kaydırarak faydanı artırabilirdin.`
          : `Kural: her lirayı, o lira başına en çok faydayı getiren mala harca (MU/P'si yüksek olana). ${harcama < butce ? `Hâlâ ${butce - harcama} TL'n var.` : ""} ${son[0] != null && son[1] != null && Math.abs(son[0] - son[1]) > 0.01 ? `Şu an son birimlerin MU/P'leri eşit değil (${sayi(son[0], 2)} ve ${sayi(son[1], 2)}): ${son[0] > son[1] ? "simitten kahveye" : "kahveden simite"} kaymak faydanı artırır.` : ""}`, en ? "iyi" : harcama > butce ? "uyari" : "");
    }
    ciz();
  };

  // ================================================================ 19. bölüm eki — kayıtsızlık eğrileri ve bütçe doğrusu
  G["kayitsizlik"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Kayıtsızlık eğrileri: bütçe doğrusuna teğet olan en yüksek eğri" });
    const g = Grafik(sahne, { x: [0, 60], y: [0, 60], xEtiket: "X malı", yEtiket: "Y malı" });
    let M = 600, px = 15, py = 15;
    const px0 = 15;
    let etkiGoster = false;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Gelir (M)", min: 200, max: 1200, adim: 20, deger: M, degisti: (v) => { M = v; ciz(); } });
    kaydirici(kontrol, { etiket: "X'in fiyatı (Pₓ)", min: 5, max: 40, adim: 1, deger: px, degisti: (v) => { px = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Y'nin fiyatı (Pᵧ)", min: 5, max: 40, adim: 1, deger: py, degisti: (v) => { py = v; ciz(); } });
    secici(kontrol, { etiket: "Pₓ değişince", secenekler: [["hayir", "Yalnız yeni denge"], ["evet", "Gelir ve ikame etkisi"]], deger: "hayir", degisti: (v) => { etkiGoster = v === "evet"; ciz(); } });
    function ciz() {
      g.temizle();
      // U = √(xy) : x* = M/(2Px), y* = M/(2Py)
      const x = M / (2 * px), y = M / (2 * py), U = Math.sqrt(x * y);
      for (const k of [0.6, 1.4]) g.egri((t) => (U * k) ** 2 / t, { sinif: "r-5 soluk", x0: 0.5 });
      g.egri((t) => U * U / t, { sinif: "r-4", etiket: "U", etiketX: 54, x0: 0.5 });
      g.egri((t) => (M - px * t) / py, { sinif: "r-2", etiket: "bütçe", etiketX: Math.min(55, (M / px) * 0.8), x1: M / px });
      if (etkiGoster && px !== px0) {
        const x0 = M / (2 * px0), y0 = M / (2 * py), U0 = Math.sqrt(x0 * y0);
        const xc = U0 * Math.sqrt(py / px), yc = U0 * Math.sqrt(px / py);   // telafi edilmiş sepet (eski fayda, yeni fiyatlar)
        g.egri((t) => U0 * U0 / t, { sinif: "r-4 soluk", x0: 0.5 });
        g.egri((t) => (M - px0 * t) / py, { sinif: "r-2 soluk", x1: M / px0 });
        g.egri((t) => (px * xc + py * yc - px * t) / py, { sinif: "r-3", kesik: true, x1: (px * xc + py * yc) / px });
        g.nokta(x0, y0, { sinif: "bos", etiket: "A", dx: 8, dy: -6 });
        g.nokta(xc, yc, { sinif: "altin", etiket: "B", dx: 8, dy: -6 });
        ok.yaz([["İkame etkisi (A→B)", sayi(xc - x0, 2)], ["Gelir etkisi (B→C)", sayi(x - xc, 2)], ["Toplam etki (A→C)", sayi(x - x0, 2), "mavi"]]);
      }
      g.kilavuz(x, y); g.nokta(x, y, { etiket: etkiGoster && px !== px0 ? "C" : "en iyi sepet", dx: 8, dy: -8 });
      if (!(etkiGoster && px !== px0)) ok.yaz([["X miktarı", sayi(x, 1)], ["Y miktarı", sayi(y, 1)], ["MRS = Pₓ/Pᵧ", sayi(px / py, 2), "kirmizi"]]);
      Y.notYaz(not, etkiGoster && px !== px0
        ? `Pₓ ${px0}'ten ${px}'e değişti. <b>İkame etkisi</b> (A→B): aynı fayda düzeyinde kalınsa bile göreli fiyat değiştiği için tüketici ${px > px0 ? "pahalanan X'ten Y'ye kayar" : "ucuzlayan X'e kayar"}. <b>Gelir etkisi</b> (B→C): fiyat değişikliği reel geliri ${px > px0 ? "düşürdü" : "artırdı"}; X normal mal olduğu için tüketimi ${px > px0 ? "daha da azalır" : "daha da artar"}. Kesikli altın çizgi telafi edilmiş bütçe doğrusu.`
        : `Teğet noktada kayıtsızlık eğrisinin eğimi (marjinal ikame oranı, MRS) bütçe doğrusunun eğimine eşit: ${formul("MRS = \\dfrac{MU_X}{MU_Y} = \\dfrac{P_X}{P_Y}", false)} — fayda bölümündeki MU/P kuralının grafikle gösterimi. Pₓ'i değiştirip X'in nasıl değiştiğine bak: bu noktaları birleştirirsen X'in talep eğrisini elde edersin.`);
    }
    ciz();
  };

  // ================================================================ 20. bölüm — tekrarlı mahkûm ikilemi
  G["tekrarli-oyun"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Tekrarlı oyun: 10 tur kartel ortağına karşı oyna" });
    const STR = { kisas: "Kısasa kısas", hile: "Hep hile", uy: "Hep uyan", kin: "Kin tutan", rastgele: "Rastgele" };
    const KAZ = { UU: [3, 3], UH: [0, 5], HU: [5, 0], HH: [1, 1] };
    let strateji = "kisas", gecmis = [];
    secici(kontrol, { etiket: "Rakibin (gizli) stratejisi", secenekler: Object.entries(STR), deger: strateji, degisti: (v) => { strateji = v; gecmis = []; ciz(); } });
    const tuslar = el("div", { class: "tus-satir", style: "grid-column:1/-1;margin:4px 0" });
    const uyTus = el("button", { class: "tus", type: "button", text: "Anlaşmaya uy", onclick: () => oyna("U") });
    const hileTus = el("button", { class: "tus ikincil", type: "button", text: "Hile yap", onclick: () => oyna("H") });
    tuslar.append(uyTus, hileTus, el("button", { class: "tus sessiz", type: "button", text: "Baştan", onclick: () => { gecmis = []; ciz(); } }));
    kontrol.append(tuslar);
    const tablo = el("div", { class: "tablo-kaydir" });
    sahne.append(el("p", { class: "sekil-aciklama", style: "padding-top:10px", text: "Her tur: ikiniz de uyarsanız 3'er, ikiniz de hile yaparsanız 1'er puan; biri hile yapıp öbürü uyarsa hileci 5, uyan 0 alır." }), tablo);
    function rakip() {
      const n = gecmis.length;
      if (strateji === "hile") return "H";
      if (strateji === "uy") return "U";
      if (strateji === "rastgele") return Math.random() < 0.5 ? "U" : "H";
      if (strateji === "kin") return gecmis.some((t) => t.sen === "H") ? "H" : "U";
      return n ? gecmis[n - 1].sen : "U";   // kısasa kısas
    }
    function oyna(sen) {
      if (gecmis.length >= 10) return;
      const o = rakip();
      gecmis.push({ sen, o, k: KAZ[sen + o] });
      ciz();
    }
    function ciz() {
      const top = gecmis.reduce((s, t) => [s[0] + t.k[0], s[1] + t.k[1]], [0, 0]);
      tablo.innerHTML = `<table class="tablo-kucuk"><tr><th>Tur</th><th>Sen</th><th>Rakip</th><th>Senin puanın</th><th>Rakibin</th></tr>${gecmis.map((t, i) => `<tr><td>${i + 1}</td><td>${t.sen === "U" ? "uydu" : "<b style='color:var(--kirmizi)'>hile</b>"}</td><td>${t.o === "U" ? "uydu" : "<b style='color:var(--kirmizi)'>hile</b>"}</td><td>${t.k[0]}</td><td>${t.k[1]}</td></tr>`).join("")}</table>`;
      uyTus.disabled = hileTus.disabled = gecmis.length >= 10;
      okuma(okumaKap).yaz([["Tur", `${gecmis.length} / 10`], ["Senin toplamın", String(top[0]), "mavi"], ["Rakibin toplamı", String(top[1]), "kirmizi"], ["İkiniz birlikte", `${top[0] + top[1]} / ${gecmis.length * 6}`, "yesil"]]);
      Y.notYaz(not, gecmis.length < 10 ? "Rakibinin stratejisini davranışından tahmin etmeye çalış. Tek seferlik oyunda hile baskın stratejidir; peki oyun tekrarlanınca?"
        : `Oyun bitti. Rakibin "${STR[strateji]}" oynuyordu. Robert Axelrod'un ünlü turnuvalarında en basit stratejilerden biri olan <b>kısasa kısas</b> (ilk turda uy, sonra rakibin son hamlesini tekrarla) en başarılılar arasındaydı: iyi niyetli, cezalandırıcı, affedici ve anlaşılır. Tekrarlı oyunlarda gelecekteki cezalandırma tehdidi işbirliğini sürdürebilir — kartellerin bazen neden ayakta kaldığının açıklaması.`, gecmis.length >= 10 ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 20./21. bölüm — ültimatom oyunu
  G["ultimatom"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Ültimatom oyunu: 100 TL'yi paylaştır" });
    let teklif = 30, kazanc = 0, tur = 0, kabul = 0;
    const gecmis = el("div", { class: "sekil-aciklama", style: "padding-top:10px" });
    sahne.append(el("p", { class: "sekil-aciklama", style: "padding-top:10px", text: "Sen 100 TL'den karşı tarafa bir pay teklif edersin. Kabul ederse paylaşırsınız; reddederse ikiniz de hiçbir şey almazsınız. Karşı taraf, deneylerdeki tipik davranışa benzeyen bir simülasyon." }), gecmis);
    kaydirici(kontrol, { etiket: "Karşı tarafa teklifin", min: 0, max: 100, adim: 5, deger: teklif, bicim: (v) => `${v} TL`, degisti: (v) => { teklif = v; } });
    tus(kontrol, "Teklif et", () => {
      // red olasılığı: düşük teklif → yüksek red (temsili)
      const red = teklif <= 0 ? 0.95 : teklif < 20 ? 0.7 : teklif < 30 ? 0.4 : teklif < 40 ? 0.15 : teklif < 50 ? 0.05 : 0.02;
      const kabulMu = Math.random() >= red;
      tur++;
      if (kabulMu) { kazanc += 100 - teklif; kabul++; }
      gecmis.prepend(el("div", { html: `${tur}. tur: ${teklif} TL teklif → <b style="color:${kabulMu ? "var(--yesil)" : "var(--kirmizi)"}">${kabulMu ? `kabul (sen ${100 - teklif} TL)` : "RED (ikiniz de 0)"}</b>` }));
      okuma(okumaKap).yaz([["Tur", String(tur)], ["Toplam kazancın", `${kazanc} TL`, "yesil"], ["Kabul oranı", `%${Math.round((kabul / tur) * 100)}`, "mavi"], ["Tur başına ortalama", `${sayi(kazanc / tur, 1)} TL`]]);
      Y.notYaz(not, `Geleneksel "tamamen bencil ve rasyonel" modele göre karşı taraf 1 TL'yi bile kabul etmeli (hiç yoktan iyidir), sen de en düşük teklifi yapmalısın. Deneylerde ise insanlar adaletsiz bulduğu teklifleri — kendi zararına — reddeder; teklif edenlerin çoğu da %40–50 civarı önerir. Bu, Colander'ın <b>aydınlanmış öz çıkar</b> (enlightened self-interest) dediği şeyin kanıtıdır: insanlar adalete de değer verir.`, "");
    });
    okuma(okumaKap).yaz([["Tur", "0"], ["Toplam kazancın", "0 TL"]]);
  };

  // ================================================================ 21. bölüm — şimdiki zaman yanlılığı
  G["simdiki-yanlilik"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Şimdiki zaman yanlılığı: iki soruya dürüstçe cevap ver" });
    const cevap = [null, null];
    const SORU = [["Bugün 100 TL", "1 hafta sonra 110 TL"], ["52 hafta sonra 100 TL", "53 hafta sonra 110 TL"]];
    const kutu = el("div", { style: "display:grid;gap:12px;padding:12px 14px" });
    sahne.append(kutu);
    const grafikKap = el("div");
    sahne.append(grafikKap);
    SORU.forEach((s, i) => {
      const satir = el("div", { class: "secici" }, el("span", { class: "secici-ad", text: `${i + 1}. soru: hangisini seçerdin?` }));
      s.forEach((sec, j) => satir.append(el("button", { type: "button", "aria-checked": "false", text: sec, onclick: (e) => { cevap[i] = j; satir.querySelectorAll("button").forEach((b) => b.setAttribute("aria-checked", String(b === e.target))); ciz(); } })));
      kutu.append(satir);
    });
    let g = null;
    function ciz() {
      if (cevap.includes(null)) { Y.notYaz(not, "İki soruyu da cevapla. İkisi arasındaki tek fark, iki seçeneğin de 52 hafta ileri itilmesi."); return; }
      const tutarli = cevap[0] === cevap[1];
      okuma(okumaKap).yaz([["1. soru", SORU[0][cevap[0]]], ["2. soru", SORU[1][cevap[1]]], ["Sonuç", tutarli ? "Tutarlı" : cevap[0] === 0 ? "Şimdiki zaman yanlılığı" : "Ters yönde tutarsızlık", tutarli ? "yesil" : "altin"]]);
      if (!g) {
        g = Grafik(grafikKap, { x: [0, 52], y: [0, 110], xEtiket: "İlk seçeneğe kalan hafta (D)", yEtiket: "Bugünkü öznel değer", xAdim: 10, yAdim: 20 });
        const k = 0.15, f = (t) => 1 / (1 + k * t);
        const A = (D) => 100 * f(D), B = (D) => 110 * f(D + 1);
        let d0 = 0; for (let D = 0; D <= 52; D += 0.05) if (B(D) >= A(D)) { d0 = D; break; }
        g.egri(A, { sinif: "r-2", etiket: "D haftada 100 TL", etiketX: 30, etiketDy: -10 });
        g.egri(B, { sinif: "r-1", etiket: "D+1 haftada 110 TL", etiketX: 40, etiketDy: -10 });
        g.cizgi(d0, 0, d0, 110, { sinif: "r-3", kesik: true });
        g.etiket(d0, 100, "tercih tersine döner", { dx: 6, sinif: "r-3" });
      }
      Y.notYaz(not, tutarli
        ? "Tutarlısın: iki soruda da aynı seçimi yaptın. Geleneksel (üstel) iskonto modeli tam bunu öngörür — bir haftalık bekleyişin bedeli ne zaman olursa olsun aynıdır."
        : cevap[0] === 0
          ? "İnsanların çoğu gibi: bugün beklemek istemedin ama bir yıl sonrası için bekledin. <b>Hiperbolik iskonto</b> böyle çalışır: yakın gelecek çok sert, uzak gelecek hafif iskonto edilir (grafikte eğriler kesişiyor). Sonuç tutarsız planlardır: \"diyete pazartesi başlarım\", \"emeklilik için gelecek yıl biriktiririm\". Önlemi: kendini önceden bağlamak — otomatik birikim talimatı, son teslim tarihleri."
          : "Bugün bekledin ama uzak gelecekte beklemedin — olağan dışı bir örüntü. Belki 52 hafta sonrasının belirsizliğini düşündün; deneylerde çoğu kişi tersini yapar.", tutarli ? "iyi" : "");
    }
    ciz();
  };

  // ================================================================ 22. bölüm — varsayılan seçeneğin gücü
  G["varsayilan"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Dürtme: varsayılan seçenek katılımı nasıl değiştirir? (temsili simülasyon)" });
    let atalet = 60, tercih = 50, mod = "otomatik";
    const izgara = el("div", { style: "display:grid;grid-template-columns:repeat(25,1fr);gap:2px;padding:12px 14px" });
    sahne.append(izgara);
    secici(kontrol, { etiket: "Sistem", secenekler: [["gonullu", "Gönüllü katılım (opt-in)"], ["otomatik", "Otomatik katılım (opt-out)"]], deger: mod, degisti: (v) => { mod = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Gerçekten katılmak isteyenler", min: 0, max: 100, adim: 5, deger: tercih, bicim: (v) => `%${v}`, degisti: (v) => { tercih = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Atalet: hiçbir şey yapmayanlar", min: 0, max: 100, adim: 5, deger: atalet, bicim: (v) => `%${v}`, degisti: (v) => { atalet = v; ciz(); } });
    function ciz() {
      // 200 kişi: her kişi bir "istek" ve bir "atalet" taşır (belirlenimli dağılım, her çizimde aynı)
      izgara.innerHTML = "";
      let katilan = 0;
      for (let i = 0; i < 200; i++) {
        const ister = ((i * 37) % 100) < tercih, hareketsiz = ((i * 61 + 17) % 100) < atalet;
        const katildi = hareketsiz ? mod === "otomatik" : ister;
        if (katildi) katilan++;
        izgara.append(el("span", { style: `aspect-ratio:1;border-radius:50%;background:${katildi ? "var(--yesil)" : "var(--damar)"};${hareketsiz ? "" : "box-shadow:inset 0 0 0 1.5px var(--murekkep-3)"}`, title: katildi ? "katıldı" : "katılmadı" }));
      }
      okuma(okumaKap).yaz([["Katılım", `%${Math.round(katilan / 2)}`, "yesil"], ["Gerçek tercih", `%${tercih}`, "mavi"], ["Fark (varsayılanın etkisi)", `${katilan / 2 - tercih > 0 ? "+" : ""}${Math.round(katilan / 2 - tercih)} puan`, "altin"]]);
      Y.notYaz(not, `Halkalı noktalar aktif karar verenler, halkasızlar varsayılanda kalanlar. Geleneksel modelde varsayılan önemsizdir: herkes istediğini seçer. Gerçekte insanlar ertelemeye, uğraşmamaya eğilimlidir; o zaman <b>varsayılan seçenek sonucu belirler</b>. Seçim özgürlüğü korunurken davranışı yönlendirmek: Thaler ve Sunstein'ın <b>dürtme (nudge)</b> fikri. Türkiye'de 2017'de başlayan BES'te otomatik katılım bu mantığa dayanır — çalışan cayabilir ama varsayılan katılmaktır.`);
    }
    ciz();
  };

  // ================================================================ 23. bölüm — fayda–maliyet analizi
  G["fayda-maliyet"] = (kap) => {
    const { sahne, kontrol, okumaKap, not } = cerceve(kap, { baslik: "Fayda–maliyet analizi: bir güvenlik yatırımı değer mi?" });
    const g = Grafik(sahne, { x: [0, 15], y: [-150, 150], xEtiket: "İskonto oranı (%)", yEtiket: "Net bugünkü değer (milyon TL)", xAdim: 3, yAdim: 50 });
    let maliyet = 400, kurtarilan = 2, vsl = 30, yil = 20, oran = 5;
    const ok = okuma(okumaKap);
    kaydirici(kontrol, { etiket: "Yatırım maliyeti (bugün, milyon TL)", min: 100, max: 800, adim: 20, deger: maliyet, degisti: (v) => { maliyet = v; ciz(); } });
    kaydirici(kontrol, { etiket: "Yılda önlenen ölüm (istatistiksel)", min: 0.5, max: 5, adim: 0.5, deger: kurtarilan, bicim: (v) => sayi(v, 1), degisti: (v) => { kurtarilan = v; ciz(); } });
    kaydirici(kontrol, { etiket: "İstatistiksel hayatın değeri (milyon TL)", min: 5, max: 60, adim: 1, deger: vsl, degisti: (v) => { vsl = v; ciz(); } });
    kaydirici(kontrol, { etiket: "İskonto oranı", min: 0, max: 15, adim: 0.5, deger: oran, bicim: (v) => `%${sayi(v, 1)}`, degisti: (v) => { oran = v; ciz(); } });
    const nbd = (r) => { const f = kurtarilan * vsl; let s = 0; for (let t = 1; t <= yil; t++) s += f / (1 + r / 100) ** t; return s - maliyet; };
    function ciz() {
      g.temizle();
      g.cizgi(0, 0, 15, 0, { sinif: "r-5" });
      g.egri(nbd, { sinif: "r-1", etiket: "NBD", etiketX: 13 });
      const n = nbd(oran);
      g.kilavuz(oran, Math.max(-150, Math.min(150, n))); g.nokta(oran, Math.max(-150, Math.min(150, n)), { sinif: n >= 0 ? "yesil" : "kirmizi" });
      ok.yaz([["Yıllık fayda", `${sayi(kurtarilan * vsl, 1)} milyon TL`, "yesil"], ["Faydaların bugünkü değeri", `${sayi(n + maliyet, 1)} milyon TL`], ["Net bugünkü değer", `${sayi(n, 1)} milyon TL`, n >= 0 ? "yesil" : "kirmizi"], ["Karar", n >= 0 ? "Yap" : "Yapma", n >= 0 ? "yesil" : "kirmizi"]]);
      Y.notYaz(not, `Fayda–maliyet analizi gelecekteki faydaları bugüne indirger (iskonto) ve maliyetle karşılaştırır. Can gibi "paha biçilmez" şeyleri bile ölçmek zorunda kalır: <b>istatistiksel hayatın değeri</b>, insanların küçük bir ölüm riskini azaltmak için ödemeye razı olduğu paradan türetilir (ör. 1/100.000 riski azaltmak için 300 TL ödemeye razıysan VSL = 300 × 100.000 = 30 milyon TL). Sonuç iskonto oranına çok duyarlıdır: oran yükseldikçe uzak faydalar küçülür. Colander'ın uyarısı: bu analiz bir girdi, son karar değil; varsayımlar açıkça yazılmalı.`, n >= 0 ? "iyi" : "uyari");
    }
    ciz();
  };
})();
