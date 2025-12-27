import{F as T}from"./global_config-vaLYm7Na.js";firebase.initializeApp(T);const x=firebase.database(),N=firebase.storage(),j=firebase.auth();j.signInAnonymously().catch(e=>{console.error("Firebase Auth Error:",e)});let P=null,g=[];const y={mapContainer:document.getElementById("map-preview-container"),mapImg:document.getElementById("map-preview"),pointsLayer:document.getElementById("map-points-layer"),pointCountEl:document.getElementById("point-count"),undoBtn:document.getElementById("undo-point"),overlay:document.getElementById("loading-overlay"),loadingText:document.getElementById("loading-text")},M=[{key:"bear",file:"avatar_bear.png"},{key:"deer",file:"avatar_deer.png"},{key:"buffalo",file:"avatar_buffalo.png"},{key:"magpie",file:"avatar_magpie.png"}];function B(){y.pointsLayer.innerHTML="",g.forEach((e,t)=>{const a=document.createElement("div");a.className="map-point",a.style.top=e.t,a.style.left=e.l,a.textContent=t+1,y.pointsLayer.appendChild(a)}),y.pointCountEl.textContent=g.length,y.undoBtn.disabled=g.length===0}function S(e="",t=""){const a=document.createElement("div");a.className="flex gap-3 avatar-row p-3 bg-white/60 border border-indigo-50 rounded-2xl items-center shadow-sm hover:shadow-md transition-all relative group",a.innerHTML=`
                <div class="flex-shrink-0 relative">
                    <img class="w-12 h-12 rounded-xl border-2 border-white bg-gray-100 object-cover avatar-prev shadow-sm" src="${t.startsWith("http")?t:"img/"+t}">
                </div>
                <div class="flex-grow space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">ID 識別碼</span>
                        <input type="text" placeholder="例如: bear" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-key focus:ring-1 ring-indigo-300 outline-none" value="${e}">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">圖片路徑</span>
                        <input type="text" placeholder="網址或檔名" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-file focus:ring-1 ring-indigo-300 outline-none" value="${t}">
                    </div>
                </div>
                <button onclick="this.parentElement.remove(); generateAll();" 
                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm ml-1"
                    title="刪除此頭像">✖</button>
            `;const n=a.querySelector(".avatar-file"),i=a.querySelector(".avatar-prev");n.addEventListener("input",()=>{const s=n.value.trim();i.src=s.startsWith("http")?s:s?"img/"+s:"",f()}),a.querySelector(".avatar-key").addEventListener("input",f),document.getElementById("avatar-list").appendChild(a)}function _(){const e=document.getElementById("ai-api-key").value.trim(),t=document.getElementById("ai-eleven-key").value.trim(),a=document.getElementById("ai-proxy-url").value.trim();localStorage.setItem("GEMINI_API_KEY",e),localStorage.setItem("ELEVENLABS_API_KEY",t),localStorage.setItem("AI_PROXY_URL",a),document.getElementById("ai-settings-modal").classList.add("hidden"),alert("✅ AI 設定已儲存成功！")}window.saveAISettings=_;const v={"sfx-bgm":"sound/backgroundMusic.mp3","sfx-click":"sound/click1.mp3","sfx-dice":"sound/dice1.mp3","sfx-move":"sound/move1.mp3","sfx-success":"sound/success.mp3","sfx-fail":"sound/fail.mp3","sfx-complete":"sound/complete.mp3","img-mapBg":"img/map_background.png","img-guideNPC":"img/guide_bear.png","img-loadingGif":"img/loading_bear.gif"},b=e=>e?e.startsWith("http")||e.startsWith("data:")||e.startsWith("img/")?e:"img/"+e:"",w=e=>e?e.startsWith("http")||e.startsWith("data:")||e.startsWith("sound/")?e:"sound/"+e:"";function l(e){return(document.getElementById(e)?.value||"").trim()}function I(e){let t=l(e);return!t&&v[e]&&(t=v[e]),t}function d(e,t){const a=document.getElementById(e);a&&(a.value=t,f())}function L(e){return l(e).split(`
`).filter(t=>t.trim()).map(t=>`"${t.trim().replace(/"/g,'\\"')}"`).join(`,
            `)}function R(e){let t=I(e);if(!t)return null;const a=n=>w(n);return t.includes(",")?`[${t.split(",").map(n=>`"${a(n.trim())}"`).join(", ")}]`:`["${a(t)}"]`}function f(){const e=l("theme-id")||"new_theme",t=(r,c)=>{const u=I(r),h=document.getElementById(c);h&&(h.src=u.startsWith("http")||u.startsWith("data:")?u:u||"")};t("img-mapBg","prev-mapBg"),t("img-guideNPC","prev-guideNPC"),t("img-loadingGif","prev-loadingGif");let a=[];document.querySelectorAll(".avatar-row").forEach(r=>{const c=r.querySelector(".avatar-key").value.trim(),u=r.querySelector(".avatar-file").value.trim();if(c&&u){const h=u.startsWith("http")?u:`img/${u}`;a.push(`        "${c}": "${h}"`)}});let n=g.map(r=>`        { top: "${r.t}", left: "${r.l}" }`).join(`,
`);if(g.length<20){const r=20-g.length;n+=(n?`,
`:"")+`        // ... (還需要點擊地圖增加 ${r} 個點才能開始遊戲)`}let i=[];["click","dice","move","success","fail","complete","bgm"].forEach(r=>{const c=R("sfx-"+(r==="bgm"?"bgm":r));c&&i.push(`        "${r}": ${c}`)});const s=`window.CURRENT_THEME_CONFIG = {
    GAS_URL: "${l("gas-url")}",
    BOARD_COORDINATES: [
${n}
    ],
    ASSETS: {
        AVATARS: {
${a.join(`,
`)}
        },
        IMAGES: {
            "guideNPC": "${b(I("img-guideNPC"))}",
            "loadingGif": "${b(I("img-loadingGif"))}",
            "mapBg": "${b(I("img-mapBg"))}"
        },
        SFX: {
${i.join(`,
`)}
        },
        TEXT: {
            NPC_WELCOME: "${l("txt-welcome")||"歡迎來到新世界！"}",
            NPC_IDLE_CHATS: [
                ${L("txt-idle")}
            ],
            MII_ADJECTIVES: [
                ${L("txt-adj")}
            ],
            MII_NOUNS: [
                ${L("txt-noun")}
            ]
        }
    }
};`,o=`    {
        id: "${e}",
        name: "${l("theme-name")}",
        description: "${l("theme-desc").replace(/\n/g,"\\n")}",
        cover: "img/${l("img-mapBg")}"
    },`;document.getElementById("output-theme-js").value=s,document.getElementById("output-list-js").value=o}async function A(e){const t=localStorage.getItem("GEMINI_API_KEY"),a=localStorage.getItem("AI_PROXY_URL");if(!t&&!a)return alert("請先設定 Gemini API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden"),null;m(!0,"AI 正在發想內容...");try{let n;const i={contents:[{parts:[{text:e+` 

請務必僅以純 JSON 格式回答，不要有其他解釋文字。`}]}]};if(a)n=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"gemini",payload:i})});else{const r=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${t}`;n=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})}const s=await n.json();if(!n.ok)throw new Error(s.error?.message||s.error||`API Error: ${n.status}`);if(!s.candidates||s.candidates.length===0){const r=s.promptFeedback?.blockReason||"找不到候選答案 (可能是被安全過濾器阻擋)";throw new Error(r)}let o=s.candidates[0]?.content?.parts?.[0]?.text;if(!o)throw new Error("API 回傳內容結構不正確");o=o.replace(/```json\n?/,"").replace(/\n?```/,"").trim();try{return JSON.parse(o)}catch{throw console.error("JSON Parse Error. Content:",o),new Error("AI 回傳的格式不符合 JSON，請再試一次。")}}catch(n){return console.error("AI Call Failed:",n),alert(`🤖 AI 呼叫失敗：
`+n.message),null}finally{m(!1)}}async function G(){const t=`你是一個遊戲設計師。請針對主題「${l("theme-name")||l("theme-id")}」提供以下 JSON 資訊：
            {
                "name": "吸引人的主題名稱(含 Emoji)",
                "description": "簡短的主題介紹(約 50 字)",
                "welcome": "NPC 歡迎詞",
                "id": "適用的英文小寫 ID"
            } 
            請繁體中文輸出。`,a=await A(t);a&&(d("theme-name",a.name),d("theme-desc",a.description),P||d("theme-id",a.id),d("txt-welcome",a.welcome))}async function O(){const t=`針對遊戲主題「${l("theme-name")}」，生成 10 句 NPC 的閒聊對談(每句15字以內)，
            輸出格式如： { "chats": ["第一句", "第二句", ...] } 
            繁體中文。`,a=await A(t);a&&d("txt-idle",a.chats.join(`
`))}async function F(e){const a=`針對遊戲主題「${l("theme-name")}」，生成 15 個適合用來隨機組合成角色暱稱的 ${e==="adj"?"形容詞":"名詞"}。
            輸出格式： { "list": ["詞1", "詞2", ...] }`,n=await A(a);n&&d("txt-"+e,n.list.join(`
`))}async function q(){const e=g.length;if(e===0)return alert("請先在上方地圖點擊標註至少一個地點，AI 才能為您取名並製作題目。");const t=l("theme-name"),a=document.getElementById("ai-questions-topic").value.trim(),n=a?`
特別針對以下教學內容或重點生成：
${a}
`:"",i=`你是一個互動式大富翁遊戲設計專家。請針對主題「${t}」${n}，生成 ${e} 個地點與對應的四選一單選題。
            輸出格式必須是純 JSON，結構如下：
            {
                "map": [
                    {"city": "地點名稱1", "questionId": "q1", "isMustHit": false},
                    ... (共 ${e} 個地點)
                ],
                "questions": {
                    "q1": {"text": "題目內容", "options": ["選項1", "選項2", "選項3", "選項4"], "answer": 1},
                    ... (共 ${e} 個題目, answer 是 1-4 的數字)
                }
            }
            請確保內容豐富、有趣且符合繁體中文習慣。`,s=await A(i);s&&(document.getElementById("output-questions-json").value=JSON.stringify(s,null,2),alert("遊戲題目集生成成功！已套用於本地與雲端發佈區。"))}async function W(e,t,a){const n=document.getElementById(e).value.trim();if(!n)return alert("請先生成 AI 提示詞！");m(!0,"正在繪製圖像 (Pollinations.ai)...");try{const i=Math.floor(Math.random()*1e4),s=`https://image.pollinations.ai/prompt/${encodeURIComponent(n)}?width=1024&height=1024&seed=${i}&nologo=true`;await new Promise((o,r)=>{const c=new Image;c.crossOrigin="anonymous",c.onload=()=>{t&&(document.getElementById(t).src=s),a&&(document.getElementById(a).value=s),f(),o()},c.onerror=()=>{r(new Error("圖片載入失敗 (可能是伺服器忙碌或超時)，請稍後再試或更換提示詞。"))},setTimeout(()=>{r(new Error("圖片載入超時 (30s)，請檢查網路或稍後再試。"))},3e4),c.src=s})}catch(i){console.error("Image Generation Error:",i),alert("生圖失敗: "+i.message)}finally{m(!1)}}async function D(){const t=`你是一個資深遊戲美術指導。針對大富翁遊戲主題「${l("theme-name")}」，生成以下資源的 AI 繪圖/影片/音樂提示詞 (Prompts)：
            1. 地圖背景圖 (Map Background): 包含豐富的地理元素與風格描述。
            2. 嚮導角色 (Guide NPC): 描述角色外觀、神態與服裝。
            3. 載入頁影片動畫 (Loading Video): 針對 Luma/Runway 影片生成器的提示詞，強調動態感(如: "cinematic slow motion, shimmering particles, character walking towards camera")。
            4. 四個不同的角色頭像 (4 character avatars): 針對頭像設計。
            5. 背景音樂 (BGM) 風格標籤: 給 Suno/Mubert 的風格標籤 (如: "Lo-fi, Adventurous, 8-bit, Cinematic, orchestral")。
            提示詞請使用「英文」撰寫。
            輸出 JSON 格式： { 
                "map": "...", 
                "npc": "...", 
                "loading": "...", 
                "avatar": "shared avatar style prompt",
                "avatars": ["p1", "p2", "p3", "p4"],
                "bgm": "BGM style tags here"
            }`,a=await A(t);a&&(document.getElementById("prompt-map").value=a.map,document.getElementById("prompt-npc").value=a.npc,document.getElementById("prompt-loading").value=a.loading,document.getElementById("prompt-avatar").value=a.avatar,window.AI_AVATAR_PROMPTS=a.avatars,document.getElementById("ai-prompts-output").innerHTML=`
                    <div class="mb-4 text-purple-900 font-extrabold border-b border-purple-200 pb-2 text-base">✨ AI 美術提案內容</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Map Background</strong><p class="text-xs mt-1 italic">"${a.map}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">NPC Guide</strong><p class="text-xs mt-1 italic">"${a.npc}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Loading Anim</strong><p class="text-xs mt-1 italic">"${a.loading}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Music Tags</strong><p class="text-xs mt-1 italic">"${a.bgm}"</p></div>
                    </div>
                `,document.getElementById("ai-prompts-output").classList.remove("hidden"),document.getElementById("prompts-control").classList.remove("hidden"),document.getElementById("btn-gen-map").disabled=!1,document.getElementById("btn-gen-map").title="根據目前的地圖提示詞生成背景",alert("AI 提示詞生成完畢！您可以繼續下一步生成地圖，或生成 NPC/頭像。"))}async function J(){const e=document.getElementById("prompt-avatar").value,t=window.AI_AVATAR_PROMPTS||[];if(!e||t.length===0)return alert("請先生成 AI 提示詞！");m(!0,"正在生成角色頭像組...");try{const a=document.getElementById("avatar-list"),n=a.querySelectorAll(".avatar-row").length;for(let i=0;i<t.length;i++){const s=`${t[i]}, ${e}`,o=Math.floor(Math.random()*1e5),r=`https://image.pollinations.ai/prompt/${encodeURIComponent(s)}?width=512&height=512&seed=${o}&nologo=true`,c=`char_${n+i+1}`;S(c,r)}alert(`✅ 新增了 ${t.length} 位角色！目前共有 ${a.querySelectorAll(".avatar-row").length} 位。`),f()}catch(a){alert("頭像生成失敗: "+a.message)}finally{m(!1)}}async function U(e,t){const a=localStorage.getItem("ELEVENLABS_API_KEY"),n=localStorage.getItem("AI_PROXY_URL");if(!a&&!n){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const i=l("theme-name")||"fantasy game",s=window.prompt("【AI 音效生成】請修正或輸入提示詞：",`A ${t} for a ${i} themed game`);if(s){m(!0,"正在透過 AI 生成音效...");try{let o;const r={text:s,duration_seconds:5,prompt_influence:.3};if(n?o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-sfx",payload:r})}):o=await fetch("https://api.elevenlabs.io/v1/sound-generation",{method:"POST",headers:{"xi-api-key":a,"Content-Type":"application/json"},body:JSON.stringify(r)}),!o.ok){const p=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(p.detail?.message||p.error||"生成失敗")}const c=await o.blob(),u=l("theme-id")||"temp",h=await E(c,`themes/${u}/sfx`,`${e}_${Date.now()}.mp3`);document.getElementById(e).value=h,alert("✅ 音效生成並上傳成功！"),f()}catch(o){console.error("SFX Generation Error:",o),alert("❌ 音效生成失敗："+o.message)}finally{m(!1)}}}async function K(e,t){const a=localStorage.getItem("ELEVENLABS_API_KEY"),n=localStorage.getItem("AI_PROXY_URL");if(!a&&!n){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const i=l("theme-name")||"adventure game",s=window.prompt("【AI 音樂生成】請修正或輸入音樂描述：",`${t} for a ${i} themed board game, looped, high quality`);if(s){m(!0,"正在透過 AI 生成背景音樂...");try{let o;const r={prompt:s,music_length_ms:3e4};if(n?o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-music",payload:r})}):o=await fetch("https://api.elevenlabs.io/v1/music",{method:"POST",headers:{"xi-api-key":a,"Content-Type":"application/json"},body:JSON.stringify(r)}),!o.ok){const p=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(p.detail?.message||p.error||"生成失敗")}const c=await o.blob(),u=l("theme-id")||"temp",h=await E(c,`themes/${u}/music`,`bgm_${Date.now()}.mp3`);document.getElementById(e).value=h,alert("✅ 背景音樂生成並上傳成功！"),f()}catch(o){console.error("Music Generation Error:",o),alert("❌ 音樂生成失敗："+o.message)}finally{m(!1)}}}window.generateAIAvatars=J;window.generateAISFX=U;window.generateAIMusic=K;async function E(e,t,a){if(!e)return null;if(typeof e=="string"&&e.includes("firebasestorage.googleapis.com"))return e;let n;if(typeof e=="string"&&e.startsWith("http"))try{const r=await fetch(e);if(!r.ok)throw new Error("Fetch failed");n=await r.blob()}catch{return console.error("CORS or Fetch error:",e),e}else n=e;const i=a||(n.name?`${Date.now()}_${n.name}`:`${Date.now()}.png`);return await(await N.ref(`${t}/${i}`).put(n)).ref.getDownloadURL()}async function X(){if(g.length===0)return alert("地圖座標點至少要有一個！");if(prompt("【管理驗證】請輸入發佈代碼以繼續：")!=="ZBP"){alert("驗證錯誤，您沒有權限發佈至雲端。");return}m(!0,"正在準備雲端發佈...");try{const t=l("theme-id"),a=l("theme-name");let n=I("img-mapBg");const i=document.getElementById("map-upload").files[0];i?n=await E(i,`themes/${t}/images`,"map_bg.png"):n.startsWith("http")&&(n=await E(n,`themes/${t}/images`,"map_bg.png")),n=b(n);let s=I("img-guideNPC");s.startsWith("http")&&(s=await E(s,`themes/${t}/images`,"npc.png")),s=b(s);let o=I("img-loadingGif");o.startsWith("http")&&(o=await E(o,`themes/${t}/images`,"loading.gif")),o=b(o);const r={},c=document.querySelectorAll(".avatar-row");for(const p of c){const C=p.querySelector(".avatar-key").value.trim();let $=p.querySelector(".avatar-file").value.trim();C&&$&&($.startsWith("http")&&($=await E($,`themes/${t}/avatars`,`${C}.png`)),r[C]=$)}const u={id:t,name:a,description:l("theme-desc"),gasUrl:l("gas-url"),coordinates:g,assets:{avatars:r,images:{guideNPC:s,loadingGif:o,mapBg:n},text:{welcome:l("txt-welcome"),idleChats:l("txt-idle").split(`
`).filter(p=>p.trim()),adj:l("txt-adj").split(`
`).filter(p=>p.trim()),noun:l("txt-noun").split(`
`).filter(p=>p.trim())},SFX:{bgm:w(l("sfx-bgm")||v["sfx-bgm"]),click:w(l("sfx-click")||v["sfx-click"]),dice:w(l("sfx-dice")||v["sfx-dice"]),move:w(l("sfx-move")||v["sfx-move"]),success:w(l("sfx-success")||v["sfx-success"]),fail:w(l("sfx-fail")||v["sfx-fail"]),complete:w(l("sfx-complete")||v["sfx-complete"])}}};let h=JSON.parse(document.getElementById("output-questions-json").value);await x.ref(`themes/${t}`).set(u),await x.ref(`questions/${t}`).set(h),await x.ref(`available_themes/${t}`).set({id:t,name:a,description:l("theme-desc"),cover:n,isCloud:!0}),alert("✅ 雲端平台發佈成功！")}catch(t){console.error(t),alert("❌ 發佈失敗："+t.message)}finally{m(!1)}}async function k(){const e=document.getElementById("cloud-themes-modal"),t=document.getElementById("cloud-themes-list");e.classList.remove("hidden"),t.innerHTML='<div class="text-center py-10 text-gray-400">正在讀取雲端清單...</div>';try{const a=await x.ref("available_themes").get();if(!a.exists()){t.innerHTML='<div class="text-center py-10 text-gray-400">目前沒有雲端主題</div>';return}const n=a.val();t.innerHTML="",Object.values(n).forEach(i=>{const s=document.createElement("div");s.className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors cursor-pointer group",s.innerHTML=`
                        <div class="flex items-center gap-4">
                            <img src="${i.cover}" class="w-12 h-12 rounded-lg object-cover bg-gray-200">
                            <div>
                                <div class="font-bold text-indigo-900">${i.name}</div>
                                <div class="text-[10px] text-gray-500">${i.id}</div>
                            </div>
                        </div>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="loadThemeFromCloud('${i.id}')" class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">載入修改</button>
                            <button onclick="deleteThemeFromCloud('${i.id}', '${i.name}')" class="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100">刪除</button>
                        </div>
                    `,t.appendChild(s)})}catch(a){t.innerHTML=`<div class="text-center py-10 text-red-400">讀取失敗：${a.message}</div>`}}async function Y(e){m(!0,"正在從雲端載入資料...");try{const[t,a]=await Promise.all([x.ref(`themes/${e}`).get(),x.ref(`questions/${e}`).get()]);if(!t.exists())throw new Error("找不到該主題的設定資料");const n=t.val(),i=a.val();d("theme-id",n.id),d("theme-name",n.name),d("theme-desc",n.description),d("gas-url",n.gasUrl||""),d("img-mapBg",n.assets.images.mapBg),d("img-guideNPC",n.assets.images.guideNPC),d("img-loadingGif",n.assets.images.loadingGif),document.getElementById("map-preview").src=n.assets.images.mapBg,d("txt-welcome",n.assets.text.welcome),d("txt-idle",(n.assets.text.idleChats||[]).join(`
`)),d("txt-adj",(n.assets.text.adj||[]).join(`
`)),d("txt-noun",(n.assets.text.noun||[]).join(`
`)),g=(n.coordinates||[]).map(c=>({t:c.top||c.t,l:c.left||c.l})),B();const s=document.getElementById("avatar-list");s.innerHTML="";for(let c in n.assets.avatars||{})S(c,n.assets.avatars[c]);const o=n.assets.SFX||n.assets.sfx||{};d("sfx-bgm",o.bgm||o["sfx-bgm"]||""),d("sfx-click",o.click||o["sfx-click"]||""),d("sfx-dice",o.dice||o["sfx-dice"]||""),d("sfx-move",o.move||o["sfx-move"]||""),d("sfx-success",o.success||o["sfx-success"]||""),d("sfx-fail",o.fail||o["sfx-fail"]||""),d("sfx-complete",o.complete||o["sfx-complete"]||""),i&&(document.getElementById("output-questions-json").value=JSON.stringify(i,null,2)),document.getElementById("cloud-themes-modal").classList.add("hidden"),P=e;const r=document.getElementById("theme-id");r.value=e,r.disabled=!0,document.getElementById("cloud-edit-badge").classList.remove("hidden"),document.getElementById("btn-unlock-id").classList.remove("hidden"),alert(`✅ 主題 「${n.name}」 載入成功！現在處於雲端更新模式。`),f()}catch(t){alert("❌ 載入失敗："+t.message)}finally{m(!1)}}async function H(e,t){if(prompt(`【管理授權】即將刪除主題「${t} (${e})」
此動作無法還原，請輸入管理代碼：`)!=="ZBP")return alert("驗證失敗，取消刪除。");if(confirm(`確定要徹底刪除主題「${t}」嗎？`)){m(!0,"正在刪除主題...");try{await Promise.all([x.ref(`themes/${e}`).remove(),x.ref(`questions/${e}`).remove(),x.ref(`available_themes/${e}`).remove()]),alert("✅ 主題已成功刪除。"),k()}catch(n){alert("❌ 刪除失敗："+n.message)}finally{m(!1)}}}function V(){if(confirm("解鎖 ID 後發佈將會建立一個「新的雲端主題」，而非更新現有主題。確定嗎？")){P=null;const e=document.getElementById("theme-id");e.disabled=!1,e.focus(),document.getElementById("cloud-edit-badge").classList.add("hidden"),document.getElementById("btn-unlock-id").classList.add("hidden")}}window.unlockThemeId=V;window.openCloudThemesModal=k;window.loadThemeFromCloud=Y;window.deleteThemeFromCloud=H;window.publishToCloud=X;window.aiCompleteInfo=G;window.aiGenerateChats=O;window.aiGenerateList=F;window.aiGenerateQuestions=q;window.aiGeneratePrompts=D;window.generateAIImage=W;window.addAvatarRow=S;window.saveAISettings=_;function m(e,t){y.overlay.classList.toggle("hidden",!e),t&&(y.loadingText.textContent=t)}window.showLoading=m;window.copyToClipboard=e=>{document.getElementById(e).select(),document.execCommand("copy"),alert("已複製到剪貼簿！")};function z(){M.forEach(e=>S(e.key,e.file)),document.getElementById("map-upload").addEventListener("change",e=>{const t=e.target.files[0];if(!t)return;const a=new FileReader;a.onload=n=>{y.mapImg.src=n.target.result,g=[],B(),f()},a.readAsDataURL(t)}),y.pointsLayer.addEventListener("click",e=>{if(g.length>=20)return alert("已達 20 個點的上限");const a=y.mapContainer.getBoundingClientRect(),n=((e.clientY-a.top)/a.height*100).toFixed(1)+"%",i=((e.clientX-a.left)/a.width*100).toFixed(1)+"%";g.push({t:n,l:i}),B(),f()}),y.undoBtn.onclick=()=>{g.pop(),B(),f()},document.querySelectorAll("input, textarea").forEach(e=>{e.addEventListener("input",f)}),document.getElementById("ai-api-key").value=localStorage.getItem("GEMINI_API_KEY")||"",document.getElementById("ai-eleven-key").value=localStorage.getItem("ELEVENLABS_API_KEY")||"",document.getElementById("ai-proxy-url").value=localStorage.getItem("AI_PROXY_URL")||"",f()}z();
