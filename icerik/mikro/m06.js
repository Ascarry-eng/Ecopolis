// Colander 11e — 6. bölüm: Describing Supply and Demand: Elasticities (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m06",
    hedefler: [
      "Talebin ve arzın fiyat esnekliğini tanımlamak ve orta nokta yöntemiyle hesaplamak",
      "Esneklik ile eğimin aynı şey olmadığını; doğrusal talepte esnekliğin nokta nokta değiştiğini göstermek",
      "Esnekliğin belirleyicilerini (ikame olanakları, bütçedeki pay, zaman, lüks–zorunlu) saymak",
      "Esneklik ile toplam gelir arasındaki ilişkiyi kullanarak fiyat değişikliğinin geliri nasıl etkileyeceğini söylemek",
      "Gelir esnekliği ve çapraz fiyat esnekliğiyle malları sınıflandırmak",
    ],
    bolumler: [
      { baslik: "Esneklik nedir?", md: R`
Talep yasası fiyat yükselince talep miktarının düşeceğini söyler, ama **ne kadar** düşeceğini söylemez. Bunu ölçen kavram esnekliktir. Esneklik **yüzde değişimleri** karşılaştırır; böylece birimlerden (kilo, ton, lira, dolar) bağımsızdır.

:::tanim Price elasticity of demand
The percentage change in quantity demanded divided by the percentage change in price.
:::

$$E_D = \frac{\%\Delta Q_d}{\%\Delta P}$$

:::tanim Price elasticity of supply
The percentage change in quantity supplied divided by the percentage change in price.
:::

$$E_S = \frac{\%\Delta Q_s}{\%\Delta P}$$

Talep esnekliği teknik olarak negatiftir (fiyat ve miktar ters yönde hareket eder). Colander, çoğu kitap gibi, eksi işaretini atıp **mutlak değerle** konuşur. Sınıflandırma:

| Değer | Ad | Anlamı |
|---|---|---|
| $E > 1$ | **Esnek** (elastic) | Miktar, fiyattan oransal olarak daha çok değişir |
| $E = 1$ | **Birim esnek** (unit elastic) | Aynı oranda değişir |
| $E < 1$ | **Esnek değil** (inelastic) | Miktar, fiyattan oransal olarak daha az değişir |
| $E = \infty$ | **Tam esnek** (perfectly elastic) | Yatay eğri: fiyat azıcık artarsa miktar sıfırlanır |
| $E = 0$ | **Tam esnek değil** (perfectly inelastic) | Dikey eğri: miktar fiyata hiç tepki vermez |

:::ipucu
Ezber kolaylığı: **es-NEK** = tepki büyük; esnek *değil* = tepki küçük. İnsülin gibi hayati bir ilaca talep neredeyse tam esnek değildir; bir markanın tişörtüne talep ise çok esnektir (başka marka tişört çok).
:::
` },
      { baslik: "Esnekliği hesaplamak: orta nokta yöntemi", md: R`
Basit yüzde değişim formülünün bir sorunu vardır: hangi noktadan başladığına göre farklı sonuç verir. Fiyat 10'dan 12'ye çıkarsa %20 artmıştır; 12'den 10'a düşerse %16,7 düşmüştür. Colander bu yüzden **orta nokta (arc) yöntemini** kullanır: yüzde değişimi başlangıç değerine değil, **ortalamaya** göre hesapla.

$$E = \frac{\dfrac{Q_2 - Q_1}{\tfrac{1}{2}(Q_1 + Q_2)}}{\dfrac{P_2 - P_1}{\tfrac{1}{2}(P_1 + P_2)}}$$

:::ornek Köprü geçiş ücreti
Bir köprünün geçiş ücreti 40 TL'den 50 TL'ye çıkınca günlük geçiş sayısı 100.000'den 90.000'e iniyor. Talebin fiyat esnekliği nedir? Talep esnek mi?
---cozum---
$$\%\Delta Q = \frac{90.000 - 100.000}{95.000} = -0{,}105 \;(\%10{,}5)$$
$$\%\Delta P = \frac{50 - 40}{45} = 0{,}222 \;(\%22{,}2)$$
$$E = \frac{0{,}105}{0{,}222} \approx 0{,}47$$

$E < 1$: talep **esnek değil**. Bu yüzden ücreti artırmak köprünün gelirini artırır: 40 × 100.000 = 4,0 milyon TL → 50 × 90.000 = 4,5 milyon TL.
:::

Kendin dene: iki noktayı sürükle; basit yöntemin iki yönde nasıl farklı sonuç verdiğine, orta noktanın ise aynı kaldığına bak.

{{yay-esneklik}}

### Nokta esnekliği
Talep eğrisinin tek bir noktasındaki esneklik için Colander'ın formülü:

$$E = \frac{1}{\text{eğim}} \times \frac{P}{Q}$$

Buradaki eğim, grafikteki (fiyat dikey eksende) eğimin mutlak değeridir. Kalkülüsle: $E = \left|\dfrac{dQ}{dP}\right| \dfrac{P}{Q}$ — matematik dersinde türevle hesaplayacağın şeyin ta kendisi.
` },
      { baslik: "Esneklik eğim değildir", md: R`
En sık yapılan hata: "dik eğri esnek değildir, yatık eğri esnektir" demek. Bu yalnız **aynı noktadan geçen** iki eğri için doğrudur. Esneklik yüzde değişimlere, eğim mutlak değişimlere bakar.

En çarpıcı sonuç: **doğrusal bir talep eğrisinde eğim her yerde aynıdır, ama esneklik her noktada farklıdır.**

- Eğrinin **üst** kısmında fiyat yüksek, miktar düşüktür: $P/Q$ büyük → **esnek**.
- **Tam ortada** $E = 1$.
- **Alt** kısmında fiyat düşük, miktar yüksektir: $P/Q$ küçük → **esnek değil**.

Noktayı sürükleyip esnekliğin ve toplam gelirin (sağdaki eğri) nasıl değiştiğini izle:

{{esneklik}}

:::dikkat
Tam esnek (yatay) ve tam esnek değil (dikey) eğriler istisnadır: onlarda esneklik her noktada aynıdır (sırasıyla sonsuz ve sıfır). Bir de **sabit esneklikli** eğriler vardır (hiperbol biçiminde, $Q = A/P$ gibi) — matematik dersinde göreceğin üstel/kuvvet fonksiyonları.
:::
` },
      { baslik: "Esnekliği ne belirler?", md: R`
Esnekliğin kalbinde **ikame (substitution)** yatar: fiyat yükselince başka bir şeye kayabiliyorsan talebin esnektir. Bunu etkileyen etkenler:

1. **İkamelerin bolluğu.** Ne kadar çok ve yakın ikame varsa o kadar esnek. "Bir markanın simidi" esnek, "ekmek" genel olarak esnek değil.
2. **Malın tanımının genişliği.** Dar tanımlı mallar (Coca-Cola) geniş tanımlılardan (gazlı içecek) daha esnektir.
3. **Bütçedeki pay.** Bütçede büyük yer tutan mallar (kira, otomobil) daha esnektir; tuz gibi küçük kalemlerin fiyatı iki katına çıksa da tüketim pek değişmez.
4. **Zaman.** Uzun dönemde talep de arz da daha esnektir. Benzin zamlandığında ilk hafta herkes yine arabasına biner; birkaç yıl içinde daha az yakan araç alınır, işe yakın taşınılır.
5. **Lüks mü zorunlu mu?** Zorunlu mallar (ilaç, temel gıda) esnek değil; lüks mallar (tatil, mücevher) esnektir.

Arz tarafında belirleyici en çok **zamandır**: kısa dönemde üretim kapasitesi sabittir, arz esnek değildir; uzun dönemde yeni fabrikalar kurulur, yeni firmalar girer, arz esnekleşir.

:::gercek
Doğal afetlerden sonra şişe su fiyatlarının fırlaması, hem talebin hem arzın kısa dönemde çok az esnek olmasından kaynaklanır: su hayati önemdedir (ikamesi yok) ve bölgeye kısa sürede yeterli su getirmek zordur. Fiyatın sıçraması "fırsatçılık" olarak tepki görür ama aynı zamanda bölgeye su getirmek için güçlü bir sinyal oluşturur — 1. bölümdeki iktisadi ve toplumsal güçlerin çatışması.
:::
` },
      { baslik: "Esneklik ve toplam gelir", md: R`
Satıcının **toplam geliri (total revenue)** alıcıların toplam harcamasıdır: $TR = P \times Q$. Fiyat değişince TR'ye ne olacağı esnekliğe bağlıdır, çünkü fiyat ve miktar ters yönde hareket eder:

| Talep | Fiyat ↑ | Fiyat ↓ |
|---|---|---|
| Esnek ($E > 1$) | TR ↓ | TR ↑ |
| Birim esnek ($E = 1$) | TR değişmez | TR değişmez |
| Esnek değil ($E < 1$) | TR ↑ | TR ↓ |

Kural: **Esnek değilse fiyat ile toplam gelir aynı yönde, esnekse ters yönde hareket eder.**

:::ornek Uyuşturucuyla mücadelenin paradoksu
Devlet uyuşturucu arzını kısmak için polis baskısını artırıyor. Uyuşturucu talebi çok az esnekse satıcıların toplam gelirine ne olur?
---cozum---
Arz azalır → fiyat yükselir. Talep esnek değilse miktar orantısından az düşer ve **satıcıların toplam geliri artar**. Bağımlıların harcaması da artar; bu, mal ve hırsızlık suçlarını artırabilir. Colander'ın vurguladığı nokta: esneklik bilinmeden politikanın sonucu tahmin edilemez.
:::

:::gercek
Sigara ve akaryakıtta talep kısa dönemde esnek değildir. ÖTV artışları bu yüzden tüketimi az düşürür, vergi gelirini çok artırır. Maliye bakanlıklarının bu mallardan vergi almayı sevmesinin nedeni budur.
:::
` },
      { baslik: "Diğer esneklikler", md: R`
### Gelir esnekliği
:::tanim Income elasticity of demand
The percentage change in demand divided by the percentage change in income.
:::

$$E_Y = \frac{\%\Delta Q_d}{\%\Delta Y}$$

- $E_Y > 0$: **normal mal**. Bunun içinde $E_Y > 1$ olanlar **lüks mal** (gelir %10 artınca talep %10'dan fazla artar), $0 < E_Y < 1$ olanlar **zorunlu mal**.
- $E_Y < 0$: **düşük mal** (inferior good).

### Çapraz fiyat esnekliği
:::tanim Cross-price elasticity of demand
The percentage change in demand for one good divided by the percentage change in the price of another good.
:::

$$E_{XY} = \frac{\%\Delta Q_X}{\%\Delta P_Y}$$

- $E_{XY} > 0$: **ikame** (Y pahalanınca X'e talep artar).
- $E_{XY} < 0$: **tamamlayıcı** (Y pahalanınca X'e talep azalır).
- $E_{XY} \approx 0$: ilişkisiz mallar.

:::ornek Sınıflandır
Gelir %5 artınca restoran yemeği talebi %12 artıyor. Kahvenin fiyatı %10 artınca çay talebi %4 artıyor. Yorumla.
---cozum---
Gelir esnekliği $12/5 = 2{,}4 > 1$: restoran yemeği **lüks bir normal mal**.

Çapraz esneklik $4/10 = 0{,}4 > 0$: çay ile kahve **ikame**.
:::

### Bireysel ve piyasa esnekliği
Piyasa talebi bireysel taleplerin toplamı olduğundan, fiyat değişince yalnız mevcut alıcıların miktarı değil, **piyasaya giren ya da çıkan alıcı sayısı** da değişir. Bu yüzden piyasa talebi genellikle bireysel talepten daha esnektir.
` },
    ],
    ozet: [
      "Esneklik yüzde değişimleri karşılaştırır: E = %ΔQ / %ΔP. E > 1 esnek, E = 1 birim esnek, E < 1 esnek değil.",
      "Orta nokta yöntemi yüzde değişimi ortalamaya göre hesaplar; iki yönde aynı sonucu verir. Nokta esnekliği: E = (1/eğim) × P/Q.",
      "Esneklik eğim değildir: doğrusal talepte üst kısım esnek, orta birim esnek, alt kısım esnek değil.",
      "Belirleyiciler: ikame olanakları, tanımın genişliği, bütçedeki pay, zaman (uzun dönemde daha esnek), lüks–zorunlu.",
      "Esnek değilse fiyat ile toplam gelir aynı yönde, esnekse ters yönde hareket eder.",
      "Gelir esnekliği: > 1 lüks, 0–1 zorunlu, < 0 düşük mal. Çapraz esneklik: > 0 ikame, < 0 tamamlayıcı.",
    ],
    terimler: [
      ["price elasticity of demand", "talebin fiyat esnekliği", "The percentage change in quantity demanded divided by the percentage change in price."],
      ["price elasticity of supply", "arzın fiyat esnekliği", "The percentage change in quantity supplied divided by the percentage change in price."],
      ["elastic", "esnek", "The percentage change in quantity is greater than the percentage change in price (E > 1)."],
      ["inelastic", "esnek değil", "The percentage change in quantity is less than the percentage change in price (E < 1)."],
      ["unit elastic", "birim esnek", "The percentage change in quantity equals the percentage change in price (E = 1)."],
      ["perfectly elastic", "tam esnek", "Quantity responds enormously to changes in price (E = ∞); a horizontal curve."],
      ["perfectly inelastic", "tam esnek değil", "Quantity does not respond at all to changes in price (E = 0); a vertical curve."],
      ["midpoint (arc) elasticity", "orta nokta (yay) esnekliği", "Elasticity computed using average price and average quantity as the bases for percentage changes."],
      ["point elasticity", "nokta esnekliği", "Elasticity at a specific point on a curve: (1/slope) × (P/Q)."],
      ["total revenue", "toplam gelir", "The price of a good times the quantity sold (P × Q)."],
      ["income elasticity of demand", "talebin gelir esnekliği", "The percentage change in demand divided by the percentage change in income."],
      ["luxury good", "lüks mal", "A good with an income elasticity greater than one."],
      ["necessity", "zorunlu mal", "A good with an income elasticity between zero and one."],
      ["cross-price elasticity of demand", "çapraz fiyat esnekliği", "The percentage change in demand for one good divided by the percentage change in the price of another good."],
      ["substitution", "ikame", "Switching to other goods when a good's price rises; the core reason demand curves slope down."],
    ],
    quiz: [
      { s: "If the price of a good rises by 10% and quantity demanded falls by 20%, the price elasticity of demand is:", c: ["0.5 (inelastic)", "1 (unit elastic)", "2 (elastic)", "20"], d: 2, a: "E = 20 / 10 = 2 > 1: esnek." },
      { s: "Using the midpoint formula, if price rises from 4 to 6 and quantity demanded falls from 120 to 80, the elasticity is:", c: ["0.5", "1.0", "1.5", "2.0"], d: 1, a: "%ΔQ = 40/100 = 0,4; %ΔP = 2/5 = 0,4; E = 0,4/0,4 = 1 (birim esnek)." },
      { s: "Along a straight-line (linear) downward-sloping demand curve:", c: ["Elasticity is the same at every point", "Demand is more elastic at higher prices", "Demand is more elastic at lower prices", "Elasticity equals the slope"], d: 1, a: "Eğim sabit ama P/Q değişir. Üst kısımda P/Q büyük → esnek; alt kısımda esnek değil." },
      { s: "A vertical demand curve is:", c: ["Perfectly elastic", "Perfectly inelastic", "Unit elastic", "Elastic"], d: 1, a: "Dikey eğride miktar fiyata hiç tepki vermez: E = 0, tam esnek değil." },
      { s: "Which good is likely to have the most elastic demand?", c: ["Salt", "Insulin", "A particular brand of T-shirt", "Electricity in the short run"], d: 2, a: "Belirli bir markanın tişörtünün çok sayıda yakın ikamesi var: en esnek. Tuz bütçede küçük pay, insülin hayati, elektrik kısa dönemde ikamesiz." },
      { s: "Demand for gasoline is likely to be:", c: ["More elastic in the short run than in the long run", "More elastic in the long run than in the short run", "Equally elastic in both", "Perfectly elastic"], d: 1, a: "Uzun dönemde insanlar daha az yakan araç alır, taşınır; ikame olanakları artar: talep daha esnek." },
      { s: "If demand is inelastic, a price increase will cause total revenue to:", c: ["Increase", "Decrease", "Stay the same", "Fall to zero"], d: 0, a: "Esnek değilse miktar orantısından az düşer: fiyat ile toplam gelir aynı yönde, TR artar." },
      { s: "A firm wants to increase total revenue. Its demand is elastic. It should:", c: ["Raise its price", "Lower its price", "Keep its price constant", "Stop producing"], d: 1, a: "Esnek talepte fiyat ile TR ters yönde: fiyatı düşürmek geliri artırır." },
      { s: "Total revenue is maximized on a linear demand curve where:", c: ["Price is highest", "Quantity is highest", "Demand is unit elastic", "Demand is perfectly inelastic"], d: 2, a: "Birim esnek noktada (doğrunun ortası) TR en büyüktür; orada küçük bir fiyat değişikliği TR'yi değiştirmez." },
      { s: "If income rises by 10% and the demand for a good rises by 25%, the good is:", c: ["An inferior good", "A necessity", "A luxury", "A complement"], d: 2, a: "Gelir esnekliği 2,5 > 1: lüks (normal) mal." },
      { s: "If the cross-price elasticity between two goods is negative, the goods are:", c: ["Substitutes", "Complements", "Unrelated", "Inferior goods"], d: 1, a: "Y pahalanınca X talebi düşüyorsa birlikte tüketiliyorlardır: tamamlayıcı." },
      { s: "Increased police enforcement reduces the supply of illegal drugs. If demand is highly inelastic, drug sellers' total revenue will:", c: ["Fall sharply", "Rise", "Stay the same", "Fall to zero"], d: 1, a: "Arz azalır, fiyat yükselir; esnek olmayan talepte miktar az düşer: satıcıların toplam geliri artar." },
    ],
  });
})();
