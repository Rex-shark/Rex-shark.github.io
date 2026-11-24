# Rex 的個人網站

Rex 的 GitHub Pages 個人網站，部署於 [rex-shark.github.io](https://rex-shark.github.io)。

## 關於

- **作者**：Rex — Java 全端工程師 ＆ 系統分析師
- **聯絡**：rexrex10050@gmail.com
- **設計風格**：首頁是撲克牌桌；原正式首頁 Finalist（白底 indigo/violet）保留為經典版，另有 23 種設計風格實驗收錄於「設計實驗室」

## 網站內容

- **首頁**（`/`）：撲克牌桌，手牌是自介卡與精選專案卡；點場上的卡看簡易介紹，再進完整介紹頁
- **經典版首頁**（`/classic`）：自我介紹、技能、精選專案、好文分享、聯絡（原本的正式首頁）
- **設計實驗室**（`/gallery`）：23 種設計風格的首頁實作
- **精選專案 showcase**（`/projects/<slug>`）：ThreadsBot、ai-chatroom、RPG Maker Character Forge、Drama 3 TTS 工作台、fishing-work、寶可夢牧場 Agent、VRM Chat Widget、codex-forge（私人專案，只有介紹頁）
- **規劃中**：`/blog` 技術文章（詳見 [spec/plan.md](spec/plan.md)）

## 技術

- **框架**：React 19 + Vite
- **樣式**：Tailwind CSS v4
- **UI 元件**：shadcn/ui
- **動畫**：Framer Motion
- **語言**：TypeScript
- **部署**：GitHub Pages（透過 GitHub Actions）

## 本地開發

```bash
npm install
npm run dev
```
