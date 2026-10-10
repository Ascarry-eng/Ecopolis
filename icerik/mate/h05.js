// Mathematics I — 5. hafta: Faiz: basit, bileşik, sürekli
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h05",
    hedefler: [
      "Basit, bileşik ve sürekli faizle gelecek değeri hesaplamak",
      "Bugünkü değeri (iskonto) hesaplamak",
      "Nominal faizi efektif yıllık faize çevirmek",
      "Fisher denklemiyle reel faizi kesin ve yaklaşık hesaplamak",
      "Dönem faizi ve dönem sayısını doğru eşleştirmek",
    ],
    bolumler: [
      { baslik: "Paranın zaman değeri", md: R`Paranın zaman değeri: bugünkü 1 TL, gelecekteki 1 TL'den değerlidir çünkü faize yatırılabilir. Faiz yalnız anaparaya işliyorsa BASİT, faiz de faiz kazanıyorsa BİLEŞİK faizdir.` },
      { baslik: "Formüller", md: R`> $$\text{Basit: } FV = P(1 + rt)$$

> $$\text{Bileşik (yılda } m \text{ kez): } FV = P\left(1 + \frac{r}{m}\right)^{mt}$$

> $$\text{Sürekli: } FV = Pe^{rt}$$

> $$\text{Bugünkü değer: } PV = \frac{FV}{(1+i)^n},\qquad PV = FV\,e^{-rt}$$

> $$\text{Efektif yıllık faiz: } r_{ef} = \left(1 + \frac{r}{m}\right)^m - 1,\qquad r_{ef} = e^r - 1$$

$r$ yıllık NOMİNAL faiz, $m$ yıldaki bileşik sayısı, $t$ yıl, $i = r/m$ dönem faizi, $n = mt$ dönem sayısı.

{{faiz}}` },
      { baslik: "İktisatta", md: R`- **İskonto:** gelecekteki bir ödemenin bugünkü değeri. Tahvil fiyatı ve yatırım kararları hep bunun üstüne kurulur.
- **Nominal ve reel faiz (Fisher):** enflasyon $\pi$ iken $1 + r_{reel} = \dfrac{1 + r_{nom}}{1 + \pi}$; küçük değerlerde $r_{reel} \approx r_{nom} - \pi$. Yüksek enflasyonda yaklaşık formül ciddi sapar — kesin formülü kullan.
- **Aylık faiz ilanı:** aylık %3, yıllık efektif $(1.03)^{12} - 1 \approx \%42.6$ eder; yıllık %36 değil.` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
10 000 TL, yıllık nominal %12, 3 yıl:
- Basit: $10000(1 + 0.36) = 13\,600$
- Yıllık bileşik: $10000(1.12)^3 = 14\,049.28$
- Aylık bileşik: $10000(1.01)^{36} = 14\,307.69$
- Sürekli: $10000\,e^{0.36} = 14\,333.29$

Bileşik sayısı arttıkça sonuç büyür ama sürekli bileşik sınırını aşamaz.
:::

:::dikkat Sık yapılan hatalar
- Aylık bileşikte yıllık faizi 12'ye bölmeyi ya da süreyi 12 ile çarpmayı unutmak.
- Yüzdeyi ondalığa çevirmemek (%12 → 0.12).
- Bugünkü değerde üssün işaretini karıştırmak: pozitif faizde PV her zaman FV'den küçüktür.
:::` },
    ],
    ozet: [
      "Basit: FV = P(1 + rt); bileşik: FV = P(1 + r/m)^(mt); sürekli: FV = Pe^(rt).",
      "Bugünkü değer: PV = FV/(1 + i)ⁿ; sürekli PV = FV·e^(−rt).",
      "Efektif faiz: (1 + r/m)ᵐ − 1; sürekli eʳ − 1. Aylık %3 ≈ yıllık efektif %42.6.",
      "Fisher: 1 + r_reel = (1 + r_nom)/(1 + π); yüksek enflasyonda yaklaşık formül sapar.",
      "Bileşik sayısı arttıkça FV büyür ama Pe^(rt) sınırını aşamaz.",
    ],
    terimler: [
      ["simple / compound interest","basit / bileşik faiz","Simple interest is paid on principal only; compound interest is also paid on accumulated interest."],
      ["principal","anapara","The original amount invested or borrowed."],
      ["future value","gelecek değer","The value of a sum at a future date, including interest."],
      ["present value","bugünkü değer","The current value of a future sum, discounted at the interest rate."],
      ["discounting","iskonto","Converting future values into present values."],
      ["effective annual rate","efektif yıllık faiz","The annual rate that gives the same result as the nominal rate with its compounding frequency."],
      ["continuous compounding","sürekli bileşik faiz","Compounding infinitely many times per period: FV = Pe^(rt)."],
      ["nominal / real interest rate","nominal / reel faiz","The nominal rate is in money terms; the real rate is adjusted for inflation."],
    ],
    quiz: [
      {"s":"10,000 TL at 12% simple interest for 3 years grows to:","c":["13,600","14,049.28","14,307.69","11,200"],"d":0,"a":"10000(1 + 0.12·3) = 13,600."},
      {"s":"10,000 TL at 12% compounded annually for 3 years grows to:","c":["13,600","14,049.28","14,333.29","13,000"],"d":1,"a":"10000(1.12)³ = 14,049.28."},
      {"s":"The effective annual rate of 12% nominal compounded monthly is about:","c":["12.00%","12.68%","13.00%","144%"],"d":1,"a":"(1.01)¹² − 1 ≈ 0.1268."},
      {"s":"10,000 TL at 12% compounded continuously for 3 years grows to:","c":["14,049.28","14,307.69","14,333.29","13,600"],"d":2,"a":"10000·e^0.36 ≈ 14,333.29."},
      {"s":"The present value of 11,000 TL due in one year at 10% is:","c":["9,900","10,000","12,100","11,000"],"d":1,"a":"11000/1.1 = 10,000."},
      {"s":"Nominal interest is 50% and inflation is 40%. The exact real interest rate is about:","c":["10%","7.14%","3.5%","90%"],"d":1,"a":"1.5/1.4 − 1 ≈ 0.0714. Yaklaşık formül (%10) yüksek enflasyonda yanıltır."},
      {"s":"A loan advertised at 3% per month has an effective annual rate of about:","c":["36%","39%","42.6%","3%"],"d":2,"a":"(1.03)¹² − 1 ≈ 0.426."},
      {"s":"As the number of compounding periods per year increases, the future value:","c":["Decreases","Increases without bound","Increases toward $Pe^{rt}$","Stays the same"],"d":2,"a":"lim (1 + r/m)^(m) = eʳ: sürekli bileşik bir üst sınırdır."},
      {"s":"With a positive interest rate, the present value of a future amount is:","c":["Greater than the future value","Less than the future value","Equal to the future value","Negative"],"d":1,"a":"İskonto her zaman küçültür."},
      {"s":"The future value with continuous compounding is:","c":["$P(1 + rt)$","$P(1 + r)^t$","$Pe^{rt}$","$P/(1 + r)^t$"],"d":2,"a":"Sürekli bileşik: FV = Pe^(rt)."},
    ],
  });
})();
