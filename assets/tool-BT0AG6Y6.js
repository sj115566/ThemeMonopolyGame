import{F as L}from"./global_config-Dy5ozYKv.js";firebase.initializeApp(L);const x=firebase.database(),P=firebase.storage(),N=firebase.auth();N.signInAnonymously().catch(a=>{console.error("Firebase Auth Error:",a)});let g=[];const y={mapContainer:document.getElementById("map-preview-container"),mapImg:document.getElementById("map-preview"),pointsLayer:document.getElementById("map-points-layer"),pointCountEl:document.getElementById("point-count"),undoBtn:document.getElementById("undo-point"),overlay:document.getElementById("loading-overlay"),loadingText:document.getElementById("loading-text")},k=[{key:"bear",file:"avatar_bear.png"},{key:"deer",file:"avatar_deer.png"},{key:"buffalo",file:"avatar_buffalo.png"},{key:"magpie",file:"avatar_magpie.png"}];function $(){y.pointsLayer.innerHTML="",g.forEach((a,e)=>{const t=document.createElement("div");t.className="map-point",t.style.top=a.t,t.style.left=a.l,t.textContent=e+1,y.pointsLayer.appendChild(t)}),y.pointCountEl.textContent=g.length,y.undoBtn.disabled=g.length===0}function A(a="",e=""){const t=document.createElement("div");t.className="flex gap-3 avatar-row p-3 bg-white/60 border border-indigo-50 rounded-2xl items-center shadow-sm hover:shadow-md transition-all relative group",t.innerHTML=`
                <div class="flex-shrink-0 relative">
                    <img class="w-12 h-12 rounded-xl border-2 border-white bg-gray-100 object-cover avatar-prev shadow-sm" src="${e.startsWith("http")?e:"img/"+e}">
                </div>
                <div class="flex-grow space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">ID 識別碼</span>
                        <input type="text" placeholder="例如: bear" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-key focus:ring-1 ring-indigo-300 outline-none" value="${a}">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">圖片路徑</span>
                        <input type="text" placeholder="網址或檔名" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-file focus:ring-1 ring-indigo-300 outline-none" value="${e}">
                    </div>
                </div>
                <button onclick="this.parentElement.remove(); generateAll();" 
                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm ml-1"
                    title="刪除此頭像">✖</button>
            `;const n=t.querySelector(".avatar-file"),r=t.querySelector(".avatar-prev");n.addEventListener("input",()=>{const i=n.value.trim();r.src=i.startsWith("http")?i:i?"img/"+i:"",f()}),t.querySelector(".avatar-key").addEventListener("input",f),document.getElementById("avatar-list").appendChild(t)}function C(){const a=document.getElementById("ai-api-key").value.trim(),e=document.getElementById("ai-eleven-key").value.trim(),t=document.getElementById("ai-proxy-url").value.trim();localStorage.setItem("GEMINI_API_KEY",a),localStorage.setItem("ELEVENLABS_API_KEY",e),localStorage.setItem("AI_PROXY_URL",t),document.getElementById("ai-settings-modal").classList.add("hidden"),alert("✅ AI 設定已儲存成功！")}window.saveAISettings=C;const v={"sfx-bgm":"backgroundMusic.mp3","sfx-click":"click1.mp3","sfx-dice":"dice1.mp3","sfx-move":"move1.mp3","sfx-success":"success.mp3","sfx-fail":"fail.mp3","sfx-complete":"complete.mp3","img-mapBg":"map_background.png","img-guideNPC":"guide_bear.png","img-loadingGif":"loading_bear.gif"};function l(a){return(document.getElementById(a)?.value||"").trim()}function I(a){return l(a)||v[a]||""}function c(a,e){const t=document.getElementById(a);t&&(t.value=e,f())}function S(a){return l(a).split(`
`).filter(e=>e.trim()).map(e=>`"${e.trim().replace(/"/g,'\\"')}"`).join(`,
            `)}function T(a){let e=l(a);if(!e&&v[a]&&(e=v[a]),!e)return null;const t=n=>n.startsWith("http")||n.startsWith("data:")?n:"sound/"+n;return e.includes(",")?`[${e.split(",").map(n=>`"${t(n.trim())}"`).join(", ")}]`:`["${t(e)}"]`}function f(){const a=l("theme-id")||"new_theme",e=(s,p)=>{const u=I(s),h=document.getElementById(p);h&&(h.src=u.startsWith("http")?u:u?"img/"+u:"")};e("img-mapBg","prev-mapBg"),e("img-guideNPC","prev-guideNPC"),e("img-loadingGif","prev-loadingGif");let t=[];document.querySelectorAll(".avatar-row").forEach(s=>{const p=s.querySelector(".avatar-key").value.trim(),u=s.querySelector(".avatar-file").value.trim();if(p&&u){const h=u.startsWith("http")?u:`img/${u}`;t.push(`        "${p}": "${h}"`)}});let n=g.map(s=>`        { top: "${s.t}", left: "${s.l}" }`).join(`,
`);if(g.length<20){const s=20-g.length;n+=(n?`,
`:"")+`        // ... (還需要點擊地圖增加 ${s} 個點才能開始遊戲)`}let r=[];["click","dice","move","success","fail","complete","bgm"].forEach(s=>{const p=T("sfx-"+(s==="bgm"?"bgm":s));p&&r.push(`        "${s}": ${p}`)});const i=`window.CURRENT_THEME_CONFIG = {
    GAS_URL: "${l("gas-url")}",
    BOARD_COORDINATES: [
${n}
    ],
    ASSETS: {
        AVATARS: {
${t.join(`,
`)}
        },
        IMAGES: {
            "guideNPC": "img/${I("img-guideNPC")}",
            "loadingGif": "img/${I("img-loadingGif")}",
            "mapBg": "img/${I("img-mapBg")}"
        },
        SFX: {
${r.join(`,
`)}
        },
        TEXT: {
            NPC_WELCOME: "${l("txt-welcome")||"歡迎來到新世界！"}",
            NPC_IDLE_CHATS: [
                ${S("txt-idle")}
            ],
            MII_ADJECTIVES: [
                ${S("txt-adj")}
            ],
            MII_NOUNS: [
                ${S("txt-noun")}
            ]
        }
    }
};`,o=`    {
        id: "${a}",
        name: "${l("theme-name")}",
        description: "${l("theme-desc").replace(/\n/g,"\\n")}",
        cover: "img/${l("img-mapBg")}"
    },`;document.getElementById("output-theme-js").value=i,document.getElementById("output-list-js").value=o}async function b(a){const e=localStorage.getItem("GEMINI_API_KEY"),t=localStorage.getItem("AI_PROXY_URL");if(!e&&!t)return alert("請先設定 Gemini API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden"),null;d(!0,"AI 正在發想內容...");try{let n;const r={contents:[{parts:[{text:a+` 

請務必僅以純 JSON 格式回答，不要有其他解釋文字。`}]}]};if(t)n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"gemini",payload:r})});else{const s=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${e}`;n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}const i=await n.json();if(!n.ok)throw new Error(i.error?.message||i.error||`API Error: ${n.status}`);if(!i.candidates||i.candidates.length===0){const s=i.promptFeedback?.blockReason||"找不到候選答案 (可能是被安全過濾器阻擋)";throw new Error(s)}let o=i.candidates[0]?.content?.parts?.[0]?.text;if(!o)throw new Error("API 回傳內容結構不正確");o=o.replace(/```json\n?/,"").replace(/\n?```/,"").trim();try{return JSON.parse(o)}catch{throw console.error("JSON Parse Error. Content:",o),new Error("AI 回傳的格式不符合 JSON，請再試一次。")}}catch(n){return console.error("AI Call Failed:",n),alert(`🤖 AI 呼叫失敗：
`+n.message),null}finally{d(!1)}}async function j(){const e=`你是一個遊戲設計師。請針對主題「${l("theme-name")||l("theme-id")}」提供以下 JSON 資訊：
            {
                "name": "吸引人的主題名稱(含 Emoji)",
                "description": "簡短的主題介紹(約 50 字)",
                "welcome": "NPC 歡迎詞",
                "id": "適用的英文小寫 ID"
            } 
            請繁體中文輸出。`,t=await b(e);t&&(c("theme-name",t.name),c("theme-desc",t.description),c("theme-id",t.id),c("txt-welcome",t.welcome))}async function M(){const e=`針對遊戲主題「${l("theme-name")}」，生成 10 句 NPC 的閒聊對談(每句15字以內)，
            輸出格式如： { "chats": ["第一句", "第二句", ...] } 
            繁體中文。`,t=await b(e);t&&c("txt-idle",t.chats.join(`
`))}async function R(a){const t=`針對遊戲主題「${l("theme-name")}」，生成 15 個適合用來隨機組合成角色暱稱的 ${a==="adj"?"形容詞":"名詞"}。
            輸出格式： { "list": ["詞1", "詞2", ...] }`,n=await b(t);n&&c("txt-"+a,n.list.join(`
`))}async function G(){const a=g.length;if(a===0)return alert("請先在上方地圖點擊標註至少一個地點，AI 才能為您取名並製作題目。");const e=l("theme-name"),t=document.getElementById("ai-questions-topic").value.trim(),n=t?`
特別針對以下教學內容或重點生成：
${t}
`:"",r=`你是一個互動式大富翁遊戲設計專家。請針對主題「${e}」${n}，生成 ${a} 個地點與對應的四選一單選題。
            輸出格式必須是純 JSON，結構如下：
            {
                "map": [
                    {"city": "地點名稱1", "questionId": "q1", "isMustHit": false},
                    ... (共 ${a} 個地點)
                ],
                "questions": {
                    "q1": {"text": "題目內容", "options": ["選項1", "選項2", "選項3", "選項4"], "answer": 1},
                    ... (共 ${a} 個題目, answer 是 1-4 的數字)
                }
            }
            請確保內容豐富、有趣且符合繁體中文習慣。`,i=await b(r);i&&(document.getElementById("output-questions-json").value=JSON.stringify(i,null,2),alert("遊戲題目集生成成功！已套用於本地與雲端發佈區。"))}async function O(a,e,t){const n=document.getElementById(a).value.trim();if(!n)return alert("請先生成 AI 提示詞！");d(!0,"正在繪製圖像 (Pollinations.ai)...");try{const r=Math.floor(Math.random()*1e4),i=`https://image.pollinations.ai/prompt/${encodeURIComponent(n)}?width=1024&height=1024&seed=${r}&nologo=true`,o=new Image;o.crossOrigin="anonymous",o.onload=()=>{e&&(document.getElementById(e).src=i),t&&(document.getElementById(t).value=i),d(!1),f()},o.onerror=()=>{throw new Error("圖片載入失敗，請換個提示詞再試一次。")},o.src=i}catch(r){alert("生圖失敗: "+r.message),d(!1)}}async function F(){const e=`你是一個資深遊戲美術指導。針對大富翁遊戲主題「${l("theme-name")}」，生成以下資源的 AI 繪圖/影片/音樂提示詞 (Prompts)：
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
            }`,t=await b(e);t&&(document.getElementById("prompt-map").value=t.map,document.getElementById("prompt-npc").value=t.npc,document.getElementById("prompt-loading").value=t.loading,document.getElementById("prompt-avatar").value=t.avatar,window.AI_AVATAR_PROMPTS=t.avatars,document.getElementById("ai-prompts-output").innerHTML=`
                    <div class="mb-4 text-purple-900 font-extrabold border-b border-purple-200 pb-2 text-base">✨ AI 美術提案內容</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Map Background</strong><p class="text-xs mt-1 italic">"${t.map}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">NPC Guide</strong><p class="text-xs mt-1 italic">"${t.npc}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Loading Anim</strong><p class="text-xs mt-1 italic">"${t.loading}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Music Tags</strong><p class="text-xs mt-1 italic">"${t.bgm}"</p></div>
                    </div>
                `,document.getElementById("ai-prompts-output").classList.remove("hidden"),document.getElementById("prompts-control").classList.remove("hidden"),document.getElementById("btn-gen-map").disabled=!1,document.getElementById("btn-gen-map").title="根據目前的地圖提示詞生成背景",alert("AI 提示詞生成完畢！您可以繼續下一步生成地圖，或生成 NPC/頭像。"))}async function q(){const a=document.getElementById("prompt-avatar").value,e=window.AI_AVATAR_PROMPTS||[];if(!a||e.length===0)return alert("請先生成 AI 提示詞！");d(!0,"正在生成角色頭像組...");try{const t=document.getElementById("avatar-list"),n=t.querySelectorAll(".avatar-row").length;for(let r=0;r<e.length;r++){const i=`${e[r]}, ${a}`,o=Math.floor(Math.random()*1e5),s=`https://image.pollinations.ai/prompt/${encodeURIComponent(i)}?width=512&height=512&seed=${o}&nologo=true`,p=`char_${n+r+1}`;A(p,s)}alert(`✅ 新增了 ${e.length} 位角色！目前共有 ${t.querySelectorAll(".avatar-row").length} 位。`),f()}catch(t){alert("頭像生成失敗: "+t.message)}finally{d(!1)}}async function J(a,e){const t=localStorage.getItem("ELEVENLABS_API_KEY"),n=localStorage.getItem("AI_PROXY_URL");if(!t&&!n){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const r=l("theme-name")||"fantasy game",i=window.prompt("【AI 音效生成】請修正或輸入提示詞：",`A ${e} for a ${r} themed game`);if(i){d(!0,"正在透過 AI 生成音效...");try{let o;const s={text:i,duration_seconds:5,prompt_influence:.3};if(n?o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-sfx",payload:s})}):o=await fetch("https://api.elevenlabs.io/v1/sound-generation",{method:"POST",headers:{"xi-api-key":t,"Content-Type":"application/json"},body:JSON.stringify(s)}),!o.ok){const m=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(m.detail?.message||m.error||"生成失敗")}const p=await o.blob(),u=l("theme-id")||"temp",h=await w(p,`themes/${u}/sfx`,`${a}_${Date.now()}.mp3`);document.getElementById(a).value=h,alert("✅ 音效生成並上傳成功！"),f()}catch(o){console.error("SFX Generation Error:",o),alert("❌ 音效生成失敗："+o.message)}finally{d(!1)}}}async function D(a,e){const t=localStorage.getItem("ELEVENLABS_API_KEY"),n=localStorage.getItem("AI_PROXY_URL");if(!t&&!n){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const r=l("theme-name")||"adventure game",i=window.prompt("【AI 音樂生成】請修正或輸入音樂描述：",`${e} for a ${r} themed board game, looped, high quality`);if(i){d(!0,"正在透過 AI 生成背景音樂...");try{let o;const s={prompt:i,music_length_ms:3e4};if(n?o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-music",payload:s})}):o=await fetch("https://api.elevenlabs.io/v1/music",{method:"POST",headers:{"xi-api-key":t,"Content-Type":"application/json"},body:JSON.stringify(s)}),!o.ok){const m=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(m.detail?.message||m.error||"生成失敗")}const p=await o.blob(),u=l("theme-id")||"temp",h=await w(p,`themes/${u}/music`,`bgm_${Date.now()}.mp3`);document.getElementById(a).value=h,alert("✅ 背景音樂生成並上傳成功！"),f()}catch(o){console.error("Music Generation Error:",o),alert("❌ 音樂生成失敗："+o.message)}finally{d(!1)}}}window.generateAIAvatars=q;window.generateAISFX=J;window.generateAIMusic=D;async function w(a,e,t){if(!a)return null;if(typeof a=="string"&&a.includes("firebasestorage.googleapis.com"))return a;let n;if(typeof a=="string"&&a.startsWith("http"))try{const s=await fetch(a);if(!s.ok)throw new Error("Fetch failed");n=await s.blob()}catch{return console.error("CORS or Fetch error:",a),a}else n=a;const r=t||(n.name?`${Date.now()}_${n.name}`:`${Date.now()}.png`);return await(await P.ref(`${e}/${r}`).put(n)).ref.getDownloadURL()}async function U(){if(g.length===0)return alert("地圖座標點至少要有一個！");if(prompt("【管理驗證】請輸入發佈代碼以繼續：")!=="ZBP"){alert("驗證錯誤，您沒有權限發佈至雲端。");return}d(!0,"正在準備雲端發佈...");try{const e=l("theme-id"),t=l("theme-name");let n=I("img-mapBg");const r=document.getElementById("map-upload").files[0];r?n=await w(r,`themes/${e}/images`,"map_bg.png"):n.startsWith("http")&&(n=await w(n,`themes/${e}/images`,"map_bg.png"));let i=I("img-guideNPC");i.startsWith("http")&&(i=await w(i,`themes/${e}/images`,"npc.png"));let o=I("img-loadingGif");o.startsWith("http")&&(o=await w(o,`themes/${e}/images`,"loading.gif"));const s={},p=document.querySelectorAll(".avatar-row");for(const m of p){const B=m.querySelector(".avatar-key").value.trim();let E=m.querySelector(".avatar-file").value.trim();B&&E&&(E.startsWith("http")&&(E=await w(E,`themes/${e}/avatars`,`${B}.png`)),s[B]=E)}const u={id:e,name:t,description:l("theme-desc"),gasUrl:l("gas-url"),coordinates:g,assets:{avatars:s,images:{guideNPC:i,loadingGif:o,mapBg:n},text:{welcome:l("txt-welcome"),idleChats:l("txt-idle").split(`
`).filter(m=>m.trim()),adj:l("txt-adj").split(`
`).filter(m=>m.trim()),noun:l("txt-noun").split(`
`).filter(m=>m.trim())},SFX:{bgm:l("sfx-bgm")||v["sfx-bgm"],click:l("sfx-click")||v["sfx-click"],dice:l("sfx-dice")||v["sfx-dice"],move:l("sfx-move")||v["sfx-move"],success:l("sfx-success")||v["sfx-success"],fail:l("sfx-fail")||v["sfx-fail"],complete:l("sfx-complete")||v["sfx-complete"]}}};let h=JSON.parse(document.getElementById("output-questions-json").value);await x.ref(`themes/${e}`).set(u),await x.ref(`questions/${e}`).set(h),await x.ref(`available_themes/${e}`).set({id:e,name:t,description:l("theme-desc"),cover:n,isCloud:!0}),alert("✅ 雲端平台發佈成功！")}catch(e){console.error(e),alert("❌ 發佈失敗："+e.message)}finally{d(!1)}}async function _(){const a=document.getElementById("cloud-themes-modal"),e=document.getElementById("cloud-themes-list");a.classList.remove("hidden"),e.innerHTML='<div class="text-center py-10 text-gray-400">正在讀取雲端清單...</div>';try{const t=await x.ref("available_themes").get();if(!t.exists()){e.innerHTML='<div class="text-center py-10 text-gray-400">目前沒有雲端主題</div>';return}const n=t.val();e.innerHTML="",Object.values(n).forEach(r=>{const i=document.createElement("div");i.className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors cursor-pointer group",i.innerHTML=`
                        <div class="flex items-center gap-4">
                            <img src="${r.cover}" class="w-12 h-12 rounded-lg object-cover bg-gray-200">
                            <div>
                                <div class="font-bold text-indigo-900">${r.name}</div>
                                <div class="text-[10px] text-gray-500">${r.id}</div>
                            </div>
                        </div>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="loadThemeFromCloud('${r.id}')" class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">載入修改</button>
                            <button onclick="deleteThemeFromCloud('${r.id}', '${r.name}')" class="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100">刪除</button>
                        </div>
                    `,e.appendChild(i)})}catch(t){e.innerHTML=`<div class="text-center py-10 text-red-400">讀取失敗：${t.message}</div>`}}async function W(a){d(!0,"正在從雲端載入資料...");try{const[e,t]=await Promise.all([x.ref(`themes/${a}`).get(),x.ref(`questions/${a}`).get()]);if(!e.exists())throw new Error("找不到該主題的設定資料");const n=e.val(),r=t.val();c("theme-id",n.id),c("theme-name",n.name),c("theme-desc",n.description),c("gas-url",n.gasUrl||""),c("img-mapBg",n.assets.images.mapBg),c("img-guideNPC",n.assets.images.guideNPC),c("img-loadingGif",n.assets.images.loadingGif),document.getElementById("map-preview").src=n.assets.images.mapBg,c("txt-welcome",n.assets.text.welcome),c("txt-idle",(n.assets.text.idleChats||[]).join(`
`)),c("txt-adj",(n.assets.text.adj||[]).join(`
`)),c("txt-noun",(n.assets.text.noun||[]).join(`
`)),g=(n.coordinates||[]).map(s=>({t:s.top||s.t,l:s.left||s.l})),$();const i=document.getElementById("avatar-list");i.innerHTML="";for(let s in n.assets.avatars||{})A(s,n.assets.avatars[s]);const o=n.assets.SFX||n.assets.sfx||{};c("sfx-bgm",o.bgm||o["sfx-bgm"]||""),c("sfx-click",o.click||o["sfx-click"]||""),c("sfx-dice",o.dice||o["sfx-dice"]||""),c("sfx-move",o.move||o["sfx-move"]||""),c("sfx-success",o.success||o["sfx-success"]||""),c("sfx-fail",o.fail||o["sfx-fail"]||""),c("sfx-complete",o.complete||o["sfx-complete"]||""),r&&(document.getElementById("output-questions-json").value=JSON.stringify(r,null,2)),document.getElementById("cloud-themes-modal").classList.add("hidden"),alert(`✅ 主題 「${n.name}」 載入成功！`),f()}catch(e){alert("❌ 載入失敗："+e.message)}finally{d(!1)}}async function K(a,e){if(prompt(`【管理授權】即將刪除主題「${e} (${a})」
此動作無法還原，請輸入管理代碼：`)!=="ZBP")return alert("驗證失敗，取消刪除。");if(confirm(`確定要徹底刪除主題「${e}」嗎？`)){d(!0,"正在刪除主題...");try{await Promise.all([x.ref(`themes/${a}`).remove(),x.ref(`questions/${a}`).remove(),x.ref(`available_themes/${a}`).remove()]),alert("✅ 主題已成功刪除。"),_()}catch(n){alert("❌ 刪除失敗："+n.message)}finally{d(!1)}}}window.openCloudThemesModal=_;window.loadThemeFromCloud=W;window.deleteThemeFromCloud=K;window.publishToCloud=U;window.aiCompleteInfo=j;window.aiGenerateChats=M;window.aiGenerateList=R;window.aiGenerateQuestions=G;window.aiGeneratePrompts=F;window.generateAIImage=O;window.addAvatarRow=A;window.saveAISettings=C;function d(a,e){y.overlay.classList.toggle("hidden",!a),e&&(y.loadingText.textContent=e)}window.showLoading=d;window.copyToClipboard=a=>{document.getElementById(a).select(),document.execCommand("copy"),alert("已複製到剪貼簿！")};function X(){k.forEach(a=>A(a.key,a.file)),document.getElementById("map-upload").addEventListener("change",a=>{const e=a.target.files[0];if(!e)return;const t=new FileReader;t.onload=n=>{y.mapImg.src=n.target.result,g=[],$(),f()},t.readAsDataURL(e)}),y.pointsLayer.addEventListener("click",a=>{if(g.length>=20)return alert("已達 20 個點的上限");const t=y.mapContainer.getBoundingClientRect(),n=((a.clientY-t.top)/t.height*100).toFixed(1)+"%",r=((a.clientX-t.left)/t.width*100).toFixed(1)+"%";g.push({t:n,l:r}),$(),f()}),y.undoBtn.onclick=()=>{g.pop(),$(),f()},document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",f)}),document.getElementById("ai-api-key").value=localStorage.getItem("GEMINI_API_KEY")||"",document.getElementById("ai-eleven-key").value=localStorage.getItem("ELEVENLABS_API_KEY")||"",document.getElementById("ai-proxy-url").value=localStorage.getItem("AI_PROXY_URL")||"",f()}X();
