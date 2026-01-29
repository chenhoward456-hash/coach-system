'use client';

import BackButton from './BackButton';

interface PersonalStyleGuideProps {
  onBack?: () => void;
}

export default function PersonalStyleGuide({ onBack }: PersonalStyleGuideProps) {
  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <div className="max-w-4xl mx-auto">
        <h1 className="font-outfit text-4xl font-bold text-gray-900 mb-4 text-center">
          🎨 發展你的個人風格
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          技巧可以學，但風格是你獨有的。這是你和其他教練最大的差異。
        </p>

        {/* 核心理念 */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-8 mb-8">
          <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">💎</span>
            核心理念
          </h2>
          <div className="space-y-4 text-gray-700 text-lg">
            <p className="leading-relaxed">
              <strong className="text-purple-600">學生選擇你，不是因為你的話術，而是因為你是誰。</strong>
            </p>
            <p className="leading-relaxed">
              系統給你的所有工具、範本、話術，都只是<strong>參考</strong>。你要做的是：
            </p>
            <ul className="space-y-2 ml-6">
              <li>✓ 理解背後的原則</li>
              <li>✓ 用你的方式表達</li>
              <li>✓ 發展出屬於你的風格</li>
            </ul>
          </div>
        </div>

        {/* 找到你的風格 */}
        <div className="mb-8">
          <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-6">
            🔍 找到你的風格
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* 問自己 */}
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200">
              <h3 className="font-bold text-xl text-gray-900 mb-4">問自己這些問題：</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>我平常和朋友聊天是什麼樣子？（幽默？認真？溫暖？）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>我的優勢是什麼？（專業知識？同理心？激勵能力？）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>我想吸引什麼樣的學生？（認真訓練？減脂？運動員？）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>我欣賞哪個教練的風格？為什麼？</span>
                </li>
              </ul>
            </div>

            {/* 常見風格 */}
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200">
              <h3 className="font-bold text-xl text-gray-900 mb-4">常見的教練風格：</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-primary">💪 激勵型</p>
                  <p className="text-sm text-gray-600">充滿能量、正面鼓勵、讓學生充滿動力</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">🧠 專業型</p>
                  <p className="text-sm text-gray-600">深入講解、科學化訓練、數據導向</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">❤️ 關懷型</p>
                  <p className="text-sm text-gray-600">溫暖陪伴、細心觀察、像朋友一樣</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">🎯 目標型</p>
                  <p className="text-sm text-gray-600">結果導向、嚴格要求、追求突破</p>
                </div>
                <div>
                  <p className="font-semibold text-primary">😄 幽默型</p>
                  <p className="text-sm text-gray-600">輕鬆有趣、化解壓力、讓訓練好玩</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 italic">
                * 你可以是混合型，找到最適合你的組合
              </p>
            </div>
          </div>
        </div>

        {/* 實戰練習 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-8 mb-8">
          <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            實戰練習：把範本變成你的風格
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-3">範例：課後關心訊息</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-sm font-semibold text-red-800 mb-2">❌ 制式版本（沒靈魂）</p>
                  <p className="text-gray-700">「{'{名字}'} 今天練得很棒！💪 今天的深蹲明顯進步了。記得多補充水分，有任何不舒服隨時跟我說！」</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-sm font-semibold text-green-800 mb-2">✅ 激勵型教練版本</p>
                  <p className="text-gray-700">「{'{名字}'} 今天太猛了！🔥 那組深蹲我看到你咬牙撐過去，這就是突破！明天可能會痠，但這是變強的證明💪」</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-sm font-semibold text-green-800 mb-2">✅ 專業型教練版本</p>
                  <p className="text-gray-700">「{'{名字}'} 今天深蹲膝蓋外推的動作控制得很好，這樣可以更有效啟動臀肌。下次我們試著加5kg，看看能不能維持同樣品質👍」</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-sm font-semibold text-green-800 mb-2">✅ 關懷型教練版本</p>
                  <p className="text-gray-700">「{'{名字}'} 今天看你練得很認真，辛苦了😊 記得回家好好休息，明天可能會痠，這很正常。有任何不舒服都可以跟我說喔」</p>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <strong>看到差別了嗎？</strong>同樣的訊息，不同的風格，給學生的感受完全不同。<br/>
                  <strong>現在輪到你：</strong>用你的方式改寫系統裡的範本。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 發展風格的原則 */}
        <div className="mb-8">
          <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-6">
            📋 發展風格的原則
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-300">
              <h3 className="font-bold text-lg text-green-600 mb-4">✅ 要做的事</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span><strong>保持真誠：</strong>用你真實的樣子和學生互動</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span><strong>持續調整：</strong>試試不同方式，找到最舒服的</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span><strong>觀察反應：</strong>學生喜歡你哪種互動方式？</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span><strong>發揮優勢：</strong>你擅長什麼就做什麼</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span><strong>學習原則：</strong>理解為什麼要這樣做</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-red-300">
              <h3 className="font-bold text-lg text-red-600 mb-4">❌ 不要做的事</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  <span><strong>照抄話術：</strong>學生會感覺到你在背稿</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  <span><strong>模仿別人：</strong>別人的風格不一定適合你</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  <span><strong>太制式：</strong>每個學生都用一樣的話</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  <span><strong>假裝：</strong>不是你的個性就不要勉強</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✗</span>
                  <span><strong>忽略原則：</strong>風格可以變，原則不能丟</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 行動計畫 */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl p-8">
          <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🚀</span>
            這週就開始：發展你的風格
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">第1步：自我認識</h3>
              <p className="text-gray-700">花10分鐘回答上面的4個問題，寫下來</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">第2步：改寫範本</h3>
              <p className="text-gray-700">選3個常用的訊息範本，用你的風格改寫</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">第3步：實戰測試</h3>
              <p className="text-gray-700">這週用你改寫的版本，觀察學生反應</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">第4步：持續調整</h3>
              <p className="text-gray-700">什麼有效就保留，什麼不適合就調整</p>
            </div>
          </div>

          <div className="mt-6 bg-orange-100 p-4 rounded-lg">
            <p className="text-orange-900 font-semibold">
              💡 記住：風格不是一天形成的，給自己時間慢慢發展。<br/>
              重要的是開始嘗試，找到屬於你的方式。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
