// Colander 11e — 5. bölüm: Using Supply and Demand (+ Ek A: cebirsel gösterim) (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m05",
    hedefler: [
      "Gerçek olayları talep ve arz kaymalarıyla analiz etmek; iki eğri birlikte kaydığında hangi sonucun belirsiz kaldığını bilmek",
      "Tavan fiyatın kıtlık, taban fiyatın fazlalık yarattığını grafikle göstermek",
      "Vergi ve sübvansiyonun eğrileri nasıl kaydırdığını, miktar kısıtlarının nasıl rant yarattığını açıklamak",
      "Üçüncü taraf ödeyici piyasalarında neden aşırı tüketim olduğunu göstermek",
      "Arz, talep, denge ve müdahaleleri cebirle hesaplamak",
    ],
    bolumler: [
      { baslik: "Gerçek olayları analiz etmek", md: R`
4. bölümün aletleriyle artık haberleri okuyabiliriz. Yöntem hep aynıdır:

1. Olay hangi eğriyi etkiliyor — talebi mi, arzı mı, ikisini mi?
2. Eğri hangi yöne kayıyor?
3. Yeni denge eskisine göre nerede: fiyat ve miktar ne oldu?

:::ornek Zirai don ve fındık
Nisan ayında beklenmedik bir don, fındık bahçelerinin bir kısmına zarar veriyor. Fındığın fiyatına ve satılan miktara ne olur?
---cozum---
Don bir **arz kaydırıcısıdır** (üretimi doğrudan azaltır); fındık talebini etkilemez. Arz eğrisi **sola** kayar. Yeni dengede **fiyat yükselir, miktar azalır**. Talep eğrisi yerinde durur; alıcılar daha yüksek fiyat yüzünden daha az alır — bu, talep *miktarındaki* düşüştür.
:::

:::ornek Kaya gazı (fracking) ve petrol
Yeni bir çıkarma teknolojisi petrol üretimini ucuzlatıyor. Petrolün fiyatına ve miktarına ne olur?
---cozum---
Teknoloji arzı artırır: arz eğrisi **sağa** kayar. Fiyat **düşer**, miktar **artar**. 2010'larda ABD'deki kaya gazı devrimi tam olarak bunu yaptı ve dünya petrol fiyatlarını aşağı çekti.
:::

### İki eğri birlikte kayarsa
Gerçekte çoğu zaman iki eğri de kayar. O zaman iki sonuçtan biri **belirsiz** kalır:

| Talep | Arz | Fiyat | Miktar |
|---|---|---|---|
| ↑ | ↑ | **belirsiz** | ↑ |
| ↓ | ↓ | **belirsiz** | ↓ |
| ↑ | ↓ | ↑ | **belirsiz** |
| ↓ | ↑ | ↓ | **belirsiz** |

Belirsiz olan, kaymaların göreli büyüklüğüne bağlıdır. Aşağıda büyüklükleri değiştirerek görebilirsin.

{{kayma-analizi}}

:::ipucu
Sınavda "fiyata ne olur?" sorusunun cevabı "belirsiz (cannot be determined without knowing the magnitudes)" olabilir. Bu bir kaçamak değil, doğru cevaptır.
:::
` },
      { baslik: "Tavan fiyat: kira kontrolü", md: R`
Hükümetler bazen fiyatın belli bir düzeyin üstüne çıkmasını yasaklar.

:::tanim Price ceiling
A government-imposed limit on how high a price can be charged.
:::

Tavan fiyat yalnız **denge fiyatının altındaysa bağlayıcıdır (binding)**. O zaman talep miktarı arz miktarını aşar ve **kıtlık** oluşur. Fiyat malı paylaştıramadığı için başka paylaştırma yolları devreye girer:

- **Kuyruklar ve bekleme listeleri**,
- **Karaborsa** ve masa altı ödemeler (anahtar parası, "hava parası"),
- **Torpil ve ayrımcılık** (ev sahibi kiracıyı tanıdıklar arasından seçer),
- **Kalite düşüşü** (ev sahibi bakım yapmaz, çünkü kiracı nasılsa bulunur).

Uzun vadede arz daha da esnekleşir: yeni kiralık konut yapılmaz, bazı evler satılık ya da kısa dönem kiralığa döner. Kıtlık büyür.

{{refah|{"mod":"tavan","baslik":"Tavan fiyat: kıtlık ve ölü ağırlık kaybı"}}}

:::gercek
Türkiye'de Haziran 2022'den Temmuz 2024'e kadar konut kira artışlarına yıllık %25 sınırı uygulandı. Enflasyon bunun çok üstündeyken, mevcut kiracılar için gerçek kira düştü; fakat yeni sözleşmelerde kiralar sıçradı, ev sahibi–kiracı anlaşmazlıkları ve tahliye davaları arttı. Bu, tavan fiyatın tipik sonuçlarının ders kitabı örneğidir.
:::
` },
      { baslik: "Taban fiyat: asgari ücret ve destek alımları", md: R`
:::tanim Price floor
A government-imposed limit on how low a price can be charged.
:::

Taban fiyat yalnız **denge fiyatının üstündeyse bağlayıcıdır**. Bu kez arz miktarı talep miktarını aşar: **fazlalık (surplus)** oluşur.

İki klasik örnek:

- **Asgari ücret (minimum wage):** emek piyasasında bir taban fiyattır. Asgari ücret piyasa ücretinin üstündeyse, çalışmak isteyen kişi sayısı işverenlerin istediğinden fazla olur — işsizlik. Ne kadar işsizlik yaratacağı emek talebinin esnekliğine bağlıdır ve iktisatçılar arasında yoğun tartışma konusudur (17. bölüm).
- **Tarımsal destek fiyatları:** devlet, ürünü belirli bir fiyattan alma garantisi verir. Fazla üretimi devlet satın alıp depolamak zorunda kalır. Türkiye'de Toprak Mahsulleri Ofisi'nin hububat alım fiyatları ve fındıkta TMO alımları bu mekanizmanın örnekleridir.

{{refah|{"mod":"taban","baslik":"Taban fiyat: fazlalık ve ölü ağırlık kaybı"}}}

:::dikkat
Tavan **altta**, taban **üstte** iken bağlayıcıdır — isimlerin çağrıştırdığının tersine. Tavan fiyat dengenin üstüne konursa hiçbir şey değişmez; çünkü piyasa zaten tavanın altında işler.
:::
` },
      { baslik: "Vergiler, sübvansiyonlar ve miktar kısıtları", md: R`
### Birim (spesifik) vergi
**Satıcıdan** birim başına $t$ lira vergi alınırsa, satıcının her miktarı satmak için istediği fiyat $t$ kadar artar: arz eğrisi **$t$ kadar yukarı** kayar. Yeni dengede alıcının ödediği fiyat yükselir, ama genellikle $t$'nin tamamı kadar değil; satıcının eline geçen fiyat düşer. Vergi yükünün nasıl paylaşıldığı 7. bölümün konusu.

**Sübvansiyon** tersini yapar: arz eğrisi aşağı kayar, fiyat düşer, miktar artar.

:::gercek
Türkiye'de akaryakıt, sigara ve alkolden alınan **ÖTV** (özel tüketim vergisi) bu analizin günlük hayattaki karşılığıdır. Bu mallara olan talep görece az esnek olduğu için vergi büyük oranda tüketiciye yansır ve devlete yüksek gelir sağlar.
:::

### Miktar kısıtlaması
Devlet bazen fiyatı değil **miktarı** sınırlar: üretim kotaları, ithalat kotaları, lisans ve ruhsat sayısı.

:::tanim Quantity restriction
A government-imposed limit on how much of a good may be sold.
:::

Kısıt denge miktarının altındaysa arz eğrisi o miktarda dikleşir. Alıcıların ödemeye hazır olduğu fiyat ile üretimin marjinal maliyeti arasında bir fark oluşur. Bu fark **lisans sahiplerine rant** olarak gider ve lisansın kendisi değerli hâle gelir.

{{refah|{"mod":"kota","baslik":"Miktar kısıtı: kota rantı"}}}

:::gercek
İstanbul'da taksi plakası sayısı yıllarca sabit tutuldu. Talep büyüdükçe plakaların piyasa değeri bir dairenin fiyatını aşacak düzeylere çıktı: bu değer, kısıtın yarattığı rantın bugünkü değeridir. ABD'de Uber ve Lyft gibi platformların girişiyle New York'taki taksi madalyonlarının değeri sert düştü — kısıt fiilen gevşeyince rant da eridi.
:::
` },
      { baslik: "Üçüncü taraf ödeyici piyasaları", md: R`
Bazı piyasalarda malı tüketen kişi, bedelin tamamını ödemez; ödemeyi bir **üçüncü taraf** — sigorta şirketi, işveren ya da devlet — yapar.

:::tanim Third-party-payer market
A market in which the person who receives the good differs from the person paying for it.
:::

Hasta muayene için yalnız küçük bir katkı payı ödüyorsa, onun açısından fiyat çok düşüktür ve talep miktarı yüksektir. Üretici ise tam fiyatı (sigortadan) alır. Sonuç:

- Tüketilen miktar, tüketicinin tam fiyatı ödediği duruma göre **daha fazladır**,
- Toplam harcama **daha yüksektir**,
- Üreticilerin fiyatı yükseltmek için güçlü bir nedeni vardır, çünkü hasta fiyata pek duyarlı değildir.

:::ornek Katkı payının etkisi
Muayene talebi $Q_d = 100 - P$, arz $Q_s = P - 20$ (P lira). Piyasa dengesi nedir? Hasta yalnız 10 lira katkı payı öderse kaç muayene yapılır ve hekim kaç lira alır?
---cozum---
Serbest piyasada $100 - P = P - 20 \Rightarrow P = 60$, $Q = 40$.

Hasta 10 lira öderse talep miktarı $100 - 10 = 90$ olur. Hekimlerin 90 muayene sunması için $90 = P - 20 \Rightarrow P = 110$ lira alması gerekir. Toplam harcama $40 \times 60 = 2400$'den $90 \times 110 = 9900$'e çıkar. Katkı payı sistemi tüketimi ve harcamayı katlar.
:::

Sağlık harcamalarının hemen her ülkede hızla artmasının bir nedeni budur. Türkiye'de SGK'nın muayene ve ilaçta uyguladığı **katkı payı**, tüketicinin fiyat duyarlılığını bir ölçüde geri getirmeye çalışan bir araçtır.
` },
      { baslik: "Ek: arz ve talebin cebiri", md: R`
Colander'ın bu bölüme eklediği ek, arz–talebi denklemlerle göstermeyi öğretir. Doğrusal eğriler genellikle şöyle yazılır:

$$Q_d = a - bP \qquad\qquad Q_s = c + dP$$

Dengede $Q_d = Q_s$:

$$P^* = \frac{a - c}{b + d}, \qquad Q^* = a - bP^*$$

### Kaymalar
Bir kaydırıcı **sabit terimi** değiştirir: talep artarsa $a$ büyür, arz artarsa $c$ büyür. Eğimleri değiştirmek eğrinin dikliğini değiştirir.

### Vergi
Satıcıdan birim başına $t$ vergi alınırsa satıcının eline $P - t$ geçer: arz $Q_s = c + d(P - t)$ olur.

:::ornek Vergi sonrası denge
$Q_d = 120 - 2P$, $Q_s = -30 + 3P$. (a) Denge? (b) Satıcıdan birim başına 5 lira vergi alınırsa alıcının ödediği ve satıcıya kalan fiyat ne olur? (c) Tavan fiyat 25 olursa ne olur?
---cozum---
**(a)** $120 - 2P = -30 + 3P \Rightarrow 150 = 5P \Rightarrow P^* = 30$, $Q^* = 60$.

**(b)** Yeni arz: $Q_s = -30 + 3(P - 5) = -45 + 3P$.
$120 - 2P = -45 + 3P \Rightarrow 165 = 5P \Rightarrow P_a = 33$ (alıcının ödediği).
Satıcıya kalan: $P_s = 33 - 5 = 28$. Miktar: $Q = 120 - 66 = 54$.
Vergi geliri: $5 \times 54 = 270$. Alıcı 3, satıcı 2 lira taşıyor: talep görece daha az esnek bölgede.

**(c)** $P = 25$'te $Q_d = 70$, $Q_s = 45$: **25 birim kıtlık**. Satılan miktar 45 (kısa taraf belirler).
:::

:::ipucu
Kıtlık ya da fazlalıkta **gerçekleşen miktar her zaman kısa taraftır**: tavanda arz miktarı, tabanda talep miktarı. Zorla kimseye mal sattıramaz, kimseden mal aldıramazsın.
:::
` },
    ],
    ozet: [
      "Olay analizi: hangi eğri, hangi yön, yeni denge. İki eğri birlikte kayarsa fiyat ya da miktardan biri belirsizdir.",
      "Tavan fiyat dengenin altında bağlayıcıdır ve kıtlık yaratır; fiyat dışı paylaştırma (kuyruk, karaborsa, kalite düşüşü) ortaya çıkar.",
      "Taban fiyat dengenin üstünde bağlayıcıdır ve fazlalık yaratır (asgari ücret, destek alımları).",
      "Satıcıdan alınan vergi arzı vergi kadar yukarı kaydırır; sübvansiyon aşağı kaydırır.",
      "Bağlayıcı miktar kısıtı, alıcının ödediği fiyat ile marjinal maliyet arasında bir rant yaratır; lisanslar değerlenir.",
      "Üçüncü taraf ödeyici piyasalarında tüketici düşük fiyat gördüğü için tüketim ve toplam harcama artar.",
      "Cebir: Qd = a − bP, Qs = c + dP; dengede P* = (a − c)/(b + d). Vergide Qs = c + d(P − t).",
    ],
    terimler: [
      ["price ceiling", "tavan fiyat", "A government-imposed limit on how high a price can be charged."],
      ["price floor", "taban fiyat", "A government-imposed limit on how low a price can be charged."],
      ["rent control", "kira kontrolü", "A price ceiling on rents."],
      ["minimum wage", "asgari ücret", "A minimum amount that a firm can legally pay an employee; a price floor in the labor market."],
      ["binding", "bağlayıcı", "A price control that actually changes the market outcome: a ceiling below or a floor above equilibrium."],
      ["shortage", "kıtlık (talep fazlası)", "Quantity demanded exceeds quantity supplied at the current price."],
      ["surplus", "fazlalık (arz fazlası)", "Quantity supplied exceeds quantity demanded at the current price."],
      ["black market", "karaborsa", "Illegal trade at prices above a legal ceiling."],
      ["excise tax", "özel tüketim vergisi (birim vergi)", "A tax that is levied on a specific good."],
      ["subsidy", "sübvansiyon", "A payment by the government to producers or consumers that lowers the effective cost of a good."],
      ["quantity restriction", "miktar kısıtlaması", "A government-imposed limit on how much of a good may be sold."],
      ["rent (economic)", "rant", "Income received because supply is restricted, above what is needed to bring the good to market."],
      ["third-party-payer market", "üçüncü taraf ödeyici piyasası", "A market in which the person who receives the good differs from the person paying for it."],
      ["copayment", "katkı payı", "The part of the price paid directly by the consumer in a third-party-payer market."],
    ],
    quiz: [
      { s: "A drought reduces the wheat harvest. Holding demand constant, the price of wheat will ___ and the quantity sold will ___.", c: ["rise; rise", "rise; fall", "fall; fall", "fall; rise"], d: 1, a: "Kuraklık arzı azaltır (eğri sola): fiyat yükselir, miktar azalır." },
      { s: "If demand increases and supply increases at the same time, then:", c: ["Price rises and quantity is indeterminate", "Quantity rises and price is indeterminate", "Both price and quantity rise", "Both price and quantity fall"], d: 1, a: "İki kayma da miktarı artırır; fiyat üzerindeki etkileri zıttır, sonuç büyüklüklere bağlı: fiyat belirsiz." },
      { s: "If demand falls and supply rises, then:", c: ["Price falls; quantity indeterminate", "Price rises; quantity indeterminate", "Quantity falls; price indeterminate", "Both rise"], d: 0, a: "İki kayma da fiyatı düşürür; miktar üzerindeki etkiler zıttır: fiyat düşer, miktar belirsiz." },
      { s: "A price ceiling set below the equilibrium price will cause:", c: ["A surplus", "A shortage", "No effect", "An increase in supply"], d: 1, a: "Bağlayıcı tavan fiyatta talep miktarı arz miktarını aşar: kıtlık." },
      { s: "A price ceiling set above the equilibrium price will:", c: ["Cause a shortage", "Cause a surplus", "Have no effect on the market", "Shift the demand curve"], d: 2, a: "Piyasa zaten tavanın altında işliyor; tavan bağlayıcı değil, hiçbir şey değişmez." },
      { s: "Which of the following is a likely effect of rent control in the long run?", c: ["More rental housing is built", "The quality of rental housing improves", "Shortages grow and maintenance declines", "Rents fall for new tenants with no shortage"], d: 2, a: "Uzun dönemde arz daha esnektir: yeni kiralık konut yapılmaz, bakım azalır, kıtlık büyür." },
      { s: "A minimum wage set above the market wage will most likely cause:", c: ["A shortage of workers", "Unemployment (a surplus of labor)", "No change in employment", "Lower wages"], d: 1, a: "Emek piyasasında bağlayıcı taban fiyat: çalışmak isteyen sayısı işverenlerin talebini aşar." },
      { s: "A per-unit tax collected from sellers shifts the:", c: ["Demand curve down by the amount of the tax", "Supply curve up by the amount of the tax", "Supply curve down", "Demand curve up"], d: 1, a: "Satıcı her miktar için vergi kadar daha yüksek fiyat ister: arz eğrisi vergi kadar yukarı (sola) kayar." },
      { s: "Limiting the number of taxi licenses below the equilibrium quantity will:", c: ["Lower taxi fares", "Make the licenses valuable because they create a rent", "Increase the number of taxi rides", "Have no effect"], d: 1, a: "Bağlayıcı miktar kısıtı alıcı fiyatı ile marjinal maliyet arasında rant yaratır; bu rant lisansın değerine yansır." },
      { s: "In a third-party-payer market, compared with a market where consumers pay the full price:", c: ["Quantity consumed is lower", "Quantity consumed and total spending are higher", "Prices are always lower", "Producers receive less"], d: 1, a: "Tüketici düşük fiyat gördüğü için daha çok tüketir; üretici tam fiyatı aldığından toplam harcama artar." },
      { s: "$Q_d = 120 - 2P$ and $Q_s = -30 + 3P$. The equilibrium price is:", c: ["24", "30", "36", "60"], d: 1, a: "$120 - 2P = -30 + 3P \\Rightarrow 150 = 5P \\Rightarrow P = 30$ (Q = 60)." },
      { s: "With $Q_d = 120 - 2P$ and $Q_s = -30 + 3P$, a price ceiling of 25 results in a quantity actually sold of:", c: ["70", "60", "45", "25"], d: 2, a: "P = 25'te Qd = 70, Qs = 45. Kıtlıkta gerçekleşen miktar kısa taraftır: 45." },
    ],
  });
})();
