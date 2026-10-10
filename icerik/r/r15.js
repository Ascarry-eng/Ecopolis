// Araştırma Yöntemleri — 15. ders: Hipotez testleri (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r15",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Hipotez testinin mantığını kurmak: H₀, H₁, test istatistiği, p-değeri, anlamlılık düzeyi, karar",
      "I. tür ve II. tür hatayı, testin gücünü açıklamak",
      "Tek örneklem, bağımsız iki örneklem ve eşleştirilmiş t-testlerini R'da yapmak ve raporlamak",
      "Kategorik değişkenler arasında ki-kare bağımsızlık testi yapmak",
      "İstatistiksel anlamlılık ile pratik önemi ayırmak; p-hacking tehlikesini bilmek",
    ],
    bolumler: [
      { baslik: "Hipotez testinin mantığı", md: R`
Hipotez testi bir **mahkeme** gibi işler: sanık (H₀) suçsuz kabul edilir; ancak kanıt "makul şüphenin ötesinde" güçlüyse mahkûm edilir (H₀ reddedilir).

1. **Hipotezleri kur.**
   - $H_0$ (sıfır hipotezi): fark ya da etki yok. "Öğrencilerin ortalama haftalık çalışma süresi 12 saattir": $\mu = 12$.
   - $H_1$ (alternatif hipotez): fark ya da etki var. İki taraflı $\mu \ne 12$; tek taraflı $\mu > 12$ ya da $\mu < 12$.
2. **Anlamlılık düzeyini seç:** $\alpha$, genellikle 0.05. H₀ doğruyken onu yanlışlıkla reddetmeyi göze aldığımız olasılık.
3. **Test istatistiğini hesapla:** veri, H₀'ın söylediğinden ne kadar uzak? Ortalama için:
$$t = \frac{\bar x - \mu_0}{s / \sqrt{n}}$$
4. **p-değerini bul:** H₀ doğru olsaydı, en az bu kadar uç bir sonuç görme olasılığı.
5. **Karar ver:** $p < \alpha$ ise H₀ **reddedilir**; değilse H₀ **reddedilemez**.

:::tanim p-value
The probability, assuming the null hypothesis is true, of obtaining a test statistic at least as extreme as the one observed.
:::

Görselde örneklem ortalamasını, n'yi ve yayılımı değiştirip t istatistiğinin ve p-değerinin nasıl değiştiğini izle:

{{hipotez-testi}}

:::dikkat
- p-değeri **"H₀'ın doğru olma olasılığı" değildir.** H₀ doğruysa veriyi görme olasılığıdır.
- "H₀ reddedilemez" demek "H₀ doğrudur" demek değildir; yalnız kanıt yetersizdir. Mahkemede "suçsuz" değil, "beraat" kararı gibi.
- $\alpha$'yı veriye bakmadan **önce** seç.
:::
` },
      { baslik: "Hata türleri ve güç", md: R`
Karar ile gerçek dört biçimde karşılaşabilir:

| | H₀ gerçekte doğru | H₀ gerçekte yanlış |
|---|---|---|
| **H₀ reddedildi** | **I. tür hata** (yanlış alarm), olasılığı $\alpha$ | Doğru karar (güç = $1 - \beta$) |
| **H₀ reddedilmedi** | Doğru karar | **II. tür hata** (kaçırma), olasılığı $\beta$ |

- **I. tür hata:** suçsuzu mahkûm etmek; etkisi olmayan bir ilacı etkili sanmak.
- **II. tür hata:** suçluyu serbest bırakmak; gerçek bir etkiyi kaçırmak.
- **Güç (power):** gerçek bir etki varken onu yakalama olasılığı, $1 - \beta$. Örneklem büyüdükçe, etki büyüdükçe ve yayılım azaldıkça artar.

$\alpha$'yı küçültmek I. tür hatayı azaltır ama (aynı n ile) II. tür hatayı artırır: ikisi arasında bir değiş tokuş vardır. İkisini birden azaltmanın yolu daha büyük örneklemdir.
` },
      { baslik: "t-testleri", md: R`
### 1. Tek örneklem t-testi
"Öğrencilerin ortalama haftalık çalışma süresi 12 saatten farklı mı?"

${K}r
anket <- read.csv("ogrenci_anket.csv")
t.test(anket$calisma_saati, mu = 12)
${K}

Çıktıyı okumak: **t** test istatistiği, **df** serbestlik derecesi, **p-value**, %95 güven aralığı ve örneklem ortalaması. p < 0.05 ise "ortalama çalışma süresi 12 saatten istatistiksel olarak anlamlı biçimde farklıdır" deriz. Güven aralığının 12'yi içermemesi de aynı şeyi söyler (iki taraflı testle güven aralığı arasındaki ilişki).

### 2. Bağımsız iki örneklem t-testi
"Yarı zamanlı çalışan ve çalışmayan öğrencilerin not ortalamaları farklı mı?"

${K}r
t.test(not_ortalamasi ~ calisiyor_mu, data = anket)
${K}

Formül gösterimi \`sayısal ~ grup\` "sayısal değişkeni gruplara göre karşılaştır" demektir. R varsayılan olarak **Welch t-testi** yapar: iki grubun varyanslarının eşit olduğunu varsaymaz (daha güvenli). Varyanslar eşit varsayılacaksa \`var.equal = TRUE\`.

### 3. Eşleştirilmiş t-testi
Aynı kişiler iki kez ölçüldüğünde (önce–sonra), gözlemler bağımsız değildir. Örnek: 15 öğrencinin bir çalışma tekniği kursundan önceki ve sonraki deneme puanları (simüle):

${K}r
set.seed(11)
once <- round(rnorm(15, mean = 60, sd = 10))
sonra <- round(once + rnorm(15, mean = 4, sd = 5))
t.test(sonra, once, paired = TRUE)
mean(sonra - once)
${K}

Eşleştirilmiş test aslında **farkların** ortalamasının sıfır olup olmadığını sınar. Bağımsız t-testi kullanmak burada yanlış olurdu: kişiden kişiye farkı (bazı öğrenciler zaten iyi) gürültü olarak sayar ve testi zayıflatır.

### Raporlama
Akademik metinde sonuç şöyle yazılır:

> Yarı zamanlı çalışan öğrencilerin not ortalaması (M = 2.21) çalışmayanlarınkinden (M = 2.64) düşüktür; fark istatistiksel olarak anlamlıdır, Welch t(…) = …, p < .001.

Ortalamaları, test istatistiğini, serbestlik derecesini ve p-değerini birlikte ver. (Bu veri sentetiktir; gerçek bir bulgu değildir.)
` },
      { baslik: "Ki-kare bağımsızlık testi", md: R`
İki **kategorik** değişken arasında ilişki var mı? Örneğin cinsiyet ile yarı zamanlı çalışma bağımsız mı?

- $H_0$: iki değişken bağımsızdır (çalışma oranı cinsiyete göre değişmez).
- $H_1$: bağımlıdır.

Test, çapraz tablodaki **gözlenen** sayıları, değişkenler bağımsız olsaydı **beklenecek** sayılarla karşılaştırır:

$$\chi^2 = \sum \frac{(G - B)^2}{B}$$

${K}r
tablo <- table(anket$cinsiyet, anket$calisiyor_mu)
tablo
test <- chisq.test(tablo)
test
test$expected      # bağımsızlık altında beklenen sayılar
${K}

p > 0.05 çıkarsa, bu örneklemde cinsiyet ile çalışma arasında anlamlı bir ilişki olduğuna dair kanıt yoktur.

:::dikkat
Ki-kare testi için beklenen sayıların çoğunun **en az 5** olması gerekir. Küçük örneklemlerde R uyarı verir; o zaman \`fisher.test(tablo)\` kullan.
:::
` },
      { baslik: "Anlamlılık ve önem", md: R`
### İstatistiksel anlamlılık ≠ pratik önem
Çok büyük örneklemlerde küçücük farklar bile "anlamlı" çıkar. 1 milyon öğrencilik bir veride iki grubun not ortalaması arasındaki 0.01 puanlık fark p < 0.001 verebilir — ama kimsenin umurunda olmaz. Bu yüzden p-değerinin yanında **etki büyüklüğünü** (farkın kendisi, güven aralığı, Cohen's d gibi ölçüler) raporla ve "bu fark gerçek hayatta önemli mi?" diye sor.

### p-hacking ve çoklu karşılaştırma
$\alpha = 0.05$, H₀ doğru olsa bile her 20 testten birinin "anlamlı" çıkması demektir. Yeterince çok değişkeni, alt grubu ya da model biçimini denersen, tesadüfen anlamlı sonuçlar bulursun. Yalnız bunları raporlamaya **p-hacking** denir ve bilimdeki "tekrarlanma krizi"nin nedenlerinden biridir.

${K}r
set.seed(3)
# H0 her durumda doğru: iki grup aynı anakütleden. 100 test yapalım.
p_degerleri <- replicate(100, t.test(rnorm(30), rnorm(30))$p.value)
sum(p_degerleri < 0.05)       # yaklaşık 5 "anlamlı" sonuç — hepsi yanlış alarm
${K}

Önlemler: hipotezleri ve analizi **önceden** belirlemek (ön kayıt), yapılan bütün testleri raporlamak, çoklu karşılaştırmada düzeltme yapmak (\`p.adjust(p, method = "bonferroni")\`).
` },
    ],
    ozet: [
      "Test adımları: H₀/H₁ → α → test istatistiği → p-değeri → karar (p < α ise H₀ reddedilir).",
      "p-değeri, H₀ doğruyken en az bu kadar uç bir sonuç görme olasılığıdır; H₀'ın olasılığı değildir. 'Reddedilemez' ≠ 'doğru'.",
      "I. tür hata (α): yanlış alarm; II. tür hata (β): kaçırma; güç 1 − β, n ile artar.",
      "t.test(x, mu =) tek örneklem; t.test(y ~ grup) bağımsız iki örneklem (Welch); t.test(a, b, paired = TRUE) eşleştirilmiş.",
      "chisq.test(table(a, b)): kategorik bağımsızlık; beklenen sayılar ≥ 5, değilse fisher.test.",
      "Anlamlılık pratik önem demek değildir; etki büyüklüğünü raporla. Çok test yapmak tesadüfi anlamlılık üretir (p-hacking).",
    ],
    terimler: [
      ["hypothesis test", "hipotez testi", "A procedure for deciding whether data provide enough evidence against a null hypothesis."],
      ["null hypothesis (H₀)", "sıfır hipotezi", "The hypothesis of no effect or no difference."],
      ["alternative hypothesis (H₁)", "alternatif hipotez", "The hypothesis that there is an effect or difference."],
      ["significance level (α)", "anlamlılık düzeyi", "The probability of rejecting H₀ when it is true that the researcher is willing to accept."],
      ["test statistic", "test istatistiği", "A number measuring how far the data are from what H₀ predicts."],
      ["p-value", "p-değeri", "The probability, under H₀, of a result at least as extreme as the one observed."],
      ["Type I error", "I. tür hata", "Rejecting a true null hypothesis (false positive)."],
      ["Type II error", "II. tür hata", "Failing to reject a false null hypothesis (false negative)."],
      ["statistical power", "istatistiksel güç", "The probability of rejecting H₀ when it is false (1 − β)."],
      ["one-sample t-test", "tek örneklem t-testi", "Tests whether a population mean equals a specified value."],
      ["two-sample t-test", "bağımsız iki örneklem t-testi", "Tests whether two independent groups have equal means."],
      ["Welch t-test", "Welch t-testi", "A two-sample t-test that does not assume equal variances."],
      ["paired t-test", "eşleştirilmiş t-testi", "Tests whether the mean of paired differences is zero."],
      ["chi-square test of independence", "ki-kare bağımsızlık testi", "Tests whether two categorical variables are independent."],
      ["effect size", "etki büyüklüğü", "A measure of the magnitude of an effect, independent of sample size."],
      ["p-hacking", "p-hacking (p-değeri avcılığı)", "Trying many analyses and reporting only those with significant results."],
    ],
    quiz: [
      { s: "If p = 0.03 and α = 0.05, the correct decision is:", c: ["Fail to reject H₀", "Reject H₀", "Accept H₀ as true", "Increase α"], d: 1, a: "p < α: H₀ reddedilir." },
      { s: "A p-value of 0.03 means:", c: ["There is a 3% chance that H₀ is true", "If H₀ were true, a result at least this extreme would occur about 3% of the time", "The effect is 3% large", "The sample is 3% biased"], d: 1, a: "p-değeri H₀ altında veriyi görme olasılığıdır, H₀'ın olasılığı değil." },
      { s: "Rejecting a true null hypothesis is a:", c: ["Type I error", "Type II error", "Correct decision", "Power"], d: 0, a: "Yanlış alarm: I. tür hata, olasılığı α." },
      { s: "The power of a test is:", c: ["α", "β", "1 − β", "1 − α"], d: 2, a: "Güç: H₀ yanlışken onu reddetme olasılığı." },
      { s: "Which change increases the power of a test (other things equal)?", c: ["A smaller sample", "A larger sample", "More variable data", "A smaller true effect"], d: 1, a: "Büyük örneklem standart hatayı küçültür, gücü artırır." },
      { s: "Comparing the mean GPA of working vs. non-working students uses:", c: ["A one-sample t-test", "A two-sample (independent) t-test", "A paired t-test", "A chi-square test"], d: 1, a: "İki bağımsız grup: t.test(not ~ calisiyor_mu)." },
      { s: "Scores of the same students before and after a course should be analyzed with:", c: ["An independent two-sample t-test", "A paired t-test", "A chi-square test", "No test"], d: 1, a: "Aynı kişiler: gözlemler eşleşik, farkların ortalaması sınanır." },
      { s: "To test whether gender and part-time work are associated, use:", c: ["t.test()", "chisq.test()", "cor()", "lm()"], d: 1, a: "İki kategorik değişken: ki-kare bağımsızlık testi." },
      { s: "\"Fail to reject H₀\" means:", c: ["H₀ is proven true", "There is not enough evidence to reject H₀", "H₁ is true", "The test was invalid"], d: 1, a: "Kanıt yetersiz; H₀ ispatlanmış değildir." },
      { s: "If you run 100 tests where H₀ is true in every case, at α = 0.05 you expect about how many 'significant' results?", c: ["0", "5", "50", "95"], d: 1, a: "Her testte %5 yanlış alarm olasılığı: ~5. Çoklu karşılaştırma tuzağı." },
    ],
    alistirmalar: [
      { soru: R`Öğrencilerin ortalama **uyku_saati**'nin 7 saatten farklı olup olmadığını sına. Testin **p-değerini** **p_uyku** nesnesine ata. (Eksik değerler t.test'te otomatik çıkarılır.)`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\np_uyku <- ", kontrol: "exists('p_uyku') && abs(p_uyku - t.test(read.csv('ogrenci_anket.csv')$uyku_saati, mu = 7)$p.value) < 1e-12", ipucu: R`\`t.test(anket$uyku_saati, mu = 7)$p.value\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nsonuc <- t.test(anket$uyku_saati, mu = 7)\nsonuc\np_uyku <- sonuc$p.value\np_uyku" },
      { soru: R`**Kadın ve erkek** öğrencilerin haftalık **calisma_saati** ortalamaları farklı mı? İki örneklem t-testini yapıp sonucu **test_cins** nesnesine ata.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\ntest_cins <- ", kontrol: "exists('test_cins') && inherits(test_cins, 'htest') && abs(test_cins$p.value - t.test(calisma_saati ~ cinsiyet, data = read.csv('ogrenci_anket.csv'))$p.value) < 1e-12", ipucu: R`\`t.test(calisma_saati ~ cinsiyet, data = anket)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\ntest_cins <- t.test(calisma_saati ~ cinsiyet, data = anket)\ntest_cins" },
      { soru: R`**Şehir** ile **yarı zamanlı çalışma** arasında ilişki var mı? Ki-kare testinin p-değerini **p_ki** nesnesine ata. (Küçük hücreler için R bir uyarı verebilir — uyarıyı okumayı unutma.)`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\np_ki <- ", kontrol: "a <- read.csv('ogrenci_anket.csv'); exists('p_ki') && abs(p_ki - suppressWarnings(chisq.test(table(a$sehir, a$calisiyor_mu))$p.value)) < 1e-12", ipucu: R`\`chisq.test(table(anket$sehir, anket$calisiyor_mu))$p.value\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\np_ki <- chisq.test(table(anket$sehir, anket$calisiyor_mu))$p.value\np_ki" },
    ],
  });
})();
