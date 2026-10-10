// Colander 11e — 15. bölüm: Oligopoly and Antitrust Policy (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m15",
    hedefler: [
      "Oligopolün ayırt edici özelliğini — stratejik karşılıklı bağımlılığı — açıklamak",
      "Kartel modelini ve kartellerin neden istikrarsız olduğunu oyun teorisiyle göstermek",
      "Rekabet edilebilir piyasa modelini açıklamak",
      "Dört firma yoğunlaşma oranını ve Herfindahl–Hirschman endeksini hesaplamak",
      "Rekabet hukukunun (antitröst) temel yasalarını ve yaklaşımlarını tanımak",
    ],
    bolumler: [
      { baslik: "Oligopolün ayırt edici özelliği", md: R`
:::tanim Oligopoly
A market structure in which there are only a few firms, and firms explicitly take other firms' likely response into account.
:::

Oligopolde birkaç büyük firma piyasaya hâkimdir: Türkiye'de mobil iletişim (üç operatör), havayolu iç hatları, beyaz eşya, çimento bölgesel piyasaları; dünyada uçak üretimi (Boeing–Airbus), akıllı telefon işletim sistemleri.

Oligopolü diğer yapılardan ayıran şey sayı değil, **stratejik karşılıklı bağımlılıktır (strategic interdependence)**: her firma kararını verirken rakiplerinin nasıl tepki vereceğini hesaba katar. Tam rekabetçi buğday üreticisi rakibini düşünmez; THY ise bir hatta fiyat indirirken Pegasus'un ne yapacağını düşünmek zorundadır.

Bu yüzden tek bir oligopol modeli yoktur; davranışa göre farklı modeller kullanılır. Colander iki uç modeli öne çıkarır: **kartel modeli** ve **rekabet edilebilir piyasa modeli**. Gerçek oligopoller ikisinin arasında bir yerdedir.
` },
      { baslik: "Kartel modeli ve hile yapma güdüsü", md: R`
:::tanim Cartel model of oligopoly
A model that assumes that oligopolies act as if they were a monopoly and assign output quotas to individual member firms so that total output is consistent with joint profit maximization.
:::

Firmalar birlikte bir tekelci gibi davranırsa — toplam miktarı tekel düzeyinde tutar, fiyatı yükseltirlerse — toplam kâr en büyük olur. Açık anlaşmaya **kartel**, açıkça konuşmadan birbirini izlemeye **örtük anlaşma (implicit collusion)** denir. Örtük anlaşmanın bir biçimi **fiyat liderliğidir**: bir firma fiyatı belirler, ötekiler izler.

Ama kartelin içinde bir zaaf vardır: **her üye hile yapmak ister.** Kartel fiyatı marjinal maliyetin çok üstündedir; bir üye gizlice biraz daha fazla satarsa (ya da biraz indirim yaparsa) kendi kârını artırır. Herkes böyle düşünürse kartel çöker.

Bu durumun yapısı oyun teorisinin ünlü **mahkûm ikilemidir**:

{{oyun-matrisi|{"oyun":"kartel"}}}

Her firma için, rakip ne yaparsa yapsın "hile yap" daha iyidir (**baskın strateji**). Bu yüzden iki firma da hile yapar ve ikisinin de anlaşmaya uyduğu durumdan daha kötü bir sonuca (**Nash dengesi**) varır.

:::gercek
**OPEC** petrol üreticisi ülkelerin kartelidir ve tarihi kota ihlalleriyle doludur: üyeler belirlenen kotaların üstünde üretip kartel fiyatını aşındırır. Kartelin ayakta kalması güçlü bir lidere (Suudi Arabistan), denetime ve hile yapanları cezalandırma kapasitesine bağlıdır. Türkiye'de de Rekabet Kurumu çimento, ekmek mayası, hazır beton, bankacılık gibi sektörlerde kartel ve fiyat koordinasyonu soruşturmaları yürütmüştür.
:::

### Kırık talep eğrisi
Klasik bir oligopol modeli, oligopollerde fiyatların neden "yapışkan" olduğunu açıklar: firma fiyat artırırsa rakipler izlemez (müşteri kaybeder), indirirse rakipler de indirir (pazar payı kazanamaz). Talep eğrisi mevcut fiyatta kırılır, MR'de bir boşluk oluşur ve maliyet değişse bile fiyat sabit kalabilir.

{{kirik-talep}}
` },
      { baslik: "Rekabet edilebilir piyasa modeli", md: R`
:::tanim Contestable market model
A model of oligopoly in which barriers to entry and exit, not market structure, determine a firm's price and output decisions.
:::

Bu model şunu söyler: piyasada tek bir firma bile olsa, **giriş ve çıkış kolaysa**, firma tekel fiyatı isteyemez. Çünkü yüksek fiyat, hemen girip kârı paylaşacak rakipleri çeker ("vur-kaç" girişi). Potansiyel rekabet tehdidi, fiilî rekabet kadar disiplin sağlar.

Sonuç: piyasa gücünü ölçerken **firma sayısına değil, giriş engellerine** bakmak gerekir. Az firmalı ama girişe açık bir piyasa rekabetçi davranabilir; çok firmalı ama ağır düzenlemelerle korunan bir piyasa rekabetçi olmayabilir.

Colander bu bölümde platform tekellerini de tartışır: ağ dışsallıkları ve veri avantajı, platformlar için giriş engellerini çok yükseltir; bu yüzden onlar "rekabet edilebilir" olmaktan uzaklaşır. Uber ile Lyft'in stratejik rekabeti — sürücü ve yolcu çekmek için sübvansiyon savaşları, ardından fiyatların yükselmesi — oligopol davranışının güncel bir örneğidir.
` },
      { baslik: "Piyasa yapısını ölçmek: CR4 ve HHI", md: R`
Rekabet kurumları bir piyasanın ne kadar yoğun olduğunu iki ölçüyle değerlendirir:

:::tanim Concentration ratio
The value of sales by the top firms of an industry stated as a percentage of total industry sales.
:::

**Dört firma yoğunlaşma oranı (CR4):** en büyük dört firmanın pazar paylarının toplamı.

:::tanim Herfindahl–Hirschman index (HHI)
A method used by the Department of Justice to classify how competitive an industry is; the sum of the squared market shares of all firms in the industry.
:::

$$HHI = s_1^2 + s_2^2 + \dots + s_n^2 \qquad (s_i: \text{yüzde olarak pazar payı})$$

HHI 0'a yakınsa (çok sayıda küçük firma) rekabetçi, **10.000** ise tam tekeldir. Payların karesini aldığı için büyük firmalara daha fazla ağırlık verir; bu yüzden CR4'ün göremediği dağılım farklılıklarını yakalar.

:::ornek CR4 ve HHI hesapla
İki piyasa düşün. A piyasasında dört firmanın payları %25, %25, %25, %25. B piyasasında %70, %10, %10, %10. İkisinin CR4'ü ve HHI'si nedir?
---cozum---
İkisinde de **CR4 = %100**.

A: $HHI = 4 \times 25^2 = 2500$.
B: $HHI = 70^2 + 3 \times 10^2 = 4900 + 300 = 5200$.

CR4 iki piyasayı aynı gösteriyor, ama B'de bir firma baskın: HHI bu farkı yakalıyor.
:::

Colander'daki ABD Adalet Bakanlığı eşikleri (2010 rehberi): HHI < 1500 **yoğunlaşmamış**, 1500–2500 **orta derecede yoğun**, > 2500 **yüksek derecede yoğun**. (2023'te yayımlanan yeni rehber eşikleri 1000 ve 1800'e indirdi.) Birleşmeler değerlendirilirken hem birleşme sonrası HHI düzeyine hem de birleşmenin HHI'yi ne kadar artırdığına bakılır.

{{hhi}}
` },
      { baslik: "Rekabet hukuku (antitröst)", md: R`
Piyasa gücünün kötüye kullanılmasını önleyen politikalara **rekabet politikası** (ABD'de *antitrust*) denir.

### ABD'nin temel yasaları
- **Sherman Yasası (1890):** ticareti kısıtlayan anlaşmaları ve tekelleşme girişimlerini yasaklar.
- **Clayton Yasası (1914):** rekabeti azaltan belirli uygulamaları (fiyat farklılaştırmasının bazı türleri, bağlama satış, rakip şirketlerin yönetim kurullarında çapraz görev, rekabeti azaltan birleşmeler) yasaklar.
- **Federal Ticaret Komisyonu Yasası (1914):** haksız rekabet yöntemlerini denetleyen FTC'yi kurar.

### İki yaklaşım
- **Yapıya göre yargılama (judgment by structure):** bir firmanın pazar payı çok büyükse, davranışına bakılmaksızın sorunlu sayılır.
- **Performansa göre yargılama (judgment by performance):** firmanın büyüklüğü değil, *davranışı* — fiyatları yükseltip yükseltmediği, rakipleri haksız yollarla dışlayıp dışlamadığı — değerlendirilir.

Tarihî davalar: **Standard Oil** (1911, parçalandı), **AT&T** (1982, bölündü), **Microsoft** (2000'ler, işletim sistemine tarayıcı bağlama), **Google** (2024'te bir ABD mahkemesi, arama piyasasındaki tekelini hukuka aykırı yollarla koruduğuna hükmetti).

:::gercek
Türkiye'de rekabet hukukunun temeli **4054 sayılı Rekabetin Korunması Hakkında Kanun**'dur (1994); uygulayıcısı **Rekabet Kurumu**'dur. Kanunun üç ana maddesi:
- **Madde 4:** rekabeti kısıtlayan anlaşmalar ve uyumlu eylemler (kartel) yasak,
- **Madde 6:** hâkim durumun kötüye kullanılması yasak,
- **Madde 7:** rekabeti önemli ölçüde azaltacak birleşme ve devralmalar izne tabi.

Avrupa Birliği hukukuyla büyük ölçüde uyumludur; gümrük birliğinin de bir gereğidir.
:::

:::dikkat
Büyük olmak tek başına suç değildir. İyi ürün yapıp büyüyen firma ödüllendirilmelidir; sorun, piyasa gücünün rakipleri haksız yollarla dışlamak ya da tüketiciyi sömürmek için kullanılmasıdır. Rekabet politikasının zorluğu bu ikisini ayırt etmektir.
:::
` },
    ],
    ozet: [
      "Oligopolü ayıran şey stratejik karşılıklı bağımlılıktır: her firma rakiplerinin tepkisini hesaba katar.",
      "Kartel modeli: firmalar ortak tekelci gibi davranır; ama her üyenin hile yapma güdüsü vardır (mahkûm ikilemi), kartel istikrarsızdır.",
      "Kırık talep eğrisi oligopol fiyatlarının yapışkanlığını açıklar.",
      "Rekabet edilebilir piyasa modeli: fiyatı firma sayısı değil giriş–çıkış engelleri belirler.",
      "CR4 = en büyük dört firmanın payları toplamı; HHI = payların kareleri toplamı (0–10.000). Colander: 1500 ve 2500 eşikleri.",
      "Rekabet hukuku: ABD'de Sherman, Clayton, FTC yasaları; Türkiye'de 4054 sayılı Kanun ve Rekabet Kurumu (kartel, hâkim durum, birleşme).",
    ],
    terimler: [
      ["oligopoly", "oligopol", "A market structure with only a few firms that explicitly take other firms' likely responses into account."],
      ["strategic interdependence", "stratejik karşılıklı bağımlılık", "Each firm's decisions depend on how it expects rivals to respond."],
      ["cartel", "kartel", "A combination of firms that acts as if it were a single firm, coordinating output and prices."],
      ["cartel model of oligopoly", "oligopolün kartel modeli", "Oligopolies act as if they were a monopoly and assign output quotas to member firms."],
      ["implicit collusion", "örtük anlaşma", "Multiple firms make the same pricing decisions even though they have not explicitly consulted with one another."],
      ["price leadership", "fiyat liderliği", "One firm sets the price and other firms follow."],
      ["kinked demand curve", "kırık talep eğrisi", "A demand curve with a kink at the current price, because rivals match price cuts but not price increases."],
      ["contestable market model", "rekabet edilebilir piyasa modeli", "Barriers to entry and exit, not market structure, determine a firm's price and output decisions."],
      ["four-firm concentration ratio (CR4)", "dört firma yoğunlaşma oranı", "The combined market share of the top four firms in an industry."],
      ["Herfindahl–Hirschman index (HHI)", "Herfindahl–Hirschman endeksi", "The sum of the squared market shares (in percent) of all firms in an industry."],
      ["antitrust policy", "rekabet politikası (antitröst)", "Government policy toward the competitive process, preventing collusion and abuse of market power."],
      ["Sherman Antitrust Act", "Sherman Yasası", "An 1890 U.S. law outlawing combinations in restraint of trade and attempts to monopolize."],
      ["Clayton Antitrust Act", "Clayton Yasası", "A 1914 U.S. law that made specific monopolistic practices illegal."],
      ["judgment by structure", "yapıya göre yargılama", "Deciding whether an industry is competitive based on its structure (e.g., market shares)."],
      ["judgment by performance", "performansa göre yargılama", "Deciding whether an industry is competitive based on the behavior of firms."],
      ["abuse of dominant position", "hâkim durumun kötüye kullanılması", "Using market power to exclude rivals or exploit customers; prohibited by competition law (Article 6 of Turkish Law No. 4054)."],
    ],
    quiz: [
      { s: "The distinguishing feature of oligopoly is:", c: ["A single seller", "Strategic interdependence among a few firms", "Identical products and free entry", "Price-taking behavior"], d: 1, a: "Birkaç firma var ve her biri kararında rakiplerinin tepkisini hesaba katıyor." },
      { s: "In the cartel model, member firms have an incentive to cheat because:", c: ["The cartel price is below marginal cost", "The cartel price is well above marginal cost, so selling more raises an individual firm's profit", "The government requires it", "Demand is perfectly inelastic"], d: 1, a: "Fiyat MC'nin çok üstünde; bir üye gizlice fazla satarsa kendi kârını artırır." },
      { s: "In the cartel game (Comply/Cheat), cheating is a dominant strategy. The Nash equilibrium is:", c: ["Both comply", "Both cheat", "One complies, one cheats", "There is no equilibrium"], d: 1, a: "Rakip ne yaparsa yapsın hile daha iyi; ikisi de hile yapar ve uyma durumundan kötü bir sonuca varır." },
      { s: "In the prisoner's dilemma, the Nash equilibrium is:", c: ["Always the best outcome for both players", "Worse for both players than the cooperative outcome", "Better for one player only", "Always unique and efficient"], d: 1, a: "İkilem burada: bireysel akılcılık ikisinin de daha iyi olduğu işbirliği sonucunu engelliyor." },
      { s: "According to the contestable market model, a market's price and output are determined mainly by:", c: ["The number of firms", "Barriers to entry and exit", "The size of the largest firm", "Government price controls"], d: 1, a: "Giriş kolaysa tek firma bile tekel fiyatı isteyemez; potansiyel rekabet disiplin sağlar." },
      { s: "The kinked demand curve model explains:", c: ["Why oligopoly prices tend to be sticky", "Why monopolies earn profits", "Why cartels are stable", "Why perfect competition is efficient"], d: 0, a: "Rakipler indirimi izler, artışı izlemez; MR'de boşluk oluşur ve maliyet değişse de fiyat sabit kalır." },
      { s: "An industry has four firms with market shares of 40%, 30%, 20% and 10%. Its HHI is:", c: ["100", "1000", "3000", "10000"], d: 2, a: "40² + 30² + 20² + 10² = 1600 + 900 + 400 + 100 = 3000." },
      { s: "Two industries both have a four-firm concentration ratio of 100%. In industry A shares are 25/25/25/25; in B they are 70/10/10/10. Which statement is correct?", c: ["Both have the same HHI", "B has a higher HHI (5200 vs 2500)", "A has a higher HHI", "HHI cannot be calculated"], d: 1, a: "A: 4 × 625 = 2500. B: 4900 + 300 = 5200. CR4 farkı göremez, HHI görür." },
      { s: "Using the 2010 guidelines cited by Colander, an industry with an HHI of 2000 is considered:", c: ["Unconcentrated", "Moderately concentrated", "Highly concentrated", "A monopoly"], d: 1, a: "1500–2500 arası orta derecede yoğun." },
      { s: "Judgment by performance means evaluating an industry's competitiveness based on:", c: ["The number of firms", "Market shares", "The behavior of firms", "The age of firms"], d: 2, a: "Yapıya göre yargılama paylara, performansa göre yargılama davranışa bakar." },
      { s: "The 1890 U.S. law that prohibits combinations in restraint of trade is the:", c: ["Clayton Act", "Sherman Act", "FTC Act", "Smoot–Hawley Act"], d: 1, a: "Sherman Yasası (1890) rekabet hukukunun temelidir; Clayton ve FTC yasaları 1914'te geldi." },
      { s: "In Turkey, cartels and agreements restricting competition are prohibited by:", c: ["Article 4 of Law No. 4054", "Article 6 of Law No. 4054", "The Customs Union agreement", "The Banking Law"], d: 0, a: "4054 sayılı Kanun: madde 4 kartel/anlaşmalar, madde 6 hâkim durumun kötüye kullanılması, madde 7 birleşmeler." },
    ],
  });
})();
