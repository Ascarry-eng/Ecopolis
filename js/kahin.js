// kahin.js — Delphi Kâhini: DeepSeek sohbeti. Tarayıcıdan doğrudan api.deepseek.com'a (CORS açık), akışlı.
// Anahtar yalnız bu cihazın localStorage'ında. Cevaptaki ```grafik JSON'u çizilir, ```quiz JSON'u etkileşimli
// quize döner, ```r kodu kullanıcı isterse tarayıcıdaki R'da çalışır.
(function () {
  "use strict";
  const { el, depo, isle, canlandir, ikon, bildir, sayfa, git, Ifade } = ECO;
  const ADRES = "https://api.deepseek.com/chat/completions";

  const dersListesi = () => Object.values(ECO.dersler).map((d) => `${d.ders} (${d.ad}): ` + ECO.tumBolumler(d.id).map((b) => `${b.no}. ${b.ad}`).join("; ")).join("\n");

  const GRAFIK_SEMA = `\`\`\`grafik
{"baslik":"Piyasa dengesi","x":[0,100],"y":[0,50],"xEtiket":"Q","yEtiket":"P",
 "egriler":[{"f":"50-0.4*x","ad":"D","renk":"mavi"},{"f":"5+0.2*x","ad":"S","renk":"kirmizi"}],
 "noktalar":[{"x":75,"y":20,"ad":"E"}],
 "alanlar":[{"ust":"50-0.4*x","alt":"20","x":[0,75],"ad":"CS","renk":"mavi"}],
 "cizgiler":[{"x1":0,"y1":20,"x2":75,"y2":20,"kesik":true}]}
\`\`\``;

  function sistemMetni(mod, baglam) {
    const en = depo.al("cevapDili", "tr") === "en";
    let s = `Sen Ecopolis uygulamasının Kâhin'isin (Delphi kâhini): Türkiye'de bir üniversitenin iktisat bölümü 1. sınıf öğrencisine yardım eden sabırlı, sıcak ve titiz bir öğretmen. Dersler İngilizce işleniyor; öğrenci Türk. Öğrencinin üç ana dersi:
${dersListesi()}
Mikroekonomi dersinin kitabı Colander, Microeconomics, 11. baskı (McGraw Hill). Matematik dersinin haftaları yukarıdaki sırayla; 8. hafta ara sınav, 15. hafta final. Araştırma yöntemleri dersinde R ve RStudio en baştan öğretiliyor.

Kurallar:
${en ? "- Answer in English. The first time a key term appears you may add its Turkish equivalent in parentheses." : "- Türkçe cevap ver. Önemli terimlerin İngilizcesini ilk geçtiği yerde parantez içinde ver, ör. fırsat maliyeti (opportunity cost); sınavlar İngilizce."}
- Colander'ın terminolojisini ve çerçevesini kullan (ör. quantity demanded ile demand ayrımı, shift factors, invisible hand theorem, art of economics, principle of increasing marginal opportunity cost).
- Matematiği LaTeX ile yaz: satır içi $...$, ayrı satırda $$...$$. Ondalık ayırıcı olarak nokta kullan. Hesapları kontrol et; emin olmadığın yerde söyle.
- Bir grafik anlatımı kolaylaştıracaksa \`\`\`grafik bloğunda JSON olarak ver; uygulama onu çizer. Şema (f: x cinsinden ifade; + - * / ^ sqrt ln exp kullanılabilir; renk: mavi, kirmizi, altin, yesil, gri; alanlar ve cizgiler isteğe bağlı):
${GRAFIK_SEMA}
  Talep–arz grafiklerinde fiyat dikey (y), miktar yatay (x) eksendedir; eğrileri P = f(Q) biçiminde yaz.
- R kodunu \`\`\`r bloğunda ver. Öğrenci uygulamada "Çalıştır"a basıp kodu tarayıcıdaki R 4.6'da (webR) çalıştırabilir: kod kendi başına çalışsın, dış dosya gerekiyorsa küçük bir veri çerçevesini kodun içinde üret. Paket gerekiyorsa library() satırını yaz; uygulama paketi kendisi kurar.
- Türkiye'den örnek verebilirsin ama rakam uydurma; emin olmadığın veriyi "yaklaşık" diye işaretle ya da verme.
- Kısa paragraflar, gerektiğinde başlık ve madde. Amaç öğrencinin yöntemi öğrenip benzer soruyu sınavda kendisinin çözmesi.
- Fotoğraf gelirse önce soruyu kendi cümlelerinle yaz (doğru okuduğunu teyit etmek için), sonra çöz.`;
    const MOD = {
      acikla: "",
      sokratik: `\n\nSOKRATİK MOD: Cevabı doğrudan verme. Öğrenciyi adım adım düşündüren TEK bir soru sor ve cevabını bekle. Cevap doğruysa bir sonraki adıma geç, yanlışsa ipucu ver. Öğrenci açıkça "cevabı söyle" derse çözümü ver. Her mesajın kısa olsun.`,
      soru: `\n\nSORU ÜRETME MODU: İstenen konudan sınav tarzında çoktan seçmeli sorular üret (aksi istenmedikçe 5 soru, 4 seçenek). Sorular ve seçenekler İngilizce, açıklamalar Türkçe olsun. Çeldiriciler öğrencilerin tipik yanılgılarından gelsin; sayısal sorularda hesabı kontrol et. Cevabın YALNIZCA tek bir \`\`\`quiz bloğu olsun; içinde şu biçimde geçerli JSON dizisi bulunsun, başka metin yazma:
\`\`\`quiz
[{"s":"Soru metni (İngilizce)","c":["seçenek A","seçenek B","seçenek C","seçenek D"],"d":2,"a":"Türkçe açıklama: neden doğru, çeldiriciler neden yanlış"}]
\`\`\`
"d" doğru seçeneğin 0'dan başlayan sırasıdır. Matematik gerekiyorsa $...$ kullanabilirsin (JSON içinde ters bölüleri \\\\ olarak kaçışla).`,
      kod: `\n\nR KOD MODU: Öğrencinin R kodunu açıkla, hatalarını bul ve düzelt ya da istenen kodu yaz. Önce ne yapacağını bir cümleyle söyle, sonra çalışabilir \`\`\`r bloğu ver, sonra satır satır kısa açıklama yap. Hata mesajı geldiyse mesajın ne dediğini Türkçe çevir ve nedenini açıkla. RStudio'daki karşılığını (hangi panel, hangi kısayol) yeri geldikçe söyle.`,
      basit: `\n\nBASİTLEŞTİR MODU: Konuyu hiç terim bilmeyen birine anlatır gibi, günlük hayattan bir benzetmeyle ve kısa cümlelerle anlat. En sonda "Sınavda böyle yaz:" başlığıyla konunun İngilizce, ders kitabı düzeyinde 2-3 cümlelik tanımını ver.`,
    };
    s += MOD[mod] || "";
    if (baglam) s += `\n\nBağlam: Öğrenci şu an uygulamada şu bölümü çalışıyor — ${baglam.baslik}. Bölümün konuları: ${baglam.ozet || ""}.${baglam.terimler ? " Bölümün terimleri: " + baglam.terimler + "." : ""} Soru bu bölümle ilgiliyse cevabını bu çerçevede ver.`;
    return s;
  }

  // ---------------------------------------------------------------- durum
  const MODLAR = [["acikla", "Açıkla"], ["sokratik", "Sokratik"], ["soru", "Soru üret"], ["kod", "R kodu"], ["basit", "Basitleştir"]];
  let mesajlar = depo.al("kahin.sohbet", []);
  let mod = "acikla";
  let baglam = null, baglamAcik = true;
  let bekleyen = null;
  let ek = null;
  let iptal = null;
  let ui = null;

  const kaydet = () => depo.koy("kahin.sohbet", mesajlar.slice(-40).map(({ resim, akiyor, ...m }) => ({ ...m, resimVardi: m.resimVardi || !!resim })));
  const model = () => depo.al("model", "deepseek-flash");

  // ---------------------------------------------------------------- yapay zekâ grafiği
  const RENK = { mavi: "r-1", kirmizi: "r-2", altin: "r-3", yesil: "r-4", gri: "r-5" };
  const ALAN_RENK = { mavi: "a-tuketici", kirmizi: "a-uretici", altin: "a-olu", yesil: "a-vergi", gri: "a-notr" };
  ECO.aiGrafik = function (d) {
    if (d.dataset.kuruldu) return;
    d.dataset.kuruldu = "1";
    let o;
    try { o = JSON.parse(d.dataset.spec); } catch (e) { d.append(el("pre", { class: "kod", text: d.dataset.spec })); return; }
    try {
      const { sahne, okumaKap } = ECO.Gorsel.cerceve(d, { baslik: o.baslik || "Kâhin'in grafiği" });
      const sayiMi = (v) => typeof v === "number" && isFinite(v);
      const g = ECO.Grafik(sahne, { x: o.x || [0, 10], y: o.y || [0, 10], xEtiket: o.xEtiket, yEtiket: o.yEtiket });
      const fn = (ifade) => (typeof ifade === "number" ? () => ifade : Ifade.derle(String(ifade)));
      for (const a of o.alanlar || []) { try { const xx = a.x || [g.x0, g.x1]; g.alan(fn(a.ust), fn(a.alt != null ? a.alt : 0), xx[0], xx[1], { sinif: ALAN_RENK[a.renk] || "a-notr", etiket: a.ad }); } catch (e) { /* tek alanın hatası grafiği düşürmesin */ } }
      for (const c of o.egriler || []) { try { g.egri(fn(c.f), { sinif: RENK[c.renk] || "r-1", etiket: c.ad, kesik: c.kesik, x0: c.x && c.x[0], x1: c.x && c.x[1] }); } catch (e) { okumaKap.append(el("p", { class: "eksik", text: `Eğri çizilemedi (${c.f}): ${e.message}` })); } }
      for (const c of o.cizgiler || []) if ([c.x1, c.y1, c.x2, c.y2].every(sayiMi)) g.cizgi(c.x1, c.y1, c.x2, c.y2, { sinif: RENK[c.renk] || "r-5", kesik: c.kesik !== false });
      for (const n of o.noktalar || []) if (sayiMi(n.x) && sayiMi(n.y)) { g.kilavuz(n.x, n.y); g.nokta(n.x, n.y, { etiket: n.ad }); }
    } catch (e) { d.append(el("p", { class: "eksik", text: "Grafik çizilemedi: " + e.message })); }
  };

  function aiQuiz(d, akiyor) {
    if (d.dataset.kuruldu) return;
    if (akiyor) { d.append(el("p", { class: "bilgi", text: "Sorular hazırlanıyor…" })); return; }
    d.dataset.kuruldu = "1";
    let liste;
    try {
      liste = JSON.parse(d.dataset.spec);
      if (!Array.isArray(liste)) liste = liste.sorular || liste.questions || [];
      liste = liste.filter((q) => q && q.s && Array.isArray(q.c) && q.c.length >= 2 && Number.isInteger(q.d) && q.d >= 0 && q.d < q.c.length);
    } catch (e) { d.append(el("p", { class: "eksik", text: "Sorular okunamadı; Kâhin'den yeniden üretmesini iste." })); return; }
    if (!liste.length) { d.append(el("p", { class: "eksik", text: "Geçerli soru yok; yeniden üretmesini iste." })); return; }
    ECO.Quiz.baslat(d, liste, { uretilmis: true });
  }

  // ---------------------------------------------------------------- çizim
  function bosCiz() {
    const k = el("div", { class: "kahin-bos" });
    const tripod = ikon("tripod", "tripod");
    k.append(tripod);
    if (!depo.al("anahtar", "")) {
      k.append(el("h2", { text: "Önce DeepSeek anahtarını gir" }),
        el("p", { text: "Kâhin, DeepSeek'in yapay zekâsıyla konuşur. Anahtarı platform.deepseek.com → API keys bölümünden alırsın; bir kez girmen yeter, yalnız bu cihazda saklanır." }),
        el("a", { class: "tus", href: "#/ayarlar" }, ikon("disli"), "Anahtarı gir"));
      return k;
    }
    k.append(el("h2", { text: "Takıldığın yeri sor" }),
      el("p", { text: "Ödev sorusunun fotoğrafını gönderebilir, bir grafiği çizdirebilir, R kodunu inceletebilirsin. Bir bölümden geldiysen Kâhin o bölümü biliyor." }));
    const oneriler = baglam && baglamAcik
      ? [`Bu bölümün en önemli 3 fikrini sınav gözüyle özetle.`, `Bu bölümden tipik bir sınav sorusu sor, ben çözeyim.`, `Bu bölümdeki temel grafiği çizip adım adım anlat.`]
      : ["Talep ile talep miktarı (quantity demanded) arasındaki fark ne? Grafikle göster.", "Fırsat maliyetini günlük hayattan bir örnekle anlat; batık maliyetten farkı ne?", "R'da bir vektörün ortalamasını ve standart sapmasını nasıl bulurum?"];
    for (const o of oneriler) k.append(el("button", { class: "oneri", type: "button", text: o, onclick: () => { ui.alan.value = o; boyutla(); ui.alan.focus(); } }));
    return k;
  }

  function mesajCiz(m, i) {
    if (m.rol === "user") {
      const k = el("div", { class: "mesaj-sen" });
      if (m.resim) k.append(el("img", { src: m.resim, alt: "Gönderilen fotoğraf" }));
      else if (m.resimVardi) k.append(el("div", { style: "opacity:.75;font-size:13px;margin-bottom:4px", text: "[fotoğraf — uygulama kapanınca silindi]" }));
      k.append(document.createTextNode(m.metin));
      return k;
    }
    const k = el("div", { class: "mesaj-o", "data-i": i });
    if (m.dusunce) {
      const d = el("details", { class: "dusunce" }, el("summary", { text: m.metin ? "Kâhin'in düşünme adımları" : "Kâhin düşünüyor…" }), el("div", { class: "dusunce-ic", text: m.dusunce }));
      if (!m.metin && m.akiyor) d.open = true;
      k.append(d);
    }
    if (m.metin || m.akiyor) {
      const kg = el("div", { class: "kagit metin" + (m.akiyor ? " yaziyor" : "") });
      kg.innerHTML = m.metin ? isle(m.metin) : "";
      kg.querySelectorAll(".ai-quiz").forEach((d) => aiQuiz(d, m.akiyor));
      if (!m.metin && m.akiyor && !m.dusunce) kg.innerHTML = `<p style="color:var(--murekkep-3)">Kâhin'e bağlanılıyor…</p>`;
      k.append(kg);
      if (!m.akiyor) canlandir(kg, { kahin: true });
    }
    if (m.hata) k.append(el("div", { class: "mesaj-hata", text: m.hata }));
    if (!m.akiyor && (m.metin || m.bilgi)) {
      const alt = el("div", { class: "mesaj-alt" });
      if (m.metin) alt.append(el("button", { type: "button", text: "Kopyala", onclick: () => kopyala(m.metin) }));
      if (m.bilgi) alt.append(el("span", { text: m.bilgi }));
      k.append(alt);
    }
    return k;
  }

  function hepsiniCiz() {
    ui.sohbet.innerHTML = "";
    if (!mesajlar.length) { ui.sohbet.append(bosCiz()); return; }
    mesajlar.forEach((m, i) => ui.sohbet.append(mesajCiz(m, i)));
  }
  let cizZaman = 0;
  function sonuGuncelle(hemen) {
    if (!ui) return;
    const yap = () => {
      const i = mesajlar.length - 1;
      const eski = ui.sohbet.querySelector(`.mesaj-o[data-i="${i}"]`);
      const yeni = mesajCiz(mesajlar[i], i);
      const eskiD = eski && eski.querySelector("details"), yeniD = yeni.querySelector("details");
      if (eskiD && yeniD && !mesajlar[i].metin) yeniD.open = eskiD.open;
      const altta = window.innerHeight + window.scrollY >= document.body.scrollHeight - 160;
      if (eski) eski.replaceWith(yeni); else ui.sohbet.append(yeni);
      if (altta) window.scrollTo(0, document.body.scrollHeight);
    };
    clearTimeout(cizZaman);
    if (hemen) yap(); else cizZaman = setTimeout(yap, 60);
  }

  function kopyala(metin) {
    const bitti = () => bildir("Kopyalandı");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(metin).then(bitti, () => bildir("Kopyalanamadı"));
    else bildir("Kopyalanamadı");
  }

  // ---------------------------------------------------------------- gönderim
  function apiMesajlari(m) {
    const out = [{ role: "system", content: sistemMetni(mod, baglamAcik ? baglam : null) }];
    for (const x of m) {
      if (x.hata && !x.metin) continue;
      if (x.rol === "user") {
        const metin = x.metin || (x.resim ? "Bu fotoğraftaki soruyu çöz." : "");
        if (x.resim) out.push({ role: "user", content: [{ type: "text", text: metin }, { type: "image_url", image_url: { url: x.resim } }] });
        else out.push({ role: "user", content: x.resimVardi ? metin + "\n[Bu mesajda bir fotoğraf vardı, artık görünmüyor.]" : metin });
      } else if (x.metin) out.push({ role: "assistant", content: x.metin });
    }
    return out;
  }

  async function istek(govde, sinyal) {
    const anahtar = depo.al("anahtar", "");
    if (!anahtar) throw new Error("DeepSeek anahtarı yok. Ayarlar'dan gir.");
    let r;
    try {
      r = await fetch(ADRES, { method: "POST", signal: sinyal, headers: { "Content-Type": "application/json", Authorization: "Bearer " + anahtar }, body: JSON.stringify(govde) });
    } catch (e) {
      if (e.name === "AbortError") throw e;
      throw new Error("Bağlantı kurulamadı. İnternetini kontrol et.");
    }
    if (!r.ok) {
      let ayr = "";
      try { const j = await r.json(); ayr = (j.error && j.error.message) || ""; } catch (e) { /* */ }
      const neden = { 401: "Anahtar geçersiz. Ayarlar'dan kontrol et.", 402: "DeepSeek hesabında bakiye kalmamış.", 422: "İstek reddedildi: " + ayr, 429: "Çok hızlı soruldu; biraz bekleyip yeniden dene.", 500: "DeepSeek'te geçici bir sorun var.", 503: "DeepSeek şu an yoğun; biraz sonra dene." }[r.status];
      throw new Error(neden || `DeepSeek ${r.status}: ${ayr || r.statusText}`);
    }
    return r;
  }

  async function gonder() {
    if (iptal) { iptal.abort(); return; }
    const metin = ui.alan.value.trim();
    if (!metin && !ek) return;
    if (!depo.al("anahtar", "")) { bildir("Önce Ayarlar'dan DeepSeek anahtarını gir"); return; }
    mesajlar.push({ rol: "user", metin, resim: ek || undefined });
    ui.alan.value = ""; boyutla();
    ekTemizle();
    const cevap = { rol: "assistant", metin: "", dusunce: "", akiyor: true };
    mesajlar.push(cevap);
    hepsiniCiz();
    window.scrollTo(0, document.body.scrollHeight);
    let secilen = model(), not = "";
    if (secilen !== "deepseek-flash" && mesajlar.some((m) => m.resim)) { secilen = "deepseek-flash"; not = "Fotoğraf olduğu için Hızlı model kullanıldı. "; }
    const govde = { model: secilen, messages: apiMesajlari(mesajlar.slice(0, -1)), stream: true, stream_options: { include_usage: true }, max_tokens: 16000, reasoning_effort: depo.al("efor", "high") };
    iptal = new AbortController();
    tusDurumu();
    let kullanim = null;
    try {
      const r = await istek(govde, iptal.signal);
      const okuyucu = r.body.getReader();
      const coz = new TextDecoder();
      let tampon = "";
      for (;;) {
        const { value, done } = await okuyucu.read();
        if (done) break;
        tampon += coz.decode(value, { stream: true });
        const satirlar = tampon.split("\n");
        tampon = satirlar.pop();
        for (const s of satirlar) {
          const t = s.trim();
          if (!t.startsWith("data:")) continue;
          const v = t.slice(5).trim();
          if (v === "[DONE]") continue;
          let j; try { j = JSON.parse(v); } catch (e) { continue; }
          if (j.usage) kullanim = j.usage;
          const dl = j.choices && j.choices[0] && j.choices[0].delta;
          if (!dl) continue;
          if (dl.reasoning_content) cevap.dusunce += dl.reasoning_content;
          if (dl.content) cevap.metin += dl.content;
          sonuGuncelle();
        }
      }
    } catch (e) {
      if (e.name === "AbortError") cevap.bilgi = "Durduruldu.";
      else cevap.hata = e.message;
    }
    cevap.akiyor = false;
    if (!cevap.hata && !cevap.bilgi) cevap.bilgi = `${not}${secilen === "deepseek-flash" ? "Hızlı" : "Derin"} model${kullanim ? ` · ${kullanim.total_tokens.toLocaleString("tr-TR")} token` : ""}`;
    iptal = null;
    kaydet();
    sonuGuncelle(true);
    tusDurumu();
  }

  function tusDurumu() {
    if (!ui) return;
    ui.gonder.innerHTML = "";
    ui.gonder.append(ikon(iptal ? "dur" : "gonder"));
    ui.gonder.setAttribute("aria-label", iptal ? "Durdur" : "Gönder");
  }
  function boyutla() { if (!ui) return; ui.alan.style.height = "auto"; ui.alan.style.height = Math.min(180, ui.alan.scrollHeight + 2) + "px"; }

  // Fotoğrafı küçült (uzun kenar ≤ 1600 px, JPEG) — veri ve token tasarrufu
  function resimOku(dosya) {
    return new Promise((ok, hata) => {
      const r = new FileReader();
      r.onload = () => {
        const img = new Image();
        img.onload = () => {
          const o = Math.min(1, 1600 / Math.max(img.width, img.height));
          const c = document.createElement("canvas");
          c.width = Math.round(img.width * o); c.height = Math.round(img.height * o);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          ok(c.toDataURL("image/jpeg", 0.86));
        };
        img.onerror = () => hata(new Error("Resim açılamadı"));
        img.src = r.result;
      };
      r.onerror = () => hata(new Error("Dosya okunamadı"));
      r.readAsDataURL(dosya);
    });
  }
  function ekTemizle() { ek = null; if (ui) ui.onizleme.hidden = true; }

  // ---------------------------------------------------------------- sayfa
  sayfa("kahin", {
    baslik: () => "Kâhin",
    goster(sahne) {
      const modTuslar = el("div", { class: "kahin-modlar", role: "toolbar", "aria-label": "Kâhin'in tarzı" });
      const modCiz = () => modTuslar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mod === mod)));
      for (const [k, ad] of MODLAR) modTuslar.append(el("button", { type: "button", "data-mod": k, text: ad, onclick: () => { mod = k; modCiz(); bildir({ acikla: "Açıklama modu", sokratik: "Sokratik mod: Kâhin soru sorarak götürür", soru: "Soru üretme modu: konu yaz, quiz gelsin", kod: "R kodu modu: kodunu yapıştır", basit: "Basitleştir: benzetmeyle anlatır" }[k]); } }));
      const temizle = el("button", { class: "kucuk-tus", type: "button", text: "Yeni sohbet", onclick: () => { if (iptal) iptal.abort(); mesajlar = []; kaydet(); hepsiniCiz(); } });
      const bas = el("header", { class: "kahin-bas" }, el("div", { class: "kahin-bas-ic" },
        el("p", { class: "yunan-yazit", lang: "grc", text: "ΓΝΩΘΙ ΣΑΥΤΟΝ" }),
        el("div", { class: "baslik-satir" }, el("h1", null, "Kâhin"), temizle),
        modTuslar));
      if (baglam) {
        const cip = el("div", { class: "baglam-cip" }, el("span", { text: (baglamAcik ? "Bağlam: " : "Bağlam kapalı: ") + baglam.baslik }),
          el("button", { type: "button", "aria-label": baglamAcik ? "Bağlamı kapat" : "Bağlamı aç", text: baglamAcik ? "×" : "+", onclick: () => { baglamAcik = !baglamAcik; git("kahin"); } }));
        bas.firstChild.append(cip);
      }

      const sohbet = el("div", { class: "sohbet-ic", "aria-live": "polite" });
      const alan = el("textarea", { rows: "1", placeholder: "Kâhin'e sor…", "aria-label": "Mesaj" });
      const dosya = el("input", { type: "file", accept: "image/*", hidden: true });
      const foto = el("button", { class: "ikon-tus", type: "button", "aria-label": "Fotoğraf ekle" }, ikon("kamera"));
      const gonderTus = el("button", { class: "ikon-tus gonder", type: "button", "aria-label": "Gönder" }, ikon("gonder"));
      const onizleme = el("div", { class: "ek-onizleme", hidden: true });
      const yazma = el("div", { class: "yazma" }, onizleme, el("div", { class: "yazma-ic" }, foto, alan, gonderTus, dosya));
      ui = { sohbet, alan, gonder: gonderTus, onizleme };

      foto.addEventListener("click", () => dosya.click());
      dosya.addEventListener("change", async () => {
        const f = dosya.files[0]; dosya.value = "";
        if (!f) return;
        try {
          ek = await resimOku(f);
          onizleme.innerHTML = "";
          onizleme.append(el("img", { src: ek, alt: "" }), el("span", { text: "Fotoğraf eklendi (Hızlı model okur)" }), el("button", { class: "kucuk-tus", type: "button", text: "Kaldır", onclick: ekTemizle }));
          onizleme.hidden = false;
        } catch (e) { bildir(e.message); }
      });
      alan.addEventListener("input", boyutla);
      alan.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing && matchMedia("(pointer: fine)").matches) { e.preventDefault(); gonder(); } });
      gonderTus.addEventListener("click", gonder);

      sahne.append(el("div", { class: "kahin" }, bas, el("div", { class: "sohbet" }, sohbet), yazma));
      modCiz();
      hepsiniCiz();
      tusDurumu();
      if (bekleyen) {
        const b = bekleyen; bekleyen = null;
        if (b.mod) { mod = b.mod; modCiz(); }
        alan.value = b.metin || ""; boyutla();
        if (b.gonder && depo.al("anahtar", "")) gonder();
        else alan.focus();
      }
      window.scrollTo(0, document.body.scrollHeight);
    },
    ayril() { ui = null; },
  });

  ECO.Kahin = {
    baglamAyarla(b) { baglam = b; baglamAcik = true; },
    sor(o) { bekleyen = o; git("kahin"); },
    async dene() {
      const r = await istek({ model: depo.al("model", "deepseek-flash"), messages: [{ role: "user", content: "Sadece 'tamam' yaz." }], max_tokens: 20, stream: false, reasoning_effort: "low" });
      const j = await r.json();
      return j.model || "DeepSeek";
    },
    sistemMetni,
  };
})();
