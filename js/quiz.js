// quiz.js — çoktan seçmeli quiz motoru. Soru: { s: "EN soru", tr?: "TR çeviri", c: [seçenekler], d: doğru indeks,
// a: "TR açıklama", kaynak: bölüm id, i: soru sırası }. Bölüm quizleri, Olympia ve Kâhin'in ürettiği sorular burada.
(function () {
  "use strict";
  const { el, isle, ikon, ilerleme: P, bildir } = ECO;
  const HARF = "ABCDEFG";

  function karistir(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  // Seçenek sırasını da karıştır (doğru indeksi taşıyarak); "All of the above" türü seçenekler sonda kalır
  function secenekKaristir(q) {
    const sabit = (t) => /\b(all|none|both) of the above\b|^both\b|^neither\b/i.test(t);
    const idx = q.c.map((_, i) => i);
    const oynak = karistir(idx.filter((i) => !sabit(q.c[i])));
    const son = idx.filter((i) => sabit(q.c[i]));
    const sira = oynak.concat(son);
    return Object.assign({}, q, { c: sira.map((i) => q.c[i]), d: sira.indexOf(q.d) });
  }

  function baslat(kap, sorular, o = {}) {
    const liste = (o.karistir ? karistir(sorular) : sorular.slice()).slice(0, o.en || 999).map((q) => (o.secenekSabit ? q : secenekKaristir(q)));
    const kutu = el("div", { class: "quiz" });
    kap.append(kutu);
    let i = 0, dogru = 0;
    const sonuclar = [];
    const yanlislar = [], dogrular = [];

    function ciz() {
      kutu.innerHTML = "";
      if (i >= liste.length) return bitir();
      const q = liste[i];
      const noktalar = el("div", { class: "quiz-noktalar", "aria-hidden": "true" }, liste.map((_, j) => el("span", { class: j < i ? (sonuclar[j] ? "dogru" : "yanlis") : j === i ? "simdi" : "" })));
      kutu.append(el("div", { class: "quiz-ust" }, noktalar, el("span", { class: "quiz-sayac", text: `${i + 1} / ${liste.length}` })));
      const kart = el("div", { class: "soru-kart" });
      kart.append(el("div", { class: "soru-metin", html: isle(q.s) }));
      if (q.tr) kart.append(el("p", { class: "soru-tr", text: q.tr }));
      if (o.kaynakGoster && q.kaynak) { const y = ECO.dersBul(q.kaynak); if (y) kart.append(el("p", { class: "kaynak-not", text: `${y.ders.yer} · ${y.bolum.no}. ${y.bolum.tr}` })); }
      const secenekler = el("div", { class: "secenekler", role: "group", "aria-label": "Seçenekler" });
      const tuslar = q.c.map((c, j) => el("button", { type: "button", class: "secenek", onclick: () => cevapla(j) }, el("span", { class: "harf", text: HARF[j] }), el("span", { html: isle(c).replace(/^<p>|<\/p>\s*$/g, "") })));
      secenekler.append(...tuslar);
      kart.append(secenekler);
      kutu.append(kart);

      function cevapla(j) {
        const tamam = j === q.d;
        tuslar.forEach((t, k) => { t.disabled = true; if (k === q.d) t.classList.add("dogru"); else if (k === j) t.classList.add("yanlis"); });
        sonuclar[i] = tamam;
        if (tamam) dogru++;
        const anahtar = q.kaynak != null ? `${q.kaynak}#${q.i}` : null;
        if (anahtar && !o.uretilmis) (tamam ? dogrular : yanlislar).push(anahtar);
        P.soruCevap(tamam);
        const ac = el("div", { class: "aciklama", role: "status" });
        ac.append(el("span", { class: "hukum " + (tamam ? "dogru" : "yanlis"), text: tamam ? "Doğru." : `Yanlış — doğrusu ${HARF[q.d]}.` }));
        if (q.a) ac.append(el("div", { class: "metin", style: "font-size:1rem", html: isle(q.a) }));
        kart.append(ac);
        const alt = el("div", { class: "tus-satir" });
        alt.append(el("button", { class: "tus", type: "button", onclick: () => { i++; ciz(); kutu.scrollIntoView({ block: "start", behavior: "smooth" }); } }, i + 1 < liste.length ? "Sonraki soru" : "Sonucu gör"));
        if (ECO.Kahin) alt.append(el("button", { class: "tus sessiz", type: "button", onclick: () => ECO.Kahin.sor({
          metin: `Şu soruyu tam anlamadım, açıklar mısın?\n\nSoru: ${q.s}\n${q.c.map((c, k) => `${HARF[k]}) ${c}`).join("\n")}\n\nDoğru cevap: ${HARF[q.d]}. Benim cevabım: ${HARF[j]}.${q.a ? "\nKitaptaki açıklama: " + q.a : ""}`, gonder: true,
        }) }, ikon("tripod"), "Kâhin'e sor"));
        kart.append(alt);
        alt.querySelector("button").focus({ preventScroll: true });
      }
    }

    function bitir() {
      const oran = liste.length ? dogru / liste.length : 0;
      if (!o.uretilmis) P.quizKaydet(o.id || null, dogru, liste.length, yanlislar, dogrular);
      const s = el("div", { class: "quiz-sonuc" });
      if (oran >= 0.8) s.append(defne());
      s.append(el("div", { class: "puan", text: `%${Math.round(oran * 100)}` }));
      s.append(el("p", { text: `${liste.length} sorudan ${dogru} doğru. ` + (oran >= 0.8 ? "Defne senin." : oran >= 0.6 ? "İyi gidiyor; yanlışların Olympia'daki defterine yazıldı." : "Bölümü bir kez daha gözden geçir, sonra yeniden dene.") }));
      if (o.id && oran >= 0.8 && !P.durum(o.id).tamam) s.append(el("p", { class: "kaynak-not", text: "İpucu: “Bölümü bitirdim” dersen tamburun altın olarak yerine oturur." }));
      s.append(el("div", { class: "tus-satir", style: "justify-content:center" },
        el("button", { class: "tus", type: "button", onclick: () => { kutu.remove(); baslat(kap, sorular, o); } }, ikon("yenile"), "Yeniden dene"),
        o.bitti ? el("button", { class: "tus ikincil", type: "button", onclick: () => o.bitti(oran) }, "Bitir") : null));
      kutu.append(s);
      if (oran >= 0.8) bildir("Defne! Quiz %" + Math.round(oran * 100));
    }
    ciz();
    return kutu;
  }

  function defne() {
    const s = el("svg", { class: "defne-svg", viewBox: "0 0 120 72", "aria-hidden": "true" });
    const yaprak = (x, y, a, ayna) => el("ellipse", { cx: x, cy: y, rx: 7, ry: 3.2, transform: `rotate(${ayna ? -a : a} ${x} ${y})`, fill: "currentColor", opacity: "0.85" });
    s.append(el("path", { d: "M38 66 C14 52 12 26 28 8", fill: "none", stroke: "currentColor", "stroke-width": "2" }));
    s.append(el("path", { d: "M82 66 C106 52 108 26 92 8", fill: "none", stroke: "currentColor", "stroke-width": "2" }));
    [[30, 58, 40], [22, 47, 60], [19, 35, 80], [21, 23, 100], [27, 13, 120]].forEach(([x, y, a]) => { s.append(yaprak(x, y, a)); s.append(yaprak(120 - x, y, a, true)); });
    return s;
  }

  ECO.Quiz = { baslat, karistir, defne };
})();
