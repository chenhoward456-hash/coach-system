'use client';

import { useState } from 'react';
import BackButton from '@/components/BackButton';

interface ResourcesSectionProps {
  onBack?: () => void;
}

interface BookResource {
  title: string;
  badge: string;
  badgeColor: string;
  why: string;
  keyPoints: string;
  howToRead: string;
  timeEstimate: string;
  link?: string;
}

export default function ResourcesSection({ onBack }: ResourcesSectionProps) {
  const [activeLevel, setActiveLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>('beginner');
  const [showMoreBeginnerBooks, setShowMoreBeginnerBooks] = useState(false);
  const [showMoreIntermediateBooks, setShowMoreIntermediateBooks] = useState(false);

  // 新手教練書籍
  const beginnerBooks: BookResource[] = [
    {
      title: '麥克波羅伊功能性訓練聖經',
      badge: '新手必讀',
      badgeColor: 'bg-green-100 text-green-700',
      why: '最適合新手的訓練系統書，寫得很清楚，有圖有表。',
      keyPoints: '動作篩檢、訓練分期、課表設計邏輯',
      howToRead: '第1-3章必讀，其他章節先看懂動作分類就好',
      timeEstimate: '2-3週（不用急著看完）',
    },
    {
      title: '怪獸肌力及體能訓練手冊',
      badge: '新手必讀',
      badgeColor: 'bg-green-100 text-green-700',
      why: '台灣本土經驗，更貼近我們的訓練環境。',
      keyPoints: '肌力訓練基礎、槓鈴動作技術、訓練邏輯',
      howToRead: '重點看「訓練原則」和「動作教學」章節',
      timeEstimate: '2-3週',
    },
    {
      title: '原子習慣',
      badge: '新手必讀',
      badgeColor: 'bg-green-100 text-green-700',
      why: '教你建立習慣（拍影片、課後關心），這是新手最需要的。',
      keyPoints: '1%法則、習慣堆疊、環境設計',
      howToRead: '每天看一點，立刻實踐在生活中',
      timeEstimate: '1週（很好讀）',
    },
  ];

  const beginnerMoreBooks: BookResource[] = [
    {
      title: '與成功有約（7個習慣）',
      badge: '進階選讀',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '經典中的經典，幫新手建立正確的成功思維。',
      keyPoints: '主動積極、以終為始、要事第一、雙贏思維',
      howToRead: '前3個習慣最重要，先看懂這3個',
      timeEstimate: '3-4週',
    },
    {
      title: '先問，為什麼？Start with Why',
      badge: '進階選讀',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '幫你找到「為什麼當教練」，這是你的北極星。',
      keyPoints: '黃金圈理論、從Why開始、激勵人心的領導',
      howToRead: '看完後寫下你的Why，這很重要',
      timeEstimate: '1-2週',
    },
    {
      title: '碳水循環飲食法',
      badge: '營養基礎',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '台灣醫師寫的，會員會問營養問題，這本最實用。',
      keyPoints: '碳水循環、減脂飲食、營養基礎',
      howToRead: '重點看實際應用章節，立刻能教會員',
      timeEstimate: '1-2週',
    },
    {
      title: '呼吸，為了療癒',
      badge: '進階選讀',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '很多會員有呼吸問題，這本書能幫你理解。',
      keyPoints: '呼吸模式、呼吸與壓力、呼吸訓練',
      howToRead: '新手可以先跳過，等有會員問呼吸問題再回來看',
      timeEstimate: '1-2週（選讀）',
    },
  ];

  const beginnerChannels: BookResource[] = [
    {
      title: 'Jeff Nippard',
      badge: '新手友善',
      badgeColor: 'bg-red-100 text-red-700',
      why: '科學化訓練，講解清晰，有中文字幕。',
      keyPoints: 'Fundamentals 系列、Science Explained 系列',
      howToRead: '每週看1-2支，不要貪多',
      timeEstimate: '',
      link: 'https://www.youtube.com/@JeffNippard',
    },
    {
      title: 'Jeremy Ethier',
      badge: '新手友善',
      badgeColor: 'bg-red-100 text-red-700',
      why: '動作技術講解很細，適合學習怎麼教動作。',
      keyPoints: 'Perfect Form 系列、Common Mistakes 系列',
      howToRead: '學一個動作之前，先看他怎麼講解',
      timeEstimate: '',
      link: 'https://www.youtube.com/@Jeremy_Ethier',
    },
    {
      title: '怪獸電台',
      badge: '中文資源',
      badgeColor: 'bg-green-100 text-green-700',
      why: '台灣肌力訓練界的經典，內容深度夠。',
      keyPoints: '訓練原則、槓鈴訓練、教練養成系列',
      howToRead: '通勤時聽，不用全部聽完',
      timeEstimate: '',
    },
  ];

  // 中手教練書籍
  const intermediateBooks: BookResource[] = [
    {
      title: 'NSCA 肌力與體能訓練',
      badge: '中手必讀',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '教練界的聖經，內容全面、科學嚴謹。',
      keyPoints: '訓練科學、動作技術、課表設計、特殊族群',
      howToRead: '不用一次看完，當工具書查閱',
      timeEstimate: '持續參考',
    },
    {
      title: '週期化力量訓練系統',
      badge: '中手必讀',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '深入理解訓練分期，提升課表設計能力。',
      keyPoints: '週期化理論、訓練分期、負荷管理',
      howToRead: '配合 NSCA 一起看',
      timeEstimate: '3-4週',
    },
    {
      title: '刻意練習',
      badge: '成長思維',
      badgeColor: 'bg-orange-100 text-orange-700',
      why: '中手需要精進技術，這本教你怎麼練到專家等級。',
      keyPoints: '刻意練習原則、心智表徵、回饋循環',
      howToRead: '設計自己的刻意練習計畫',
      timeEstimate: '1-2週',
    },
    {
      title: '科學減脂×瘦身全書',
      badge: '減脂專項',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '想做減脂專項的必讀，科學嚴謹、實用性高。',
      keyPoints: '減脂科學、飲食策略、訓練方法',
      howToRead: '邊看邊記，整理成你的減脂系統',
      timeEstimate: '2-3週',
    },
    {
      title: 'Good Energy 代謝力打造最強好能量',
      badge: '營養專項',
      badgeColor: 'bg-green-100 text-green-700',
      why: '深入理解代謝健康，提升營養諮詢能力。',
      keyPoints: '代謝健康、粒線體功能、營養策略',
      howToRead: '想做營養諮詢的必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '90%的病，控糖就會好',
      badge: '營養專項',
      badgeColor: 'bg-green-100 text-green-700',
      why: '很多會員有代謝問題，這本書能幫你理解。',
      keyPoints: '血糖控制、代謝症候群、飲食調整',
      howToRead: '配合 Good Energy 一起看',
      timeEstimate: '1-2週',
    },
    {
      title: '超預期壽命',
      badge: '進階知識',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '長壽科學、抗衰老，高端客戶會問這些。',
      keyPoints: '長壽科學、抗衰老策略、健康優化',
      howToRead: '想做高端客戶的可以看',
      timeEstimate: '2-3週',
    },
    {
      title: '世界第一的 R90 高效睡眠法',
      badge: '恢復專項',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      why: '睡眠是恢復關鍵，這本教你優化睡眠。',
      keyPoints: '90分鐘睡眠週期、睡眠優化、恢復策略',
      howToRead: '應用在運動員或高壓力會員身上',
      timeEstimate: '1-2週',
    },
  ];

  const intermediateMoreBooks: BookResource[] = [
    {
      title: '最佳狀態 Optimal',
      badge: '整合專項',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '整合健康、表現、恢復的完整系統。',
      keyPoints: '最佳表現、生活方式、整體健康',
      howToRead: '想做高端客戶的必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '如何吃（抵擋糖誘惑）',
      badge: '營養專項',
      badgeColor: 'bg-green-100 text-green-700',
      why: '營養專項，實用性很高，會員常問的問題都有解答。',
      keyPoints: '飲食策略、食物選擇、營養科學',
      howToRead: '邊看邊記，整理成你的營養諮詢系統',
      timeEstimate: '1-2週',
    },
    {
      title: '更新粒線體，根治慢性病',
      badge: '進階專項',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '深入理解代謝、慢性病，適合想做特殊族群的教練。',
      keyPoints: '粒線體功能、代謝健康、慢性病預防',
      howToRead: '配合 Good Energy 一起看',
      timeEstimate: '2-3週',
    },
    {
      title: '腹脹是身體的訊息',
      badge: '腸胃專項',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      why: '很多會員有消化問題，這本能幫你解決。',
      keyPoints: '腸胃健康、消化問題、飲食調整',
      howToRead: '遇到有腸胃問題的會員再看',
      timeEstimate: '1-2週',
    },
    {
      title: '腸道大腦腸道菌',
      badge: '腸胃專項',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      why: '腸道健康影響訓練表現，這本講得很深入。',
      keyPoints: '腸道菌群、腦腸軸、免疫系統',
      howToRead: '配合腹脹一起看',
      timeEstimate: '2-3週',
    },
    {
      title: '訓練大腦讓自己更強大',
      badge: '心智訓練',
      badgeColor: 'bg-pink-100 text-pink-700',
      why: '心智訓練、專注力，提升會員訓練效果。',
      keyPoints: '大腦訓練、認知提升、心智強化',
      howToRead: '應用在需要專注力的會員身上',
      timeEstimate: '1-2週',
    },
    {
      title: '神經可塑性',
      badge: '進階知識',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '理解大腦如何學習、改變，對動作學習很有幫助。',
      keyPoints: '大腦可塑性、動作學習、習慣養成',
      howToRead: '想深入理解動作學習的必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '執行力的修練',
      badge: '管理思維',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '開始帶新人時，需要執行力和管理能力。',
      keyPoints: '執行力、目標管理、團隊協作',
      howToRead: '開始帶新人時再看',
      timeEstimate: '2週',
    },
    {
      title: '峰值體驗 1+2',
      badge: '整合思維',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '整合訓練、營養、恢復、心理的完整系統。',
      keyPoints: '峰值表現、整體優化、系統思維',
      howToRead: '想建立完整系統的必讀',
      timeEstimate: '每本2-3週',
    },
  ];

  const intermediateChannels: BookResource[] = [
    {
      title: 'Renaissance Periodization',
      badge: '科學訓練',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '週期化訓練、科學化課表設計。',
      keyPoints: '週期化理論、訓練量管理、肌肥大科學',
      howToRead: '想深入週期化訓練的必看',
      timeEstimate: '',
      link: 'https://www.youtube.com/@RenaissancePeriodization',
    },
    {
      title: 'ATHLEAN-X',
      badge: '動作技術',
      badgeColor: 'bg-red-100 text-red-700',
      why: '動作技術、傷害預防，內容實用。',
      keyPoints: '動作技術、常見錯誤、傷害預防',
      howToRead: '學習動作教學技巧',
      timeEstimate: '',
      link: 'https://www.youtube.com/@athleanx',
    },
    {
      title: '宋彥仁醫師',
      badge: '中文資源',
      badgeColor: 'bg-green-100 text-green-700',
      why: '台灣醫師，營養、代謝、健康科學。',
      keyPoints: '營養科學、代謝健康、實用建議',
      howToRead: '想學營養諮詢的必看',
      timeEstimate: '',
    },
    {
      title: 'Squat University',
      badge: '動作矯正',
      badgeColor: 'bg-orange-100 text-orange-700',
      why: '動作評估、矯正策略，非常實用。',
      keyPoints: '動作評估、疼痛處理、矯正策略',
      howToRead: '遇到會員疼痛問題時參考',
      timeEstimate: '',
      link: 'https://www.youtube.com/@SquatUniversity',
    },
    {
      title: 'Huberman Lab',
      badge: '科學知識',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '神經科學、睡眠、營養、表現優化。',
      keyPoints: '神經科學、睡眠優化、營養策略、壓力管理',
      howToRead: '想深入理解科學原理的必聽',
      timeEstimate: '',
      link: 'https://www.youtube.com/@hubermanlab',
    },
  ];

  // 資深教練書籍
  const advancedBooks: BookResource[] = [
    {
      title: '高績效教練（25週年紀念版）',
      badge: '領導力',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '教練界經典，教你如何帶人、培養新人。',
      keyPoints: '教練式領導、提問技巧、潛能開發',
      howToRead: '開始帶新人時必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '你是來帶人，不是幫部屬做事！',
      badge: '領導力',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '資深要學會授權、培養新人，不是自己做。',
      keyPoints: '授權技巧、培養新人、團隊建立',
      howToRead: '開始帶團隊時必讀',
      timeEstimate: '1-2週',
    },
    {
      title: '高效領導者的工作好習慣',
      badge: '領導力',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '資深要建立系統、優化流程。',
      keyPoints: '時間管理、優先順序、系統建立',
      howToRead: '想提升效率的必讀',
      timeEstimate: '1-2週',
    },
    {
      title: '逆境領導',
      badge: '領導力',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '資深會遇到困境，這本教你怎麼帶團隊度過。',
      keyPoints: '危機處理、團隊凝聚、逆境成長',
      howToRead: '遇到困境時參考',
      timeEstimate: '1-2週',
    },
    {
      title: '影響力領導',
      badge: '領導力',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '資深要建立影響力，不只是技術。',
      keyPoints: '影響力原理、領導風格、團隊文化',
      howToRead: '想建立個人品牌的必讀',
      timeEstimate: '2週',
    },
    {
      title: '不施壓的領導力',
      badge: '領導力',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '現代領導不是靠壓力，是靠啟發。',
      keyPoints: '啟發式領導、內在動機、團隊賦能',
      howToRead: '想建立正向團隊文化的必讀',
      timeEstimate: '1-2週',
    },
    {
      title: 'Give and Take（給予 拿取）',
      badge: '影響力',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '建立長期影響力的關鍵。',
      keyPoints: '給予者、索取者、互利者的差異',
      howToRead: '思考如何成為「聰明的給予者」',
      timeEstimate: '2週',
    },
    {
      title: '深刻認識一個人',
      badge: '溝通技巧',
      badgeColor: 'bg-green-100 text-green-700',
      why: '資深要深入理解會員和團隊成員。',
      keyPoints: '深度溝通、理解他人、建立信任',
      howToRead: '想提升溝通能力的必讀',
      timeEstimate: '1-2週',
    },
    {
      title: '華頓商學院最受歡迎的談判課',
      badge: '溝通技巧',
      badgeColor: 'bg-green-100 text-green-700',
      why: '資深要談合作、談價格、談條件。',
      keyPoints: '談判策略、雙贏思維、溝通技巧',
      howToRead: '想提升談判能力的必讀',
      timeEstimate: '2週',
    },
    {
      title: '終局思維 Clear Thinking',
      badge: '思維模式',
      badgeColor: 'bg-orange-100 text-orange-700',
      why: '資深要有清晰思維，做對的決策。',
      keyPoints: '決策思維、系統思考、長期視角',
      howToRead: '想提升決策能力的必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '底層邏輯 1+2',
      badge: '思維模式',
      badgeColor: 'bg-orange-100 text-orange-700',
      why: '理解事物本質，建立系統思維。',
      keyPoints: '底層邏輯、系統思考、商業思維',
      howToRead: '想建立商業思維的必讀',
      timeEstimate: '每本2週',
    },
    {
      title: '機制化之神',
      badge: '系統建立',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '資深要建立系統，不能靠人治。',
      keyPoints: '系統建立、流程優化、機制設計',
      howToRead: '想建立教練團隊系統的必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '執行長日記（CEO 日記）',
      badge: '商業思維',
      badgeColor: 'bg-red-100 text-red-700',
      why: '資深要有商業思維，不只是教練。',
      keyPoints: 'CEO 思維、商業決策、領導智慧',
      howToRead: '想開工作室的必讀',
      timeEstimate: '2-3週',
    },
    {
      title: '複利效應',
      badge: '資深必讀',
      badgeColor: 'bg-green-100 text-green-700',
      why: '理解長期累積的力量，建立長期思維。',
      keyPoints: '複利原理、長期堅持、微小改變',
      howToRead: '應用在事業發展和個人成長上',
      timeEstimate: '1-2週',
    },
    {
      title: '富爸爸，窮爸爸',
      badge: '資深必讀',
      badgeColor: 'bg-green-100 text-green-700',
      why: '資深要思考事業、被動收入，建立財務自由。',
      keyPoints: '資產 vs 負債、被動收入、投資思維',
      howToRead: '思考你的收入結構',
      timeEstimate: '1-2週',
    },
    {
      title: '持續買進（Just Keep Buying）',
      badge: '資深選讀',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '投資理財、被動收入，規劃長期財務。',
      keyPoints: '投資策略、財務規劃、資產配置',
      howToRead: '配合富爸爸一起看',
      timeEstimate: '2-3週',
    },
    {
      title: '稻盛和夫系列（思考之道、15個處世智慧）',
      badge: '資深進階',
      badgeColor: 'bg-purple-100 text-purple-700',
      why: '經營哲學、人生智慧，想做長期事業必讀。',
      keyPoints: '經營哲學、工作態度、人生觀',
      howToRead: '慢慢讀，反思你的經營理念',
      timeEstimate: '每本2-3週',
    },
    {
      title: '極限銷售',
      badge: '資深進階',
      badgeColor: 'bg-red-100 text-red-700',
      why: '資深要做高端客戶、提高客單價。',
      keyPoints: '銷售策略、客戶管理、成交技巧',
      howToRead: '應用在高端客戶開發上',
      timeEstimate: '1-2週',
    },
    {
      title: '持續閱讀研究論文',
      badge: '資深必備',
      badgeColor: 'bg-blue-100 text-blue-700',
      why: '跟上最新研究，不要被淘汰。',
      keyPoints: 'PubMed、Google Scholar、相關期刊',
      howToRead: '每月讀2-3篇，不用多但要精',
      timeEstimate: '持續進行',
    },
    {
      title: '回頭重讀經典',
      badge: '資深建議',
      badgeColor: 'bg-gray-100 text-gray-700',
      why: '當你有更多經驗後，重讀經典會有新體悟。',
      keyPoints: '麥克波羅伊、NSCA、週期化力量',
      howToRead: '每年重讀1-2本，你會發現不同的東西',
      timeEstimate: '持續進行',
    },
  ];

  const advancedChannels: BookResource[] = [
    {
      title: 'The Diary of a CEO',
      badge: '商業思維',
      badgeColor: 'bg-red-100 text-red-700',
      why: '不只是訓練，還要學商業、品牌、經營。',
      keyPoints: '創業、品牌、個人成長、健康科學系列',
      howToRead: '如果你想做個人品牌或事業，這個必聽',
      timeEstimate: '',
      link: 'https://www.youtube.com/@TheDiaryOfACEO',
    },
  ];

  const renderBookCard = (book: BookResource) => (
    <div key={book.title} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4 gap-3">
        <h5 className="font-bold text-lg text-gray-900 flex-1">{book.title}</h5>
        <span className={`${book.badgeColor} px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap flex-shrink-0`}>
          {book.badge}
        </span>
      </div>
      <div className="space-y-3 text-gray-700 text-sm">
        <p><strong>📌 為什麼要{book.link ? '看' : '看'}：</strong>{book.why}</p>
        <p><strong>💡 {book.link ? '推薦' : '重點'}內容：</strong>{book.keyPoints}</p>
        <p><strong>🎯 怎麼{book.link ? '看' : '讀'}：</strong>{book.howToRead}</p>
        {book.timeEstimate && <p><strong>⏱️ 預估時間：</strong>{book.timeEstimate}</p>}
        {book.link && (
          <p>
            <strong>🔗 連結：</strong>
            <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
              {book.title}
            </a>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <h2 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        學習資源庫
      </h2>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        Howard 精選：從新手到資深的完整學習路徑
      </p>

      <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-primary">
        <h3 className="font-outfit text-2xl font-bold mb-3">📚 這個資源庫是什麼？</h3>
        <p className="text-gray-700 mb-2">
          這是 Howard 這些年看過、學過、覺得真正有用的資源。
        </p>
        <p className="text-gray-700 mb-4">
          不是全部都要看，而是<strong>「根據你的等級，選擇適合你的」</strong>。
        </p>
        <p className="text-gray-700 mb-2"><strong>使用方式：</strong></p>
        <ol className="space-y-1 list-decimal list-inside text-gray-700 ml-4">
          <li>先看「你是什麼等級」</li>
          <li>看該等級推薦的書/頻道</li>
          <li>不要一次看太多，專注1-2個就好</li>
          <li>有問題隨時問 Howard</li>
        </ol>
      </div>

      <h3 className="font-outfit text-3xl font-bold mb-6 mt-12">你是什麼等級？</h3>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <button
          onClick={() => setActiveLevel('beginner')}
          className={`p-8 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
            activeLevel === 'beginner'
              ? 'bg-green-50 border-green-500 shadow-lg'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="text-6xl mb-4">🌱</div>
          <div className="font-outfit text-2xl font-bold text-gray-900 mb-2">新手教練</div>
          <div className="text-gray-600">0-6個月</div>
        </button>

        <button
          onClick={() => setActiveLevel('intermediate')}
          className={`p-8 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
            activeLevel === 'intermediate'
              ? 'bg-blue-50 border-blue-500 shadow-lg'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="text-6xl mb-4">💪</div>
          <div className="font-outfit text-2xl font-bold text-gray-900 mb-2">中手教練</div>
          <div className="text-gray-600">6個月-2年</div>
        </button>

        <button
          onClick={() => setActiveLevel('advanced')}
          className={`p-8 rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
            activeLevel === 'advanced'
              ? 'bg-purple-50 border-purple-500 shadow-lg'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="text-6xl mb-4">🏆</div>
          <div className="font-outfit text-2xl font-bold text-gray-900 mb-2">資深教練</div>
          <div className="text-gray-600">2年以上</div>
        </button>
      </div>

      {/* 新手教練資源 */}
      {activeLevel === 'beginner' && (
        <div className="animate-fade-in space-y-6">
          <h3 className="font-outfit text-3xl font-extrabold text-success mb-6">
            🌱 新手教練（0-6個月）
          </h3>

          <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-success mb-8">
            <h4 className="font-bold text-xl mb-3">🎯 學習重點</h4>
            <p className="text-gray-700 mb-2">
              <strong>這個階段你要：</strong>建立基礎、不要貪多、先求穩再求好
            </p>
            <p className="text-gray-700">
              不要一次看太多書，先把1-2本看熟比較重要。
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl p-8 mb-8">
            <h4 className="font-outfit text-2xl font-bold mb-4">⭐ 新手必讀 3 本（先看這些！）</h4>
            <p className="mb-4 leading-relaxed">
              <strong>不要一次看太多！</strong>先把這3本看懂、做到，比看10本只記住10%有用。
            </p>
            <ul className="space-y-2 text-lg">
              <li>✓ 麥克波羅伊功能性訓練聖經</li>
              <li>✓ 怪獸肌力及體能訓練手冊</li>
              <li>✓ 原子習慣</li>
            </ul>
            <p className="mt-4 text-sm opacity-90">
              看完這3本後，再點擊下方「展開更多書籍」查看其他推薦。
            </p>
          </div>

          <h4 className="font-outfit text-2xl font-bold mb-4">📚 必讀書籍（3本）</h4>
          <div className="space-y-4">
            {beginnerBooks.map(renderBookCard)}
          </div>

          <div className="text-center my-8">
            <button
              onClick={() => setShowMoreBeginnerBooks(!showMoreBeginnerBooks)}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {showMoreBeginnerBooks ? '收起更多書籍 ▲' : '展開更多書籍 ▼'}
            </button>
          </div>

          {showMoreBeginnerBooks && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-yellow-50 rounded-xl p-4 border-l-4 border-warning mb-6">
                <h5 className="font-bold text-lg mb-2">💡 提醒</h5>
                <p className="text-gray-700">這些書都很好，但<strong>不急著現在看</strong>。先把必讀3本看懂、做到比較重要。</p>
              </div>
              {beginnerMoreBooks.map(renderBookCard)}
            </div>
          )}

          <h4 className="font-outfit text-2xl font-bold mb-4 mt-12">🎥 YouTube 頻道（3個）</h4>
          <div className="space-y-4">
            {beginnerChannels.map(renderBookCard)}
          </div>

          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-300 mt-12">
            <h4 className="font-outfit text-2xl font-bold text-red-700 mb-6">⚠️ 新手最容易犯的錯</h4>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
                <p className="text-red-700 font-bold mb-2">❌ 一次看太多書</p>
                <p className="text-gray-700"><strong className="text-success">✅ 正確做法：</strong>結果什麼都記不住。先把1本看熟。</p>
              </div>
              <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
                <p className="text-red-700 font-bold mb-2">❌ 只看不做</p>
                <p className="text-gray-700"><strong className="text-success">✅ 正確做法：</strong>看了10本書，但從來不實踐。立刻用在會員身上。</p>
              </div>
              <div className="bg-white rounded-xl p-4 border-l-4 border-red-500">
                <p className="text-red-700 font-bold mb-2">❌ 追求高深理論</p>
                <p className="text-gray-700"><strong className="text-success">✅ 正確做法：</strong>基礎都還沒穩，就想學進階技巧。先把基礎打好。</p>
              </div>
            </div>
            <p className="text-gray-900 font-bold mt-6 text-lg">
              記住：看1本做到100%，比看10本做到10%有用100倍。
            </p>
          </div>
        </div>
      )}

      {/* 中手教練資源 */}
      {activeLevel === 'intermediate' && (
        <div className="animate-fade-in space-y-6">
          <h3 className="font-outfit text-3xl font-extrabold text-blue-600 mb-6">
            💪 中手教練（6個月-2年）
          </h3>

          <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600 mb-8">
            <h4 className="font-bold text-xl mb-3">🎯 學習重點</h4>
            <p className="text-gray-700 mb-2">
              <strong>這個階段你要：</strong>深化專業、建立個人風格、開始做品牌
            </p>
            <p className="text-gray-700">
              你已經有基礎了，現在要找到「你的特色」。
            </p>
          </div>

          <h4 className="font-outfit text-2xl font-bold mb-4">📚 進階書籍（8本）</h4>
          <div className="space-y-4">
            {intermediateBooks.map(renderBookCard)}
          </div>

          <div className="text-center my-8">
            <button
              onClick={() => setShowMoreIntermediateBooks(!showMoreIntermediateBooks)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1"
            >
              {showMoreIntermediateBooks ? '收起更多書籍 ▲' : '展開更多書籍 ▼'}
            </button>
          </div>

          {showMoreIntermediateBooks && (
            <div className="space-y-4 animate-fade-in">
              {intermediateMoreBooks.map(renderBookCard)}
            </div>
          )}

          <h4 className="font-outfit text-2xl font-bold mb-4 mt-12">🎥 YouTube 頻道 & 資源（5個）</h4>
          <div className="space-y-4">
            {intermediateChannels.map(renderBookCard)}
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600 mt-8">
            <h4 className="font-bold text-xl mb-3">🎓 進修課程建議</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>考取 NSCA-CPT 或 ACE-CPT 證照</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>參加動作評估工作坊（FMS、SFMA）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>學習特殊族群訓練（孕婦、銀髮族、運動員）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>參加營養學相關課程</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 資深教練資源 */}
      {activeLevel === 'advanced' && (
        <div className="animate-fade-in space-y-6">
          <h3 className="font-outfit text-3xl font-extrabold text-purple-600 mb-6">
            🏆 資深教練（2年以上）
          </h3>

          <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-600 mb-8">
            <h4 className="font-bold text-xl mb-3">🎯 學習重點</h4>
            <p className="text-gray-700 mb-2">
              <strong>這個階段你要：</strong>建立系統、培養新人、思考商業模式
            </p>
            <p className="text-gray-700">
              你已經是專家了，現在要思考「如何放大影響力」。
            </p>
          </div>

          <h4 className="font-outfit text-2xl font-bold mb-4">📚 領導力 & 商業思維書籍（20本）</h4>
          <div className="space-y-4">
            {advancedBooks.map(renderBookCard)}
          </div>

          <h4 className="font-outfit text-2xl font-bold mb-4 mt-12">🎙️ 持續精進</h4>
          <div className="space-y-4">
            {advancedChannels.map(renderBookCard)}
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-600 mt-8">
            <h4 className="font-bold text-xl mb-3">🎯 下一步發展</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>開始培養新手教練，建立你的教練團隊</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>建立線上課程或內容平台</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>思考開設自己的訓練工作室</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>成為講師，分享你的經驗</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span>寫書或建立個人品牌</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Howard 的建議 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-2xl p-8 mt-12">
        <h3 className="font-outfit text-2xl font-bold mb-4">💡 Howard 的使用建議</h3>
        <div className="space-y-3 leading-relaxed">
          <p><strong className="text-warning">重要提醒：</strong></p>
          <ol className="space-y-2 list-decimal list-inside ml-4">
            <li>根據你的等級，選1-2個資源</li>
            <li>深入學習，不要只是「看過」</li>
            <li>立刻實踐在會員身上</li>
            <li>做筆記、整理、內化成自己的東西</li>
          </ol>
          <p className="text-success font-bold text-xl mt-6">
            看1本書做到100%，比看10本書做到10%有用100倍。
          </p>
          <p className="mt-4">
            如果你不知道該看什麼，來問我。我會根據你的狀況，給你最適合的建議。
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-2xl p-6 mt-8 border-l-4 border-warning">
        <h4 className="font-bold text-xl mb-3">📝 持續更新</h4>
        <p className="text-gray-700 mb-2">這個資源庫會持續更新！</p>
        <p className="text-gray-700 mb-2">
          Howard 每看到好的書、頻道、課程，就會加進來。
        </p>
        <p className="text-gray-700">
          <strong>你也可以推薦！</strong>如果你看到好的資源，告訴 Howard，我們一起把這個資源庫做得更好！
        </p>
      </div>
    </div>
  );
}
