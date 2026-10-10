// Mathematics I — 9. hafta: Türev ve türev alma kuralları
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h09",
    hedefler: [
      "Türevi limit olarak tanımlamak ve geometrik anlamını (teğet eğimi) açıklamak",
      "Kuvvet, çarpım, bölüm ve zincir kurallarını uygulamak",
      "Üstel ve logaritmik fonksiyonların türevlerini almak",
      "Bir noktadaki teğet doğrusunu yazmak ve doğrusal yaklaşım yapmak",
      "Kısmi türevin anlamını bilmek",
    ],
    bolumler: [
      { baslik: "Anlık değişim hızı", md: R`Türev, ANLIK değişim hızıdır: x çok az değişince f'nin ne kadar değiştiği. Geometrik olarak, grafiğe o noktada çizilen teğetin eğimidir.

> $$f'(x) = \lim_{h \to 0}\frac{f(x+h) - f(x)}{h}$$

Gösterimler: $f'(x)$, $\dfrac{dy}{dx}$, $\dfrac{df}{dx}$. İkinci türev $f''(x)$ eğimin değişim hızıdır (eğrilik).

{{turev-teget}}` },
      { baslik: "Limit ve süreklilik", md: R`Türevin tanımı bir **limittir**, bu yüzden limit kavramını kısaca hatırlayalım.

> $$\lim_{x \to a} f(x) = L$$

"x, a'ya yaklaştıkça f(x), L'ye yaklaşır" demektir — f'nin a'daki değerinden bağımsız olarak. Limit soldan ve sağdan aynı değere yaklaşıyorsa vardır.

**Hesaplama yolları:**
- Fonksiyon a'da tanımlı ve "düzgün" ise yerine koy: $\lim_{x\to 2}(x^2 + 1) = 5$.
- $\tfrac{0}{0}$ belirsizliği çıkarsa sadeleştir: $\lim_{x\to 3}\dfrac{x^2 - 9}{x - 3} = \lim_{x\to 3}(x + 3) = 6$.
- Sonsuzda limit: $\lim_{x\to\infty}\dfrac{1}{x} = 0$. İktisatta uzun dönem davranışı ve sürekli bileşik faiz ($\lim_{m\to\infty}(1 + r/m)^m = e^r$) böyle bulunur.

**Süreklilik:** f, a'da süreklidir ⇔ $\lim_{x\to a} f(x) = f(a)$. Kabaca: grafiği kalemi kaldırmadan çizebiliyorsan süreklidir. Türevlenebilen her fonksiyon süreklidir; ama tersi doğru değildir ($|x|$, 0'da sürekli ama köşeli olduğu için türevlenemez).

:::ornek Limitten türeve
$f(x) = x^2$ için türevi tanımdan bul.
---cozum---
$$f'(x) = \lim_{h\to 0}\frac{(x+h)^2 - x^2}{h} = \lim_{h\to 0}\frac{2xh + h^2}{h} = \lim_{h\to 0}(2x + h) = 2x$$
Kuvvet kuralının söylediğiyle aynı: $(x^2)' = 2x$.
:::` },
      { baslik: "Kurallar", md: R`> $$(c)' = 0,\qquad (x^n)' = nx^{n-1},\qquad (cf)' = cf',\qquad (f \pm g)' = f' \pm g'$$

> $$\text{Çarpım: } (fg)' = f'g + fg'$$

> $$\text{Bölüm: } \left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$$

> $$\text{Zincir: } \frac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)$$

> $$(e^x)' = e^x,\quad (e^u)' = e^u u',\quad (\ln x)' = \frac{1}{x},\quad (\ln u)' = \frac{u'}{u},\quad (a^x)' = a^x \ln a$$` },
      { baslik: "Teğet doğrusu", md: R`$x_0$ noktasındaki teğet $y = f(x_0) + f'(x_0)(x - x_0)$. Yakın noktalarda fonksiyonun doğrusal yaklaşımıdır: $f(x_0 + \Delta x) \approx f(x_0) + f'(x_0)\,\Delta x$.` },
      { baslik: "Kısmi türev (önizleme)", md: R`Birden fazla değişken varsa ötekiler sabit tutulup birine göre türev alınır: $Q = 10K^{0.3}L^{0.7} \Rightarrow \dfrac{\partial Q}{\partial L} = 7K^{0.3}L^{-0.3}$.` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
**Zincir:** $f(x) = (3x^2 + 1)^4$; dış fonksiyon $u^4$, iç $u = 3x^2 + 1$.
$f'(x) = 4(3x^2 + 1)^3 \cdot 6x = 24x(3x^2 + 1)^3$.

**Çarpım:** $g(x) = x^2 e^{-x}$; $g'(x) = 2xe^{-x} - x^2e^{-x} = xe^{-x}(2 - x)$.

**Bölüm:** $h(x) = \dfrac{\ln x}{x}$; $h'(x) = \dfrac{(1/x)\,x - \ln x}{x^2} = \dfrac{1 - \ln x}{x^2}$.
:::

:::dikkat Sık yapılan hatalar
- Zincirde iç türevi unutmak: $(e^{2x})' = 2e^{2x}$.
- Çarpımın türevini türevlerin çarpımı sanmak.
- $(\ln 5)' = 1/5$ yazmak: $\ln 5$ bir sabittir, türevi 0.
- Bölüm kuralında paydaki sırayı ters yazmak.
:::` },
    ],
    ozet: [
      "f′(x) = lim (f(x+h) − f(x))/h: anlık değişim hızı, teğetin eğimi.",
      "(xⁿ)′ = nxⁿ⁻¹; (fg)′ = f′g + fg′; (f/g)′ = (f′g − fg′)/g²; zincir: f′(g(x))·g′(x).",
      "(eˣ)′ = eˣ; (eᵘ)′ = eᵘu′; (ln x)′ = 1/x; (ln u)′ = u′/u; (aˣ)′ = aˣ ln a.",
      "Teğet: y = f(x₀) + f′(x₀)(x − x₀); doğrusal yaklaşım f(x₀ + Δx) ≈ f(x₀) + f′(x₀)Δx.",
      "Kısmi türev: diğer değişkenler sabitken birine göre türev.",
    ],
    terimler: [
      ["derivative","türev","The instantaneous rate of change of a function; the slope of the tangent line."],
      ["differentiation","türev alma","The process of finding a derivative."],
      ["limit","limit","The value a function approaches as its input approaches a point."],
      ["tangent line","teğet doğrusu","A line that touches a curve at a point with the same slope as the curve there."],
      ["power / product / quotient rule","kuvvet / çarpım / bölüm kuralı","Rules for differentiating powers, products and quotients of functions."],
      ["chain rule","zincir kuralı","The derivative of f(g(x)) is f′(g(x))·g′(x)."],
      ["second derivative","ikinci türev","The derivative of the derivative; measures curvature."],
      ["partial derivative","kısmi türev","The derivative with respect to one variable, holding others constant."],
    ],
    quiz: [
      {"s":"$\\dfrac{d}{dx}(5x^4)$ equals:","c":["$20x^3$","$5x^3$","$20x^4$","$4x^5$"],"d":0,"a":"Kuvvet kuralı: 5 · 4x³ = 20x³."},
      {"s":"$\\dfrac{d}{dx}(3x^2 + 1)^4$ equals:","c":["$4(3x^2 + 1)^3$","$24x(3x^2 + 1)^3$","$12x(3x^2 + 1)^3$","$(6x)^4$"],"d":1,"a":"Zincir: 4(3x² + 1)³ · 6x = 24x(3x² + 1)³."},
      {"s":"$\\dfrac{d}{dx}e^{2x}$ equals:","c":["$e^{2x}$","$2e^{2x}$","$2xe^{2x-1}$","$e^{2}$"],"d":1,"a":"İç türev 2'yi unutma."},
      {"s":"$\\dfrac{d}{dx}\\ln(x^2 + 1)$ equals:","c":["$\\dfrac{1}{x^2 + 1}$","$\\dfrac{2x}{x^2 + 1}$","$2x\\ln(x^2+1)$","$\\dfrac{1}{2x}$"],"d":1,"a":"(ln u)′ = u′/u = 2x/(x² + 1)."},
      {"s":"$\\dfrac{d}{dx}\\left(x^2 e^{-x}\\right)$ equals:","c":["$-2xe^{-x}$","$xe^{-x}(2 - x)$","$2xe^{-x}$","$x^2e^{-x}$"],"d":1,"a":"Çarpım: 2xe^(−x) − x²e^(−x) = xe^(−x)(2 − x)."},
      {"s":"$\\dfrac{d}{dx}\\left(\\dfrac{\\ln x}{x}\\right)$ equals:","c":["$\\dfrac{1 - \\ln x}{x^2}$","$\\dfrac{\\ln x - 1}{x^2}$","$\\dfrac{1}{x^2}$","$\\dfrac{1}{x}$"],"d":0,"a":"Bölüm: ((1/x)·x − ln x)/x² = (1 − ln x)/x²."},
      {"s":"The derivative of the constant $\\ln 5$ is:","c":["1/5","0","ln 5","5"],"d":1,"a":"Sabitin türevi sıfırdır."},
      {"s":"The tangent line to $f(x) = x^2$ at $x = 3$ is:","c":["$y = 6x - 9$","$y = 6x + 9$","$y = 3x$","$y = 2x + 3$"],"d":0,"a":"f(3) = 9, f′(3) = 6: y = 9 + 6(x − 3) = 6x − 9."},
      {"s":"For $Q = 10K^{0.3}L^{0.7}$, the partial derivative $\\partial Q/\\partial L$ is:","c":["$7K^{0.3}L^{-0.3}$","$3K^{-0.7}L^{0.7}$","$10K^{0.3}$","$7K^{0.3}L^{0.7}$"],"d":0,"a":"K sabit: 10 · 0.7 · K^0.3 · L^(−0.3)."},
      {"s":"The derivative is defined as:","c":["$\\dfrac{f(x)}{x}$","$\\lim_{h\\to 0}\\dfrac{f(x+h) - f(x)}{h}$","$f(x+1) - f(x)$","$\\int f(x)\\,dx$"],"d":1,"a":"Ortalama değişimin h → 0 iken limiti."},
    ],
  });
})();
