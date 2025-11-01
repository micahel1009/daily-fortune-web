let selectedZodiac = '';
let selectedTarotCard = ''; // 格式為 '牌名_正位/逆位'

// 占卜結果數據庫
const zodiacFortunes = {
    '牡羊座': {
        love: '今日愛情能量強烈，單身者有機會遇到命中注定的人，有伴侶者感情更加甜蜜。',
        career: '工作上充滿活力，勇於表達想法將為你帶來意想不到的機會。',
        money: '財運平穩，適合進行小額投資，避免衝動消費。',
        advice: '保持積極樂觀的態度，你的熱情將感染身邊的人。'
    },
    '金牛座': {
        love: '感情穩定發展，耐心經營關係將獲得回報，避免過於固執。',
        career: '踏實努力的態度受到上司認可，堅持不懈將有所收穫。',
        money: '理財能力出色，適合長期投資規劃，財富穩步增長。',
        advice: '慢工出細活，用心經營的事物都會有好結果。'
    },
    '雙子座': {
        love: '溝通是今日愛情的關鍵，真誠表達內心想法能化解誤會。',
        career: '靈活應變的能力幫助你處理複雜問題，創意想法受到重視。',
        money: '多元投資策略奏效，但要注意分散風險。',
        advice: '保持好奇心和學習熱忱，新知識將為你開啟新機會。'
    },
    '巨蟹座': {
        love: '家庭和諧帶來內心平靜，與家人的溫馨時光讓感情更穩固。',
        career: '細心負責的工作態度獲得認可，團隊合作順利。',
        money: '保守理財策略適合當前局勢，注意家庭開支平衡。',
        advice: '傾聽內心聲音，情感直覺將指引你做出正確決定。'
    },
    '獅子座': {
        love: '魅力四射的你吸引眾人目光，自信展現真實自我最有魅力。',
        career: '領導才能得到發揮，勇於承擔責任將提升個人聲望。',
        money: '適合投資個人形象提升，長遠來看會有豐厚回報。',
        advice: '相信自己的能力，但也要懂得謙虛聆聽他人建議。'
    },
    '處女座': {
        love: '完美主義傾向需要調整，學會欣賞對方的不完美也是一種美。',
        career: '注重細節的特質讓工作品質出眾，但避免過於苛求。',
        money: '精明的理財眼光幫助你發現投資良機，謹慎分析後行動。',
        advice: '追求完美的同時，也要給自己和他人一些寬容空間。'
    },
    '天秤座': {
        love: '人際關係和諧，單身者通過朋友介紹有機會遇到合適對象。',
        career: '協調溝通能力出色，成為團隊中不可或缺的橋樑。',
        money: '平衡收支是今日重點，避免為了面子而過度消費。',
        advice: '保持內心平衡，在選擇面前要相信自己的判斷力。'
    },
    '天蠍座': {
        love: '深度情感交流帶來心靈契合，真誠相待能突破關係瓶頸。',
        career: '洞察力敏銳，能發現他人忽略的重要細節，為團隊帶來突破。',
        money: '投資直覺準確，但要控制風險，避免過於激進。',
        advice: '相信內在力量，你的堅持和專注將帶來意想不到的成果。'
    },
    '射手座': {
        love: '自由奔放的個性吸引志同道合的人，遠距離戀情有好消息。',
        career: '國際視野和開放心態為你帶來新機會，勇於嘗試新挑戰。',
        money: '投資海外市場或教育學習會有不錯回報。',
        advice: '保持樂觀探索精神，人生就像一場美妙的冒險旅程。'
    },
    '摩羯座': {
        love: '務實的愛情觀幫助你建立穩固關係，長期規劃讓感情更有保障。',
        career: '努力付出終於看到回報，職業發展進入穩定上升期。',
        money: '保守投資策略奏效，長期積累將帶來可觀財富。',
        advice: '堅持自己的目標和原則，時間會證明你的選擇是正確的。'
    },
    '水瓶座': {
        love: '獨特的個性魅力讓你在人群中閃閃發光，創新的約會方式很受歡迎。',
        career: '創新思維為工作帶來新突破，團隊因你的想法而受益。',
        money: '科技相關投資值得關注，但要做好風險評估。',
        advice: '保持獨立思考，你的與眾不同正是最大的優勢。'
    },
    '雙魚座': {
        love: '感性浪漫的一面特別迷人，用心感受愛情的美好。',
        career: '創意靈感豐富，藝術相關工作有突出表現。',
        money: '直覺投資可能有意外收穫，但要避免情緒化決策。',
        advice: '相信內心的感受，你的同理心和善良會為你帶來好運。'
    }
};

// 塔羅牌含義 (包含正逆位)
const tarotMeanings = {
    '太陽_正位': {
        love: '愛情充滿陽光和活力，正面能量讓關係更加和諧。',
        career: '事業前景光明，努力將得到應有的認可和回報。',
        money: '財運亨通，投資理財都有不錯的表現。',
        advice: '保持樂觀與真誠，你的光芒將照亮周圍。'
    },
    '太陽_逆位': {
        love: '愛情上可能感到被忽視或關係停滯，需要主動尋找快樂。',
        career: '專案進展不順或缺乏動力，需要重新審視目標。',
        money: '注意虛榮消費，可能會導致不必要的浪費。',
        advice: '試著從不同角度看待問題，重拾內心的熱情。'
    },
    '月亮_正位': {
        love: '情感豐富，但需提防不確定性或潛在的誤會，相信直覺。',
        career: '工作上創意湧現，但需警惕小人或模糊不清的指令。',
        money: '理財上需謹慎，避免情緒化投資。',
        advice: '傾聽內心的聲音，但不宜在迷茫時做出重大決定。'
    },
    '月亮_逆位': {
        love: '心中的迷霧逐漸散去，真相浮現，有利於解決感情中的疑慮。',
        career: '擺脫不安與焦慮，看清工作中的困難並找到解決方法。',
        money: '財務上的困境即將解除，收支狀況趨於穩定。',
        advice: '勇敢地面對事實，走出陰影，光明就在前方。'
    },
    '星星_正位': {
        love: '心懷希望與夢想，單身者有新機會，有伴者共同憧憬未來。',
        career: '理想和現實找到平衡點，朝目標穩步前進，充滿靈感。',
        money: '長遠規劃帶來穩定回報，耐心等待收穫時機。',
        advice: '保持對未來的信心和開放的心態，你的願望會逐步實現。'
    },
    '星星_逆位': {
        love: '可能感到希望落空或缺乏信心，需要重拾對愛情的熱情。',
        career: '感到無助或失去方向，需調整不切實際的目標。',
        money: '財務上可能因過度樂觀而受損，需腳踏實地。',
        advice: '是時候重新評估你的目標，並專注於當下能夠實現的步驟。'
    }
};


// 諮商師回應數據庫 (人性化溝通) - 已優化回應
const counselorResponses = {
    generalComfort: [
        "我聽到了你的感受，這確實不容易。你願意告訴我更多嗎？或許說出來會讓心情好一些。",
        "每個人都會有這樣的時刻，你並不孤單。我想更了解你現在的感受是什麼。",
        "謝謝你願意與我分享這些。你的感受都是真實且重要的，請不用擔心。",
        "我知道你已經很努力了，光是願意來這裡傾訴，你就已經很棒了。你現在最想聊聊的是什麼呢？",
        "如果雨季遲遲沒有結束，我會陪你一起淋雨。你覺得現在最需要的是什麼樣的支持呢？",
        "順從自己的心，我們一起慢慢理清思緒。你現在最想解決的是哪一部分？"
    ],
    careerKeywords: ['工作', '上班', '老闆', '同事', '壓力', '專案', '加班', '裁員', '業績', '職場'],
    careerResponses: [
        "聽起來工作上給你帶來了不小的壓力。你覺得這種壓力主要來自哪個方面呢？我們來看看有沒有可以調整的空間。",
        "處理複雜的職場關係確實讓人心力交瘁。你覺得最困難的部分是什麼？記住，你的價值不只是工作表現，你已經盡力了。",
        "工作不順利的時候，挫折感是很正常的。有沒有什麼讓你感到小小的成就感的事情，可以稍微分散一下注意力呢？",
        "關於工作，你目前最希望得到什麼樣的幫助或建議呢？或許我們可以一起探索一些可能性。",
        "面對職場上的挑戰，你真的很不容易。你覺得如果能改變一件事，會是什麼呢？"
    ],
    loveKeywords: ['感情', '愛情', '分手', '伴侶', '朋友', '吵架', '孤單', '寂寞', '約會', '單身', '桃花', '人際'],
    loveResponses: [
        "感情的波折總是特別讓人難受。我很欣賞你願意面對這些。你現在最需要的，是有人聆聽還是想找出下一步怎麼做？",
        "孤單的感受是很真實的，但請記得，感受是會流動的。你覺得什麼時候，這個孤單感會稍微減輕一點？",
        "人際關係中的摩擦在所難免。你覺得這次爭執，有沒有什麼是你很想表達，但還沒說出口的呢？",
        "關於感情或人際，你現在最希望我能如何支持你呢？說出來或許能幫助你理清思緒。",
        "愛情的課題往往充滿挑戰，謝謝你願意分享。你覺得目前的狀況，最讓你感到困惑的是哪一點？"
    ],
    fortuneKeywords: ['不準', '騙人', '沒用', '亂說', '預測', '結果'],
    fortuneResponses: [
        "我很抱歉這次的占卜結果沒能給你帶來安慰。占卜是一種指引，但你永遠是自己人生的主人。你覺得今天發生的什麼事，讓你覺得結果不準確呢？我想聽聽你的故事。",
        "沒關係，運勢只是一個參考。或許它提醒了我們需要關注一些被忽略的細節。你今天最困擾你的事情是什麼？我們來聊聊實質的困難吧！",
        "占卜結果有時會與實際感受有所出入，這是很正常的。你覺得哪些部分與你的期待不符？我很樂意聽你說說。",
        "謝謝你分享對占卜結果的看法。無論如何，最終的決定權都在你手中。你現在最想解決的是什麼具體問題呢？"
    ],
    // 增加一些更直接的回應模式，避免一直提問
    affirmativeResponses: [
        "是的，我明白你的感受。這確實不容易，但請相信你會找到解決方法的。",
        "你說的很有道理，我完全理解你的困境。光是表達出來，就已經很勇敢了。",
        "我聽到你的心聲了。無論發生什麼，你都不是一個人面對。",
        "嗯，這的確是個挑戰。很高興你願意和我分享，我在這裡支持你。",
        "我感受到你的情緒了。請允許自己有這樣的感受，然後我們再一起想想看怎麼辦。"
    ]
};


document.addEventListener('DOMContentLoaded', function() {
    // 之前的主題切換邏輯已移除

    // --- 星座選擇事件 ---
    document.querySelectorAll('.zodiac-card').forEach(card => {
        card.addEventListener('click', function() {
            // 移除所有卡片的選中樣式
            document.querySelectorAll('.zodiac-card').forEach(c => c.classList.remove('ring-4', 'ring-indigo-500', 'dark:ring-indigo-400'));
            // 添加當前卡片的選中樣式
            this.classList.add('ring-4', 'ring-indigo-500', 'dark:ring-indigo-400');
            selectedZodiac = this.dataset.sign;
        });
    });

    // --- 生成運勢按鈕事件 ---
    document.getElementById('generateFortune').addEventListener('click', function() {
        if (!selectedZodiac) {
            alert('請先選擇你的星座！');
            return;
        }
        if (!selectedTarotCard) {
            alert('請先抽取一張塔羅牌！');
            return;
        }
        generateFortune();
    });

    // --- 聊天發送訊息事件 ---
    document.getElementById('sendMessage').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // 避免 Enter 換行
            sendChatMessage();
        }
    });
});


// 塔羅牌翻轉邏輯 (包含正逆位判斷)
function flipCard(card) {
    const flipDiv = card.querySelector('.tarot-flip');
    const backDiv = card.querySelector('.tarot-back');

    if (!flipDiv.classList.contains('flipped')) {
        // 檢查是否已抽取過牌
        if (document.querySelector('.tarot-flip.flipped')) {
             alert('今天只能抽一張牌喔！');
             return;
        }

        flipDiv.classList.add('flipped');

        // 定義牌組和正逆位
        const tarotNames = ['太陽', '月亮', '星星'];
        const icons = ['fas fa-sun', 'fas fa-moon', 'fas fa-star'];
        const colors = ['text-yellow-500', 'text-blue-500', 'text-purple-500'];
        const orientations = ['正位', '逆位'];

        const randomIndex = Math.floor(Math.random() * tarotNames.length);
        const randomOrientationIndex = Math.floor(Math.random() * orientations.length);

        // 決定抽到的牌名 (e.g., '太陽_正位')
        const tarotName = tarotNames[randomIndex];
        const orientation = orientations[randomOrientationIndex];
        selectedTarotCard = tarotName + '_' + orientation;

        const iconElement = backDiv.querySelector('i');
        const textElement = backDiv.querySelector('p');

        iconElement.className = icons[randomIndex] + ' text-xl mb-1 ' + colors[randomIndex];
        // 顯示牌名和正逆位
        textElement.innerHTML = `${tarotName}<br><span class="text-xs text-gray-500 dark:text-gray-400">${orientation}</span>`;

        // 鎖定其他卡牌
        document.querySelectorAll('.tarot-card').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.5';
                otherCard.style.pointerEvents = 'none';
            }
        });
    }
}

// 運勢結果生成邏輯
function generateFortune() {
    const zodiacReading = zodiacFortunes[selectedZodiac];
    const tarotReading = tarotMeanings[selectedTarotCard];

    // 顯示選擇結果
    document.getElementById('selectedSign').textContent = selectedZodiac;
    document.getElementById('selectedTarot').textContent = selectedTarotCard.replace('_', ' '); // 顯示 '太陽 正位'

    // 組合運勢
    document.getElementById('loveReading').textContent = combineReadings(zodiacReading.love, tarotReading.love);
    document.getElementById('careerReading').textContent = combineReadings(zodiacReading.career, tarotReading.career);
    document.getElementById('moneyReading').textContent = combineReadings(zodiacReading.money, tarotReading.money);
    document.getElementById('adviceReading').textContent = combineReadings(zodiacReading.advice, tarotReading.advice);

    // 顯示結果區並滾動過去
    document.getElementById('fortuneResult').classList.remove('hidden');
    document.getElementById('fortuneResult').scrollIntoView({ behavior: 'smooth' });
}

// 簡單組合星座和塔羅的運勢解釋
function combineReadings(zodiacText, tarotText) {
    return `【星座啟示】${zodiacText} 【塔羅指引】${tarotText}`;
}

// 聊天機器人發送訊息邏輯 (諮商模擬) - 已優化回應邏輯
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    const chatMessages = document.getElementById('chatMessages');

    // 1. 顯示使用者訊息
    const userMessage = document.createElement('div');
    userMessage.className = 'flex items-start space-x-3 justify-end';
    userMessage.innerHTML = `
        <div class="user-bubble bg-indigo-600 text-white p-4 max-w-md shadow-md">
            <p>${message}</p>
        </div>
        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
            <i class="fas fa-user text-gray-600 dark:text-gray-300 text-sm"></i>
        </div>
    `;
    chatMessages.appendChild(userMessage);
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight; // 滾動到底部

    // 2. 機器人回覆邏輯 (模擬諮商師)
    setTimeout(() => {
        let botText = '';
        const lowerCaseMessage = message.toLowerCase();
        
        let matched = false;
        
        // 優先檢查特定關鍵詞回覆
        if (counselorResponses.careerKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            botText = counselorResponses.careerResponses[Math.floor(Math.random() * counselorResponses.careerResponses.length)];
            matched = true;
        } 
        else if (counselorResponses.loveKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            botText = counselorResponses.loveResponses[Math.floor(Math.random() * counselorResponses.loveResponses.length)];
            matched = true;
        }
        else if (counselorResponses.fortuneKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            botText = counselorResponses.fortuneResponses[Math.floor(Math.random() * counselorResponses.fortuneResponses.length)];
            matched = true;
        }
        
        // 如果沒有匹配到特定關鍵詞，隨機選用通用安慰或肯定回覆
        if (!matched) {
            // 50% 機率是通用安慰，50% 機率是肯定回覆
            if (Math.random() < 0.5) {
                botText = counselorResponses.generalComfort[Math.floor(Math.random() * counselorResponses.generalComfort.length)];
            } else {
                botText = counselorResponses.affirmativeResponses[Math.floor(Math.random() * counselorResponses.affirmativeResponses.length)];
            }
        }

        // 3. 顯示機器人訊息
        const botResponse = document.createElement('div');
        botResponse.className = 'flex items-start space-x-3';
        botResponse.innerHTML = `
            <div class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-heart text-white text-sm"></i>
            </div>
            <div class="message-bubble bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 max-w-md shadow-md">
                <p class="text-gray-800 dark:text-gray-200">${botText}</p>
            </div>
        `;
        chatMessages.appendChild(botResponse);
        chatMessages.scrollTop = chatMessages.scrollHeight; // 再次滾動到底部
    }, 1200); // 延遲 1.2 秒模擬思考時間
}
