// sayfalar.js — Akropolis (ana sayfa, tapınak), ders sayfaları (Agora/Akademia/Kütüphane), bölüm sayfası,
// Lexikon (sözlük) ve Ayarlar.
(function () {
  "use strict";
  const { el, depo, isle, canlandir, sayfa, git, yunanRakam, ikon, ilerleme: P, bildir, $, $$ } = ECO;

  // ================================================================ TAPINAK (ana sayfa kahramanı)
  // 6 sütun = 3 ders × 2 yarı. Her tambur bir bölüm: boş (kesikli iskele), başlanmış, tamam, defneli.
  function tapinakCiz() {
    const NS = (t, o, ...c) => el(t, o, ...c);
    const W = 400;
    const svg = NS("svg", { class: "tapinak", viewBox: `0 0 ${W} 300`, role: "group", "aria-label": "İlerleme tapınağı: her sütun bir dersin yarısı, her tambur bir bölüm" });

    // akroterler
    const palmet = (x, y, s = 1) => NS("path", { class: "t-akroter", d: `M${x} ${y}c${-4 * s} ${-3 * s} ${-5 * s} ${-8 * s} 0 ${-13 * s}c${5 * s} ${5 * s} ${4 * s} ${10 * s} 0 ${13 * s}z` });
    svg.append(palmet(200, 22, 1), palmet(22, 77, 0.8), palmet(378, 77, 0.8));
    // alınlık
    svg.append(NS("path", { class: "t-mermer", d: "M16 78 L200 22 L384 78 Z" }));
    svg.append(NS("path", { class: "t-timpan", d: "M44 72 L200 30 L356 72 Z" }));
    svg.append(NS("text", { class: "t-yunan", x: 200, y: 64, "text-anchor": "middle", text: "ΟΙΚΟΝΟΜΙΑ" }));
    // korniş, friz (meander), arşitrav (yazıt)
    svg.append(NS("rect", { class: "t-mermer", x: 12, y: 78, width: 376, height: 8 }));
    svg.append(NS("rect", { class: "t-mermer", x: 22, y: 86, width: 356, height: 15 }));
    let m = "";
    for (let x = 27.5; x <= 366; x += 15) m +=`M${x} 99V89.5h10v7h-6.5v-3.5h3`;
    svg.append(NS("path", { class: "t-meander", d: `M22 88h356M22 99h356${m}` }));
    svg.append(NS("rect", { class: "t-mermer", x: 22, y: 101, width: 356, height: 24 }));
    svg.append(NS("text", { class: "t-yazi", x: 200, y: 120, "text-anchor": "middle", text: "ECOPOLIS" }));

    // sütunlar
    const sutunlar = [];
    for (const d of Object.values(ECO.dersler)) for (const s of d.sutunlar) sutunlar.push({ ders: d, s });
    const ust = 125, alt = 246;
    sutunlar.forEach(({ ders, s }, i) => {
      const cx = 62 + i * 55.2;
      const bolumler = ECO.tumBolumler(ders.id).filter((b) => b.no >= s.ilk && b.no <= s.son);
      let tamam = 0;
      const g = NS("g", { class: "sutun", tabindex: "0", role: "link" });
      const govde = NS("g", { class: "sutun-govde" });
      // başlık (abaküs + ekinus)
      govde.append(NS("rect", { class: "baslik-sutun", x: cx - 23, y: ust, width: 46, height: 6 }));
      govde.append(NS("path", { class: "baslik-sutun", d: `M${cx - 21} ${ust + 6} L${cx + 21} ${ust + 6} L${cx + 16} ${ust + 12} L${cx - 16} ${ust + 12} Z` }));
      const sUst = ust + 12, n = bolumler.length, h = (alt - sUst) / n;
      bolumler.forEach((b, j) => {
        // j=0 en alttaki tambur
        const y2 = alt - j * h, y1 = y2 - h;
        const yari = (y) => 15 + 2 * ((y - sUst) / (alt - sUst));   // hafif entasis/daralma
        const w1 = yari(y1), w2 = yari(y2);
        const d = P.durum(b.id);
        if (d.tamam) tamam++;
        const sinif = d.defne ? "tambur-defne" : d.tamam ? "tambur-dolu" : d.baslandi ? "tambur-kismi" : "tambur-bos";
        govde.append(NS("path", { class: sinif, d: `M${cx - w1} ${y1 + 0.6} L${cx + w1} ${y1 + 0.6} L${cx + w2} ${y2 - 0.6} L${cx - w2} ${y2 - 0.6} Z` }, NS("title", { text: `${ders.ad} ${b.no}. ${b.tr}` })));
        if (d.tamam || d.defne) for (const f of [-0.55, 0, 0.55]) govde.append(NS("line", { class: "yiv", x1: cx + f * w1, y1: y1 + 2, x2: cx + f * w2, y2: y2 - 2 }));
        if (!d.tamam && d.okuma > 0) govde.append(NS("path", { class: "kismi-dolgu", d: `M${cx - w2} ${y2 - 0.6} L${cx + w2} ${y2 - 0.6} L${cx + w2} ${y2 - 0.6 - (h - 1.2) * d.okuma} L${cx - w2} ${y2 - 0.6 - (h - 1.2) * d.okuma} Z` }));
      });
      g.append(govde, NS("rect", { class: "sutun-cerceve", x: cx - 26, y: ust - 2, width: 52, height: alt - ust + 4, rx: 3 }));
      g.setAttribute("aria-label", `${ders.yer}, ${s.ad}: ${tamam} / ${n} bölüm tamam`);
      const gitDers = () => git(ders.id);
      g.addEventListener("click", gitDers);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); gitDers(); } });
      svg.append(g);
      sutunlar[i].tamam = tamam; sutunlar[i].n = n; sutunlar[i].cx = cx;
    });

    // krepis (üç basamak)
    svg.append(NS("rect", { class: "t-basamak", x: 30, y: 246, width: 340, height: 8 }));
    svg.append(NS("rect", { class: "t-basamak", x: 20, y: 254, width: 360, height: 8 }));
    svg.append(NS("rect", { class: "t-basamak", x: 10, y: 262, width: 380, height: 8 }));
    // ders adları (sütun çiftlerinin altına)
    for (let i = 0; i < sutunlar.length; i += 2) {
      const a = sutunlar[i], b = sutunlar[i + 1];
      const x = (a.cx + b.cx) / 2;
      svg.append(NS("text", { class: "ders-ad", x, y: 286, text: a.ders.yer.toLocaleUpperCase("tr-TR") }));
      svg.append(NS("text", { class: "sutun-sayi", x, y: 298, text: `${a.tamam + b.tamam} / ${a.n + b.n} bölüm` }));
    }
    return svg;
  }

  function stoaCiz() {
    // Ders sayfası başında sade bir revak silueti
    const s = el("svg", { class: "stoa", viewBox: "0 0 400 54", preserveAspectRatio: "none", "aria-hidden": "true" });
    s.append(el("rect", { x: 0, y: 2, width: 400, height: 5, fill: "currentColor", opacity: "0.5" }));
    for (let x = 8; x < 400; x += 24) s.append(el("rect", { x, y: 9, width: 7, height: 38, fill: "currentColor", opacity: "0.32" }));
    s.append(el("rect", { x: 0, y: 47, width: 400, height: 4, fill: "currentColor", opacity: "0.5" }));
    return s;
  }

  function durumIkon(id) {
    const d = P.durum(id);
    const s = el("svg", { class: "stel-durum durum-tambur", viewBox: "0 0 30 30", "aria-hidden": "true" });
    s.append(el("path", { class: "dis", d: "M8 5h14l1.5 20h-17z" }));
    if (d.okuma > 0 && !d.tamam) {
      const h = 20 * d.okuma;
      s.append(el("path", { class: "ic", d: `M${8 - 1.5 * (h / 20)} ${25 - h}h${14 + 3 * (h / 20)}L23.5 25h-17z`, opacity: "0.35" }));
    }
    if (d.tamam) s.append(el("path", { class: "tik", d: "M10 15.5l3.5 3.5L20.5 11" }));
    if (d.defne) s.append(el("path", { class: "defne", d: "M4 26c-2-4-2-9 1-13 M26 26c2-4 2-9-1-13" }));
    return s;
  }
  const durumMetni = (id) => { const d = P.durum(id); return d.defne ? "tamam, defneli" : d.tamam ? "tamam" : d.baslandi ? `başlandı, %${Math.round(d.okuma * 100)} okundu` : "başlanmadı"; };

  // ================================================================ AKROPOLİS
  function selam() {
    const s = new Date().getHours();
    return s < 5 ? "Gece kuşu Athena seninle." : s < 12 ? "Günaydın. Agora kalabalıklaşmadan başla." : s < 18 ? "İyi günler. Bir tambur daha?" : "İyi akşamlar. Lambalar yandı, kütüphane açık.";
  }

  sayfa("akropolis", {
    baslik: () => "Akropolis",
    goster(sahne) {
      const seri = P.seri(), bg = P.bugunku();
      const ust = el("div", { class: "akropolis-gok" },
        el("div", { class: "akropolis-ust" },
          el("p", { class: "selam", text: selam() }),
          el("div", { class: "rozetler" },
            el("span", { class: "rozet seri", title: "Çalışma serisi (gün)" }, ikon("zeytin"), `${seri.gun}`),
            el("span", { class: "rozet drahmi", title: "Drahmi" }, ikon("drahmi"), el("span", { id: "drahmi-sayi", text: String(P.drahmiToplam()) })),
            el("a", { class: "rozet ayar", href: "#/ayarlar", "aria-label": "Ayarlar" }, ikon("disli")))),
        el("div", { class: "tapinak-kap" }, tapinakCiz()),
        el("p", { class: "tapinak-aciklama", text: "Her bölüm bir tambur. Bitirdikçe sütunların yükselir; quizde %80'i geçince tambur altınlanır." }));
      const s = el("div", { class: "sayfa" });

      // kaldığın yer
      const devamId = P.devam();
      const bugun = el("div", { class: "bugun" });
      if (devamId) {
        const yer = ECO.dersBul(devamId), d = P.durum(devamId);
        bugun.append(el("a", { class: "devam-karti", href: `#/${yer.ders.id}/${devamId}` },
          el("span", { class: "numara", text: yunanRakam(yer.bolum.no) }),
          el("span", { class: "ust", text: d.baslandi ? `Kaldığın yer · ${yer.ders.yer}` : `Buradan başla · ${yer.ders.yer}` }),
          el("span", { class: "ad", text: yer.bolum.tr }),
          el("span", { class: "ilerleme-cubuk", "aria-hidden": "true" }, el("span", { style: `width:${Math.round(d.okuma * 100)}%` }))));
      }
      s.append(bugun);

      s.append(el("h2", { class: "bolum-baslik", text: "Bugün" }));
      s.append(el("div", { class: "gun-izgara" },
        el("div", { class: "gun-hucre" }, el("div", { class: "d", text: String(bg.dk || 0) }), el("div", { class: "a", text: "dakika odak" })),
        el("div", { class: "gun-hucre" }, el("div", { class: "d", text: `${bg.dogru || 0}/${bg.soru || 0}` }), el("div", { class: "a", text: "doğru / soru" })),
        el("div", { class: "gun-hucre" }, el("div", { class: "d", text: String(bg.kart || 0) }), el("div", { class: "a", text: "kart tekrarı" })),
        el("div", { class: "gun-hucre" }, el("div", { class: "d", text: String(bg.drahmi || 0) }), el("div", { class: "a", text: "drahmi kazandın" }))));

      // son 14 gün
      const gunler = P.sonGunler(14);
      const puan = (k) => (k ? (k.okuma || 0) * 3 + (k.soru || 0) + (k.kart || 0) * 0.5 + (k.dk || 0) * 0.4 : 0);
      const enCok = Math.max(1, ...gunler.map(([, k]) => puan(k)));
      const cizelge = el("div", { class: "hafta-cizelge", role: "img", "aria-label": "Son 14 günün çalışma yoğunluğu" });
      const etiketler = el("div", { class: "hafta-etiketler", "aria-hidden": "true" });
      const gAd = ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"];
      gunler.forEach(([g, k], i) => {
        const p = puan(k);
        cizelge.append(el("span", { class: "cubuk" + (p ? "" : " bos") + (i === gunler.length - 1 ? " bugun" : ""), style: `height:${p ? Math.max(8, (p / enCok) * 100) : 4}%`, title: g }));
        etiketler.append(el("span", { text: gAd[new Date(g + "T12:00").getDay()] }));
      });
      s.append(el("h2", { class: "bolum-baslik", text: seri.gun ? `Son iki hafta · ${seri.gun} günlük seri` : "Son iki hafta" }), cizelge, etiketler);

      // aletler
      const kartSayi = ECO.Ostraka ? ECO.Ostraka.bekleyenSayisi() : 0;
      const alet = (href, ik, ad, not) => el("a", { class: "alet", href }, ikon(ik), el("span", { class: "alet-ad", text: ad }), el("span", { class: "alet-not", html: not }));
      s.append(el("h2", { class: "bolum-baslik", text: "Aletler" }));
      s.append(el("div", { class: "alet-izgara" },
        alet("#/kartlar", "ostrakon", "Ostraka", kartSayi ? `<span class="sayac">${kartSayi}</span> kart tekrar bekliyor` : "Terim kartlarıyla aralıklı tekrar"),
        alet("#/olympia", "defne", "Olympia", "Karma deneme sınavları ve yanlış defterin"),
        alet("#/sozluk", "tablet", "Lexikon", "Bütün terimler, İngilizce–Türkçe"),
        alet("#/klepsydra", "klepsydra", "Klepsydra", "25 dakikalık odak, 5 dakika mola")));

      s.append(el("p", { class: "alt-bilgi", html: "Ecopolis kişisel çalışma uygulamasıdır. Ders kitabı: Colander, <i>Microeconomics</i> 11e — anlatımlar özgündür, kitabın yerini tutmaz.<br>İlerlemen yalnız bu cihazda tutulur; Ayarlar'dan yedekleyip öteki cihaza taşıyabilirsin." }));
      sahne.append(ust, s);
    },
  });

  // ================================================================ DERS SAYFASI (Agora / Akademia / Kütüphane)
  function dersSayfasi(dersId) {
    return {
      baslik: (p) => (p.length ? (ECO.dersBul(p[0]) || { bolum: { tr: "" } }).bolum.tr : ECO.dersler[dersId].yer),
      bolge: dersId,
      async goster(sahne, parcalar) {
        if (parcalar.length) return bolumGoster(sahne, parcalar[0], parcalar[1]);
        const d = ECO.dersler[dersId];
        const oz = P.dersOzet(dersId);
        const kapak = el("div", { class: "ders-kapak" }, el("div", { class: "sayfa" },
          el("header", { class: "sayfa-bas" },
            el("p", { class: "yunan-yazit", lang: "grc", text: d.yazit }),
            d.yazitTr ? el("p", { class: "yunan-yazit-tr", text: d.yazitTr }) : null,
            el("h1", { text: d.yer }),
            el("p", { class: "alt-baslik", text: `${d.ad} — ${d.ders}` }),
            el("p", { class: "ders-tanitim", text: d.tanitim }),
            el("p", { class: "ders-ozet-satir", html: `<span><b>${oz.tamam}</b> / ${oz.toplam} bölüm tamam</span><span><b>${oz.defne}</b> defne</span>` }),
            el("p", { class: "kaynak-not", text: d.kaynak })),
          stoaCiz()));
        const s = el("div", { class: "sayfa" });
        for (const g of d.gruplar) {
          s.append(el("h2", { class: "grup-ad", text: g.ad }));
          const ul = el("ul", { class: "stel-liste" });
          for (const b of g.bolumler) {
            const d2 = P.durum(b.id);
            ul.append(el("li", null, el("a", { class: "stel" + (d2.tamam ? " tamam" : ""), href: `#/${dersId}/${b.id}`, "aria-label": `${b.no}. ${b.ad} — ${b.tr} (${durumMetni(b.id)})` },
              el("span", { class: "stel-no", "aria-hidden": "true" }, el("span", { class: "yn", text: yunanRakam(b.no) }), el("span", { class: "an", text: b.ek ? "ek konu" : dersId === "mate" ? `${b.no}. hafta` : `${b.no}. bölüm` })),
              el("span", null, el("span", { class: "stel-ad", text: b.ad, lang: "en" }), el("span", { class: "stel-tr", text: " " + b.tr }), el("span", { class: "stel-not", text: b.ozet })),
              durumIkon(b.id))));
          }
          s.append(ul);
          // Matematikte sınav haftaları
          if (d.sinavlar) for (const sv of d.sinavlar) if (g.bolumler[g.bolumler.length - 1].no === sv.hafta - 1) {
            s.lastChild.append(el("li", null, el("a", { class: "stel sinav-stel", href: `#/olympia/mate-${sv.hafta === 8 ? "vize" : "final"}` },
              el("span", { class: "stel-no", "aria-hidden": "true" }, el("span", { class: "yn", text: yunanRakam(sv.hafta) }), el("span", { class: "an", text: `${sv.hafta}. hafta` })),
              el("span", null, el("span", { class: "stel-ad", text: sv.ad }), el("span", { class: "stel-not", text: "Olympia'da bu haftaların karma deneme sınavı" })),
              ikon("defne", "stel-durum"))));
          }
        }
        sahne.append(kapak, s);
      },
    };
  }
  sayfa("mikro", dersSayfasi("mikro"));
  sayfa("mate", dersSayfasi("mate"));
  sayfa("r", dersSayfasi("r"));

  // ================================================================ BÖLÜM SAYFASI

  async function bolumGoster(sahne, id, sekme) {
    const yer = ECO.dersBul(id);
    if (!yer) { sahne.append(el("div", { class: "sayfa" }, el("h1", { text: "Bölüm bulunamadı" }))); return; }
    const { ders, bolum } = yer;
    const s = el("div", { class: "sayfa" });
    s.append(el("header", { class: "bolum-bas" },
      el("a", { class: "ust-baglanti", href: `#/${ders.id}` }, ikon("geri"), ders.yer),
      el("div", { class: "bolum-etiket" }, el("span", { class: "yn", text: yunanRakam(bolum.no), "aria-hidden": "true" }), el("span", { text: bolum.ek ? "Ek konu" : ders.id === "mate" ? `${bolum.no}. hafta` : `${bolum.no}. bölüm` })),
      el("h1", { text: bolum.ad, lang: "en" }),
      el("p", { class: "alt-baslik", text: bolum.tr })));
    sahne.append(s);
    const yukleniyor = el("p", { class: "bilgi", text: "Yükleniyor…" });
    s.append(yukleniyor);
    const ic = await ECO.icerikYukle(id);
    yukleniyor.remove();
    if (ic && ic.dosyalar && ECO.R) ECO.R.dosyaEkle(ic.dosyalar);

    // Kâhin düğmesi (her durumda)
    ECO.Kahin && ECO.Kahin.baglamAyarla({ tur: "bolum", id, ders: ders.id, baslik: `${ders.ad} — ${bolum.no}. ${bolum.ad} (${bolum.tr})`, ozet: bolum.ozet, terimler: ic ? (ic.terimler || []).map((t) => t[0]).join(", ") : "" });
    sahne.append(el("a", { class: "kahin-yuzen", href: "#/kahin", "aria-label": "Bu bölüm hakkında Kâhin'e sor" }, ikon("tripod"), "Kâhin'e sor"));

    if (!ic) {
      s.append(el("div", { class: "yakinda-kutu" },
        el("h2", { text: "Bu bölümün anlatımı hazırlanıyor" }),
        el("p", { text: `Konular: ${bolum.ozet}.` }),
        el("p", { text: "O zamana kadar Kâhin bu bölümü sana baştan anlatabilir ya da soru üretebilir." }),
        el("div", { class: "tus-satir" },
          el("button", { class: "tus", type: "button", onclick: () => ECO.Kahin.sor({ metin: `${bolum.no}. bölümü (${bolum.ad}) bana baştan, sınav odaklı anlat: ana kavramlar, grafikler ve tipik sınav soruları.`, gonder: true }) }, ikon("tripod"), "Bölümü anlattır"),
          el("button", { class: "tus ikincil", type: "button", onclick: () => ECO.Kahin.sor({ mod: "soru", metin: `${bolum.no}. bölüm (${bolum.ad}) için 5 çoktan seçmeli sınav sorusu üret.`, gonder: true }) }, "Soru ürettir"))));
      return;
    }

    const sekmeler = [["ders", "Ders"], ["terimler", "Terimler", (ic.terimler || []).length], ["quiz", "Quiz", (ic.quiz || []).length]];
    if (ic.alistirmalar && ic.alistirmalar.length) sekmeler.splice(1, 0, ["alistirma", "Alıştırmalar", ic.alistirmalar.length]);
    const aktif = sekmeler.some(([k]) => k === sekme) ? sekme : "ders";
    const sekmeCubuk = el("div", { class: "sekmeler", role: "tablist" });
    const govde = el("div");
    for (const [k, ad, n] of sekmeler) {
      sekmeCubuk.append(el("button", { type: "button", role: "tab", "aria-selected": String(k === aktif), onclick: () => { history.replaceState(null, "", `#/${ders.id}/${id}${k === "ders" ? "" : "/" + k}`); sekmeGoster(k); } }, ad, n ? el("span", { class: "sayi", text: String(n) }) : null));
    }
    s.append(sekmeCubuk, govde);

    function sekmeGoster(k) {
      $$("button", sekmeCubuk).forEach((b, i) => b.setAttribute("aria-selected", String(sekmeler[i][0] === k)));
      govde.innerHTML = "";
      if (k === "ders") dersSekmesi(govde, id, ic, yer);
      else if (k === "terimler") terimSekmesi(govde, id, ic);
      else if (k === "quiz") quizSekmesi(govde, id, ic, yer);
      else if (k === "alistirma") ECO.R.alistirmaSekmesi(govde, id, ic);
      window.scrollTo({ top: 0 });
    }
    sekmeGoster(aktif);
  }

  function dersSekmesi(kap, id, ic, yer) {
    if (ic.hedefler && ic.hedefler.length) {
      kap.append(el("section", { class: "hedefler" }, el("h2", { text: "Bu bölümde" }), el("ul", null, ic.hedefler.map((h) => el("li", { text: h })))));
    }
    const n = ic.bolumler.length;
    const d0 = P.bolum(id);
    // Okundu işareti elle: sayfayı yalnız kaydırıp geçmek okumak sayılmaz. Tekrar dokununca işaret kalkar.
    const tiklar = [];
    const tikCiz = (t, evet) => {
      t.setAttribute("aria-pressed", String(evet));
      t.replaceChildren(el("span", { class: "isaret-kutu", "aria-hidden": "true" }, evet ? ikon("tik") : null), evet ? "Okundu" : "Okudum");
      t.title = evet ? "İşareti kaldırmak için tekrar dokun" : "Bu kısmı okuduysan işaretle";
    };
    ic.bolumler.forEach((b, i) => {
      const kes = el("section", { class: "kesim", id: `k${i}` });
      const m = el("div", { class: "metin", html: isle(`## ${b.baslik}\n\n${b.md}`, { guvenli: true }) });
      kes.append(m);
      const tik = el("button", { class: "okudum", type: "button" });
      tikCiz(tik, d0.tamam || d0.okunan.includes(i));
      tik.addEventListener("click", () => {
        const evet = tik.getAttribute("aria-pressed") !== "true";
        const s = P.okundu(id, i, n, evet);
        tikCiz(tik, evet);
        if (s.tamamOldu) bildir(s.tamamOdul ? "Bütün kısımlar okundu: tambur yerine oturdu. +10 drahmi" : "Bütün kısımlar okundu: tambur yerinde");
        sonuCiz();
      });
      tiklar.push(tik);
      kes.append(el("div", { class: "kesim-son" }, tik));
      kap.append(kes);
      canlandir(m, { bolum: id });
    });
    // Özet + bitir
    if (ic.ozet && ic.ozet.length) {
      kap.append(el("section", { class: "kesim" }, el("div", { class: "metin", html: isle("## Bölüm özeti\n\n" + ic.ozet.map((o) => "- " + o).join("\n"), { guvenli: true }) })));
    }
    const sonu = el("div", { class: "bolum-sonu" });
    const sonraki = sonrakiBolum(id);
    function sonuCiz() {
      const tamam = P.durum(id).tamam;
      const tuslar = el("div", { class: "tus-satir", style: "justify-content:center;margin:0" });
      if (!tamam) tuslar.append(el("button", { class: "tus", type: "button", onclick: () => {
        const odul = P.tamamla(id, true, n);
        tiklar.forEach((t) => tikCiz(t, true));
        bildir(odul ? "Tambur yerine oturdu. +10 drahmi" : "Tambur yerine oturdu");
        sonuCiz();
      } }, ikon("tik"), "Bölümü bitirdim"));
      tuslar.append(el("a", { class: "tus ikincil", href: `#/${yer.ders.id}/${id}/quiz` }, "Quiz'e geç"));
      if (sonraki) tuslar.append(el("a", { class: "tus sessiz", href: `#/${yer.ders.id}/${sonraki.id}` }, `Sonraki: ${sonraki.tr}`));
      sonu.replaceChildren(el("p", { text: tamam ? "Bu tambur yerinde. İstersen quizle altınla." : "Bitirdiysen tamburu yerine koy (bütün kısımları okundu sayar), sonra quizle pekiştir." }), tuslar);
    }
    sonuCiz();
    kap.append(sonu);
  }

  function sonrakiBolum(id) {
    const yer = ECO.dersBul(id);
    const liste = ECO.tumBolumler(yer.ders.id);
    const i = liste.findIndex((b) => b.id === id);
    return liste[i + 1] || null;
  }

  function terimSekmesi(kap, id, ic) {
    const t = ic.terimler || [];
    kap.append(el("div", { class: "tus-satir" }, el("a", { class: "tus", href: `#/kartlar/${id}` }, ikon("ostrakon"), "Kart olarak çalış")));
    const liste = el("div", { class: "terim-liste" });
    for (const [en, tr, tanim] of t) liste.append(el("div", { class: "terim" }, el("span", { class: "en", text: en }), el("span", { class: "tr", text: tr }), tanim ? el("span", { class: "tanim-en", text: tanim }) : null));
    kap.append(liste);
  }

  function quizSekmesi(kap, id, ic, yer) {
    const sorular = (ic.quiz || []).map((q, i) => Object.assign({ kaynak: id, i }, q));
    if (!sorular.length) { kap.append(el("p", { class: "bos-durum", text: "Bu bölümde henüz quiz yok." })); return; }
    const q = P.bolum(id).quiz;
    if (q) kap.append(el("p", { class: "kaynak-not", style: "margin-top:14px", text: `En iyi sonucun %${Math.round(q.en * 100)} · ${q.deneme} deneme` }));
    ECO.Quiz.baslat(kap, sorular, { id, karistir: true, baslik: yer.bolum.tr });
    kap.append(el("div", { class: "tus-satir" },
      el("button", { class: "tus ikincil", type: "button", onclick: () => ECO.Kahin.sor({ mod: "soru", metin: `${yer.bolum.no}. bölüm (${yer.bolum.ad}) için 5 yeni çoktan seçmeli soru üret; quizdekilerden farklı olsun.`, gonder: true }) }, ikon("tripod"), "Kâhin'den yeni sorular")));
  }

  // ================================================================ LEXİKON
  sayfa("sozluk", {
    baslik: () => "Lexikon",
    async goster(sahne) {
      const s = el("div", { class: "sayfa" });
      s.append(el("header", { class: "sayfa-bas" }, el("p", { class: "yunan-yazit", text: "ΛΕΞΙΚΟΝ" }), el("h1", { text: "Lexikon" }), el("p", { class: "alt-baslik", text: "Üç dersin bütün terimleri. İngilizce ya da Türkçe ara." })));
      const giris = el("input", { class: "giris", type: "search", placeholder: "ör. elasticity, fırsat maliyeti, vektör", "aria-label": "Terim ara" });
      s.append(el("div", { class: "arama" }, ikon("arama"), giris));
      const sonuc = el("div", { class: "terim-liste" });
      const bilgi = el("p", { class: "kaynak-not", text: "Terimler yükleniyor…" });
      s.append(bilgi, sonuc);
      sahne.append(s);
      const hepsi = await tumTerimler();
      bilgi.textContent = `${hepsi.length} terim`;
      const katla = (x) => x.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
      const ciz = () => {
        const q = katla(giris.value.trim());
        sonuc.innerHTML = "";
        const liste = q ? hepsi.filter((t) => katla(t.en + " " + t.tr + " " + (t.tanim || "")).includes(q)) : hepsi;
        for (const t of liste.slice(0, 300)) {
          sonuc.append(el("div", { class: "terim" }, el("span", { class: "en", text: t.en }), el("span", { class: "tr", text: t.tr }), t.tanim ? el("span", { class: "tanim-en", text: t.tanim }) : null,
            el("a", { class: "kaynak-not", href: `#/${t.ders}/${t.id}`, text: `${ECO.dersler[t.ders].yer} · ${t.no}. ${t.baslik}` })));
        }
        if (liste.length > 300) sonuc.append(el("p", { class: "kaynak-not", text: `İlk 300 gösterildi; aramayı daralt.` }));
        if (!liste.length) sonuc.append(el("p", { class: "bos-durum", text: "Bu aramaya uyan terim yok." }));
      };
      giris.addEventListener("input", ciz);
      ciz();
      giris.focus();
    },
  });

  async function tumTerimler() {
    const liste = ECO.tumBolumler();
    await Promise.all(liste.map((b) => ECO.icerikYukle(b.id).catch(() => null)));
    const out = [];
    for (const b of liste) {
      const ic = ECO.icerik[b.id];
      if (!ic || !ic.terimler) continue;
      for (const [en, tr, tanim] of ic.terimler) out.push({ en, tr, tanim, id: b.id, ders: b.ders, no: b.no, baslik: b.tr });
    }
    return out.sort((a, b) => a.en.localeCompare(b.en, "en"));
  }
  ECO.tumTerimler = tumTerimler;

  // ================================================================ AYARLAR
  sayfa("ayarlar", {
    baslik: () => "Ayarlar",
    goster(sahne) {
      const s = el("div", { class: "sayfa" });
      s.append(el("header", { class: "sayfa-bas" }, el("h1", { text: "Ayarlar" })));

      // Tema
      const tema = depo.al("tema", "oto");
      const temaBlok = el("section", { class: "ayar-blok" }, el("h2", { text: "Görünüm" }));
      ECO.Gorsel.secici(temaBlok, { etiket: "Tema", secenekler: [["oto", "Cihaza uy"], ["acik", "Gündüz mermeri"], ["koyu", "Ege gecesi"]], deger: tema, degisti: (v) => { depo.koy("tema", v); if (v === "oto") delete document.documentElement.dataset.tema; else document.documentElement.dataset.tema = v; } });
      temaBlok.append(el("div", { style: "height:10px" }));
      s.append(temaBlok);

      // Kâhin: bağlantı (Puter hesabı ya da kendi DeepSeek anahtarı) + model ayarları
      const K = ECO.Kahin;
      const ds = el("section", { class: "ayar-blok" }, el("h2", { text: "Kâhin (DeepSeek)" }));
      const anahtar = el("input", { class: "giris", id: "anahtar", type: "password", autocomplete: "off", spellcheck: "false", placeholder: "sk-…", value: depo.al("anahtar", "") });
      const goster = el("button", { class: "kucuk-tus", type: "button", text: "Göster", onclick: () => { anahtar.type = anahtar.type === "password" ? "text" : "password"; goster.textContent = anahtar.type === "password" ? "Göster" : "Gizle"; } });
      const anahtarGrup = el("div", { class: "alan-grup" },
        el("label", { for: "anahtar", text: "API anahtarı" }),
        el("div", { style: "display:flex;gap:8px" }, anahtar, goster),
        el("p", { class: "yardim", html: 'Anahtarı <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">platform.deepseek.com</a> → API keys bölümünden al. Yalnız bu cihazda saklanır ve yalnız api.deepseek.com\'a gönderilir; yedek dosyasına girmez.' }));
      anahtar.addEventListener("change", () => { depo.koy("anahtar", anahtar.value.trim()); bildir(anahtar.value.trim() ? "Anahtar kaydedildi" : "Anahtar silindi"); });
      const bagKap = el("div", { style: "margin-top:10px" });
      function bagCiz() {
        if (K.bag() === "anahtar") { bagKap.replaceChildren(anahtarGrup); return; }
        if (depo.al("kahinBag", "") === "puter") K.puterHazirla();
        const girdi = K.hazir();
        const durum = el("p", { class: "yardim", style: "margin:0", text: girdi ? "Puter'a girilmiş." : "Henüz Puter'a girilmemiş." });
        const tus = el("button", { class: girdi ? "kucuk-tus" : "tus", type: "button", text: girdi ? "Çıkış yap" : "Puter ile giriş yap", onclick: async () => {
          tus.disabled = true;
          try {
            if (girdi) { await K.puterCikis(); bildir("Puter'dan çıkıldı"); }
            else { depo.koy("kahinBag", "puter"); if (await K.puterGiris()) bildir("Puter'a girildi. Kâhin hazır."); }
            bagCiz(); return;
          } catch (e) { bildir(e.message, 5000); }
          tus.disabled = false;
        } });
        bagKap.replaceChildren(el("div", { class: "alan-grup" }, durum, el("div", { class: "tus-satir", style: "margin:8px 0" }, tus),
          el("p", { class: "yardim", html: 'Anahtar gerekmez: <a href="https://puter.com" target="_blank" rel="noopener">Puter</a>\'a Google, Microsoft, Apple ya da e-postayla girersin; aynı DeepSeek modeli Puter üzerinden çalışır. Her hesabın aylık ücretsiz bir kotası var, dolarsa ay başında yenilenir; harcananı <a href="https://puter.com/dashboard#usage" target="_blank" rel="noopener">puter.com/dashboard</a>\'da görürsün. Bu yolda Puter\'ın kodu (js.puter.com) uygulamanın içinde çalışır ve mesajların Puter üzerinden DeepSeek\'e gider. "Düşünme" ayarı yalnız kendi anahtarınla geçerli.' })));
        if (girdi) K.puterKim().then((ad) => { if (ad) durum.textContent = "Puter'a girilmiş: " + ad; }, () => {});
      }
      ECO.Gorsel.secici(ds, { etiket: "Bağlantı", secenekler: [["puter", "Puter hesabı (anahtarsız)"], ["anahtar", "Kendi DeepSeek anahtarım"]], deger: K.bag(), degisti: (v) => { depo.koy("kahinBag", v); bagCiz(); } });
      ds.append(bagKap);
      bagCiz();
      ds.append(el("div", { style: "height:14px" }));
      ECO.Gorsel.secici(ds, { etiket: "Model", secenekler: [["deepseek-flash", "Hızlı (fotoğraf okur)"], ["deepseek-v4-pro", "Derin (yalnız metin)"]], deger: depo.al("model", "deepseek-flash"), degisti: (v) => depo.koy("model", v) });
      ds.append(el("div", { style: "height:10px" }));
      ECO.Gorsel.secici(ds, { etiket: "Düşünme", secenekler: [["low", "Az"], ["high", "Normal"], ["max", "En çok"]], deger: depo.al("efor", "high"), degisti: (v) => depo.koy("efor", v) });
      ds.append(el("div", { style: "height:10px" }));
      ECO.Gorsel.secici(ds, { etiket: "Cevap dili", secenekler: [["tr", "Türkçe + İngilizce terim"], ["en", "İngilizce"]], deger: depo.al("cevapDili", "tr"), degisti: (v) => depo.koy("cevapDili", v) });
      ds.append(el("div", { class: "tus-satir" }, el("button", { class: "tus ikincil", type: "button", onclick: async (e) => {
        if (K.bag() === "anahtar") depo.koy("anahtar", anahtar.value.trim());
        e.target.disabled = true; e.target.textContent = "Deneniyor…";
        try { const m = await ECO.Kahin.dene(); bildir("Bağlantı tamam: " + m); }
        catch (err) { bildir("Olmadı: " + err.message, 5000); }
        e.target.disabled = false; e.target.textContent = "Bağlantıyı dene";
      } }, "Bağlantıyı dene")));
      s.append(ds);

      // Yedek
      const yd = el("section", { class: "ayar-blok" }, el("h2", { text: "İlerleme yedeği" }),
        el("p", { class: "yardim", style: "color:var(--murekkep-3);margin:0 0 6px", text: "İlerlemen yalnız bu cihazda. Telefon ile bilgisayar arasında taşımak için yedeği indir, ötekinde geri yükle." }));
      const dosya = el("input", { type: "file", accept: "application/json,.json", hidden: true });
      dosya.addEventListener("change", async () => {
        const f = dosya.files[0];
        if (!f) return;
        try { const n = P.iceAktar(await f.text()); bildir(`${n} kayıt geri yüklendi`); setTimeout(() => location.reload(), 900); }
        catch (err) { bildir("Yüklenemedi: " + err.message, 5000); }
      });
      yd.append(dosya, el("div", { class: "tus-satir" },
        el("button", { class: "tus", type: "button", onclick: () => {
          const blob = new Blob([P.disaAktar()], { type: "application/json" });
          const a = el("a", { href: URL.createObjectURL(blob), download: `ecopolis-yedek-${ECO.bugun()}.json` });
          document.body.append(a); a.click(); a.remove();
          bildir("Yedek indirildi");
        } }, ikon("indir"), "Yedeği indir"),
        el("button", { class: "tus ikincil", type: "button", onclick: () => dosya.click() }, ikon("yukle"), "Yedeği yükle")));
      s.append(yd);

      // Sıfırla
      const sf = el("section", { class: "ayar-blok" }, el("h2", { text: "Baştan başla" }),
        el("p", { class: "yardim", style: "color:var(--murekkep-3);margin:0", text: "Okunan bölümleri, quiz sonuçlarını, kartları ve drahmiyi siler. Anahtar ve tema kalır." }));
      sf.append(el("div", { class: "tus-satir" }, el("button", { class: "tus sessiz", type: "button", style: "color:var(--kirmizi)", onclick: (e) => {
        if (e.target.dataset.emin !== "1") { e.target.dataset.emin = "1"; e.target.textContent = "Emin misin? Bir daha bas"; return; }
        for (const k of ["ilerleme", "yanlislar", "kartlar", "kahin.sohbet", "klepsydra"]) depo.sil(k);
        bildir("İlerleme silindi"); setTimeout(() => git(""), 700);
      } }, ikon("copa"), "İlerlemeyi sil")));
      s.append(sf);

      s.append(el("p", { class: "alt-bilgi", html: `Ecopolis ${ECO.SURUM} · MIT lisanslı · yazı tipleri Cinzel, Alegreya, Alegreya Sans, JetBrains Mono (SIL OFL) · KaTeX, marked (MIT) · R için webR (Posit, MIT/GPL)<br>Colander, <i>Microeconomics</i> 11e McGraw Hill'in eseridir; buradaki anlatımlar özgündür.` }));
      sahne.append(s);
    },
  });

  ECO.tapinakCiz = tapinakCiz;
})();
