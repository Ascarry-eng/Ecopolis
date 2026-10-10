// Araştırma Yöntemleri — 20. ders: Baştan sona mini araştırma projesi (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r20",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Bir araştırma sorusunu hipotezlere ve ölçülebilir değişkenlere dönüştürmek",
      "Veriyi okuyup temizlemek ve betimsel olarak tanıtmak",
      "Uygun grafik ve testleri seçip uygulamak",
      "Kontrol değişkenli bir regresyonla sonucu sınamak ve yorumlamak",
      "Bulguları sınırlılıklarıyla birlikte kısa bir rapor hâline getirmek",
    ],
    bolumler: [
      { baslik: "1. Soru ve hipotezler", md: R`
Bu derste dönem boyunca öğrendiğin her şeyi tek bir küçük projede birleştiriyoruz. Kod kutularını **sırayla** çalıştır; her biri bir öncekinin oluşturduğu nesneleri kullanır.

**Araştırma sorusu:** İktisat öğrencilerinde haftalık ders çalışma süresi ile not ortalaması arasında bir ilişki var mı? Yarı zamanlı bir işte çalışmak bu tabloyu nasıl değiştiriyor?

**Hipotezler:**
- $H_1$: Haftalık çalışma süresi arttıkça not ortalaması artar.
- $H_2$: Yarı zamanlı çalışan öğrencilerin not ortalaması daha düşüktür.
- $H_3$: Çalışma süresi ve uyku kontrol edildiğinde, yarı zamanlı çalışmanın notla ilişkisi zayıflar.

**Değişkenler:** bağımlı değişken \`not_ortalamasi\` (0–4); açıklayıcılar \`calisma_saati\` (haftalık saat), \`calisiyor_mu\` (Evet/Hayır); kontrol \`uyku_saati\` (günlük saat).

**Veri:** 120 öğrencilik **sentetik** anket (gerçek kişilere ait değil, alıştırma için üretildi). Gerçek bir projede bu, senin topladığın anket ya da bir kurumun verisi olurdu.

:::dikkat
Tasarım gözlemseldir: bir anket. Bu yüzden sonuçları **ilişki** olarak yorumlayacağız, nedensellik olarak değil (1. ders).
:::
` },
      { baslik: "2. Veri: okuma ve temizlik", md: R`
${K}r
library(dplyr)
anket <- read.csv("ogrenci_anket.csv")
str(anket)

# Tipler
anket <- anket |>
  mutate(
    calisiyor_mu = factor(calisiyor_mu, levels = c("Hayır", "Evet")),
    cinsiyet = factor(cinsiyet),
    sinif = factor(sinif)
  )

# Eksik değerler ve aralık kontrolleri
colSums(is.na(anket))
range(anket$not_ortalamasi)
sum(duplicated(anket$id))
${K}

Uyku saatinde 3, harçlıkta 3 eksik var. Harçlığı kullanmayacağız; uyku eksik olan 3 öğrenci regresyonda otomatik olarak dışarıda kalacak (\`lm\` eksikli satırları atar). Bunu raporda belirteceğiz.
` },
      { baslik: "3. Betimsel istatistik", md: R`
Raporun "Tablo 1"i: değişkenlerin genel görünümü ve gruplara göre karşılaştırma.

${K}r
anket |>
  summarise(
    n = n(),
    ort_not = mean(not_ortalamasi), ss_not = sd(not_ortalamasi),
    ort_calisma = mean(calisma_saati), ss_calisma = sd(calisma_saati),
    ort_uyku = mean(uyku_saati, na.rm = TRUE)
  ) |> round(2)

tablo1 <- anket |>
  group_by(calisiyor_mu) |>
  summarise(
    n = n(),
    not_ort = round(mean(not_ortalamasi), 2),
    calisma_ort = round(mean(calisma_saati), 1),
    uyku_ort = round(mean(uyku_saati, na.rm = TRUE), 1)
  )
tablo1
${K}

İlk izlenim: yarı zamanlı çalışanlar hem daha az ders çalışıyor hem de not ortalamaları daha düşük. Bu iki gözlem birbirine bağlı olabilir — H₃ tam bunu soruyor.
` },
      { baslik: "4. Grafikler", md: R`
${K}r
library(ggplot2)
ggplot(anket, aes(x = calisma_saati, y = not_ortalamasi, color = calisiyor_mu)) +
  geom_point(alpha = 0.7) +
  geom_smooth(method = "lm", se = FALSE) +
  labs(title = "Çalışma süresi arttıkça not ortalaması yükseliyor",
       x = "Haftalık ders çalışma (saat)", y = "Not ortalaması (0-4)",
       color = "Yarı zamanlı iş", caption = "Kaynak: sentetik öğrenci anketi, n = 120") +
  theme_minimal()
${K}

${K}r
ggplot(anket, aes(x = calisiyor_mu, y = not_ortalamasi, fill = calisiyor_mu)) +
  geom_boxplot(show.legend = FALSE) +
  labs(x = "Yarı zamanlı işte çalışıyor mu?", y = "Not ortalaması") +
  theme_minimal()
${K}

Saçılım grafiği güçlü, yaklaşık doğrusal ve pozitif bir ilişki gösteriyor; belirgin bir aykırı değer yok. Kutu grafiği iki grup arasındaki farkı gösteriyor.
` },
      { baslik: "5. Testler", md: R`
**H₁: çalışma süresi ve not**

${K}r
cor.test(anket$calisma_saati, anket$not_ortalamasi)
${K}

**H₂: çalışan ve çalışmayan öğrencilerin notları**

${K}r
t.test(not_ortalamasi ~ calisiyor_mu, data = anket)
${K}

İki test de güçlü kanıt veriyor: korelasyon pozitif ve anlamlı, grup farkı anlamlı. Ama H₂'deki farkın ne kadarı işin kendisinden, ne kadarı daha az ders çalışmaktan kaynaklanıyor? Bunu ancak çoklu regresyon ayırabilir.
` },
      { baslik: "6. Regresyon", md: R`
Üç model kuralım: yalnız iş; iş + çalışma süresi; iş + çalışma süresi + uyku.

${K}r
m1 <- lm(not_ortalamasi ~ calisiyor_mu, data = anket)
m2 <- lm(not_ortalamasi ~ calisiyor_mu + calisma_saati, data = anket)
m3 <- lm(not_ortalamasi ~ calisiyor_mu + calisma_saati + uyku_saati, data = anket)

# Basit bir karşılaştırma tablosu
katsayi <- function(m, ad) if (ad %in% names(coef(m))) round(coef(m)[[ad]], 3) else NA
data.frame(
  degisken = c("calisiyor_muEvet", "calisma_saati", "uyku_saati"),
  model1 = sapply(c("calisiyor_muEvet", "calisma_saati", "uyku_saati"), katsayi, m = m1),
  model2 = sapply(c("calisiyor_muEvet", "calisma_saati", "uyku_saati"), katsayi, m = m2),
  model3 = sapply(c("calisiyor_muEvet", "calisma_saati", "uyku_saati"), katsayi, m = m3)
)
c(R2_m1 = summary(m1)$r.squared, R2_m2 = summary(m2)$r.squared, R2_m3 = summary(m3)$r.squared) |> round(3)
nobs(m3)    # eksik uyku verisi yüzünden 117
${K}

${K}r
summary(m3)
${K}

**Yorum:**
- Model 1'de yarı zamanlı çalışmak, nottaki yaklaşık **0.44 puanlık** bir farkla ilişkili.
- Çalışma süresi eklenince bu fark **0.15 civarına** iniyor (p ≈ 0.04, sınırda anlamlı); çalışma süresinin katsayısı büyük ve çok anlamlı (her ek saat ≈ 0.08 puan). R² 0.15'ten 0.60'a sıçrıyor.
- Uyku da eklenince işin katsayısı **0.11**'e düşüyor ve %5 düzeyinde anlamlılığını yitiriyor (p ≈ 0.11); uyku pozitif ve anlamlı, R² 0.64.

Bu tablo **H₃'ü destekler**: yarı zamanlı çalışmanın notla ilişkisinin büyük kısmı, çalışan öğrencilerin daha az ders çalışmasından geliyor görünüyor (çalışma süresi bir **aracı değişken** gibi davranıyor — 18. ders).

### Artıkları kontrol et
${K}r
par(mfrow = c(1, 2))
plot(fitted(m3), resid(m3), pch = 19, col = "steelblue", xlab = "Tahmin", ylab = "Artık"); abline(h = 0, lty = 2)
qqnorm(resid(m3), pch = 19, col = "steelblue"); qqline(resid(m3))
par(mfrow = c(1, 1))
${K}

Belirgin bir desen yok; artıklar yaklaşık normal.
` },
      { baslik: "7. Rapor ve sınırlılıklar", md: R`
Kısa bir rapor özeti şöyle yazılabilir:

> **Özet.** Bu çalışmada 120 iktisat öğrencisinden oluşan (sentetik) bir örneklemde haftalık ders çalışma süresi, yarı zamanlı iş ve not ortalaması arasındaki ilişki incelenmiştir. Çalışma süresi ile not ortalaması arasında güçlü ve pozitif bir korelasyon bulunmuştur (r ≈ 0.77). Yarı zamanlı çalışan öğrencilerin not ortalaması yaklaşık 0.44 puan düşüktür; ancak çalışma süresi ve uyku kontrol edildiğinde bu fark küçülmekte ve istatistiksel olarak anlamlı olmaktan çıkmaktadır. Bulgular, yarı zamanlı çalışmanın notlarla ilişkisinin büyük ölçüde ders çalışmaya ayrılan zamanın azalması üzerinden işlediği yorumuyla uyumludur.

**Sınırlılıklar** — her raporun dürüst olması gereken kısım:
1. **Veri sentetiktir**; gerçek öğrenciler hakkında bir şey söylemez. (Gerçek bir projede: örneklem nasıl seçildi? Temsili mi?)
2. **Gözlemsel tasarım:** nedensellik kurulamaz. Belki zaten motivasyonu düşük öğrenciler hem az çalışıyor hem iş buluyordur (karıştırıcı: motivasyon, ailenin geliri).
3. **Ölçüm:** çalışma süresi kendi beyanına dayanıyor; insanlar çalışma sürelerini abartma eğilimindedir.
4. **Eksik veri:** 3 öğrenci uyku verisi eksik olduğu için son modelden çıktı.
5. **Model biçimi:** ilişkinin doğrusal olduğunu varsaydık.

:::ipucu
Kendi dönem projen için bu iskeleti kullan: soru → hipotez → veri → temizlik → betimleme → grafik → test → regresyon → yorum → sınırlılıklar. Hepsini bir **Quarto belgesinde** (19. ders) yaz ki tek tıkla yeniden üretilebilsin. Takıldığın her adımda Kâhin'in **R kodu** modunu kullanabilirsin.
:::

### Bundan sonra
- Kendi sorunu seç: TÜİK'ten iller arası işsizlik ve eğitim, TCMB'den enflasyon beklentileri, BIST'ten şirket verileri…
- **Ekonometri** derslerinde: araç değişkenler, panel veri yöntemleri, zaman serisi analizi, nedensel çıkarım yöntemleri (fark-içinde-fark, regresyon süreksizliği).
- **R'ı derinleştir:** Hadley Wickham'ın ücretsiz *R for Data Science* kitabı (r4ds.hadley.nz).

Kütüphane'nin sonuna geldin. Tapınağının son tamburu yerinde. 🏛️
` },
    ],
    ozet: [
      "Proje iskeleti: soru → hipotezler → değişkenler → veri → temizlik → betimleme → grafik → test → regresyon → yorum → sınırlılıklar → rapor.",
      "Betimsel tablo ve grafikler bulguların zeminini kurar; testler (cor.test, t.test) tek tek ilişkileri sınar.",
      "Çoklu regresyon kanalları ayırır: işin notla ilişkisi çalışma süresi kontrol edilince küçülür (aracı değişken).",
      "Sonuçlar gözlemsel tasarımda 'ilişki' olarak yorumlanır; sınırlılıklar (örneklem, karıştırıcılar, ölçüm, eksik veri, model biçimi) açıkça yazılır.",
      "Bütün projeyi tekrarlanabilir bir Quarto belgesinde topla.",
    ],
    terimler: [
      ["research design", "araştırma tasarımı", "The overall plan for answering a research question: data, measures and methods."],
      ["descriptive table", "betimsel tablo", "A table summarizing the main variables, often 'Table 1' in a paper."],
      ["robustness check", "sağlamlık kontrolü", "Re-estimating a result under alternative assumptions or specifications."],
      ["limitations", "sınırlılıklar", "The weaknesses of a study that constrain its conclusions."],
      ["self-reported data", "beyana dayalı veri", "Data based on respondents' own reports, subject to recall and social desirability bias."],
      ["mediating variable", "aracı değişken", "A variable through which an explanatory variable affects the outcome."],
    ],
    quiz: [
      { s: "In this project, the dependent variable is:", c: ["calisma_saati", "calisiyor_mu", "not_ortalamasi", "uyku_saati"], d: 2, a: "Açıklanmaya çalışılan sonuç not ortalamasıdır." },
      { s: "Why does the final regression use 117 observations instead of 120?", c: ["Three outliers were removed", "lm() drops rows with missing values (3 missing sleep values)", "Three students were duplicates", "R limits sample size"], d: 1, a: "lm eksikli satırları atar; raporda belirtilmeli." },
      { s: "The coefficient on part-time work shrinks from about −0.44 to −0.15 when study hours are added. The best interpretation is:", c: ["Working has no relationship with grades at all", "Much of the association between working and grades operates through reduced study time", "Study hours cause part-time work", "The regression is wrong"], d: 1, a: "Çalışma süresi aracı değişken gibi davranıyor." },
      { s: "Which test addresses H₁ (study time and GPA)?", c: ["chisq.test", "cor.test", "paired t-test", "fisher.test"], d: 1, a: "İki sayısal değişken arasındaki ilişki: korelasyon testi." },
      { s: "Which statement belongs in the limitations section?", c: ["The correlation is 0.77", "Because the design is observational, motivation could confound the relationship", "We used ggplot2", "The sample has 120 students"], d: 1, a: "Karıştırıcı değişken olasılığı bir sınırlılıktır." },
      { s: "Why are the results described as 'associations' rather than 'effects'?", c: ["Because p-values are large", "Because the data come from an observational survey without random assignment", "Because R cannot estimate effects", "Because the sample is too large"], d: 1, a: "Rastgele atama yok: nedensellik iddiası tasarımın ötesinde." },
      { s: "Self-reported study hours may be biased because:", c: ["R rounds the numbers", "Respondents may overstate how much they study (social desirability)", "Study hours are categorical", "They are always missing"], d: 1, a: "Beyana dayalı veride sosyal beğenirlik yanlılığı olabilir." },
      { s: "The best tool to package the whole project so that it can be regenerated with one click is:", c: ["A Word document with pasted results", "A Quarto (or R Markdown) document", "Screenshots", "An Excel file"], d: 1, a: "Kod, sonuç ve metin tek tekrarlanabilir belgede." },
    ],
    alistirmalar: [
      { soru: R`**Cinsiyeti** de kontrol değişkeni olarak ekleyen dördüncü bir model kur (calisiyor_mu + calisma_saati + uyku_saati + cinsiyet) ve **m4** nesnesine ata. Cinsiyet katsayısı anlamlı mı?`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nm4 <- \nsummary(m4)", kontrol: "exists('m4') && inherits(m4, 'lm') && any(grepl('cinsiyet', names(coef(m4)))) && any(grepl('calisma_saati', names(coef(m4))))", ipucu: R`\`lm(not_ortalamasi ~ calisiyor_mu + calisma_saati + uyku_saati + cinsiyet, data = anket)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nm4 <- lm(not_ortalamasi ~ calisiyor_mu + calisma_saati + uyku_saati + cinsiyet, data = anket)\nsummary(m4)" },
      { soru: R`Bir **sağlamlık kontrolü** yap: yalnız **1. ve 2. sınıf** öğrencilerle çalışma saatinin nota etkisini yeniden tahmin et. Modeli **m_alt** nesnesine ata.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nalt <- anket[anket$sinif %in% c(1, 2), ]\nm_alt <- ", kontrol: "exists('m_alt') && inherits(m_alt, 'lm') && nobs(m_alt) == sum(read.csv('ogrenci_anket.csv')$sinif %in% c(1, 2)) && 'calisma_saati' %in% names(coef(m_alt))", ipucu: R`\`lm(not_ortalamasi ~ calisma_saati, data = alt)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nalt <- anket[anket$sinif %in% c(1, 2), ]\nm_alt <- lm(not_ortalamasi ~ calisma_saati, data = alt)\nsummary(m_alt)$coefficients", tebrik: "Alt örneklemde de katsayı benzerse bulgu 'sağlam' sayılır." },
    ],
  });
})();
