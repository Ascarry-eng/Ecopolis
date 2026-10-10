// Colander 11e — 9. bölüm: Comparative Advantage, Exchange Rates, and Globalization (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m09",
    hedefler: [
      "Karşılaştırmalı üstünlük ilkesini tablolarla uygulamak ve ticaretten kazancı hesaplamak",
      "Ticaret haddinin kazancın taraflar arasında nasıl bölüşüldüğünü belirlediğini açıklamak",
      "Doğal ve aktarılabilir karşılaştırmalı üstünlük kaynaklarını ayırmak",
      "Döviz kurunu tanımlamak; kurdaki değişimin ihracat ve ithalatı nasıl etkilediğini açıklamak",
      "Ticaret açığını, finansmanını ve kur ile ücretlerin uyum mekanizmalarını tartışmak",
    ],
    bolumler: [
      { baslik: "Uluslararası ticaretin yapısı", md: R`
Ticaret son yetmiş yılda dünya üretiminden çok daha hızlı büyüdü. Bugün dünya mal ve hizmet ihracatı, dünya milli gelirinin yaklaşık dörtte biri ile üçte biri arasında bir büyüklüğe ulaştı. Ülkeler hem **mal** (otomobil, tekstil, enerji) hem de giderek artan biçimde **hizmet** (turizm, yazılım, finans, taşımacılık) ticareti yapar.

Türkiye için tablo şöyledir: en büyük ihracat pazarı Avrupa Birliği (başta Almanya), ihracatta otomotiv, makine, tekstil–hazır giyim, demir–çelik ve tarım ürünleri öne çıkar; ithalatta ise **enerji** (petrol, doğalgaz) ve ara mallar büyük yer tutar. Turizm, en önemli hizmet ihracatı kalemidir.

:::ipucu
Colander bu bölümde 2. bölümdeki karşılaştırmalı üstünlük fikrini derinleştirir ve ona **döviz kurunu** ekler. Çünkü gerçek dünyada ülkeler malları birbirleriyle değil, *paralarla* takas eder; hangi ülkenin hangi malda rekabetçi olduğunu kur da etkiler.
:::
` },
      { baslik: "Karşılaştırmalı üstünlük ilkesi yeniden", md: R`
:::tanim Principle of comparative advantage
As long as the relative opportunity costs of producing goods differ among countries, there are potential gains from trade, even if one country has an absolute advantage in everything.
:::

Bu ilkenin en çarpıcı sonucu: bir ülke **her şeyi** başka ülkelerden daha verimli üretse bile, ticaretten yine de kazanır; en verimsiz ülke bile bir şeyde karşılaştırmalı üstündür. Çünkü fırsat maliyeti *göreli* bir kavramdır: bir malda göreli olarak daha iyiysen, öbüründe ister istemez göreli olarak daha kötüsündür.

:::ornek Kazancı hesapla
Bir işçi bir günde şunları üretebiliyor:

| | Kumaş (top) | Buğday (ton) |
|---|---|---|
| Türkiye | 6 | 3 |
| Mısır | 2 | 2 |

Her ülkede 100 işçi var; ticaretten önce her ülke işçilerinin yarısını iki mala ayırıyor. Uzmanlaşma ve ticaret toplam üretimi ne kadar artırır?
---cozum---
**Fırsat maliyetleri:** Türkiye'de 1 ton buğday = 2 top kumaş; Mısır'da 1 ton buğday = 1 top kumaş. Buğdayın fırsat maliyeti Mısır'da düşük → **Mısır buğdayda**, **Türkiye kumaşta** karşılaştırmalı üstün. (Türkiye iki malda da mutlak üstün olduğu hâlde!)

**Ticaretten önce:** Türkiye 50×6 = 300 kumaş + 50×3 = 150 buğday; Mısır 50×2 = 100 kumaş + 50×2 = 100 buğday. Toplam: 400 kumaş, 250 buğday.

**Uzmanlaşma:** Mısır'ın 100 işçisinin hepsi buğdaya: 200 buğday. Toplam buğdayı korumak için 50 ton daha gerekiyor; Türkiye bunu 50/3 ≈ 17 işçiyle üretir, kalan 83 işçi 83×6 = 498 kumaş üretir.

**Sonuç:** 498 kumaş + 250 buğday. Buğday aynı, kumaş **98 top fazla**. Bu ek üretim, ticaret haddine göre iki ülke arasında paylaşılır.
:::
` },
      { baslik: "Kazancın bölüşümü: ticaret haddi", md: R`
Ticaretten kazancın varlığı, onun nasıl paylaşılacağını söylemez. Bunu **ticaret haddi (terms of trade)** belirler: bir malın kaç birim öbür mala değiştirildiği.

Yukarıdaki örnekte ticaret haddi 1 ton buğday için **1 ile 2 top kumaş arasında** olmalıdır:

- 1'e yakınsa kazancın büyüğü Türkiye'ye gider (buğdayı neredeyse Mısır'daki maliyetinden alıyor),
- 2'ye yakınsa kazancın büyüğü Mısır'a gider.

Hangi uca yakın olacağını pazarlık gücü, piyasaların büyüklüğü ve rekabet belirler. Genel bir sonuç: **küçük ülkeler ticaretten görece daha çok kazanma eğilimindedir.** Küçük bir ülke dünya fiyatını etkileyemez; kendi iç fırsat maliyetinden çok farklı olabilen dünya fiyatlarından alıp satabilir.

{{karsilastirmali|{"a":"Türkiye","b":"Mısır","mal":["Buğday (ton)","Kumaş (top)"],"degerler":[[15,30],[10,10]],"hadde":1.5,"takas":6}}}

:::dikkat
"Ucuz emekli ülkeyle ticaret, pahalı emekli ülkeyi fakirleştirir" sezgisi karşılaştırmalı üstünlükle çelişir. Ücretler, verimliliği yansıtır; yüksek ücretli ülke yüksek verimli olduğu işlerde uzmanlaşır. Ticaret toplamda iki tarafı da zenginleştirir — ama ülkenin *içinde* kazananlar ve kaybedenler vardır. Bu, ticaret politikasının siyasetini belirler (10. bölüm).
:::
` },
      { baslik: "Karşılaştırmalı üstünlüğün kaynakları", md: R`
Colander iki tür kaynak ayırır:

- **Doğal (inherent) karşılaştırmalı üstünlük:** iklim, toprak, doğal kaynaklar, coğrafi konum. Suudi Arabistan'ın petrolü, Türkiye'nin fındık bahçeleri ve turizm için güneşi ve kıyıları, Hollanda'nın limanları.
- **Aktarılabilir (transferable) karşılaştırmalı üstünlük:** teknoloji, sermaye, bilgi birikimi, beceri ve kurumlar. Bunlar zamanla başka ülkelere geçebilir.

Bugün ticaret edilen malların çoğunda üstünlük **aktarılabilir** türdendir. Bu yüzden bir ülkenin üstünlüğü kalıcı değildir: teknoloji yayıldıkça ve diğer ülkeler sermaye biriktirdikçe üstünlük aşınır.

### Üstünlüğü korumanın yolları
- **Teknoloji ve yenilik:** yeni ürünler ve süreçler geliştirmek,
- **Eğitim ve beceri:** emeğin verimliliğini artırmak,
- **Kurumlar:** hukukun üstünlüğü, sözleşmelerin güvencesi, istikrarlı makroekonomi,
- **Kümelenme (agglomeration):** aynı sektördeki firmaların bir arada olmasının yarattığı ağlar ve bilgi akışı (ör. Bursa'da otomotiv, Denizli'de tekstil, Gaziantep'te halı ve gıda).

:::gercek
Colander, ABD'nin yüksek ücretlerini koruyabilmesini büyük ölçüde teknolojik liderliğine, üniversitelerine ve kurumlarına bağlar ve bu üstünlüğün kalıcı olmadığı uyarısını yapar. Aynı mantık Türkiye için de geçerlidir: ucuz emeğe dayalı üstünlük, ücretler yükseldikçe aşınır; kalıcı olan, verimliliği artıran yatırımlardır.
:::
` },
      { baslik: "Döviz kurları ve karşılaştırmalı üstünlük", md: R`
:::tanim Exchange rate
The rate at which one country's currency can be traded for another country's currency.
:::

Kur 40 TL/\$ ise 1 dolar 40 liraya değiştirilebilir. **Kurun yükselmesi** (ör. 40'tan 45'e) TL'nin **değer kaybı** (depreciation), **düşmesi** TL'nin **değer kazancıdır** (appreciation).

Kur, malların yabancılara ne kadara geldiğini değiştirir:

- TL değer kaybederse Türk malları yabancılara **ucuzlar** → ihracat artar; yabancı mallar Türklere **pahalanır** → ithalat azalır.
- TL değer kazanırsa tersi olur.

:::ornek Kur ve fiyat
Bir Türk tekstil firması tişörtü 400 TL'ye satıyor. Kur 40 TL/\$ iken Amerikalı alıcıya maliyeti nedir? Kur 50 TL/\$ olursa?
---cozum---
40 TL/\$'da: $400 / 40 = 10$ dolar. 50 TL/\$'da: $400 / 50 = 8$ dolar. TL değer kaybettiği için tişört Amerikalıya %20 ucuzladı; Türk ihracatçısı daha rekabetçi.

Ama iki uyarı: (1) firma ithal girdi kullanıyorsa (iplik, enerji) onun maliyeti de artar; (2) kur yükselmesi enflasyonla birlikte geliyorsa TL fiyatlar da yükselir ve rekabet avantajı kısa sürer. Bu yüzden iktisatçılar **reel kura** — enflasyon farkından arındırılmış kura — bakar.
:::

Kur, doların ve TL'nin arz ve talebiyle belirlenir: ihracatçılar, turistler ve yabancı yatırımcılar döviz getirir (dolar arzı); ithalatçılar, yurtdışına yatırım yapanlar ve döviz biriktirenler döviz talep eder.

{{doviz-piyasasi}}
` },
      { baslik: "Ticaret açığı ve uyum mekanizmaları", md: R`
Bir ülkenin ithalatı ihracatından fazlaysa **ticaret açığı (trade deficit)**, azsa **ticaret fazlası (trade surplus)** vardır.

:::tanim Trade deficit
When a country imports more than it exports.
:::

Ticaret açığı veren ülke, aradaki farkı **finanse etmek** zorundadır: ya yabancılara varlık satar (hisse senedi, gayrimenkul, şirket) ya da borçlanır. Kısacası bugün açık vermek, yabancıların gelecekte bu ülkenin üretiminden pay alma hakkını artırır. Bu, açıkların her zaman kötü olduğu anlamına gelmez — verimli yatırımları finanse ediyorsa sorun değildir — ama sürdürülebilirliği yabancıların ülkeye güven duymasına bağlıdır.

### İki uyum mekanizması
Bir ülkenin rekabet gücü ile ticaret dengesi arasında bir uyumsuzluk varsa, Colander iki kanaldan uyum beklenir der:

1. **Kur:** sürekli açık veren ülkenin parası değer kaybeder; ihracatı ucuzlar, ithalatı pahalanır.
2. **Ücretler (tek fiyat yasası):** karşılaştırmalı üstünlüğü aşınan ülkenin ücretleri, öteki ülkelere göre görece geriler.

Kur hızlı uyum sağlar ama oynaktır; ücret uyumu yavaştır ve acı vericidir.

:::gercek
Türkiye uzun süredir enerji ithalatı yüzünden **cari açık** veren bir ülkedir. Bu açık yabancı sermaye girişleriyle finanse edilir; sermaye girişi durduğunda (2018 ve 2021–23'te görüldüğü gibi) TL sert değer kaybeder. Bu yüzden Türkiye'de cari açık, kur ve faiz birbirine sıkı sıkıya bağlıdır — makroekonomi derslerinde ayrıntısıyla göreceksin.
:::

### Küreselleşme ve dış kaynak kullanımı
Küreselleşme, üretimin parçalara ayrılıp farklı ülkelerde yapılmasını kolaylaştırdı: bir telefonun tasarımı ABD'de, çipleri Tayvan'da, montajı Çin'de ya da Hindistan'da yapılabilir. Hizmetlerde de dış kaynak kullanımı (çağrı merkezleri, yazılım) yaygınlaştı. Kazanç genel olarak büyüktür, ama kayıplar belirli sektörlerde ve bölgelerde yoğunlaşır; ticarete karşı siyasi tepkinin kaynağı budur.
` },
    ],
    ozet: [
      "Göreli fırsat maliyetleri farklı olduğu sürece ticaretten kazanç vardır; bir ülke her şeyde mutlak üstün olsa bile.",
      "Kazancın bölüşümünü ticaret haddi belirler; had iki fırsat maliyetinin arasında olmalı. Küçük ülkeler görece daha çok kazanma eğiliminde.",
      "Doğal üstünlük (iklim, kaynak) ile aktarılabilir üstünlük (teknoloji, sermaye, beceri, kurum) ayrılır; aktarılabilir üstünlük zamanla aşınır.",
      "Döviz kuru bir paranın başka para cinsinden fiyatıdır; TL'nin değer kaybı ihracatı ucuzlatır, ithalatı pahalandırır. Reel kur enflasyonu da hesaba katar.",
      "Ticaret açığı varlık satışı ya da borçlanmayla finanse edilir; uyum kur ve ücretler yoluyla olur.",
    ],
    terimler: [
      ["principle of comparative advantage", "karşılaştırmalı üstünlük ilkesi", "As long as relative opportunity costs differ among countries, there are potential gains from trade, even if one country has an absolute advantage in everything."],
      ["terms of trade", "ticaret haddi", "The rate at which a country can trade its goods for other countries' goods."],
      ["inherent comparative advantage", "doğal karşılaştırmalı üstünlük", "Comparative advantage based on factors that are relatively unchangeable, such as climate or natural resources."],
      ["transferable comparative advantage", "aktarılabilir karşılaştırmalı üstünlük", "Comparative advantage based on factors that can change relatively easily, such as technology, capital and skills."],
      ["agglomeration economies", "kümelenme ekonomileri", "Cost advantages that arise when firms in an industry locate near one another."],
      ["exchange rate", "döviz kuru", "The rate at which one country's currency can be traded for another country's currency."],
      ["depreciation", "değer kaybı", "A decrease in the value of a currency relative to other currencies."],
      ["appreciation", "değer kazancı", "An increase in the value of a currency relative to other currencies."],
      ["real exchange rate", "reel kur", "The exchange rate adjusted for differences in price levels (inflation) between countries."],
      ["trade deficit", "ticaret açığı", "When a country imports more than it exports."],
      ["trade surplus", "ticaret fazlası", "When a country exports more than it imports."],
      ["current account", "cari işlemler hesabı", "The part of the balance of payments that records trade in goods and services, income and transfers."],
      ["outsourcing", "dış kaynak kullanımı", "Shifting part of production to another firm or country."],
    ],
    quiz: [
      { s: "According to the principle of comparative advantage, a country with an absolute advantage in producing all goods:", c: ["Cannot gain from trade", "Can still gain from trade if relative opportunity costs differ", "Should produce everything itself", "Will always run a trade surplus"], d: 1, a: "Göreli fırsat maliyetleri farklıysa ticaretten kazanç vardır; mutlak üstünlük belirleyici değildir." },
      { s: "In one day a Turkish worker produces 6 units of cloth or 3 tons of wheat; an Egyptian worker 2 units of cloth or 2 tons of wheat. Egypt has a comparative advantage in:", c: ["Cloth", "Wheat", "Both", "Neither"], d: 1, a: "Buğdayın fırsat maliyeti Türkiye'de 2 kumaş, Mısır'da 1 kumaş: Mısır buğdayda karşılaştırmalı üstün." },
      { s: "In the previous question, mutually beneficial terms of trade for 1 ton of wheat would be:", c: ["0.5 units of cloth", "1.5 units of cloth", "2.5 units of cloth", "3 units of cloth"], d: 1, a: "Had iki fırsat maliyetinin (1 ile 2 kumaş) arasında olmalı: 1,5." },
      { s: "Small countries tend to gain more from trade than large countries because:", c: ["They have more resources", "They can trade at world prices that differ greatly from their own domestic opportunity costs", "They always have absolute advantage", "They don't pay tariffs"], d: 1, a: "Küçük ülke dünya fiyatını etkilemez; kendi iç oranından çok farklı fiyatlarla alıp satabilir, kazanç büyük olur." },
      { s: "Comparative advantage based on technology and skills is called:", c: ["Inherent comparative advantage", "Transferable comparative advantage", "Absolute advantage", "Permanent advantage"], d: 1, a: "Teknoloji, sermaye ve beceri başka ülkelere geçebilir: aktarılabilir karşılaştırmalı üstünlük." },
      { s: "If the exchange rate rises from 40 TL/\\$ to 50 TL/\\$, the Turkish lira has:", c: ["Appreciated", "Depreciated", "Not changed in value", "Been devalued only for imports"], d: 1, a: "Bir dolar için daha fazla TL vermek gerekiyor: TL değer kaybetti (depreciation)." },
      { s: "A depreciation of the Turkish lira, other things constant, will tend to:", c: ["Increase Turkish exports and decrease imports", "Decrease exports and increase imports", "Increase both exports and imports", "Have no effect on trade"], d: 0, a: "TL değer kaybedince Türk malları yabancılara ucuzlar (ihracat ↑), yabancı mallar Türklere pahalanır (ithalat ↓)." },
      { s: "A T-shirt costs 400 TL. At an exchange rate of 50 TL/\\$, it costs an American buyer:", c: ["\\$8", "\\$10", "\\$20", "\\$50"], d: 0, a: "400 / 50 = 8 dolar." },
      { s: "A higher interest rate in Turkey (other things equal) tends to:", c: ["Increase the supply of dollars and appreciate the lira", "Decrease the supply of dollars and depreciate the lira", "Increase the demand for dollars", "Have no effect on the exchange rate"], d: 0, a: "Yüksek faiz yabancı yatırımcıyı çeker; dolar getirip TL'ye çevirirler: dolar arzı artar, kur düşer, TL değer kazanır." },
      { s: "A country running a trade deficit must finance it by:", c: ["Printing money only", "Selling assets to foreigners or borrowing from abroad", "Raising tariffs", "Increasing exports immediately"], d: 1, a: "İthalat ihracattan fazlaysa fark, yabancılara varlık satarak ya da borçlanarak karşılanır." },
      { s: "According to the law of one price, if a country loses its comparative advantage, adjustment will occur through:", c: ["Only rising tariffs", "Changes in the exchange rate and relative wages", "Higher prices for its exports", "Increased absolute advantage"], d: 1, a: "Colander'a göre uyum iki kanaldan olur: kur (hızlı) ve göreli ücretler (yavaş)." },
      { s: "Which statement is most consistent with the principle of comparative advantage?", c: ["Trade with low-wage countries makes high-wage countries poorer overall", "Every country has a comparative advantage in something", "Only countries with natural resources can gain from trade", "Free trade benefits every individual in every country"], d: 1, a: "Fırsat maliyeti göreli olduğundan her ülke bir şeyde karşılaştırmalı üstündür. Ticaret toplamda kazanç getirir ama her bireye değil." },
    ],
  });
})();
