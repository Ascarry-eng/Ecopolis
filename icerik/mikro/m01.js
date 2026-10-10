// Colander 11e — 1. bölüm: Economics and Economic Reasoning (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m01",
    hedefler: [
      "İktisadın tanımını ve her ekonominin çözmek zorunda olduğu üç koordinasyon sorununu söyleyebilmek",
      "Marjinal fayda–marjinal maliyet karşılaştırmasıyla karar vermek (iktisadi karar kuralı)",
      "Fırsat maliyetini hesaplamak; örtük maliyeti dahil edip batık maliyeti dışarıda bırakmak",
      "Olayları iktisadi, toplumsal ve siyasi güçlerin etkileşimi olarak açıklamak",
      "Pozitif iktisat, normatif iktisat ve iktisat sanatını birbirinden ayırmak",
    ],
    bolumler: [
      { baslik: "İktisat ne çalışır?", md: R`
Colander iktisadı çok geniş tanımlar: insanların istek ve arzularını, toplumun karar alma mekanizmaları, gelenekleri ve siyasi gerçekleri içinde nasıl **koordine ettiğinin** incelenmesi.

:::tanim Economics
The study of how human beings coordinate their wants and desires, given the decision-making mechanisms, social customs, and political realities of the society.
:::

Bu tanımın kalbinde **kıtlık (scarcity)** yatar: insanlar üretilebilecek olandan fazlasını ister. Kıtlık "az mal var" demek değildir; isteklerle kaynaklar arasındaki *ilişkidir*. Bu yüzden kıtlığın derecesi zamanla değişir: teknoloji ilerledikçe üretilebilen artar, ama istekler de büyür.

Her toplum, ister piyasa ekonomisi ister planlı ekonomi olsun, üç **koordinasyon sorununu** çözmek zorundadır:

1. **Ne ve ne kadar üretilecek?** (What, and how much, to produce)
2. **Nasıl üretilecek?** (How to produce it)
3. **Kimin için üretilecek?** (For whom to produce it)

:::ipucu
Sınavda "the three central coordination problems" diye sorulur ve sırayla bu üçü beklenir. "Kimin için" sorusu bölüşümle (distribution) ilgilidir; ilk iki soru etkinlikle.
:::

### Mikro ve makro
İktisat kuramı ikiye ayrılır:

- **Mikroekonomi (microeconomics):** bireysel seçimi ve bu seçimin iktisadi güçlerden nasıl etkilendiğini inceler — bir firmanın fiyatlaması, bir hanenin ne alacağı, piyasaların kaynakları farklı amaçlar arasında nasıl dağıttığı.
- **Makroekonomi (macroeconomics):** ekonomiyi bir bütün olarak inceler — enflasyon, işsizlik, büyüme.

İkisi birbirinden kopuk değildir: makro olaylar sonuçta milyonlarca mikro kararın toplamıdır.
` },
      { baslik: "İktisatçı gibi düşünmek: marjinal karar", md: R`
"İktisatçı gibi düşünmek" her soruyu bir **maliyet–fayda** çerçevesine oturtmak ve önemsiz ayrıntıları soyutlayıp önemli olana odaklanmak demektir. Colander burada *Freakonomics*'ten (Levitt) örnek verir: uyuşturucu satıcılığı gibi "iktisat dışı" görünen kararlar bile beklenen fayda ile maliyetin karşılaştırılmasıyla anlaşılabilir.

Kararların çoğu "hep ya da hiç" değil, "biraz daha mı, biraz daha az mı?" sorusudur. Bu yüzden iktisatçı **marjinal** düşünür:

:::tanim Marginal cost
The additional cost to you over and above the costs you have already incurred.
:::

:::tanim Marginal benefit
The additional benefit above what you have already derived.
:::

Buradan iktisadın en temel kuralı çıkar:

> $$\begin{gathered}\text{MB} > \text{MC} \;\Rightarrow\; \text{yap}\ \text{MC} > \text{MB} \;\Rightarrow\; \text{yapma}\end{gathered}$$

Bu kurala **iktisadi karar kuralı (economic decision rule)** denir. Aşağıdaki görselde sınav öncesi her ek saatin faydası azalıyor (ilk saatler çok şey öğretir, sonrakiler daha az), maliyeti artıyor (her saat daha değerli bir şeyden — uykudan, sosyal hayattan — vazgeçiyorsun). En iyi nokta MB = MC.

{{marjinal-karar}}

:::dikkat
Marjinal karar kuralı **toplam** fayda ile toplam maliyeti karşılaştırmaz. 6 saat çalışmak toplamda çok faydalı olabilir; soru 7. saatin kendisinin değip değmediğidir.
:::
` },
      { baslik: "Fırsat maliyeti", md: R`
İktisadi akıl yürütmenin dayandığı öncül şudur: **her şeyin bir maliyeti vardır**. Bir şeyi seçmek, başka bir şeyden vazgeçmek demektir.

:::tanim Opportunity cost
The benefit that you might have gained from choosing the next-best alternative.
:::

Dikkat: fırsat maliyeti vazgeçtiğin *bütün* seçeneklerin toplamı değil, **bir sonraki en iyi** seçeneğin değeridir. Akılcı bir seçimde, seçtiğin şeyin faydası fırsat maliyetinden büyük olmalıdır.

### Örtük maliyetler ve batık maliyetler
Fırsat maliyeti, muhasebe hesabında kolayca unutulan iki şeye dikkat çeker:

- **Örtük maliyet (implicit cost):** kararın getirdiği ama muhasebe kayıtlarında görünmeyen maliyet. Üniversite okurken çalışmadığın için kaybettiğin maaş en tipik örnektir. **Fırsat maliyetine dahil edilir.**
- **Batık maliyet (sunk cost):** önceden harcanmış, geri gelmeyecek maliyet. Colander bunlara "yanıltıcı batık maliyetler (illusionary sunk costs)" der: hesaplarda görünürler ama kararla ilgileri yoktur. **Fırsat maliyetine dahil edilmez.**

:::ornek Üniversitenin fırsat maliyeti
Bir yıllık okul harcı ve kitaplar 60.000 TL. Okumasaydın asgari ücretle tam zamanlı çalışıp yılda 250.000 TL kazanabilirdin. Okusan da okumasan da yemek ve barınma için 150.000 TL harcayacaksın. Üniversitenin bir yıllık fırsat maliyeti nedir?
---cozum---
Fırsat maliyeti = doğrudan harcamalar + vazgeçilen gelir = 60.000 + 250.000 = **310.000 TL**.

Yemek ve barınma dahil edilmez: okusan da okumasan da yapacağın bir harcamadır, yani bu karara bağlı değildir. Vazgeçilen gelir ise muhasebe defterinde görünmediği hâlde fırsat maliyetinin en büyük kalemidir — örtük maliyet budur.
:::

:::ornek Batık maliyet tuzağı
Konser biletine 1.500 TL verdin. Konser günü çok hastasın ve gitmek sana keyif değil eziyet verecek. "Paraya yazık" diye gitmeli misin?
---cozum---
Hayır. 1.500 TL gitsen de gitmesen de geri gelmeyecek: **batık maliyettir**, karara girmez. Karar yalnız bundan sonrasının marjinal faydası ile marjinal maliyetine bakar: evde dinlenmek (vazgeçilen şey) gitmekten daha değerliyse gitme.
:::

İktisatçıların bütün bu fikri tek cümleye sığdırdığı söz: **"There ain't no such thing as a free lunch"** — bedava öğle yemeği diye bir şey yoktur (TANSTAAFL). "Bedava" görünen şeyin bile birinin vazgeçtiği bir maliyeti vardır.

:::gercek
"Ücretsiz" kamu hizmetleri de bedava değildir: hastane, okul ya da köprü için harcanan kaynak, başka bir kamu harcamasından (ya da vergi olarak hanelerin tüketiminden) vazgeçilerek sağlanır. Devlet kararlarının da fırsat maliyeti vardır.
:::
` },
      { baslik: "İktisadi güçler, toplumsal ve siyasi güçler", md: R`
Kıtlık varsa, onun zorunlu tepkileri de vardır. Colander bunlara **iktisadi güçler (economic forces)** der: kıt olan şeyin bir şekilde paylaştırılması gerekir — fiyatla, kuyrukla, torpille ya da kurayla.

:::tanim Market force
An economic force that is given relatively free rein by society to work through the market.
:::

Piyasada bu kuvvetleri yönlendiren mekanizma **görünmez el (invisible hand)**, yani fiyat mekanizmasıdır:

- **Kıtlık (shortage)** varsa — insanların almak istediği satılandan fazlaysa — fiyat **yükselir**.
- **Fazlalık (surplus)** varsa fiyat **düşer**.

Önemli ayrım: iktisadi güçler *her zaman* işler; piyasa güçleri ise yalnızca toplum izin verdiği ölçüde işler. Toplumlar bazen fiyat mekanizmasını kasten durdurur: organ satışını yasaklamak, kira artışına sınır koymak gibi.

Gerçek dünyada olanlar üç gücün etkileşimidir:

- **İktisadi güçler** (kıtlığın tepkisi),
- **Toplumsal güçler (social forces):** gelenekler, ahlaki yargılar, "bu yapılmaz" hissi,
- **Siyasi güçler (political forces):** yasalar ve düzenlemeler.

Toplumsal ve siyasi güçler sıklıkla birlikte, görünmez ele *karşı* çalışır.

:::gercek
Türkiye'de 2022 ortasından 2024 ortasına kadar konut kiralarındaki yıllık artışa %25 sınırı getirildi. Yüksek enflasyonda piyasa güçleri kiraları çok daha hızlı artırmak istiyordu; siyasi güç bu artışı sınırladı. İktisadi güç ise ortadan kalkmadı: yeni sözleşmelerde kiralar sıçradı, ev sahipleri kiracıyı çıkarma yollarına başvurdu, kira anlaşmazlıkları arttı. Kıtlık bir şekilde paylaştırılıyordu — fiyatla değilse başka yollarla.
:::
` },
      { baslik: "İktisadi içgörüler: kuram, model, ilke", md: R`
İktisatçılar bilgilerini **kuramlar (theories)** içinde toplar. Kuramlar tek tek durumlara doğrudan uygulanamayacak kadar soyuttur; bu yüzden **modeller** ve **ilkeler** aracılığıyla kullanılır.

- **İktisadi model (economic model):** kuramın genel içgörüsünü daha somut bir bağlama yerleştiren çerçeve. (Arz–talep modeli en ünlüsüdür.)
- **İktisadi ilke (economic principle):** yasa ya da genel varsayım biçiminde ifade edilmiş, yaygın kabul gören içgörü. (Ör. artan marjinal fırsat maliyeti ilkesi.)

Modeller ve ilkeler sürekli sınanır: modelin tahminleri veriyle örtüşüyor mu? Modellerden iki tür sonuç çıkar:

- **Teorem (theorem):** modelin varsayımlarından mantıksal olarak çıkan önerme.
- **Politika ilkesi (precept):** teoremlerin, değer yargılarıyla ve gerçek dünya kurumları bilgisiyle birleştirilmesinden çıkan politika kuralı ("şu politika şundan iyidir").

### Görünmez el teoremi

:::tanim Invisible hand theorem
A market economy, through the price mechanism, will tend to allocate resources efficiently.
:::

Burada **etkinlik (efficiency)** bir amaca olabildiğince ucuza ulaşmak demektir. Teorem şunu söyler: arz talepten fazlaysa fiyat düşme, talep arzdan fazlaysa yükselme eğilimindedir; bu ayarlama kaynakları en çok değer verenlere doğru iter.

:::dikkat
Teorem *model içinde* doğrudur; gerçek dünyaya uygulamak için **iktisadi kurumları** — yasaları, alışkanlıkları, örgütleri — bilmek gerekir. Kurumlar ülkeden ülkeye çok farklıdır ve bazen kuramın öngördüğünden farklı işler. Colander bu yüzden 3. bölümü tamamen kurumlara ayırır.
:::
` },
      { baslik: "Pozitif, normatif ve iktisat sanatı", md: R`
**İktisat politikası (economic policy)**, devletin iktisadi sonuçları etkilemek için yaptığı (ya da bilerek yapmadığı) eylemlerdir. Politika analizi iki türlüdür:

- **Nesnel (objective) analiz:** değer yargılarını analizden ayrı tutar.
- **Öznel (subjective) analiz:** analizcinin "nasıl olmalı" görüşünü yansıtır.

Bu ayrımı korumak için Colander iktisadı üç kategoriye böler:

| Kategori | Sorduğu soru | Örnek |
|---|---|---|
| **Pozitif iktisat** (positive economics) | Ne *var*, ekonomi nasıl işliyor? | Asgari ücret %30 artarsa genç istihdamı ne kadar değişir? |
| **Normatif iktisat** (normative economics) | Ekonominin amaçları ne *olmalı*? | Gelir dağılımı daha eşit olmalı mı? |
| **İktisat sanatı** (art of economics) | Pozitif bilgiyi kullanarak normatif amaçlara nasıl ulaşılır? | Gelir eşitsizliğini azaltmak için hangi vergi tasarımı, bu ülkenin kurumlarında en iyi çalışır? |

:::ipucu
Pozitif ifade ilke olarak **veriyle sınanabilir** (doğru ya da yanlış çıkabilir). Normatif ifadede genellikle "olmalı, gerekir, adil, iyi" gibi bir değer yargısı vardır. Sınavda en çok bu ayrım sorulur.
:::

Colander normatif tartışmada Adam Smith'in **tarafsız gözlemci (impartial spectator)** fikrini hatırlatır: kendi çıkarını bir kenara bırakıp, durumu dışarıdan bakan tarafsız birinin gözüyle değerlendirmek. İyi bir normatif iktisatçı "bana ne faydası var?" diye değil, "tarafsız biri neyi adil bulurdu?" diye sorar.
` },
    ],
    ozet: [
      "İktisat, insanların istek ve arzularını toplumun kurumları içinde nasıl koordine ettiğini inceler; temel sorun kıtlıktır.",
      "Üç koordinasyon sorunu: ne ve ne kadar, nasıl, kimin için üretilecek.",
      "İktisadi karar kuralı: MB > MC ise yap, MC > MB ise yapma.",
      "Fırsat maliyeti, bir sonraki en iyi seçeneğin faydasıdır; örtük maliyetler dahil, batık maliyetler hariç. TANSTAAFL.",
      "İktisadi güçler hep işler; piyasa güçleri toplumun izin verdiği ölçüde. Gerçek dünya iktisadi, toplumsal ve siyasi güçlerin etkileşimidir.",
      "Görünmez el teoremi: fiyat mekanizması kaynakları etkin dağıtma eğilimindedir — ama kurumlar bilinmeden gerçeğe uygulanamaz.",
      "Pozitif iktisat (ne var), normatif iktisat (ne olmalı), iktisat sanatı (amaca nasıl ulaşılır).",
    ],
    terimler: [
      ["economics", "iktisat", "The study of how human beings coordinate their wants and desires, given the decision-making mechanisms, social customs, and political realities of society."],
      ["scarcity", "kıtlık", "The goods available are too few to satisfy individuals' desires."],
      ["microeconomics", "mikroekonomi", "The study of individual choice, and how that choice is influenced by economic forces."],
      ["macroeconomics", "makroekonomi", "The study of the economy as a whole: inflation, unemployment, business cycles and growth."],
      ["marginal cost", "marjinal maliyet", "The additional cost over and above costs already incurred."],
      ["marginal benefit", "marjinal fayda", "The additional benefit above what has already been derived."],
      ["economic decision rule", "iktisadi karar kuralı", "If the marginal benefits of doing something exceed the marginal costs, do it; if the marginal costs exceed the marginal benefits, don't."],
      ["opportunity cost", "fırsat maliyeti", "The benefit that you might have gained from choosing the next-best alternative."],
      ["implicit cost", "örtük maliyet", "A cost of a decision that is not included in normal accounting costs, such as forgone income."],
      ["sunk cost", "batık maliyet", "A cost that has already been incurred and cannot be recovered; it should not affect decisions."],
      ["economic force", "iktisadi güç", "The necessary reactions to scarcity."],
      ["market force", "piyasa gücü", "An economic force that is given relatively free rein by society to work through the market."],
      ["invisible hand", "görünmez el", "The price mechanism; the rise and fall of prices that guides our actions in a market."],
      ["invisible hand theorem", "görünmez el teoremi", "A market economy, through the price mechanism, will tend to allocate resources efficiently."],
      ["efficiency", "etkinlik", "Achieving a goal as cheaply as possible."],
      ["economic model", "iktisadi model", "A framework that places the generalized insights of a theory in a more specific contextual setting."],
      ["economic principle", "iktisadi ilke", "A commonly held economic insight stated as a law or principle."],
      ["theorem", "teorem", "A proposition that is logically true based on the assumptions in a model."],
      ["precept", "politika ilkesi", "A policy rule that concludes that a particular course of action is preferable."],
      ["economic institutions", "iktisadi kurumlar", "The laws, common practices, and organizations in a society that affect the economy."],
      ["positive economics", "pozitif iktisat", "The study of what is, and how the economy works."],
      ["normative economics", "normatif iktisat", "The study of what the goals of the economy should be."],
      ["art of economics", "iktisat sanatı", "The application of the knowledge learned in positive economics to the achievement of the goals determined in normative economics."],
    ],
    quiz: [
      { s: "Which of the following is NOT one of the three central coordination problems every economy must solve?", c: ["What, and how much, to produce", "How to produce it", "For whom to produce it", "How to eliminate scarcity"], d: 3, a: "Üç koordinasyon sorunu ne, nasıl ve kimin için üretileceğidir. Kıtlık ortadan kaldırılamaz; ekonomiler onunla yaşamayı koordine eder." },
      { s: "You are deciding whether to study one more hour. The marginal benefit of the hour is 8 points and the marginal cost is 11 points. According to the economic decision rule, you should:", c: ["Study the hour, because total benefits are positive", "Not study the hour, because MC > MB", "Study the hour, because benefits always exceed costs for education", "Be indifferent"], d: 1, a: "Kural marjinal büyüklükleri karşılaştırır: MC (11) > MB (8) ise o saati çalışma. Toplam faydanın pozitif olması bu kararı değiştirmez." },
      { s: "The opportunity cost of going to university includes all of the following EXCEPT:", c: ["Tuition fees", "Books", "Income forgone from not working full-time", "Food you would have eaten anyway"], d: 3, a: "Okusan da okumasan da yiyeceğin yemek karara bağlı değildir, fırsat maliyetine girmez. Vazgeçilen gelir (örtük maliyet) ise girer — çoğu zaman en büyük kalemdir." },
      { s: "Sunk costs should:", c: ["Always be included in opportunity cost", "Be ignored when making decisions about the future", "Be counted twice because they are certain", "Be treated as implicit costs"], d: 1, a: "Batık maliyet geri gelmez; ne karar verirsen ver aynıdır. Colander'a göre örtük maliyetler fırsat maliyetine dahil edilir, (yanıltıcı) batık maliyetler edilmez." },
      { s: "\"There ain't no such thing as a free lunch\" embodies the concept of:", c: ["Marginal benefit", "Opportunity cost", "The invisible hand", "Normative economics"], d: 1, a: "TANSTAAFL: bedava görünen şeyin de birinin vazgeçtiği bir maliyeti vardır — fırsat maliyetinin tek cümlelik özeti." },
      { s: "If there is a shortage of a good in a free market, the invisible hand will tend to:", c: ["Lower the price", "Raise the price", "Leave the price unchanged", "Increase the government's role"], d: 1, a: "Kıtlıkta (talep miktarı > arz miktarı) alıcılar daha fazla öder, fiyat yükselir. Fazlalıkta fiyat düşer." },
      { s: "Which statement best describes the relationship between economic forces and market forces?", c: ["They are the same thing", "Market forces always operate; economic forces operate only in markets", "Economic forces always operate; market forces operate only when society allows them free rein", "Neither operates when there is government regulation"], d: 2, a: "Kıtlığın tepkisi olan iktisadi güçler her zaman vardır. Piyasa güçleri ise toplum fiyat mekanizmasına izin verdiği ölçüde işler; verilmezse kıtlık kuyruk, torpil vb. yollarla paylaştırılır." },
      { s: "\"A minimum wage increase of 10% will reduce teenage employment by 2%\" is an example of a:", c: ["Normative statement", "Positive statement", "Statement in the art of economics", "Precept"], d: 1, a: "İfade doğru ya da yanlış çıkabilir; veriyle sınanabilir. Değer yargısı içermez: pozitif iktisat." },
      { s: "Which of the following is a normative statement?", c: ["Rent controls reduce the quantity of housing supplied", "Unemployment rose last year", "The government should reduce income inequality", "Higher prices reduce the quantity demanded"], d: 2, a: "\"Should\" bir değer yargısıdır: ekonominin amacının ne olması gerektiğini söyler — normatif iktisat." },
      { s: "The invisible hand theorem states that:", c: ["Government planning allocates resources efficiently", "A market economy, through the price mechanism, will tend to allocate resources efficiently", "Markets always produce a fair distribution of income", "Social forces always override market forces"], d: 1, a: "Teorem etkinlik hakkındadır, adalet hakkında değil. Ayrıca model içinde doğrudur; uygulamak için kurumları bilmek gerekir." },
      { s: "A precept differs from a theorem in that a precept:", c: ["Follows logically from the assumptions of a model alone", "Combines theorems with value judgments and knowledge of real-world institutions to recommend a policy", "Cannot be applied to policy", "Is always a positive statement"], d: 1, a: "Teorem modelin varsayımlarından mantıkla çıkar. Politika ilkesi (precept) teoremleri değer yargıları ve kurum bilgisiyle birleştirip \"şu politika tercih edilir\" der." },
      { s: "Microeconomics would most likely study:", c: ["The national inflation rate", "Economic growth across countries", "How a firm decides what price to charge", "The total unemployment rate"], d: 2, a: "Bireysel karar birimlerinin (firma, hane) seçimleri mikroekonominin konusudur; enflasyon, büyüme ve toplam işsizlik makroekonominin." },
    ],
  });
})();
