// Araştırma Yöntemleri — 10. ders: Paketler ve tidyverse: dplyr (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r10",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Paket kurmak (install.packages) ile yüklemek (library) arasındaki farkı bilmek",
      "Boru operatörüyle (|> ve %>%) okunur veri işleme zincirleri kurmak",
      "dplyr'ın temel fiillerini kullanmak: filter, select, mutate, arrange, summarise, group_by, count, rename",
      "Gruplara göre özet tablolar üretmek",
      "Geniş ve uzun veri biçimlerini tidyr ile dönüştürmenin mantığını kavramak",
    ],
    bolumler: [
      { baslik: "Paketler", md: R`
R'ın gücü **paketlerinden** gelir: başkalarının yazıp paylaştığı işlev ve veri koleksiyonları. CRAN'da 20.000'den fazla paket var.

İki adım vardır ve sık karıştırılır:

| Adım | Komut | Ne zaman |
|---|---|---|
| **Kurmak** | \`install.packages("dplyr")\` | Bilgisayara **bir kez** (güncellemek için tekrar) |
| **Yüklemek** | \`library(dplyr)\` | Her R oturumunun başında, kullanmadan önce |

Bir kitabı kütüphaneye bir kez alırsın (kurulum), ama okumak için her seferinde raftan indirirsin (yükleme).

Bir paketi yüklemeden tek bir işlevini kullanmak için **::** gösterimi: \`dplyr::filter(...)\`. Farklı paketlerde aynı adlı işlevler olduğunda (ör. \`stats::filter\` ile \`dplyr::filter\`) hangisini kastettiğini netleştirir.

:::ipucu
Bu uygulamada \`install.packages()\` yazmana gerek yok: kodda \`library(dplyr)\` görünce uygulama paketi kendisi kurar. İlk seferde ~10 saniye sürer, sonra hızlıdır. Gerçek RStudio'da ise önce \`install.packages()\` gerekir.
:::

### tidyverse
**tidyverse**, ortak bir felsefeyle (düzenli veri) tasarlanmış paketler ailesidir: **dplyr** (veri işleme), **ggplot2** (grafik), **tidyr** (veri dönüştürme), **readr** (dosya okuma), **stringr** (metin), **lubridate** (tarih). \`library(tidyverse)\` hepsini birden yükler. Bu derste dplyr'a odaklanıyoruz.
` },
      { baslik: "Boru operatörü: |>", md: R`
Veri işleme genellikle adım adım ilerler: filtrele → yeni sütun ekle → grupla → özetle. Bunu iç içe işlevlerle yazmak okunmaz:

${K}r salt
round(mean(subset(anket, sinif == 1)$not_ortalamasi), 2)
${K}

**Boru operatörü** \`|>\` (R 4.1'den beri yerleşik; RStudio'da Ctrl + Shift + M) bir işlemin sonucunu bir sonrakinin **ilk argümanı** olarak verir. Kodu soldan sağa, yukarıdan aşağıya okursun: "anketi al, **sonra** 1. sınıfları seç, **sonra** ortalamayı hesapla."

${K}r
anket <- read.csv("ogrenci_anket.csv")
anket$not_ortalamasi |> mean() |> round(2)
${K}

Eski kodlarda **magrittr** paketinin \`%>%\` borusunu da görürsün; günlük kullanımda ikisi aynı işi yapar.
` },
      { baslik: "dplyr'ın fiilleri", md: R`
dplyr her işi bir **fiille** yapar; hepsi ilk argüman olarak veri çerçevesi alır ve yeni bir veri çerçevesi döndürür:

| Fiil | İş |
|---|---|
| \`filter()\` | koşula göre **satır** seç |
| \`select()\` | **sütun** seç |
| \`mutate()\` | yeni sütun ekle / değiştir |
| \`arrange()\` | sırala (\`desc()\` ile büyükten küçüğe) |
| \`summarise()\` | özetle (tek satıra indir) |
| \`group_by()\` | gruplara ayır (sonraki işlemler grup grup yapılır) |
| \`count()\` | grup başına gözlem say |
| \`rename()\` | sütun adını değiştir |

dplyr içinde sütun adlarını **tırnaksız ve $ olmadan** yazarsın: \`filter(anket, sinif == 1)\`.

${K}r
library(dplyr)

anket |>
  filter(calisiyor_mu == "Evet", calisma_saati > 10) |>
  select(id, sinif, calisma_saati, not_ortalamasi) |>
  arrange(desc(not_ortalamasi)) |>
  head(5)
${K}

### mutate: yeni değişkenler
${K}r
anket <- anket |>
  mutate(
    gunluk_calisma = calisma_saati / 7,
    harclik_bin = harclik / 1000,
    basari = if_else(not_ortalamasi >= 3, "yüksek", "normal")
  )
anket |> select(calisma_saati, gunluk_calisma, basari) |> head()
${K}

\`if_else()\` dplyr'ın daha katı \`ifelse()\` sürümüdür (iki dalın tipi aynı olmalı).
` },
      { baslik: "Gruplara göre özet: group_by + summarise", md: R`
Veri analizinin en sık işlemi: "her grup için şu istatistiği hesapla."

${K}r
anket |>
  group_by(calisiyor_mu) |>
  summarise(
    kisi = n(),
    ort_not = mean(not_ortalamasi),
    ort_calisma = mean(calisma_saati),
    ort_uyku = mean(uyku_saati, na.rm = TRUE)
  )
${K}

Yarı zamanlı çalışan öğrencilerin ortalama notu ve haftalık çalışma süresi daha düşük görünüyor. (Bu bir **korelasyon**; nedensellik iddiası için 1. dersteki uyarıları hatırla — ve bu veri sentetik!)

Birden çok gruba göre:

${K}r
anket |>
  group_by(sinif, cinsiyet) |>
  summarise(n = n(), ort_not = round(mean(not_ortalamasi), 2), .groups = "drop")
${K}

Saymak için kısayol:

${K}r
anket |> count(sehir, sort = TRUE)
anket |> count(sinif, calisiyor_mu)
${K}

\`n()\` grup büyüklüğünü verir. \`summarise\` içinde \`na.rm = TRUE\`'yu unutma: grupta tek bir NA bile sonucu NA yapar.
` },
      { baslik: "Geniş ve uzun veri: tidyr'a bakış", md: R`
Resmî istatistiklerde veri sık sık **geniş (wide)** biçimde gelir: her yıl ayrı bir sütun.

${K}r
library(tidyr)
genis <- data.frame(
  il = c("Ankara", "İzmir", "Bursa"),
  y2023 = c(9.8, 10.9, 8.1),
  y2024 = c(9.4, 10.1, 7.9),
  y2025 = c(9.0, 9.7, 7.6)
)
genis
${K}

Analiz ve grafik için **uzun (long)** biçim — her satır bir il-yıl gözlemi — daha uygundur (düzenli veri!):

${K}r
uzun <- genis |>
  pivot_longer(cols = starts_with("y"), names_to = "yil", values_to = "issizlik") |>
  mutate(yil = as.integer(sub("y", "", yil)))
uzun
uzun |> group_by(yil) |> summarise(ortalama = mean(issizlik))
${K}

Tersi için \`pivot_wider()\`. (Bu örnekteki işsizlik rakamları temsilidir.)
` },
    ],
    ozet: [
      "Paket bir kez kurulur (install.packages), her oturumda yüklenir (library). paket::işlev yüklemeden kullanır.",
      "Boru |> (ya da %>%) sonucu bir sonraki işlevin ilk argümanı yapar; kod soldan sağa okunur.",
      "dplyr fiilleri: filter (satır), select (sütun), mutate (yeni sütun), arrange (sırala), summarise (özetle), group_by (grupla), count (say), rename.",
      "group_by + summarise ile grup özetleri; n() grup büyüklüğü; na.rm = TRUE'yu unutma.",
      "Geniş veriyi uzun biçime pivot_longer, tersine pivot_wider dönüştürür.",
    ],
    terimler: [
      ["package", "paket", "A collection of R functions, data and documentation."],
      ["install.packages()", "install.packages()", "Downloads and installs a package (once)."],
      ["library()", "library()", "Loads an installed package into the current session."],
      ["namespace operator (::)", "ad alanı operatörü (::)", "Calls a function from a package without loading it: pkg::fun()."],
      ["tidyverse", "tidyverse", "A collection of R packages designed for data science around tidy data."],
      ["pipe operator", "boru operatörü", "|> or %>%: passes the result on its left as the first argument to the function on its right."],
      ["filter()", "filter()", "Keeps rows that satisfy a condition."],
      ["select()", "select()", "Keeps or drops columns."],
      ["mutate()", "mutate()", "Creates or modifies columns."],
      ["arrange()", "arrange()", "Sorts rows."],
      ["summarise()", "summarise()", "Reduces data to summary statistics."],
      ["group_by()", "group_by()", "Groups data so that subsequent operations are performed by group."],
      ["wide format", "geniş biçim", "Data with separate columns for different time periods or categories."],
      ["long format", "uzun biçim", "Data with one row per observation per period or category."],
      ["pivot_longer()", "pivot_longer()", "Reshapes data from wide to long format."],
    ],
    quiz: [
      { s: "How often do you need to run `install.packages(\"dplyr\")` and `library(dplyr)` respectively?", c: ["Both every session", "install once; library every session", "library once; install every session", "Neither is needed"], d: 1, a: "Kurulum bir kez, yükleme her oturumda." },
      { s: "`x |> f() |> g()` is equivalent to:", c: ["f(g(x))", "g(f(x))", "f(x) + g(x)", "x(f, g)"], d: 1, a: "Önce f(x), sonucu g'ye verilir: g(f(x))." },
      { s: "Which dplyr verb keeps only the rows that meet a condition?", c: ["select()", "filter()", "mutate()", "arrange()"], d: 1, a: "filter satırları, select sütunları seçer." },
      { s: "Which dplyr verb creates a new column?", c: ["mutate()", "summarise()", "rename()", "count()"], d: 0, a: "mutate yeni sütun ekler ya da değiştirir." },
      { s: "To compute the mean GPA separately for each year of study, you would use:", c: ["filter() then select()", "group_by(sinif) then summarise(mean(not))", "arrange(sinif)", "mutate(mean(not))"], d: 1, a: "Gruplara ayır, sonra özetle." },
      { s: "Inside summarise(), `n()` returns:", c: ["The number of columns", "The number of rows in each group", "The mean", "The name of the group"], d: 1, a: "n() grup büyüklüğüdür." },
      { s: "`arrange(df, desc(not))` sorts df by not:", c: ["Ascending", "Descending", "Alphabetically", "Randomly"], d: 1, a: "desc() büyükten küçüğe sıralar." },
      { s: "Within dplyr functions, column names are written:", c: ["With $ and quotes", "Without quotes and without $", "Only as numbers", "With square brackets"], d: 1, a: "dplyr 'tidy evaluation' kullanır: filter(df, sinif == 1)." },
      { s: "A table with columns il, y2023, y2024, y2025 is in which format?", c: ["Long", "Wide", "Tidy", "Panel long"], d: 1, a: "Her yıl ayrı sütun: geniş biçim. pivot_longer ile uzuna çevrilir." },
      { s: "Why use `dplyr::filter()` instead of `filter()`?", c: ["It is faster", "To make clear which package's filter function is used, since stats also has filter()", "It is required by CRAN", "It loads the package permanently"], d: 1, a: ":: hangi paketin işlevinin kastedildiğini netleştirir." },
    ],
    alistirmalar: [
      { soru: R`dplyr ile ankette **2. sınıf** öğrencileri seç ve yalnız **id, calisma_saati, not_ortalamasi** sütunlarını tutan **ikinci** nesnesini oluştur.`, baslangic: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nikinci <- anket |>\n  ", kontrol: "exists('ikinci') && all(names(ikinci) == c('id','calisma_saati','not_ortalamasi')) && nrow(ikinci) == sum(read.csv('ogrenci_anket.csv')$sinif == 2)", ipucu: R`\`filter(sinif == 2) |> select(id, calisma_saati, not_ortalamasi)\``, cozum: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nikinci <- anket |>\n  filter(sinif == 2) |>\n  select(id, calisma_saati, not_ortalamasi)\nhead(ikinci)" },
      { soru: R`Her **şehir** için öğrenci sayısını (**n**) ve ortalama not ortalamasını (**ort**) hesaplayan **sehir_ozet** tablosunu oluştur.`, baslangic: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nsehir_ozet <- anket |>\n  ", kontrol: "exists('sehir_ozet') && all(c('sehir','n','ort') %in% names(sehir_ozet)) && nrow(sehir_ozet) == 5 && sum(sehir_ozet$n) == 120", ipucu: R`\`group_by(sehir) |> summarise(n = n(), ort = mean(not_ortalamasi))\``, cozum: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nsehir_ozet <- anket |>\n  group_by(sehir) |>\n  summarise(n = n(), ort = mean(not_ortalamasi))\nsehir_ozet" },
      { soru: R`Ankete **haftalık uyku süresini** gösteren **haftalik_uyku** sütununu ekle (uyku_saati × 7) ve sonucu **anket2** nesnesine ata.`, baslangic: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nanket2 <- anket |>\n  ", kontrol: "exists('anket2') && 'haftalik_uyku' %in% names(anket2) && isTRUE(all.equal(anket2$haftalik_uyku, anket2$uyku_saati * 7))", ipucu: R`\`mutate(haftalik_uyku = uyku_saati * 7)\``, cozum: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nanket2 <- anket |>\n  mutate(haftalik_uyku = uyku_saati * 7)\nhead(anket2$haftalik_uyku)" },
      { soru: R`**Çalışma saati en yüksek 3 öğrencinin** id'lerini büyükten küçüğe sıralı bir vektör olarak **en3** nesnesine ata.`, baslangic: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nen3 <- anket |>\n  ", kontrol: "exists('en3') && identical(as.integer(en3), as.integer(head(read.csv('ogrenci_anket.csv')[order(-read.csv('ogrenci_anket.csv')$calisma_saati), 'id'], 3)))", ipucu: R`\`arrange(desc(calisma_saati)) |> head(3) |> pull(id)\` — \`pull()\` bir sütunu vektör olarak çıkarır.`, cozum: "library(dplyr)\nanket <- read.csv(\"ogrenci_anket.csv\")\nen3 <- anket |>\n  arrange(desc(calisma_saati)) |>\n  head(3) |>\n  pull(id)\nen3" },
    ],
  });
})();
