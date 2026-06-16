---
name: preview-server
description: Claude Preview（preview_* 工具）操作本地網頁時的注意事項與排錯指引。當要用 preview 開啟 localhost 網頁、預覽本地 dev server、接上「已在外部跑著」的 app（Docker / IDE / 終端機啟動的 server）、或 preview 出現黑畫面、Empty reply、Port in use、privileged port 等錯誤時使用。觸發語：「用 preview 開」「啟動預覽」「preview 黑畫面」「preview 連不上本地網頁」。
---

# 使用 Preview server 的注意事項

用 Claude Preview（`preview_start` / `preview_screenshot` / `preview_snapshot` / `preview_fill` / `preview_click` / `preview_eval` 等）操作本地網頁前，先讀這份；遇到下列徵狀直接對照排錯。

## 先判斷：app 是誰啟動的？

| 情況 | 做法 |
|------|------|
| **app 還沒跑**，且啟動指令在本專案 | 直接在 `.claude/launch.json` 設好 `runtimeExecutable`/`runtimeArgs`/`port`，`preview_start` 讓 Preview 自己啟動並擁有 → 最單純 |
| **app 已在外部跑著**（Docker、IDE、終端機 `npm run dev`、別的專案） | **不能**直接指過去，要用「代理橋接」（見下）。Preview 堅持自己擁有那個埠，不肯接管別人開好的 server |

## 兩個硬限制

1. **Preview 只接管自己啟動的埠**：app 若是外部先跑起來的，`preview_start` 會回報
   `Port xxxx is in use by "node" (not a preview server)` 而拒絕。**與埠號大小無關**。
2. **不能綁特權埠 80 / 443**：回報 `Port 80 is reserved / privileged port`。

→ 兩者共同解法：**開一個高位埠 TCP 代理，讓 Preview 去啟動這個代理**，代理再轉發到真正的 app。

## 代理橋接做法

### 1. 代理腳本（`/tmp/preview-proxy.cjs`）

```js
const net = require('net');
const LISTEN = 8899;
const TARGET = {
  host: process.env.TARGET_HOST || '::1',          // ⚠️ IPv4/IPv6 要對齊，見下
  port: Number(process.env.TARGET_PORT) || 5174,
};
net.createServer((client) => {
  const upstream = net.connect(TARGET.port, TARGET.host);
  client.pipe(upstream);
  upstream.pipe(client);
  client.on('error', () => upstream.destroy());
  upstream.on('error', () => client.destroy());
}).listen(LISTEN, '127.0.0.1', () => console.log(`proxy ${LISTEN} -> ${TARGET.host}:${TARGET.port}`));
```

### 2. `.claude/launch.json` 讓 Preview 啟動代理

```json
{
  "name": "office",
  "runtimeExecutable": "node",
  "runtimeArgs": ["/tmp/preview-proxy.cjs"],
  "port": 8899
}
```

之後 `preview_start office` → `preview_screenshot` 確認。

## 排錯對照表

| 徵狀 | 多半原因 | 解法 |
|------|----------|------|
| 黑畫面 / `chrome-error://` / `Empty reply from server` | **目標 server 只綁 IPv6 `::1`，代理卻連 IPv4 `127.0.0.1`**（Vite dev server 預設如此） | 代理 `TARGET.host` 改 `::1`，重啟代理 |
| `Port xxxx is in use (not a preview server)` | app 已被外部啟動 | 改用代理橋接 |
| `Port 80/443 reserved / privileged` | 想綁特權埠 | 改用代理橋接到高位埠 |
| 頁面 403 / Blocked request | Vite Host 檢查（DNS rebinding 防護） | Vite 設定 `server.allowedHosts` |

### 診斷指令

```bash
# 目標 server 綁哪個介面（看 NAME 是 [::1] 還是 127.0.0.1）
lsof -nP -iTCP:<埠> -sTCP:LISTEN

# 分別測 IPv4 / IPv6
curl -4 -o /dev/null -w "%{http_code}\n" http://127.0.0.1:<埠>/
curl -6 -o /dev/null -w "%{http_code}\n" "http://[::1]:<埠>/"

# 驗證代理本身通不通
curl -o /dev/null -w "%{http_code}\n" http://localhost:8899/
```

## 收尾（清理）

```bash
lsof -ti tcp:8899 | xargs kill       # 關代理
pkill -f preview-proxy.cjs
rm -f /tmp/preview-proxy.cjs          # 刪腳本（重開機本來就會消失）
```
並從 `.claude/launch.json` 移除暫時的設定；Preview server 用 `preview_stop <serverId>` 收掉。

## 安全紅線

- Preview 可代填**一般文字欄位**、點按鈕。
- **密碼、API key、token、信用卡、身分證等機密欄位一律不代填**，請使用者本人輸入。

## 相關

- 完整實戰筆記另存於 rex-notes 專案：`docs/claude-preview.md`。
