// Mathematics I — 11. hafta: Optimizasyon: maksimum ve minimum
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h11",
    hedefler: [
      "Birinci sıra koşulla kritik noktaları bulmak",
      "İkinci sıra koşulla maksimum ve minimumu ayırmak",
      "Kapalı aralıkta mutlak ekstremumu uç noktaları da karşılaştırarak bulmak",
      "Kâr maksimizasyonunu MR = MC olarak çözmek",
      "Gelir maksimumu, ortalama maliyet minimumu ve vergi geliri maksimumu sorularını çözmek",
    ],
    bolumler: [
      { baslik: "En iyiyi aramak", md: R`Bir fonksiyonun en büyük ya da en küçük değerini aramak iktisadın merkez sorusudur: kârı en büyük, maliyeti en küçük yap.` },
      { baslik: "Adımlar", md: R`1. **Birinci sıra koşul (FOC):** $f'(x) = 0$ — kritik noktalar. Türevin tanımsız olduğu noktalar ve aralığın uçları da adaydır.
2. **İkinci sıra koşul (SOC):** $f''(x^*) < 0$ ise yerel maksimum, $f''(x^*) > 0$ ise yerel minimum. $f''(x^*) = 0$ ise test sonuç vermez; $f'$'nün işaret değişimine bakılır.
3. **Kapalı aralıkta $[a, b]$:** kritik noktalardaki ve UÇLARDAKİ değerler karşılaştırılır; en büyüğü mutlak maksimumdur.

**Konkavlık:** $f'' < 0$ içbükey (∩), $f'' > 0$ dışbükey (∪). $f''$'nün işaret değiştirdiği nokta büküm noktasıdır.` },
      { baslik: "İktisatta", md: R`> $$\text{Kâr: } \pi'(Q) = 0 \iff MR = MC,\qquad \pi''(Q) < 0$$

> $$\text{Ortalama maliyet en düşük: } MC = AC$$

> $$\text{Gelir en büyük: } MR = 0 \;\;(|\varepsilon| = 1)$$

- Tam rekabette fiyat sabittir, $MR = P$: firma $P = MC$ olana kadar üretir.
- Monopolde $MR < P$: monopol daha az üretir, daha yüksek fiyat alır.
- **Vergi geliri:** $T(t) = t\cdot Q(t)$ fonksiyonunun türevi sıfıra eşitlenerek en çok gelir getiren vergi bulunur.

{{optimizasyon}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$P = 100 - 2Q$, $TC = 50 + 10Q + 0.5Q^2$.

$TR = 100Q - 2Q^2 \Rightarrow MR = 100 - 4Q$; $MC = 10 + Q$.

$MR = MC$: $100 - 4Q = 10 + Q \Rightarrow Q^* = 18$, $P^* = 64$.

SOC: $\pi'' = -4 - 1 = -5 < 0$, maksimum. $\pi^* = 64\cdot 18 - (50 + 180 + 162) = 1152 - 392 = 760$.
:::

:::dikkat Sık yapılan hatalar
- Yalnız FOC'u yazıp SOC'u kontrol etmemek: bulduğun nokta minimum olabilir.
- Kapalı aralıkta uç noktaları unutmak.
- Kâr yerine geliri en büyük yapmak: $MR = 0$ ile $MR = MC$ farklı sonuç verir.
:::` },
    ],
    ozet: [
      "FOC: f′(x) = 0 (kritik nokta). SOC: f″ < 0 maksimum, f″ > 0 minimum.",
      "Kapalı aralıkta kritik noktalar ve uçlar karşılaştırılır.",
      "f″ < 0 içbükey (∩), f″ > 0 dışbükey (∪); işaret değişimi büküm noktası.",
      "Kâr: π′ = 0 ⇔ MR = MC, π″ < 0. Ortalama maliyet en düşük: MC = AC. Gelir en büyük: MR = 0.",
      "Monopol MR < P olduğu için daha az üretir, daha yüksek fiyat alır.",
    ],
    terimler: [
      ["optimization","optimizasyon (eniyileme)","Finding the maximum or minimum value of a function."],
      ["critical point","kritik nokta","A point where the first derivative is zero or undefined."],
      ["first / second order condition","birinci / ikinci sıra koşul","f′ = 0 identifies candidates; the sign of f″ tells max or min."],
      ["local / global maximum","yerel / mutlak maksimum","Highest value nearby / highest value over the whole domain."],
      ["concave / convex","içbükey / dışbükey","Concave: f″ < 0 (∩); convex: f″ > 0 (∪)."],
      ["inflection point","büküm noktası","A point where the second derivative changes sign."],
      ["profit maximization","kâr maksimizasyonu","Choosing output where MR = MC and π″ < 0."],
    ],
    quiz: [
      {"s":"The first-order condition for a maximum or minimum of $f(x)$ is:","c":["$f(x) = 0$","$f'(x) = 0$","$f''(x) = 0$","$f'(x) > 0$"],"d":1,"a":"Kritik noktalarda türev sıfırdır."},
      {"s":"$f(x) = -x^2 + 6x$ has a maximum at:","c":["x = 3, f = 9","x = 6, f = 0","x = −3, f = −27","x = 0, f = 0"],"d":0,"a":"f′ = −2x + 6 = 0 → x = 3; f(3) = 9; f″ = −2 < 0."},
      {"s":"If $f'(x^*) = 0$ and $f''(x^*) < 0$, then $x^*$ is:","c":["A local minimum","A local maximum","An inflection point","Not a critical point"],"d":1,"a":"İçbükey bölgede kritik nokta: maksimum."},
      {"s":"$P = 100 - 2Q$ and $TC = 50 + 10Q + 0.5Q^2$. Profit-maximizing output is:","c":["Q = 18","Q = 25","Q = 20","Q = 15"],"d":0,"a":"MR = 100 − 4Q, MC = 10 + Q: 100 − 4Q = 10 + Q → Q = 18."},
      {"s":"In the previous question, maximum profit is:","c":["760","1152","392","640"],"d":0,"a":"P = 64; π = 64·18 − (50 + 180 + 162) = 1152 − 392 = 760."},
      {"s":"$f(x) = x^3 - 3x$ has a local minimum at:","c":["x = −1","x = 1","x = 0","x = 3"],"d":1,"a":"f′ = 3x² − 3 = 0 → x = ±1; f″ = 6x: x = 1'de 6 > 0 → minimum."},
      {"s":"Total revenue is maximized where:","c":["MR = MC","MR = 0","MC = AC","P = MC"],"d":1,"a":"Gelir en büyük: TR′ = MR = 0 (|ε| = 1)."},
      {"s":"Average cost is minimized where:","c":["MC = 0","MC = AC","MR = MC","AC = 0"],"d":1,"a":"d(TC/Q)/dQ = (MC − AC)/Q = 0 → MC = AC."},
      {"s":"On the closed interval $[0, 5]$, $f(x) = x^2 - 4x$ has its absolute maximum at:","c":["x = 2","x = 0","x = 5","x = 4"],"d":2,"a":"Kritik nokta x = 2 (f = −4, minimum). Uçlar: f(0) = 0, f(5) = 5 → mutlak maksimum x = 5."},
      {"s":"If $Q = 100 - 2t$ and tax revenue is $T = tQ$, revenue is maximized at:","c":["t = 50","t = 25","t = 100","t = 10"],"d":1,"a":"T = 100t − 2t²; T′ = 100 − 4t = 0 → t = 25."},
    ],
  });
})();
