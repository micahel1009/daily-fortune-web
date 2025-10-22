// script.js

// ==========================================================
// === 1. Gemini AI 聊天配置 (請替換金鑰!) ===
// ==========================================================

const GEMINI_API_KEY = "AIzaSyD6WKpM3URfbzlnXG9IXep5Ey2b1WPgLo0"; // 🚨 請替換為您的金鑰 🚨
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" + GEMINI_API_KEY;

// 獲取 DOM 元素
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const themeToggle = document.getElementById('theme-toggle'); 

const SYSTEM_INSTRUCTION = `
    你是一個溫暖、善解人意的心靈療癒師，名叫 Mika。
    你的主要任務是撫慰人心、傾聽使用者抱怨，並給出同理心和建設性的建議，就像專業諮商人員一樣。
    你的回應必須是人性化、溫柔且鼓勵性的。
    溝通風格：
    1. 永遠以「同理心」開頭，例如：「我能理解您現在的感受...」、「聽起來您今天過得很辛苦...」。
    2. 鼓勵使用者自我探索，多使用「開放式問題」，例如：「您覺得這對您來說意味著什麼？」、「您內心深處最希望看到什麼結果？」。
    3. 絕不使用生硬的程式碼或機器人語言。
    4. 每次回應長度請控制在 3 到 5 句話，保持簡潔溫暖。
`;

let history = []; // 用於儲存對話歷史

function appendMessage(text, type) {
    const container = document.createElement('div');
    const avatar = document.createElement('div');
    const bubble = document.createElement('div');
    const content = document.createElement('p');
    
    // 簡單移除 AI 可能產生的 Markdown 格式 (例如 **粗體**)
    content.textContent = text.replace(/\*\*(.*?)\*\*/g, '$1'); 

    if (type === 'user') {
        container.className = 'flex items-start space-x-3 justify-end';
        avatar.className = 'w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center';
        avatar.innerHTML = '<i class="fas fa-user text-gray-600 dark:text-gray-300 text-sm"></i>';
        bubble.className = 'user-bubble bg-indigo-600 text-white p-4 max-w-md';
        
        bubble.appendChild(content);
        container.appendChild(bubble);
        container.appendChild(avatar);
    } else { // system/bot message
        container.className = 'flex items-start space-x-3';
        avatar.className = 'w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center';
        avatar.innerHTML = '<i class="fas fa-heart text-white text-sm"></i>';
        bubble.className = 'message-bubble bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 max-w-md';
        content.className = 'text-gray-800 dark:text-gray-200';
        
        bubble.appendChild(content);
        container.appendChild(avatar);
        container.appendChild(bubble);
    }

    chatMessages.appendChild(container);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendChatMessage() {
    const userText = chatInput.value.trim();
    if (userText === '') return;

    // 1. 顯示使用者訊息
    appendMessage(userText, 'user');

    // 2. 禁用輸入 (模擬思考時間)
    chatInput.value = '';
    chatInput.disabled = true;
    sendMessageBtn.disabled = true;
    chatInput.placeholder = "Mika 正在用心聆聽... (AI 思考中)";

    // 3. 將使用者訊息加入歷史紀錄
    history.push({ role: "user", parts: [{ text: userText }] });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: history, // 發送整個對話歷史
                config: { temperature: 0.7 }
            }),
        });

        if (!response.ok) {
            throw new Error(`API Request Failed: ${response.status}`);
        }

        const data = await response.json();
        let mikaReply = "抱歉，Mika 感到有點頭暈... 似乎連線出現了問題，請檢查您的金鑰和網路。";

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts) {
            mikaReply = data.candidates[0].content.parts[0].text;
            history.push({ role: "model", parts: [{ text: mikaReply }] });
        }
        
        // 4. 顯示 Mika 的回應
        appendMessage(mikaReply, 'system');

    } catch (error) {
        console.error("Gemini API Error:", error);
        appendMessage("Mika 感到有點頭暈... 似乎連線出現了問題，請檢查您的金鑰和網路。", 'system');
    } finally {
        // 5. 重新啟用輸入
        chatInput.disabled = false;
        sendMessageBtn.disabled = false;
        chatInput.focus();
        chatInput.placeholder = "分享你的感受或想法...";
    }
}


// ==========================================================
// === 2. 占卜結果資料庫與邏輯 ===
// ==========================================================

let selectedZodiac = '';        
let selectedTarotCard = '';
let cardFlipped = false; 

const allTarotCards = [
    { name: '太陽', icon: 'fas fa-sun', color: 'text-yellow-500' },
    { name: '月亮', icon: 'fas fa-moon', color: 'text-blue-500' },
    { name: '星星', icon: 'fas fa-star', color: 'text-purple-500' },
    { name: '力量', icon: 'fas fa-shield-halved', color: 'text-orange-500' },
    { name: '魔術師', icon: 'fas fa-wand-magic-sparkles', color: 'text-cyan-500' },
    { name: '審判', icon: 'fas fa-gavel', color: 'text-red-500' }
];

const zodiacFortunes = {
    'Aries': { name: '牡羊座', love: '今日愛情能量強烈，單身者有機會遇到命中注定的人，有伴侶者感情更加甜蜜。', career: '工作上充滿活力，勇於表達想法將為你帶來意想不到的機會。', money: '財運平穩，適合進行小額投資，避免衝動消費。', advice: '保持積極樂觀的態度，你的熱情將感染身邊的人。' },
    'Taurus': { name: '金牛座', love: '感情穩定發展，耐心經營關係將獲得回報，避免過於固執。', career: '踏實努力的態度受到上司認可，堅持不懈將有所收穫。', money: '理財能力出色，適合長期投資規劃，財富穩步增長。', advice: '慢工出細活，用心經營的事物都會有好結果。' },
    'Gemini': { name: '雙子座', love: '溝通是今日愛情的關鍵，真誠表達內心想法能化解誤會。', career: '靈活應變的能力幫助你處理複雜問題，創意想法受到重視。', money: '多元投資策略奏效，但要注意分散風險。', advice: '保持好奇心和學習熱忱，新知識將為你開啟新機會。' },
    'Cancer': { name: '巨蟹座', love: '家庭和諧帶來內心平靜，與家人的溫馨時光讓感情更穩固。', career: '細心負責的工作態度獲得認可，團隊合作順利。', money: '保守理財策略適合當前局勢，注意家庭開支平衡。', advice: '傾聽內心聲音，情感直覺將指引你做出正確決定。' },
    'Leo': { name: '獅子座', love: '魅力四射的你吸引眾人目光，自信展現真實自我最有魅力。', career: '領導才能得到發揮，勇於承擔責任將提升個人聲望。', money: '適合投資個人形象提升，長遠來看會有豐厚回報。', advice: '相信自己的能力，但也要懂得謙虛聆聽他人建議。' },
    'Virgo': { name: '處女座', love: '完美主義傾向需要調整，學會欣賞對方的不完美也是一種美。', career: '注重細節的特質讓工作品質出眾，但避免過於苛求。', money: '精明的理財眼光幫助你發現投資良機，謹慎分析後行動。', advice: '追求完美的同時，也要給自己和他人一些寬容空間。' },
    'Libra': { name: '天秤座', love: '人際關係和諧，單身者通過朋友介紹有機會遇到合適對象。', career: '協調溝通能力出色，成為團隊中不可或缺的橋樑。', money: '平衡收支是今日重點，避免為了面子而過度消費。', advice: '保持內心平衡，在選擇面前要相信自己的判斷力。' },
    'Scorpio': { name: '天蠍座', love: '深度情感交流帶來心靈契合，真誠相待能突破關係瓶頸。', career: '洞察力敏銳，能發現他人忽略的重要細節，為團隊帶來突破。', money: '投資直覺準確，但要控制風險，避免過於激進。', advice: '相信內在力量，你的堅持和專注將帶來意想不到的成果。' },
    'Sagittarius': { name: '射手座', love: '自由奔放的個性吸引志同道合的人，遠距離戀情有好消息。', career: '國際視野和開放心態為你帶來新機會，勇於嘗試新挑戰。', money: '投資海外市場或教育學習會有不錯回報。', advice: '保持樂觀探索精神，人生就像一場美妙的冒險旅程。' },
    'Capricorn': { name: '摩羯座', love: '務實的愛情觀幫助你建立穩固關係，長期規劃讓感情更有保障。', career: '努力付出終於看到回報，職業發展進入穩定上升期。', money: '保守投資策略奏效，長期積累將帶來可觀財富。', advice: '堅持自己的目標和原則，時間會證明你的選擇是正確的。' },
    'Aquarius': { name: '水瓶座', love: '獨特的個性魅力讓你在人群中閃閃發光，創新的約會方式很受歡迎。', career: '創新思維為工作帶來新突破，團隊因你的想法而受益。', money: '科技相關投資值得關注，但要做好風險評估。', advice: '保持獨立思考，你的與眾不同正是最大的優勢。' },
    'Pisces': { name: '雙魚座', love: '感性浪漫的一面特別迷人，用心感受愛情的美好。', career: '創意靈感豐富，藝術相關工作有突出表現。', money: '直覺投資可能有意外收穫，但要避免情緒化決策。', 'advice': '相信內心的感受，你的同理心和善良會為你帶來好運。' }
};

const tarotMeanings = {
    '太陽': { love: '愛情充滿陽光和活力。', career: '事業前景光明。', money: '財運亨通。', overall: '✨ 大吉 - 豐盛且充滿動能的一天 ☀️' },
    '月亮': { love: '需要更多溝通理解。', career: '工作中可能有隱藏的挑戰。', money: '理財需要更加謹慎。', overall: '🚧 小凶 - 沉靜且充滿思考的一天 ☁️' },
    '星星': { love: '心懷希望和夢想。', career: '理想和現實找到平衡點。', money: '長遠規劃帶來穩定回報。', overall: '🌱 中平 - 充滿希望與靈感的一天 ✨' },
    '力量': { love: '展現溫柔的力量。', career: '自信和勇氣是成功的關鍵。', money: '透過自我控制帶來穩定收入。', overall: '💪 大吉 - 充滿自信與內在力量的一天 🏆' },
    '魔術師': { love: '創造新機會。', career: '具備所需的一切能力。', money: '運用創意賺取金錢。', overall: '🪄 大吉 - 充滿創造力與無限潛能的一天 🌟' },
    '審判': { love: '是時候回顧並評估過去的感情。', career: '工作上將面臨重大考驗。', money: '適合清算舊債和重新審視財務狀況。', overall: '⚖️ 小凶 - 充滿挑戰但能成長的一天 💡' }
};

// 必須在全域定義，供 HTML 的 onclick 屬性呼叫
function handleCardFlip(card, index) {
    const flipDiv = card.querySelector('.tarot-flip');
    const tarotCards = document.querySelectorAll('.tarot-card');

    if (cardFlipped && !flipDiv.classList.contains('flipped')) {
        alert('今日運勢只抽取一張牌，請點擊生成運勢！');
        return;
    }
    if (cardFlipped && flipDiv.classList.contains('flipped')) {
        return;
    }

    if (!cardFlipped) {
        const randomIndex = Math.floor(Math.random() * allTarotCards.length);
        selectedTarotCard = allTarotCards[randomIndex].name;
        cardFlipped = true; // 設置已翻牌標誌
        
        tarotCards.forEach((otherCard, i) => {
            if (i !== index) {
                otherCard.style.opacity = '0.5';
                otherCard.style.pointerEvents = 'none'; 
            }
            
            if (i === index) {
                flipDiv.classList.add('flipped');
                const backDiv = otherCard.querySelector('.tarot-back');
                const iconElement = backDiv.querySelector('i');
                const textElement = backDiv.querySelector('p');
                
                iconElement.className = allTarotCards[randomIndex].icon + ' text-xl mb-1 ' + allTarotCards[randomIndex].color;
                textElement.textContent = selectedTarotCard;
                
                otherCard.style.opacity = '1'; 
            }
        });
    }
}

function generateFortune() {
    if (!selectedZodiac) {
        alert('請先選擇你的星座！');
        return;
    }
    if (!selectedTarotCard) {
        alert('請先抽取一張塔羅牌！');
        return;
    }
    
    const zodiacName = zodiacFortunes[selectedZodiac].name;
    const zodiacReading = zodiacFortunes[selectedZodiac];
    const tarotReading = tarotMeanings[selectedTarotCard];
    const resultDiv = document.getElementById('readingDetails');
    
    document.getElementById('selectedSignName').textContent = zodiacName;
    document.getElementById('selectedTarotName').textContent = selectedTarotCard;
    document.getElementById('fortuneOverallTitle').textContent = tarotReading.overall;
    
    resultDiv.innerHTML = `
        <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-heart text-red-500 mr-3"></i>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">愛情運勢</h4>
                </div>
                <p class="text-gray-700 dark:text-gray-300">${zodiacReading.love} ${tarotReading.love}</p>
            </div>
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-briefcase text-blue-500 mr-3"></i>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">事業運勢</h4>
                </div>
                <p class="text-gray-700 dark:text-gray-300">${zodiacReading.career} ${tarotReading.career}</p>
            </div>
        </div>
        <div class="space-y-6">
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-coins text-green-500 mr-3"></i>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">財運運勢</h4>
                </div>
                <p class="text-gray-700 dark:text-gray-300">${zodiacReading.money} ${tarotReading.money}</p>
            </div>
            <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div class="flex items-center mb-4">
                    <i class="fas fa-lightbulb text-yellow-500 mr-3"></i>
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">整體建議</h4>
                </div>
                <p class="text-gray-700 dark:text-gray-300">${zodiacReading.advice} ${tarotReading.overall}</p>
            </div>
        </div>
    `;

    document.getElementById('fortuneResult').classList.remove('hidden');
    document.getElementById('fortuneResult').scrollIntoView({ behavior: 'smooth' });
}


// ==========================================================
// === 3. 初始化和事件監聽器 ===
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
    const html = document.documentElement;
    const zodiacCards = document.querySelectorAll('.zodiac-card');

    // --- 主題切換邏輯 ---
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    });
    
    // --- 占卜區塊事件 ---
    zodiacCards.forEach(card => {
        card.addEventListener('click', function() {
            zodiacCards.forEach(c => c.classList.remove('ring-4', 'ring-indigo-500'));
            this.classList.add('ring-4', 'ring-indigo-500');
            selectedZodiac = this.dataset.sign;
        });
    });

    document.getElementById('generateFortune').addEventListener('click', generateFortune);

    // --- AI 聊天區塊事件 ---
    sendMessageBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // 初始化 AI 聊天區塊 (顯示開場白)
    const initialMessageText = "您好，我是您的心靈療癒師 Mika。歡迎您來聊聊今天的運勢是否符合您的感受，或者單純想抱怨一些事情。我會在這裡，靜靜傾聽。";
    
    // 初始化歷史紀錄 (包含系統指示和開場白)
    history = [
        { role: "user", parts: [{ text: SYSTEM_INSTRUCTION }] },
        { role: "model", parts: [{ text: initialMessageText }] }
    ];
    
    // 顯示初始訊息
    appendMessage(initialMessageText, 'system');
});
