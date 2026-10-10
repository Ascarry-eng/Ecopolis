// grafik.js — SVG grafik motoru + görsel çerçevesi (başlık, kaydırıcılar, okuma tablosu).
// Bütün etkileşimli iktisat ve matematik görselleri bunun üstüne kurulur.
(function () {
  "use strict";
  const { el, sayi } = ECO;

  let kimlikSayac = 0;

  function Grafik(kap, ayar = {}) {
    const G = {};
    // viewBox kabın gerçek genişliğinde: yazılar telefonda da masaüstünde de aynı piksel boyunda kalır
    const kapGen = kap.clientWidth || Math.min(window.innerWidth - 40, 640);
    const gen = ayar.gen || Math.max(300, Math.min(680, Math.round(kapGen)));
    const yuk = ayar.yuk || Math.round(gen * (ayar.oran || (gen < 420 ? 0.86 : 0.7)));
    const k = Object.assign({ sol: 54, alt: 46, ust: 18, sag: 22 }, ayar.kenar || {});
    let [x0, x1] = ayar.x || [0, 10];
    let [y0, y1] = ayar.y || [0, 10];
    const id = "g" + (++kimlikSayac);
    const genis = gen - k.sol - k.sag, yuksek = yuk - k.ust - k.alt;

    const px = (x) => k.sol + ((x - x0) / (x1 - x0)) * genis;
    const py = (y) => k.ust + (1 - (y - y0) / (y1 - y0)) * yuksek;
    const vx = (p) => x0 + ((p - k.sol) / genis) * (x1 - x0);
    const vy = (p) => y0 + (1 - (p - k.ust) / yuksek) * (y1 - y0);

    const svg = el("svg", { class: "grafik", viewBox: `0 0 ${gen} ${yuk}`, role: "img", "aria-label": ayar.etiket || "grafik", preserveAspectRatio: "xMidYMid meet" });
    const defs = el("defs", null,
      el("clipPath", { id: id + "-kirp" }, el("rect", { x: k.sol, y: k.ust, width: genis, height: yuksek })),
      el("marker", { id: id + "-ok", viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" }, el("path", { d: "M0 0 L10 5 L0 10 z", class: "ok-ucu" })));
    svg.append(defs);
    const izgara = el("g", { class: "izgara" });
    const eksen = el("g", { class: "eksen" });
    const alanlar = el("g", { "clip-path": `url(#${id}-kirp)` });
    const cizim = el("g", { "clip-path": `url(#${id}-kirp)` });
    const ust = el("g");
    const kalici = el("g");   // tutamaçlar: temizle() silmez, sürükleme yeniden çizimde kopmasın
    svg.append(izgara, alanlar, cizim, eksen, ust, kalici);
    kap.append(svg);

    function adimBul(aralik) {
      const kaba = aralik / 6, us = Math.pow(10, Math.floor(Math.log10(kaba)));
      const n = kaba / us;
      return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * us;
    }
    const bicimX = ayar.xBicim || ((v) => sayi(v, 2));
    const bicimY = ayar.yBicim || ((v) => sayi(v, 2));

    function eksenCiz() {
      izgara.innerHTML = ""; eksen.innerHTML = "";
      const xa = ayar.xAdim || adimBul(x1 - x0), ya = ayar.yAdim || adimBul(y1 - y0);
      if (ayar.izgara !== false) {
        for (let v = Math.ceil(x0 / xa) * xa; v <= x1 + 1e-9; v += xa) izgara.append(el("line", { x1: px(v), x2: px(v), y1: k.ust, y2: k.ust + yuksek }));
        for (let v = Math.ceil(y0 / ya) * ya; v <= y1 + 1e-9; v += ya) izgara.append(el("line", { x1: k.sol, x2: k.sol + genis, y1: py(v), y2: py(v) }));
      }
      const ex = y0 <= 0 && y1 >= 0 ? py(0) : k.ust + yuksek;
      const ey = x0 <= 0 && x1 >= 0 ? px(0) : k.sol;
      eksen.append(el("line", { class: "eksen-cizgi", x1: k.sol, x2: k.sol + genis + 6, y1: ex, y2: ex, "marker-end": `url(#${id}-ok)` }));
      eksen.append(el("line", { class: "eksen-cizgi", x1: ey, x2: ey, y1: k.ust + yuksek, y2: k.ust - 6, "marker-end": `url(#${id}-ok)` }));
      if (ayar.sayilar !== false) {
        for (let v = Math.ceil(x0 / xa) * xa; v <= x1 + 1e-9; v += xa) {
          if (Math.abs(v) < 1e-9 && ey === px(0)) continue;
          eksen.append(el("text", { class: "eksen-sayi", x: px(v), y: ex + 17, "text-anchor": "middle", text: bicimX(v) }));
        }
        for (let v = Math.ceil(y0 / ya) * ya; v <= y1 + 1e-9; v += ya) {
          if (Math.abs(v) < 1e-9 && ex === py(0)) continue;
          eksen.append(el("text", { class: "eksen-sayi", x: ey - 7, y: py(v) + 4, "text-anchor": "end", text: bicimY(v) }));
        }
      }
      if (ayar.xEtiket) eksen.append(el("text", { class: "eksen-ad", x: k.sol + genis, y: ex + 36, "text-anchor": "end", text: ayar.xEtiket }));
      if (ayar.yEtiket) eksen.append(el("text", { class: "eksen-ad", x: ey + 8, y: k.ust + 4, "text-anchor": "start", text: ayar.yEtiket }));
    }
    eksenCiz();

    // ---- çizim ögeleri (temizle() ile silinir)
    function temizle() { alanlar.innerHTML = ""; cizim.innerHTML = ""; ust.innerHTML = ""; }

    function egri(f, o = {}) {
      const a = o.x0 != null ? o.x0 : x0, b = o.x1 != null ? o.x1 : x1;
      const n = o.adim || 220;
      let d = "", acik = false;
      for (let i = 0; i <= n; i++) {
        const x = a + ((b - a) * i) / n;
        let y;
        try { y = f(x); } catch (e) { y = NaN; }
        if (!isFinite(y) || Math.abs(y) > 1e7) { acik = false; continue; }
        const Y = Math.max(-1e4, Math.min(1e4, py(y)));
        d += (acik ? "L" : "M") + px(x).toFixed(2) + " " + Y.toFixed(2);
        acik = true;
      }
      const p = el("path", { d, class: "egri " + (o.sinif || "r-1") + (o.kesik ? " kesik" : ""), style: o.kalin ? `stroke-width:${o.kalin}` : null });
      cizim.append(p);
      if (o.etiket) {
        let ex = o.etiketX != null ? o.etiketX : a + (b - a) * 0.92;
        let ey = f(ex);
        if (!isFinite(ey) || ey > y1 || ey < y0) {
          // görünür alanda son noktayı bul
          for (let i = n; i >= 0; i--) { const x = a + ((b - a) * i) / n; const y = f(x); if (isFinite(y) && y <= y1 && y >= y0) { ex = x; ey = y; break; } }
        }
        etiket(ex, ey, o.etiket, { sinif: o.sinif, dx: o.etiketDx != null ? o.etiketDx : 6, dy: o.etiketDy != null ? o.etiketDy : -8 });
      }
      return p;
    }

    function noktalar(liste, o = {}) {
      const d = liste.map(([x, y], i) => (i ? "L" : "M") + px(x).toFixed(2) + " " + py(y).toFixed(2)).join("");
      const p = el("path", { d, class: "egri " + (o.sinif || "r-1") + (o.kesik ? " kesik" : "") });
      cizim.append(p);
      if (o.isaret) for (const [x, y] of liste) cizim.append(el("circle", { cx: px(x), cy: py(y), r: 3.2, class: "isaret " + (o.sinif || "r-1") }));
      if (o.etiket) { const [ex, ey] = liste[o.etiketI != null ? o.etiketI : liste.length - 1]; etiket(ex, ey, o.etiket, { sinif: o.sinif, dx: o.etiketDx || 6, dy: o.etiketDy || -8 }); }
      return p;
    }

    function cizgi(xa, ya, xb, yb, o = {}) {
      const p = el("line", { x1: px(xa), y1: py(ya), x2: px(xb), y2: py(yb), class: "egri " + (o.sinif || "r-1") + (o.kesik ? " kesik" : ""), "marker-end": o.ok ? `url(#${id}-ok)` : null, style: o.kalin ? `stroke-width:${o.kalin}` : null });
      (o.ustte ? ust : cizim).append(p);
      return p;
    }
    function ok(xa, ya, xb, yb, o = {}) { return cizgi(xa, ya, xb, yb, Object.assign({ sinif: "ok-cizgi", ok: true, ustte: true }, o)); }

    // Noktadan eksenlere kesikli kılavuz + eksende değer etiketi
    function kilavuz(x, y, o = {}) {
      const ex = y0 <= 0 ? py(0) : k.ust + yuksek, ey = x0 <= 0 ? px(0) : k.sol;
      if (o.yatay !== false) cizim.append(el("line", { x1: ey, y1: py(y), x2: px(x), y2: py(y), class: "kilavuz" }));
      if (o.dikey !== false) cizim.append(el("line", { x1: px(x), y1: py(y), x2: px(x), y2: ex, class: "kilavuz" }));
      if (o.xYazi) ust.append(el("text", { class: "kilavuz-yazi", x: px(x), y: ex - 6, "text-anchor": "middle", text: o.xYazi }));
      if (o.yYazi) ust.append(el("text", { class: "kilavuz-yazi", x: ey + 5, y: py(y) - 5, "text-anchor": "start", text: o.yYazi }));
    }

    function nokta(x, y, o = {}) {
      const c = el("circle", { cx: px(x), cy: py(y), r: o.r || 4.5, class: "nokta " + (o.sinif || "") });
      ust.append(c);
      if (o.etiket) etiket(x, y, o.etiket, { dx: o.dx != null ? o.dx : 8, dy: o.dy != null ? o.dy : -8, sinif: o.etiketSinif || "koyu" });
      return c;
    }

    function etiket(x, y, metin, o = {}) {
      const t = el("text", { x: px(x) + (o.dx || 0), y: py(y) + (o.dy || 0), class: "etiket " + (o.sinif || ""), "text-anchor": o.hiza || "start", text: metin });
      ust.append(t);
      // Çerçeveden taşan yazıyı içeri al (uzun eğri adları sağ kenarda kesiliyordu)
      let b = null;
      try { b = t.getBBox(); } catch (e) { /* */ }
      if (!b || !b.width) {
        // Kap henüz sayfada değil (Kâhin cevabı eklenmeden çizilir): 14px kalın italik için ~7.4px/harf tahmini
        const w = String(metin).length * 7.4, x_ = +t.getAttribute("x"), h = o.hiza || "start";
        b = { x: h === "end" ? x_ - w : h === "middle" ? x_ - w / 2 : x_, width: w, y: +t.getAttribute("y") - 12 };
      }
      if (b.x + b.width > gen - 2) { t.setAttribute("text-anchor", "end"); t.setAttribute("x", Math.min(px(x) - (o.dx || 0), gen - 2)); }
      else if (b.x < 2) { t.setAttribute("text-anchor", "start"); t.setAttribute("x", 2); }
      if (b.y < 2) t.setAttribute("y", +t.getAttribute("y") + (2 - b.y));
      return t;
    }

    // İki işlev arası alan (x a..b) — alt işlev sayı da olabilir
    function alan(ustF, altF, a, b, o = {}) {
      const f = typeof ustF === "number" ? () => ustF : ustF;
      const g = typeof altF === "number" ? () => altF : altF;
      if (!(b > a)) return null;
      const n = o.adim || 80;
      const ustler = [], altlar = [];
      for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; ustler.push([x, f(x)]); altlar.push([x, g(x)]); }
      const d = "M" + ustler.map(([x, y]) => px(x).toFixed(2) + " " + py(y).toFixed(2)).join("L") + "L" + altlar.reverse().map(([x, y]) => px(x).toFixed(2) + " " + py(y).toFixed(2)).join("L") + "Z";
      const p = el("path", { d, class: "alan " + (o.sinif || "a-1") });
      alanlar.append(p);
      if (o.etiket) {
        const mx = o.etiketX != null ? o.etiketX : a + (b - a) * (o.etiketOran || 0.33);
        const my = o.etiketY != null ? o.etiketY : (f(mx) + g(mx)) / 2;
        ust.append(el("text", { x: px(mx), y: py(my) + 4, class: "alan-yazi", "text-anchor": "middle", text: o.etiket }));
      }
      return p;
    }
    function cokgen(liste, o = {}) {
      const p = el("path", { d: "M" + liste.map(([x, y]) => px(x).toFixed(2) + " " + py(y).toFixed(2)).join("L") + "Z", class: "alan " + (o.sinif || "a-1") });
      alanlar.append(p);
      if (o.etiket) {
        const mx = o.etiketX != null ? o.etiketX : liste.reduce((s, q) => s + q[0], 0) / liste.length;
        const my = o.etiketY != null ? o.etiketY : liste.reduce((s, q) => s + q[1], 0) / liste.length;
        ust.append(el("text", { x: px(mx), y: py(my) + 4, class: "alan-yazi", "text-anchor": "middle", text: o.etiket }));
      }
      return p;
    }
    function dikdortgen(xa, ya, xb, yb, o = {}) { return cokgen([[xa, ya], [xb, ya], [xb, yb], [xa, yb]], o); }

    // Sürüklenebilir tutamaç (kalıcı katmanda). surukle(x, y) çağrılır; görsel yeniden çizerken konum(x, y) ile
    // tutamacı taşır. Klavye: oklar (Shift ile büyük adım).
    function tutamac(x, y, o = {}) {
      const g = el("g", { class: "tutamac " + (o.sinif || ""), tabindex: "0", role: "slider", "aria-label": o.etiket || "sürüklenebilir nokta" });
      const halka = el("circle", { cx: px(x), cy: py(y), r: 18, class: "tutamac-alan" });
      const top = el("circle", { cx: px(x), cy: py(y), r: 7.5, class: "tutamac-top" });
      g.append(halka, top);
      kalici.append(g);
      let suruk = false;
      const konumBul = (e) => {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX; pt.y = e.clientY;
        const m = svg.getScreenCTM();
        if (!m) return null;
        const q = pt.matrixTransform(m.inverse());
        return [vx(q.x), vy(q.y)];
      };
      const kis = (a, b) => [Math.max(x0, Math.min(x1, a)), Math.max(y0, Math.min(y1, b))];
      g.addEventListener("pointerdown", (e) => { suruk = true; try { g.setPointerCapture(e.pointerId); } catch (_) { /* */ } g.classList.add("suruk"); e.preventDefault(); });
      g.addEventListener("pointermove", (e) => { if (!suruk) return; const q = konumBul(e); if (q && o.surukle) o.surukle(...kis(q[0], q[1])); });
      const birak = () => { if (suruk) { suruk = false; g.classList.remove("suruk"); o.bitti && o.bitti(); } };
      g.addEventListener("pointerup", birak);
      g.addEventListener("pointercancel", birak);
      g.addEventListener("keydown", (e) => {
        const c = e.shiftKey ? 10 : 1;
        const dx = ((x1 - x0) / 100) * c, dy = ((y1 - y0) / 100) * c;
        const h = { ArrowLeft: [-dx, 0], ArrowRight: [dx, 0], ArrowUp: [0, dy], ArrowDown: [0, -dy] }[e.key];
        if (!h) return;
        e.preventDefault();
        if (o.surukle) o.surukle(...kis(x + h[0], y + h[1]));
        o.bitti && o.bitti();
      });
      return {
        g,
        konum(nx, ny) { x = nx; y = ny; for (const c of [halka, top]) { c.setAttribute("cx", px(x)); c.setAttribute("cy", py(y)); } },
        gizle(evet) { g.style.display = evet ? "none" : ""; },
      };
    }

    function sinirlar(yeni) {
      if (yeni.x) [x0, x1] = yeni.x;
      if (yeni.y) [y0, y1] = yeni.y;
      eksenCiz();
    }

    Object.assign(G, { svg, px, py, vx, vy, temizle, egri, noktalar, cizgi, ok, kilavuz, nokta, etiket, alan, cokgen, dikdortgen, tutamac, sinirlar,
      get x0() { return x0; }, get x1() { return x1; }, get y0() { return y0; }, get y1() { return y1; } });
    return G;
  }

  // ---------------------------------------------------------------- görsel çerçevesi ve kontroller
  function cerceve(kap, { baslik, aciklama, ikili } = {}) {
    kap.classList.add("sekil");
    const bas = baslik ? el("figcaption", { class: "sekil-bas" }, el("span", { class: "sekil-ad", text: baslik })) : null;
    const sahne = el("div", { class: "sekil-sahne" + (ikili ? " ikili" : "") });
    const kontrol = el("div", { class: "sekil-kontrol" });
    const okumaKap = el("div", { class: "sekil-okuma", "aria-live": "polite" });
    const not = el("div", { class: "sekil-not" });
    const fig = el("figure", { class: "sekil-ic" }, bas, sahne, kontrol, okumaKap, aciklama ? el("p", { class: "sekil-aciklama", text: aciklama }) : null, not);
    kap.append(fig);
    return { sahne, kontrol, okumaKap, not, fig };
  }

  function kaydirici(kap, o) {
    const id = "k" + (++kimlikSayac);
    const bicim = o.bicim || ((v) => sayi(v, 2));
    const giris = el("input", { type: "range", id, min: o.min, max: o.max, step: o.adim || 1, value: o.deger });
    const deger = el("output", { for: id, class: "kaydirici-deger", text: bicim(+o.deger) });
    const s = el("div", { class: "kaydirici" }, el("label", { for: id, html: o.etiket }), deger, giris);
    const guncelle = () => { deger.textContent = bicim(+giris.value); };
    giris.addEventListener("input", () => { guncelle(); o.degisti && o.degisti(+giris.value); });
    kap.append(s);
    return {
      get deger() { return +giris.value; },
      ayarla(v, sessiz) { giris.value = v; guncelle(); if (!sessiz && o.degisti) o.degisti(+giris.value); },
      kutu: s,
    };
  }

  function secici(kap, o) {
    const kutu = el("div", { class: "secici", role: "radiogroup", "aria-label": o.etiket || "" });
    if (o.etiket) kutu.append(el("span", { class: "secici-ad", text: o.etiket }));
    let deger = o.deger;
    const tuslar = o.secenekler.map(([d, ad]) => {
      const t = el("button", { type: "button", role: "radio", "aria-checked": String(d === deger), text: ad, onclick: () => { deger = d; tuslar.forEach((b, i) => b.setAttribute("aria-checked", String(o.secenekler[i][0] === d))); o.degisti && o.degisti(d); } });
      return t;
    });
    kutu.append(...tuslar);
    kap.append(kutu);
    return { get deger() { return deger; }, kutu };
  }

  function okuma(kap) {
    return {
      yaz(satirlar) {
        kap.innerHTML = "";
        const t = el("dl", { class: "okuma" });
        for (const [ad, deger, sinif] of satirlar) t.append(el("div", { class: "okuma-satir " + (sinif || "") }, el("dt", { html: ad }), el("dd", { html: deger })));
        kap.append(t);
      },
      ham(html) { kap.innerHTML = html; },
    };
  }

  function tus(kap, metin, onclick, sinif = "") {
    const t = el("button", { type: "button", class: "kucuk-tus " + sinif, text: metin, onclick });
    kap.append(t);
    return t;
  }

  ECO.Grafik = Grafik;
  ECO.Gorsel = { cerceve, kaydirici, secici, okuma, tus };
})();
