import{F as C}from"./global_config-BC-EMzQB.js";firebase.initializeApp(C);const v=firebase.database(),L=firebase.storage(),P=firebase.auth();P.signInAnonymously().catch(n=>{console.error("Firebase Auth Error:",n)});let g=[];const y={mapContainer:document.getElementById("map-preview-container"),mapImg:document.getElementById("map-preview"),pointsLayer:document.getElementById("map-points-layer"),pointCountEl:document.getElementById("point-count"),undoBtn:document.getElementById("undo-point"),overlay:document.getElementById("loading-overlay"),loadingText:document.getElementById("loading-text")},_=[{key:"bear",file:"avatar_bear.png"},{key:"deer",file:"avatar_deer.png"},{key:"buffalo",file:"avatar_buffalo.png"},{key:"magpie",file:"avatar_magpie.png"}];function E(){y.pointsLayer.innerHTML="",g.forEach((n,t)=>{const e=document.createElement("div");e.className="map-point",e.style.top=n.t,e.style.left=n.l,e.textContent=t+1,y.pointsLayer.appendChild(e)}),y.pointCountEl.textContent=g.length,y.undoBtn.disabled=g.length===0}function b(n="",t=""){const e=document.createElement("div");e.className="flex gap-3 avatar-row p-3 bg-white/60 border border-indigo-50 rounded-2xl items-center shadow-sm hover:shadow-md transition-all relative group",e.innerHTML=`
                <div class="flex-shrink-0 relative">
                    <img class="w-12 h-12 rounded-xl border-2 border-white bg-gray-100 object-cover avatar-prev shadow-sm" src="${t.startsWith("http")?t:"img/"+t}">
                </div>
                <div class="flex-grow space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">ID 識別碼</span>
                        <input type="text" placeholder="例如: bear" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-key focus:ring-1 ring-indigo-300 outline-none" value="${n}">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">圖片路徑</span>
                        <input type="text" placeholder="網址或檔名" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-file focus:ring-1 ring-indigo-300 outline-none" value="${t}">
                    </div>
                </div>
                <button onclick="this.parentElement.remove(); generateAll();" 
                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm ml-1"
                    title="刪除此頭像">✖</button>
            `;const a=e.querySelector(".avatar-file"),l=e.querySelector(".avatar-prev");a.addEventListener("input",()=>{const r=a.value.trim();l.src=r.startsWith("http")?r:r?"img/"+r:"",f()}),e.querySelector(".avatar-key").addEventListener("input",f),document.getElementById("avatar-list").appendChild(e)}function B(){const n=document.getElementById("ai-api-key").value.trim(),t=document.getElementById("ai-eleven-key").value.trim(),e=document.getElementById("ai-proxy-url").value.trim();localStorage.setItem("GEMINI_API_KEY",n),localStorage.setItem("ELEVENLABS_API_KEY",t),localStorage.setItem("AI_PROXY_URL",e),document.getElementById("ai-settings-modal").classList.add("hidden"),alert("✅ AI 設定已儲存成功！")}window.saveAISettings=B;function i(n){return(document.getElementById(n)?.value||"").trim()}function c(n,t){const e=document.getElementById(n);e&&(e.value=t,f())}function A(n){return i(n).split(`
`).filter(t=>t.trim()).map(t=>`"${t.trim().replace(/"/g,'\\"')}"`).join(`,
            `)}function N(n){const t=i(n);if(!t)return null;const e=a=>a.startsWith("http")||a.startsWith("data:")?a:"sound/"+a;return t.includes(",")?`[${t.split(",").map(a=>`"${e(a.trim())}"`).join(", ")}]`:`["${e(t)}"]`}function f(){const n=i("theme-id")||"new_theme",t=(s,p)=>{const u=i(s),h=document.getElementById(p);h&&(h.src=u.startsWith("http")?u:u?"img/"+u:"")};t("img-mapBg","prev-mapBg"),t("img-guideNPC","prev-guideNPC"),t("img-loadingGif","prev-loadingGif");let e=[];document.querySelectorAll(".avatar-row").forEach(s=>{const p=s.querySelector(".avatar-key").value.trim(),u=s.querySelector(".avatar-file").value.trim();if(p&&u){const h=u.startsWith("http")?u:`img/${u}`;e.push(`        "${p}": "${h}"`)}});let a=g.map(s=>`        { top: "${s.t}", left: "${s.l}" }`).join(`,
`);if(g.length<20){const s=20-g.length;a+=(a?`,
`:"")+`        // ... (還需要點擊地圖增加 ${s} 個點才能開始遊戲)`}let l=[];["click","dice","move","success","fail","complete","bgm"].forEach(s=>{const p=N("sfx-"+(s==="bgm"?"bgm":s));p&&l.push(`        "${s}": ${p}`)});const r=`window.CURRENT_THEME_CONFIG = {
    GAS_URL: "${i("gas-url")}",
    BOARD_COORDINATES: [
${a}
    ],
    ASSETS: {
        AVATARS: {
${e.join(`,
`)}
        },
        IMAGES: {
            "guideNPC": "img/${i("img-guideNPC")}",
            "loadingGif": "img/${i("img-loadingGif")}",
            "mapBg": "img/${i("img-mapBg")}"
        },
        SFX: {
${l.join(`,
`)}
        },
        TEXT: {
            NPC_WELCOME: "${i("txt-welcome")||"歡迎來到新世界！"}",
            NPC_IDLE_CHATS: [
                ${A("txt-idle")}
            ],
            MII_ADJECTIVES: [
                ${A("txt-adj")}
            ],
            MII_NOUNS: [
                ${A("txt-noun")}
            ]
        }
    }
};`,o=`    {
        id: "${n}",
        name: "${i("theme-name")}",
        description: "${i("theme-desc").replace(/\n/g,"\\n")}",
        cover: "img/${i("img-mapBg")}"
    },`;document.getElementById("output-theme-js").value=r,document.getElementById("output-list-js").value=o}async function I(n){const t=localStorage.getItem("GEMINI_API_KEY"),e=localStorage.getItem("AI_PROXY_URL");if(!t&&!e)return alert("請先設定 Gemini API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden"),null;d(!0,"AI 正在發想內容...");try{let a;const l={contents:[{parts:[{text:n+` 

請務必僅以純 JSON 格式回答，不要有其他解釋文字。`}]}]};if(e)a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"gemini",payload:l})});else{const s=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${t}`;a=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})}const r=await a.json();if(!a.ok)throw new Error(r.error?.message||r.error||`API Error: ${a.status}`);if(!r.candidates||r.candidates.length===0){const s=r.promptFeedback?.blockReason||"找不到候選答案 (可能是被安全過濾器阻擋)";throw new Error(s)}let o=r.candidates[0]?.content?.parts?.[0]?.text;if(!o)throw new Error("API 回傳內容結構不正確");o=o.replace(/```json\n?/,"").replace(/\n?```/,"").trim();try{return JSON.parse(o)}catch{throw console.error("JSON Parse Error. Content:",o),new Error("AI 回傳的格式不符合 JSON，請再試一次。")}}catch(a){return console.error("AI Call Failed:",a),alert(`🤖 AI 呼叫失敗：
`+a.message),null}finally{d(!1)}}async function T(){const t=`你是一個遊戲設計師。請針對主題「${i("theme-name")||i("theme-id")}」提供以下 JSON 資訊：
            {
                "name": "吸引人的主題名稱(含 Emoji)",
                "description": "簡短的主題介紹(約 50 字)",
                "welcome": "NPC 歡迎詞",
                "id": "適用的英文小寫 ID"
            } 
            請繁體中文輸出。`,e=await I(t);e&&(c("theme-name",e.name),c("theme-desc",e.description),c("theme-id",e.id),c("txt-welcome",e.welcome))}async function k(){const t=`針對遊戲主題「${i("theme-name")}」，生成 10 句 NPC 的閒聊對談(每句15字以內)，
            輸出格式如： { "chats": ["第一句", "第二句", ...] } 
            繁體中文。`,e=await I(t);e&&c("txt-idle",e.chats.join(`
`))}async function j(n){const e=`針對遊戲主題「${i("theme-name")}」，生成 15 個適合用來隨機組合成角色暱稱的 ${n==="adj"?"形容詞":"名詞"}。
            輸出格式： { "list": ["詞1", "詞2", ...] }`,a=await I(e);a&&c("txt-"+n,a.list.join(`
`))}async function M(){const n=g.length;if(n===0)return alert("請先在上方地圖點擊標註至少一個地點，AI 才能為您取名並製作題目。");const t=i("theme-name"),e=document.getElementById("ai-questions-topic").value.trim(),a=e?`
特別針對以下教學內容或重點生成：
${e}
`:"",l=`你是一個互動式大富翁遊戲設計專家。請針對主題「${t}」${a}，生成 ${n} 個地點與對應的四選一單選題。
            輸出格式必須是純 JSON，結構如下：
            {
                "map": [
                    {"city": "地點名稱1", "questionId": "q1", "isMustHit": false},
                    ... (共 ${n} 個地點)
                ],
                "questions": {
                    "q1": {"text": "題目內容", "options": ["選項1", "選項2", "選項3", "選項4"], "answer": 1},
                    ... (共 ${n} 個題目, answer 是 1-4 的數字)
                }
            }
            請確保內容豐富、有趣且符合繁體中文習慣。`,r=await I(l);r&&(document.getElementById("output-questions-json").value=JSON.stringify(r,null,2),alert("遊戲題目集生成成功！已套用於本地與雲端發佈區。"))}async function R(n,t,e){const a=document.getElementById(n).value.trim();if(!a)return alert("請先生成 AI 提示詞！");d(!0,"正在繪製圖像 (Pollinations.ai)...");try{const l=Math.floor(Math.random()*1e4),r=`https://image.pollinations.ai/prompt/${encodeURIComponent(a)}?width=1024&height=1024&seed=${l}&nologo=true`,o=new Image;o.crossOrigin="anonymous",o.onload=()=>{t&&(document.getElementById(t).src=r),e&&(document.getElementById(e).value=r),d(!1),f()},o.onerror=()=>{throw new Error("圖片載入失敗，請換個提示詞再試一次。")},o.src=r}catch(l){alert("生圖失敗: "+l.message),d(!1)}}async function G(){const t=`你是一個資深遊戲美術指導。針對大富翁遊戲主題「${i("theme-name")}」，生成以下資源的 AI 繪圖/影片/音樂提示詞 (Prompts)：
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
            }`,e=await I(t);e&&(document.getElementById("prompt-map").value=e.map,document.getElementById("prompt-npc").value=e.npc,document.getElementById("prompt-loading").value=e.loading,document.getElementById("prompt-avatar").value=e.avatar,window.AI_AVATAR_PROMPTS=e.avatars,document.getElementById("ai-prompts-output").innerHTML=`
                    <div class="mb-4 text-purple-900 font-extrabold border-b border-purple-200 pb-2 text-base">✨ AI 美術提案內容</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Map Background</strong><p class="text-xs mt-1 italic">"${e.map}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">NPC Guide</strong><p class="text-xs mt-1 italic">"${e.npc}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Loading Anim</strong><p class="text-xs mt-1 italic">"${e.loading}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Music Tags</strong><p class="text-xs mt-1 italic">"${e.bgm}"</p></div>
                    </div>
                `,document.getElementById("ai-prompts-output").classList.remove("hidden"),document.getElementById("prompts-control").classList.remove("hidden"),document.getElementById("btn-gen-map").disabled=!1,document.getElementById("btn-gen-map").title="根據目前的地圖提示詞生成背景",alert("AI 提示詞生成完畢！您可以繼續下一步生成地圖，或生成 NPC/頭像。"))}async function O(){const n=document.getElementById("prompt-avatar").value,t=window.AI_AVATAR_PROMPTS||[];if(!n||t.length===0)return alert("請先生成 AI 提示詞！");d(!0,"正在生成角色頭像組...");try{const e=document.getElementById("avatar-list"),a=e.querySelectorAll(".avatar-row").length;for(let l=0;l<t.length;l++){const r=`${t[l]}, ${n}`,o=Math.floor(Math.random()*1e5),s=`https://image.pollinations.ai/prompt/${encodeURIComponent(r)}?width=512&height=512&seed=${o}&nologo=true`,p=`char_${a+l+1}`;b(p,s)}alert(`✅ 新增了 ${t.length} 位角色！目前共有 ${e.querySelectorAll(".avatar-row").length} 位。`),f()}catch(e){alert("頭像生成失敗: "+e.message)}finally{d(!1)}}async function q(n,t){const e=localStorage.getItem("ELEVENLABS_API_KEY"),a=localStorage.getItem("AI_PROXY_URL");if(!e&&!a){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const l=i("theme-name")||"fantasy game",r=window.prompt("【AI 音效生成】請修正或輸入提示詞：",`A ${t} for a ${l} themed game`);if(r){d(!0,"正在透過 AI 生成音效...");try{let o;const s={text:r,duration_seconds:5,prompt_influence:.3};if(a?o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-sfx",payload:s})}):o=await fetch("https://api.elevenlabs.io/v1/sound-generation",{method:"POST",headers:{"xi-api-key":e,"Content-Type":"application/json"},body:JSON.stringify(s)}),!o.ok){const m=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(m.detail?.message||m.error||"生成失敗")}const p=await o.blob(),u=i("theme-id")||"temp",h=await w(p,`themes/${u}/sfx`,`${n}_${Date.now()}.mp3`);document.getElementById(n).value=h,alert("✅ 音效生成並上傳成功！"),f()}catch(o){console.error("SFX Generation Error:",o),alert("❌ 音效生成失敗："+o.message)}finally{d(!1)}}}async function F(n,t){const e=localStorage.getItem("ELEVENLABS_API_KEY"),a=localStorage.getItem("AI_PROXY_URL");if(!e&&!a){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const l=i("theme-name")||"adventure game",r=window.prompt("【AI 音樂生成】請修正或輸入音樂描述：",`${t} for a ${l} themed board game, looped, high quality`);if(r){d(!0,"正在透過 AI 生成背景音樂...");try{let o;const s={prompt:r,music_length_ms:3e4};if(a?o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-music",payload:s})}):o=await fetch("https://api.elevenlabs.io/v1/music",{method:"POST",headers:{"xi-api-key":e,"Content-Type":"application/json"},body:JSON.stringify(s)}),!o.ok){const m=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(m.detail?.message||m.error||"生成失敗")}const p=await o.blob(),u=i("theme-id")||"temp",h=await w(p,`themes/${u}/music`,`bgm_${Date.now()}.mp3`);document.getElementById(n).value=h,alert("✅ 背景音樂生成並上傳成功！"),f()}catch(o){console.error("Music Generation Error:",o),alert("❌ 音樂生成失敗："+o.message)}finally{d(!1)}}}window.generateAIAvatars=O;window.generateAISFX=q;window.generateAIMusic=F;async function w(n,t,e){if(!n)return null;if(typeof n=="string"&&n.includes("firebasestorage.googleapis.com"))return n;let a;if(typeof n=="string"&&n.startsWith("http"))try{const s=await fetch(n);if(!s.ok)throw new Error("Fetch failed");a=await s.blob()}catch{return console.error("CORS or Fetch error:",n),n}else a=n;const l=e||(a.name?`${Date.now()}_${a.name}`:`${Date.now()}.png`);return await(await L.ref(`${t}/${l}`).put(a)).ref.getDownloadURL()}async function J(){if(g.length===0)return alert("地圖座標點至少要有一個！");if(prompt("【管理驗證】請輸入發佈代碼以繼續：")!=="ZBP"){alert("驗證錯誤，您沒有權限發佈至雲端。");return}d(!0,"正在準備雲端發佈...");try{const t=i("theme-id"),e=i("theme-name");let a=i("img-mapBg");const l=document.getElementById("map-upload").files[0];l?a=await w(l,`themes/${t}/images`,"map_bg.png"):a.startsWith("http")&&(a=await w(a,`themes/${t}/images`,"map_bg.png"));let r=i("img-guideNPC");r.startsWith("http")&&(r=await w(r,`themes/${t}/images`,"npc.png"));let o=i("img-loadingGif");o.startsWith("http")&&(o=await w(o,`themes/${t}/images`,"loading.gif"));const s={},p=document.querySelectorAll(".avatar-row");for(const m of p){const $=m.querySelector(".avatar-key").value.trim();let x=m.querySelector(".avatar-file").value.trim();$&&x&&(x.startsWith("http")&&(x=await w(x,`themes/${t}/avatars`,`${$}.png`)),s[$]=x)}const u={id:t,name:e,description:i("theme-desc"),gasUrl:i("gas-url"),coordinates:g,assets:{avatars:s,images:{guideNPC:r,loadingGif:o,mapBg:a},text:{welcome:i("txt-welcome"),idleChats:i("txt-idle").split(`
`).filter(m=>m.trim()),adj:i("txt-adj").split(`
`).filter(m=>m.trim()),noun:i("txt-noun").split(`
`).filter(m=>m.trim())},SFX:{bgm:i("sfx-bgm"),click:i("sfx-click"),dice:i("sfx-dice"),move:i("sfx-move"),success:i("sfx-success"),fail:i("sfx-fail"),complete:i("sfx-complete")}}};let h=JSON.parse(document.getElementById("output-questions-json").value);await v.ref(`themes/${t}`).set(u),await v.ref(`questions/${t}`).set(h),await v.ref(`available_themes/${t}`).set({id:t,name:e,description:i("theme-desc"),cover:a,isCloud:!0}),alert("✅ 雲端平台發佈成功！")}catch(t){console.error(t),alert("❌ 發佈失敗："+t.message)}finally{d(!1)}}async function S(){const n=document.getElementById("cloud-themes-modal"),t=document.getElementById("cloud-themes-list");n.classList.remove("hidden"),t.innerHTML='<div class="text-center py-10 text-gray-400">正在讀取雲端清單...</div>';try{const e=await v.ref("available_themes").get();if(!e.exists()){t.innerHTML='<div class="text-center py-10 text-gray-400">目前沒有雲端主題</div>';return}const a=e.val();t.innerHTML="",Object.values(a).forEach(l=>{const r=document.createElement("div");r.className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors cursor-pointer group",r.innerHTML=`
                        <div class="flex items-center gap-4">
                            <img src="${l.cover}" class="w-12 h-12 rounded-lg object-cover bg-gray-200">
                            <div>
                                <div class="font-bold text-indigo-900">${l.name}</div>
                                <div class="text-[10px] text-gray-500">${l.id}</div>
                            </div>
                        </div>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="loadThemeFromCloud('${l.id}')" class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">載入修改</button>
                            <button onclick="deleteThemeFromCloud('${l.id}', '${l.name}')" class="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100">刪除</button>
                        </div>
                    `,t.appendChild(r)})}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-400">讀取失敗：${e.message}</div>`}}async function D(n){d(!0,"正在從雲端載入資料...");try{const[t,e]=await Promise.all([v.ref(`themes/${n}`).get(),v.ref(`questions/${n}`).get()]);if(!t.exists())throw new Error("找不到該主題的設定資料");const a=t.val(),l=e.val();c("theme-id",a.id),c("theme-name",a.name),c("theme-desc",a.description),c("gas-url",a.gasUrl||""),c("img-mapBg",a.assets.images.mapBg),c("img-guideNPC",a.assets.images.guideNPC),c("img-loadingGif",a.assets.images.loadingGif),document.getElementById("map-preview").src=a.assets.images.mapBg,c("txt-welcome",a.assets.text.welcome),c("txt-idle",(a.assets.text.idleChats||[]).join(`
`)),c("txt-adj",(a.assets.text.adj||[]).join(`
`)),c("txt-noun",(a.assets.text.noun||[]).join(`
`)),g=(a.coordinates||[]).map(s=>({t:s.top||s.t,l:s.left||s.l})),E();const r=document.getElementById("avatar-list");r.innerHTML="";for(let s in a.assets.avatars||{})b(s,a.assets.avatars[s]);const o=a.assets.SFX||a.assets.sfx||{};c("sfx-bgm",o.bgm||o["sfx-bgm"]||""),c("sfx-click",o.click||o["sfx-click"]||""),c("sfx-dice",o.dice||o["sfx-dice"]||""),c("sfx-move",o.move||o["sfx-move"]||""),c("sfx-success",o.success||o["sfx-success"]||""),c("sfx-fail",o.fail||o["sfx-fail"]||""),c("sfx-complete",o.complete||o["sfx-complete"]||""),l&&(document.getElementById("output-questions-json").value=JSON.stringify(l,null,2)),document.getElementById("cloud-themes-modal").classList.add("hidden"),alert(`✅ 主題 「${a.name}」 載入成功！`),f()}catch(t){alert("❌ 載入失敗："+t.message)}finally{d(!1)}}async function K(n,t){if(prompt(`【管理授權】即將刪除主題「${t} (${n})」
此動作無法還原，請輸入管理代碼：`)!=="ZBP")return alert("驗證失敗，取消刪除。");if(confirm(`確定要徹底刪除主題「${t}」嗎？`)){d(!0,"正在刪除主題...");try{await Promise.all([v.ref(`themes/${n}`).remove(),v.ref(`questions/${n}`).remove(),v.ref(`available_themes/${n}`).remove()]),alert("✅ 主題已成功刪除。"),S()}catch(a){alert("❌ 刪除失敗："+a.message)}finally{d(!1)}}}window.openCloudThemesModal=S;window.loadThemeFromCloud=D;window.deleteThemeFromCloud=K;window.publishToCloud=J;window.aiCompleteInfo=T;window.aiGenerateChats=k;window.aiGenerateList=j;window.aiGenerateQuestions=M;window.aiGeneratePrompts=G;window.generateAIImage=R;window.addAvatarRow=b;window.saveAISettings=B;function d(n,t){y.overlay.classList.toggle("hidden",!n),t&&(y.loadingText.textContent=t)}window.showLoading=d;window.copyToClipboard=n=>{document.getElementById(n).select(),document.execCommand("copy"),alert("已複製到剪貼簿！")};function U(){_.forEach(n=>b(n.key,n.file)),document.getElementById("map-upload").addEventListener("change",n=>{const t=n.target.files[0];if(!t)return;const e=new FileReader;e.onload=a=>{y.mapImg.src=a.target.result,g=[],E(),f()},e.readAsDataURL(t)}),y.pointsLayer.addEventListener("click",n=>{if(g.length>=20)return alert("已達 20 個點的上限");const e=y.mapContainer.getBoundingClientRect(),a=((n.clientY-e.top)/e.height*100).toFixed(1)+"%",l=((n.clientX-e.left)/e.width*100).toFixed(1)+"%";g.push({t:a,l}),E(),f()}),y.undoBtn.onclick=()=>{g.pop(),E(),f()},document.querySelectorAll("input, textarea").forEach(n=>{n.addEventListener("input",f)}),document.getElementById("ai-api-key").value=localStorage.getItem("GEMINI_API_KEY")||"",document.getElementById("ai-eleven-key").value=localStorage.getItem("ELEVENLABS_API_KEY")||"",document.getElementById("ai-proxy-url").value=localStorage.getItem("AI_PROXY_URL")||"",f()}U();
