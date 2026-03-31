Antigravity UI/UX Skill 安裝指南 (CLI版)
1. 全域安裝 CLI 工具
   開啟 PowerShell 或 CMD 執行：

```

npm install -g uipro-cli

```

2. 進入專案目錄
   切換到您的專案根目錄：

```

cd "D:\idea\IdeaProjects\AiAgentDemo"

```

3. 清除舊檔 (Optional)
   若之前有手動複製，建議先清除以避免衝突：

```

Remove-Item -Path ".agent\skills\ui-ux-pro-max" -Recurse -Force -ErrorAction SilentlyContinue

```

4. 執行初始化
   自動下載 Skill 並安裝 Python 依賴：

```

uipro init --ai antigravity

```

5. 測試驗證
   重啟 Antigravity IDE，在 Agent 對話框輸入：

「幫我設計一個登入頁面」 若 Agent 顯示 `Using skill: ui-ux-pro-max` 即代表成功。