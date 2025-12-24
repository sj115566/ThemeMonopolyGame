/**
 * 通用遊戲設定 (Global Config)
 * 存放所有主題共用的設定，例如 Firebase。
 * Security Note: Firebase keys are served via environment variables for safety.
 */
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

/**
 * 通用預設音效 (指向根目錄)
 * 當個別主題模組沒有定義特定音效時，將使用這些預設值。
 */
export const DEFAULT_SFX = {
  "bgm": ["./sound/backgroundMusic.mp3"],
  "click": ["./sound/click1.mp3", "./sound/click2.mp3", "./sound/click3.mp3"],
  "dice": ["./sound/dice1.mp3", "./sound/dice2.mp3"],
  "move": ["./sound/move1.mp3", "./sound/move2.mp3", "./sound/move3.mp3"],
  "success": ["./sound/success.mp3"],
  "fail": ["./sound/fail.mp3"],
  "complete": ["./sound/complete.mp3"]
};