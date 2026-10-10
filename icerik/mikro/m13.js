// Colander 11e — 13. bölüm: Perfect Competition (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m13",
    hedefler: [
      "Dört piyasa yapısını ve tam rekabetin altı koşulunu saymak",
      "Tam rekabetçi firmanın neden fiyat alıcı olduğunu ve talep eğrisinin neden yatay olduğunu açıklamak",
      "Kâr en büyükleme kuralını (MR = MC) uygulamak; kârı ve zararı grafikte göstermek",
      "Kapanma noktasını bulmak; firmanın kısa dönem arz eğrisinin MC'nin AVC üstündeki kısmı olduğunu göstermek",
      "Giriş ve çıkışla uzun dönem dengesinde iktisadi kârın sıfırlandığını açıklamak",
    ],
    bolumler: [
      { baslik: "Piyasa yapıları ve tam rekabetin koşulları", md: R`
Bir firmanın nasıl davrandığı, içinde bulunduğu piyasanın **yapısına** bağlıdır. İktisatçılar dört yapıyı ayırır:

| Yapı | Firma sayısı | Ürün | Giriş | Fiyat üzerinde güç |
|---|---|---|---|---|
| **Tam rekabet** | Çok | Aynı (homojen) | Serbest | Yok (fiyat alıcı) |
| **Tekelci rekabet** | Çok | Farklılaştırılmış | Serbest | Biraz |
| **Oligopol** | Az | Aynı ya da farklı | Engelli | Önemli, birbirine bağımlı |
| **Tekel** | Bir | Yakın ikamesi yok | Kapalı | Büyük |

Tam rekabet bir **kıyaslama modelidir**: gerçek piyasalar ona ne kadar benzer, ondan ne kadar sapar diye bakarız. Colander tam rekabetin koşullarını şöyle sıralar:

1. Alıcılar da satıcılar da **fiyat alıcıdır** (price takers),
2. **Firma sayısı çoktur**,
3. **Giriş engeli yoktur**,
4. Firmaların ürünleri **aynıdır**,
5. **Tam bilgi** vardır,
6. Satıcılar **kârı en büyükleyen girişimcilerdir**.

:::tanim Price taker
A firm or individual who takes the price determined by market supply and demand as given.
:::

:::gercek
Gerçek hayatta tam rekabete en yakın piyasalar tarım ürünleri borsaları, hallerdeki toptan sebze–meyve piyasası ve finansal piyasalardır. Borsa İstanbul'da büyük bir hisseyi alan küçük bir yatırımcı fiyatı etkileyemez; ekrandaki fiyatı kabul eder — fiyat alıcıdır.
:::
` },
      { baslik: "Firmanın talep eğrisi ve marjinal gelir", md: R`
Piyasa fiyatı, piyasa arz ve talebiyle belirlenir. Tek bir tam rekabetçi firma piyasanın içinde öylesine küçüktür ki, ne kadar satarsa satsın fiyatı etkileyemez. Bu yüzden **firmanın karşılaştığı talep eğrisi, piyasa fiyatında yataydır** (tam esnek).

- Firma piyasa fiyatının üstünde bir fiyat isterse hiçbir şey satamaz (alıcılar aynı malı başkasından alır).
- Altında bir fiyat istemesi için neden yoktur (piyasa fiyatından istediği kadar satabilir).

:::tanim Marginal revenue
The change in total revenue associated with a change in quantity.
:::

Fiyat sabit olduğu için her ek birim tam fiyat kadar gelir getirir:

$$MR = P$$

Yani tam rekabetçi firma için **marjinal gelir eğrisi = talep eğrisi = fiyat doğrusu**.
` },
      { baslik: "Kârı en büyüklemek: MR = MC", md: R`
Firma kaç birim üretmeli? 1. bölümdeki marjinal karar kuralının firma versiyonu:

- $MR > MC$ ise bir birim daha üretmek kârı **artırır** → üretimi artır.
- $MR < MC$ ise son birim kârı **azaltır** → üretimi azalt.
- Kâr, **$MR = MC$** olduğu yerde en büyüktür.

:::tanim Profit-maximizing condition
MR = MC. A firm maximizes profit by producing the quantity at which marginal revenue equals marginal cost.
:::

Tam rekabette $MR = P$ olduğundan kural **$P = MC$** olur: firma, fiyatın marjinal maliyet eğrisini kestiği miktarı üretir (MC'nin yükselen kısmında).

### Kârı hesaplamak
$$\text{Kâr} = TR - TC = (P - ATC) \times Q$$

Grafikte kâr, yüksekliği $P - ATC$, genişliği $Q$ olan **dikdörtgendir**. Fiyat ATC'nin altındaysa aynı dikdörtgen zarardır.

:::dikkat
En sık hata: kârı en büyük yapan miktarı ATC'nin en düşük noktası sanmak. Firma ATC'yi değil, **kârı** en büyüklemek ister; bu da MR = MC'dedir. Fiyat en düşük ATC'nin üstündeyse firma, ATC'nin en düşük noktasının *sağında* üretir.
:::

:::ornek Tablodan karar
Piyasa fiyatı 35. Firmanın maliyeti $TC = 100 + 30Q - 3Q^2 + 0{,}15Q^3$. Kaç birim üretir, kârı ne kadar? (Kalkülüs: $MC = 30 - 6Q + 0{,}45Q^2$.)
---cozum---
$P = MC$: $35 = 30 - 6Q + 0{,}45Q^2 \Rightarrow 0{,}45Q^2 - 6Q - 5 = 0$.
$$Q = \frac{6 + \sqrt{36 + 9}}{0{,}9} = \frac{6 + 6{,}708}{0{,}9} \approx 14{,}12$$
$ATC(14{,}12) = \dfrac{100}{14{,}12} + 30 - 3(14{,}12) + 0{,}15(14{,}12)^2 \approx 7{,}08 + 30 - 42{,}36 + 29{,}91 \approx 24{,}63$.

Kâr $= (35 - 24{,}63) \times 14{,}12 \approx$ **146 TL**. Aşağıdaki görselde fiyatı 35 yapıp kontrol edebilirsin.
:::
` },
      { baslik: "Zarar, kapanma ve arz eğrisi", md: R`
Fiyat düşerse ne olur? Üç bölge vardır:

1. **P > en düşük ATC:** firma iktisadi **kâr** eder.
2. **en düşük AVC < P < en düşük ATC:** firma **zarar eder ama üretmeye devam eder.** Gelir, değişken maliyetleri karşılayıp sabit maliyetin bir kısmını öder. Kapanırsa yine de sabit maliyetin tamamını kaybedecektir; üretmek zararı küçültür.
3. **P < en düşük AVC:** üretmek değişken maliyetleri bile karşılamaz. Firma **kapanır** (shutdown); zararı sabit maliyetle sınırlı kalır.

:::tanim Shutdown point
The point at which the firm will be better off if it shuts down than if it stays in business; where price equals minimum average variable cost.
:::

Bu yüzden tam rekabetçi firmanın **kısa dönem arz eğrisi**, MC eğrisinin **AVC'nin en düşük noktasının üstünde kalan kısmıdır**. Piyasa arz eğrisi de bu bireysel eğrilerin yatay toplamıdır — 4. bölümdeki yukarı eğimli arz eğrisinin temeli budur.

{{tam-rekabet}}

:::ipucu
Kapanma kararı **kısa dönem** kararıdır: sabit maliyet zaten ödenecek (batık), bu yüzden karar yalnız değişken maliyete bakar. Uzun dönemde sabit maliyet yoktur; firma fiyat ATC'nin altında kalmaya devam ederse sektörden **çıkar** (exit).
:::
` },
      { baslik: "Uzun dönem dengesi", md: R`
Tam rekabette giriş ve çıkış serbesttir. Bunun sonucu çarpıcıdır:

- Firmalar iktisadi **kâr** ediyorsa yeni firmalar girer → piyasa arzı artar → fiyat düşer → kâr erir.
- Firmalar **zarar** ediyorsa bazıları çıkar → piyasa arzı azalır → fiyat yükselir → zarar biter.

Süreç, **iktisadi kâr sıfır** olana kadar devam eder. Uzun dönem dengesinde:

$$P = MR = MC = \text{en düşük } ATC$$

:::tanim Long-run competitive equilibrium
Zero economic profit; price equals the minimum of the long-run average total cost; firms produce at the lowest point of their ATC.
:::

Bu sonucun iki önemli anlamı vardır:

1. **Üretim etkinliği:** her firma ortalama maliyetin en düşük olduğu noktada üretir; mal en ucuza üretilir.
2. **Tahsis etkinliği:** $P = MC$ — tüketicinin son birime biçtiği değer, onu üretmenin marjinal maliyetine eşittir; toplam artık en büyüktür.

Sıfır iktisadi kâr, sahiplerin "hiçbir şey kazanmaması" demek değildir; kaynaklarının fırsat maliyeti kadar — **normal kâr** — kazanırlar.

### Talep artarsa ne olur?
1. **Kısa dönem:** piyasa talebi artar, fiyat yükselir; mevcut firmalar MC eğrileri boyunca üretimi artırır ve kâr eder.
2. **Uzun dönem:** kâr yeni firmaları çeker; piyasa arzı sağa kayar; fiyat yeniden en düşük ATC'ye iner. Sonuçta piyasa miktarı artmıştır ama fiyat (sabit maliyetli bir sektörde) eski düzeyine dönmüştür.

Girdi fiyatları sektör büyüdükçe artıyorsa (**artan maliyetli sektör**) uzun dönem arz eğrisi yukarı eğimli olur; sabit maliyetli sektörde yatay, azalan maliyetli sektörde aşağı eğimlidir.

:::gercek
Colander, internetin bazı piyasaları tam rekabete yaklaştırdığını (fiyat karşılaştırma siteleri tam bilgiyi kolaylaştırır, satıcı sayısı artar) ama aynı zamanda yeni piyasa gücü biçimleri yarattığını (platformlar, arama sıralaması, marka sadakati) tartışır. Bir ürünü aynı anda onlarca satıcının sunduğu e-ticaret sitelerinde fiyatların birbirine yakın olması tam rekabetin işaretidir; platformun kendisinin ise rekabetçi olmadığını 14. bölümde göreceğiz.
:::
` },
    ],
    ozet: [
      "Dört piyasa yapısı: tam rekabet, tekelci rekabet, oligopol, tekel. Tam rekabet bir kıyaslama modelidir.",
      "Tam rekabetçi firma fiyat alıcıdır; talep eğrisi piyasa fiyatında yataydır ve P = MR.",
      "Kâr MR = MC'de en büyüktür; tam rekabette P = MC. Kâr = (P − ATC) × Q.",
      "P < en düşük AVC ise kapan; AVC < P < ATC ise zarar etse de üret. Kısa dönem arz eğrisi = MC'nin AVC üstündeki kısmı.",
      "Uzun dönemde giriş–çıkış iktisadi kârı sıfırlar: P = MC = en düşük ATC (üretim ve tahsis etkinliği).",
    ],
    terimler: [
      ["market structure", "piyasa yapısı", "The physical characteristics of the market within which firms interact: number of firms, product type, entry conditions."],
      ["perfect competition", "tam rekabet", "A market in which economic forces operate unimpeded: many firms, identical products, free entry, complete information, price takers."],
      ["price taker", "fiyat alıcı", "A firm or individual who takes the price determined by market supply and demand as given."],
      ["barriers to entry", "giriş engelleri", "Social, political, or economic impediments that prevent firms from entering a market."],
      ["marginal revenue", "marjinal gelir", "The change in total revenue associated with a change in quantity."],
      ["profit-maximizing condition", "kâr en büyükleme koşulu", "MR = MC; for a competitive firm, P = MC."],
      ["shutdown point", "kapanma noktası", "The point at which the firm is better off shutting down than staying in business; P = minimum AVC."],
      ["short-run supply curve (firm)", "firmanın kısa dönem arz eğrisi", "The portion of the firm's marginal cost curve above the minimum of average variable cost."],
      ["entry and exit", "giriş ve çıkış", "Firms enter when there are economic profits and leave when there are losses."],
      ["long-run competitive equilibrium", "uzun dönem rekabetçi denge", "Zero economic profit; price equals minimum ATC and marginal cost."],
      ["allocative efficiency", "tahsis etkinliği", "Price equals marginal cost; resources go to their highest-valued uses."],
      ["productive efficiency", "üretim etkinliği", "Output is produced at the minimum possible average total cost."],
      ["increasing-cost industry", "artan maliyetli sektör", "An industry in which input prices rise as the industry expands, so the long-run supply curve slopes upward."],
    ],
    quiz: [
      { s: "Which of the following is NOT a condition for perfect competition?", c: ["Many firms", "Identical products", "Barriers to entry", "Complete information"], d: 2, a: "Tam rekabette giriş engeli yoktur; diğer üçü koşullardandır." },
      { s: "The demand curve facing an individual perfectly competitive firm is:", c: ["Downward sloping", "Perfectly elastic (horizontal) at the market price", "Perfectly inelastic", "The same as the market demand curve"], d: 1, a: "Firma piyasa fiyatından istediği kadar satabilir; fiyatı etkileyemez: yatay talep." },
      { s: "For a perfectly competitive firm, marginal revenue equals:", c: ["Average cost", "Price", "Marginal cost at all output levels", "Zero"], d: 1, a: "Fiyat sabit olduğu için her ek birim fiyat kadar gelir getirir: MR = P." },
      { s: "A firm maximizes profit where:", c: ["Total revenue is maximized", "Average total cost is minimized", "Marginal revenue equals marginal cost", "Price equals average variable cost"], d: 2, a: "MR > MC iken üretimi artırmak, MR < MC iken azaltmak kârı artırır; en büyük kâr MR = MC'de." },
      { s: "Price is 35, and at the profit-maximizing output of 14 units ATC is 25. Profit is:", c: ["140", "350", "490", "10"], d: 0, a: "Kâr = (P − ATC) × Q = (35 − 25) × 14 = 140." },
      { s: "A competitive firm should shut down in the short run when:", c: ["Price is below average total cost", "Price is below minimum average variable cost", "It earns zero economic profit", "Marginal cost is rising"], d: 1, a: "Fiyat en düşük AVC'nin altındaysa üretmek değişken maliyeti bile karşılamaz; kapanmak zararı sabit maliyetle sınırlar." },
      { s: "If price is above minimum AVC but below minimum ATC, the firm should:", c: ["Shut down immediately", "Continue producing in the short run, even though it makes a loss", "Raise its price", "Produce where ATC is minimized"], d: 1, a: "Gelir değişken maliyeti karşılayıp sabit maliyetin bir kısmını öder; kapanınca zarar daha büyük olur." },
      { s: "A perfectly competitive firm's short-run supply curve is:", c: ["Its ATC curve", "Its MC curve above minimum AVC", "Its AVC curve", "Horizontal at the market price"], d: 1, a: "Her fiyatta firma P = MC'de üretir, ama fiyat en düşük AVC'nin altına inerse kapanır." },
      { s: "In long-run equilibrium in a perfectly competitive industry:", c: ["Firms earn large economic profits", "Price equals minimum ATC and economic profit is zero", "Price is above marginal cost", "Firms produce where AVC is minimized"], d: 1, a: "Giriş ve çıkış iktisadi kârı sıfırlar: P = MC = en düşük ATC." },
      { s: "If firms in a competitive industry are earning economic profits, in the long run:", c: ["Firms will exit and price will rise", "New firms will enter, market supply will increase and price will fall", "Profits will persist", "The government will set price"], d: 1, a: "Kâr girişi çeker; arz artar, fiyat düşer, kâr sıfıra iner." },
      { s: "Zero economic profit means that the firm's owners:", c: ["Earn nothing", "Earn a normal return equal to the opportunity cost of their resources", "Should exit the industry", "Have negative accounting profit"], d: 1, a: "İktisadi kâr örtük maliyetleri de düşer; sıfır iktisadi kâr = normal kâr." },
      { s: "In long-run competitive equilibrium, P = MC implies:", c: ["Productive inefficiency", "Allocative efficiency", "Monopoly power", "Excess capacity"], d: 1, a: "Tüketicinin son birime biçtiği değer (P) marjinal maliyete eşit: tahsis etkinliği, toplam artık en büyük." },
    ],
  });
})();
