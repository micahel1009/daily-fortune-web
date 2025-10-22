// script.js

// === 1. Gemini AI 聊天配置 ===

// *** 警告：請替換成您自己的 Gemini API 金鑰！金鑰一旦公開會有被盜用風險！ ***
const GEMINI_API_KEY = "AIzaSyD6WKpM3URfbzlnXG9IXep5Ey2b1WPgLo0"; 
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" + GEMINI_API_KEY;

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 定義 Mika 療癒師的人設 (System Instruction)
const SYSTEM_INSTRUCTION = `
    你是一個溫暖、善解人意的心靈療癒師，名叫 Mika。
    你的主要任務是撫慰人心、傾聽使用者抱怨，並給出同理心和建設性的建議，就像諮商人員一樣。
    你的回應必須是人性化、溫柔且鼓勵性的。
    溝通風格：
    1. 永遠以「同理心」開頭，例如：「我能理解您現在的感受...」、「聽起來您今天過得很辛苦...」。
    2. 鼓勵使用者自我探索，多使用「開放式問題」，例如：「您覺得這對您來說意味著什麼？」、「您內心深處最希望看到什麼結果？」。
    3. 絕不使用生硬的程式碼或機器人語言。
    4. 每次回應長度請控制在 3 到 5 句話。
`;

// 儲存對話歷史，以保持對話的連貫性
let history = [];

// 初始化聊天框 (在 DOM 載入後執行)
document.addEventListener('DOMContentLoaded', () => {
    // 初始化歷史紀錄，加入系統指示和開場白
    history = [
        { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
        { role: "model", parts: [{ text: "您好，我是您的心靈療癒師 Mika。歡迎您來聊聊今天的運勢是否符合您的感受，或者單純想抱怨一些事情。我會在這裡，靜靜傾聽。" }] }
    ];
    // 顯示初始訊息
    appendMessage("您好，我是您的心靈療癒師 Mika。歡迎您來聊聊今天的運勢是否符合您的感受，或者單純想抱怨一些事情。我會在這裡，靜靜傾聽。", 'system-message');
});

// 處理傳送按鈕和 Enter 鍵
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    // 1. 顯示使用者訊息
    appendMessage(userText, 'user-message');
    
    // 2. 清空輸入框並禁用輸入 (模擬思考時間)
    userInput.value = '';
    userInput.disabled = true;
    sendBtn.disabled = true;
    userInput.placeholder = "Mika 正在思考中...";

    // 3. 將使用者訊息加入歷史紀錄
    history.push({ role: "user", parts: [{ text: userText }] });

    try {
        // 4. 呼叫 Gemini API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: history, // 發送整個對話歷史
                config: { temperature: 0.7 }
            }),
        });

        if (!response.ok) {
            throw new Error(`API 請求失敗，狀態碼: ${response.status}`);
        }

        const data = await response.json();
        
        let mikaReply = "抱歉，我今天的心靈感應有點斷線了，請再試一次。"; 

        if (data.candidates && data.candidates.length > 0) {
            mikaReply = data.candidates[0].content.parts[0].text;
            
            // 5. 將 AI 回應加入歷史紀錄 (保持連貫性)
            history.push({ role: "model", parts: [{ text: mikaReply }] });
        }
        
        // 6. 顯示 Mika 的回應
        appendMessage(mikaReply, 'system-message');

    } catch (error) {
        console.error("Gemini API 錯誤:", error);
        appendMessage("Mika 感到有點頭暈... 似乎連線出現了問題，請檢查您的金鑰是否正確。", 'system-message');
    } finally {
        // 7. 重新啟用輸入
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
        userInput.placeholder = "請輸入您的感受或想說的話...";
    }
}

function appendMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = text; 
    chatBox.appendChild(messageElement);
    // 保持捲動條在最下方
    chatBox.scrollTop = chatBox.scrollHeight;
}


// === 2. 占卜結果資料庫與邏輯 (V2 擴充版) ===

const detailedFortunes = {
    // 籤運 High: 大吉/高能 (強調行動力、積極、突破)
    'High': {
        Aries: "【火象大吉】今日您的熱情如火，非常適合領導專案或公開發言。衝動是您的動力，但記得給身邊的人一點空間。",
        Taurus: "【土象大吉】今天財運亨通，是適合投資或處理財務的好日子。踏實地完成手邊的任務，穩定將為您帶來巨大的滿足感。",
        Gemini: "【風象大吉】溝通是您的超能力！今天適合與人交流、談判或腦力激盪。多利用社群媒體，會得到重要資訊。",
        Cancer: "【水象大吉】家庭和內心平靜是您今天的基石。適合與家人聯繫或裝飾家居。溫暖的舉動將帶來巨大的情感回報。",
        Leo: "【火象大吉】閃耀光芒屬於您！大膽展現您的才華，特別在社交場合。記得將焦點分享給團隊，會讓您更受歡迎。",
        Virgo: "【土象大吉】所有細節都將在您的掌握之中。適合整理、規劃或啟動健康計畫。您的效率將獲得所有人的讚賞。",
        Libra: "【風象大吉】您的優雅和魅力達到頂峰。適合處理人際關係中的矛盾，輕鬆取得平衡。愛情運特別好！",
        Scorpio: "【水象大吉】直覺異常敏銳！適合深入研究和探索秘密。將您的洞察力用於解決複雜問題，將會獲得權威認可。",
        Sagittarius: "【火象大吉】冒險的靈魂正在呼喚您！適合規劃旅行或學習新領域。您的樂觀將感染每一個人，帶來意想不到的好運。",
        Capricorn: "【土象大吉】目標近在眼前，您感覺到無比的力量。適合爭取職位或完成高難度工作。您的自律是今日成功的關鍵。",
        Aquarius: "【風象大吉】您的創新思維將帶來突破。適合參與討論會或提出新穎的解決方案。別怕與眾不同，因為那就是您的優勢。",
        Pisces: "【水象大吉】靈感如泉湧！適合藝術創作或從事療癒性活動。您的善良和同理心將為您帶來貴人運。"
    },
    // 籤運 Medium: 中平/平靜 (強調內省、穩定、日常)
    'Medium': {
        General: "【中平安定】一切都在穩定中前進。沒有大起大落，正是您積蓄能量、鞏固基礎的最佳時機。請專注於當下的美好，內心的安穩勝過一切外在喧囂。"
    },
    // 籤運 Low: 小凶/低能 (強調學習、耐心、調整)
    'Low': {
        Aries: "【低能挑戰】今日可能會因為衝動而引發小爭執。請數到十再回應，將精力集中在健身或單獨完成的任務上。",
        Taurus: "【低能挑戰】今天容易感到固執或不耐煩。柔軟身段，學會變通。小小的財務延遲，不要讓它影響您的心情。",
        General: "【挑戰學習】生活中出現的小阻礙，是宇宙給您的考驗。這不是懲罰，而是讓您放慢腳步、重新檢查方向的機會。別氣餒，所有的雨都會停。"
    }
};

const drawCardBtn = document.getElementById('draw-card-btn');
const zodiacSelect = document.getElementById('zodiac');
const resultDisplay = document.getElementById('result-display');

drawCardBtn.addEventListener('click', () => {
    const selectedZodiac = zodiacSelect.value;

    if (!selectedZodiac) {
        resultDisplay.innerHTML = '<p style="color: red;">請先選擇您的星座！</p>';
        return;
    }

    // 隨機抽籤 (1=High, 2=Medium, 3=Low)
    const cardResult = Math.floor(Math.random() * 3) + 1;
    let fortuneKey;
    if (cardResult === 1) {
        fortuneKey = 'High';
    } else if (cardResult === 2) {
        fortuneKey = 'Medium';
    } else {
        fortuneKey = 'Low';
    }

    // 根據星座和籤運取得結果，如果沒有特定星座結果，則使用 General
    let fortuneData = detailedFortunes[fortuneKey][selectedZodiac];
    if (!fortuneData) {
        fortuneData = detailedFortunes[fortuneKey]['General'];
    }


    // 顯示結果
    resultDisplay.innerHTML = `
        <p><strong>您選擇了：</strong> ${zodiacSelect.options[zodiacSelect.selectedIndex].text}</p>
        <p style="font-size: 1.2em; color: #5b5b8d;"><strong>今日指引：</strong> ${fortuneKey === 'High' ? '✨ 大吉/高能' : fortuneKey === 'Medium' ? '🌱 中平/平靜' : '🚧 小凶/低能'}</p>
        <p> ${fortuneData}</p>
        <hr>
        <p style="font-size: small; color: #888;">*這個結果是給您的一個心靈指引，最終的選擇權仍在您手中。*</p>
    `;
});
