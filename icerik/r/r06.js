// Araştırma Yöntemleri — 6. ders: Veri tipleri ve eksik değerler (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r06",
    hedefler: [
      "R'ın temel veri tiplerini (numeric, integer, character, logical) tanımak ve sınamak",
      "Tip zorlamasını (coercion) ve açık tip dönüşümünü anlamak",
      "Kategorik değişkenleri faktör olarak saklamak; sıralı faktör kullanmak",
      "Eksik değerleri (NA) bulmak, saymak ve hesaplarda yönetmek; NA, NaN, NULL ve Inf'i ayırmak",
      "Tarih verisiyle temel işlemleri yapmak",
    ],
    bolumler: [
      { baslik: "Temel veri tipleri", md: R`
Her R nesnesinin bir **tipi (type)** vardır. Dört temel tip:

| Tip | Örnek | Ne için |
|---|---|---|
| **numeric (double)** | 3.14, 25000, -2 | sayısal ölçümler |
| **integer** | 5L, 1:10 | tam sayılar (L eki) |
| **character** | "Ankara", "Evet" | metin — tırnak içinde |
| **logical** | TRUE, FALSE | doğru/yanlış |

${K}r
gelir <- 25000
sehir <- "İzmir"
burslu <- TRUE
yas <- 19L

class(gelir); class(sehir); class(burslu); class(yas)
is.numeric(gelir)
is.character(gelir)
${K}

\`class()\` bir nesnenin ne olduğunu söyler; \`is.numeric()\`, \`is.character()\` gibi işlevler TRUE/FALSE ile sınar. Veri setini okuduğunda ilk işlerden biri sütunların tipini kontrol etmektir: sayı olması gereken bir sütun metin olarak gelmişse hesap yapamazsın.

:::dikkat
TRUE ve FALSE büyük harfle ve tırnaksız yazılır. "TRUE" (tırnaklı) bir metindir, mantıksal değer değil. T ve F kısaltmaları da çalışır ama üzerine yazılabildikleri için kullanmamak daha güvenlidir.
:::
` },
      { baslik: "Tip zorlaması ve dönüşüm", md: R`
Bir vektördeki bütün elemanlar **aynı tipte** olmak zorundadır. Farklı tipleri karıştırırsan R hepsini "en esnek" tipe **zorlar (coercion)**: logical → integer → numeric → character.

${K}r
c(1, 2, "üç")        # hepsi metin oldu!
c(1, TRUE, FALSE)    # TRUE = 1, FALSE = 0
class(c(1, 2, "üç"))
${K}

Tipi kendin değiştirmek için **as.** işlevleri:

${K}r
as.numeric("3.5")
as.numeric("3,5")      # virgül ondalık değil → NA (uyarıyla)
as.character(2026)
as.integer(7.9)        # yuvarlamaz, keser
as.logical(c("TRUE", "yes", "0"))
as.numeric(c(TRUE, FALSE, TRUE))
${K}

:::ipucu
Türkiye'de Excel dosyaları ondalık ayırıcı olarak **virgül** kullanır. Böyle bir dosyayı yanlış okursan sayılar metin olarak gelir ve \`as.numeric()\` NA üretir. Çözümü 9. derste göreceğiz (\`read.csv2\` ya da \`dec = ","\`).
:::
` },
      { baslik: "Faktörler: kategorik değişkenler", md: R`
Kategorik değişkenler (şehir, cinsiyet, eğitim düzeyi) R'da **faktör (factor)** olarak saklanır. Faktör, değerlerin yanında olası kategorilerin listesini — **düzeyleri (levels)** — tutar.

${K}r
sehir <- c("Ankara", "İzmir", "Ankara", "İstanbul", "İzmir", "Ankara")
sehir_f <- factor(sehir)
sehir_f
levels(sehir_f)
table(sehir_f)         # frekans tablosu
nlevels(sehir_f)
${K}

### Sıralı faktörler
2. dersteki **sıralama (ordinal) ölçeği** için sıralı faktör kullanılır; böylece R sırayı bilir:

${K}r
memnuniyet <- c("orta", "yüksek", "düşük", "orta", "yüksek")
m <- factor(memnuniyet, levels = c("düşük", "orta", "yüksek"), ordered = TRUE)
m
m > "düşük"            # sıralı karşılaştırma mümkün
table(m)
${K}

Düzeylerin sırası önemlidir: grafiklerde ve tablolarda bu sırayla görünürler, regresyonda ilk düzey **temel (referans) kategori** olur (18. ders).

:::dikkat
Faktörü doğrudan \`as.numeric()\` ile sayıya çevirmek sürprizlidir: kategorinin kendisini değil, **düzey numarasını** verir. Sayı gibi görünen bir faktörü ("1990", "2000") sayıya çevirmek için önce metne çevir: \`as.numeric(as.character(f))\`.
:::
` },
      { baslik: "Eksik değerler: NA", md: R`
Gerçek verinin neredeyse her zaman eksikleri vardır: cevaplanmamış anket sorusu, kayıtta olmayan bir ay. R eksik değeri **NA** (not available) ile gösterir.

${K}r
harclik <- c(8000, 9500, NA, 7000, NA, 12000)
is.na(harclik)
sum(is.na(harclik))        # kaç eksik?
mean(harclik)              # NA bulaşıcıdır!
mean(harclik, na.rm = TRUE)   # eksikleri çıkararak
harclik[!is.na(harclik)]   # yalnız dolu olanlar
${K}

NA **bulaşıcıdır**: içinde NA bulunan bir hesabın sonucu da NA olur. Çünkü R "eksik değeri bilmiyorum, o yüzden ortalamayı da bilemem" der. Çoğu özet işlevinin **na.rm = TRUE** argümanı eksikleri hesaptan çıkarır.

:::dikkat
Eksik değerleri sessizce atmak sonuçları yanlı yapabilir: anketlerde geliri yüksek olanlar gelir sorusunu daha sık boş bırakıyorsa, kalanların ortalaması gerçek ortalamanın altında kalır. Raporda kaç gözlemin eksik olduğunu ve onlarla ne yaptığını **mutlaka** yaz.
:::

### NA, NaN, NULL, Inf
${K}r
0 / 0        # NaN: tanımsız sayı (not a number)
1 / 0        # Inf: sonsuz
log(0)       # -Inf
length(NULL) # NULL: hiç yok (boş nesne)
is.na(NaN)   # NaN de eksik sayılır
${K}

| Değer | Anlamı |
|---|---|
| **NA** | var olması gereken ama bilinmeyen değer |
| **NaN** | matematiksel olarak tanımsız sonuç |
| **Inf / -Inf** | sonsuz |
| **NULL** | nesnenin hiç olmaması |
` },
      { baslik: "Tarihler", md: R`
Zaman serileriyle çalışırken tarihler önemlidir. R tarihleri **Date** tipinde saklar:

${K}r
d <- as.Date("2026-09-28")    # ISO biçimi: yıl-ay-gün
class(d)
d + 30                         # 30 gün sonrası
as.Date("2027-01-15") - d     # iki tarih arası gün
format(d, "%d.%m.%Y")          # Türkçe biçim
weekdays(d)
seq(d, by = "month", length.out = 4)
${K}

Başka biçimdeki metinleri okumak için biçimi belirt:

${K}r
as.Date("28.09.2026", format = "%d.%m.%Y")
${K}

Biçim kodları: **%Y** dört haneli yıl, **%m** ay, **%d** gün, **%B** ay adı. Tarihleri metin olarak bırakırsan sıralama ve fark hesabı yanlış çıkar ("10.01.2026", "9.02.2026"dan alfabetik olarak önce gelir).
` },
    ],
    ozet: [
      "Temel tipler: numeric, integer, character, logical. class() ve is.*() ile sınanır.",
      "Bir vektörde tek tip olur; karışınca R esnek tipe zorlar (logical → integer → numeric → character). as.*() ile dönüştürülür; dönüşmeyen değer NA olur.",
      "Kategorik değişkenler faktördür; levels() düzeyleri, table() frekansları verir. Sıralama ölçeği için ordered = TRUE.",
      "NA eksik değerdir ve bulaşıcıdır; is.na() bulur, na.rm = TRUE hesaptan çıkarır. Eksikleri raporla.",
      "NaN tanımsız, Inf sonsuz, NULL boş. Tarihler as.Date() ile Date tipine çevrilir.",
    ],
    terimler: [
      ["data type", "veri tipi", "The kind of value an object holds, such as numeric, character or logical."],
      ["numeric (double)", "sayısal (ondalıklı)", "R's default type for real numbers."],
      ["integer", "tam sayı", "Whole numbers; written with an L suffix (5L)."],
      ["character", "metin (karakter)", "Text values, written in quotes."],
      ["logical", "mantıksal", "TRUE or FALSE values."],
      ["coercion", "tip zorlaması", "Automatic conversion of values to a common type."],
      ["factor", "faktör", "R's data structure for categorical variables, storing values and their levels."],
      ["levels", "düzeyler", "The set of possible categories of a factor."],
      ["ordered factor", "sıralı faktör", "A factor whose levels have a meaningful order."],
      ["missing value (NA)", "eksik değer", "A value that should exist but is unknown; NA in R."],
      ["NaN", "NaN (sayı değil)", "The result of an undefined mathematical operation, such as 0/0."],
      ["NULL", "NULL (boş)", "The absence of an object."],
      ["na.rm", "na.rm", "An argument that removes missing values before computing a summary."],
      ["Date class", "tarih tipi", "R's class for calendar dates."],
    ],
    quiz: [
      { s: "What is `class(c(1, 2, \"üç\"))`?", c: ["numeric", "character", "integer", "logical"], d: 1, a: "Karışık tipler en esnek tipe, metne zorlanır." },
      { s: "What does `as.numeric(\"3,5\")` return in R?", c: ["3.5", "35", "NA (with a warning)", "3"], d: 2, a: "R ondalık ayırıcı olarak nokta bekler; '3,5' sayıya çevrilemez." },
      { s: "What does `mean(c(10, NA, 20))` return?", c: ["15", "NA", "10", "An error"], d: 1, a: "NA bulaşıcıdır; na.rm = TRUE gerekir." },
      { s: "Which code computes the mean while ignoring missing values?", c: ["mean(x, na = FALSE)", "mean(x, na.rm = TRUE)", "mean(na.omit = x)", "mean(x, ignore = NA)"], d: 1, a: "na.rm = TRUE eksikleri hesaptan çıkarır." },
      { s: "Which code counts the number of missing values in x?", c: ["sum(is.na(x))", "length(x)", "count(NA)", "is.na(sum(x))"], d: 0, a: "is.na() mantıksal vektör verir; toplamı TRUE sayısıdır." },
      { s: "An ordinal variable such as satisfaction (low, medium, high) is best stored as:", c: ["A numeric vector", "An ordered factor", "A logical vector", "A date"], d: 1, a: "Sıralı faktör, kategorilerin sırasını korur." },
      { s: "What does `0/0` return in R?", c: ["0", "Inf", "NaN", "NA_character_"], d: 2, a: "Tanımsız işlem: NaN." },
      { s: "What does `c(1, TRUE, FALSE)` produce?", c: ["1 TRUE FALSE", "1 1 0", "An error", "\"1\" \"TRUE\" \"FALSE\""], d: 1, a: "Mantıksal değerler sayıya zorlanır: TRUE = 1, FALSE = 0." },
      { s: "`as.Date(\"2027-01-15\") - as.Date(\"2026-09-28\")` returns:", c: ["A difference in days", "An error", "A character string", "NA"], d: 0, a: "Tarihler arası fark gün olarak döner (109 gün)." },
      { s: "Converting a factor directly with as.numeric() returns:", c: ["The original numbers", "The level codes (1, 2, 3…)", "NA always", "Characters"], d: 1, a: "Düzey numaralarını verir; önce as.character() kullan." },
    ],
    alistirmalar: [
      { soru: R`Anketteki gelir sorusuna verilen cevaplar: 12000, NA, 8500, 15000, NA, 9000. Bunları **gelir** vektörüne ata; **eksik_sayisi** nesnesine eksik sayısını, **ort** nesnesine eksikleri çıkararak ortalamayı hesapla.`, baslangic: "gelir <- c(12000, NA, 8500, 15000, NA, 9000)\neksik_sayisi <- \nort <- ", kontrol: "exists('eksik_sayisi') && eksik_sayisi == 2 && exists('ort') && abs(ort - 11125) < 1e-9", ipucu: R`\`sum(is.na(gelir))\` ve \`mean(gelir, na.rm = TRUE)\``, cozum: "gelir <- c(12000, NA, 8500, 15000, NA, 9000)\neksik_sayisi <- sum(is.na(gelir))\nort <- mean(gelir, na.rm = TRUE)\neksik_sayisi; ort", tebrik: "2 eksik; dolu 4 cevabın ortalaması 11125." },
      { soru: R`\`metin <- c("12.5", "7", "abc", "3.25")\` vektörünü sayıya çevir ve **sayilar** nesnesine ata. Sonra bunların (NA hariç) toplamını **toplam** nesnesine hesapla.`, baslangic: "metin <- c(\"12.5\", \"7\", \"abc\", \"3.25\")\nsayilar <- \ntoplam <- ", kontrol: "exists('sayilar') && is.numeric(sayilar) && sum(is.na(sayilar)) == 1 && exists('toplam') && abs(toplam - 22.75) < 1e-9", ipucu: R`\`as.numeric(metin)\` "abc" için uyarıyla NA üretir; sonra \`sum(sayilar, na.rm = TRUE)\`.`, cozum: "metin <- c(\"12.5\", \"7\", \"abc\", \"3.25\")\nsayilar <- as.numeric(metin)\ntoplam <- sum(sayilar, na.rm = TRUE)\ntoplam" },
      { soru: R`Eğitim düzeyleri: "lise", "lisans", "ilkokul", "lisans", "yüksek lisans", "lise". Bunları **ilkokul < lise < lisans < yüksek lisans** sırasıyla **sıralı faktör** olarak **egitim** nesnesine ata.`, baslangic: "x <- c(\"lise\", \"lisans\", \"ilkokul\", \"lisans\", \"yüksek lisans\", \"lise\")\negitim <- ", kontrol: "exists('egitim') && is.ordered(egitim) && identical(levels(egitim), c('ilkokul','lise','lisans','yüksek lisans'))", ipucu: R`\`factor(x, levels = c("ilkokul", "lise", "lisans", "yüksek lisans"), ordered = TRUE)\``, cozum: "x <- c(\"lise\", \"lisans\", \"ilkokul\", \"lisans\", \"yüksek lisans\", \"lise\")\negitim <- factor(x, levels = c(\"ilkokul\", \"lise\", \"lisans\", \"yüksek lisans\"), ordered = TRUE)\ntable(egitim)" },
      { soru: R`Dönem 28 Eylül 2026'da başladı, final haftası 4 Ocak 2027'de. Aradaki gün sayısını **gun** nesnesine **sayı olarak** ata.`, baslangic: "gun <- ", kontrol: "exists('gun') && as.numeric(gun) == 98", ipucu: R`\`as.numeric(as.Date("2027-01-04") - as.Date("2026-09-28"))\``, cozum: "gun <- as.numeric(as.Date(\"2027-01-04\") - as.Date(\"2026-09-28\"))\ngun", tebrik: "98 gün: tam 14 hafta." },
    ],
  });
})();
