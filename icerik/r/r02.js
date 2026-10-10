// Araştırma Yöntemleri — 2. ders: Veri ve ölçme (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "r02",
    hedefler: [
      "Gözlem, değişken ve analiz birimi kavramlarını kullanmak; düzenli (tidy) veri biçimini tanımak",
      "Ölçek türlerini (sınıflama, sıralama, aralık, oran) ayırmak ve hangi işlemlere izin verdiklerini bilmek",
      "Kesit, zaman serisi ve panel verisini ayırt etmek",
      "Birincil ve ikincil veri kaynaklarını, özellikle iktisadi veri kaynaklarını tanımak",
      "Anakütle, örneklem, parametre ve istatistik kavramlarını; örnekleme yöntemlerini ve yanlılık türlerini açıklamak",
      "Ölçmenin geçerliliğini ve güvenilirliğini değerlendirmek",
    ],
    bolumler: [
      { baslik: "Veri nedir?", md: R`
**Veri (data)**, bir soruyu cevaplamak için toplanmış gözlemlerdir. Temel kavramlar:

- **Gözlem (observation):** veri setindeki her bir birim — bir öğrenci, bir firma, bir ülke, bir ay.
- **Değişken (variable):** gözlemler arasında farklı değerler alan özellik — yaş, gelir, enflasyon.
- **Analiz birimi (unit of analysis):** araştırmanın neyi incelediği. Aynı soru birey düzeyinde de ülke düzeyinde de sorulabilir ve farklı sonuçlar verebilir.

:::tanim Tidy data
A data format in which each variable forms a column, each observation forms a row, and each type of observational unit forms a table.
:::

R'da (ve Excel'de) çalışırken veriyi **düzenli (tidy)** tutmak işini kolaylaştırır: **her satır bir gözlem, her sütun bir değişken.** Aşağıdaki küçük tablo düzenlidir:

| ogrenci | sinif | calisma_saati | not_ortalamasi |
|---|---|---|---|
| Ayşe | 1 | 14 | 3.10 |
| Mehmet | 2 | 8 | 2.45 |
| Zeynep | 1 | 20 | 3.55 |

Bir dosyada aynı değişkenin farklı yıllarını ayrı sütunlara yaymak ("2023_gelir", "2024_gelir") ise düzenli değildir; 10. derste bunu dönüştürmeyi öğreneceğiz.
` },
      { baslik: "Ölçek türleri", md: R`
Bir değişkenin hangi **ölçekte** ölçüldüğü, onunla hangi istatistikleri yapabileceğini belirler. Stanley Stevens'ın dört ölçeği:

| Ölçek | Özellik | Örnek | Anlamlı işlemler |
|---|---|---|---|
| **Sınıflama (nominal)** | Yalnız kategori, sıra yok | cinsiyet, şehir, meslek | sayma, mod |
| **Sıralama (ordinal)** | Sıra var, aralıklar eşit değil | eğitim düzeyi, "hiç–az–çok", kredi notu | + medyan, yüzdelikler |
| **Aralık (interval)** | Eşit aralıklar, gerçek sıfır yok | °C sıcaklık, takvim yılı | + ortalama, standart sapma |
| **Oran (ratio)** | Eşit aralıklar ve gerçek sıfır | gelir, fiyat, miktar, yaş | + oranlar ("iki katı") |

:::dikkat
Sıralama ölçeğindeki sayıların ortalamasını almak tartışmalıdır: "1 = hiç memnun değilim … 5 = çok memnunum" sorusunda 4 ile 5 arasındaki fark 1 ile 2 arasındakiyle aynı mı? Bu tür Likert ölçekleri uygulamada çoğu zaman aralık ölçeği gibi kullanılır, ama bunu bilerek yapmak gerekir. Bir başka tuzak: 20°C, 10°C'nin "iki katı sıcak" değildir (aralık ölçeği, gerçek sıfır yok); ama 20.000 TL, 10.000 TL'nin iki katıdır (oran ölçeği).
:::

Daha kaba bir ayrım:

- **Kategorik (nitel) değişkenler:** sınıflama ve sıralama. R'da genellikle **factor** olarak saklanır.
- **Sayısal (nicel) değişkenler:** aralık ve oran. Bunlar da ikiye ayrılır:
  - **Kesikli (discrete):** sayılabilir değerler — çocuk sayısı, şube sayısı.
  - **Sürekli (continuous):** bir aralıktaki her değeri alabilir — gelir, boy, süre.
` },
      { baslik: "Veri yapıları: kesit, zaman serisi, panel", md: R`
İktisatta veri, gözlemlerin zaman ve birim boyutlarına göre üç biçimde gelir:

- **Kesit verisi (cross-sectional):** aynı anda çok sayıda birim. 2025'te 81 ilin kişi başı geliri; bir ankette 1.000 hane.
- **Zaman serisi (time series):** tek bir birimin zaman içindeki değerleri. Türkiye'nin 1990–2025 yıllık enflasyonu; BIST 100'ün günlük kapanışları.
- **Panel verisi (panel / longitudinal):** aynı birimlerin zaman içinde tekrar tekrar gözlenmesi. 81 ilin 2010–2025 yıllık işsizlik oranları; aynı hanelerin her yıl yeniden ankete katılması.

Panel verisi en zengin yapıdır: hem birimler arası hem zaman içi değişimi kullanır ve gözlenemeyen, zamanla değişmeyen farklılıkları (ör. bir ilin coğrafyası) kontrol etmeye izin verir.

:::ipucu
Zaman serilerinde dikkat: iki seri zamanla birlikte artıyorsa aralarında güçlü bir korelasyon çıkabilir, ama bu çoğu zaman sahte korelasyondur (1. ders). Zaman serisi ekonometrisi bu sorunla ayrıca ilgilenir.
:::
` },
      { baslik: "Veri kaynakları", md: R`
- **Birincil veri (primary data):** araştırmacının kendisinin topladığı veri — anket, deney, görüşme, gözlem. Sorunun tam ihtiyacına göre tasarlanır ama pahalı ve zahmetlidir.
- **İkincil veri (secondary data):** başkalarının (çoğunlukla resmî kurumların) topladığı veri. Ucuz ve büyüktür, ama senin sorun için toplanmamıştır; tanımları dikkatle okumak gerekir.

### Başlıca iktisadi veri kaynakları
| Kaynak | Ne bulunur |
|---|---|
| **TÜİK** (data.tuik.gov.tr) | GSYH, enflasyon, işgücü, gelir dağılımı, dış ticaret, nüfus |
| **TCMB EVDS** (evds2.tcmb.gov.tr) | faiz, kur, para arzı, ödemeler dengesi, beklenti anketleri |
| **Hazine ve Maliye Bakanlığı** | bütçe, borç istatistikleri |
| **Borsa İstanbul, KAP** | hisse fiyatları, şirket finansal tabloları ve açıklamaları |
| **Dünya Bankası WDI** | ülkeler arası karşılaştırmalı kalkınma göstergeleri |
| **IMF, OECD, Eurostat** | makroekonomik ve sektörel uluslararası veriler |

:::dikkat
İkincil veride **üst veriyi (metadata)** oku: değişken nasıl tanımlanmış, birim nedir (TL mi, bin TL mi, cari fiyat mı sabit fiyat mı), mevsimsellikten arındırılmış mı, yöntem hangi yılda değişmiş? Bunları atlamak en sık yapılan analiz hatalarındandır.
:::
` },
      { baslik: "Anakütle ve örneklem", md: R`
- **Anakütle (population):** hakkında sonuç çıkarmak istediğimiz bütün birimler — Türkiye'deki bütün üniversite öğrencileri.
- **Örneklem (sample):** anakütleden gözlemlediğimiz alt küme — ankete katılan 400 öğrenci.
- **Parametre:** anakütlenin (genellikle bilinmeyen) bir özelliği — bütün öğrencilerin ortalama harçlığı, $\mu$.
- **İstatistik:** örneklemden hesaplanan değer — 400 öğrencinin ortalama harçlığı, $\bar x$. İstatistiği parametrenin tahmini olarak kullanırız.

### Örnekleme yöntemleri
**Olasılıklı (probability) örnekleme** — her birimin seçilme olasılığı bilinir:
- **Basit rastgele:** her birim eşit olasılıkla seçilir (kura).
- **Tabakalı (stratified):** anakütle gruplara (tabakalara) ayrılır, her tabakadan rastgele seçilir — ör. her sınıftan orantılı öğrenci.
- **Küme (cluster):** rastgele kümeler (ör. şubeler, mahalleler) seçilip içlerindeki herkes alınır.
- **Sistematik:** listeden her k'ıncı birim.

**Olasılıksız (non-probability) örnekleme** — kolay ama genellenebilirliği zayıf:
- **Kolayda (convenience):** ulaşabildiğin kişiler (sınıf arkadaşların, WhatsApp grubu).
- **Kota:** belirli gruplardan belirli sayıda, ama rastgele olmadan.
- **Kartopu (snowball):** katılımcılar başkalarını önerir.

### Hata ve yanlılık
- **Örnekleme hatası (sampling error):** örneklemin rastlantısal olarak anakütleden farklı çıkması. Örneklem büyüdükçe küçülür ve istatistikle ölçülebilir (14. ders).
- **Yanlılık (bias):** sistematik hata — örneklem büyüse de gitmez.
  - **Seçim yanlılığı:** örneklem anakütleyi temsil etmiyor (yalnız internet kullananlarla yapılan anket).
  - **Cevapsızlık yanlılığı (nonresponse bias):** cevap verenler vermeyenlerden farklı.
  - **Hayatta kalma yanlılığı (survivorship bias):** yalnız "hayatta kalan" birimleri görmek — yalnız bugün borsada işlem gören şirketlerin geçmiş getirilerine bakmak, batıp kotasyondan çıkanları kaçırır.
` },
      { baslik: "Ölçmenin kalitesi", md: R`
Bir ölçüm iki ölçütle değerlendirilir:

- **Güvenilirlik (reliability):** ölçüm tutarlı mı? Aynı şeyi tekrar ölçtüğünde aynı sonucu alıyor musun?
- **Geçerlilik (validity):** ölçüm ölçmek istediğin şeyi mi ölçüyor? "Haftada kaç kitap okursun?" sorusu entelektüel merakı ölçmede ne kadar geçerli?

Bir tartı her seferinde 2 kg fazla gösteriyorsa **güvenilirdir ama geçerli değildir**. Hedef tahtası benzetmesi: oklar hep aynı yere ama merkezin dışına gidiyorsa güvenilir–geçersiz; merkezin etrafına dağınık gidiyorsa geçerli–güvenilmez.

### Anket sorusu yazarken
- **Yönlendirici soru** sorma: "Hükümetin başarılı ekonomi politikalarını destekliyor musunuz?"
- **Çift namlulu (double-barreled)** soru sorma: "Dersler ilginç ve faydalı mıydı?" — ya ilginç ama faydasızsa?
- **Belirsiz zaman ve birim** kullanma: "Ne kadar çalışırsın?" yerine "Geçen hafta ders dışında toplam kaç saat çalıştın?"
- Hassas sorularda (gelir, sigara) insanlar **sosyal beğenirlik yanlılığıyla** cevap verebilir.

### R'da bir veri setine ilk bakış
Bu uygulamada R gerçekten çalışıyor. Aşağıdaki kodda R'ın içinde gelen bir iktisat veri setine — 50 ülkenin 1960–70 tasarruf oranları — bakıyoruz. **Çalıştır**'a bas (ilk sefer R'ın yüklenmesi birkaç saniye sürebilir):

${"```"}r
# 50 ülke, 5 değişken: sr = tasarruf oranı, pop15 = 15 yaş altı nüfus payı,
# pop75 = 75 yaş üstü nüfus payı, dpi = kişi başı harcanabilir gelir, ddpi = dpi büyüme oranı
str(LifeCycleSavings)
head(LifeCycleSavings)
${"```"}

Her satır bir **gözlem** (ülke), her sütun bir **değişken**: düzenli bir kesit verisi. Bütün değişkenler oran ölçeğinde ve sürekli.
` },
    ],
    ozet: [
      "Gözlem = satır, değişken = sütun (düzenli veri). Analiz birimi sorunun neyi incelediğidir.",
      "Ölçekler: sınıflama (kategori), sıralama (sıra), aralık (eşit aralık, gerçek sıfır yok), oran (gerçek sıfır). Ölçek, anlamlı istatistikleri belirler.",
      "Kesit (çok birim, tek zaman), zaman serisi (tek birim, çok zaman), panel (aynı birimler, çok zaman).",
      "Birincil veri araştırmacının topladığı, ikincil veri kurumların topladığı veridir; TÜİK, TCMB EVDS, KAP, Dünya Bankası… Üst veriyi oku.",
      "Anakütle–örneklem, parametre–istatistik. Olasılıklı örnekleme (basit rastgele, tabakalı, küme, sistematik) genellenebilirlik sağlar.",
      "Örnekleme hatası örneklemle küçülür; yanlılık (seçim, cevapsızlık, hayatta kalma) küçülmez. Ölçüm güvenilir ve geçerli olmalı.",
    ],
    terimler: [
      ["data", "veri", "Observations collected to answer a question."],
      ["observation", "gözlem", "A single unit in a data set, such as a person, firm, country, or time period."],
      ["unit of analysis", "analiz birimi", "The entity a study examines (individuals, firms, countries…)."],
      ["tidy data", "düzenli veri", "Each variable is a column, each observation is a row."],
      ["nominal scale", "sınıflama ölçeği", "Categories with no natural order."],
      ["ordinal scale", "sıralama ölçeği", "Categories with a natural order but unequal or unknown intervals."],
      ["interval scale", "aralık ölçeği", "Equal intervals but no true zero."],
      ["ratio scale", "oran ölçeği", "Equal intervals and a true zero; ratios are meaningful."],
      ["categorical variable", "kategorik değişken", "A variable whose values are categories."],
      ["discrete variable", "kesikli değişken", "A numerical variable that takes countable values."],
      ["continuous variable", "sürekli değişken", "A numerical variable that can take any value in an interval."],
      ["time series", "zaman serisi", "Observations on one unit over time."],
      ["panel data", "panel verisi", "Observations on the same units over multiple time periods."],
      ["primary data", "birincil veri", "Data collected by the researcher for the study."],
      ["secondary data", "ikincil veri", "Data collected by others, often official agencies."],
      ["metadata", "üst veri", "Information describing how data were defined, measured and collected."],
      ["population", "anakütle", "The entire set of units about which conclusions are drawn."],
      ["sample", "örneklem", "The subset of the population that is observed."],
      ["parameter", "parametre", "A characteristic of the population, usually unknown."],
      ["statistic", "istatistik", "A value computed from sample data."],
      ["simple random sample", "basit rastgele örneklem", "Every unit has an equal chance of being selected."],
      ["stratified sampling", "tabakalı örnekleme", "Sampling randomly within predefined subgroups."],
      ["cluster sampling", "küme örneklemesi", "Randomly selecting groups and including all units within them."],
      ["convenience sample", "kolayda örneklem", "A sample of units that are easy to reach."],
      ["sampling error", "örnekleme hatası", "Random difference between a sample statistic and the population parameter."],
      ["selection bias", "seçim yanlılığı", "Systematic error from a non-representative sample."],
      ["nonresponse bias", "cevapsızlık yanlılığı", "Bias arising because respondents differ from non-respondents."],
      ["survivorship bias", "hayatta kalma yanlılığı", "Bias from looking only at units that survived a selection process."],
      ["reliability", "güvenilirlik", "The consistency of a measurement."],
      ["validity", "geçerlilik", "The extent to which a measurement captures what it intends to measure."],
    ],
    quiz: [
      { s: "In a tidy data set:", c: ["Each row is a variable and each column an observation", "Each row is an observation and each column a variable", "Variables are spread across years in separate columns", "There is one table per variable"], d: 1, a: "Düzenli veri: her satır bir gözlem, her sütun bir değişken." },
      { s: "Education level (primary, secondary, university) is measured on which scale?", c: ["Nominal", "Ordinal", "Interval", "Ratio"], d: 1, a: "Doğal bir sıra var ama aralıklar eşit değil: sıralama ölçeği." },
      { s: "Income in TL is measured on which scale?", c: ["Nominal", "Ordinal", "Interval", "Ratio"], d: 3, a: "Eşit aralıklar ve gerçek sıfır var; 'iki katı' anlamlı: oran ölçeği." },
      { s: "Temperature in °C is an interval-scale variable because:", c: ["It has categories", "It has equal intervals but no true zero", "It has a true zero", "It is ordinal"], d: 1, a: "0°C 'sıcaklık yok' demek değildir; 20°C, 10°C'nin iki katı değildir." },
      { s: "Annual unemployment rates of all 81 Turkish provinces from 2010 to 2025 form:", c: ["Cross-sectional data", "A single time series", "Panel data", "Experimental data"], d: 2, a: "Aynı birimler (iller) birden çok dönemde: panel verisi." },
      { s: "Data downloaded from TÜİK for your thesis are:", c: ["Primary data", "Secondary data", "Experimental data", "Qualitative data only"], d: 1, a: "Başka bir kurumun topladığı veri ikincil veridir." },
      { s: "The average allowance of the 400 students in your survey is a:", c: ["Parameter", "Statistic", "Population", "Variable type"], d: 1, a: "Örneklemden hesaplanan değer istatistiktir; anakütle ortalaması parametredir." },
      { s: "Dividing students by year of study and randomly sampling within each year is:", c: ["Cluster sampling", "Stratified sampling", "Convenience sampling", "Snowball sampling"], d: 1, a: "Tabakalar içinde rastgele seçim: tabakalı örnekleme." },
      { s: "Studying only firms currently listed on the stock exchange to evaluate past returns can create:", c: ["Survivorship bias", "Sampling error only", "Reliability", "Operationalization"], d: 0, a: "Batıp kotasyondan çıkan şirketler görünmez: hayatta kalma yanlılığı." },
      { s: "A scale that always shows 2 kg more than the true weight is:", c: ["Valid and reliable", "Reliable but not valid", "Valid but not reliable", "Neither"], d: 1, a: "Tutarlı (güvenilir) ama doğruyu ölçmüyor (geçerli değil)." },
      { s: "Which survey question is double-barreled?", c: ["How many hours did you study last week?", "Were the lectures interesting and useful?", "What is your year of study?", "Do you live in a dormitory?"], d: 1, a: "Tek soruda iki ayrı şey soruluyor." },
    ],
  });
})();
