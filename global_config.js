/**
 * 通用遊戲設定 (Global Config)
 * 存放所有主題共用的設定，例如 Firebase。
 */
const FIREBASE_CONFIG = {
  apiKey: "{{FIREBASE_API_KEY}}",
  authDomain: "{{FIREBASE_AUTH_DOMAIN}}",
  projectId: "{{FIREBASE_PROJECT_ID}}",
  storageBucket: "{{FIREBASE_STORAGE_BUCKET}}",
  messagingSenderId: "{{FIREBASE_MESSAGING_SENDER_ID}}",
  appId: "{{FIREBASE_APP_ID}}"
};

/**
 * 通用預設音效 (指向根目錄)
 * 當個別主題模組沒有定義特定音效時，將使用這些預設值。
 */
const DEFAULT_SFX = {
  "click": ["./sound/click1.mp3", "./sound/click2.mp3", "./sound/click3.mp3"],
  "dice": ["./sound/dice1.mp3", "./sound/dice2.mp3"],
  "move": ["./sound/move1.mp3", "./sound/move2.mp3", "./sound/move3.mp3"],
  "success": ["./sound/success.mp3"],
  "fail": ["./sound/fail.mp3"],
  "complete": ["./sound/complete.mp3"]
};