// Mathematics I — 13. hafta: Alan, tüketici ve üretici artığı
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h13",
    hedefler: [
      "İki eğri arasındaki alanı belirli integralle hesaplamak",
      "Tüketici ve üretici artığını integralle hesaplamak (doğrusal olmayan eğriler dahil)",
      "Ölü ağırlık kaybını alan olarak yorumlamak",
      "Lorenz eğrisinden Gini katsayısını integralle hesaplamak",
    ],
    bolumler: [
      { baslik: "Alan ve refah", md: R`Belirli integral iki eğri arasındaki alanı ölçer. İktisatta bu alanlar refahı ölçer.` },
      { baslik: "Formüller", md: R`> $$\text{Eğriler arası alan: } \int_a^b [f(x) - g(x)]\,dx \qquad (f \ge g)$$

> $$TA = \int_0^{Q^*} D(Q)\,dQ - P^*Q^*$$

> $$ÜA = P^*Q^* - \int_0^{Q^*} S(Q)\,dQ$$

$D(Q)$ ters talep (ödemeye razı olunan en yüksek fiyat), $S(Q)$ ters arz (kabul edilen en düşük fiyat).

**Sezgi:** her birim için tüketici "en fazla $D(Q)$ öderdim ama $P^*$ ödedim" der; bu farkların toplamı tüketici artığıdır. Vergi gibi bir müdahale toplam artığı küçültür; kaybolan kısım ölü ağırlık kaybıdır.

{{artik-integral}}` },
      { baslik: "Lorenz eğrisi ve Gini", md: R`Lorenz eğrisi $L(x)$: nüfusun en yoksul $x$ oranının toplam gelirden aldığı pay; $L(0) = 0$, $L(1) = 1$, $L(x) \le x$.

> $$G = 2\int_0^1 [x - L(x)]\,dx$$

$G = 0$ tam eşitlik, $G \to 1$ tam eşitsizlik. Örnek: $L(x) = x^2$ ise $G = 2\left(\frac12 - \frac13\right) = \frac13$.

{{lorenz-integral}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$D(Q) = 120 - Q^2$, $S(Q) = 20 + 3Q$. Denge: $Q^2 + 3Q - 100 = 0 \Rightarrow Q^* \approx 8.612$, $P^* \approx 45.84$.

$TA = \displaystyle\int_0^{Q^*}(120 - Q^2)\,dQ - P^*Q^* = \frac{2}{3}Q^{*3} \approx 425.8$

$ÜA = P^*Q^* - \displaystyle\int_0^{Q^*}(20 + 3Q)\,dQ = 1.5\,Q^{*2} \approx 111.2$
:::

:::dikkat Sık yapılan hatalar
- Artık hesabında integrali 0'dan başlatmamak.
- $P^*Q^*$ dikdörtgenini çıkarmayı unutmak.
- $Q = f(P)$ biçimindeki talebi ters çevirmeden $dQ$'ya göre integrallemek.
:::` },
    ],
    ozet: [
      "Eğriler arası alan: ∫ₐᵇ [f(x) − g(x)]dx (f ≥ g).",
      "TA = ∫₀^Q* D(Q)dQ − P*Q*; ÜA = P*Q* − ∫₀^Q* S(Q)dQ (ters talep/arz kullanılır).",
      "Müdahaleyle kaybolan toplam artık ölü ağırlık kaybıdır.",
      "Gini: G = 2∫₀¹ [x − L(x)]dx; L(x) = x² için G = 1/3.",
    ],
    terimler: [
      ["consumer surplus","tüketici artığı","The area below the inverse demand curve and above the price."],
      ["producer surplus","üretici artığı","The area above the inverse supply curve and below the price."],
      ["area between curves","eğriler arası alan","The definite integral of the difference between two functions."],
      ["deadweight loss","ölü ağırlık kaybı","The loss of total surplus caused by a market distortion."],
      ["Lorenz curve","Lorenz eğrisi","The cumulative share of income received by the poorest fraction x of the population."],
      ["Gini coefficient","Gini katsayısı","Twice the area between the line of equality and the Lorenz curve."],
    ],
    quiz: [
      {"s":"Consumer surplus is computed as:","c":["$\\int_0^{Q^*} D(Q)\\,dQ - P^*Q^*$","$P^*Q^* - \\int_0^{Q^*} D(Q)\\,dQ$","$\\int_0^{Q^*} S(Q)\\,dQ$","$P^* \\cdot Q^*$"],"d":0,"a":"Ödemeye razı olunan toplam (talep altı alan) eksi ödenen (P*Q*)."},
      {"s":"$D(Q) = 50 - 2Q$ and $P^* = 30$. Consumer surplus is:","c":["100","200","300","400"],"d":0,"a":"Q* = 10; ∫₀¹⁰(50 − 2Q)dQ − 300 = 400 − 300 = 100 (üçgen: ½·10·20)."},
      {"s":"$S(Q) = 10 + Q$ and $P^* = 30$. Producer surplus is:","c":["100","200","400","600"],"d":1,"a":"Q* = 20; 600 − ∫₀²⁰(10 + Q)dQ = 600 − 400 = 200."},
      {"s":"The area between $f(x) = x$ and $g(x) = x^2$ on $[0, 1]$ is:","c":["1/2","1/3","1/6","1"],"d":2,"a":"∫₀¹(x − x²)dx = 1/2 − 1/3 = 1/6."},
      {"s":"If the Lorenz curve is $L(x) = x^2$, the Gini coefficient is:","c":["1/2","1/3","2/3","1/4"],"d":1,"a":"G = 2(1/2 − 1/3) = 1/3."},
      {"s":"If the Lorenz curve is $L(x) = x^3$, the Gini coefficient is:","c":["1/4","1/3","1/2","3/4"],"d":2,"a":"G = 2(1/2 − 1/4) = 1/2 (genel: (k − 1)/(k + 1))."},
      {"s":"A Gini coefficient of 0 means:","c":["Perfect inequality","Perfect equality","No data","Average inequality"],"d":1,"a":"Lorenz eğrisi eşitlik doğrusuyla çakışır."},
      {"s":"If demand is given as $Q = 100 - 2P$, before integrating over Q to find consumer surplus you should:","c":["Integrate with respect to P directly without care","Invert it to $P = 50 - Q/2$","Differentiate it","Square it"],"d":1,"a":"dQ'ya göre integral için ters talep P = D(Q) gerekir."},
      {"s":"Deadweight loss represents:","c":["Government revenue","Surplus lost because mutually beneficial trades no longer occur","Producer surplus","Fixed cost"],"d":1,"a":"Müdahale sonucu gerçekleşmeyen alışverişlerin kaybı."},
      {"s":"$\\int_0^3 (9 - x^2)\\,dx$ equals:","c":["18","27","9","0"],"d":0,"a":"[9x − x³/3]₀³ = 27 − 9 = 18."},
    ],
  });
})();
