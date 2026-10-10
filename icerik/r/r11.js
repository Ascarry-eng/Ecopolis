// Araştırma Yöntemleri — 11. ders: Betimsel istatistik (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r11",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Merkezi eğilim ölçülerini (ortalama, medyan, mod) hesaplamak ve hangisinin ne zaman uygun olduğunu bilmek",
      "Yayılım ölçülerini (aralık, varyans, standart sapma, çeyrekler arası aralık, değişim katsayısı) hesaplamak ve yorumlamak",
      "Çarpıklığı ve aykırı değerleri tanımak; 1.5 × IQR kuralını uygulamak",
      "Kategorik değişkenler için frekans ve oran tabloları üretmek",
      "Gruplara göre betimsel istatistik tabloları hazırlamak",
    ],
    bolumler: [
      { baslik: "Merkezi eğilim", md: R`
Bir değişkeni tek bir sayıyla özetlemek istediğimizde "tipik değer"i ararız.

- **Ortalama (mean):** değerlerin toplamı / gözlem sayısı. $\bar x = \frac{1}{n}\sum x_i$
- **Medyan (median):** sıralanmış verinin tam ortasındaki değer; verinin yarısı altında, yarısı üstünde.
- **Mod (mode):** en sık görülen değer. Kategorik veriler için tek anlamlı merkez ölçüsüdür.

${K}r
anket <- read.csv("ogrenci_anket.csv")
mean(anket$harclik, na.rm = TRUE)
median(anket$harclik, na.rm = TRUE)

# R'da hazır bir mod işlevi yok; kendimiz yazalım
mod <- function(x) { t <- table(x); names(t)[which.max(t)] }
mod(anket$sehir)
${K}

### Ortalama mı, medyan mı?
Ortalama **aykırı değerlere duyarlıdır**, medyan değildir. Bir köye bir milyarder taşınırsa köyün ortalama geliri fırlar ama medyan geliri neredeyse değişmez.

${K}r
gelirler <- c(15000, 17000, 18000, 20000, 22000, 25000, 900000)
mean(gelirler)
median(gelirler)
mean(gelirler, trim = 0.15)    # kırpılmış ortalama: uçlardan %15 at
${K}

:::ipucu
Gelir, servet, ev fiyatı gibi **sağa çarpık** dağılımlarda medyan "tipik" kişiyi daha iyi anlatır. Bu yüzden TÜİK ve diğer kurumlar gelir dağılımında medyan geliri de raporlar; göreli yoksulluk eşiği medyan gelirin %50–60'ıdır (Mikro 18. bölüm).
:::
` },
      { baslik: "Yayılım", md: R`
İki sınıfın ortalaması aynı (70) olabilir ama birinde herkes 65–75 arası, ötekinde 30 ile 100 arası almış olabilir. **Yayılım (dispersion)** bu farkı ölçer.

- **Aralık (range):** en büyük − en küçük. Basit ama yalnız iki uç değere bakar.
- **Varyans (variance):** ortalamadan sapmaların karelerinin ortalaması. $s^2 = \frac{1}{n-1}\sum (x_i - \bar x)^2$
- **Standart sapma (standard deviation):** varyansın karekökü; **verinin kendi biriminde** olduğu için yorumlanabilir.
- **Çeyrekler arası aralık (IQR):** 3. çeyrek − 1. çeyrek; verinin ortadaki %50'sinin genişliği. Aykırı değerlere dayanıklı.
- **Değişim katsayısı (CV):** standart sapma / ortalama. Birimleri farklı değişkenlerin yayılımını karşılaştırmak için.

${K}r
x <- anket$not_ortalamasi
range(x); diff(range(x))
var(x)
sd(x)
quantile(x)                       # 0, %25, %50, %75, %100
quantile(x, c(0.1, 0.9))          # istediğin yüzdelikler
IQR(x)
sd(x) / mean(x)                   # değişim katsayısı
${K}

:::dikkat
R'ın \`var()\` ve \`sd()\` işlevleri **örneklem** varyansını hesaplar: paydada $n$ değil $n - 1$ vardır. Bunun nedeni, örneklem ortalamasını kullanmanın sapmaları olduğundan küçük göstermesidir; $n-1$ bunu düzeltir (Bessel düzeltmesi). Anakütlenin tamamı elindeyse $n$ ile bölmek gerekir.
:::

### summary() hepsini bir arada verir
${K}r
summary(anket$calisma_saati)
summary(anket[, c("calisma_saati", "uyku_saati", "not_ortalamasi")])
${K}
` },
      { baslik: "Dağılımın biçimi ve aykırı değerler", md: R`
### Çarpıklık
- **Simetrik** dağılımda ortalama ≈ medyan.
- **Sağa çarpık (pozitif çarpık)** dağılımda uzun kuyruk sağdadır; ortalama > medyan (gelir, servet, şirket büyüklüğü).
- **Sola çarpık** dağılımda ortalama < medyan (kolay bir sınavın notları).

${K}r
mean(anket$harclik, na.rm = TRUE) - median(anket$harclik, na.rm = TRUE)   # pozitif: sağa çarpık
hist(anket$harclik, main = "Harçlık dağılımı", xlab = "TL", col = "lightsteelblue")
${K}

### Aykırı değerler: 1.5 × IQR kuralı
Tukey'in kuralına göre, bir değer $Q_1 - 1.5 \times IQR$'ın altında ya da $Q_3 + 1.5 \times IQR$'ın üstündeyse **aykırı değer (outlier)** sayılır. Kutu grafikleri (boxplot) bu kuralla çizilir.

${K}r
q <- quantile(anket$calisma_saati, c(0.25, 0.75))
alt <- q[1] - 1.5 * IQR(anket$calisma_saati)
ust <- q[2] + 1.5 * IQR(anket$calisma_saati)
anket$calisma_saati[anket$calisma_saati < alt | anket$calisma_saati > ust]
boxplot(anket$calisma_saati, horizontal = TRUE, main = "Haftalık çalışma saati", col = "wheat")
${K}

:::dikkat
Aykırı değeri **otomatik olarak silme.** Önce sor: veri giriş hatası mı (yaş = 250), yoksa gerçek ama sıra dışı bir gözlem mi (haftada 30 saat çalışan öğrenci)? Hatayı düzelt; gerçek gözlemi tut, ama analizi onunla ve onsuz yapıp sonucun değişip değişmediğini raporla.
:::
` },
      { baslik: "Kategorik değişkenler: frekans tabloları", md: R`
Kategorik değişkenler için ortalama anlamsızdır; **sayılar ve oranlar** raporlanır.

${K}r
table(anket$sehir)
prop.table(table(anket$sehir))                 # oranlar
round(prop.table(table(anket$sehir)) * 100, 1) # yüzdeler
sort(table(anket$sehir), decreasing = TRUE)
${K}

### Çapraz tablo (iki kategorik değişken)
${K}r
tablo <- table(anket$cinsiyet, anket$calisiyor_mu)
tablo
prop.table(tablo, margin = 1)    # satır yüzdeleri: her cinsiyetin içinde çalışanların payı
addmargins(tablo)                # toplamlarla
${K}

\`margin = 1\` satır, \`margin = 2\` sütun yüzdesi verir. Hangisini istediğin soruna bağlıdır: "kadınların yüzde kaçı çalışıyor?" satır yüzdesidir; "çalışanların yüzde kaçı kadın?" sütun yüzdesidir. 15. derste bu tabloyu ki-kare testiyle sınayacağız.
` },
      { baslik: "Gruplara göre betimsel tablo", md: R`
Araştırma raporlarının vazgeçilmezi: değişkenlerin gruplara göre özeti.

${K}r
tapply(anket$not_ortalamasi, anket$calisiyor_mu, mean)
aggregate(not_ortalamasi ~ sinif, data = anket, FUN = function(v) round(mean(v), 2))
${K}

dplyr ile, birden çok istatistik bir arada:

${K}r
library(dplyr)
anket |>
  group_by(calisiyor_mu) |>
  summarise(
    n = n(),
    ortalama = round(mean(not_ortalamasi), 2),
    medyan = median(not_ortalamasi),
    ss = round(sd(not_ortalamasi), 2),
    min = min(not_ortalamasi),
    max = max(not_ortalamasi)
  )
${K}

Bir raporda betimsel tablo genellikle "Tablo 1"dir: her değişkenin n, ortalama, standart sapma, en küçük ve en büyük değeri. Okur, analiz edilen verinin neye benzediğini ilk bu tablodan görür.
` },
    ],
    ozet: [
      "Merkezi eğilim: ortalama (aykırı değerlere duyarlı), medyan (dayanıklı), mod (kategorik veride). Çarpık verilerde medyan tipik değeri daha iyi gösterir.",
      "Yayılım: aralık, varyans, standart sapma (verinin biriminde), IQR (dayanıklı), değişim katsayısı (birimden bağımsız). R'ın var/sd'si n − 1 kullanır.",
      "Sağa çarpık dağılımda ortalama > medyan. Aykırı değer: Q1 − 1.5·IQR altı ya da Q3 + 1.5·IQR üstü; silmeden önce nedenini sor.",
      "Kategorik değişkenler: table, prop.table, çapraz tablo; satır (margin = 1) ve sütun (margin = 2) yüzdeleri farklı soruları cevaplar.",
      "Grup özetleri: tapply, aggregate ya da dplyr group_by + summarise.",
    ],
    terimler: [
      ["descriptive statistics", "betimsel istatistik", "Statistics that summarize and describe the main features of data."],
      ["mean", "ortalama", "The sum of values divided by the number of values."],
      ["median", "medyan (ortanca)", "The middle value of ordered data."],
      ["mode", "mod (tepe değer)", "The most frequent value."],
      ["trimmed mean", "kırpılmış ortalama", "The mean after removing a percentage of the smallest and largest values."],
      ["range", "aralık (açıklık)", "The difference between the maximum and minimum."],
      ["variance", "varyans", "The average squared deviation from the mean (sample: divided by n − 1)."],
      ["standard deviation", "standart sapma", "The square root of the variance; spread in the original units."],
      ["quartile", "çeyrek", "Values dividing ordered data into four equal parts (Q1, Q2 = median, Q3)."],
      ["interquartile range (IQR)", "çeyrekler arası aralık", "Q3 − Q1, the spread of the middle 50% of data."],
      ["coefficient of variation", "değişim katsayısı", "Standard deviation divided by the mean."],
      ["skewness", "çarpıklık", "Asymmetry of a distribution; right-skewed distributions have a long right tail."],
      ["outlier", "aykırı değer", "An observation far from the rest; often defined by the 1.5 × IQR rule."],
      ["frequency table", "frekans tablosu", "A table of counts for each category."],
      ["cross-tabulation", "çapraz tablo", "A table of counts for combinations of two categorical variables."],
    ],
    quiz: [
      { s: "For the data 2, 3, 3, 5, 12, the median is:", c: ["3", "5", "5.0 (the mean)", "12"], d: 0, a: "Sıralı verinin ortası 3; ortalama (25/5 = 5) aykırı 12'den etkilenir." },
      { s: "Which measure of center is least affected by outliers?", c: ["Mean", "Median", "Range", "Variance"], d: 1, a: "Medyan yalnız ortadaki değere bakar." },
      { s: "In a right-skewed distribution, typically:", c: ["Mean < median", "Mean > median", "Mean = median", "There is no median"], d: 1, a: "Uzun sağ kuyruk ortalamayı yukarı çeker." },
      { s: "R's `sd()` divides the sum of squared deviations by:", c: ["n", "n − 1 (then takes the square root)", "n + 1", "2n"], d: 1, a: "Örneklem standart sapması n − 1 kullanır (Bessel düzeltmesi)." },
      { s: "Q1 = 10 and Q3 = 18. By the 1.5 × IQR rule, values above which threshold are outliers?", c: ["18", "24", "30", "36"], d: 2, a: "IQR = 8; Q3 + 1.5·8 = 18 + 12 = 30." },
      { s: "Which statistic is in the same units as the original data?", c: ["Variance", "Standard deviation", "Coefficient of variation", "Squared deviations"], d: 1, a: "Varyans birimin karesidir; standart sapma orijinal birimdedir." },
      { s: "To compare the spread of income (TL) and height (cm), you should use:", c: ["Variance", "Range", "Coefficient of variation", "Mode"], d: 2, a: "CV = sd/ortalama birimsizdir." },
      { s: "Which function produces proportions from a frequency table?", c: ["table()", "prop.table()", "summary()", "quantile()"], d: 1, a: "prop.table(table(x)) oranları verir." },
      { s: "In `prop.table(table(cinsiyet, calisiyor_mu), margin = 1)`, the percentages answer:", c: ["What share of working students are women?", "What share of each gender works?", "The total number of students", "The mean GPA"], d: 1, a: "margin = 1 satır yüzdesi: her cinsiyetin içindeki dağılım." },
      { s: "An observation of 'age = 250' in a survey most likely indicates:", c: ["A genuine outlier to keep", "A data entry error to correct", "A right-skewed distribution", "The mode"], d: 1, a: "İmkânsız bir değer veri giriş hatasıdır; düzeltilmeli." },
    ],
    alistirmalar: [
      { soru: R`Anketteki **not_ortalamasi** için ortalamayı **ort**, medyanı **med**, standart sapmayı **ss** nesnelerine hesapla.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nort <- \nmed <- \nss <- ", kontrol: "a <- read.csv('ogrenci_anket.csv'); exists('ort') && exists('med') && exists('ss') && abs(ort - mean(a$not_ortalamasi)) < 1e-9 && abs(med - median(a$not_ortalamasi)) < 1e-9 && abs(ss - sd(a$not_ortalamasi)) < 1e-9", ipucu: R`\`mean()\`, \`median()\`, \`sd()\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nort <- mean(anket$not_ortalamasi)\nmed <- median(anket$not_ortalamasi)\nss <- sd(anket$not_ortalamasi)\nc(ort, med, ss)" },
      { soru: R`**harclik** değişkeninin çeyrekler arası aralığını (eksikleri dışarıda bırakarak) **iqr** nesnesine hesapla.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\niqr <- ", kontrol: "exists('iqr') && abs(iqr - IQR(read.csv('ogrenci_anket.csv')$harclik, na.rm = TRUE)) < 1e-9", ipucu: R`\`IQR(anket$harclik, na.rm = TRUE)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\niqr <- IQR(anket$harclik, na.rm = TRUE)\niqr" },
      { soru: R`Öğrencilerin **yüzde kaçı** İstanbul'dan? Sonucu 0–100 arasında **yuzde_ist** nesnesine ata.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nyuzde_ist <- ", kontrol: "exists('yuzde_ist') && abs(yuzde_ist - mean(read.csv('ogrenci_anket.csv')$sehir == 'İstanbul') * 100) < 1e-9", ipucu: R`\`mean(anket$sehir == "İstanbul") * 100\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nyuzde_ist <- mean(anket$sehir == \"İstanbul\") * 100\nyuzde_ist" },
      { soru: R`Her **sınıf** (1–4) için ortalama haftalık çalışma saatini veren, adları sınıf numaraları olan bir vektörü **sinif_ort** nesnesine ata (tapply kullan).`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nsinif_ort <- ", kontrol: "a <- read.csv('ogrenci_anket.csv'); exists('sinif_ort') && length(sinif_ort) == 4 && max(abs(as.numeric(sinif_ort) - as.numeric(tapply(a$calisma_saati, a$sinif, mean)))) < 1e-9", ipucu: R`\`tapply(anket$calisma_saati, anket$sinif, mean)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nsinif_ort <- tapply(anket$calisma_saati, anket$sinif, mean)\nround(sinif_ort, 2)" },
    ],
  });
})();
