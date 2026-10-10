// Araştırma Yöntemleri — 8. ders: Programlama: koşul, döngü, işlev (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r08",
    hedefler: [
      "if / else ile koşullu kod yazmak; vektörel ifelse() ile farkını bilmek",
      "for ve while döngüleri kurmak",
      "Kendi işlevini argümanlar, varsayılanlar ve dönüş değeriyle yazmak",
      "sapply/lapply ile bir işlevi bir vektörün her elemanına uygulamak",
      "Vektörel düşünmenin neden döngüden daha iyi olduğunu açıklamak",
    ],
    bolumler: [
      { baslik: "Koşullar: if ve else", md: R`
Bir kodu yalnız bir koşul sağlanırsa çalıştırmak için **if**:

${K}r
not <- 2.4
if (not >= 2) {
  print("Dersi geçti")
} else {
  print("Dersten kaldı")
}
${K}

Birden çok durum için \`else if\`:

${K}r
gno <- 3.6
if (gno >= 3.5) {
  derece <- "yüksek onur"
} else if (gno >= 3) {
  derece <- "onur"
} else {
  derece <- "derece yok"
}
derece
${K}

:::dikkat
\`if\` **tek bir** TRUE/FALSE değeri bekler. Bir vektörün her elemanı için karar vermek istiyorsan \`if\` değil, vektörel **ifelse()** kullan:

\`ifelse(notlar >= 2, "geçti", "kaldı")\`

\`if (notlar >= 2)\` yazmak (notlar birden çok elemanlıysa) R 4.2'den beri **hata** verir.
:::
` },
      { baslik: "Döngüler: for ve while", md: R`
**for**, bir vektörün her elemanı için aynı kodu tekrarlar:

${K}r
for (yil in 2024:2027) {
  print(paste("Yıl:", yil))
}
${K}

Bir döngüde sonuçları biriktirmek için önce boş bir vektör oluştur:

${K}r
# Her yıl %8 büyüyen bir ekonominin 10 yıllık GSYH endeksi
gsyh <- numeric(11)     # 11 elemanlı sıfırlar
gsyh[1] <- 100
for (t in 2:11) {
  gsyh[t] <- gsyh[t - 1] * 1.08
}
round(gsyh, 1)
${K}

**while**, bir koşul doğru kaldıkça tekrarlar — kaç tur süreceğini önceden bilmediğinde:

${K}r
# Birikimin ikiye katlanması kaç yıl sürer? (%12 faiz)
birikim <- 1000
yil <- 0
while (birikim < 2000) {
  birikim <- birikim * 1.12
  yil <- yil + 1
}
yil
${K}

Matematik dersindeki katlanma süresi formülüyle karşılaştır: $\ln 2 / \ln 1.12 \approx 6.1$ — döngü tam yıl saydığı için 7 der.

:::dikkat
while döngüsünde koşul hiç yanlış olmazsa döngü **sonsuza** kadar döner. RStudio'da Esc ile durdurursun; bu uygulamada sayfayı yenilemen gerekebilir. Koşulu değiştiren satırı unutma.
:::
` },
      { baslik: "Kendi işlevini yazmak", md: R`
Aynı hesabı tekrar tekrar yapıyorsan onu bir **işleve** dönüştür:

${K}r
gelecek_deger <- function(anapara, faiz, yil) {
  anapara * (1 + faiz)^yil
}
gelecek_deger(1000, 0.10, 5)
gelecek_deger(anapara = 5000, faiz = 0.40, yil = 3)
${K}

Yapı: \`ad <- function(argümanlar) { gövde }\`. İşlev **son satırdaki değeri** döndürür; ortada bir yerde döndürmek istersen \`return()\` kullanılır.

### Varsayılan argümanlar ve doğrulama
${K}r
esneklik <- function(q1, q2, p1, p2, yontem = "orta") {
  if (yontem == "orta") {
    dq <- (q2 - q1) / ((q1 + q2) / 2)
    dp <- (p2 - p1) / ((p1 + p2) / 2)
  } else {
    dq <- (q2 - q1) / q1
    dp <- (p2 - p1) / p1
  }
  abs(dq / dp)
}
esneklik(100000, 90000, 40, 50)                     # köprü örneği (mikro 6. bölüm)
esneklik(100000, 90000, 40, 50, yontem = "basit")
${K}

Mikroekonomi 6. bölümdeki köprü örneğinde orta nokta esnekliği 0.47 çıkmıştı — aynı sonuç. İşlev yazmak öğrendiğin formülleri "alet"e dönüştürür.

İyi işlev ilkeleri: **tek bir iş** yapsın, açıklayıcı bir adı olsun, argümanlar anlamlı adlandırılsın, beklenmedik girdilerde anlaşılır hata versin (\`stop("faiz negatif olamaz")\`).
` },
      { baslik: "Bir işlevi her elemana uygulamak: sapply", md: R`
"Bu işlemi her eleman için yap" demenin R'daki zarif yolu **apply ailesidir**:

${K}r
faizler <- c(0.05, 0.10, 0.20, 0.40)
sapply(faizler, function(r) gelecek_deger(1000, r, 10))
${K}

- \`sapply(x, f)\`: f'yi x'in her elemanına uygular, sonucu (mümkünse) **vektör** olarak döndürür.
- \`lapply(x, f)\`: aynısını yapar ama sonucu **liste** olarak döndürür.
- \`tapply(x, grup, f)\`: x'i gruplara ayırıp her gruba f uygular:

${K}r
tapply(mtcars$mpg, mtcars$cyl, mean)    # silindir sayısına göre ortalama yakıt verimi
${K}

- \`apply(matris, 1 ya da 2, f)\`: matrisin satırlarına (1) ya da sütunlarına (2) uygular.
` },
      { baslik: "Vektörel düşünmek", md: R`
R'da birçok döngü aslında gereksizdir, çünkü işlemler zaten vektöreldir:

${K}r
fiyat <- c(20, 35, 50)
miktar <- c(100, 60, 40)

# Döngüyle (gereksiz uzun)
gelir <- numeric(3)
for (i in 1:3) gelir[i] <- fiyat[i] * miktar[i]
gelir

# Vektörel (kısa, hızlı, okunur)
fiyat * miktar
${K}

Kural: önce **vektörel bir çözüm** ara (\`*\`, \`sum\`, \`ifelse\`, \`cumprod\`…); bulamazsan \`sapply\`; o da olmazsa döngü. Ama döngü yazmaktan korkma — özellikle her adımın bir öncekine bağlı olduğu durumlarda (yukarıdaki GSYH örneği gibi; gerçi o da \`100 * 1.08^(0:10)\` ile vektörel yapılabilir!) döngü en anlaşılır yoldur.

${K}r
round(100 * 1.08^(0:10), 1)    # aynı GSYH endeksi, tek satırda
${K}
` },
    ],
    ozet: [
      "if/else tek bir mantıksal değere göre dallanır; vektörlerde ifelse() kullanılır.",
      "for bir vektörün elemanları üzerinde döner; sonuçlar önceden oluşturulan bir vektörde biriktirilir. while koşul doğru kaldıkça döner — sonsuz döngüye dikkat.",
      "İşlev: ad <- function(argümanlar) { gövde }; son değer döner; varsayılan argümanlar verilebilir.",
      "sapply (vektör), lapply (liste), tapply (gruplara göre), apply (matris satır/sütun).",
      "Önce vektörel çözüm ara; döngü son çare ama anlaşılır olduğu yerde meşrudur.",
    ],
    terimler: [
      ["if statement", "if ifadesi", "Executes code only when a single logical condition is TRUE."],
      ["ifelse()", "ifelse()", "A vectorized conditional that evaluates a condition for each element."],
      ["for loop", "for döngüsü", "Repeats code for each element of a vector."],
      ["while loop", "while döngüsü", "Repeats code as long as a condition remains TRUE."],
      ["infinite loop", "sonsuz döngü", "A loop whose stopping condition is never met."],
      ["function definition", "işlev tanımı", "Creating a reusable function with function(arguments) { body }."],
      ["return value", "dönüş değeri", "The value a function outputs; by default the last evaluated expression."],
      ["sapply()", "sapply()", "Applies a function to each element and simplifies the result to a vector."],
      ["lapply()", "lapply()", "Applies a function to each element and returns a list."],
      ["tapply()", "tapply()", "Applies a function to subsets of a vector defined by a grouping factor."],
    ],
    quiz: [
      { s: "Which is the correct way to label each element of `notlar` as 'geçti' or 'kaldı'?", c: ["if (notlar >= 2) 'geçti' else 'kaldı'", "ifelse(notlar >= 2, 'geçti', 'kaldı')", "for (notlar >= 2) 'geçti'", "sapply(notlar >= 2)"], d: 1, a: "if tek değer bekler; vektörde ifelse() kullanılır." },
      { s: "How many times does the body of `for (i in 1:5) { … }` run?", c: ["4", "5", "6", "Until i equals 0"], d: 1, a: "1:5 vektörünün her elemanı için bir kez: 5." },
      { s: "What does this function return? `f <- function(x) { y <- x * 2; y + 1 }; f(3)`", c: ["6", "7", "3", "NULL"], d: 1, a: "Son satırın değeri döner: 3·2 + 1 = 7." },
      { s: "A while loop whose condition never becomes FALSE results in:", c: ["An error immediately", "An infinite loop", "One iteration", "No iterations"], d: 1, a: "Koşul hep doğru kalırsa döngü durmaz." },
      { s: "`sapply(c(1, 2, 3), function(x) x^2)` returns:", c: ["A list", "1 4 9", "14", "An error"], d: 1, a: "sapply sonucu vektöre sadeleştirir." },
      { s: "Which function applies a function to groups defined by a factor, e.g., mean mpg by cylinders?", c: ["lapply", "tapply", "apply", "ifelse"], d: 1, a: "tapply(x, grup, f)." },
      { s: "In `esneklik <- function(q1, q2, p1, p2, yontem = \"orta\")`, the argument yontem:", c: ["Must always be supplied", "Has a default value of \"orta\"", "Is ignored", "Must be numeric"], d: 1, a: "Verilmezse varsayılan \"orta\" kullanılır." },
      { s: "Which is the most 'R-like' way to compute revenue for each product from vectors fiyat and miktar?", c: ["A for loop", "fiyat * miktar", "A while loop", "if (fiyat) miktar"], d: 1, a: "Vektörel işlem kısa, hızlı ve okunurdur." },
      { s: "`round(100 * 1.08^(0:3), 1)` returns:", c: ["100 108 116.6 126", "100 108 116 124", "108 116.6 126 136", "An error"], d: 0, a: "1.08⁰…1.08³ çarpanları: 100, 108, 116.64, 125.97 → yuvarlanınca 100 108 116.6 126." },
      { s: "Inside a function, `stop(\"message\")`:", c: ["Prints a warning and continues", "Ends execution with an error message", "Returns NULL silently", "Restarts R"], d: 1, a: "stop() anlaşılır bir hata mesajıyla yürütmeyi durdurur." },
    ],
    alistirmalar: [
      { soru: R`Bir sayının **pozitif, negatif ya da sıfır** olduğunu metin olarak döndüren **isaret** adında bir işlev yaz: isaret(5) → "pozitif", isaret(-2) → "negatif", isaret(0) → "sıfır".`, baslangic: "isaret <- function(x) {\n  \n}", kontrol: "exists('isaret') && is.function(isaret) && isaret(5) == 'pozitif' && isaret(-2) == 'negatif' && isaret(0) == 'sıfır'", ipucu: R`if / else if / else zinciri: \`if (x > 0) "pozitif" else if (x < 0) "negatif" else "sıfır"\``, cozum: "isaret <- function(x) {\n  if (x > 0) {\n    \"pozitif\"\n  } else if (x < 0) {\n    \"negatif\"\n  } else {\n    \"sıfır\"\n  }\n}\nisaret(5); isaret(-2); isaret(0)" },
      { soru: R`Kredi taksitini hesaplayan **taksit** işlevini yaz: $PMT = PV \cdot \dfrac{i}{1 - (1+i)^{-n}}$. Argümanlar: **pv**, **i** (dönem faizi), **n** (taksit sayısı). taksit(100000, 0.03, 12) yaklaşık 10046.21 vermeli.`, baslangic: "taksit <- function(pv, i, n) {\n  \n}", kontrol: "exists('taksit') && abs(taksit(100000, 0.03, 12) - 10046.21) < 0.01", ipucu: R`\`pv * i / (1 - (1 + i)^(-n))\``, cozum: "taksit <- function(pv, i, n) {\n  pv * i / (1 - (1 + i)^(-n))\n}\ntaksit(100000, 0.03, 12)", tebrik: "Matematik 6. haftanın formülü artık bir R aleti." },
      { soru: R`Yıllık %25 enflasyonda bugün 1000 TL olan bir sepetin fiyatı her yıl 1.25 katına çıkıyor. Fiyatın **ilk kez 5000 TL'yi aştığı** yılı bir **while** döngüsüyle bul ve **yil** nesnesine ata.`, baslangic: "fiyat <- 1000\nyil <- 0\nwhile ( ) {\n  \n}\nyil", kontrol: "exists('yil') && yil == 8", ipucu: R`Koşul \`fiyat <= 5000\`; gövdede \`fiyat <- fiyat * 1.25\` ve \`yil <- yil + 1\`.`, cozum: "fiyat <- 1000\nyil <- 0\nwhile (fiyat <= 5000) {\n  fiyat <- fiyat * 1.25\n  yil <- yil + 1\n}\nyil", tebrik: "1.25⁷ ≈ 4.77, 1.25⁸ ≈ 5.96: 8. yılda aşıyor." },
      { soru: R`**sapply** kullanarak, 1000 TL'nin %10 faizle **1'den 10 yıla kadar** her yıl sonundaki değerini veren 10 elemanlı **degerler** vektörünü oluştur.`, baslangic: "degerler <- sapply(1:10, function(t) )", kontrol: "exists('degerler') && length(degerler) == 10 && max(abs(degerler - 1000 * 1.1^(1:10))) < 1e-6", ipucu: R`\`function(t) 1000 * 1.1^t\``, cozum: "degerler <- sapply(1:10, function(t) 1000 * 1.1^t)\nround(degerler, 2)" },
    ],
  });
})();
