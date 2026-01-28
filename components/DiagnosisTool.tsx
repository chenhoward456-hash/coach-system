'use client';

import { useState, useEffect } from 'react';
import { storage, DiagnosisData } from '@/lib/localStorage';
import BackButton from '@/components/BackButton';
import Toast from '@/components/Toast';

interface DiagnosisResult {
  type: string;
  title: string;
  description: string;
  solution: string;
  actionSteps: string[];
  activitiesCount: number;
}

interface DiagnosisToolProps {
  onBack?: () => void;
}

export default function DiagnosisTool({ onBack }: DiagnosisToolProps) {
  const [mainIssue, setMainIssue] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState('');
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedDiagnosis = storage.getDiagnosis();
    if (savedDiagnosis) {
      setMainIssue(savedDiagnosis.mainIssue);
      setActivities(savedDiagnosis.activities);
      setTimeCommitment(savedDiagnosis.timeCommitment);
    }
    setIsLoaded(true);
  }, []);

  const handleActivityToggle = (activity: string) => {
    setActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const diagnose = () => {
    if (!mainIssue) {
      alert('請至少回答第一個問題！');
      return;
    }

    const activitiesCount = activities.length;
    let diagnosisResult: DiagnosisResult;

    switch (mainIssue) {
      case 'lost':
        diagnosisResult = {
          type: '迷惘 1',
          title: '「我不知道自己要往哪裡走」',
          description: '你目前處於方向迷失的狀態。你每天在做事，但不知道為什麼做，也不知道這些事會帶你去哪裡。',
          solution: `先問自己3個問題：
1. 我為什麼當教練？（不要說「喜歡運動」，要更深入）
2. 我想成為什麼樣的教練？（技術流？溝通流？網紅流？）
3. 3年後，我想過什麼樣的生活？（具體一點）`,
          actionSteps: [
            '今晚拿出紙筆，認真回答上面3個問題（30分鐘）',
            '這週找 Howard 聊聊你的答案',
            '根據答案，設定你的6個月目標',
            '點擊「成長心法」章節，看完整的迷惘1解方',
          ],
          activitiesCount,
        };
        break;

      case 'inadequate':
        diagnosisResult = {
          type: '迷惘 2',
          title: '「我覺得自己不夠好」',
          description: '你正在經歷冒牌者症候群。你看到別人都很厲害，覺得自己什麼都不是，所以不敢開始、一直拖延。',
          solution: `真相炸彈：你永遠不會「準備好」。

Howard 第一支影片也拍得很爛。差別在於他拍了，然後越來越好。

Done is better than perfect.`,
          actionSteps: [
            '今天就拍一支影片，不管好不好（10分鐘）',
            '找一個「比你資深3個月」的前輩，問他怎麼開始的',
            '每週只改善1件事，不要一次改10件',
            '點擊「成長心法」章節，看完整的迷惘2解方',
          ],
          activitiesCount,
        };
        break;

      case 'confused':
        diagnosisResult = {
          type: '迷惘 3',
          title: '「我不知道為什麼要做這些事」',
          description: '你在做事，但不理解意義。拍影片覺得沒用、課後關心覺得很假、記錄進步覺得麻煩。因為你不知道「為什麼」。',
          solution: `拍影片 = 投資未來的自己（專業形象、個人品牌、持續學習）
課後關心 = 建立信任（續約靠關係不是技術）
記錄進步 = 做對的事（專業和隨便的差別）

你不是在「完成 KPI」，你是在「投資未來」。`,
          actionSteps: [
            '每次做一件事之前，先問「這對我的未來有什麼幫助？」',
            '如果答不出來，來問 Howard',
            '點擊「成長心法」章節，看完整的迷惘3解方',
            '重新思考你做這些事的意義',
          ],
          activitiesCount,
        };
        break;

      case 'noResults':
        diagnosisResult = {
          type: '迷惘 4',
          title: '「我做了很多，但沒看到結果」',
          description: `你已經努力了${activitiesCount > 0 ? activitiesCount + '項活動' : '一段時間'}，但續約率還是低、會員還是流失。你開始懷疑「是不是我不適合」。`,
          solution: `成長不是線性的，是指數型的。

前3個月看起來沒用，但其實是在「累積」。第4-6個月會突然爆發，因為「信任到了臨界點」。

Howard 的HTR：前6個月只有3個客戶，第7個月來了15個。

堅持，就是在等那個臨界點。`,
          actionSteps: [
            '給自己至少6個月，不要1-2個月沒效果就放棄',
            '記錄過程，每週寫下你做了什麼',
            '慶祝小進步：續約率從18%→20%也是進步！',
            '點擊「成長心法」章節，看完整的迷惘4解方',
          ],
          activitiesCount,
        };
        break;

      case 'noMotivation':
        diagnosisResult = {
          type: '迷惘 5',
          title: '「我沒有動力了」',
          description: '你覺得無聊、不想做事、開始擺爛。這通常是因為：忘記為什麼開始、沒看到進步、一直在舒適圈、或孤軍奮戰。',
          solution: `可能的原因：
• 忘記為什麼開始 → 重新思考你的北極星
• 沒看到進步 → 做成長紀錄（3個月前 vs 現在）
• 一直在舒適圈 → 給自己一個挑戰
• 孤軍奮戰 → 找同行夥伴一起努力

如果真的累了，休息1週也沒關係。但要設定「回來的日期」。`,
          actionSteps: [
            '誠實面對：我為什麼沒動力？（寫下來）',
            '根據原因，選擇對應的解方',
            '找一個人聊聊（Howard、前輩、同事）',
            '點擊「成長心法」章節，看完整的迷惘5解方',
          ],
          activitiesCount,
        };
        break;

      case 'ok':
        diagnosisResult = {
          type: '狀態良好',
          title: '「你的狀態不錯！」',
          description: '看起來你目前沒有太大的問題，只是想測試這個工具。這很好！代表你有自我覺察的能力。',
          solution: `你目前正在做的${activitiesCount}項活動很棒！繼續保持！

即使狀態好，也要記得：
• 持續自我檢視，不要鬆懈
• 幫助狀態不好的同事
• 設定更高的目標，挑戰自己`,
          actionSteps: [
            '檢查「每週任務」，確保自己都有做到',
            '設定一個3個月的挑戰目標',
            '分享你的經驗給其他教練',
            '繼續保持，你做得很好！',
          ],
          activitiesCount,
        };
        break;

      default:
        return;
    }

    setResult(diagnosisResult);

    const diagnosisData: DiagnosisData = {
      mainIssue,
      activities,
      timeCommitment,
      result: JSON.stringify(diagnosisResult),
      timestamp: new Date().toISOString(),
    };
    storage.saveDiagnosis(diagnosisData);
    setShowToast(true);
  };

  const copyDiagnosis = () => {
    if (!result) return;

    const text = `
🔍 教練狀態診斷報告
==================
診斷類型：${result.type}
${result.title}

📋 診斷結果：
${result.description}

💊 解方：
${result.solution}

📝 立刻行動：
${result.actionSteps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

${result.activitiesCount < 2 ? `⚠️ 額外發現：
你目前只在做 ${result.activitiesCount} 項活動。4大領先指標都要做，才能提高續約率！
建議：去「每週清單」看看還有哪些事情要做。` : ''}

生成時間：${new Date().toLocaleString('zh-TW')}
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      alert('✅ 診斷報告已複製到剪貼簿！');
    });
  };

  if (!isLoaded) {
    return <div className="text-center py-8">載入中...</div>;
  }

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <h2 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        狀態診斷工具
      </h2>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        誠實回答以下問題，系統會幫你診斷目前的狀態並給出解方
      </p>

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">
              1. 你目前最大的困擾是什麼？
            </h3>
            <div className="space-y-3">
              {[
                { value: 'lost', label: '我不知道自己要往哪裡走' },
                { value: 'inadequate', label: '我覺得自己不夠好' },
                { value: 'confused', label: '我不知道為什麼要做這些事' },
                { value: 'noResults', label: '我做了很多，但沒看到結果' },
                { value: 'noMotivation', label: '我沒有動力了' },
                { value: 'ok', label: '我沒什麼問題，只是想測試' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-primary has-[:checked]:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="mainIssue"
                    value={option.value}
                    checked={mainIssue === option.value}
                    onChange={(e) => setMainIssue(e.target.value)}
                    className="w-5 h-5 text-primary focus:ring-primary"
                  />
                  <span className="text-gray-700 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">
              2. 你目前有在做哪些事？（可複選）
            </h3>
            <div className="space-y-3">
              {[
                { value: 'video', label: '📹 拍影片/發貼文' },
                { value: 'followup', label: '💬 課後關心會員' },
                { value: 'study', label: '📚 持續學習新知識' },
                { value: 'teamwork', label: '🤝 參與團隊活動' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-green-500 has-[:checked]:bg-green-50"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={activities.includes(option.value)}
                    onChange={() => handleActivityToggle(option.value)}
                    className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4 text-gray-900">
              3. 你每週願意投入多少時間在「成長」上？
            </h3>
            <div className="space-y-3">
              {[
                { value: 'none', label: '我沒時間（<1小時）' },
                { value: 'little', label: '一點點（1-3小時）' },
                { value: 'moderate', label: '還可以（3-5小時）' },
                { value: 'much', label: '很多（5小時以上）' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50"
                >
                  <input
                    type="radio"
                    name="timeCommitment"
                    value={option.value}
                    checked={timeCommitment === option.value}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-700 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={diagnose}
          className="w-full mt-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
        >
          🔍 開始診斷
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-500/20 animate-fade-in">
          <div className="text-center mb-6">
            <div className="text-5xl font-extrabold text-warning mb-2">
              {result.type}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {result.title}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-warning mb-6">
            <h4 className="font-bold text-xl mb-3">🔍 診斷結果</h4>
            <p className="text-gray-700 leading-relaxed">{result.description}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-l-4 border-success mb-6">
            <h4 className="font-bold text-xl mb-3">💊 解方</h4>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.solution}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary mb-6">
            <h4 className="font-bold text-xl mb-3">📝 立刻行動</h4>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              {result.actionSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          {result.activitiesCount < 2 && (
            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-warning mb-6">
              <h4 className="font-bold text-xl mb-3">⚠️ 額外發現</h4>
              <p className="text-gray-700">
                你目前只在做 {result.activitiesCount} 項活動。4大領先指標都要做，才能提高續約率！
              </p>
              <p className="text-gray-700 mt-2">
                <strong>建議：</strong>去「每週清單」看看還有哪些事情要做。
              </p>
            </div>
          )}

          <button
            onClick={copyDiagnosis}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            📋 一鍵複製診斷報告
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="診斷已保存"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
