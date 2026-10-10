// Mathematics I — 7. hafta: Büyüme ve yatırım değerlendirme
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h07",
    hedefler: [
      "Bileşik ortalama büyüme oranını ve sürekli büyüme oranını hesaplamak",
      "Aritmetik ortalamanın bileşik büyümeyi neden abarttığını açıklamak",
      "Net bugünkü değeri hesaplamak ve yatırım kararı vermek",
      "İç verim oranını tanımlamak ve NBD kuralıyla ilişkilendirmek",
      "İskonto oranını fırsat maliyeti olarak yorumlamak",
    ],
    bolumler: [
      { baslik: "Büyüme ve yatırım: iki akraba soru", md: R`Akraba iki soru: (1) Bir büyüklük ortalama ne hızla büyüdü? (2) Gelecekte nakit getiren bir yatırım bugün yapılmaya değer mi?` },
      { baslik: "Büyüme oranları", md: R`> $$\text{Bileşik ortalama: } g = \left(\frac{y_n}{y_0}\right)^{1/n} - 1$$

> $$\text{Sürekli: } k = \frac{\ln(y_n/y_0)}{n},\qquad \text{katlanma: } t = \frac{\ln 2}{\ln(1+g)}$$

Toplam değişimi yıl sayısına bölmek (aritmetik ortalama) bileşik büyümeyi abartır.` },
      { baslik: "Net bugünkü değer ve iç verim oranı", md: R`> $$NBD = \sum_{t=0}^{n}\frac{CF_t}{(1+r)^t} = CF_0 + \frac{CF_1}{1+r} + \frac{CF_2}{(1+r)^2} + \dots$$

- $CF_0$ genelde negatiftir (yatırım). $r$ iskonto oranı: paranın başka yerdeki getirisi, yani fırsat maliyeti.
- **Karar:** NBD > 0 ise yatırım yapılır.
- **İç verim oranı:** NBD'yi sıfır yapan $r$. IRR > r ise yatırım yapılır. Akışlar birden fazla kez işaret değiştirirse birden çok IRR olabilir; o zaman NBD'ye güven.

{{nbd}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
Yatırım 1000; sonraki üç yıl 300, 400, 500; $r = \%10$.

$NBD = -1000 + \dfrac{300}{1.1} + \dfrac{400}{1.21} + \dfrac{500}{1.331} = -1000 + 272.73 + 330.58 + 375.66 = -21.04$

NBD < 0, yapılmamalı. IRR ≈ %8.90 < %10, aynı karar.

**Büyüme:** GSYH 5 yılda 1000'den 1500'e çıktıysa $g = 1.5^{1/5} - 1 \approx \%8.45$. Aritmetik ortalama %10 der — yanlış.
:::

:::dikkat Sık yapılan hatalar
- $CF_0$'ı iskontolamak ($t = 0$'da çarpan 1'dir).
- Yıllık oranla aylık akışları iskontolamak.
- Reel akışları nominal faizle iskontolamak: ikisi aynı türden olmalı.
:::` },
    ],
    ozet: [
      "Bileşik ortalama büyüme: g = (yₙ/y₀)^(1/n) − 1; sürekli k = ln(yₙ/y₀)/n.",
      "Aritmetik ortalama bileşik büyümeyi abartır.",
      "NBD = Σ CF_t/(1 + r)ᵗ; CF₀ iskontolanmaz. NBD > 0 ise yatırım yap.",
      "İVO, NBD'yi sıfır yapan orandır; İVO > r ise kabul. Akış birden çok kez işaret değiştirirse NBD'ye güven.",
      "İskonto oranı paranın başka yerdeki getirisi, yani fırsat maliyetidir.",
    ],
    terimler: [
      ["growth rate","büyüme oranı","The percentage change of a variable per period."],
      ["compound annual growth rate","bileşik yıllık büyüme oranı","The constant annual rate that takes a value from its start to its end over n years."],
      ["net present value","net bugünkü değer","The sum of discounted cash flows, including the initial investment."],
      ["internal rate of return","iç verim oranı","The discount rate at which net present value equals zero."],
      ["cash flow","nakit akışı","Money received or paid at a given time."],
      ["discount rate","iskonto oranı","The rate used to convert future cash flows to present values."],
      ["opportunity cost","fırsat maliyeti","The return on the next-best alternative use of funds."],
    ],
    quiz: [
      {"s":"GDP rises from 1000 to 1500 over 5 years. The compound annual growth rate is about:","c":["10%","8.45%","50%","7%"],"d":1,"a":"1.5^(1/5) − 1 ≈ 0.0845; aritmetik ortalama (%10) abartır."},
      {"s":"Cash flows −1000, 300, 400, 500 at a 10% discount rate give an NPV of about:","c":["+200","−21.04","+21.04","0"],"d":1,"a":"−1000 + 272.73 + 330.58 + 375.66 ≈ −21.04."},
      {"s":"The NPV decision rule is to invest if:","c":["NPV < 0","NPV > 0","IRR < r","Cash flows are positive"],"d":1,"a":"Bugünkü değer cinsinden kazanç pozitifse yatırım yapılır."},
      {"s":"The internal rate of return is the discount rate that:","c":["Maximizes NPV","Makes NPV equal to zero","Equals the inflation rate","Equals the growth rate"],"d":1,"a":"İVO'da NBD = 0."},
      {"s":"A project has an IRR of 12% and the cost of funds is 10%. The project should be:","c":["Rejected","Accepted","Delayed","It cannot be decided"],"d":1,"a":"İVO > r → NBD > 0 → kabul."},
      {"s":"Dividing total growth by the number of years (arithmetic average) tends to:","c":["Understate compound growth","Overstate compound growth","Equal compound growth","Give a negative rate"],"d":1,"a":"Bileşik etki yüzünden aritmetik ortalama gerçek yıllık büyümeyi abartır."},
      {"s":"In an NPV calculation, the initial cash flow $CF_0$ is:","c":["Discounted by (1 + r)","Not discounted (factor of 1)","Ignored","Multiplied by r"],"d":1,"a":"t = 0'da (1 + r)⁰ = 1."},
      {"s":"A variable doubles from 100 to 200 in 10 years. Its continuous growth rate is about:","c":["10%","6.93%","7.18%","20%"],"d":1,"a":"k = ln2/10 ≈ 0.0693."},
      {"s":"If a project's cash flows change sign more than once, you should rely on:","c":["The IRR only","The NPV","The payback period","The growth rate"],"d":1,"a":"Birden çok İVO olabilir; NBD kuralı güvenilirdir."},
      {"s":"The discount rate in an NPV calculation represents:","c":["The inflation rate only","The opportunity cost of funds","The tax rate","The growth rate of sales"],"d":1,"a":"Paranın en iyi alternatif kullanımdaki getirisi."},
    ],
  });
})();
