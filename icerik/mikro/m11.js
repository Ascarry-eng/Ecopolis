// Colander 11e — 11. bölüm: Production and Cost Analysis I (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m11",
    hedefler: [
      "Muhasebe kârı ile iktisadi kârı ayırmak",
      "Kısa dönem ile uzun dönemi sabit ve değişken girdiler üzerinden tanımlamak",
      "Toplam, marjinal ve ortalama ürünü hesaplamak; azalan marjinal verim yasasını açıklamak",
      "Sabit, değişken, toplam, ortalama ve marjinal maliyetleri tablodan hesaplamak",
      "Maliyet eğrilerinin biçimini ve MC'nin AVC ile ATC'yi en düşük noktalarından kestiğini göstermek",
      "Verimlilik ile maliyet arasındaki ayna ilişkisini açıklamak",
    ],
    bolumler: [
      { baslik: "Firmanın amacı ve iktisadi kâr", md: R`
Arz eğrisinin arkasında **firma** vardır. Bu bölüm ve sonraki, firmanın maliyetlerini inceleyerek arz eğrisini temellendirir.

Standart modelde firmanın amacı **kârı en büyük yapmaktır**:

$$\text{Kâr} = \text{Toplam gelir} - \text{Toplam maliyet}$$

Ama iktisatçı ile muhasebeci "maliyet" kelimesine farklı şeyler koyar:

- **Açık maliyetler (explicit costs):** gerçekten ödenen paralar — ücretler, kira, hammadde, enerji.
- **Örtük maliyetler (implicit costs):** firmanın sahip olduğu kaynakların fırsat maliyeti — sahibinin başka yerde çalışsa alacağı maaş, işletmeye koyduğu sermayenin başka yerde getireceği faiz.

:::tanim Economic profit
Explicit and implicit revenue minus explicit and implicit cost.
:::

**Muhasebe kârı** yalnız açık maliyetleri düşer; **iktisadi kâr** örtük maliyetleri de düşer. Bu yüzden iktisadi kâr muhasebe kârından küçüktür.

:::ornek Kafe işletmek kârlı mı?
Bir kafenin yıllık geliri 3 milyon TL, açık maliyetleri (kira, maaş, malzeme) 2,4 milyon TL. Sahibi kafeye 2 milyon TL kendi parasını yatırmış; bu para mevduatta yıllık %40 getirebilirdi. Sahibi kafede çalışmasa başka bir yerde yıllık 600 bin TL maaş alabilirdi. Muhasebe ve iktisadi kâr nedir?
---cozum---
Muhasebe kârı = 3,0 − 2,4 = **0,6 milyon TL**.

Örtük maliyetler: sermayenin fırsat maliyeti 2 × 0,40 = 0,8 milyon; sahibin vazgeçtiği maaş 0,6 milyon. Toplam 1,4 milyon.

İktisadi kâr = 0,6 − 1,4 = **−0,8 milyon TL**. Kafe muhasebe olarak kâr gösteriyor ama iktisadi açıdan zarar ediyor: sahibi parasını bankaya koyup başka yerde çalışsa daha iyi durumda olurdu.
:::

İktisadi kârın sıfır olması "kötü" değildir: bu, firmanın kaynaklarının en iyi alternatif kadar kazandığı anlamına gelir. Buna **normal kâr** denir.
` },
      { baslik: "Kısa dönem ve uzun dönem", md: R`
İktisatta "kısa" ve "uzun" dönem takvimle değil, **girdilerin esnekliğiyle** tanımlanır:

- **Kısa dönem (short run):** en az bir girdinin **sabit** olduğu dönem. Genellikle fabrika büyüklüğü, makineler (sermaye) sabittir; emek ve hammadde artırılıp azaltılabilir.
- **Uzun dönem (long run):** **bütün girdilerin değişken** olduğu dönem. Firma fabrikasını büyütebilir, küçültebilir, kapatabilir.

Bir simitçi için kısa dönem birkaç hafta olabilir (yeni fırın almak için), bir rafineri için on yıl.

:::ipucu
Kısa dönemde **sabit maliyet** vardır; uzun dönemde bütün maliyetler değişkendir. Sınavda "uzun dönemde sabit maliyet ne kadardır?" sorusunun cevabı: **sıfır** (hiç yoktur).
:::
` },
      { baslik: "Üretim tablosu ve azalan marjinal verim", md: R`
Kısa dönemde sabit bir fabrikaya işçi ekledikçe üretim nasıl değişir? Üç kavram:

- **Toplam ürün (TP, total product):** belli bir emek miktarıyla üretilen toplam çıktı.
- **Marjinal ürün (MP, marginal product):** bir işçi daha eklemenin getirdiği ek çıktı: $MP = \Delta TP / \Delta L$.
- **Ortalama ürün (AP, average product):** işçi başına çıktı: $AP = TP / L$.

| İşçi (L) | TP | MP | AP |
|---|---|---|---|
| 0 | 0 | — | — |
| 1 | 4 | 4 | 4,0 |
| 2 | 10 | 6 | 5,0 |
| 3 | 17 | 7 | 5,7 |
| 4 | 23 | 6 | 5,75 |
| 5 | 28 | 5 | 5,6 |
| 6 | 31 | 3 | 5,2 |
| 7 | 32 | 1 | 4,6 |
| 8 | 31 | −1 | 3,9 |

İlk işçilerde MP artıyor: uzmanlaşma ve iş bölümü verimliliği artırıyor (**artan marjinal verim**). Bir noktadan sonra MP düşmeye başlıyor:

:::tanim Law of diminishing marginal productivity
As more and more of a variable input is added to an existing fixed input, after some point the additional output one gets from the additional input will fall.
:::

Neden? Çünkü sabit girdi (makine, alan) artık işçiler arasında paylaşılıyor: mutfağa ikinci aşçıyı eklemek çok işe yarar, onuncuyu eklemek birbirlerinin ayağına basmalarına yol açar. Sekizinci işçide MP **negatif**: toplam üretim düşüyor.

{{uretim-fonksiyonu}}

:::dikkat
Azalan marjinal verim, **toplam ürünün azalması** değildir; *ek* ürünün azalmasıdır. TP, MP pozitif olduğu sürece artmaya devam eder (ama giderek yavaşlayarak). Ayrıca bu yasa **kısa dönem** yasasıdır — en az bir girdi sabitken geçerlidir. Bütün girdiler birlikte artırılınca olan şey (ölçek ekonomileri) 12. bölümün konusu.
:::

**Ortalama–marjinal ilişkisi:** MP, AP'nin üstündeyse AP'yi yukarı çeker; altındaysa aşağı çeker. Bu yüzden MP, AP'yi en yüksek noktasından keser. (Not ortalamanla aynı mantık: ortalamandan yüksek bir not alırsan ortalaman yükselir.)
` },
      { baslik: "Maliyet kavramları", md: R`
Üretim tablosundan maliyetlere geçiyoruz. Kısa dönemin maliyet ailesi:

| Kavram | Tanım | Formül |
|---|---|---|
| **Sabit maliyet (FC)** | Üretim miktarından bağımsız: kira, makine amortismanı | — |
| **Değişken maliyet (VC)** | Üretimle değişir: ücret, hammadde | — |
| **Toplam maliyet (TC)** | Hepsi | $TC = FC + VC$ |
| **Ortalama sabit maliyet (AFC)** | Birim başına sabit maliyet | $AFC = FC/Q$ |
| **Ortalama değişken maliyet (AVC)** | Birim başına değişken maliyet | $AVC = VC/Q$ |
| **Ortalama toplam maliyet (ATC)** | Birim maliyet | $ATC = TC/Q = AFC + AVC$ |
| **Marjinal maliyet (MC)** | Bir birim daha üretmenin ek maliyeti | $MC = \Delta TC/\Delta Q = \Delta VC/\Delta Q$ |

:::ornek Maliyet tablosunu doldur
Bir firmanın sabit maliyeti 50. Değişken maliyetleri: Q = 1 → 30, Q = 2 → 50, Q = 3 → 66, Q = 4 → 90, Q = 5 → 130. Q = 3 ve Q = 5 için TC, ATC, AVC ve MC'yi hesapla.
---cozum---
**Q = 3:** TC = 50 + 66 = 116; ATC = 116/3 ≈ 38,7; AVC = 66/3 = 22; MC = 66 − 50 = 16.

**Q = 5:** TC = 50 + 130 = 180; ATC = 180/5 = 36; AVC = 130/5 = 26; MC = 130 − 90 = 40.

Dikkat: Q = 4'te ATC = 140/4 = 35'ti. Beşinci birimin marjinal maliyeti (40) bu ortalamanın üstünde olduğu için ATC 35'ten 36'ya **yükseldi** — ortalama–marjinal kuralı. MC'nin hesabında sabit maliyet hiç kullanılmadı: **sabit maliyet marjinal maliyeti etkilemez.**
:::

:::tanim Marginal cost
The increase (decrease) in total cost from increasing (or decreasing) the level of output by one unit.
:::
` },
      { baslik: "Maliyet eğrilerinin biçimi", md: R`
Maliyetleri grafiğe dökünce tanıdık bir aile ortaya çıkar:

- **FC** yatay bir doğru; **AFC** sürekli düşer (sabit maliyet daha çok birime yayılır).
- **MC** önce düşer (artan marjinal verim), sonra yükselir (azalan marjinal verim): "kalkan bir J" ya da U biçimi.
- **AVC** ve **ATC** U biçimlidir. ATC ile AVC arasındaki dikey uzaklık AFC'dir ve Q arttıkça daralır.
- **MC, AVC'yi ve ATC'yi en düşük noktalarından keser.** Ortalama–marjinal kuralının sonucu: marjinal ortalamanın altındaysa ortalamayı düşürür, üstündeyse yükseltir.

{{maliyet-egrileri}}

:::ipucu
Sınavda maliyet eğrisi çizerken üç kontrol yap: (1) MC, AVC ve ATC'yi **en düşük noktalarından** kesiyor mu? (2) ATC'nin en düşük noktası AVC'ninkinin **sağında ve üstünde** mi? (3) ATC ile AVC arasındaki fark Q büyüdükçe **daralıyor** mu?
:::
` },
      { baslik: "Verimlilik ve maliyet: ayna görüntüsü", md: R`
Emek tek değişken girdiyse ve ücret $W$ sabitse, maliyet eğrileri üretim eğrilerinin aynadaki görüntüsüdür:

$$MC = \frac{W}{MP} \qquad\qquad AVC = \frac{W}{AP}$$

- MP **yükselirken** MC **düşer**; MP en yüksekteyken MC en düşüktedir.
- AP en yüksekteyken AVC en düşüktedir.

:::ornek Ayna ilişkisini sına
Ücret saatte 200 TL. Bir işçi daha eklemek üretimi 8 birim artırıyorsa (MP = 8) o aralıkta marjinal maliyet nedir? İşçi başına ortalama üretim 10 ise AVC nedir?
---cozum---
$MC = 200/8 = $ **25 TL**; $AVC = 200/10 = $ **20 TL**. MP düşüp 4'e inerse MC 50 TL'ye çıkar: azalan marjinal verim, artan marjinal maliyet olarak görünür.
:::

Bu ilişki, maliyet eğrilerinin *neden* o biçimde olduğunu açıklar: maliyetler teknolojiden (üretim fonksiyonundan) ve girdi fiyatlarından türer. Girdi fiyatı artarsa bütün maliyet eğrileri yukarı kayar; teknoloji ilerlerse aşağı kayar — 4. bölümdeki arz kaydırıcılarının kaynağı budur.
` },
    ],
    ozet: [
      "Kâr = toplam gelir − toplam maliyet. İktisadi kâr örtük maliyetleri de düşer; sıfır iktisadi kâr = normal kâr.",
      "Kısa dönemde en az bir girdi sabit, uzun dönemde hepsi değişken.",
      "TP, MP = ΔTP/ΔL, AP = TP/L. Azalan marjinal verim yasası: sabit girdiye değişken girdi eklendikçe bir noktadan sonra ek ürün azalır.",
      "TC = FC + VC; AFC, AVC, ATC birim maliyetler; MC = ΔTC/ΔQ. Sabit maliyet MC'yi etkilemez.",
      "AVC ve ATC U biçimli; MC onları en düşük noktalarından keser; AFC sürekli düşer.",
      "Ayna ilişkisi: MC = W/MP, AVC = W/AP.",
    ],
    terimler: [
      ["economic profit", "iktisadi kâr", "Explicit and implicit revenue minus explicit and implicit cost."],
      ["accounting profit", "muhasebe kârı", "Total revenue minus explicit costs only."],
      ["explicit cost", "açık maliyet", "A cost that requires an actual payment of money."],
      ["implicit cost", "örtük maliyet", "The opportunity cost of resources owned by the firm, such as the owner's time and capital."],
      ["normal profit", "normal kâr", "Zero economic profit; the firm's resources earn as much as in their next-best use."],
      ["short run", "kısa dönem", "The period in which some inputs are fixed."],
      ["long run", "uzun dönem", "The period in which all inputs are variable."],
      ["total product", "toplam ürün", "The total output produced with a given quantity of inputs."],
      ["marginal product", "marjinal ürün", "The additional output that will be forthcoming from an additional worker, other inputs constant."],
      ["average product", "ortalama ürün", "Output per worker: total product divided by the quantity of the variable input."],
      ["law of diminishing marginal productivity", "azalan marjinal verim yasası", "As more of a variable input is added to an existing fixed input, after some point the additional output from the additional input will fall."],
      ["fixed cost", "sabit maliyet", "Cost that is spent and cannot be changed in the period of time under consideration."],
      ["variable cost", "değişken maliyet", "Cost that changes as output changes."],
      ["total cost", "toplam maliyet", "The sum of fixed and variable costs."],
      ["average fixed cost", "ortalama sabit maliyet", "Fixed cost divided by quantity produced."],
      ["average variable cost", "ortalama değişken maliyet", "Variable cost divided by quantity produced."],
      ["average total cost", "ortalama toplam maliyet", "Total cost divided by quantity produced."],
      ["marginal cost", "marjinal maliyet", "The increase in total cost from increasing output by one unit."],
    ],
    quiz: [
      { s: "Economic profit differs from accounting profit because economic profit:", c: ["Ignores explicit costs", "Subtracts implicit costs as well as explicit costs", "Includes sunk costs", "Is always larger"], d: 1, a: "İktisadi kâr örtük maliyetleri (sahibin zamanı, sermayenin fırsat maliyeti) de düşer; bu yüzden muhasebe kârından küçüktür." },
      { s: "A café earns revenue of 3.0 million, explicit costs of 2.4 million, and implicit costs of 1.4 million. Its economic profit is:", c: ["0.6 million", "−0.8 million", "1.4 million", "2.0 million"], d: 1, a: "3,0 − 2,4 − 1,4 = −0,8 milyon. Muhasebe kârı +0,6 ama iktisadi olarak zarar." },
      { s: "The short run is defined as a period in which:", c: ["Less than one year passes", "At least one input is fixed", "All inputs are variable", "Prices are fixed"], d: 1, a: "Kısa dönem takvimle değil girdilerle tanımlanır: en az bir girdi sabittir." },
      { s: "In the long run, fixed costs are:", c: ["Highest", "Equal to variable costs", "Zero (all costs are variable)", "Equal to marginal cost"], d: 2, a: "Uzun dönemde bütün girdiler değişken olduğu için sabit maliyet yoktur." },
      { s: "If TP rises from 23 to 28 when the 5th worker is hired, the marginal product of the 5th worker is:", c: ["5", "5.6", "28", "23"], d: 0, a: "MP = ΔTP / ΔL = 28 − 23 = 5." },
      { s: "The law of diminishing marginal productivity states that:", c: ["Total product falls as more workers are hired", "After some point, adding more of a variable input to a fixed input yields smaller additions to output", "All inputs become less productive in the long run", "Average cost always falls"], d: 1, a: "Ek ürün azalır; toplam ürün azalmak zorunda değildir. Yasa kısa dönem yasasıdır." },
      { s: "When marginal product is above average product, average product is:", c: ["Falling", "Rising", "At its minimum", "Zero"], d: 1, a: "Marjinal ortalamanın üstündeyse ortalamayı yukarı çeker." },
      { s: "Fixed cost is 50 and variable cost at Q = 5 is 130. Average total cost at Q = 5 is:", c: ["26", "36", "40", "180"], d: 1, a: "TC = 180; ATC = 180/5 = 36." },
      { s: "If variable cost rises from 90 to 130 when output rises from 4 to 5, marginal cost is:", c: ["26", "36", "40", "130"], d: 2, a: "MC = ΔVC / ΔQ = 130 − 90 = 40. Sabit maliyet MC'yi etkilemez." },
      { s: "The marginal cost curve intersects the average variable cost curve:", c: ["At the maximum of AVC", "At the minimum of AVC", "Where AVC equals AFC", "Never"], d: 1, a: "MC, AVC'nin (ve ATC'nin) en düşük noktasından geçer: ortalama–marjinal kuralı." },
      { s: "As output increases, the vertical distance between ATC and AVC:", c: ["Increases", "Decreases, because it equals AFC", "Stays constant", "Equals marginal cost"], d: 1, a: "ATC − AVC = AFC = FC/Q; Q arttıkça küçülür." },
      { s: "If the wage is 200 and the marginal product of labor is 8, marginal cost is:", c: ["8", "25", "200", "1600"], d: 1, a: "MC = W / MP = 200 / 8 = 25. MP düşerse MC yükselir: ayna ilişkisi." },
    ],
  });
})();
