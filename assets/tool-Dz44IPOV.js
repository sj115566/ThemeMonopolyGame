import{F as C}from"./global_config-BC-EMzQB.js";firebase.initializeApp(C);const v=firebase.database(),L=firebase.storage(),P=firebase.auth();P.signInAnonymously().catch(a=>{console.error("Firebase Auth Error:",a)});let u=[];const h={mapContainer:document.getElementById("map-preview-container"),mapImg:document.getElementById("map-preview"),pointsLayer:document.getElementById("map-points-layer"),pointCountEl:document.getElementById("point-count"),undoBtn:document.getElementById("undo-point"),overlay:document.getElementById("loading-overlay"),loadingText:document.getElementById("loading-text")},N=[{key:"bear",file:"avatar_bear.png"},{key:"deer",file:"avatar_deer.png"},{key:"buffalo",file:"avatar_buffalo.png"},{key:"magpie",file:"avatar_magpie.png"}];function I(){h.pointsLayer.innerHTML="",u.forEach((a,t)=>{const e=document.createElement("div");e.className="map-point",e.style.top=a.t,e.style.left=a.l,e.textContent=t+1,h.pointsLayer.appendChild(e)}),h.pointCountEl.textContent=u.length,h.undoBtn.disabled=u.length===0}function b(a="",t=""){const e=document.createElement("div");e.className="flex gap-3 avatar-row p-3 bg-white/60 border border-indigo-50 rounded-2xl items-center shadow-sm hover:shadow-md transition-all relative group",e.innerHTML=`
                <div class="flex-shrink-0 relative">
                    <img class="w-12 h-12 rounded-xl border-2 border-white bg-gray-100 object-cover avatar-prev shadow-sm" src="${t.startsWith("http")?t:"img/"+t}">
                </div>
                <div class="flex-grow space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">ID 識別碼</span>
                        <input type="text" placeholder="例如: bear" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-key focus:ring-1 ring-indigo-300 outline-none" value="${a}">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">圖片路徑</span>
                        <input type="text" placeholder="網址或檔名" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-file focus:ring-1 ring-indigo-300 outline-none" value="${t}">
                    </div>
                </div>
                <button onclick="this.parentElement.remove(); generateAll();" 
                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm ml-1"
                    title="刪除此頭像">✖</button>
            `;const n=e.querySelector(".avatar-file"),o=e.querySelector(".avatar-prev");n.addEventListener("input",()=>{const s=n.value.trim();o.src=s.startsWith("http")?s:s?"img/"+s:"",g()}),e.querySelector(".avatar-key").addEventListener("input",g),document.getElementById("avatar-list").appendChild(e)}function B(){const a=document.getElementById("ai-api-key").value.trim(),t=document.getElementById("ai-eleven-key").value.trim();localStorage.setItem("GEMINI_API_KEY",a),localStorage.setItem("ELEVENLABS_API_KEY",t),document.getElementById("ai-settings-modal").classList.add("hidden"),alert("✅ AI 設定已儲存成功！")}window.saveAISettings=B;function i(a){return(document.getElementById(a)?.value||"").trim()}function c(a,t){const e=document.getElementById(a);e&&(e.value=t,g())}function A(a){return i(a).split(`
`).filter(t=>t.trim()).map(t=>`"${t.trim().replace(/"/g,'\\"')}"`).join(`,
            `)}function _(a){const t=i(a);if(!t)return null;const e=n=>n.startsWith("http")||n.startsWith("data:")?n:"sound/"+n;return t.includes(",")?`[${t.split(",").map(n=>`"${e(n.trim())}"`).join(", ")}]`:`["${e(t)}"]`}function g(){const a=i("theme-id")||"new_theme",t=(l,m)=>{const p=i(l),f=document.getElementById(m);f&&(f.src=p.startsWith("http")?p:p?"img/"+p:"")};t("img-mapBg","prev-mapBg"),t("img-guideNPC","prev-guideNPC"),t("img-loadingGif","prev-loadingGif");let e=[];document.querySelectorAll(".avatar-row").forEach(l=>{const m=l.querySelector(".avatar-key").value.trim(),p=l.querySelector(".avatar-file").value.trim();if(m&&p){const f=p.startsWith("http")?p:`img/${p}`;e.push(`        "${m}": "${f}"`)}});let n=u.map(l=>`        { top: "${l.t}", left: "${l.l}" }`).join(`,
`);if(u.length<20){const l=20-u.length;n+=(n?`,
`:"")+`        // ... (還需要點擊地圖增加 ${l} 個點才能開始遊戲)`}let o=[];["click","dice","move","success","fail","complete","bgm"].forEach(l=>{const m=_("sfx-"+(l==="bgm"?"bgm":l));m&&o.push(`        "${l}": ${m}`)});const s=`window.CURRENT_THEME_CONFIG = {
    GAS_URL: "${i("gas-url")}",
    BOARD_COORDINATES: [
${n}
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
${o.join(`,
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
};`,r=`    {
        id: "${a}",
        name: "${i("theme-name")}",
        description: "${i("theme-desc").replace(/\n/g,"\\n")}",
        cover: "img/${i("img-mapBg")}"
    },`;document.getElementById("output-theme-js").value=s,document.getElementById("output-list-js").value=r}async function E(a){const t=localStorage.getItem("GEMINI_API_KEY");if(!t)return alert("請先設定 Gemini API Key！"),document.getElementById("ai-settings-modal").classList.remove("hidden"),null;d(!0,"AI 正在發想內容...");try{const e=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${t}`,n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:a+` 

請務必僅以純 JSON 格式回答，不要有其他解釋文字。`}]}]})}),o=await n.json();if(!n.ok)throw new Error(o.error?.message||`API Error: ${n.status}`);if(!o.candidates||o.candidates.length===0){const r=o.promptFeedback?.blockReason||"找不到候選答案 (可能是被安全過濾器阻擋)";throw new Error(r)}let s=o.candidates[0]?.content?.parts?.[0]?.text;if(!s)throw new Error("API 回傳內容結構不正確");s=s.replace(/```json\n?/,"").replace(/\n?```/,"").trim();try{return JSON.parse(s)}catch{throw console.error("JSON Parse Error. Content:",s),new Error("AI 回傳的格式不符合 JSON，請再試一次。")}}catch(e){return console.error("AI Call Failed:",e),alert(`🤖 AI 呼叫失敗：
`+e.message),null}finally{d(!1)}}async function T(){const t=`你是一個遊戲設計師。請針對主題「${i("theme-name")||i("theme-id")}」提供以下 JSON 資訊：
            {
                "name": "吸引人的主題名稱(含 Emoji)",
                "description": "簡短的主題介紹(約 50 字)",
                "welcome": "NPC 歡迎詞",
                "id": "適用的英文小寫 ID"
            } 
            請繁體中文輸出。`,e=await E(t);e&&(c("theme-name",e.name),c("theme-desc",e.description),c("theme-id",e.id),c("txt-welcome",e.welcome))}async function k(){const t=`針對遊戲主題「${i("theme-name")}」，生成 10 句 NPC 的閒聊對談(每句15字以內)，
            輸出格式如： { "chats": ["第一句", "第二句", ...] } 
            繁體中文。`,e=await E(t);e&&c("txt-idle",e.chats.join(`
`))}async function M(a){const e=`針對遊戲主題「${i("theme-name")}」，生成 15 個適合用來隨機組合成角色暱稱的 ${a==="adj"?"形容詞":"名詞"}。
            輸出格式： { "list": ["詞1", "詞2", ...] }`,n=await E(e);n&&c("txt-"+a,n.list.join(`
`))}async function j(){const a=u.length;if(a===0)return alert("請先在上方地圖點擊標註至少一個地點，AI 才能為您取名並製作題目。");const t=i("theme-name"),e=document.getElementById("ai-questions-topic").value.trim(),n=e?`
特別針對以下教學內容或重點生成：
${e}
`:"",o=`你是一個互動式大富翁遊戲設計專家。請針對主題「${t}」${n}，生成 ${a} 個地點與對應的四選一單選題。
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
            請確保內容豐富、有趣且符合繁體中文習慣。`,s=await E(o);s&&(document.getElementById("output-questions-json").value=JSON.stringify(s,null,2),alert("遊戲題目集生成成功！已套用於本地與雲端發佈區。"))}async function G(a,t,e){const n=document.getElementById(a).value.trim();if(!n)return alert("請先生成 AI 提示詞！");d(!0,"正在繪製圖像 (Pollinations.ai)...");try{const o=Math.floor(Math.random()*1e4),s=`https://image.pollinations.ai/prompt/${encodeURIComponent(n)}?width=1024&height=1024&seed=${o}&nologo=true`,r=new Image;r.crossOrigin="anonymous",r.onload=()=>{t&&(document.getElementById(t).src=s),e&&(document.getElementById(e).value=s),d(!1),g()},r.onerror=()=>{throw new Error("圖片載入失敗，請換個提示詞再試一次。")},r.src=s}catch(o){alert("生圖失敗: "+o.message),d(!1)}}async function q(){const t=`你是一個資深遊戲美術指導。針對大富翁遊戲主題「${i("theme-name")}」，生成以下資源的 AI 繪圖/影片/音樂提示詞 (Prompts)：
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
            }`,e=await E(t);e&&(document.getElementById("prompt-map").value=e.map,document.getElementById("prompt-npc").value=e.npc,document.getElementById("prompt-loading").value=e.loading,document.getElementById("prompt-avatar").value=e.avatar,window.AI_AVATAR_PROMPTS=e.avatars,document.getElementById("ai-prompts-output").innerHTML=`
                    <div class="mb-4 text-purple-900 font-extrabold border-b border-purple-200 pb-2 text-base">✨ AI 美術提案內容</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Map Background</strong><p class="text-xs mt-1 italic">"${e.map}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">NPC Guide</strong><p class="text-xs mt-1 italic">"${e.npc}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Loading Anim</strong><p class="text-xs mt-1 italic">"${e.loading}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Music Tags</strong><p class="text-xs mt-1 italic">"${e.bgm}"</p></div>
                    </div>
                `,document.getElementById("ai-prompts-output").classList.remove("hidden"),document.getElementById("prompts-control").classList.remove("hidden"),document.getElementById("btn-gen-map").disabled=!1,document.getElementById("btn-gen-map").title="根據目前的地圖提示詞生成背景",alert("AI 提示詞生成完畢！您可以繼續下一步生成地圖，或生成 NPC/頭像。"))}async function F(){const a=document.getElementById("prompt-avatar").value,t=window.AI_AVATAR_PROMPTS||[];if(!a||t.length===0)return alert("請先生成 AI 提示詞！");d(!0,"正在生成角色頭像組...");try{const e=document.getElementById("avatar-list"),n=e.querySelectorAll(".avatar-row").length;for(let o=0;o<t.length;o++){const s=`${t[o]}, ${a}`,r=Math.floor(Math.random()*1e5),l=`https://image.pollinations.ai/prompt/${encodeURIComponent(s)}?width=512&height=512&seed=${r}&nologo=true`,m=`char_${n+o+1}`;b(m,l)}alert(`✅ 新增了 ${t.length} 位角色！目前共有 ${e.querySelectorAll(".avatar-row").length} 位。`),g()}catch(e){alert("頭像生成失敗: "+e.message)}finally{d(!1)}}async function R(a,t){const e=localStorage.getItem("ELEVENLABS_API_KEY");if(!e){alert("請先設定 ElevenLabs API Key！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const n=i("theme-name")||"fantasy game",o=window.prompt("【AI 音效生成】請修正或輸入提示詞：",`A ${t} for a ${n} themed game`);if(o){d(!0,"正在透過 ElevenLabs 生成音效...");try{const r=await fetch("https://api.elevenlabs.io/v1/sound-generation",{method:"POST",headers:{"xi-api-key":e,"Content-Type":"application/json"},body:JSON.stringify({text:o,duration_seconds:5,prompt_influence:.3})});if(!r.ok){const f=await r.json();throw new Error(f.detail?.message||"生成失敗")}const l=await r.blob(),m=i("theme-id")||"temp",p=await w(l,`themes/${m}/sfx`,`${a}_${Date.now()}.mp3`);document.getElementById(a).value=p,alert("✅ 音效生成並上傳成功！"),g()}catch(s){console.error("SFX Generation Error:",s),alert("❌ 音效生成失敗："+s.message)}finally{d(!1)}}}async function O(a,t){const e=localStorage.getItem("ELEVENLABS_API_KEY");if(!e){alert("請先設定 ElevenLabs API Key！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const n=i("theme-name")||"adventure game",o=window.prompt("【AI 音樂生成】請修正或輸入音樂描述：",`${t} for a ${n} themed board game, looped, high quality`);if(o){d(!0,"正在透過 ElevenLabs 生成背景音樂...");try{const r=await fetch("https://api.elevenlabs.io/v1/music",{method:"POST",headers:{"xi-api-key":e,"Content-Type":"application/json"},body:JSON.stringify({prompt:o,music_length_ms:3e4})});if(!r.ok){const f=await r.json();throw new Error(f.detail?.message||"生成失敗")}const l=await r.blob(),m=i("theme-id")||"temp",p=await w(l,`themes/${m}/music`,`bgm_${Date.now()}.mp3`);document.getElementById(a).value=p,alert("✅ 背景音樂生成並上傳成功！"),g()}catch(s){console.error("Music Generation Error:",s),alert("❌ 音樂生成失敗："+s.message)}finally{d(!1)}}}window.generateAIAvatars=F;window.generateAISFX=R;window.generateAIMusic=O;async function w(a,t,e){if(!a)return null;if(typeof a=="string"&&a.includes("firebasestorage.googleapis.com"))return a;let n;if(typeof a=="string"&&a.startsWith("http"))try{const l=await fetch(a);if(!l.ok)throw new Error("Fetch failed");n=await l.blob()}catch{return console.error("CORS or Fetch error:",a),a}else n=a;const o=e||(n.name?`${Date.now()}_${n.name}`:`${Date.now()}.png`);return await(await L.ref(`${t}/${o}`).put(n)).ref.getDownloadURL()}async function D(){if(u.length===0)return alert("地圖座標點至少要有一個！");if(prompt("【管理驗證】請輸入發佈代碼以繼續：")!=="ZBP"){alert("驗證錯誤，您沒有權限發佈至雲端。");return}d(!0,"正在準備雲端發佈...");try{const t=i("theme-id"),e=i("theme-name");let n=i("img-mapBg");const o=document.getElementById("map-upload").files[0];o?n=await w(o,`themes/${t}/images`,"map_bg.png"):n.startsWith("http")&&(n=await w(n,`themes/${t}/images`,"map_bg.png"));let s=i("img-guideNPC");s.startsWith("http")&&(s=await w(s,`themes/${t}/images`,"npc.png"));let r=i("img-loadingGif");r.startsWith("http")&&(r=await w(r,`themes/${t}/images`,"loading.gif"));const l={},m=document.querySelectorAll(".avatar-row");for(const y of m){const $=y.querySelector(".avatar-key").value.trim();let x=y.querySelector(".avatar-file").value.trim();$&&x&&(x.startsWith("http")&&(x=await w(x,`themes/${t}/avatars`,`${$}.png`)),l[$]=x)}const p={id:t,name:e,description:i("theme-desc"),gasUrl:i("gas-url"),coordinates:u,assets:{avatars:l,images:{guideNPC:s,loadingGif:r,mapBg:n},text:{welcome:i("txt-welcome"),idleChats:i("txt-idle").split(`
`).filter(y=>y.trim()),adj:i("txt-adj").split(`
`).filter(y=>y.trim()),noun:i("txt-noun").split(`
`).filter(y=>y.trim())},SFX:{bgm:i("sfx-bgm"),click:i("sfx-click"),dice:i("sfx-dice"),move:i("sfx-move"),success:i("sfx-success"),fail:i("sfx-fail"),complete:i("sfx-complete")}}};let f=JSON.parse(document.getElementById("output-questions-json").value);await v.ref(`themes/${t}`).set(p),await v.ref(`questions/${t}`).set(f),await v.ref(`available_themes/${t}`).set({id:t,name:e,description:i("theme-desc"),cover:n,isCloud:!0}),alert("✅ 雲端平台發佈成功！")}catch(t){console.error(t),alert("❌ 發佈失敗："+t.message)}finally{d(!1)}}async function S(){const a=document.getElementById("cloud-themes-modal"),t=document.getElementById("cloud-themes-list");a.classList.remove("hidden"),t.innerHTML='<div class="text-center py-10 text-gray-400">正在讀取雲端清單...</div>';try{const e=await v.ref("available_themes").get();if(!e.exists()){t.innerHTML='<div class="text-center py-10 text-gray-400">目前沒有雲端主題</div>';return}const n=e.val();t.innerHTML="",Object.values(n).forEach(o=>{const s=document.createElement("div");s.className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors cursor-pointer group",s.innerHTML=`
                        <div class="flex items-center gap-4">
                            <img src="${o.cover}" class="w-12 h-12 rounded-lg object-cover bg-gray-200">
                            <div>
                                <div class="font-bold text-indigo-900">${o.name}</div>
                                <div class="text-[10px] text-gray-500">${o.id}</div>
                            </div>
                        </div>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onclick="loadThemeFromCloud('${o.id}')" class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold">載入修改</button>
                            <button onclick="deleteThemeFromCloud('${o.id}', '${o.name}')" class="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100">刪除</button>
                        </div>
                    `,t.appendChild(s)})}catch(e){t.innerHTML=`<div class="text-center py-10 text-red-400">讀取失敗：${e.message}</div>`}}async function J(a){d(!0,"正在從雲端載入資料...");try{const[t,e]=await Promise.all([v.ref(`themes/${a}`).get(),v.ref(`questions/${a}`).get()]);if(!t.exists())throw new Error("找不到該主題的設定資料");const n=t.val(),o=e.val();c("theme-id",n.id),c("theme-name",n.name),c("theme-desc",n.description),c("gas-url",n.gasUrl||""),c("img-mapBg",n.assets.images.mapBg),c("img-guideNPC",n.assets.images.guideNPC),c("img-loadingGif",n.assets.images.loadingGif),document.getElementById("map-preview").src=n.assets.images.mapBg,c("txt-welcome",n.assets.text.welcome),c("txt-idle",(n.assets.text.idleChats||[]).join(`
`)),c("txt-adj",(n.assets.text.adj||[]).join(`
`)),c("txt-noun",(n.assets.text.noun||[]).join(`
`)),u=(n.coordinates||[]).map(l=>({t:l.top||l.t,l:l.left||l.l})),I();const s=document.getElementById("avatar-list");s.innerHTML="";for(let l in n.assets.avatars||{})b(l,n.assets.avatars[l]);const r=n.assets.SFX||n.assets.sfx||{};c("sfx-bgm",r.bgm||r["sfx-bgm"]||""),c("sfx-click",r.click||r["sfx-click"]||""),c("sfx-dice",r.dice||r["sfx-dice"]||""),c("sfx-move",r.move||r["sfx-move"]||""),c("sfx-success",r.success||r["sfx-success"]||""),c("sfx-fail",r.fail||r["sfx-fail"]||""),c("sfx-complete",r.complete||r["sfx-complete"]||""),o&&(document.getElementById("output-questions-json").value=JSON.stringify(o,null,2)),document.getElementById("cloud-themes-modal").classList.add("hidden"),alert(`✅ 主題 「${n.name}」 載入成功！`),g()}catch(t){alert("❌ 載入失敗："+t.message)}finally{d(!1)}}async function K(a,t){if(prompt(`【管理授權】即將刪除主題「${t} (${a})」
此動作無法還原，請輸入管理代碼：`)!=="ZBP")return alert("驗證失敗，取消刪除。");if(confirm(`確定要徹底刪除主題「${t}」嗎？`)){d(!0,"正在刪除主題...");try{await Promise.all([v.ref(`themes/${a}`).remove(),v.ref(`questions/${a}`).remove(),v.ref(`available_themes/${a}`).remove()]),alert("✅ 主題已成功刪除。"),S()}catch(n){alert("❌ 刪除失敗："+n.message)}finally{d(!1)}}}window.openCloudThemesModal=S;window.loadThemeFromCloud=J;window.deleteThemeFromCloud=K;window.publishToCloud=D;window.aiCompleteInfo=T;window.aiGenerateChats=k;window.aiGenerateList=M;window.aiGenerateQuestions=j;window.aiGeneratePrompts=q;window.generateAIImage=G;window.addAvatarRow=b;window.saveAISettings=B;function d(a,t){h.overlay.classList.toggle("hidden",!a),t&&(h.loadingText.textContent=t)}window.showLoading=d;window.copyToClipboard=a=>{document.getElementById(a).select(),document.execCommand("copy"),alert("已複製到剪貼簿！")};function H(){N.forEach(a=>b(a.key,a.file)),document.getElementById("map-upload").addEventListener("change",a=>{const t=a.target.files[0];if(!t)return;const e=new FileReader;e.onload=n=>{h.mapImg.src=n.target.result,u=[],I(),g()},e.readAsDataURL(t)}),h.pointsLayer.addEventListener("click",a=>{if(u.length>=20)return alert("已達 20 個點的上限");const e=h.mapContainer.getBoundingClientRect(),n=((a.clientY-e.top)/e.height*100).toFixed(1)+"%",o=((a.clientX-e.left)/e.width*100).toFixed(1)+"%";u.push({t:n,l:o}),I(),g()}),h.undoBtn.onclick=()=>{u.pop(),I(),g()},document.querySelectorAll("input, textarea").forEach(a=>{a.addEventListener("input",g)}),document.getElementById("ai-api-key").value=localStorage.getItem("GEMINI_API_KEY")||"",document.getElementById("ai-eleven-key").value=localStorage.getItem("ELEVENLABS_API_KEY")||"",g()}H();
