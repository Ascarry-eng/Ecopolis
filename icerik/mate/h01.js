// Mathematics I — 1. hafta: Matematiğe giriş
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h01",
    hedefler: [
      "Fonksiyon, tanım kümesi ve değer kümesi kavramlarını kullanmak",
      "Üs ve kök kurallarıyla ifadeleri sadeleştirmek; kökleri üs biçimine çevirmek",
      "İki nokta arasındaki eğimi (ortalama değişim hızını) hesaplamak",
      "İktisattaki temel değişkenleri (P, Q, TR, TC, π) fonksiyon olarak yazmak",
      "Arz–talep grafiğinde eksen geleneğini ve ters talep fonksiyonunu bilmek",
    ],
    bolumler: [
      { baslik: "Fonksiyonlar: iktisadın dili", md: R`Bu ders iktisadın dilini kuruyor: değişkenler arasındaki ilişkiyi fonksiyonla yazmak, grafikle okumak ve değişimi ölçmek.` },
      { baslik: "Fonksiyon", md: R`Bir fonksiyon her girdiye TEK bir çıktı atar. $y = f(x)$ yazımında $x$ bağımsız değişken (girdi), $y$ bağımlı değişkendir. İktisatta harflerin anlamı vardır:

| harf | İngilizce | Türkçe |
|---|---|---|
| Q | quantity | miktar |
| P | price | fiyat |
| TR, TC | total revenue, total cost | toplam gelir, toplam maliyet |
| π | profit | kâr |
| Y, C, I | income, consumption, investment | gelir, tüketim, yatırım |
| K, L | capital, labor | sermaye, emek |

**Tanım kümesi (domain):** fonksiyona girebilecek değerler. İktisatta miktar ve fiyat negatif olamaz: $Q \ge 0$. Ayrıca $\sqrt{x}$ için $x \ge 0$, $\ln x$ için $x > 0$, $1/x$ için $x \ne 0$.` },
      { baslik: "Üs ve kök kuralları", md: R`> $$a^m a^n = a^{m+n},\qquad \frac{a^m}{a^n} = a^{m-n},\qquad (a^m)^n = a^{mn}$$

> $$a^{-n} = \frac{1}{a^n},\qquad a^{1/n} = \sqrt[n]{a},\qquad a^0 = 1$$

Türev ve integralde kökleri ve kesirleri ÜS biçimine çevirmek işi çok kolaylaştırır: $\dfrac{5}{\sqrt{x}} = 5x^{-1/2}$.` },
      { baslik: "Eğim", md: R`İki nokta arasındaki ortalama değişim hızı: $\dfrac{\Delta y}{\Delta x} = \dfrac{y_2 - y_1}{x_2 - x_1}$. Dersin geri kalanının çekirdeği budur: türev, bu oranın $\Delta x \to 0$ iken limitidir.

**Dikkat:** talep–arz grafiğinde fiyat DİKEY, miktar YATAY eksendedir (Marshall geleneği). Fonksiyon ise çoğu zaman $Q = f(P)$ diye yazılır. Grafiği doğrudan çizen, ters talep fonksiyonu $P = f(Q)$'dur.` },
      { baslik: "Fonksiyon türleri ve grafik okuma", md: R`İktisatta sık karşılaşacağın fonksiyon aileleri:

| Tür | Biçim | Grafik | İktisatta örnek |
|---|---|---|---|
| Doğrusal | $y = mx + b$ | doğru | doğrusal talep, maliyet |
| İkinci derece | $y = ax^2 + bx + c$ | parabol | toplam gelir, kâr |
| Kuvvet | $y = ax^n$ | eğri | Cobb–Douglas üretim |
| Üstel | $y = a\,b^x$ | hızla artan/azalan | bileşik büyüme, faiz |
| Logaritmik | $y = \ln x$ | yavaşlayarak artan | log ölçekli veriler |
| Kesirli (rasyonel) | $y = a/x$ | hiperbol | ortalama sabit maliyet |

Bir grafiği okurken şunlara bak: **kesişimler** (eksenleri nerede kesiyor?), **artan mı azalan mı**, **eğim sabit mi değişiyor mu**, **tanımsız olduğu yer var mı** ($1/x$ için $x = 0$). Aşağıda bir fonksiyon yazıp iki noktayı sürükleyerek eğimin nasıl değiştiğini görebilirsin.

{{fonksiyon-cizici}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
**Soru:** $f(x) = 3x^2 - 2x + 1$ ise $f(2)$ ve $f(a+1)$ nedir?

$f(2) = 3\cdot 4 - 4 + 1 = 9$.

$f(a+1) = 3(a+1)^2 - 2(a+1) + 1 = 3a^2 + 6a + 3 - 2a - 2 + 1 = 3a^2 + 4a + 2$.
:::

:::dikkat Sık yapılan hatalar
- $(a+b)^2 \ne a^2 + b^2$; doğrusu $a^2 + 2ab + b^2$.
- $\sqrt{a + b} \ne \sqrt a + \sqrt b$.
- $-x^2$ ile $(-x)^2$ farklıdır: $x = 3$ için $-9$ ve $9$.
:::` },
    ],
    ozet: [
      "Fonksiyon her girdiye tek bir çıktı atar; tanım kümesi izin verilen girdilerdir (iktisatta genellikle Q ≥ 0).",
      "Üs kuralları: aᵐaⁿ = aᵐ⁺ⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁻ⁿ = 1/aⁿ, a^(1/n) = ⁿ√a.",
      "Eğim = Δy/Δx: ortalama değişim hızı; türevin temeli.",
      "Arz–talep grafiğinde fiyat dikey eksendedir; grafiği doğrudan veren ters talep fonksiyonu P = f(Q)'dur.",
      "Sık hatalar: (a+b)² ≠ a² + b², √(a+b) ≠ √a + √b, −x² ≠ (−x)².",
    ],
    terimler: [
      ["function","fonksiyon","A rule that assigns exactly one output to each input."],
      ["variable","değişken","A symbol that can take different values."],
      ["domain","tanım kümesi","The set of all permissible inputs of a function."],
      ["range","değer kümesi","The set of all possible outputs of a function."],
      ["slope","eğim","The change in y divided by the change in x along a line or between two points."],
      ["exponent","üs","The power to which a number is raised."],
      ["intercept","eksen kesişimi","The point where a graph crosses an axis."],
    ],
    quiz: [
      {"s":"If $f(x) = 3x^2 - 2x + 1$, then $f(2)$ equals:","c":["9","13","5","11"],"d":0,"a":"3·4 − 4 + 1 = 9."},
      {"s":"The domain of $f(x) = \\sqrt{x - 4}$ is:","c":["$x > 4$","$x \\ge 4$","$x \\ge 0$","all real numbers"],"d":1,"a":"Kökün içi negatif olamaz: x − 4 ≥ 0 → x ≥ 4."},
      {"s":"The domain of $f(x) = \\ln(x + 2)$ is:","c":["$x > -2$","$x \\ge -2$","$x > 0$","$x > 2$"],"d":0,"a":"ln yalnız pozitif sayılarda tanımlı: x + 2 > 0."},
      {"s":"$x^3 \\cdot x^5$ simplifies to:","c":["$x^{15}$","$x^8$","$2x^8$","$x^2$"],"d":1,"a":"Aynı tabanlı çarpımda üsler toplanır: 3 + 5 = 8."},
      {"s":"$(x^2)^3$ equals:","c":["$x^5$","$x^6$","$x^8$","$3x^2$"],"d":1,"a":"Kuvvetin kuvvetinde üsler çarpılır: 2 · 3 = 6."},
      {"s":"$\\dfrac{5}{\\sqrt{x}}$ written in power form is:","c":["$5x^{1/2}$","$5x^{-1/2}$","$5x^{-2}$","$\\dfrac{x^{1/2}}{5}$"],"d":1,"a":"√x = x^(1/2); paydadaki üs eksiye döner: 5x^(−1/2). Türev ve integralde çok işe yarar."},
      {"s":"The slope of the line through $(1, 2)$ and $(4, 11)$ is:","c":["9","3","1/3","−3"],"d":1,"a":"(11 − 2)/(4 − 1) = 9/3 = 3."},
      {"s":"$(a + b)^2$ equals:","c":["$a^2 + b^2$","$a^2 + 2ab + b^2$","$2a + 2b$","$a^2 - 2ab + b^2$"],"d":1,"a":"(a + b)(a + b) = a² + 2ab + b². En sık yapılan hata a² + b² yazmaktır."},
      {"s":"$8^{2/3}$ equals:","c":["4","16/3","2","64"],"d":0,"a":"8^(1/3) = 2, karesi 4."},
      {"s":"On a standard supply–demand graph (price on the vertical axis), the function drawn directly is:","c":["$Q = f(P)$","the inverse demand function $P = f(Q)$","$TR = PQ$","$P = Q$"],"d":1,"a":"Marshall geleneğinde fiyat dikey eksende; grafiği doğrudan veren ters talep fonksiyonudur."},
    ],
  });
})();
