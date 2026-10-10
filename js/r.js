// r.js — tarayıcıda gerçek R (webR, R 4.6, WebAssembly). İlk "Çalıştır"da yüklenir (~20 MB, sonra önbellekte).
// Ders içindeki ```r blokları düzenlenebilir ve çalıştırılabilir; oturum (global ortam) bloklar arasında ortak.
// Alıştırmalar öğrencinin kodunu çalıştırıp bir R ifadesiyle denetler. Ayrıca serbest R konsolu (#/rkonsol).
(function () {
  "use strict";
  const { el, depo, isle, ikon, bildir, sayfa, ilerleme: P } = ECO;
  const WEBR_URL = "https://webr.r-wasm.org/v0.6.0/webr.mjs";

  let webR = null, hazirlik = null, durum = "kapali";
  const dinleyiciler = new Set();
  const durumYaz = (d, metin) => { durum = d; dinleyiciler.forEach((f) => f(d, metin)); };
  const kurulu = new Set();
  let sira = Promise.resolve();   // R tek iş parçacıklı: çalıştırmaları sıraya koy

  let basarisiz = 0;
  async function hazirla() {
    if (webR) return webR;
    if (hazirlik) return hazirlik;
    hazirlik = (async () => {
      durumYaz("yukleniyor", "R hazırlanıyor… İlk seferde birkaç MB indirilir.");
      try {
        // Başarısız import tarayıcıda önbelleğe alınabilir: yeniden denemede adresi değiştir
        const { WebR } = await import(WEBR_URL + (basarisiz ? "?yeniden=" + basarisiz : ""));
        const w = new WebR({ interactive: false, baseUrl: WEBR_URL.replace(/[^/]*$/, "") });
        await w.init();
        await w.evalRVoid(`options(width = 72, digits = 7, warn = 1, OutDec = ".")`);
        webR = w;
        await dosyalariYaz();
        durumYaz("hazir", "R hazır");
        return w;
      } catch (e) {
        hazirlik = null; basarisiz++;
        durumYaz("hata", "R yüklenemedi: " + e.message);
        throw e;
      }
    })();
    return hazirlik;
  }

  // ---------------------------------------------------------------- örnek veri üreticileri (belirlenimli)
  // İçerik dosyaları dosyalar: { "ad.csv": "@uretici" } diye ister; "@" ile başlayan değer burada üretilir.
  const URETICI = {
    // SENTETİK öğrenci anketi (120 kişi). Gerçek kişilere ait değildir; R alıştırmaları için üretilmiştir.
    ogrenciAnket() {
      let s = 20261010;
      const r = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
      const z = () => { let u = 0; while (u === 0) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };
      const sehirler = ["İstanbul", "Ankara", "İzmir", "Bursa", "Diğer"];
      const satir = ["id,cinsiyet,sinif,sehir,calisiyor_mu,calisma_saati,uyku_saati,harclik,not_ortalamasi"];
      for (let i = 1; i <= 120; i++) {
        const cins = r() < 0.55 ? "Kadın" : "Erkek";
        const sinif = 1 + Math.floor(r() * 4);
        const sehir = sehirler[Math.min(4, Math.floor(r() ** 1.3 * 5))];
        const isi = r() < 0.3;
        const calisma = Math.max(0, Math.min(35, 13 + 4.5 * z() - (isi ? 4 : 0) + (cins === "Kadın" ? 1.5 : 0)));
        const uyku = Math.max(4, Math.min(10, 7 + 0.9 * z() - (isi ? 0.4 : 0)));
        const harclik = Math.round(Math.exp(Math.log(7500) + 0.35 * z()) / 50) * 50 + (isi ? 3000 : 0);
        const gno = Math.max(0.8, Math.min(4, 1.55 + 0.075 * calisma + 0.12 * (uyku - 7) - (isi ? 0.15 : 0) + 0.32 * z()));
        const uykuYaz = i % 47 === 0 || i === 13 ? "NA" : uyku.toFixed(1);
        const harclikYaz = i % 37 === 0 ? "NA" : String(harclik);
        satir.push([i, cins, sinif, sehir, isi ? "Evet" : "Hayır", calisma.toFixed(1), uykuYaz, harclikYaz, gno.toFixed(2)].join(","));
      }
      return satir.join("\n") + "\n";
    },
  };

  // Derslerin istediği örnek veri dosyaları (/home/web_user altına)
  const bekleyenDosyalar = {};
  async function dosyalariYaz() {
    if (!webR) return;
    for (const [ad, icerik] of Object.entries(bekleyenDosyalar)) {
      try { await webR.FS.writeFile("/home/web_user/" + ad, new TextEncoder().encode(icerik)); delete bekleyenDosyalar[ad]; } catch (e) { console.warn("dosya yazılamadı", ad, e); }
    }
  }
  function dosyaEkle(dosyalar) {
    for (const [ad, icerik] of Object.entries(dosyalar || {})) {
      bekleyenDosyalar[ad] = typeof icerik === "string" && icerik.startsWith("@") && URETICI[icerik.slice(1)] ? URETICI[icerik.slice(1)]() : icerik;
    }
    if (webR) dosyalariYaz();
  }

  // Koddaki library(x) / require(x) / x:: kullanımlarından paket listesi
  const TEMEL = new Set(["base", "stats", "utils", "graphics", "grDevices", "methods", "datasets", "tools", "grid", "parallel", "splines", "stats4", "tcltk", "compiler", "webr"]);
  function paketBul(kod) {
    const p = new Set();
    kod.replace(/(?:library|require|requireNamespace)\(\s*["']?([A-Za-z][\w.]*)["']?/g, (_, a) => p.add(a));
    kod.replace(/\b([A-Za-z][\w.]*)::/g, (_, a) => p.add(a));
    return [...p].filter((a) => !TEMEL.has(a));
  }

  async function paketKur(liste, yaz) {
    for (const a of liste) {
      if (kurulu.has(a)) continue;
      const var_ = await webR.evalRBoolean(`requireNamespace("${a}", quietly = TRUE)`);
      if (!var_) {
        yaz && yaz("bilgi", `“${a}” paketi kuruluyor (ilk seferde biraz sürebilir)…\n`);
        await webR.installPackages([a], { quiet: true });
      }
      kurulu.add(a);
    }
  }

  async function kosulMetni(o) {
    try { const m = await o.get("message"); const v = await m.toArray(); return String(v[0] || ""); }
    catch (e) { try { return String(await o.toString()); } catch (e2) { return "?"; } }
  }

  // Sık R hatalarına Türkçe açıklama
  const IPUCU = [
    [/object '(.+?)' not found/, (m) => `“${m[1]}” adında bir nesne yok. Önce oluşturdun mu? Adını doğru yazdın mı? (R büyük–küçük harfe duyarlıdır: Veri ≠ veri)`],
    [/could not find function "(.+?)"/, (m) => `“${m[1]}” işlevi bulunamadı. Adını doğru yazdın mı? Bir paketin işleviyse önce library() ile yükle.`],
    [/unexpected (symbol|numeric constant|string constant|'\)'|'\('|','|'\}'|'='|input|end of input)/, () => "Sözdizimi hatası: bir parantez, tırnak, virgül ya da operatör eksik/fazla olabilir. Satırı dikkatle kontrol et."],
    [/non-numeric argument to binary operator/, () => "Sayı olmayan bir şeyle aritmetik işlem yapmaya çalıştın (ör. \"5\" + 1). class() ile tipine bak; gerekirse as.numeric() kullan."],
    [/arguments imply differing number of rows/, () => "data.frame içindeki sütunların uzunlukları farklı. Her vektör aynı sayıda eleman içermeli."],
    [/subscript out of bounds/, () => "İndeks sınır dışı: var olmayan bir satıra, sütuna ya da elemana erişmeye çalıştın."],
    [/undefined columns selected/, () => "Var olmayan bir sütunu seçtin. names(veri) ile sütun adlarına bak."],
    [/there is no package called/, () => "Bu paket yüklü değil. Uygulamada paketler library() satırından otomatik kurulur; webR deposunda bulunmayan paketler kurulamaz."],
    [/argument "(.+?)" is missing, with no default/, (m) => `İşlevin “${m[1]}” argümanını vermedin.`],
    [/plot\.new has not been called yet/, () => "Önce plot() ile bir grafik açmalısın; lines(), points(), abline() mevcut grafiğin üstüne çizer."],
  ];
  const ipucu = (mesaj) => { for (const [re, f] of IPUCU) { const m = mesaj.match(re); if (m) return f(m); } return null; };

  // Öğrencinin kodunu R içinde ifade ifade, tryCatch ile çalıştıran sarmalayıcı: hataya kadar her çıktı korunur,
  // grafik cihazı bütün ifadeler için ortak kalır (plot() + abline() çalışır), atamalar global ortamda kalır.
  const SARMALAYICI = `local({
  .ifadeler <- tryCatch(parse(text = .ecopolis_kod, keep.source = FALSE),
                        error = function(e) { message("ECOPOLIS_SOZDIZIMI:", conditionMessage(e)); NULL })
  for (.i in seq_along(.ifadeler)) {
    .tamam <- tryCatch({
      .r <- withVisible(eval(.ifadeler[[.i]], envir = globalenv()))
      if (.r$visible) print(.r$value)
      TRUE
    }, error = function(e) { message("ECOPOLIS_HATA:", conditionMessage(e)); FALSE })
    if (!.tamam) break
  }
  rm(".ecopolis_kod", envir = globalenv())
  invisible(NULL)
})`;

  // kod → { cikti: [{tur, metin}], resimler: [ImageBitmap], hata: bool }
  function calistir(kod, o = {}) {
    const is = sira.then(async () => {
      await hazirla();
      const sonuc = { cikti: [], resimler: [], hata: false };
      const yaz = (tur, metin) => { sonuc.cikti.push({ tur, metin }); o.akis && o.akis(tur, metin); };
      try { await paketKur(paketBul(kod).concat(o.paketler || []), yaz); }
      catch (e) { yaz("hata", "Paket kurulamadı: " + e.message + "\n"); sonuc.hata = true; return sonuc; }
      const siginak = await new webR.Shelter();
      try {
        await webR.objs.globalEnv.bind(".ecopolis_kod", kod);
        const cap = await siginak.captureR(SARMALAYICI, { withAutoprint: false, captureStreams: true, captureConditions: true, captureGraphics: { width: 640, height: 440, bg: "white" } });
        for (const c of cap.output) {
          if (c.type === "stdout") yaz("cikti", c.data + "\n");
          else if (c.type === "stderr") yaz("uyari", c.data + "\n");
          else if (c.type === "warning") yaz("uyari", "Uyarı: " + (await kosulMetni(c.data)) + "\n");
          else if (c.type === "message" || c.type === "error") {
            const m = (await kosulMetni(c.data)).replace(/\n$/, "");
            if (c.type === "error" || m.startsWith("ECOPOLIS_HATA:") || m.startsWith("ECOPOLIS_SOZDIZIMI:")) {
              const saf = m.replace(/^ECOPOLIS_(HATA|SOZDIZIMI):/, "").replace(/^in `[^`]*`:\s*/, "");
              yaz("hata", (m.startsWith("ECOPOLIS_SOZDIZIMI:") ? "Sözdizimi hatası: " : "Hata: ") + saf + "\n");
              const ip = ipucu(saf);
              if (ip) yaz("bilgi", "↳ " + ip + "\n");
              sonuc.hata = true;
            } else yaz("bilgi", m + "\n");
          }
        }
        sonuc.resimler = cap.images || [];
      } catch (e) {
        const saf = (e.message || String(e)).replace(/^Error:?\s*/, "").replace(/^in `[^`]*`:\s*/, "");
        yaz("hata", "Hata: " + saf + "\n");
        const ip = ipucu(saf);
        if (ip) yaz("bilgi", "↳ " + ip + "\n");
        sonuc.hata = true;
      } finally {
        try { await siginak.purge(); } catch (e) { /* */ }
      }
      return sonuc;
    });
    sira = is.catch(() => {});
    return is;
  }

  async function mantiksal(ifade) {
    await hazirla();
    try { return await webR.evalRBoolean(`isTRUE(tryCatch(local({ ${ifade} }), error = function(e) FALSE))`); }
    catch (e) { return false; }
  }

  function ciktiCiz(kap, sonuc) {
    for (const { tur, metin } of sonuc.cikti) kap.append(el("span", { class: { cikti: "", uyari: "uyari", bilgi: "bilgi", hata: "hata" }[tur] || "", text: metin }));
    for (const b of sonuc.resimler) {
      const c = el("canvas", { width: b.width, height: b.height, role: "img", "aria-label": "R grafiği" });
      c.getContext("2d").drawImage(b, 0, 0);
      kap.append(c);
    }
    if (!sonuc.cikti.length && !sonuc.resimler.length) kap.append(el("span", { class: "bilgi", text: "(çıktı yok — kod çalıştı; sonucu görmek için nesnenin adını yaz)" }));
  }

  // ---------------------------------------------------------------- editör
  function editor(kod, o = {}) {
    const t = el("textarea", { class: "r-duzen", spellcheck: "false", autocapitalize: "off", autocomplete: "off", "aria-label": o.etiket || "R kodu" });
    t.value = kod;
    const boy = () => { t.style.height = "auto"; t.style.height = Math.max(56, t.scrollHeight + 4) + "px"; };
    t.addEventListener("input", boy);
    t.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); o.calistir && o.calistir(); return; }
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        const s = t.selectionStart;
        t.setRangeText("  ", s, t.selectionEnd, "end");
        boy();
      }
    });
    requestAnimationFrame(boy);
    setTimeout(boy, 50);
    return t;
  }

  function durumRozeti() {
    const r = el("span", { class: "r-durum " + durum }, el("span", { class: "isik" }), el("span", { class: "yazi", text: { kapali: "R uykuda", yukleniyor: "R yükleniyor…", hazir: "R hazır", hata: "R yüklenemedi" }[durum] }));
    const f = (d) => { r.className = "r-durum " + d; r.querySelector(".yazi").textContent = { kapali: "R uykuda", yukleniyor: "R yükleniyor…", hazir: "R hazır", hata: "R yüklenemedi" }[d]; };
    dinleyiciler.add(f);
    return r;
  }

  // Ders içindeki ```r bloğu
  function blokKur(d, baglam = {}) {
    if (d.dataset.kuruldu) return;
    d.dataset.kuruldu = "1";
    const ilk = d.dataset.kod || "";
    const ayar = d.dataset.ayar || "";
    const salt = /\bsalt\b/.test(ayar);   // ```r salt → yalnız göster (RStudio kurulum vb.)
    d.innerHTML = "";
    if (salt) { d.append(el("pre", null, el("code", { text: ilk }))); return; }
    const cikti = el("div", { class: "r-cikti", "aria-live": "polite" });
    const calTus = el("button", { class: "r-calistir", type: "button" }, ikon("oynat"), "Çalıştır");
    const ed = editor(ilk, { calistir: () => calTus.click() });
    const sifirla = el("button", { class: "kucuk-tus", type: "button", text: "Geri al", title: "Kodu ilk haline döndür", onclick: () => { ed.value = ilk; ed.dispatchEvent(new Event("input")); cikti.innerHTML = ""; } });
    const ust = el("div", { class: "r-ust" }, el("span", { text: "R" }), el("div", { class: "r-tuslar" }, sifirla, calTus));
    d.append(ust, ed, cikti);
    // Kutuyu çalıştır; true = hatasız. Önceki kutuların bu kutudan önce çalıştırılması gerekebilir (ortak oturum).
    d._calistir = async () => {
      calTus.disabled = true;
      cikti.innerHTML = "";
      if (!webR) cikti.append(el("span", { class: "bilgi", text: "R hazırlanıyor… (ilk seferde ~20 MB iner, sonraki açılışlarda önbellekten gelir)\n" }));
      let tamam = false;
      try {
        const s = await calistir(ed.value);
        cikti.innerHTML = "";
        ciktiCiz(cikti, s);
        tamam = !s.hata;
        if (tamam) d.dataset.calisti = "1";
        const metin = s.cikti.filter((c) => c.tur === "hata").map((c) => c.metin).join("");
        // "bulunamadı" hatası ve henüz çalıştırılmamış önceki kutular varsa: sırayla çalıştırmayı öner
        const onceki = Array.from(document.querySelectorAll(".r-blok")).filter((b) => b !== d && b._calistir && (b.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_FOLLOWING) && !b.dataset.calisti);
        if (s.hata && /not found|could not find function/.test(metin) && onceki.length) {
          cikti.append(el("button", { class: "kucuk-tus", type: "button", style: "margin:8px 8px 0 0", text: `Yukarıdaki ${onceki.length} kutuyu sırayla çalıştır, sonra bunu`, onclick: async (e) => {
            e.target.disabled = true;
            for (const b of onceki) { const ok = await b._calistir(); if (!ok) { bildir("Yukarıdaki bir kutuda hata çıktı"); return; } }
            d._calistir();
          } }));
        }
        if (s.hata && baglam.kahin !== true && ECO.Kahin) {
          cikti.append(el("button", { class: "kucuk-tus", type: "button", style: "margin-top:8px", text: "Kâhin'e sor: bu hata ne?", onclick: () => ECO.Kahin.sor({ mod: "kod", metin: `Şu R kodunu çalıştırdım:\n\n\`\`\`r\n${ed.value}\n\`\`\`\n\nŞu hatayı aldım:\n${metin}\nNeden ve nasıl düzeltirim?`, gonder: true }) }));
        }
      } catch (e) { cikti.innerHTML = ""; cikti.append(el("span", { class: "hata", text: "R yüklenemedi: " + e.message + "\nİnternet bağlantını kontrol et; R yalnız ilk açılışta internetten iner." })); }
      calTus.disabled = false;
      return tamam;
    };
    calTus.addEventListener("click", () => d._calistir());
  }

  // ---------------------------------------------------------------- alıştırmalar
  function alistirmaSekmesi(kap, id, ic) {
    if (ic.dosyalar) dosyaEkle(ic.dosyalar);
    const cozulen = depo.al("r.cozulen", {});
    kap.append(el("p", { class: "kaynak-not", style: "margin-top:16px", html: "Kodunu yaz, <b>Kontrol et</b>'e bas: uygulama kodunu gerçek R'da çalıştırıp sonucu denetler. Ctrl+Enter da çalıştırır." }), durumRozeti());
    (ic.alistirmalar || []).forEach((a, i) => {
      const anahtar = `${id}#${i}`;
      const kutu = el("section", { class: "alistirma" + (cozulen[anahtar] ? " cozuldu" : "") });
      kutu.append(el("div", { class: "alistirma-bas", text: `Alıştırma ${i + 1}${cozulen[anahtar] ? " · çözüldü" : ""}` }));
      kutu.append(el("div", { class: "metin", style: "font-size:1.05rem", html: isle(a.soru) }));
      const cikti = el("div", { class: "r-cikti" });
      const kontrolTus = el("button", { class: "r-calistir", type: "button" }, ikon("tik"), "Kontrol et");
      const ed = editor(depo.al("r.taslak." + anahtar, a.baslangic || ""), { calistir: () => kontrolTus.click() });
      ed.addEventListener("input", () => depo.koy("r.taslak." + anahtar, ed.value));
      const ipucuTus = a.ipucu ? el("button", { class: "kucuk-tus", type: "button", text: "İpucu", onclick: () => { ipucuTus.replaceWith(el("div", { class: "kutu kutu-ipucu", style: "margin:8px 0", html: isle(a.ipucu) })); } }) : null;
      const cozumTus = el("button", { class: "kucuk-tus", type: "button", text: "Çözümü göster", onclick: () => { ed.value = a.cozum; ed.dispatchEvent(new Event("input")); } });
      const blok = el("div", { class: "r-blok" }, el("div", { class: "r-ust" }, el("span", { text: "R" }), el("div", { class: "r-tuslar" }, kontrolTus)), ed, cikti);
      kutu.append(blok, el("div", { class: "tus-satir", style: "margin:8px 0 0" }, ipucuTus, cozumTus));
      kontrolTus.addEventListener("click", async () => {
        kontrolTus.disabled = true;
        cikti.innerHTML = "";
        if (!webR) cikti.append(el("span", { class: "bilgi", text: "R hazırlanıyor…\n" }));
        try {
          const s = await calistir(ed.value);
          cikti.innerHTML = "";
          ciktiCiz(cikti, s);
          const tamam = !s.hata && (await mantiksal(a.kontrol));
          if (tamam) {
            cikti.append(el("div", { class: "basari", text: "✓ Doğru! " + (a.tebrik || "") }));
            if (!cozulen[anahtar]) { cozulen[anahtar] = ECO.bugun(); depo.koy("r.cozulen", cozulen); P.drahmi && P.soruCevap(true); }
            kutu.classList.add("cozuldu");
            kutu.querySelector(".alistirma-bas").textContent = `Alıştırma ${i + 1} · çözüldü`;
          } else if (!s.hata) {
            cikti.append(el("div", { class: "hata", style: "font-family:var(--f-arayuz)", text: "Henüz değil. " + (a.yanlis || "Sonucu soruyla karşılaştır; ipucuna bakabilirsin.") }));
          }
        } catch (e) { cikti.innerHTML = ""; cikti.append(el("span", { class: "hata", text: "R yüklenemedi: " + e.message })); }
        kontrolTus.disabled = false;
      });
      kap.append(kutu);
    });
  }

  // ---------------------------------------------------------------- serbest R konsolu
  sayfa("rkonsol", {
    baslik: () => "R konsolu",
    bolge: "r",
    goster(sahne) {
      const s = el("div", { class: "sayfa" });
      s.append(el("header", { class: "sayfa-bas" },
        el("a", { class: "ust-baglanti", href: "#/r" }, ikon("geri"), "Kütüphane"),
        el("h1", { text: "R konsolu" }),
        el("p", { class: "alt-baslik", text: "RStudio'daki Console paneli gibi: yaz, Çalıştır'a bas. Nesneler oturum boyunca kalır." })));
      s.append(durumRozeti());
      const gecmis = el("div", { class: "r-blok", style: "margin-top:14px" });
      const kayit = el("div", { class: "r-cikti", style: "max-height:none;min-height:120px" });
      kayit.append(el("span", { class: "bilgi", text: "R 4.6 (webR). Denemek için: summary(mtcars$mpg)   ya da   plot(LifeCycleSavings$dpi, LifeCycleSavings$sr)\n" }));
      const calTus = el("button", { class: "r-calistir", type: "button" }, ikon("oynat"), "Çalıştır");
      const ed = editor(depo.al("r.konsol", ""), { calistir: () => calTus.click(), etiket: "R komutu" });
      ed.addEventListener("input", () => depo.koy("r.konsol", ed.value));
      const temizle = el("button", { class: "kucuk-tus", type: "button", text: "Ekranı temizle", onclick: () => { kayit.innerHTML = ""; } });
      const sifirla = el("button", { class: "kucuk-tus", type: "button", text: "Ortamı sıfırla", onclick: async () => { await calistir("rm(list = ls())"); kayit.append(el("span", { class: "bilgi", text: "Ortam temizlendi (rm(list = ls())).\n" })); } });
      gecmis.append(el("div", { class: "r-ust" }, el("span", { text: "Console" }), el("div", { class: "r-tuslar" }, temizle, sifirla)), kayit, ed,
        el("div", { class: "r-ust", style: "border-top:1px solid var(--damar);border-bottom:0" }, el("span", { text: "Ctrl+Enter = çalıştır" }), calTus));
      calTus.addEventListener("click", async () => {
        const kod = ed.value.trim();
        if (!kod) return;
        calTus.disabled = true;
        kayit.append(el("span", { style: "color:var(--mavi)", text: kod.split("\n").map((l, i) => (i ? "+ " : "> ") + l).join("\n") + "\n" }));
        try { const r = await calistir(kod); ciktiCiz(kayit, r); }
        catch (e) { kayit.append(el("span", { class: "hata", text: "R yüklenemedi: " + e.message + "\n" })); }
        kayit.scrollTop = kayit.scrollHeight;
        calTus.disabled = false;
        ed.value = ""; depo.koy("r.konsol", ""); ed.dispatchEvent(new Event("input"));
        ed.focus();
      });
      s.append(gecmis);
      s.append(el("div", { class: "metin", style: "margin-top:18px", html: isle(`### Hazır veri setleri (iktisat için)
- \`LifeCycleSavings\` — 50 ülke, 1960–70: tasarruf oranı (sr), nüfus yapısı, kişi başı harcanabilir gelir (dpi), büyüme (ddpi)
- \`longley\` — ABD makro verileri 1947–62: GNP, işsizlik, istihdam
- \`mtcars\`, \`iris\`, \`airquality\`, \`faithful\`, \`ToothGrowth\` — istatistik derslerinin klasikleri
- \`EuStockMarkets\` — DAX, SMI, CAC, FTSE günlük kapanışları (1991–98)

Bir veri setini tanımak için: \`str(LifeCycleSavings)\`, \`head(LifeCycleSavings)\`, \`?LifeCycleSavings\` (yardım webR'da sınırlı).`) }));
      sahne.append(s);
      ed.focus();
    },
  });

  ECO.R = { hazirla, calistir, mantiksal, blokKur, alistirmaSekmesi, dosyaEkle, durumRozeti, uretici: URETICI, get durum() { return durum; } };
})();
