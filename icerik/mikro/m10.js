// Colander 11e — 10. bölüm: International Trade Policy (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m10",
    hedefler: [
      "Ticaret kısıtlamalarının türlerini saymak: gümrük vergisi, kota, gönüllü ihracat kısıtlaması, ambargo, düzenleyici engeller, milliyetçi çağrılar",
      "Gümrük vergisinin ve kotanın refah etkilerini grafikle göstermek ve karşılaştırmak",
      "Ticareti kısıtlama gerekçelerini değerlendirmek: bölüşüm, pazarlık, bebek endüstri, ulusal güvenlik, gelir",
      "İktisatçıların neden genellikle serbest ticareti savunduğunu açıklamak",
      "Serbest ticareti destekleyen kurumları (GATT, DTÖ, serbest ticaret anlaşmaları, gümrük birliği) tanımak",
    ],
    bolumler: [
      { baslik: "Ticaret kısıtlamasının türleri", md: R`
Karşılaştırmalı üstünlük ticaretin toplamda kazanç getirdiğini söylese de, hemen her ülke ticareti bir ölçüde kısıtlar. Kısıtlama araçları:

1. **Gümrük vergisi (tariff):** ithal mala konan vergi. Hem devlete gelir sağlar hem de yerli üreticiyi korur.
2. **Kota (quota):** ithal edilebilecek miktara konan sınır.
3. **Gönüllü ihracat kısıtlaması (voluntary restraint agreement, VRA):** ihracatçı ülkenin, karşı ülkenin baskısıyla ihracatını "gönüllü" olarak sınırlaması. 1980'lerde Japonya'nın ABD'ye otomobil ihracatını kısması klasik örnektir.
4. **Ambargo (embargo):** bir ülkeyle ticaretin tamamen yasaklanması — çoğunlukla siyasi nedenlerle.
5. **Düzenleyici engeller (regulatory trade restrictions):** sağlık, güvenlik ve teknik standartlar. Meşru amaçları olabilir ama korumacılık için de kullanılabilir.
6. **Milliyetçi çağrılar (nationalistic appeals):** "Yerli malı kullan" kampanyaları.

:::tanim Tariff
A tax governments place on internationally traded goods, generally imports.
:::

:::tanim Quota
A quantity limit placed on imports.
:::
` },
      { baslik: "Gümrük vergisi ve kotanın etkileri", md: R`
Küçük bir açık ekonomiyi düşün: dünya fiyatını etkileyemiyor. Serbest ticarette iç fiyat dünya fiyatına eşittir; iç talep ile iç arz arasındaki fark ithal edilir.

Gümrük vergisi konunca:

- İç fiyat **dünya fiyatı + vergi** düzeyine çıkar,
- Yerli **üretim artar**, yerli **tüketim azalır**, **ithalat azalır**,
- Yerli üreticiler kazanır (üretici artığı ↑), tüketiciler kaybeder (tüketici artığı ↓),
- Devlet, kalan ithalat üzerinden **vergi geliri** elde eder,
- İki **ölü ağırlık üçgeni** oluşur: biri pahalı yerli üretimin (dünyadan ucuza alınabilecek malın içeride pahalıya üretilmesi), öbürü vazgeçilen tüketimin kaybı.

{{gumruk}}

### Kota mı, vergi mi?
Aynı ithalat miktarına bir kotayla da inilebilir; fiyat ve miktar etkileri aynıdır. Fark **dikdörtgen alanın kime gittiğidir**:

- Vergide bu alan **devletin vergi gelirdir**.
- Kotada bu alan **kota hakkı sahiplerine** gider (ithal lisansı olanlara ya da, gönüllü ihracat kısıtlamasında olduğu gibi, yabancı ihracatçılara).

Bu yüzden iktisatçılar, kısıtlama yapılacaksa **vergiyi kotaya tercih eder**: kazanç en azından ülkenin hazinesinde kalır. Ayrıca vergide talep artarsa ithalat da artabilir; kota ise ithalatı donduruk tutar ve rekabeti daha çok bastırır.

:::ornek Gümrük vergisinin hesabı
İç talep $Q_d = 100 - P$, iç arz $Q_s = P - 10$. Dünya fiyatı 30. (a) Serbest ticarette ithalat ne kadar? (b) 10 lira gümrük vergisi konursa ithalat, vergi geliri ve ölü ağırlık kaybı ne olur?
---cozum---
**(a)** P = 30: $Q_d = 70$, $Q_s = 20$, ithalat = **50**.

**(b)** İç fiyat 40: $Q_d = 60$, $Q_s = 30$, ithalat = **30**.
Vergi geliri = $10 \times 30 = $ **300**.
Ölü ağırlık kaybı: üretim üçgeni $\tfrac12 \times 10 \times (30 - 20) = 50$, tüketim üçgeni $\tfrac12 \times 10 \times (70 - 60) = 50$; toplam **100**.
Üretici artığındaki artış: $10 \times 20 + \tfrac12 \times 10 \times 10 = 250$. Tüketici artığındaki kayıp: $10 \times 60 + \tfrac12 \times 10 \times 10 = 650$. Kontrol: $650 = 250 + 300 + 100$ ✓
:::
` },
      { baslik: "Ticaret neden kısıtlanır?", md: R`
Ticaret toplamda kazanç getiriyorsa, ülkeler neden kısıtlar? Colander birkaç gerekçe sayar:

**1. Kazançların ülke içindeki eşitsiz dağılımı.** Ticaretin faydası milyonlarca tüketiciye küçük parçalar hâlinde dağılır (biraz daha ucuz tişört); maliyeti ise belirli bir sektördeki az sayıda işçi ve firmada yoğunlaşır (fabrika kapanır). Kaybedenler örgütlenir ve lobi yapar; kazananların çoğu kazandığının farkında bile değildir. Siyaset bu yüzden korumacılığa eğilimlidir.

**2. Şirketlerin kazanç üzerinde pazarlığı.** Ticaretten doğan kazancın nasıl paylaşılacağı konusunda şirketler (ve onların hükümetleri) çekişir.

**3. Ülkelerin pazarlığı (haggling).** Bir ülke, karşı tarafı ödün vermeye zorlamak için gümrük vergisini tehdit olarak kullanabilir. Tehdit işe yararsa kazanır; karşılık görürse (misilleme) **ticaret savaşı** çıkar ve herkes kaybeder.

**4. Uzmanlaşmanın dinamiği: bebek endüstri ve ölçek ekonomileri.** Yeni bir sektör başlangıçta rakiplerine göre pahalı üretebilir; yaparak öğrenme (learning by doing) ve ölçek büyüdükçe maliyetler düşer. **Bebek endüstri (infant industry)** argümanı, bu sektörün büyüyene kadar korunmasını önerir. Sorun: koruma bir kez başladığında "bebek" büyümek istemez ve koruma kalıcılaşır.

**5. Makroekonomik gerekçeler.** Korumanın istihdamı artıracağı düşüncesi. Kısa vadede ve belirli bir sektörde doğru olabilir, ama ithalatı azaltmak karşı ülkelerin gelirini ve dolayısıyla ihracatı azaltır; ayrıca kur da tepki verir.

**6. Ulusal güvenlik.** Savunma, gıda, enerji, yarı iletken gibi stratejik mallarda dışa bağımlılık riskli görülebilir. Meşru bir gerekçedir ama sınırı belirsizdir: neredeyse her sektör kendini "stratejik" ilan edebilir.

**7. Uluslararası siyaset.** Yaptırımlar ve ambargolar.

**8. Vergi geliri.** Vergi toplamanın zor olduğu gelişmekte olan ülkelerde gümrük vergisi kolay bir gelir kaynağıdır.

:::gercek
Tarihin en ünlü korumacılık hatası, ABD'nin 1930'daki **Smoot–Hawley** gümrük vergisi yasasıdır: binlerce mala yüksek vergi kondu, ticaret ortakları misilleme yaptı, dünya ticareti çöktü ve Büyük Buhran derinleşti. Daha yakın dönemde ABD'nin 2018'de çelik ve alüminyuma, 2025'te ise çok geniş bir mal yelpazesine gümrük vergisi koyması ve ticaret ortaklarının karşılık vermesi, pazarlık gerekçesinin ve misilleme riskinin güncel örnekleridir.
:::
` },
      { baslik: "İktisatçılar neden serbest ticareti savunur?", md: R`
İktisatçıların büyük çoğunluğu, istisnaları kabul etmekle birlikte, genel bir ilke olarak serbest ticareti savunur. Gerekçeler:

- **Ticaretten kazanç gerçektir ve büyüktür.** Tüketiciler daha ucuz ve çeşitli mallara ulaşır; firmalar girdileri ucuza bulur ve büyük pazarlara satar.
- **Koruma pahalıdır.** Korunan bir işin yılda tüketicilere maliyeti, çoğu zaman o işin maaşından çok daha fazladır.
- **Koruma rekabeti öldürür.** Korunan sektör yenilik yapma baskısından kurtulur.
- **Misilleme riski.** Bir ülkenin koruması ötekinin korumasını tetikler.
- **Kaybedenler başka yollarla desteklenebilir.** İşini kaybedenlere yeniden eğitim, işsizlik sigortası, bölgesel destek — bunlar ticareti kısıtlamaktan daha ucuzdur.

:::dikkat
İktisatçıların savunusu "ticaret herkesi kazandırır" değildir. "Ticaret toplamı büyütür; büyüyen pastadan kaybedenlerin zararı telafi edilebilir" der. Telafinin pratikte yapılmaması, ticarete karşı tepkinin en önemli nedenidir.
:::
` },
      { baslik: "Serbest ticareti destekleyen kurumlar", md: R`
### GATT ve Dünya Ticaret Örgütü
İkinci Dünya Savaşı'ndan sonra 1947'de imzalanan **GATT** (Gümrük Tarifeleri ve Ticaret Genel Anlaşması), art arda müzakere turlarıyla gümrük vergilerini büyük ölçüde düşürdü. 1995'te yerini **Dünya Ticaret Örgütü (WTO)** aldı. WTO'nun temel ilkeleri:

- **En çok kayrılan ülke (most-favored nation, MFN):** bir üyeye tanınan ticari ayrıcalık bütün üyelere tanınır.
- **Ulusal muamele:** ithal mal, içeriye girdikten sonra yerli mal gibi muamele görür.
- **Anlaşmazlık çözümü:** üyeler arasındaki ticaret anlaşmazlıklarını hakem panelleri çözer.

### Serbest ticaret bölgeleri ve gümrük birlikleri
- **Serbest ticaret bölgesi (free trade association):** üyeler kendi aralarındaki gümrük vergilerini kaldırır, üçüncü ülkelere karşı her biri kendi vergisini uygular. Örnek: Kuzey Amerika'daki NAFTA (2020'den beri yerini USMCA aldı).
- **Gümrük birliği (customs union):** ayrıca üçüncü ülkelere karşı **ortak** gümrük vergisi uygulanır.
- **Ortak pazar / ekonomik birlik:** emek ve sermayenin de serbest dolaşımı, ortak politikalar (Avrupa Birliği).

:::gercek
Türkiye 1996'dan beri Avrupa Birliği ile **gümrük birliği** içindedir: sanayi mallarında aralarında gümrük vergisi yoktur ve Türkiye üçüncü ülkelere AB'nin ortak gümrük tarifesini uygular. Bu, Türk sanayisinin (özellikle otomotivin) Avrupa tedarik zincirlerine bağlanmasında belirleyici oldu. Tarım ve hizmetler kapsam dışındadır; birliğin güncellenmesi uzun süredir gündemdedir.
:::

Bölgesel anlaşmaların bir sakıncası **ticaret saptırmasıdır (trade diversion)**: üye olmayan, daha ucuz üreten bir ülkeden yapılan ithalat, sırf gümrük vergisi yüzünden daha pahalı üreten bir üyeye kayabilir.
` },
    ],
    ozet: [
      "Kısıtlama araçları: gümrük vergisi, kota, gönüllü ihracat kısıtlaması, ambargo, düzenleyici engeller, milliyetçi çağrılar.",
      "Gümrük vergisi iç fiyatı yükseltir: üretim artar, tüketim ve ithalat azalır; üretici kazanır, tüketici kaybeder, devlet gelir alır, iki ölü ağırlık üçgeni oluşur.",
      "Kota aynı fiyat ve miktar etkisini yaratır ama rant devlete değil kota sahiplerine gider; iktisatçılar vergiyi kotaya tercih eder.",
      "Kısıtlama gerekçeleri: eşitsiz dağılım (yoğun kayıp, dağınık kazanç), pazarlık, bebek endüstri, istihdam, ulusal güvenlik, siyaset, vergi geliri.",
      "İktisatçılar genelde serbest ticareti savunur; kaybedenlerin başka yollarla telafi edilmesini önerir.",
      "Kurumlar: GATT → DTÖ (en çok kayrılan ülke ilkesi), serbest ticaret bölgeleri, gümrük birlikleri (Türkiye–AB, 1996).",
    ],
    terimler: [
      ["tariff", "gümrük vergisi", "A tax governments place on internationally traded goods, generally imports."],
      ["quota", "kota", "A quantity limit placed on imports."],
      ["voluntary restraint agreement (VRA)", "gönüllü ihracat kısıtlaması", "An agreement in which a country voluntarily restricts its exports, often under threat of trade restrictions."],
      ["embargo", "ambargo", "An all-out restriction on the import or export of a good, or on all trade with a country."],
      ["regulatory trade restriction", "düzenleyici ticaret engeli", "Government-imposed procedural rules (health, safety, technical standards) that limit imports."],
      ["infant industry argument", "bebek endüstri argümanı", "With initial protection, an industry can become competitive through learning by doing and economies of scale."],
      ["learning by doing", "yaparak öğrenme", "Becoming more efficient at a task as one gains experience producing it."],
      ["trade war", "ticaret savaşı", "Escalating retaliatory trade restrictions between countries."],
      ["dumping", "damping", "Selling a good in a foreign market at a price below its cost or below its home-market price."],
      ["General Agreement on Tariffs and Trade (GATT)", "Gümrük Tarifeleri ve Ticaret Genel Anlaşması", "A 1947 agreement under which countries negotiated reductions in trade barriers; replaced by the WTO in 1995."],
      ["most-favored nation (MFN)", "en çok kayrılan ülke", "A principle under which a country extends to all members the same trade terms it gives to any one."],
      ["free trade association", "serbest ticaret bölgesi", "A group of countries that have reduced or eliminated trade barriers among themselves."],
      ["customs union", "gümrük birliği", "A free trade area whose members also adopt a common external tariff."],
      ["trade diversion", "ticaret saptırması", "Shifting imports from a lower-cost non-member to a higher-cost member because of a regional agreement."],
    ],
    quiz: [
      { s: "A tariff on imported steel will tend to:", c: ["Lower the domestic price of steel", "Increase domestic steel production and reduce imports", "Increase steel imports", "Benefit domestic steel consumers"], d: 1, a: "İç fiyat yükselir: yerli üretim artar, tüketim ve ithalat azalır. Yerli çelik kullanıcıları kaybeder." },
      { s: "The main difference between a tariff and an equivalent quota is that:", c: ["A quota raises the domestic price more", "The tariff revenue goes to the government, while under a quota the rent goes to quota holders", "A tariff reduces imports more", "Only quotas create deadweight loss"], d: 1, a: "Fiyat ve miktar etkileri aynı; fark dikdörtgen alanın kime gittiği: vergide devlete, kotada lisans sahiplerine." },
      { s: "Domestic demand is $Q_d = 100 - P$, domestic supply is $Q_s = P - 10$, and the world price is 30. Under free trade, imports are:", c: ["20", "30", "50", "70"], d: 2, a: "P = 30: Qd = 70, Qs = 20; ithalat = 50." },
      { s: "In the previous question, a tariff of 10 per unit reduces imports to:", c: ["40", "30", "20", "10"], d: 1, a: "İç fiyat 40: Qd = 60, Qs = 30; ithalat = 30." },
      { s: "Why are trade restrictions politically popular even though they reduce total welfare?", c: ["Because the benefits are concentrated and the costs dispersed", "Because the costs are concentrated among a few producers and the benefits of free trade are dispersed among many consumers", "Because consumers prefer higher prices", "Because tariffs always create jobs overall"], d: 1, a: "Ticaretin zararı belirli bir sektörde yoğunlaşır ve kaybedenler örgütlenir; kazanç milyonlarca tüketiciye küçük parçalar hâlinde dağılır." },
      { s: "The infant industry argument for protection states that:", c: ["Old industries should be protected forever", "A new industry may become competitive through learning by doing and economies of scale if temporarily protected", "Children should not work in factories", "Protection always lowers prices"], d: 1, a: "Yeni sektör başlangıçta pahalı üretir; büyüyüp öğrendikçe maliyetleri düşer. Sorun: geçici koruma çoğu zaman kalıcılaşır." },
      { s: "An agreement in which an exporting country 'voluntarily' limits its exports to another country is called a:", c: ["Tariff", "Voluntary restraint agreement", "Embargo", "Most-favored nation clause"], d: 1, a: "Gönüllü ihracat kısıtlaması (VRA): genelde karşı ülkenin baskısıyla yapılır; rant ihracatçı firmalara gider." },
      { s: "The Smoot–Hawley Tariff of 1930 is often cited as an example of:", c: ["Successful infant industry protection", "Protectionism that provoked retaliation and worsened the Great Depression", "A free trade agreement", "A WTO dispute settlement"], d: 1, a: "Yüksek gümrük vergileri misillemeye yol açtı, dünya ticareti çöktü ve Buhran derinleşti." },
      { s: "Under the WTO's most-favored nation principle:", c: ["Each country may favor its closest ally", "A trade concession given to one member must be given to all members", "Developing countries pay higher tariffs", "Quotas are required"], d: 1, a: "En çok kayrılan ülke ilkesi: bir üyeye tanınan ayrıcalık bütün üyelere tanınır." },
      { s: "A customs union differs from a free trade association in that a customs union:", c: ["Has no internal tariffs", "Also has a common external tariff toward non-members", "Allows free movement of labor", "Uses a common currency"], d: 1, a: "Serbest ticaret bölgesinde de iç gümrük yoktur; gümrük birliğinde ek olarak üçüncü ülkelere ortak tarife uygulanır." },
      { s: "Since 1996, Turkey and the European Union have formed a:", c: ["Monetary union", "Customs union for industrial goods", "Political federation", "Free trade association covering agriculture and services fully"], d: 1, a: "Türkiye–AB gümrük birliği sanayi mallarını kapsar; tarım ve hizmetler büyük ölçüde dışındadır." },
      { s: "Most economists' preferred way to help workers who lose jobs because of trade is to:", c: ["Impose quotas", "Ban imports", "Provide adjustment assistance such as retraining and unemployment insurance", "Subsidize exports"], d: 2, a: "Ticaret toplamı büyütür; kaybedenleri ticareti kısıtlamadan, doğrudan destekle telafi etmek daha az maliyetlidir." },
    ],
  });
})();
