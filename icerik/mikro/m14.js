// Colander 11e — 14. bölüm: Monopoly and Monopolistic Competition (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m14",
    hedefler: [
      "Tekelcinin marjinal gelir eğrisinin neden talep eğrisinin altında olduğunu göstermek",
      "Tekelin kâr en büyükleyen miktarını ve fiyatını bulmak, kârı ve refah kaybını hesaplamak",
      "Giriş engellerini ve doğal tekeli açıklamak",
      "Fiyat farklılaştırmasının koşullarını ve sonuçlarını açıklamak",
      "Platform tekellerini ve ağ dışsallıklarını tanımlamak",
      "Tekelci rekabetin kısa ve uzun dönem dengesini göstermek; atıl kapasiteyi açıklamak",
    ],
    bolumler: [
      { baslik: "Tekel ve marjinal gelir", md: R`
:::tanim Monopoly
A market structure in which one firm makes up the entire market.
:::

Tekelci, piyasanın tamamıdır; bu yüzden **piyasanın aşağı eğimli talep eğrisiyle** karşı karşıyadır. Daha çok satmak istiyorsa fiyatı düşürmek zorundadır — ve fiyatı yalnız ek birim için değil, **bütün birimler için** düşürür. Sonuç:

$$MR < P$$

Bir birim daha satmanın getirdiği gelir iki parçadan oluşur: ek birimin fiyatı (kazanç) eksi önceki birimlerden fiyat indirimi yüzünden kaybedilen gelir.

:::ornek Marjinal geliri hesapla
Fiyat 10 TL iken 4 birim, 9 TL iken 5 birim satılıyor. Beşinci birimin marjinal geliri nedir?
---cozum---
TR(4) = 40, TR(5) = 45. MR = 45 − 40 = **5 TL**. Beşinci birim 9 TL'ye satıldı ama ilk dört birimin her birinden 1 TL kaybedildi (−4 TL): 9 − 4 = 5.
:::

Doğrusal talepte bu ilişki basittir: talep $P = a - bQ$ ise

$$TR = aQ - bQ^2 \qquad\Rightarrow\qquad MR = a - 2bQ$$

**MR doğrusu, talep doğrusuyla aynı noktadan başlar ama iki kat diktir**; yatay ekseni talep doğrusunun yarı yolunda keser. MR'nin pozitif olduğu yer talebin esnek olduğu üst yarıdır (6. bölüm): bu yüzden **tekelci hep esnek bölgede üretir.**
` },
      { baslik: "Tekelin kâr en büyüklemesi", md: R`
Tekelci de her firma gibi **MR = MC**'de üretir. Fark, fiyatı bu miktarda **talep eğrisinden okumasıdır**:

1. MR = MC olan miktarı bul ($Q_m$).
2. Bu miktarı alıcıların ödemeye razı olduğu fiyatı talep eğrisinden oku ($P_m$).
3. Kâr = $(P_m - ATC) \times Q_m$.

{{tekel}}

:::ornek Tekel çözümü
Talep $P = 100 - Q$, marjinal maliyet $MC = 10 + 0{,}5Q$, ortalama maliyet $ATC = 400/Q + 10 + 0{,}25Q$. Tekelin miktarı, fiyatı ve kârı nedir? Rekabetçi piyasa ne üretirdi? Refah kaybı ne kadar?
---cozum---
$MR = 100 - 2Q$. $MR = MC$: $100 - 2Q = 10 + 0{,}5Q \Rightarrow Q_m = 36$.
Fiyat: $P_m = 100 - 36 = 64$. $ATC(36) = 11{,}1 + 10 + 9 = 30{,}1$.
Kâr $= (64 - 30{,}1) \times 36 \approx$ **1.220**.

Rekabetçi sonuç ($P = MC$): $100 - Q = 10 + 0{,}5Q \Rightarrow Q_r = 60$, $P_r = 40$.

Ölü ağırlık kaybı: tabanı $60 - 36 = 24$, yüksekliği $P_m - MC(36) = 64 - 28 = 36$ olan üçgen: $\tfrac12 \times 24 \times 36 =$ **432**.
:::

### Tekelin refah kaybı
Rekabetçi piyasayla karşılaştırınca tekel **daha az üretir ve daha yüksek fiyat ister**. İki etki vardır:

- **Transfer:** tüketici artığının bir kısmı tekelcinin kârına geçer (bölüşüm etkisi).
- **Ölü ağırlık kaybı:** $Q_m$ ile $Q_r$ arasındaki birimlerde tüketicinin değeri marjinal maliyetten yüksek olduğu hâlde üretim yapılmaz — kimsenin olmayan kayıp.

:::dikkat
Tekelin **arz eğrisi yoktur.** Tam rekabetçi firma her fiyatta MC'ye göre ne kadar üreteceğini söyler; tekelci ise fiyatı kendisi seçer ve seçimi talep eğrisinin biçimine bağlıdır. Aynı MC ile farklı talep eğrileri farklı fiyat–miktar çiftleri doğurur.
:::
` },
      { baslik: "Giriş engelleri", md: R`
Tekel kâr ediyorsa neden başkaları girmiyor? Çünkü bir **giriş engeli** var:

1. **Doğal yetenek / üstün ürün:** firma, rakiplerinin taklit edemediği bir ürün ya da süreçle öne geçmiştir.
2. **Artan ölçek getirisi — doğal tekel:** ölçek ekonomileri o kadar büyüktür ki piyasanın tamamını tek firma en ucuza üretir (elektrik şebekesi, su, doğalgaz dağıtımı, demiryolu). İkinci bir firma girerse ikisi de yüksek ortalama maliyetle üretir.
3. **Devletin yarattığı engeller:** patentler, telif hakları, ruhsatlar, imtiyazlar. Patent, yeniliği teşvik etmek için mucide belirli bir süre (genellikle 20 yıl) tekel hakkı tanır — yenilik teşviki ile tekelin refah kaybı arasında bir değiş tokuştur.

:::tanim Natural monopoly
An industry in which a single firm can produce at a lower cost than can two or more firms, because of economies of scale.
:::

Ayrıca firmalar kendileri de engel kurabilir: kritik bir kaynağı kontrol etmek, büyük reklam harcamaları, müşteriyi kilitleyen sözleşmeler.

### Normal kâr ve tekel rantı
Bir tekel hakkının (ör. bir ruhsatın ya da patentin) satılabildiği durumda, alıcı ondan beklenen bütün tekel kârını satın alma fiyatına yansıtır. Yeni sahip için iktisadi kâr sıfırlanır; tekel kârı ilk sahibe (ya da hakkı dağıtan devlete) kalmıştır. 5. bölümdeki taksi plakası örneği budur.
` },
      { baslik: "Fiyat farklılaştırması", md: R`
:::tanim Price discrimination
The ability to charge different prices to different individuals or groups of individuals for the same good.
:::

Fiyat farklılaştırması için üç koşul gerekir:

1. Firmanın **piyasa gücü** olmalı (fiyat alıcı olmamalı),
2. Firma, **talep esneklikleri farklı** müşteri gruplarını ayırt edebilmeli,
3. Müşteriler arası **yeniden satış (arbitraj) engellenebilmeli**.

Kural: **talebi daha az esnek olan gruba daha yüksek fiyat.**

Örnekler:
- **Öğrenci ve emekli indirimleri** (müze, sinema, toplu taşıma): öğrencinin talebi daha esnektir.
- **Uçak biletleri:** son dakikada alan iş insanının talebi esnek değildir, yüksek fiyat öder; aylar önce alan tatilci düşük fiyat öder.
- **Kupon ve kampanyalar:** kuponla uğraşmaya vakit ayıran fiyata duyarlı müşteridir.
- **Yazılım ve yayın aboneliklerinde ülkeye göre fiyat.**

**Tam (kusursuz) fiyat farklılaştırması** — her müşteriye ödemeye razı olduğu en yüksek fiyatı uygulamak — ilginç bir sonuç verir: ölü ağırlık kaybı **ortadan kalkar** (tekelci rekabetçi miktarı üretir), ama **tüketici artığının tamamı** tekelciye geçer. Etkinlik artar, bölüşüm tekelci lehine bozulur.

:::gercek
Dinamik fiyatlama kullanan uçak şirketleri, otel rezervasyon siteleri ve araç paylaşım uygulamaları, büyük veriyle her müşterinin ödemeye razı olduğu fiyatı tahmin etmeye çalışarak tam fiyat farklılaştırmasına yaklaşıyor. Bu da yeni bir rekabet hukuku ve tüketici koruma tartışması doğuruyor.
:::
` },
      { baslik: "Platform tekelleri ve ağ dışsallıkları", md: R`
Colander'ın 11. baskıda en çok genişlettiği konu: **platform tekelleri.**

:::tanim Network externality
The value of a good increases as more people use it.
:::

Bir mesajlaşma uygulaması, onu kullanan herkes için, kullanıcı sayısı arttıkça daha değerlidir. Bir pazar yeri platformunda (iki taraflı piyasa) satıcı çoğaldıkça alıcı, alıcı çoğaldıkça satıcı gelir. Bu **pozitif ağ dışsallığı** "kazanan her şeyi alır" (winner-take-all) dinamiği yaratır: bir platform öne geçtiğinde büyümesi kendi kendini besler ve rakiplerin girmesi çok zorlaşır.

Platformların özellikleri:

- **Marjinal maliyet neredeyse sıfır:** bir kullanıcı daha eklemek neredeyse bedavadır; maliyetin çoğu baştaki sabit yatırımdır (dev ölçek ekonomileri).
- **İki taraflı fiyatlama:** bir tarafı (çoğu zaman kullanıcıyı) bedava ya da sübvanse eder, öbür taraftan (reklamveren, satıcı) para kazanır.
- **Veri avantajı:** çok kullanıcı daha çok veri, daha iyi hizmet, daha çok kullanıcı demektir.

Rekabet açısından ikilem: platformlar tüketiciye bedava ve kullanışlı hizmet sunar, ama bir kez hâkim olduklarında kendi ürünlerini öne çıkarabilir, satıcılara yüksek komisyon dayatabilir, potansiyel rakipleri satın alabilirler. Colander'ın "Amazon'un karanlık yüzü" kutusu bu tartışmayı anlatır.

:::gercek
Türkiye'de **Rekabet Kurumu**, arama motorlarında kendi hizmetlerini öne çıkardığı gerekçesiyle Google'a, e-ticarette pazar yerlerinin satıcılara uyguladığı koşullar nedeniyle çeşitli platformlara soruşturmalar açtı ve birçok kez para cezası verdi. Platformların "kapı bekçisi" konumu, dünyada olduğu gibi Türkiye'de de rekabet politikasının merkezine yerleşti.
:::
` },
      { baslik: "Tekelci rekabet", md: R`
:::tanim Monopolistic competition
A market structure in which there are many firms selling differentiated products and few barriers to entry.
:::

Kafeler, berberler, restoranlar, giyim markaları: çok sayıda firma var ve giriş kolay, ama her firmanın ürünü biraz farklı (konum, tat, marka, hizmet). Bu yüzden her firmanın **kendi aşağı eğimli talebi** vardır — küçük bir piyasa gücü.

**Kısa dönemde** tekelci rekabetçi firma bir tekelci gibi davranır: MR = MC'de üretir, fiyatı kendi talep eğrisinden okur ve kâr edebilir.

**Uzun dönemde** giriş serbest olduğu için kâr rakipleri çeker. Her yeni rakip müşterilerin bir kısmını alır; her firmanın talebi **sola kayar** ve daha esnekleşir. Süreç, talep eğrisi ATC eğrisine **teğet** olana kadar sürer:

- $P = ATC$ → **iktisadi kâr sıfır** (tam rekabetteki gibi),
- Ama $P > MC$ → tahsis etkinliği yok (tekeldeki gibi),
- Ve firma ATC'nin en düşük noktasının **solunda** üretir → **atıl kapasite (excess capacity)**.

{{tekelci-rekabet}}

Atıl kapasite, tüketicilerin **çeşitlilik** için ödediği bedeldir: her mahallede yarı boş bir kafe olması, herkesin aynı devasa kafeye gitmesinden daha pahalıdır ama insanlar yakınlığa ve farklılığa değer verir.

### Dört yapının karşılaştırması
| | Tam rekabet | Tekelci rekabet | Oligopol | Tekel |
|---|---|---|---|---|
| Uzun dönem iktisadi kâr | 0 | 0 | Mümkün | Mümkün |
| Fiyat ile MC | P = MC | P > MC | P > MC | P > MC |
| Üretim noktası | En düşük ATC | ATC'nin solu | — | — |
| Reklam | Yok | Çok | Çok | Değişir |
` },
    ],
    ozet: [
      "Tekelci aşağı eğimli piyasa talebiyle karşı karşıyadır; daha çok satmak için bütün birimlerin fiyatını düşürür, bu yüzden MR < P. Doğrusal talepte MR = a − 2bQ.",
      "Tekel MR = MC'de üretir, fiyatı talepten okur; rekabete göre daha az miktar, daha yüksek fiyat, ölü ağırlık kaybı. Tekelin arz eğrisi yoktur.",
      "Giriş engelleri: üstün ürün, doğal tekel (ölçek ekonomileri), devlet (patent, ruhsat).",
      "Fiyat farklılaştırması: piyasa gücü + farklı esneklikte gruplar + yeniden satışın engellenmesi. Tam farklılaştırma ÖAK'yi yok eder ama tüketici artığını tekelciye geçirir.",
      "Platform tekelleri ağ dışsallıklarından beslenir: kazanan her şeyi alır; rekabet politikası için yeni zorluklar.",
      "Tekelci rekabette uzun dönemde talep ATC'ye teğet: sıfır kâr, P > MC, atıl kapasite (çeşitliliğin bedeli).",
    ],
    terimler: [
      ["monopoly", "tekel", "A market structure in which one firm makes up the entire market."],
      ["marginal revenue (monopoly)", "tekelde marjinal gelir", "Less than price, because to sell more the monopolist must lower the price on all units; for linear demand MR = a − 2bQ."],
      ["natural monopoly", "doğal tekel", "An industry in which a single firm can produce at a lower cost than two or more firms because of economies of scale."],
      ["patent", "patent", "A legal right to be the sole supplier of a good for a certain period of time."],
      ["welfare loss from monopoly", "tekelin refah kaybı", "The deadweight loss from producing less than the competitive quantity at a price above marginal cost."],
      ["price discrimination", "fiyat farklılaştırması", "The ability to charge different prices to different individuals or groups for the same good."],
      ["perfect price discrimination", "tam fiyat farklılaştırması", "Charging each customer the maximum price he or she is willing to pay."],
      ["network externality", "ağ dışsallığı", "The value of a good increases as more people use it."],
      ["platform monopoly", "platform tekeli", "A firm that dominates a platform connecting groups of users, sustained by network externalities."],
      ["two-sided market", "iki taraflı piyasa", "A market in which a platform serves two distinct groups who benefit from each other's participation."],
      ["monopolistic competition", "tekelci rekabet", "A market structure with many firms selling differentiated products and few barriers to entry."],
      ["product differentiation", "ürün farklılaştırması", "Making a product distinct from competitors' products in quality, location, brand or service."],
      ["excess capacity", "atıl kapasite", "Producing at an output below the level that minimizes average total cost."],
    ],
    quiz: [
      { s: "A monopolist's marginal revenue is less than price because:", c: ["Costs rise as output increases", "To sell an additional unit, it must lower the price on all units", "The government taxes monopolies", "Demand is perfectly elastic"], d: 1, a: "Daha çok satmak için fiyatı bütün birimlerde düşürmek gerekir; önceki birimlerden kaybedilen gelir MR'yi fiyatın altına çeker." },
      { s: "If demand is $P = 100 - Q$, the marginal revenue curve is:", c: ["$MR = 100 - Q$", "$MR = 100 - 2Q$", "$MR = 50 - Q$", "$MR = 100$"], d: 1, a: "TR = 100Q − Q²; MR = 100 − 2Q. Aynı kesişim, iki kat eğim." },
      { s: "At 10 TL, 4 units are sold; at 9 TL, 5 units are sold. The marginal revenue of the 5th unit is:", c: ["9", "5", "45", "1"], d: 1, a: "TR 40'tan 45'e çıktı: MR = 5." },
      { s: "A profit-maximizing monopolist produces where:", c: ["P = MC", "MR = MC, and charges the price on the demand curve at that quantity", "ATC is minimized", "Demand is inelastic"], d: 1, a: "Miktar MR = MC'de belirlenir; fiyat o miktarda talep eğrisinden okunur." },
      { s: "Demand $P = 100 - Q$, $MC = 10 + 0.5Q$. The monopoly quantity is:", c: ["30", "36", "45", "60"], d: 1, a: "100 − 2Q = 10 + 0,5Q → Q = 36 (fiyat 64). Rekabetçi miktar 60 olurdu." },
      { s: "Compared with a perfectly competitive industry with the same costs, a monopoly:", c: ["Produces more at a lower price", "Produces less at a higher price, creating a deadweight loss", "Produces the same quantity", "Has no profit"], d: 1, a: "Tekel daha az üretir, P > MC; aradaki birimlerin kaybı ölü ağırlık kaybıdır." },
      { s: "A monopolist will always operate on the ___ portion of its demand curve.", c: ["inelastic", "elastic", "unit elastic", "perfectly inelastic"], d: 1, a: "MC > 0 olduğu için MR = MC > 0; MR pozitif olduğu yer talebin esnek bölgesidir." },
      { s: "Which of the following is a government-created barrier to entry?", c: ["Economies of scale", "A patent", "A superior product", "Low costs"], d: 1, a: "Patent devletin tanıdığı tekel hakkıdır; ölçek ekonomileri doğal tekel yaratır." },
      { s: "Which condition is NOT required for price discrimination?", c: ["Market power", "Ability to separate customers with different elasticities", "Ability to prevent resale", "Perfectly elastic demand"], d: 3, a: "Tam esnek talebi olan firma fiyat alıcıdır; farklılaştırma yapamaz. Diğer üçü gereklidir." },
      { s: "Perfect price discrimination:", c: ["Increases deadweight loss", "Eliminates deadweight loss but transfers all consumer surplus to the monopolist", "Lowers output below the monopoly level", "Is the same as perfect competition in every respect"], d: 1, a: "Her birim ödeme isteğine göre satılır; rekabetçi miktar üretilir (ÖAK yok) ama tüketici artığı sıfırlanır." },
      { s: "A network externality means that:", c: ["A good's value falls as more people use it", "A good's value rises as more people use it", "Networks are always natural monopolies regulated by government", "Firms share costs"], d: 1, a: "Kullanıcı sayısı arttıkça değer artar; bu da platformlarda kazananın her şeyi almasına yol açar." },
      { s: "In long-run equilibrium, a monopolistically competitive firm:", c: ["Earns economic profit and produces at minimum ATC", "Earns zero economic profit, charges P > MC, and has excess capacity", "Earns zero profit and P = MC", "Earns profit because entry is blocked"], d: 1, a: "Giriş kârı sıfırlar (talep ATC'ye teğet); ama P > MC ve firma ATC'nin en düşük noktasının solunda üretir." },
    ],
  });
})();
