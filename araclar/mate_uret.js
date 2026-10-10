// mate_uret.js — Marjinal M-101'in konu anlatımlarını (www/js/konular.js) Ecopolis biçimine dönüştürür ve
// her haftaya hedefler, özet, terim tanımları, quiz, ek kesimler ve etkileşimli görseller ekler.
// Kullanım: node araclar/mate_uret.js [marjinal-konular.js yolu]
// Çıktı: icerik/mate/hNN.js (üzerine yazar). Kaynak metin Marjinal'den; ekler bu dosyada.
const fs = require("fs");
const path = require("path");

const KAYNAK = process.argv[2] || path.join(__dirname, "..", "..", "marjinal", "www", "js", "konular.js");
const HEDEF = path.join(__dirname, "..", "icerik", "mate");
const kod = fs.readFileSync(KAYNAK, "utf8");
const bas = kod.indexOf("const KONULAR = [");
const son = kod.indexOf("];", kod.indexOf("id: 20, ek: true"));
const KONULAR = new Function("const R = String.raw; return " + kod.slice(bas + "const KONULAR = ".length, son + 1) + ";")();

const T = (en, tanim) => [en, tanim];

// ---------------------------------------------------------------------------------------------- ekler
const EK = {
  1: {
    id: "h01", giris: "Fonksiyonlar: iktisadın dili",
    hedefler: ["Fonksiyon, tanım kümesi ve değer kümesi kavramlarını kullanmak", "Üs ve kök kurallarıyla ifadeleri sadeleştirmek; kökleri üs biçimine çevirmek", "İki nokta arasındaki eğimi (ortalama değişim hızını) hesaplamak", "İktisattaki temel değişkenleri (P, Q, TR, TC, π) fonksiyon olarak yazmak", "Arz–talep grafiğinde eksen geleneğini ve ters talep fonksiyonunu bilmek"],
    ekKesim: [{ sonra: "Eğim", baslik: "Fonksiyon türleri ve grafik okuma", md: String.raw`İktisatta sık karşılaşacağın fonksiyon aileleri:

| Tür | Biçim | Grafik | İktisatta örnek |
|---|---|---|---|
| Doğrusal | $y = mx + b$ | doğru | doğrusal talep, maliyet |
| İkinci derece | $y = ax^2 + bx + c$ | parabol | toplam gelir, kâr |
| Kuvvet | $y = ax^n$ | eğri | Cobb–Douglas üretim |
| Üstel | $y = a\,b^x$ | hızla artan/azalan | bileşik büyüme, faiz |
| Logaritmik | $y = \ln x$ | yavaşlayarak artan | log ölçekli veriler |
| Kesirli (rasyonel) | $y = a/x$ | hiperbol | ortalama sabit maliyet |

Bir grafiği okurken şunlara bak: **kesişimler** (eksenleri nerede kesiyor?), **artan mı azalan mı**, **eğim sabit mi değişiyor mu**, **tanımsız olduğu yer var mı** ($1/x$ için $x = 0$). Aşağıda bir fonksiyon yazıp iki noktayı sürükleyerek eğimin nasıl değiştiğini görebilirsin.

{{fonksiyon-cizici}}` }],
    ozet: ["Fonksiyon her girdiye tek bir çıktı atar; tanım kümesi izin verilen girdilerdir (iktisatta genellikle Q ≥ 0).", "Üs kuralları: aᵐaⁿ = aᵐ⁺ⁿ, aᵐ/aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁻ⁿ = 1/aⁿ, a^(1/n) = ⁿ√a.", "Eğim = Δy/Δx: ortalama değişim hızı; türevin temeli.", "Arz–talep grafiğinde fiyat dikey eksendedir; grafiği doğrudan veren ters talep fonksiyonu P = f(Q)'dur.", "Sık hatalar: (a+b)² ≠ a² + b², √(a+b) ≠ √a + √b, −x² ≠ (−x)²."],
    tanim: { function: "A rule that assigns exactly one output to each input.", variable: "A symbol that can take different values.", domain: "The set of all permissible inputs of a function.", range: "The set of all possible outputs of a function.", slope: "The change in y divided by the change in x along a line or between two points.", exponent: "The power to which a number is raised.", intercept: "The point where a graph crosses an axis." },
    quiz: [
      { s: "If $f(x) = 3x^2 - 2x + 1$, then $f(2)$ equals:", c: ["9", "13", "5", "11"], d: 0, a: "3·4 − 4 + 1 = 9." },
      { s: "The domain of $f(x) = \\sqrt{x - 4}$ is:", c: ["$x > 4$", "$x \\ge 4$", "$x \\ge 0$", "all real numbers"], d: 1, a: "Kökün içi negatif olamaz: x − 4 ≥ 0 → x ≥ 4." },
      { s: "The domain of $f(x) = \\ln(x + 2)$ is:", c: ["$x > -2$", "$x \\ge -2$", "$x > 0$", "$x > 2$"], d: 0, a: "ln yalnız pozitif sayılarda tanımlı: x + 2 > 0." },
      { s: "$x^3 \\cdot x^5$ simplifies to:", c: ["$x^{15}$", "$x^8$", "$2x^8$", "$x^2$"], d: 1, a: "Aynı tabanlı çarpımda üsler toplanır: 3 + 5 = 8." },
      { s: "$(x^2)^3$ equals:", c: ["$x^5$", "$x^6$", "$x^8$", "$3x^2$"], d: 1, a: "Kuvvetin kuvvetinde üsler çarpılır: 2 · 3 = 6." },
      { s: "$\\dfrac{5}{\\sqrt{x}}$ written in power form is:", c: ["$5x^{1/2}$", "$5x^{-1/2}$", "$5x^{-2}$", "$\\dfrac{x^{1/2}}{5}$"], d: 1, a: "√x = x^(1/2); paydadaki üs eksiye döner: 5x^(−1/2). Türev ve integralde çok işe yarar." },
      { s: "The slope of the line through $(1, 2)$ and $(4, 11)$ is:", c: ["9", "3", "1/3", "−3"], d: 1, a: "(11 − 2)/(4 − 1) = 9/3 = 3." },
      { s: "$(a + b)^2$ equals:", c: ["$a^2 + b^2$", "$a^2 + 2ab + b^2$", "$2a + 2b$", "$a^2 - 2ab + b^2$"], d: 1, a: "(a + b)(a + b) = a² + 2ab + b². En sık yapılan hata a² + b² yazmaktır." },
      { s: "$8^{2/3}$ equals:", c: ["4", "16/3", "2", "64"], d: 0, a: "8^(1/3) = 2, karesi 4." },
      { s: "On a standard supply–demand graph (price on the vertical axis), the function drawn directly is:", c: ["$Q = f(P)$", "the inverse demand function $P = f(Q)$", "$TR = PQ$", "$P = Q$"], d: 1, a: "Marshall geleneğinde fiyat dikey eksende; grafiği doğrudan veren ters talep fonksiyonudur." },
    ],
  },
  2: {
    id: "h02", giris: "Doğrunun denklemi",
    hedefler: ["Eğim ve kesişimle doğru denklemi yazmak; iki noktadan doğru bulmak", "Doğrusal arz ve talepten denge fiyatını ve miktarını hesaplamak", "Başabaş miktarını ve katkı payını hesaplamak", "Birim verginin dengeye etkisini ve yükün paylaşımını cebirle bulmak", "İki bilinmeyenli doğrusal sistemleri çözmek; çözümsüz ve sonsuz çözümlü durumları tanımak"],
    gorsel: { "Formüller": ["dogrusal-sistem"], "İktisatta": ["basabas"] },
    ozet: ["Doğru: y = mx + b; m = (y₂ − y₁)/(x₂ − x₁); nokta–eğim biçimi y − y₁ = m(x − x₁).", "Denge: Qd = Qs; Qd = a − bP, Qs = c + dP ise P* = (a − c)/(b + d).", "Başabaş: Q_BE = FC/(p − v); p − v katkı payıdır.", "Satıcıdan birim vergi: Qs(P − t); alıcıdan: Qd(P + t). Pc − Pp = t.", "Sistem: yerine koyma ya da yok etme; eğimler eşitse paralel (çözüm yok) ya da çakışık (sonsuz çözüm)."],
    tanim: { "linear equation": "An equation whose graph is a straight line: y = mx + b.", "demand / supply": "Demand: quantities buyers want at each price; supply: quantities sellers offer at each price.", equilibrium: "The price at which quantity demanded equals quantity supplied.", "break-even point": "The output level at which total revenue equals total cost.", "fixed / variable cost": "Fixed cost does not change with output; variable cost does.", "simultaneous equations": "A set of equations that must hold at the same time.", "substitution / elimination": "Two methods of solving simultaneous equations.", "tax incidence": "How the burden of a tax is divided between buyers and sellers." },
    quiz: [
      { s: "The slope of the line $2x + 4y = 8$ is:", c: ["2", "−2", "−0.5", "0.5"], d: 2, a: "y = −0.5x + 2: eğim −a/b = −2/4 = −0.5." },
      { s: "The line through $(2, 3)$ with slope 4 is:", c: ["$y = 4x - 5$", "$y = 4x + 3$", "$y = 4x - 2$", "$y = 2x + 4$"], d: 0, a: "y − 3 = 4(x − 2) → y = 4x − 5." },
      { s: "$Q_d = 100 - 2P$ and $Q_s = 20 + 2P$. Equilibrium $(P^*, Q^*)$ is:", c: ["(20, 60)", "(30, 40)", "(40, 20)", "(25, 50)"], d: 0, a: "100 − 2P = 20 + 2P → P = 20, Q = 60." },
      { s: "Fixed cost 2000, price 50, unit variable cost 30. The break-even quantity is:", c: ["40", "66.7", "100", "2000"], d: 2, a: "Q = FC/(p − v) = 2000/20 = 100." },
      { s: "In break-even analysis, $p - v$ is called the:", c: ["Profit", "Contribution margin", "Average cost", "Fixed cost"], d: 1, a: "Her birimin sabit maliyeti karşılamaya katkısı: katkı payı." },
      { s: "Two lines have equal slopes but different intercepts. The system has:", c: ["Exactly one solution", "No solution", "Infinitely many solutions", "Two solutions"], d: 1, a: "Paralel doğrular hiç kesişmez." },
      { s: "If demand is $Q = a - bP$, the slope of the demand curve drawn with P on the vertical axis is:", c: ["$-b$", "$-1/b$", "$a$", "$b$"], d: 1, a: "Ters talep P = a/b − Q/b: grafik eğimi −1/b." },
      { s: "Solve $x + y = 10$, $x - y = 2$:", c: ["x = 6, y = 4", "x = 4, y = 6", "x = 5, y = 5", "x = 8, y = 2"], d: 0, a: "Topla: 2x = 12 → x = 6, y = 4." },
      { s: "A per-unit tax $t$ collected from buyers changes the demand function $Q_d(P)$ to:", c: ["$Q_d(P - t)$", "$Q_d(P + t)$", "$Q_d(P) + t$", "$Q_d(P) - t$"], d: 1, a: "Alıcı her fiyatın üstüne t öder: talep Qd(P + t) olur." },
      { s: "$Q_d = 100 - 2P$, $Q_s = 20 + 2P$, and a tax of 4 per unit is collected from sellers. The price consumers pay is:", c: ["20", "22", "18", "24"], d: 1, a: "Qs = 20 + 2(P − 4) = 12 + 2P; 100 − 2P = 12 + 2P → P = 22 (satıcıya 18 kalır)." },
    ],
  },
  3: {
    id: "h03", giris: "Parabol",
    hedefler: ["Diskriminantla kök sayısını belirlemek ve kökleri formülle bulmak", "Parabolün tepe noktasını hesaplamak ve yönünü (a'nın işareti) yorumlamak", "Toplam gelirin en büyük olduğu miktarı bulmak", "Kâr fonksiyonundan başabaş noktalarını ve en büyük kârı hesaplamak", "Doğrusal olmayan denge denklemlerinde iktisadi olarak anlamlı kökü seçmek"],
    gorsel: { "Formüller": ["parabol"], "İktisatta": ["kar-parabol"] },
    ozet: ["f(x) = ax² + bx + c; a > 0 kollar yukarı, a < 0 aşağı.", "Δ = b² − 4ac; x₁,₂ = (−b ± √Δ)/2a. Δ > 0 iki, Δ = 0 bir, Δ < 0 sıfır reel kök.", "Tepe: x_T = −b/2a, y_T = f(x_T).", "TR = aQ − bQ² ters talepten gelir; en büyük gelir Q = a/2b'de.", "Kâr parabolünün kökleri başabaş noktaları, tepesi en büyük kâr; negatif kök iktisadi değildir."],
    tanim: { "quadratic equation": "An equation of the form ax² + bx + c = 0 with a ≠ 0.", discriminant: "b² − 4ac; determines the number of real roots.", root: "A value of x that makes the function equal to zero.", vertex: "The turning point of a parabola; its maximum or minimum.", parabola: "The graph of a quadratic function.", factorize: "To write an expression as a product of factors.", "total revenue": "Price times quantity sold." },
    quiz: [
      { s: "The discriminant of $x^2 - 6x + 9$ is:", c: ["0", "36", "−36", "72"], d: 0, a: "36 − 36 = 0: çift kök (x = 3), parabol eksene teğet." },
      { s: "The roots of $x^2 - 5x + 6 = 0$ are:", c: ["2 and 3", "−2 and −3", "1 and 6", "−1 and 6"], d: 0, a: "(x − 2)(x − 3) = 0." },
      { s: "The x-coordinate of the vertex of $f(x) = -2x^2 + 12x - 5$ is:", c: ["−3", "3", "6", "12"], d: 1, a: "x = −b/2a = −12/(−4) = 3." },
      { s: "If $a < 0$ in $f(x) = ax^2 + bx + c$, the vertex is:", c: ["A minimum", "A maximum", "Always at the origin", "A root"], d: 1, a: "Kollar aşağı (∩): tepe en yüksek noktadır." },
      { s: "Inverse demand is $P = 100 - 2Q$. Total revenue is maximized at:", c: ["Q = 50", "Q = 25", "Q = 100", "Q = 20"], d: 1, a: "TR = 100Q − 2Q²; tepe Q = 100/(2·2) = 25." },
      { s: "Profit is $\\pi = -2Q^2 + 90Q - 400$. Profit is maximized at:", c: ["Q = 22.5", "Q = 45", "Q = 5", "Q = 40"], d: 0, a: "Q = −90/(2·(−2)) = 22.5; en büyük kâr 612.5." },
      { s: "The break-even quantities for $\\pi = -2Q^2 + 90Q - 400$ are:", c: ["5 and 40", "10 and 20", "22.5 only", "−5 and 40"], d: 0, a: "2Q² − 90Q + 400 = 0 → Q² − 45Q + 200 = 0, Δ = 1225, kökler 5 ve 40." },
      { s: "If the discriminant is negative, the quadratic equation has:", c: ["Two real roots", "One real root", "No real roots", "Infinitely many roots"], d: 2, a: "√Δ reel değil: parabol x eksenini kesmez." },
      { s: "The sum of the roots of $2x^2 - 8x + 3 = 0$ is:", c: ["4", "−4", "3/2", "8"], d: 0, a: "x₁ + x₂ = −b/a = 8/2 = 4." },
      { s: "Equilibrium requires $Q^2 + 3Q - 100 = 0$. Which root is economically meaningful?", c: ["The negative root", "The positive root", "Both roots", "Neither"], d: 1, a: "Miktar negatif olamaz; yalnız pozitif kök anlamlıdır." },
    ],
  },
  4: {
    id: "h04", giris: "Üstel fonksiyon ve logaritma",
    hedefler: ["Üstel ve logaritmik fonksiyonların ilişkisini (ters fonksiyon) açıklamak", "Logaritma kurallarını uygulamak ve taban değiştirmek", "Bilinmeyeni üste olan denklemleri logaritmayla çözmek", "Bileşik büyüme, sürekli büyüme ve katlanma süresini hesaplamak", "Log farkının yüzde değişime yaklaşık eşit olduğunu kullanmak"],
    gorsel: { "İktisatta": ["ustel"] },
    ozet: ["log_b x = y ⇔ bʸ = x; ln = log_e, e ≈ 2.71828.", "ln(xy) = ln x + ln y; ln(x/y) = ln x − ln y; ln xⁿ = n ln x; ln(x + y) parçalanamaz.", "a·bˣ = c ⇒ x = ln(c/a)/ln b.", "Büyüme: y_t = y₀(1+g)ᵗ; sürekli y₀e^(kt); katlanma t = ln2/ln(1+g) ≈ 70/g.", "Küçük değişimlerde ln y₂ − ln y₁ ≈ yüzde değişim."],
    tanim: { "exponential function": "A function in which the variable appears in the exponent, f(x) = aˣ.", logarithm: "The power to which a base must be raised to obtain a number.", "natural logarithm": "The logarithm with base e, written ln.", base: "The number being raised to a power.", "growth / decay": "Increase or decrease at a constant percentage rate.", "doubling time": "The time it takes for a quantity growing at a constant rate to double." },
    quiz: [
      { s: "$\\ln(e^3)$ equals:", c: ["3", "e", "$e^3$", "1/3"], d: 0, a: "ln ile e üssü birbirinin tersi: ln(e³) = 3." },
      { s: "$\\ln(xy)$ equals:", c: ["$\\ln x \\cdot \\ln y$", "$\\ln x + \\ln y$", "$\\ln(x + y)$", "$x \\ln y$"], d: 1, a: "Çarpımın logaritması logaritmaların toplamıdır." },
      { s: "Solve $2^x = 32$:", c: ["4", "5", "6", "16"], d: 1, a: "2⁵ = 32." },
      { s: "Solve $e^{2x} = 10$:", c: ["$x = \\ln 5$", "$x = \\dfrac{\\ln 10}{2} \\approx 1.151$", "$x = 5$", "$x = 2\\ln 10$"], d: 1, a: "2x = ln 10 → x = ln10/2 ≈ 1.151." },
      { s: "Using the rule of 70, a variable growing at 7% per year doubles in about:", c: ["7 years", "10 years", "14 years", "70 years"], d: 1, a: "70 / 7 = 10 yıl." },
      { s: "At 8% annual compound interest, 1000 becomes 2000 in about:", c: ["8.75 years", "9.01 years", "12.5 years", "25 years"], d: 1, a: "t = ln2/ln1.08 = 0.6931/0.07696 ≈ 9.01." },
      { s: "$\\log_2 8$ equals:", c: ["2", "3", "4", "8"], d: 1, a: "2³ = 8." },
      { s: "Which identity is FALSE?", c: ["$\\ln(x/y) = \\ln x - \\ln y$", "$\\ln x^n = n \\ln x$", "$\\ln(x + y) = \\ln x + \\ln y$", "$e^{\\ln x} = x$"], d: 2, a: "Toplamın logaritması parçalanmaz." },
      { s: "$\\log_3 20$ can be computed on a calculator as:", c: ["$\\ln 20 \\cdot \\ln 3$", "$\\dfrac{\\ln 20}{\\ln 3}$", "$\\dfrac{\\ln 3}{\\ln 20}$", "$\\ln 60$"], d: 1, a: "Taban değiştirme: log_b x = ln x / ln b." },
      { s: "For small changes, $\\ln y_2 - \\ln y_1$ is approximately:", c: ["$y_2 - y_1$", "the percentage change from $y_1$ to $y_2$", "$y_2 / y_1$", "zero"], d: 1, a: "Log farkı ≈ yüzde değişim; iktisatçıların log ölçeği sevmesinin nedeni." },
    ],
  },
  5: {
    id: "h05", giris: "Paranın zaman değeri",
    hedefler: ["Basit, bileşik ve sürekli faizle gelecek değeri hesaplamak", "Bugünkü değeri (iskonto) hesaplamak", "Nominal faizi efektif yıllık faize çevirmek", "Fisher denklemiyle reel faizi kesin ve yaklaşık hesaplamak", "Dönem faizi ve dönem sayısını doğru eşleştirmek"],
    gorsel: { "Formüller": ["faiz"] },
    ozet: ["Basit: FV = P(1 + rt); bileşik: FV = P(1 + r/m)^(mt); sürekli: FV = Pe^(rt).", "Bugünkü değer: PV = FV/(1 + i)ⁿ; sürekli PV = FV·e^(−rt).", "Efektif faiz: (1 + r/m)ᵐ − 1; sürekli eʳ − 1. Aylık %3 ≈ yıllık efektif %42.6.", "Fisher: 1 + r_reel = (1 + r_nom)/(1 + π); yüksek enflasyonda yaklaşık formül sapar.", "Bileşik sayısı arttıkça FV büyür ama Pe^(rt) sınırını aşamaz."],
    tanim: { "simple / compound interest": "Simple interest is paid on principal only; compound interest is also paid on accumulated interest.", principal: "The original amount invested or borrowed.", "future value": "The value of a sum at a future date, including interest.", "present value": "The current value of a future sum, discounted at the interest rate.", discounting: "Converting future values into present values.", "effective annual rate": "The annual rate that gives the same result as the nominal rate with its compounding frequency.", "continuous compounding": "Compounding infinitely many times per period: FV = Pe^(rt).", "nominal / real interest rate": "The nominal rate is in money terms; the real rate is adjusted for inflation." },
    quiz: [
      { s: "10,000 TL at 12% simple interest for 3 years grows to:", c: ["13,600", "14,049.28", "14,307.69", "11,200"], d: 0, a: "10000(1 + 0.12·3) = 13,600." },
      { s: "10,000 TL at 12% compounded annually for 3 years grows to:", c: ["13,600", "14,049.28", "14,333.29", "13,000"], d: 1, a: "10000(1.12)³ = 14,049.28." },
      { s: "The effective annual rate of 12% nominal compounded monthly is about:", c: ["12.00%", "12.68%", "13.00%", "144%"], d: 1, a: "(1.01)¹² − 1 ≈ 0.1268." },
      { s: "10,000 TL at 12% compounded continuously for 3 years grows to:", c: ["14,049.28", "14,307.69", "14,333.29", "13,600"], d: 2, a: "10000·e^0.36 ≈ 14,333.29." },
      { s: "The present value of 11,000 TL due in one year at 10% is:", c: ["9,900", "10,000", "12,100", "11,000"], d: 1, a: "11000/1.1 = 10,000." },
      { s: "Nominal interest is 50% and inflation is 40%. The exact real interest rate is about:", c: ["10%", "7.14%", "3.5%", "90%"], d: 1, a: "1.5/1.4 − 1 ≈ 0.0714. Yaklaşık formül (%10) yüksek enflasyonda yanıltır." },
      { s: "A loan advertised at 3% per month has an effective annual rate of about:", c: ["36%", "39%", "42.6%", "3%"], d: 2, a: "(1.03)¹² − 1 ≈ 0.426." },
      { s: "As the number of compounding periods per year increases, the future value:", c: ["Decreases", "Increases without bound", "Increases toward $Pe^{rt}$", "Stays the same"], d: 2, a: "lim (1 + r/m)^(m) = eʳ: sürekli bileşik bir üst sınırdır." },
      { s: "With a positive interest rate, the present value of a future amount is:", c: ["Greater than the future value", "Less than the future value", "Equal to the future value", "Negative"], d: 1, a: "İskonto her zaman küçültür." },
      { s: "The future value with continuous compounding is:", c: ["$P(1 + rt)$", "$P(1 + r)^t$", "$Pe^{rt}$", "$P/(1 + r)^t$"], d: 2, a: "Sürekli bileşik: FV = Pe^(rt)." },
    ],
  },
  6: {
    id: "h06", giris: "Eşit ödemeler dizisi",
    hedefler: ["Anüitenin gelecek ve bugünkü değerini hesaplamak", "Kredi taksitini ve ödeme tablosunu çıkarmak", "Birikim fonu taksitini hesaplamak", "Perpetüitenin değerini bulmak", "Formüllerin geometrik dizi toplamından nasıl türediğini açıklamak"],
    gorsel: { "İktisatta": ["kredi"] },
    ozet: ["FV = PMT[(1+i)ⁿ − 1]/i; PV = PMT[1 − (1+i)⁻ⁿ]/i.", "Kredi taksiti PMT = PV·i/[1 − (1+i)⁻ⁿ]; birikim fonu PMT = FV·i/[(1+i)ⁿ − 1].", "Perpetüite: PV = PMT/i.", "Dönem başı ödemede formüller (1 + i) ile çarpılır.", "Her taksitte önce faiz ödenir; ilk taksitlerde faiz payı büyüktür. i ve n aynı döneme göre olmalı."],
    tanim: { annuity: "A series of equal payments made at equal intervals.", "annuity due": "An annuity whose payments occur at the beginning of each period.", installment: "One of a series of equal payments repaying a loan.", amortization: "Repaying a loan through regular payments covering interest and principal.", "sinking fund": "A fund built up by regular deposits to reach a target amount.", perpetuity: "An annuity that continues forever; PV = PMT/i.", "geometric series": "A sum whose terms have a constant ratio." },
    quiz: [
      { s: "A 100,000 TL loan at 3% per month repaid in 12 equal monthly installments has a payment of about:", c: ["8,333", "10,046", "11,000", "9,700"], d: 1, a: "PMT = 100000·0.03/(1 − 1.03⁻¹²) ≈ 10,046.21." },
      { s: "An asset paying 1,000 TL per year forever, at 10%, is worth:", c: ["1,000", "10,000", "100,000", "Infinite"], d: 1, a: "Perpetüite: PV = 1000/0.10 = 10,000." },
      { s: "The future value of an ordinary annuity is:", c: ["$PMT\\,\\dfrac{(1+i)^n - 1}{i}$", "$PMT\\,(1+i)^n$", "$PMT/i$", "$PMT\\,\\dfrac{1 - (1+i)^{-n}}{i}$"], d: 0, a: "Gelecek değer formülü; bugünkü değer seçenekteki son ifadedir." },
      { s: "If payments occur at the beginning of each period (annuity due), the ordinary annuity formulas are:", c: ["Divided by (1 + i)", "Multiplied by (1 + i)", "Unchanged", "Multiplied by n"], d: 1, a: "Her ödeme bir dönem fazla faiz kazanır: (1 + i) ile çarp." },
      { s: "The interest part of the first monthly installment on a 100,000 TL loan at 3% per month is:", c: ["3,000", "10,046", "7,046", "300"], d: 0, a: "100000 · 0.03 = 3,000; taksitin kalanı (7,046) anaparaya gider." },
      { s: "To accumulate a target FV with equal deposits, the deposit (sinking fund payment) is:", c: ["$FV\\,\\dfrac{i}{(1+i)^n - 1}$", "$FV\\,\\dfrac{i}{1 - (1+i)^{-n}}$", "$FV/n$", "$FV\\,i$"], d: 0, a: "Birikim fonu taksiti FV formülünün tersidir." },
      { s: "In the early installments of a fixed-payment loan:", c: ["Most of the payment is principal", "Most of the payment is interest", "Interest and principal are always equal", "No interest is paid"], d: 1, a: "Kalan borç büyük olduğu için faiz payı başta büyüktür." },
      { s: "If the interest rate is monthly, the number of periods n must be measured in:", c: ["Years", "Months", "Days", "Any unit"], d: 1, a: "i ve n aynı döneme göre olmalı." },
      { s: "The present value of 1,000 TL per year for 3 years at 10% (end of year) is about:", c: ["3,000", "2,486.85", "2,727.27", "3,310"], d: 1, a: "1000(1 − 1.1⁻³)/0.1 ≈ 2,486.85." },
      { s: "The annuity formulas are derived from:", c: ["The sum of a geometric series", "The quadratic formula", "Derivatives", "Matrix inversion"], d: 0, a: "PMT/(1+i) + PMT/(1+i)² + … geometrik dizi toplamıdır." },
    ],
  },
  7: {
    id: "h07", giris: "Büyüme ve yatırım: iki akraba soru",
    hedefler: ["Bileşik ortalama büyüme oranını ve sürekli büyüme oranını hesaplamak", "Aritmetik ortalamanın bileşik büyümeyi neden abarttığını açıklamak", "Net bugünkü değeri hesaplamak ve yatırım kararı vermek", "İç verim oranını tanımlamak ve NBD kuralıyla ilişkilendirmek", "İskonto oranını fırsat maliyeti olarak yorumlamak"],
    gorsel: { "Net bugünkü değer ve iç verim oranı": ["nbd"] },
    ozet: ["Bileşik ortalama büyüme: g = (yₙ/y₀)^(1/n) − 1; sürekli k = ln(yₙ/y₀)/n.", "Aritmetik ortalama bileşik büyümeyi abartır.", "NBD = Σ CF_t/(1 + r)ᵗ; CF₀ iskontolanmaz. NBD > 0 ise yatırım yap.", "İVO, NBD'yi sıfır yapan orandır; İVO > r ise kabul. Akış birden çok kez işaret değiştirirse NBD'ye güven.", "İskonto oranı paranın başka yerdeki getirisi, yani fırsat maliyetidir."],
    tanim: { "growth rate": "The percentage change of a variable per period.", "compound annual growth rate": "The constant annual rate that takes a value from its start to its end over n years.", "net present value": "The sum of discounted cash flows, including the initial investment.", "internal rate of return": "The discount rate at which net present value equals zero.", "cash flow": "Money received or paid at a given time.", "discount rate": "The rate used to convert future cash flows to present values.", "opportunity cost": "The return on the next-best alternative use of funds." },
    quiz: [
      { s: "GDP rises from 1000 to 1500 over 5 years. The compound annual growth rate is about:", c: ["10%", "8.45%", "50%", "7%"], d: 1, a: "1.5^(1/5) − 1 ≈ 0.0845; aritmetik ortalama (%10) abartır." },
      { s: "Cash flows −1000, 300, 400, 500 at a 10% discount rate give an NPV of about:", c: ["+200", "−21.04", "+21.04", "0"], d: 1, a: "−1000 + 272.73 + 330.58 + 375.66 ≈ −21.04." },
      { s: "The NPV decision rule is to invest if:", c: ["NPV < 0", "NPV > 0", "IRR < r", "Cash flows are positive"], d: 1, a: "Bugünkü değer cinsinden kazanç pozitifse yatırım yapılır." },
      { s: "The internal rate of return is the discount rate that:", c: ["Maximizes NPV", "Makes NPV equal to zero", "Equals the inflation rate", "Equals the growth rate"], d: 1, a: "İVO'da NBD = 0." },
      { s: "A project has an IRR of 12% and the cost of funds is 10%. The project should be:", c: ["Rejected", "Accepted", "Delayed", "It cannot be decided"], d: 1, a: "İVO > r → NBD > 0 → kabul." },
      { s: "Dividing total growth by the number of years (arithmetic average) tends to:", c: ["Understate compound growth", "Overstate compound growth", "Equal compound growth", "Give a negative rate"], d: 1, a: "Bileşik etki yüzünden aritmetik ortalama gerçek yıllık büyümeyi abartır." },
      { s: "In an NPV calculation, the initial cash flow $CF_0$ is:", c: ["Discounted by (1 + r)", "Not discounted (factor of 1)", "Ignored", "Multiplied by r"], d: 1, a: "t = 0'da (1 + r)⁰ = 1." },
      { s: "A variable doubles from 100 to 200 in 10 years. Its continuous growth rate is about:", c: ["10%", "6.93%", "7.18%", "20%"], d: 1, a: "k = ln2/10 ≈ 0.0693." },
      { s: "If a project's cash flows change sign more than once, you should rely on:", c: ["The IRR only", "The NPV", "The payback period", "The growth rate"], d: 1, a: "Birden çok İVO olabilir; NBD kuralı güvenilirdir." },
      { s: "The discount rate in an NPV calculation represents:", c: ["The inflation rate only", "The opportunity cost of funds", "The tax rate", "The growth rate of sales"], d: 1, a: "Paranın en iyi alternatif kullanımdaki getirisi." },
    ],
  },
  9: {
    id: "h09", giris: "Anlık değişim hızı",
    hedefler: ["Türevi limit olarak tanımlamak ve geometrik anlamını (teğet eğimi) açıklamak", "Kuvvet, çarpım, bölüm ve zincir kurallarını uygulamak", "Üstel ve logaritmik fonksiyonların türevlerini almak", "Bir noktadaki teğet doğrusunu yazmak ve doğrusal yaklaşım yapmak", "Kısmi türevin anlamını bilmek"],
    gorsel: { "@giris": ["turev-teget"] },
    ekKesim: [{ sonra: "@giris", baslik: "Limit ve süreklilik", md: String.raw`Türevin tanımı bir **limittir**, bu yüzden limit kavramını kısaca hatırlayalım.

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
:::` }],
    ozet: ["f′(x) = lim (f(x+h) − f(x))/h: anlık değişim hızı, teğetin eğimi.", "(xⁿ)′ = nxⁿ⁻¹; (fg)′ = f′g + fg′; (f/g)′ = (f′g − fg′)/g²; zincir: f′(g(x))·g′(x).", "(eˣ)′ = eˣ; (eᵘ)′ = eᵘu′; (ln x)′ = 1/x; (ln u)′ = u′/u; (aˣ)′ = aˣ ln a.", "Teğet: y = f(x₀) + f′(x₀)(x − x₀); doğrusal yaklaşım f(x₀ + Δx) ≈ f(x₀) + f′(x₀)Δx.", "Kısmi türev: diğer değişkenler sabitken birine göre türev."],
    tanim: { derivative: "The instantaneous rate of change of a function; the slope of the tangent line.", differentiation: "The process of finding a derivative.", limit: "The value a function approaches as its input approaches a point.", "tangent line": "A line that touches a curve at a point with the same slope as the curve there.", "power / product / quotient rule": "Rules for differentiating powers, products and quotients of functions.", "chain rule": "The derivative of f(g(x)) is f′(g(x))·g′(x).", "second derivative": "The derivative of the derivative; measures curvature.", "partial derivative": "The derivative with respect to one variable, holding others constant." },
    quiz: [
      { s: "$\\dfrac{d}{dx}(5x^4)$ equals:", c: ["$20x^3$", "$5x^3$", "$20x^4$", "$4x^5$"], d: 0, a: "Kuvvet kuralı: 5 · 4x³ = 20x³." },
      { s: "$\\dfrac{d}{dx}(3x^2 + 1)^4$ equals:", c: ["$4(3x^2 + 1)^3$", "$24x(3x^2 + 1)^3$", "$12x(3x^2 + 1)^3$", "$(6x)^4$"], d: 1, a: "Zincir: 4(3x² + 1)³ · 6x = 24x(3x² + 1)³." },
      { s: "$\\dfrac{d}{dx}e^{2x}$ equals:", c: ["$e^{2x}$", "$2e^{2x}$", "$2xe^{2x-1}$", "$e^{2}$"], d: 1, a: "İç türev 2'yi unutma." },
      { s: "$\\dfrac{d}{dx}\\ln(x^2 + 1)$ equals:", c: ["$\\dfrac{1}{x^2 + 1}$", "$\\dfrac{2x}{x^2 + 1}$", "$2x\\ln(x^2+1)$", "$\\dfrac{1}{2x}$"], d: 1, a: "(ln u)′ = u′/u = 2x/(x² + 1)." },
      { s: "$\\dfrac{d}{dx}\\left(x^2 e^{-x}\\right)$ equals:", c: ["$-2xe^{-x}$", "$xe^{-x}(2 - x)$", "$2xe^{-x}$", "$x^2e^{-x}$"], d: 1, a: "Çarpım: 2xe^(−x) − x²e^(−x) = xe^(−x)(2 − x)." },
      { s: "$\\dfrac{d}{dx}\\left(\\dfrac{\\ln x}{x}\\right)$ equals:", c: ["$\\dfrac{1 - \\ln x}{x^2}$", "$\\dfrac{\\ln x - 1}{x^2}$", "$\\dfrac{1}{x^2}$", "$\\dfrac{1}{x}$"], d: 0, a: "Bölüm: ((1/x)·x − ln x)/x² = (1 − ln x)/x²." },
      { s: "The derivative of the constant $\\ln 5$ is:", c: ["1/5", "0", "ln 5", "5"], d: 1, a: "Sabitin türevi sıfırdır." },
      { s: "The tangent line to $f(x) = x^2$ at $x = 3$ is:", c: ["$y = 6x - 9$", "$y = 6x + 9$", "$y = 3x$", "$y = 2x + 3$"], d: 0, a: "f(3) = 9, f′(3) = 6: y = 9 + 6(x − 3) = 6x − 9." },
      { s: "For $Q = 10K^{0.3}L^{0.7}$, the partial derivative $\\partial Q/\\partial L$ is:", c: ["$7K^{0.3}L^{-0.3}$", "$3K^{-0.7}L^{0.7}$", "$10K^{0.3}$", "$7K^{0.3}L^{0.7}$"], d: 0, a: "K sabit: 10 · 0.7 · K^0.3 · L^(−0.3)." },
      { s: "The derivative is defined as:", c: ["$\\dfrac{f(x)}{x}$", "$\\lim_{h\\to 0}\\dfrac{f(x+h) - f(x)}{h}$", "$f(x+1) - f(x)$", "$\\int f(x)\\,dx$"], d: 1, a: "Ortalama değişimin h → 0 iken limiti." },
    ],
  },
  10: {
    id: "h10", giris: "Marjinal = türev",
    hedefler: ["Marjinal maliyet, gelir, ürün, tüketim eğilimi ve faydayı türev olarak hesaplamak", "Türevin bir birimlik gerçek farkın yaklaşığı olduğunu göstermek", "Ortalama–marjinal ilişkisini ve MC = AC kuralını açıklamak", "Nokta ve yay esnekliğini hesaplamak; esneklik ile gelir ilişkisini (MR = P(1 + 1/ε)) kullanmak", "Sabit esneklikli talebi tanımak"],
    gorsel: { "Marjinal kavramlar": ["marjinal-ortalama"], "Esneklik": ["esneklik"] },
    ozet: ["MC = TC′(Q), MR = TR′(Q), MPL = Q′(L), MPC = C′(Y), MU = U′(x).", "MC(Q) ≈ TC(Q+1) − TC(Q).", "Marjinal ortalamanın altındaysa ortalama düşer; MC, AC'yi en düşük noktasından keser.", "ε = (dQ/dP)(P/Q); |ε| > 1 esnek. MR = P(1 + 1/ε); doğrusal talepte gelir |ε| = 1'de en büyük.", "Q = AP⁻ᵇ ise esneklik her noktada −b (log kısayolu: ε = d ln Q/d ln P)."],
    tanim: { "marginal cost / revenue": "The derivative of total cost / total revenue with respect to output.", "marginal product": "The derivative of output with respect to an input.", "average cost": "Total cost divided by output.", "marginal propensity to consume": "The derivative of consumption with respect to income.", "marginal utility": "The derivative of utility with respect to consumption of a good.", "price elasticity of demand": "(dQ/dP)·(P/Q): the percentage change in quantity per 1% change in price.", "elastic / inelastic": "|ε| > 1 / |ε| < 1." },
    quiz: [
      { s: "$TC = 0.1Q^3 - 2Q^2 + 15Q + 100$. Marginal cost at $Q = 10$ is:", c: ["5", "6.1", "15", "150"], d: 0, a: "MC = 0.3Q² − 4Q + 15 = 30 − 40 + 15 = 5." },
      { s: "Demand $Q = 120 - 3P$. The price elasticity at $P = 30$ is:", c: ["−1", "−3", "−0.33", "−30"], d: 1, a: "dQ/dP = −3, Q = 30: ε = −3 · 30/30 = −3 (esnek)." },
      { s: "For $Q = 120 - 3P$, demand is unit elastic at:", c: ["P = 10", "P = 20", "P = 30", "P = 40"], d: 1, a: "−3P/(120 − 3P) = −1 → P = 20." },
      { s: "When marginal cost is below average cost, average cost is:", c: ["Rising", "Falling", "At its minimum", "Equal to MC"], d: 1, a: "Marjinal ortalamanın altındaysa ortalamayı aşağı çeker." },
      { s: "If $P = 10$ and $\\varepsilon = -2$, marginal revenue is:", c: ["5", "20", "−5", "10"], d: 0, a: "MR = P(1 + 1/ε) = 10(1 − 0.5) = 5." },
      { s: "For the demand function $Q = 50P^{-2}$, the price elasticity is:", c: ["−50", "−2", "−0.5", "It varies along the curve"], d: 1, a: "Kuvvet biçimli talepte esneklik sabit: üs −2." },
      { s: "If $C = 200 + 0.8Y$, the marginal propensity to consume is:", c: ["200", "0.8", "0.2", "1"], d: 1, a: "MPC = dC/dY = 0.8." },
      { s: "If demand is elastic ($|\\varepsilon| > 1$), marginal revenue is:", c: ["Negative", "Zero", "Positive", "Equal to price"], d: 2, a: "MR = P(1 + 1/ε) > 0 when ε < −1: fiyatı düşürmek geliri artırır." },
      { s: "For the inverse demand $P = 50 - 2Q$, $dQ/dP$ equals:", c: ["−2", "−0.5", "2", "50"], d: 1, a: "dQ/dP = 1/(dP/dQ) = 1/(−2) = −0.5." },
      { s: "The point price elasticity of demand is:", c: ["$\\dfrac{dP}{dQ}\\cdot\\dfrac{Q}{P}$", "$\\dfrac{dQ}{dP}\\cdot\\dfrac{P}{Q}$", "$\\dfrac{dQ}{dP}$", "$\\dfrac{P}{Q}$"], d: 1, a: "Esneklik = eğimin tersi × P/Q, yani (dQ/dP)(P/Q)." },
    ],
  },
  11: {
    id: "h11", giris: "En iyiyi aramak",
    hedefler: ["Birinci sıra koşulla kritik noktaları bulmak", "İkinci sıra koşulla maksimum ve minimumu ayırmak", "Kapalı aralıkta mutlak ekstremumu uç noktaları da karşılaştırarak bulmak", "Kâr maksimizasyonunu MR = MC olarak çözmek", "Gelir maksimumu, ortalama maliyet minimumu ve vergi geliri maksimumu sorularını çözmek"],
    gorsel: { "İktisatta": ["optimizasyon"] },
    ozet: ["FOC: f′(x) = 0 (kritik nokta). SOC: f″ < 0 maksimum, f″ > 0 minimum.", "Kapalı aralıkta kritik noktalar ve uçlar karşılaştırılır.", "f″ < 0 içbükey (∩), f″ > 0 dışbükey (∪); işaret değişimi büküm noktası.", "Kâr: π′ = 0 ⇔ MR = MC, π″ < 0. Ortalama maliyet en düşük: MC = AC. Gelir en büyük: MR = 0.", "Monopol MR < P olduğu için daha az üretir, daha yüksek fiyat alır."],
    tanim: { optimization: "Finding the maximum or minimum value of a function.", "critical point": "A point where the first derivative is zero or undefined.", "first / second order condition": "f′ = 0 identifies candidates; the sign of f″ tells max or min.", "local / global maximum": "Highest value nearby / highest value over the whole domain.", "concave / convex": "Concave: f″ < 0 (∩); convex: f″ > 0 (∪).", "inflection point": "A point where the second derivative changes sign.", "profit maximization": "Choosing output where MR = MC and π″ < 0." },
    quiz: [
      { s: "The first-order condition for a maximum or minimum of $f(x)$ is:", c: ["$f(x) = 0$", "$f'(x) = 0$", "$f''(x) = 0$", "$f'(x) > 0$"], d: 1, a: "Kritik noktalarda türev sıfırdır." },
      { s: "$f(x) = -x^2 + 6x$ has a maximum at:", c: ["x = 3, f = 9", "x = 6, f = 0", "x = −3, f = −27", "x = 0, f = 0"], d: 0, a: "f′ = −2x + 6 = 0 → x = 3; f(3) = 9; f″ = −2 < 0." },
      { s: "If $f'(x^*) = 0$ and $f''(x^*) < 0$, then $x^*$ is:", c: ["A local minimum", "A local maximum", "An inflection point", "Not a critical point"], d: 1, a: "İçbükey bölgede kritik nokta: maksimum." },
      { s: "$P = 100 - 2Q$ and $TC = 50 + 10Q + 0.5Q^2$. Profit-maximizing output is:", c: ["Q = 18", "Q = 25", "Q = 20", "Q = 15"], d: 0, a: "MR = 100 − 4Q, MC = 10 + Q: 100 − 4Q = 10 + Q → Q = 18." },
      { s: "In the previous question, maximum profit is:", c: ["760", "1152", "392", "640"], d: 0, a: "P = 64; π = 64·18 − (50 + 180 + 162) = 1152 − 392 = 760." },
      { s: "$f(x) = x^3 - 3x$ has a local minimum at:", c: ["x = −1", "x = 1", "x = 0", "x = 3"], d: 1, a: "f′ = 3x² − 3 = 0 → x = ±1; f″ = 6x: x = 1'de 6 > 0 → minimum." },
      { s: "Total revenue is maximized where:", c: ["MR = MC", "MR = 0", "MC = AC", "P = MC"], d: 1, a: "Gelir en büyük: TR′ = MR = 0 (|ε| = 1)." },
      { s: "Average cost is minimized where:", c: ["MC = 0", "MC = AC", "MR = MC", "AC = 0"], d: 1, a: "d(TC/Q)/dQ = (MC − AC)/Q = 0 → MC = AC." },
      { s: "On the closed interval $[0, 5]$, $f(x) = x^2 - 4x$ has its absolute maximum at:", c: ["x = 2", "x = 0", "x = 5", "x = 4"], d: 2, a: "Kritik nokta x = 2 (f = −4, minimum). Uçlar: f(0) = 0, f(5) = 5 → mutlak maksimum x = 5." },
      { s: "If $Q = 100 - 2t$ and tax revenue is $T = tQ$, revenue is maximized at:", c: ["t = 50", "t = 25", "t = 100", "t = 10"], d: 1, a: "T = 100t − 2t²; T′ = 100 − 4t = 0 → t = 25." },
    ],
  },
  12: {
    id: "h12", giris: "Türevin tersi, eğrinin altı",
    hedefler: ["İlkel fonksiyonu bulmak ve integral sabitinin anlamını açıklamak", "Kuvvet, 1/x, üstel integral kurallarını uygulamak", "Değişken değiştirme ve kısmi integrasyon tekniklerini kullanmak", "Belirli integrali analizin temel teoremiyle hesaplamak", "Has olmayan integrali ve negatif alanları yorumlamak"],
    gorsel: { "Belirli integral": ["riemann"] },
    ozet: ["∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1); ∫(1/x)dx = ln|x| + C; ∫e^(kx)dx = e^(kx)/k + C.", "C integral sabitidir: sabitin türevi 0.", "Yerine koyma: u = g(x); kısmi: ∫u dv = uv − ∫v du.", "∫ₐᵇ f dx = F(b) − F(a); eksenin altındaki alan negatif sayılır.", "Has olmayan integral: ∫₀^∞ 100e^(−0.05t)dt = 2000."],
    tanim: { integral: "The antiderivative of a function; also the area under its curve.", antiderivative: "A function whose derivative is the given function.", "indefinite / definite integral": "Indefinite: the family of antiderivatives (+C); definite: a number, F(b) − F(a).", "constant of integration": "The arbitrary constant C added to an antiderivative.", "integration by substitution": "Changing variables u = g(x) to simplify an integral.", "integration by parts": "∫u dv = uv − ∫v du.", "fundamental theorem of calculus": "The definite integral of f from a to b equals F(b) − F(a).", "improper integral": "An integral with an infinite limit or an unbounded integrand." },
    quiz: [
      { s: "$\\int x^4\\,dx$ equals:", c: ["$4x^3 + C$", "$\\dfrac{x^5}{5} + C$", "$x^5 + C$", "$\\dfrac{x^4}{4} + C$"], d: 1, a: "Kuvvet kuralı: üssü bir artır, yeni üsse böl." },
      { s: "$\\int \\dfrac{1}{x}\\,dx$ equals:", c: ["$\\dfrac{x^0}{0} + C$", "$\\ln|x| + C$", "$-\\dfrac{1}{x^2} + C$", "$x + C$"], d: 1, a: "n = −1 istisnası: ln|x| + C." },
      { s: "$\\int e^{3x}\\,dx$ equals:", c: ["$e^{3x} + C$", "$\\dfrac{e^{3x}}{3} + C$", "$3e^{3x} + C$", "$\\dfrac{e^{x}}{3} + C$"], d: 1, a: "∫e^(kx)dx = e^(kx)/k + C." },
      { s: "$\\int_0^2 (3x^2 - 4x + 5)\\,dx$ equals:", c: ["10", "12", "8", "14"], d: 0, a: "[x³ − 2x² + 5x]₀² = 8 − 8 + 10 = 10." },
      { s: "$\\int 2x(x^2 + 1)^5\\,dx$ equals:", c: ["$\\dfrac{(x^2 + 1)^6}{6} + C$", "$(x^2 + 1)^6 + C$", "$\\dfrac{(x^2+1)^6}{3} + C$", "$10x(x^2+1)^4 + C$"], d: 0, a: "u = x² + 1, du = 2x dx: ∫u⁵du = u⁶/6." },
      { s: "$\\int xe^x\\,dx$ equals:", c: ["$xe^x + C$", "$xe^x - e^x + C$", "$\\dfrac{x^2}{2}e^x + C$", "$e^x + C$"], d: 1, a: "Kısmi integral: u = x, dv = eˣdx → xeˣ − ∫eˣdx." },
      { s: "$\\int_0^{\\infty} 100e^{-0.05t}\\,dt$ equals:", c: ["100", "500", "2000", "∞"], d: 2, a: "[−2000e^(−0.05t)]₀^∞ = 0 − (−2000) = 2000." },
      { s: "The fundamental theorem of calculus states that $\\int_a^b f(x)\\,dx$ equals:", c: ["$f(b) - f(a)$", "$F(b) - F(a)$ where $F' = f$", "$F(a) - F(b)$", "$f'(b) - f'(a)$"], d: 1, a: "Belirli integral ilkel fonksiyonun uç değerleri farkıdır." },
      { s: "$\\int_1^{e} \\dfrac{1}{x}\\,dx$ equals:", c: ["0", "1", "e", "e − 1"], d: 1, a: "ln e − ln 1 = 1 − 0 = 1." },
      { s: "We add the constant $C$ to an indefinite integral because:", c: ["Integrals are always positive", "The derivative of any constant is zero, so antiderivatives are determined only up to a constant", "C equals the area", "It is required by the power rule only"], d: 1, a: "Sabitin türevi sıfır olduğundan ilkel fonksiyon bir sabite kadar belirlidir." },
    ],
  },
  13: {
    id: "h13", giris: "Alan ve refah",
    hedefler: ["İki eğri arasındaki alanı belirli integralle hesaplamak", "Tüketici ve üretici artığını integralle hesaplamak (doğrusal olmayan eğriler dahil)", "Ölü ağırlık kaybını alan olarak yorumlamak", "Lorenz eğrisinden Gini katsayısını integralle hesaplamak"],
    gorsel: { "Formüller": ["artik-integral"], "Lorenz eğrisi ve Gini": ["lorenz-integral"] },
    ozet: ["Eğriler arası alan: ∫ₐᵇ [f(x) − g(x)]dx (f ≥ g).", "TA = ∫₀^Q* D(Q)dQ − P*Q*; ÜA = P*Q* − ∫₀^Q* S(Q)dQ (ters talep/arz kullanılır).", "Müdahaleyle kaybolan toplam artık ölü ağırlık kaybıdır.", "Gini: G = 2∫₀¹ [x − L(x)]dx; L(x) = x² için G = 1/3."],
    tanim: { "consumer surplus": "The area below the inverse demand curve and above the price.", "producer surplus": "The area above the inverse supply curve and below the price.", "area between curves": "The definite integral of the difference between two functions.", "deadweight loss": "The loss of total surplus caused by a market distortion.", "Lorenz curve": "The cumulative share of income received by the poorest fraction x of the population.", "Gini coefficient": "Twice the area between the line of equality and the Lorenz curve." },
    quiz: [
      { s: "Consumer surplus is computed as:", c: ["$\\int_0^{Q^*} D(Q)\\,dQ - P^*Q^*$", "$P^*Q^* - \\int_0^{Q^*} D(Q)\\,dQ$", "$\\int_0^{Q^*} S(Q)\\,dQ$", "$P^* \\cdot Q^*$"], d: 0, a: "Ödemeye razı olunan toplam (talep altı alan) eksi ödenen (P*Q*)." },
      { s: "$D(Q) = 50 - 2Q$ and $P^* = 30$. Consumer surplus is:", c: ["100", "200", "300", "400"], d: 0, a: "Q* = 10; ∫₀¹⁰(50 − 2Q)dQ − 300 = 400 − 300 = 100 (üçgen: ½·10·20)." },
      { s: "$S(Q) = 10 + Q$ and $P^* = 30$. Producer surplus is:", c: ["100", "200", "400", "600"], d: 1, a: "Q* = 20; 600 − ∫₀²⁰(10 + Q)dQ = 600 − 400 = 200." },
      { s: "The area between $f(x) = x$ and $g(x) = x^2$ on $[0, 1]$ is:", c: ["1/2", "1/3", "1/6", "1"], d: 2, a: "∫₀¹(x − x²)dx = 1/2 − 1/3 = 1/6." },
      { s: "If the Lorenz curve is $L(x) = x^2$, the Gini coefficient is:", c: ["1/2", "1/3", "2/3", "1/4"], d: 1, a: "G = 2(1/2 − 1/3) = 1/3." },
      { s: "If the Lorenz curve is $L(x) = x^3$, the Gini coefficient is:", c: ["1/4", "1/3", "1/2", "3/4"], d: 2, a: "G = 2(1/2 − 1/4) = 1/2 (genel: (k − 1)/(k + 1))." },
      { s: "A Gini coefficient of 0 means:", c: ["Perfect inequality", "Perfect equality", "No data", "Average inequality"], d: 1, a: "Lorenz eğrisi eşitlik doğrusuyla çakışır." },
      { s: "If demand is given as $Q = 100 - 2P$, before integrating over Q to find consumer surplus you should:", c: ["Integrate with respect to P directly without care", "Invert it to $P = 50 - Q/2$", "Differentiate it", "Square it"], d: 1, a: "dQ'ya göre integral için ters talep P = D(Q) gerekir." },
      { s: "Deadweight loss represents:", c: ["Government revenue", "Surplus lost because mutually beneficial trades no longer occur", "Producer surplus", "Fixed cost"], d: 1, a: "Müdahale sonucu gerçekleşmeyen alışverişlerin kaybı." },
      { s: "$\\int_0^3 (9 - x^2)\\,dx$ equals:", c: ["18", "27", "9", "0"], d: 0, a: "[9x − x³/3]₀³ = 27 − 9 = 18." },
    ],
  },
  14: {
    id: "h14", giris: "Marjinalden toplama",
    hedefler: ["Marjinal fonksiyondan toplam fonksiyonu başlangıç koşuluyla elde etmek", "Belirli integralle toplamdaki değişimi hesaplamak", "Stok ve akım ilişkisini (sermaye birikimi) kurmak", "Sürekli gelir akışının bugünkü ve gelecek değerini hesaplamak", "Bir fonksiyonun ortalama değerini bulmak"],
    gorsel: { "Gelir akışının değeri": ["gelir-akisi"] },
    ozet: ["TC(Q) = ∫MC dQ + C, C = FC; TR = ∫MR dQ (sabit 0).", "TC(Q₂) − TC(Q₁) = ∫_{Q₁}^{Q₂} MC dQ (sabit sadeleşir).", "Stok = başlangıç + akımın integrali: K(t) = K(0) + ∫₀ᵗ I(s)ds.", "PV = ∫₀ᵀ R(t)e^(−rt)dt; sabit akışta R(1 − e^(−rT))/r → R/r.", "Ortalama değer: (1/(b − a))∫ₐᵇ f(x)dx."],
    tanim: { "total cost function": "The function giving total cost at each output; the integral of marginal cost plus fixed cost.", "initial condition": "A known value of a function used to determine the constant of integration.", "stock / flow": "A stock is measured at a point in time; a flow is measured per unit of time.", "capital accumulation": "The growth of the capital stock through net investment.", "income stream": "A flow of income received over time.", "average value": "The integral of a function over an interval divided by the interval's length." },
    quiz: [
      { s: "$MC = 3Q^2 - 12Q + 20$ and fixed cost is 50. Total cost is:", c: ["$Q^3 - 6Q^2 + 20Q + 50$", "$6Q - 12$", "$Q^3 - 6Q^2 + 20Q$", "$3Q^3 - 12Q^2 + 20Q + 50$"], d: 0, a: "İntegral al ve C = FC = 50 koy." },
      { s: "With $MC = 3Q^2 - 12Q + 20$, the additional cost of raising output from 2 to 5 is:", c: ["51", "74", "125", "175"], d: 0, a: "TC(5) − TC(2) = 125 − 74 = 51." },
      { s: "If $MR = 100 - 4Q$, total revenue is:", c: ["$100Q - 2Q^2$", "$100Q - 4Q^2$", "$-4$", "$100 - 2Q^2$"], d: 0, a: "∫MR dQ = 100Q − 2Q² (TR(0) = 0 olduğundan sabit 0)." },
      { s: "The present value of 1,000 TL per year forever at 8% is:", c: ["8,000", "12,500", "80,000", "1,080"], d: 1, a: "PV = R/r = 1000/0.08 = 12,500." },
      { s: "The present value of a constant continuous stream $R = 1000$ for 10 years at $r = 10\\%$ is about:", c: ["10,000", "6,321", "3,679", "1,000"], d: 1, a: "1000(1 − e^(−1))/0.1 ≈ 6,321." },
      { s: "Net investment is constant at 50 per year and the initial capital stock is 1000. After 4 years the stock is:", c: ["1050", "1200", "4000", "1500"], d: 1, a: "K(4) = 1000 + ∫₀⁴50dt = 1200." },
      { s: "The average value of $f(x) = x^2$ on $[0, 3]$ is:", c: ["9", "3", "4.5", "1"], d: 1, a: "(1/3)∫₀³x²dx = (1/3)·9 = 3." },
      { s: "If $MPC = 0.6$ and autonomous consumption is 100, the consumption function is:", c: ["$C = 0.6Y$", "$C = 100 + 0.6Y$", "$C = 100Y + 0.6$", "$C = 60 + Y$"], d: 1, a: "C(Y) = ∫0.6 dY + C₀ = 100 + 0.6Y." },
      { s: "When recovering total cost from marginal cost, the constant of integration equals:", c: ["Variable cost", "Fixed cost", "Marginal revenue", "Zero always"], d: 1, a: "TC(0) = FC." },
      { s: "The future value of a continuous income stream is obtained from its present value by:", c: ["Dividing by $e^{rT}$", "Multiplying by $e^{rT}$", "Adding $rT$", "Taking the logarithm"], d: 1, a: "FV = e^(rT) · PV." },
    ],
  },
  20: {
    id: "h16", giris: "Matris nedir?",
    hedefler: ["Matris toplamı, çarpımı ve devriğini hesaplamak", "2×2 ve 3×3 determinant hesaplamak", "2×2 ters matrisi bulmak ve doğrusal sistemi Cramer kuralıyla çözmek", "Leontief girdi–çıktı modelini kurup çözmek"],
    gorsel: { "Leontief modeli": ["leontief"] },
    ozet: ["(m×n)(n×p) = (m×p); genelde AB ≠ BA.", "2×2 determinant ad − bc; 3×3 açılım işaretleri + − +. det = 0 ise tekil.", "A⁻¹ = (1/(ad − bc))[[d, −b], [−c, a]]; x = A⁻¹b; Cramer xᵢ = det Aᵢ/det A.", "Leontief: x = Ax + d ⇒ x = (I − A)⁻¹d.", "(AB)⁻¹ = B⁻¹A⁻¹."],
    tanim: { matrix: "A rectangular array of numbers.", determinant: "A scalar computed from a square matrix; zero if the matrix is singular.", "inverse matrix": "The matrix A⁻¹ such that AA⁻¹ = I.", transpose: "The matrix obtained by swapping rows and columns.", "identity matrix": "A square matrix with ones on the diagonal and zeros elsewhere.", singular: "A square matrix with determinant zero; it has no inverse.", "Cramer's rule": "Solving a linear system with ratios of determinants.", "input–output model": "Leontief's model of inter-industry flows: x = (I − A)⁻¹d.", rank: "The maximum number of linearly independent rows or columns." },
    quiz: [
      { s: "$\\det\\begin{bmatrix}2 & 3\\\\ 1 & -1\\end{bmatrix}$ equals:", c: ["−5", "5", "1", "−1"], d: 0, a: "2(−1) − 3(1) = −5." },
      { s: "Using Cramer's rule, the solution of $2x + 3y = 8$, $x - y = -1$ is:", c: ["x = 1, y = 2", "x = 2, y = 1", "x = −1, y = 2", "x = 1, y = −2"], d: 0, a: "det = −5; x = (8·(−1) − 3·(−1))/(−5) = 1, y = (2·(−1) − 8·1)/(−5) = 2." },
      { s: "If $\\det A = 0$, then A is:", c: ["Invertible", "Singular (no inverse)", "The identity", "Orthogonal"], d: 1, a: "Determinant sıfırsa ters matris yoktur." },
      { s: "$(AB)^{-1}$ equals:", c: ["$A^{-1}B^{-1}$", "$B^{-1}A^{-1}$", "$AB$", "$BA$"], d: 1, a: "Sıra ters döner." },
      { s: "A $2\\times 3$ matrix times a $3\\times 4$ matrix gives a matrix of size:", c: ["3×3", "2×4", "4×2", "Not defined"], d: 1, a: "(m×n)(n×p) = (m×p)." },
      { s: "The inverse of $\\begin{bmatrix}4 & 7\\\\ 2 & 6\\end{bmatrix}$ is:", c: ["$\\dfrac{1}{10}\\begin{bmatrix}6 & -7\\\\ -2 & 4\\end{bmatrix}$", "$\\dfrac{1}{10}\\begin{bmatrix}4 & 7\\\\ 2 & 6\\end{bmatrix}$", "$\\begin{bmatrix}6 & -7\\\\ -2 & 4\\end{bmatrix}$", "$\\dfrac{1}{38}\\begin{bmatrix}6 & 7\\\\ 2 & 4\\end{bmatrix}$"], d: 0, a: "det = 24 − 14 = 10; köşegeni değiştir, diğerlerinin işaretini çevir." },
      { s: "In the Leontief model, total output is:", c: ["$x = Ad$", "$x = (I - A)^{-1}d$", "$x = A^{-1}d$", "$x = d - A$"], d: 1, a: "x = Ax + d → (I − A)x = d → x = (I − A)⁻¹d." },
      { s: "The transpose of $\\begin{bmatrix}1 & 2\\\\ 3 & 4\\end{bmatrix}$ is:", c: ["$\\begin{bmatrix}1 & 3\\\\ 2 & 4\\end{bmatrix}$", "$\\begin{bmatrix}4 & 3\\\\ 2 & 1\\end{bmatrix}$", "$\\begin{bmatrix}1 & 2\\\\ 3 & 4\\end{bmatrix}$", "$\\begin{bmatrix}2 & 1\\\\ 4 & 3\\end{bmatrix}$"], d: 0, a: "Satırlar sütun olur." },
      { s: "For matrices in general:", c: ["AB = BA always", "AB ≠ BA in general", "AB is never defined", "A + B ≠ B + A"], d: 1, a: "Matris çarpımı değişmeli değildir (toplama değişmelidir)." },
      { s: "In a 3×3 cofactor expansion along the first row, the signs of the terms are:", c: ["+ + +", "+ − +", "− + −", "+ − −"], d: 1, a: "İşaret düzeni (−1)^(i+j): birinci satırda + − +." },
    ],
  },
};

// ---------------------------------------------------------------------------------------------- dönüştürme
function bolumle(md) {
  const parcalar = md.split(/^## /m);
  const giris = parcalar.shift().trim();
  const kesimler = parcalar.map((p) => { const i = p.indexOf("\n"); return { baslik: p.slice(0, i).trim(), md: p.slice(i + 1).trim() }; });
  return { giris, kesimler };
}

function terimYaz(ter, tanim) {
  return ter.map(([en, tr]) => (tanim[en] ? [en, tr, tanim[en]] : [en, tr]));
}

const jsDizge = (s) => JSON.stringify(s);
const sablon = (s) => {
  if (s.includes("`") || s.includes("${")) throw new Error("Şablon dizgesine uygun olmayan içerik: " + s.slice(0, 80));
  return "R`" + s + "`";
};

fs.mkdirSync(HEDEF, { recursive: true });
let say = 0;
for (const k of KONULAR) {
  if (k.sinav) continue;
  const ek = EK[k.id];
  if (!ek) { console.warn("eki yok:", k.id); continue; }
  const { giris, kesimler } = bolumle(k.md);
  const bolumler = [{ baslik: ek.giris, md: giris }];
  for (const ks of kesimler) {
    if (/^Sık yapılan hatalar/i.test(ks.baslik)) { bolumler[bolumler.length - 1].md += `\n\n:::dikkat Sık yapılan hatalar\n${ks.md}\n:::`; continue; }
    if (/^Çözümlü örnek/i.test(ks.baslik)) { bolumler.push({ baslik: "Çözümlü örnek", md: `:::ornek Çözümlü örnek\n${ks.md}\n:::` }); continue; }
    bolumler.push({ baslik: ks.baslik, md: ks.md });
  }
  // görseller
  for (const [hedef, adlar] of Object.entries(ek.gorsel || {})) {
    const b = hedef === "@giris" ? bolumler[0] : bolumler.find((x) => x.baslik.startsWith(hedef));
    if (!b) throw new Error(`${ek.id}: görsel için kesim bulunamadı: ${hedef}`);
    b.md += "\n\n" + adlar.map((a) => `{{${a}}}`).join("\n\n");
  }
  // ek kesimler
  for (const e of ek.ekKesim || []) {
    const i = e.sonra === "@giris" ? 0 : bolumler.findIndex((x) => x.baslik.startsWith(e.sonra));
    if (i < 0) throw new Error(`${ek.id}: ek kesim yeri yok: ${e.sonra}`);
    bolumler.splice(i + 1, 0, { baslik: e.baslik, md: e.md });
  }
  const terimler = terimYaz(k.terimler || [], ek.tanim || {});
  const metin = `// Mathematics I — ${k.hafta ? k.hafta + ". hafta" : "ek konu"}: ${k.ad}
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: ${jsDizge(ek.id)},
    hedefler: [
${ek.hedefler.map((h) => "      " + jsDizge(h) + ",").join("\n")}
    ],
    bolumler: [
${bolumler.map((b) => `      { baslik: ${jsDizge(b.baslik)}, md: ${sablon(b.md)} },`).join("\n")}
    ],
    ozet: [
${ek.ozet.map((o) => "      " + jsDizge(o) + ",").join("\n")}
    ],
    terimler: [
${terimler.map((t) => "      " + JSON.stringify(t) + ",").join("\n")}
    ],
    quiz: [
${ek.quiz.map((q) => "      " + JSON.stringify(q) + ",").join("\n")}
    ],
  });
})();
`;
  fs.writeFileSync(path.join(HEDEF, ek.id + ".js"), metin);
  say++;
}
console.log(`${say} matematik dosyası yazıldı → ${HEDEF}`);
