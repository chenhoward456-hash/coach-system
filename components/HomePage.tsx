'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/localStorage';
import PolygonTheory from '@/components/PolygonTheory';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-12 border border-blue-100">
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
          <div className="bg-white p-6 rounded-xl border-l-4 border-primary">
            <h4 className="font-bold text-xl text-primary mb-3">🌱 如果你是新人（不知道怎麼開始）</h4>
            <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
              <li>遇到問題就用 <strong className="text-primary">「問題診斷」</strong> → 找出原因和解方</li>
              <li>想學習就去 <strong className="text-primary">「學習資源」</strong> → 選新手等級的書和影片</li>
              <li>不知道拍什麼就看 <strong className="text-primary">「影片主題庫」</strong> → 30個主題直接用</li>
              <li>不知道怎麼關心學員就看 <strong className="text-primary">「訊息範本」</strong> → 複製貼上就好</li>
            </ol>
            <p className="mt-4 font-bold text-danger">
              💡 重點：遇到問題再來找工具，不用全部看完！
            </p>
          </div>

          {/* 遇到問題 */}
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

          {/* 不知道該做什麼 */}
          <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500">
            <h4 className="font-bold text-xl text-indigo-600 mb-3">❓ 如果你不知道該做什麼</h4>
            <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
              <li>先做 <strong className="text-indigo-600">「問題診斷」</strong> → 看看你現在的狀態</li>
              <li>然後看下面的「你現在遇到什麼困難？」 → 選擇對應的工具</li>
              <li>有問題隨時問 Howard → 我會幫你</li>
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
          {/* 迷惘 */}
          <button
            onClick={() => onNavigate('diagnosis')}
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-red-200 hover:shadow-xl hover:border-red-400 transition-all text-left group"
          >
            <div className="text-5xl mb-4">🆘</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-danger transition-colors">
              我很迷惘，不知道怎麼辦
            </h3>
            <p className="text-gray-700 mb-4">
              沒動力、沒成果、不知道問題在哪...
            </p>
            <div className="text-danger font-bold">→ 狀態診斷工具</div>
          </button>

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
            className="bg-white rounded-2xl p-8 shadow-md border-2 border-orange-200 hover:shadow-xl hover:border-orange-400 transition-all text-left group md:col-span-2"
          >
            <div className="text-5xl mb-4">💪</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-warning transition-colors">
              我需要調整心態
            </h3>
            <p className="text-gray-700 mb-4">
              遇到瓶頸、需要重新找回動力...
            </p>
            <div className="text-warning font-bold">→ 成長心法</div>
          </button>
        </div>
      </div>
    </div>
  );
}
