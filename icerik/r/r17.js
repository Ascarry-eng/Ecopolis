// Araştırma Yöntemleri — 17. ders: Basit doğrusal regresyon (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r17",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Basit doğrusal regresyon modelini ve en küçük kareler yöntemini açıklamak",
      "lm() ile model kurmak; katsayıları birimleriyle yorumlamak",
      "summary() çıktısını okumak: tahmin, standart hata, t, p, R²",
      "predict() ile tahmin yapmak; dışdeğerleme tehlikesini bilmek",
      "Artıkları incelemek ve modelin varsayımlarını kontrol etmek",
    ],
    bolumler: [
      { baslik: "Model ve en küçük kareler", md: R`
Korelasyon ilişkinin gücünü söyler; **regresyon** ise ilişkinin **biçimini**: x bir birim artınca y ortalama ne kadar değişir?

**Basit doğrusal regresyon modeli:**

$$y_i = \beta_0 + \beta_1 x_i + u_i$$

- $\beta_0$: **kesişim** (x = 0 iken y'nin beklenen değeri),
- $\beta_1$: **eğim** (x bir birim artınca y'deki ortalama değişim),
- $u_i$: **hata terimi** — modelin açıklamadığı her şey.

Katsayıları veriden tahmin ederiz ($b_0$, $b_1$). **En küçük kareler (ordinary least squares, OLS / EKK)** yöntemi, gözlenen y ile doğrunun tahmini $\hat y$ arasındaki farkların — **artıkların (residuals)** — **karelerinin toplamını** en küçük yapan doğruyu seçer:

$$\min_{b_0, b_1} \sum (y_i - b_0 - b_1 x_i)^2 \quad\Rightarrow\quad b_1 = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2}, \quad b_0 = \bar y - b_1 \bar x$$

(Bu, Matematik dersinin 11. haftasındaki optimizasyonun bir uygulamasıdır: türevi sıfıra eşitleyip çözersin.)

Noktaları sürükle; kendi doğrunla EKK doğrusunu yenmeye çalış:

{{regresyon}}
` },
      { baslik: "lm() ile ilk model: yaşam döngüsü hipotezi", md: R`
Modigliani'nin **yaşam döngüsü hipotezi**: insanlar çalışma yıllarında tasarruf eder, gençken ve yaşlıyken tüketir. O hâlde **genç nüfus payı yüksek** ülkelerde toplam tasarruf oranı **düşük** olmalı. LifeCycleSavings verisiyle sınayalım:

${K}r
model <- lm(sr ~ pop15, data = LifeCycleSavings)
model
${K}

Formül \`y ~ x\` "y'yi x ile açıkla" demektir. Sonuç:

$$\widehat{sr} \approx 17.50 - 0.22 \cdot pop15$$

**Yorum (birimleriyle!):** 15 yaş altı nüfus payı **1 puan** yüksek olan ülkelerde tasarruf oranı **ortalama 0.22 puan** daha düşüktür. Kesişim (17.5), genç nüfusu %0 olan varsayımsal bir ülkenin tasarruf oranıdır — verinin çok dışında olduğu için anlamlı bir yorumu yoktur.

${K}r
plot(LifeCycleSavings$pop15, LifeCycleSavings$sr, pch = 19, col = "steelblue",
     xlab = "15 yaş altı nüfus (%)", ylab = "Tasarruf oranı (%)",
     main = "Yaşam döngüsü: genç nüfus ve tasarruf")
abline(model, col = "firebrick", lwd = 2)
${K}
` },
      { baslik: "summary() çıktısını okumak", md: R`
${K}r
summary(model)
${K}

Çıktının parçaları:

| Bölüm | Ne söyler |
|---|---|
| **Residuals** | artıkların dağılımı (simetrik ve 0 civarında olmalı) |
| **Estimate** | katsayı tahminleri $b_0$, $b_1$ |
| **Std. Error** | katsayının standart hatası (belirsizliği) |
| **t value** | Estimate / Std. Error: H₀: β = 0 için test istatistiği |
| **Pr(>\|t\|)** | p-değeri; yıldızlar anlamlılık düzeyini gösterir |
| **Residual standard error** | tahminlerin tipik sapması (y biriminde) |
| **Multiple R-squared** | modelin açıkladığı varyans payı |
| **F-statistic** | modelin bir bütün olarak anlamlılığı |

### R² (belirlilik katsayısı)
$$R^2 = 1 - \frac{\sum (y_i - \hat y_i)^2}{\sum (y_i - \bar y)^2}$$

Burada $R^2 \approx 0.21$: genç nüfus payı, ülkeler arası tasarruf oranı farklılıklarının yaklaşık **%21'ini** açıklıyor. Basit regresyonda $R^2 = r^2$ (korelasyonun karesi: $(-0.46)^2 \approx 0.21$).

:::dikkat
Düşük R² modeli "değersiz" yapmaz: iktisatta bireysel davranışı açıklayan modellerde R² genellikle düşüktür ama eğim yine de anlamlı ve önemli olabilir. Tersine yüksek R², nedensellik ya da doğru model demek değildir (iki zaman serisi sahte biçimde %95 R² verebilir).
:::

Katsayılara ve güven aralıklarına doğrudan erişim:

${K}r
coef(model)
confint(model)        # katsayıların %95 güven aralıkları
summary(model)$r.squared
${K}
` },
      { baslik: "Tahmin ve dışdeğerleme", md: R`
\`predict()\` yeni x değerleri için $\hat y$ üretir:

${K}r
yeni <- data.frame(pop15 = c(25, 35, 45))
predict(model, newdata = yeni)
predict(model, newdata = yeni, interval = "prediction")   # tek bir ülke için tahmin aralığı
${K}

:::dikkat
**Dışdeğerleme (extrapolation):** modeli verinin aralığı dışında kullanmak tehlikelidir. Verideki pop15 yaklaşık 21 ile 48 arasında; pop15 = 80 için tahmin yapmak, doğrusal ilişkinin o bölgede de geçerli olduğunu varsaymaktır — kanıtımız yok.
:::

### Öğrenci verisiyle
${K}r
anket <- read.csv("ogrenci_anket.csv")
m2 <- lm(not_ortalamasi ~ calisma_saati, data = anket)
summary(m2)$coefficients
predict(m2, data.frame(calisma_saati = c(5, 15, 25)))
${K}

Haftada bir saat fazla çalışmak not ortalamasıyla yaklaşık ne kadar ilişkili? (Sentetik veri: bu "gerçek dünya" bulgusu değil.)
` },
      { baslik: "Artıklar ve varsayımlar", md: R`
EKK tahminlerinin iyi özellikler taşıması (yansız, doğru standart hatalar) bazı varsayımlara dayanır:

1. **Doğrusallık:** ilişki gerçekten doğrusal.
2. **Bağımsızlık:** gözlemler birbirinden bağımsız.
3. **Sabit varyans (homoskedastisite):** artıkların yayılımı x'e göre değişmiyor.
4. **Normallik:** artıklar yaklaşık normal (küçük örneklemlerde testler için önemli).
5. Ve en önemlisi nedensel yorum için: **hata terimi x ile ilişkisiz** — atlanmış bir karıştırıcı yok (18. ders).

Artık grafikleri bu varsayımları gözle kontrol etmenin yoludur:

${K}r
par(mfrow = c(1, 2))
plot(fitted(model), resid(model), pch = 19, col = "steelblue",
     xlab = "Tahmin edilen sr", ylab = "Artık", main = "Artıklar ~ tahmin")
abline(h = 0, lty = 2)
qqnorm(resid(model), pch = 19, col = "steelblue"); qqline(resid(model))
par(mfrow = c(1, 1))
${K}

- Soldaki grafikte artıklar 0 çevresinde **rastgele** dağılmalı; huni biçimi sabit olmayan varyansa, eğri biçim doğrusal olmayan ilişkiye işaret eder.
- Sağdaki Q–Q grafiğinde noktalar çizgiye yakınsa artıklar yaklaşık normaldir.

RStudio'da \`plot(model)\` dört tanı grafiğini birden verir.
` },
    ],
    ozet: [
      "Model y = β₀ + β₁x + u; EKK artık karelerinin toplamını en küçükler: b₁ = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)², b₀ = ȳ − b₁x̄.",
      "lm(y ~ x, data = …); eğim: x bir birim artınca y'deki ortalama değişim — birimleriyle yorumla.",
      "summary(): Estimate, Std. Error, t, p, R², F. Basit regresyonda R² = r². Düşük R² eğimi değersiz yapmaz; yüksek R² nedensellik değildir.",
      "predict(model, newdata) tahmin üretir; verinin aralığı dışında dışdeğerleme yapma.",
      "Varsayımlar: doğrusallık, bağımsızlık, sabit varyans, normallik, hatanın x ile ilişkisizliği; artık grafikleriyle kontrol et.",
      "LifeCycleSavings: sr ≈ 17.5 − 0.22·pop15 (R² ≈ 0.21): genç nüfuslu ülkelerde tasarruf daha düşük.",
    ],
    terimler: [
      ["regression analysis", "regresyon analizi", "Estimating how a dependent variable changes with one or more explanatory variables."],
      ["simple linear regression", "basit doğrusal regresyon", "A regression with one explanatory variable: y = β₀ + β₁x + u."],
      ["intercept", "kesişim (sabit terim)", "The expected value of y when x equals zero."],
      ["slope coefficient", "eğim katsayısı", "The expected change in y for a one-unit increase in x."],
      ["error term", "hata terimi", "The part of y not explained by the model."],
      ["ordinary least squares (OLS)", "en küçük kareler (EKK)", "The method that chooses coefficients to minimize the sum of squared residuals."],
      ["residual", "artık", "The difference between an observed value and its fitted value: y − ŷ."],
      ["fitted value", "tahmin edilen değer", "The value of y predicted by the model, ŷ."],
      ["R-squared", "belirlilik katsayısı (R²)", "The share of the variance of y explained by the model."],
      ["standard error of a coefficient", "katsayının standart hatası", "A measure of the uncertainty of a coefficient estimate."],
      ["extrapolation", "dışdeğerleme", "Using a model to predict outside the range of the observed data."],
      ["homoskedasticity", "sabit varyans (homoskedastisite)", "Residuals have constant variance across values of x."],
      ["Q–Q plot", "Q–Q grafiği", "A plot comparing the quantiles of residuals with those of a normal distribution."],
    ],
    quiz: [
      { s: "OLS chooses the regression line that minimizes:", c: ["The sum of residuals", "The sum of squared residuals", "The largest residual", "The correlation"], d: 1, a: "Artıkların karelerinin toplamı en küçüklenir." },
      { s: "In `lm(sr ~ pop15, data = LifeCycleSavings)`, the dependent variable is:", c: ["pop15", "sr", "LifeCycleSavings", "lm"], d: 1, a: "Formülde ~ işaretinin solundaki bağımlı değişkendir." },
      { s: "The estimated model is sr = 17.5 − 0.22·pop15. The slope means:", c: ["Savings fall by 17.5 points", "A 1-point higher under-15 population share is associated with a 0.22-point lower savings rate, on average", "pop15 causes a 22% fall in savings", "Savings are 0.22 when pop15 is zero"], d: 1, a: "Eğim: x'te bir birimlik artışla y'deki ortalama değişim; 'ilişkili' de." },
      { s: "In simple regression, R² equals:", c: ["r", "r²", "The slope", "1 − r"], d: 1, a: "Tek açıklayıcıda R² korelasyonun karesidir." },
      { s: "R² = 0.21 means the model:", c: ["Is wrong", "Explains about 21% of the variance of y", "Has a slope of 0.21", "Is 21% likely to be true"], d: 1, a: "Açıklanan varyans payı." },
      { s: "In summary(lm), the t value for a coefficient equals:", c: ["Estimate × Std. Error", "Estimate / Std. Error", "R² / n", "The p-value"], d: 1, a: "t = tahmin / standart hata; H₀: β = 0 için." },
      { s: "Which function produces predictions for new x values?", c: ["coef()", "predict()", "resid()", "confint()"], d: 1, a: "predict(model, newdata = …)." },
      { s: "Using a model estimated on pop15 values between 21 and 48 to predict for pop15 = 80 is:", c: ["Interpolation", "Extrapolation, which is risky", "Always accurate", "Required by OLS"], d: 1, a: "Veri aralığının dışı: dışdeğerleme." },
      { s: "A funnel-shaped pattern in a residuals-vs-fitted plot suggests:", c: ["Normal residuals", "Non-constant variance (heteroskedasticity)", "Perfect fit", "No relationship"], d: 1, a: "Artık yayılımının değişmesi sabit varyans varsayımını ihlal eder." },
      { s: "Which formula gives the OLS intercept?", c: ["b₀ = ȳ − b₁x̄", "b₀ = x̄ − b₁ȳ", "b₀ = r·s_y", "b₀ = Σy/Σx"], d: 0, a: "Doğru (x̄, ȳ) noktasından geçer: b₀ = ȳ − b₁x̄." },
    ],
    alistirmalar: [
      { soru: R`Ankette **not_ortalamasi**'nı **uyku_saati** ile açıklayan bir model kur ve **m_uyku** nesnesine ata.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nm_uyku <- \nsummary(m_uyku)", kontrol: "exists('m_uyku') && inherits(m_uyku, 'lm') && identical(names(coef(m_uyku)), c('(Intercept)', 'uyku_saati'))", ipucu: R`\`lm(not_ortalamasi ~ uyku_saati, data = anket)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nm_uyku <- lm(not_ortalamasi ~ uyku_saati, data = anket)\nsummary(m_uyku)" },
      { soru: R`LifeCycleSavings'te tasarruf oranını (**sr**) gelirin büyüme hızıyla (**ddpi**) açıklayan modeli kur. **Eğimi** **egim** nesnesine, **R²**'yi **r2** nesnesine ata.`, baslangic: "m <- lm(sr ~ ddpi, data = LifeCycleSavings)\negim <- \nr2 <- ", kontrol: "mm <- lm(sr ~ ddpi, data = LifeCycleSavings); exists('egim') && exists('r2') && abs(egim - coef(mm)[[2]]) < 1e-9 && abs(r2 - summary(mm)$r.squared) < 1e-9", ipucu: R`\`coef(m)[2]\` ve \`summary(m)$r.squared\``, cozum: "m <- lm(sr ~ ddpi, data = LifeCycleSavings)\negim <- coef(m)[2]\nr2 <- summary(m)$r.squared\nc(egim, r2)", tebrik: "Gelir büyümesi hızlı ülkelerde tasarruf oranı daha yüksek: yaşam döngüsü kuramının bir başka öngörüsü." },
      { soru: R`EKK eğimini **lm kullanmadan**, formülle hesapla: $b_1 = \dfrac{\sum (x - \bar x)(y - \bar y)}{\sum (x - \bar x)^2}$. x = pop15, y = sr. Sonucu **b1** nesnesine ata (lm'in verdiğiyle aynı olmalı).`, baslangic: "x <- LifeCycleSavings$pop15\ny <- LifeCycleSavings$sr\nb1 <- ", kontrol: "exists('b1') && abs(b1 - coef(lm(sr ~ pop15, data = LifeCycleSavings))[[2]]) < 1e-9", ipucu: R`\`sum((x - mean(x)) * (y - mean(y))) / sum((x - mean(x))^2)\` — ya da \`cov(x, y) / var(x)\`.`, cozum: "x <- LifeCycleSavings$pop15\ny <- LifeCycleSavings$sr\nb1 <- sum((x - mean(x)) * (y - mean(y))) / sum((x - mean(x))^2)\nb1", tebrik: "lm() bu formülü senin için hesaplıyor." },
    ],
  });
})();
