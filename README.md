# Thememonopoly (互動複習大富翁)

這是一個基於 Firebase 的互動大富翁遊戲專案。

## GitHub 託管與部署說明

本專案已設定好 GitHub Actions 自動部署至 GitHub Pages。

### 1. 建立 GitHub 儲存庫
請在 GitHub 上建立一個新的儲存庫 (Repository)，然後在本地執行以下指令（請將 `<YOUR_REPO_URL>` 替換為你的儲存庫網址）：

```bash
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

### 2. 設定 GitHub Secrets (重要)
為了保護 Firebase API Key 不被公開，專案使用了 GitHub Secrets。部署時 GitHub Actions 會在編譯過程中自動將這些金鑰注入。

請至你的 GitHub 儲存庫設定：
**Settings > Secrets and variables > Actions > New repository secret**

新增以下 Secret：
- `FIREBASE_API_KEY`: 你的 Firebase API Key
- `FIREBASE_AUTH_DOMAIN`: 你的 Firebase Auth Domain
- `FIREBASE_DATABASE_URL`: 你的 Firebase Database URL
- `FIREBASE_PROJECT_ID`: 你的 Firebase Project ID
- `FIREBASE_STORAGE_BUCKET`: 你的 Firebase Storage Bucket
- `FIREBASE_MESSAGING_SENDER_ID`: 你的 Firebase Messaging Sender ID
- `FIREBASE_APP_ID`: 你的 Firebase App ID

### 3. 開啟 GitHub Pages
部署完成後（Action 執行成功後），請至：
**Settings > Pages**
將 **Build and deployment > Branch** 設定為 `gh-pages` (由 Action 自動產生)。

## 本地開發
本專案目前使用 **Vite** 進行開發。

1. **安裝依賴**：
   ```bash
   npm install
   ```

2. **設定環境變數**：
   在根目錄建立 `.env` 檔案，內容如下：
   ```env
   VITE_FIREBASE_API_KEY=你的_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=你的_AUTH_DOMAIN
   VITE_FIREBASE_DATABASE_URL=你的_DATABASE_URL
   VITE_FIREBASE_PROJECT_ID=你的_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=你的_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=你的_SENDER_ID
   VITE_FIREBASE_APP_ID=你的_APP_ID
   ```

3. **啟動開發伺服器**：
   ```bash
   npm run dev
   ```

**注意：`.env` 檔案已被列入 `.gitignore`，請勿推送到 GitHub。**
