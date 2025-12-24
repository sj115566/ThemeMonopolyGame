/**
 * 遊戲主題清單
 * id: 模組資料夾名稱 (必須與資料夾命名完全一致)
 * name: 顯示在選單上的名稱
 * description: 主題描述
 * cover: (選用) 主題封面圖，相對於模組資料夾的位置
 */
window.AVAILABLE_THEMES = [
    {
        id: "formosa",
        name: "🇹🇼 你好，福爾摩沙！",
        description: " <b><i> Olá, Ilha Formosa! </i></b> \n 跟著黑熊嚮導，一起探索台灣的歷史與地理吧！",
        cover: "img/map_background.png" // 會用該主題地圖當封面
    },
    {
        id: "light",
        name: "尋光探險隊✨",
        description: " <b><i> Light-Seeker Expedition </i></b> \n 跟著森林中的睿智貓頭鷹，一起認識光與能源和神祕的電路吧！",
        cover: "img/map_background.png"
    },
    {
        id: "taiwaneconomic",
        name: "打造福爾摩沙：經濟之路💸💸",
        description: " <b><i> Formosa's Economic Journey </i></b> \n 跟著時光郵差，一起穿越時空，見證福爾摩沙的經濟奇蹟！",
        cover: "img/map_background.png"
    },
    /*
        {
            id: "universe",
            name: "🚀 太陽系探險",
            description: "搭上太空船，前往未知的星球！",
            cover: "img/space_bg.png"
        }
    */
];