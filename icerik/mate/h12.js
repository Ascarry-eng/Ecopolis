// Mathematics I — 12. hafta: İntegral
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h12",
    hedefler: [
      "İlkel fonksiyonu bulmak ve integral sabitinin anlamını açıklamak",
      "Kuvvet, 1/x, üstel integral kurallarını uygulamak",
      "Değişken değiştirme ve kısmi integrasyon tekniklerini kullanmak",
      "Belirli integrali analizin temel teoremiyle hesaplamak",
      "Has olmayan integrali ve negatif alanları yorumlamak",
    ],
    bolumler: [
      { baslik: "Türevin tersi, eğrinin altı", md: R`İntegral türevin tersidir (ilkel fonksiyon) ve aynı zamanda eğri altındaki alandır. Marjinalden toplama dönmek için kullanılır.` },
      { baslik: "Belirsiz integral kuralları", md: R`> $$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C \qquad (n \ne -1)$$

> $$\int \frac{1}{x}\,dx = \ln|x| + C,\qquad \int e^{kx}\,dx = \frac{e^{kx}}{k} + C,\qquad \int a^x\,dx = \frac{a^x}{\ln a} + C$$

> $$\int [f \pm g]\,dx = \int f\,dx \pm \int g\,dx,\qquad \int cf\,dx = c\int f\,dx$$

$C$ integral sabitidir: sabitin türevi 0 olduğundan ilkel fonksiyon ancak bir sabite kadar belirlidir.` },
      { baslik: "Teknikler", md: R`- **Yerine koyma:** $\int f(g(x))\,g'(x)\,dx$ için $u = g(x)$. Örnek: $\int 2x(x^2 + 1)^5\,dx$, $u = x^2 + 1$ ile $\dfrac{(x^2 + 1)^6}{6} + C$.
- **Kısmi integral:** $\int u\,dv = uv - \int v\,du$. Örnek: $\int xe^x\,dx = xe^x - e^x + C$.` },
      { baslik: "Belirli integral", md: R`> $$\int_a^b f(x)\,dx = F(b) - F(a)$$

Eğri x ekseninin altındaysa integral negatif çıkar; toplam ALAN için $|f|$'nin integrali alınır.

{{riemann}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$\displaystyle\int_0^2 (3x^2 - 4x + 5)\,dx = \Big[x^3 - 2x^2 + 5x\Big]_0^2 = (8 - 8 + 10) - 0 = 10$

$\displaystyle\int_0^{\infty} 100e^{-0.05t}\,dt = \Big[-2000e^{-0.05t}\Big]_0^{\infty} = 0 - (-2000) = 2000$ (has olmayan integral).
:::

:::dikkat Sık yapılan hatalar
- Belirsiz integralde $C$'yi unutmak.
- $\int x^{-1}dx$'e kuvvet kuralını uygulamak: $\frac{x^0}{0}$ tanımsızdır, doğrusu $\ln|x|$.
- $\int e^{3x}dx = e^{3x}$ yazmak; doğrusu $\dfrac{e^{3x}}{3}$.
- Çarpımın integralini integrallerin çarpımı sanmak.
:::` },
    ],
    ozet: [
      "∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1); ∫(1/x)dx = ln|x| + C; ∫e^(kx)dx = e^(kx)/k + C.",
      "C integral sabitidir: sabitin türevi 0.",
      "Yerine koyma: u = g(x); kısmi: ∫u dv = uv − ∫v du.",
      "∫ₐᵇ f dx = F(b) − F(a); eksenin altındaki alan negatif sayılır.",
      "Has olmayan integral: ∫₀^∞ 100e^(−0.05t)dt = 2000.",
    ],
    terimler: [
      ["integral","integral","The antiderivative of a function; also the area under its curve."],
      ["antiderivative","ilkel fonksiyon","A function whose derivative is the given function."],
      ["indefinite / definite integral","belirsiz / belirli integral","Indefinite: the family of antiderivatives (+C); definite: a number, F(b) − F(a)."],
      ["constant of integration","integral sabiti","The arbitrary constant C added to an antiderivative."],
      ["integration by substitution","değişken değiştirme (yerine koyma)","Changing variables u = g(x) to simplify an integral."],
      ["integration by parts","kısmi integrasyon","∫u dv = uv − ∫v du."],
      ["fundamental theorem of calculus","analizin temel teoremi","The definite integral of f from a to b equals F(b) − F(a)."],
      ["improper integral","has olmayan integral","An integral with an infinite limit or an unbounded integrand."],
    ],
    quiz: [
      {"s":"$\\int x^4\\,dx$ equals:","c":["$4x^3 + C$","$\\dfrac{x^5}{5} + C$","$x^5 + C$","$\\dfrac{x^4}{4} + C$"],"d":1,"a":"Kuvvet kuralı: üssü bir artır, yeni üsse böl."},
      {"s":"$\\int \\dfrac{1}{x}\\,dx$ equals:","c":["$\\dfrac{x^0}{0} + C$","$\\ln|x| + C$","$-\\dfrac{1}{x^2} + C$","$x + C$"],"d":1,"a":"n = −1 istisnası: ln|x| + C."},
      {"s":"$\\int e^{3x}\\,dx$ equals:","c":["$e^{3x} + C$","$\\dfrac{e^{3x}}{3} + C$","$3e^{3x} + C$","$\\dfrac{e^{x}}{3} + C$"],"d":1,"a":"∫e^(kx)dx = e^(kx)/k + C."},
      {"s":"$\\int_0^2 (3x^2 - 4x + 5)\\,dx$ equals:","c":["10","12","8","14"],"d":0,"a":"[x³ − 2x² + 5x]₀² = 8 − 8 + 10 = 10."},
      {"s":"$\\int 2x(x^2 + 1)^5\\,dx$ equals:","c":["$\\dfrac{(x^2 + 1)^6}{6} + C$","$(x^2 + 1)^6 + C$","$\\dfrac{(x^2+1)^6}{3} + C$","$10x(x^2+1)^4 + C$"],"d":0,"a":"u = x² + 1, du = 2x dx: ∫u⁵du = u⁶/6."},
      {"s":"$\\int xe^x\\,dx$ equals:","c":["$xe^x + C$","$xe^x - e^x + C$","$\\dfrac{x^2}{2}e^x + C$","$e^x + C$"],"d":1,"a":"Kısmi integral: u = x, dv = eˣdx → xeˣ − ∫eˣdx."},
      {"s":"$\\int_0^{\\infty} 100e^{-0.05t}\\,dt$ equals:","c":["100","500","2000","∞"],"d":2,"a":"[−2000e^(−0.05t)]₀^∞ = 0 − (−2000) = 2000."},
      {"s":"The fundamental theorem of calculus states that $\\int_a^b f(x)\\,dx$ equals:","c":["$f(b) - f(a)$","$F(b) - F(a)$ where $F' = f$","$F(a) - F(b)$","$f'(b) - f'(a)$"],"d":1,"a":"Belirli integral ilkel fonksiyonun uç değerleri farkıdır."},
      {"s":"$\\int_1^{e} \\dfrac{1}{x}\\,dx$ equals:","c":["0","1","e","e − 1"],"d":1,"a":"ln e − ln 1 = 1 − 0 = 1."},
      {"s":"We add the constant $C$ to an indefinite integral because:","c":["Integrals are always positive","The derivative of any constant is zero, so antiderivatives are determined only up to a constant","C equals the area","It is required by the power rule only"],"d":1,"a":"Sabitin türevi sıfır olduğundan ilkel fonksiyon bir sabite kadar belirlidir."},
    ],
  });
})();
