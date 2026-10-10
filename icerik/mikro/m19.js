// Colander 11e — 19. bölüm: The Logic of Individual Choice (+ ek: kayıtsızlık eğrisi analizi) (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m19",
    hedefler: [
      "Toplam ve marjinal faydayı ayırmak; azalan marjinal fayda ilkesini açıklamak",
      "Akılcı seçim ilkesini (MU/P eşitliği) uygulayarak bir bütçeyi en iyi şekilde paylaştırmak",
      "Talep eğrisinin fayda en büyüklemesinden nasıl türediğini göstermek",
      "Fiyat değişikliğinin ikame ve gelir etkilerini ayırmak",
      "Elmas–su paradoksunu çözmek",
      "Bütçe doğrusu ve kayıtsızlık eğrileriyle tüketici dengesini göstermek",
    ],
    bolumler: [
      { baslik: "Fayda: toplam ve marjinal", md: R`
Talep eğrisi neden aşağı eğimlidir? Bu bölüm talebin arkasındaki bireysel seçimi inceler. Temel kavram **faydadır (utility)**: bir malı tüketmekten elde edilen tatmin. Fayda doğrudan ölçülemez; iktisatçılar onu "fayda birimi" (util) ile *sanki* ölçülebilirmiş gibi kullanarak mantığı netleştirir.

- **Toplam fayda (total utility):** bir malın bütün birimlerinden elde edilen toplam tatmin.
- **Marjinal fayda (marginal utility, MU):** bir birim daha tüketmenin getirdiği ek tatmin.

:::tanim Principle of diminishing marginal utility
As you consume more of a good, after some point, the marginal utility received from each additional unit of that good declines.
:::

İlk bardak çay sabah çok değerlidir, ikincisi de güzeldir, beşinci bardakta ise artık pek bir şey katmaz. **Toplam fayda artmaya devam ederken marjinal fayda düşer.** Marjinal fayda sıfıra indiğinde toplam fayda en yüksektir; negatife dönerse (onuncu bardak mide bulandırır) toplam fayda düşmeye başlar.

| Çay (bardak) | Toplam fayda | Marjinal fayda |
|---|---|---|
| 1 | 30 | 30 |
| 2 | 50 | 20 |
| 3 | 62 | 12 |
| 4 | 68 | 6 |
| 5 | 70 | 2 |
| 6 | 68 | −2 |
` },
      { baslik: "Akılcı seçim ilkesi", md: R`
Tüketicinin sınırlı bir bütçesi var ve farklı fiyatlı mallar arasında seçim yapıyor. Hangi bileşimi seçmeli? Yalnız marjinal faydaya bakmak yetmez; **fiyatı** da hesaba katmak gerekir. Önemli olan, **harcanan lira başına marjinal faydadır**: $MU/P$.

:::tanim Principle of rational choice
Spend your money on those goods that give you the most marginal utility per dollar. Utility is maximized when MU_x/P_x = MU_y/P_y.
:::

$$\frac{MU_X}{P_X} = \frac{MU_Y}{P_Y}$$

Neden? Diyelim ki kahvenin son lirası 3, simidin son lirası 2 birim fayda getiriyor. Bir lirayı simitten kahveye kaydırırsan 2 kaybedip 3 kazanırsın: toplam fayda artar. Bu kaydırma, oranlar eşitlenene kadar devam eder (azalan marjinal fayda yüzünden kahve arttıkça onun MU/P'si düşer, simit azaldıkça onunki yükselir).

{{fayda}}

:::ornek Kahve ve simit
Bütçe 200 TL, kahve 40 TL, simit 20 TL. Marjinal faydalar: kahve 120, 100, 80, 60…; simit 70, 60, 50, 40, 30…. En iyi sepet nedir?
---cozum---
Lira başına marjinal faydaları sırala: simit₁ 3,5; kahve₁ 3; simit₂ 3; kahve₂ 2,5; simit₃ 2,5; kahve₃ 2; simit₄ 2; …

En yüksekten başlayarak bütçe bitene kadar al: simit₁ (20), kahve₁ (40), simit₂ (20), kahve₂ (40), simit₃ (20), kahve₃ (40), simit₄ (20) → toplam **200 TL**.

Sepet: **3 kahve + 4 simit**. Son birimlerde $MU_K/P_K = 80/40 = 2$ ve $MU_S/P_S = 40/20 = 2$: eşit. Toplam fayda = (120 + 100 + 80) + (70 + 60 + 50 + 40) = **520**.
:::

:::dikkat
Kural "en çok marjinal faydayı veren malı al" değildir: kahvenin ilk birimi (120) simidinkinden (70) yüksek, ama kahve iki kat pahalı. Doğru karşılaştırma **lira başına** faydadır.
:::
` },
      { baslik: "Fayda en büyüklemeden talep eğrisine", md: R`
Akılcı seçim ilkesi talep yasasını açıklar. Dengede $MU_K/P_K = MU_S/P_S$. Şimdi kahvenin fiyatı yükselsin:

1. $MU_K / P_K$ düşer (payda büyüdü).
2. Artık simide harcanan lira daha çok fayda getiriyor; tüketici kahveden simide kayar.
3. Kahve azaldıkça marjinal faydası yükselir; eşitlik yeniden kurulana kadar kahve tüketimi düşer.

Sonuç: **fiyat yükselince talep miktarı düşer.** Her fiyat için en iyi miktarı bulup birleştirirsen bireysel talep eğrisini elde edersin.

### İkame etkisi ve gelir etkisi
Bir malın fiyatı yükseldiğinde talep miktarı iki nedenle değişir:

- **İkame etkisi (substitution effect):** mal, diğer mallara göre **göreli olarak** pahalandı; tüketici ondan uzaklaşıp görece ucuzlayan mallara kayar. İkame etkisi **her zaman** fiyatla ters yöndedir.
- **Gelir etkisi (income effect):** fiyat artışı tüketicinin **reel gelirini** (satın alma gücünü) düşürdü. Normal malda bu talebi daha da azaltır; düşük malda ise artırır.

Normal mallarda iki etki aynı yöndedir; talep eğrisi kesinlikle aşağı eğimlidir. Düşük mallarda iki etki ters yöndedir, ama genellikle ikame etkisi baskın gelir. (Gelir etkisinin baskın geldiği, fiyat artınca talebin *arttığı* teorik vakaya **Giffen malı** denir — gerçekte çok nadirdir.)
` },
      { baslik: "Elmas–su paradoksu ve diğer uygulamalar", md: R`
Adam Smith'in sorduğu soru: **su hayati önemdedir ama ucuzdur; elmas süs eşyasıdır ama çok pahalıdır. Neden?**

Cevap toplam fayda ile marjinal fayda ayrımındadır:

- Suyun **toplam faydası** muazzamdır (onsuz yaşayamayız), ama su bol olduğu için tükettiğimiz **son** bardağın **marjinal faydası** çok düşüktür.
- Elmasın toplam faydası sınırlıdır, ama kıt olduğu için marjinal faydası yüksektir.

Fiyatı belirleyen, **marjinal** faydadır (ve marjinal maliyet). Çölde susuz kalmış biri için son bardak suyun marjinal faydası elmastan yüksek olurdu.

### Akılcı seçimin diğer uygulamaları
Akılcı seçim ilkesi yalnız alışverişte değil, her kıt kaynağın paylaştırılmasında işler:

- **Zaman:** sınava kalan saatleri dersler arasında, son saatin not artışı her derste eşit olacak şekilde dağıt (2. bölümdeki ÜOE örneği).
- **Emek arzı:** iş ile boş zaman arasındaki seçim (17. bölüm).
- **Tasarruf:** bugün tüketmek ile gelecekte tüketmek arasındaki seçim.

:::ipucu
Colander, geleneksel modelin sınırlarını da hatırlatır: insanlar gerçekte her lirayı hesaplamaz; alışkanlık, kural ve sezgiyle seçim yapar. Model, insanların ortalamada ve zamanla nasıl davrandığını öngörmek için güçlü bir çerçevedir; ama davranışsal iktisat (21. ve 22. bölümler) onun yanılgılarını inceler.
:::
` },
      { baslik: "Ek: kayıtsızlık eğrisi analizi", md: R`
Fayda kavramına gerek duymadan, yalnız **tercih sıralamasıyla** aynı sonuçlara ulaşan daha modern bir araç: bütçe doğrusu ve kayıtsızlık eğrileri.

### Bütçe doğrusu
Gelir $M$, fiyatlar $P_X$ ve $P_Y$ ise tüketicinin alabileceği bütün bileşimler:

$$P_X X + P_Y Y = M \qquad\Rightarrow\qquad Y = \frac{M}{P_Y} - \frac{P_X}{P_Y} X$$

Eğim $-P_X/P_Y$, piyasanın iki mal arasındaki değişim oranıdır. Gelir artarsa doğru paralel olarak dışa kayar; bir malın fiyatı değişirse doğru döner.

### Kayıtsızlık eğrileri
:::tanim Indifference curve
A curve that shows combinations of goods among which an individual is indifferent; every point on it gives the same level of satisfaction.
:::

Özellikleri:
1. **Aşağı eğimlidir:** bir maldan fazlası, ötekinden azıyla telafi edilir.
2. **Orijine göre dışbükeydir:** bir maldan çok varken ondan vazgeçmeye daha isteklisin (azalan marjinal ikame oranı).
3. **Birbirini kesmez.**
4. **Dışarıdaki eğriler daha yüksek tatmin** gösterir.

Kayıtsızlık eğrisinin eğimi **marjinal ikame oranıdır (MRS)**: tüketicinin bir birim X için kaç birim Y'den vazgeçmeye razı olduğu. $MRS = MU_X / MU_Y$.

### Tüketici dengesi
Tüketici, bütçe doğrusuna **teğet** olan en yüksek kayıtsızlık eğrisine ulaşır:

$$MRS = \frac{MU_X}{MU_Y} = \frac{P_X}{P_Y} \qquad\Longleftrightarrow\qquad \frac{MU_X}{P_X} = \frac{MU_Y}{P_Y}$$

Bu, akılcı seçim ilkesinin ta kendisidir — grafikle.

{{kayitsizlik}}

:::ornek Cobb-Douglas tüketicisi
Fayda $U = \sqrt{XY}$, gelir 600 TL, $P_X = 15$, $P_Y = 15$. En iyi sepet nedir? $P_X$ 30'a çıkarsa ne olur?
---cozum---
Bu fayda fonksiyonunda tüketici gelirinin yarısını her mala harcar: $X = M/(2P_X)$, $Y = M/(2P_Y)$.

Başta: $X = 600/30 = 20$, $Y = 20$.

$P_X = 30$ olunca: $X = 600/60 = 10$, $Y = 20$. X'in fiyatı iki katına çıkınca talep miktarı yarıya indi. İki noktayı birleştirince X'in talep eğrisini elde ederiz. (Görselde "Gelir ve ikame etkisi" seçeneğiyle bu değişimi iki parçaya ayırabilirsin.)
:::
` },
    ],
    ozet: [
      "Toplam fayda artarken marjinal fayda düşer (azalan marjinal fayda ilkesi).",
      "Akılcı seçim ilkesi: her lirayı en yüksek MU/P'ye harca; dengede MU_X/P_X = MU_Y/P_Y.",
      "Bir malın fiyatı yükselince MU/P'si düşer, tüketici ondan uzaklaşır: talep yasası fayda en büyüklemesinden türer.",
      "İkame etkisi hep fiyatla ters yöndedir; gelir etkisi normal malda aynı, düşük malda ters yöndedir.",
      "Elmas–su paradoksu: fiyatı toplam değil marjinal fayda belirler.",
      "Ek: bütçe doğrusu P_X X + P_Y Y = M; kayıtsızlık eğrileri aşağı eğimli, dışbükey, kesişmez; dengede MRS = P_X/P_Y.",
    ],
    terimler: [
      ["utility", "fayda", "The pleasure or satisfaction that one expects to get from consuming a good or service."],
      ["total utility", "toplam fayda", "The total satisfaction one gets from consuming a product."],
      ["marginal utility", "marjinal fayda", "The satisfaction one gets from consuming one additional unit of a product above and beyond what one has consumed up to that point."],
      ["principle of diminishing marginal utility", "azalan marjinal fayda ilkesi", "As you consume more of a good, after some point, the marginal utility received from each additional unit declines."],
      ["principle of rational choice", "akılcı seçim ilkesi", "Spend your money on those goods that give you the most marginal utility per dollar; MU_x/P_x = MU_y/P_y."],
      ["utility maximizing rule", "fayda en büyükleme kuralı", "Utility is maximized when the ratios of marginal utility to price are equal for all goods."],
      ["substitution effect", "ikame etkisi", "The change in quantity demanded due to a change in relative price, holding real income constant."],
      ["income effect", "gelir etkisi", "The change in quantity demanded due to the change in real income caused by a price change."],
      ["Giffen good", "Giffen malı", "A good whose quantity demanded rises when its price rises because a strong income effect outweighs the substitution effect."],
      ["diamond–water paradox", "elmas–su paradoksu", "Water is essential but cheap, diamonds are inessential but expensive; explained by marginal, not total, utility."],
      ["budget constraint", "bütçe kısıtı", "A curve showing the combinations of goods a consumer can buy with a given income and prices."],
      ["indifference curve", "kayıtsızlık eğrisi", "A curve that shows combinations of goods among which an individual is indifferent."],
      ["marginal rate of substitution", "marjinal ikame oranı", "The rate at which one good must be added when the other is taken away in order to keep the individual indifferent; MU_x/MU_y."],
    ],
    quiz: [
      { s: "As a person consumes more cups of tea, total utility rises from 62 to 68 when the 4th cup is consumed. The marginal utility of the 4th cup is:", c: ["68", "62", "6", "17"], d: 2, a: "MU = ΔTU = 68 − 62 = 6." },
      { s: "The principle of diminishing marginal utility states that:", c: ["Total utility always falls", "After some point, each additional unit gives less additional satisfaction", "Prices fall as quantity rises", "Utility can be measured exactly"], d: 1, a: "Ek birimlerin getirdiği ek tatmin azalır; toplam fayda artmaya devam edebilir." },
      { s: "When marginal utility is zero, total utility is:", c: ["Zero", "At its maximum", "At its minimum", "Negative"], d: 1, a: "MU pozitifken TU artar, negatifken düşer; MU = 0'da TU en yüksektir." },
      { s: "According to the principle of rational choice, a consumer maximizes utility when:", c: ["MU_x = MU_y", "MU_x/P_x = MU_y/P_y", "P_x = P_y", "Total utility of each good is equal"], d: 1, a: "Son liranın her malda getirdiği ek fayda eşit olmalı." },
      { s: "A consumer finds MU/P for coffee = 3 and MU/P for simit = 2. To increase utility, she should:", c: ["Buy more simit and less coffee", "Buy more coffee and less simit", "Keep the same bundle", "Stop consuming both"], d: 1, a: "Kahveye harcanan lira daha çok fayda getiriyor; simitten kahveye kaydır." },
      { s: "Budget 200 TL, coffee 40 TL, simit 20 TL. At the optimum (3 coffees, 4 simits), the MU/P of the last unit of each is:", c: ["3", "2.5", "2", "1"], d: 2, a: "80/40 = 2 ve 40/20 = 2: eşit." },
      { s: "If the price of a good rises, its MU/P falls, and the consumer buys less of it. This explains:", c: ["The law of supply", "Why demand curves slope downward", "The diamond–water paradox", "Giffen goods"], d: 1, a: "Fayda en büyükleme mantığından talep yasası çıkar." },
      { s: "The substitution effect of a price increase:", c: ["Always reduces the quantity demanded of the good", "Always increases quantity demanded", "Depends on whether the good is normal or inferior", "Is zero for necessities"], d: 0, a: "Göreli pahalanan maldan uzaklaşılır; ikame etkisi her zaman fiyatla ters yöndedir." },
      { s: "For an inferior good, the income effect of a price increase:", c: ["Reduces quantity demanded", "Increases quantity demanded", "Is zero", "Is the same as for a normal good"], d: 1, a: "Reel gelir düşer; düşük malda gelir düşünce talep artar. (Genellikle ikame etkisi yine de baskındır.)" },
      { s: "The diamond–water paradox is resolved by noting that price reflects:", c: ["Total utility", "Marginal utility", "Average utility", "Historical cost"], d: 1, a: "Su bol olduğu için son bardağın marjinal faydası düşüktür; elmas kıt olduğu için yüksektir." },
      { s: "Indifference curves are typically convex to the origin because of:", c: ["Increasing marginal utility", "A diminishing marginal rate of substitution", "Constant prices", "Rising income"], d: 1, a: "Bir maldan çok varken ondan vazgeçmeye daha isteklisin: MRS azalır, eğri dışbükeydir." },
      { s: "At the consumer's optimum in indifference curve analysis:", c: ["The indifference curve crosses the budget line twice", "The highest attainable indifference curve is tangent to the budget line, so MRS = P_x/P_y", "MRS = 1", "The consumer spends less than income"], d: 1, a: "Teğet noktada kayıtsızlık eğrisinin eğimi (MRS) bütçe doğrusunun eğimine (Px/Py) eşittir." },
    ],
  });
})();
