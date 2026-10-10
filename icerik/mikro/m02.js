// Colander 11e — 2. bölüm: The Production Possibility Model, Trade, and Globalization (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m02",
    hedefler: [
      "Üretim olanakları eğrisiyle (ÜOE) değiş tokuşları ve fırsat maliyetini göstermek",
      "ÜOE'nin neden dışa bükük olduğunu artan marjinal fırsat maliyeti ilkesiyle açıklamak",
      "Etkin, etkinsiz ve ulaşılamaz noktaları ayırmak; teknolojinin eğriyi nasıl kaydırdığını göstermek",
      "Karşılaştırmalı üstünlük ile mutlak üstünlüğü ayırmak; ticaretin iki tarafa da nasıl kazanç getirdiğini hesaplamak",
      "Küreselleşmeyi ve tek fiyat yasasını açıklamak",
    ],
    bolumler: [
      { baslik: "Üretim olanakları modeli", md: R`
Kıtlık varsa değiş tokuş (trade-off) da vardır: bir şeyden daha fazlası, başka bir şeyden vazgeçmek demektir. **Üretim olanakları modeli** bu değiş tokuşu gözle görülür hâle getirir. Model hem tabloyla hem grafikle sunulabilir.

:::tanim Production possibility curve (PPC)
A curve measuring the maximum combination of outputs that can be obtained from a given number of inputs.
:::

Türkçede **üretim olanakları eğrisi (ÜOE)** ya da *sınırı* denir (production possibility frontier, PPF). Modelin varsayımları:

- Kaynakların (girdilerin) miktarı **sabit**,
- Teknoloji **sabit**,
- Yalnız **iki mal** var ve ikisi aynı kaynakları kullanıyor.

### Bireysel bir örnek: sınav haftası
Sınavdan önceki hafta 20 saatin var ve bunu mikroekonomi ile matematik arasında paylaştıracaksın. Her dağılımın beklenen notları:

| Matematiğe saat | Matematik notu | Mikroya saat | Mikro notu |
|---|---|---|---|
| 20 | 96 | 0 | 42 |
| 16 | 92 | 4 | 60 |
| 10 | 80 | 10 | 76 |
| 4 | 62 | 16 | 88 |
| 0 | 50 | 20 | 94 |

Bu tablonun grafiği bir ÜOE'dir. İki şey söyler:

1. Mevcut kurumlar, kaynaklar ve teknolojiyle **ulaşabileceğin bir sınır** vardır: iki dersten de 95 alamazsın (en azından bu hafta).
2. **Her seçimin bir fırsat maliyeti vardır**: mikro notunu 76'dan 88'e çıkarmanın bedeli matematikte 80'den 62'ye inmektir — 12 mikro puanı için 18 matematik puanı.

:::ipucu
ÜOE'nin **eğimi fırsat maliyetidir**: yatay eksendeki maldan bir birim daha üretmek için dikey eksendeki maldan ne kadar vazgeçmen gerektiğini gösterir.
:::
` },
      { baslik: "Artan marjinal fırsat maliyeti", md: R`
Klasik bir toplum örneği: kaynaklarını silah (savunma) ile tereyağı (sivil mal) arasında paylaştıran bir ülke. Kaynakların yüzde kaçı silaha giderse ne kadar üretildiğini gösteren tablo (A'dan F'ye):

| Satır | Silah (adet) | Tereyağı (ton) |
|---|---|---|
| A | 0 | 15 |
| B | 4 | 14 |
| C | 7 | 12 |
| D | 9 | 9 |
| E | 11 | 5 |
| F | 12 | 0 |

A'dan B'ye geçerken 4 silah için yalnız 1 ton tereyağından vazgeçiliyor. E'den F'ye geçerken ise **1 silah için 5 ton**. Silah üretimi arttıkça her ek silahın tereyağı cinsinden maliyeti büyüyor:

:::tanim Principle of increasing marginal opportunity cost
In order to get more of something, one must give up ever-increasing quantities of something else.
:::

Neden? Çünkü kaynaklar **her işe aynı ölçüde uygun değildir**. Silah üretimine önce o işe en yatkın kaynaklar (fabrikalar, mühendisler) kaydırılır; giderek tereyağına daha uygun kaynakları (meraları, inekleri, sütçüleri) da silaha kaydırmak gerekir ve bunlar silah üretiminde pek verimli değildir. Bu yüzden ÜOE **orijine göre dışa bükük (bowed outward)** çizilir: silah ekseninin yakınında yatık, uzağında diktir.

{{uoe}}

:::dikkat
Kaynaklar her iki işe de tam olarak aynı derecede uygun olsaydı fırsat maliyeti sabit kalırdı ve ÜOE **düz bir doğru** olurdu. Sınavda "doğrusal ÜOE ne anlama gelir?" diye sorulursa cevap: sabit fırsat maliyeti.
:::
` },
      { baslik: "Etkinlik, teknoloji ve bölüşüm", md: R`
:::tanim Productive efficiency
Achieving as much output as possible from a given amount of inputs or resources.
:::

ÜOE üzerindeki her nokta **üretimde etkindir**: birinden vazgeçmeden ötekinden daha fazla üretemezsin. Eğrinin **içindeki** bir nokta **etkinsizdir (inefficient)** — kaynakların bir kısmı atıl ya da yanlış işte; hiçbir şeyden vazgeçmeden ikisinden de daha fazla üretilebilir. Eğrinin **dışındaki** nokta ise **ulaşılamazdır (unattainable)**.

Bir toplum eğrinin içindeyse, örneğin yüksek işsizlik varsa, bedava öğle yemeğine en yakın şey ortadadır: atıl kaynakları çalıştırmak.

### Eğrinin kayması
Kaynak miktarı artarsa ya da teknoloji ilerlerse ÜOE **dışa kayar**:

- **Tarafsız (neutral) teknolojik ilerleme** ya da kaynak artışı: eğri iki eksende de dışa kayar.
- **Taraflı (biased) teknolojik ilerleme**: yalnız bir malın üretim teknolojisi gelişir; eğri yalnız o malın ekseninde uzar.

Yukarıdaki görselde iki türü de deneyebilirsin. Taraflı ilerlemede bile, silah üretimi kolaylaştığı için aynı tereyağı düzeyinde daha çok silah üretilebilir.

### Etkinlik ve bölüşüm
ÜOE etkinliğe odaklanır, **bölüşümü (distribution) görmezden gelir**: kimin ne aldığını söylemez. Bir üretim yöntemi gelir dağılımını değiştiriyorsa onun "etkin" olup olmadığına tek başına karar veremeyiz; etkinlik ancak belirli bir amaca göre anlam taşır. Pratikte iktisatçılar etkinliği sıklıkla savunur, çünkü çoğu insan daha fazlasını daha azına tercih eder ve birçok politikanın bölüşüm etkisi görece küçüktür.
` },
      { baslik: "Ticaret ve karşılaştırmalı üstünlük", md: R`
ÜOE'nin dışa bükük olmasının nedeni kaynakların farklı işlere farklı ölçüde uygun olmasıydı. Bu fikrin adı **karşılaştırmalı üstünlüktür**.

:::tanim Comparative advantage
The ability to be better suited to the production of one good than to the production of another good; having a lower opportunity cost of producing it.
:::

Bunu **mutlak üstünlükle (absolute advantage)** karıştırma: mutlak üstünlük bir malı aynı kaynakla *daha fazla* üretebilmektir. Ticaretten kazancı belirleyen ise karşılaştırmalı üstünlüktür — kim hangi malı **daha düşük fırsat maliyetiyle** üretiyor?

Bir toplumun ÜOE'si üzerinde üretim yapabilmesi için insanların karşılaştırmalı üstünlüğe sahip oldukları işte uzmanlaşıp kalanını ticaretle elde etmesi gerekir. Adam Smith bunu insanların "takas etme, değiş tokuş etme eğilimi"ne bağlar.

:::ornek İki ülke, iki mal
Türkiye bütün kaynaklarıyla ya 20 ton fındık ya da 40 makine üretebiliyor. Almanya ya 30 ton fındık ya da 30 makine. Kim hangi malda karşılaştırmalı üstündür? 1 ton fındık = 1,25 makine haddinde ticaret iki ülkeye de yarar mı?
---cozum---
Fırsat maliyetleri (ÜOE'ler doğrusal varsayılıyor):

| | 1 ton fındığın maliyeti | 1 makinenin maliyeti |
|---|---|---|
| Türkiye | 40/20 = **2 makine** | 20/40 = 0,5 ton fındık |
| Almanya | 30/30 = **1 makine** | 30/30 = 1 ton fındık |

Almanya fındığı daha ucuza (1 makine) üretiyor → **fındıkta Almanya**; Türkiye makineyi daha ucuza (0,5 ton fındık) üretiyor → **makinede Türkiye** karşılaştırmalı üstündür. (Rakamlar örnektir; gerçekte tam tersi olurdu!)

Ticaret haddi 1 fındık = 1,25 makine, iki fırsat maliyetinin (1 ile 2) arasında. Almanya fındığı 1 makineye mal edip 1,25 makineye satıyor; Türkiye fındığı 2 makine yerine 1,25 makineye alıyor. **İkisi de kazanır.** Haddi 1'in altına ya da 2'nin üstüne çekersen taraflardan biri zarara girer.
:::

Aşağıda kendi rakamlarınla dene: her ülke tamamen uzmanlaşıp ticaret yaptığında **kendi ÜOE'sinin dışındaki** bir noktada tüketebiliyor.

{{karsilastirmali}}

### Piyasalar, uzmanlaşma ve büyüme
Dünya kişi başı gelir grafiği yüzyıllar boyunca neredeyse yataydır; 1800'lerden itibaren, piyasaların ve ticaretin yayılmasıyla birlikte dikleşir. Uzmanlaşma, ticaret ve rekabet bu büyümenin ana kaynaklarındandır.
` },
      { baslik: "Küreselleşme ve tek fiyat yasası", md: R`
:::tanim Globalization
The increasing integration of economies, cultures, and institutions across the world.
:::

Küreselleşmenin firmalara iki etkisi vardır:

- **Olumlu:** iç pazardan çok daha büyük bir pazara satma imkânı.
- **Olumsuz:** rakip sayısının artması.

İki yüzyıl önce ABD'nin tekstilde karşılaştırmalı üstünlüğü vardı; bugün bu üstünlük Bangladeş, Vietnam gibi ucuz emekli ülkelerdedir. Bunun kazancı Bangladeşli işçiler için daha yüksek ücret, ABD'li tüketiciler için daha ucuz kumaştır; bedeli ise ABD'deki tekstil işçilerine düşer.

:::tanim Law of one price
The wages of (equal) workers in one country will not differ significantly from the wages of workers in another institutionally similar country.
:::

Tek fiyat yasası şunu söyler: mal ve sermaye serbestçe dolaşabildiğinde, *eşit* işçilerin ücretleri kurumsal olarak benzer ülkeler arasında birbirine yaklaşma eğilimindedir. Bir ülke teknolojiye ve kurumlarına dayanan karşılaştırmalı üstünlüğünü kaybederse, ücretleri diğer ülkelerinkine göre geriler. Firmaların üretimi en ucuz ülkeye kaydırma eğilimi bu yasayla yönlendirilir.

:::gercek
Türk hazır giyim sektörü uzun süre Avrupa'ya yakınlığı ve hızlı teslimatıyla öne çıktı. Maliyetler yükseldikçe bazı üreticiler üretimin bir kısmını Mısır gibi daha ucuz emekli ülkelere taşıdı — tek fiyat yasasının bugün işleyen örneği. Türkiye'nin buna cevabı, ucuz emekte değil tasarım, hız ve kalite gibi başka bir karşılaştırmalı üstünlükte uzmanlaşmaktır.
:::

:::ipucu
Colander'ın mesajı: ülke ancak yeni teknoloji ve yenilikle güçlü bir karşılaştırmalı üstünlüğü koruyabilirse kaybedilen işlerin yerini yüksek ücretli başka işler alır. Ticaret toplamda kazanç getirir ama kazanç ve kayıp eşit dağılmaz.
:::
` },
    ],
    ozet: [
      "ÜOE, verili girdilerle üretilebilecek en yüksek çıktı bileşimlerini gösterir; eğimi fırsat maliyetidir.",
      "Artan marjinal fırsat maliyeti ilkesi: bir şeyden daha fazlası için başka bir şeyden giderek daha fazla vazgeçilir; bu yüzden ÜOE dışa bükük.",
      "Eğri üzerindeki noktalar etkin, içindekiler etkinsiz, dışındakiler ulaşılamaz. Kaynak artışı ya da teknoloji eğriyi dışa kaydırır (tarafsız ya da taraflı).",
      "ÜOE etkinliğe bakar, bölüşümü görmez.",
      "Karşılaştırmalı üstünlük = daha düşük fırsat maliyeti. Uzmanlaşma ve ticaretle iki taraf da kendi ÜOE'sinin dışında tüketebilir; ticaret haddi iki fırsat maliyetinin arasında olmalı.",
      "Küreselleşme ekonomilerin bütünleşmesidir; tek fiyat yasası eşit işçilerin ücretlerini benzer ülkelerde birbirine yaklaştırır.",
    ],
    terimler: [
      ["production possibility curve (PPC)", "üretim olanakları eğrisi (ÜOE)", "A curve measuring the maximum combination of outputs that can be obtained from a given number of inputs."],
      ["production possibility table", "üretim olanakları tablosu", "A table that lists a choice's opportunity costs by summarizing what alternative outputs you can achieve with your inputs."],
      ["trade-off", "değiş tokuş", "Giving up some of one thing to get more of another."],
      ["principle of increasing marginal opportunity cost", "artan marjinal fırsat maliyeti ilkesi", "In order to get more of something, one must give up ever-increasing quantities of something else."],
      ["productive efficiency", "üretimde etkinlik", "Achieving as much output as possible from a given amount of inputs or resources."],
      ["inefficiency", "etkinsizlik", "Getting less output from inputs that, if devoted to some other activity, would produce more output."],
      ["unattainable point", "ulaşılamaz nokta", "A combination of outputs outside the PPC that cannot be produced with current resources and technology."],
      ["technological change", "teknolojik değişme", "An improvement in the way goods are produced that shifts the PPC outward."],
      ["comparative advantage", "karşılaştırmalı üstünlük", "The ability to produce a good at a lower opportunity cost than another producer."],
      ["absolute advantage", "mutlak üstünlük", "The ability to produce more of a good with the same resources than another producer."],
      ["specialization", "uzmanlaşma", "Concentrating production on the goods in which one has a comparative advantage."],
      ["terms of trade", "ticaret haddi", "The rate at which one good is exchanged for another in trade."],
      ["gains from trade", "ticaretten kazanç", "The increase in consumption made possible by specialization and trade."],
      ["globalization", "küreselleşme", "The increasing integration of economies, cultures, and institutions across the world."],
      ["law of one price", "tek fiyat yasası", "The wages of (equal) workers in one country will not differ significantly from the wages of workers in another institutionally similar country."],
      ["outsourcing", "dış kaynak kullanımı", "Shifting production of goods or services to another firm or country, often where costs are lower."],
    ],
    quiz: [
      { s: "The slope of the production possibility curve measures:", c: ["The total output of the economy", "The opportunity cost of one good in terms of the other", "The rate of technological change", "The distribution of income"], d: 1, a: "ÜOE'nin eğimi, yatay eksendeki maldan bir birim daha için dikey eksendeki maldan ne kadar vazgeçildiğini gösterir: fırsat maliyeti." },
      { s: "A production possibility curve is bowed outward because:", c: ["Resources are equally suited to producing both goods", "Some resources are better suited to producing one good than the other", "Technology improves over time", "Consumers prefer one good to the other"], d: 1, a: "Kaynaklar her işe aynı ölçüde uygun değildir; bir malı arttırdıkça o işe daha az uygun kaynakları kullanmak zorunda kalırız: artan marjinal fırsat maliyeti." },
      { s: "If a PPC is a straight line, the opportunity cost of producing more of one good:", c: ["Increases", "Decreases", "Is constant", "Is zero"], d: 2, a: "Doğrusal ÜOE'nin eğimi her yerde aynıdır: sabit fırsat maliyeti." },
      { s: "A point inside the production possibility curve represents:", c: ["An efficient point", "An unattainable point", "An inefficient point", "A point of maximum growth"], d: 2, a: "Eğrinin içi etkinsizdir: atıl ya da yanlış kullanılan kaynaklar var; hiçbir şeyden vazgeçmeden ikisinden de daha fazla üretilebilir." },
      { s: "Using the guns-and-butter table (A: 0 guns/15 butter … E: 11/5, F: 12/0), the opportunity cost of moving from E to F is:", c: ["1 ton of butter for 1 gun", "5 tons of butter for 1 gun", "1 ton of butter for 4 guns", "12 tons of butter"], d: 1, a: "E'den F'ye: silah 11→12 (+1), tereyağı 5→0 (−5). 1 silahın fırsat maliyeti 5 ton tereyağı." },
      { s: "A technological improvement that affects only the production of computers will:", c: ["Shift the entire PPC outward equally on both axes", "Extend the PPC only along the computer axis", "Shift the PPC inward", "Move the economy along its existing PPC"], d: 1, a: "Taraflı (biased) teknolojik ilerleme yalnız o malın ekseninde eğriyi uzatır." },
      { s: "Country A can produce 10 cars or 20 tons of wheat; Country B can produce 15 cars or 15 tons of wheat (linear PPCs). Which statement is correct?", c: ["A has a comparative advantage in cars", "B has a comparative advantage in cars", "B has a comparative advantage in both goods", "Neither can gain from trade"], d: 1, a: "A'da 1 araba = 2 ton buğday, B'de 1 araba = 1 ton buğday. Arabanın fırsat maliyeti B'de düşük → B arabada, A buğdayda karşılaştırmalı üstün." },
      { s: "In the previous question, which terms of trade would benefit both countries?", c: ["1 car = 0.5 tons of wheat", "1 car = 1.5 tons of wheat", "1 car = 2.5 tons of wheat", "1 car = 3 tons of wheat"], d: 1, a: "Ticaret haddi iki fırsat maliyetinin (1 ile 2 ton buğday) arasında olmalı: 1,5 ikisine de yarar." },
      { s: "Comparative advantage is determined by:", c: ["Who can produce more of a good", "Who has the lower opportunity cost of producing a good", "Who has more resources", "Who has better technology in all goods"], d: 1, a: "Daha fazla üretebilmek mutlak üstünlüktür. Karşılaştırmalı üstünlük daha düşük fırsat maliyetidir — ticaret kazancını belirleyen budur." },
      { s: "Through specialization and trade, countries can:", c: ["Only consume on their own PPC", "Consume at points outside their own PPC", "Eliminate opportunity cost", "Avoid any job losses"], d: 1, a: "Uzmanlaşıp ticaret yapınca toplam üretim artar ve her ülke kendi tek başına ulaşamayacağı bir bileşimi tüketebilir." },
      { s: "The production possibility curve does NOT tell us about:", c: ["Trade-offs", "Opportunity cost", "Efficiency", "The distribution of income"], d: 3, a: "ÜOE etkinliği gösterir; kimin ne aldığı (bölüşüm) hakkında bir şey söylemez." },
      { s: "According to the law of one price, if a country loses its comparative advantage based on technology and institutions, its wages will:", c: ["Rise relative to other countries", "Fall relative to other countries", "Be unaffected", "Become equal to zero"], d: 1, a: "Eşit işçilerin ücretleri benzer ülkeler arasında yaklaşır; üstünlüğünü kaybeden ülkenin ücretleri göreli olarak geriler." },
    ],
  });
})();
