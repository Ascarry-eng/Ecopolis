// Araştırma Yöntemleri — 16. ders: Korelasyon (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r16",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Kovaryans ve korelasyon katsayısını hesaplamak ve yorumlamak",
      "Pearson ve Spearman korelasyonlarını ayırmak; hangisinin ne zaman uygun olduğunu bilmek",
      "cor.test ile korelasyonun anlamlılığını sınamak",
      "Korelasyon matrisi üretmek ve okumak",
      "Korelasyonun sınırlarını (doğrusallık, aykırı değer, nedensellik) değerlendirmek",
    ],
    bolumler: [
      { baslik: "Kovaryans ve korelasyon", md: R`
İki sayısal değişken birlikte nasıl hareket ediyor? Saçılım grafiği (12. ders) bunu gözle gösterir; korelasyon tek bir sayıyla özetler.

**Kovaryans (covariance)**, iki değişkenin ortalamalarından sapmalarının çarpımlarının ortalamasıdır:

$$\text{cov}(x, y) = \frac{1}{n-1}\sum (x_i - \bar x)(y_i - \bar y)$$

İkisi birlikte ortalamanın üstündeyse (ya da birlikte altındaysa) çarpım pozitiftir. Sorun: kovaryansın büyüklüğü **birimlere bağlıdır** (gelir TL ile mi bin TL ile mi ölçülmüş?), yorumlanamaz.

**Pearson korelasyon katsayısı** kovaryansı iki standart sapmaya bölerek birimden kurtarır:

$$r = \frac{\text{cov}(x, y)}{s_x \, s_y}, \qquad -1 \le r \le 1$$

- $r = +1$: tam pozitif doğrusal ilişki; $r = -1$: tam negatif; $r = 0$: doğrusal ilişki yok.
- Kaba yorum: $|r| \ge 0.7$ güçlü, 0.4–0.7 orta, 0.2–0.4 zayıf, < 0.2 çok zayıf (alanına göre değişir).

${K}r
anket <- read.csv("ogrenci_anket.csv")
cov(anket$calisma_saati, anket$not_ortalamasi)
cor(anket$calisma_saati, anket$not_ortalamasi)
${K}

Noktaları sürükleyerek r'nin nasıl değiştiğini hisset — özellikle "aykırı değerli" ve "eğrisel" verileri dene:

{{korelasyon}}
` },
      { baslik: "Pearson mı, Spearman mı?", md: R`
**Pearson r** yalnız **doğrusal** ilişkiyi ölçer ve **aykırı değerlere duyarlıdır**. Bir alternatif:

**Spearman sıra korelasyonu (ρ)**, değerlerin kendisi yerine **sıralarının** Pearson korelasyonudur. Avantajları:

- **Monoton** (sürekli artan ya da azalan ama doğrusal olmayan) ilişkileri de yakalar,
- Aykırı değerlere dayanıklıdır,
- **Sıralama ölçeğindeki** değişkenlerde (memnuniyet düzeyi, sıralamalar) kullanılabilir.

${K}r
x <- 1:20
y <- exp(x / 4)                      # monoton ama çok eğrisel
cor(x, y)                            # Pearson: 1'in epey altında
cor(x, y, method = "spearman")       # Spearman: tam 1
${K}

${K}r
# Tek bir aykırı değerin etkisi
x2 <- c(1:10)
y2 <- c(2.1, 2.9, 3.2, 4.1, 4.8, 6.1, 6.6, 7.9, 8.4, 1.0)   # son nokta aykırı
cor(x2, y2)
cor(x2, y2, method = "spearman")
${K}

:::dikkat
$r \approx 0$ "ilişki yok" demek değildir, "**doğrusal** ilişki yok" demektir. U biçimli bir ilişkide (ör. vergi oranı ile vergi geliri — Laffer eğrisi) r sıfıra yakın çıkabilir. Her zaman önce grafiğe bak.
:::
` },
      { baslik: "Korelasyonun anlamlılığı: cor.test", md: R`
Örneklemde bulduğumuz r, anakütlede gerçekten bir ilişki olduğunu mu gösteriyor, yoksa tesadüf mü?

- $H_0$: anakütle korelasyonu sıfırdır ($\rho = 0$).
- $H_1$: $\rho \ne 0$.

${K}r
cor.test(anket$calisma_saati, anket$not_ortalamasi)
cor.test(anket$uyku_saati, anket$not_ortalamasi, method = "spearman", exact = FALSE)
${K}

Çıktı: t istatistiği, p-değeri, r'nin kendisi ve Pearson için %95 güven aralığı. Rapor örneği: "Haftalık çalışma süresi ile not ortalaması arasında güçlü, pozitif ve anlamlı bir korelasyon bulunmuştur (r = 0.77, p < .001, n = 120)."

Küçük örneklemlerde güçlü görünen korelasyonlar anlamlı çıkmayabilir; büyük örneklemlerde zayıf korelasyonlar bile anlamlı çıkar (15. derste anlamlılık–önem ayrımı).
` },
      { baslik: "Korelasyon matrisi", md: R`
Birden çok değişken arasındaki bütün ikili korelasyonlara bir arada bakmak için:

${K}r
sayisal <- anket[, c("calisma_saati", "uyku_saati", "harclik", "not_ortalamasi")]
round(cor(sayisal, use = "complete.obs"), 2)
${K}

\`use = "complete.obs"\` eksik değerli satırları dışarıda bırakır (yoksa NA içeren her korelasyon NA olur). Köşegen hep 1'dir (her değişkenin kendisiyle korelasyonu) ve matris simetriktir.

LifeCycleSavings'te:

${K}r
round(cor(LifeCycleSavings), 2)
plot(LifeCycleSavings$pop15, LifeCycleSavings$pop75, pch = 19,
     xlab = "15 yaş altı nüfus (%)", ylab = "75 yaş üstü nüfus (%)")
${K}

pop15 ile pop75 arasındaki çok güçlü negatif korelasyona dikkat: genç nüfusu fazla olan ülkelerin yaşlı nüfusu azdır. Bu, 18. dersteki çoklu regresyonda **çoklu doğrusal bağlantı** sorununun habercisidir.
` },
      { baslik: "Korelasyon nedensellik değildir — yine", md: R`
1. dersin uyarısı burada veriyle somutlaşır. LifeCycleSavings'te tasarruf oranı ile genç nüfus payı arasında negatif bir korelasyon var:

${K}r
cor(LifeCycleSavings$sr, LifeCycleSavings$pop15)
${K}

Bu, yaşam döngüsü hipoteziyle uyumludur (çocuklar tüketir ama gelir getirmez, bu yüzden genç nüfuslu ülkelerde tasarruf düşük). Ama tek başına nedensellik kanıtı değildir. Olası karıştırıcılar:

- **Gelir düzeyi:** yoksul ülkelerin hem doğurganlığı yüksek (genç nüfus) hem tasarruf kapasitesi düşük olabilir. Gelir hem X'i hem Y'yi etkiler.
- **Kurumlar, finansal sistemin gelişmişliği, sosyal güvenlik** de iki değişkeni birlikte etkileyebilir.

Bu karıştırıcıları "sabit tutmanın" bir yolu, onları **regresyon** modeline eklemektir — bir sonraki iki dersin konusu.

:::ipucu
Korelasyon raporlarken üç şeyi birlikte ver: **yön ve güç** (r), **belirsizlik** (güven aralığı ya da p), **grafik**. Ve sonuç cümlesinde "ilişki" de, "etki" deme — tasarım nedenselliğe izin vermiyorsa.
:::
` },
    ],
    ozet: [
      "Kovaryans birimlere bağlıdır; Pearson r = cov/(sₓsᵧ) birimden bağımsızdır ve −1 ile +1 arasındadır.",
      "Pearson doğrusal ilişkiyi ölçer ve aykırı değerlere duyarlıdır; Spearman sıralara dayanır, monoton ilişkileri yakalar ve dayanıklıdır.",
      "r ≈ 0 yalnız doğrusal ilişkinin yokluğudur; önce grafiğe bak.",
      "cor.test anlamlılığı sınar (H₀: ρ = 0) ve güven aralığı verir; cor(veri, use = 'complete.obs') korelasyon matrisi üretir.",
      "Korelasyon nedensellik değildir; karıştırıcıları kontrol etmek için regresyon ve iyi araştırma tasarımı gerekir.",
    ],
    terimler: [
      ["covariance", "kovaryans", "A measure of how two variables vary together; depends on units."],
      ["Pearson correlation coefficient", "Pearson korelasyon katsayısı", "A standardized measure of linear association between −1 and +1."],
      ["Spearman rank correlation", "Spearman sıra korelasyonu", "The Pearson correlation of the ranks; measures monotonic association."],
      ["linear relationship", "doğrusal ilişki", "A relationship that can be described by a straight line."],
      ["monotonic relationship", "monoton ilişki", "A relationship in which one variable consistently increases (or decreases) as the other increases."],
      ["correlation matrix", "korelasyon matrisi", "A table of pairwise correlations among several variables."],
      ["cor.test()", "cor.test()", "Tests whether a correlation is significantly different from zero."],
      ["multicollinearity", "çoklu doğrusal bağlantı", "Strong correlation among explanatory variables in a regression."],
    ],
    quiz: [
      { s: "A correlation of r = −0.85 indicates:", c: ["A weak positive relationship", "A strong negative linear relationship", "No relationship", "A causal relationship"], d: 1, a: "|r| büyük ve işaret negatif: güçlü negatif doğrusal ilişki." },
      { s: "Why is the correlation coefficient preferred to covariance for interpretation?", c: ["It is always positive", "It is unit-free and bounded between −1 and 1", "It measures causation", "It ignores outliers"], d: 1, a: "Kovaryans birimlere bağlıdır; r standartlaştırılmıştır." },
      { s: "Two variables have a strong U-shaped relationship. Pearson's r is likely to be:", c: ["Close to +1", "Close to −1", "Close to 0", "Undefined"], d: 2, a: "Pearson yalnız doğrusal ilişkiyi ölçer." },
      { s: "Which correlation is more robust to outliers?", c: ["Pearson", "Spearman", "Both equally", "Neither can be computed with outliers"], d: 1, a: "Spearman sıralara dayanır; uç değerin büyüklüğü önemsizleşir." },
      { s: "For two ordinal variables (e.g., satisfaction levels), the appropriate correlation is:", c: ["Pearson", "Spearman", "Covariance only", "None"], d: 1, a: "Sıralama ölçeğinde sıra korelasyonu uygundur." },
      { s: "`cor.test(x, y)` tests the null hypothesis that:", c: ["x and y have equal means", "The population correlation is zero", "x causes y", "The data are normal"], d: 1, a: "H₀: ρ = 0." },
      { s: "Why use `use = \"complete.obs\"` in cor()?", c: ["To include missing values", "To exclude rows with missing values so correlations aren't NA", "To compute Spearman", "To round the result"], d: 1, a: "NA içeren hesaplar NA döner; eksik satırlar çıkarılır." },
      { s: "In a correlation matrix, the diagonal elements are always:", c: ["0", "1", "−1", "The means"], d: 1, a: "Her değişkenin kendisiyle korelasyonu 1'dir." },
      { s: "A positive correlation between ice-cream sales and drownings is best explained by:", c: ["Causation from ice cream to drowning", "A confounding variable such as temperature", "Measurement error", "A Spearman artifact"], d: 1, a: "Sıcak hava ikisini birden artırır." },
      { s: "In LifeCycleSavings, cor(sr, pop15) ≈ −0.46. The most accurate statement is:", c: ["A larger young population causes lower savings", "Countries with larger young populations tend to have lower savings rates", "There is no relationship", "The relationship is perfectly linear"], d: 1, a: "Gözlemsel veride 'ilişki' denir; nedensellik ek tasarım gerektirir." },
    ],
    alistirmalar: [
      { soru: R`Ankette **uyku_saati** ile **not_ortalamasi** arasındaki Pearson korelasyonunu (eksikleri dışarıda bırakarak) **r_uyku** nesnesine hesapla.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nr_uyku <- ", kontrol: "a <- read.csv('ogrenci_anket.csv'); exists('r_uyku') && abs(r_uyku - cor(a$uyku_saati, a$not_ortalamasi, use = 'complete.obs')) < 1e-12", ipucu: R`\`cor(anket$uyku_saati, anket$not_ortalamasi, use = "complete.obs")\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nr_uyku <- cor(anket$uyku_saati, anket$not_ortalamasi, use = \"complete.obs\")\nr_uyku" },
      { soru: R`**LifeCycleSavings** verisinde **dpi** (kişi başı gelir) ile **sr** (tasarruf oranı) arasındaki korelasyonu sına ve testin sonucunu **test_dpi** nesnesine ata.`, baslangic: "test_dpi <- ", kontrol: "exists('test_dpi') && inherits(test_dpi, 'htest') && abs(test_dpi$estimate - cor(LifeCycleSavings$dpi, LifeCycleSavings$sr)) < 1e-12", ipucu: R`\`cor.test(LifeCycleSavings$dpi, LifeCycleSavings$sr)\``, cozum: "test_dpi <- cor.test(LifeCycleSavings$dpi, LifeCycleSavings$sr)\ntest_dpi" },
      { soru: R`LifeCycleSavings'in **5 değişkeninin** korelasyon matrisini 2 ondalığa yuvarlayıp **km** nesnesine ata. Sonra en güçlü (mutlak değerce) korelasyonu bul: hangi iki değişken?`, baslangic: "km <- \nkm", kontrol: "exists('km') && is.matrix(km) && all(dim(km) == c(5, 5)) && isTRUE(all.equal(km, round(cor(LifeCycleSavings), 2)))", ipucu: R`\`round(cor(LifeCycleSavings), 2)\``, cozum: "km <- round(cor(LifeCycleSavings), 2)\nkm\n# en güçlü ilişki: pop15 ile pop75 (yaklaşık -0.91)", tebrik: "pop15 ile pop75 neredeyse aynı bilgiyi taşıyor: regresyonda ikisini birlikte kullanırken dikkat." },
    ],
  });
})();
