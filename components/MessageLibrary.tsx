'use client';

import { useState } from 'react';
import { messageTemplates, messageTemplatesByCategory, templateVariables } from '@/data/messageTemplates';
import BackButton from '@/components/BackButton';

interface MessageLibraryProps {
  onBack?: () => void;
}

export default function MessageLibrary({ onBack }: MessageLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = messageTemplates.filter(template => {
    if (selectedCategory && template.category !== selectedCategory) return false;
    return true;
  });

  const categories = ['第一次上課', '課後關心', '進步鼓勵', '停滯期', '受傷關心', '續約提醒', '轉介紹'];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <h2 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        💬 訊息範本庫
      </h2>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        21 個訊息範本，複製貼上就能用
      </p>

      <div className="bg-green-50 rounded-2xl p-6 mb-8 border-l-4 border-success">
        <h3 className="font-outfit text-2xl font-bold mb-3">💡 使用說明</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 每個範本都有可替換的變數（例如：{'{name}'}、{'{achievement}'}）</li>
          <li>• 複製後記得替換成實際內容</li>
          <li>• 加入你的個人風格，不要太制式</li>
          <li>• 真誠最重要，不要只是複製貼上</li>
        </ul>
      </div>

      {/* 變數說明 */}
      <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-primary">
        <h3 className="font-outfit text-2xl font-bold mb-3">📝 常用變數</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {Object.entries(templateVariables).slice(0, 9).map(([key, value]) => (
            <div key={key} className="bg-white p-3 rounded-lg">
              <code className="text-primary font-bold">{key}</code>
              <div className="text-sm text-gray-600 mt-1">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 類別篩選 */}
      <div className="mb-8">
        <h3 className="font-bold mb-3">📂 按情境篩選</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            全部 ({messageTemplates.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat} ({messageTemplatesByCategory[cat as keyof typeof messageTemplatesByCategory].length})
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
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                      {template.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                      {template.whenToUse}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{template.situation}</h3>
                </div>
                <div className="text-2xl ml-4">
                  {expandedId === template.id ? '▼' : '▶'}
                </div>
              </div>
            </button>

            {expandedId === template.id && (
              <div className="p-6 pt-0 border-t-2 border-gray-100 animate-fade-in">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-primary">📱 訊息範本</h4>
                      <button
                        onClick={() => copyToClipboard(template.template, template.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          copiedId === template.id
                            ? 'bg-success text-white'
                            : 'bg-primary text-white hover:shadow-lg'
                        }`}
                      >
                        {copiedId === template.id ? '✓ 已複製' : '📋 複製範本'}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans bg-white p-4 rounded border-2 border-gray-200">
                      {template.template}
                    </pre>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-warning">
                    <h4 className="font-bold mb-2 text-warning">💡 使用技巧</h4>
                    <ul className="space-y-1 text-gray-700">
                      {template.tips.map((tip, idx) => (
                        <li key={idx}>• {tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
                    <h4 className="font-bold mb-2 text-primary">⏰ 何時使用</h4>
                    <p className="text-gray-700">{template.whenToUse}</p>
                  </div>
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
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="text-gray-300 mb-1">總範本數</div>
            <div className="text-4xl font-bold">{messageTemplates.length}</div>
          </div>
          <div>
            <div className="text-gray-300 mb-1">課後關心</div>
            <div className="text-4xl font-bold text-success">{messageTemplatesByCategory['課後關心'].length}</div>
          </div>
          <div>
            <div className="text-gray-300 mb-1">續約提醒</div>
            <div className="text-4xl font-bold text-warning">{messageTemplatesByCategory['續約提醒'].length}</div>
          </div>
          <div>
            <div className="text-gray-300 mb-1">轉介紹</div>
            <div className="text-4xl font-bold text-primary">{messageTemplatesByCategory['轉介紹'].length}</div>
          </div>
        </div>
        <p className="mt-4 text-gray-300">
          💡 建議：每週至少使用 2 次課後關心範本
        </p>
      </div>
    </div>
  );
}
