// Colander 11e — 20. bölüm: Game Theory, Strategic Decision Making, and Behavioral Economics (anlatım özgündür)
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "m20",
    hedefler: [
      "Bir oyunun öğelerini (oyuncular, stratejiler, ödemeler) tanımlamak ve ödemeler matrisi kurmak",
      "Baskın stratejiyi ve Nash dengesini bulmak; mahkûm ikilemini çözümlemek",
      "Sıralı oyunları karar ağacı ve geriye doğru çözümle analiz etmek; inandırıcı tehdidi açıklamak",
      "Tekrarlı oyunlarda işbirliğinin nasıl sürebildiğini (kısasa kısas) açıklamak",
      "Davranışsal oyun teorisinin bulgularını (ültimatom ve diktatör oyunları) yorumlamak",
    ],
    bolumler: [
      { baslik: "Oyun teorisinin dili", md: R`
Oligopolde (15. bölüm) gördük: kararın sonucu rakibin kararına bağlıysa, karar **stratejik** hâle gelir. Bunu inceleyen araç **oyun teorisidir**.

:::tanim Game theory
The application of economic principles to interdependent situations.
:::

Her oyunun üç öğesi vardır:

- **Oyuncular (players):** karar verenler (firmalar, ülkeler, bireyler),
- **Stratejiler (strategies):** her oyuncunun seçebileceği eylemler,
- **Ödemeler (payoffs):** her strateji bileşiminin her oyuncu için sonucu (kâr, fayda, hapis yılı).

İki oyunculu, iki stratejili bir oyun **ödemeler matrisiyle (payoff matrix)** gösterilir: her hücrede önce satır oyuncusunun, sonra sütun oyuncusunun ödemesi yazılır.

Oyun teorisi, John von Neumann ve Oskar Morgenstern'in 1944 tarihli kitabıyla doğdu; John Nash'in denge kavramı (1950) onu iktisadın merkezine taşıdı. Nash'in hayatı *Akıl Oyunları* (A Beautiful Mind) filmine konu oldu.
` },
      { baslik: "Mahkûm ikilemi, baskın strateji ve Nash dengesi", md: R`
İki şüpheli ayrı odalarda sorgulanıyor. İkisi de susarsa birer yıl yatarlar; ikisi de itiraf ederse beşer yıl; biri itiraf edip öbürü susarsa itiraf eden serbest kalır, susan on yıl yatar.

:::tanim Dominant strategy
A strategy that is preferred by a player regardless of the opponent's move.
:::

Kendi açından düşün: ortağın susarsa, itiraf etmek seni serbest bırakır (1 yıl yerine 0). Ortağın itiraf ederse, itiraf etmek seni 10 yıl yerine 5 yıla indirir. Ortağın ne yaparsa yapsın **itiraf etmek daha iyidir** — baskın strateji. Ortağın da aynı şekilde düşünür. Sonuç: ikiniz de itiraf eder, beşer yıl yatarsınız — ikinizin de sustuğu durumdan (birer yıl) çok daha kötü.

:::tanim Nash equilibrium
A set of strategies for each player in a game in which no player can improve his or her payoff by changing strategy unilaterally.
:::

"İkisi de itiraf" bir **Nash dengesidir**: rakibin stratejisi verildiğinde kimse tek başına stratejisini değiştirerek daha iyi olamaz.

{{oyun-matrisi|{"oyun":"mahkum"}}}

Görselde başka oyunları da dene:
- **Koordinasyon oyununda** iki Nash dengesi vardır; hangisine varılacağını gelenek, beklenti ya da iletişim belirler (trafiğin sağdan mı soldan mı akacağı, hangi teknoloji standardının seçileceği).
- **Korkak (chicken) oyununda** da iki denge vardır ama ikisinde de biri "kaybeder"; tehditlerin ve inandırıcılığın önemi buradan gelir.

:::ipucu
Nash dengesini bulmanın pratik yolu: her oyuncu için, rakibin her stratejisine karşı **en iyi cevabın** altını çiz. İki oyuncunun da altı çizili olduğu hücre Nash dengesidir.
:::

:::dikkat
Nash dengesi "en iyi sonuç" demek değildir. Mahkûm ikileminde denge, iki oyuncu için de daha iyi olan bir sonuçtan kötüdür. Bireysel akılcılık kolektif akılsızlığa yol açabilir: kartellerin çöküşü, silahlanma yarışı, ortak kaynakların aşırı kullanımı, iklim müzakereleri.
:::
` },
      { baslik: "Sıralı oyunlar ve inandırıcı tehditler", md: R`
Bazı oyunlarda oyuncular aynı anda değil **sırayla** hamle yapar: önce biri, sonra öbürü (onun hamlesini görerek). Bunlar **karar ağacıyla** gösterilir ve **geriye doğru çıkarımla (backward induction)** çözülür: son hamleden başlayıp her düğümde o oyuncunun en iyi seçimini bul, oradan geriye doğru ilerle.

:::ornek Piyasaya giriş oyunu
Bir piyasada tekel olarak çalışan Firma A var. Firma B girmeyi düşünüyor. B girerse A ya **fiyat savaşı** başlatır (A: 2, B: −1) ya da **uyum sağlar** (A: 5, B: 3). B girmezse A tekel kârını korur (A: 10, B: 0). A, "girersen fiyat savaşı başlatırım" diye tehdit ediyor. B girmeli mi?
---cozum---
Geriye doğru çöz. B girdiyse A'nın seçimi: fiyat savaşı 2, uyum 5 → A **uyum sağlar**. Demek ki "fiyat savaşı" tehdidi **inandırıcı değildir**: B girdikten sonra A'nın onu uygulamak işine gelmez.

Bunu bilen B şunu karşılaştırır: girerse 3 (A uyum sağlayacak), girmezse 0 → **B girer**. Sonuç: B girer, A uyum sağlar (A: 5, B: 3).

A'nın tehdidi ancak kendini önceden bağlarsa (ör. büyük atıl kapasite kurarak fiyat savaşını ucuzlatırsa) inandırıcı olur.
:::

:::tanim Credible threat
A threat that a player would actually find it in its interest to carry out if the situation arose.
:::

Sıralı oyunlarda bazen **ilk hamle avantajı (first-mover advantage)** vardır: önce davranan, öbürünü bir oldubittiyle karşı karşıya bırakır. Bazen de ikinci olmak avantajlıdır: rakibin hatalarından öğrenirsin.
` },
      { baslik: "Tekrarlı oyunlar: işbirliği nasıl sürer?", md: R`
Mahkûm ikilemi bir kez oynanırsa hile baskındır. Ama aynı oyuncular oyunu **tekrar tekrar** oynuyorsa durum değişir: bugünkü hile, yarın cezalandırılabilir. Geleceğin gölgesi işbirliğini mümkün kılar.

1980'de siyaset bilimci **Robert Axelrod**, tekrarlı mahkûm ikilemi için bilgisayar turnuvaları düzenledi; dünyanın dört bir yanından araştırmacılar strateji gönderdi. Kazanan, en basitlerden biriydi: **kısasa kısas (tit-for-tat)** — ilk turda işbirliği yap, sonra rakibin bir önceki hamlesini tekrarla.

Kısasa kısasın başarısının sırrı dört özelliktir:
- **İyi niyetli:** ilk hile yapan olmaz,
- **Cezalandırıcı:** hileye hemen karşılık verir,
- **Affedici:** rakip işbirliğine dönünce o da döner,
- **Anlaşılır:** rakip onun nasıl davranacağını kolayca öğrenir.

Kendin dene:

{{tekrarli-oyun}}

:::gercek
Tekrarlı oyun mantığı gerçek dünyada her yerdedir: mahalle esnafının müşterisini kandırmaması (tekrar gelecek), firmaların tedarikçileriyle uzun dönemli ilişkileri, e-ticaret sitelerindeki satıcı puanları (itibar, gelecekteki satışları belirler) ve kartellerin bazen neden ayakta kalabildiği (hile yapanı cezalandırma tehdidi).
:::

### Karma stratejiler
Bazı oyunlarda saf stratejilerde denge yoktur: penaltıda kaleci hep sağa atlarsa atıcı hep sola atar. Oyuncular hamlelerini **tahmin edilemez** kılmak için rastgele seçer: buna **karma strateji** denir. Nash, her sonlu oyunda (karma stratejilere izin verilirse) en az bir dengenin var olduğunu kanıtladı.
` },
      { baslik: "Davranışsal oyun teorisi", md: R`
Geleneksel oyun teorisi oyuncuların **tamamen bencil ve akılcı** olduğunu varsayar. Laboratuvar deneyleri ise insanların böyle davranmadığını gösterir.

:::tanim Ultimatum game
A game in which one player proposes how to divide a sum of money and the other player either accepts the division or rejects it, in which case both get nothing.
:::

**Ültimatom oyunu:** A, 100 TL'yi B ile nasıl paylaşacağını önerir. B kabul ederse öneri uygulanır; reddederse ikisi de hiçbir şey almaz.

- **Geleneksel tahmin:** B, 1 TL bile olsa kabul etmeli (hiç yoktan iyidir). Bunu bilen A en düşük miktarı önerir.
- **Deneylerdeki gerçek davranış:** önerenlerin çoğu %40–50 civarında teklif eder; %20'nin altındaki teklifler sıklıkla **reddedilir**. Alıcılar, kendi zararlarına olsa bile adaletsiz bulduklarını cezalandırır.

{{ultimatom}}

**Diktatör oyunu**nda B'nin reddetme hakkı bile yoktur; A ne isterse o olur. Yine de birçok kişi pozitif bir pay verir — salt stratejik değil, gerçek bir adalet ya da cömertlik duygusu.

Bu bulgular Colander'ın sonraki bölümde işleyeceği **aydınlanmış öz çıkar (enlightened self-interest)** fikrinin temelidir: insanlar kendi çıkarlarını gözetir, ama adalete, karşılıklılığa ve başkalarının iyiliğine de değer verir. Bu, modelleri çöpe atmayı değil, onları zenginleştirmeyi gerektirir.

:::ipucu
Oyun teorisi Colander'da "resmî" (formal) ve "gayriresmî" (informal) olarak iki biçimde kullanılır: resmî oyun teorisi matematiksel modeller kurar; gayriresmî oyun teorisi ise gerçek dünyadaki stratejik durumları — bir pazarlığı, bir fiyat savaşını, bir siyasi müzakereyi — oyun teorisinin kavramlarıyla düşünmektir. Sınavlar genellikle ikincisini sorar: "Bu durumda baskın strateji var mı? Tehdit inandırıcı mı?"
:::
` },
    ],
    ozet: [
      "Oyun: oyuncular, stratejiler, ödemeler. İki oyunculu oyunlar ödemeler matrisiyle gösterilir.",
      "Baskın strateji: rakip ne yaparsa yapsın en iyi olan strateji. Nash dengesi: kimsenin tek başına sapmak istemediği strateji bileşimi.",
      "Mahkûm ikileminde Nash dengesi iki oyuncu için de işbirliğinden kötüdür; kartel, silahlanma, ortak kaynaklar.",
      "Sıralı oyunlar karar ağacı ve geriye doğru çıkarımla çözülür; tehdit ancak uygulamak işe gelecekse inandırıcıdır.",
      "Tekrarlı oyunlarda gelecekteki cezalandırma işbirliğini sürdürebilir; kısasa kısas başarılı bir stratejidir.",
      "Ültimatom ve diktatör oyunları insanların adalete değer verdiğini gösterir: aydınlanmış öz çıkar.",
    ],
    terimler: [
      ["game theory", "oyun teorisi", "The application of economic principles to interdependent situations."],
      ["players", "oyuncular", "The decision makers in a game."],
      ["strategy", "strateji", "A plan of action specifying what a player will do in each situation."],
      ["payoff matrix", "ödemeler matrisi", "A table showing the outcome of every choice by every player, given the possible choices of all other players."],
      ["prisoner's dilemma", "mahkûm ikilemi", "A game in which individually rational choices lead to an outcome that is worse for all players than cooperation."],
      ["dominant strategy", "baskın strateji", "A strategy that is preferred by a player regardless of the opponent's move."],
      ["Nash equilibrium", "Nash dengesi", "A set of strategies in which no player can improve his or her payoff by changing strategy unilaterally."],
      ["sequential game", "sıralı oyun", "A game in which players make decisions one after another, so one player responds to the other's move."],
      ["decision tree", "karar ağacı", "A visual representation of a sequential game."],
      ["backward induction", "geriye doğru çıkarım", "Solving a sequential game by starting at the last move and working backward."],
      ["credible threat", "inandırıcı tehdit", "A threat that a player would actually find it in its interest to carry out."],
      ["first-mover advantage", "ilk hamle avantajı", "The advantage gained by the player who moves first in a sequential game."],
      ["repeated game", "tekrarlı oyun", "A game played over and over by the same players."],
      ["tit-for-tat", "kısasa kısas", "Cooperate in the first round, then do whatever the opponent did in the previous round."],
      ["mixed strategy", "karma strateji", "Choosing among strategies randomly according to probabilities."],
      ["ultimatum game", "ültimatom oyunu", "One player proposes a division of money; the other accepts it or rejects it, in which case both get nothing."],
      ["dictator game", "diktatör oyunu", "One player decides how to divide a sum of money; the other has no choice but to accept."],
    ],
    quiz: [
      { s: "A strategy that is best for a player no matter what the other player does is a:", c: ["Nash equilibrium", "Dominant strategy", "Mixed strategy", "Credible threat"], d: 1, a: "Baskın strateji rakibin hamlesinden bağımsız olarak en iyisidir." },
      { s: "A Nash equilibrium is a situation in which:", c: ["Both players get the highest possible payoff", "No player can do better by changing strategy unilaterally", "Players cooperate", "One player always wins"], d: 1, a: "Rakibin stratejisi verildiğinde kimse tek başına sapmak istemez; en iyi sonuç olmak zorunda değildir." },
      { s: "In the classic prisoner's dilemma, the Nash equilibrium is:", c: ["Both stay silent", "Both confess", "One confesses, one stays silent", "There is no equilibrium"], d: 1, a: "İtiraf baskın strateji; ikisi de itiraf eder ve ikisi de susmaktan kötü sonuç alır." },
      { s: "The prisoner's dilemma illustrates that:", c: ["Individual rationality always leads to the best group outcome", "Individually rational decisions can lead to an outcome worse for everyone", "Cooperation is always the dominant strategy", "Games always have two equilibria"], d: 1, a: "Bireysel akılcılık kolektif olarak kötü bir sonuca götürebilir." },
      { s: "A coordination game (e.g., choosing a technology standard) typically has:", c: ["No Nash equilibrium", "One Nash equilibrium", "Two (or more) Nash equilibria", "Only a mixed-strategy equilibrium"], d: 2, a: "Herkes aynı standardı seçerse iyi; iki 'aynı seçim' hücresi de dengedir." },
      { s: "Sequential games are solved by:", c: ["Forward induction", "Backward induction", "Random choice", "Taking the average payoff"], d: 1, a: "Son hamleden başlayıp geriye doğru her oyuncunun en iyi seçimini bulursun." },
      { s: "An incumbent threatens a price war if a rival enters. After entry, a price war gives the incumbent 2 and accommodation gives 5. The threat is:", c: ["Credible", "Not credible", "A dominant strategy", "A Nash equilibrium in all cases"], d: 1, a: "Giriş olduktan sonra uyum (5) fiyat savaşından (2) iyi; tehdit uygulanmaz, inandırıcı değildir." },
      { s: "In Axelrod's tournaments of the repeated prisoner's dilemma, one of the most successful strategies was:", c: ["Always cheat", "Always cooperate", "Tit-for-tat", "Random"], d: 2, a: "Kısasa kısas: iyi niyetli, cezalandırıcı, affedici ve anlaşılır." },
      { s: "Repetition can sustain cooperation in a prisoner's dilemma because:", c: ["Players forget past moves", "Cheating today can be punished in the future", "Payoffs become equal", "There are no dominant strategies"], d: 1, a: "Geleceğin gölgesi: bugünkü hile yarın cezalandırılabilir." },
      { s: "Standard game theory predicts that in the ultimatum game the responder will:", c: ["Reject any offer below 50%", "Accept any positive offer", "Always reject", "Ask for more"], d: 1, a: "Bencil ve akılcı bir alıcı için hiç yoktan iyidir; 1 TL bile kabul edilmeli." },
      { s: "In laboratory ultimatum games, low offers (e.g., below 20%) are often rejected. This suggests that people:", c: ["Are irrational and should be ignored", "Care about fairness and are willing to punish unfairness at a cost to themselves", "Do not understand money", "Always maximize monetary payoff"], d: 1, a: "Adaletsizliği kendi zararlarına cezalandırırlar: aydınlanmış öz çıkar." },
      { s: "In a game with no pure-strategy equilibrium, such as penalty kicks, players tend to:", c: ["Always choose the same action", "Use mixed strategies, randomizing their actions", "Cooperate", "Refuse to play"], d: 1, a: "Tahmin edilemez olmak için hamleler rastgele seçilir: karma strateji." },
    ],
  });
})();
