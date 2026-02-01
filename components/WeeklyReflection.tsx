'use client';

import { useState, useEffect } from 'react';

interface Reflection {
  week: string;
  achievement: string;
  challenge: string;
  nextWeek: string;
  timestamp: number;
}

export default function WeeklyReflection() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentReflection, setCurrentReflection] = useState({
    achievement: '',
    challenge: '',
    nextWeek: ''
  });

  useEffect(() => {
    loadReflections();
    checkWeeklyReminder();
  }, []);

  const loadReflections = () => {
    const saved = localStorage.getItem('weeklyReflections');
    if (saved) {
      setReflections(JSON.parse(saved));
    }
  };

  const checkWeeklyReminder = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const lastReflection = localStorage.getItem('lastReflection_date');
    const thisWeek = getWeekString(today);

    // 每週五提醒，且本週還沒寫過
    if (dayOfWeek === 5 && lastReflection !== thisWeek) {
      setShowForm(true);
    }
  };

  const getWeekString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekNum = Math.ceil(day / 7);
    return `${year}年${month}月第${weekNum}週`;
  };

  const saveReflection = () => {
    if (!currentReflection.achievement || !currentReflection.challenge || !currentReflection.nextWeek) {
      alert('請填寫所有問題');
      return;
    }

    const today = new Date();
    const newReflection: Reflection = {
      week: getWeekString(today),
      achievement: currentReflection.achievement,
      challenge: currentReflection.challenge,
      nextWeek: currentReflection.nextWeek,
      timestamp: Date.now()
    };

    const updated = [newReflection, ...reflections];
    setReflections(updated);
    localStorage.setItem('weeklyReflections', JSON.stringify(updated));
    localStorage.setItem('lastReflection_date', newReflection.week);

    setCurrentReflection({ achievement: '', challenge: '', nextWeek: '' });
    setShowForm(false);

    alert('✅ 本週反思已保存！\n\n💡 建議截圖保存，避免換電腦或清除瀏覽器時資料遺失。');
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric' });
  };

  const downloadReflections = () => {
    if (reflections.length === 0) {
      alert('目前沒有反思記錄可以下載');
      return;
    }

    let content = '📝 教練成長反思記錄\n';
    content += '==================\n\n';
    
    reflections.forEach((reflection, index) => {
      content += `【${reflection.week}】 - ${formatDate(reflection.timestamp)}\n\n`;
      content += `🎉 這週最有成就感的事：\n${reflection.achievement}\n\n`;
      content += `💪 這週最大的挑戰：\n${reflection.challenge}\n\n`;
      content += `🎯 下週想改善什麼：\n${reflection.nextWeek}\n\n`;
      content += '-------------------\n\n';
    });

    content += `\n匯出時間：${new Date().toLocaleString('zh-TW')}\n`;
    content += `總共 ${reflections.length} 週的反思記錄\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `教練反思記錄_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✅ 反思記錄已下載！\n\n請妥善保存這個檔案，換電腦時可以參考。');
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-outfit text-2xl font-bold text-gray-900">
            📝 每週反思
          </h3>
          <div className="flex gap-2">
            {reflections.length > 0 && (
              <button
                onClick={downloadReflections}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
              >
                💾 下載記錄
              </button>
            )}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                + 寫本週反思
              </button>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          每週五花 5 分鐘反思，記錄你的成長軌跡
        </p>

        {/* 反思表單 */}
        {showForm && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
            <h4 className="font-bold text-lg text-purple-900 mb-4">本週反思（3 個問題）</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  1. 這週最有成就感的事？ 🎉
                </label>
                <textarea
                  value={currentReflection.achievement}
                  onChange={(e) => setCurrentReflection({ ...currentReflection, achievement: e.target.value })}
                  placeholder="例如：成功拍了 2 支影片、有學員續約了、學會了新的訓練技巧..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  2. 這週最大的挑戰？ 💪
                </label>
                <textarea
                  value={currentReflection.challenge}
                  onChange={(e) => setCurrentReflection({ ...currentReflection, challenge: e.target.value })}
                  placeholder="例如：拍影片很卡、不知道怎麼開發新學員、時間管理很困難..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  3. 下週想改善什麼？ 🎯
                </label>
                <textarea
                  value={currentReflection.nextWeek}
                  onChange={(e) => setCurrentReflection({ ...currentReflection, nextWeek: e.target.value })}
                  placeholder="例如：下週要拍 3 支影片、要主動關心 10 位學員、要學會處理續約猶豫..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveReflection}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
                >
                  💾 保存反思
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 歷史反思 */}
        {reflections.length > 0 ? (
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900">📚 成長軌跡</h4>
            {reflections.slice(0, 4).map((reflection, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-primary">{reflection.week}</div>
                  <div className="text-sm text-gray-500">{formatDate(reflection.timestamp)}</div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-700 mb-1">🎉 成就感的事</div>
                    <div className="text-gray-600">{reflection.achievement}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700 mb-1">💪 遇到的挑戰</div>
                    <div className="text-gray-600">{reflection.challenge}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700 mb-1">🎯 想改善的</div>
                    <div className="text-gray-600">{reflection.nextWeek}</div>
                  </div>
                </div>
              </div>
            ))}

            {reflections.length > 4 && (
              <div className="text-center text-sm text-gray-500">
                還有 {reflections.length - 4} 週的反思記錄...
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-5xl mb-3">📝</div>
            <p>還沒有反思記錄</p>
            <p className="text-sm mt-1">每週五寫一次，記錄你的成長</p>
          </div>
        )}

        {/* 提示 */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-800 text-sm mb-2">
            💡 <strong>為什麼要反思？</strong>3 個月後回頭看，你會驚訝自己進步了多少。
          </p>
          <p className="text-yellow-800 text-sm">
            📸 <strong>重要提醒：</strong>反思記錄存在瀏覽器，建議定期「下載記錄」或「截圖保存」，避免換電腦或清除瀏覽器時資料遺失。
          </p>
        </div>
      </div>
    </div>
  );
}
