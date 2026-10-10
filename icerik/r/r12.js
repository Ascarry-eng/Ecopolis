// Araştırma Yöntemleri — 12. ders: Veriyi görselleştirmek: base R ve ggplot2 (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r12",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Görselleştirmenin neden özet istatistikten vazgeçilmez olduğunu (Anscombe dörtlüsü) açıklamak",
      "Base R ile histogram, kutu grafiği, saçılım, çubuk ve çizgi grafiği çizmek",
      "ggplot2'nin grafik dilbilgisini (veri, estetik eşleme, geometri, katman) kullanmak",
      "Doğru grafik türünü değişken türüne ve soruya göre seçmek",
      "İyi grafik ilkelerini uygulamak ve grafikleri kaydetmek",
    ],
    bolumler: [
      { baslik: "Neden grafik?", md: R`
İstatistikçi Francis Anscombe 1973'te dört küçük veri seti hazırladı. Dördünün de x ve y ortalamaları, varyansları, korelasyonları ve regresyon doğruları **neredeyse aynıdır** — ama grafikleri bambaşkadır. Bu veri R'ın içinde gelir:

${K}r
# Dört veri setinin özet istatistikleri neredeyse aynı
sapply(1:4, function(i) round(c(ort_x = mean(anscombe[[i]]), ort_y = mean(anscombe[[i + 4]]),
                                 kor = cor(anscombe[[i]], anscombe[[i + 4]])), 2))

par(mfrow = c(2, 2), mar = c(4, 4, 2, 1))   # 2x2 grafik düzeni
for (i in 1:4) {
  plot(anscombe[[i]], anscombe[[i + 4]], pch = 19, col = "steelblue",
       main = paste("Veri seti", i), xlab = "x", ylab = "y")
  abline(lm(anscombe[[i + 4]] ~ anscombe[[i]]), col = "firebrick")
}
par(mfrow = c(1, 1))
${K}

Biri doğrusal, biri eğrisel, birinde tek bir aykırı değer doğruyu çekiyor, birinde ilişkiyi tek bir nokta yaratıyor. **Ders: analize başlamadan önce veriyi mutlaka çiz.**
` },
      { baslik: "Base R grafikleri", md: R`
R'ın kendi grafik işlevleri hızlı keşif için idealdir.

### Tek değişken
${K}r
anket <- read.csv("ogrenci_anket.csv")
hist(anket$not_ortalamasi, breaks = 15, col = "lightsteelblue",
     main = "Not ortalamalarının dağılımı", xlab = "Not ortalaması (0-4)", ylab = "Öğrenci sayısı")
${K}

${K}r
boxplot(not_ortalamasi ~ calisiyor_mu, data = anket, col = c("wheat", "lightblue"),
        main = "Yarı zamanlı çalışmaya göre notlar", xlab = "Çalışıyor mu?", ylab = "Not ortalaması")
${K}

Kutu grafiğinde kalın çizgi medyan, kutu çeyrekler arası aralık (Q1–Q3), bıyıklar 1.5 × IQR içindeki en uç değerler, tek noktalar aykırı değerlerdir (11. ders).

### İki sayısal değişken: saçılım grafiği
${K}r
plot(anket$calisma_saati, anket$not_ortalamasi, pch = 19, col = rgb(0.2, 0.3, 0.7, 0.6),
     main = "Çalışma saati ve not", xlab = "Haftalık çalışma (saat)", ylab = "Not ortalaması")
abline(lm(not_ortalamasi ~ calisma_saati, data = anket), col = "firebrick", lwd = 2)
${K}

### Kategorik değişken: çubuk grafiği
${K}r
barplot(sort(table(anket$sehir), decreasing = TRUE), col = "darkseagreen",
        main = "Şehirlere göre öğrenci sayısı", ylab = "Öğrenci")
${K}

### Zaman serisi: çizgi grafiği
${K}r
plot(longley$Year, longley$GNP, type = "l", lwd = 2, col = "navy",
     main = "ABD GNP, 1947-62 (milyar $)", xlab = "Yıl", ylab = "GNP")
${K}

Ortak argümanlar: \`main\` (başlık), \`xlab\`/\`ylab\` (eksen adları), \`col\` (renk), \`pch\` (nokta biçimi), \`lwd\` (çizgi kalınlığı), \`type\` ("p" nokta, "l" çizgi, "b" ikisi).
` },
      { baslik: "ggplot2: grafiklerin dilbilgisi", md: R`
**ggplot2**, Hadley Wickham'ın "grafiklerin dilbilgisi" (grammar of graphics) fikrine dayanır. Her grafik aynı parçalardan kurulur:

1. **Veri (data):** hangi veri çerçevesi?
2. **Estetik eşleme (aesthetics, aes):** hangi değişken x'e, hangisi y'ye, hangisi renge, büyüklüğe…?
3. **Geometri (geom):** nokta mı, çizgi mi, çubuk mu, kutu mu?
4. **Katmanlar (+):** başlıklar, temalar, istatistiksel özetler, alt grafikler.

${K}r
library(ggplot2)
ggplot(anket, aes(x = calisma_saati, y = not_ortalamasi)) +
  geom_point()
${K}

Katman katman zenginleştirelim:

${K}r
ggplot(anket, aes(x = calisma_saati, y = not_ortalamasi, color = calisiyor_mu)) +
  geom_point(alpha = 0.7, size = 2) +
  geom_smooth(method = "lm", se = FALSE) +
  labs(title = "Çalışma saati ve not ortalaması",
       subtitle = "Sentetik öğrenci anketi (n = 120)",
       x = "Haftalık çalışma (saat)", y = "Not ortalaması", color = "Yarı zamanlı iş") +
  theme_minimal()
${K}

### Sık kullanılan geom'lar
| geom | Grafik | Değişkenler |
|---|---|---|
| \`geom_histogram()\` | histogram | bir sayısal |
| \`geom_density()\` | yoğunluk eğrisi | bir sayısal |
| \`geom_boxplot()\` | kutu grafiği | sayısal × kategorik |
| \`geom_bar()\` / \`geom_col()\` | çubuk | kategorik (sayım / hazır değer) |
| \`geom_point()\` | saçılım | iki sayısal |
| \`geom_line()\` | çizgi | zaman serisi |
| \`geom_smooth()\` | eğilim çizgisi | iki sayısal |

${K}r
ggplot(anket, aes(x = not_ortalamasi, fill = calisiyor_mu)) +
  geom_histogram(bins = 15, alpha = 0.7, position = "identity") +
  labs(x = "Not ortalaması", y = "Öğrenci sayısı", fill = "Çalışıyor") +
  theme_minimal()
${K}

### Alt grafikler: facet
${K}r
ggplot(anket, aes(x = calisma_saati, y = not_ortalamasi)) +
  geom_point(color = "steelblue") +
  facet_wrap(~ sinif) +
  labs(title = "Sınıflara göre", x = "Çalışma saati", y = "Not")
${K}

:::ipucu
ggplot'ta katmanları **+** ile birleştirirsin, boru (\`|>\`) ile değil. Ve \`+\` satırın **sonunda** olmalı; bir sonraki satırın başına koyarsan R grafiği yarıda bitmiş sanar.
:::
` },
      { baslik: "Doğru grafiği seçmek ve iyi grafik ilkeleri", md: R`
| Soru | Grafik |
|---|---|
| Bir sayısal değişkenin dağılımı nasıl? | histogram, yoğunluk, kutu |
| Gruplar arasında bir sayısal değişken farklı mı? | yan yana kutu grafikleri |
| İki sayısal değişken ilişkili mi? | saçılım (+ eğilim çizgisi) |
| Kategorilerin büyüklükleri? | çubuk grafiği (sıralı) |
| Zaman içinde nasıl değişti? | çizgi grafiği |
| Bir bütünün parçaları? | yığılmış çubuk (pasta grafiğinden kaçın) |

### İyi grafiğin ilkeleri
- **Her ekseni adlandır ve birimini yaz** ("Gelir (bin TL)").
- **Kaynak ve örneklem** belirt ("Kaynak: TÜİK, n = 1.000").
- Çubuk grafiklerinde dikey eksen **sıfırdan başlamalı**; yoksa farklar abartılır.
- **3B efektlerden ve pasta grafiklerinden kaçın:** göz açıları ve alanları kötü karşılaştırır.
- Renkleri anlam taşımak için kullan; renk körlerini düşün (kırmızı–yeşil ayrımı sorunlu).
- Bir grafik bir mesaj: başlık mümkünse bulguyu söylesin ("Çalışma saati arttıkça not yükseliyor").

### Grafikleri kaydetmek
RStudio'da Plots panelindeki **Export** düğmesi ya da kodla:

${K}r salt
ggsave("calisma_not.png", width = 7, height = 5, dpi = 300)   # son ggplot'u kaydeder

png("histogram.png", width = 800, height = 600)                # base R
hist(anket$not_ortalamasi)
dev.off()
${K}
` },
    ],
    ozet: [
      "Anscombe dörtlüsü: aynı özet istatistikler, bambaşka veriler — önce çiz.",
      "Base R: hist, boxplot, plot (saçılım; type = 'l' çizgi), barplot; abline ile doğru ekle; main, xlab, ylab, col argümanları.",
      "ggplot2 = veri + aes (eşleme) + geom (geometri) + katmanlar (+ labs, theme, facet_wrap, geom_smooth).",
      "Grafik türü soruya göre: dağılım → histogram/kutu; grup farkı → yan yana kutu; ilişki → saçılım; zaman → çizgi; kategori → çubuk.",
      "İlkeler: eksen adı ve birimi, kaynak, çubuklarda sıfır tabanı, 3B ve pasta grafikten kaçınma; ggsave ile kaydet.",
    ],
    terimler: [
      ["histogram", "histogram", "A bar chart of the frequencies of a numerical variable grouped into intervals."],
      ["boxplot", "kutu grafiği", "A plot showing the median, quartiles and outliers of a distribution."],
      ["scatter plot", "saçılım grafiği", "A plot of two numerical variables against each other."],
      ["bar chart", "çubuk grafiği", "A chart of counts or values for categories."],
      ["line chart", "çizgi grafiği", "A chart connecting values over time."],
      ["grammar of graphics", "grafiklerin dilbilgisi", "A framework describing plots as layers of data, aesthetic mappings and geometric objects."],
      ["aesthetic mapping (aes)", "estetik eşleme", "Assigning variables to visual properties such as x, y, color or size."],
      ["geom", "geometri (geom)", "The geometric object used to represent data: points, lines, bars…"],
      ["facet", "alt grafik (facet)", "Splitting a plot into panels by the values of a variable."],
      ["Anscombe's quartet", "Anscombe dörtlüsü", "Four data sets with nearly identical summary statistics but very different graphs."],
    ],
    quiz: [
      { s: "Anscombe's quartet shows that:", c: ["Summary statistics always describe data fully", "Data sets with nearly identical summary statistics can look very different when plotted", "Regression is always appropriate", "Correlation implies causation"], d: 1, a: "Aynı ortalama, varyans ve korelasyon; farklı grafikler. Önce çiz." },
      { s: "To show the distribution of a single numerical variable, the best choice is:", c: ["A pie chart", "A histogram", "A line chart", "A scatter plot"], d: 1, a: "Histogram (ya da kutu/yoğunluk grafiği)." },
      { s: "To compare GPA between students who work and those who don't, use:", c: ["Side-by-side boxplots", "A pie chart", "A line chart", "A single histogram of all students"], d: 0, a: "Gruplar arası sayısal karşılaştırma: yan yana kutu grafikleri." },
      { s: "In ggplot2, `aes(x = calisma_saati, y = not, color = sinif)`:", c: ["Sets all points to a fixed color", "Maps variables to visual properties (x, y, color)", "Filters the data", "Adds a title"], d: 1, a: "aes estetik eşlemedir: değişkenleri görsel özelliklere bağlar." },
      { s: "In ggplot2, layers are combined with:", c: ["|>", "+", "%>%", "&"], d: 1, a: "Katmanlar + ile eklenir." },
      { s: "Which geom draws a scatter plot?", c: ["geom_bar()", "geom_point()", "geom_histogram()", "geom_boxplot()"], d: 1, a: "geom_point() noktalar çizer." },
      { s: "In a boxplot, the thick line inside the box represents:", c: ["The mean", "The median", "The maximum", "The standard deviation"], d: 1, a: "Kutudaki kalın çizgi medyandır; kutu Q1–Q3." },
      { s: "For a bar chart, the value axis should usually:", c: ["Start at zero", "Start at the smallest value", "Be logarithmic always", "Be omitted"], d: 0, a: "Sıfırdan başlamayan çubuklar farkları abartır." },
      { s: "In base R, `plot(x, y, type = \"l\")` draws:", c: ["Points", "Lines", "Bars", "A histogram"], d: 1, a: "type = 'l' çizgi; zaman serileri için." },
      { s: "`facet_wrap(~ sinif)` in ggplot2:", c: ["Colors points by sinif", "Creates a separate panel for each value of sinif", "Removes sinif from the data", "Sorts the data by sinif"], d: 1, a: "Her sınıf için ayrı alt grafik." },
    ],
    alistirmalar: [
      { soru: R`ggplot2 ile **calisma_saati** değişkeninin histogramını çiz (12 kutu) ve grafiği **p** nesnesine ata. Ekranda görmek için en sona \`p\` yaz.`, baslangic: "library(ggplot2)\nanket <- read.csv(\"ogrenci_anket.csv\")\np <- ggplot(anket, aes(x = calisma_saati)) +\n  \np", kontrol: "exists('p') && inherits(p, 'ggplot') && any(sapply(p$layers, function(l) inherits(l$geom, 'GeomBar')))", ipucu: R`\`geom_histogram(bins = 12)\` ekle.`, cozum: "library(ggplot2)\nanket <- read.csv(\"ogrenci_anket.csv\")\np <- ggplot(anket, aes(x = calisma_saati)) +\n  geom_histogram(bins = 12, fill = \"steelblue\") +\n  labs(x = \"Haftalık çalışma (saat)\", y = \"Öğrenci\")\np" },
      { soru: R`**uyku_saati** (x) ile **not_ortalamasi** (y) arasında bir saçılım grafiği çiz, noktaları **sinif**'a göre renklendir ve grafiği **p2** nesnesine ata.`, baslangic: "library(ggplot2)\nanket <- read.csv(\"ogrenci_anket.csv\")\np2 <- \np2", kontrol: "exists('p2') && inherits(p2, 'ggplot') && any(sapply(p2$layers, function(l) inherits(l$geom, 'GeomPoint'))) && !is.null(p2$mapping$colour)", ipucu: R`\`ggplot(anket, aes(x = uyku_saati, y = not_ortalamasi, color = factor(sinif))) + geom_point()\``, cozum: "library(ggplot2)\nanket <- read.csv(\"ogrenci_anket.csv\")\np2 <- ggplot(anket, aes(x = uyku_saati, y = not_ortalamasi, color = factor(sinif))) +\n  geom_point() +\n  labs(x = \"Uyku (saat)\", y = \"Not ortalaması\", color = \"Sınıf\")\np2" },
      { soru: R`Base R ile **LifeCycleSavings** verisinde **pop15** (x) ile **sr** (y) arasında saçılım grafiği çiz ve üstüne regresyon doğrusunu ekle. Doğruyu çizdirmek için kullandığın modeli **model** nesnesine ata.`, baslangic: "plot(LifeCycleSavings$pop15, LifeCycleSavings$sr, pch = 19,\n     xlab = \"15 yaş altı nüfus (%)\", ylab = \"Tasarruf oranı (%)\")\nmodel <- \nabline(model, col = \"red\")", kontrol: "exists('model') && inherits(model, 'lm') && abs(coef(model)[2] - coef(lm(sr ~ pop15, data = LifeCycleSavings))[2]) < 1e-9", ipucu: R`\`model <- lm(sr ~ pop15, data = LifeCycleSavings)\``, cozum: "plot(LifeCycleSavings$pop15, LifeCycleSavings$sr, pch = 19,\n     xlab = \"15 yaş altı nüfus (%)\", ylab = \"Tasarruf oranı (%)\")\nmodel <- lm(sr ~ pop15, data = LifeCycleSavings)\nabline(model, col = \"red\")", tebrik: "Genç nüfus payı yüksek ülkelerde tasarruf oranı düşük: yaşam döngüsü hipoteziyle uyumlu." },
    ],
  });
})();
