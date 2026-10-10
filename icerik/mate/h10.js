// Mathematics I — 10. hafta: Marjinal analiz ve esneklik
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h10",
    hedefler: [
      "Marjinal maliyet, gelir, ürün, tüketim eğilimi ve faydayı türev olarak hesaplamak",
      "Türevin bir birimlik gerçek farkın yaklaşığı olduğunu göstermek",
      "Ortalama–marjinal ilişkisini ve MC = AC kuralını açıklamak",
      "Nokta ve yay esnekliğini hesaplamak; esneklik ile gelir ilişkisini (MR = P(1 + 1/ε)) kullanmak",
      "Sabit esneklikli talebi tanımak",
    ],
    bolumler: [
      { baslik: "Marjinal = türev", md: R`İktisatta "marjinal" türev demektir: bir birim daha üretmenin, satmanın ya da tüketmenin toplam üzerindeki ek etkisi.` },
      { baslik: "Marjinal kavramlar", md: R`| toplam | marjinal | anlamı |
|---|---|---|
| TC(Q) | MC = TC′(Q) | bir birim daha üretmenin ek maliyeti |
| TR(Q) | MR = TR′(Q) | bir birim daha satmanın ek geliri |
| Q(L) | MPL = Q′(L) | bir işçi daha çalıştırmanın ek ürünü |
| C(Y) | MPC = C′(Y) | gelirdeki 1 TL artışın tüketime giden kısmı |
| U(x) | MU = U′(x) | bir birim daha tüketmenin ek faydası |

Türev, bir birimlik gerçek farkın yaklaşığıdır: $MC(Q) \approx TC(Q+1) - TC(Q)$.

**Ortalama ve marjinal:** $AC = TC/Q$. Marjinal ortalamanın altındaysa ortalamayı aşağı çeker, üstündeyse yukarı çeker. Bu yüzden MC eğrisi AC'yi tam en düşük noktasından keser: $MC = AC$.

{{marjinal-ortalama}}` },
      { baslik: "Esneklik", md: R`> $$\varepsilon = \frac{\%\Delta Q}{\%\Delta P} = \frac{dQ}{dP}\cdot\frac{P}{Q}$$

> $$\text{Yay (orta nokta): } \varepsilon = \frac{\Delta Q / \bar Q}{\Delta P / \bar P}$$

- $|\varepsilon| > 1$ esnek, $|\varepsilon| < 1$ inelastik, $|\varepsilon| = 1$ birim esnek.
- **Gelirle bağı:** $MR = P\left(1 + \dfrac{1}{\varepsilon}\right)$. Talep esnekse ($\varepsilon < -1$) $MR > 0$: fiyatı düşürmek geliri artırır. Doğrusal talepte gelir, esnekliğin $-1$ olduğu orta noktada en büyüktür.
- Aynı formül gelir esnekliği ($\frac{dQ}{dY}\frac{Y}{Q}$) ve çapraz esneklik için de geçer.
- **Log kısayolu:** $\varepsilon = \dfrac{d\ln Q}{d\ln P}$. $Q = AP^{-b}$ ise esneklik her noktada $-b$'dir (sabit esneklikli talep).

{{esneklik}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$Q = 120 - 3P$, $P = 30$: $Q = 30$, $dQ/dP = -3$, $\varepsilon = -3\cdot\frac{30}{30} = -3$. Esnek: fiyat %1 artarsa talep %3 düşer, toplam harcama azalır. Birim esneklik: $\dfrac{-3P}{120 - 3P} = -1 \Rightarrow P = 20$.

$TC = 0.1Q^3 - 2Q^2 + 15Q + 100$: $MC = 0.3Q^2 - 4Q + 15$, $Q = 10$'da $MC = 5$. Gerçek fark $TC(11) - TC(10) = 156.1 - 150 = 6.1$; türev yaklaşık değeri verir.
:::

:::dikkat Sık yapılan hatalar
- Esnekliği eğimle karıştırmak: doğrusal talepte eğim sabittir ama esneklik her noktada farklıdır.
- Ters talepte $dP/dQ$'yu $dQ/dP$ sanmak: $\dfrac{dQ}{dP} = 1 \Big/ \dfrac{dP}{dQ}$.
- İşareti atmak: talep esnekliği negatiftir; "esnek mi" sorusunda mutlak değere bakılır.
:::` },
    ],
    ozet: [
      "MC = TC′(Q), MR = TR′(Q), MPL = Q′(L), MPC = C′(Y), MU = U′(x).",
      "MC(Q) ≈ TC(Q+1) − TC(Q).",
      "Marjinal ortalamanın altındaysa ortalama düşer; MC, AC'yi en düşük noktasından keser.",
      "ε = (dQ/dP)(P/Q); |ε| > 1 esnek. MR = P(1 + 1/ε); doğrusal talepte gelir |ε| = 1'de en büyük.",
      "Q = AP⁻ᵇ ise esneklik her noktada −b (log kısayolu: ε = d ln Q/d ln P).",
    ],
    terimler: [
      ["marginal cost / revenue","marjinal maliyet / gelir","The derivative of total cost / total revenue with respect to output."],
      ["marginal product","marjinal ürün","The derivative of output with respect to an input."],
      ["average cost","ortalama maliyet","Total cost divided by output."],
      ["marginal propensity to consume","marjinal tüketim eğilimi","The derivative of consumption with respect to income."],
      ["marginal utility","marjinal fayda","The derivative of utility with respect to consumption of a good."],
      ["price elasticity of demand","talebin fiyat esnekliği","(dQ/dP)·(P/Q): the percentage change in quantity per 1% change in price."],
      ["elastic / inelastic","esnek / inelastik","|ε| > 1 / |ε| < 1."],
    ],
    quiz: [
      {"s":"$TC = 0.1Q^3 - 2Q^2 + 15Q + 100$. Marginal cost at $Q = 10$ is:","c":["5","6.1","15","150"],"d":0,"a":"MC = 0.3Q² − 4Q + 15 = 30 − 40 + 15 = 5."},
      {"s":"Demand $Q = 120 - 3P$. The price elasticity at $P = 30$ is:","c":["−1","−3","−0.33","−30"],"d":1,"a":"dQ/dP = −3, Q = 30: ε = −3 · 30/30 = −3 (esnek)."},
      {"s":"For $Q = 120 - 3P$, demand is unit elastic at:","c":["P = 10","P = 20","P = 30","P = 40"],"d":1,"a":"−3P/(120 − 3P) = −1 → P = 20."},
      {"s":"When marginal cost is below average cost, average cost is:","c":["Rising","Falling","At its minimum","Equal to MC"],"d":1,"a":"Marjinal ortalamanın altındaysa ortalamayı aşağı çeker."},
      {"s":"If $P = 10$ and $\\varepsilon = -2$, marginal revenue is:","c":["5","20","−5","10"],"d":0,"a":"MR = P(1 + 1/ε) = 10(1 − 0.5) = 5."},
      {"s":"For the demand function $Q = 50P^{-2}$, the price elasticity is:","c":["−50","−2","−0.5","It varies along the curve"],"d":1,"a":"Kuvvet biçimli talepte esneklik sabit: üs −2."},
      {"s":"If $C = 200 + 0.8Y$, the marginal propensity to consume is:","c":["200","0.8","0.2","1"],"d":1,"a":"MPC = dC/dY = 0.8."},
      {"s":"If demand is elastic ($|\\varepsilon| > 1$), marginal revenue is:","c":["Negative","Zero","Positive","Equal to price"],"d":2,"a":"MR = P(1 + 1/ε) > 0 when ε < −1: fiyatı düşürmek geliri artırır."},
      {"s":"For the inverse demand $P = 50 - 2Q$, $dQ/dP$ equals:","c":["−2","−0.5","2","50"],"d":1,"a":"dQ/dP = 1/(dP/dQ) = 1/(−2) = −0.5."},
      {"s":"The point price elasticity of demand is:","c":["$\\dfrac{dP}{dQ}\\cdot\\dfrac{Q}{P}$","$\\dfrac{dQ}{dP}\\cdot\\dfrac{P}{Q}$","$\\dfrac{dQ}{dP}$","$\\dfrac{P}{Q}$"],"d":1,"a":"Esneklik = eğimin tersi × P/Q, yani (dQ/dP)(P/Q)."},
    ],
  });
})();
