// Colander 11e — 17. bölüm: Work and the Labor Market (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m17",
    hedefler: [
      "Emek arzını ücretin ikame ve gelir etkileriyle açıklamak",
      "Emek talebinin türev talep olduğunu; firmanın MRP = W kuralına göre işçi aldığını göstermek",
      "Emek talebinin esnekliğini belirleyen etkenleri saymak",
      "Asgari ücretin rekabetçi piyasada ve monopsonda etkilerini karşılaştırmak",
      "Ücret farklılıklarını (beşeri sermaye, telafi edici farklar, ayrımcılık) açıklamak",
      "Yapay zekâ ve teknolojinin emek piyasasına etkilerini tartışmak",
    ],
    bolumler: [
      { baslik: "Emek arzı", md: R`
Emek piyasası da bir arz–talep piyasasıdır; fiyatı **ücrettir**. Ama emek sıradan bir mal değildir: satan, insanın kendisidir; bu yüzden toplumsal ve siyasi güçler burada özellikle güçlüdür.

Bireyin emek arzı, **iş ile boş zaman arasındaki seçimdir**: her saat çalışma, bir saat boş zamandan vazgeçmektir. Ücret boş zamanın fırsat maliyetidir.

Ücret artınca iki etki birbirine karşı çalışır:

- **İkame etkisi (substitution effect):** boş zaman pahalandı → daha çok çalış.
- **Gelir etkisi (income effect):** daha zenginsin, boş zaman normal bir mal → daha az çalış.

Düşük ücretlerde genellikle ikame etkisi baskındır (ücret artınca daha çok çalışılır); çok yüksek ücretlerde gelir etkisi baskın gelebilir ve emek arzı **geriye bükülür (backward-bending)**: varlıklı bir hekim ücreti artınca daha az nöbet tutmayı seçebilir.

Piyasa emek arzı ise ücretle neredeyse her zaman artar: yüksek ücret yeni insanları işgücüne çeker (ev hanımları, öğrenciler, emekliler), başka şehirlerden ve ülkelerden göç getirir.

:::tanim Labor force participation rate
The percentage of the working-age population that is employed or actively looking for work.
:::

:::gercek
Türkiye'de **kadınların işgücüne katılım oranı** (yaklaşık üçte biri) OECD ortalamasının çok altındadır. Bunun nedenleri yalnız ücret değildir: çocuk ve yaşlı bakımının kadına yüklenmesi, kreş eksikliği, toplumsal normlar, kayıt dışı istihdam. Colander'ın "toplumsal güçler" dediği şeyin emek piyasasındaki en net örneklerinden biri.
:::

Vergiler ve transferler de emek arzını etkiler: yüksek marjinal vergi oranları ve çalışınca kesilen sosyal yardımlar, ek çalışmanın getirisini azaltır.
` },
      { baslik: "Emek talebi: marjinal gelir ürünü", md: R`
Firmalar işçiyi kendisi için değil, ürettiği mal için ister. Emek talebi bu yüzden **türev taleptir (derived demand)**: malın talebinden türer. Otomobil talebi düşerse otomobil işçisi talebi de düşer.

Firma bir işçi daha alırsa ne kazanır? İşçinin ürettiği ek ürün (MP) çarpı o ürünün getirdiği ek gelir (MR):

$$MRP = MP \times MR$$

:::tanim Marginal revenue product (MRP)
The marginal revenue a firm gets from selling the output of an additional worker: MRP = MP × MR.
:::

Tam rekabetçi bir firmada MR = P olduğundan $MRP = MP \times P$ (buna **marjinal ürün değeri**, VMP de denir).

**Kural:** firma, bir işçinin MRP'si ücreti aştığı sürece işçi alır; **MRP = W** olduğunda durur. Azalan marjinal verim yüzünden MP, dolayısıyla MRP, işçi sayısı arttıkça düşer: **MRP eğrisi firmanın emek talep eğrisidir** ve aşağı eğimlidir.

:::ornek Kaç garson?
Bir restoranda her garsonun (sırasıyla) günlük ek servis ettiği masa sayısı: 1. garson 20, 2. 16, 3. 12, 4. 8, 5. 4. Her masa restorana 300 TL net katkı sağlıyor. Günlük ücret 3.000 TL ise kaç garson alınmalı?
---cozum---
MRP = MP × 300: 1. garson 6.000, 2. 4.800, 3. 3.600, 4. 2.400, 5. 1.200 TL.

İlk üç garsonun MRP'si ücretin (3.000) üstünde; dördüncünün altında. **3 garson** alınır. Ücret 2.000 TL'ye düşerse dördüncü de alınır: ücret düşünce talep edilen emek miktarı artar — emek talep eğrisi üzerinde hareket.
:::

### Emek talebinin esnekliği
Emek talebi şu durumlarda daha esnektir:

1. **Malın talebi esnekse:** ücret artışı fiyata yansır, satışlar ve dolayısıyla işçi ihtiyacı çok düşer.
2. **Emeğin toplam maliyetteki payı büyükse:** ücret artışı maliyeti çok artırır.
3. **Emeğin yerine başka girdi (makine, yazılım) kolayca konabiliyorsa.**
4. **Uzun dönemde** (ikame olanakları zamanla artar).
` },
      { baslik: "Emek piyasasında denge ve asgari ücret", md: R`
Rekabetçi bir emek piyasasında ücret, emek arzı ile talebinin kesiştiği yerde belirlenir. Asgari ücret bu piyasada bir **taban fiyattır** (5. bölüm): denge ücretinin üstündeyse çalışmak isteyen sayısı artar, işverenlerin talebi azalır — **işsizlik**.

Ama tablo her zaman bu kadar basit değildir.

:::tanim Monopsony
A market in which a single firm is the only buyer.
:::

Bir kasabanın tek büyük işvereni (bir maden, bir fabrika) ya da belirli beceriler için az sayıda işveren varsa, işveren ücreti kendisi belirleyebilir. **Monopsonist** bir işçi daha almak için ücreti yükseltmek zorundadır — ve bunu **bütün işçilere** yapmak zorundadır. Bu yüzden bir işçinin marjinal maliyeti (**marjinal faktör maliyeti, MFC**) ücretten yüksektir. Monopsonist MRP = MFC'de işçi alır ve arz eğrisinden okunan, rekabetçi piyasadakinden **düşük** bir ücret öder: hem ücret hem istihdam rekabetçi düzeyin altındadır.

Bu durumda iyi ayarlanmış bir asgari ücret, monopsonistin ücreti bastırma gücünü elinden alır ve **hem ücreti hem istihdamı artırabilir**.

{{emek-piyasasi}}

:::dikkat
Asgari ücretin istihdama etkisi iktisadın en çok tartışılan ampirik sorularından biridir. Card ve Krueger'in 1990'lardaki ünlü çalışması, ılımlı asgari ücret artışlarının istihdamı belirgin biçimde azaltmadığını buldu (David Card 2021'de Nobel aldı). Pek çok iktisatçı ise büyük artışların, özellikle düşük verimli bölgelerde ve gençlerde istihdamı ya da kayıtlı istihdamı azaltabileceğini savunur. Cevap, asgari ücretin piyasa ücretine göre ne kadar yüksek olduğuna ve emek piyasasının yapısına bağlıdır.
:::

:::gercek
Türkiye'de asgari ücret, ortalama ücrete göre çok yüksek bir düzeydedir ve çalışanların büyük bir kısmı asgari ücret ya da ona yakın bir ücretle çalışır. Bu yüzden asgari ücret artışları yalnız en düşük ücretlileri değil, ücret yapısının tamamını ve enflasyonu etkiler; ayrıca kayıt dışı istihdam güdüsünü artırabilir.
:::
` },
      { baslik: "Ücret farklılıkları", md: R`
Neden bir yazılım mühendisi bir garsondan çok kazanır? Neden aynı işi yapan iki kişi farklı ücret alabilir?

**1. Beşeri sermaye (human capital).** Eğitim ve beceri, emeğin verimliliğini (MP) artırır; yüksek MRP yüksek ücret demektir. Üniversite okumak, gelecekteki yüksek ücret için bugün yapılan bir yatırımdır (fırsat maliyetini 1. bölümde hesaplamıştık).

**2. Telafi edici ücret farkları (compensating differentials).** Tehlikeli, yorucu, sağlıksız ya da sevilmeyen işler, insanları çekmek için daha yüksek ücret ödemek zorundadır: madenciler, gece vardiyası, petrol platformları.

**3. Ayrımcılık (discrimination).**
- **Tercihe dayalı ayrımcılık:** işverenin, müşterinin ya da iş arkadaşlarının belirli bir gruba karşı önyargısı.
- **İstatistiksel ayrımcılık:** işverenin bireyi değil, ait olduğu grubun ortalama özelliklerini esas alması.
- **Kurumsal ayrımcılık:** kurumların yapısının (ör. esnek çalışmaya izin vermeyen kariyer basamakları) belirli grupları dezavantajlı kılması.

Gary Becker'in argümanına göre rekabetçi piyasalar tercihe dayalı ayrımcılığı cezalandırır: ayrımcı işveren daha verimli işçileri kaçırır ve maliyetleri artar. Ama gerçek piyasalarda ayrımcılık kalıcı olabilir.

:::gercek
Colander'ın kutularından biri **kadın–erkek ücret farkını** tartışır. Farkın bir kısmı meslek seçimi, çalışma saatleri ve kariyer kesintileriyle (çoğunlukla çocuk bakımı) açıklanır; bir kısmı açıklanamaz ve ayrımcılığı yansıttığı düşünülür. Claudia Goldin 2023 Nobel'ini tam olarak bu konudaki çalışmalarıyla aldı: farkın büyük bölümünün ilk çocuktan sonra ortaya çıktığını gösterdi.
:::

**4. Süperstar etkisi.** Bazı piyasalarda (spor, müzik, yazılım) en iyiler herkese aynı anda ulaşabildiği için kazanç birkaç kişide yoğunlaşır: kazanan her şeyi alır.
` },
      { baslik: "Teknoloji, yapay zekâ ve işin geleceği", md: R`
Colander 11. baskıya "**İnsanlar eskiyor mu?**" başlıklı bir kutu ekledi. Soru eski: 19. yüzyılda dokuma tezgâhlarını kıran Luddite'lardan beri her büyük teknolojik dalga "makineler işimizi alacak" korkusunu getirdi.

Tarihin dersi iki yönlüdür:

- Teknoloji **belirli işleri** gerçekten yok eder (daktilograf, santral operatörü, gişe memuru).
- Ama aynı zamanda **verimliliği ve geliri artırır**, yeni ürünler ve yeni meslekler yaratır. Toplam istihdam uzun dönemde düşmemiş, ücretler yükselmiştir.

Asıl sorun **geçiş** ve **bölüşümdür**: işini kaybeden 50 yaşındaki bir işçi, yeni yaratılan yazılım işine kolayca geçemez. Teknoloji, tamamlayıcısı olduğu becerilerin (analitik, yaratıcı, sosyal beceriler) ücretini artırırken ikamesi olduğu rutin işlerin ücretini düşürür; bu da gelir eşitsizliğini artırabilir (18. bölüm).

:::ipucu
Yapay zekâ önceki teknolojilerden farklı olarak yalnız rutin el işlerini değil, bilişsel işleri de (çeviri, kodlama, metin yazma, analiz) yapabiliyor. Bir iktisat öğrencisi olarak senin için çıkarım: makinenin **tamamlayıcısı** olacak becerilere — iktisadi akıl yürütme, veriyle soru sormak (R dersin!), yorumlamak ve iletişim kurmak — yatırım yapmak.
:::
` },
    ],
    ozet: [
      "Emek arzı iş–boş zaman seçimidir; ücret artışının ikame etkisi daha çok, gelir etkisi daha az çalışmaya iter (geriye bükülen arz mümkün).",
      "Emek talebi türev taleptir; firma MRP = MP × MR ücrete eşit olana kadar işçi alır. MRP eğrisi emek talep eğrisidir.",
      "Emek talebi; mal talebi esnekse, emeğin maliyetteki payı büyükse, ikame kolaysa ve uzun dönemde daha esnektir.",
      "Rekabetçi piyasada bağlayıcı asgari ücret işsizlik yaratır; monopsonda (MRP = MFC) iyi ayarlanmış asgari ücret ücreti ve istihdamı artırabilir.",
      "Ücret farkları: beşeri sermaye, telafi edici farklar, ayrımcılık (tercihe dayalı, istatistiksel, kurumsal), süperstar etkisi.",
      "Teknoloji belirli işleri yok eder ama verimlilik ve yeni işler yaratır; asıl sorun geçiş ve bölüşümdür.",
    ],
    terimler: [
      ["labor supply", "emek arzı", "The quantity of labor workers are willing to supply at each wage."],
      ["substitution effect (labor)", "ikame etkisi (emek)", "A higher wage makes leisure more costly, encouraging more work."],
      ["income effect (labor)", "gelir etkisi (emek)", "A higher wage makes people richer, so they may choose more leisure and less work."],
      ["backward-bending labor supply", "geriye bükülen emek arzı", "At high wages the income effect dominates and hours supplied fall as the wage rises."],
      ["labor force participation rate", "işgücüne katılım oranı", "The share of the working-age population that is employed or actively seeking work."],
      ["derived demand", "türev talep", "The demand for factors of production is derived from the demand for the goods they produce."],
      ["marginal revenue product (MRP)", "marjinal gelir ürünü", "The marginal revenue a firm gets from selling the output of an additional worker: MRP = MP × MR."],
      ["value of marginal product (VMP)", "marjinal ürün değeri", "For a competitive firm, MP × P."],
      ["monopsony", "monopson", "A market in which a single firm is the only buyer."],
      ["marginal factor cost (MFC)", "marjinal faktör maliyeti", "The additional cost to a firm of hiring one more worker; above the wage for a monopsonist."],
      ["human capital", "beşeri sermaye", "The skills and knowledge embodied in workers, increased by education and training."],
      ["compensating wage differential", "telafi edici ücret farkı", "Higher pay required to attract workers to unpleasant, risky or demanding jobs."],
      ["statistical discrimination", "istatistiksel ayrımcılık", "Judging individuals by the average characteristics of the group to which they belong."],
      ["institutional discrimination", "kurumsal ayrımcılık", "Discrimination built into the structure of institutions rather than individual prejudice."],
      ["superstar effect", "süperstar etkisi", "In some markets the best performers can serve everyone, so earnings concentrate among a few."],
    ],
    quiz: [
      { s: "When the wage rises, the substitution effect leads workers to:", c: ["Work fewer hours", "Work more hours because leisure has become more expensive", "Leave the labor force", "Demand less income"], d: 1, a: "Ücret boş zamanın fırsat maliyetidir; ücret artınca boş zaman pahalanır ve daha çok çalışılır." },
      { s: "A backward-bending labor supply curve occurs when:", c: ["The substitution effect dominates", "The income effect dominates at high wages", "Wages fall", "The minimum wage is binding"], d: 1, a: "Yüksek ücretlerde gelir etkisi baskın gelir; ücret artınca daha az çalışmak seçilir." },
      { s: "The demand for labor is called a derived demand because:", c: ["It is derived from government policy", "It depends on the demand for the goods that labor produces", "Workers derive utility from work", "It is calculated by statisticians"], d: 1, a: "Firmalar işçiyi ürettiği mal için ister; malın talebi düşerse emek talebi de düşer." },
      { s: "Marginal revenue product equals:", c: ["Wage × hours", "Marginal product × marginal revenue", "Total revenue / workers", "Price − average cost"], d: 1, a: "MRP = MP × MR; tam rekabette MR = P olduğundan MP × P." },
      { s: "A competitive firm will hire workers up to the point where:", c: ["MP = AP", "MRP = wage", "Total product is maximized", "Wage = average cost"], d: 1, a: "MRP > W iken işçi almak kârı artırır; MRP = W'de durulur." },
      { s: "Each waiter's additional tables: 20, 16, 12, 8. Each table yields 300 TL; the wage is 3,000 TL per day. How many waiters are hired?", c: ["1", "2", "3", "4"], d: 2, a: "MRP: 6.000, 4.800, 3.600, 2.400. İlk üçü ücretin üstünde, dördüncüsü altında: 3 garson." },
      { s: "The demand for labor is more elastic when:", c: ["Labor is a small share of total costs", "The demand for the product is inelastic", "It is easy to substitute machines for labor", "It is the short run"], d: 2, a: "İkame kolaysa ücret artışında işveren emekten makineye kayar; talep esnek olur." },
      { s: "In a competitive labor market, a minimum wage set above the equilibrium wage will:", c: ["Increase employment", "Create unemployment", "Have no effect", "Lower the wage"], d: 1, a: "Bağlayıcı taban fiyat: çalışmak isteyenler artar, işverenlerin talebi düşer." },
      { s: "A monopsonist pays a wage that is:", c: ["Higher than the competitive wage", "Lower than the competitive wage, and hires fewer workers", "Equal to MRP", "Determined by unions"], d: 1, a: "MFC > W olduğu için MRP = MFC'de daha az işçi alır ve arz eğrisinden düşük ücret öder." },
      { s: "In a monopsony labor market, a carefully set minimum wage can:", c: ["Only reduce employment", "Increase both the wage and employment", "Have no effect on wages", "Create a shortage of jobs in every case"], d: 1, a: "Asgari ücret, monopsonistin ek işçi için herkesin ücretini yükseltme sorununu ortadan kaldırır; istihdam artabilir." },
      { s: "Higher pay for dangerous jobs such as mining is an example of:", c: ["Statistical discrimination", "A compensating wage differential", "The superstar effect", "Monopsony"], d: 1, a: "Kötü koşullu işler, insanları çekmek için telafi edici ücret farkı öder." },
      { s: "An employer who judges an individual applicant by the average characteristics of his or her group is engaging in:", c: ["Statistical discrimination", "Compensating differentials", "Human capital investment", "Monopsony pricing"], d: 0, a: "Bireyi değil grubun ortalamasını esas almak istatistiksel ayrımcılıktır." },
    ],
  });
})();
