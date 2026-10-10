// Colander 11e — 22. bölüm: Behavioral Economics and Modern Economic Policy (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m22",
    hedefler: [
      "Davranışsal bulguların iktisat politikasını nasıl değiştirdiğini açıklamak",
      "Dürtme, seçim mimarisi ve özgürlükçü paternalizm kavramlarını tanımlamak",
      "Varsayılan seçeneklerin gücünü örneklerle (emeklilik, organ bağışı) göstermek",
      "Günah vergileri ve sosyal karşılaştırma gibi davranışsal araçları değerlendirmek",
      "Tahmin piyasalarını ve davranışsal politikanın eleştirilerini tartışmak",
    ],
    bolumler: [
      { baslik: "Davranışsal iktisattan politikaya", md: R`
Geleneksel politika analizinin örtük varsayımı şuydu: insanlar kendi çıkarlarını en iyi kendileri bilir; devletin işi piyasa başarısızlıklarını (8. bölüm) düzeltmek ve fiyatları doğru ayarlamaktır. Teşvikleri değiştir — vergi koy, sübvansiyon ver — insanlar akılcı biçimde tepki versin.

21. bölümdeki bulgular bu varsayımı sarsar: insanlar sistematik hatalar yapıyorsa (şimdiki zaman yanlılığı, statüko yanlılığı, çerçeveleme…), **kendi uzun vadeli çıkarlarına aykırı** seçimler yapabilirler. O zaman yeni bir politika sorusu doğar: devlet, insanların seçimlerini *özgürlüklerini kısıtlamadan* daha iyi hâle getirebilir mi?

Colander bu bölümde davranışsal iktisadın politikaya iki katkısını öne çıkarır:

1. **Mevcut politikaları daha iyi tasarlamak:** aynı amaca, insanların gerçek davranışını hesaba katarak daha ucuza ulaşmak.
2. **Yeni araçlar:** fiyatları değiştirmeden seçim ortamını değiştirmek — **dürtme**.
` },
      { baslik: "Dürtme ve seçim mimarisi", md: R`
:::tanim Nudge
A policy that structures choices in a way that encourages people to make decisions that are in their long-run interest, without restricting their options or significantly changing their economic incentives.
:::

Richard Thaler ve Cass Sunstein'ın 2008 tarihli *Nudge* (Dürtme) kitabı bu fikri yaygınlaştırdı. Temel kavramlar:

- **Seçim mimarisi (choice architecture):** seçeneklerin sunuluş biçimi — sırası, varsayılanı, görünürlüğü. Tarafsız bir seçim mimarisi yoktur; seçenekler bir biçimde sunulmak zorundadır ve her biçim seçimi etkiler.
- **Özgürlükçü paternalizm (libertarian paternalism):** insanları kendi iyilikleri için belirli bir yöne yönlendirmek (paternalizm), ama seçim özgürlüğünü koruyarak (özgürlükçü). Başka seçeneği isteyen, kolayca seçebilir.

Örnekler:
- Okul kantininde sağlıklı yiyecekleri göz hizasına, abur cuburu arkaya koymak (yasak yok, sadece düzen değişti).
- Enerji faturasında "komşularınızın ortalaması" ile karşılaştırma göstermek (**sosyal karşılaştırma**): tüketim belirgin biçimde düşer.
- Vergi borcu mektubuna "vatandaşların çoğu vergisini zamanında ödüyor" cümlesini eklemek.
- Merdivenleri piyano tuşlarına çevirmek, yürüyen merdiven yerine merdiveni çekici kılmak.

:::gercek
İngiltere hükümeti 2010'da bir **Davranışsal İçgörüler Ekibi** ("Nudge Unit") kurdu: vergi tahsilatı, organ bağışı kaydı, enerji tasarrufu gibi alanlarda küçük ve ucuz değişikliklerin etkisini rastgele deneylerle sınadı. Bugün onlarca ülkede (ABD, Avustralya, Hollanda, OECD) benzer birimler var. Colander bu gelişmeyi 11. baskıya yeni bir kutu olarak ekledi.
:::
` },
      { baslik: "Varsayılan seçeneğin gücü", md: R`
Statüko yanlılığı ve atalet yüzünden, **varsayılan (default)** seçenek sonucu büyük ölçüde belirler.

**Organ bağışı:** "Bağışçı olmak için kaydol" (opt-in) sistemiyle "istemiyorsan çıkış yap" (opt-out) sistemi arasında bağışçı oranları çarpıcı biçimde farklıdır. Johnson ve Goldstein'ın (2003) ünlü karşılaştırmasında, kültürel olarak birbirine yakın komşu ülkeler arasında, opt-in sistemindekilerde oran düşük, opt-out sistemindekilerde ise neredeyse herkes bağışçı görünüyordu. İnsanların tercihleri değil, **varsayılan** farklıydı.

**Emeklilik birikimi:** ABD'de işverenlerin emeklilik planlarında otomatik katılım (opt-out) uygulandığında katılım dramatik biçimde artar. Thaler ve Benartzi'nin "**Save More Tomorrow**" (Yarın Daha Çok Biriktir) planı ise şimdiki zaman yanlılığını tersine kullanır: çalışanlar *gelecekteki* maaş artışlarının bir kısmını birikime ayırmayı bugünden taahhüt eder; bugün fedakârlık hissetmeden birikim oranları yıllar içinde yükselir.

{{varsayilan}}

:::gercek
Türkiye'de 2017'de **Bireysel Emeklilik Sisteminde Otomatik Katılım (OKS)** başladı: 45 yaş altındaki çalışanlar, işverenleri aracılığıyla otomatik olarak sisteme dahil edilir ve maaşlarının %3'ü kesilir; isteyen belirli bir süre içinde cayabilir. Cayma oranları yüksek oldu — bu da varsayılanın gücünün sınırsız olmadığını, güven ve gelir düzeyi gibi etkenlerin de önemli olduğunu gösterdi. Yine de sistem milyonlarca kişiyi, hiç düşünmeyecekleri bir birikime soktu.
:::
` },
      { baslik: "Davranışsal gerekçelerle vergiler ve düzenlemeler", md: R`
### Günah vergileri (sin taxes)
Sigara, alkol, şekerli içecek vergilerinin geleneksel gerekçesi **dışsallıktır** (8. bölüm): pasif içicilik, sağlık sisteminin maliyetleri. Davranışsal iktisat ikinci bir gerekçe ekler: **içsellik (internality)** — kişinin kendi gelecekteki benliğine yüklediği, şimdiki zaman yanlılığı yüzünden hesaba katmadığı maliyet. Bağımlılık yapan mallarda bu gerekçe güçlüdür.

Eleştiri: bu vergiler azalan oranlı etki yapar (yoksullar gelirlerinin daha büyük kısmını bu mallara harcar) ve "devlet benim iyiliğimi benden iyi mi bilir?" sorusunu doğurur.

### Bilgilendirme ve basitleştirme
İnsanlar karmaşık bilgiyi işlemekte zorlanır. Bu yüzden davranışsal politika çoğu zaman **basitleştirmeye** odaklanır:
- Kredi sözleşmelerinde **yıllık maliyet oranının** büyük puntoyla gösterilmesi,
- Gıda paketlerinde trafik ışığı etiketleri (yeşil–sarı–kırmızı),
- Başvuru formlarının kısaltılması (öğrenci bursu başvurularını basitleştirmek, başvuru oranını belirgin biçimde artırır).

### Taahhüt araçları
Kendini önceden bağlama imkânı sunmak: kumarhaneden kendini yasaklatma listeleri, otomatik birikim talimatları, "son tarih" koymak.

:::dikkat
Dürtmeler genellikle **ucuz** ve **özgürlüğü koruyan** araçlardır, ama etkileri de çoğu zaman sınırlıdır. Büyük sorunlar (iklim değişikliği, eşitsizlik) için tek başına yetmezler; fiyat, vergi ve düzenleme gibi geleneksel araçların yerini değil, yanını alırlar.
:::
` },
      { baslik: "Tahmin piyasaları", md: R`
Davranışsal iktisat piyasalara karşı bir tez değildir; bazen piyasaların bilgi toplama gücünü yeni alanlara taşır.

:::tanim Prediction market
A market in which people buy and sell contracts whose payoff depends on the outcome of a future event, so that prices reflect the aggregated expectations of participants.
:::

Örneğin "X adayı seçimi kazanırsa 1 lira öder" sözleşmesi 0,60 liradan işlem görüyorsa, piyasa katılımcıları adayın kazanma olasılığını yaklaşık %60 görüyor demektir. Katılımcılar paralarını riske attıkları için ciddi düşünürler; dağınık bilgiler fiyatta toplanır.

Colander'ın kutusu, seçim tahmin piyasalarının anketlerle karşılaştırılmasını tartışır: bazen anketlerden isabetli olurlar, bazen (2016 ABD seçimi gibi) onlar da yanılır. Şirketler de iç tahmin piyasalarını, bir ürünün zamanında yetişip yetişmeyeceğini tahmin etmek için kullanır.

Tahmin piyasaları da davranışsal yanlılıklardan muaf değildir: "favori–uzak ihtimal yanlılığı" (düşük olasılıklı sonuçların fiyatının şişmesi) bilinen bir sapmadır.
` },
      { baslik: "Davranışsal politikanın eleştirisi", md: R`
Davranışsal politika güçlü itirazlarla da karşılaşır:

1. **Dürtenleri kim dürtecek?** Politikacılar ve bürokratlar da aynı yanlılıklara sahip insanlardır; üstelik kendi çıkarları ve çıkar grupları vardır. 8. bölümdeki **devlet başarısızlığı** tartışması burada da geçerlidir.
2. **Paternalizm ve manipülasyon.** "İnsanların kendi iyiliği" kim tarafından tanımlanıyor? Görünmez yönlendirme, açık yasaktan daha az şeffaf ve denetlenebilir olabilir.
3. **Etkilerin kalıcılığı ve ölçeği.** Laboratuvarda ya da küçük denemelerde etkili olan dürtmelerin bazıları büyük ölçekte zayıflar; yayın yanlılığı (yalnız başarılı deneylerin yayımlanması) etkileri olduğundan büyük gösterebilir.
4. **Piyasalar da dürter.** Firmalar davranışsal içgörüleri devletten çok daha önce ve daha yoğun kullanır: "son 2 ürün!" uyarıları, otomatik yenilenen abonelikler, karmaşık fiyatlandırma. Bu yüzden davranışsal iktisat aynı zamanda **tüketici koruma** politikasının da dayanağıdır.

:::ipucu
Colander'ın genel tutumu ölçülüdür: davranışsal iktisat politika yapıcıya yeni ve ucuz araçlar verir, ama her politika önerisi — geleneksel ya da davranışsal — **maliyet–fayda**, **devlet başarısızlığı riski** ve **değer yargıları** açısından tartılmalıdır. Bu tartma işi, 23. bölümün konusudur.
:::
` },
    ],
    ozet: [
      "İnsanlar sistematik hatalar yapıyorsa uzun vadeli çıkarlarına aykırı seçim yapabilir; davranışsal politika seçim ortamını iyileştirmeye çalışır.",
      "Dürtme: seçenekleri kısıtlamadan ya da teşvikleri belirgin biçimde değiştirmeden seçimi yönlendirmek. Seçim mimarisi tarafsız olamaz; özgürlükçü paternalizm.",
      "Varsayılanlar güçlüdür: organ bağışında opt-out, emeklilikte otomatik katılım (Türkiye'de 2017'den beri OKS), Save More Tomorrow.",
      "Günah vergileri dışsallığa ek olarak içsellik (kişinin gelecekteki kendisine yüklediği maliyet) gerekçesine dayanabilir; basitleştirme ve taahhüt araçları.",
      "Tahmin piyasaları dağınık bilgiyi fiyatlarda toplar ama yanlılıklardan muaf değildir.",
      "Eleştiriler: dürtenlerin yanlılıkları, paternalizm/manipülasyon, etkilerin ölçeği; firmalar da dürter.",
    ],
    terimler: [
      ["nudge", "dürtme", "A policy that structures choices to encourage long-run beneficial decisions without restricting options or significantly changing incentives."],
      ["choice architecture", "seçim mimarisi", "The way choices are presented to decision makers, which influences what they choose."],
      ["libertarian paternalism", "özgürlükçü paternalizm", "Guiding people toward choices in their interest while preserving their freedom to choose otherwise."],
      ["default option", "varsayılan seçenek", "The option that takes effect if the person does nothing."],
      ["opt-in", "katılmayı seçme", "A system in which people must actively choose to participate."],
      ["opt-out", "çıkmayı seçme", "A system in which people participate automatically unless they actively choose not to."],
      ["Save More Tomorrow", "Yarın Daha Çok Biriktir", "A plan in which employees commit in advance to save a portion of future pay raises."],
      ["social comparison", "sosyal karşılaştırma", "Showing people how their behavior compares with that of others to influence their choices."],
      ["sin tax", "günah vergisi", "A tax on goods considered harmful, such as tobacco, alcohol or sugary drinks."],
      ["internality", "içsellik", "A cost a person imposes on his or her own future self that is not taken into account in present decisions."],
      ["commitment device", "taahhüt aracı", "A way of locking oneself into a course of action in advance to overcome present bias."],
      ["prediction market", "tahmin piyasası", "A market whose contract payoffs depend on future events, so prices reflect aggregated expectations."],
      ["Behavioural Insights Team (Nudge Unit)", "davranışsal içgörüler ekibi", "A UK government unit established in 2010 to apply behavioral insights to policy, testing them with experiments."],
    ],
    quiz: [
      { s: "A nudge is a policy that:", c: ["Bans harmful choices", "Structures choices to encourage better decisions without restricting options", "Imposes large taxes", "Requires everyone to make the same choice"], d: 1, a: "Dürtme seçenekleri kısıtlamaz, teşvikleri belirgin biçimde değiştirmez; seçim ortamını düzenler." },
      { s: "Libertarian paternalism refers to:", c: ["Complete laissez-faire", "Guiding people toward beneficial choices while preserving freedom of choice", "Government ownership of firms", "Banning advertising"], d: 1, a: "Yönlendirme (paternalizm) + seçim özgürlüğü (özgürlükçü)." },
      { s: "Organ donation rates are much higher in countries with opt-out systems than with opt-in systems. This mainly reflects:", c: ["Different religious beliefs", "The power of default options due to status quo bias", "Higher incomes", "Better hospitals"], d: 1, a: "Benzer kültürlerde bile oranlar çok farklı; belirleyici olan varsayılan seçenek." },
      { s: "Placing healthy food at eye level in a school cafeteria is an example of:", c: ["A sin tax", "Choice architecture", "A price ceiling", "A prediction market"], d: 1, a: "Seçenekler yasaklanmadan sunuluş düzeni değiştiriliyor." },
      { s: "Thaler and Benartzi's 'Save More Tomorrow' plan works by:", c: ["Taxing consumption", "Having employees commit in advance to save part of future raises", "Banning credit cards", "Raising interest rates"], d: 1, a: "Şimdiki zaman yanlılığını tersine kullanır: fedakârlık geleceğe, maaş artışına bağlanır." },
      { s: "Turkey's automatic enrollment in the private pension system (2017) is an example of:", c: ["An opt-in system", "An opt-out (automatic enrollment) default", "A sin tax", "Price discrimination"], d: 1, a: "Çalışanlar otomatik dahil edilir, isteyen cayabilir: varsayılanı katılım olan bir dürtme." },
      { s: "Showing households how their energy use compares with their neighbors' is an example of:", c: ["Social comparison", "Price discrimination", "A Pigovian tax", "Monopsony"], d: 0, a: "Sosyal karşılaştırma bilgisi davranışı değiştirmek için kullanılır." },
      { s: "A behavioral justification for taxing cigarettes, beyond externalities, is that smokers:", c: ["Are rich", "Impose costs on their own future selves that they underweight (internalities)", "Do not respond to prices", "Prefer higher taxes"], d: 1, a: "Şimdiki zaman yanlılığı yüzünden gelecekteki sağlık maliyetleri hesaba katılmaz: içsellik." },
      { s: "If a contract that pays 1 lira if candidate X wins trades at 0.60, the market implies a probability of about:", c: ["6%", "40%", "60%", "100%"], d: 2, a: "Fiyat, katılımcıların beklediği kazanma olasılığını yansıtır: yaklaşık %60." },
      { s: "Which is a common criticism of behavioral (nudge) policies?", c: ["They are always too expensive", "Policymakers have biases and interests too, and nudges can be manipulative", "They eliminate freedom of choice completely", "They never have any effect"], d: 1, a: "Dürtenleri kim dürtecek? Devlet başarısızlığı riski ve şeffaflık/manipülasyon kaygısı." },
      { s: "The UK's Behavioural Insights Team ('Nudge Unit') typically evaluates its policies using:", c: ["Intuition only", "Randomized controlled trials", "Input–output analysis", "Opinion polls"], d: 1, a: "Küçük değişikliklerin etkisini rastgele deneylerle sınar." },
      { s: "Firms use behavioral insights too (e.g., automatic subscription renewals). This supports the use of behavioral economics in:", c: ["Monetary policy only", "Consumer protection policy", "Agricultural price supports", "Tariff policy"], d: 1, a: "Firmaların yanlılıklardan yararlanması tüketici koruma düzenlemelerinin gerekçesidir." },
    ],
  });
})();
