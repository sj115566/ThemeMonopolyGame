/**
 * 語言設定檔 (Language Config)
 * 用於管理遊戲介面中的所有文字。
 * 若要製作雙語版，只需替換此檔案的內容，或建立新的物件切換即可。
 */
const UI_TEXT = {
    // --- 頁面標題 ---
    appTitle: "互動複習大富翁",
    
    // --- 主題選擇頁 ---
    themeSelectorTitle: "📚 請選擇遊玩主題",
    themeLoading: "正在讀取主題列表...",
    themeNoData: "目前沒有可用的主題。",
    themeReadError: "讀取失敗: 請確認 modules/theme_list.js 存在。",
    themeBtnText: "開始探險", // 如果未來想加回按鈕文字
    
    // --- 載入畫面 ---
    loadingTitle: "載入中...",
    
    // --- 設定選單 ---
    settingsTitle: "設定",
    labelMusic: "🎵 音樂",
    labelSound: "🔊 音效",
    btnSoftReset: "🔄 重玩本局 (保留紀錄)",
    btnHardReset: "🚪 完全登出",
    btnBackMenu: "🏠 回主選單",
    btnClose: "關閉",
    
    // --- 開始/編輯畫面 ---
    startTitle: "建立角色",
    labelNickname: "冒險暱稱",
    labelAvatar: "選擇頭像",
    btnCancel: "取消",
    btnConfirm: "確認",
    
    // --- 玩家資訊列 ---
    scorePrefix: "分數: ",
    
    // --- 排行榜 ---
    tabLive: "即時",
    tabHistory: "歷史",
    
    // --- 答題/複習 ---
    reviewTitleSuffix: " (複習)",
    reviewCloseBtn: "關閉複習",
    feedbackCorrect: "答對了！🎉",
    feedbackWrong: "哎呀，答錯了...",
    feedbackRetry: "再試一次！",
    feedbackCorrectIs: "可惜！正確答案是第 {n} 個選項。", // {n} 會被替換
    tagCorrect: " ✅",
    tagWrong: " ❌",
    
    // --- 遊戲結束 ---
    endTitle: "🎉 恭喜通關！",
    endMsg: "恭喜 {name} 完成挑戰！", // {name} 會被替換
    labelTotal: "總題數",
    labelCorrect: "答對",
    btnReviewMode: "👀 進入複習模式",
    guideReviewMode: "進入複習模式，點擊格子複習吧！",
    
    // --- 系統提示 (Alerts) ---
    alertNickname: "請輸入暱稱！",
    alertAvatar: "請選擇頭像！",
    alertSoftResetTitle: "重玩本局",
    alertSoftResetMsg: "確定要重玩嗎？(保留身分與紀錄)",
    alertHardResetTitle: "完全登出",
    alertHardResetMsg: "確定要登出嗎？(清除本機資料)",
    
    // --- 錯誤訊息 ---
    errFirebase: "Firebase 未設定 (global_config.js)",
    errGas: "題庫讀取失敗: ",
    errConfig: "設定檔格式錯誤",
    errThemeFile: "找不到主題檔案 (theme.js)",
    errThemeLoad: "主題載入失敗: "
};