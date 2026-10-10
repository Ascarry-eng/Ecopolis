// Araştırma Yöntemleri — 5. ders: Vektörler (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r05",
    hedefler: [
      "c(), seq(), rep() ve : ile vektör oluşturmak",
      "Vektörel işlemleri ve geri dönüşüm (recycling) kuralını anlamak",
      "Konum, negatif konum ve mantıksal koşulla indekslemek",
      "Mantıksal vektörlerle koşul sınamak ve saymak",
      "Özet işlevleri (sum, mean, max, sort, cumsum, diff) kullanmak",
    ],
    bolumler: [
      { baslik: "Vektör oluşturmak", md: R`
R'ın temel veri yapısı **vektördür**: aynı türden değerlerin sıralı bir dizisi. Tek bir sayı bile aslında uzunluğu 1 olan bir vektördür.

${K}r
notlar <- c(72, 85, 64, 90, 78)   # c() = combine (birleştir)
notlar
length(notlar)

1:10                               # 1'den 10'a tam sayılar
seq(0, 1, by = 0.25)               # adımla dizi
seq(10, 100, length.out = 4)       # eşit aralıklı 4 değer
rep(0, times = 5)                  # tekrar
rep(c("A", "B"), times = 3)
rep(c("A", "B"), each = 2)
${K}

Vektörlerin elemanlarına ad da verebilirsin:

${K}r
enflasyon <- c(Ocak = 3.2, Subat = 2.8, Mart = 2.5)
enflasyon
names(enflasyon)
${K}
` },
      { baslik: "Vektörel işlemler", md: R`
R'da aritmetik **eleman eleman** yapılır; döngü yazmaya gerek yoktur. Buna **vektörleştirme (vectorization)** denir ve R'ın en güçlü yanıdır.

${K}r
fiyat <- c(20, 35, 50)
miktar <- c(100, 60, 40)
gelir <- fiyat * miktar    # her ürün için ayrı ayrı
gelir
sum(gelir)                 # toplam gelir

fiyat * 1.10               # hepsine %10 zam
fiyat - mean(fiyat)        # ortalamadan sapmalar
${K}

### Geri dönüşüm (recycling)
Uzunlukları farklı iki vektörle işlem yapılırsa, kısa olan **başa dönüp tekrarlanır**:

${K}r
c(1, 2, 3, 4) + c(10, 20)      # 10, 20, 10, 20 eklenir
c(1, 2, 3) + c(10, 20)         # uyarı: uzunluklar katı değil
${K}

:::dikkat
Geri dönüşüm, tek sayıyla işlem yaparken (\`fiyat * 1.10\`) çok kullanışlıdır; ama farklı uzunluktaki iki vektörü yanlışlıkla toplamak sessizce yanlış sonuç üretebilir. R yalnızca uzunluklar birbirinin katı değilse uyarır.
:::
` },
      { baslik: "İndeksleme: elemanlara erişmek", md: R`
Köşeli parantez **[ ]** ile elemanları seçersin. R'da sayma **1'den başlar** (Python'daki gibi 0'dan değil).

${K}r
notlar <- c(72, 85, 64, 90, 78)
notlar[1]          # ilk eleman
notlar[c(2, 4)]    # 2. ve 4. elemanlar
notlar[2:4]        # 2'den 4'e
notlar[-1]         # birincisi HARİÇ hepsi
notlar[-c(1, 5)]   # 1. ve 5. hariç
notlar[length(notlar)]   # son eleman
${K}

Adlandırılmış vektörlerde ada göre:

${K}r
enflasyon <- c(Ocak = 3.2, Subat = 2.8, Mart = 2.5)
enflasyon["Subat"]
${K}

Atama ile değiştirme:

${K}r
notlar[3] <- 68     # üçüncü notu düzelt
notlar
${K}
` },
      { baslik: "Mantıksal vektörler ve koşullu seçim", md: R`
Karşılaştırma operatörleri (\`>\`, \`<\`, \`>=\`, \`<=\`, \`==\`, \`!=\`) her eleman için TRUE ya da FALSE üretir:

${K}r
notlar <- c(72, 85, 64, 90, 78)
notlar >= 75
notlar == 90
notlar != 64
${K}

Mantıksal vektörü indeks olarak kullanınca **koşulu sağlayan elemanlar** seçilir — veri analizinin temel işlemlerinden biri:

${K}r
notlar[notlar >= 75]          # 75 ve üstü notlar
sum(notlar >= 75)             # kaç kişi? (TRUE = 1, FALSE = 0)
mean(notlar >= 75)            # oranı: yüzde kaç?
which(notlar >= 75)           # hangi sıralarda?
${K}

Koşulları birleştirmek:

| Operatör | Anlamı |
|---|---|
| \`&\` | ve |
| \`\|\` | veya |
| \`!\` | değil |

${K}r
notlar[notlar >= 70 & notlar < 85]   # 70 ile 85 arası
any(notlar < 50)                     # en az biri doğru mu?
all(notlar > 60)                     # hepsi doğru mu?
${K}

:::ipucu
\`sum(koşul)\` sayıyı, \`mean(koşul)\` oranı verir. "Öğrencilerin yüzde kaçı 75'in üstünde?" sorusunun R cevabı: \`mean(notlar > 75) * 100\`.
:::

:::dikkat
Eşitlik sınaması **==** ile yapılır; tek **=** atamadır. \`notlar[notlar = 90]\` yazmak hata ya da beklenmedik sonuç verir.
:::
` },
      { baslik: "Özet işlevler", md: R`
${K}r
notlar <- c(72, 85, 64, 90, 78)
sum(notlar); mean(notlar); median(notlar)
min(notlar); max(notlar); range(notlar)
sort(notlar)                     # küçükten büyüğe
sort(notlar, decreasing = TRUE)
order(notlar)                    # sıralayan indeksler
rev(notlar)                      # ters çevir
${K}

### İktisattan bir örnek: birikimli enflasyon
Aylık enflasyon oranlarından yıllık birikimli enflasyonu hesaplayalım (oranlar örnektir):

${K}r
aylik <- c(3.0, 2.5, 2.4, 3.2, 1.8, 1.6, 2.9, 2.0, 2.3, 2.6, 2.2, 1.9)  # yüzde
carpan <- 1 + aylik / 100
yillik <- (prod(carpan) - 1) * 100       # prod = çarpım
round(yillik, 2)
sum(aylik)                               # basit toplam ile karşılaştır
round((cumprod(carpan) - 1) * 100, 2)    # ay ay birikimli
${K}

Aylık oranları **toplamak** yıllık enflasyonu olduğundan düşük gösterir; doğrusu **çarpmaktır** — Matematik dersindeki bileşik faiz mantığının aynısı.

Fark ve birikimli toplam:

${K}r
gsyh <- c(100, 104, 109, 111, 118)   # bir endeks
diff(gsyh)                            # yıllık artışlar
round(diff(gsyh) / head(gsyh, -1) * 100, 2)   # yüzde büyüme
cumsum(c(5, 3, 8))
${K}
` },
    ],
    ozet: [
      "Vektör, aynı türden değerlerin sıralı dizisidir: c(), :, seq(), rep(). names() ile adlandırılır.",
      "İşlemler eleman eleman yapılır (vektörleştirme); kısa vektör geri dönüştürülür.",
      "İndeksleme [ ] ile; sayma 1'den başlar; negatif indeks hariç tutar; ada göre de seçilir.",
      "Karşılaştırmalar mantıksal vektör üretir; x[koşul] seçer, sum(koşul) sayar, mean(koşul) oran verir; & | ! birleştirir; == eşitlik sınar.",
      "Özet işlevler: sum, mean, median, min, max, range, sort, order, rev, prod, cumprod, cumsum, diff.",
    ],
    terimler: [
      ["vector", "vektör", "An ordered sequence of values of the same type."],
      ["c()", "c() (birleştir)", "The function that combines values into a vector."],
      ["vectorization", "vektörleştirme", "Applying an operation to every element of a vector at once, without explicit loops."],
      ["recycling", "geri dönüşüm", "Repeating the shorter vector when operating on vectors of different lengths."],
      ["index", "indeks", "The position of an element in a vector; R starts counting at 1."],
      ["logical vector", "mantıksal vektör", "A vector of TRUE/FALSE values."],
      ["comparison operator", "karşılaştırma operatörü", "Operators such as >, <, ==, != that return logical values."],
      ["subsetting", "alt küme seçme", "Selecting elements of a vector or data frame using [ ]."],
      ["cumulative product", "birikimli çarpım", "cumprod(): the running product of a vector's elements."],
      ["first difference", "birinci fark", "diff(): the difference between consecutive elements."],
    ],
    quiz: [
      { s: "What does `c(2, 4, 6) * 2` return?", c: ["12", "4 8 12", "2 4 6 2", "An error"], d: 1, a: "Vektörel işlem: her eleman 2 ile çarpılır." },
      { s: "Given `x <- c(10, 20, 30, 40)`, what is `x[2]`?", c: ["10", "20", "30", "2"], d: 1, a: "R'da sayma 1'den başlar; ikinci eleman 20." },
      { s: "Given `x <- c(10, 20, 30, 40)`, what is `x[-1]`?", c: ["40", "10", "20 30 40", "10 20 30"], d: 2, a: "Negatif indeks o elemanı hariç tutar." },
      { s: "What does `seq(0, 1, by = 0.25)` produce?", c: ["0 1", "0 0.25 0.5 0.75 1", "0.25 0.5 0.75", "0 0.5 1"], d: 1, a: "0'dan 1'e 0.25 adımla." },
      { s: "Given `notlar <- c(72, 85, 64, 90, 78)`, what does `sum(notlar >= 75)` return?", c: ["3", "2", "253", "TRUE"], d: 0, a: "85, 90, 78 → üç TRUE; TRUE = 1 sayılır." },
      { s: "Which expression gives the proportion of elements of x greater than 50?", c: ["sum(x > 50)", "mean(x > 50)", "which(x > 50)", "x[x > 50]"], d: 1, a: "Mantıksal vektörün ortalaması TRUE oranıdır." },
      { s: "What does `c(1, 2, 3, 4) + c(10, 20)` return?", c: ["11 22 13 24", "11 22", "An error", "31 32 33 34"], d: 0, a: "Kısa vektör geri dönüştürülür: 10, 20, 10, 20." },
      { s: "Which operator tests equality in R?", c: ["=", "==", "<-", "==="], d: 1, a: "== eşitlik sınar; = ve <- atama yapar." },
      { s: "Monthly inflation rates should be combined into an annual rate by:", c: ["Adding them", "Multiplying (1 + r) terms and subtracting 1", "Averaging them", "Taking the maximum"], d: 1, a: "Bileşik etki: (Π(1 + rᵢ) − 1). Toplamak düşük gösterir." },
      { s: "What does `diff(c(100, 104, 109))` return?", c: ["4 5", "104 109", "9", "100 4 5"], d: 0, a: "Ardışık farklar: 104 − 100 = 4, 109 − 104 = 5." },
    ],
    alistirmalar: [
      { soru: R`Bir haftanın günlük çalışma saatleri: 2, 3.5, 1, 4, 2.5, 0, 5. Bunları **saatler** vektörüne ata ve haftalık toplamı **toplam** nesnesine hesapla.`, baslangic: "saatler <- \ntoplam <- ", kontrol: "exists('saatler') && length(saatler) == 7 && exists('toplam') && toplam == 18", ipucu: R`\`saatler <- c(2, 3.5, 1, 4, 2.5, 0, 5)\` ve \`toplam <- sum(saatler)\``, cozum: "saatler <- c(2, 3.5, 1, 4, 2.5, 0, 5)\ntoplam <- sum(saatler)\ntoplam", tebrik: "Haftada 18 saat." },
      { soru: R`\`fiyatlar <- c(45, 120, 80, 15, 200, 60)\` vektöründen **yalnız 50'den pahalı** olanları seçip **pahali** nesnesine ata.`, baslangic: "fiyatlar <- c(45, 120, 80, 15, 200, 60)\npahali <- ", kontrol: "exists('pahali') && identical(as.numeric(pahali), c(120, 80, 200, 60))", ipucu: R`Mantıksal indeksleme: \`fiyatlar[fiyatlar > 50]\``, cozum: "fiyatlar <- c(45, 120, 80, 15, 200, 60)\npahali <- fiyatlar[fiyatlar > 50]\npahali" },
      { soru: R`Aynı \`fiyatlar\` vektöründe ürünlerin **yüzde kaçı** 50 TL'den pahalı? Sonucu yüzde olarak (0–100) **yuzde** nesnesine ata.`, baslangic: "fiyatlar <- c(45, 120, 80, 15, 200, 60)\nyuzde <- ", kontrol: "exists('yuzde') && abs(yuzde - 400/6) < 1e-6", ipucu: R`\`mean(fiyatlar > 50) * 100\``, cozum: "fiyatlar <- c(45, 120, 80, 15, 200, 60)\nyuzde <- mean(fiyatlar > 50) * 100\nyuzde", tebrik: "6 üründen 4'ü: %66.7." },
      { soru: R`Bir hissenin 5 günlük kapanışları: 100, 103, 101, 106, 110. Günlük **yüzde getirileri** (bir önceki güne göre) hesaplayıp **getiri** vektörüne ata. (4 eleman olmalı.)`, baslangic: "kapanis <- c(100, 103, 101, 106, 110)\ngetiri <- ", kontrol: "exists('getiri') && length(getiri) == 4 && max(abs(getiri - diff(c(100,103,101,106,110))/c(100,103,101,106)*100)) < 1e-9", ipucu: R`Fark / önceki değer × 100: \`diff(kapanis) / head(kapanis, -1) * 100\``, cozum: "kapanis <- c(100, 103, 101, 106, 110)\ngetiri <- diff(kapanis) / head(kapanis, -1) * 100\nround(getiri, 2)", tebrik: "Getiri hesabı finansın temel işlemi." },
    ],
  });
})();
