// Mathematics I — 4. hafta: Üstel fonksiyon ve logaritma
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h04",
    hedefler: [
      "Üstel ve logaritmik fonksiyonların ilişkisini (ters fonksiyon) açıklamak",
      "Logaritma kurallarını uygulamak ve taban değiştirmek",
      "Bilinmeyeni üste olan denklemleri logaritmayla çözmek",
      "Bileşik büyüme, sürekli büyüme ve katlanma süresini hesaplamak",
      "Log farkının yüzde değişime yaklaşık eşit olduğunu kullanmak",
    ],
    bolumler: [
      { baslik: "Üstel fonksiyon ve logaritma", md: R`Üstel fonksiyon $f(x) = a^x$ ($a > 0$, $a \ne 1$): değişken ÜSTTEDİR. Sabit ORANLA büyüyen her şey üsteldir: bileşik faiz, nüfus, enflasyonla fiyatlar. Logaritma üstelin tersidir: "$b$'yi kaçıncı kuvvete yükseltirsem $x$ olur?"

> $$\log_b x = y \iff b^y = x$$

$e \approx 2.71828$ doğal tabandır, $\ln x = \log_e x$. Hesap makinesinde **ln doğal**, **log 10 tabanlıdır**.` },
      { baslik: "Kurallar", md: R`> $$\ln(xy) = \ln x + \ln y,\qquad \ln\frac{x}{y} = \ln x - \ln y,\qquad \ln x^n = n\ln x$$

> $$\ln e = 1,\quad \ln 1 = 0,\quad e^{\ln x} = x,\quad \log_b x = \frac{\ln x}{\ln b}$$

$\ln$ yalnız POZİTİF sayılar için tanımlıdır ve $\ln(x + y) \ne \ln x + \ln y$.` },
      { baslik: "Üstel denklem çözmek", md: R`Bilinmeyen üstteyse iki tarafın logaritmasını al:

> $$a\,b^x = c \;\Rightarrow\; x = \frac{\ln(c/a)}{\ln b}$$` },
      { baslik: "İktisatta", md: R`- **Bileşik büyüme:** $y_t = y_0(1+g)^t$; sürekli büyüme: $y_t = y_0 e^{kt}$.
- **Logaritmik fark ≈ yüzde değişim:** küçük değişimlerde $\ln y_2 - \ln y_1 \approx \dfrac{y_2 - y_1}{y_1}$. İktisatçıların log ölçeği sevmesinin nedeni bu.
- **Katlanma süresi:** $t = \dfrac{\ln 2}{\ln(1+g)} \approx \dfrac{70}{\%g}$ (70 kuralı).

{{ustel}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
**Soru:** %8 yıllık bileşik faizle 1000 TL kaç yılda 2000 TL olur?

$1000(1.08)^t = 2000 \Rightarrow (1.08)^t = 2 \Rightarrow t = \dfrac{\ln 2}{\ln 1.08} = \dfrac{0.6931}{0.07696} \approx 9.01$ yıl. (70 kuralı: $70/8 = 8.75$.)
:::

:::dikkat Sık yapılan hatalar
- $\ln(x+y)$'yi parçalamak.
- log tuşuyla ln tuşunu karıştırmak: sonuçlar yaklaşık 2.3 kat farklı çıkar.
- $e^{x+y}$ yerine $e^x + e^y$ yazmak; doğrusu $e^x e^y$.
:::` },
    ],
    ozet: [
      "log_b x = y ⇔ bʸ = x; ln = log_e, e ≈ 2.71828.",
      "ln(xy) = ln x + ln y; ln(x/y) = ln x − ln y; ln xⁿ = n ln x; ln(x + y) parçalanamaz.",
      "a·bˣ = c ⇒ x = ln(c/a)/ln b.",
      "Büyüme: y_t = y₀(1+g)ᵗ; sürekli y₀e^(kt); katlanma t = ln2/ln(1+g) ≈ 70/g.",
      "Küçük değişimlerde ln y₂ − ln y₁ ≈ yüzde değişim.",
    ],
    terimler: [
      ["exponential function","üstel fonksiyon","A function in which the variable appears in the exponent, f(x) = aˣ."],
      ["logarithm","logaritma","The power to which a base must be raised to obtain a number."],
      ["natural logarithm","doğal logaritma","The logarithm with base e, written ln."],
      ["base","taban","The number being raised to a power."],
      ["growth / decay","büyüme / azalma","Increase or decrease at a constant percentage rate."],
      ["doubling time","katlanma süresi","The time it takes for a quantity growing at a constant rate to double."],
    ],
    quiz: [
      {"s":"$\\ln(e^3)$ equals:","c":["3","e","$e^3$","1/3"],"d":0,"a":"ln ile e üssü birbirinin tersi: ln(e³) = 3."},
      {"s":"$\\ln(xy)$ equals:","c":["$\\ln x \\cdot \\ln y$","$\\ln x + \\ln y$","$\\ln(x + y)$","$x \\ln y$"],"d":1,"a":"Çarpımın logaritması logaritmaların toplamıdır."},
      {"s":"Solve $2^x = 32$:","c":["4","5","6","16"],"d":1,"a":"2⁵ = 32."},
      {"s":"Solve $e^{2x} = 10$:","c":["$x = \\ln 5$","$x = \\dfrac{\\ln 10}{2} \\approx 1.151$","$x = 5$","$x = 2\\ln 10$"],"d":1,"a":"2x = ln 10 → x = ln10/2 ≈ 1.151."},
      {"s":"Using the rule of 70, a variable growing at 7% per year doubles in about:","c":["7 years","10 years","14 years","70 years"],"d":1,"a":"70 / 7 = 10 yıl."},
      {"s":"At 8% annual compound interest, 1000 becomes 2000 in about:","c":["8.75 years","9.01 years","12.5 years","25 years"],"d":1,"a":"t = ln2/ln1.08 = 0.6931/0.07696 ≈ 9.01."},
      {"s":"$\\log_2 8$ equals:","c":["2","3","4","8"],"d":1,"a":"2³ = 8."},
      {"s":"Which identity is FALSE?","c":["$\\ln(x/y) = \\ln x - \\ln y$","$\\ln x^n = n \\ln x$","$\\ln(x + y) = \\ln x + \\ln y$","$e^{\\ln x} = x$"],"d":2,"a":"Toplamın logaritması parçalanmaz."},
      {"s":"$\\log_3 20$ can be computed on a calculator as:","c":["$\\ln 20 \\cdot \\ln 3$","$\\dfrac{\\ln 20}{\\ln 3}$","$\\dfrac{\\ln 3}{\\ln 20}$","$\\ln 60$"],"d":1,"a":"Taban değiştirme: log_b x = ln x / ln b."},
      {"s":"For small changes, $\\ln y_2 - \\ln y_1$ is approximately:","c":["$y_2 - y_1$","the percentage change from $y_1$ to $y_2$","$y_2 / y_1$","zero"],"d":1,"a":"Log farkı ≈ yüzde değişim; iktisatçıların log ölçeği sevmesinin nedeni."},
    ],
  });
})();
