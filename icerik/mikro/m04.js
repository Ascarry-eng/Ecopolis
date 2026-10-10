// Colander 11e — 4. bölüm: Supply and Demand (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m04",
    hedefler: [
      "Talep yasasını ve arz yasasını söylemek, nedenlerini açıklamak",
      "Talep miktarındaki değişimi (eğri üzerinde hareket) talepteki değişimden (eğrinin kayması) ayırmak",
      "Talebin ve arzın kaydırıcılarını saymak ve her birinin eğriyi hangi yöne kaydırdığını bilmek",
      "Bireysel eğrilerden piyasa eğrisini yatay toplamayla elde etmek",
      "Dengeyi, arz fazlasını ve talep fazlasını grafikle ve cebirle bulmak",
      "Arz–talep analizinin sınırlarını (diğer şeyler sabit varsayımı, bileşim yanılgısı) bilmek",
    ],
    bolumler: [
      { baslik: "Talep ve talep yasası", md: R`
Arz–talep, iktisatçının alet çantasındaki en çok kullanılan modeldir. Önce talep tarafı.

:::tanim Law of demand
Quantity demanded rises as price falls, other things constant.
:::

Ya da tersinden: fiyat yükselince, diğer her şey sabitken, **talep miktarı (quantity demanded)** düşer. Neden? Çünkü bir mal pahalandığında insanlar onun yerine geçebilecek başka şeylere — **ikamelere (substitutes)** — yönelir. Kahve pahalanınca biraz daha çay içilir; benzin pahalanınca daha çok toplu taşıma kullanılır. İkame ne kadar kolaysa tepki o kadar büyüktür.

"Diğer şeyler sabitken" (*other things constant*, Latincesiyle *ceteris paribus*) kaydı çok önemlidir: talep yasası yalnızca **malın kendi fiyatı** değiştiğinde ne olacağını söyler.

### Talep tablosu ve talep eğrisi
Bir **talep tablosu (demand table)** farklı fiyatlarda ne kadar alınacağını listeler; **talep eğrisi (demand curve)** bu tablonun grafiğidir. İktisat geleneğinde **fiyat dikey eksende, miktar yatay eksendedir** ve talep eğrisi aşağı eğimlidir.

| Fiyat (TL/kg) | Talep miktarı (kg/ay) |
|---|---|
| 50 | 2 |
| 40 | 4 |
| 30 | 6 |
| 20 | 9 |
| 10 | 13 |

:::tanim Demand
A schedule of quantities of a good that will be bought per unit of time at various prices, other things constant.
:::

### Talep mi, talep miktarı mı?
Sınavların en sevdiği ayrım budur:

- **Talep miktarı (quantity demanded):** belirli bir fiyatta alınmak istenen *belirli bir miktar* — eğri üzerindeki *bir nokta*.
- **Talep (demand):** bütün fiyat–miktar çiftlerinin listesi — *eğrinin tamamı*.

Malın kendi fiyatı değişirse **eğri üzerinde hareket** edilir: talep *miktarı* değişir. Başka bir şey (gelir, zevkler…) değişirse **eğrinin tamamı kayar**: *talep* değişir.

{{talep-kayma}}

:::dikkat
"Fiyat düştü, bu yüzden talep arttı" cümlesi **yanlıştır**. Doğrusu: "fiyat düştü, talep *miktarı* arttı." Talebin kendisi (eğri) malın kendi fiyatıyla değişmez.
:::
` },
      { baslik: "Talebin kaydırıcıları", md: R`
Malın kendi fiyatı dışında talebi etkileyen her şey bir **kaydırıcıdır (shift factor)**. Colander'ın listesi:

1. **Toplumun geliri (income).** Gelir artınca çoğu malın talebi artar: bunlar **normal mallardır (normal goods)**. Bazı malların talebi ise gelir artınca *azalır* — insanlar daha iyisine geçer: bunlar **düşük mallardır (inferior goods)**. (Örnek: gelir artınca otobüs yerine taksi, ucuz makarna yerine restoran.)
2. **Diğer malların fiyatları (prices of other goods).**
   - **İkame (substitute):** biri pahalanınca öbürünün talebi artar. Çay–kahve, Pegasus–THY bileti.
   - **Tamamlayıcı (complement):** birlikte tüketilir; biri pahalanınca öbürünün talebi azalır. Benzin–otomobil, yazıcı–mürekkep.
3. **Zevkler (tastes).** Moda, reklam, sağlık haberleri.
4. **Beklentiler (expectations).** Fiyatın ya da gelirin gelecekte artacağı beklentisi bugünkü talebi artırır.
5. **Tüketiciye vergiler ve sübvansiyonlar (taxes on and subsidies to consumers).** Alıcıdan alınan vergi talebi azaltır, alıcıya sübvansiyon artırır.

Bunlara sıklıkla **alıcı sayısı / nüfus** da eklenir.

:::ipucu
Bir olayı analiz ederken önce sor: "Değişen şey malın kendi fiyatı mı?" Evet ise eğri üzerinde hareket; hayır ise kaydırıcıdır, hangi eğriyi (talep mi arz mı) ve hangi yöne kaydırdığını bul.
:::

:::gercek
Türk lirasının değer kaybettiği dönemlerde dolar ya da altın alımlarındaki sıçrama klasik bir **beklenti** etkisidir: fiyatın yükseleceğini bekleyen haneler bugünden alır, bu da bugünkü talebi artırıp fiyatı gerçekten yükseltir.
:::

### Bireysel talepten piyasa talebine
**Piyasa talep eğrisi (market demand curve)**, bireysel talep eğrilerinin **yatay toplamıdır**: her fiyatta, herkesin talep miktarları toplanır.

:::ornek Yatay toplama
Fiyat 10 TL iken Ayşe 4, Mehmet 2, Zeynep 0 birim alıyor; fiyat 5 TL iken sırasıyla 6, 4 ve 2 birim. Piyasa talebi bu iki fiyatta nedir?
---cozum---
Her fiyatta miktarları topla (fiyatları değil!):
- P = 10: 4 + 2 + 0 = **6 birim**
- P = 5: 6 + 4 + 2 = **12 birim**

Grafikte bu, eğrileri *yatay* yönde (miktar ekseni boyunca) toplamaktır. Piyasa talebi bireysel taleplerden daha yatıktır.
:::
` },
      { baslik: "Arz ve arz yasası", md: R`
:::tanim Law of supply
Quantity supplied rises as price rises, other things constant.
:::

Fiyat yükseldiğinde, diğer her şey sabitken, **arz miktarı (quantity supplied)** artar. Nedeni de yine ikame: üreticinin kaynakları başka işlere de kayabilir. Bir malın fiyatı yükselince o malı üretmek görece kârlı hâle gelir; firmalar kaynakları ona kaydırır, yeni firmalar girer. Arz eğrisi bu yüzden **yukarı eğimlidir**.

Talepte olduğu gibi aynı ayrım geçerli:

- **Arz miktarı (quantity supplied):** belirli bir fiyatta satılmak istenen miktar — eğri üzerinde nokta.
- **Arz (supply):** bütün fiyat–miktar çiftleri — eğrinin tamamı.

### Arzın kaydırıcıları
1. **Girdi fiyatları (price of inputs).** Hammadde, ücret, enerji pahalanırsa arz azalır (eğri sola/yukarı kayar).
2. **Teknoloji (technology).** Maliyeti düşüren teknoloji arzı artırır (eğri sağa/aşağı).
3. **Beklentiler (expectations).** Fiyatın artacağını bekleyen üretici bugün daha az satar, stok tutar.
4. **Üreticiye vergiler ve sübvansiyonlar (taxes on and subsidies to suppliers).** Vergi maliyet gibidir, arzı azaltır; sübvansiyon arzı artırır.

{{arz-kayma}}

Piyasa arzı da bireysel arz eğrilerinin **yatay toplamıdır**.

:::dikkat
Arz eğrisinin "sola kayması" ile "yukarı kayması" aynı şeydir: her miktarı üretmek için artık daha yüksek fiyat gerekir. Talepte ise "sola" ile "aşağı" aynıdır. Sağ/sol diye düşünmek karışıklığı önler: **sağ = artış, sol = azalış**.
:::
` },
      { baslik: "Arz ile talebin buluşması: denge", md: R`
Arz ve talep eğrilerini aynı grafiğe koyunca dengeyi buluruz.

:::tanim Equilibrium
A concept in which the dynamic forces cancel each other out; in a market, the price at which quantity supplied equals quantity demanded.
:::

Dengenin altındaki bir fiyatta alıcıların istediği satıcıların sunduğundan fazladır: **talep fazlası (excess demand)**, yani kıtlık. Alıcılar daha fazla ödemeye razı olur, satıcılar fiyatı yükseltir. Dengenin üstündeki bir fiyatta **arz fazlası (excess supply)** oluşur ve satıcılar fiyatı kırar. Her iki durumda da fiyat dengeye doğru itilir — görünmez el budur.

{{denge}}

### Cebirle denge
Doğrusal eğrilerle denge iki denklemi eşitlemekten ibarettir.

:::ornek Denge fiyatı ve miktarı
Talep $Q_d = 100 - 2P$, arz $Q_s = 20 + 2P$. Denge fiyatı ve miktarı nedir? Fiyat 15 olursa ne olur?
---cozum---
Dengede $Q_d = Q_s$:

$$100 - 2P = 20 + 2P \;\Rightarrow\; 80 = 4P \;\Rightarrow\; P^* = 20$$

$$Q^* = 100 - 2(20) = 60$$

Fiyat 15 olursa: $Q_d = 100 - 30 = 70$, $Q_s = 20 + 30 = 50$. **Talep fazlası = 20 birim**; fiyat yükselme baskısı altındadır.
:::

:::ipucu
Grafikte fiyat dikey eksende olduğu için bazen eğrileri "ters" biçimde, $P = f(Q)$ olarak yazmak gerekir. Örnekteki talep $P = 50 - 0{,}5Q$, arz $P = -10 + 0{,}5Q$ olur. Hangisini kullanırsan kullan denge aynıdır.
:::
` },
      { baslik: "Arz–talep analizinin sınırları", md: R`
Arz–talep güçlü bir modeldir, ama Colander iki sınırı özellikle vurgular.

**1. "Diğer şeyler sabit" varsayımı.** Eğriler, kaydırıcıların sabit tutulduğu varsayımıyla çizilir. Küçük bir piyasada (tek bir malın piyasası) bu makul bir varsayımdır. Ama analiz edilen değişiklik ekonominin büyük bir bölümünü etkiliyorsa, "diğer şeyler" de değişir ve eğriler birbirinden bağımsız olmaz.

**2. Bileşim yanılgısı (fallacy of composition).** Bir birey için doğru olanın bütün için de doğru olduğunu sanmak.

:::tanim Fallacy of composition
The false assumption that what is true for a part will also be true for the whole.
:::

Örnek: Maçta tek bir kişi ayağa kalkarsa daha iyi görür; herkes kalkarsa kimse daha iyi görmez. Benzer biçimde tek bir firmanın ücretleri düşürmesi o firmanın satışlarını etkilemez, ama *bütün* firmalar ücretleri düşürürse hanelerin geliri — ve talep — düşer. Mikro düzeyde işleyen arz–talep mantığını makro düzeye taşırken bu yüzden dikkatli olmak gerekir.

:::gercek
İktisatçılar bu sınırlar yüzünden ekonomi geneli sorularda **genel denge (general equilibrium)** analizine başvurur: bütün piyasaların aynı anda birbirini etkilediği bir çerçeve. Tek piyasaya bakan analiz ise **kısmi denge (partial equilibrium)** analizidir.
:::
` },
    ],
    ozet: [
      "Talep yasası: diğer şeyler sabitken fiyat düşünce talep miktarı artar (ikame etkisi).",
      "Malın kendi fiyatı değişirse eğri üzerinde hareket (talep/arz miktarı değişir); başka bir şey değişirse eğri kayar (talep/arz değişir).",
      "Talebin kaydırıcıları: gelir (normal/düşük mal), diğer malların fiyatları (ikame/tamamlayıcı), zevkler, beklentiler, tüketiciye vergi/sübvansiyon.",
      "Arzın kaydırıcıları: girdi fiyatları, teknoloji, beklentiler, üreticiye vergi/sübvansiyon.",
      "Piyasa eğrileri bireysel eğrilerin yatay toplamıdır.",
      "Dengede talep miktarı arz miktarına eşittir; dengenin dışında fiyat, talep fazlasında yükselir, arz fazlasında düşer.",
      "Sınırlar: diğer şeyler sabit varsayımı büyük değişikliklerde çöker; bileşim yanılgısına düşme.",
    ],
    terimler: [
      ["law of demand", "talep yasası", "Quantity demanded rises as price falls, other things constant."],
      ["quantity demanded", "talep miktarı", "A specific amount that will be demanded per unit of time at a specific price, other things constant."],
      ["demand", "talep", "A schedule of quantities of a good that will be bought per unit of time at various prices, other things constant."],
      ["demand curve", "talep eğrisi", "The graphic representation of the relationship between price and quantity demanded."],
      ["substitute", "ikame mal", "A good whose demand rises when the price of another good rises."],
      ["complement", "tamamlayıcı mal", "A good whose demand falls when the price of another good (used together with it) rises."],
      ["normal good", "normal mal", "A good whose demand increases when income increases."],
      ["inferior good", "düşük mal", "A good whose demand decreases when income increases."],
      ["shift factors of demand", "talebin kaydırıcıları", "Factors other than the good's own price that affect how much of a good is demanded: income, prices of other goods, tastes, expectations, taxes and subsidies to consumers."],
      ["change in quantity demanded", "talep miktarındaki değişim", "A movement along a given demand curve caused by a change in the good's own price."],
      ["change in demand", "talepteki değişim", "A shift of the entire demand curve caused by a change in a shift factor."],
      ["market demand curve", "piyasa talep eğrisi", "The horizontal sum of all individual demand curves."],
      ["law of supply", "arz yasası", "Quantity supplied rises as price rises, other things constant."],
      ["quantity supplied", "arz miktarı", "A specific amount offered for sale at a specific price, other things constant."],
      ["supply", "arz", "A schedule of quantities a seller is willing to sell per unit of time at various prices, other things constant."],
      ["shift factors of supply", "arzın kaydırıcıları", "Price of inputs, technology, expectations, and taxes and subsidies to suppliers."],
      ["equilibrium", "denge", "The price at which quantity supplied equals quantity demanded; the dynamic forces cancel each other out."],
      ["excess supply", "arz fazlası", "Quantity supplied is greater than quantity demanded; price tends to fall."],
      ["excess demand", "talep fazlası", "Quantity demanded is greater than quantity supplied; price tends to rise."],
      ["fallacy of composition", "bileşim yanılgısı", "The false assumption that what is true for a part will also be true for the whole."],
      ["partial equilibrium", "kısmi denge", "Analysis of a single market holding other markets constant."],
      ["general equilibrium", "genel denge", "Analysis that takes into account the interaction among all markets."],
    ],
    quiz: [
      { s: "If the price of coffee falls and, as a result, people buy more coffee, this is best described as:", c: ["An increase in demand", "An increase in quantity demanded", "A shift of the demand curve to the right", "An increase in supply"], d: 1, a: "Değişen malın kendi fiyatı: eğri üzerinde hareket, yani talep MİKTARI artar. Talep (eğri) yerinde durur." },
      { s: "Which of the following would shift the demand curve for cars to the left?", c: ["A fall in the price of cars", "An increase in the price of gasoline", "An increase in income (cars are normal goods)", "An expected future increase in car prices"], d: 1, a: "Benzin otomobilin tamamlayıcısıdır; benzin pahalanınca otomobil talebi azalır (eğri sola). Otomobilin kendi fiyatındaki düşüş eğri üzerinde harekettir." },
      { s: "If income rises and the demand for a good falls, the good is:", c: ["A normal good", "An inferior good", "A complement", "A substitute"], d: 1, a: "Gelir artınca talebi azalan mal düşük maldır (inferior good)." },
      { s: "Tea and coffee are substitutes. If the price of tea rises, the demand for coffee will:", c: ["Increase", "Decrease", "Stay the same", "Become perfectly inelastic"], d: 0, a: "İkamelerden biri pahalanınca insanlar öbürüne kayar: kahve talebi artar (eğri sağa)." },
      { s: "Which of the following is a shift factor of supply?", c: ["The price of the good itself", "Consumer income", "Technology", "Consumer tastes"], d: 2, a: "Teknoloji, girdi fiyatları, beklentiler ve üreticiye vergi/sübvansiyon arz kaydırıcılarıdır. Gelir ve zevkler talep kaydırıcısıdır; malın kendi fiyatı eğri üzerinde hareket yaratır." },
      { s: "Demand is $Q_d = 100 - 2P$ and supply is $Q_s = 20 + 2P$. The equilibrium price and quantity are:", c: ["P = 20, Q = 60", "P = 30, Q = 40", "P = 40, Q = 20", "P = 20, Q = 40"], d: 0, a: "$100 - 2P = 20 + 2P \\Rightarrow P = 20$; $Q = 100 - 40 = 60$." },
      { s: "Using the same equations, if the price is set at 15, there will be:", c: ["An excess supply of 20", "An excess demand of 20", "An excess demand of 10", "Equilibrium"], d: 1, a: "$Q_d = 70$, $Q_s = 50$: talep fazlası 20. Fiyat yükselme baskısı altındadır." },
      { s: "At a price above equilibrium, there is:", c: ["Excess demand, and price tends to rise", "Excess supply, and price tends to fall", "Excess supply, and price tends to rise", "Excess demand, and price tends to fall"], d: 1, a: "Denge üstünde satıcıların sunduğu alıcıların istediğinden fazladır (arz fazlası); satıcılar fiyatı kırar." },
      { s: "A market demand curve is derived by:", c: ["Adding individual demand curves vertically", "Adding individual demand curves horizontally", "Averaging individual prices", "Multiplying individual quantities"], d: 1, a: "Her fiyatta bireysel talep miktarları toplanır: yatay toplama." },
      { s: "\"If one firm lowers wages, its profits rise; therefore if all firms lower wages, all profits will rise.\" This reasoning is an example of:", c: ["The law of demand", "The fallacy of composition", "Positive economics", "The invisible hand"], d: 1, a: "Parça için doğru olanı bütün için de doğru saymak bileşim yanılgısıdır: bütün firmalar ücret düşürürse hanelerin geliri ve talep de düşer." },
      { s: "A new technology lowers the cost of producing smartphones. Holding demand constant, the equilibrium price will ___ and quantity will ___.", c: ["rise; fall", "fall; rise", "rise; rise", "fall; fall"], d: 1, a: "Teknoloji arzı artırır (eğri sağa): fiyat düşer, miktar artar." },
      { s: "Which of the following would cause a movement along the supply curve for wheat rather than a shift of it?", c: ["A drought", "A fall in the price of fertilizer", "A rise in the price of wheat", "A subsidy to wheat farmers"], d: 2, a: "Buğdayın kendi fiyatı değişirse arz eğrisi üzerinde hareket edilir. Kuraklık, gübre fiyatı ve sübvansiyon eğriyi kaydırır." },
    ],
  });
})();
