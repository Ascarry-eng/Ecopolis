// Colander 11e — 12. bölüm: Production and Cost Analysis II (+ ek: eş-ürün/eş-maliyet) (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m12",
    hedefler: [
      "Uzun dönem ortalama maliyet eğrisini kısa dönem eğrilerin zarfı olarak çizmek",
      "Ölçek ekonomilerini, sabit getiriyi ve ölçek eksi ekonomilerini nedenleriyle açıklamak",
      "En küçük etkin ölçeği ve piyasa yapısıyla ilişkisini tartışmak",
      "Teknik etkinlik ile iktisadi etkinliği ayırmak; kapsam ekonomilerini ve yaparak öğrenmeyi tanımlamak",
      "Girişimcinin maliyet eğrilerini nasıl 'yarattığını' açıklamak",
      "Eş-ürün ve eş-maliyet eğrileriyle en düşük maliyetli girdi bileşimini bulmak",
    ],
    bolumler: [
      { baslik: "Uzun dönemde maliyetler", md: R`
Uzun dönemde bütün girdiler değişkendir: firma fabrikanın büyüklüğünü de seçebilir. Her fabrika büyüklüğünün kendi kısa dönem ortalama maliyet eğrisi (SRATC) vardır. Firma her üretim düzeyi için o düzeyi **en ucuza** üreten fabrikayı seçer.

:::tanim Long-run average total cost (LRATC) curve
A curve that shows the lowest average total cost at which a firm can produce a given level of output, when all inputs are variable; the envelope of short-run average total cost curves.
:::

LRATC, kısa dönem eğrilerinin **zarfıdır (envelope)**: her SRATC'ye bir noktada değer ama onların altına inmez.

{{uzun-donem}}

:::dikkat
Uzun dönemde **azalan marjinal verim yasası geçerli değildir**: o yasa en az bir girdinin sabit olmasını gerektirir. LRATC'nin biçimini ölçek ekonomileri ve eksi ekonomileri belirler — bambaşka nedenler.
:::
` },
      { baslik: "Ölçek ekonomileri ve eksi ekonomileri", md: R`
Bütün girdiler aynı oranda artırılınca çıktı ne olur?

| Durum | Çıktı | LRATC |
|---|---|---|
| **Ölçek ekonomileri** (economies of scale) | Girdilerden daha hızlı artar | Düşer |
| **Sabit ölçek getirisi** (constant returns to scale) | Girdilerle aynı oranda artar | Yatay |
| **Ölçek eksi ekonomileri** (diseconomies of scale) | Girdilerden daha yavaş artar | Yükselir |

### Ölçek ekonomilerinin nedenleri
- **Uzmanlaşma ve iş bölümü:** büyük firmada her çalışan bir işte uzmanlaşabilir (Adam Smith'in toplu iğne fabrikası).
- **Bölünemeyen kurulum maliyetleri (indivisible setup costs):** bir montaj hattı, bir yazılım platformu, bir araştırma laboratuvarı — ister 100 ister 100.000 birim üret, aynı maliyet. Daha çok birime yayıldıkça birim maliyet düşer.
- **Toplu alım ve finansman avantajı:** büyük firma girdiyi indirimli alır, daha ucuza borçlanır.
- **Teknik nedenler:** bir tankın hacmi kenar uzunluğunun küpüyle, yüzeyi (malzeme maliyeti) karesiyle artar.

### Ölçek eksi ekonomilerinin nedenleri
- **İzleme ve koordinasyon maliyetleri:** firma büyüdükçe yönetim katmanları artar, bilgi bozularak iletilir, kararlar yavaşlar.
- **Takım ruhunun kaybı:** çalışanlar kendini dev bir makinenin dişlisi gibi hisseder, motivasyon düşer.

:::tanim Minimum efficient scale
The amount of production at which economies of scale end and constant returns to scale begin.
:::

**En küçük etkin ölçek (MES)** piyasa yapısını şekillendirir. MES, piyasanın toplam talebine göre küçükse çok sayıda firma etkin biçimde var olabilir (rekabetçi piyasa). MES piyasanın büyük bir kısmını gerektiriyorsa ancak birkaç firma sığar (oligopol); tek firma bile piyasanın tamamını en ucuza üretiyorsa **doğal tekel** ortaya çıkar (14. ve 16. bölüm).

:::gercek
Otomobil üretiminde etkin ölçek yılda yüz binlerce araç gibi çok büyüktür; bu yüzden dünyada az sayıda büyük üretici vardır ve Türkiye'deki fabrikalar (Bursa, Kocaeli, Sakarya) çoğunlukla küresel markaların ihracata yönelik üretim üsleridir. Fırıncılıkta ise MES küçüktür: her mahallede bir fırın ekonomik olarak var olabilir.
:::
` },
      { baslik: "Teknik ve iktisadi etkinlik", md: R`
İki farklı etkinlik kavramı karıştırılmamalı:

- **Teknik etkinlik (technical efficiency):** verili girdilerle mümkün olan en çok çıktıyı üretmek; hiçbir girdi israf edilmez.
- **İktisadi etkinlik (economic efficiency):** girdi fiyatlarını da hesaba katarak, belirli bir çıktıyı **en düşük maliyetle** üretmek.

Bir üretim yöntemi teknik olarak etkin olup iktisadi olarak etkinsiz olabilir. Örneğin bir hendek, bir kazı makinesiyle ya da yüz işçiyle kazılabilir; ikisi de teknik olarak etkin olabilir. Hangisinin iktisadi olarak etkin olduğu **ücretlere ve makinenin fiyatına** bağlıdır. Bu yüzden ücretlerin düşük olduğu ülkelerde emek yoğun, yüksek olduğu ülkelerde sermaye yoğun yöntemler seçilir — her ikisi de kendi koşullarında akılcıdır.

### Kapsam ekonomileri ve yaparak öğrenme
- **Kapsam ekonomileri (economies of scope):** birden fazla malı birlikte üretmenin, ayrı ayrı üretmekten ucuz olması. Bir banka mevduat, kredi ve sigortayı aynı şube ağı ve müşteri verisiyle sunar; bir rafineri benzin, motorin ve asfaltı aynı ham petrolden çıkarır.
- **Yaparak öğrenme (learning by doing):** toplam üretim birikimi arttıkça işçiler ve yöneticiler deneyim kazanır, birim maliyet düşer. Uçak ve yarı iletken üretiminde güçlüdür. Ölçek ekonomilerinden farkı: o an ne kadar *büyük* ürettiğine değil, bugüne kadar *toplam* ne kadar ürettiğine bağlıdır.

:::gercek
Colander'ın kutularından biri **3 boyutlu yazıcılardır**: geleneksel üretimde kalıp ve montaj hattı gibi bölünemeyen maliyetler ölçek ekonomisi yaratır; 3B yazıcıyla tek bir parçayı üretmek de binincisini üretmek de neredeyse aynı birim maliyete sahiptir. Teknoloji, ölçek ekonomilerinin önemini azaltabilir ve küçük üreticilere alan açabilir.
:::
` },
      { baslik: "Girişimcilik ve maliyetler", md: R`
Ders kitabı maliyet eğrilerini sanki doğadan verilmiş gibi çizer. Colander bunun gerçekliğin basitleştirilmiş hâli olduğunu vurgular: **maliyet eğrilerini girişimciler yaratır.** Hangi teknolojinin seçileceği, üretimin nasıl örgütleneceği, hangi tedarikçiyle çalışılacağı, nerede üretileceği — hepsi girişimcinin kararıdır ve maliyetleri belirler.

Gerçek dünyada maliyet analizi şunları da hesaba katmalıdır:

- **Ölçülmeyen maliyetler:** muhasebede görünmeyen fırsat maliyetleri.
- **Zamanla değişen maliyetler:** öğrenme, teknolojik değişim.
- **Çok boyutlu karar:** firma yalnız miktarı değil kaliteyi, ürün çeşitliliğini, konumu da seçer.

:::ipucu
Colander'ın neden ders kitaplarının bu kadar uzun olduğunu soran kutusu ölçek ekonomilerine güzel bir örnektir: bir kitabı yazmanın ve dizmenin maliyeti bölünemez bir kurulum maliyetidir; yayıncı, ek bölümlerle daha çok hocanın ihtiyacını karşılayıp daha çok kopya satmayı tercih eder.
:::
` },
      { baslik: "Ek: eş-ürün ve eş-maliyet analizi", md: R`
İki girdi (emek L ve sermaye K) ile üretim yapan bir firma, belirli bir çıktıyı en ucuza nasıl üretir?

:::tanim Isoquant
A curve that represents combinations of factors of production that result in equal amounts of output.
:::

**Eş-ürün eğrisi** aynı çıktıyı veren bütün (L, K) bileşimlerini gösterir. Eğimi, bir girdiden vazgeçip ötekiyle telafi etme oranıdır: **teknik ikame oranı** $= MP_L / MP_K$. Eğri orijine göre dışbükeydir, çünkü bir girdiden çok kullandıkça onun marjinal ürünü düşer.

:::tanim Isocost line
A line that represents alternative combinations of factors of production that have the same costs.
:::

**Eş-maliyet doğrusu** $wL + rK = C$; eğimi girdi fiyatları oranı $-w/r$'dir.

En düşük maliyetli bileşim, eş-ürün eğrisinin eş-maliyet doğrusuna **teğet** olduğu noktadır:

$$\frac{MP_L}{MP_K} = \frac{w}{r} \qquad\Longleftrightarrow\qquad \frac{MP_L}{w} = \frac{MP_K}{r}$$

Sağdaki biçim sezgiyi verir: son liranın emeğe de sermayeye de **aynı ek çıktıyı** getirmesi gerekir. Getirmiyorsa parayı verimli olana kaydırarak aynı maliyetle daha çok üretebilirsin. (19. bölümdeki tüketicinin MU/P kuralının üretici karşılığı.)

{{esurun}}

:::ornek Ücret artarsa
$MP_L = 20$, $MP_K = 30$, ücret $w = 10$, sermayenin fiyatı $r = 20$. Firma en ucuz bileşimde mi? Değilse hangi girdiyi artırmalı?
---cozum---
$MP_L / w = 20/10 = 2$, $MP_K / r = 30/20 = 1{,}5$. Emeğe harcanan son lira 2, sermayeye harcanan 1,5 birim çıktı getiriyor. Firma **emeği artırıp sermayeyi azaltmalı**. Emek arttıkça $MP_L$ düşer, sermaye azaldıkça $MP_K$ artar; oranlar eşitlenene kadar devam eder.
:::
` },
    ],
    ozet: [
      "Uzun dönemde bütün girdiler değişkendir; LRATC kısa dönem ATC eğrilerinin zarfıdır.",
      "Ölçek ekonomileri (uzmanlaşma, bölünemeyen kurulum maliyetleri) LRATC'yi düşürür; ölçek eksi ekonomileri (izleme, koordinasyon) yükseltir.",
      "En küçük etkin ölçek, ölçek ekonomilerinin bittiği yerdir ve piyasada kaç firma olabileceğini etkiler.",
      "Teknik etkinlik girdi israfı olmaması, iktisadi etkinlik en düşük maliyettir; hangisinin etkin olduğu girdi fiyatlarına bağlıdır.",
      "Kapsam ekonomileri: birlikte üretmenin ucuzluğu. Yaparak öğrenme: birikimli üretimle maliyetin düşmesi.",
      "En ucuz girdi bileşimi: MP_L/w = MP_K/r; grafikte eş-ürün eğrisinin eş-maliyet doğrusuna teğet olduğu nokta.",
    ],
    terimler: [
      ["long-run average total cost curve", "uzun dönem ortalama maliyet eğrisi", "Shows the lowest average total cost at which a firm can produce each level of output when all inputs are variable."],
      ["envelope relationship", "zarf ilişkisi", "The LRATC curve is the envelope of short-run ATC curves; it never lies above any of them."],
      ["economies of scale", "ölçek ekonomileri", "Long-run average total cost decreases as output increases."],
      ["constant returns to scale", "sabit ölçek getirisi", "Long-run average total cost does not change as output increases."],
      ["diseconomies of scale", "ölçek eksi ekonomileri", "Long-run average total cost increases as output increases."],
      ["indivisible setup cost", "bölünemeyen kurulum maliyeti", "The cost of an indivisible input for which a certain minimum amount of production must be undertaken before the input becomes economically feasible to use."],
      ["minimum efficient scale", "en küçük etkin ölçek", "The amount of production at which economies of scale end and constant returns to scale begin."],
      ["monitoring costs", "izleme maliyetleri", "Costs incurred by the organizer of production in seeing to it that the employees do what they're supposed to do."],
      ["technical efficiency", "teknik etkinlik", "Producing the maximum output with a given set of inputs; no input is wasted."],
      ["economic efficiency", "iktisadi etkinlik", "Producing a given output at the lowest possible cost, given input prices."],
      ["economies of scope", "kapsam ekonomileri", "The costs of producing goods are interdependent so that it's less costly for a firm to produce one good when it's already producing another."],
      ["learning by doing", "yaparak öğrenme", "Becoming better at a task the more often you perform it; costs fall as cumulative output rises."],
      ["isoquant", "eş-ürün eğrisi", "A curve that represents combinations of factors of production that result in equal amounts of output."],
      ["isocost line", "eş-maliyet doğrusu", "A line that represents alternative combinations of factors of production that have the same costs."],
      ["marginal rate of technical substitution", "teknik ikame oranı", "The rate at which one input can be substituted for another while keeping output constant; MP_L / MP_K."],
    ],
    quiz: [
      { s: "The long-run average total cost curve is:", c: ["The sum of all short-run ATC curves", "The envelope of short-run ATC curves", "Always horizontal", "The same as the marginal cost curve"], d: 1, a: "LRATC her üretim düzeyinde en ucuz fabrikanın maliyetini gösterir; kısa dönem eğrilerinin zarfıdır." },
      { s: "Economies of scale occur when:", c: ["Long-run average cost falls as output increases", "Marginal product falls as more labor is hired", "Fixed costs rise", "Long-run average cost rises as output increases"], d: 0, a: "Bütün girdiler artırıldığında çıktı daha hızlı artarsa LRATC düşer: ölçek ekonomileri." },
      { s: "The law of diminishing marginal productivity explains the shape of:", c: ["The long-run average cost curve", "The short-run cost curves", "The isocost line", "The demand curve"], d: 1, a: "Azalan marjinal verim kısa dönem yasasıdır (bir girdi sabit). LRATC'nin biçimini ölçek ekonomileri belirler." },
      { s: "Which is a typical cause of diseconomies of scale?", c: ["Specialization of labor", "Indivisible setup costs", "Rising monitoring and coordination costs", "Bulk purchasing discounts"], d: 2, a: "Firma büyüdükçe izleme ve koordinasyon zorlaşır; diğer üç seçenek ölçek ekonomisi nedenidir." },
      { s: "The minimum efficient scale is:", c: ["The output at which economies of scale end and constant returns begin", "The smallest possible output", "The output where profit is maximized", "The output where MC is minimized"], d: 0, a: "MES, LRATC'nin en düşük düzeye ilk ulaştığı üretim miktarıdır." },
      { s: "If the minimum efficient scale is very large relative to market demand, the industry will likely have:", c: ["Many small firms", "Only a few firms or a single firm", "Perfect competition", "No firms"], d: 1, a: "Etkin ölçek pazarın büyük kısmını gerektiriyorsa ancak birkaç firma sığar; uç durumda doğal tekel." },
      { s: "A method of production that uses the fewest inputs is technically efficient. Whether it is also economically efficient depends on:", c: ["The number of firms", "The relative prices of the inputs", "Consumer demand only", "Government regulation only"], d: 1, a: "İktisadi etkinlik maliyete bakar; teknik olarak etkin yöntemlerden hangisinin en ucuz olduğu girdi fiyatlarına bağlıdır." },
      { s: "A bank finds it cheaper to offer loans, deposits and insurance together than separately. This is an example of:", c: ["Economies of scale", "Economies of scope", "Learning by doing", "Diseconomies of scale"], d: 1, a: "Birden fazla ürünü birlikte üretmenin ucuzluğu kapsam ekonomisidir." },
      { s: "Unit costs in aircraft production fall as the total number of planes produced over time increases. This is called:", c: ["Economies of scope", "Learning by doing", "Constant returns to scale", "Diminishing marginal productivity"], d: 1, a: "Birikimli üretim arttıkça deneyim maliyeti düşürür: yaparak öğrenme." },
      { s: "At the cost-minimizing combination of labor and capital:", c: ["$MP_L = MP_K$", "$MP_L / w = MP_K / r$", "$w = r$", "$MP_L / MP_K = r / w$"], d: 1, a: "Son liranın iki girdiye de aynı ek çıktıyı getirmesi gerekir: MP_L/w = MP_K/r (eşdeğeri MP_L/MP_K = w/r)." },
      { s: "$MP_L = 20$, $w = 10$, $MP_K = 30$, $r = 20$. To minimize cost, the firm should:", c: ["Use more capital and less labor", "Use more labor and less capital", "Keep the same combination", "Stop producing"], d: 1, a: "MP_L/w = 2 > MP_K/r = 1,5: emeğe harcanan lira daha verimli; emeği artırıp sermayeyi azalt." },
      { s: "The slope of an isocost line equals:", c: ["$-MP_L / MP_K$", "$-w / r$", "Total cost", "The marginal product of labor"], d: 1, a: "wL + rK = C → K = C/r − (w/r)L: eğim −w/r." },
    ],
  });
})();
