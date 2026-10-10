// Araştırma Yöntemleri — 14. ders: Örnekleme ve güven aralıkları (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r14",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Nokta tahmini ile aralık tahminini ayırmak",
      "Ortalama için güven aralığını t dağılımıyla hesaplamak (elle ve t.test ile)",
      "Güven düzeyinin doğru yorumunu yapmak",
      "Güven aralığının genişliğini etkileyen etkenleri (güven düzeyi, n, yayılım) açıklamak",
      "Oran için güven aralığı ve hata payı hesaplamak; gerekli örneklem büyüklüğünü bulmak",
    ],
    bolumler: [
      { baslik: "Nokta tahmini ve standart hata", md: R`
Anakütle parametresini (ör. bütün öğrencilerin ortalama çalışma süresi $\mu$) bilmeyiz; örneklemden **tahmin** ederiz.

- **Nokta tahmini (point estimate):** tek bir sayı — örneklem ortalaması $\bar x$.
- Ama her örneklem farklı bir $\bar x$ verir. Tahminin ne kadar güvenilir olduğunu **standart hata** söyler (13. ders):

$$SE = \frac{s}{\sqrt{n}}$$

Burada $s$ örneklem standart sapmasıdır (anakütle $\sigma$'sını bilmediğimiz için onun yerine kullanırız).

${K}r
anket <- read.csv("ogrenci_anket.csv")
x <- anket$calisma_saati
n <- length(x)
xbar <- mean(x)
s <- sd(x)
se <- s / sqrt(n)
c(n = n, ortalama = xbar, ss = s, standart_hata = se)
${K}
` },
      { baslik: "Ortalama için güven aralığı", md: R`
**Aralık tahmini**, parametrenin bulunabileceği makul değerlerin bir aralığını verir:

$$\bar x \pm t^{*} \cdot \frac{s}{\sqrt{n}}$$

$t^{*}$, istenen güven düzeyine karşılık gelen **t dağılımı** kritik değeridir. t dağılımı, $\sigma$ yerine örneklemden hesaplanan $s$ kullanmanın ek belirsizliğini hesaba katar: normal dağılıma benzer ama kuyrukları daha kalındır. **Serbestlik derecesi** $df = n - 1$ büyüdükçe normale yaklaşır.

${K}r
tkr <- qt(0.975, df = n - 1)       # %95 için (her kuyrukta %2.5)
tkr
alt <- xbar - tkr * se
ust <- xbar + tkr * se
c(alt = alt, ust = ust)
${K}

R bunu tek satırda yapar:

${K}r
t.test(x, conf.level = 0.95)$conf.int
t.test(x, conf.level = 0.99)$conf.int    # %99: daha geniş
${K}

Çok küçük örneklemlerde t ile z (1.96) arasındaki fark büyüktür:

${K}r
qt(0.975, df = c(4, 9, 29, 99, 999))
qnorm(0.975)
${K}
` },
      { baslik: "Güven düzeyini doğru yorumlamak", md: R`
"%95 güven aralığı [12.5, 14.3]" ne demektir?

- **Doğru yorum:** Bu yöntemle (aynı büyüklükte, tekrar tekrar çekilen örneklemlerle) hesaplanan aralıkların **%95'i** gerçek $\mu$'yü içerir. Bu aralığın onlardan biri olduğuna %95 güveniyoruz.
- **Yanlış yorum:** "$\mu$'nün bu aralıkta olma olasılığı %95." — $\mu$ sabit bir sayıdır (bilmesek de); ya aralıktadır ya değildir. Olasılık, **yöntemin** başarısı hakkındadır.

Aşağıdaki simülasyonda gerçek $\mu = 50$'yi biliyoruz. 100 ayrı örneklemden 100 ayrı aralık hesaplanıyor; kaçının 50'yi yakaladığını say:

{{guven-araligi}}

:::dikkat
Güven aralığı **örnekleme hatasını** ölçer, **yanlılığı** değil. Örneklem anakütleyi temsil etmiyorsa (yalnız kütüphanedeki öğrencilere anket yapmak), aralık ne kadar dar olursa olsun yanlış yerdedir (2. ders).
:::
` },
      { baslik: "Aralığın genişliği", md: R`
Hata payı $t^{*} \cdot s/\sqrt{n}$ üç şeye bağlıdır:

| Değişiklik | Aralık |
|---|---|
| Güven düzeyi ↑ (%95 → %99) | **genişler** (daha emin olmak için daha geniş ağ) |
| Örneklem büyüklüğü n ↑ | **daralır** (√n ile) |
| Yayılım s ↑ | **genişler** |

Örneklemi 4 katına çıkarmak hata payını yarıya indirir; 100 katına çıkarmak onda birine. Kesinlik pahalıdır.

${K}r
genislik <- function(n, s = 5, guven = 0.95) 2 * qt(1 - (1 - guven) / 2, n - 1) * s / sqrt(n)
sapply(c(25, 100, 400, 1600), genislik)
${K}
` },
      { baslik: "Oran için güven aralığı ve hata payı", md: R`
Kamuoyu yoklamalarında "%52 ± 3 puan" gibi ifadeler görürsün. Bir **oran** için güven aralığı:

$$\hat p \pm z^{*} \sqrt{\frac{\hat p (1 - \hat p)}{n}}$$

${K}r
calisan <- sum(anket$calisiyor_mu == "Evet")
p_hat <- calisan / n
se_p <- sqrt(p_hat * (1 - p_hat) / n)
c(oran = p_hat, alt = p_hat - 1.96 * se_p, ust = p_hat + 1.96 * se_p)

prop.test(calisan, n)$conf.int      # R'ın düzeltmeli yöntemi (benzer sonuç)
${K}

### Gerekli örneklem büyüklüğü
Bir anket tasarlarken şu soruyu sorarız: "Hata payının en fazla E olması için kaç kişiye sormalıyım?" Oran için en kötü durum $p = 0.5$'tir:

$$n = \frac{z^{*2} \cdot p(1-p)}{E^2}$$

${K}r
E <- 0.03                 # ±3 puan
ceiling(1.96^2 * 0.5 * 0.5 / E^2)
${K}

Ülke genelindeki yoklamaların yaklaşık 1.000–1.100 kişiyle yapılmasının nedeni budur: ±3 puan için yeterli. Ama dikkat: bu yalnız **rastgele** örneklemde geçerlidir; seçim yanlılığı, cevapsızlık ve yanlış soru kalıpları bu hesaba girmez.
` },
    ],
    ozet: [
      "Nokta tahmini tek bir sayıdır (x̄); güvenilirliğini standart hata s/√n ölçer.",
      "Ortalama için güven aralığı: x̄ ± t*·s/√n; t* = qt(1 − α/2, n − 1). R'da `t.test(x)$conf.int`.",
      "%95 güven: yöntemin uzun vadede aralıkların %95'inde μ'yü yakalaması; tek bir aralık için 'μ %95 olasılıkla burada' denmez.",
      "Aralık güven düzeyi ve yayılım arttıkça genişler, n arttıkça √n ile daralır. Güven aralığı yanlılığı düzeltmez.",
      "Oran için p̂ ± z*√(p̂(1 − p̂)/n); ±3 puan hata payı için yaklaşık 1.068 kişilik rastgele örneklem gerekir.",
    ],
    terimler: [
      ["point estimate", "nokta tahmini", "A single value used to estimate a population parameter."],
      ["interval estimate", "aralık tahmini", "A range of plausible values for a population parameter."],
      ["confidence interval", "güven aralığı", "An interval computed so that, over repeated samples, a stated percentage of such intervals contain the parameter."],
      ["confidence level", "güven düzeyi", "The long-run proportion of intervals that contain the parameter, e.g., 95%."],
      ["margin of error", "hata payı", "Half the width of a confidence interval."],
      ["t distribution", "t dağılımı", "A bell-shaped distribution with heavier tails than the normal, used when σ is estimated by s."],
      ["degrees of freedom", "serbestlik derecesi", "A parameter of the t distribution; for one mean, n − 1."],
      ["critical value", "kritik değer", "The quantile of a distribution that defines the confidence level, e.g., 1.96."],
      ["sample proportion", "örneklem oranı", "The share of the sample with a characteristic, p̂."],
      ["sample size calculation", "örneklem büyüklüğü hesabı", "Determining how many observations are needed to achieve a desired margin of error."],
    ],
    quiz: [
      { s: "A sample of n = 25 has mean 14 and standard deviation 5. The standard error of the mean is:", c: ["5", "1", "0.2", "2.8"], d: 1, a: "SE = s/√n = 5/5 = 1." },
      { s: "Which is the correct interpretation of a 95% confidence interval?", c: ["There is a 95% probability that μ is in this specific interval", "95% of intervals built this way would contain μ", "95% of the data lie in the interval", "The sample mean is correct with 95% probability"], d: 1, a: "Güven, yöntemin uzun vadeli başarısı hakkındadır; μ sabittir." },
      { s: "Holding everything else equal, increasing the confidence level from 95% to 99%:", c: ["Narrows the interval", "Widens the interval", "Does not change it", "Changes the sample mean"], d: 1, a: "Daha emin olmak için daha geniş aralık gerekir." },
      { s: "To halve the margin of error (other things equal), the sample size must be:", c: ["Doubled", "Quadrupled", "Halved", "Increased by 50%"], d: 1, a: "Hata payı 1/√n ile orantılı: yarıya inmesi için n dört katına çıkmalı." },
      { s: "The t distribution is used instead of the normal when:", c: ["The data are categorical", "The population standard deviation is unknown and estimated by s", "n is very large only", "The data are skewed"], d: 1, a: "σ yerine s kullanmanın ek belirsizliği için t; df büyüdükçe normale yaklaşır." },
      { s: "For a 95% CI for one mean with n = 30, the critical value is `qt(0.975, df = ?)`:", c: ["30", "29", "31", "28"], d: 1, a: "df = n − 1 = 29." },
      { s: "Which R code returns a 95% confidence interval for the mean of x?", c: ["`mean(x)`", "`t.test(x)$conf.int`", "`sd(x)/sqrt(length(x))`", "`quantile(x, c(0.025, 0.975))`"], d: 1, a: "`t.test(x)$conf.int`. quantile verinin yüzdeliklerini verir, ortalamanın aralığını değil." },
      { s: "A poll finds 52% support with n = 1,000. The approximate 95% margin of error is:", c: ["±0.5 points", "±3.1 points", "±10 points", "±1 point"], d: 1, a: "1.96·√(0.52·0.48/1000) ≈ 0.031." },
      { s: "Approximately how many respondents are needed for a ±3-point margin of error (95%, p = 0.5)?", c: ["100", "385", "1,068", "10,000"], d: 2, a: "1.96²·0.25/0.03² ≈ 1067.1 → 1068." },
      { s: "A very narrow confidence interval from a convenience sample of library visitors:", c: ["Guarantees an accurate estimate of all students", "May still be biased because the sample is not representative", "Has no sampling error", "Is always wider than a random sample's"], d: 1, a: "Güven aralığı örnekleme hatasını ölçer, seçim yanlılığını değil." },
    ],
    alistirmalar: [
      { soru: R`Anketteki **not_ortalamasi** için **%95 güven aralığını** \`t.test\` ile hesaplayıp iki elemanlı **ga** vektörüne ata.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nga <- ", kontrol: "exists('ga') && length(ga) == 2 && max(abs(as.numeric(ga) - as.numeric(t.test(read.csv('ogrenci_anket.csv')$not_ortalamasi)$conf.int))) < 1e-9", ipucu: R`\`t.test(anket$not_ortalamasi)$conf.int\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nga <- t.test(anket$not_ortalamasi)$conf.int\nga" },
      { soru: R`Aynı güven aralığını **elle** hesapla: alt sınırı **alt**, üst sınırı **ust** nesnelerine ata (ortalama ± t* · s/√n).`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\nx <- anket$not_ortalamasi\nn <- length(x)\nalt <- \nust <- ", kontrol: "ci <- t.test(read.csv('ogrenci_anket.csv')$not_ortalamasi)$conf.int; exists('alt') && exists('ust') && abs(alt - ci[1]) < 1e-9 && abs(ust - ci[2]) < 1e-9", ipucu: R`\`tk <- qt(0.975, n - 1)\`; \`alt <- mean(x) - tk * sd(x) / sqrt(n)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nx <- anket$not_ortalamasi\nn <- length(x)\ntk <- qt(0.975, n - 1)\nalt <- mean(x) - tk * sd(x) / sqrt(n)\nust <- mean(x) + tk * sd(x) / sqrt(n)\nc(alt, ust)" },
      { soru: R`Bir belediye, ±2 puan hata payıyla (%95 güven) memnuniyet oranını tahmin etmek istiyor. En kötü durumu (p = 0.5) varsayarak gereken **tam sayı** örneklem büyüklüğünü **n_gerekli** nesnesine hesapla.`, baslangic: "n_gerekli <- ", kontrol: "exists('n_gerekli') && n_gerekli == ceiling(qnorm(0.975)^2 * 0.25 / 0.02^2)", ipucu: R`\`ceiling(qnorm(0.975)^2 * 0.5 * 0.5 / 0.02^2)\` — \`ceiling\` yukarı yuvarlar.`, cozum: "n_gerekli <- ceiling(qnorm(0.975)^2 * 0.5 * 0.5 / 0.02^2)\nn_gerekli", tebrik: "±2 puan için yaklaşık 2.401 kişi: ±3'ün iki katından fazla." },
    ],
  });
})();
