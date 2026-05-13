---
slug: claude-code-sourcemap
name: Claude Code 原始碼研究
tagline: 從 sourcemap 還原 Claude Code v2.1.88 並深度拆解架構與 prompt 設計
status: 進行中（持續整理筆記）
category: Research / AI Agent
github: https://github.com/Rex-shark/claude-code-sourcemap
demo: null
route: /projects/claude-code-sourcemap
positioning: 技術筆記 / 研究
---

# Claude Code 原始碼研究

> 此文件為 subagent 製作靜態介紹頁的權威資料來源。撰寫頁面時請以本檔內容為準，**不得自行編造數據或結論**。
> 標註 `（待補）` 的欄位請保留原樣或在頁面上顯示佔位提示。
>
> **重要定位**：這個專案**不是 Rex 開發的軟體產品**，而是 Rex 針對 Claude Code（Anthropic 官方產品）做的**還原 + 拆解 + 學習筆記**。頁面文案需明確避免讓人誤會成「Rex 寫了一個 AI Agent」。原始碼版權歸 Anthropic 所有，repo 與本頁面僅供研究用途。

---

## 一句話說明

從 `@anthropic-ai/claude-code@2.1.88` npm 套件附帶的 source map 還原 Claude Code 的 TypeScript 原始碼（4756 個檔案、1884 個 `.ts`/`.tsx`），並寫成 5 篇深度分析筆記，拆解其架構與 prompt 工程設計。

## 為什麼做這個

Claude Code 是 Anthropic 官方推出的 AI 程式設計助理，內部如何讓 LLM 穩定完成複雜工程任務？官方沒釋出 source code，但 npm 套件意外保留了 source map。透過提取 `cli.js.map` 的 `sourcesContent` 欄位，可以還原幾乎完整的 TypeScript 原始碼，是研究**業界頂尖 AI Agent 工程實作**的稀有機會。

對自己想做 AI Agent 系統（例如 Coordinator + Writer + Reviewer 多代理協作）的工程師來說，這是一份**直接可借鑑的範本**。

## 適合誰看

- 想做 **AI Agent 系統**、需要參考業界做法的後端工程師
- 想理解 **Prompt Engineering** 在生產級產品中如何組裝的人
- 對 **Claude Code** 內部運作好奇、想看「黑盒子內部」的開發者
- 想學 **多代理協作架構（Coordinator / Writer / Reviewer）** 的設計者

---

## 拆解了什麼

| 還原內容 | 數量 |
|---|---|
| 還原檔案總數 | 4756 個 |
| TypeScript / TSX 原始檔 | 1884 個 |
| 內建工具實作（Bash、FileEdit、Grep、MCP 等） | 30+ 個 |
| Slash command 實作（commit、review、config 等） | 40+ 個 |
| Anthropic 內建子代理（subagent） | 多個（含 verificationAgent、coordinator 等） |

**還原版本**：`@anthropic-ai/claude-code v2.1.88`
**還原方式**：`extract-sources.js` 提取 `cli.js.map` 的 `sourcesContent`
**已寫成的分析文件**：5 篇、共 ~3263 行

---

## 五篇分析筆記（頁面核心內容）

頁面的 Hero 之後應以「五篇分析筆記」為主軸，每篇一張卡片，含標題、副標、字數/長度、一段摘要、跳到原 repo 的連結。

### 1. 架構分析 — `architecture-analysis.md`（397 行）

**副標**：Claude Code 怎麼把 LLM 變成穩定的 AI 程式設計助理

**摘要**：拆解 Claude Code 的 6 層架構（CLI 入口 → 命令層 → Query Engine → 工具系統 → 服務層 / 工具函式層）。技術棧採用 Node.js ESM + TypeScript + Ink（Terminal React），單檔 bundle，僅 `@img/sharp` 為 optional native。

**重點章節**：
- 整體專案概覽（目錄結構）
- 六層架構分層圖
- 42 個工具目錄的職責劃分
- 86 個子命令的組織方式

**原文連結**：https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/architecture-analysis.md

### 2. Prompt 完整分析 — `prompts-analysis.md`（765 行）⭐ 最具參考價值

**副標**：System Prompt 14 個區塊的完整解構，含原文與繁中翻譯

**摘要**：Claude Code 每次對話組合一個結構化 System Prompt，分為 7 個靜態區塊（可快取）+ 7 個動態區塊。靜態包含角色介紹、系統行為、任務執行、謹慎行動、工具使用、語氣風格、輸出效率；動態則注入會話指引、CLAUDE.md 記憶、環境資訊、語言、輸出風格、MCP 指令、暫存目錄。

**重點章節**：
- System Prompt 的「快取邊界」設計（`__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__`）
- 角色介紹中的安全宣告
- 工具使用指引：何時用 Bash、Grep、Glob、Read
- Tone & Style 區塊如何約束 AI 的回應長度與格式

**對 prompt engineering 的見解**（subagent 寫頁面時可加上 Rex 觀察）：
- **靜態 / 動態切分**就是把可快取部分極大化，省 token
- **安全護欄**寫在 prompt 最前面（不是最後）
- **每個工具都有獨立的 prompt 指引**，不只是函式簽章
- **Tone & Style 用簡短條列**，而非長篇敘述

**原文連結**：https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/prompts-analysis.md

### 3. Slash Command Prompts — `command-prompts.md`（984 行）

**副標**：14 個 slash command 的完整提示詞集錄

**摘要**：詳列 `/init`、`/commit`、`/review`、`/ultrareview`、`/security-review`、`/pr-comments`、`/insights`、`/compact`、`/ultraplan`、`/statusline`、`/brief`、`/thinkback` 等指令的完整 prompt 內容與設計理由。是學習「**如何把工程流程編碼成 prompt**」的最佳範例集。

**重點章節**：
- `/init`：建立 CLAUDE.md 的引導式問答流程
- `/commit`：怎麼讓 LLM 寫出符合專案風格的 commit message
- `/ultrareview`：多代理協作的 code review 流程
- `/compact`：對話壓縮的觸發條件與摘要要求

**原文連結**：https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/command-prompts.md

### 4. Plan Mode Prompts — `plan-mode-prompts.md`（657 行）

**副標**：「Plan 模式」的多層 prompt 工作流拆解

**摘要**：Plan Mode 不是單一 prompt，而是由多層 prompt 在不同階段注入。包含 `EnterPlanMode` 工具觸發、5 階段工作流主體、迭代式訪談變體、Phase 4 A/B 測試、Plan Agent 子代理、`ExitPlanMode` 收尾，以及與 Auto Mode 的對照。

**重點章節**：
- 從觸發到結束的完整生命週期
- 為什麼要 5 階段（不是一次性丟整個計畫）
- 迭代式訪談與單次規劃的取捨

**原文連結**：https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/plan-mode-prompts.md

### 5. Subagent 學習指南 — `subagent-learning-guide.md`（460 行）⭐ 最實戰

**副標**：用 Claude Code 原始碼學打造「Writer + Reviewer」雙 Agent 系統

**摘要**：Claude Code 原始碼中的 `verificationAgent.ts`、`coordinatorMode.ts`、`generalPurposeAgent.ts` 提供了完整的多代理協作範本。本筆記示範如何直接借用：Coordinator 派工 → Writer 寫 code → Reviewer 唯讀審查並輸出 `VERDICT: PASS/FAIL/PARTIAL` → FAIL 則回傳給 Writer 重做。

**重點章節**：
- ⭐⭐⭐ `verificationAgent.ts`：Reviewer 的藍本（含「documented failure patterns」設計）
- ⭐⭐ `coordinatorMode.ts`：派工與結果整合
- ⭐ `generalPurposeAgent.ts`：可改造為 Writer Agent
- 結構化輸出（`VERDICT:` 關鍵字）作為自動化流程的協議

**對 prompt engineering 的見解**：
- **「明確列出 AI 會犯的錯」**比「請認真執行」有效
- **強制結構化輸出**才能讓 Coordinator 自動判斷下一步
- **唯讀 Reviewer** + **可寫 Writer** 的權限分離是關鍵設計

**原文連結**：https://github.com/Rex-shark/claude-code-sourcemap/blob/master/docs/subagent-learning-guide.md

---

## 對 Prompt Engineering 的整體見解（頁面尾段）

從這次拆解可以歸納幾個 Anthropic 在生產級 AI Agent 上的設計原則，這也是頁面**最有差異化**的內容（不只是「我把官方文件複製一遍」）：

1. **快取友善的 Prompt 切分**：靜態區塊放前面、動態區塊放後面，中間用明確邊界標記，最大化 prompt cache 命中率。
2. **安全護欄前置**：把「不該做什麼」寫在 prompt 開頭，而非附加在結尾，避免被後續上下文稀釋。
3. **每個工具獨立指引**：Bash / Read / Edit 都有專屬段落，不是只給函式簽章讓 AI 猜怎麼用。
4. **明確列出失敗模式**：例如 verificationAgent 寫了「你會避免做檢查」、「你會被前 80% 的成果迷惑」，比抽象的「請認真」有效。
5. **結構化輸出作為協議**：`VERDICT: PASS/FAIL` 不是給人看的，是給 Coordinator 解析的，這讓自動化工作流可行。
6. **權限分層**：Writer 可寫 / Reviewer 唯讀，把信任邊界寫進系統，而不只是寫進 prompt。
7. **語氣風格簡潔條列**：用條列規則約束 AI 回應風格，比長篇描述有效。

---

## 技術棧（用於頁面 badge）

| Tag | 說明 | 建議色 |
|---|---|---|
| TypeScript | 還原碼語言 | `#3178C6` |
| Node.js | Runtime | `#5FA04E` |
| Ink (React) | Terminal UI 框架 | `#61DAFB` |
| Source Map | 還原方式 | `#9333EA` |
| Research | 性質標籤 | `#F59E0B` |
| AI Agent | 主題 | `#6366F1` |

---

## 頁面結構建議

依 ThreadsBot showcase 為版型參考，但**內容分布**要呼應「研究筆記」性質，不要做成「我寫了什麼產品」：

1. **Sticky 頂部導覽**：返回 `/` + GitHub 連結
2. **Hero**：標題「Claude Code 原始碼研究」+ 副標 + 「非官方還原」的 disclaimer badge（黃底） + 一句話說明
3. **為什麼做這個 / 拆解了什麼**：用上方的還原數量表 + 短文
4. **五篇分析筆記**：每篇一張大卡，含標題、副標、字數、摘要、重點章節（最多 4 點）、原文連結（外部開新分頁）
5. **對 Prompt Engineering 的整體見解**：上方 7 點直接列出，可加 icon
6. **技術棧 badges**
7. **法律宣告區塊**（重要！）：明確標示
   - 此為非官方還原
   - 原始碼版權歸 Anthropic 所有
   - 僅供研究用途
   - 不可商業使用
8. **CTA**：去 GitHub repo 看完整還原碼

---

## 給 subagent 的注意事項

- **必加 disclaimer**：頁面 Hero 與 Footer 都要清楚標示「非官方還原 · 版權歸 Anthropic」，不能讓人誤會這是 Rex 寫的 Claude Code。
- **不要編造**：5 篇筆記的字數、章節數、原文連結都已給定，subagent **不要**自行新增「Rex 還寫了某某主題」。
- **不要對 Claude Code 做價值判斷**：頁面內容是研究分析，不是評論。避免「Anthropic 設計得很糟」或「這比 Cursor 好」這類發言。
- **5 篇卡片**：標題使用本檔提供的中文，副標也照本檔，**不要自創新副標**。
- **參考版型**：[`src/pages/projects/ThreadsBot.tsx`](../../src/pages/projects/ThreadsBot.tsx)
- **配色**：建議 `#9333EA`（violet/purple）系作為主色，呼應「拆解 / 研究 / 學術」氣質。
- **沒有截圖**：這專案沒有 UI 截圖。頁面以**文字 + badge + 卡片**為主，可在 Hero 旁放一個 monospace 的程式碼節錄裝飾（例如 source map 的片段），但不要佔太大版面。
- **不要創 demo 連結**：repo 沒有 live demo，CTA 只連 GitHub。
