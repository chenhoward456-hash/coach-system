'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/localStorage';
import PolygonTheory from '@/components/PolygonTheory';
import DailyChecklist from './DailyChecklist';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  // 每日金句（從成長心法中隨機選一句）
  const dailyQuotes = [
    '真誠 > 話術。學生要的不是完美的話術，而是真實的你。',
    '行動 > 完美。先開始，再優化。等到完美再開始，永遠不會開始。',
    '持續 > 爆發。每天進步 1%，一年後你會進步 37 倍。',
    '你的狀態就是最好的廣告。想要學生相信訓練有效？先讓自己成為證明。',
    '學生不會記得你說了什麼，但會記得你讓他們有什麼感覺。',
    '不要和別人比，要和昨天的自己比。每個人的起點不同，重要的是持續進步。',
    '低潮是成長的必經之路。沒有低潮，就沒有突破。',
    '專注你能控制的事。學生數、收入這些結果你無法直接控制，但你可以控制每天的行動。',
  ];

  // 影片主題（從30個主題中隨機選一個）
  const videoTopics = [
    { title: '訓練日常 Vlog', description: '記錄一天的訓練和生活', difficulty: '新手友善' },
    { title: '學員成果分享', description: '展示學員的進步和改變', difficulty: '新手友善' },
    { title: '常見錯誤動作', description: '指出並修正常見的訓練錯誤', difficulty: '新手友善' },
    { title: '一個動作教學', description: '深入講解一個訓練動作', difficulty: '進階' },
    { title: '飲食觀念分享', description: '分享實用的飲食知識', difficulty: '新手友善' },
    { title: '訓練迷思破解', description: '破解常見的健身迷思', difficulty: '進階' },
    { title: '我的教練日常', description: '展現真實的教練生活', difficulty: '新手友善' },
    { title: '學員問答', description: '回答學員常問的問題', difficulty: '新手友善' },
  ];

  const [dailyQuote, setDailyQuote] = useState(dailyQuotes[0]);
  const [dailyVideo, setDailyVideo] = useState(videoTopics[0]);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyQuote_date');
    const savedQuote = localStorage.getItem('dailyQuote_text');
    
    if (savedDate === today && savedQuote) {
      setDailyQuote(savedQuote);
    } else {
      const newQuote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
      localStorage.setItem('dailyQuote_date', today);
      localStorage.setItem('dailyQuote_text', newQuote);
      setDailyQuote(newQuote);
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyVideo_date');
    const savedVideo = localStorage.getItem('dailyVideo_data');
    
    if (savedDate === today && savedVideo) {
      setDailyVideo(JSON.parse(savedVideo));
    } else {
      const newVideo = videoTopics[Math.floor(Math.random() * videoTopics.length)];
      localStorage.setItem('dailyVideo_date', today);
      localStorage.setItem('dailyVideo_data', JSON.stringify(newVideo));
      setDailyVideo(newVideo);
    }
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-8 border border-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-bounce-slow">💪</div>
          <h1 className="font-outfit text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            教練成長工具箱
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
            迷惘時來這裡找答案，需要時拿工具
          </p>
        </div>
      </div>

      {/* 每日金句 */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl p-6 mb-8 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">今日金句</h3>
            <p className="text-lg leading-relaxed">{dailyQuote}</p>
          </div>
        </div>
      </div>

      {/* 快速入口 + 今日推薦 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* 快速入口 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <h3 className="font-outfit text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            快速入口
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('daily')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105"
            >
              ✅ 今日清單
            </button>
            <button
              onClick={() => onNavigate('videos')}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105"
            >
              🎬 影片主題
            </button>
            <button
              onClick={() => onNavigate('messages')}
              className="bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105"
            >
              💬 訊息範本
            </button>
            <button
              onClick={() => onNavigate('frameworks')}
              className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105"
            >
              ⚡ 實戰工具
            </button>
          </div>
        </div>

        {/* 今日推薦影片主題 */}
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-outfit text-xl font-bold mb-3 flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            今日推薦影片主題
          </h3>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-3">
            <h4 className="font-bold text-lg mb-2">{dailyVideo.title}</h4>
            <p className="text-sm opacity-90 mb-2">{dailyVideo.description}</p>
            <span className="inline-block bg-white/30 px-3 py-1 rounded-full text-xs font-semibold">
              {dailyVideo.difficulty}
            </span>
          </div>
          <button
            onClick={() => onNavigate('videos')}
            className="w-full bg-white text-purple-600 font-bold py-2 px-4 rounded-xl hover:bg-purple-50 transition-all"
          >
            查看更多主題 →
          </button>
        </div>
      </div>

      {/* 給所有教練的話 */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-10 mb-12 border-2 border-orange-200">
        <h2 className="font-outfit text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          給所有教練的話
        </h2>
        
        <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
          <p>
            這個系統不是要<strong className="text-gray-900">「要求所有人都一樣」</strong><br />
            而是讓每個人找到自己的成長方式
          </p>
          <p>
            有人擅長內容創作、有人擅長服務深耕、有人擅長專業技術<br />
            <strong className="text-primary">找到你的強項，做出你的價值</strong>
          </p>
          <p className="text-gray-700">
            這裡沒有 KPI、沒有考核、沒有打分數<br />
            只有工具、資源、和你需要的答案
          </p>
          <p className="text-right text-gray-600 italic mt-8">
            — Howard
          </p>
        </div>
      </div>

      {/* 系統使用指南 */}
      <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-l-4 border-primary">
        <h3 className="font-outfit text-2xl font-bold mb-4 text-primary">
          📖 如何使用這個系統？（先看這裡！）
        </h3>
        <p className="text-gray-700 mb-6 text-lg">
          這個系統內容很多，但不要被嚇到！根據你的需求，選擇對應的路徑：
        </p>

        <div className="space-y-4">
          {/* 新人路徑 */}
          <div className="bg-white p-6 rounded-xl border-l-4 border-danger">
            <h4 className="font-bold text-xl text-danger mb-3">🆘 如果你遇到問題（迷惘、沒動力、沒成果）</h4>
            <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
              <li>直接點擊 <strong className="text-danger">「問題診斷」</strong> → 回答3個問題</li>
              <li>看看你屬於哪種迷惘 → 系統會給你解方</li>
              <li>跟著「立刻行動」清單做 → 一步一步解決</li>
              <li>還是不行就找 Howard 聊 → 不要一個人硬撐</li>
            </ol>
          </div>

          {/* 想學習 */}
          <div className="bg-white p-6 rounded-xl border-l-4 border-success">
            <h4 className="font-bold text-xl text-success mb-3">📚 如果你想學習（看書、看影片）</h4>
            <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
              <li>點擊 <strong className="text-success">「學習資源」</strong> → 選擇你的等級（新手/中手/資深）</li>
              <li>跟著「推薦學習順序」看 → 不要亂看一通</li>
              <li>邊看邊做 → 學到的東西立刻實踐</li>
              <li>不要貪多 → 看懂1本做到100%，比看10本做到10%有用</li>
            </ol>
          </div>

          {/* 需要調整心態 */}
          <div className="bg-white p-6 rounded-xl border-l-4 border-warning">
            <h4 className="font-bold text-xl text-warning mb-3">💪 如果你需要調整心態</h4>
            <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
              <li>去看 <strong className="text-warning">「成長心法」</strong> → 重新找回動力</li>
              <li>記住：這是馬拉松，不是短跑 → 慢慢來比較快</li>
              <li>遇到低潮很正常 → 每個人都會遇到</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 多邊形理論 */}
      <div className="mb-12">
        <PolygonTheory />
      </div>

      {/* 30天成長計畫 - 快速入口 */}
      <div className="mb-12">
        <h2 className="font-outfit text-3xl font-bold text-center mb-4 text-gray-900">
          🚀 30天成長計畫
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          選擇你的階段，開始你的成長之旅
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* 新手成長地圖 */}
          <button
            onClick={() => onNavigate('plan-beginner')}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border-2 border-green-300 hover:shadow-2xl hover:border-green-500 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3">
                新手成長地圖
              </h3>
              <p className="text-gray-700 mb-4 text-lg">
                適合 <strong className="text-green-600">0-15位學生</strong> 的教練
              </p>
              <p className="text-gray-600 text-sm mb-4">
                建立基礎習慣、系統化流程、開始主動開發
              </p>
              <div className="text-green-600 font-bold text-lg">→ 查看新手計畫</div>
            </div>
          </button>

          {/* 進階成長地圖 */}
          <button
            onClick={() => onNavigate('plan-intermediate')}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg border-2 border-purple-300 hover:shadow-2xl hover:border-purple-500 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3">
                進階成長地圖
              </h3>
              <p className="text-gray-700 mb-4 text-lg">
                適合 <strong className="text-purple-600">15位以上學生</strong> 的教練
              </p>
              <p className="text-gray-600 text-sm mb-4">
                數據追蹤、流程自動化、內容策略優化
              </p>
              <div className="text-purple-600 font-bold text-lg">→ 查看進階計畫</div>
            </div>
          </button>
        </div>
      </div>

      {/* 你現在遇到什麼困難？ */}
      <div className="mb-12">
        <h2 className="font-outfit text-3xl font-bold text-center mb-8 text-gray-900">
          你現在遇到什麼困難？
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          選擇你的狀況，我們幫你找到解決方法
        </p>

        {/* 問題導向卡片 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 不知道拍什麼 */}
          <button
            onClick={() => onNavigate('videos')}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-purple-200 hover:shadow-xl hover:border-purple-400 transition-all text-left group"
          >
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              我不知道拍什麼影片
            </h3>
            <p className="text-gray-700 mb-4">
              想拍影片但沒靈感、不知道怎麼開始...
            </p>
            <div className="text-purple-600 font-bold">→ 影片主題庫（30個主題）</div>
          </button>

          {/* 不知道怎麼關心 */}
          <button
            onClick={() => onNavigate('messages')}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-green-200 hover:shadow-xl hover:border-green-400 transition-all text-left group"
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-success transition-colors">
              我不知道怎麼關心學員
            </h3>
            <p className="text-gray-700 mb-4">
              想關心但不知道說什麼、怕太制式...
            </p>
            <div className="text-success font-bold">→ 訊息範本庫（21個範本）</div>
          </button>

          {/* 實戰問題 */}
          <button
            onClick={() => onNavigate('frameworks')}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-orange-200 hover:shadow-xl hover:border-orange-400 transition-all text-left group"
          >
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-warning transition-colors">
              我遇到實戰問題
            </h3>
            <p className="text-gray-700 mb-4">
              不知道怎麼開發、續約、報價、處理拒絕...
            </p>
            <div className="text-warning font-bold">→ 實戰工具（開發、續約、報價、拒絕）</div>
          </button>

          {/* 想學習 */}
          <button
            onClick={() => onNavigate('resources')}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all text-left group"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              我想學習但不知道看什麼
            </h3>
            <p className="text-gray-700 mb-4">
              想進修但書太多、不知道從哪開始...
            </p>
            <div className="text-primary font-bold">→ 學習資源庫（53項資源）</div>
          </button>

          {/* 心態調整 */}
          <button
            onClick={() => onNavigate('mindset')}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-purple-200 hover:shadow-xl hover:border-purple-400 transition-all text-left group"
          >
            <div className="text-5xl mb-4">💪</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              我需要調整心態
            </h3>
            <p className="text-gray-700 mb-4">
              遇到瓶頸、需要重新找回動力...
            </p>
            <div className="text-purple-600 font-bold">→ 成長心法</div>
          </button>
        </div>
      </div>
    </div>
  );
}
