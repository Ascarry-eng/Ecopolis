// Mathematics I — 2. hafta: Doğrusal denklemler ve iktisatta uygulamaları
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h02",
    hedefler: [
      "Eğim ve kesişimle doğru denklemi yazmak; iki noktadan doğru bulmak",
      "Doğrusal arz ve talepten denge fiyatını ve miktarını hesaplamak",
      "Başabaş miktarını ve katkı payını hesaplamak",
      "Birim verginin dengeye etkisini ve yükün paylaşımını cebirle bulmak",
      "İki bilinmeyenli doğrusal sistemleri çözmek; çözümsüz ve sonsuz çözümlü durumları tanımak",
    ],
    bolumler: [
      { baslik: "Doğrunun denklemi", md: R`Doğrusal fonksiyon $y = mx + b$: $m$ eğim (x bir birim artınca y'nin değişimi), $b$ dikey eksen kesişimi. Eğim sabit olduğundan her birimlik değişim aynı etkiyi yapar.` },
      { baslik: "Formüller", md: R`> $$m = \frac{y_2 - y_1}{x_2 - x_1},\qquad y - y_1 = m(x - x_1)$$

Genel biçimden: $ax + by = c \;\Rightarrow\; y = -\dfrac{a}{b}x + \dfrac{c}{b}$.

{{dogrusal-sistem}}` },
      { baslik: "İktisatta", md: R`**Talep ve arz:** $Q_d = a - bP$ ($b > 0$: fiyat artınca talep azalır), $Q_s = c + dP$ ($d > 0$).

> $$\text{Denge: } Q_d = Q_s \;\Rightarrow\; P^* = \frac{a - c}{b + d}$$

**Maliyet ve gelir:** $TC = FC + vQ$ (sabit + değişken), $TR = pQ$.

> $$\text{Başabaş: } TR = TC \;\Rightarrow\; Q_{BE} = \frac{FC}{p - v}$$

$p - v$ katkı payıdır: her birimin sabit maliyeti karşılamaya katkısı.

**Birim vergi $t$:** satıcıdan alınan vergi arz eğrisini $t$ kadar yukarı kaydırır. Tüketicinin ödediği $P_c$ ile üreticinin eline geçen $P_p$ arasında $P_c - P_p = t$ farkı açılır. Yükün büyüğü esnekliği düşük tarafa biner.

**İki bilinmeyenli sistem:** yerine koyma ya da yok etme yöntemi. Doğrular paralelse (eğimler eşit, kesişimler farklı) çözüm yok; çakışıksa sonsuz çözüm var.

{{basabas}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
Talep $Q_d = 100 - 2P$, arz $Q_s = 20 + 2P$.
1. Eşitle: $100 - 2P = 20 + 2P \Rightarrow 80 = 4P \Rightarrow P^* = 20$.
2. Yerine koy: $Q^* = 100 - 40 = 60$.

Satıcıya birim başına $t = 4$ vergi gelsin: arz $Q_s = 20 + 2(P - 4)$ olur.
$100 - 2P = 12 + 2P \Rightarrow P_c = 22$, $P_p = 18$, $Q_t = 56$.
Eğimler eşit olduğu için yük yarı yarıya: tüketiciye 2, üreticiye 2. Vergi geliri $4 \times 56 = 224$.
:::

:::dikkat Sık yapılan hatalar
- Eğimde pay ve paydanın nokta sırasını karıştırmak.
- $Q = a - bP$ talebinin grafikteki eğimini $-b$ sanmak: P dikey eksende olduğu için eğim $-1/b$'dir.
- Vergiyi yanlış tarafa eklemek: satıcıdan alınırsa $Q_s(P - t)$, alıcıdan alınırsa $Q_d(P + t)$.
:::` },
    ],
    ozet: [
      "Doğru: y = mx + b; m = (y₂ − y₁)/(x₂ − x₁); nokta–eğim biçimi y − y₁ = m(x − x₁).",
      "Denge: Qd = Qs; Qd = a − bP, Qs = c + dP ise P* = (a − c)/(b + d).",
      "Başabaş: Q_BE = FC/(p − v); p − v katkı payıdır.",
      "Satıcıdan birim vergi: Qs(P − t); alıcıdan: Qd(P + t). Pc − Pp = t.",
      "Sistem: yerine koyma ya da yok etme; eğimler eşitse paralel (çözüm yok) ya da çakışık (sonsuz çözüm).",
    ],
    terimler: [
      ["linear equation","doğrusal denklem","An equation whose graph is a straight line: y = mx + b."],
      ["demand / supply","talep / arz","Demand: quantities buyers want at each price; supply: quantities sellers offer at each price."],
      ["equilibrium","denge","The price at which quantity demanded equals quantity supplied."],
      ["break-even point","başabaş noktası","The output level at which total revenue equals total cost."],
      ["fixed / variable cost","sabit / değişken maliyet","Fixed cost does not change with output; variable cost does."],
      ["simultaneous equations","eşanlı denklemler","A set of equations that must hold at the same time."],
      ["substitution / elimination","yerine koyma / yok etme","Two methods of solving simultaneous equations."],
      ["tax incidence","vergi yükünün dağılımı","How the burden of a tax is divided between buyers and sellers."],
    ],
    quiz: [
      {"s":"The slope of the line $2x + 4y = 8$ is:","c":["2","−2","−0.5","0.5"],"d":2,"a":"y = −0.5x + 2: eğim −a/b = −2/4 = −0.5."},
      {"s":"The line through $(2, 3)$ with slope 4 is:","c":["$y = 4x - 5$","$y = 4x + 3$","$y = 4x - 2$","$y = 2x + 4$"],"d":0,"a":"y − 3 = 4(x − 2) → y = 4x − 5."},
      {"s":"$Q_d = 100 - 2P$ and $Q_s = 20 + 2P$. Equilibrium $(P^*, Q^*)$ is:","c":["(20, 60)","(30, 40)","(40, 20)","(25, 50)"],"d":0,"a":"100 − 2P = 20 + 2P → P = 20, Q = 60."},
      {"s":"Fixed cost 2000, price 50, unit variable cost 30. The break-even quantity is:","c":["40","66.7","100","2000"],"d":2,"a":"Q = FC/(p − v) = 2000/20 = 100."},
      {"s":"In break-even analysis, $p - v$ is called the:","c":["Profit","Contribution margin","Average cost","Fixed cost"],"d":1,"a":"Her birimin sabit maliyeti karşılamaya katkısı: katkı payı."},
      {"s":"Two lines have equal slopes but different intercepts. The system has:","c":["Exactly one solution","No solution","Infinitely many solutions","Two solutions"],"d":1,"a":"Paralel doğrular hiç kesişmez."},
      {"s":"If demand is $Q = a - bP$, the slope of the demand curve drawn with P on the vertical axis is:","c":["$-b$","$-1/b$","$a$","$b$"],"d":1,"a":"Ters talep P = a/b − Q/b: grafik eğimi −1/b."},
      {"s":"Solve $x + y = 10$, $x - y = 2$:","c":["x = 6, y = 4","x = 4, y = 6","x = 5, y = 5","x = 8, y = 2"],"d":0,"a":"Topla: 2x = 12 → x = 6, y = 4."},
      {"s":"A per-unit tax $t$ collected from buyers changes the demand function $Q_d(P)$ to:","c":["$Q_d(P - t)$","$Q_d(P + t)$","$Q_d(P) + t$","$Q_d(P) - t$"],"d":1,"a":"Alıcı her fiyatın üstüne t öder: talep Qd(P + t) olur."},
      {"s":"$Q_d = 100 - 2P$, $Q_s = 20 + 2P$, and a tax of 4 per unit is collected from sellers. The price consumers pay is:","c":["20","22","18","24"],"d":1,"a":"Qs = 20 + 2(P − 4) = 12 + 2P; 100 − 2P = 12 + 2P → P = 22 (satıcıya 18 kalır)."},
    ],
  });
})();
