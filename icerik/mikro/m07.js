// Colander 11e — 7. bölüm: Taxation and Government Intervention (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m07",
    hedefler: [
      "Tüketici artığını ve üretici artığını tanımlamak, grafikte alan olarak hesaplamak",
      "Verginin ölü ağırlık kaybını (refah kaybı üçgeni) göstermek ve büyüklüğünü esnekliklerle ilişkilendirmek",
      "Vergi yükünün göreli esnekliklere göre paylaşıldığını, yasal yükün önemli olmadığını açıklamak",
      "Tavan fiyat, taban fiyat ve miktar kısıtlarının refah etkilerini karşılaştırmak",
      "Rant arama ve müdahalenin politik iktisadını tartışmak",
    ],
    bolumler: [
      { baslik: "Tüketici artığı ve üretici artığı", md: R`
Piyasaların neden "iyi" olduğunu ölçmek için iki kavram kullanırız.

:::tanim Consumer surplus
The value the consumer gets from buying a product less its price.
:::

:::tanim Producer surplus
The price the producer sells a product for less the cost of producing it.
:::

Talep eğrisinin yüksekliği, o birim için birinin **ödemeye razı olduğu en yüksek fiyatı** gösterir. Fiyattan fazlası alıcının kazancıdır. Bütün birimler için toplanınca **tüketici artığı (TA)** talep eğrisinin altında, fiyatın üstündeki alan olur.

Arz eğrisinin yüksekliği ise o birimi üretmenin **marjinal maliyetini** gösterir. Fiyatın maliyeti aşan kısmı üreticinin kazancıdır. **Üretici artığı (ÜA)** fiyatın altında, arz eğrisinin üstündeki alandır.

:::ornek Artıkları hesapla
Talep $P = 90 - 0{,}8Q$, arz $P = 10 + 0{,}8Q$. Dengede tüketici ve üretici artığı ne kadardır?
---cozum---
Denge: $90 - 0{,}8Q = 10 + 0{,}8Q \Rightarrow Q^* = 50$, $P^* = 50$.

Tüketici artığı, tabanı 50 (miktar), yüksekliği $90 - 50 = 40$ olan üçgen:
$$TA = \tfrac12 \times 50 \times 40 = 1000$$

Üretici artığı, tabanı 50, yüksekliği $50 - 10 = 40$ olan üçgen:
$$ÜA = \tfrac12 \times 50 \times 40 = 1000$$

Toplam artık 2000. Matematik dersinde bunu integralle de hesaplayacaksın: $TA = \int_0^{50} (90 - 0{,}8Q)\,dQ - 50 \times 50$.
:::

Serbest piyasa dengesinin özelliği: **toplam artığı (TA + ÜA) en büyük yapan miktardır.** Dengenin solunda kalan her birimde alıcının değeri maliyetten yüksektir; bu birimleri üretmemek kazancı yok eder. Dengenin sağındaki birimlerde ise maliyet değerden yüksektir.

{{refah|{"mod":"serbest","baslik":"Artıklar ve müdahaleler: modu değiştir"}}}
` },
      { baslik: "Vergilendirmenin yükü: ölü ağırlık kaybı", md: R`
Birim başına $t$ lira vergi konunca alıcının ödediği fiyat ile satıcının eline geçen fiyat arasına $t$ büyüklüğünde bir **takoz (wedge)** girer. Miktar düşer. Kayıplar:

- Tüketici artığı küçülür (alıcı daha yüksek fiyat öder, daha az alır),
- Üretici artığı küçülür (satıcıya daha düşük fiyat kalır, daha az satar),
- Bu kaybın bir kısmı **vergi geliri** olarak devlete geçer (vergi × yeni miktar dikdörtgeni),
- Kalan kısım **kimseye geçmez**: artık gerçekleşmeyen alışverişlerin kaybıdır.

:::tanim Deadweight loss (welfare loss triangle)
The loss of consumer and producer surplus from a tax (or other intervention) that is not gained by anyone; also called the Harberger triangle.
:::

Yukarıdaki görselde modu "Birim vergi" yapıp vergiyi büyütmeyi dene. Dikkat edilecek iki şey:

1. **Esneklik arttıkça ölü ağırlık kaybı büyür.** Esnek eğrilerde vergi miktarı çok düşürür; kaybedilen alışveriş fazladır.
2. **Kayıp, verginin karesiyle büyür.** Vergiyi iki katına çıkarmak üçgenin hem tabanını hem yüksekliğini yaklaşık iki katına çıkarır: kayıp dört katına çıkar.

:::ipucu
Buradan bir politika ilkesi çıkar: ölü ağırlık kaybını küçük tutmak istiyorsan **esnek olmayan** mallardan vergi al. Ama esnek olmayan mallar çoğunlukla zorunlu mallardır (gıda, ilaç, enerji) ve bunlardan vergi almak yoksulları orantısız etkiler. Etkinlik ile hakkaniyet burada çatışır.
:::
` },
      { baslik: "Vergi yükünü kim taşır?", md: R`
Bir vergiyi kanunen kimin ödediğine **yasal yük (statutory incidence)**, fiyat değişimleri sonrasında gerçekten kimin taşıdığına **iktisadi yük (tax incidence)** denir. İkisi çoğu zaman farklıdır.

:::tanim Tax incidence
The division of the burden of a tax between buyers and sellers; it depends on the relative elasticities of supply and demand.
:::

Temel sonuç: **Yükün büyüğünü, daha az esnek olan taraf taşır.**

- Talep esnek değilse (alıcıların kaçacak yeri yoksa) fiyat neredeyse vergi kadar yükselir: alıcılar taşır.
- Arz esnek değilse (satıcıların başka işe geçme şansı yoksa) satıcının eline geçen fiyat düşer: satıcılar taşır.

İkinci önemli sonuç: **vergiyi kanunen alıcıdan ya da satıcıdan almak iktisadi yükü değiştirmez.** Aşağıda vergiyi bir satıcıdan bir alıcıdan almayı dene: fiyatlar ve paylar aynı kalır.

{{vergi-yuku}}

:::ornek Yük paylaşımı
Talep $P = 100 - 2Q$, arz $P = 20 + 2Q$. Satıcıdan birim başına 8 lira vergi alınıyor. Alıcı ve satıcı verginin ne kadarını taşır?
---cozum---
Vergisiz denge: $100 - 2Q = 20 + 2Q \Rightarrow Q = 20$, $P = 60$.

Vergili: $100 - 2Q = 28 + 2Q \Rightarrow Q = 18$; alıcının ödediği $P_a = 100 - 36 = 64$, satıcıya kalan $P_s = 64 - 8 = 56$.

Alıcı $64 - 60 = 4$, satıcı $60 - 56 = 4$ lira taşır: eğimler eşit olduğu için yük yarı yarıya. Talebi dikleştir (esnekliğini düşür), alıcının payı artar.
:::

:::gercek
**Lüks vergisi dersi:** ABD 1990'da pahalı teknelere lüks vergisi koydu; amaç zenginlerden vergi almaktı. Ama zenginlerin talebi esnekti (tekne yerine başka lüks alabilirlerdi); tekne satışları çöktü ve yükün önemli bir kısmı tersane işçilerine kaldı. Vergi birkaç yıl içinde kaldırıldı. Colander'ın vurguladığı bir başka tartışma da **kurumlar vergisinin** gerçek yükünün hissedarlara mı, çalışanlara mı, tüketicilere mi düştüğüdür — cevap yine esnekliklere bağlıdır.
:::
` },
      { baslik: "Devlet müdahalesinin refah etkileri", md: R`
Fiyat kontrolleri ve miktar kısıtları da artıkları değiştirir ve ölü ağırlık kaybı yaratır.

**Tavan fiyat** (bağlayıcı): miktar arz miktarına düşer. Tüketicilerin bir kısmı daha düşük fiyattan yararlanır (artık üreticiden tüketiciye **transfer** olur), ama gerçekleşmeyen alışverişler ölü ağırlık kaybıdır. Ayrıca mal en çok değer verene değil, kuyrukta öne geçene ya da torpili olana gider; bu da ek bir kayıptır.

**Taban fiyat** (bağlayıcı): miktar talep miktarına düşer. Satabilen üreticiler daha yüksek fiyattan kazanır, ama satılamayan fazlalık ve gerçekleşmeyen alışverişler kayıptır. Devlet fazlayı satın alıyorsa (destek alımı) bunun maliyeti vergi mükelleflerine düşer.

**Miktar kısıtı**: ölü ağırlık kaybının yanında, lisans sahiplerine bir **rant** transferi yaratır.

Hepsinde ortak sonuç: **müdahale bir gruptan diğerine transfer yapar ve bu sırada pastayı küçültür.** Bu, müdahalenin her zaman kötü olduğu anlamına gelmez — toplum bölüşümü etkinlikten önemli bulabilir — ama bedeli olduğunu gösterir.

### Rant arama
Müdahaleler kazanan yarattığı için, insanlar o kazancı elde etmek için kaynak harcar: lobi yapar, bağış verir, yasa değişikliği için uğraşır.

:::tanim Rent seeking
Spending resources to obtain or keep an economic rent (such as a government-created advantage) rather than to produce something.
:::

Rant arama da bir maliyettir: o kaynaklar başka bir şey üretebilirdi. Bu yüzden bazı iktisatçılar müdahalelerin gerçek maliyetinin ölü ağırlık üçgeninden büyük olduğunu savunur.

:::gercek
New York'ta 1940'lardan beri süren kira kontrolü, hâlâ kontrollü dairede oturanlar için büyük bir kazançtır; ama yeni gelenler çok yüksek piyasa kiralarıyla karşılaşır, kontrollü dairelerin bakımı ihmal edilir. Kazananlar (mevcut kiracılar) kontrolü korumak için güçlü bir siyasi lobi oluşturur — rant aramanın tipik örneği.
:::
` },
    ],
    ozet: [
      "Tüketici artığı: talep eğrisinin altı, fiyatın üstü. Üretici artığı: fiyatın altı, arz eğrisinin üstü. Serbest denge toplam artığı en büyük yapar.",
      "Vergi, alıcı ve satıcı fiyatları arasına takoz sokar; kaybın bir kısmı vergi geliri olur, kalanı ölü ağırlık kaybıdır (Harberger üçgeni).",
      "Ölü ağırlık kaybı esneklik arttıkça büyür ve verginin karesiyle artar.",
      "Vergi yükünü daha az esnek taraf taşır; yasal yük (kimin ödediği) iktisadi yükü değiştirmez.",
      "Tavan, taban ve kotalar transfer yaratır ve pastayı küçültür (ölü ağırlık kaybı).",
      "Rant arama, müdahalenin yarattığı kazançları elde etmek için harcanan kaynaklardır ve ek bir toplumsal maliyettir.",
    ],
    terimler: [
      ["consumer surplus", "tüketici artığı", "The value the consumer gets from buying a product less its price; the area below demand and above price."],
      ["producer surplus", "üretici artığı", "The price the producer sells a product for less the cost of producing it; the area above supply and below price."],
      ["total surplus", "toplam artık", "Consumer surplus plus producer surplus."],
      ["deadweight loss", "ölü ağırlık kaybı", "The loss of consumer and producer surplus from an intervention that is not gained by anyone."],
      ["welfare loss triangle (Harberger triangle)", "refah kaybı üçgeni", "The triangle representing the deadweight loss of a tax or other intervention."],
      ["tax wedge", "vergi takozu", "The difference between the price paid by buyers and the price received by sellers due to a tax."],
      ["tax incidence", "vergi yükünün dağılımı (iktisadi yük)", "The division of the burden of a tax between buyers and sellers; determined by relative elasticities."],
      ["statutory incidence", "yasal yük", "Who is legally required to pay the tax to the government."],
      ["rent seeking", "rant arama", "Spending resources to obtain or keep an economic rent rather than producing something."],
      ["transfer", "transfer", "A redistribution of surplus from one group to another without changing the total."],
      ["luxury tax", "lüks vergisi", "A tax on goods considered luxuries; its burden can fall on workers if demand is elastic."],
    ],
    quiz: [
      { s: "Consumer surplus is the area:", c: ["Above the supply curve and below the price", "Below the demand curve and above the price", "Below the supply curve", "Between the demand and supply curves to the right of equilibrium"], d: 1, a: "Talep eğrisinin yüksekliği ödemeye razı olunan fiyattır; fiyatı aşan kısım tüketici artığıdır." },
      { s: "Demand is $P = 90 - 0.8Q$ and supply is $P = 10 + 0.8Q$. Consumer surplus at equilibrium is:", c: ["500", "1000", "2000", "2500"], d: 1, a: "Denge Q = 50, P = 50. TA = ½ × 50 × (90 − 50) = 1000." },
      { s: "The deadweight loss of a tax is:", c: ["The revenue the government collects", "The loss of surplus that is not gained by anyone", "The increase in producer surplus", "Always zero if the tax is small"], d: 1, a: "Vergi gelirine dönüşmeyen, gerçekleşmeyen alışverişlerden doğan kayıp ölü ağırlık kaybıdır." },
      { s: "Other things equal, the deadweight loss of a tax is larger when:", c: ["Demand and supply are more inelastic", "Demand and supply are more elastic", "The tax is smaller", "The tax is collected from buyers rather than sellers"], d: 1, a: "Esnek eğrilerde vergi miktarı daha çok düşürür; kaybedilen alışveriş ve üçgen büyür." },
      { s: "If a tax is doubled, the deadweight loss will approximately:", c: ["Stay the same", "Double", "Quadruple", "Halve"], d: 2, a: "Üçgenin hem tabanı hem yüksekliği yaklaşık iki katına çıkar: alan (kayıp) dört katına." },
      { s: "If demand is perfectly inelastic, the burden of a tax falls:", c: ["Entirely on sellers", "Entirely on buyers", "Equally on both", "On the government"], d: 1, a: "Alıcılar miktarı hiç azaltmıyorsa fiyat vergi kadar yükselir: yükün tamamı alıcıda." },
      { s: "A tax is legally collected from sellers. Compared with collecting the same tax from buyers, the economic burden on buyers is:", c: ["Higher", "Lower", "The same", "Zero"], d: 2, a: "İktisadi yükü esneklikler belirler; vergiyi kimin devlete ödediği sonucu değiştirmez." },
      { s: "Demand is $P = 100 - 2Q$, supply is $P = 20 + 2Q$, and a tax of 8 per unit is placed on sellers. The price buyers pay is:", c: ["60", "62", "64", "68"], d: 2, a: "100 − 2Q = 28 + 2Q → Q = 18; P = 100 − 36 = 64. Alıcı 4, satıcı 4 lira taşır." },
      { s: "The 1990 U.S. luxury tax on yachts ended up hurting boat-building workers because:", c: ["Demand for yachts was highly elastic", "Demand for yachts was perfectly inelastic", "Supply was perfectly elastic", "The tax was collected from buyers"], d: 0, a: "Zenginlerin talebi esnekti; satışlar çöktü ve yükün önemli bir kısmı daha az esnek olan tarafa — tersane işçilerine — kaldı." },
      { s: "A binding price ceiling generally:", c: ["Increases total surplus", "Transfers surplus from producers to some consumers and creates a deadweight loss", "Creates a surplus of goods", "Has no welfare effect"], d: 1, a: "Düşük fiyattan alabilenler kazanır (üreticiden transfer), ama miktar düşer: ölü ağırlık kaybı." },
      { s: "Rent seeking refers to:", c: ["Searching for an apartment", "Spending resources to obtain or keep a government-created advantage", "Producing more output", "Lowering prices to gain market share"], d: 1, a: "Müdahalenin yarattığı kazancı elde etmek için lobi vb. kaynak harcamak; üretken olmadığı için ek toplumsal maliyettir." },
      { s: "To minimize the deadweight loss from taxation, a government should tax goods with:", c: ["Elastic demand", "Inelastic demand", "Many substitutes", "Perfectly elastic supply"], d: 1, a: "Esnek olmayan mallarda vergi miktarı az değiştirir, kayıp küçüktür — ama bunlar çoğunlukla zorunlu mallardır, hakkaniyet sorunu doğar." },
    ],
  });
})();
