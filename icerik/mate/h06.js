// Mathematics I — 6. hafta: Anüiteler ve kredi
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h06",
    hedefler: [
      "Anüitenin gelecek ve bugünkü değerini hesaplamak",
      "Kredi taksitini ve ödeme tablosunu çıkarmak",
      "Birikim fonu taksitini hesaplamak",
      "Perpetüitenin değerini bulmak",
      "Formüllerin geometrik dizi toplamından nasıl türediğini açıklamak",
    ],
    bolumler: [
      { baslik: "Eşit ödemeler dizisi", md: R`Anüite, eşit aralıklarla yapılan eşit ödemeler dizisidir: kira, kredi taksiti, düzenli birikim. Her ödemeyi ayrı ayrı iskontolamak yerine geometrik dizi toplamından gelen kapalı formüller kullanılır.` },
      { baslik: "Formüller (dönem sonu ödeme, dönem faizi $i$, $n$ ödeme)", md: R`> $$FV = PMT\,\frac{(1+i)^n - 1}{i}$$

> $$PV = PMT\,\frac{1 - (1+i)^{-n}}{i}$$

> $$\text{Kredi taksiti: } PMT = PV\,\frac{i}{1 - (1+i)^{-n}}$$

> $$\text{Birikim fonu: } PMT = FV\,\frac{i}{(1+i)^n - 1}$$

> $$\text{Perpetüite: } PV = \frac{PMT}{i}$$

Ödemeler DÖNEM BAŞINDA yapılıyorsa her formül $(1+i)$ ile çarpılır.

**Nereden geliyor?** $PV = \dfrac{PMT}{1+i} + \dfrac{PMT}{(1+i)^2} + \dots + \dfrac{PMT}{(1+i)^n}$ bir geometrik dizidir; $S = a\dfrac{1 - q^n}{1 - q}$ toplam formülü yukarıdaki sonucu verir.` },
      { baslik: "İktisatta", md: R`- **Kredi:** her taksitte önce kalan borcun faizi ödenir, artanı anaparayı düşürür. Bu yüzden ilk taksitlerde faiz payı büyüktür.
- **Tahvil fiyatı:** kuponların anüite değeri + vadedeki anaparanın bugünkü değeri.
- **Perpetüite:** her yıl sonsuza kadar 1000 TL ödeyen bir varlık %10 faizde 10 000 TL eder.

{{kredi}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
100 000 TL kredi, aylık %3, 12 taksit:

$$PMT = 100000\cdot\frac{0.03}{1 - 1.03^{-12}} = \frac{3000}{0.29862} \approx 10\,046.21$$

Toplam ödeme $120\,554.5$, toplam faiz $20\,554.5$. İlk ay faizi $3000$, anaparaya giden $7046.21$.
:::

:::dikkat Sık yapılan hatalar
- $n$'yi yıl, $i$'yi aylık almak: ikisi aynı DÖNEME göre olmalı.
- Dönem başı ödemede $(1+i)$ çarpanını unutmak.
- Toplam faizi "oran × anapara × süre" diye hesaplamak: borç azaldıkça faiz de azalır.
:::` },
    ],
    ozet: [
      "FV = PMT[(1+i)ⁿ − 1]/i; PV = PMT[1 − (1+i)⁻ⁿ]/i.",
      "Kredi taksiti PMT = PV·i/[1 − (1+i)⁻ⁿ]; birikim fonu PMT = FV·i/[(1+i)ⁿ − 1].",
      "Perpetüite: PV = PMT/i.",
      "Dönem başı ödemede formüller (1 + i) ile çarpılır.",
      "Her taksitte önce faiz ödenir; ilk taksitlerde faiz payı büyüktür. i ve n aynı döneme göre olmalı.",
    ],
    terimler: [
      ["annuity","anüite (eşit ödemeler dizisi)","A series of equal payments made at equal intervals."],
      ["annuity due","dönem başı anüite","An annuity whose payments occur at the beginning of each period."],
      ["installment","taksit","One of a series of equal payments repaying a loan."],
      ["amortization","borç ödeme (amortisman)","Repaying a loan through regular payments covering interest and principal."],
      ["sinking fund","birikim fonu","A fund built up by regular deposits to reach a target amount."],
      ["perpetuity","süresiz anüite (perpetüite)","An annuity that continues forever; PV = PMT/i."],
      ["geometric series","geometrik dizi","A sum whose terms have a constant ratio."],
    ],
    quiz: [
      {"s":"A 100,000 TL loan at 3% per month repaid in 12 equal monthly installments has a payment of about:","c":["8,333","10,046","11,000","9,700"],"d":1,"a":"PMT = 100000·0.03/(1 − 1.03⁻¹²) ≈ 10,046.21."},
      {"s":"An asset paying 1,000 TL per year forever, at 10%, is worth:","c":["1,000","10,000","100,000","Infinite"],"d":1,"a":"Perpetüite: PV = 1000/0.10 = 10,000."},
      {"s":"The future value of an ordinary annuity is:","c":["$PMT\\,\\dfrac{(1+i)^n - 1}{i}$","$PMT\\,(1+i)^n$","$PMT/i$","$PMT\\,\\dfrac{1 - (1+i)^{-n}}{i}$"],"d":0,"a":"Gelecek değer formülü; bugünkü değer seçenekteki son ifadedir."},
      {"s":"If payments occur at the beginning of each period (annuity due), the ordinary annuity formulas are:","c":["Divided by (1 + i)","Multiplied by (1 + i)","Unchanged","Multiplied by n"],"d":1,"a":"Her ödeme bir dönem fazla faiz kazanır: (1 + i) ile çarp."},
      {"s":"The interest part of the first monthly installment on a 100,000 TL loan at 3% per month is:","c":["3,000","10,046","7,046","300"],"d":0,"a":"100000 · 0.03 = 3,000; taksitin kalanı (7,046) anaparaya gider."},
      {"s":"To accumulate a target FV with equal deposits, the deposit (sinking fund payment) is:","c":["$FV\\,\\dfrac{i}{(1+i)^n - 1}$","$FV\\,\\dfrac{i}{1 - (1+i)^{-n}}$","$FV/n$","$FV\\,i$"],"d":0,"a":"Birikim fonu taksiti FV formülünün tersidir."},
      {"s":"In the early installments of a fixed-payment loan:","c":["Most of the payment is principal","Most of the payment is interest","Interest and principal are always equal","No interest is paid"],"d":1,"a":"Kalan borç büyük olduğu için faiz payı başta büyüktür."},
      {"s":"If the interest rate is monthly, the number of periods n must be measured in:","c":["Years","Months","Days","Any unit"],"d":1,"a":"i ve n aynı döneme göre olmalı."},
      {"s":"The present value of 1,000 TL per year for 3 years at 10% (end of year) is about:","c":["3,000","2,486.85","2,727.27","3,310"],"d":1,"a":"1000(1 − 1.1⁻³)/0.1 ≈ 2,486.85."},
      {"s":"The annuity formulas are derived from:","c":["The sum of a geometric series","The quadratic formula","Derivatives","Matrix inversion"],"d":0,"a":"PMT/(1+i) + PMT/(1+i)² + … geometrik dizi toplamıdır."},
    ],
  });
})();
