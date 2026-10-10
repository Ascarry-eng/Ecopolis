// Colander 11e — 16. bölüm: Real-World Competition and Technology (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m16",
    hedefler: [
      "Gerçek firmaların amaçlarının neden yalnız kâr olmadığını; izleme (vekâlet) sorununu açıklamak",
      "X-etkinsizliğini ve rekabetin onu nasıl sınırladığını tartışmak",
      "Firmaların rekabetten kaçma ve rekabeti engelleme yollarını tanımak",
      "Doğal tekelin düzenlenmesi seçeneklerini (MC fiyatlaması, ortalama maliyet fiyatlaması, fiyat tavanı) karşılaştırmak",
      "Teknolojinin, ağ dışsallıklarının, standartların ve patentlerin rekabeti nasıl değiştirdiğini açıklamak",
    ],
    bolumler: [
      { baslik: "Rekabet kaybedenler içindir mi?", md: R`
Colander bölüme, PayPal'ın kurucularından Peter Thiel'in *Zero to One* kitabındaki kışkırtıcı tezle başlar: **"Rekabet kaybedenler içindir."** Thiel'e göre başarılı girişimci rekabetçi bir piyasaya girmez; rakipsiz kalacağı yeni bir piyasa yaratır ve orada tekel kârı elde eder.

Bu, ders kitabının tam rekabet idealinin tersidir — ama gerçek dünyayı iyi anlatır. Firmalar rekabeti sevmez; ondan kaçmak, onu azaltmak için ellerinden geleni yapar. İktisadi süreç ise sürekli yeni rakipler çıkararak bu tekelleri aşındırır. Joseph Schumpeter bu dinamiğe **yaratıcı yıkım (creative destruction)** der: yenilikçi firmaların tekelleri, daha yeni yeniliklerle yıkılır.

:::ipucu
Gerçek dünyada rekabet bir **durum** değil bir **süreçtir**. Firmalar rekabetin sonucunda değil, ortasında yaşar: bir avantaj elde eder, rakipler onu taklit eder, yeni bir avantaj arar.
:::
` },
      { baslik: "Gerçek firmaların amaçları ve izleme sorunu", md: R`
Standart model "firma kârı en büyükler" der. Ama büyük bir şirketi kim yönetir? Sahipler (hissedarlar) değil, **yöneticiler**. Yöneticilerin amaçları sahiplerinkiyle her zaman örtüşmez: yüksek maaş, prestij, büyük ofisler, şirketi büyütmek (büyüklük maaşı artırır), riskten kaçınmak.

:::tanim Monitoring problem
Employees' incentives differ from the owner's incentives, so the owner must monitor employees; the problem of making sure that managers and workers act in the interest of the owners.
:::

Bu, daha genel **vekâlet (principal–agent) sorununun** bir hâlidir: asıl (sahip) işi vekile (yönetici) yaptırır, ama vekili tam olarak gözetleyemez. Çözüm yolları:

- **Performansa dayalı ücret:** hisse senedi opsiyonları, kâr payı primleri. (Ama bunlar kısa vadeli hisse fiyatını şişirme gibi yeni sorunlar yaratabilir.)
- **Yönetim kurulu denetimi ve bağımsız denetçiler.**
- **Ele geçirme tehdidi (takeover):** kötü yönetilen şirketin hissesi ucuzlar, başka bir şirket onu satın alıp yönetimi değiştirebilir.
- **Rekabet:** rakipleri verimli olan bir şirket, yöneticilerinin savurganlığını uzun süre taşıyamaz.

:::tanim X-inefficiency
Firms operating far less efficiently than they technically could; costs are higher than the minimum possible.
:::

Harvey Leibenstein'ın **X-etkinsizliği** kavramı, rekabet baskısı olmayan firmalarda maliyetlerin mümkün olandan yüksek olduğunu anlatır: "rahat tekelci" çaba harcamaz. Tekelin gerçek maliyeti, ölü ağırlık üçgeninden büyük olabilir.

:::gercek
Türkiye'de Borsa İstanbul şirketlerinin çoğu **aile şirketidir**; sahipler aynı zamanda yöneticidir ve klasik vekâlet sorunu daha küçüktür. Bunun yerine başka bir vekâlet sorunu öne çıkar: **kontrol eden aile ile küçük (azınlık) yatırımcılar** arasındaki çıkar çatışması — ilişkili taraf işlemleri, kâr payı dağıtmama gibi. KAP'taki açıklama yükümlülükleri ve SPK'nın kurumsal yönetim ilkeleri bu soruna yöneliktir.
:::
` },
      { baslik: "Rekabetten kaçmak, rekabeti engellemek", md: R`
Kâr peşindeki firmanın rekabete karşı iki stratejisi vardır:

**1. Farklılaşmak ve yeni piyasa yaratmak (meşru yol).** Yeni ürün, daha iyi hizmet, güçlü marka. Bu, toplum için de faydalıdır: yenilik budur.

**2. Giriş engelleri kurmak.**
- **Patent ve fikrî mülkiyet:** yasal tekel.
- **Ölçek ve maliyet avantajı:** rakibin aynı maliyete inmesini imkânsızlaştıran büyüklük.
- **Ağ dışsallıkları ve kilitlenme:** müşteriyi platforma bağlamak, başka platforma geçişi pahalı kılmak (verileri taşıyamamak, uyumsuz formatlar).
- **Siyasi yollar:** lobi yaparak rakipleri zorlaştıran düzenlemeler çıkarmak (rant arama, 7. bölüm).
- **Yıkıcı fiyatlama (predatory pricing):** rakibi piyasadan atmak için geçici olarak maliyetin altında satmak, sonra fiyatı yükseltmek.

**3. Rakiplerle anlaşmak.** Kartel ve örtük anlaşma (15. bölüm).

### Piyasa için rekabet
Bazı piyasalarda rekabet **piyasanın içinde** değil, **piyasanın kendisi için** olur: firmalar tekel olabilmek için yarışır (ör. bir platformun standardı olmak, bir ihaleyi kazanmak). Bu yarış tüketiciye fayda sağlayabilir (bedava hizmetler, sübvansiyonlar), ama yarışın sonunda kazanan tekel olur.
` },
      { baslik: "Doğal tekeli düzenlemek", md: R`
Doğal tekelde (elektrik iletimi, doğalgaz dağıtımı, su) tek firma en ucuz üreticidir; rekabet etkinsiz olur. Ama serbest bırakılan tekelci yüksek fiyat ister. Düzenleyicinin seçenekleri:

1. **Marjinal maliyet fiyatlaması (P = MC):** etkin miktarı sağlar. Ama doğal tekelde ortalama maliyet sürekli düştüğü için MC, ATC'nin altındadır; firma zarar eder ve **sübvansiyon** gerekir.
2. **Ortalama maliyet fiyatlaması (P = ATC):** firma sıfır iktisadi kâr eder, sübvansiyon gerekmez. Miktar etkin düzeyin biraz altındadır. Asıl sorun **teşviktir**: maliyetler fiyatlara yansıtılabildiği için firmanın maliyet düşürme güdüsü zayıftır (hatta şişirme güdüsü vardır).
3. **Fiyat tavanı / gelir tavanı (price cap):** düzenleyici, birkaç yıllığına enflasyona endeksli bir fiyat tavanı koyar. Firma bu dönemde maliyetlerini düşürürse farkı kâr olarak tutar: maliyet düşürme teşviki geri gelir.
4. **Kamu mülkiyeti:** devlet hizmeti kendisi sunar — ama kamu işletmeleri de X-etkinsizliğinden ve siyasi baskılardan muzdarip olabilir.

{{dogal-tekel}}

:::gercek
Türkiye'de elektrik ve doğalgaz dağıtım şirketlerinin tarifelerini **EPDK** (Enerji Piyasası Düzenleme Kurumu) belirler. Dağıtım şirketlerine belirli dönemler için gelir tavanı ve verimlilik hedefleri konur — fiyat tavanı mantığının bir uygulaması. Şebeke doğal tekel olarak düzenlenirken, elektrik *üretimi* ve *perakende satışı* rekabete açılmıştır: doğal tekel olan kısmı rekabetçi olabilen kısımdan ayırmak modern düzenlemenin temel ilkesidir.
:::
` },
      { baslik: "Teknoloji, standartlar ve patentler", md: R`
Teknoloji piyasaların yapısını kökten değiştirir.

### Ağ dışsallıkları ve standartlar
Bir ürünün değeri kullanıcı sayısıyla artıyorsa (**ağ dışsallığı**), piyasa tek bir **standarda** doğru kayar: herkes ötekilerin kullandığını kullanmak ister. Bu, kazananın her şeyi aldığı piyasalar yaratır.

**Kilitlenme (lock-in)** ve **patika bağımlılığı (path dependence):** bir standart bir kez yerleşince, daha iyi bir alternatif çıksa bile geçiş zordur. Klasik örnek **QWERTY klavyedir**: daha verimli düzenler önerildi ama herkes QWERTY'ye alıştığı için değişmedi. (Türkiye'de F klavye ile Q klavyenin hikâyesi de benzerdir: Türkçe için daha verimli F klavye, yaygınlaşan Q klavyenin gerisinde kaldı.)

### Patentler ve fikrî mülkiyet
Yenilik pahalıdır, taklit ucuzdur. Patent, mucide geçici bir tekel tanıyarak yenilik yapma güdüsü yaratır. Ama tekel, bir kez icat edilmiş bilginin kullanımını kısıtlar: bilgi rakipsiz bir maldır (8. bölüm), onu kullanmanın marjinal maliyeti sıfırdır. Patent sistemi bu iki hedef — **yeniliği teşvik** ve **bilgiye erişim** — arasında bir uzlaşmadır. İlaç patentleri bu tartışmanın en keskin olduğu alandır.

:::tanim Technological lock-in
The use of a particular technology makes other technologies costly to adopt; established standards persist even when better ones exist.
:::

### Teknoloji ve piyasa yapısı
Teknoloji bazen rekabeti artırır (internet, aracıları ortadan kaldırıp küçük üreticileri müşteriye bağlar), bazen azaltır (platformlar, dev ölçek ekonomileri). Yapay zekâ, büyük veri ve bulut bilişim gibi alanlarda yatırım maliyetleri çok yüksek, marjinal maliyetler çok düşük olduğu için birkaç büyük firmanın hâkim olduğu yapılar oluşmaktadır. Rekabet politikası bu yüzden geleceğin en önemli iktisat politikası alanlarından biridir.
` },
    ],
    ozet: [
      "Gerçek dünyada rekabet bir süreçtir; firmalar rekabetten kaçar (Thiel), yaratıcı yıkım tekelleri aşındırır (Schumpeter).",
      "İzleme (vekâlet) sorunu: yöneticilerin amaçları sahiplerinkinden farklı olabilir; performans ücreti, denetim, ele geçirme tehdidi, rekabet çözüm yollarıdır.",
      "X-etkinsizliği: rekabet baskısı olmayan firmalarda maliyetler mümkün olandan yüksektir.",
      "Firmalar giriş engeli kurar: patent, ölçek, ağ dışsallığı ve kilitlenme, lobi, yıkıcı fiyatlama.",
      "Doğal tekel düzenlemesi: P = MC (etkin ama sübvansiyon gerekir), P = ATC (sıfır kâr, zayıf teşvik), fiyat tavanı (maliyet düşürme teşviki), kamu mülkiyeti.",
      "Teknoloji: ağ dışsallıkları standartlara ve kilitlenmeye yol açar; patentler yenilik teşviki ile erişim arasında bir uzlaşmadır.",
    ],
    terimler: [
      ["creative destruction", "yaratıcı yıkım", "Schumpeter's description of how innovation creates new industries and destroys old ones, eroding monopolies over time."],
      ["monitoring problem", "izleme sorunu", "Employees' and managers' incentives differ from the owners' incentives, so the owners must monitor them."],
      ["principal–agent problem", "vekâlet (asıl–vekil) sorunu", "The problem that arises when an agent's interests differ from those of the principal on whose behalf the agent acts."],
      ["X-inefficiency", "X-etkinsizliği", "Firms operating far less efficiently than they technically could."],
      ["corporate takeover", "şirket ele geçirme", "A firm or group buys a controlling stake in a firm, often to replace its management."],
      ["predatory pricing", "yıkıcı fiyatlama", "Temporarily pricing below cost to drive competitors out of the market."],
      ["competition for the market", "piyasa için rekabet", "Firms compete to become the monopoly provider rather than competing within the market."],
      ["marginal cost pricing", "marjinal maliyet fiyatlaması", "Regulating a natural monopoly so that price equals marginal cost; usually requires a subsidy."],
      ["average cost pricing", "ortalama maliyet fiyatlaması", "Regulating a natural monopoly so that price equals average total cost; zero economic profit."],
      ["price cap regulation", "fiyat tavanı düzenlemesi", "Setting a maximum price (often indexed to inflation) for several years, letting the firm keep cost savings."],
      ["network externality", "ağ dışsallığı", "The value of a good increases as more people use it."],
      ["technological lock-in", "teknolojik kilitlenme", "The use of a particular technology makes other technologies costly to adopt."],
      ["path dependence", "patika bağımlılığı", "Outcomes depend on the historical path taken, not only on current conditions."],
      ["intellectual property", "fikrî mülkiyet", "Legal rights (patents, copyrights, trademarks) over creations of the mind."],
    ],
    quiz: [
      { s: "Peter Thiel's claim that 'competition is for losers' suggests that successful entrepreneurs:", c: ["Enter perfectly competitive markets", "Seek to create new markets where they face little competition", "Always lower prices", "Avoid profits"], d: 1, a: "Thiel'e göre başarı rakipsiz kalınan yeni bir piyasa yaratıp tekel kârı elde etmektir." },
      { s: "Schumpeter's term for the process by which innovation destroys old industries and monopolies is:", c: ["X-inefficiency", "Creative destruction", "Path dependence", "Lock-in"], d: 1, a: "Yaratıcı yıkım: yenilikçi firmaların tekelleri daha yeni yeniliklerle yıkılır." },
      { s: "The monitoring problem arises because:", c: ["Owners and managers may have different incentives", "Firms cannot measure output", "Consumers cannot monitor prices", "Governments regulate firms"], d: 0, a: "Yöneticiler sahiplerin değil kendi çıkarlarına göre davranabilir; sahipler onları tam gözetleyemez (vekâlet sorunu)." },
      { s: "X-inefficiency refers to:", c: ["The deadweight loss of monopoly", "Firms operating less efficiently than they technically could", "A tax on exports", "Excess capacity in monopolistic competition"], d: 1, a: "Rekabet baskısı yoksa maliyetler mümkün olan en düşük düzeyin üstüne çıkar." },
      { s: "Which of the following can reduce the monitoring problem in corporations?", c: ["Removing the board of directors", "Performance-based pay and the threat of takeover", "Eliminating competition", "Hiding financial information"], d: 1, a: "Performansa dayalı ücret, denetim, ele geçirme tehdidi ve rekabet yöneticileri sahiplerin çıkarına yaklaştırır." },
      { s: "Predatory pricing means:", c: ["Charging the same price as rivals", "Temporarily pricing below cost to drive rivals out, then raising prices", "Charging different prices to different groups", "Pricing at marginal cost"], d: 1, a: "Rakibi piyasadan atmak için geçici zarar, ardından tekel fiyatı." },
      { s: "If a natural monopoly is required to price at marginal cost, it will typically:", c: ["Earn large profits", "Make a loss and require a subsidy", "Produce less than the monopoly quantity", "Earn exactly zero profit"], d: 1, a: "Doğal tekelde ATC düşerken MC < ATC; P = MC'de fiyat ortalama maliyeti karşılamaz." },
      { s: "A drawback of average cost pricing for a regulated natural monopoly is that:", c: ["The firm makes large losses", "The firm has weak incentives to reduce costs", "Output is higher than the efficient level", "It requires a large subsidy"], d: 1, a: "Maliyetler fiyata yansıtılabildiği için firmanın maliyet düşürme güdüsü zayıftır." },
      { s: "Price cap regulation improves on average cost pricing because:", c: ["It guarantees a profit", "Firms keep the savings if they reduce costs, giving them an incentive to be efficient", "It eliminates the need for regulation", "It sets price equal to marginal cost"], d: 1, a: "Tavan belirli bir süre sabit kalır; maliyeti düşüren firma farkı kâr olarak tutar." },
      { s: "The persistence of the QWERTY keyboard despite possibly better designs is an example of:", c: ["Economies of scope", "Technological lock-in and path dependence", "Perfect competition", "Price discrimination"], d: 1, a: "Bir standart yerleşince herkes ona alıştığı için daha iyi bir alternatife geçmek zorlaşır." },
      { s: "Patents involve a trade-off between:", c: ["Exports and imports", "Encouraging innovation and allowing wide use of existing knowledge", "Fixed and variable costs", "Taxes and subsidies"], d: 1, a: "Geçici tekel yenilik güdüsü yaratır ama rakipsiz bir mal olan bilginin kullanımını kısıtlar." },
      { s: "Modern regulation of electricity often separates the natural monopoly part (the grid) from:", c: ["Nothing; the whole industry is a monopoly", "Generation and retail, which can be competitive", "Consumers", "Government"], d: 1, a: "Doğal tekel olan şebeke düzenlenir; üretim ve perakende rekabete açılır." },
    ],
  });
})();
