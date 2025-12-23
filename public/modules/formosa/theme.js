/**
 * 主題模組設定檔：寶島複習 (Formosa)
 * 這個檔案整合了該主題所需的所有獨特資訊。
 */

window.CURRENT_THEME_CONFIG = {
    // 1. 該主題對應的 GAS 題庫網址
    GAS_URL: "https://script.google.com/macros/s/AKfycbzF0dw-vzopP87Ztano5CuWm0c2qnHw8HoVItdwKHqa_QLhATgQGvQMbExJLJcMOQgL/exec",

    // 2. 地圖座標 (原本的 board_coords.js)
    BOARD_COORDINATES: [
        { top: "68.0%", left: "38.0%" }, // 1. 打狗 (高雄)
        { top: "60.0%", left: "35.0%" }, // 2. 大員 (台南)
        { top: "50.0%", left: "38.0%" }, // 3. 諸羅 (嘉義)
        { top: "43.0%", left: "40.0%" }, // 4. 鹿港 (彰化)
        { top: "34.0%", left: "45.0%" }, // 5. 大肚 (台中)
        { top: "25.0%", left: "53.0%" }, // 6. 竹塹 (新竹)
        { top: "20.0%", left: "65.0%" }, // 7. 艋舺 (台北)
        { top: "13.0%", left: "64.0%" }, // 8. 淡水 (台北)
        { top: "15.0%", left: "78.0%" }, // 9. 雞籠 (基隆)
        { top: "25.0%", left: "73.0%" }, // 10. 噶瑪蘭 (宜蘭)
        { top: "35.0%", left: "70.0%" }, // 11. 奇萊 (花蓮)
        { top: "50.0%", left: "68.0%" }, // 12. 水璉 (花蓮)
        { top: "60.0%", left: "64.0%" }, // 13. 卑南 (台東)
        { top: "68.0%", left: "60.0%" }, // 14. 知本 (台東)
        { top: "75.0%", left: "55.0%" }, // 15. 太麻里 (台東)
        { top: "88.0%", left: "52.0%" }, // 16. 琅𤩝 (恆春)
        { top: "80.0%", left: "50.0%" }, // 17. 阿塱壹 (屏東)
        { top: "46.0%", left: "58.0%" }, // 18. 水沙連 (日月潭)
        { top: "38.0%", left: "55.0%" }, // 19. 埔里 (南投)
        { top: "55.0%", left: "25.0%" }, // 20. 澎湖
    ],

    // 3. 資源路徑 (原本的 game_assets.js)
    // *重要*：這裡的路徑是「相對於 theme.js 所在位置」的簡易路徑
    // 遊戲引擎會自動幫它們加上 `modules/formosa/` 前綴。
    ASSETS: {
        AVATARS: {
            "bear": "img/avatar_bear.png",
            "deer": "img/avatar_deer.png",
            "buffalo": "img/avatar_buffalo.png",
            "magpie": "img/avatar_magpie.png",
            "leopard": "img/avatar_leopard.png",
            "civet": "img/avatar_civet.png",
            "salmon": "img/avatar_salmon.png",
            "monkey": "img/avatar_monkey.png",
            "leopardcat": "img/avatar_leopardcat.png",
            "pheasant": "img/avatar_pheasant.png",
            "pangolin": "img/avatar_pangolin.png",
            "treefrog": "img/avatar_treefrog.png"
        },
        IMAGES: {
            "guideNPC": "img/guide_bear.png",    // 改個通用名稱 NPC
            "loadingGif": "img/loading_bear.gif",
            "mapBg": "img/map_background.png"
        },
        SFX: {
            
            "bgm": "sound/backgroundMusic.mp3"
        },
        // 4. 文字設定 (可針對主題客製化)
        TEXT: {
            MII_ADJECTIVES: ["開朗的", "俏皮的", "害羞的", "靈巧的", "神秘的", "機靈的", "亮晶晶的", "輕盈的", "酷酷的", "暖心的", "勇敢的", "可愛的", "快活的", "跳跳的"],
            MII_NOUNS: ["水牛", "黑熊", "白鼻心", "穿山甲", "藍鵲", "雲豹", "石虎", "山羌", "獼猴", "松鼠", "貓頭鷹", "黃喉貂", "樹蛙", "海豚"],
            NPC_IDLE_CHATS: [
                "記得多喝水，保持專注喔！", "這裡的風景真不錯～", "你認識多少台灣特有種呢？",
                "慢慢來，答對比較重要！", "加油！你是最棒的探險家！", "台灣的歷史真的很豐富呢！",
                "休息一下再出發也沒關係。", "要不要邀請同學一起來玩？", "我最喜歡吃蜂蜜了 (流口水)", "準備好迎接下一個挑戰了嗎？"
            ],
            NPC_WELCOME: "歡迎來到寶島！準備好冒險了嗎？"
        }
    }
};