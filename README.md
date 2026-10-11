# 像素算算樂 Pixel Math Coloring

把 pixel art 變成數學塗色遊戲紙：每一格都是一道算式，算出答案、依色票塗色，就會出現隱藏圖案。適合國小一到六年級，可直接列印。

**線上使用：** https://yhlhenry.github.io/pixel-math-gallery/

![像素算算樂](og-image.png)

## 怎麼用

1. 從「內建圖庫」挑一張圖（貓咪、恐龍、交通工具……），或上傳自己的 pixel art（PNG / JPG / WebP）。
2. 選擇配色方式（原圖代表色或電阻色碼）、年級難度和算式類型。
3. 按「生成算式塗色遊戲」。
4. 按「列印遊戲紙」發給學生，「列印答案」自己留著對答案。

列印時「邊界」選預設、「縮放」選 100%，作答格會撐滿整張 A4。

## 線上玩（不用印）

[`play.html`](https://yhlhenry.github.io/pixel-math-gallery/play.html)：點一格、算出答案、按數字，答對就自動塗上顏色，全部算完就出現圖案。電腦、手機、平板都能玩，電腦可以直接用鍵盤打數字。

- 從 `play.html` 直接挑圖庫的圖和年級開始玩；或在產生器生成後按「線上玩這一題」，連自己上傳的圖都能玩（最多 32 × 32 格）。
- 題目放在網址裡：把連結分享出去，每個人拿到的題目都一樣，適合老師丟到班級群組。
- 和列印版是同一套出題程式，同一個題目編號在兩邊的題目完全相同。
- 進度自動存在瀏覽器裡，下次打開接著玩。計時預設關閉，可以在設定裡打開。

## 功能

- **一到六年級難度**：一、二年級是 10／20 以內加減；三年級加入乘除和兩位數；四年級練運算順序；五年級是較大的數字和兩步驟算式；六年級有括號。
- **算式寫在格子裡**：寬度 20 格以內的圖，算式直接印在格子中；更大的圖改用依列分區的座標題目表。
- **自動判斷像素格**：放大過的 pixel art（例如 37×40 的圖存成 12 倍大）會還原成原本的格數；一般大圖會依「最大格數」自動縮小。
- **題目編號**：每份遊戲紙都會印上題目編號。同一張圖、同樣的設定，輸入同一個編號就能重出一模一樣的題目。
- **隱私**：圖片只在瀏覽器裡處理，不會上傳到任何伺服器。

## 技術說明

`index.html`（產生器與列印）和 `play.html`（線上玩）共用 `shared.js`（圖庫、出題程式、題目連結的編碼）。沒有建置步驟，也沒有相依套件（只從 Google Fonts 載入字型），直接用瀏覽器開啟就能使用。

需要支援 CSS container queries 的瀏覽器：Chrome / Edge 105+、Safari 16+、Firefox 110+。

### 部署到 GitHub Pages

1. 把這個資料夾 push 到 GitHub repo。
2. 到 repo 的 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main`、資料夾選 `/ (root)`。
3. 幾分鐘後就能在 `https://<帳號>.github.io/<repo 名稱>/` 使用。

如果帳號或 repo 名稱不是 `yhlhenry/pixel-math-gallery`，記得修改 `index.html` 裡 `og:url`、`og:image` 的網址，以及本檔案最上面的連結。

## 作者與版權

- 作者：亨利羊 Henry Yang（[henryyang.tw](https://henryyang.tw/) · [@yhlhenry](https://github.com/yhlhenry)）
- 內建圖庫的 pixel art 為本專案原創。
- © 2026 亨利羊 Henry Yang. All rights reserved.
