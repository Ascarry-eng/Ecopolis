// Colander 11e — 8. bölüm: Market Failure versus Government Failure (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m08",
    hedefler: [
      "Piyasa başarısızlığının üç kaynağını saymak: dışsallıklar, kamu malları, kusurlu bilgi",
      "Negatif ve pozitif dışsallıkları grafikle göstermek; Pigou vergisi ve sübvansiyonla düzeltmek",
      "Doğrudan düzenleme, vergi ve izin ticareti (piyasa teşvikli planlar) arasındaki farkı açıklamak",
      "Kamu mallarının dışlanamazlık ve rakipsizlik özelliklerini, bedavacı sorununu açıklamak",
      "Ters seçim ve ahlaki tehlikeyi ayırmak, çözümlerini bilmek",
      "Devlet başarısızlığının nedenlerini saymak",
    ],
    bolumler: [
      { baslik: "Piyasa başarısızlığı nedir?", md: R`
Görünmez el teoremi, belirli koşullar altında piyasanın kaynakları etkin dağıttığını söyler. O koşullar sağlanmadığında piyasa etkin sonuç üretmez:

:::tanim Market failure
A situation in which the invisible hand pushes in such a way that individual decisions do not lead to socially desirable outcomes.
:::

Colander üç kaynak sayar:

1. **Dışsallıklar (externalities)** — bir alışverişin, alışverişe katılmayan üçüncü kişileri etkilemesi,
2. **Kamu malları (public goods)** — piyasanın kendiliğinden yeterince üretmediği mallar,
3. **Kusurlu bilgi (imperfect information)** — alıcının ya da satıcının bilmediği önemli şeyler olması.

Ama bölümün başlığı bir uyarıdır: piyasanın başarısız olması, devletin müdahale edince *başarılı* olacağı anlamına gelmez. Karar her seferinde **piyasa başarısızlığı ile devlet başarısızlığını karşılaştırarak** verilmelidir.
` },
      { baslik: "Dışsallıklar", md: R`
:::tanim Externality
The effect of a decision on a third party that is not taken into account by the decision maker.
:::

- **Negatif dışsallık:** üçüncü kişilere maliyet yükler. Fabrikanın havayı kirletmesi, gece yüksek sesle müzik, trafik sıkışıklığı.
- **Pozitif dışsallık:** üçüncü kişilere fayda sağlar. Aşı olmak (başkaları da korunur), eğitim (daha bilgili vatandaş), bahçeni güzelleştirmek.

### Grafikle dışsallık
Dışsallık yokken arz eğrisi **marjinal özel maliyet (MPC)** ile **marjinal sosyal maliyet (MSC)** aynıdır; talep de marjinal özel fayda ile marjinal sosyal faydayı (MSB) gösterir. Piyasa dengesi sosyal açıdan da en iyisidir.

Negatif dışsallıkta her birimin topluma maliyeti, üreticinin ödediğinden yüksektir:

$$MSC = MPC + \text{dışsal maliyet}$$

Piyasa MPC'ye göre karar verdiği için **sosyal optimumdan fazla** üretir. Pozitif dışsallıkta $MSB = MPB + \text{dışsal fayda}$ olur ve piyasa **sosyal optimumdan az** üretir.

{{dissallik}}

### Dışsallıkla başa çıkmanın yolları
1. **Doğrudan düzenleme (direct regulation):** "Her fabrika bacasına filtre takacak", "emisyon şu sınırı aşmayacak". Basit ama pahalı olabilir, çünkü kirliliği azaltmanın maliyeti firmadan firmaya farklıdır ve düzenleme bunu dikkate almaz.
2. **Teşvik politikaları (incentive policies):**
   - **Vergi teşviki — Pigou vergisi:** her birim kirlilik için dışsal maliyete eşit bir vergi. Firma kirliliğin maliyetini kendisi hesaba katar (dışsallığı **içselleştirir**). Kirliliği en ucuza azaltabilen firmalar en çok azaltır.
   - **Piyasa teşvikli planlar — izin ticareti (cap and trade):** devlet toplam emisyona bir tavan koyar, izinleri dağıtır ya da satar; firmalar izinleri kendi aralarında alıp satar. Kirliliği ucuza azaltabilen firma izin satar, pahalıya azaltabilen izin alır. Toplam emisyon hedefe en düşük maliyetle ulaşır.
3. **Gönüllü çözümler:** ahlaki ikna, toplumsal baskı, sertifikalar.

:::dikkat
İktisatçıların şaşırtıcı görünen bir tezi: **en iyi kirlilik düzeyi sıfır değildir.** Kirliliği sıfırlamak çoğu zaman üretimi durdurmak demektir. Doğru düzey, kirliliği bir birim daha azaltmanın marjinal maliyetinin, marjinal faydasına eşit olduğu düzeydir — 1. bölümdeki MB = MC kuralı.
:::

:::gercek
Avrupa Birliği 2005'ten beri bir emisyon ticaret sistemi (EU ETS) işletiyor ve AB'nin **sınırda karbon düzenlemesi (SKDM/CBAM)** AB'ye çelik, çimento, alüminyum gibi ürün ihraç eden Türk firmalarını doğrudan ilgilendiriyor. Türkiye de 2025'te kabul edilen İklim Kanunu ile kendi emisyon ticaret sistemini kurma yoluna girdi. Bu, Pigou fikrinin uluslararası ticarete taşınmış hâlidir.
:::
` },
      { baslik: "Kamu malları", md: R`
:::tanim Public good
A good that is nonexclusive and nonrival in consumption.
:::

İki özellik:

- **Dışlanamazlık (nonexclusive):** parasını ödemeyeni tüketimden dışlamak mümkün değil (ya da çok pahalı).
- **Rakipsizlik (nonrival):** birinin tüketmesi, başkasının tüketebileceği miktarı azaltmaz.

Klasik örnek **ulusal savunmadır**: ülke korunuyorsa sen de korunuyorsun, vergini ödemesen bile; senin korunman komşununkini azaltmaz.

Sorun **bedavacılıktır (free rider problem)**: insanlar bedelini ödemeden yararlanabildiklerinde ödemeye gönüllü olmazlar. Herkes böyle düşünürse mal hiç üretilmez ya da çok az üretilir. Bu yüzden kamu malları genellikle vergilerle finanse edilir.

Malları iki özelliğe göre dört gruba ayırabiliriz:

| | Rakip | Rakipsiz |
|---|---|---|
| **Dışlanabilir** | Özel mal (simit, telefon) | Kulüp malı (şifreli yayın, yazılım) |
| **Dışlanamaz** | Ortak kaynak (balık stoku, mera) | Kamu malı (savunma, deniz feneri) |

Ortak kaynaklarda aşırı kullanım sorunu vardır — **ortak malların trajedisi** — ve 3. bölümde gördüğümüz Elinor Ostrom'un çalışması tam bunun hakkındadır.

### Dışlanabilirlik ve fiyatlamanın maliyeti
Teknoloji, malların hangi gruba girdiğini değiştirebilir. Müzik, dijital kopyalama ilk yaygınlaştığında fiilen dışlanamaz hâle geldi (korsan paylaşım). Spotify, Apple Music gibi abonelik servisleri ve kopya koruması onu yeniden dışlanabilir yaptı. Rakipsiz bir malda fiyat almak, onu tüketmesi hiçbir ek maliyet yaratmayan kişileri dışlar: bu da bir etkinsizliktir. Kamu politikası bu ikisini dengelemeye çalışır.
` },
      { baslik: "Kusurlu bilgi", md: R`
Piyasaların iyi çalışması için alıcı ve satıcının malın kalitesini bilmesi gerekir. Taraflardan birinin daha fazla bildiği durumlara **asimetrik bilgi** denir.

:::tanim Adverse selection problem
A problem that occurs when buyers and sellers have different amounts of information about the good for sale.
:::

**İkinci el araba (limon) piyasası:** satıcı arabanın kusurlu ("limon") olup olmadığını bilir, alıcı bilmez. Alıcı ortalama kaliteye göre fiyat teklif eder. Bu fiyat iyi arabaların sahibine az gelir; iyi arabalar piyasadan çekilir, ortalama kalite düşer, fiyat daha da düşer… En kötü durumda yalnız limonlar kalır.

:::tanim Moral hazard
A problem that arises when people's behavior changes because they don't bear the full costs of their actions, often after signing a contract.
:::

Sigortalanan kişi daha az dikkatli davranabilir (kasko yaptıran sürücü, devletin kurtaracağını bilen banka). Ters seçim sözleşmeden *önce* (kimin geldiği), ahlaki tehlike sözleşmeden *sonra* (davranışın değişmesi) ortaya çıkar.

### Çözümler
- **Düzenleme ve ruhsat (licensing):** hekimlik, eczacılık, avukatlık için diploma ve ruhsat şartı. Faydası kaliteyi güvenceye almak; maliyeti girişi kısıtlayıp fiyatı artırmak.
- **Bilgilendirme zorunluluğu (full disclosure):** gıdada içerik etiketi, kredide yıllık maliyet oranı, şirketlerin KAP'a finansal tablo bildirmesi.
- **Piyasa çözümleri:** garanti, marka itibarı, bağımsız denetim ve **sinyal verme (signaling)** — satıcının kaliteyi kanıtlamak için maliyetli bir işaret vermesi (ör. uzun garanti, ekspertiz raporu).

:::gercek
Türkiye'de ikinci el araç satışında **ekspertiz raporu** ve son yıllarda galericilere getirilen yetki belgesi ve kayıt düzenlemeleri, limon sorununa piyasa ve devletin birlikte verdiği cevaplardır. Borsada ise şirketlerin bilgileri **Kamuyu Aydınlatma Platformu (KAP)** üzerinden açıklama zorunluluğu, yatırımcıyla yönetim arasındaki bilgi asimetrisini azaltmak için vardır.
:::
` },
      { baslik: "Devlet başarısızlığı", md: R`
Piyasa başarısızlığı varken bile müdahale her zaman iyileştirmez. Colander'ın saydığı nedenler:

1. **Devletin sorunu düzeltmek için teşviki olmayabilir.** Politikacılar seçmenin değil çıkar gruplarının istediğini yapabilir; bürokratlar kendi kurumlarını büyütmeyi önemseyebilir.
2. **Devletin yeterli bilgisi olmayabilir.** Dışsal maliyetin gerçekte kaç lira olduğunu, hangi firmanın kirliliği ne kadar ucuza azaltabileceğini bilmek zordur.
3. **Piyasaya müdahale, ilk göründüğünden hep daha karmaşıktır.** İnsanlar düzenlemeye uyum sağlar, kuralların etrafından dolanır; beklenmeyen yan etkiler ortaya çıkar.
4. **Bürokratik yapı ince ayara izin vermez.** Kurallar herkese aynı uygulanır; koşullar değişince güncellenmeleri yavaştır.
5. **Müdahale yeni müdahaleler doğurur.** Bir düzenlemenin yan etkisini gidermek için yeni düzenleme gerekir, zincir uzar.

:::ipucu
Sınavda "piyasa başarısızlığı varsa devlet müdahale etmeli mi?" diye sorulursa iktisatçının cevabı: **"Duruma bağlı — piyasa başarısızlığının maliyetini, devlet başarısızlığının maliyetiyle karşılaştır."**
:::

### Dinamik fiyatlama
Uber'in yoğun saatlerde fiyatları otomatik yükseltmesi (surge pricing) iki yüzü olan bir örnektir. İktisatçının gözüyle yüksek fiyat, kıt arabaları en çok ihtiyaç duyana ayırır ve daha fazla sürücüyü yola çıkarır. Toplumsal gözle ise kriz anında fiyat yükseltmek "haksız" görünür ve siyasi tepki doğurur. 1. bölümdeki iktisadi ve toplumsal güçlerin çatışması yine karşımızda.
` },
    ],
    ozet: [
      "Piyasa başarısızlığının üç kaynağı: dışsallıklar, kamu malları, kusurlu bilgi.",
      "Negatif dışsallıkta piyasa fazla, pozitif dışsallıkta az üretir. MSC = MPC + dışsal maliyet.",
      "Çözümler: doğrudan düzenleme, Pigou vergisi/sübvansiyonu, izin ticareti (cap and trade), gönüllü çözümler. En iyi kirlilik düzeyi sıfır değildir.",
      "Kamu malları dışlanamaz ve rakipsizdir; bedavacılık yüzünden piyasa yetersiz üretir.",
      "Ters seçim (sözleşme öncesi bilgi farkı) ve ahlaki tehlike (sözleşme sonrası davranış değişimi); çözümler: ruhsat, bilgilendirme, garanti, itibar, sinyal.",
      "Devlet başarısızlığı: teşvik eksikliği, bilgi eksikliği, karmaşıklık, bürokrasi, müdahalenin müdahale doğurması. Karar iki başarısızlığı karşılaştırarak verilir.",
    ],
    terimler: [
      ["market failure", "piyasa başarısızlığı", "A situation in which the invisible hand pushes in such a way that individual decisions do not lead to socially desirable outcomes."],
      ["externality", "dışsallık", "The effect of a decision on a third party not taken into account by the decision maker."],
      ["negative externality", "negatif dışsallık", "An externality that imposes costs on third parties."],
      ["positive externality", "pozitif dışsallık", "An externality that provides benefits to third parties."],
      ["marginal social cost (MSC)", "marjinal sosyal maliyet", "The marginal private cost of production plus the cost of the negative externality."],
      ["marginal social benefit (MSB)", "marjinal sosyal fayda", "The marginal private benefit of consumption plus the benefit of the positive externality."],
      ["internalize an externality", "dışsallığı içselleştirmek", "To make the decision maker take into account the external cost or benefit, e.g., through a tax."],
      ["Pigovian tax", "Pigou vergisi", "A tax on an activity equal to the marginal external cost it creates."],
      ["direct regulation", "doğrudan düzenleme", "The amount of a good people are allowed to use is directly limited by the government."],
      ["cap-and-trade (tradable permits)", "izin ticareti", "A program in which the government sets a total limit on emissions and allows firms to buy and sell permits."],
      ["public good", "kamu malı", "A good that is nonexclusive and nonrival in consumption."],
      ["nonexclusive", "dışlanamaz", "No one can be excluded from consuming the good."],
      ["nonrival", "rakipsiz", "One person's consumption does not reduce others' consumption."],
      ["free rider problem", "bedavacı sorunu", "Individuals' unwillingness to share in the cost of a public good because they can benefit without paying."],
      ["adverse selection", "ters seçim", "A problem that occurs when buyers and sellers have different amounts of information about the good for sale."],
      ["moral hazard", "ahlaki tehlike", "People change their behavior because they do not bear the full costs of their actions."],
      ["signaling", "sinyal verme", "An action by the informed party that reveals information (e.g., quality) to the uninformed party."],
      ["licensing", "ruhsatlandırma", "Requiring a government license to practice a profession or sell a product."],
      ["government failure", "devlet başarısızlığı", "When the government intervention in the market to improve the market failure makes the situation worse."],
    ],
    quiz: [
      { s: "Which of the following is NOT one of the three sources of market failure discussed by Colander?", c: ["Externalities", "Public goods", "Imperfect information", "High prices"], d: 3, a: "Üç kaynak: dışsallıklar, kamu malları, kusurlu bilgi. Yüksek fiyat kendi başına piyasa başarısızlığı değildir." },
      { s: "When a negative externality exists in production, the market will produce:", c: ["Less than the socially optimal quantity", "More than the socially optimal quantity", "Exactly the socially optimal quantity", "Nothing"], d: 1, a: "Üretici dışsal maliyeti ödemediği için MPC'ye göre üretir; MSC daha yüksektir: aşırı üretim." },
      { s: "Education generates positive externalities. Without government intervention, the market will likely provide:", c: ["Too much education", "Too little education", "The optimal amount", "No education"], d: 1, a: "Pozitif dışsallıkta MSB > MPB; bireyler dışsal faydayı hesaba katmaz: yetersiz üretim." },
      { s: "A Pigovian tax set equal to the marginal external cost will:", c: ["Eliminate all pollution", "Move the market to the socially optimal quantity", "Increase overproduction", "Have no effect on output"], d: 1, a: "Vergi dışsal maliyeti üreticinin hesabına sokar (içselleştirir); piyasa MSC = MSB noktasına gelir." },
      { s: "The optimal level of pollution is generally:", c: ["Zero", "Where the marginal cost of reducing pollution equals the marginal benefit of reducing it", "As high as firms want", "Determined by the number of firms"], d: 1, a: "Kirliliği azaltmanın da maliyeti var; en iyi düzey MB = MC'de, genellikle sıfırdan büyüktür." },
      { s: "Compared with direct regulation, a tradable permit (cap-and-trade) program:", c: ["Achieves the pollution target at a lower total cost", "Always leads to more pollution", "Requires every firm to cut emissions equally", "Does not limit total emissions"], d: 0, a: "Kirliliği ucuza azaltabilen firmalar daha çok azaltıp izin satar; hedef en düşük toplam maliyetle tutturulur." },
      { s: "A public good is:", c: ["Any good produced by the government", "Nonexclusive and nonrival", "Exclusive and rival", "Rival but nonexclusive"], d: 1, a: "Kamu malının tanımı devletin üretmesi değil, dışlanamaz ve rakipsiz olmasıdır." },
      { s: "National defense is a classic public good because:", c: ["It is expensive", "People who don't pay cannot be excluded and one person's protection doesn't reduce another's", "Only the rich benefit", "It is produced by private firms"], d: 1, a: "Ödemeyeni dışlayamazsın ve senin korunman başkasınınkini azaltmaz: dışlanamaz ve rakipsiz." },
      { s: "The free rider problem means that public goods will tend to be:", c: ["Overprovided by markets", "Underprovided by markets", "Provided at the optimal level by markets", "Provided only to the rich"], d: 1, a: "İnsanlar ödemeden yararlanabildiği için ödemeye gönüllü olmaz; piyasa yetersiz üretir." },
      { s: "In the used-car market, sellers know more about car quality than buyers. This can lead to:", c: ["Moral hazard", "Adverse selection", "A positive externality", "A public good"], d: 1, a: "Sözleşmeden önceki bilgi asimetrisi ters seçimdir; iyi arabalar piyasadan çekilir (limon piyasası)." },
      { s: "After buying full insurance on a car, a driver becomes less careful. This is an example of:", c: ["Adverse selection", "Moral hazard", "Signaling", "Free riding"], d: 1, a: "Sözleşmeden sonra maliyetin tamamını taşımadığı için davranış değişiyor: ahlaki tehlike." },
      { s: "Which of the following is a reason for government failure?", c: ["Governments have perfect information", "Government intervention often leads to more intervention", "Markets never fail", "Bureaucracies allow perfect fine-tuning"], d: 1, a: "Colander'ın listesinde: teşvik ve bilgi eksikliği, karmaşıklık, bürokratik katılık ve müdahalenin yeni müdahale doğurması var." },
    ],
  });
})();
