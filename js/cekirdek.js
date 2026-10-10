// cekirdek.js — ortak yardımcılar: DOM, kalıcı depo, bildirim, Markdown+KaTeX işleyici (yönergeler ve
// etkileşimli görsellerle), güvenli ifade ayrıştırıcı, Yunan rakamları, yönlendirme.
(function () {
  "use strict";
  const ECO = (window.ECO = window.ECO || {});

  // ---------------------------------------------------------------- depo (localStorage; erişim atabilir)
  const ON = "ecopolis.";
  const depo = {
    al(k, varsayilan) {
      try { const v = localStorage.getItem(ON + k); return v == null ? varsayilan : JSON.parse(v); }
      catch (e) { return varsayilan; }
    },
    koy(k, v) { try { localStorage.setItem(ON + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    sil(k) { try { localStorage.removeItem(ON + k); } catch (e) { /* */ } },
    hepsi() {
      const o = {};
      try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith(ON)) o[k.slice(ON.length)] = JSON.parse(localStorage.getItem(k)); } }
      catch (e) { /* */ }
      return o;
    },
  };

  // ---------------------------------------------------------------- DOM
  function el(etiket, ozellik, ...cocuklar) {
    const svg = /^(svg|g|path|line|circle|rect|text|tspan|polygon|polyline|defs|clipPath|pattern|linearGradient|radialGradient|stop|use|ellipse|title|mask|marker)$/.test(etiket);
    const e = svg ? document.createElementNS("http://www.w3.org/2000/svg", etiket) : document.createElement(etiket);
    if (ozellik) for (const [k, v] of Object.entries(ozellik)) {
      if (v == null || v === false) continue;
      if (k === "class") svg ? e.setAttribute("class", v) : (e.className = v);
      else if (k === "html") e.innerHTML = v;
      else if (k === "text") e.textContent = v;
      else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    for (const c of cocuklar.flat(Infinity)) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(String(c)));
    return e;
  }
  const kacis = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, k = document) => k.querySelector(s);
  const $$ = (s, k = document) => Array.from(k.querySelectorAll(s));

  let bildirimZaman = 0;
  function bildir(metin, sure = 2400) {
    const b = document.getElementById("bildirim");
    if (!b) return;
    b.textContent = metin;
    b.classList.add("acik");
    clearTimeout(bildirimZaman);
    bildirimZaman = setTimeout(() => b.classList.remove("acik"), sure);
  }

  const sayi = (x, ondalik = 2) => {
    if (x == null || !isFinite(x)) return "—";
    const r = Math.round(x * 10 ** ondalik) / 10 ** ondalik;
    return (Object.is(r, -0) ? 0 : r).toLocaleString("tr-TR", { maximumFractionDigits: ondalik });
  };
  // LaTeX içinde Türkçe ondalık virgülü {,} ile
  const sayiTex = (x, ondalik = 2) => sayi(x, ondalik).replace(/\./g, "\\,").replace(/,/g, "{,}");

  // ---------------------------------------------------------------- Yunan rakamları (Α΄ Β΄ … ΚΓ΄)
  function yunanRakam(n) {
    const birler = ["", "Α", "Β", "Γ", "Δ", "Ε", "Ϛ", "Ζ", "Η", "Θ"];
    const onlar = ["", "Ι", "Κ", "Λ", "Μ", "Ν", "Ξ", "Ο", "Π", "Ϙ"];
    return onlar[Math.floor(n / 10) % 10] + birler[n % 10] + "ʹ";
  }

  // ---------------------------------------------------------------- tarih
  const bugun = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const gunFarki = (a, b) => Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / 864e5);
  const gunEkle = (g, n) => { const d = new Date(g + "T12:00"); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };

  // ---------------------------------------------------------------- güvenli ifade ayrıştırıcı
  // Kâhin'in çizdirdiği grafiklerde ve matematik görsellerinde kullanılır. eval YOK.
  // Desteklenen: sayılar, x (ve isteğe bağlı başka değişkenler), + - * / ^, parantez, örtük çarpım (2x, 3(x+1)),
  // sabitler pi e, işlevler sqrt ln log exp abs sin cos tan min max floor ceil.
  const Ifade = (function () {
    const ISLEV = { sqrt: Math.sqrt, ln: Math.log, log: Math.log10, exp: Math.exp, abs: Math.abs, sin: Math.sin, cos: Math.cos, tan: Math.tan, floor: Math.floor, ceil: Math.ceil, min: Math.min, max: Math.max };
    function belirtecler(s) {
      const t = [];
      let i = 0;
      s = String(s).replace(/\s+/g, "").replace(/\*\*/g, "^").replace(/·|×/g, "*").replace(/−/g, "-");
      while (i < s.length) {
        const c = s[i];
        if (/[0-9.]/.test(c)) { let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++; if (s[j] === "e" && /[-+0-9]/.test(s[j + 1] || "") && !/[a-z]/i.test(s[j + 1])) { j++; if (/[-+]/.test(s[j])) j++; while (/[0-9]/.test(s[j] || "")) j++; } t.push({ t: "s", v: parseFloat(s.slice(i, j)) }); i = j; }
        else if (/[a-zA-Z_]/.test(c)) { let j = i; while (j < s.length && /[a-zA-Z_0-9]/.test(s[j])) j++; t.push({ t: "a", v: s.slice(i, j) }); i = j; }
        else if ("+-*/^(),".includes(c)) { t.push({ t: c }); i++; }
        else throw new Error("Tanınmayan karakter: " + c);
      }
      return t;
    }
    function derle(metin, degiskenler = ["x"]) {
      const t = belirtecler(metin);
      let p = 0;
      const bak = () => t[p], al = () => t[p++];
      const bekle = (k) => { if (!t[p] || t[p].t !== k) throw new Error(`"${k}" bekleniyordu`); p++; };
      // dilbilgisi: toplam := carpim (('+'|'-') carpim)* ; carpim := tekli (('*'|'/'|örtük) tekli)* ;
      // tekli := '-' tekli | us ; us := oge ('^' tekli)?
      function toplam() { let a = carpim(); while (bak() && (bak().t === "+" || bak().t === "-")) { const o = al().t, b = carpim(), x = a; a = o === "+" ? (v) => x(v) + b(v) : (v) => x(v) - b(v); } return a; }
      function carpim() {
        let a = tekli();
        for (;;) {
          const k = bak();
          if (k && (k.t === "*" || k.t === "/")) { al(); const b = tekli(), x = a; a = k.t === "*" ? (v) => x(v) * b(v) : (v) => x(v) / b(v); }
          else if (k && (k.t === "s" || k.t === "a" || k.t === "(")) { const b = us(), x = a; a = (v) => x(v) * b(v); }
          else return a;
        }
      }
      function tekli() { if (bak() && bak().t === "-") { al(); const a = tekli(); return (v) => -a(v); } if (bak() && bak().t === "+") { al(); return tekli(); } return us(); }
      function us() { const a = oge(); if (bak() && bak().t === "^") { al(); const b = tekli(); return (v) => Math.pow(a(v), b(v)); } return a; }
      function oge() {
        const k = al();
        if (!k) throw new Error("İfade eksik");
        if (k.t === "s") { const s = k.v; return () => s; }
        if (k.t === "(") { const a = toplam(); bekle(")"); return a; }
        if (k.t === "a") {
          const ad = k.v.toLowerCase();
          if (ISLEV[ad] && bak() && bak().t === "(") {
            al(); const args = [toplam()];
            while (bak() && bak().t === ",") { al(); args.push(toplam()); }
            bekle(")");
            const f = ISLEV[ad];
            return (v) => f(...args.map((g) => g(v)));
          }
          if (ad === "pi") return () => Math.PI;
          if (ad === "e") return () => Math.E;
          const i = degiskenler.indexOf(k.v);
          if (i >= 0) return (v) => (Array.isArray(v) ? v[i] : v);
          throw new Error("Bilinmeyen ad: " + k.v);
        }
        throw new Error("Beklenmeyen: " + k.t);
      }
      const f = toplam();
      if (p < t.length) throw new Error("Fazladan: " + (t[p].v != null ? t[p].v : t[p].t));
      return f;
    }
    return { derle };
  })();

  // ---------------------------------------------------------------- Markdown + KaTeX
  // Ders içeriği (güvenilir) yönergeleri ve görselleri kullanabilir:
  //   :::tanim Terim (EN)  …  :::        tanım kutusu        :::ipucu … :::   sınav ipucu
  //   :::dikkat … :::                    sık hata            :::gercek … :::  gerçek dünya / Türkiye
  //   :::ornek Başlık … ---cozum--- … :::  çözümlü örnek (çözüm açılır)
  //   {{gorsel-adi}}  ya da  {{gorsel-adi|{"ayar":1}}}   etkileşimli görsel (kendi satırında)
  // Yapay zekâ cevabı (guvenli:false) yönerge ve ham HTML kullanamaz; ```grafik JSON ve ```r blokları
  // yine de kendi işleyicilerinden geçer (veri olarak ele alınır, kod olarak çalıştırılmaz — R hariç, o da
  // yalnız kullanıcı "Çalıştır"a basınca tarayıcıdaki R'da çalışır).
  if (window.marked) {
    marked.use({
      gfm: true, breaks: false,
      renderer: {
        html(t) { return kacis(t.raw != null ? t.raw : t.text || ""); },
        image(t) { return kacis(t.text || ""); },
        link(t) {
          const yazi = this.parser.parseInline(t.tokens);
          if (/^https?:\/\//i.test(t.href || "")) return `<a href="${kacis(t.href)}" target="_blank" rel="noopener">${yazi}</a>`;
          if (/^#\//.test(t.href || "")) return `<a href="${kacis(t.href)}">${yazi}</a>`;
          return yazi;
        },
        code(t) {
          const dil = (t.lang || "").trim().split(/\s+/)[0].toLowerCase();
          const kod = t.text || "";
          if (dil === "r" || dil === "r-calistir") return `<div class="r-blok" data-kod="${kacis(kod)}" data-ayar="${kacis((t.lang || "").trim().split(/\s+/).slice(1).join(" "))}"><pre><code>${kacis(kod)}</code></pre></div>`;
          if (dil === "quiz") return `<div class="ai-quiz" data-spec="${kacis(kod)}"></div>`;
          if (dil === "grafik") return `<div class="ai-grafik" data-spec="${kacis(kod)}"></div>`;
          return `<pre class="kod"><code>${kacis(kod)}</code></pre>`;
        },
      },
    });
  }

  // Dar ekranda, en üst düzeydeki \qquad / ",\quad" ayırıcılarıyla yan yana dizilmiş blok formülleri alt alta diz
  function satirlaraBol(tex) {
    if (/\\begin\{/.test(tex)) return tex;
    const parca = [];
    let derinlik = 0, bas = 0;
    for (let i = 0; i < tex.length; i++) {
      const c = tex[i];
      if (c === "{") derinlik++;
      else if (c === "}") derinlik--;
      else if (derinlik === 0 && c === "\\") {
        const m = tex.slice(i).match(/^\\q?quad(?![a-zA-Z])/);
        if (!m) continue;
        const once = tex.slice(bas, i);
        const virgul = /,\s*$/.test(once);
        if (m[0] === "\\quad" && !virgul) continue;   // tek \quad yalnız virgülden sonra ayırıcı sayılır
        parca.push(once.replace(/,\s*$/, ""));
        i += m[0].length - 1;
        while (/^\s*\\q?quad(?![a-zA-Z])/.test(tex.slice(i + 1))) { const k = tex.slice(i + 1).match(/^\s*\\q?quad/)[0].length; i += k; }
        bas = i + 1;
      }
    }
    if (!parca.length) return tex;
    parca.push(tex.slice(bas));
    return "\\begin{gathered}" + parca.map((p) => p.trim()).filter(Boolean).join("\\\\[4pt]") + "\\end{gathered}";
  }

  function formul(tex, blok) {
    try {
      const t = blok && typeof window !== "undefined" && window.innerWidth < 760 ? satirlaraBol(tex) : tex;
      return katex.renderToString(t, { displayMode: blok, throwOnError: false, output: "html", strict: "ignore" });
    }
    catch (e) { return kacis(tex); }
  }

  function mdTemel(md) {
    const parca = [];
    const yer = (m, blok) => { parca.push({ m, blok }); return `\u0001M${parca.length - 1}\u0001`; };
    let t = String(md || "");
    const kodlar = [];
    // Kod çitleri: aynı uzunlukta çitle kapanır (````…```` içinde ``` olabilir)
    t = t.replace(/^(`{3,})[^\n]*\n[\s\S]*?^\1`*[ \t]*$/gm, (k) => { kodlar.push(k); return `\u0002K${kodlar.length - 1}\u0002`; });
    t = t.replace(/`[^`\n]+`/g, (k) => { kodlar.push(k); return `\u0002K${kodlar.length - 1}\u0002`; });
    t = t.replace(/\$\$([\s\S]+?)\$\$/g, (_, m) => yer(m, true))
      .replace(/\\\[([\s\S]+?)\\\]/g, (_, m) => yer(m, true))
      .replace(/\\\(([\s\S]+?)\\\)/g, (_, m) => yer(m, false))
      .replace(/(^|[^\\$])\$(?!\s)((?:[^$\n\\]|\\.)+?)(?<!\s)\$(?!\d)/g, (_, on, m) => on + yer(m, false));
    t = t.replace(/\u0002K(\d+)\u0002/g, (_, i) => kodlar[i]);
    let html = window.marked ? marked.parse(t) : `<p>${kacis(t)}</p>`;
    html = html.replace(/<p>\s*\u0001M(\d+)\u0001\s*<\/p>/g, (_, i) => formul(parca[i].m, true));
    html = html.replace(/\u0001M(\d+)\u0001/g, (_, i) => formul(parca[i].m, parca[i].blok));
    return html;
  }

  const KUTU = {
    tanim: { sinif: "kutu-tanim", baslik: "Tanım" },
    ipucu: { sinif: "kutu-ipucu", baslik: "Sınav ipucu" },
    dikkat: { sinif: "kutu-dikkat", baslik: "Sık yapılan hata" },
    gercek: { sinif: "kutu-gercek", baslik: "Gerçek dünyada" },
    ornek: { sinif: "kutu-ornek", baslik: "Çözümlü örnek" },
    not: { sinif: "kutu-not", baslik: "Not" },
  };

  function isle(md, { guvenli = false } = {}) {
    if (!guvenli) return mdTemel(md);
    const yerler = [];
    const tut = (html) => { yerler.push(html); return `\n\n\u0003Y${yerler.length - 1}\u0003\n\n`; };
    let t = String(md || "");
    // :::tur başlık \n … \n:::   (iç içe değil)
    t = t.replace(/^:::(\w+)[ \t]*(.*)\n([\s\S]*?)\n:::[ \t]*$/gm, (_, tur, baslik, govde) => {
      const k = KUTU[tur] || KUTU.not;
      if (tur === "ornek") {
        const [soru, cozum] = govde.split(/^---cozum---$/m);
        return tut(`<div class="kutu ${k.sinif}"><div class="kutu-bas">${kacis(baslik || k.baslik)}</div>${mdTemel(soru)}${cozum != null ? `<details class="cozum"><summary>Çözümü göster</summary>${mdTemel(cozum)}</details>` : ""}</div>`);
      }
      if (tur === "tanim") return tut(`<div class="kutu ${k.sinif}"><div class="kutu-bas"><span class="kutu-tur">${k.baslik}</span>${baslik ? `<span class="kutu-terim">${kacis(baslik)}</span>` : ""}</div>${mdTemel(govde)}</div>`);
      return tut(`<div class="kutu ${k.sinif}"><div class="kutu-bas">${kacis(baslik || k.baslik)}</div>${mdTemel(govde)}</div>`);
    });
    t = t.replace(/^\{\{([\w-]+)(?:\|(.*))?\}\}[ \t]*$/gm, (_, ad, ayar) => tut(`<div class="gorsel" data-gorsel="${kacis(ad)}" data-ayar="${kacis(ayar || "{}")}"></div>`));
    let html = mdTemel(t);
    html = html.replace(/<p>\s*\u0003Y(\d+)\u0003\s*<\/p>/g, (_, i) => yerler[i]).replace(/\u0003Y(\d+)\u0003/g, (_, i) => yerler[i]);
    return html;
  }

  // İşlenen HTML'deki görselleri, R bloklarını ve yapay zekâ grafiklerini canlandır
  function canlandir(kap, baglam = {}) {
    for (const d of $$(".gorsel[data-gorsel]", kap)) {
      if (d.dataset.kuruldu) continue;
      d.dataset.kuruldu = "1";
      let ayar = {};
      try { ayar = JSON.parse(d.dataset.ayar || "{}"); } catch (e) { /* */ }
      const kur = ECO.gorseller && ECO.gorseller[d.dataset.gorsel];
      if (kur) { try { kur(d, ayar, baglam); } catch (e) { console.error(e); d.textContent = "Görsel yüklenemedi: " + e.message; } }
      else d.replaceWith(el("p", { class: "eksik", text: `[görsel bulunamadı: ${d.dataset.gorsel}]` }));
    }
    if (ECO.R) for (const d of $$(".r-blok", kap)) ECO.R.blokKur(d, baglam);
    if (ECO.aiGrafik) for (const d of $$(".ai-grafik", kap)) ECO.aiGrafik(d);
  }

  // ---------------------------------------------------------------- yönlendirme
  // #/  #/mikro  #/mikro/m04  #/mikro/m04/quiz  #/kahin  #/kartlar  #/olympia  #/sozluk  #/ayarlar
  const sayfalar = {};
  let simdiki = null;
  function sayfa(ad, nesne) { sayfalar[ad] = nesne; }
  function rotaCoz() {
    const h = (location.hash || "#/").replace(/^#\/?/, "");
    const parcalar = h.split("/").filter(Boolean).map(decodeURIComponent);
    return { ad: parcalar[0] || "akropolis", parcalar: parcalar.slice(1), tam: h };
  }
  async function yonlendir() {
    const r = rotaCoz();
    const s = sayfalar[r.ad] || sayfalar.akropolis;
    const sahne = document.getElementById("sahne");
    if (simdiki && simdiki.ayril) { try { simdiki.ayril(); } catch (e) { /* */ } }
    simdiki = s;
    document.body.dataset.sayfa = r.ad;
    $$("#ray a[data-rota]").forEach((a) => a.setAttribute("aria-current", a.dataset.rota === (s.bolge || r.ad) ? "page" : "false"));
    sahne.innerHTML = "";
    sahne.scrollTop = 0;
    window.scrollTo(0, 0);
    try { await s.goster(sahne, r.parcalar); }
    catch (e) { console.error(e); sahne.append(el("div", { class: "sayfa" }, el("h1", { text: "Bir şey ters gitti" }), el("p", { text: e.message }))); }
    if (s.baslik) document.title = s.baslik(r.parcalar) + " — Ecopolis"; else document.title = "Ecopolis";
    if (!document.body.classList.contains("ilk")) { const h = sahne.querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
    document.body.classList.remove("ilk");
  }
  const git = (rota) => { location.hash = "#/" + rota; };

  // ---------------------------------------------------------------- tembel betik yükleme (ders içerikleri)
  const yuklenen = {};
  function betikYukle(yol) {
    if (!yuklenen[yol]) yuklenen[yol] = new Promise((ok, hata) => {
      const s = document.createElement("script");
      s.src = yol + "?v=" + (ECO.SURUM || "1");
      s.onload = () => ok();
      s.onerror = () => { delete yuklenen[yol]; hata(new Error(yol + " yüklenemedi")); };
      document.head.append(s);
    });
    return yuklenen[yol];
  }

  Object.assign(ECO, { depo, el, kacis, $, $$, bildir, sayi, sayiTex, yunanRakam, bugun, gunFarki, gunEkle, Ifade, formul, isle, canlandir, sayfa, yonlendir, git, rotaCoz, betikYukle, gorseller: ECO.gorseller || {} });
})();
