// Colander 11e — 18. bölüm: Who Gets What? The Distribution of Income (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m18",
    hedefler: [
      "Gelir dağılımını Lorenz eğrisi ve Gini katsayısıyla ölçmek",
      "Büyüklüğe göre dağılım ile faktörlere (sosyoekonomik) göre dağılımı ayırmak",
      "Mutlak ve göreli yoksulluk kavramlarını açıklamak",
      "Gelir dağılımını ölçmenin sorunlarını saymak",
      "Adalete ilişkin farklı felsefi görüşleri (sonuç adaleti, süreç adaleti) tartışmak",
      "Yeniden dağıtım araçlarını ve maliyetlerini değerlendirmek",
    ],
    bolumler: [
      { baslik: "Gelir dağılımını ölçmek: Lorenz eğrisi", md: R`
1. bölümdeki üçüncü koordinasyon sorusu "**kimin için** üretilecek?" idi. Bu bölüm o soruyu ölçmeye çalışır.

En yaygın yöntem, haneleri gelirlerine göre sıralayıp beş eşit gruba (**%20'lik dilimler**, quintiles) ayırmak ve her dilimin toplam gelirden aldığı payı hesaplamaktır.

:::tanim Lorenz curve
A geometric representation of the share distribution of income among families in a given country at a given time; cumulative percentage of income against cumulative percentage of population.
:::

**Lorenz eğrisi**, yatay eksende nüfusun birikimli yüzdesini (en yoksuldan başlayarak), dikey eksende gelirin birikimli yüzdesini gösterir:

- Herkes aynı geliri alsaydı eğri **45 derecelik doğru** olurdu (tam eşitlik doğrusu).
- Eşitsizlik arttıkça eğri bu doğrudan **uzaklaşır** ve aşağı doğru sarkar.

:::tanim Gini coefficient
A measure of the area between the Lorenz curve and the line of perfect equality, divided by the total area below the line of perfect equality.
:::

$$G = \frac{A}{A + B}$$

Burada A, eşitlik doğrusu ile Lorenz eğrisi arasındaki alan; B, Lorenz eğrisinin altındaki alandır. **0 tam eşitlik, 1 tam eşitsizlik** (bütün gelir tek kişide).

{{lorenz}}

:::ornek Gini'yi dilimlerden hesapla
Dilimlerin gelir payları (yoksuldan zengine): %5, %10, %15, %25, %45. Lorenz noktalarını ve yaklaşık Gini katsayısını bul.
---cozum---
Birikimli paylar: (20, 5), (40, 15), (60, 30), (80, 55), (100, 100).

Lorenz eğrisinin altındaki alan (B), yamuklarla (her dilim 0,2 genişliğinde):
$$B = 0{,}2 \times \frac{0 + 0{,}05}{2} + 0{,}2 \times \frac{0{,}05 + 0{,}15}{2} + 0{,}2 \times \frac{0{,}15 + 0{,}30}{2} + 0{,}2 \times \frac{0{,}30 + 0{,}55}{2} + 0{,}2 \times \frac{0{,}55 + 1}{2}$$
$$B = 0{,}005 + 0{,}02 + 0{,}045 + 0{,}085 + 0{,}155 = 0{,}31$$

Eşitlik doğrusunun altındaki toplam alan 0,5 olduğundan $A = 0{,}5 - 0{,}31 = 0{,}19$ ve
$$G = \frac{0{,}19}{0{,}5} = 0{,}38$$

Kısa yol: $G = 1 - 2B = 1 - 0{,}62 = 0{,}38$. (Matematik dersinin 13. haftasında bunu integralle yapacaksın: $G = 1 - 2\int_0^1 L(x)\,dx$.)
:::

:::gercek
Harcanabilir gelirde Gini katsayısı İskandinav ülkelerinde 0,25–0,30, ABD'de 0,39 civarındadır; Türkiye'de TÜİK'in Gelir ve Yaşam Koşulları Araştırması'na göre 0,40'ın üzerindedir ve en zengin %20'lik dilim toplam gelirin yaklaşık yarısını alır. Servet dağılımı her ülkede gelir dağılımından çok daha eşitsizdir.
:::
` },
      { baslik: "Dağılımın türleri", md: R`
İki farklı bakış açısı vardır:

- **Büyüklüğe göre dağılım (size distribution):** hanelerin gelir düzeyine göre dağılımı — Lorenz eğrisi budur.
- **Sosyoekonomik (fonksiyonel) dağılım:** gelirin **üretim faktörleri** arasında — emek (ücret), sermaye (faiz, kâr), toprak (kira) — ya da toplumsal gruplar (yaş, cinsiyet, bölge, eğitim) arasında dağılımı.

Fonksiyonel dağılımda son on yıllarda dünyanın birçok yerinde **emeğin payı azaldı**, sermayenin payı arttı. Sermaye geliri daha az kişide yoğunlaştığı için bu, kişisel gelir eşitsizliğini de artırır.

### Gelir ve servet
**Gelir** bir akımdır (yılda kazanılan), **servet** bir stoktur (sahip olunan varlıkların değeri). Servet, gelirden çok daha eşitsiz dağılır: miras, sermaye getirisi ve birikim, servetin kendini büyütmesine yol açar. Thomas Piketty, sermayenin getirisi ekonominin büyüme hızından yüksek olduğunda ($r > g$) servet eşitsizliğinin artma eğiliminde olduğunu savunmuştur.
` },
      { baslik: "Yoksulluk", md: R`
Yoksulluğu iki biçimde tanımlarız:

:::tanim Absolute poverty
Having insufficient income to meet basic needs (food, shelter, clothing), measured against a fixed poverty line.
:::

:::tanim Relative poverty
Having significantly less income than the typical person in one's society, e.g., below 50% or 60% of median income.
:::

- **Mutlak yoksulluk:** sabit bir eşiğin altında kalmak. ABD'nin resmî yoksulluk sınırı, temel gıda sepetinin maliyetine dayanır. Dünya Bankası'nın uluslararası **aşırı yoksulluk sınırı** satın alma gücü paritesiyle kişi başı günde birkaç dolardır (2025'te 3 dolara güncellendi). Bu ölçüyle aşırı yoksulluk son kırk yılda dünyada çarpıcı biçimde azaldı.
- **Göreli yoksulluk:** toplumun tipik üyesine göre çok az gelire sahip olmak — genellikle **medyan gelirin %50'si ya da %60'ı** eşik alınır. Toplum zenginleşse bile göreli yoksulluk düşmeyebilir; çünkü eşik de yükselir.

İkisi farklı soruları yanıtlar: mutlak yoksulluk "temel ihtiyaçlar karşılanıyor mu?", göreli yoksulluk "insanlar toplumun yaşamına katılabiliyor mu?" sorusunu.

:::gercek
TÜİK, Türkiye'de göreli yoksulluğu eşdeğer hane kullanılabilir medyan gelirinin %50'si ve %60'ı üzerinden hesaplar. Yoksulluk riski özellikle kalabalık hanelerde, çocuklarda, tarımda çalışanlarda ve eğitim düzeyi düşük hane reislerinde yüksektir.
:::
` },
      { baslik: "Ölçmenin sorunları", md: R`
Gelir dağılımı istatistikleri dikkatle okunmalıdır:

1. **Hane büyüklüğü:** dört kişilik bir hanenin geliri ile tek kişilik bir hanenin aynı geliri aynı refahı göstermez. Bu yüzden "eşdeğer hane geliri" kullanılır.
2. **Vergiler ve transferler:** vergi öncesi (piyasa) gelir mi, vergi ve sosyal yardım sonrası (harcanabilir) gelir mi? İkincisi daha eşittir.
3. **Ayni yardımlar:** ücretsiz sağlık, eğitim, kömür yardımı gibi para dışı faydalar çoğu zaman gelir istatistiklerinde görünmez.
4. **Yaşam boyu gelir ve hareketlilik:** bir yıllık gelir yanıltıcı olabilir. Öğrenciler ve yeni emekliler düşük gelirli görünür ama yaşam boyu gelirleri yüksek olabilir. Önemli olan insanların dilimler arasında **hareket edip edemediğidir** (gelir hareketliliği).
5. **Kayıt dışılık:** gelirin önemli bir kısmının kayıt dışı olduğu ülkelerde anketler gerçek dağılımı tam yakalayamaz.

:::ipucu
Sınavda "Gini katsayısı düştü, demek ki yoksullar daha iyi durumda" çıkarımına dikkat: Gini **göreli** bir ölçüdür. Herkes fakirleşirken de düşebilir, herkes zenginleşirken artabilir.
:::
` },
      { baslik: "Adil dağılım nedir?", md: R`
Dağılımın ne kadar eşit *olması gerektiği* normatif bir sorudur (1. bölüm). Colander iki temel adalet anlayışını karşılaştırır:

- **Sonuçların adaleti (fairness of results):** sonuçların kendisi değerlendirilir; çok eşitsiz bir dağılım, nasıl ortaya çıkmış olursa olsun haksızdır.
- **Sürecin adaleti (fairness of process):** önemli olan kuralların adil olmasıdır; adil bir süreçten (gönüllü alışveriş, eşit fırsat) çıkan sonuç, eşitsiz bile olsa adildir.

Felsefi geleneklerden örnekler:

- **Faydacılık (utilitarianism):** toplam faydayı en büyükle. Azalan marjinal fayda (19. bölüm) varsa zenginden yoksula aktarılan bir lira toplam faydayı artırır → eşitlik yönünde bir argüman. Ama çalışma teşviklerini bozarsa pasta küçülür.
- **John Rawls — bilgisizlik peçesi:** toplumda hangi konumda doğacağını bilmeseydin hangi kuralları seçerdin? Rawls'a göre insanlar en kötü durumdakinin durumunu en iyi yapan düzeni seçerdi.
- **Robert Nozick — hak etme kuramı:** mülkiyet adil yollarla edinildiyse ve gönüllü aktarıldıysa sonuç adildir; devletin yeniden dağıtımı haksızdır.

Bu tartışmanın iktisadi çekirdeği **etkinlik–eşitlik değiş tokuşudur**: yeniden dağıtımın teşvikler üzerinde maliyeti olabilir. Arthur Okun'un "**sızdıran kova**" benzetmesi: zenginden yoksula para taşırken kovadan bir miktar su (vergi kaybı, teşvik bozulması, idari maliyet) sızar. Soru, ne kadar sızıntıya katlanmaya razı olduğumuzdur.
` },
      { baslik: "Yeniden dağıtım politikaları", md: R`
Devletin gelir dağılımını etkilemek için iki ana aracı vardır:

**1. Vergiler.**
- **Artan oranlı vergiler** (gelir vergisi dilimleri) yüksek gelirlilerden oransal olarak daha çok alır.
- Ama verginin **iktisadi yükü** (7. bölüm) yasal yükten farklı olabilir; ayrıca KDV gibi harcama vergileri azalan oranlı etki yapar. Türkiye'de vergi gelirlerinin büyük kısmı dolaylı vergilerden geldiği için vergi sisteminin yeniden dağıtıcı etkisi sınırlıdır.

**2. Harcama programları.**
- **Gelire bağlı (means-tested) yardımlar:** yalnız belirli gelirin altındakilere verilir. Hedeflemesi iyidir ama "yoksulluk tuzağı" riski vardır: gelir arttıkça yardım kesildiği için ek kazanç fiilen yüksek oranla "vergilenir".
- **Evrensel programlar:** herkese açık sağlık ve eğitim, çocuk yardımı.
- **Sosyal sigorta:** emeklilik, işsizlik sigortası.

**Alternatif öneriler:**
- **Negatif gelir vergisi:** belirli bir gelirin altındakilere devlet ödeme yapar, gelir arttıkça ödeme yavaş yavaş azalır; çalışma teşviki korunur.
- **Evrensel temel gelir (universal basic income):** herkese koşulsuz düzenli ödeme. Yoksulluk tuzağını ortadan kaldırır ama çok pahalıdır ve çalışma teşvikine etkisi tartışmalıdır.

:::dikkat
Yeniden dağıtımın değerlendirilmesinde iktisatçının rolü (pozitif iktisat) maliyetleri ve etkileri ölçmektir; ne kadar eşitlik istendiği (normatif) toplumun kararıdır. İkisini karıştırmamak Colander'ın en çok vurguladığı noktalardan biridir.
:::
` },
    ],
    ozet: [
      "Lorenz eğrisi birikimli nüfus payına karşı birikimli gelir payını gösterir; eşitlikten uzaklaştıkça sarkar.",
      "Gini = A/(A + B) = 1 − 2B; 0 tam eşitlik, 1 tam eşitsizlik.",
      "Büyüklüğe göre dağılım ile faktörlere göre (fonksiyonel) dağılım farklıdır; servet gelirden çok daha eşitsiz dağılır.",
      "Mutlak yoksulluk sabit bir eşiğe, göreli yoksulluk medyan gelire göre tanımlanır.",
      "Ölçüm sorunları: hane büyüklüğü, vergi–transfer, ayni yardımlar, yaşam boyu gelir ve hareketlilik, kayıt dışılık.",
      "Adalet: sonuç adaleti ile süreç adaleti; faydacılık, Rawls, Nozick. Etkinlik–eşitlik değiş tokuşu (Okun'un sızdıran kovası).",
      "Araçlar: artan oranlı vergiler, gelire bağlı ve evrensel yardımlar, sosyal sigorta, negatif gelir vergisi, temel gelir.",
    ],
    terimler: [
      ["Lorenz curve", "Lorenz eğrisi", "A geometric representation of the share distribution of income: cumulative share of income against cumulative share of population."],
      ["Gini coefficient", "Gini katsayısı", "The area between the Lorenz curve and the line of perfect equality divided by the total area below the line of perfect equality."],
      ["quintile", "%20'lik dilim", "One-fifth of the population ranked by income."],
      ["size distribution of income", "büyüklüğe göre gelir dağılımı", "The way total income is divided up among households according to their income levels."],
      ["socioeconomic (functional) distribution", "fonksiyonel gelir dağılımı", "The allocation of income among relevant socioeconomic groups or among factors of production."],
      ["wealth", "servet", "The value of the things individuals own less the value of what they owe; a stock rather than a flow."],
      ["absolute poverty", "mutlak yoksulluk", "Having insufficient income to meet basic needs, measured against a fixed line."],
      ["relative poverty", "göreli yoksulluk", "Having significantly less income than the typical member of society, e.g., below 60% of median income."],
      ["poverty threshold", "yoksulluk sınırı", "The income level below which a household is classified as poor."],
      ["income mobility", "gelir hareketliliği", "The movement of individuals or households between income groups over time."],
      ["fairness of process", "süreç adaleti", "Judging fairness by whether the rules and procedures are fair."],
      ["fairness of results", "sonuç adaleti", "Judging fairness by the outcomes themselves."],
      ["equity–efficiency trade-off", "etkinlik–eşitlik değiş tokuşu", "Redistribution can reduce incentives and total output."],
      ["means-tested program", "gelire bağlı yardım", "A program whose benefits go only to people below a certain income level."],
      ["negative income tax", "negatif gelir vergisi", "A tax system that pays people with low income, with payments phasing out gradually as income rises."],
      ["universal basic income", "evrensel temel gelir", "An unconditional periodic payment from the government to every individual."],
    ],
    quiz: [
      { s: "If income were distributed perfectly equally, the Lorenz curve would be:", c: ["A vertical line", "The 45-degree line", "A horizontal line at zero", "Bowed far below the 45-degree line"], d: 1, a: "Herkes aynı geliri alırsa nüfusun %x'i gelirin %x'ini alır: 45 derece doğrusu." },
      { s: "The Gini coefficient ranges from:", c: ["−1 to 1", "0 (perfect equality) to 1 (perfect inequality)", "0 to 100 with 100 meaning equality", "1 to 10"], d: 1, a: "0 tam eşitlik, 1 bütün gelirin tek kişide olması." },
      { s: "If the area between the Lorenz curve and the line of equality is 0.2, the Gini coefficient is:", c: ["0.2", "0.4", "0.6", "0.8"], d: 1, a: "G = A / 0,5 = 0,2 / 0,5 = 0,4." },
      { s: "Quintile shares (poorest to richest) are 5, 10, 15, 25, 45 percent. The richest 20% receive:", c: ["25%", "45%", "55%", "100%"], d: 1, a: "Son dilim en zengin %20'dir: %45." },
      { s: "The distribution of income among factors of production (wages, rent, interest, profit) is called the:", c: ["Size distribution", "Socioeconomic (functional) distribution", "Lorenz distribution", "Poverty distribution"], d: 1, a: "Faktörlere ya da toplumsal gruplara göre dağılım fonksiyonel/sosyoekonomik dağılımdır." },
      { s: "Compared with the distribution of income, the distribution of wealth is generally:", c: ["More equal", "Less equal", "Identical", "Impossible to measure"], d: 1, a: "Servet birikim ve miras yoluyla yoğunlaşır; gelirden çok daha eşitsiz dağılır." },
      { s: "Relative poverty is typically defined as:", c: ["Income below a fixed amount needed for food", "Income below a certain percentage (e.g., 50–60%) of median income", "Having no income", "Being unemployed"], d: 1, a: "Göreli yoksulluk toplumun tipik gelirine göre tanımlanır; eşik toplum zenginleştikçe yükselir." },
      { s: "Which is a problem in interpreting annual income distribution statistics?", c: ["Incomes never change", "Students and retirees may have low annual but high lifetime incomes", "Taxes don't affect income", "Household size never varies"], d: 1, a: "Bir yıllık gelir yaşam döngüsünü görmez; hareketlilik ve yaşam boyu gelir önemlidir." },
      { s: "John Rawls argued that a just society is one that people would choose:", c: ["After knowing their position in society", "Behind a veil of ignorance, not knowing their position", "Through market exchange only", "To maximize total utility regardless of distribution"], d: 1, a: "Bilgisizlik peçesi: konumunu bilmeyen biri en kötü durumdakini koruyan kuralları seçerdi." },
      { s: "Judging a distribution as fair if it results from voluntary exchange under fair rules reflects:", c: ["Fairness of results", "Fairness of process", "Utilitarianism", "Relative poverty"], d: 1, a: "Süreç adaleti kuralların adilliğine bakar; Nozick'in görüşü bu yöndedir." },
      { s: "Okun's 'leaky bucket' refers to:", c: ["Leaks in the water supply", "The efficiency costs incurred when redistributing income", "Tax evasion only", "Capital flight"], d: 1, a: "Zenginden yoksula aktarılırken vergi kaybı, teşvik bozulması ve idari maliyet olarak bir kısım 'sızar'." },
      { s: "A means-tested program can create a 'poverty trap' because:", c: ["Benefits rise as income rises", "Benefits are withdrawn as earnings rise, reducing the incentive to earn more", "It is universal", "It is financed by tariffs"], d: 1, a: "Gelir arttıkça yardım kesilince ek kazanç fiilen yüksek oranla vergilenmiş olur." },
    ],
  });
})();
