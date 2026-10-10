// Mathematics I — 3. hafta: İkinci derece denklemler
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h03",
    hedefler: [
      "Diskriminantla kök sayısını belirlemek ve kökleri formülle bulmak",
      "Parabolün tepe noktasını hesaplamak ve yönünü (a'nın işareti) yorumlamak",
      "Toplam gelirin en büyük olduğu miktarı bulmak",
      "Kâr fonksiyonundan başabaş noktalarını ve en büyük kârı hesaplamak",
      "Doğrusal olmayan denge denklemlerinde iktisadi olarak anlamlı kökü seçmek",
    ],
    bolumler: [
      { baslik: "Parabol", md: R`$f(x) = ax^2 + bx + c$ ($a \ne 0$) grafiği bir paraboldür. $a > 0$ ise kollar yukarı (∪, tepe en düşük nokta), $a < 0$ ise aşağı (∩, tepe en yüksek nokta).` },
      { baslik: "Formüller", md: R`> $$\Delta = b^2 - 4ac,\qquad x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}$$

> $$\text{Tepe: } x_T = -\frac{b}{2a},\qquad y_T = f(x_T)$$

- $\Delta > 0$: iki reel kök. $\Delta = 0$: çift kök (parabol eksene teğet). $\Delta < 0$: reel kök yok.
- Kökler biliniyorsa $ax^2 + bx + c = a(x - x_1)(x - x_2)$; ayrıca $x_1 + x_2 = -b/a$ ve $x_1 x_2 = c/a$.

{{parabol}}` },
      { baslik: "İktisatta", md: R`**Toplam gelir:** ters talep $P = a - bQ$ ise $TR = PQ = aQ - bQ^2$, kolları aşağı bir parabol. Gelir tepe noktasında, $Q = \dfrac{a}{2b}$'de en büyüktür — talep doğrusunun orta noktası, esnekliğin $-1$ olduğu yer.

**Kâr:** $\pi = TR - TC$ çoğu zaman ikinci derecedir. Başabaş noktaları $\pi = 0$'ın kökleri, en büyük kâr tepe noktasıdır.

**Doğrusal olmayan denge:** $P = 120 - Q^2$ ve $P = 20 + 3Q$ ise $Q^2 + 3Q - 100 = 0$. Yalnız POZİTİF kök iktisadi olarak anlamlıdır.

{{kar-parabol}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$P = 100 - 2Q$, $TC = 10Q + 400$.

$TR = 100Q - 2Q^2$, dolayısıyla $\pi = -2Q^2 + 90Q - 400$.

**Başabaş:** $2Q^2 - 90Q + 400 = 0 \Rightarrow Q^2 - 45Q + 200 = 0$, $\Delta = 2025 - 800 = 1225$, $\sqrt{\Delta} = 35$, yani $Q = 5$ ya da $Q = 40$.

**En büyük kâr:** $Q = -\dfrac{90}{2(-2)} = 22.5$, $\pi = 2025 - 1012.5 - 400 = 612.5$, fiyat $P = 55$.
:::

:::dikkat Sık yapılan hatalar
- Formülde $-b$'yi unutmak ya da $2a$'yı yalnız kökün altına bölmek.
- Negatif kökü iktisadi cevap diye yazmak (negatif miktar olmaz).
- Tepe noktasının yüksekliğini $f(x_T)$ yerine $x_T$ sanmak.
:::` },
    ],
    ozet: [
      "f(x) = ax² + bx + c; a > 0 kollar yukarı, a < 0 aşağı.",
      "Δ = b² − 4ac; x₁,₂ = (−b ± √Δ)/2a. Δ > 0 iki, Δ = 0 bir, Δ < 0 sıfır reel kök.",
      "Tepe: x_T = −b/2a, y_T = f(x_T).",
      "TR = aQ − bQ² ters talepten gelir; en büyük gelir Q = a/2b'de.",
      "Kâr parabolünün kökleri başabaş noktaları, tepesi en büyük kâr; negatif kök iktisadi değildir.",
    ],
    terimler: [
      ["quadratic equation","ikinci derece denklem","An equation of the form ax² + bx + c = 0 with a ≠ 0."],
      ["discriminant","diskriminant","b² − 4ac; determines the number of real roots."],
      ["root","kök","A value of x that makes the function equal to zero."],
      ["vertex","tepe noktası","The turning point of a parabola; its maximum or minimum."],
      ["parabola","parabol","The graph of a quadratic function."],
      ["factorize","çarpanlara ayırmak","To write an expression as a product of factors."],
      ["total revenue","toplam gelir","Price times quantity sold."],
    ],
    quiz: [
      {"s":"The discriminant of $x^2 - 6x + 9$ is:","c":["0","36","−36","72"],"d":0,"a":"36 − 36 = 0: çift kök (x = 3), parabol eksene teğet."},
      {"s":"The roots of $x^2 - 5x + 6 = 0$ are:","c":["2 and 3","−2 and −3","1 and 6","−1 and 6"],"d":0,"a":"(x − 2)(x − 3) = 0."},
      {"s":"The x-coordinate of the vertex of $f(x) = -2x^2 + 12x - 5$ is:","c":["−3","3","6","12"],"d":1,"a":"x = −b/2a = −12/(−4) = 3."},
      {"s":"If $a < 0$ in $f(x) = ax^2 + bx + c$, the vertex is:","c":["A minimum","A maximum","Always at the origin","A root"],"d":1,"a":"Kollar aşağı (∩): tepe en yüksek noktadır."},
      {"s":"Inverse demand is $P = 100 - 2Q$. Total revenue is maximized at:","c":["Q = 50","Q = 25","Q = 100","Q = 20"],"d":1,"a":"TR = 100Q − 2Q²; tepe Q = 100/(2·2) = 25."},
      {"s":"Profit is $\\pi = -2Q^2 + 90Q - 400$. Profit is maximized at:","c":["Q = 22.5","Q = 45","Q = 5","Q = 40"],"d":0,"a":"Q = −90/(2·(−2)) = 22.5; en büyük kâr 612.5."},
      {"s":"The break-even quantities for $\\pi = -2Q^2 + 90Q - 400$ are:","c":["5 and 40","10 and 20","22.5 only","−5 and 40"],"d":0,"a":"2Q² − 90Q + 400 = 0 → Q² − 45Q + 200 = 0, Δ = 1225, kökler 5 ve 40."},
      {"s":"If the discriminant is negative, the quadratic equation has:","c":["Two real roots","One real root","No real roots","Infinitely many roots"],"d":2,"a":"√Δ reel değil: parabol x eksenini kesmez."},
      {"s":"The sum of the roots of $2x^2 - 8x + 3 = 0$ is:","c":["4","−4","3/2","8"],"d":0,"a":"x₁ + x₂ = −b/a = 8/2 = 4."},
      {"s":"Equilibrium requires $Q^2 + 3Q - 100 = 0$. Which root is economically meaningful?","c":["The negative root","The positive root","Both roots","Neither"],"d":1,"a":"Miktar negatif olamaz; yalnız pozitif kök anlamlıdır."},
    ],
  });
})();
