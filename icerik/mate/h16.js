// Mathematics I — ek konu: Matrisler
// Anlatımın çekirdeği Marjinal M-101 konu sayfasından (aynı yazar, MIT); hedefler, ek kesimler, görseller ve quiz Ecopolis için eklendi.
// Bu dosya araclar/mate_uret.js ile üretilir; elle düzenlediysen üreticiyi yeniden çalıştırmadan önce oraya da taşı.
(function () {
  const R = String.raw;
  ECO.icerikEkle({
    id: "h16",
    hedefler: [
      "Matris toplamı, çarpımı ve devriğini hesaplamak",
      "2×2 ve 3×3 determinant hesaplamak",
      "2×2 ters matrisi bulmak ve doğrusal sistemi Cramer kuralıyla çözmek",
      "Leontief girdi–çıktı modelini kurup çözmek",
    ],
    bolumler: [
      { baslik: "Matris nedir?", md: R`Matris, sayıların dikdörtgen tablosudur. Çok denklemli doğrusal sistemi tek satırda ($Ax = b$) yazmayı sağlar. İktisatta en bilinen kullanımı Leontief girdi–çıktı modelidir.` },
      { baslik: "İşlemler", md: R`- **Toplama:** aynı boyutta, eleman eleman.
- **Çarpım:** $(m\times n)(n\times p) = (m\times p)$, $(AB)_{ij} = \sum_k a_{ik}b_{kj}$. Genelde $AB \ne BA$.
- **Devrik:** $(A^T)_{ij} = a_{ji}$.` },
      { baslik: "Determinant", md: R`> $$\det\begin{bmatrix}a & b\\ c & d\end{bmatrix} = ad - bc$$

3×3 için birinci satıra göre açılım (işaretler + − +):

> $$\det A = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}$$

$M_{ij}$: $i$. satır ve $j$. sütun silinince kalan 2×2'nin determinantı. $\det A = 0$ ise matris tekildir: tersi yoktur, sistemin tek çözümü yoktur.` },
      { baslik: "Ters matris ve Cramer", md: R`> $$A^{-1} = \frac{1}{ad - bc}\begin{bmatrix}d & -b\\ -c & a\end{bmatrix},\qquad x = A^{-1}b$$

> $$\text{Cramer: } x_i = \frac{\det A_i}{\det A}$$

$A_i$: $A$'nın $i$. sütunu yerine $b$ yazılmış matris.` },
      { baslik: "Leontief modeli", md: R`$a_{ij}$: $j$ sektörünün 1 birimlik üretimi için $i$ sektöründen gereken girdi. Toplam üretim = ara kullanım + nihai talep:

> $$x = Ax + d \;\Rightarrow\; x = (I - A)^{-1}d$$

{{leontief}}` },
      { baslik: "Çözümlü örnek", md: R`:::ornek Çözümlü örnek
$2x + 3y = 8$, $x - y = -1$. $\det A = 2(-1) - 3(1) = -5$.

$x = \dfrac{8(-1) - 3(-1)}{-5} = \dfrac{-5}{-5} = 1$, $\quad y = \dfrac{2(-1) - 8(1)}{-5} = \dfrac{-10}{-5} = 2$.
:::

:::dikkat Sık yapılan hatalar
- Boyutları uyuşmayan matrisleri çarpmak.
- 3×3 açılımda ortadaki terimin eksi işaretini unutmak.
- $(AB)^{-1} = A^{-1}B^{-1}$ sanmak; doğrusu $B^{-1}A^{-1}$.
:::` },
    ],
    ozet: [
      "(m×n)(n×p) = (m×p); genelde AB ≠ BA.",
      "2×2 determinant ad − bc; 3×3 açılım işaretleri + − +. det = 0 ise tekil.",
      "A⁻¹ = (1/(ad − bc))[[d, −b], [−c, a]]; x = A⁻¹b; Cramer xᵢ = det Aᵢ/det A.",
      "Leontief: x = Ax + d ⇒ x = (I − A)⁻¹d.",
      "(AB)⁻¹ = B⁻¹A⁻¹.",
    ],
    terimler: [
      ["matrix","matris","A rectangular array of numbers."],
      ["determinant","determinant","A scalar computed from a square matrix; zero if the matrix is singular."],
      ["inverse matrix","ters matris","The matrix A⁻¹ such that AA⁻¹ = I."],
      ["transpose","devrik","The matrix obtained by swapping rows and columns."],
      ["identity matrix","birim matris","A square matrix with ones on the diagonal and zeros elsewhere."],
      ["singular","tekil","A square matrix with determinant zero; it has no inverse."],
      ["Cramer's rule","Cramer kuralı","Solving a linear system with ratios of determinants."],
      ["input–output model","girdi–çıktı modeli","Leontief's model of inter-industry flows: x = (I − A)⁻¹d."],
      ["rank","rank (kerte)","The maximum number of linearly independent rows or columns."],
    ],
    quiz: [
      {"s":"$\\det\\begin{bmatrix}2 & 3\\\\ 1 & -1\\end{bmatrix}$ equals:","c":["−5","5","1","−1"],"d":0,"a":"2(−1) − 3(1) = −5."},
      {"s":"Using Cramer's rule, the solution of $2x + 3y = 8$, $x - y = -1$ is:","c":["x = 1, y = 2","x = 2, y = 1","x = −1, y = 2","x = 1, y = −2"],"d":0,"a":"det = −5; x = (8·(−1) − 3·(−1))/(−5) = 1, y = (2·(−1) − 8·1)/(−5) = 2."},
      {"s":"If $\\det A = 0$, then A is:","c":["Invertible","Singular (no inverse)","The identity","Orthogonal"],"d":1,"a":"Determinant sıfırsa ters matris yoktur."},
      {"s":"$(AB)^{-1}$ equals:","c":["$A^{-1}B^{-1}$","$B^{-1}A^{-1}$","$AB$","$BA$"],"d":1,"a":"Sıra ters döner."},
      {"s":"A $2\\times 3$ matrix times a $3\\times 4$ matrix gives a matrix of size:","c":["3×3","2×4","4×2","Not defined"],"d":1,"a":"(m×n)(n×p) = (m×p)."},
      {"s":"The inverse of $\\begin{bmatrix}4 & 7\\\\ 2 & 6\\end{bmatrix}$ is:","c":["$\\dfrac{1}{10}\\begin{bmatrix}6 & -7\\\\ -2 & 4\\end{bmatrix}$","$\\dfrac{1}{10}\\begin{bmatrix}4 & 7\\\\ 2 & 6\\end{bmatrix}$","$\\begin{bmatrix}6 & -7\\\\ -2 & 4\\end{bmatrix}$","$\\dfrac{1}{38}\\begin{bmatrix}6 & 7\\\\ 2 & 4\\end{bmatrix}$"],"d":0,"a":"det = 24 − 14 = 10; köşegeni değiştir, diğerlerinin işaretini çevir."},
      {"s":"In the Leontief model, total output is:","c":["$x = Ad$","$x = (I - A)^{-1}d$","$x = A^{-1}d$","$x = d - A$"],"d":1,"a":"x = Ax + d → (I − A)x = d → x = (I − A)⁻¹d."},
      {"s":"The transpose of $\\begin{bmatrix}1 & 2\\\\ 3 & 4\\end{bmatrix}$ is:","c":["$\\begin{bmatrix}1 & 3\\\\ 2 & 4\\end{bmatrix}$","$\\begin{bmatrix}4 & 3\\\\ 2 & 1\\end{bmatrix}$","$\\begin{bmatrix}1 & 2\\\\ 3 & 4\\end{bmatrix}$","$\\begin{bmatrix}2 & 1\\\\ 4 & 3\\end{bmatrix}$"],"d":0,"a":"Satırlar sütun olur."},
      {"s":"For matrices in general:","c":["AB = BA always","AB ≠ BA in general","AB is never defined","A + B ≠ B + A"],"d":1,"a":"Matris çarpımı değişmeli değildir (toplama değişmelidir)."},
      {"s":"In a 3×3 cofactor expansion along the first row, the signs of the terms are:","c":["+ + +","+ − +","− + −","+ − −"],"d":1,"a":"İşaret düzeni (−1)^(i+j): birinci satırda + − +."},
    ],
  });
})();
