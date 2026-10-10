// dizin.js — üç dersin müfredatı (başlıklar, gruplar, tapınak sütunları). Ders gövdeleri tembel yüklenir:
// icerik/<ders>/<id>.js dosyası ECO.icerikEkle({...}) çağırır.
(function () {
  "use strict";
  const b = (id, no, ad, tr, ozet, ek) => ({ id, no, ad, tr, ozet, ek: !!ek });

  ECO.dersler = {
    mikro: {
      id: "mikro", ad: "Mikroekonomi", ders: "Introduction to Microeconomics", yer: "Agora", yazit: "ΑΓΟΡΑ",
      kaynak: "Colander, Microeconomics, 11. baskı (McGraw Hill)",
      tanitim: "Agora, Atina'nın pazar yeriydi: fiyatların, takasın ve tartışmanın meydanı. Burada Colander'ın 23 bölümünü sırayla, etkileşimli grafiklerle çalışıyorsun.",
      gruplar: [
        { ad: "Giriş: İktisatçı gibi düşünmek", bolumler: [
          b("m01", 1, "Economics and Economic Reasoning", "İktisat ve iktisadi düşünce", "Kıtlık, marjinal fayda–maliyet, fırsat maliyeti, pozitif ve normatif iktisat"),
          b("m02", 2, "The Production Possibility Model, Trade, and Globalization", "Üretim olanakları modeli, ticaret ve küreselleşme", "ÜOE, artan fırsat maliyeti, etkinlik, karşılaştırmalı üstünlük, tek fiyat yasası"),
          b("m03", 3, "Economic Institutions", "İktisadi kurumlar", "Piyasa ekonomisi, sosyalizm, işletme türleri, hane halkı, devletin rolleri, küresel kurumlar"),
          b("m04", 4, "Supply and Demand", "Arz ve talep", "Talep yasası, talep miktarı ve talep ayrımı, kaydırıcılar, arz, piyasa dengesi"),
          b("m05", 5, "Using Supply and Demand", "Arz ve talebi kullanmak", "Kaymaların analizi, tavan ve taban fiyat, vergi, miktar kısıtı, üçüncü taraf ödeyici"),
        ] },
        { ad: "Arz–talep modelinin gücü", bolumler: [
          b("m06", 6, "Describing Supply and Demand: Elasticities", "Arz ve talebi betimlemek: esneklikler", "Fiyat esnekliği, orta nokta yöntemi, esneklik ve toplam gelir, gelir ve çapraz esneklik"),
          b("m07", 7, "Taxation and Government Intervention", "Vergilendirme ve devlet müdahalesi", "Tüketici ve üretici artığı, ölü ağırlık kaybı, vergi yükünün dağılımı, fiyat kontrolleri"),
          b("m08", 8, "Market Failure versus Government Failure", "Piyasa başarısızlığı ve devlet başarısızlığı", "Dışsallıklar, Pigou vergisi, kamu malları, asimetrik bilgi, devlet başarısızlığı"),
          b("m09", 9, "Comparative Advantage, Exchange Rates, and Globalization", "Karşılaştırmalı üstünlük, döviz kurları ve küreselleşme", "Ticaretten kazanç, ticaret hadleri, döviz kuru, ticaret dengesi"),
          b("m10", 10, "International Trade Policy", "Uluslararası ticaret politikası", "Gümrük vergisi, kota, korumacılık gerekçeleri, DTÖ ve serbest ticaret anlaşmaları"),
        ] },
        { ad: "Üretim, maliyet ve piyasa yapıları", bolumler: [
          b("m11", 11, "Production and Cost Analysis I", "Üretim ve maliyet analizi I", "Kısa dönem, azalan marjinal verim, sabit–değişken–marjinal–ortalama maliyet"),
          b("m12", 12, "Production and Cost Analysis II", "Üretim ve maliyet analizi II", "Uzun dönem maliyetler, ölçek ekonomileri, kapsam ekonomileri, eş-ürün ve eş-maliyet"),
          b("m13", 13, "Perfect Competition", "Tam rekabet", "Fiyat alıcı firma, MR = MC, kâr ve zarar, kapanma noktası, uzun dönem dengesi"),
          b("m14", 14, "Monopoly and Monopolistic Competition", "Tekel ve tekelci rekabet", "MR < P, tekelin refah kaybı, giriş engelleri, fiyat farklılaştırması, platform tekelleri"),
          b("m15", 15, "Oligopoly and Antitrust Policy", "Oligopol ve rekabet politikası", "Kartel modeli, oyun teorisi, yoğunlaşma oranı ve HHI, rekabet hukuku"),
          b("m16", 16, "Real-World Competition and Technology", "Gerçek dünyada rekabet ve teknoloji", "Firmanın amaçları, vekâlet sorunu, doğal tekelin düzenlenmesi, ağ dışsallıkları"),
        ] },
        { ad: "Faktör piyasaları ve gelir dağılımı", bolumler: [
          b("m17", 17, "Work and the Labor Market", "Emek piyasası", "Emek arzı ve talebi, marjinal gelir ürünü, asgari ücret, monopson, ayrımcılık"),
          b("m18", 18, "Who Gets What? The Distribution of Income", "Kim ne alıyor? Gelir dağılımı", "Lorenz eğrisi, Gini katsayısı, yoksulluk ölçüleri, vergi ve yeniden dağıtım"),
        ] },
        { ad: "Seçim, strateji ve davranışsal iktisat", bolumler: [
          b("m19", 19, "The Logic of Individual Choice: The Foundation of Supply and Demand", "Bireysel seçimin mantığı", "Fayda, azalan marjinal fayda, MU/P kuralı, gelir ve ikame etkisi, kayıtsızlık eğrileri"),
          b("m20", 20, "Game Theory, Strategic Decision Making, and Behavioral Economics", "Oyun teorisi ve stratejik karar", "Mahkûm ikilemi, baskın strateji, Nash dengesi, sıralı oyunlar, ültimatom oyunu"),
          b("m21", 21, "Thinking Like a Modern Economist", "Modern bir iktisatçı gibi düşünmek", "Davranışsal iktisadın yapı taşları, sınırlı rasyonellik, deneyler ve ampirik modeller"),
          b("m22", 22, "Behavioral Economics and Modern Economic Policy", "Davranışsal iktisat ve modern iktisat politikası", "Dürtme, seçim mimarisi, varsayılan seçenekler, davranışsal politika"),
          b("m23", 23, "Microeconomic Policy, Economic Reasoning, and Beyond", "Mikro politika, iktisadi akıl yürütme ve ötesi", "Fayda–maliyet analizi, istatistiksel hayatın değeri, piyasa ve devlet başarısızlığı tartışması"),
        ] },
      ],
      sutunlar: [{ ad: "Mikro I", ilk: 1, son: 12 }, { ad: "Mikro II", ilk: 13, son: 23 }],
    },

    mate: {
      id: "mate", ad: "Matematik", ders: "Mathematics I", yer: "Akademia", yazit: "ΑΓΕΩΜΕΤΡΗΤΟΣ ΜΗΔΕΙΣ ΕΙΣΙΤΩ",
      yazitTr: "Geometri bilmeyen girmesin — Platon'un Akademia kapısı",
      kaynak: "Mathematics I — 14 haftalık izlence (Marjinal M-101 konularından)",
      tanitim: "Platon'un okulunun kapısında “geometri bilmeyen girmesin” yazardı. Bu dersin her haftası, iktisadın kullandığı matematik aletlerinden birini kuruyor.",
      gruplar: [
        { ad: "Ara sınava kadar", bolumler: [
          b("h01", 1, "Introduction to Mathematics", "Matematiğe giriş", "Fonksiyon, tanım kümesi, üs kuralları, eğim"),
          b("h02", 2, "Linear Equations and Economic Applications", "Doğrusal denklemler ve iktisatta uygulamaları", "Eğim, arz–talep dengesi, başabaş, vergi, denklem sistemi"),
          b("h03", 3, "Quadratic Equations", "İkinci derece denklemler", "Diskriminant, kökler, tepe noktası, gelir ve kâr parabolü"),
          b("h04", 4, "Exponential Functions and Logarithms", "Üstel fonksiyon ve logaritma", "e sayısı, ln kuralları, üstel denklem çözümü, büyüme"),
          b("h05", 5, "Interest: Simple, Compound, Continuous", "Faiz: basit, bileşik, sürekli", "Gelecek ve bugünkü değer, efektif faiz, reel faiz"),
          b("h06", 6, "Annuities and Loans", "Anüiteler ve kredi", "Eşit ödemeler, taksit hesabı, birikim fonu, perpetüite"),
          b("h07", 7, "Growth and Investment Appraisal", "Büyüme ve yatırım değerlendirme", "Bileşik büyüme oranı, net bugünkü değer, iç verim oranı"),
        ] },
        { ad: "Finale kadar", bolumler: [
          b("h09", 9, "Derivatives and Rules of Differentiation", "Türev ve türev alma kuralları", "Limit, teğet, kuvvet–çarpım–bölüm–zincir kuralları"),
          b("h10", 10, "Marginal Analysis and Elasticity", "Marjinal analiz ve esneklik", "MC, MR, MPC; ortalama–marjinal ilişkisi; nokta ve yay esnekliği"),
          b("h11", 11, "Optimization: Maxima and Minima", "Optimizasyon: maksimum ve minimum", "Birinci ve ikinci sıra koşul, konkavlık, kâr maksimizasyonu"),
          b("h12", 12, "Integration", "İntegral", "İlkel fonksiyon, integral kuralları, yerine koyma, belirli integral"),
          b("h13", 13, "Area, Consumer and Producer Surplus", "Alan, tüketici ve üretici artığı", "İki eğri arası alan, artıklar, Lorenz eğrisi ve Gini"),
          b("h14", 14, "Total Functions and Flows", "Toplam fonksiyon ve akımlar", "Marjinalden toplama, stok–akım, gelir akışının bugünkü değeri"),
        ] },
        { ad: "Ek konu", bolumler: [
          b("h16", 16, "Matrices and the Input–Output Model", "Matrisler ve girdi–çıktı modeli", "İşlemler, determinant, ters matris, Cramer, Leontief", true),
        ] },
      ],
      sinavlar: [{ hafta: 8, ad: "Ara sınav", kapsam: ["h01", "h02", "h03", "h04", "h05", "h06", "h07"] }, { hafta: 15, ad: "Final", kapsam: ["h09", "h10", "h11", "h12", "h13", "h14"] }],
      sutunlar: [{ ad: "Mate I", ilk: 1, son: 7 }, { ad: "Mate II", ilk: 9, son: 14 }],
    },

    r: {
      id: "r", ad: "Araştırma Yöntemleri", ders: "Computer-Aided Research Methods (R)", yer: "Kütüphane", yazit: "ΨΥΧΗΣ ΙΑΤΡΕΙΟΝ",
      yazitTr: "Ruhun şifahanesi — İskenderiye Kütüphanesi'nin kapısındaki söz",
      kaynak: "R 4.6 + RStudio; kodlar uygulamanın içinde gerçek R ile (webR) çalışır",
      tanitim: "İskenderiye Kütüphanesi antik dünyanın bütün bilgisini toplamaya çalıştı. Burada veriyi toplamayı, R ile düzenleyip çözümlemeyi ve bir araştırmayı baştan sona yürütmeyi öğreniyorsun.",
      gruplar: [
        { ad: "Araştırmanın temelleri ve R'a giriş", bolumler: [
          b("r01", 1, "What Is Research?", "Araştırma nedir?", "Araştırma sorusu, hipotez, değişkenler, nedensellik ve korelasyon, araştırma süreci"),
          b("r02", 2, "Data and Measurement", "Veri ve ölçme", "Ölçek türleri, kesit–zaman serisi–panel, birincil–ikincil veri, örnekleme"),
          b("r03", 3, "Installing R and RStudio", "R ve RStudio kurulumu", "CRAN, RStudio'nun dört paneli, proje, betik, çalışma dizini, kısayollar"),
          b("r04", 4, "First Steps in R", "R ile ilk adımlar", "Hesap makinesi olarak R, nesneler ve atama, işlevler ve argümanlar, yardım"),
          b("r05", 5, "Vectors", "Vektörler", "c(), seq(), rep(), indeksleme, vektörel işlemler, mantıksal vektörler"),
          b("r06", 6, "Data Types and Missing Values", "Veri tipleri ve eksik değerler", "numeric, character, logical, factor, NA, tip dönüşümü"),
          b("r07", 7, "Data Frames", "Veri çerçeveleri", "data.frame, str(), head(), summary(), $ ve [satır, sütun], hazır veri setleri"),
          b("r08", 8, "Programming: Conditions, Loops, Functions", "Programlama: koşul, döngü, işlev", "if/else, for, kendi işlevini yazmak, sapply"),
          b("r09", 9, "Importing and Exporting Data", "Veri okuma ve yazma", "read.csv, write.csv, Excel dosyaları, dosya yolları, veri temizliğine ilk bakış"),
          b("r10", 10, "Packages and the Tidyverse: dplyr", "Paketler ve tidyverse: dplyr", "install.packages, library, filter, select, mutate, arrange, summarise, group_by, |>"),
        ] },
        { ad: "İstatistik ve araştırmayı yürütmek", bolumler: [
          b("r11", 11, "Descriptive Statistics", "Betimsel istatistik", "Ortalama, medyan, varyans, standart sapma, çeyrekler, frekans tabloları"),
          b("r12", 12, "Visualizing Data: Base R and ggplot2", "Veriyi görselleştirmek", "Histogram, kutu grafiği, saçılım, çizgi; ggplot2'nin dilbilgisi"),
          b("r13", 13, "Probability Distributions and Simulation", "Olasılık dağılımları ve simülasyon", "Normal ve binom dağılım, d-p-q-r işlevleri, set.seed, merkezi limit teoremi"),
          b("r14", 14, "Sampling and Confidence Intervals", "Örnekleme ve güven aralıkları", "Standart hata, t dağılımı, ortalama için güven aralığı"),
          b("r15", 15, "Hypothesis Testing", "Hipotez testleri", "H0 ve H1, p-değeri, I. ve II. tür hata, t-testleri, ki-kare testi"),
          b("r16", 16, "Correlation", "Korelasyon", "Pearson ve Spearman, cor.test, saçılım grafiği, korelasyon nedensellik değildir"),
          b("r17", 17, "Simple Linear Regression", "Basit doğrusal regresyon", "lm(), EKK, katsayıların yorumu, R², artıklar, tahmin"),
          b("r18", 18, "Multiple Regression and Economic Models", "Çoklu regresyon ve iktisadi modeller", "Kontrol değişkeni, kukla değişken, log modeller ve esneklik yorumu"),
          b("r19", 19, "Reporting: R Markdown, Quarto and Academic Writing", "Raporlama ve akademik yazım", "R Markdown/Quarto, rapor yapısı, kaynak gösterme, araştırma etiği"),
          b("r20", 20, "A Mini Research Project, Start to Finish", "Baştan sona mini araştırma projesi", "Soru → veri → temizlik → betimleme → test → regresyon → rapor"),
        ] },
      ],
      sutunlar: [{ ad: "R I", ilk: 1, son: 10 }, { ad: "R II", ilk: 11, son: 20 }],
    },
  };

  // Yardımcılar
  ECO.dersBul = (id) => {
    for (const d of Object.values(ECO.dersler)) for (const g of d.gruplar) for (const bl of g.bolumler) if (bl.id === id) return { ders: d, grup: g, bolum: bl };
    return null;
  };
  ECO.tumBolumler = (dersId) => {
    const out = [];
    for (const d of Object.values(ECO.dersler)) if (!dersId || d.id === dersId) for (const g of d.gruplar) out.push(...g.bolumler.map((bl) => Object.assign({ ders: d.id }, bl)));
    return out;
  };
  ECO.icerik = {};
  // String.raw şablonlarında satır içi kod için yazılan \` kaçışı ters bölüyü korur; yükleyici onu düz ` yapar
  const tersTirnak = (s) => (typeof s === "string" ? s.split("\\`").join("`") : s);
  const normallestir = (o) => {
    (o.bolumler || []).forEach((b) => { b.md = tersTirnak(b.md); });
    (o.alistirmalar || []).forEach((a) => { a.soru = tersTirnak(a.soru); a.ipucu = tersTirnak(a.ipucu); });
    return o;
  };
  ECO.icerikEkle = (o) => { ECO.icerik[o.id] = normallestir(o); };
  ECO.icerikYukle = async (id) => {
    if (ECO.icerik[id]) return ECO.icerik[id];
    const yer = ECO.dersBul(id);
    if (!yer) throw new Error("Böyle bir bölüm yok: " + id);
    try { await ECO.betikYukle(`icerik/${yer.ders.id}/${id}.js`); }
    catch (e) { return null; }
    return ECO.icerik[id] || null;
  };
})();
