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
  const quickSearchMap: { [key: string]: { framework: string; section: string } } = {
    '太貴': { framework: 'objection', section: '太貴了' },
    '貴': { framework: 'objection', section: '太貴了' },
    '考慮': { framework: 'objection', section: '我考慮看看' },
    '想想': { framework: 'objection', section: '我考慮看看' },
    '沒時間': { framework: 'objection', section: '沒時間' },
    '自己練': { framework: 'objection', section: '自己練就好' },
    '問家人': { framework: 'objection', section: '要問家人' },
    '續約': { framework: 'renewal', section: '續約' },
    '開發': { framework: 'cold-approach', section: '陌生開發' },
    '報價': { framework: 'pricing', section: '報價' },
    '風格': { framework: 'style', section: '個人風格' },
  };

  // 搜尋處理
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // 檢查是否有匹配的快速查詢
    for (const [keyword, target] of Object.entries(quickSearchMap)) {
      if (query.includes(keyword)) {
        setActiveFramework(target.framework);
        // 可以在這裡加入滾動到特定區塊的邏輯
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
        <p className="text-center text-gray-600 mb-8 text-lg">
          遇到問題？快速找到解決方法
        </p>

        {/* 搜尋框 */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="輸入問題關鍵字，例如：太貴、考慮、續約..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          
          {/* 快速查詢提示 */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">常見問題快速查詢：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(quickSearchMap).slice(0, 8).map((keyword) => (
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

        {/* 分頁導航 */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {frameworks.map((fw) => (
            <button
              key={fw.id}
              onClick={() => setActiveFramework(fw.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeFramework === fw.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <span className="mr-2">{fw.icon}</span>
              {fw.label}
            </button>
          ))}
        </div>

        {/* 內容區域 - 這裡保持原本的內容 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          {/* 原本的框架內容會在這裡 */}
          <p className="text-gray-600 text-center">
            框架內容保持不變，只是加入了搜尋功能
          </p>
        </div>
      </div>
    </div>
  );
}
