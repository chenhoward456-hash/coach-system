'use client';

import { useState, useEffect } from 'react';
import { storage, ScoreData } from '@/lib/localStorage';
import BackButton from '@/components/BackButton';
import Toast from '@/components/Toast';

interface ScoreCalculatorProps {
  onBack?: () => void;
}

export default function ScoreCalculator({ onBack }: ScoreCalculatorProps) {
  const [scores, setScores] = useState({ score1: 0, score2: 0, score3: 0, score4: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedScores = storage.getScores();
    if (savedScores) {
      setScores({
        score1: savedScores.score1,
        score2: savedScores.score2,
        score3: savedScores.score3,
        score4: savedScores.score4,
      });
    }
    setIsLoaded(true);
  }, []);

  const handleScoreChange = (field: keyof typeof scores, value: string) => {
    const numValue = Math.min(25, Math.max(0, parseInt(value) || 0));
    setScores(prev => ({ ...prev, [field]: numValue }));
  };

  const calculateScore = () => {
    const { score1, score2, score3, score4 } = scores;
    const totalScore = score1 + score2 + score3 + score4;

    const scoreData: ScoreData = {
      ...scores,
      timestamp: new Date().toISOString(),
    };
    storage.saveScores(scoreData);
    setShowToast(true);

    let status = '';
    let statusColor = '';
    let retentionRate = '';
    let encouragementMsg = '';
    let action = '';

    if (totalScore >= 90) {
      status = '🏆 頂尖教練';
      statusColor = 'text-green-600';
      retentionRate = '85%+';
      encouragementMsg = '你已經是館內的標竿！';
      action = '繼續保持，並開始指導其他教練成長';
    } else if (totalScore >= 80) {
      status = '💪 優秀教練';
      statusColor = 'text-blue-600';
      retentionRate = '70-85%';
      encouragementMsg = '你做得很好！';
      action = '專注在最弱的1項，衝刺到90+';
    } else if (totalScore >= 70) {
      status = '📈 成長中';
      statusColor = 'text-yellow-600';
      retentionRate = '55-70%';
      encouragementMsg = '你在正確的路上！';
      action = '找出最弱的2項，每週改善一點點';
    } else if (totalScore >= 60) {
      status = '⚠️ 需要努力';
      statusColor = 'text-orange-600';
      retentionRate = '40-55%';
      encouragementMsg = '現在開始改變還不晚！';
      action = '立刻找 Howard 討論，制定改善計畫';
    } else {
      status = '🚨 危險區';
      statusColor = 'text-red-600';
      retentionRate = '<40%';
      encouragementMsg = '需要立即行動！';
      action = '今天就找 Howard 一對一深談';
    }

    const scoreItems = [
      { name: '📹 內容產出', value: score1, max: 25 },
      { name: '💬 會員互動', value: score2, max: 25 },
      { name: '📚 持續學習', value: score3, max: 25 },
      { name: '🤝 團隊協作', value: score4, max: 25 },
    ];

    const weakAreas = scoreItems.filter(s => s.value < s.max * 0.8).sort((a, b) => a.value - b.value);

    setResult(JSON.stringify({
      totalScore,
      status,
      statusColor,
      retentionRate,
      encouragementMsg,
      action,
      score1,
      score2,
      score3,
      score4,
      weakAreas,
    }));
  };

  const copyResult = () => {
    if (!result) return;
    const data = JSON.parse(result);
    const text = `
📊 教練自我評分報告
==================
總分：${data.totalScore}/100
狀態：${data.status}
預測續約率：${data.retentionRate}

📋 各項得分：
📹 內容產出：${data.score1}/25
💬 會員互動：${data.score2}/25
📚 持續學習：${data.score3}/25
🤝 團隊協作：${data.score4}/25

💡 ${data.encouragementMsg}
建議行動：${data.action}

${data.weakAreas.length > 0 ? `⚠️ 需要加強的地方：
${data.weakAreas.map((area: any) => `• ${area.name}：${area.value}/25 分（需要提升到 ${Math.ceil(area.max * 0.8)}+ 分）`).join('\n')}` : ''}

生成時間：${new Date().toLocaleString('zh-TW')}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      alert('✅ 報告已複製到剪貼簿！');
    });
  };

  if (!isLoaded) {
    return <div className="text-center py-8">載入中...</div>;
  }

  const resultData = result ? JSON.parse(result) : null;

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <h2 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        自我評分工具
      </h2>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        誠實評估自己的表現，系統會自動計算你的續約率預測
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
        <div className="space-y-6">
          {[
            { id: 'score1', label: '📹 內容產出', desc: '拍影片、發貼文、分享案例' },
            { id: 'score2', label: '💬 會員互動', desc: '課後關心、記錄進步、生日問候' },
            { id: 'score3', label: '📚 持續學習', desc: '閱讀文章、練習動作、分享心得' },
            { id: 'score4', label: '🤝 團隊協作', desc: '參加會議、協助同事、給予回饋' },
          ].map((item) => (
            <div key={item.id} className="border-b border-gray-200 pb-6 last:border-0">
              <label className="block mb-3">
                <div className="font-bold text-lg text-gray-900 mb-1">{item.label}</div>
                <div className="text-sm text-gray-600 mb-3">{item.desc}</div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={scores[item.id as keyof typeof scores]}
                    onChange={(e) => handleScoreChange(item.id as keyof typeof scores, e.target.value)}
                    className="w-24 px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-xl font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <span className="text-gray-500 font-medium">/ 25 分</span>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={scores[item.id as keyof typeof scores]}
                    onChange={(e) => handleScoreChange(item.id as keyof typeof scores, e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={calculateScore}
          className="w-full mt-8 bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
        >
          🎯 計算我的分數
        </button>
      </div>

      {resultData && (
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-primary/20 animate-fade-in">
          <div className="text-center mb-6">
            <div className={`text-6xl font-extrabold mb-2 ${resultData.statusColor}`}>
              {resultData.totalScore}/100
            </div>
            <div className={`text-2xl font-bold mb-2 ${resultData.statusColor}`}>
              {resultData.status}
            </div>
            <div className="text-gray-600">預測續約率：{resultData.retentionRate}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">📹 內容產出</div>
              <div className="text-2xl font-bold text-blue-600">{resultData.score1}/25</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">💬 會員互動</div>
              <div className="text-2xl font-bold text-green-600">{resultData.score2}/25</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">📚 持續學習</div>
              <div className="text-2xl font-bold text-purple-600">{resultData.score3}/25</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">🤝 團隊協作</div>
              <div className="text-2xl font-bold text-orange-600">{resultData.score4}/25</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary mb-6">
            <h4 className="font-bold text-xl mb-2">💡 {resultData.encouragementMsg}</h4>
            <p className="text-gray-700">
              <strong>建議行動：</strong>{resultData.action}
            </p>
          </div>

          {resultData.weakAreas.length > 0 && (
            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-warning mb-6">
              <h4 className="font-bold text-xl mb-3">⚠️ 需要加強的地方</h4>
              <ul className="space-y-2">
                {resultData.weakAreas.map((area: any, idx: number) => (
                  <li key={idx} className="text-gray-700">
                    <strong>{area.name}：</strong>{area.value}/25 分
                    （需要提升到 {Math.ceil(area.max * 0.8)}+ 分）
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-green-50 rounded-xl p-6 border-l-4 border-success">
            <h4 className="font-bold text-xl mb-3">🎯 下一步</h4>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>點擊下方按鈕複製報告</li>
              <li>每週評分一次，追蹤進步</li>
              <li>如果分數 &lt;60，立刻找 Howard 討論</li>
              <li>專注改善最弱的1-2項，不要一次改太多</li>
            </ol>
          </div>

          <button
            onClick={copyResult}
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            📋 一鍵複製報告
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="評分已保存"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
