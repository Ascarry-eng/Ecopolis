// Araştırma Yöntemleri — 7. ders: Veri çerçeveleri (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r07",
    hedefler: [
      "data.frame() ile veri çerçevesi oluşturmak",
      "Bir veri setini str, head, summary, dim, names ile incelemek",
      "Sütunlara $ ile, hücrelere ve alt kümelere [satır, sütun] ile erişmek",
      "Koşula göre satır seçmek, yeni sütun eklemek ve sıralamak",
      "R'daki hazır iktisat veri setlerini (LifeCycleSavings, longley) keşfetmek",
      "Liste veri yapısını tanımak",
    ],
    bolumler: [
      { baslik: "Veri çerçevesi nedir?", md: R`
**Veri çerçevesi (data frame)**, R'ın tablo biçimindeki veri yapısıdır: her sütun bir vektör (bir değişken), her satır bir gözlem. Sütunlar farklı tiplerde olabilir (biri metin, biri sayı) ama hepsi **aynı uzunluktadır**. Excel'deki bir çalışma sayfasını düşün — ama düzenli (tidy) ve programlanabilir.

${K}r
ogrenciler <- data.frame(
  ad = c("Ayşe", "Mehmet", "Zeynep", "Can", "Elif"),
  sinif = c(1, 2, 1, 3, 2),
  calisma_saati = c(14, 8, 20, 6, 11),
  not_ort = c(3.10, 2.45, 3.55, 2.10, 2.90),
  burslu = c(TRUE, FALSE, TRUE, FALSE, FALSE)
)
ogrenciler
${K}
` },
      { baslik: "Veriyi incelemek", md: R`
Bir veri setiyle ilk karşılaştığında şu işlevleri sırayla çalıştır:

${K}r
str(ogrenciler)       # yapı: kaç gözlem, kaç değişken, tipleri
dim(ogrenciler)       # satır ve sütun sayısı
nrow(ogrenciler); ncol(ogrenciler)
names(ogrenciler)     # sütun adları
head(ogrenciler, 3)   # ilk 3 satır (tail() son satırlar)
summary(ogrenciler)   # her sütunun özeti
${K}

\`str()\` en faydalı işlevdir: her değişkenin tipini (num, chr, logi, Factor) gösterir — sayı olması gereken bir sütun "chr" görünüyorsa sorun var demektir. \`summary()\` sayısal sütunlar için en küçük, çeyrekler, medyan, ortalama ve en büyük değeri; mantıksal ve faktör sütunlar için frekansları verir.

RStudio'da \`View(ogrenciler)\` veriyi Excel benzeri bir pencerede açar (bu uygulamada yok).
` },
      { baslik: "Sütunlara ve hücrelere erişmek", md: R`
### \`$\` ile sütun
${K}r
ogrenciler$not_ort              # bir sütun = bir vektör
mean(ogrenciler$not_ort)
ogrenciler$ad[2]                # ikinci öğrencinin adı
${K}

### [satır, sütun] ile
Virgülün **solu satır**, **sağı sütun**. Bir tarafı boş bırakmak "hepsi" demektir.

${K}r
ogrenciler[1, ]                  # 1. satır, bütün sütunlar
ogrenciler[, 3]                  # 3. sütun (vektör olarak)
ogrenciler[2, "not_ort"]         # 2. satır, not_ort sütunu
ogrenciler[1:3, c("ad", "not_ort")]
ogrenciler[["calisma_saati"]]    # [[ ]] da sütunu vektör olarak verir
${K}

### Koşula göre satır seçmek
5. dersteki mantıksal indeksleme burada satırlara uygulanır:

${K}r
ogrenciler[ogrenciler$not_ort >= 3, ]                      # notu 3 ve üstü
ogrenciler[ogrenciler$sinif == 1 & ogrenciler$burslu, ]    # 1. sınıf ve burslu
subset(ogrenciler, calisma_saati > 10, select = c(ad, calisma_saati))
${K}

:::dikkat
Satır seçerken virgülü unutma: \`ogrenciler[ogrenciler$not_ort >= 3]\` (virgülsüz) satır değil **sütun** seçmeye çalışır ve hata ya da tuhaf sonuç verir. Doğrusu: \`ogrenciler[ogrenciler$not_ort >= 3, ]\`.
:::
` },
      { baslik: "Sütun eklemek, silmek, sıralamak", md: R`
${K}r
# yeni sütun: atama ile
ogrenciler$verim <- ogrenciler$not_ort / ogrenciler$calisma_saati
ogrenciler$ust_sinif <- ogrenciler$sinif >= 2

# mantıksal koşula göre kategori
ogrenciler$basari <- ifelse(ogrenciler$not_ort >= 3, "yüksek", "normal")
ogrenciler

# sütun silmek
ogrenciler$verim <- NULL

# sıralamak: order() sıralayan indeksleri verir
ogrenciler[order(ogrenciler$not_ort, decreasing = TRUE), ]
${K}

\`ifelse(koşul, doğruysa, yanlışsa)\` vektörel çalışır: her satır için ayrı karar verir. Bunu 8. derste ayrıntısıyla göreceğiz. 10. dersteki **dplyr** paketi bu işlemleri (\`filter\`, \`mutate\`, \`arrange\`) daha okunur bir dille yapar.
` },
      { baslik: "Hazır iktisat veri setleri", md: R`
R'ın içinde, kurulum gerektirmeyen birçok veri seti gelir. İktisat öğrencisi için ikisi özellikle ilginç:

**LifeCycleSavings** — Modigliani'nin yaşam döngüsü hipotezini sınamak için derlenmiş, 50 ülkenin 1960–1970 ortalamaları:

${K}r
str(LifeCycleSavings)
summary(LifeCycleSavings$sr)                       # tasarruf oranı (%)
LifeCycleSavings[LifeCycleSavings$sr > 15, ]        # tasarrufu yüksek ülkeler
rownames(LifeCycleSavings)[which.max(LifeCycleSavings$dpi)]   # en zengin ülke
${K}

Değişkenler: **sr** toplam kişisel tasarrufun harcanabilir gelire oranı, **pop15** 15 yaş altı nüfus payı, **pop75** 75 yaş üstü nüfus payı, **dpi** kişi başı reel harcanabilir gelir (dolar), **ddpi** dpi'ın büyüme oranı. Yaşam döngüsü hipotezine göre çalışma çağındaki nüfus tasarruf eder, gençler ve yaşlılar tasarrufu azaltır — 17. derste bunu regresyonla sınayacağız.

**longley** — ABD'nin 1947–1962 makroekonomik verileri (zaman serisi):

${K}r
head(longley)
plot(longley$Year, longley$Unemployed, type = "l",
     main = "ABD'de işsiz sayısı (bin), 1947-62", xlab = "Yıl", ylab = "İşsiz")
${K}

Diğer klasikler: \`mtcars\` (otomobiller), \`iris\` (çiçekler), \`airquality\` (hava kalitesi — eksik değerli!), \`ToothGrowth\` (bir deney). \`data()\` hepsini listeler.
` },
      { baslik: "Listeler", md: R`
**Liste (list)**, farklı türde ve uzunlukta nesneleri bir arada tutan esnek bir yapıdır. Veri çerçevesi aslında özel bir listedir (eşit uzunlukta vektörlerden oluşan). Regresyon modelleri gibi karmaşık sonuçlar da listedir.

${K}r
proje <- list(
  baslik = "Çalışma saati ve not",
  orneklem = 120,
  degiskenler = c("calisma_saati", "not_ort"),
  veri = head(ogrenciler, 2)
)
proje$baslik
proje[["degiskenler"]]
str(proje)
${K}

\`$\` ve \`[[ ]]\` listenin bir elemanını kendisi olarak, \`[ ]\` ise eleman(lar)ı yine liste olarak döndürür.
` },
    ],
    ozet: [
      "Veri çerçevesi: her sütun bir vektör (değişken), her satır bir gözlem; sütunlar farklı tipte ama eşit uzunlukta.",
      "İnceleme: str, dim, nrow, ncol, names, head, tail, summary.",
      "Erişim: `veri$sutun`; `veri[satır, sütun]`; boş taraf 'hepsi'; koşula göre satır seçerken virgülü unutma.",
      "Yeni sütun atamayla eklenir, NULL atamayla silinir; ifelse() vektörel kategori üretir; order() sıralar.",
      "Hazır veri setleri: LifeCycleSavings (yaşam döngüsü, 50 ülke), longley (ABD makro), mtcars, airquality…",
      "Liste farklı türde nesneleri bir arada tutar; veri çerçevesi ve model sonuçları birer listedir.",
    ],
    terimler: [
      ["data frame", "veri çerçevesi", "R's tabular data structure: columns are variables (vectors of equal length), rows are observations."],
      ["str()", "str() (yapı)", "A function that displays the structure of an object, including variable types."],
      ["summary()", "summary() (özet)", "A function that produces summary statistics for each column."],
      ["$ operator", "$ operatörü", "Extracts a column (or list element) by name."],
      ["subset", "alt küme", "A selection of rows and/or columns of a data frame."],
      ["ifelse()", "ifelse()", "A vectorized conditional: ifelse(test, yes, no)."],
      ["order()", "order()", "Returns the indices that would sort a vector."],
      ["built-in data set", "hazır veri seti", "A data set that comes with R, e.g., LifeCycleSavings."],
      ["list", "liste", "A flexible structure that can hold objects of different types and lengths."],
      ["life-cycle hypothesis", "yaşam döngüsü hipotezi", "Modigliani's theory that people save during working years and dissave when young or old."],
    ],
    quiz: [
      { s: "In a data frame, all columns must:", c: ["Be numeric", "Have the same length", "Have the same type", "Be factors"], d: 1, a: "Sütunlar farklı tipte olabilir ama eşit uzunlukta olmak zorundadır." },
      { s: "Which function shows the type of each variable in a data frame?", c: ["head()", "str()", "names()", "dim()"], d: 1, a: "str() yapıyı ve tipleri (num, chr, logi…) gösterir." },
      { s: "`df[2, ]` returns:", c: ["The second column", "The second row, all columns", "The second element of the first column", "An error"], d: 1, a: "Virgülün solu satır; sağ taraf boş = bütün sütunlar." },
      { s: "Which code selects rows of `df` where `gelir > 10000`?", c: ["`df[df$gelir > 10000]`", "`df[df$gelir > 10000, ]`", "`df$gelir > 10000`", "`df[, df$gelir > 10000]`"], d: 1, a: "Satır koşulu virgülün soluna, sağ taraf boş." },
      { s: "`df$yeni <- df$a / df$b` will:", c: ["Delete column a", "Create a new column called yeni", "Return an error", "Sort the data"], d: 1, a: "Atama ile yeni sütun eklenir." },
      { s: "`df$eski <- NULL` will:", c: ["Set all values to NA", "Remove the column eski", "Create an empty column", "Do nothing"], d: 1, a: "NULL atamak sütunu siler." },
      { s: "`ifelse(c(3.2, 2.1) >= 3, \"yüksek\", \"normal\")` returns:", c: ["\"yüksek\"", "\"yüksek\" \"normal\"", "\"normal\" \"yüksek\"", "TRUE FALSE"], d: 1, a: "Her eleman için ayrı karar: 3.2 → yüksek, 2.1 → normal." },
      { s: "In the LifeCycleSavings data set, the variable sr measures:", c: ["Population under 15", "The savings ratio", "Per-capita income", "Growth of income"], d: 1, a: "sr: kişisel tasarrufun harcanabilir gelire oranı." },
      { s: "Which code sorts `df` by `not` from highest to lowest?", c: ["`sort(df)`", "`df[order(df$not, decreasing = TRUE), ]`", "`df[order(df$not)]`", "`rev(df)`"], d: 1, a: "order() sıralayan indeksleri verir; satırlara uygulanır." },
      { s: "A list differs from a vector in that a list:", c: ["Can only hold numbers", "Can hold objects of different types and lengths", "Cannot be named", "Is always a data frame"], d: 1, a: "Liste esnektir; vektörde tek tip olur." },
    ],
    alistirmalar: [
      { soru: R`Üç şehrin verileriyle bir veri çerçevesi oluşturup **sehirler** nesnesine ata. Sütunlar: **ad** ("Ankara", "İzmir", "Bursa"), **nufus** (5.8, 4.5, 3.2 — milyon), **gelir** (95, 88, 82 — bin TL).`, baslangic: "sehirler <- data.frame(\n  ad = ,\n  nufus = ,\n  gelir = \n)", kontrol: "exists('sehirler') && is.data.frame(sehirler) && nrow(sehirler) == 3 && all(c('ad','nufus','gelir') %in% names(sehirler)) && isTRUE(all.equal(sehirler$gelir, c(95, 88, 82)))", ipucu: R`Her sütun bir vektör: \`ad = c("Ankara", "İzmir", "Bursa")\` gibi.`, cozum: "sehirler <- data.frame(\n  ad = c(\"Ankara\", \"İzmir\", \"Bursa\"),\n  nufus = c(5.8, 4.5, 3.2),\n  gelir = c(95, 88, 82)\n)\nsehirler" },
      { soru: R`**LifeCycleSavings** veri setinde tasarruf oranı (sr) **10'dan büyük** olan ülkeleri seçip **yuksek** nesnesine ata. Kaç ülke olduğunu da **n_yuksek** nesnesine yaz.`, baslangic: "yuksek <- \nn_yuksek <- ", kontrol: "exists('yuksek') && is.data.frame(yuksek) && all(yuksek$sr > 10) && exists('n_yuksek') && n_yuksek == sum(LifeCycleSavings$sr > 10)", ipucu: R`\`LifeCycleSavings[LifeCycleSavings$sr > 10, ]\` ve \`nrow(yuksek)\``, cozum: "yuksek <- LifeCycleSavings[LifeCycleSavings$sr > 10, ]\nn_yuksek <- nrow(yuksek)\nn_yuksek" },
      { soru: R`LifeCycleSavings'e **genc_mi** adında bir sütun ekle: pop15 **35'ten büyükse** "genç nüfuslu", değilse "yaşlanan" yazsın. Değiştirilmiş veriyi **lcs** nesnesine ata.`, baslangic: "lcs <- LifeCycleSavings\nlcs$genc_mi <- ", kontrol: "exists('lcs') && 'genc_mi' %in% names(lcs) && all(lcs$genc_mi == ifelse(LifeCycleSavings$pop15 > 35, 'genç nüfuslu', 'yaşlanan'))", ipucu: R`\`ifelse(lcs$pop15 > 35, "genç nüfuslu", "yaşlanan")\``, cozum: "lcs <- LifeCycleSavings\nlcs$genc_mi <- ifelse(lcs$pop15 > 35, \"genç nüfuslu\", \"yaşlanan\")\ntable(lcs$genc_mi)" },
      { soru: R`LifeCycleSavings'te kişi başı harcanabilir geliri (dpi) **en yüksek 5 ülkeyi** büyükten küçüğe sıralayıp **ilk5** nesnesine ata (veri çerçevesi olarak, 5 satır).`, baslangic: "ilk5 <- ", kontrol: "exists('ilk5') && nrow(ilk5) == 5 && identical(rownames(ilk5), rownames(LifeCycleSavings)[order(LifeCycleSavings$dpi, decreasing = TRUE)][1:5])", ipucu: R`Önce sırala, sonra ilk 5 satırı al: \`head(LifeCycleSavings[order(LifeCycleSavings$dpi, decreasing = TRUE), ], 5)\``, cozum: "ilk5 <- head(LifeCycleSavings[order(LifeCycleSavings$dpi, decreasing = TRUE), ], 5)\nilk5" },
    ],
  });
})();
