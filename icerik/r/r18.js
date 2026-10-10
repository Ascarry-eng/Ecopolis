// Araştırma Yöntemleri — 18. ders: Çoklu regresyon ve iktisadi modeller (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r18",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Çoklu regresyonda katsayıları 'diğer değişkenler sabitken' (ceteris paribus) yorumlamak",
      "Atlanmış değişken yanlılığını örnekle açıklamak",
      "Kategorik değişkenleri kukla değişken olarak modele katmak ve referans kategoriyi yorumlamak",
      "Log–log ve log–düzey modellerini kurup katsayıları esneklik ve yüzde değişim olarak yorumlamak",
      "Düzeltilmiş R², çoklu doğrusal bağlantı ve model karşılaştırmasını değerlendirmek",
    ],
    bolumler: [
      { baslik: "Çoklu regresyon: ceteris paribus'un istatistiği", md: R`
Gerçek dünyada bir sonucu birçok değişken birlikte etkiler. **Çoklu regresyon** birden çok açıklayıcı değişkeni aynı anda modele katar:

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_k x_k + u$$

En önemli fikir: $\beta_1$, **diğer bütün x'ler sabitken** $x_1$'deki bir birimlik artışın y ile ilişkisidir. Colander'ın her bölümde tekrarladığı **"diğer şeyler sabitken" (ceteris paribus)** varsayımının veri karşılığı budur. Laboratuvarda deney yapamayan iktisatçı, diğer etkenleri istatistiksel olarak "sabit tutar".

Yaşam döngüsü modelinin tam sürümü:

${K}r
m4 <- lm(sr ~ pop15 + pop75 + dpi + ddpi, data = LifeCycleSavings)
summary(m4)
${K}

Yorum:
- **pop15:** yaşlı nüfus payı, gelir ve gelir büyümesi sabitken, genç nüfus payı 1 puan yüksek olan ülkelerde tasarruf oranı yaklaşık **0.46 puan** daha düşük — basit regresyondaki 0.22'nin iki katı!
- **ddpi:** diğerleri sabitken gelir büyümesi 1 puan yüksek ülkelerde tasarruf oranı ~0.41 puan daha yüksek (p ≈ 0.04).
- **pop75** ve **dpi** bu modelde %5 düzeyinde anlamlı değil.

pop15'in katsayısı neden değişti? Çünkü basit regresyonda pop15, modele alınmamış ama onunla ilişkili değişkenlerin (özellikle pop75, korelasyon −0.91) etkisini de "üstleniyordu".
` },
      { baslik: "Atlanmış değişken yanlılığı", md: R`
:::tanim Omitted variable bias
The bias in a regression coefficient that arises when a variable that affects the dependent variable and is correlated with an included explanatory variable is left out of the model.
:::

İki koşul birlikte sağlanırsa yanlılık oluşur: atlanan değişken (1) y'yi etkiler ve (2) modeldeki x ile ilişkilidir. O zaman x'in katsayısı, atlanan değişkenin etkisinin bir kısmını da taşır.

Öğrenci verisinde bunu görelim. Yarı zamanlı çalışmanın not ortalamasıyla ilişkisi:

${K}r
anket <- read.csv("ogrenci_anket.csv")
anket$calisiyor_mu <- factor(anket$calisiyor_mu, levels = c("Hayır", "Evet"))

m_basit <- lm(not_ortalamasi ~ calisiyor_mu, data = anket)
m_kontrol <- lm(not_ortalamasi ~ calisiyor_mu + calisma_saati, data = anket)
coef(m_basit)
coef(m_kontrol)
${K}

Basit modelde çalışan öğrencilerin notu ~0.44 puan düşük görünüyor. Haftalık çalışma süresini kontrol edince fark ~0.15'e iniyor. Neden? Çalışan öğrenciler derse daha az zaman ayırıyor ve ders çalışma süresi notu güçlü biçimde etkiliyor: basit model bu kanalı da "işin etkisi" sanıyordu.

:::ipucu
Hangisi "doğru" katsayı? Soruna bağlı. "Çalışmanın nota **toplam** etkisi" (ders süresini azaltması dahil) soruluyorsa basit model; "aynı süre ders çalışan iki öğrenciden biri işte çalışıyorsa fark ne?" soruluyorsa kontrollü model. Kontrol değişkeni eklemek her zaman iyi değildir: x'in **sonucu** olan bir değişkeni kontrol etmek (aracı değişken), aradığın etkiyi gizleyebilir.
:::
` },
      { baslik: "Kukla değişkenler", md: R`
Kategorik değişkenler regresyona **kukla (dummy) değişkenlerle** girer: bir kategoriye ait olunca 1, değilse 0. R bunu faktörler için otomatik yapar.

- k kategorili bir değişken için **k − 1** kukla oluşturulur; dışarıda kalan kategori **referans (temel) kategoridir**.
- Her kuklanın katsayısı, o kategorinin **referansa göre** farkıdır (diğer değişkenler sabitken).

${K}r
anket$sehir <- factor(anket$sehir)
levels(anket$sehir)                     # ilk düzey referans: Ankara
m_sehir <- lm(not_ortalamasi ~ calisma_saati + sehir, data = anket)
round(coef(m_sehir), 3)

anket$sehir <- relevel(anket$sehir, ref = "İstanbul")   # referansı değiştir
round(coef(lm(not_ortalamasi ~ calisma_saati + sehir, data = anket)), 3)
${K}

"sehirİzmir" katsayısı, çalışma süresi sabitken İzmirli öğrencilerin notunun referans şehirdekilerden ortalama ne kadar farklı olduğudur.

:::dikkat
**Kukla değişken tuzağı:** bütün kategoriler için kukla ve sabit terimi birlikte modele koyamazsın (mükemmel doğrusal bağlantı). R bunu faktörlerde otomatik önler; kuklaları elle oluşturuyorsan birini dışarıda bırakmayı unutma.
:::
` },
      { baslik: "Log modeller ve esneklik", md: R`
İktisatta değişkenler çoğu zaman **logaritmayla** modele girer. Katsayıların yorumu değişir:

| Model | Biçim | $\beta_1$'in yorumu |
|---|---|---|
| Düzey–düzey | $y = \beta_0 + \beta_1 x$ | x 1 birim ↑ → y $\beta_1$ birim |
| Log–düzey | $\ln y = \beta_0 + \beta_1 x$ | x 1 birim ↑ → y yaklaşık %$100\beta_1$ |
| Düzey–log | $y = \beta_0 + \beta_1 \ln x$ | x %1 ↑ → y $\beta_1/100$ birim |
| **Log–log** | $\ln y = \beta_0 + \beta_1 \ln x$ | x %1 ↑ → y %$\beta_1$: **esneklik** |

Log–log modelin katsayısı doğrudan **esnekliktir** — Mikroekonomi 6. bölümdeki fiyat esnekliği ve Matematik 10. haftadaki $\varepsilon = \dfrac{d\ln Q}{d\ln P}$ formülü burada buluşur.

### Bir talep eğrisi tahmin edelim
Fiyat esnekliği −1.5 olan bir mal için 200 gözlemlik yapay pazar verisi üretelim ve esnekliği veriden geri bulmaya çalışalım:

${K}r
set.seed(2026)
P <- runif(200, 10, 60)                                   # fiyat
Q <- 5000 * P^(-1.5) * exp(rnorm(200, mean = 0, sd = 0.15))   # sabit esneklikli talep + gürültü
talep <- lm(log(Q) ~ log(P))
coef(talep)
confint(talep)["log(P)", ]
plot(log(P), log(Q), pch = 19, col = "steelblue", main = "Log–log talep: eğim = esneklik")
abline(talep, col = "firebrick", lwd = 2)
${K}

Tahmin edilen eğim −1.5'e çok yakın: talep **esnek** (|ε| > 1). Fiyat %1 artınca talep miktarı yaklaşık %1.5 düşüyor.

:::dikkat
Gerçek piyasa verisinde talep esnekliğini böyle tahmin etmek bu kadar kolay değildir: gözlenen fiyat–miktar noktaları hem arz hem talep kaymalarının sonucudur (**eşanlılık / tanımlama sorunu**). Bu yüzden ekonometrik talep tahmini araç değişkenler gibi ileri yöntemler gerektirir — ileriki derslerin konusu.
:::
` },
      { baslik: "Model değerlendirme", md: R`
### Düzeltilmiş R²
Modele değişken ekledikçe R² **asla düşmez** — anlamsız değişkenler bile onu biraz artırır. **Düzeltilmiş R²**, gereksiz değişken eklemeyi cezalandırır:

${K}r
m1 <- lm(sr ~ pop15, data = LifeCycleSavings)
c(R2 = summary(m1)$r.squared, duzR2 = summary(m1)$adj.r.squared)
c(R2 = summary(m4)$r.squared, duzR2 = summary(m4)$adj.r.squared)
anova(m1, m4)        # ek değişkenler birlikte anlamlı mı? (F testi)
${K}

### Çoklu doğrusal bağlantı
Açıklayıcı değişkenler birbiriyle çok güçlü ilişkiliyse (pop15 ve pop75 gibi, r = −0.91), model ikisinin **ayrı** etkilerini ayırt etmekte zorlanır: standart hatalar büyür, katsayılar oynaklaşır. Modelin bütünü iyi tahmin edebilir ama tek tek katsayılar güvenilmez olur. Belirtileri: anlamlı bir F testi ama anlamsız tek tek t testleri; bir değişkeni ekleyip çıkarınca katsayıların sert değişmesi.

### İyi bir regresyon raporu
- Modeli ve değişkenleri (birimleriyle) tanımla.
- Katsayıları, standart hataları ya da güven aralıklarını, n'yi ve R²'yi bir **tabloda** ver.
- Katsayıları **ceteris paribus** ve **birimleriyle** yorumla.
- Nedensellik iddiasını tasarımın izin verdiği kadar yap; olası atlanmış değişkenleri ve sınırlılıkları tartış.
` },
    ],
    ozet: [
      "Çoklu regresyonda katsayı, diğer değişkenler sabitken (ceteris paribus) o değişkenin y ile ilişkisidir.",
      "Atlanmış değişken yanlılığı: y'yi etkileyen ve x ile ilişkili bir değişken dışarıda kalırsa x'in katsayısı yanlı olur. Aracı değişkenleri kontrol etmek ise toplam etkiyi gizler.",
      "Kategorik değişkenler k − 1 kukla ile girer; katsayılar referans kategoriye göre farktır (relevel ile referans değişir).",
      "Log–log modelde eğim esnekliktir; log–düzeyde 100·β yüzde değişimdir. Gerçek talep tahmininde tanımlama sorununa dikkat.",
      "Düzeltilmiş R² gereksiz değişkeni cezalandırır; anova ile iç içe modeller karşılaştırılır; çoklu doğrusal bağlantı standart hataları şişirir.",
    ],
    terimler: [
      ["multiple regression", "çoklu regresyon", "A regression with two or more explanatory variables."],
      ["ceteris paribus", "diğer şeyler sabitken", "Holding all other variables constant."],
      ["omitted variable bias", "atlanmış değişken yanlılığı", "Bias in a coefficient caused by leaving out a variable that affects y and is correlated with an included x."],
      ["mediator", "aracı değişken", "A variable through which x affects y; controlling for it removes part of x's total effect."],
      ["dummy variable", "kukla değişken", "A variable equal to 1 for a category and 0 otherwise."],
      ["reference category", "referans (temel) kategori", "The category left out when creating dummies; other coefficients are relative to it."],
      ["dummy variable trap", "kukla değişken tuzağı", "Perfect collinearity from including all category dummies together with an intercept."],
      ["log-log model", "log–log model", "A regression of ln y on ln x; the slope is an elasticity."],
      ["elasticity", "esneklik", "The percentage change in one variable associated with a 1% change in another."],
      ["adjusted R-squared", "düzeltilmiş R²", "R² adjusted for the number of explanatory variables."],
      ["multicollinearity", "çoklu doğrusal bağlantı", "High correlation among explanatory variables, inflating standard errors."],
      ["identification problem", "tanımlama sorunu", "The difficulty of separating demand from supply when observed prices and quantities are joint outcomes."],
    ],
    quiz: [
      { s: "In a multiple regression of y on x₁ and x₂, the coefficient on x₁ measures:", c: ["The total correlation between x₁ and y", "The change in y associated with a one-unit change in x₁, holding x₂ constant", "The effect of x₂ on x₁", "The R²"], d: 1, a: "Çoklu regresyonda katsayı ceteris paribus yorumlanır." },
      { s: "Omitted variable bias occurs when the omitted variable:", c: ["Is uncorrelated with everything", "Affects y and is correlated with an included explanatory variable", "Is categorical", "Has missing values"], d: 1, a: "İki koşul birlikte: y'yi etkilemek ve x ile ilişkili olmak." },
      { s: "The coefficient on part-time work fell from about −0.44 to −0.15 after controlling for study hours. This suggests:", c: ["Study hours are irrelevant", "Part of the simple association works through reduced study time", "The data are wrong", "Work raises grades"], d: 1, a: "Çalışmak ders süresini azaltıyor; basit model bu kanalı da içeriyordu." },
      { s: "A categorical variable with 5 categories enters a regression (with an intercept) as how many dummy variables?", c: ["5", "4", "1", "10"], d: 1, a: "k − 1 = 4; biri referans kategori olarak dışarıda kalır." },
      { s: "The coefficient on a dummy variable 'sehirİzmir' is interpreted as:", c: ["The mean GPA in İzmir", "The difference between İzmir and the reference city, holding other variables constant", "The number of students from İzmir", "The effect of all cities"], d: 1, a: "Kukla katsayısı referansa göre farktır." },
      { s: "In the model ln(Q) = β₀ + β₁ ln(P), β₁ = −1.5 means:", c: ["A 1-unit price rise lowers Q by 1.5 units", "A 1% price rise is associated with a 1.5% fall in quantity (elasticity −1.5)", "Q falls by 150%", "Demand is inelastic"], d: 1, a: "Log–log modelde eğim esnekliktir; |−1.5| > 1 esnek." },
      { s: "In ln(y) = β₀ + β₁x, β₁ = 0.05 means a one-unit increase in x is associated with approximately:", c: ["A 0.05-unit increase in y", "A 5% increase in y", "A 0.05% increase in y", "A 50% increase in y"], d: 1, a: "Log–düzey: 100·β₁ ≈ yüzde değişim." },
      { s: "Adding an irrelevant variable to a regression will:", c: ["Always lower R²", "Never lower R², but can lower adjusted R²", "Always raise adjusted R²", "Change nothing"], d: 1, a: "R² düşmez; düzeltilmiş R² gereksiz değişkeni cezalandırır." },
      { s: "A significant overall F test but individually insignificant t tests on two highly correlated regressors suggests:", c: ["Heteroskedasticity", "Multicollinearity", "Perfect fit", "Omitted variable bias"], d: 1, a: "Çoklu doğrusal bağlantı ayrı etkileri ayırt etmeyi zorlaştırır." },
      { s: "Which R function changes the reference category of a factor?", c: ["levels()", "relevel()", "factor.ref()", "contrasts.set()"], d: 1, a: "relevel(f, ref = \"İstanbul\")." },
    ],
    alistirmalar: [
      { soru: R`Ankette **not_ortalamasi**'nı **calisma_saati**, **uyku_saati** ve **calisiyor_mu** ile açıklayan çoklu regresyonu kur ve **m_tam** nesnesine ata.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nm_tam <- \nsummary(m_tam)", kontrol: "exists('m_tam') && inherits(m_tam, 'lm') && all(c('calisma_saati', 'uyku_saati') %in% names(coef(m_tam))) && any(grepl('calisiyor_mu', names(coef(m_tam))))", ipucu: R`\`lm(not_ortalamasi ~ calisma_saati + uyku_saati + calisiyor_mu, data = anket)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nm_tam <- lm(not_ortalamasi ~ calisma_saati + uyku_saati + calisiyor_mu, data = anket)\nsummary(m_tam)" },
      { soru: R`**mtcars** verisinde yakıt verimliliğinin (**mpg**) beygir gücüne (**hp**) esnekliğini tahmin et: log–log modeli kur, **eğimi** **esneklik** nesnesine ata.`, baslangic: "m <- lm(log(mpg) ~ log(hp), data = mtcars)\nesneklik <- ", kontrol: "exists('esneklik') && abs(esneklik - coef(lm(log(mpg) ~ log(hp), data = mtcars))[[2]]) < 1e-9", ipucu: R`\`coef(m)[2]\``, cozum: "m <- lm(log(mpg) ~ log(hp), data = mtcars)\nesneklik <- coef(m)[2]\nesneklik", tebrik: "Beygir gücü %1 artınca yakıt verimliliği yaklaşık %0.5 düşüyor." },
      { soru: R`LifeCycleSavings'te önce yalnız **pop15** ile, sonra **pop15 + pop75 + dpi + ddpi** ile iki model kur. İkinci modelin **düzeltilmiş R²**'sini **duz_r2** nesnesine ata.`, baslangic: "m1 <- lm(sr ~ pop15, data = LifeCycleSavings)\nm4 <- \nduz_r2 <- ", kontrol: "exists('duz_r2') && abs(duz_r2 - summary(lm(sr ~ pop15 + pop75 + dpi + ddpi, data = LifeCycleSavings))$adj.r.squared) < 1e-9", ipucu: R`\`summary(m4)$adj.r.squared\``, cozum: "m1 <- lm(sr ~ pop15, data = LifeCycleSavings)\nm4 <- lm(sr ~ pop15 + pop75 + dpi + ddpi, data = LifeCycleSavings)\nduz_r2 <- summary(m4)$adj.r.squared\nduz_r2\nanova(m1, m4)" },
    ],
  });
})();
