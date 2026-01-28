'use client';

export default function PolygonTheory() {
  return (
    <div className="space-y-8">
      {/* 多邊形理論標題 */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200">
        <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-4">
          📊 教練成長的多邊形理論
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed">
          成長不是單一能力+10，而是<strong className="text-primary">「整個平台提升」</strong>
        </p>
      </div>

      {/* 五大維度 */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
        <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-6 text-center">
          五大成長維度
        </h3>
        
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="text-4xl mb-2">💪</div>
            <strong className="text-blue-600 block mb-2">專業能力</strong>
            <p className="text-sm text-gray-600">訓練技術、動作指導</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="text-4xl mb-2">👥</div>
            <strong className="text-green-600 block mb-2">會員經營</strong>
            <p className="text-sm text-gray-600">課後關心、續約率</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
            <div className="text-4xl mb-2">📱</div>
            <strong className="text-purple-600 block mb-2">內容產出</strong>
            <p className="text-sm text-gray-600">影片、貼文、品牌</p>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
            <div className="text-4xl mb-2">🤝</div>
            <strong className="text-orange-600 block mb-2">團隊協作</strong>
            <p className="text-sm text-gray-600">溝通、配合、貢獻</p>
          </div>
          
          <div className="text-center p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
            <div className="text-4xl mb-2">💪</div>
            <strong className="text-indigo-600 block mb-2">個人狀態</strong>
            <p className="text-sm text-gray-600">體態、精神、熱誠、態度</p>
          </div>
        </div>

        {/* 成長階段對比 */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-bold text-xl mb-6 text-center">📊 成長階段對比</h4>
          
          <div className="space-y-6">
            {/* 新手教練 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🔴</div>
                <strong className="text-xl">新手教練：小小的五邊形</strong>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">專業</div>
                  <strong className="text-red-600 text-xl">30分</strong>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">經營</div>
                  <strong className="text-red-600 text-xl">20分</strong>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">內容</div>
                  <strong className="text-red-600 text-xl">10分</strong>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">團隊</div>
                  <strong className="text-red-600 text-xl">15分</strong>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">狀態</div>
                  <strong className="text-red-600 text-xl">25分</strong>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                → 總分低，形狀不規則，有很多明顯弱點
              </p>
            </div>

            {/* 中階教練 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-warning">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🟡</div>
                <strong className="text-xl">中階教練：擴大但有凹陷</strong>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">專業</div>
                  <strong className="text-warning text-xl">70分</strong>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">經營</div>
                  <strong className="text-warning text-xl">50分</strong>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">內容</div>
                  <strong className="text-warning text-xl">40分</strong>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">團隊</div>
                  <strong className="text-warning text-xl">60分</strong>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">狀態</div>
                  <strong className="text-warning text-xl">65分</strong>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                → 總分提升，但形狀還不夠圓，需要補強弱項
              </p>
            </div>

            {/* 資深教練 */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-success">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🟢</div>
                <strong className="text-xl">資深教練：大而均衡的圓形</strong>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">專業</div>
                  <strong className="text-success text-xl">85分</strong>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">經營</div>
                  <strong className="text-success text-xl">90分</strong>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">內容</div>
                  <strong className="text-success text-xl">80分</strong>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">團隊</div>
                  <strong className="text-success text-xl">85分</strong>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">狀態</div>
                  <strong className="text-success text-xl">88分</strong>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                → 總分高，形狀接近圓形，沒有明顯弱點
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Howard 的解釋 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-2xl p-8">
        <h3 className="font-outfit text-2xl font-bold mb-4 border-b border-white/30 pb-3">
          💬 Howard 的解釋
        </h3>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            很多教練問我：「為什麼我專業進步了，但感覺還是沒成長？」
          </p>
          <p>
            因為成長不是「單一能力+10」，而是<strong className="text-warning text-xl">「整個平台提升」</strong>。
          </p>
          <p className="text-warning font-bold text-xl">
            「專業進步了，溝通0、體態0、態度0、熱誠0、業績0 = 還是沒成長」
          </p>
          <p>
            這就是為什麼：<br />
            ✓ 每週任務有15項（不是只看專業）<br />
            ✓ 四條發展路徑（會員經營、內容產出、專業深度、全能進化）<br />
            ✓ 問題診斷看多個維度（不是只看一個面向）
          </p>
          <p className="text-success font-bold text-2xl">
            記住：讓你的多邊形變大、變圓，而不是只拉長一個邊。
          </p>
          <p className="text-warning font-bold text-xl">
            各個面向都補足，你才會意識到自己真的進步了。
          </p>
        </div>
      </div>

      {/* 結論 */}
      <div className="bg-warning text-gray-900 rounded-2xl p-6 text-center">
        <strong className="text-2xl block mb-3">🎯 所以，不要只練一個面向！</strong>
        <p className="text-lg leading-relaxed">
          用這個系統，讓你的五邊形慢慢變大、變圓<br />
          這才是真正的成長
        </p>
      </div>
    </div>
  );
}
