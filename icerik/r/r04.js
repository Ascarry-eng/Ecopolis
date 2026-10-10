// Araştırma Yöntemleri — 4. ders: R ile ilk adımlar (anlatım özgündür)
(function () {
  const R = String.raw;
  const K = "```";
  ECO.icerikEkle({
    id: "r04",
    hedefler: [
      "R'ı hesap makinesi olarak kullanmak; işlem önceliğini bilmek",
      "Nesne oluşturmak, atama operatörünü kullanmak ve adlandırma kurallarına uymak",
      "İşlevleri argümanlarıyla (konumsal ve adlandırılmış) çağırmak",
      "Yardım almak ve hata mesajlarını okumak",
      "Okunabilir, yorumlu kod yazmak",
    ],
    bolumler: [
      { baslik: "R bir hesap makinesi", md: R`
R'a bir işlem yaz, sonucu döndürsün. Çalıştır'a bas:

${K}r
2 + 3
10 - 4 * 2      # önce çarpma
(10 - 4) * 2    # parantez önceliği değiştirir
7 / 2
2^10            # üs
17 %% 5         # mod: bölümden kalan
17 %/% 5        # tam sayı bölmesi
${K}

Çıktının başındaki **[1]**, o satırdaki ilk elemanın sırasını gösterir (birden çok eleman olduğunda işe yarar).

İşlem önceliği matematikteki gibidir: parantez → üs → çarpma/bölme → toplama/çıkarma. Şüphedeysen parantez kullan.

### Hazır matematik işlevleri
${K}r
sqrt(144)        # karekök
exp(1)           # e sayısı
log(100)         # DİKKAT: doğal logaritma (ln)
log10(100)       # 10 tabanlı logaritma
log(8, base = 2) # 2 tabanlı
round(3.14159, 2)
abs(-7)
${K}

:::dikkat
R'da **log() doğal logaritmadır** (matematikteki ln). 10 tabanlı logaritma için log10() kullan. Bu, Matematik dersindeki "hesap makinesinde log ile ln farklıdır" uyarısının R karşılığıdır.
:::

R ondalık ayırıcı olarak **nokta** kullanır: 3.5 yaz, 3,5 yazma (virgül argümanları ayırır).
` },
      { baslik: "Nesneler ve atama", md: R`
Hesap sonuçlarını bir **nesneye (object)** kaydedip sonra kullanırız. Atama operatörü **<-** (RStudio'da Alt + −):

${K}r
gelir <- 25000
gider <- 18500
tasarruf <- gelir - gider
tasarruf
tasarruf_orani <- tasarruf / gelir * 100
round(tasarruf_orani, 1)
${K}

Atama sonucu ekrana yazdırmaz; görmek için nesnenin adını yaz (ya da atamayı parantez içine al: \`(x <- 5)\`). \`=\` de atama yapar, ama R topluluğunda **<-** gelenektir; \`=\` işlev argümanlarında kullanılır.

### Adlandırma kuralları
- Harf ya da nokta ile başlamalı; harf, rakam, nokta ve alt çizgi içerebilir: \`not_ort\`, \`gelir2025\`, \`veri.son\`.
- Rakamla başlayamaz (\`2025gelir\` olmaz), boşluk ve tire içeremez (\`not ort\`, \`not-ort\` olmaz).
- **Büyük–küçük harfe duyarlıdır:** \`Gelir\` ile \`gelir\` iki ayrı nesnedir.
- Ayrılmış sözcükler (\`if\`, \`for\`, \`TRUE\`, \`function\`…) ad olarak kullanılamaz.
- İyi ad açıklayıcıdır: \`x\` yerine \`aylik_kira\`. Bu derste **snake_case** (küçük harf + alt çizgi) kullanacağız.

Türkçe karakterli adlar (\`öğrenci\`) teknik olarak çalışabilir ama farklı bilgisayarlarda kodlama sorunu çıkarabilir; kaçınmak en güvenlisi.

### Ortamı yönetmek
${K}r
ls()            # ortamdaki nesneleri listele
rm(gider)       # bir nesneyi sil
ls()
${K}

RStudio'da bu nesneleri sağ üstteki **Environment** panelinde de görürsün.
` },
      { baslik: "İşlevler ve argümanlar", md: R`
R'daki işlerin neredeyse hepsi **işlevlerle (function)** yapılır: \`işlev_adı(argüman1, argüman2, …)\`.

${K}r
round(123.4567)                # varsayılan: 0 ondalık
round(123.4567, digits = 2)    # adlandırılmış argüman
round(123.4567, 2)             # konumsal argüman (aynı sonuç)
round(digits = 1, x = 123.4567) # adlandırılınca sıra önemsiz
${K}

- **Konumsal (positional) argüman:** işlevin beklediği sırayla verilir.
- **Adlandırılmış (named) argüman:** \`ad = değer\` biçiminde verilir; sıra önemli değildir ve kod daha okunur olur.
- **Varsayılan (default) değer:** verilmezse kullanılan değer. \`round()\`'da \`digits = 0\`.

Bir işlevin argümanlarını görmek için \`args()\`:

${K}r
args(round)
args(seq)
seq(from = 0, to = 100, by = 25)
seq(1, 10, length.out = 4)
${K}

İşlevler iç içe kullanılabilir — içteki önce hesaplanır:

${K}r
sqrt(abs(-16))
round(sqrt(2), 3)
${K}
` },
      { baslik: "Yardım almak ve hata mesajlarını okumak", md: R`
### Yardım
RStudio'da:
- \`?mean\` ya da \`help(mean)\` — işlevin yardım sayfası (açıklama, argümanlar, örnekler).
- \`??regression\` — bir sözcüğü bütün yardım sayfalarında arar.
- \`example(mean)\` — yardım sayfasındaki örnekleri çalıştırır.
- Yardım sayfasının en altındaki **Examples** bölümü genellikle en faydalı kısımdır.

(Bu uygulamadaki webR'da yardım sayfaları sınırlıdır; gerçek RStudio'da tam çalışır.)

### Hata mesajları dostundur
Hata almak normaldir; önemli olan mesajı okumaktır. Aşağıdaki kodda bilerek bir hata var:

${K}r
fiyat <- 50
miktar <- 10
gelir <- Fiyat * miktar
${K}

R "object 'Fiyat' not found" der: \`Fiyat\` adında bir nesne yok, çünkü nesneyi küçük harfle (\`fiyat\`) oluşturduk. Uygulama sık hatalarda altına Türkçe bir ipucu da ekler. Kodu düzeltip yeniden çalıştır.

Sık hatalar:
| Mesaj | Anlamı |
|---|---|
| object 'x' not found | Böyle bir nesne yok (yazım? büyük harf? önce oluşturdun mu?) |
| could not find function "x" | İşlev yok (yazım? paket yüklü mü?) |
| unexpected symbol / unexpected ')' | Sözdizimi: eksik virgül, parantez ya da tırnak |
| non-numeric argument to binary operator | Metinle aritmetik yapmaya çalıştın |

Konsolda satır başında **+** görürsen R komutunun devamını bekliyor demektir (genellikle bir parantez ya da tırnak açık kalmıştır). **Esc** ile iptal et.

:::ipucu
Hata mesajını kopyalayıp Kâhin'e (ya da bir arama motoruna) yapıştırmak çoğu zaman en hızlı çözümdür. Kod kutularında hata alınca çıkan **"Kâhin'e sor: bu hata ne?"** düğmesi tam bunu yapar.
:::
` },
      { baslik: "Okunabilir kod", md: R`
Kodu bilgisayar için değil, **insan** için — altı ay sonraki kendin dahil — yazarsın.

${K}r
# Kötü
a<-1500;b<-0.08;c<-a*(1+b)^5;c

# İyi
anapara <- 1500       # TL
faiz <- 0.08          # yıllık
yil <- 5
gelecek_deger <- anapara * (1 + faiz)^yil
gelecek_deger
${K}

İlkeler:
- Operatörlerin etrafına **boşluk** koy (\`x <- y + 2\`), virgülden sonra boşluk bırak.
- Bir satıra bir iş.
- **Açıklayıcı adlar** ve gerektiğinde **yorum**: kodun *ne* yaptığını değil, *neden* yaptığını açıkla.
- Sihirli sayılar yerine adlandırılmış nesneler (\`0.08\` yerine \`faiz\`).

Matematik dersinin 5. haftasındaki bileşik faiz formülünü ($FV = P(1+r)^t$) R'da hesapladın — R, öğrendiğin formülleri hızlıca denemek için harika bir laboratuvardır.
` },
    ],
    ozet: [
      "R hesap makinesi gibi çalışır: + − * / ^ %% %/%; işlem önceliği matematikteki gibidir. log() doğal logaritmadır.",
      "Nesneye atama <- ile yapılır; adlar harfle başlar, büyük–küçük harfe duyarlıdır. ls() listeler, rm() siler.",
      "İşlevler argüman alır: konumsal ya da adlandırılmış; varsayılan değerler vardır. args() argümanları gösterir.",
      "Yardım: ?işlev, ??sözcük, example(). Hata mesajlarını oku: 'object not found', 'could not find function', 'unexpected …'.",
      "Okunabilir kod: boşluklar, açıklayıcı adlar, yorumlar, bir satıra bir iş.",
    ],
    terimler: [
      ["object", "nesne", "A named value stored in R's memory."],
      ["assignment operator", "atama operatörü", "The <- operator that stores a value in an object."],
      ["function", "işlev (fonksiyon)", "A reusable piece of code that takes arguments and returns a value."],
      ["argument", "argüman", "An input passed to a function."],
      ["default value", "varsayılan değer", "The value an argument takes if none is supplied."],
      ["named argument", "adlandırılmış argüman", "An argument passed as name = value."],
      ["positional argument", "konumsal argüman", "An argument matched by its position in the call."],
      ["modulo", "mod (kalan)", "The remainder after division; %% in R."],
      ["natural logarithm", "doğal logaritma", "Logarithm with base e; log() in R."],
      ["error message", "hata mesajı", "A message R prints when it cannot execute code."],
      ["case sensitive", "büyük–küçük harfe duyarlı", "Treating upper- and lower-case letters as different."],
      ["comment", "yorum", "Text after # that R ignores."],
    ],
    quiz: [
      { s: "What does `10 - 4 * 2` return in R?", c: ["12", "2", "16", "−8"], d: 1, a: "Önce çarpma: 4 × 2 = 8; 10 − 8 = 2." },
      { s: "What does `17 %% 5` return?", c: ["3.4", "3", "2", "85"], d: 2, a: "%% bölümden kalanı verir: 17 = 3 × 5 + 2." },
      { s: "In R, `log(100)` computes:", c: ["The base-10 logarithm (2)", "The natural logarithm (≈ 4.605)", "100²", "An error"], d: 1, a: "R'da log() doğal logaritmadır; 10 tabanı için log10()." },
      { s: "Which is a valid object name in R?", c: ["2025_gelir", "not ort", "not_ort", "if"], d: 2, a: "Rakamla başlayamaz, boşluk içeremez, ayrılmış sözcük olamaz." },
      { s: "After running `gelir <- 100`, which command produces the error 'object not found'?", c: ["gelir", "Gelir", "print(gelir)", "gelir + 1"], d: 1, a: "R büyük–küçük harfe duyarlı: Gelir ayrı bir ad ve tanımlı değil." },
      { s: "What does `round(123.4567, digits = 2)` return?", c: ["123", "123.46", "123.45", "120"], d: 1, a: "İki ondalığa yuvarlar: 123.46." },
      { s: "In `seq(from = 0, to = 100, by = 25)`, the arguments are passed:", c: ["Positionally", "By name", "As defaults", "As a vector"], d: 1, a: "ad = değer biçimi: adlandırılmış argümanlar." },
      { s: "Which function lists all objects in the current environment?", c: ["rm()", "ls()", "list()", "objects.delete()"], d: 1, a: "ls() listeler; rm() siler." },
      { s: "In the R console, a `+` at the start of a line means:", c: ["Addition will be performed", "R is waiting for the rest of an incomplete command", "An error occurred", "A package is loading"], d: 1, a: "Komut tamamlanmamış (açık parantez/tırnak). Esc ile iptal edilir." },
      { s: "What does `sqrt(abs(-16))` return?", c: ["−4", "4", "16", "An error"], d: 1, a: "İçteki önce: abs(−16) = 16, sonra sqrt(16) = 4." },
    ],
    alistirmalar: [
      { soru: R`Aylık harçlığın 9000 TL. Bunun %35'ini kiraya veriyorsun. **kira** adında bir nesne oluşturup kiraya giden tutarı hesapla.`, baslangic: "harclik <- 9000\nkira <- ", kontrol: "exists('kira') && isTRUE(all.equal(kira, 3150))", ipucu: R`Yüzde 35, ondalık olarak 0.35'tir: \`kira <- harclik * 0.35\``, cozum: "harclik <- 9000\nkira <- harclik * 0.35\nkira", tebrik: "3150 TL kiraya gidiyor." },
      { soru: R`5000 TL, yıllık %40 bileşik faizle 3 yıl bankada kalıyor. Gelecek değeri ($FV = P(1+r)^t$) hesaplayıp **fv** nesnesine ata ve **2 ondalığa yuvarla**.`, baslangic: "P <- 5000\nr <- 0.40\nt <- 3\nfv <- ", kontrol: "exists('fv') && isTRUE(all.equal(fv, 13720))", ipucu: R`\`round(P * (1 + r)^t, 2)\``, cozum: "P <- 5000\nr <- 0.40\nt <- 3\nfv <- round(P * (1 + r)^t, 2)\nfv", tebrik: "5000 × 1.4³ = 13720 TL." },
      { soru: R`$\ln(50)$ ve $\log_{10}(50)$ değerlerini hesapla; ikisinin oranını **oran** nesnesine ata. (Bu oran, ln 10 sayısına eşit çıkmalı — neden?)`, baslangic: "oran <- ", kontrol: "exists('oran') && abs(oran - log(10)) < 1e-9", ipucu: R`\`oran <- log(50) / log10(50)\`. Taban değiştirme kuralı: $\log_{10} x = \ln x / \ln 10$.`, cozum: "oran <- log(50) / log10(50)\noran", tebrik: "Taban değiştirme: ln x / log₁₀ x = ln 10 ≈ 2.3026." },
      { soru: R`Aşağıdaki kodda iki hata var. Düzelt ki **toplam_gelir** doğru hesaplansın (fiyat × miktar).`, baslangic: "fiyat <- 45\nMiktar <- 120\ntoplam_gelir <- fiyat * miktar\ntoplam gelir", kontrol: "exists('toplam_gelir') && toplam_gelir == 5400", ipucu: R`R büyük–küçük harfe duyarlıdır (Miktar ≠ miktar) ve nesne adlarında boşluk olamaz.`, cozum: "fiyat <- 45\nmiktar <- 120\ntoplam_gelir <- fiyat * miktar\ntoplam_gelir", tebrik: "Adlar tutarlı olunca 45 × 120 = 5400." },
    ],
  });
})();
