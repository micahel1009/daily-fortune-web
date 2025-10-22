let selectedZodiac = '';
let selectedTarotCard = '';
let cardFlipped = false; // 追蹤是否已抽牌

// --- 占卜數據 (已優化，添加了更像建議的語氣) ---
const zodiacFortunes = {
    '牡羊座': { love: '你今日愛情能量爆棚，單身者勇敢出擊，有伴者不妨製造小驚喜。', career: '工作上充滿衝勁，適合挑戰新任務，但要避免過於衝動做決定。', money: '財運平穩，適合進行小額投資，但須審慎評估。', advice: '你的熱情是今日的指引之星，保持積極樂觀的態度，但同時練習耐心傾聽。' },
    '金牛座': { love: '感情進入穩定舒適期，適合與伴侶享受寧靜時光，細水長流的愛更顯珍貴。', career: '踏實努力的態度將獲得上司肯定，專注於細節的處理能避免錯誤。', money: '理財能力出色，適合長期穩健投資，財富將在不經意間累積。', advice: '慢工出細活，用心經營你所珍視的一切，不必急於一時的成敗。' },
    '雙子座': { love: '溝通是今日愛情的關鍵詞，真誠而幽默的表達能化解誤會，為關係帶來活力。', career: '靈活應變能力強，適合多線操作，創意和新點子會得到重視。', money: '收入來源多元，但要注意分散風險，避免因猶豫不決而錯失良機。', advice: '保持好奇心和學習熱忱，新知識和人脈將為你開啟新機會，享受變化帶來的樂趣。' },
    '巨蟹座': { love: '家庭與安全感是今日重心，與家人、伴侶的溫馨時光帶來內心平靜。', career: '細心與同理心讓你成為團隊中的重要支柱，適合處理需要情感連結的任務。', money: '保守理財適合當前局勢，注意家庭開支的平衡，為未來做打算。', advice: '傾聽你內心的聲音，情感直覺會指引你做出最溫柔且正確的決定。給自己多一點愛與照顧。' },
    '獅子座': { love: '魅力四射的你吸引眾人目光，自信展現真實自我，但需避免過於自我中心。', career: '領導才能得到發揮，勇於承擔責任將提升你的專業聲望。', money: '適合投資個人形象與專業技能提升，長遠回報豐厚。', advice: '相信自己的能力，你是發光體，但也請記得謙遜聆聽他人建議，讓團隊與你一同發光。' },
    '處女座': { love: '感情中的完美主義需要放鬆，學會欣賞對方的不完美，讓愛更貼近生活。', career: '注重細節的特質讓工作品質出眾，但要注意避免過度勞累或苛求。', money: '精明的理財眼光讓你發現投資良機，謹慎分析是成功的關鍵。', advice: '追求進步的同時，也要給自己和他人一些寬容空間。休息是為了走更長遠的路。' },
    '天秤座': { love: '人際關係和諧，單身者通過社交活動有機會遇到合適對象。', career: '協調溝通能力出色，是團隊中不可或缺的橋樑，適合處理爭議。', money: '平衡收支是今日重點，避免為了迎合他人或面子而過度消費。', advice: '保持內心的平衡與優雅，在選擇面前，要相信自己獨立的判斷力。' },
    '天蠍座': { love: '深度情感交流帶來心靈契合，真誠相待能突破關係瓶頸，不懼怕脆弱。', career: '洞察力敏銳，能發現他人忽略的重要細節，為團隊帶來突破性進展。', money: '投資直覺準確，但必須控制風險，避免過於激進或秘密操作。', advice: '相信內在力量，你的堅持和專注將帶來意想不到的成果。深度思考能帶來真正的蛻變。' },
    '射手座': { love: '自由奔放的個性吸引志同道合的人，適合規劃一次小旅行增進感情。', career: '國際視野和開放心態為你帶來新機會，勇於嘗試新挑戰。', money: '投資海外市場或教育學習會有不錯回報，保持開放心態。', advice: '保持樂觀探索精神，人生就像一場美妙的冒險旅程，多去看看世界吧。' },
    '摩羯座': { love: '務實的愛情觀幫助你建立穩固關係，長期規劃讓感情更有保障。', career: '努力付出終於看到回報，職業發展進入穩定上升期，堅守紀律。', money: '保守投資策略奏效，長期積累將帶來可觀財富，儲蓄是王道。', advice: '堅持自己的目標和原則，時間會證明你的選擇是正確的。為自己的努力感到驕傲。' },
    '水瓶座': { love: '獨特的個性魅力讓你閃閃發光，創新的約會方式能帶來驚喜。', career: '創新思維為工作帶來新突破，團隊因你的獨特想法而受益。', money: '科技相關投資值得關注，但要做好風險評估，避免跟風。', advice: '保持獨立思考，你的與眾不同正是最大的優勢。嘗試與不同的人交流，激發更多靈感。' },
    '雙魚座': { love: '感性浪漫的一面特別迷人，用心感受愛情的美好，創造夢幻般的時刻。', career: '創意靈感豐富，藝術或療癒相關工作有突出表現，跟隨直覺。', money: '直覺投資可能有意外收穫，但要避免情緒化決策，保持清醒。', advice: '相信內心的感受，你的同理心和善良會為你帶來好運。但也要學會劃清界線，保護自己。' }
};

const tarotMeanings = {
    '太陽': { love: '太陽牌的出現，為你的愛情帶來積極的能量和清晰的視野。任何陰霾都將散去，享受這份喜悅和光明吧！', career: '這是一張成功的牌，代表你的努力將獲得巨大的認可和回報。適合公開發表或推動重大專案。', money: '財運極佳，投資有如陽光普照，適合積極理財，會有意想不到的收穫。', advice: '保持開朗、自信且真誠的心態，享受生活的美好與豐盛。成功指日可待。' },
    '月亮': { love: '月亮牌暗示感情中可能存在不安或誤解，你需要依靠直覺去探索潛藏的情緒，並加強溝通。', career: '工作中可能有些模糊不清的狀況，不要被表象迷惑，需要更深入地探查細節，保持警覺。', money: '理財上需要特別謹慎，避免被不切實際的承諾誘惑，依靠理性分析。', advice: '相信內心的智慧，它會幫你看清真相。放下焦慮，允許自己面對內心的陰影與不安。' },
    '星星': { love: '星星牌象徵希望、靈感與療癒。你的感情充滿了美好的憧憬，過去的傷口正在癒合，未來充滿光明。', career: '你的理想和現實找到了平衡點，朝著長期目標穩步前進。保持信念，繼續為夢想努力。', money: '長遠規劃帶來穩定回報，耐心等待收穫時機。可以考慮將資金用於自我提升。', advice: '保持對未來的信心，你的願望會逐步實現。給予自己和他人希望，療癒的力量在你心中。' }
};

const availableTarots = ['太陽', '月亮', '星星'];


// --- 諮商師式對話邏輯 (Chatbot) ---
const comfortResponses = [
    "我聽到了你的感受，這確實不容易。你願意告訴我更多細節嗎？我是來傾聽的。",
    "每個人都會有這樣的低潮時刻，你並不孤單。我想更了解你現在的感受，你已經很努力了。",
    "謝謝你願意與我分享這些。你的感受都是真實且重要的，請放心說出來。",
    "聽起來你現在承受了不少壓力。你是怎麼撐過來的？我為你的堅強感到驕傲。",
    "我知道你已經很努力了，你真的很棒。想要繼續說說嗎？我會一直在這裡陪你。",
    "如果雨季遲遲沒有結束，我會陪你一起撐傘。你現在最需要的是什麼，請告訴我。",
    "你的感受我都能理解。這世界不完美，但我們可以一起尋找解決的微光。",
    "不怕！放心，你不是一個人。我會一直在這裡聽你說，請把情緒都釋放出來。",
    "順從自己的心，有些事情交給時間去解決。你覺得現在最需要的是什麼樣的安慰？"
];

const counsellingResponses = {
    'negative_keywords': [
        { keys: ['不準', '爛', '差', '衰', '倒楣', '煩', '不高興', '生氣', '難過', '壓力', '累', '委屈', '想哭'],
          responses: [
            "我完全理解你的感受，今天過得不順心確實讓人很沮喪。你願意多分享一些今天發生的事情嗎？我會在這裡接住你的情緒。",
            "謝謝你坦誠地告訴我。運勢只是參考，但你的真實感受才是最重要的。聽起來你承受了很多，請放心，我在這裡陪著你。",
            "沒關係，把這裡當作是一個樹洞。請說說看，是什麼讓你感到如此煩惱和壓力？把情緒說出來，會舒服一些的。"
          ]
        },
    ],
    'accuracy_keywords': [
        { keys: ['準', '對', '命中', '神準', '好準'],
          responses: [
            "很高興我的占卜能給你帶來一些方向感！但請記得，最重要的是你如何運用這份指引，去創造屬於自己的美好。",
            "謝謝你的肯定，這讓我感到很溫暖。這份運勢是否讓你對今天的某些事情有了新的看法或動力呢？"
          ]
        },
        { keys: ['不準', '無感', '還好', '沒感覺', '沒用'],
          responses: [
            "嗯，運勢的解讀是主觀的，可能今天更需要你傾聽內心的聲音。你覺得哪些部分與你的實際情況有所出入呢？或許我們可以一起探索。",
            "沒關係，每個人的感受不同。如果運勢不能完全反應你的情況，那麼現在最困擾你的真實問題是什麼？我很想聽聽。"
          ]
        }
    ],
    'positive_keywords': [
        { keys: ['謝謝', '感謝', '愛你', '鼓勵', '溫暖', '開心', '很好', '喜歡'],
          responses: [
            "能為你帶來一點點溫暖，我就心滿意足了。請記住，你的善良和力量才是真正的幸運之源。",
            "不用客氣，這是我的榮幸。照顧好自己的情緒是很重要的，你今天已經做得非常好了！",
            "我很高興聽到你這麼說！讓我們一起期待美好的明天吧！"
          ]
        }
    ]
};


// --- 核心函數 ---

document.addEventListener('DOMContentLoaded', function() {
    // 1. 主題切換邏輯
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    });

    // 2. 星座選擇事件
    document.querySelectorAll('.zodiac-card').forEach(card => {
        card.addEventListener('click', function() {
            // 清除所有卡片的選中狀態
            document.querySelectorAll('.zodiac-card').forEach(c => c.classList.remove('selected', 'ring-4', 'ring-indigo-500', 'dark:ring-indigo-400'));
            
            // 設置當前卡片的選中狀態
            this.classList.add('selected', 'ring-4', 'ring-indigo-500', 'dark:ring-indigo-400');
            selectedZodiac = this.dataset.sign;
        });
    });

    // 3. 生成運勢按鈕事件
    document.getElementById('generateFortune').addEventListener('click', function() {
        if (!selectedZodiac) {
            alert('請先選擇你的星座！');
            return;
        }
        if (!selectedTarotCard) {
            alert('請先抽取一張塔羅牌！');
            return;
        }
        
        // 禁用按鈕防止重複生成
        this.disabled = true;
        generateFortune();
    });

    // 4. 聊天訊息發送事件
    document.getElementById('sendMessage').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});

// 必須放在全域環境 (或在 document.addEventListener 之前) 才能被 HTML 呼叫
window.flipCard = function(card) {
    if (cardFlipped) {
        alert('今日僅能抽取一張牌，請等待運勢結果！');
        return;
    }

    const flipDiv = card.querySelector('.tarot-flip');
    const backDiv = card.querySelector('.tarot-back');
                
    if (!flipDiv.classList.contains('flipped')) {
        flipDiv.classList.add('flipped');
        cardFlipped = true; // 鎖定抽牌

        // 隨機抽取一張牌
        const randomIndex = Math.floor(Math.random() * availableTarots.length);
        selectedTarotCard = availableTarots[randomIndex];

        // 根據牌名設置圖標和顏色
        const iconElement = backDiv.querySelector('i');
        const textElement = backDiv.querySelector('p');
        
        let iconClass = '';
        let iconColor = '';
        
        if (selectedTarotCard === '太陽') {
            iconClass = 'fas fa-sun';
            iconColor = 'text-yellow-500';
        } else if (selectedTarotCard === '月亮') {
            iconClass = 'fas fa-moon';
            iconColor = 'text-blue-500';
        } else if (selectedTarotCard === '星星') {
            iconClass = 'fas fa-star';
            iconColor = 'text-purple-500';
        }

        iconElement.className = iconClass + ' text-xl mb-1 ' + iconColor;
        textElement.textContent = selectedTarotCard;
        
        // 讓其他未抽的牌變暗，並禁用點擊
        document.querySelectorAll('.tarot-card').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
                otherCard.style.pointerEvents = 'none'; 
            }
        });
    }
}

// 生成運勢結果邏輯 (強化版)
function generateFortune() {
    const readings = generateComprehensiveReading(selectedZodiac, selectedTarotCard);

    document.getElementById('selectedSign').textContent = selectedZodiac;
    document.getElementById('selectedTarot').textContent = selectedTarotCard;

    document.getElementById('loveReading').innerHTML = readings.love;
    document.getElementById('careerReading').innerHTML = readings.career;
    document.getElementById('moneyReading').innerHTML = readings.money;
    document.getElementById('adviceReading').innerHTML = readings.advice;

    document.getElementById('fortuneResult').classList.remove('hidden');
    document.getElementById('fortuneResult').scrollIntoView({ behavior: 'smooth' });
}

// 綜合讀數生成函數
function generateComprehensiveReading(sign, tarot) {
    const zodiac = zodiacFortunes[sign];
    const card = tarotMeanings[tarot];

    let combinedLove = `${zodiac.love} <br><br>塔羅牌「${tarot}」建議你：${card.love}`;
    let combinedCareer = `${zodiac.career} <br><br>塔羅牌「${tarot}」提示你：${card.career}`;
    let combinedMoney = `${zodiac.money} <br><br>塔羅牌「${tarot}」提示：${card.money}`;

    let finalAdvice = `**【星引給你的話】**<br>今日的星象與「${tarot}」這張牌為你帶來的啟示是：${zodiac.advice}。<br><br>請記得，面對今日的挑戰或機會，最重要的是：**${card.advice.replace('。', '')}**，你已經具備了所需的力量，請相信自己。`;

    return {
        love: combinedLove,
        career: combinedCareer,
        money: combinedMoney,
        advice: finalAdvice
    };
}

// 獲取諮商師式回應邏輯
function getCounsellingResponse(message) {
    const lowerMessage = message.toLowerCase();

    // 1. 檢查具體關鍵詞
    for (const type in counsellingResponses) {
        for (const set of counsellingResponses[type]) {
            for (const key of set.keys) {
                if (lowerMessage.includes(key)) {
                    const responses = set.responses;
                    return responses[Math.floor(Math.random() * responses.length)];
                }
            }
        }
    }

    // 2. 如果沒有匹配到關鍵詞，使用通用的同理心回應
    return comfortResponses[Math.floor(Math.random() * comfortResponses.length)];
}


// 訊息發送邏輯
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const userMessageText = input.value.trim();

    if (!userMessageText) return;

    const chatMessages = document.getElementById('chatMessages');

    // 創建使用者訊息 DOM
    const userMessage = document.createElement('div');
    userMessage.className = 'flex items-start space-x-3 justify-end';
    userMessage.innerHTML = `
        <div class="user-bubble bg-indigo-600 text-white p-4">
            <p>${userMessageText}</p>
        </div>
        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i class="fas fa-user text-gray-600 dark:text-gray-300 text-sm"></i>
        </div>
    `;

    chatMessages.appendChild(userMessage);
    input.value = ''; 

    // 設置機器人回覆的延遲
    setTimeout(() => {
        const botResponseText = getCounsellingResponse(userMessageText); 
        
        // 創建機器人訊息 DOM
        const botResponse = document.createElement('div');
        botResponse.className = 'flex items-start space-x-3';
        botResponse.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-heart text-white text-sm"></i>
            </div>
            <div class="message-bubble bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4">
                <p class="text-gray-800 dark:text-gray-200">${botResponseText}</p>
            </div>
        `;

        chatMessages.appendChild(botResponse);
        // 自動滾動到最新訊息
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000); 

    // 立即滾動以顯示用戶訊息
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
