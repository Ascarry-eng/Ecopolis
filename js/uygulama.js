// uygulama.js — açılış: ikonlar, ray istatistikleri, yönlendirme, Klepsydra, service worker.
(function () {
  "use strict";
  const { $$, ikon, ilerleme: P } = ECO;
  ECO.SURUM = "1.0.0";

  function rayIstatistik() {
    const s = document.querySelector("#ray .r-seri"), d = document.querySelector("#ray .r-drahmi");
    if (!s || !d) return;
    s.innerHTML = ""; d.innerHTML = "";
    s.append(ikon("zeytin"), ` ${P.seri().gun} gün`);
    d.append(ikon("drahmi"), ` ${P.drahmiToplam()}`);
    for (const x of [s, d]) { x.style.display = "inline-flex"; x.style.alignItems = "center"; x.style.gap = "6px"; x.querySelector("svg").style.cssText = "width:20px;height:20px"; }
    s.querySelector("svg").style.color = "var(--yesil)";
    d.querySelector("svg").style.color = "var(--altin)";
  }

  // Gizli geliştirici sayfası: #/galeri ya da #/galeri/<görsel-adı> — bütün görselleri alt alta çizer
  ECO.sayfa("galeri", {
    baslik: () => "Galeri",
    goster(sahne, p) {
      const s = ECO.el("div", { class: "sayfa genis" }, ECO.el("h1", { text: "Görsel galerisi" }));
      sahne.append(s);
      const adlar = p[0] ? p[0].split(",") : Object.keys(ECO.gorseller);
      for (const ad of adlar) { s.append(ECO.el("h2", { text: ad, style: "font:700 1rem var(--f-kod);margin-top:28px" })); const d = ECO.el("div", { class: "gorsel", "data-gorsel": ad, "data-ayar": "{}" }); s.append(d); }
      ECO.canlandir(s);
    },
  });

  function basla() {
    for (const s of $$("[data-ikon]")) { s.replaceWith(ikon(s.dataset.ikon)); }
    window.addEventListener("hashchange", () => { ECO.yonlendir(); rayIstatistik(); });
    ECO.yonlendir();
    rayIstatistik();
    P.dinleyiciler.push(rayIstatistik);
    ECO.Klepsydra && ECO.Klepsydra.baslat();
    document.getElementById("klepsydra-hap").addEventListener("click", () => ECO.git("klepsydra"));
    if ("serviceWorker" in navigator && location.protocol === "https:") {
      const ilkKontrol = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.register("sw.js").catch(() => {});
      // Yeni sürüm etkinleşince haber ver (ilk kurulumda değil)
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (ilkKontrol) ECO.bildir("Ecopolis güncellendi — yeni içerik bir sonraki açılışta tamamen geçerli", 5000); });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", basla); else basla();
})();
