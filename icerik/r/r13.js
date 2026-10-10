// Araştırma Yöntemleri — 13. ders: Olasılık dağılımları ve simülasyon (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r13",
    hedefler: [
      "Rastgele değişken ve olasılık dağılımı kavramlarını açıklamak",
      "Normal dağılımla olasılık ve yüzdelik hesaplamak (dnorm, pnorm, qnorm); z puanını yorumlamak",
      "Binom dağılımıyla başarı sayısı olasılıklarını hesaplamak",
      "set.seed, sample, rnorm ve replicate ile tekrarlanabilir simülasyonlar yapmak",
      "Merkezi limit teoremini simülasyonla göstermek ve önemini açıklamak",
    ],
    bolumler: [
      { baslik: "Rastgele değişkenler ve dağılımlar", md: R`
**Rastgele değişken (random variable)**, değeri bir şans sürecinin sonucuna bağlı olan değişkendir: zar atışı, rastgele seçilen bir öğrencinin notu, yarınki kur.

**Olasılık dağılımı (probability distribution)**, rastgele değişkenin hangi değerleri hangi olasılıklarla aldığını söyler:

- **Kesikli** değişkenlerde her değerin bir olasılığı vardır (zarın 6 gelme olasılığı 1/6).
- **Sürekli** değişkenlerde tek bir değerin olasılığı sıfırdır; olasılık bir **aralık** için, yoğunluk eğrisinin altındaki **alan** olarak hesaplanır. (Matematik dersindeki belirli integral!)

R'da her dağılım için dört işlev ailesi vardır; adın başındaki harf ne yaptığını söyler:

| Önek | İş | Normal dağılım örneği |
|---|---|---|
| **d** | yoğunluk / olasılık (density) | \`dnorm(x)\` |
| **p** | birikimli olasılık P(X ≤ x) | \`pnorm(x)\` |
| **q** | yüzdelik (quantile) — p'nin tersi | \`qnorm(p)\` |
| **r** | rastgele sayı üret (random) | \`rnorm(n)\` |

Aynı mantık binom (\`dbinom\`, \`pbinom\`…), tekdüze (\`dunif\`…), t (\`dt\`, \`pt\`…), ki-kare (\`dchisq\`…) için de geçerlidir.
` },
      { baslik: "Normal dağılım", md: R`
**Normal dağılım** çan biçimli, simetrik bir dağılımdır ve iki parametreyle tanımlanır: ortalama $\mu$ ve standart sapma $\sigma$. Boy, ölçüm hataları, birçok testin puanları yaklaşık normaldir; daha da önemlisi, örnek ortalamaları normal dağılıma yaklaşır (aşağıda).

{{normal-dagilim}}

### R ile hesap
Sınav notları $\mu = 70$, $\sigma = 10$ ile normal dağılıyorsa:

${K}r
pnorm(85, mean = 70, sd = 10)                # P(X ≤ 85)
1 - pnorm(85, mean = 70, sd = 10)            # P(X > 85)
pnorm(80, 70, 10) - pnorm(60, 70, 10)        # P(60 < X < 80): μ ± 1σ
qnorm(0.90, mean = 70, sd = 10)              # en iyi %10'a girmek için gereken not
dnorm(70, 70, 10)                             # tepe noktasındaki yoğunluk (olasılık DEĞİL)
${K}

### z puanı ve standart normal
**z puanı**, bir değerin ortalamadan kaç standart sapma uzakta olduğunu söyler: $z = \dfrac{x - \mu}{\sigma}$. z puanları ortalaması 0, standart sapması 1 olan **standart normal** dağılıma uyar ve farklı ölçeklerdeki değerleri karşılaştırmayı sağlar.

${K}r
z <- (85 - 70) / 10
z
pnorm(z)          # standart normalde aynı olasılık
qnorm(0.975)      # %95 güven aralıklarındaki ünlü 1.96
${K}

:::ipucu
**68–95–99.7 kuralını** ezberle: normal dağılımda verinin yaklaşık %68'i μ ± 1σ, %95'i μ ± 2σ (tam olarak ±1.96σ), %99.7'si μ ± 3σ içindedir. Bir değerin z puanı 3'ü aşıyorsa çok sıra dışıdır.
:::
` },
      { baslik: "Binom dağılımı", md: R`
**Binom dağılımı**, birbirinden bağımsız ve her birinin başarı olasılığı $p$ olan $n$ denemede **başarı sayısının** dağılımıdır. Yazı–tura, bir ürün partisindeki kusurlu sayısı, rastgele seçilen 20 kişiden kaçının bir ürünü tercih ettiği.

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

${K}r
dbinom(5, size = 10, prob = 0.5)     # 10 atışta tam 5 tura
pbinom(3, size = 10, prob = 0.5)     # en fazla 3 tura
1 - pbinom(7, size = 10, prob = 0.5) # 8 ya da daha fazla
barplot(dbinom(0:10, 10, 0.5), names.arg = 0:10, col = "steelblue",
        main = "10 yazı-turada tura sayısı", xlab = "Tura sayısı", ylab = "Olasılık")
${K}

:::ornek Kalite kontrol
Bir fabrikanın ürettiği ampullerin %3'ü kusurlu. 50'lik bir kutuda **en az 3** kusurlu ampul bulunma olasılığı nedir?
---cozum---
$X \sim \text{Binom}(n = 50, p = 0.03)$. "En az 3" = 1 − "en fazla 2":

\`1 - pbinom(2, size = 50, prob = 0.03)\` ≈ **0.19**. Yani kutuların yaklaşık beşte birinde 3 ya da daha fazla kusurlu çıkar.

Beklenen kusurlu sayısı $np = 1.5$, standart sapma $\sqrt{np(1-p)} \approx 1.21$.
:::
` },
      { baslik: "Simülasyon: bilgisayarla deney", md: R`
Olasılık sorularının çoğunu formülle çözmek zordur; ama bilgisayarla **binlerce kez deneyip** sonucu sayabiliriz. Buna **Monte Carlo simülasyonu** denir.

### set.seed: tekrarlanabilir rastgelelik
Bilgisayarın ürettiği "rastgele" sayılar aslında bir başlangıç değerinden (tohum) türetilir. \`set.seed()\` ile tohumu sabitlersen herkes aynı "rastgele" sonuçları alır — araştırmada **tekrarlanabilirlik** için şarttır.

${K}r
set.seed(2026)
rnorm(3, mean = 70, sd = 10)
set.seed(2026)
rnorm(3, mean = 70, sd = 10)    # aynı üç sayı
${K}

### sample: torbadan çekiliş
${K}r
set.seed(1)
zar <- sample(1:6, size = 10000, replace = TRUE)
table(zar) / 10000             # her yüz ≈ 1/6
mean(zar)                      # ≈ 3.5
${K}

### Bir olasılık sorusunu simülasyonla çözmek
"23 kişilik bir sınıfta en az iki kişinin aynı gün doğmuş olma olasılığı nedir?" (Doğum günü problemi.) Sezgi %10 civarı der; gerçek cevap şaşırtıcıdır:

${K}r
set.seed(42)
ayni_gun_var <- replicate(10000, {
  gunler <- sample(1:365, 23, replace = TRUE)
  any(duplicated(gunler))
})
mean(ayni_gun_var)
${K}

\`replicate(n, ifade)\` ifadeyi n kez çalıştırıp sonuçları toplar. Sonuç ≈ %50!
` },
      { baslik: "Merkezi limit teoremi", md: R`
İstatistiğin en önemli teoremi:

:::tanim Central limit theorem
For a large enough sample size, the sampling distribution of the sample mean is approximately normal, regardless of the shape of the population distribution, with mean μ and standard deviation σ/√n.
:::

Yani anakütle çarpık, iki tepeli ya da tekdüze olsa bile, yeterince büyük örneklemlerin **ortalamaları** normal dağılır. Bu yüzden normal dağılım her yerdedir ve 14–15. derslerdeki güven aralıkları ve testler çalışır. Kendin dene: anakütleyi çarpık seç, n'yi 1'den 30'a çıkar.

{{mlt}}

R'da aynı deney:

${K}r
set.seed(7)
# Çok sağa çarpık bir anakütle: üstel dağılım (ortalama 3)
tek_tek <- rexp(10000, rate = 1/3)
ortalamalar <- replicate(5000, mean(rexp(30, rate = 1/3)))   # 30'luk örneklemlerin ortalamaları

par(mfrow = c(1, 2))
hist(tek_tek, breaks = 50, col = "salmon", main = "Anakütle (çarpık)", xlab = "x")
hist(ortalamalar, breaks = 40, col = "steelblue", main = "30'luk örneklem ortalamaları", xlab = "x̄")
par(mfrow = c(1, 1))

sd(ortalamalar)       # kuram: σ/√n = 3/√30
3 / sqrt(30)
${K}

**Standart hata (standard error)** $\sigma/\sqrt{n}$, örnek ortalamasının ne kadar oynak olduğunu ölçer. Örneklemi 4 katına çıkarmak standart hatayı yarıya indirir — büyük örneklemlerin neden daha güvenilir olduğunun matematiği.
` },
    ],
    ozet: [
      "Rastgele değişkenin olasılık dağılımı hangi değerlerin hangi olasılıkla geldiğini söyler; sürekli dağılımlarda olasılık eğri altındaki alandır.",
      "R'da d (yoğunluk), p (birikimli olasılık), q (yüzdelik), r (rastgele üretim) önekleri: dnorm, pnorm, qnorm, rnorm.",
      "Normal dağılım μ ve σ ile tanımlanır; z = (x − μ)/σ; 68–95–99.7 kuralı; qnorm(0.975) = 1.96.",
      "Binom: n bağımsız denemede başarı sayısı; dbinom, pbinom; beklenen değer np.",
      "Simülasyon: set.seed ile tekrarlanabilir; sample, replicate ile binlerce deney.",
      "Merkezi limit teoremi: örnek ortalamaları anakütle ne olursa olsun yaklaşık normal dağılır; standart hata σ/√n.",
    ],
    terimler: [
      ["random variable", "rastgele değişken", "A variable whose value depends on the outcome of a random process."],
      ["probability distribution", "olasılık dağılımı", "A description of the possible values of a random variable and their probabilities."],
      ["probability density", "olasılık yoğunluğu", "For continuous variables, the height of the distribution curve; probabilities are areas under it."],
      ["cumulative probability", "birikimli olasılık", "P(X ≤ x)."],
      ["quantile", "yüzdelik (kantil)", "The value below which a given proportion of the distribution lies."],
      ["normal distribution", "normal dağılım", "A symmetric bell-shaped distribution defined by its mean and standard deviation."],
      ["standard normal distribution", "standart normal dağılım", "The normal distribution with mean 0 and standard deviation 1."],
      ["z-score", "z puanı", "The number of standard deviations a value lies from the mean: (x − μ)/σ."],
      ["binomial distribution", "binom dağılımı", "The distribution of the number of successes in n independent trials with probability p."],
      ["Monte Carlo simulation", "Monte Carlo simülasyonu", "Estimating probabilities by repeating a random experiment many times on a computer."],
      ["random seed", "rastgele tohum", "The starting value that makes pseudo-random numbers reproducible; set.seed()."],
      ["sampling distribution", "örnekleme dağılımı", "The distribution of a statistic over repeated samples."],
      ["central limit theorem", "merkezi limit teoremi", "Sample means are approximately normally distributed for large n, whatever the population distribution."],
      ["standard error", "standart hata", "The standard deviation of a sampling distribution; for the mean, σ/√n."],
    ],
    quiz: [
      { s: "Which R function gives P(X ≤ x) for a normal distribution?", c: ["dnorm", "pnorm", "qnorm", "rnorm"], d: 1, a: "p öneki birikimli olasılıktır." },
      { s: "Exam scores are normal with μ = 70 and σ = 10. The z-score of a score of 85 is:", c: ["0.85", "1.5", "15", "−1.5"], d: 1, a: "z = (85 − 70)/10 = 1.5." },
      { s: "Approximately what percentage of a normal distribution lies within μ ± 2σ?", c: ["68%", "95%", "99.7%", "50%"], d: 1, a: "68–95–99.7 kuralı: ±2σ ≈ %95." },
      { s: "`qnorm(0.975)` returns approximately:", c: ["0.975", "1.96", "2.58", "0.5"], d: 1, a: "Standart normalin %97.5 yüzdeliği: 1.96 (iki taraflı %95)." },
      { s: "For a continuous random variable, the probability of exactly one value (e.g., X = 70.000…) is:", c: ["The height of the density", "Zero", "One", "0.5"], d: 1, a: "Sürekli değişkende olasılık aralık için alan olarak tanımlanır." },
      { s: "`dbinom(5, size = 10, prob = 0.5)` gives:", c: ["The probability of at most 5 heads in 10 tosses", "The probability of exactly 5 heads in 10 tosses", "The expected number of heads", "A random number"], d: 1, a: "d öneki kesikli dağılımda tam olarak k başarının olasılığıdır." },
      { s: "The expected number of defective items in a box of 50 with defect rate 3% is:", c: ["3", "1.5", "0.03", "50"], d: 1, a: "Beklenen değer np = 50 × 0.03 = 1.5." },
      { s: "Why do researchers use `set.seed()` before simulations?", c: ["To make the numbers truly random", "To make results reproducible", "To speed up R", "To install packages"], d: 1, a: "Aynı tohum aynı 'rastgele' sayıları üretir: tekrarlanabilirlik." },
      { s: "The central limit theorem says that the distribution of the sample mean:", c: ["Has the same shape as the population", "Is approximately normal for large n, whatever the population shape", "Is always uniform", "Does not depend on n"], d: 1, a: "Yeterince büyük n'de örnek ortalamaları normale yaklaşır." },
      { s: "If the sample size is multiplied by 4, the standard error of the mean:", c: ["Doubles", "Is halved", "Is divided by 4", "Does not change"], d: 1, a: "σ/√n: √4 = 2, standart hata yarıya iner." },
    ],
    alistirmalar: [
      { soru: R`Bir ülkede yetişkin erkeklerin boyu $\mu = 176$ cm, $\sigma = 7$ cm ile normal dağılıyor. **190 cm'den uzun** olanların oranını **oran** nesnesine hesapla.`, baslangic: "oran <- ", kontrol: "exists('oran') && abs(oran - (1 - pnorm(190, 176, 7))) < 1e-9", ipucu: R`\`1 - pnorm(190, mean = 176, sd = 7)\``, cozum: "oran <- 1 - pnorm(190, mean = 176, sd = 7)\noran", tebrik: "z = 2: yaklaşık %2.3." },
      { soru: R`Aynı dağılımda **en kısa %5'in** üst sınırını (5. yüzdelik) **sinir** nesnesine hesapla.`, baslangic: "sinir <- ", kontrol: "exists('sinir') && abs(sinir - qnorm(0.05, 176, 7)) < 1e-9", ipucu: R`\`qnorm(0.05, mean = 176, sd = 7)\``, cozum: "sinir <- qnorm(0.05, mean = 176, sd = 7)\nsinir" },
      { soru: R`20 soruluk bir çoktan seçmeli sınavda (4 seçenek) **tamamen tahminle** cevap veren biri. **En az 8 doğru** yapma olasılığını **p8** nesnesine hesapla.`, baslangic: "p8 <- ", kontrol: "exists('p8') && abs(p8 - (1 - pbinom(7, 20, 0.25))) < 1e-9", ipucu: R`Doğru olasılığı 0.25; "en az 8" = 1 − "en fazla 7": \`1 - pbinom(7, size = 20, prob = 0.25)\``, cozum: "p8 <- 1 - pbinom(7, size = 20, prob = 0.25)\np8", tebrik: "Yaklaşık %10: tahminle geçmek zor." },
      { soru: R`\`set.seed(123)\` ile, iki zar atıp toplamın **7** gelme olasılığını **100000** atışla simüle et ve sonucu **tahmin** nesnesine ata (kuramsal değer 1/6).`, baslangic: "set.seed(123)\nzar1 <- sample(1:6, 100000, replace = TRUE)\nzar2 <- \ntahmin <- ", kontrol: "exists('tahmin') && abs(tahmin - 1/6) < 0.01", ipucu: R`\`zar2 <- sample(1:6, 100000, replace = TRUE)\` ve \`tahmin <- mean(zar1 + zar2 == 7)\``, cozum: "set.seed(123)\nzar1 <- sample(1:6, 100000, replace = TRUE)\nzar2 <- sample(1:6, 100000, replace = TRUE)\ntahmin <- mean(zar1 + zar2 == 7)\ntahmin" },
    ],
  });
})();
