import{F as N}from"./global_config-vaLYm7Na.js";firebase.initializeApp(N);const x=firebase.database(),q=firebase.storage(),M=firebase.auth();M.signInAnonymously().catch(t=>{console.error("Firebase Auth Error:",t)});let P=null,u=[];const v={mapContainer:document.getElementById("map-preview-container"),mapImg:document.getElementById("map-preview"),pointsLayer:document.getElementById("map-points-layer"),pointCountEl:document.getElementById("point-count"),undoBtn:document.getElementById("undo-point"),overlay:document.getElementById("loading-overlay"),loadingText:document.getElementById("loading-text")},j=[{key:"bear",file:"avatar_bear.png"},{key:"deer",file:"avatar_deer.png"},{key:"buffalo",file:"avatar_buffalo.png"},{key:"magpie",file:"avatar_magpie.png"}];function C(){v.pointsLayer.innerHTML="",u.forEach((t,n)=>{const e=document.createElement("div");e.className="map-point",e.style.top=t.t,e.style.left=t.l,e.textContent=n+1,v.pointsLayer.appendChild(e)}),v.pointCountEl.textContent=u.length,v.undoBtn.disabled=u.length===0,S()}function L(t="",n=""){const e=document.createElement("div");e.className="flex gap-3 avatar-row p-3 bg-white/60 border border-indigo-50 rounded-2xl items-center shadow-sm hover:shadow-md transition-all relative group",e.innerHTML=`
                <div class="flex-shrink-0 relative">
                    <img class="w-12 h-12 rounded-xl border-2 border-white bg-gray-100 object-cover avatar-prev shadow-sm" src="${n.startsWith("http")?n:"img/"+n}">
                </div>
                <div class="flex-grow space-y-2">
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">ID 識別碼</span>
                        <input type="text" placeholder="例如: bear" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-key focus:ring-1 ring-indigo-300 outline-none" value="${t}">
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[9px] font-bold text-indigo-400 w-12 uppercase flex-shrink-0">圖片路徑</span>
                        <input type="text" placeholder="網址或檔名" class="flex-grow p-1.5 bg-white/80 border border-indigo-50 rounded-lg text-[10px] avatar-file focus:ring-1 ring-indigo-300 outline-none" value="${n}">
                    </div>
                </div>
                <button onclick="this.parentElement.remove(); generateAll();" 
                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm ml-1"
                    title="刪除此頭像">✖</button>
            `;const a=e.querySelector(".avatar-file"),i=e.querySelector(".avatar-prev");a.addEventListener("input",()=>{const s=a.value.trim();i.src=s.startsWith("http")?s:s?"img/"+s:"",f()}),e.querySelector(".avatar-key").addEventListener("input",f),document.getElementById("avatar-list").appendChild(e)}function T(){const t=document.getElementById("ai-api-key").value.trim(),n=document.getElementById("ai-eleven-key").value.trim(),e=document.getElementById("ai-proxy-url").value.trim();localStorage.setItem("GEMINI_API_KEY",t),localStorage.setItem("ELEVENLABS_API_KEY",n),localStorage.setItem("AI_PROXY_URL",e),document.getElementById("ai-settings-modal").classList.add("hidden"),alert("✅ AI 設定已儲存成功！")}window.saveAISettings=T;const y={"sfx-bgm":"sound/backgroundMusic.mp3","sfx-click":"sound/click1.mp3","sfx-dice":"sound/dice1.mp3","sfx-move":"sound/move1.mp3","sfx-success":"sound/success.mp3","sfx-fail":"sound/fail.mp3","sfx-complete":"sound/complete.mp3","img-mapBg":"img/map_background.png","img-guideNPC":"img/guide_bear.png","img-loadingGif":"img/loading_bear.gif"},$=t=>t?t.startsWith("http")||t.startsWith("data:")||t.startsWith("img/")?t:"img/"+t:"",w=t=>t?t.startsWith("http")||t.startsWith("data:")||t.startsWith("sound/")?t:"sound/"+t:"";function d(t){return(document.getElementById(t)?.value||"").trim()}function I(t){let n=d(t);return!n&&y[t]&&(n=y[t]),n}function m(t,n){const e=document.getElementById(t);e&&(e.value=n,f())}function k(t){return d(t).split(`
`).filter(n=>n.trim()).map(n=>`"${n.trim().replace(/"/g,'\\"')}"`).join(`,
            `)}function R(t){let n=I(t);if(!n)return null;const e=a=>w(a);return n.includes(",")?`[${n.split(",").map(a=>`"${e(a.trim())}"`).join(", ")}]`:`["${e(n)}"]`}function f(){const t=d("theme-id")||"new_theme",n=(r,l)=>{const c=I(r),h=document.getElementById(l);h&&(h.src=c.startsWith("http")||c.startsWith("data:")?c:c||"")};n("img-mapBg","prev-mapBg"),n("img-guideNPC","prev-guideNPC"),n("img-loadingGif","prev-loadingGif");let e=[];document.querySelectorAll(".avatar-row").forEach(r=>{const l=r.querySelector(".avatar-key").value.trim(),c=r.querySelector(".avatar-file").value.trim();if(l&&c){const h=c.startsWith("http")?c:`img/${c}`;e.push(`        "${l}": "${h}"`)}});let a=u.map(r=>`        { top: "${r.t}", left: "${r.l}" }`).join(`,
`);if(u.length<20){const r=20-u.length;a+=(a?`,
`:"")+`        // ... (還需要點擊地圖增加 ${r} 個點才能開始遊戲)`}let i=[];["click","dice","move","success","fail","complete","bgm"].forEach(r=>{const l=R("sfx-"+(r==="bgm"?"bgm":r));l&&i.push(`        "${r}": ${l}`)});const s=`window.CURRENT_THEME_CONFIG = {
    GAS_URL: "${d("gas-url")}",
    BOARD_COORDINATES: [
${a}
    ],
    ASSETS: {
        AVATARS: {
${e.join(`,
`)}
        },
        IMAGES: {
            "guideNPC": "${$(I("img-guideNPC"))}",
            "loadingGif": "${$(I("img-loadingGif"))}",
            "mapBg": "${$(I("img-mapBg"))}"
        },
        SFX: {
${i.join(`,
`)}
        },
        TEXT: {
            NPC_WELCOME: "${d("txt-welcome")||"歡迎來到新世界！"}",
            NPC_IDLE_CHATS: [
                ${k("txt-idle")}
            ],
            MII_ADJECTIVES: [
                ${k("txt-adj")}
            ],
            MII_NOUNS: [
                ${k("txt-noun")}
            ]
        }
    }
};`,o=`    {
        id: "${t}",
        name: "${d("theme-name")}",
        description: "${d("theme-desc").replace(/\n/g,"\\n")}",
        cover: "img/${d("img-mapBg")}"
    },`;document.getElementById("output-theme-js").value=s,document.getElementById("output-list-js").value=o}async function A(t){const n=localStorage.getItem("GEMINI_API_KEY"),e=localStorage.getItem("AI_PROXY_URL");if(!n&&!e)return alert("請先設定 Gemini API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden"),null;g(!0,"AI 正在發想內容...");try{let a;const i={contents:[{parts:[{text:t+` 

請務必僅以純 JSON 格式回答，不要有其他解釋文字。`}]}]};if(e)a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"gemini",payload:i})});else{const r=`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${n}`;a=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})}const s=await a.json();if(!a.ok)throw new Error(s.error?.message||s.error||`API Error: ${a.status}`);if(!s.candidates||s.candidates.length===0){const r=s.promptFeedback?.blockReason||"找不到候選答案 (可能是被安全過濾器阻擋)";throw new Error(r)}let o=s.candidates[0]?.content?.parts?.[0]?.text;if(!o)throw new Error("API 回傳內容結構不正確");o=o.replace(/```json\n?/,"").replace(/\n?```/,"").trim();try{return JSON.parse(o)}catch{throw console.error("JSON Parse Error. Content:",o),new Error("AI 回傳的格式不符合 JSON，請再試一次。")}}catch(a){return console.error("AI Call Failed:",a),alert(`🤖 AI 呼叫失敗：
`+a.message),null}finally{g(!1)}}async function O(){const n=`你是一個遊戲設計師。請針對主題「${d("theme-name")||d("theme-id")}」提供以下 JSON 資訊：
            {
                "name": "吸引人的主題名稱(含 Emoji)",
                "description": "簡短的主題介紹(約 50 字)",
                "welcome": "NPC 歡迎詞",
                "id": "適用的英文小寫 ID"
            } 
            請繁體中文輸出。`,e=await A(n);e&&(m("theme-name",e.name),m("theme-desc",e.description),P||m("theme-id",e.id),m("txt-welcome",e.welcome))}async function G(){const n=`針對遊戲主題「${d("theme-name")}」，生成 10 句 NPC 的閒聊對談(每句15字以內)，
            輸出格式如： { "chats": ["第一句", "第二句", ...] } 
            繁體中文。`,e=await A(n);e&&m("txt-idle",e.chats.join(`
`))}async function F(t){const e=`針對遊戲主題「${d("theme-name")}」，生成 15 個適合用來隨機組合成角色暱稱的 ${t==="adj"?"形容詞":"名詞"}。
            輸出格式： { "list": ["詞1", "詞2", ...] }`,a=await A(e);a&&m("txt-"+t,a.list.join(`
`))}function S(){const t=document.getElementById("questions-list-container"),n=document.getElementById("output-questions-json").value;let e={map:[],questions:{}};try{n&&(e=JSON.parse(n))}catch{e={map:[],questions:{}}}for(e.map||(e.map=[]),e.questions||(e.questions={});e.map.length<u.length;){const a=`q${e.map.length+1}`;e.map.push({city:`地點 ${e.map.length+1}`,questionId:a,isMustHit:!1}),e.questions[a]={text:"在此輸入題目內容...",options:["選項 A","選項 B","選項 C","選項 D"],answer:1}}if(e.map.length>u.length&&(e.map=e.map.slice(0,u.length)),document.getElementById("output-questions-json").value=JSON.stringify(e,null,2),t.innerHTML="",u.length===0){t.innerHTML=`
                    <div class="text-center py-10 text-gray-400 text-sm bg-white/20 rounded-2xl border-2 border-dashed border-gray-300">
                        請先在步驟 3 標記地圖點位 <br>
                        或點擊「AI 自動出題」
                    </div>`;return}e.map.forEach((a,i)=>{const s=e.questions[a.questionId]||{text:"",options:["","","",""],answer:1},o=document.createElement("div");o.className="question-card bg-white/90 p-6 rounded-3xl shadow-sm border border-indigo-50 space-y-5 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden";const r=document.createElement("div");r.className=`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${a.isMustHit?"bg-red-500":"bg-orange-400"}`,o.appendChild(r),o.innerHTML+=`
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-grow space-y-1">
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-lg font-black text-[10px] italic">POINT #${i+1}</span>
                                ${a.isMustHit?'<span class="px-2 py-0.5 bg-red-100 text-red-600 rounded-lg font-bold text-[9px] animate-pulse">CRITICAL</span>':""}
                            </div>
                            <input type="text" value="${a.city}" 
                                oninput="updateQuestionData(${i}, 'city', this.value)"
                                placeholder="地點名稱 (如: 藏寶灣)" 
                                class="w-full p-0 text-lg font-black bg-transparent border-none outline-none focus:ring-0 text-indigo-900 placeholder:text-indigo-200 transition-colors">
                        </div>
                        <label class="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer select-none group/musthit">
                            <div class="relative w-10 h-5 bg-gray-200 rounded-full transition-colors group-hover:bg-gray-300 ${a.isMustHit?"!bg-red-500":""}">
                                <div class="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${a.isMustHit?"translate-x-5":""}"></div>
                            </div>
                            <input type="checkbox" class="hidden" ${a.isMustHit?"checked":""} 
                                onchange="updateQuestionData(${i}, 'isMustHit', this.checked); renderQuestionsEditor();">
                            <span class="text-[9px] font-bold ${a.isMustHit?"text-red-500":"text-gray-400"} transition-colors uppercase">強制停靠</span>
                        </label>
                    </div>

                    <div class="space-y-4">
                        <div class="relative">
                            <label class="absolute -top-2 left-3 px-1 bg-white text-[9px] font-black text-indigo-400 uppercase tracking-widest z-10">問題描述</label>
                            <textarea oninput="updateQuestionData(${i}, 'text', this.value)"
                                class="w-full p-4 pt-5 text-sm rounded-2xl border border-indigo-50 bg-indigo-50/30 focus:bg-white focus:ring-2 ring-orange-100 outline-none transition-all min-h-[80px]" 
                                placeholder="在此輸入您的問題內容...">${s.text}</textarea>
                        </div>

                        <div class="grid grid-cols-1 gap-2.5">
                            ${s.options.map((l,c)=>`
                                <div class="flex items-center gap-3 group/opt">
                                    <label class="relative flex items-center justify-center w-8 h-8 flex-shrink-0 cursor-pointer">
                                        <input type="radio" name="ans-${i}" ${s.answer===c+1?"checked":""} 
                                            onchange="updateQuestionData(${i}, 'answer', ${c+1})"
                                            class="peer hidden">
                                        <div class="w-full h-full border-2 border-indigo-100 rounded-xl flex items-center justify-center text-[11px] font-bold text-indigo-300 transition-all
                                            peer-checked:border-orange-500 peer-checked:bg-orange-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-orange-200
                                            group-hover/opt:border-orange-200">
                                            ${String.fromCharCode(65+c)}
                                        </div>
                                    </label>
                                    <input type="text" value="${l}" 
                                        oninput="updateQuestionData(${i}, 'option', this.value, ${c})"
                                        placeholder="輸入選項內容"
                                        class="flex-grow p-2.5 text-xs rounded-xl border border-transparent bg-indigo-50/20 group-hover/opt:bg-indigo-50 focus:bg-white focus:border-indigo-100 outline-none transition-all">
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `,t.appendChild(o)})}window.updateQuestionData=function(t,n,e,a){const i=document.getElementById("output-questions-json").value;let s={map:[],questions:{}};try{s=JSON.parse(i)}catch{}const o=s.map[t];if(!o)return;const r=s.questions[o.questionId];r&&(n==="city"?o.city=e:n==="isMustHit"?o.isMustHit=e:n==="text"?r.text=e:n==="answer"?r.answer=parseInt(e):n==="option"&&(r.options[a]=e),document.getElementById("output-questions-json").value=JSON.stringify(s,null,2),f())};async function H(){const t=u.length;if(t===0)return alert("請先在上方地圖點擊標註至少一個地點，AI 才能為您取名並製作題目。");const n=d("theme-name"),e=document.getElementById("ai-questions-topic").value.trim(),a=e?`
特別針對以下教學內容或重點生成：
${e}
`:"",i=`你是一個互動式大富翁遊戲設計專家。請針對主題「${n}」${a}，生成 ${t} 個地點與對應的四選一單選題。
            輸出格式必須是純 JSON，結構如下：
            {
                "map": [
                    {"city": "地點名稱1", "questionId": "q1", "isMustHit": false},
                    ... (共 ${t} 個地點)
                ],
                "questions": {
                    "q1": {"text": "題目內容", "options": ["選項1", "選項2", "選項3", "選項4"], "answer": 1},
                    ... (共 ${t} 個題目, answer 是 1-4 的數字)
                }
            }
            請確保內容豐富、有趣且符合繁體中文習慣。`,s=await A(i);s&&(document.getElementById("output-questions-json").value=JSON.stringify(s,null,2),S(),alert("遊戲題目集生成成功！已套用於本地與雲端發佈區。"))}async function D(t,n,e){const a=document.getElementById(t).value.trim();if(!a)return alert("請先生成 AI 提示詞！");let i=2,s=0,o=!1;for(;s<=i&&!o;){s++;const r=s>1?` (重試第 ${s-1} 次)...`:"...";g(!0,`正在繪製圖像 (Pollinations.ai)${r}`);try{const l=Math.floor(Math.random()*1e6),c=`https://image.pollinations.ai/prompt/${encodeURIComponent(a)}?width=1280&height=1280&seed=${l}&nologo=true&model=flux`;await new Promise((h,p)=>{const b=new Image;b.crossOrigin="anonymous",b.onload=()=>{n&&(document.getElementById(n).src=c),e&&(document.getElementById(e).value=c),f(),o=!0,h()},b.onerror=()=>p(new Error("圖片載入失敗 (伺服器可能忙碌中)")),setTimeout(()=>p(new Error("圖片載入超時 (30s)")),3e4),b.src=c})}catch(l){console.warn(`生圖嘗試 ${s} 失敗:`,l.message),s>i&&alert("生圖失敗: "+l.message+`
請稍後再試或更換提示詞。`),!o&&s<=i&&await new Promise(c=>setTimeout(c,1e3))}}g(!1)}async function J(){const n=`你是一個資深遊戲美術指導。針對大富翁遊戲主題「${d("theme-name")}」，生成以下資源的 AI 繪圖/影片/音樂提示詞 (Prompts)：
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
            }`,e=await A(n);e&&(document.getElementById("prompt-map").value=e.map,document.getElementById("prompt-npc").value=e.npc,document.getElementById("prompt-loading").value=e.loading,document.getElementById("prompt-avatar").value=e.avatar,document.getElementById("prompt-bgm").value=e.bgm,window.AI_AVATAR_PROMPTS=e.avatars,document.getElementById("ai-prompts-output").innerHTML=`
                    <div class="mb-4 text-purple-900 font-extrabold border-b border-purple-200 pb-2 text-base">✨ AI 美術提案內容</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Map Background</strong><p class="text-xs mt-1 italic">"${e.map}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">NPC Guide</strong><p class="text-xs mt-1 italic">"${e.npc}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Loading Anim</strong><p class="text-xs mt-1 italic">"${e.loading}"</p></div>
                        <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Music Tags</strong><p id="display-prompt-bgm" class="text-xs mt-1 italic">"${e.bgm}"</p></div>
                    </div>
                `,document.getElementById("ai-prompts-output").classList.remove("hidden"),document.getElementById("prompts-control").classList.remove("hidden"),document.getElementById("btn-gen-map").disabled=!1,document.getElementById("btn-gen-map").title="根據目前的地圖提示詞生成背景",alert("AI 提示詞生成完畢！您可以繼續下一步生成地圖，或生成 NPC/頭像。"))}async function W(){const t=document.getElementById("prompt-avatar").value,n=window.AI_AVATAR_PROMPTS||[];if(!t||n.length===0)return alert("請先生成 AI 提示詞！");g(!0,"正在生成角色頭像組...");try{const e=document.getElementById("avatar-list"),a=e.querySelectorAll(".avatar-row").length;for(let i=0;i<n.length;i++){const s=`${n[i]}, ${t}`,o=Math.floor(Math.random()*1e5),r=`https://image.pollinations.ai/prompt/${encodeURIComponent(s)}?width=512&height=512&seed=${o}&nologo=true`,l=`char_${a+i+1}`;L(l,r)}alert(`✅ 新增了 ${n.length} 位角色！目前共有 ${e.querySelectorAll(".avatar-row").length} 位。`),f()}catch(e){alert("頭像生成失敗: "+e.message)}finally{g(!1)}}async function U(t,n){const e=localStorage.getItem("ELEVENLABS_API_KEY"),a=localStorage.getItem("AI_PROXY_URL");if(!e&&!a){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const i=d("theme-name")||"fantasy game",s=window.prompt("【AI 音效生成】請修正或輸入提示詞：",`A ${n} for a ${i} themed game`);if(s){g(!0,"正在透過 AI 生成音效...");try{let o;const r={text:s,duration_seconds:5,prompt_influence:.3};if(a?o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-sfx",payload:r})}):o=await fetch("https://api.elevenlabs.io/v1/sound-generation",{method:"POST",headers:{"xi-api-key":e,"Content-Type":"application/json"},body:JSON.stringify(r)}),!o.ok){const p=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(p.detail?.message||p.error||"生成失敗")}const l=await o.blob(),c=d("theme-id")||"temp",h=await E(l,`themes/${c}/sfx`,`${t}_${Date.now()}.mp3`);document.getElementById(t).value=h,alert("✅ 音效生成並上傳成功！"),f()}catch(o){console.error("SFX Generation Error:",o),alert("❌ 音效生成失敗："+o.message)}finally{g(!1)}}}async function K(t,n){const e=localStorage.getItem("ELEVENLABS_API_KEY"),a=localStorage.getItem("AI_PROXY_URL");if(!e&&!a){alert("請先設定 ElevenLabs API Key 或 Cloudflare Worker 代理網址！"),document.getElementById("ai-settings-modal").classList.remove("hidden");return}const i=d("theme-name")||"adventure game",s=window.prompt("【AI 音樂生成】請修正或輸入音樂描述：",`${n} for a ${i} themed board game, looped, high quality`);if(s){g(!0,"正在透過 AI 生成背景音樂...");try{let o;const r={prompt:s,music_length_ms:3e4};if(a?o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"elevenlabs-music",payload:r})}):o=await fetch("https://api.elevenlabs.io/v1/music",{method:"POST",headers:{"xi-api-key":e,"Content-Type":"application/json"},body:JSON.stringify(r)}),!o.ok){const p=await o.json().catch(()=>({detail:{message:"生成失敗"}}));throw new Error(p.detail?.message||p.error||"生成失敗")}const l=await o.blob(),c=d("theme-id")||"temp",h=await E(l,`themes/${c}/music`,`bgm_${Date.now()}.mp3`);document.getElementById(t).value=h,alert("✅ 背景音樂生成並上傳成功！"),f()}catch(o){console.error("Music Generation Error:",o),alert("❌ 音樂生成失敗："+o.message)}finally{g(!1)}}}window.generateAIAvatars=W;window.generateAISFX=U;window.generateAIMusic=K;async function E(t,n,e){if(!t)return null;if(typeof t=="string"&&t.includes("firebasestorage.googleapis.com"))return t;let a;if(typeof t=="string"&&t.startsWith("http"))try{const r=await fetch(t);if(!r.ok)throw new Error("Fetch failed");a=await r.blob()}catch{return console.error("CORS or Fetch error:",t),t}else a=t;const i=e||(a.name?`${Date.now()}_${a.name}`:`${Date.now()}.png`);return await(await q.ref(`${n}/${i}`).put(a)).ref.getDownloadURL()}async function X(){if(u.length===0)return alert("地圖座標點至少要有一個！");if(prompt("【管理驗證】請輸入發佈代碼以繼續：")!=="ZBP"){alert("驗證錯誤，您沒有權限發佈至雲端。");return}g(!0,"正在準備雲端發佈...");try{const n=d("theme-id"),e=d("theme-name");let a=I("img-mapBg");const i=document.getElementById("map-upload").files[0];i?a=await E(i,`themes/${n}/images`,"map_bg.png"):a.startsWith("http")&&(a=await E(a,`themes/${n}/images`,"map_bg.png")),a=$(a);let s=I("img-guideNPC");s.startsWith("http")&&(s=await E(s,`themes/${n}/images`,"npc.png")),s=$(s);let o=I("img-loadingGif");o.startsWith("http")&&(o=await E(o,`themes/${n}/images`,"loading.gif")),o=$(o);const r={},l=document.querySelectorAll(".avatar-row");for(const p of l){const b=p.querySelector(".avatar-key").value.trim();let B=p.querySelector(".avatar-file").value.trim();b&&B&&(B.startsWith("http")&&(B=await E(B,`themes/${n}/avatars`,`${b}.png`)),r[b]=B)}const c={id:n,name:e,description:d("theme-desc"),gasUrl:d("gas-url"),coordinates:u,aiPrompts:{map:document.getElementById("prompt-map").value,npc:document.getElementById("prompt-npc").value,loading:document.getElementById("prompt-loading").value,avatar:document.getElementById("prompt-avatar").value,bgm:document.getElementById("prompt-bgm").value,questionsTopic:document.getElementById("ai-questions-topic").value},assets:{avatars:r,images:{guideNPC:s,loadingGif:o,mapBg:a},text:{welcome:d("txt-welcome"),idleChats:d("txt-idle").split(`
`).filter(p=>p.trim()),adj:d("txt-adj").split(`
`).filter(p=>p.trim()),noun:d("txt-noun").split(`
`).filter(p=>p.trim())},SFX:{bgm:w(d("sfx-bgm")||y["sfx-bgm"]),click:w(d("sfx-click")||y["sfx-click"]),dice:w(d("sfx-dice")||y["sfx-dice"]),move:w(d("sfx-move")||y["sfx-move"]),success:w(d("sfx-success")||y["sfx-success"]),fail:w(d("sfx-fail")||y["sfx-fail"]),complete:w(d("sfx-complete")||y["sfx-complete"])}}};let h=JSON.parse(document.getElementById("output-questions-json").value);await x.ref(`themes/${n}`).set(c),await x.ref(`questions/${n}`).set(h),await x.ref(`available_themes/${n}`).set({id:n,name:e,description:d("theme-desc"),cover:a,isCloud:!0}),alert("✅ 雲端平台發佈成功！")}catch(n){console.error(n),alert("❌ 發佈失敗："+n.message)}finally{g(!1)}}async function _(){const t=document.getElementById("cloud-themes-modal"),n=document.getElementById("cloud-themes-list");t.classList.remove("hidden"),n.innerHTML='<div class="text-center py-10 text-gray-400">正在讀取雲端清單...</div>';try{const e=await x.ref("available_themes").get();if(!e.exists()){n.innerHTML='<div class="text-center py-10 text-gray-400">目前沒有雲端主題</div>';return}const a=e.val();n.innerHTML="",Object.values(a).forEach(i=>{const s=document.createElement("div");s.className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl hover:bg-indigo-100 transition-colors cursor-pointer group",s.innerHTML=`
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
                    `,n.appendChild(s)})}catch(e){n.innerHTML=`<div class="text-center py-10 text-red-400">讀取失敗：${e.message}</div>`}}async function Y(t){g(!0,"正在從雲端載入資料...");try{const[n,e]=await Promise.all([x.ref(`themes/${t}`).get(),x.ref(`questions/${t}`).get()]);if(!n.exists())throw new Error("找不到該主題的設定資料");const a=n.val(),i=e.val();m("theme-id",a.id),m("theme-name",a.name),m("theme-desc",a.description),m("gas-url",a.gasUrl||""),m("img-mapBg",a.assets.images.mapBg),m("img-guideNPC",a.assets.images.guideNPC),m("img-loadingGif",a.assets.images.loadingGif),document.getElementById("map-preview").src=a.assets.images.mapBg,m("txt-welcome",a.assets.text.welcome),m("txt-idle",(a.assets.text.idleChats||[]).join(`
`)),m("txt-adj",(a.assets.text.adj||[]).join(`
`)),m("txt-noun",(a.assets.text.noun||[]).join(`
`)),u=(a.coordinates||[]).map(l=>({t:l.top||l.t,l:l.left||l.l})),C();const s=document.getElementById("avatar-list");s.innerHTML="";for(let l in a.assets.avatars||{})L(l,a.assets.avatars[l]);const o=a.assets.SFX||a.assets.sfx||{};if(m("sfx-bgm",o.bgm||o["sfx-bgm"]||""),m("sfx-click",o.click||o["sfx-click"]||""),m("sfx-dice",o.dice||o["sfx-dice"]||""),m("sfx-move",o.move||o["sfx-move"]||""),m("sfx-success",o.success||o["sfx-success"]||""),m("sfx-fail",o.fail||o["sfx-fail"]||""),m("sfx-complete",o.complete||o["sfx-complete"]||""),a.aiPrompts){const l=a.aiPrompts;document.getElementById("prompt-map").value=l.map||"",document.getElementById("prompt-npc").value=l.npc||"",document.getElementById("prompt-loading").value=l.loading||"",document.getElementById("prompt-avatar").value=l.avatar||"",document.getElementById("prompt-bgm").value=l.bgm||"",m("ai-questions-topic",l.questionsTopic||""),(l.map||l.npc)&&(document.getElementById("ai-prompts-output").innerHTML=`
                            <div class="mb-4 text-purple-900 font-extrabold border-b border-purple-200 pb-2 text-base">✨ 已載入的 AI 美術提案</div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Map Background</strong><p class="text-xs mt-1 italic">"${l.map||""}"</p></div>
                                <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">NPC Guide</strong><p class="text-xs mt-1 italic">"${l.npc||""}"</p></div>
                                <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Loading Anim</strong><p class="text-xs mt-1 italic">"${l.loading||""}"</p></div>
                                <div class="p-3 bg-purple-50/50 rounded-xl"><strong class="text-[10px] text-purple-400 uppercase">Music Tags</strong><p class="text-xs mt-1 italic">"${l.bgm||""}"</p></div>
                            </div>
                        `,document.getElementById("ai-prompts-output").classList.remove("hidden"),document.getElementById("prompts-control").classList.remove("hidden"),document.getElementById("btn-gen-map").disabled=!1)}i&&(document.getElementById("output-questions-json").value=JSON.stringify(i,null,2),S()),document.getElementById("cloud-themes-modal").classList.add("hidden"),P=t;const r=document.getElementById("theme-id");r.value=t,r.disabled=!0,document.getElementById("cloud-edit-badge").classList.remove("hidden"),document.getElementById("btn-unlock-id").classList.remove("hidden"),alert(`✅ 主題 「${a.name}」 載入成功！現在處於雲端更新模式。`),f()}catch(n){alert("❌ 載入失敗："+n.message)}finally{g(!1)}}async function V(t,n){if(prompt(`【管理授權】即將刪除主題「${n} (${t})」
此動作無法還原，請輸入管理代碼：`)!=="ZBP")return alert("驗證失敗，取消刪除。");if(confirm(`確定要徹底刪除主題「${n}」嗎？`)){g(!0,"正在刪除主題...");try{await Promise.all([x.ref(`themes/${t}`).remove(),x.ref(`questions/${t}`).remove(),x.ref(`available_themes/${t}`).remove()]),alert("✅ 主題已成功刪除。"),_()}catch(a){alert("❌ 刪除失敗："+a.message)}finally{g(!1)}}}function Q(){if(confirm("解鎖 ID 後發佈將會建立一個「新的雲端主題」，而非更新現有主題。確定嗎？")){P=null;const t=document.getElementById("theme-id");t.disabled=!1,t.focus(),document.getElementById("cloud-edit-badge").classList.add("hidden"),document.getElementById("btn-unlock-id").classList.add("hidden")}}window.unlockThemeId=Q;window.openCloudThemesModal=_;window.loadThemeFromCloud=Y;window.deleteThemeFromCloud=V;window.publishToCloud=X;window.aiCompleteInfo=O;window.aiGenerateChats=G;window.aiGenerateList=F;window.aiGenerateQuestions=H;window.aiGeneratePrompts=J;window.generateAIImage=D;window.addAvatarRow=L;window.saveAISettings=T;window.renderQuestionsEditor=S;function g(t,n){v.overlay.classList.toggle("hidden",!t),n&&(v.loadingText.textContent=n)}window.showLoading=g;window.copyToClipboard=t=>{document.getElementById(t).select(),document.execCommand("copy"),alert("已複製到剪貼簿！")};function z(){j.forEach(t=>L(t.key,t.file)),document.getElementById("map-upload").addEventListener("change",t=>{const n=t.target.files[0];if(!n)return;const e=new FileReader;e.onload=a=>{v.mapImg.src=a.target.result,u=[],C(),f()},e.readAsDataURL(n)}),v.pointsLayer.addEventListener("click",t=>{if(u.length>=20)return alert("已達 20 個點的上限");const e=v.mapContainer.getBoundingClientRect(),a=((t.clientY-e.top)/e.height*100).toFixed(1)+"%",i=((t.clientX-e.left)/e.width*100).toFixed(1)+"%";u.push({t:a,l:i}),C(),f()}),v.undoBtn.onclick=()=>{u.pop(),C(),f()},document.querySelectorAll("input, textarea").forEach(t=>{t.addEventListener("input",f)}),document.getElementById("output-questions-json").addEventListener("change",S),document.getElementById("ai-api-key").value=localStorage.getItem("GEMINI_API_KEY")||"",document.getElementById("ai-eleven-key").value=localStorage.getItem("ELEVENLABS_API_KEY")||"",document.getElementById("ai-proxy-url").value=localStorage.getItem("AI_PROXY_URL")||"",f()}z();
