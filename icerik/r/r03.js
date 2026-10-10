// Araştırma Yöntemleri — 3. ders: R ve RStudio kurulumu (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r03",
    hedefler: [
      "R ile RStudio arasındaki farkı açıklamak",
      "Windows ve macOS'ta R ve RStudio'yu doğru sırayla kurmak",
      "RStudio'nun dört panelini ve görevlerini tanımak",
      "Proje oluşturmak, betik yazıp kaydetmek, çalışma dizinini anlamak",
      "Temel klavye kısayollarını kullanmak",
      "Bu uygulamadaki tarayıcı içi R'ın (webR) sınırlarını bilmek",
    ],
    bolumler: [
      { baslik: "R ve RStudio: motor ve gösterge paneli", md: R`
İkisi sık karıştırılır:

- **R**, istatistik ve veri analizi için bir **programlama dilidir** ve bu dili çalıştıran programdır — arabanın **motoru**.
- **RStudio**, R'ı daha rahat kullanmak için bir **tümleşik geliştirme ortamıdır (IDE)** — arabanın **gösterge paneli ve direksiyonu**. Kod editörü, konsol, grafik penceresi, dosya gezgini, yardım… hepsi bir arada. RStudio'yu Posit firması geliştirir; masaüstü sürümü ücretsizdir.

RStudio R olmadan çalışmaz: önce motoru (R), sonra paneli (RStudio) kurarsın.

Neden R? Ücretsiz ve açık kaynak; istatistikçilerin ve iktisatçıların yaygın kullandığı bir dil; 20.000'den fazla ücretsiz paket (CRAN deposunda); yapılan her analiz bir betik olarak kaydedildiği için **tekrarlanabilir**. Excel'de tıklayarak yaptığın bir analizi altı ay sonra kimse (sen dahil) aynen tekrarlayamaz; R betiği ise her seferinde aynı sonucu verir.
` },
      { baslik: "Kurulum adımları", md: R`
### 1. R'ı kur
1. **cran.r-project.org** adresine git.
2. İşletim sistemini seç: **Download R for Windows** → **base** → **Download R-4.x.x for Windows**. macOS'ta işlemcine uygun (Apple Silicon için *arm64*, Intel için *x86_64*) .pkg dosyasını indir.
3. Kurulumu varsayılan ayarlarla tamamla.

### 2. RStudio'yu kur
1. **posit.co/download/rstudio-desktop** adresine git.
2. **Download RStudio Desktop** düğmesiyle işletim sistemine uygun kurulum dosyasını indir ve kur.
3. RStudio'yu aç: R'ı otomatik bulur. Konsolda R'ın sürüm bilgisini görürsün.

:::dikkat
Sık karşılaşılan sorunlar:
- **Kullanıcı adında Türkçe karakter ya da boşluk** (C:\Users\Çağrı Öztürk) bazı paketlerin kurulumunda soruna yol açabilir. Gerekirse paket kütüphanesini C:\R\library gibi basit bir klasöre ayarla.
- **Okulun bilgisayarında yönetici izni** yoksa kurulum yapılamayabilir; o zaman **Posit Cloud** (tarayıcıda RStudio) ya da bu uygulamadaki R işini görür.
- Kurduktan sonra paketleri ilk kez yüklerken RStudio "bir CRAN aynası seç" diye sorabilir; **0-Cloud** iyi bir seçimdir.
:::

### 3. İlk paketleri kur
RStudio'nun konsoluna (bir kez) şunu yaz:

${K}r salt
install.packages(c("tidyverse", "readxl", "rmarkdown"))
${K}

Paketler bir kez **kurulur**, her oturumda **yüklenir** (\`library(dplyr)\`). Bu farkı 10. derste ayrıntısıyla göreceğiz.
` },
      { baslik: "RStudio'nun dört paneli", md: R`
RStudio açıldığında ekran dört bölmeye ayrılır. Görsele dokunarak her birinin ne işe yaradığını oku:

{{rstudio-paneller}}

Betik (Source) paneli ilk açılışta görünmeyebilir: **File → New File → R Script** (Ctrl+Shift+N) ile açılır.

:::ipucu
Altın kural: **kodunu konsola değil, betiğe yaz.** Konsola yazdığın her şey kaybolur; betik kaydedilir, düzeltilir, tekrar çalıştırılır, ödev olarak teslim edilir. Konsolu yalnız hızlı denemeler için kullan.
:::
` },
      { baslik: "Proje, betik ve çalışma dizini", md: R`
### Çalışma dizini (working directory)
R'ın dosya okurken ve yazarken baktığı klasördür. Hangi klasörde olduğunu öğrenmek için:

${K}r
getwd()
${K}

(Bu uygulamada R tarayıcının içindeki sanal bir klasörde çalışır: /home/web_user.)

\`setwd("C:/Users/…/odev")\` ile dizini değiştirebilirsin ama bu, betiğini başka bir bilgisayarda çalışmaz hâle getirir. Daha iyi yol **projedir**.

### RStudio projeleri
**File → New Project → New Directory → New Project** ile bir klasör ve içinde bir **.Rproj** dosyası oluşturursun. Projeyi açtığında çalışma dizini otomatik olarak o klasör olur. Her ödev ya da araştırma için ayrı bir proje kullan; veri dosyalarını da o klasöre koy. Böylece \`read.csv("anket.csv")\` gibi **göreli yollar** her bilgisayarda çalışır.

### Betik yazmak
- Betik dosyaları **.R** uzantılıdır.
- **#** ile başlayan satırlar **yorumdur**: R onları çalıştırmaz. Kodunu açıklamak için bolca kullan.
- Betiğin başına kim olduğunu, tarihi ve amacı yaz:

${K}r salt
# Ödev 1 — Betimsel istatistik
# Ad Soyad, 2026-10-12
# Amaç: anket verisinde not ortalamasını özetlemek

veri <- read.csv("anket.csv")
summary(veri$not_ortalamasi)
${K}
` },
      { baslik: "Kısayollar", md: R`
Bu kısayollar sana saatler kazandırır (macOS'ta Ctrl yerine Cmd):

| Kısayol | İş |
|---|---|
| **Ctrl + Enter** | İmlecin bulunduğu satırı ya da seçimi çalıştır |
| **Ctrl + Shift + Enter** | Bütün betiği çalıştır |
| **Alt + −** | Atama oku \`<-\` yaz |
| **Ctrl + Shift + M** | Boru (pipe) \`\|>\` yaz |
| **Ctrl + Shift + C** | Seçili satırları yorum yap / yorumdan çıkar |
| **Tab** | Otomatik tamamlama (işlev ve nesne adları) |
| **↑ (konsolda)** | Önceki komutları getir |
| **Ctrl + L** | Konsolu temizle |
| **F1** (imleç bir işlevdeyken) | O işlevin yardım sayfası |
| **Esc** | Takılan ya da yarım kalan komutu iptal et |

Bu uygulamadaki kod kutularında da **Ctrl + Enter** kodu çalıştırır ve **Tab** iki boşluk girintisi koyar.
` },
      { baslik: "Bu uygulamadaki R", md: R`
Ecopolis'in Kütüphane bölümündeki R, **webR** adlı bir proje sayesinde doğrudan tarayıcında çalışır (R'ın WebAssembly'ye derlenmiş hâli, R 4.6). Bu yüzden telefonda bile gerçek R kodu çalıştırabilirsin.

Bilmen gerekenler:

- **İlk açılış:** R'ın tarayıcıya inmesi birkaç saniye sürer; sonra önbellekten gelir. İnternet yalnız ilk seferde (ve yeni paket kurarken) gerekir.
- **Oturum ortak:** aynı sayfadaki bütün kod kutuları aynı R oturumunu paylaşır. Bir kutuda oluşturduğun \`x\`'i sonraki kutuda kullanabilirsin — RStudio'da betiği satır satır çalıştırmak gibi.
- **Paketler:** kodda \`library(dplyr)\` görünce uygulama paketi kendisi kurar (ilk seferde ~10 saniye). Çoğu CRAN paketi kullanılabilir, ama derlenmiş kod gerektiren bazıları webR deposunda olmayabilir.
- **Dosyalar:** R tarayıcının içindeki sanal bir dosya sisteminde çalışır. Derslerin ihtiyaç duyduğu örnek veri dosyaları (ör. ogrenci_anket.csv) oraya otomatik konur. Kendi bilgisayarındaki dosyalara erişemez.
- **Yardım sayfaları** (\`?mean\`) webR'da sınırlıdır; gerçek RStudio'da tam çalışır.

Hadi deneyelim — R'ın sürümünü ve bugünün tarihini yazdır:

${K}r
R.version.string
Sys.Date()
${K}

Her şey yolundaysa ekranda R'ın sürümünü ve tarihi görürsün. Tebrikler: ilk R kodunu çalıştırdın.

:::ipucu
Bu uygulama öğrenmek ve alıştırma yapmak için harika; ama ödevlerini ve projelerini **gerçek RStudio'da** yapmayı alışkanlık edin. Kütüphane'deki **R konsolu** sayfası da RStudio'nun konsolunu taklit eden serbest bir çalışma alanıdır.
:::
` },
    ],
    ozet: [
      "R dil ve motor, RStudio onu kullanmayı kolaylaştıran IDE'dir; önce R, sonra RStudio kurulur.",
      "Kurulum: cran.r-project.org → R; posit.co → RStudio Desktop. Paketler install.packages() ile bir kez kurulur, library() ile her oturumda yüklenir.",
      "Dört panel: Source (betik), Console, Environment/History, Files/Plots/Packages/Help.",
      "Kodu betiğe yaz ve kaydet; her iş için bir RStudio projesi kullan ki göreli dosya yolları çalışsın.",
      "Kısayollar: Ctrl+Enter, Ctrl+Shift+Enter, Alt+− (<-), Ctrl+Shift+M (|>), Tab, F1.",
      "Uygulamadaki R (webR) tarayıcıda çalışır; oturum sayfa içinde ortaktır, paketler otomatik kurulur.",
    ],
    terimler: [
      ["R", "R", "A free programming language and environment for statistical computing and graphics."],
      ["RStudio", "RStudio", "An integrated development environment (IDE) for R, developed by Posit."],
      ["IDE (integrated development environment)", "tümleşik geliştirme ortamı", "Software that combines a code editor, console and tools in one interface."],
      ["CRAN", "CRAN", "The Comprehensive R Archive Network, the main repository of R and R packages."],
      ["package", "paket", "A collection of R functions, data and documentation that extends R."],
      ["console", "konsol", "The pane where R commands are executed and results displayed."],
      ["script", "betik", "A text file (.R) containing R code that can be saved and rerun."],
      ["working directory", "çalışma dizini", "The folder where R looks for and saves files by default."],
      ["RStudio project", "RStudio projesi", "A folder with an .Rproj file that sets the working directory and organizes a piece of work."],
      ["relative path", "göreli yol", "A file path given relative to the working directory, e.g., \"data/survey.csv\"."],
      ["comment", "yorum", "Text after # that R ignores; used to explain code."],
      ["environment", "ortam", "The set of objects currently stored in the R session."],
      ["webR", "webR", "A version of R compiled to WebAssembly that runs in a web browser."],
    ],
    quiz: [
      { s: "What is the relationship between R and RStudio?", c: ["They are the same program", "R is the language/engine; RStudio is an IDE that makes using R easier", "RStudio is the language; R is the editor", "RStudio works without R"], d: 1, a: "R motor, RStudio gösterge paneli. RStudio R olmadan çalışmaz." },
      { s: "In what order should you install the software?", c: ["RStudio first, then R", "R first, then RStudio", "Only RStudio is needed", "The order doesn't matter and R is optional"], d: 1, a: "Önce R (motor), sonra RStudio." },
      { s: "Where should you write code you want to keep and rerun?", c: ["In the console", "In a script in the Source pane", "In the Help pane", "In the Environment pane"], d: 1, a: "Konsola yazılan kaybolur; betik kaydedilir ve yeniden çalıştırılır." },
      { s: "Which keyboard shortcut runs the current line or selection in RStudio?", c: ["Ctrl + S", "Ctrl + Enter", "Alt + F4", "Ctrl + Z"], d: 1, a: "Ctrl + Enter (Mac'te Cmd + Enter)." },
      { s: "Which shortcut inserts the assignment operator <- ?", c: ["Alt + −", "Ctrl + A", "Shift + =", "Ctrl + Shift + M"], d: 0, a: "Alt + − atama okunu yazar; Ctrl + Shift + M ise boru operatörünü." },
      { s: "Which function shows the current working directory?", c: ["setwd()", "getwd()", "dir.create()", "library()"], d: 1, a: "getwd() mevcut çalışma dizinini gösterir; setwd() değiştirir." },
      { s: "Why are RStudio projects recommended over setwd()?", c: ["They make code run faster", "They set the working directory automatically so relative paths work on any computer", "They install packages", "They are required by CRAN"], d: 1, a: "Proje klasörü çalışma dizini olur; göreli yollar taşınabilir kalır." },
      { s: "How often do you need to run install.packages(\"dplyr\") on your computer?", c: ["Every time you open RStudio", "Once (and again only to update)", "Before every line of code", "Never; packages come with R"], d: 1, a: "Kurulum bir kez; library(dplyr) ise her oturumda." },
      { s: "In R, a line starting with # is:", c: ["A command that deletes objects", "A comment that R ignores", "A package name", "An error"], d: 1, a: "# sonrası yorumdur, çalıştırılmaz." },
      { s: "In the Ecopolis app, code boxes on the same lesson page:", c: ["Each start a fresh R session", "Share one R session, so objects persist between boxes", "Cannot create objects", "Run Python, not R"], d: 1, a: "Sayfadaki kutular aynı oturumu paylaşır; RStudio'da betiği satır satır çalıştırmak gibi." },
    ],
  });
})();
