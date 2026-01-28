'use client';

import { useState } from 'react';
import { videoTopics, videoTopicsByCategory, videoTopicsByLevel } from '@/data/videoTopics';
import BackButton from '@/components/BackButton';

interface VideoLibraryProps {
  onBack?: () => void;
}

export default function VideoLibrary({ onBack }: VideoLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTopics = videoTopics.filter(topic => {
    if (selectedCategory && topic.category !== selectedCategory) return false;
    if (selectedLevel && topic.level !== selectedLevel) return false;
    return true;
  });

  const categories = ['技術教學', '學員見證', 'Q&A', '日常分享', '動機激勵'];
  const levels = ['新手友善', '進階'];

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <h2 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        🎬 影片主題庫
      </h2>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        30 個影片主題 + 完整腳本，直接拍就對了
      </p>

      <div className="bg-blue-50 rounded-2xl p-6 mb-8 border-l-4 border-primary">
        <h3 className="font-outfit text-2xl font-bold mb-3">💡 使用說明</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 每個主題都有完整腳本，照著拍就好</li>
          <li>• 新手建議從「新手友善」開始</li>
          <li>• 每週至少拍 1 支，持續 3 個月就有 12 支了</li>
          <li>• 可以根據學員常問的問題選主題</li>
        </ul>
      </div>

      {/* 篩選器 */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="font-bold mb-3">📂 按類別篩選</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              全部 ({videoTopics.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat} ({videoTopicsByCategory[cat as keyof typeof videoTopicsByCategory].length})
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">🎯 按難度篩選</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedLevel(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedLevel === null ? 'bg-success text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              全部
            </button>
            {levels.map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedLevel === level ? 'bg-success text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level} ({videoTopicsByLevel[level as keyof typeof videoTopicsByLevel].length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 影片主題列表 */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <button
              onClick={() => setExpandedId(expandedId === topic.id ? null : topic.id)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      topic.level === '新手友善' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {topic.level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
                      {topic.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                      ⏱️ {topic.estimatedTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{topic.title}</h3>
                </div>
                <div className="text-2xl ml-4">
                  {expandedId === topic.id ? '▼' : '▶'}
                </div>
              </div>
            </button>

            {expandedId === topic.id && (
              <div className="p-6 pt-0 border-t-2 border-gray-100 animate-fade-in">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-primary">📝 完整腳本</h4>
                    <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed font-sans">
                      {topic.script}
                    </pre>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-warning">
                    <h4 className="font-bold mb-2 text-warning">💡 拍攝技巧</h4>
                    <ul className="space-y-1 text-gray-700">
                      {topic.tips.map((tip, idx) => (
                        <li key={idx}>• {tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1">
                      📋 複製腳本
                    </button>
                    <button className="px-6 py-3 bg-success text-white font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1">
                      ✓ 標記為已拍
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">沒有符合條件的影片主題</p>
        </div>
      )}

      {/* 統計 */}
      <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-6">
        <h3 className="font-outfit text-2xl font-bold mb-4">📊 你的進度</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-gray-300 mb-1">總主題數</div>
            <div className="text-4xl font-bold">{videoTopics.length}</div>
          </div>
          <div>
            <div className="text-gray-300 mb-1">已拍攝</div>
            <div className="text-4xl font-bold text-success">0</div>
          </div>
          <div>
            <div className="text-gray-300 mb-1">完成率</div>
            <div className="text-4xl font-bold text-warning">0%</div>
          </div>
        </div>
        <p className="mt-4 text-gray-300">
          💡 建議：每週拍 1 支，3 個月就有 12 支了！
        </p>
      </div>
    </div>
  );
}
