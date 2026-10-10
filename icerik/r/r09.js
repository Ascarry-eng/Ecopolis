// Araştırma Yöntemleri — 9. ders: Veri okuma ve yazma (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r09",
    dosyalar: { "ogrenci_anket.csv": "@ogrenciAnket" },
    hedefler: [
      "Çalışma dizini ve göreli dosya yollarıyla dosyaları bulmak",
      "CSV dosyalarını read.csv ile okumak; ayırıcı, ondalık ve kodlama ayarlarını yapmak",
      "Türk usulü CSV'leri (noktalı virgül, ondalık virgül) read.csv2 ile okumak",
      "Excel dosyalarını readxl ile okumak",
      "Veriyi write.csv ve saveRDS ile kaydetmek",
      "Okunan veride ilk temizlik kontrollerini yapmak: tipler, eksikler, tekrarlar, aralık dışı değerler",
    ],
    bolumler: [
      { baslik: "Dosya yolları", md: R`
R bir dosyayı okurken **çalışma dizinine** bakar (3. ders). İki tür yol vardır:

- **Mutlak yol:** \`"C:/Users/ali/Desktop/odev/anket.csv"\` — yalnız senin bilgisayarında çalışır.
- **Göreli yol:** \`"anket.csv"\` ya da \`"veri/anket.csv"\` — çalışma dizinine göre. RStudio projesiyle çalışırsan her bilgisayarda çalışır.

:::dikkat
Windows'ta dosya yollarında ters bölü (\\) kullanılır ama R'da ters bölü özel bir karakterdir. Yolları **düz bölüyle** yaz: \`"C:/Users/ali/veri.csv"\` (ya da çift ters bölüyle: \`"C:\\Users\\ali\\veri.csv"\`).
:::

Bu derste bir **sentetik** (gerçek kişilere ait olmayan, alıştırma için üretilmiş) öğrenci anketi kullanacağız. Dosya, uygulamanın R'ındaki sanal klasöre otomatik kondu:

${K}r
list.files()        # çalışma dizinindeki dosyalar
${K}
` },
      { baslik: "CSV okumak: read.csv", md: R`
**CSV (comma-separated values)**, en yaygın veri dosyası biçimidir: düz metin, her satır bir gözlem, değerler virgülle ayrılmış, ilk satır sütun adları.

${K}r
anket <- read.csv("ogrenci_anket.csv")
str(anket)
head(anket)
${K}

120 öğrenci, 9 değişken. Önemli argümanlar:

| Argüman | Ne yapar | Varsayılan |
|---|---|---|
| \`header\` | ilk satır sütun adı mı? | TRUE |
| \`sep\` | sütun ayırıcı | "," |
| \`dec\` | ondalık ayırıcı | "." |
| \`na.strings\` | eksik sayılacak değerler | "NA" |
| \`fileEncoding\` | karakter kodlaması | sistem |
| \`stringsAsFactors\` | metinleri faktöre çevir | FALSE |

Eksik değerler bu dosyada "NA" olarak yazılmış; read.csv onları otomatik tanır. Başka dosyalarda boş hücre, "-", "999" gibi kodlar olabilir: \`na.strings = c("", "-", "999")\`.

### Türk usulü CSV: read.csv2
Türkçe Excel'den kaydedilen CSV dosyalarında **ayırıcı noktalı virgül (;)**, **ondalık virgül (,)** olur — çünkü virgül zaten ondalık için kullanılıyor. Bunları okumak için **read.csv2** (ya da \`sep = ";", dec = ","\`):

${K}r salt
veri <- read.csv2("tuik_verisi.csv", fileEncoding = "UTF-8")
# eşdeğeri:
veri <- read.csv("tuik_verisi.csv", sep = ";", dec = ",", fileEncoding = "UTF-8")
${K}

Türkçe karakterler (ş, ğ, İ) bozuk görünüyorsa **kodlama** sorunudur: \`fileEncoding = "UTF-8"\` ya da eski Windows dosyaları için \`fileEncoding = "Windows-1254"\` dene.

Kendin dene — Türk usulü küçük bir dosya oluşturup okuyalım:

${K}r
writeLines(c("il;nufus;issizlik", "Ankara;5,8;9,4", "İzmir;4,5;10,1", "Bursa;3,2;7,9"), "iller.csv")
iller <- read.csv2("iller.csv")
str(iller)       # nufus ve issizlik sayı olarak geldi mi?
iller
${K}
` },
      { baslik: "Excel dosyaları ve diğer biçimler", md: R`
Excel dosyalarını (.xlsx, .xls) okumak için **readxl** paketi:

${K}r salt
library(readxl)
excel_sheets("veri.xlsx")                     # sayfa adları
veri <- read_excel("veri.xlsx", sheet = "2025", skip = 2)   # ilk 2 satırı atla
${K}

TÜİK ve TCMB'den indirilen Excel dosyaları çoğu zaman başlık satırları, birleştirilmiş hücreler ve dipnotlar içerir. \`skip\` (baştan atlanacak satır), \`range\` ("B3:F40" gibi hücre aralığı) ve \`n_max\` argümanları bunun için vardır. Bazen en hızlısı Excel'de gereksiz satırları silip temiz bir CSV kaydetmektir — ama bunu yaptıysan raporda belirt.

Diğer biçimler: **haven** paketi SPSS (.sav), Stata (.dta) ve SAS dosyalarını okur; **readr** paketi (\`read_csv\`) büyük CSV'leri hızlı okur ve tibble döndürür.
` },
      { baslik: "Veri yazmak", md: R`
İşlenmiş veriyi kaydetmek için:

${K}r
calisanlar <- anket[anket$calisiyor_mu == "Evet", ]
write.csv(calisanlar, "calisan_ogrenciler.csv", row.names = FALSE)
list.files()
${K}

- \`row.names = FALSE\`: satır numaralarını ayrı bir sütun olarak yazma (yazmazsan okurken fazladan bir "X" sütunu çıkar).
- Türk usulü kaydetmek için \`write.csv2()\` — Türkçe Excel'de çift tıklayınca düzgün açılır.
- R'a özgü **RDS** biçimi tipleri ve faktör düzeylerini de korur: \`saveRDS(anket, "anket.rds")\`, \`readRDS("anket.rds")\`.

:::ipucu
Ham veri dosyasının **üzerine asla yazma.** Ham veri bir klasörde kalsın; temizlenmiş veri ayrı bir dosyaya kaydedilsin; ikisini birbirine bağlayan şey senin R betiğindir. Böylece her adımı yeniden üretebilirsin.
:::
` },
      { baslik: "İlk temizlik kontrolleri", md: R`
Veriyi okuduktan sonra analize geçmeden önce şu soruları sor:

**1. Tipler doğru mu?**
${K}r
sapply(anket, class)
${K}
\`sinif\` sayı olarak gelmiş; ama aslında bir kategori (1–4). \`calisiyor_mu\` metin; faktöre çevirmek işimizi kolaylaştırır:

${K}r
anket$sinif <- factor(anket$sinif)
anket$calisiyor_mu <- factor(anket$calisiyor_mu, levels = c("Hayır", "Evet"))
str(anket)
${K}

**2. Eksik değerler nerede?**
${K}r
colSums(is.na(anket))           # her sütunda kaç NA
anket[!complete.cases(anket), ] # eksiği olan satırlar
${K}

**3. Değerler mantıklı aralıkta mı?**
${K}r
range(anket$not_ortalamasi)      # 0-4 arasında olmalı
range(anket$uyku_saati, na.rm = TRUE)
summary(anket$harclik)
${K}

**4. Tekrarlanan gözlem var mı?**
${K}r
sum(duplicated(anket$id))
${K}

**5. Kategoriler tutarlı mı?** ("İstanbul", "istanbul", "Istanbul" üç ayrı kategori sayılır!)
${K}r
table(anket$sehir)
table(anket$cinsiyet)
${K}

Bu sentetik veride 3 öğrencinin uyku, 3 öğrencinin harçlık bilgisi eksik; başka bir sorun yok. Gerçek verilerde bu kontroller neredeyse her zaman bir şey yakalar.
` },
    ],
    ozet: [
      "Göreli yollar çalışma dizinine göredir ve taşınabilirdir; Windows'ta bile düz bölü (/) kullan.",
      "read.csv: header, sep, dec, na.strings, fileEncoding argümanları. Türk usulü (; ve ondalık virgül) için read.csv2.",
      "Excel için readxl::read_excel (sheet, skip, range); SPSS/Stata için haven.",
      "write.csv(…, row.names = FALSE), write.csv2, saveRDS/readRDS. Ham verinin üzerine yazma.",
      "İlk kontroller: tipler (sapply(veri, class)), eksikler (colSums(is.na())), aralıklar (range, summary), tekrarlar (duplicated), kategori tutarlılığı (table).",
    ],
    terimler: [
      ["CSV (comma-separated values)", "CSV (virgülle ayrılmış değerler)", "A plain-text file format where values are separated by a delimiter, usually a comma."],
      ["delimiter / separator", "ayırıcı", "The character that separates values in a text file (comma, semicolon, tab)."],
      ["decimal separator", "ondalık ayırıcı", "The character used for decimals: a point in R, a comma in Turkish Excel."],
      ["header", "başlık satırı", "The first row of a file containing variable names."],
      ["absolute path", "mutlak yol", "A full file path from the root of the file system."],
      ["relative path", "göreli yol", "A file path relative to the working directory."],
      ["character encoding", "karakter kodlaması", "The scheme for representing characters as bytes, e.g., UTF-8 or Windows-1254."],
      ["read.csv2()", "read.csv2()", "Reads CSV files with semicolon separators and decimal commas."],
      ["RDS file", "RDS dosyası", "R's native format for saving a single object with all its attributes."],
      ["data cleaning", "veri temizleme", "Detecting and correcting errors, inconsistencies and missing values in data."],
      ["complete.cases()", "complete.cases()", "Returns TRUE for rows with no missing values."],
      ["duplicated()", "duplicated()", "Identifies repeated values or rows."],
      ["synthetic data", "sentetik veri", "Artificially generated data that mimics the structure of real data."],
    ],
    quiz: [
      { s: "Which file path will work on any computer that opens the RStudio project?", c: ["\"C:/Users/ali/odev/anket.csv\"", "\"anket.csv\" (relative path)", "\"C:\\Users\\ali\\anket.csv\"", "\"~/Desktop/anket.csv\""], d: 1, a: "Göreli yol çalışma dizinine (proje klasörüne) göredir." },
      { s: "A CSV exported from Turkish Excel uses ';' as separator and ',' as decimal mark. Which function reads it correctly?", c: ["read.csv()", "read.csv2()", "readRDS()", "read_excel()"], d: 1, a: "read.csv2 noktalı virgül ayırıcı ve ondalık virgül varsayar." },
      { s: "Turkish characters appear garbled after reading a file. You should first try:", c: ["Deleting the characters", "Setting fileEncoding = \"UTF-8\" (or \"Windows-1254\")", "Using read.csv2", "Converting to numeric"], d: 1, a: "Bozuk karakterler kodlama sorunudur." },
      { s: "In a file, missing values are coded as '-'. How do you tell read.csv?", c: ["na.rm = TRUE", "na.strings = \"-\"", "sep = \"-\"", "missing = \"-\""], d: 1, a: "na.strings, eksik sayılacak değerleri belirtir." },
      { s: "Why use `row.names = FALSE` in write.csv?", c: ["To delete the data", "To avoid writing row numbers as an extra column", "To make the file smaller only", "To encode Turkish characters"], d: 1, a: "Yazılmazsa okurken fazladan bir sütun çıkar." },
      { s: "Which code counts missing values in every column of `veri`?", c: ["sum(veri)", "colSums(is.na(veri))", "is.na(veri)", "na.omit(veri)"], d: 1, a: "is.na mantıksal tablo verir; colSums her sütunu toplar." },
      { s: "Which package reads .xlsx files?", c: ["dplyr", "readxl", "ggplot2", "haven"], d: 1, a: "readxl::read_excel; haven SPSS/Stata içindir." },
      { s: "The best practice regarding raw data files is:", c: ["Overwrite them after cleaning", "Never overwrite them; save cleaned data separately and keep the script that links them", "Delete them after reading", "Edit them manually in Excel without notes"], d: 1, a: "Ham veri korunur; temizleme betikle yapılır ve tekrarlanabilir kalır." },
      { s: "`sum(duplicated(veri$id))` returns 3. This means:", c: ["There are 3 missing ids", "3 ids appear more than once (repeated observations)", "There are 3 observations", "The data are clean"], d: 1, a: "duplicated() tekrar eden değerleri işaretler." },
      { s: "The categories 'İstanbul', 'istanbul' and 'Istanbul' in a variable will be treated by R as:", c: ["One category", "Three different categories", "Missing values", "Numbers"], d: 1, a: "R büyük–küçük harfe ve karakterlere duyarlıdır; temizlemek gerekir." },
    ],
    alistirmalar: [
      { soru: R`**ogrenci_anket.csv** dosyasını oku ve **anket** nesnesine ata. Kaç gözlem olduğunu **n** nesnesine yaz.`, baslangic: "anket <- \nn <- ", kontrol: "exists('anket') && is.data.frame(anket) && exists('n') && n == 120", ipucu: R`\`read.csv("ogrenci_anket.csv")\` ve \`nrow(anket)\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\nn <- nrow(anket)\nn" },
      { soru: R`Ankette **hiç eksik değeri olmayan** öğrencilerin sayısını **tam** nesnesine yaz.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\ntam <- ", kontrol: "exists('tam') && tam == sum(complete.cases(read.csv('ogrenci_anket.csv')))", ipucu: R`\`sum(complete.cases(anket))\``, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\ntam <- sum(complete.cases(anket))\ntam", tebrik: "6 öğrencinin bir eksiği var; 114'ü tam." },
      { soru: R`Yarı zamanlı çalışan öğrencileri (calisiyor_mu == "Evet") seçip **calisanlar.csv** adıyla, satır numarası olmadan kaydet.`, baslangic: "anket <- read.csv(\"ogrenci_anket.csv\")\n", kontrol: "file.exists('calisanlar.csv') && nrow(read.csv('calisanlar.csv')) == sum(read.csv('ogrenci_anket.csv')$calisiyor_mu == 'Evet') && !('X' %in% names(read.csv('calisanlar.csv')))", ipucu: R`Önce alt küme: \`anket[anket$calisiyor_mu == "Evet", ]\`, sonra \`write.csv(…, "calisanlar.csv", row.names = FALSE)\`.`, cozum: "anket <- read.csv(\"ogrenci_anket.csv\")\ncalisanlar <- anket[anket$calisiyor_mu == \"Evet\", ]\nwrite.csv(calisanlar, \"calisanlar.csv\", row.names = FALSE)\nlist.files()" },
      { soru: R`Aşağıdaki Türk usulü dosyayı doğru oku: sayılar gerçekten **sayı** olarak gelsin. Sonucu **fiyatlar** nesnesine ata.`, baslangic: "writeLines(c(\"urun;fiyat\", \"simit;17,5\", \"çay;12,25\", \"ayran;20\"), \"fiyat.csv\")\nfiyatlar <- ", kontrol: "exists('fiyatlar') && is.numeric(fiyatlar$fiyat) && isTRUE(all.equal(fiyatlar$fiyat, c(17.5, 12.25, 20)))", ipucu: R`\`read.csv2("fiyat.csv")\``, cozum: "writeLines(c(\"urun;fiyat\", \"simit;17,5\", \"çay;12,25\", \"ayran;20\"), \"fiyat.csv\")\nfiyatlar <- read.csv2(\"fiyat.csv\")\nstr(fiyatlar)" },
    ],
  });
})();
