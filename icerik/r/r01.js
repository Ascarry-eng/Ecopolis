// Araştırma Yöntemleri — 1. ders: Araştırma nedir? (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "r01",
    hedefler: [
      "Bilimsel araştırmayı gündelik bilgi edinmeden ayıran özellikleri saymak",
      "İyi bir araştırma sorusunun ölçütlerini uygulamak",
      "Bağımlı, bağımsız ve kontrol değişkenlerini ayırmak; hipotez kurmak",
      "Korelasyon ile nedenselliği ayırmak; karıştırıcı değişkeni ve ters nedenselliği tanımak",
      "Araştırma türlerini ve araştırma sürecinin adımlarını açıklamak",
    ],
    bolumler: [
      { baslik: "Bilimsel araştırma nedir?", md: R`
Hepimiz her gün bir şeyler "araştırırız": hangi telefon daha iyi, hangi hoca daha kolay not veriyor… **Bilimsel araştırma** bundan üç özellikle ayrılır:

1. **Sistematiktir:** önceden belirlenmiş bir yöntemle, adım adım yürütülür.
2. **Ampiriktir (empirical):** iddialar gözleme ve veriye dayanır, otoriteye ya da sezgiye değil.
3. **Tekrarlanabilirdir (replicable):** başka biri aynı yöntemi aynı veriye uyguladığında aynı sonuca ulaşabilmelidir.

:::tanim Research
A systematic process of collecting and analyzing information (data) to answer a question or test a hypothesis.
:::

Bilimde iki akıl yürütme biçimi iç içe çalışır:

- **Tümdengelim (deduction):** genel bir kuramdan belirli bir öngörü çıkarmak. "Talep yasası doğruysa, sigara vergisi artınca sigara tüketimi düşmeli."
- **Tümevarım (induction):** tek tek gözlemlerden genel bir örüntüye ulaşmak. "Vergi artışlarından sonra tüketimin hep düştüğünü görüyorum; talep fiyata duyarlı olmalı."

İktisatta tipik döngü: **kuram → hipotez → veri → sınama → kuramı güncelleme.** Colander'ın mikro dersinde gördüğün modeller (arz–talep, tekel, fayda) bu döngünün "kuram" basamağıdır; bu ders sana "sınama" basamağını öğretiyor.
` },
      { baslik: "Araştırma sorusu", md: R`
Her araştırma bir **soruyla** başlar. Kötü sorulmuş bir soruya iyi bir cevap bulunamaz.

İyi bir araştırma sorusu:

- **Açık ve belirli:** "Ekonomi nasıl?" değil; "2015–2025 arasında Türkiye'de asgari ücret artışları genç istihdamını nasıl etkiledi?"
- **Araştırılabilir:** veriyle cevaplanabilir olmalı; "Kapitalizm iyi midir?" normatif bir sorudur, veriyle tek başına cevaplanamaz.
- **Uygulanabilir:** elindeki zaman, veri ve bütçeyle yapılabilir olmalı.
- **Önemli:** cevabı birilerinin (bilim, politika, işletmeler) işine yaramalı.
- **Özgün:** literatüre bir şey katmalı ya da var olanı yeni bir bağlamda sınamalı.

:::ornek Soruyu daralt
"Sosyal medya öğrencileri etkiler mi?" sorusunu iyi bir araştırma sorusuna dönüştür.
---cozum---
Belirsiz kavramları ölçülebilir hâle getir: *hangi* öğrenciler, *hangi* sosyal medya kullanımı, *neyi* etkiliyor?

Örnek: "Bir devlet üniversitesinin iktisat bölümü 1. sınıf öğrencilerinde, günlük sosyal medya kullanım süresi ile dönem sonu not ortalaması arasında bir ilişki var mıdır?"

Artık değişkenler (kullanım süresi, not ortalaması), anakütle (1. sınıf iktisat öğrencileri) ve ilişki türü (ilişki var mı) belli. Nedensellik iddiası yok — çünkü bunu bir anketle kanıtlayamayız (bkz. aşağıda).
:::

:::ipucu
Colander'ın 1. bölümdeki ayrımını hatırla: **pozitif** sorular (ne var?) veriyle cevaplanabilir; **normatif** sorular (ne olmalı?) değer yargısı gerektirir. Araştırma sorun pozitif olmalı; normatif sonuçlar ancak bulguların yorumunda, açıkça belirtilerek tartışılır.
:::
` },
      { baslik: "Değişkenler ve hipotezler", md: R`
:::tanim Variable
A characteristic that can take different values across observations (people, firms, countries, time periods).
:::

Araştırmadaki rollerine göre değişkenler:

- **Bağımlı değişken (dependent variable, Y):** açıklamaya çalıştığımız sonuç — not ortalaması, istihdam, tasarruf oranı.
- **Bağımsız (açıklayıcı) değişken (independent / explanatory variable, X):** sonucu etkilediğini düşündüğümüz değişken — çalışma saati, asgari ücret, faiz.
- **Kontrol değişkeni (control variable):** hem X'i hem Y'yi etkileyebileceği için sabit tutmak istediğimiz değişken — Colander'ın "diğer şeyler sabitken" (ceteris paribus) dediği şeyin veri karşılığı.

### Kavramdan ölçüme: işlemselleştirme
"Akademik başarı" bir **kavramdır**; "dönem sonu not ortalaması (0–4)" onun **ölçülebilir göstergesidir**. Kavramı ölçülebilir bir değişkene dönüştürmeye **işlemselleştirme (operationalization)** denir. Yoksulluğu "medyan gelirin %60'ının altında kalmak", enflasyonu "TÜFE'deki yıllık değişim" diye tanımlamak birer işlemselleştirmedir.

### Hipotez
:::tanim Hypothesis
A testable statement about the relationship between two or more variables, derived from theory.
:::

İyi bir hipotez **sınanabilir** ve **yanlışlanabilir** olmalıdır. İstatistiksel sınamada iki hipotez kurulur:

- **Sıfır hipotezi (H₀):** etki ya da ilişki yoktur. "Çalışma saati ile not ortalaması arasında ilişki yoktur."
- **Alternatif hipotez (H₁):** etki ya da ilişki vardır. "Çalışma saati arttıkça not ortalaması artar."

H₀'ı veriyle reddetmeye çalışırız; bunun ayrıntısını 15. derste göreceğiz.
` },
      { baslik: "Korelasyon nedensellik değildir", md: R`
Araştırma yöntemlerinin en önemli dersi budur. İki değişkenin birlikte hareket etmesi (**korelasyon**), birinin ötekine neden olduğu (**nedensellik**) anlamına gelmez. Üç tuzak:

**1. Karıştırıcı değişken (confounder).** Hem X'i hem Y'yi etkileyen üçüncü bir değişken. Dondurma satışları ile boğulma vakaları birlikte artar — ikisinin de nedeni yaz sıcağıdır. Özel ders alan öğrencilerin notları yüksekse, bunun nedeni özel ders mi yoksa ailenin geliri ve ilgisi mi?

**2. Ters nedensellik (reverse causality).** Belki Y, X'e neden oluyordur. Mutlu insanlar daha çok mu spor yapıyor, spor yapanlar mı mutlu oluyor? Yüksek gelirli ülkeler mi eğitime çok harcıyor, eğitim mi geliri artırıyor?

**3. Tesadüf ve sahte korelasyon (spurious correlation).** Yeterince çok değişkene bakarsan bazıları tamamen rastlantısal olarak ilişkili görünür. Zamanla birlikte artan iki seri (ör. bir ülkenin GSYH'si ile bir başka ülkedeki internet kullanıcı sayısı) güçlü korelasyon gösterir ama aralarında hiçbir bağ yoktur.

:::dikkat
"X ile Y arasında anlamlı bir ilişki bulduk, demek ki X, Y'yi artırıyor" — öğrenci raporlarındaki en sık hata. Gözlemsel veriyle yazılmış bir raporda doğru ifade: "X ile Y arasında pozitif ve istatistiksel olarak anlamlı bir **ilişki** bulunmuştur."
:::

### Nedenselliği nasıl kurarız?
- **Deney (experiment):** katılımcıları *rastgele* iki gruba ayır, yalnız birine "müdahale" uygula. Rastgele atama karıştırıcıları gruplar arasında dengeler; fark müdahalenin etkisidir. (Tıpta ilaç denemeleri; iktisatta saha deneyleri — Colander 21. bölüm.)
- **Doğal deney ve yarı-deneysel yöntemler:** deney yapılamıyorsa, tarihin ya da bir politikanın yarattığı "sanki rastgele" farklılıklardan yararlanmak (asgari ücreti artıran ve artırmayan komşu bölgeleri karşılaştırmak gibi).
- **Kontrol değişkenleri:** regresyonda karıştırıcıları modele eklemek (17–18. dersler). Faydalıdır ama ölçülemeyen karıştırıcılara karşı korumaz.
` },
      { baslik: "Araştırma türleri", md: R`
Araştırmalar birkaç eksende sınıflandırılır:

**Veri türüne göre**
- **Nicel (quantitative):** sayısal veri, istatistiksel analiz. "Kaç kişi? Ne kadar? Ne ölçüde ilişkili?"
- **Nitel (qualitative):** görüşme, gözlem, metin analizi. "Neden? Nasıl? Ne anlama geliyor?"
- **Karma yöntem (mixed methods):** ikisini birleştirir.

**Amaca göre**
- **Betimleyici (descriptive):** bir durumu tanımlar. "Öğrencilerin yüzde kaçı yarı zamanlı çalışıyor?"
- **Keşfedici (exploratory):** az bilinen bir konuyu açar, hipotez üretir.
- **Açıklayıcı (explanatory):** nedenleri ve ilişkileri sınar. "Yarı zamanlı çalışmak notları düşürüyor mu?"

**Tasarıma göre**
- **Deneysel:** araştırmacı müdahaleyi kendisi yapar ve rastgele atar.
- **Gözlemsel (observational):** araştırmacı yalnız gözlemler; anketler, kayıt verileri. İktisadın büyük kısmı gözlemseldir.

**Zamana göre**
- **Kesitsel (cross-sectional):** tek bir zamanda birçok birim.
- **Boylamsal (longitudinal):** aynı birimleri zaman içinde izlemek.

Bu dersin büyük kısmı, **nicel, açıklayıcı ve gözlemsel** araştırmanın — iktisatçının günlük işinin — araçlarına ayrılmıştır.
` },
      { baslik: "Araştırma süreci", md: R`
Bir araştırma projesi kabaca şu adımlarla ilerler:

1. **Konu seçimi:** ilgini çeken, veri bulabileceğin bir alan.
2. **Literatür taraması (literature review):** bu konuda daha önce ne yapılmış? Hangi bulgular, hangi boşluklar var? Google Scholar, ulusal tez merkezi, dergiler.
3. **Araştırma sorusu ve hipotezler.**
4. **Araştırma tasarımı:** hangi yöntem, hangi veri, hangi örneklem, hangi değişkenler?
5. **Veri toplama ya da derleme:** anket, deney, ikincil veri (TÜİK, TCMB…).
6. **Veri hazırlama ve temizleme:** eksik değerler, hatalı girişler, değişken dönüşümleri. (Gerçek hayatta zamanın yarısı burada geçer!)
7. **Analiz:** betimsel istatistik, grafikler, testler, regresyon — R ile.
8. **Yorum:** bulgular hipotezi destekliyor mu? Sınırlılıklar neler?
9. **Raporlama:** yöntem ve bulguların, başkasının tekrarlayabileceği açıklıkta yazılması.

Süreç düz bir çizgi değil, bir döngüdür: veriye bakınca soru değişebilir, analiz yeni bir veri ihtiyacı doğurabilir.

### Araştırma etiği
- **Bilgilendirilmiş onam:** katılımcılar ne için veri verdiklerini bilmeli ve gönüllü olmalı.
- **Gizlilik ve anonimlik:** kişisel veriler korunmalı (Türkiye'de KVKK).
- **Dürüstlük:** veri uydurmak (fabrication), çarpıtmak (falsification) ve intihal (plagiarism) bilimsel suçtur.
- **Şeffaflık:** yöntem, veri ve kod paylaşılabilir olmalı; yapay zekâ araçları kullanıldıysa bu belirtilmeli.

Bu konulara 19. derste rapor yazımıyla birlikte döneceğiz.
` },
    ],
    ozet: [
      "Bilimsel araştırma sistematik, ampirik ve tekrarlanabilirdir; tümdengelim ve tümevarım birlikte çalışır.",
      "İyi araştırma sorusu açık, araştırılabilir (pozitif), uygulanabilir, önemli ve özgündür.",
      "Bağımlı değişken açıklanan sonuç, bağımsız değişken açıklayıcı, kontrol değişkeni sabit tutulan üçüncü etkendir; kavramlar işlemselleştirilerek ölçülür.",
      "Hipotez sınanabilir ve yanlışlanabilir olmalı; H₀ ilişki yok, H₁ ilişki var der.",
      "Korelasyon nedensellik değildir: karıştırıcı değişken, ters nedensellik, sahte korelasyon. Nedenselliği en iyi rastgele deneyler kurar.",
      "Türler: nicel/nitel, betimleyici/keşfedici/açıklayıcı, deneysel/gözlemsel, kesitsel/boylamsal. Süreç bir döngüdür; etik ilkeler her adımda geçerlidir.",
    ],
    terimler: [
      ["research", "araştırma", "A systematic process of collecting and analyzing data to answer a question or test a hypothesis."],
      ["empirical", "ampirik (deneysel/gözleme dayalı)", "Based on observation or data rather than theory or authority alone."],
      ["replicability", "tekrarlanabilirlik", "The ability of others to obtain the same results using the same methods and data."],
      ["deduction", "tümdengelim", "Reasoning from a general theory to a specific prediction."],
      ["induction", "tümevarım", "Reasoning from specific observations to a general pattern."],
      ["research question", "araştırma sorusu", "A clear, focused, researchable question that a study aims to answer."],
      ["dependent variable", "bağımlı değişken", "The outcome variable that the researcher seeks to explain."],
      ["independent variable", "bağımsız değişken", "A variable thought to influence the dependent variable."],
      ["control variable", "kontrol değişkeni", "A variable held constant or included to isolate the effect of the independent variable."],
      ["operationalization", "işlemselleştirme", "Defining an abstract concept in terms of measurable indicators."],
      ["hypothesis", "hipotez", "A testable statement about the relationship between variables."],
      ["null hypothesis", "sıfır hipotezi", "The hypothesis of no effect or no relationship (H₀)."],
      ["correlation", "korelasyon", "A statistical association between two variables."],
      ["causation", "nedensellik", "A relationship in which a change in one variable produces a change in another."],
      ["confounding variable", "karıştırıcı değişken", "A third variable that affects both the independent and the dependent variable."],
      ["reverse causality", "ters nedensellik", "When the presumed effect actually causes the presumed cause."],
      ["spurious correlation", "sahte korelasyon", "A correlation between variables that are not causally related."],
      ["experiment", "deney", "A study in which the researcher randomly assigns subjects to treatment and control groups."],
      ["observational study", "gözlemsel çalışma", "A study in which the researcher observes without assigning treatments."],
      ["cross-sectional data", "kesit verisi", "Data on many units at a single point in time."],
      ["longitudinal study", "boylamsal çalışma", "A study that follows the same units over time."],
      ["literature review", "literatür taraması", "A survey of existing research on a topic."],
      ["informed consent", "bilgilendirilmiş onam", "Participants' voluntary agreement after being told the purpose and risks of a study."],
      ["plagiarism", "intihal", "Presenting someone else's work or ideas as one's own."],
    ],
    quiz: [
      { s: "Which feature distinguishes scientific research from everyday information gathering?", c: ["It always uses computers", "It is systematic, empirical, and replicable", "It relies on expert opinion", "It always produces the expected result"], d: 1, a: "Bilimsel araştırma sistematik, ampirik (veriye dayalı) ve tekrarlanabilirdir." },
      { s: "Which is the best research question?", c: ["Is capitalism good?", "How is the economy?", "Is there a relationship between daily social media use and GPA among first-year economics students?", "Why are people the way they are?"], d: 2, a: "Açık, ölçülebilir değişkenleri ve anakütlesi olan, veriyle cevaplanabilir (pozitif) bir soru." },
      { s: "In a study of whether study hours affect exam scores, the exam score is the:", c: ["Independent variable", "Dependent variable", "Control variable", "Confounder"], d: 1, a: "Açıklanmak istenen sonuç bağımlı değişkendir." },
      { s: "Defining 'poverty' as 'income below 60% of the median' is an example of:", c: ["Operationalization", "Replication", "Deduction", "Plagiarism"], d: 0, a: "Soyut kavramı ölçülebilir bir göstergeye dönüştürmek işlemselleştirmedir." },
      { s: "The null hypothesis typically states that:", c: ["There is a strong effect", "There is no effect or no relationship", "The sample is biased", "The theory is true"], d: 1, a: "H₀: etki/ilişki yok. Veriyle reddedilmeye çalışılır." },
      { s: "Ice cream sales and drowning deaths are positively correlated. The most likely explanation is:", c: ["Ice cream causes drowning", "Drowning causes ice cream sales", "A confounding variable (hot weather) affects both", "The correlation must be a data error"], d: 2, a: "Sıcak hava ikisini de artırır: karıştırıcı değişken." },
      { s: "Healthier countries might grow faster, but faster growth might also make countries healthier. This is a problem of:", c: ["Reverse causality", "Replication", "Sampling", "Operationalization"], d: 0, a: "Etki ile neden yer değiştirebilir: ters nedensellik." },
      { s: "The most reliable way to establish causation is:", c: ["A large survey", "A randomized controlled experiment", "A strong correlation", "Expert interviews"], d: 1, a: "Rastgele atama karıştırıcıları gruplar arasında dengeler." },
      { s: "A study that surveys 500 households once in 2026 uses:", c: ["Longitudinal data", "Cross-sectional data", "Time-series data", "Experimental data"], d: 1, a: "Tek bir zamanda çok sayıda birim: kesit verisi." },
      { s: "Presenting another author's ideas without citation is:", c: ["Replication", "Plagiarism", "Operationalization", "Induction"], d: 1, a: "İntihal, ciddi bir etik ihlaldir." },
    ],
  });
})();
