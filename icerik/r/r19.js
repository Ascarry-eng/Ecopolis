// Araştırma Yöntemleri — 19. ders: Raporlama: R Markdown, Quarto ve akademik yazım (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  const K4 = "````";
  ECO.icerikEkle({
    id: "r19",
    hedefler: [
      "R Markdown / Quarto belgesinin parçalarını (YAML başlığı, metin, kod parçaları) tanımak",
      "Kod, sonuç ve yorumu tek bir tekrarlanabilir belgede birleştirmek",
      "Bir araştırma raporunun bölümlerini ve her bölümün işlevini bilmek",
      "Tablo ve grafikleri akademik standartlarda sunmak",
      "APA biçiminde kaynak göstermek; veri ve yazılımı kaynakçaya eklemek",
      "Araştırma etiği, intihal, kişisel verilerin korunması ve yapay zekâ kullanımında şeffaflık ilkelerini uygulamak",
    ],
    bolumler: [
      { baslik: "Neden tekrarlanabilir raporlama?", md: R`
Klasik iş akışı: R'da analiz yap → sonuçları kopyala → Word'e yapıştır → grafikleri tek tek kaydedip ekle. Bir veri hatası bulduğunda? Hepsini baştan yap ve bir sayıyı güncellemeyi unutma riskiyle yaşa.

**Tekrarlanabilir raporlama**, kod ile metni tek bir belgede birleştirir: belgeyi her derlediğinde (render) bütün analiz yeniden çalışır, tablolar ve grafikler güncel veriden üretilir. Bir başkası (ya da hocan) belgeyi aynı veriyle derlediğinde aynı sonucu alır.

R dünyasında iki araç vardır:

- **R Markdown** (.Rmd): yıllardır standart.
- **Quarto** (.qmd): Posit'in yeni nesil sistemi; R'ın yanında Python ve Julia'yı da destekler. RStudio'da **File → New File → Quarto Document**.

İkisinin sözdizimi neredeyse aynıdır. Çıktı **HTML, PDF ya da Word** olabilir.
` },
      { baslik: "Bir Quarto / R Markdown belgesinin anatomisi", md: R`
${K4}r salt
---
title: "Çalışma Süresi ve Akademik Başarı"
author: "Ad Soyad"
date: "2026-12-15"
format: html          # R Markdown'da: output: html_document
---

## Giriş

Bu çalışmada haftalık çalışma süresi ile not ortalaması arasındaki
ilişkiyi inceliyoruz. Örneklemde \`r nrow(anket)\` öğrenci var.

## Veri

\`\`\`{r}
#| echo: false
anket <- read.csv("ogrenci_anket.csv")
summary(anket$not_ortalamasi)
\`\`\`

## Bulgular

\`\`\`{r}
#| label: fig-sacilim
#| fig-cap: "Çalışma süresi ve not ortalaması"
plot(anket$calisma_saati, anket$not_ortalamasi)
\`\`\`

Korelasyon katsayısı \`r round(cor(anket$calisma_saati, anket$not_ortalamasi), 2)\` bulunmuştur.
${K4}

Üç parça:

1. **YAML başlığı** (üç tire arasında): başlık, yazar, tarih, çıktı biçimi.
2. **Markdown metni**: başlıklar (\`##\`), **kalın**, *italik*, listeler, bağlantılar — bu uygulamadaki ders metinleri de Markdown'la yazıldı!
3. **Kod parçaları (chunks)**: \`{r}\` ile başlayan bloklar. Derlemede çalışır, sonucu belgeye girer.
   - \`echo: false\` → kodu gösterme, yalnız sonucu göster (raporlar için).
   - \`eval: false\` → kodu gösterme ama çalıştırma.
   - \`warning: false\`, \`message: false\` → uyarı ve mesajları gizle.
   - \`fig-cap\` → grafik başlığı.
4. **Satır içi kod**: \`r ifade\` biçimi metnin içine hesaplanmış bir sayı koyar. Sayıyı elle yazmazsın; veri değişirse metin de değişir.

Belgeyi **Render** (Quarto) ya da **Knit** (R Markdown) düğmesiyle derlersin. PDF için ayrıca bir LaTeX dağıtımı gerekir (\`quarto install tinytex\`).

:::ipucu
Tablolar için \`knitr::kable()\` bir veri çerçevesini düzgün bir tabloya çevirir; regresyon tabloları için **modelsummary** ya da **stargazer** paketleri yayına hazır tablolar üretir.
:::
` },
      { baslik: "Araştırma raporunun yapısı", md: R`
İktisatta ampirik bir makale ya da dönem ödevi genellikle şu bölümlerden oluşur:

| Bölüm | İçerik |
|---|---|
| **Başlık** | kısa, bilgilendirici; mümkünse bulguyu ima eden |
| **Özet (abstract)** | 150–250 sözcükte soru, veri, yöntem, ana bulgu |
| **Giriş** | soru neden önemli? literatüre katkı ne? ana bulgu nedir? |
| **Literatür** | daha önce ne bulundu? senin çalışman nerede duruyor? |
| **Veri** | kaynak, örneklem, değişkenlerin tanımı ve ölçümü; betimsel istatistik tablosu |
| **Yöntem** | model, tahmin yöntemi, varsayımlar |
| **Bulgular** | tablolar ve grafiklerle sonuçlar, katsayıların yorumu |
| **Tartışma / sınırlılıklar** | sonuçlar ne anlama geliyor? neyi kanıtlamıyor? (nedensellik, örneklem, ölçüm) |
| **Sonuç** | ana mesaj ve politika ya da gelecek araştırma önerileri |
| **Kaynakça** | atıf yapılan bütün çalışmalar, veri ve yazılım |
| **Ekler** | ek tablolar, sağlamlık kontrolleri, kod |

### Tablo ve grafik kuralları
- Her tablo ve şekil **numaralı ve başlıklı** olmalı: "Tablo 2. Not ortalamasının belirleyicileri (EKK)".
- **Kaynak ve not** satırı: "Kaynak: Yazarın hesaplamaları. Not: Parantez içinde standart hatalar; * p < .05."
- Metinde her tabloya atıf yap ve **yorumla** ("Tablo 2'nin 3. sütununda görüldüğü gibi…"); tabloyu okura yalnız bırakma.
- Sayılarda makul ondalık: 0.4612 yerine 0.46.
` },
      { baslik: "Kaynak gösterme", md: R`
Başkasının fikrini, verisini ya da sözünü kullandığında **kaynak göster**. İktisatta yaygın stil **APA** (7. baskı) ya da yazar–tarih sistemidir.

**Metin içi:** (Modigliani, 1966) ya da "Modigliani (1966) yaşam döngüsü hipotezini…"

**Kaynakçada (APA 7):**

- **Kitap:** Colander, D. C. (2020). *Microeconomics* (11th ed.). McGraw-Hill Education.
- **Makale:** Card, D., & Krueger, A. B. (1994). Minimum wages and employment: A case study of the fast-food industry in New Jersey and Pennsylvania. *American Economic Review, 84*(4), 772–793.
- **Veri:** Türkiye İstatistik Kurumu. (2025). *Gelir ve yaşam koşulları araştırması* [Veri seti]. https://data.tuik.gov.tr
- **Yazılım:** R Core Team. (2026). *R: A language and environment for statistical computing*. R Foundation for Statistical Computing.

R ve paketleri için doğru atıfı R kendisi söyler:

${K}r
citation()
${K}

:::ipucu
Kaynakları elle biçimlendirmek yerine **Zotero** gibi ücretsiz bir kaynakça yöneticisi kullan. Quarto/R Markdown, bir .bib dosyasından atıfları otomatik biçimlendirebilir (\`[@colander2020]\`).
:::
` },
      { baslik: "Araştırma etiği ve akademik dürüstlük", md: R`
**İntihal (plagiarism):** başkasının sözlerini, fikirlerini, verisini ya da kodunu kaynak göstermeden kendininmiş gibi sunmak. Kendi önceki ödevini yeniden teslim etmek de (kendi kendini intihal) çoğu üniversitede ihlaldir. Üniversiteler intihal tespit yazılımı kullanır.

**Veri uydurma ve çarpıtma:** var olmayan veri üretmek (fabrication) ya da sonuçları istenen yöne çekmek için veriyi değiştirmek (falsification) en ağır bilimsel suçlardır. 15. dersteki **p-hacking** de bu çizgiye yakındır.

**Katılımcıların hakları:** anket ya da görüşme yapıyorsan katılımcıları bilgilendir, gönüllü katılım ve istediği an çekilme hakkı tanı, gerekiyorsa etik kurul onayı al.

**Kişisel verilerin korunması:** Türkiye'de **6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)**, Avrupa'da GDPR geçerlidir. Kimlik bilgilerini veriden ayır, gereksiz kişisel veri toplama, veriyi güvenli sakla, paylaşacaksan anonimleştir.

**Yapay zekâ araçları:** Kâhin gibi araçlar öğrenmeyi hızlandırır; ama ödevinde nasıl kullandığını hocanın kurallarına göre **açıkça belirt**. Yapay zekânın ürettiği kaynakları ve sayıları **mutlaka doğrula** — dil modelleri var olmayan makaleler "uydurabilir". Ürettiği kodu çalıştırıp anlamadan teslim etme: kodun ve yorumun sorumluluğu sende.

**Tekrarlanabilirlik bir etik ilkedir:** analiz betiğini, \`set.seed()\` değerlerini ve kullandığın R/paket sürümlerini (\`sessionInfo()\`) sakla ve paylaş. Gelişmiş adım: **Git** ve **GitHub** ile sürüm kontrolü.

${K}r
sessionInfo()
${K}
` },
    ],
    ozet: [
      "Tekrarlanabilir raporlama kod ve metni tek belgede birleştirir; veri değişince sonuçlar otomatik güncellenir.",
      "Quarto/R Markdown: YAML başlığı + Markdown metni + kod parçaları (echo, eval, fig-cap seçenekleri) + satır içi r kodu; Render/Knit ile HTML, PDF, Word.",
      "Rapor yapısı: başlık, özet, giriş, literatür, veri, yöntem, bulgular, tartışma/sınırlılıklar, sonuç, kaynakça, ekler.",
      "Tablo ve şekiller numaralı, başlıklı, kaynaklı; metinde atıf yapılıp yorumlanır.",
      "APA biçiminde kaynak göster; veri ve yazılımı da kaynakçaya ekle (citation()).",
      "Etik: intihal, veri uydurma, p-hacking yasak; onam ve KVKK; yapay zekâ kullanımını belirt ve çıktısını doğrula; sessionInfo ile tekrarlanabilirlik.",
    ],
    terimler: [
      ["reproducible research", "tekrarlanabilir araştırma", "Research whose results can be regenerated from the data and code by others."],
      ["R Markdown", "R Markdown", "A file format (.Rmd) combining Markdown text and R code chunks to produce reports."],
      ["Quarto", "Quarto", "A next-generation publishing system (.qmd) for reproducible documents."],
      ["YAML header", "YAML başlığı", "The metadata block at the top of a Quarto/R Markdown document."],
      ["code chunk", "kod parçası", "A block of code in a Quarto/R Markdown document that is executed when rendering."],
      ["inline code", "satır içi kod", "Code embedded in text that inserts a computed value."],
      ["render / knit", "derlemek", "To run all code in a document and produce the output file."],
      ["abstract", "özet", "A short summary of a study's question, data, method and findings."],
      ["citation", "atıf", "A reference to the source of an idea, quotation or data."],
      ["APA style", "APA stili", "A widely used citation and formatting style (American Psychological Association)."],
      ["plagiarism", "intihal", "Presenting another's work as one's own without attribution."],
      ["fabrication", "veri uydurma", "Making up data or results."],
      ["falsification", "çarpıtma", "Manipulating data or results to misrepresent findings."],
      ["anonymization", "anonimleştirme", "Removing information that could identify individuals."],
      ["version control", "sürüm kontrolü", "Tracking changes to files over time, e.g., with Git."],
    ],
    quiz: [
      { s: "The main advantage of reproducible reports (Quarto/R Markdown) is that:", c: ["They look prettier than Word", "Code, results and text stay consistent and can be regenerated automatically", "They don't require R", "They hide the analysis"], d: 1, a: "Veri değişince bütün sonuçlar yeniden üretilir; elle kopyalama hatası olmaz." },
      { s: "In a Quarto document, the block between the two lines of three dashes (---) at the top is the:", c: ["Code chunk", "YAML header", "Bibliography", "Abstract"], d: 1, a: "YAML başlığı: başlık, yazar, tarih, çıktı biçimi." },
      { s: "The chunk option `echo: false` means:", c: ["Do not run the code", "Run the code but hide it, showing only the results", "Hide the results", "Delete the chunk"], d: 1, a: "Kod gizlenir, sonuç gösterilir." },
      { s: "Inline code such as `r nrow(anket)` in the text:", c: ["Is printed literally", "Inserts the computed value into the sentence", "Creates a chart", "Is a comment"], d: 1, a: "Hesaplanan değer metne girer; veri değişince metin de güncellenir." },
      { s: "Which section of a research paper discusses what the results do NOT prove?", c: ["Abstract", "Data", "Discussion / limitations", "References"], d: 2, a: "Sınırlılıklar tartışma bölümünde ele alınır." },
      { s: "A table in a paper should:", c: ["Have no title", "Be numbered and titled, with source and notes, and be discussed in the text", "Contain as many decimals as possible", "Appear only in the appendix"], d: 1, a: "Numara, başlık, kaynak/not ve metinde yorum." },
      { s: "Which R function shows how to cite R itself?", c: ["sessionInfo()", "citation()", "library()", "help()"], d: 1, a: "citation() R'ın (ve citation(\"paket\") ile paketlerin) atıf bilgisini verir." },
      { s: "Using sentences from a website in your essay without quotation marks or citation is:", c: ["Paraphrasing", "Plagiarism", "Acceptable if the website is free", "Data fabrication"], d: 1, a: "Kaynak göstermeden başkasının sözlerini kullanmak intihaldir." },
      { s: "In Turkey, the law governing the protection of personal data in surveys is:", c: ["Law No. 4054", "KVKK (Law No. 6698)", "The Customs Union", "The Banking Law"], d: 1, a: "6698 sayılı Kişisel Verilerin Korunması Kanunu." },
      { s: "When using an AI assistant for an assignment, the most appropriate practice is to:", c: ["Submit its output without checking", "Disclose its use according to course rules and verify its sources and numbers", "Never mention it", "Use it only for references"], d: 1, a: "Şeffaflık ve doğrulama: yapay zekâ kaynak uydurabilir." },
    ],
  });
})();
