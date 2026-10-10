// Mathematics I — 14. hafta: Toplam fonksiyon ve akımlar
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h14",
    hedefler: [
      "Marjinal fonksiyondan toplam fonksiyonu başlangıç koşuluyla elde etmek",
      "Belirli integralle toplamdaki değişimi hesaplamak",
      "Stok ve akım ilişkisini (sermaye birikimi) kurmak",
      "Sürekli gelir akışının bugünkü ve gelecek değerini hesaplamak",
      "Bir fonksiyonun ortalama değerini bulmak",
    ],
    bolumler: [
      { baslik: "Marjinalden toplama", md: R`Marjinal biliniyorsa toplam, integralle geri kurulur. Zamana yayılmış akımların (gelir, yatırım) birikimi ve bugünkü değeri de integralle hesaplanır.` },
      { baslik: "Marjinalden toplama", md: R`> $$TC(Q) = \int MC(Q)\,dQ + C,\qquad C = TC(0) = FC$$

> $$TC(Q_2) - TC(Q_1) = \int_{Q_1}^{Q_2} MC(Q)\,dQ$$

Aynı mantıkla $TR = \int MR\,dQ$ (sabit 0'dır çünkü $TR(0) = 0$) ve tüketim fonksiyonu $C(Y) = \int MPC\,dY + C_0$.` },
      { baslik: "Stok ve akım", md: R`Sermaye stoku, net yatırım akımının birikimidir: $K(t) = K(0) + \displaystyle\int_0^t I(s)\,ds$.` },
      { baslik: "Gelir akışının değeri", md: R`Sürekli gelen $R(t)$ geliri, sürekli faiz $r$ ile:

> $$PV = \int_0^T R(t)\,e^{-rt}\,dt,\qquad FV = e^{rT}\cdot PV$$

> $$\text{Sabit akış: } PV = R\,\frac{1 - e^{-rT}}{r} \;\xrightarrow{\;T \to \infty\;}\; \frac{R}{r}$$

{{gelir-akisi}}` },
      { baslik: "Ortalama değer", md: R`$[a, b]$ aralığında $f$'nin ortalaması: $\bar f = \dfrac{1}{b - a}\displaystyle\int_a^b f(x)\,dx$.` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$MC = 3Q^2 - 12Q + 20$, $FC = 50$: $TC(Q) = Q^3 - 6Q^2 + 20Q + 50$.

Üretimi 2'den 5'e çıkarmanın ek maliyeti: $\displaystyle\int_2^5 MC\,dQ = TC(5) - TC(2) = 125 - 74 = 51$.

Yıllık 1000 TL'lik sonsuz akış, %8: $PV = 1000/0.08 = 12\,500$.
:::

:::dikkat Sık yapılan hatalar
- Başlangıç koşulunu kullanmayıp $C$'yi açık bırakmak.
- Değişimi bulmak için sabit maliyete gerek olmadığını unutmak: $\int_{Q_1}^{Q_2}$'de $C$ sadeleşir.
- Akış hesabında $e^{-rt}$ yerine $e^{rt}$ yazmak.
:::` },
    ],
    ozet: [
      "TC(Q) = ∫MC dQ + C, C = FC; TR = ∫MR dQ (sabit 0).",
      "TC(Q₂) − TC(Q₁) = ∫_{Q₁}^{Q₂} MC dQ (sabit sadeleşir).",
      "Stok = başlangıç + akımın integrali: K(t) = K(0) + ∫₀ᵗ I(s)ds.",
      "PV = ∫₀ᵀ R(t)e^(−rt)dt; sabit akışta R(1 − e^(−rT))/r → R/r.",
      "Ortalama değer: (1/(b − a))∫ₐᵇ f(x)dx.",
    ],
    terimler: [
      ["total cost function","toplam maliyet fonksiyonu","The function giving total cost at each output; the integral of marginal cost plus fixed cost."],
      ["initial condition","başlangıç koşulu","A known value of a function used to determine the constant of integration."],
      ["stock / flow","stok / akım","A stock is measured at a point in time; a flow is measured per unit of time."],
      ["capital accumulation","sermaye birikimi","The growth of the capital stock through net investment."],
      ["income stream","gelir akışı","A flow of income received over time."],
      ["average value","ortalama değer","The integral of a function over an interval divided by the interval's length."],
    ],
    quiz: [
      {"s":"$MC = 3Q^2 - 12Q + 20$ and fixed cost is 50. Total cost is:","c":["$Q^3 - 6Q^2 + 20Q + 50$","$6Q - 12$","$Q^3 - 6Q^2 + 20Q$","$3Q^3 - 12Q^2 + 20Q + 50$"],"d":0,"a":"İntegral al ve C = FC = 50 koy."},
      {"s":"With $MC = 3Q^2 - 12Q + 20$, the additional cost of raising output from 2 to 5 is:","c":["51","74","125","175"],"d":0,"a":"TC(5) − TC(2) = 125 − 74 = 51."},
      {"s":"If $MR = 100 - 4Q$, total revenue is:","c":["$100Q - 2Q^2$","$100Q - 4Q^2$","$-4$","$100 - 2Q^2$"],"d":0,"a":"∫MR dQ = 100Q − 2Q² (TR(0) = 0 olduğundan sabit 0)."},
      {"s":"The present value of 1,000 TL per year forever at 8% is:","c":["8,000","12,500","80,000","1,080"],"d":1,"a":"PV = R/r = 1000/0.08 = 12,500."},
      {"s":"The present value of a constant continuous stream $R = 1000$ for 10 years at $r = 10\\%$ is about:","c":["10,000","6,321","3,679","1,000"],"d":1,"a":"1000(1 − e^(−1))/0.1 ≈ 6,321."},
      {"s":"Net investment is constant at 50 per year and the initial capital stock is 1000. After 4 years the stock is:","c":["1050","1200","4000","1500"],"d":1,"a":"K(4) = 1000 + ∫₀⁴50dt = 1200."},
      {"s":"The average value of $f(x) = x^2$ on $[0, 3]$ is:","c":["9","3","4.5","1"],"d":1,"a":"(1/3)∫₀³x²dx = (1/3)·9 = 3."},
      {"s":"If $MPC = 0.6$ and autonomous consumption is 100, the consumption function is:","c":["$C = 0.6Y$","$C = 100 + 0.6Y$","$C = 100Y + 0.6$","$C = 60 + Y$"],"d":1,"a":"C(Y) = ∫0.6 dY + C₀ = 100 + 0.6Y."},
      {"s":"When recovering total cost from marginal cost, the constant of integration equals:","c":["Variable cost","Fixed cost","Marginal revenue","Zero always"],"d":1,"a":"TC(0) = FC."},
      {"s":"The future value of a continuous income stream is obtained from its present value by:","c":["Dividing by $e^{rT}$","Multiplying by $e^{rT}$","Adding $rT$","Taking the logarithm"],"d":1,"a":"FV = e^(rT) · PV."},
    ],
  });
})();
