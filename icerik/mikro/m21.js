// Colander 11e — 21. bölüm: Thinking Like a Modern Economist (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m21",
    hedefler: [
      "Geleneksel modelin varsayımlarını ve modern iktisadın onları nasıl genişlettiğini açıklamak",
      "Davranışsal iktisadın yapı taşlarını tanımak: aydınlanmış öz çıkar, öngörülebilir akıldışılık, sınırlı rasyonellik",
      "Bilişsel yanlılıkları (çerçeveleme, çapalama, sahiplik etkisi, kayıptan kaçınma, şimdiki zaman yanlılığı) örneklerle açıklamak",
      "Modern ampirik yöntemleri (doğal deneyler, laboratuvar ve saha deneyleri, simülasyonlar) ayırmak",
      "Modellerin ve gerçeğin ilişkisini Colander'ın 'iktisat sanatı' çerçevesinde değerlendirmek",
    ],
    bolumler: [
      { baslik: "Geleneksel model ve modern iktisat", md: R`
Şimdiye kadar kullandığımız modellerin çoğu **geleneksel modeldir**: bireyler akılcıdır, kendi çıkarlarını gözetir ve mevcut bilgiyi en iyi biçimde kullanır. Bu model güçlü ve kullanışlıdır — ama gerçek insanlar her zaman böyle davranmaz.

Colander'ın bu bölümdeki mesajı: **modern iktisatçı geleneksel modeli bırakmaz, onu genişletir.** İki büyük gelişme bunu mümkün kıldı:

1. **Davranışsal iktisat:** psikolojiden ve deneylerden gelen bulgularla insan davranışını daha gerçekçi modellemek.
2. **Yeni ampirik yöntemler:** bilgisayarların ve büyük verinin gücüyle kuramları veriyle çok daha sıkı sınamak.

:::ipucu
Geleneksel model bir **kıyaslama noktasıdır** (benchmark): insanların ondan nerede ve neden saptığını sormamızı sağlar. Tam rekabet modeli gibi, "doğru" olduğu için değil, düşünmeyi düzenlediği için değerlidir.
:::
` },
      { baslik: "Davranışsal iktisadın yapı taşları", md: R`
### 1. Aydınlanmış öz çıkar (enlightened self-interest)
İnsanlar kendi çıkarlarını gözetir, ama yalnız onu değil: adalete, karşılıklılığa, başkalarının iyiliğine de değer verirler. 20. bölümdeki ültimatom oyununda adaletsiz teklifleri kendi zararlarına reddetmeleri bunun kanıtıdır. Bağış yapmak, oy vermek, bahşiş bırakmak (bir daha gitmeyeceğin bir şehirde bile) dar öz çıkarla açıklanamaz.

### 2. Öngörülebilir akıldışılık (predictably irrational behavior)
Dan Ariely'nin kitabının adıyla: insanlar akılcı modelden **rastgele değil, sistematik olarak** sapar. Sapmalar öngörülebilir olduğu için modellenebilir. (Aşağıda başlıcalarını göreceğiz.)

### 3. Sınırlı rasyonellik (bounded rationality)
:::tanim Bounded rationality
Rationality limited by the information people have, the cognitive capacity of their minds, and the time available to make decisions.
:::

Herbert Simon'un kavramı: insanların bilgisi, zihinsel kapasitesi ve zamanı sınırlıdır. Bu yüzden her kararı baştan hesaplamak yerine **pratik kurallar (heuristics)** kullanırlar ve "en iyisi" yerine **yeterince iyi** olanı seçerler (Simon'un deyişiyle *satisficing*). Bu da bir tür akılcılıktır: her şeyi hesaplamanın maliyeti çok yüksek olduğunda kural kullanmak mantıklıdır.

:::gercek
Davranışsal iktisat son yirmi beş yılda üç Nobel getirdi: **Daniel Kahneman** (2002, psikolog olmasına rağmen), **Robert Shiller** (2013, finansal piyasalarda akıldışı coşku) ve **Richard Thaler** (2017, dürtme). Kahneman'ın *Hızlı ve Yavaş Düşünme* kitabı bu alanın en iyi girişlerinden biridir.
:::
` },
      { baslik: "Sistematik sapmalar: bilişsel yanlılıklar", md: R`
**Çerçeveleme etkisi (framing effect).** Aynı seçim, nasıl sunulduğuna göre farklı yapılır. "%90 hayatta kalma oranı" ile "%10 ölüm oranı" aynı bilgidir; ama birincisini duyan hastalar ameliyatı çok daha sık kabul eder.

**Çapalama (anchoring).** Kararlar, alakasız bile olsa ilk duyulan sayıya yaslanır. Bir mağazada önce 5.000 TL'lik ceketi görmek, 2.000 TL'lik ceketi ucuz gösterir. Pazarlıkta ilk teklif bu yüzden önemlidir.

**Sahiplik etkisi (endowment effect).** İnsanlar sahip oldukları bir şeye, sahip olmadıkları aynı şeyden daha fazla değer biçer. Deneylerde kendisine kupa verilen öğrenciler onu satmak için, kupası olmayanların almak için ödemeye razı olduğunun yaklaşık iki katını ister.

**Kayıptan kaçınma (loss aversion).** 100 TL kaybetmenin acısı, 100 TL kazanmanın sevincinden büyüktür (yaklaşık iki katı). Bu yüzden yatırımcılar zarardaki hisseyi satmakta direnir, kârdakini erken satar.

**Statüko yanlılığı (status quo bias).** Mevcut durumu, varsayılanı değiştirmemek. 22. bölümdeki dürtme politikalarının temeli.

**Şimdiki zaman yanlılığı (present bias).** İnsanlar bugüne orantısız ağırlık verir. "Bir yıl sonra 100 TL mi, bir yıl bir hafta sonra 110 TL mi?" sorusunda çoğu kişi bekler; "bugün 100 TL mi, bir hafta sonra 110 TL mi?" sorusunda çoğu kişi hemen alır. Aynı bir haftalık bekleyiş, bugüne yakınken çok daha "pahalı" görünür. Diyete pazartesi başlama, ödevi son geceye bırakma, emeklilik için birikim yapmama…

{{simdiki-yanlilik}}

**Zihinsel muhasebe (mental accounting).** Para birbirinin yerine geçebilir (fungible) olduğu hâlde insanlar onu zihinsel "kasalara" ayırır: ikramiye "bonus para" sayılıp kolayca harcanır, aynı miktarda maaş ise harcanmaz.

**Aşırı güven (overconfidence).** Sürücülerin çoğu kendini ortalamanın üstünde sürücü sayar; yatırımcılar piyasayı yenebileceklerine inanır ve fazla işlem yapar.

:::dikkat
Bu yanlılıklar insanların "aptal" olduğunu göstermez. Çoğu, karmaşık bir dünyada hızlı karar vermeyi sağlayan zihinsel kısayolların yan ürünüdür. İktisatçının işi onları alay konusu yapmak değil, anlamak ve gerektiğinde kurumları onlara göre tasarlamaktır.
:::
` },
      { baslik: "Modern ampirik iktisat", md: R`
Geleneksel iktisat çoğunlukla **kuramdan** başlardı; veri sınırlı, hesaplama pahalıydı. Bilgisayarlar ve büyük veri bunu değiştirdi. Modern iktisatçının araç kutusu:

### Doğal deneyler (natural experiments)
Doğanın ya da tarihin, bir grubu "tedavi" edip benzer bir grubu etkilemediği durumlar. Örnek: Card ve Krueger, asgari ücret artışının etkisini ölçmek için asgari ücreti artıran New Jersey ile artırmayan komşu Pennsylvania'daki fast-food restoranlarını karşılaştırdı (17. bölüm).

### Laboratuvar deneyleri (laboratory experiments)
Kontrollü ortamda (çoğunlukla öğrencilerle, gerçek para ödenerek) davranışı gözlemlemek: ültimatom oyunu, piyasa simülasyonları, açık artırmalar. Vernon Smith deneysel iktisadın kurucularındandır (Nobel 2002).

### Saha deneyleri ve rastgele kontrollü deneyler (field experiments, RCTs)
Gerçek dünyada, insanları rastgele gruplara ayırıp bir politikayı yalnız birine uygulamak. **Abhijit Banerjee, Esther Duflo ve Michael Kremer**, yoksullukla mücadele politikalarını (okul ilaçlaması, mikrokredi, aşı teşvikleri) bu yöntemle sınadıkları için 2019'da Nobel aldı.

### Bilgisayar simülasyonları ve ajan tabanlı modeller
Kurallarla davranan binlerce "sanal ajanın" etkileşimini simüle edip ortaya çıkan toplam sonuçları incelemek. Matematiksel olarak çözülemeyecek kadar karmaşık sistemler (piyasa çöküşleri, trafik, salgınlar) böyle incelenir.

### Büyük veri ve ekonometri
Kart harcamaları, uydu görüntüleri, arama verileri, makine öğrenmesi… Bu dersin R kısmında öğreneceğin istatistik ve regresyon, modern iktisatçının en temel aletleridir.

:::gercek
Türkiye'de de bu yöntemler giderek yaygınlaşıyor: belediyelerin ve bakanlıkların bazı programlarının (ör. şartlı nakit transferleri, eğitim destekleri) etkisi rastgele ya da yarı-deneysel yöntemlerle değerlendiriliyor. Bir politikayı "işe yaradı" ilan etmeden önce sorulması gereken soru: **"Neyle karşılaştırarak?"**
:::
` },
      { baslik: "Modeller, gerçeklik ve iktisat sanatı", md: R`
Colander'ın kitap boyunca tekrar ettiği ayrımı hatırla: **pozitif iktisat** (ne var), **normatif iktisat** (ne olmalı), **iktisat sanatı** (pozitif bilgiyi normatif amaçlara uygulamak). Modern iktisat bu üçünün ilişkisini değiştirdi:

- Davranışsal bulgular, geleneksel modelin politika önerilerini **koşullu** hâle getirir: "insanlar akılcıysa şu politika en iyisidir" demek yetmez; gerçek davranışı da hesaba katmak gerekir.
- Ampirik yöntemler, bir politikanın gerçekte ne yaptığını ölçmeyi mümkün kılar; kuramsal tartışmalar veriyle sınanabilir.
- Ama hiçbir model ya da deney, **değer yargısının** yerini tutmaz. Hangi amacın izleneceği hâlâ normatif bir sorudur.

Colander'ın iyi iktisatçı tarifi: modelleri ciddiye alan ama onlara tapmayan; veriye bakan ama verinin sınırlarını bilen; ve sonuçlarını "**diğer her şey sabitken**, bu varsayımlar altında" diye dürüstçe koşullandıran kişi.

:::ipucu
Sınavda davranışsal iktisat soruları genellikle bir senaryo verip hangi yanlılığın işlediğini sorar. Anahtar kelimeler: *sunuluş biçimi* → çerçeveleme; *ilk sayı* → çapalama; *sahip olunca daha değerli* → sahiplik etkisi; *kayıp acısı* → kayıptan kaçınma; *varsayılanı değiştirmemek* → statüko yanlılığı; *bugünü abartmak* → şimdiki zaman yanlılığı; *yeterince iyi* → sınırlı rasyonellik.
:::
` },
    ],
    ozet: [
      "Modern iktisat geleneksel modeli atmaz; davranışsal bulgular ve yeni ampirik yöntemlerle genişletir.",
      "Yapı taşları: aydınlanmış öz çıkar (adalet ve başkalarına değer), öngörülebilir akıldışılık (sistematik sapmalar), sınırlı rasyonellik (pratik kurallar, yeterince iyi).",
      "Yanlılıklar: çerçeveleme, çapalama, sahiplik etkisi, kayıptan kaçınma, statüko yanlılığı, şimdiki zaman yanlılığı, zihinsel muhasebe, aşırı güven.",
      "Ampirik yöntemler: doğal deneyler, laboratuvar deneyleri, saha deneyleri/RCT, simülasyon ve ajan tabanlı modeller, büyük veri.",
      "Modeller kıyaslama noktasıdır; politika önerileri koşulludur ve değer yargısının yerini tutmaz.",
    ],
    terimler: [
      ["traditional economic model", "geleneksel iktisadi model", "A model assuming rational, self-interested individuals who use available information optimally."],
      ["behavioral economics", "davranışsal iktisat", "Economics that uses insights from psychology and experiments to model how people actually behave."],
      ["enlightened self-interest", "aydınlanmış öz çıkar", "People care about others and about fairness as well as about themselves."],
      ["predictably irrational behavior", "öngörülebilir akıldışılık", "Behavior that deviates from rational choice in systematic, predictable ways."],
      ["bounded rationality", "sınırlı rasyonellik", "Rationality limited by information, cognitive capacity and time."],
      ["heuristic", "pratik kural (sezgisel yöntem)", "A rule of thumb used to make decisions quickly."],
      ["satisficing", "yeterince iyiyle yetinme", "Choosing an option that is good enough rather than searching for the best."],
      ["framing effect", "çerçeveleme etkisi", "The tendency of people to base their choices on how the choice is presented."],
      ["anchoring", "çapalama", "Relying too heavily on an initial piece of information, even if irrelevant."],
      ["endowment effect", "sahiplik etkisi", "People value something more highly simply because they own it."],
      ["loss aversion", "kayıptan kaçınma", "Losses are felt more strongly than equivalent gains."],
      ["status quo bias", "statüko yanlılığı", "The tendency to stick with the current situation or default option."],
      ["present bias", "şimdiki zaman yanlılığı", "Giving disproportionate weight to the present relative to the future."],
      ["mental accounting", "zihinsel muhasebe", "Treating money differently depending on its source or intended use."],
      ["natural experiment", "doğal deney", "A naturally occurring event that creates comparable treatment and control groups."],
      ["field experiment", "saha deneyi", "An experiment conducted in a real-world setting, often with random assignment."],
      ["randomized controlled trial (RCT)", "rastgele kontrollü deney", "An experiment in which subjects are randomly assigned to treatment and control groups."],
      ["agent-based model", "ajan tabanlı model", "A computer simulation of many interacting agents following behavioral rules."],
    ],
    quiz: [
      { s: "According to Colander, modern economists treat the traditional model as:", c: ["Completely wrong and to be discarded", "A useful benchmark that is extended with behavioral and empirical insights", "Applicable only to macroeconomics", "Identical to behavioral economics"], d: 1, a: "Geleneksel model atılmaz; kıyaslama noktasıdır ve yeni bulgularla genişletilir." },
      { s: "The idea that people care about fairness and others' well-being as well as their own is called:", c: ["Bounded rationality", "Enlightened self-interest", "Loss aversion", "Mental accounting"], d: 1, a: "Aydınlanmış öz çıkar: insanlar kendi çıkarlarını gözetir ama adalete de değer verir." },
      { s: "Herbert Simon's concept of bounded rationality suggests that people:", c: ["Always find the optimal choice", "Use rules of thumb and choose options that are good enough", "Never make decisions", "Are purely altruistic"], d: 1, a: "Bilgi, zihinsel kapasite ve zaman sınırlıdır; insanlar pratik kurallarla 'yeterince iyi' seçer." },
      { s: "Patients are more likely to choose surgery when told it has a '90% survival rate' than a '10% mortality rate.' This is the:", c: ["Endowment effect", "Framing effect", "Anchoring effect", "Status quo bias"], d: 1, a: "Aynı bilginin sunuluş biçimi seçimi değiştiriyor: çerçeveleme." },
      { s: "Students given a mug demand much more to sell it than others are willing to pay to buy it. This is the:", c: ["Endowment effect", "Present bias", "Framing effect", "Overconfidence"], d: 0, a: "Sahip olunan şeye daha fazla değer biçmek sahiplik etkisidir." },
      { s: "Seeing a 5,000 TL jacket first makes a 2,000 TL jacket seem cheap. This illustrates:", c: ["Loss aversion", "Anchoring", "Mental accounting", "Satisficing"], d: 1, a: "İlk görülen sayı karşılaştırma için çapa olur." },
      { s: "Investors who refuse to sell losing stocks but quickly sell winning ones are displaying:", c: ["Loss aversion", "Present bias", "Bounded rationality only", "Rational expectations"], d: 0, a: "Kaybı kesinleştirmenin acısı kazancın sevincinden büyük: kayıptan kaçınma." },
      { s: "Many people prefer 100 TL today over 110 TL in a week, but prefer 110 TL in 53 weeks over 100 TL in 52 weeks. This inconsistency reflects:", c: ["The endowment effect", "Present bias", "Anchoring", "Comparative advantage"], d: 1, a: "Aynı bir haftalık bekleyiş bugüne yakınken daha pahalı görünür: şimdiki zaman yanlılığı." },
      { s: "Treating a bonus as 'extra money' to spend freely while saving regular salary is an example of:", c: ["Mental accounting", "Framing", "Loss aversion", "Overconfidence"], d: 0, a: "Para birbirinin yerine geçebilir ama insanlar onu kaynağına göre farklı 'kasalara' koyar." },
      { s: "Comparing fast-food employment in New Jersey (which raised its minimum wage) with neighboring Pennsylvania (which did not) is an example of:", c: ["A laboratory experiment", "A natural experiment", "An agent-based model", "A theorem"], d: 1, a: "Politikanın bir bölgede uygulanıp benzer komşuda uygulanmaması doğal bir karşılaştırma grubu yaratır." },
      { s: "Banerjee, Duflo and Kremer won the 2019 Nobel Prize for using which method to study poverty?", c: ["Agent-based simulations", "Randomized controlled trials (field experiments)", "Input–output tables", "General equilibrium theory"], d: 1, a: "Yoksullukla mücadele politikalarını rastgele kontrollü saha deneyleriyle sınadılar." },
      { s: "Which statement best reflects Colander's view of models?", c: ["Models are exact descriptions of reality", "Models should be taken seriously but conditionally, and they cannot replace value judgments", "Models are useless for policy", "Only empirical work matters"], d: 1, a: "Modeller düşünmeyi düzenler; sonuçlar varsayımlara bağlıdır ve normatif yargının yerini tutmaz." },
    ],
  });
})();
