// araclar.js — Ostraka (Leitner kutulu terim kartları), Olympia (deneme sınavları, yanlış defteri),
// Klepsydra (su saati: 25 dk odak / 5 dk mola; sayfa değişse de sürer).
(function () {
  "use strict";
  const { el, depo, isle, ikon, bildir, sayfa, git, bugun, gunEkle, yunanRakam, ilerleme: P } = ECO;

  // ================================================================ OSTRAKA
  const ARALIK = [0, 0, 1, 3, 7, 16];   // kutu → gün
  const YENI_GUNLUK = 20;
  const kartDurum = () => depo.al("kartlar", {});

  const Ostraka = {
    bekleyenSayisi() {
      const d = kartDurum(), g = bugun();
      return Object.values(d).filter((k) => k.sonraki <= g).length;
    },
    kutuSayilari() {
      const say = [0, 0, 0, 0, 0, 0];
      for (const k of Object.values(kartDurum())) say[k.kutu]++;
      return say;
    },
  };
  ECO.Ostraka = Ostraka;

  async function desteKur(kapsam) {
    // kapsam: "bekleyen" | dersId | bölümId
    let bolumler;
    if (ECO.dersler[kapsam]) bolumler = ECO.tumBolumler(kapsam);
    else if (ECO.dersBul(kapsam)) bolumler = [Object.assign({ ders: ECO.dersBul(kapsam).ders.id }, ECO.dersBul(kapsam).bolum)];
    else bolumler = ECO.tumBolumler().filter((b) => P.durum(b.id).baslandi || Object.keys(kartDurum()).some((k) => k.startsWith(b.id + "#")));
    await Promise.all(bolumler.map((b) => ECO.icerikYukle(b.id).catch(() => null)));
    const d = kartDurum(), g = bugun();
    const kartlar = [];
    for (const b of bolumler) {
      const ic = ECO.icerik[b.id];
      if (!ic || !ic.terimler) continue;
      ic.terimler.forEach(([en, tr, tanim], i) => kartlar.push({ id: `${b.id}#${i}`, en, tr, tanim, bolum: b }));
    }
    const vadesi = kartlar.filter((k) => d[k.id] && d[k.id].sonraki <= g);
    const yeniler = kartlar.filter((k) => !d[k.id]);
    const bugunYeni = depo.al("kartlar.yeni", { g: "", n: 0 });
    const kalanYeni = kapsam === "bekleyen" ? Math.max(0, YENI_GUNLUK - (bugunYeni.g === g ? bugunYeni.n : 0)) : yeniler.length;
    return { vadesi, yeniler: yeniler.slice(0, kalanYeni), tum: kartlar };
  }

  function kartGozden(id, bildi) {
    const d = kartDurum();
    const k = d[id] || { kutu: 0 };
    const yeni = !d[id];
    k.kutu = bildi ? Math.min(5, (k.kutu || 0) + 1) : 1;
    k.sonraki = gunEkle(bugun(), ARALIK[k.kutu]);
    d[id] = k;
    depo.koy("kartlar", d);
    if (yeni) { const b = depo.al("kartlar.yeni", { g: "", n: 0 }); depo.koy("kartlar.yeni", { g: bugun(), n: (b.g === bugun() ? b.n : 0) + 1 }); }
    P.kartGozden();
  }

  sayfa("kartlar", {
    baslik: () => "Ostraka",
    async goster(sahne, parcalar) {
      const s = el("div", { class: "sayfa" });
      sahne.append(s);
      const kapsam = parcalar[0] || null;
      s.append(el("header", { class: "sayfa-bas" },
        kapsam ? el("a", { class: "ust-baglanti", href: "#/kartlar" }, ikon("geri"), "Ostraka") : null,
        el("p", { class: "yunan-yazit", text: "ΟΣΤΡΑΚΑ" }),
        el("h1", { text: "Ostraka" }),
        el("p", { class: "alt-baslik", text: "Atinalılar oylarını kırık çanak parçalarına yazardı. Sen de terimleri. Bildiğin kart daha seyrek, bilmediğin daha sık gelir." })));
      if (!kapsam) return desteSecimi(s);
      const yuk = el("p", { class: "bilgi", text: "Kartlar hazırlanıyor…" });
      s.append(yuk);
      const deste = await desteKur(kapsam);
      yuk.remove();
      let kuyruk = kapsam === "bekleyen" ? deste.vadesi.concat(deste.yeniler) : deste.vadesi.concat(deste.yeniler);
      if (kapsam !== "bekleyen" && !kuyruk.length) kuyruk = deste.tum.slice();
      kuyruk = ECO.Quiz.karistir(kuyruk);
      oturum(s, kuyruk, kapsam);
    },
  });

  function desteSecimi(s) {
    const say = Ostraka.kutuSayilari();
    const bek = Ostraka.bekleyenSayisi();
    s.append(el("div", { class: "kutular", "aria-label": "Leitner kutuları" },
      [1, 2, 3, 4, 5].map((i) => el("div", null, el("b", { text: String(say[i]) }), el("span", { text: ["", "her gün", "1 gün", "3 gün", "1 hafta", "16 gün"][i] })))));
    s.append(el("div", { class: "tus-satir" }, el("a", { class: "tus", href: "#/kartlar/bekleyen" }, ikon("ostrakon"), bek ? `Bugünkü tekrar (${bek} + yeni)` : "Bugünkü kartlar")));
    s.append(el("p", { class: "kaynak-not", text: "Bugünkü tekrar: vakti gelen kartlar + başladığın bölümlerden günde en çok 20 yeni kart. Aşağıdan bir dersi ya da bölümü de seçebilirsin." }));
    for (const d of Object.values(ECO.dersler)) {
      s.append(el("h2", { class: "grup-ad", text: `${d.yer} — ${d.ad}` }));
      const ul = el("ul", { class: "stel-liste" });
      ul.append(el("li", null, el("a", { class: "stel", href: `#/kartlar/${d.id}` }, el("span", { class: "stel-no" }, ikon("ostrakon", "stel-durum")), el("span", null, el("span", { class: "stel-ad", text: "Dersin bütün kartları" })), el("span"))));
      for (const b of ECO.tumBolumler(d.id)) {
        const ad = el("a", { class: "stel", href: `#/kartlar/${b.id}` },
          el("span", { class: "stel-no", "aria-hidden": "true" }, el("span", { class: "yn", text: yunanRakam(b.no) })),
          el("span", null, el("span", { class: "stel-ad", text: b.tr }), el("span", { class: "stel-not", text: b.ad, lang: "en" })), el("span"));
        ul.append(el("li", null, ad));
      }
      const det = el("details", null, el("summary", { class: "kucuk-tus", style: "display:inline-block;margin-bottom:8px", text: "Bölüm bölüm göster" }), ul);
      s.append(det);
    }
  }

  function oturum(s, kuyruk, kapsam) {
    const kap = el("div");
    s.append(kap);
    let sayac = 0, bildi = 0;
    const tersMod = depo.al("kartlar.ters", false);
    const ciz = () => {
      kap.innerHTML = "";
      if (!kuyruk.length) {
        kap.append(el("div", { class: "quiz-sonuc" }, ECO.Quiz.defne(), el("div", { class: "puan", text: String(sayac) }),
          el("p", { text: sayac ? `kart gözden geçirildi; ${bildi} tanesini ilk bakışta bildin.` : "Bu destede bugün bekleyen kart yok." }),
          el("div", { class: "tus-satir", style: "justify-content:center" }, el("a", { class: "tus ikincil", href: "#/kartlar", text: "Destelere dön" }))));
        return;
      }
      const k = kuyruk[0];
      kap.append(el("p", { class: "quiz-sayac", style: "text-align:center", text: `${kuyruk.length} kart kaldı` }));
      const on = el("div", { class: "yuz on" },
        el("div", { class: "terim-en", text: tersMod ? k.tr : k.en }),
        el("div", { class: "ipucu-yazi", text: "Çevirmek için dokun" }));
      const arka = el("div", { class: "yuz arka" },
        el("div", { class: "terim-tr", text: tersMod ? k.en : k.tr }),
        k.tanim ? el("div", { class: "tanim", text: k.tanim }) : null,
        el("div", { class: "kaynak", text: `${ECO.dersler[k.bolum.ders].yer} · ${k.bolum.no}. ${k.bolum.tr}` }));
      const kart = el("div", { class: "ostrakon", tabindex: "0", role: "button", "aria-label": "Kartı çevir" }, on, arka);
      const cevir = () => { kart.classList.toggle("cevrik"); tuslar.hidden = !kart.classList.contains("cevrik"); };
      kart.addEventListener("click", cevir);
      kart.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); cevir(); } });
      const tuslar = el("div", { class: "kart-tuslar", hidden: true },
        el("button", { class: "tus bilmiyorum", type: "button", text: "Bilmiyordum", onclick: () => { kartGozden(k.id, false); sayac++; kuyruk.push(kuyruk.shift()); if (kuyruk.filter((x) => x.id === k.id).length > 1) kuyruk.pop(); ciz(); } }),
        el("button", { class: "tus biliyorum", type: "button", text: "Biliyordum", onclick: () => { kartGozden(k.id, true); sayac++; bildi++; kuyruk.shift(); ciz(); } }));
      kap.append(el("div", { class: "kart-sahne" }, kart), tuslar);
      kap.append(el("div", { class: "tus-satir", style: "justify-content:center" }, el("button", { class: "kucuk-tus", type: "button", text: tersMod ? "Yön: Türkçe → İngilizce" : "Yön: İngilizce → Türkçe", onclick: () => { depo.koy("kartlar.ters", !tersMod); git("kartlar/" + kapsam); } })));
      kart.focus({ preventScroll: true });
    };
    ciz();
  }

  // ================================================================ OLYMPIA
  sayfa("olympia", {
    baslik: () => "Olympia",
    async goster(sahne, parcalar) {
      const s = el("div", { class: "sayfa" });
      sahne.append(s);
      const tur = parcalar[0];
      s.append(el("header", { class: "sayfa-bas" },
        tur ? el("a", { class: "ust-baglanti", href: "#/olympia" }, ikon("geri"), "Olympia") : null,
        el("p", { class: "yunan-yazit", text: "ΟΛΥΜΠΙΑ" }),
        el("h1", { text: tur ? sinavAdi(tur) : "Olympia" }),
        el("p", { class: "alt-baslik", text: tur ? "Her soru farklı bir bölümden gelebilir. Defne %80'de." : "Oyunlar Olympia'da yapılırdı. Burada da deneme sınavları: karışık sorular, süre, yanlış defteri." })));
      if (!tur) return olympiaGiris(s);
      const yuk = el("p", { class: "bilgi", text: "Sorular toplanıyor…" });
      s.append(yuk);
      let sorular = [];
      if (tur === "yanlislar") sorular = await yanlisSorulari();
      else {
        const kapsam = sinavKapsami(tur, parcalar[1]);
        await Promise.all(kapsam.map((id) => ECO.icerikYukle(id).catch(() => null)));
        for (const id of kapsam) (ECO.icerik[id] && ECO.icerik[id].quiz || []).forEach((q, i) => sorular.push(Object.assign({ kaynak: id, i }, q)));
      }
      yuk.remove();
      if (!sorular.length) {
        s.append(el("div", { class: "bos-durum" }, el("h2", { text: tur === "yanlislar" ? "Yanlış defterin boş" : "Bu kapsamda henüz soru yok" }), el("p", { text: tur === "yanlislar" ? "Quizlerde yanlış yaptığın sorular buraya düşer; iki kez doğru yapınca defterden silinir." : "Bölüm içerikleri eklendikçe sorular burada birikecek." })));
        return;
      }
      const t0 = Date.now();
      const sure = el("p", { class: "quiz-sayac", style: "text-align:right", text: "00:00" });
      const tik = setInterval(() => { const sn = Math.floor((Date.now() - t0) / 1000); sure.textContent = `${String(Math.floor(sn / 60)).padStart(2, "0")}:${String(sn % 60).padStart(2, "0")}`; if (!document.body.contains(sure)) clearInterval(tik); }, 1000);
      s.append(sure);
      ECO.Quiz.baslat(s, sorular, { karistir: true, en: tur === "yanlislar" ? 30 : 20, kaynakGoster: true });
    },
  });

  function sinavAdi(tur) {
    return { "mate-vize": "Matematik ara sınav denemesi", "mate-final": "Matematik final denemesi", mikro: "Mikroekonomi karma deneme", r: "Araştırma yöntemleri karma deneme", yanlislar: "Yanlış defteri", secili: "Seçtiğin bölümlerden deneme" }[tur] || "Deneme";
  }
  function sinavKapsami(tur, ek) {
    if (tur === "mate-vize") return ECO.dersler.mate.sinavlar[0].kapsam;
    if (tur === "mate-final") return ECO.dersler.mate.sinavlar[1].kapsam;
    if (tur === "secili") return (ek || "").split(",").filter((id) => ECO.dersBul(id));
    if (ECO.dersler[tur]) return ECO.tumBolumler(tur).map((b) => b.id);
    return [];
  }
  async function yanlisSorulari() {
    const y = P.yanlislar();
    const out = [];
    const idler = [...new Set(Object.keys(y).map((k) => k.split("#")[0]))];
    await Promise.all(idler.map((id) => ECO.icerikYukle(id).catch(() => null)));
    for (const k of Object.keys(y)) {
      const [id, i] = k.split("#");
      const q = ECO.icerik[id] && ECO.icerik[id].quiz && ECO.icerik[id].quiz[+i];
      if (q) out.push(Object.assign({ kaynak: id, i: +i }, q));
    }
    return out;
  }

  function olympiaGiris(s) {
    const yanlisSay = Object.keys(P.yanlislar()).length;
    const kart = (href, ik, ad, not) => el("a", { class: "alet", href }, ikon(ik), el("span", { class: "alet-ad", text: ad }), el("span", { class: "alet-not", html: not }));
    s.append(el("div", { class: "alet-izgara", style: "margin-top:16px" },
      kart("#/olympia/mikro", "amfora", "Mikro karma", "23 bölümden rastgele 20 soru"),
      kart("#/olympia/mate-vize", "pergel", "Matematik vize", "1–7. haftalar"),
      kart("#/olympia/mate-final", "pergel", "Matematik final", "9–14. haftalar"),
      kart("#/olympia/r", "parsomen", "R ve yöntem", "20 dersten karma"),
      kart("#/olympia/yanlislar", "defne", "Yanlış defteri", yanlisSay ? `<span class="sayac">${yanlisSay}</span> soru seni bekliyor` : "Şimdilik boş")));

    // bölüm seçerek deneme
    s.append(el("h2", { class: "bolum-baslik", text: "Kendi sınavını kur" }));
    const form = el("form", { class: "ayar-blok" });
    for (const d of Object.values(ECO.dersler)) {
      const det = el("details", null, el("summary", { style: "cursor:pointer;padding:10px 0;font-weight:700", text: `${d.yer} — ${d.ad}` }));
      for (const b of ECO.tumBolumler(d.id)) det.append(el("label", { style: "display:flex;gap:10px;align-items:flex-start;padding:6px 0;font-family:var(--f-metin)" }, el("input", { type: "checkbox", name: "b", value: b.id, style: "margin-top:5px;accent-color:var(--mavi)" }), el("span", { text: `${b.no}. ${b.tr}` })));
      form.append(det);
    }
    form.append(el("div", { class: "tus-satir" },
      el("button", { class: "tus", type: "submit", text: "Denemeyi başlat" }),
      el("button", { class: "tus ikincil", type: "button", onclick: () => {
        const sec = [...form.querySelectorAll("input:checked")].map((i) => ECO.dersBul(i.value));
        if (!sec.length) { bildir("Önce en az bir bölüm seç"); return; }
        ECO.Kahin.sor({ mod: "soru", gonder: true, metin: `Şu bölümlerden karışık 10 soruluk bir deneme sınavı üret: ${sec.map((y) => `${y.ders.ad} ${y.bolum.no}. ${y.bolum.ad}`).join("; ")}.` });
      } }, ikon("tripod"), "Kâhin'e ürettir")));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const sec = [...form.querySelectorAll("input:checked")].map((i) => i.value);
      if (!sec.length) { bildir("Önce en az bir bölüm seç"); return; }
      git("olympia/secili/" + sec.join(","));
    });
    s.append(form);
  }

  // ================================================================ KLEPSYDRA
  const KL = {
    al: () => depo.al("klepsydra", null),
    koy: (v) => depo.koy("klepsydra", v),
  };
  let klTik = null;
  function klKalan(k) { return k.duraklat != null ? k.duraklat : Math.max(0, k.bitis - Date.now()); }
  const mmss = (ms) => { const sn = Math.ceil(ms / 1000); return `${String(Math.floor(sn / 60)).padStart(2, "0")}:${String(sn % 60).padStart(2, "0")}`; };

  function klBaslat(evre, dk) { KL.koy({ evre, dk, bitis: Date.now() + dk * 60000, duraklat: null }); klDongu(); }
  function klDongu() {
    clearInterval(klTik);
    klGuncelle();
    klTik = setInterval(klGuncelle, 1000);
  }
  function cinla() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const c = new AC();
      [880, 1318.5].forEach((f, i) => {
        const o = c.createOscillator(), g = c.createGain();
        o.frequency.value = f; o.type = "sine";
        g.gain.setValueAtTime(0.0001, c.currentTime + i * 0.18);
        g.gain.exponentialRampToValueAtTime(0.18, c.currentTime + i * 0.18 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + i * 0.18 + 1.1);
        o.connect(g).connect(c.destination); o.start(c.currentTime + i * 0.18); o.stop(c.currentTime + i * 0.18 + 1.2);
      });
    } catch (e) { /* ses yoksa sessiz */ }
    try { navigator.vibrate && navigator.vibrate([120, 80, 120]); } catch (e) { /* */ }
  }
  function klGuncelle() {
    const k = KL.al();
    const hap = document.getElementById("klepsydra-hap");
    if (!k) { if (hap) hap.hidden = true; clearInterval(klTik); return; }
    const kalan = klKalan(k);
    if (kalan <= 0 && k.duraklat == null) {
      if (k.evre === "odak") { P.dakika(k.dk); cinla(); bildir(`${k.dk} dakikalık odak bitti. +${Math.round(k.dk / 5)} drahmi. Şimdi mola.`, 5000); klBaslat("mola", k.dk >= 50 ? 10 : 5); }
      else { cinla(); bildir("Mola bitti. Hazırsan yeni bir odak başlat.", 5000); KL.koy(null); klGuncelle(); }
      return;
    }
    if (hap) {
      hap.hidden = document.body.dataset.sayfa === "klepsydra";
      hap.className = "klepsydra-hap" + (k.evre === "mola" ? " mola" : "");
      hap.innerHTML = "";
      hap.append(ikon("klepsydra"), el("span", { text: (k.evre === "mola" ? "Mola " : "") + mmss(kalan) + (k.duraklat != null ? " ‖" : "") }));
    }
    const ekran = document.getElementById("kl-sure");
    if (ekran) { ekran.textContent = mmss(kalan); suSaatiCiz(k, kalan); }
  }

  function suSaatiCiz(k, kalan) {
    const su = document.getElementById("kl-su-ust"), alt = document.getElementById("kl-su-alt");
    if (!su || !alt) return;
    const oran = k ? kalan / (k.dk * 60000) : 1;   // 1 → üst kap dolu
    // üst kap y: 30..110, alt kap y: 150..230
    const hU = 76 * oran, hA = 76 * (1 - oran);
    su.setAttribute("y", 110 - hU); su.setAttribute("height", hU);
    alt.setAttribute("y", 230 - hA); alt.setAttribute("height", hA);
  }

  sayfa("klepsydra", {
    baslik: () => "Klepsydra",
    goster(sahne) {
      const s = el("div", { class: "sayfa" });
      s.append(el("header", { class: "sayfa-bas" }, el("p", { class: "yunan-yazit", text: "ΚΛΕΨΥΔΡΑ" }), el("h1", { text: "Klepsydra" }),
        el("p", { class: "alt-baslik", text: "Atina mahkemelerinde konuşma süresini su saati ölçerdi. Sen de odağını ölç: süre bitince mola kendiliğinden başlar." })));
      const k = KL.al();
      const svg = el("svg", { class: "su-saati", viewBox: "0 0 180 240", "aria-hidden": "true" },
        el("defs", null,
          el("clipPath", { id: "kl-ust" }, el("path", { d: "M40 30 h100 v60 q0 20 -40 22 h-20 q-40 -2 -40 -22 z" })),
          el("clipPath", { id: "kl-alt" }, el("path", { d: "M40 150 h100 v60 q0 20 -40 20 h-20 q-40 0 -40 -20 z" }))),
        el("rect", { id: "kl-su-ust", class: "su", x: 40, y: 34, width: 100, height: 76, "clip-path": "url(#kl-ust)" }),
        el("rect", { id: "kl-su-alt", class: "su", x: 40, y: 230, width: 100, height: 0, "clip-path": "url(#kl-alt)" }),
        el("path", { class: "kap", d: "M40 30 h100 v60 q0 20 -40 22 h-20 q-40 -2 -40 -22 z" }),
        el("path", { class: "kap", d: "M40 150 h100 v60 q0 20 -40 20 h-20 q-40 0 -40 -20 z" }),
        el("path", { class: "kap", d: "M86 112 v10 M94 112 v10" }),
        el("circle", { class: "damla", cx: 90, cy: 134, r: 3 }),
        el("path", { class: "kap", d: "M30 26 h120 M30 238 h120" }));
      const sure = el("div", { class: "sure", id: "kl-sure", text: k ? mmss(klKalan(k)) : "25:00" });
      const evre = el("div", { class: "evre", text: k ? (k.evre === "odak" ? "Odak zamanı" : "Mola") : "Hazır olduğunda başla" });
      const tuslar = el("div", { class: "tus-satir", style: "justify-content:center" });
      const yenile = () => git("klepsydra");
      if (!k) {
        tuslar.append(el("button", { class: "tus", type: "button", onclick: () => { klBaslat("odak", 25); yenile(); } }, ikon("oynat"), "25 dk odak"),
          el("button", { class: "tus ikincil", type: "button", onclick: () => { klBaslat("odak", 50); yenile(); } }, "50 dk derin odak"));
      } else {
        if (k.duraklat == null) tuslar.append(el("button", { class: "tus ikincil", type: "button", text: "Duraklat", onclick: () => { KL.koy(Object.assign(k, { duraklat: klKalan(k) })); yenile(); } }));
        else tuslar.append(el("button", { class: "tus", type: "button", text: "Sürdür", onclick: () => { KL.koy(Object.assign(k, { bitis: Date.now() + k.duraklat, duraklat: null })); klDongu(); yenile(); } }));
        tuslar.append(el("button", { class: "tus sessiz", type: "button", text: k.evre === "mola" ? "Molayı bitir" : "Bitir", onclick: () => {
          if (k.evre === "odak") { const gecen = Math.floor((k.dk * 60000 - klKalan(k)) / 60000); if (gecen >= 1) { P.dakika(gecen); bildir(`${gecen} dakika kaydedildi`); } }
          KL.koy(null); klGuncelle(); yenile();
        } }));
      }
      s.append(el("div", { class: "klepsydra" }, svg, sure, evre, tuslar));
      const bg = P.bugunku();
      s.append(el("p", { class: "kaynak-not", style: "text-align:center", text: `Bugün ${bg.dk || 0} dakika odaklandın. Her 5 dakika 1 drahmi.` }));
      sahne.append(s);
      suSaatiCiz(k, k ? klKalan(k) : 1);
    },
  });

  ECO.Klepsydra = { baslat: () => { if (KL.al()) klDongu(); } };
})();
