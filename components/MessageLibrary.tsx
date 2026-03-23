'use client';

import { useState } from 'react';
import { enhancedMessageTemplates, templateCategories, getTemplatesByCategory } from '@/data/enhancedMessageTemplates';
import BackButton from '@/components/BackButton';

interface MessageLibraryProps {
  onBack?: () => void;
}

export default function MessageLibrary({ onBack }: MessageLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('基礎關心');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = getTemplatesByCategory(selectedCategory).filter(template => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      template.title.toLowerCase().includes(query) ||
      template.template.toLowerCase().includes(query) ||
      template.whenToUse.toLowerCase().includes(query)
    );
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const highlightVariables = (text: string) => {
    return text.split(/(\{[^}]+\})/g).map((part, idx) => {
      if (part.match(/\{[^}]+\}/)) {
        return (
          <span key={idx} className="font-bold text-primary bg-blue-100 px-1 rounded">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      <div className="mb-8">
        <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-3">
          💡 救命錦囊
        </h2>
        <p className="text-gray-600 text-lg">
          不知道怎麼說？這裡有參考範例。但記住：<strong className="text-primary">真誠比話術更重要</strong>。
        </p>
        <div className="mt-3 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-5 rounded-lg">
          <p className="text-orange-900 font-semibold mb-2">
            ⚠️ 重要提醒：這些是參考，不是標準答案
          </p>
          <ul className="text-orange-800 text-sm space-y-2">
            <li>• <strong>改成你的風格：</strong>用你平常說話的方式，不要照抄</li>
            <li>• <strong>加入個人特色：</strong>你的幽默、你的關心方式、你的個性</li>
            <li>• <strong>學生選擇你，是因為你是你：</strong>不是因為你背了話術</li>
          </ul>
        </div>
        <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-800 text-sm">
            💡 <strong>範例對比：</strong><br/>
            ❌ 制式：「{'{名字}'} 今天練得很棒！💪」<br/>
            ✅ 有靈魂：「欸{'{名字}'}，今天那組硬舉超猛的！下次挑戰更重？」
          </p>
        </div>
      </div>

      {/* 快速搜尋 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 輸入關鍵字快速找話術（例如：生日、續約、關心）"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-gray-600">
            找到 {filteredTemplates.length} 個相關範本
          </p>
        )}
      </div>

      {/* 分類 Tab */}
      <div className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {templateCategories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setExpandedId(null);
                setSearchQuery('');
              }}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat} ({getTemplatesByCategory(cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* 訊息範本列表 */}
      <div className="space-y-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <button
              onClick={() => setExpandedId(expandedId === template.id ? null : template.id)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{template.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {template.category}
                    </span>
                    <span>⏰ {template.whenToUse}</span>
                  </div>
                </div>
                <div className="text-2xl ml-4">
                  {expandedId === template.id ? '▼' : '▶'}
                </div>
              </div>
            </button>

            {expandedId === template.id && (
              <div className="p-6 pt-0 border-t-2 border-gray-100 animate-fade-in">
                <div className="space-y-4">
                  {/* 範本內容 */}
                  <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-primary text-lg">📱 訊息範本</h4>
                      <button
                        onClick={() => copyToClipboard(template.template, template.id)}
                        className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                          copiedId === template.id
                            ? 'bg-success text-white shadow-lg'
                            : 'bg-primary text-white hover:shadow-xl'
                        }`}
                      >
                        {copiedId === template.id ? '✓ 已複製！' : '📋 複製範本'}
                      </button>
                    </div>
                    <div className="bg-white p-4 rounded border-2 border-gray-300 whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {highlightVariables(template.template)}
                    </div>
                  </div>

                  {/* 變數說明 */}
                  {template.variables.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
                      <h4 className="font-bold mb-2 text-primary">📝 需要替換的變數</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.variables.map((variable, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white rounded-lg border-2 border-primary text-primary font-bold text-sm"
                          >
                            {variable}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 使用技巧 */}
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-warning">
                    <h4 className="font-bold mb-2 text-warning">💡 使用技巧</h4>
                    <ul className="space-y-1 text-gray-700">
                      {template.tips.map((tip, idx) => (
                        <li key={idx}>• {tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Howard 的真心話 */}
                  {template.howardNote && (
                    <div className="bg-gray-900 p-5 rounded-lg">
                      <h4 className="font-bold mb-2 text-gray-300 text-sm tracking-wide">HOWARD 的真心話</h4>
                      <p className="text-gray-100 leading-relaxed italic">
                        「{template.howardNote}」
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">沒有符合條件的訊息範本</p>
        </div>
      )}

      {/* 統計 */}
      <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-6">
        <h3 className="font-outfit text-2xl font-bold mb-4">📊 範本統計</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {templateCategories.map(cat => (
            <div key={cat}>
              <div className="text-gray-300 mb-1">{cat}</div>
              <div className="text-4xl font-bold text-success">{getTemplatesByCategory(cat).length}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-300">
          💡 建議：每週至少使用 2 次課後關心範本
        </p>
      </div>

      {/* 給學員的資源 */}
      <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6">
        <h3 className="font-outfit text-xl font-bold text-purple-900 mb-1">
          📤 給學員的資源
        </h3>
        <p className="text-sm text-purple-700 mb-4">
          傳訊息時可以附上這些 Notion 頁面連結，讓學員自己查。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: '🆕 新學員歡迎指南', url: 'https://www.notion.so/32beef85c08f8172aee7c1b3d72c4c2d' },
            { label: '🔥 減脂飲食清單', url: 'https://www.notion.so/32beef85c08f8174b098c2bfb34f5f9c' },
            { label: '💪 增肌飲食清單', url: 'https://www.notion.so/32beef85c08f8162bbf3f4b25df4550c' },
            { label: '⚖️ 維持期飲食清單', url: 'https://www.notion.so/32beef85c08f81519ef5d9fc9ebd38cc' },
            { label: '🍱 外食攻略', url: 'https://www.notion.so/32beef85c08f812b924dd94286da8895' },
            { label: '❓ 常見問題 FAQ', url: 'https://www.notion.so/32beef85c08f8146887ff382846e9859' },
          ].map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border-2 border-purple-200 hover:border-purple-400 hover:shadow-md rounded-xl px-3 py-2.5 text-sm font-semibold text-purple-800 transition-all"
            >
              <span className="flex-1">{item.label}</span>
              <span className="text-purple-400 text-xs">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
