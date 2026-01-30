'use client';

import { useState } from 'react';
import BackButton from './BackButton';

interface PracticalFrameworksProps {
  onBack?: () => void;
}

export default function PracticalFrameworks({ onBack }: PracticalFrameworksProps) {
  const [activeFramework, setActiveFramework] = useState<string>('cold-approach');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const frameworks = [
    { id: 'cold-approach', label: '陌生開發', icon: '🎯' },
    { id: 'renewal', label: '續約技巧', icon: '🔄' },
    { id: 'objection', label: '處理拒絕', icon: '🛡️' },
    { id: 'pricing', label: '報價策略', icon: '💰' },
    { id: 'style', label: '個人風格', icon: '🎨' },
  ];

  // 快速查詢關鍵字對應
  const quickSearchMap: { [key: string]: string } = {
    '太貴': 'objection',
    '貴': 'objection',
    '考慮': 'objection',
    '想想': 'objection',
    '沒時間': 'objection',
    '自己練': 'objection',
    '問家人': 'objection',
    '續約': 'renewal',
    '開發': 'cold-approach',
    '報價': 'pricing',
    '風格': 'style',
    '陌生': 'cold-approach',
    '拒絕': 'objection',
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // 檢查是否有匹配的快速查詢
    for (const [keyword, frameworkId] of Object.entries(quickSearchMap)) {
      if (query.includes(keyword)) {
        setActiveFramework(frameworkId);
        break;
      }
    }
  };

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <div className="max-w-5xl mx-auto">
        <h1 className="font-outfit text-4xl font-bold text-gray-900 mb-4 text-center">
          ⚡ 實戰框架
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          不是話術，是原則。理解框架，用你的方式執行。
        </p>

        {/* 搜尋框 */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="遇到什麼問題？輸入關鍵字快速找答案（例如：太貴、考慮、續約）"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
              🔍
            </div>
          </div>
          
          {/* 快速查詢提示 */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">常見問題快速查詢：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(quickSearchMap).slice(0, 10).map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => handleSearch(keyword)}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Framework Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {frameworks.map(fw => (
            <button
              key={fw.id}
              onClick={() => setActiveFramework(fw.id)}
              className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeFramework === fw.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {fw.icon} {fw.label}
            </button>
          ))}
        </div>

        {/* Cold Approach Framework */}
        {activeFramework === 'cold-approach' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-8">
              <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-4">
                🎯 陌生開發框架
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                核心原則：<strong className="text-primary">先給予價值，再建立關係，最後才談服務</strong>
              </p>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">步驟 1：觀察與判斷</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>不要盲目搭話。先觀察3-5分鐘：</strong>
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 訓練經驗：新手？有經驗？姿勢如何？</li>
                    <li>• 訓練目標：減脂？增肌？運動表現？</li>
                    <li>• 個性：專注？愛聊天？戴耳機？</li>
                    <li>• 切入點：有明顯的姿勢問題？器材使用錯誤？</li>
                  </ul>
                  <div className="mt-4 bg-blue-50 p-4 rounded">
                    <p className="text-sm text-blue-800">
                      💡 <strong>關鍵：</strong>找到「真實的切入點」，不是硬湊話題
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">步驟 2：給予價值（不推銷）</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>原則：真誠地幫助，不是推銷</strong>
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900">情境 A：看到姿勢危險</p>
                      <p className="text-gray-600 text-sm mt-1">
                        ❌ 錯誤：「你這樣會受傷，要不要上課？」（太直接）<br/>
                        ✅ 正確：「欸小心，這樣膝蓋壓力很大。我幫你看一下好嗎？」（先幫忙）
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900">情境 B：看到有經驗的人</p>
                      <p className="text-gray-600 text-sm mt-1">
                        ❌ 錯誤：「你練得不錯，需要教練嗎？」（太功利）<br/>
                        ✅ 正確：「你練得不錯，有在比賽嗎？」（真誠交流）
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">情境 C：看到新手迷惘</p>
                      <p className="text-gray-600 text-sm mt-1">
                        ❌ 錯誤：「第一次來？要不要體驗課？」（太急）<br/>
                        ✅ 正確：「第一次來？我帶你認識一下器材好嗎？」（先幫忙）
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-50 p-4 rounded">
                    <p className="text-sm text-green-800">
                      💡 <strong>關鍵：</strong>這個階段不談錢、不談課程，只是幫助
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">步驟 3：建立信任</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>如果對方有興趣繼續聊，才進入這步</strong>
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 問他的目標：「你想練到什麼程度？」</li>
                    <li>• 分享經驗：「我之前也有學生...」</li>
                    <li>• 給建議：「如果是我，我會...」</li>
                    <li>• 留聯絡方式：「我加你好友，有問題可以問我」</li>
                  </ul>
                  <div className="mt-4 bg-purple-50 p-4 rounded">
                    <p className="text-sm text-purple-800">
                      💡 <strong>關鍵：</strong>不急著成交，先建立「這個教練很專業、很真誠」的印象
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">步驟 4：自然提出服務</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>時機：對方主動問，或你們已經聊了2-3次</strong>
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900">如果對方主動問：</p>
                      <p className="text-gray-600 text-sm">
                        「你是教練嗎？」→「對啊，你有興趣嗎？」<br/>
                        「怎麼收費？」→「要看你的目標，我們可以聊聊」
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">如果你主動提：</p>
                      <p className="text-gray-600 text-sm">
                        ❌ 錯誤：「要不要上課？」（太直接）<br/>
                        ✅ 正確：「如果你想更快達到目標，我可以幫你規劃完整的訓練。要不要先體驗一次看看？」
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-orange-50 p-4 rounded">
                    <p className="text-sm text-orange-800">
                      💡 <strong>關鍵：</strong>提供解決方案，不是推銷課程
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-red-900 mb-4">❌ 常見錯誤</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>太急：</strong>一開口就推銷課程</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>太假：</strong>明明沒問題硬要挑毛病</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>太制式：</strong>每個人都用一樣的開場白</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>不觀察：</strong>沒看清楚對方就亂搭話</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Renewal Framework */}
        {activeFramework === 'renewal' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8">
              <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-4">
                🔄 續約框架
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                核心原則：<strong className="text-green-600">續約從第一堂課就開始，不是最後才提</strong>
              </p>

              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">階段 1：前期鋪陳（課程前2週）</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>目標：讓學生感受到進步和價值</strong>
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>記錄進步：</strong>每週拍照、測量、記錄重量</li>
                    <li>• <strong>展示成果：</strong>「你看，這個月深蹲進步10kg」</li>
                    <li>• <strong>強化關係：</strong>課後關心、生日祝福、關心生活</li>
                    <li>• <strong>預告未來：</strong>「下個月我們可以挑戰...」</li>
                  </ul>
                  <div className="mt-4 bg-green-50 p-4 rounded">
                    <p className="text-sm text-green-800">
                      💡 <strong>關鍵：</strong>讓學生自己感受到「跟著這個教練有進步」
                    </p>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">階段 2：提出續約（剩2週時）</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>時機：不要等到最後一堂才提</strong>
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900">開場方式：</p>
                      <p className="text-gray-600 text-sm mt-1">
                        ❌ 錯誤：「你要續約嗎？」（太直接）<br/>
                        ✅ 正確：「{'{名字}'}，我們還剩2週。你覺得這段時間訓練如何？有達到你的目標嗎？」
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">展示價值：</p>
                      <p className="text-gray-600 text-sm mt-1">
                        「我幫你整理了這段時間的進步：<br/>
                        • 體重從XX降到XX<br/>
                        • 深蹲從XX進步到XX<br/>
                        • 體脂從XX%降到XX%」
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">提出下一步：</p>
                      <p className="text-gray-600 text-sm mt-1">
                        「如果繼續下去，下個月我們可以：<br/>
                        • 挑戰更重的重量<br/>
                        • 加入新的訓練動作<br/>
                        • 達到你的XX目標」
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-blue-50 p-4 rounded">
                    <p className="text-sm text-blue-800">
                      💡 <strong>關鍵：</strong>用數據說話，讓學生看到具體成果
                    </p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">階段 3：處理猶豫</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>如果學生說「我考慮看看」</strong>
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900">了解真實原因：</p>
                      <p className="text-gray-600 text-sm">
                        「沒問題，你可以考慮。方便問一下，是哪方面讓你猶豫嗎？」<br/>
                        （可能是：價格、時間、效果、其他）
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">針對性回應：</p>
                      <ul className="text-gray-600 text-sm space-y-1 mt-1">
                        <li>• <strong>價格：</strong>「我理解。你覺得這段時間的進步值得嗎？」</li>
                        <li>• <strong>時間：</strong>「我們可以調整上課時間，或改成每週2次」</li>
                        <li>• <strong>效果：</strong>「你覺得哪裡還不夠？我們可以調整」</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 bg-purple-50 p-4 rounded">
                    <p className="text-sm text-purple-800">
                      💡 <strong>關鍵：</strong>不要急著說服，先理解真實原因
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Renewal Red Flags */}
            <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-orange-900 mb-4">⚠️ 續約預警信號</h3>
              <p className="text-gray-700 mb-4">如果學生出現這些信號，續約率會降低：</p>
              <ul className="space-y-2 text-gray-700">
                <li>• 連續請假3次以上</li>
                <li>• 訓練態度變差（不專注、常滑手機）</li>
                <li>• 互動減少（不回訊息、不聊天）</li>
                <li>• 開始問其他教練的事</li>
                <li>• 體態沒明顯變化</li>
              </ul>
              <div className="mt-4 bg-orange-100 p-4 rounded">
                <p className="text-sm text-orange-900">
                  <strong>發現這些信號時，立刻行動：</strong><br/>
                  主動關心、調整訓練、展示進步、重新建立連結
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Objection Handling */}
        {activeFramework === 'objection' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-8">
              <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-4">
                🛡️ 處理拒絕框架
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                核心原則：<strong className="text-purple-600">拒絕不是終點，是了解需求的機會</strong>
              </p>

              <div className="space-y-6">
                {[
                  {
                    objection: '「太貴了」',
                    wrong: '「這個價格很合理啊」',
                    right: '「我理解。你覺得什麼價格比較合適？」→ 了解預算 → 「那我們可以調整上課頻率」',
                    principle: '不要辯解，先理解對方的預算和期待'
                  },
                  {
                    objection: '「我考慮看看」',
                    wrong: '「不要考慮了啦，現在報名有優惠」',
                    right: '「沒問題。方便問一下，是哪方面讓你猶豫嗎？」→ 了解真實原因 → 針對性解決',
                    principle: '「考慮看看」通常不是真實原因，要挖掘背後的顧慮'
                  },
                  {
                    objection: '「我沒時間」',
                    wrong: '「一週只要2小時而已」',
                    right: '「我理解。你現在最忙的是什麼？」→ 了解時間分配 → 「那我們可以調整成早上/晚上」',
                    principle: '時間永遠擠得出來，問題是優先順序'
                  },
                  {
                    objection: '「我自己練就好」',
                    wrong: '「自己練沒效果啦」',
                    right: '「你之前自己練多久了？有達到目標嗎？」→ 讓他自己發現問題 → 「教練可以幫你...」',
                    principle: '不要否定他，讓他自己意識到需要幫助'
                  },
                  {
                    objection: '「我要問家人」',
                    wrong: '「這是你自己的事啊」',
                    right: '「當然，這很重要。你家人主要會關心什麼？」→ 了解家人顧慮 → 提供解決方案',
                    principle: '尊重他的決策流程，幫他準備說服家人的理由'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{item.objection}</h3>
                    <div className="space-y-3">
                      <div className="bg-red-50 p-3 rounded">
                        <p className="text-sm text-red-800">
                          <strong>❌ 錯誤回應：</strong>{item.wrong}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="text-sm text-green-800">
                          <strong>✅ 正確回應：</strong>{item.right}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded">
                        <p className="text-sm text-purple-800">
                          <strong>💡 原則：</strong>{item.principle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Universal Principle */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4">🔥 處理拒絕的萬用原則</h3>
              <ol className="space-y-3">
                <li><strong>1. 不要急著反駁</strong> - 先聽完，表示理解</li>
                <li><strong>2. 挖掘真實原因</strong> - 「考慮看看」背後是什麼？</li>
                <li><strong>3. 針對性解決</strong> - 不要用制式話術</li>
                <li><strong>4. 給台階下</strong> - 「沒關係，你可以考慮。有問題隨時問我」</li>
                <li><strong>5. 保持關係</strong> - 就算這次不成，下次還有機會</li>
              </ol>
            </div>
          </div>
        )}

        {/* Pricing Strategy */}
        {activeFramework === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8">
              <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-4">
                💰 報價策略框架
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                核心原則：<strong className="text-orange-600">不要先報價，先建立價值</strong>
              </p>

              <div className="space-y-6">
                {/* Pricing Sequence */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-yellow-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">正確的報價流程</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <p className="font-semibold text-gray-900">了解目標</p>
                        <p className="text-sm text-gray-600">「你想達到什麼目標？」「多久想達到？」</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <p className="font-semibold text-gray-900">展示價值</p>
                        <p className="text-sm text-gray-600">「要達到這個目標，需要：專業訓練計畫 + 飲食建議 + 持續追蹤」</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <p className="font-semibold text-gray-900">提供選擇</p>
                        <p className="text-sm text-gray-600">給2-3個方案，不要只給一個價格</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <p className="font-semibold text-gray-900">說明差異</p>
                        <p className="text-sm text-gray-600">每個方案的差異和適合的人</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Examples */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-orange-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">報價範例</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded">
                      <p className="font-semibold text-red-900 mb-2">❌ 錯誤方式</p>
                      <p className="text-sm text-gray-700">
                        「一堂課1500元，要上嗎？」<br/>
                        → 學生只看到價格，沒看到價值
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded">
                      <p className="font-semibold text-green-900 mb-2">✅ 正確方式</p>
                      <p className="text-sm text-gray-700 mb-3">
                        「根據你的目標，我建議：」
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="bg-white p-3 rounded border border-green-200">
                          <p className="font-semibold">方案A：快速達標（每週3次）</p>
                          <p className="text-gray-600">12堂 / 18,000元 = 1500/堂</p>
                          <p className="text-gray-600 text-xs mt-1">適合：想快速看到成果的人</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-green-200">
                          <p className="font-semibold">方案B：穩定進步（每週2次）</p>
                          <p className="text-gray-600">8堂 / 12,800元 = 1600/堂</p>
                          <p className="text-gray-600 text-xs mt-1">適合：想穩定訓練的人</p>
                        </div>
                        <div className="bg-white p-3 rounded border border-green-200">
                          <p className="font-semibold">方案C：體驗看看（單次）</p>
                          <p className="text-gray-600">1堂 / 1800元</p>
                          <p className="text-gray-600 text-xs mt-1">適合：想先試試看的人</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Value Packaging */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">如何包裝價值</h3>
                  <p className="text-gray-700 mb-4">
                    不要只賣「一堂課」，要賣「完整解決方案」
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700"><strong>專業訓練計畫：</strong>根據你的目標客製化</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700"><strong>飲食建議：</strong>訓練+飲食才有效</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700"><strong>進度追蹤：</strong>每週記錄，看到具體進步</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700"><strong>隨時諮詢：</strong>課後有問題都可以問</span>
                    </div>
                  </div>

                  <div className="mt-4 bg-blue-50 p-4 rounded">
                    <p className="text-sm text-blue-800">
                      💡 <strong>關鍵：</strong>讓學生覺得「這不只是一堂課，是完整的服務」
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Mistakes */}
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-red-900 mb-4">❌ 報價常見錯誤</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>太早報價：</strong>還沒建立價值就報價</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>只給一個價格：</strong>沒有選擇，容易被拒絕</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>不敢報價：</strong>講得很心虛，學生會感覺到</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>自己先打折：</strong>「1500...不然1200好了」</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span><strong>只講價格不講價值：</strong>學生只會比價</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Personal Style */}
        {activeFramework === 'style' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-8">
              <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-4">
                🎨 發展你的個人風格
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                核心原則：<strong className="text-purple-600">學生選擇你，是因為你是你，不是因為你背了話術</strong>
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">找到你的風格</h3>
                  <p className="text-gray-700 mb-4">問自己這4個問題：</p>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">1.</span>
                      <span>我平常和朋友聊天是什麼樣子？（幽默？認真？溫暖？）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">2.</span>
                      <span>我的優勢是什麼？（專業知識？同理心？激勵能力？）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">3.</span>
                      <span>我想吸引什麼樣的學生？（認真訓練？減脂？運動員？）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">4.</span>
                      <span>我欣賞哪個教練的風格？為什麼？</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">常見的教練風格</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="font-semibold text-primary">💪 激勵型</p>
                      <p className="text-sm text-gray-600">充滿能量、正面鼓勵、讓學生充滿動力</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="font-semibold text-primary">🧠 專業型</p>
                      <p className="text-sm text-gray-600">深入講解、科學化訓練、數據導向</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="font-semibold text-primary">❤️ 關懷型</p>
                      <p className="text-sm text-gray-600">溫暖陪伴、細心觀察、像朋友一樣</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="font-semibold text-primary">🎯 目標型</p>
                      <p className="text-sm text-gray-600">結果導向、嚴格要求、追求突破</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 italic">
                    * 你可以是混合型，找到最適合你的組合
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="font-bold text-xl text-gray-900 mb-4">範例：同一個訊息，不同風格</h3>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm font-semibold text-red-800 mb-1">❌ 制式版本（沒靈魂）</p>
                      <p className="text-gray-700 text-sm">「{'{名字}'} 今天練得很棒！💪 記得多補充水分」</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-semibold text-green-800 mb-1">✅ 激勵型</p>
                      <p className="text-gray-700 text-sm">「{'{名字}'} 今天太猛了！🔥 那組深蹲我看到你咬牙撐過去，這就是突破！」</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-semibold text-green-800 mb-1">✅ 專業型</p>
                      <p className="text-gray-700 text-sm">「{'{名字}'} 今天深蹲膝蓋外推控制得很好，可以更有效啟動臀肌。下次試著加5kg👍」</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm font-semibold text-green-800 mb-1">✅ 關懷型</p>
                      <p className="text-gray-700 text-sm">「{'{名字}'} 今天看你練得很認真，辛苦了😊 記得好好休息，有不舒服都可以跟我說」</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-300">
                <h3 className="font-bold text-lg text-green-600 mb-4">✅ 要做的事</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ <strong>保持真誠：</strong>用你真實的樣子</li>
                  <li>✓ <strong>持續調整：</strong>找到最舒服的方式</li>
                  <li>✓ <strong>觀察反應：</strong>學生喜歡哪種互動？</li>
                  <li>✓ <strong>發揮優勢：</strong>你擅長什麼就做什麼</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-red-300">
                <h3 className="font-bold text-lg text-red-600 mb-4">❌ 不要做的事</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✗ <strong>照抄話術：</strong>學生會感覺到你在背稿</li>
                  <li>✗ <strong>模仿別人：</strong>別人的風格不一定適合你</li>
                  <li>✗ <strong>太制式：</strong>每個人都用一樣的話</li>
                  <li>✗ <strong>假裝：</strong>不是你的個性就不要勉強</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
