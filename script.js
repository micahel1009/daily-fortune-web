// script.js

// === 1. 占卜結果資料庫 (擴充版: 根據星座和籤運的組合) ===
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


// === 2. 對話系統邏輯 (Mika 療癒師) ===

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 關鍵詞和回應模組 (人性化、諮商風格)
const mikaResponses = [
    // 抱怨/壓力相關 (同理心 + 開放式提問)
    { keywords: ['累', '壓力', '煩', '受不了', '抱怨', '難過', '生氣', '糟', '辛苦'], 
      response: "聽起來您今天真的承受了很多。光是能撐過今天，您就已經很棒了，請允許自己休息一下。您願意說說具體是哪件事讓您特別煩躁或難受嗎？我會在這裡陪伴您。" },
    
    // 運勢不準確 (接受 + 重新導向內心感受)
    { keywords: ['不準', '沒發生', '騙人', '不好', '落差'], 
      response: "謝謝您的坦誠。占卜結果只是一個參考光譜，真實人生充滿變數。您覺得哪一部分跟您的實際感受落差最大呢？我很願意聽聽您的真實情況，因為您的感受才是最重要的指引。" },
    
    // 詢問/不確定 (引導思考 + 鼓勵)
    { keywords: ['怎麼辦', '我該', '疑惑', '不確定', '建議', '選擇'], 
      response: "面對不確定性確實讓人焦慮。深呼吸，讓我們把問題拆解一下。您內心深處最渴望的結果是什麼呢？我們從那個渴望反推，會不會比較清楚第一步該怎麼走？" },
    
    // 成功/高興 (共同慶祝 + 肯定價值)
    { keywords: ['成功', '高興', '好運', '開心', '棒', '順利'], 
      response: "聽到您這麼開心，我由衷替您高興！請盡情享受這一刻的喜悅，這是您努力應得的獎勵。記得把這份美好的心情好好收藏起來，它可以成為您未來面對挑戰的力量！" },
    
    // 簡單問候/感謝 (溫暖回應)
    { keywords: ['你好', '謝謝', '感謝', '哈囉'], 
      response: "不用客氣，這是我的榮幸。如果您沒有其他想分享的，記得要好好照顧自己。今天過得還好嗎？" },

    // 結束/道別
    { keywords: ['再見', '晚安', '掰掰', '離開'], 
      response: "今天很高興能陪伴您。請記得，無論明天發生什麼，您永遠有能力讓事情變得更好。照顧好自己，祝您有個平靜的夜晚，我們隨時在這裡等您。" },
      
    // 預設回應 (當沒有匹配的關鍵詞時: 撫慰人心、表達陪伴)
    { keywords: [], 
      response: "嗯... 謝謝您願意分享。有時候，只是把感受說出來，本身就是一種釋放。我能感受到您話語背後的情緒。我會在這裡，您不需要急著說什麼，只是待著也好，我在這裡聽著。" }
];

// 處理傳送按鈕和 Enter 鍵
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === '') return;

    // 1. 顯示使用者訊息
    appendMessage(userText, 'user-message');

    // 2. 清空輸入框
    userInput.value = '';

    // 3. 延遲後顯示 Mika 回覆 (模擬思考時間)
    setTimeout(() => {
        const mikaReply = getMikaResponse(userText);
        appendMessage(mikaReply, 'system-message');
    }, 1200); // 延遲 1.2 秒，讓對話看起來更自然
}

function getMikaResponse(text) {
    const lowerText = text.toLowerCase();

    // 嘗試匹配關鍵詞
    for (const item of mikaResponses) {
        for (const keyword of item.keywords) {
            // 使用 includes 來檢查關鍵詞
            if (lowerText.includes(keyword)) {
                return item.response;
            }
        }
    }

    // 返回預設回應
    return mikaResponses.find(item => item.keywords.length === 0).response;
}

function appendMessage(text, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    // 保持捲動條在最下方
    chatBox.scrollTop = chatBox.scrollHeight;
}