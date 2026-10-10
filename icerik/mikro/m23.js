// Colander 11e — 23. bölüm: Microeconomic Policy, Economic Reasoning, and Beyond (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m23",
    hedefler: [
      "İktisatçıların düzenlemelere fayda–maliyet yaklaşımını açıklamak",
      "İstatistiksel hayatın değerini (VSL) hesaplamak ve neden kullanıldığını tartışmak",
      "Gelecekteki fayda ve maliyetleri iskonto etmek; iskonto oranının önemini göstermek",
      "Fayda–maliyet analizinin sınırlarını (belirsizlik, bölüşüm, ölçülemeyenler, analizin maliyeti) saymak",
      "Piyasa başarısızlığı–devlet başarısızlığı tartışmasında iktisatçıların neden farklı sonuçlara vardığını açıklamak",
      "Dersin bütününü 'iktisatçı gibi düşünmek' çerçevesinde toparlamak",
    ],
    bolumler: [
      { baslik: "Fayda–maliyet yaklaşımı", md: R`
Kitabın başında iktisadi karar kuralını öğrenmiştik: **MB > MC ise yap.** Son bölüm, bu basit kuralın kamu politikasına nasıl uygulandığını — ve ne kadar zor olduğunu — gösterir.

:::tanim Cost–benefit analysis
Analysis in which one assigns a cost and benefit to alternatives and draws a conclusion on the basis of those costs and benefits.
:::

Bir trafik güvenliği düzenlemesi, bir baraj, bir hava kirliliği standardı, depreme dayanıklılık için zorunlu güçlendirme… İktisatçının sorusu hep aynıdır: **toplumun bu karardan elde edeceği toplam fayda, toplam maliyetinden büyük mü?** Ve eğer birden fazla seçenek varsa, hangisinin net faydası en büyük?

Bu yaklaşımın gücü, tartışmayı **şeffaflaştırmasıdır**: varsayımlar ve rakamlar açıkça masaya konur, itiraz eden neye itiraz ettiğini söylemek zorunda kalır. Zayıflığı ise her şeyi aynı ölçüye — paraya — çevirmek zorunda olmasıdır.
` },
      { baslik: "Bir hayatın değeri", md: R`
Fayda–maliyet analizinin en tartışmalı adımı: **insan hayatına bir değer biçmek.** "Hayat paha biçilmezdir" itirazı ahlaki olarak güçlüdür, ama pratikte her güvenlik kararı örtük olarak bir değer biçer: bir yol daha güvenli yapılabilirdi ama yapılmadıysa, toplum o maliyeti o canlardan değerli bulmuş demektir. İktisatçılar bu örtük değeri **açık** hâle getirmeyi önerir.

:::tanim Value of a statistical life (VSL)
The amount people are willing to pay for small reductions in the risk of death, scaled up to one statistical life: VSL = willingness to pay ÷ reduction in risk.
:::

Önemli nokta: VSL belirli bir kişinin hayatının değeri değildir. İnsanların **küçük ölüm risklerini azaltmak için ödemeye razı oldukları paradan** türetilir.

:::ornek İstatistiksel hayatın değeri
200.000 nüfuslu bir ilçede bir trafik düzenlemesi herkesin yıllık ölüm riskini 100.000'de 1 azaltıyor. İnsanlar bunun için kişi başı yılda 300 TL ödemeye razı. VSL nedir? Düzenlemenin yıllık maliyeti 40 milyon TL ise yapılmalı mı?
---cozum---
$$VSL = \frac{300}{1/100.000} = 300 \times 100.000 = 30 \text{ milyon TL}$$

Kurtarılan istatistiksel hayat: $200.000 \times \tfrac{1}{100.000} = 2$ kişi/yıl. Yıllık fayda: $2 \times 30 = 60$ milyon TL (aynı sonuç: 200.000 kişi × 300 TL ödeme isteği).

Maliyet 40 milyon TL → net fayda **20 milyon TL > 0**: düzenleme yapılmalı.
:::

İşçilerin riskli işler için talep ettiği ek ücretler (17. bölümdeki telafi edici farklar) ve insanların güvenlik ürünlerine (kask, airbag, duman dedektörü) ödediği paralar da VSL tahminlerinde kullanılır. Gelişmiş ülkelerde düzenleyici kurumların kullandığı VSL değerleri milyonlarca dolar düzeyindedir.

:::dikkat
VSL'nin gelirle artması etik bir sorun yaratır: zengin ülkelerde ya da bölgelerde ödeme isteği yüksek olduğu için, saf bir analiz güvenlik yatırımlarını zenginlere yönlendirebilir. Bu yüzden birçok kurum, ülke içinde herkes için aynı VSL'yi kullanır. Etkinlik hesabı ile hakkaniyet kaygısı burada yine karşılaşır.
:::
` },
      { baslik: "Farklı zamanlardaki fayda ve maliyetler", md: R`
Politikaların maliyetleri genellikle **bugün**, faydaları ise **yıllara yayılarak gelecekte** ortaya çıkar. Bugünkü bir lira, gelecekteki bir liradan değerlidir (faiz kazanabilir, ayrıca insanlar bugünü tercih eder). Bu yüzden gelecekteki faydalar **iskonto edilerek** bugünkü değere çevrilir:

$$NBD = \sum_{t=1}^{T} \frac{F_t}{(1+r)^t} - \text{Maliyet}_0$$

Bu, matematik dersinin 5–7. haftalarında öğrendiğin **net bugünkü değer** hesabının ta kendisidir.

{{fayda-maliyet}}

**İskonto oranı sonucu kökten değiştirir.** İklim politikası tartışmasının merkezinde bu vardır: faydaları 50–100 yıl sonra ortaya çıkacak bir yatırım, %1 iskonto oranıyla çok değerli, %7 ile neredeyse değersiz görünür. Hangi oranın kullanılacağı kısmen teknik (sermayenin getirisi), kısmen de ahlaki bir sorudur: gelecek kuşakların refahına bugünkülerinkiyle aynı ağırlığı vermeli miyiz?
` },
      { baslik: "Fayda–maliyet analizini yerine oturtmak", md: R`
Colander fayda–maliyet analizini savunur ama sınırlarını da açıkça sayar:

1. **Belirsizlik.** Gelecekteki faydalar ve maliyetler tahmindir; küçük varsayım değişiklikleri sonucu tersine çevirebilir. İyi bir analiz **duyarlılık analizi** yapar: "iskonto oranı %3 yerine %6 olsaydı ne olurdu?"
2. **Ölçülemeyen değerler.** Doğal güzellik, kültürel miras, özgürlük, onur… Paraya çevirmek zordur; çevrilmeyince sıfır sayılma riski vardır.
3. **Bölüşüm.** Toplam net fayda pozitif olabilir ama faydalar bir gruba, maliyetler başka bir gruba düşebilir. Fayda–maliyet analizi "kazananlar kaybedenlerin zararını *telafi edebilir*" der; *telafi edileceğini* söylemez.
4. **Diğer şeyler sabit kalmaz.** Büyük politikalar fiyatları, davranışları ve kurumları değiştirir; kısmi denge analizi (4. bölüm) bunları kaçırabilir.
5. **Analizin kendi maliyeti.** Kapsamlı bir fayda–maliyet analizi pahalı ve zaman alıcıdır; küçük kararlar için bu maliyete değmeyebilir. Ayrıca analiz, siyasi bir kararı "bilimsel" göstermek için de kullanılabilir.

:::gercek
2023 Kahramanmaraş depremlerinden sonra Türkiye'de bina güçlendirme ve kentsel dönüşüm tartışması tam bir fayda–maliyet sorusudur: güçlendirmenin maliyeti bugün, faydası (kurtarılan hayatlar, önlenen hasar) belirsiz bir gelecekte ortaya çıkar. Deprem olasılığı, iskonto oranı, istatistiksel hayatın değeri ve maliyetin kimin üzerine düşeceği (bölüşüm) gibi varsayımlar sonucu belirler. Fayda–maliyet analizi kararı tek başına vermez, ama tartışmayı somutlaştırır.
:::
` },
      { baslik: "İktisatçılar neden farklı düşünür?", md: R`
İktisatçılar aynı aletleri kullandıkları hâlde politikalarda sık sık farklı sonuçlara varır. Colander'a göre bunun nedeni çoğunlukla aletler değil, üç farklı yargıdır:

1. **Piyasa başarısızlığının büyüklüğü:** dışsallıklar, bilgi sorunları ne kadar ciddi?
2. **Devlet başarısızlığının büyüklüğü:** devlet bu sorunu çözerken ne kadar hata yapar, ne kadar çıkar gruplarının etkisinde kalır?
3. **Değer yargıları:** etkinlik ile eşitlik, özgürlük ile güvenlik arasında hangi dengeyi istiyoruz?

Piyasa başarısızlığını büyük, devlet başarısızlığını küçük görenler müdahaleye; tersini düşünenler piyasaya güvenmeye eğilimlidir. İkisi de aynı iktisadi mantığı kullanır; farkları ampirik tahminlerinde ve değerlerindedir. Bu yüzden iyi bir iktisatçı tartışmada önce **neyin pozitif (ölçülebilir) neyin normatif (değer)** olduğunu ayırır.

:::ipucu
Bir politika tartışmasını iktisatçı gibi değerlendirmek için beş soru: (1) Sorun gerçekten bir piyasa başarısızlığı mı? (2) Önerilen müdahalenin faydaları ve maliyetleri neler, kime düşüyor? (3) Devlet bu müdahaleyi iyi uygulayabilir mi? (4) Daha ucuz bir alternatif (fiyat, vergi, dürtme) var mı? (5) Hangi kısmı değer yargısı?
:::
` },
      { baslik: "Yolun sonu: iktisatçı gibi düşünmek", md: R`
Yirmi üç bölümün ardından geriye dönüp bakalım. Colander'ın öğretmek istediği şey bir formül listesi değil, bir **düşünme biçimidir**:

- **Her şeyin bir fırsat maliyeti vardır** (TANSTAAFL). Bedava görünen her şeyin arkasında birinin vazgeçtiği bir şey vardır.
- **Kararlar marjinaldir.** Soru "hepsi mi hiç mi" değil, "biraz daha mı, biraz daha az mı"dır.
- **İnsanlar teşviklere tepki verir** — ama yalnız teşviklere değil; adalete, normlara, alışkanlıklara da.
- **Piyasalar güçlü koordinasyon araçlarıdır**, ama başarısız olabilirler; devlet de öyle.
- **Gerçek dünya iktisadi, toplumsal ve siyasi güçlerin etkileşimidir.** Model bir harita, gerçeklik ise arazidir.
- **Pozitif, normatif ve sanat** ayrımını koru: ne var, ne olmalı, oraya nasıl gidilir.

Colander'ın kitabı kapatırken altını çizdiği nokta: iktisat bir **sanat**tır. Kuramı bilmek gerekir ama yetmez; kurumları, tarihi, insanları ve değerleri de bilmek gerekir. Bu dersin sonunda bir haberi okurken arz–talep eğrilerini, fırsat maliyetlerini ve teşvikleri görebiliyorsan, hedefe ulaştın demektir.

:::gercek
Bir sonraki adım: makroekonomi (enflasyon, işsizlik, büyüme, para politikası), istatistik ve ekonometri (R dersindeki araçlar), ve daha ileri mikroekonomi (kalkülüsle tüketici ve üretici teorisi). Matematik dersinde öğrendiğin türev ve optimizasyon, ileri mikroekonominin dilidir: bu dersteki MR = MC, MU/P eşitliği ve esneklik formüllerinin hepsi orada türevle yeniden karşına çıkacak.
:::
` },
    ],
    ozet: [
      "Fayda–maliyet analizi, iktisadi karar kuralının (MB > MC) kamu politikasına uygulanmasıdır; tartışmayı şeffaflaştırır.",
      "İstatistiksel hayatın değeri = ödeme isteği ÷ risk azalması; belirli bir kişinin değil, küçük risk azalmalarının değeri.",
      "Gelecekteki faydalar iskonto edilir (NBD); iskonto oranı uzun vadeli kararların sonucunu kökten değiştirir.",
      "Sınırlar: belirsizlik (duyarlılık analizi), ölçülemeyen değerler, bölüşüm, diğer şeylerin değişmesi, analizin maliyeti.",
      "İktisatçılar piyasa başarısızlığı, devlet başarısızlığı ve değer yargıları hakkındaki farklı yargılar yüzünden farklı sonuçlara varır.",
      "İktisatçı gibi düşünmek: fırsat maliyeti, marjinal karar, teşvikler, piyasa ve devletin güçlü ve zayıf yanları, pozitif–normatif–sanat ayrımı.",
    ],
    terimler: [
      ["cost–benefit analysis", "fayda–maliyet analizi", "Assigning costs and benefits to alternatives and drawing a conclusion on the basis of those costs and benefits."],
      ["value of a statistical life (VSL)", "istatistiksel hayatın değeri", "Willingness to pay for a small reduction in the risk of death, divided by that reduction in risk."],
      ["willingness to pay", "ödeme isteği", "The maximum amount a person would pay for a good or for a reduction in risk."],
      ["discounting", "iskonto etme", "Converting future values into present values using a discount rate."],
      ["discount rate", "iskonto oranı", "The rate used to convert future benefits and costs into present values."],
      ["net present value (NPV)", "net bugünkü değer", "The present value of benefits minus the present value of costs."],
      ["sensitivity analysis", "duyarlılık analizi", "Checking how results change when key assumptions change."],
      ["compensation principle", "telafi ilkesi", "A policy is efficient if winners could compensate losers and still be better off, whether or not compensation is paid."],
      ["informed judgment", "bilgiye dayalı yargı", "A policy conclusion that combines economic analysis with knowledge of institutions and explicit value judgments."],
    ],
    quiz: [
      { s: "Cost–benefit analysis applies which basic economic principle to public policy?", c: ["The law of demand", "Do something if marginal benefits exceed marginal costs", "Comparative advantage", "The fallacy of composition"], d: 1, a: "Fayda–maliyet analizi iktisadi karar kuralının kamu politikasına uygulanmasıdır." },
      { s: "People are willing to pay 300 TL each to reduce their annual risk of death by 1 in 100,000. The value of a statistical life is:", c: ["300 TL", "3 million TL", "30 million TL", "300 million TL"], d: 2, a: "VSL = 300 / (1/100.000) = 30 milyon TL." },
      { s: "The value of a statistical life is best described as:", c: ["The value of a specific person's life", "Derived from willingness to pay for small reductions in the risk of death", "The average lifetime earnings of a worker", "Set by law at a fixed amount"], d: 1, a: "Belirli bir kişinin değil, küçük risk azalmaları için ödeme isteğinden türetilen bir değerdir." },
      { s: "A regulation saves 2 statistical lives per year at an annual cost of 40 million TL. If VSL is 30 million TL, the annual net benefit is:", c: ["−10 million TL", "20 million TL", "60 million TL", "100 million TL"], d: 1, a: "Fayda 2 × 30 = 60 milyon; net fayda 60 − 40 = 20 milyon TL." },
      { s: "Why must future benefits be discounted in cost–benefit analysis?", c: ["Because the future is unimportant", "Because a lira today is worth more than a lira in the future", "Because inflation is always zero", "To make projects look better"], d: 1, a: "Bugünkü lira faiz kazanabilir ve insanlar bugünü tercih eder; gelecekteki değerler bugüne indirgenir." },
      { s: "Raising the discount rate in a cost–benefit analysis of a project whose benefits occur far in the future will:", c: ["Increase its net present value", "Decrease its net present value", "Have no effect", "Increase its costs today"], d: 1, a: "Yüksek oran uzak faydaları daha çok küçültür; NBD düşer." },
      { s: "A sensitivity analysis checks:", c: ["How results change when key assumptions change", "Whether people are sensitive to prices", "The elasticity of demand", "Public opinion"], d: 0, a: "Varsayımlar değiştiğinde sonucun sağlam olup olmadığına bakılır." },
      { s: "A project has a positive net benefit, but its costs fall on one group and benefits on another. Cost–benefit analysis tells us that:", c: ["Losers will be compensated", "Winners could compensate losers, but not that they will", "The project is unfair and should be rejected", "Distribution is irrelevant"], d: 1, a: "Telafi ilkesi: telafi edebilir; edileceğini söylemez. Bölüşüm ayrı bir değerlendirmedir." },
      { s: "Which is NOT one of the limitations of cost–benefit analysis discussed by Colander?", c: ["Uncertainty about future costs and benefits", "Difficulty of measuring some values", "Other things may not remain constant", "It always favors government intervention"], d: 3, a: "Analiz müdahaleyi otomatik olarak desteklemez; sonuç rakamlara bağlıdır." },
      { s: "According to Colander, economists often reach different policy conclusions mainly because they differ in:", c: ["Their mathematical skills", "Their judgments about the size of market failures, government failures, and their value judgments", "The textbooks they used", "Their knowledge of supply and demand"], d: 1, a: "Aletler aynı; farklılık ampirik yargılarda ve değerlerde." },
      { s: "Someone who believes market failures are small and government failures are large is likely to favor:", c: ["Extensive government intervention", "Relying more on markets", "Central planning", "Price controls"], d: 1, a: "Piyasa başarısızlığını küçük, devlet başarısızlığını büyük görenler piyasaya güvenmeye eğilimlidir." },
      { s: "Colander describes economics ultimately as:", c: ["A purely mathematical science with exact answers", "An art that combines theory with knowledge of institutions and values", "A set of formulas", "A branch of accounting"], d: 1, a: "İktisat sanatı: pozitif bilgiyi kurumlar ve değerlerle birleştirip normatif amaçlara uygulamak." },
    ],
  });
})();
