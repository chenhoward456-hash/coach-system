'use client';

import { useState, useEffect } from 'react';
import { storage, DiagnosisData } from '@/lib/localStorage';
import BackButton from '@/components/BackButton';
import ThirtyDayPlan from '@/components/ThirtyDayPlan';
import Toast from '@/components/Toast';

interface DiagnosisResult {
  type: string;
  title: string;
  description: string;
  solution: string;
  actionSteps: string[];
  activitiesCount: number;
  coachLevel?: 'beginner' | 'intermediate';
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
    
    // 判斷教練等級：根據活動數量和問題類型
    // 新標準：0-15位學生 = 新手，15+位學生 = 進階
    // 如果做的事少於2項，或是迷惘/不夠好/沒動力 -> 新手
    // 如果做的事>=2項，且問題是「沒結果」或「不知道為什麼」 -> 進階
    const isBeginnerIssue = ['lost', 'inadequate', 'noMotivation'].includes(mainIssue);
    const coachLevel: 'beginner' | 'intermediate' = 
      (activitiesCount < 2 || isBeginnerIssue) ? 'beginner' : 'intermediate';

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
          coachLevel,
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
          coachLevel,
        };
        break;

      case 'confused':
        diagnosisResult = {
          type: '迷惘 3',
          title: '「我不知道為什麼要做這些事」',
          description: '你在做事，但不理解意義。拍影片覺得沒用、課後關心覺得很假、記錄進步覺得麻煩。因為你不知道「為什麼」。',
          solution: `這些事的意義：
• 拍影片 = 建立專業形象 = 學生信任你 = 續約率提高
• 課後關心 = 學生感受到被在乎 = 黏著度提高 = 轉介紹增加
• 記錄進步 = 學生看到成果 = 成就感提升 = 續約意願提高

看到了嗎？每件事都直接影響你的收入。`,
          actionSteps: [
            '選一件你覺得「沒用」的事，連續做7天',
            '7天後，觀察學生的反應有什麼不同',
            '你會發現：原來真的有用',
            '點擊「成長心法」章節，看完整的迷惘3解方',
          ],
          activitiesCount,
          coachLevel,
        };
        break;

      case 'noResults':
        diagnosisResult = {
          type: '迷惘 4',
          title: '「我做了很多，但沒看到結果」',
          description: '你很努力，但學生數沒增加、續約率沒提高、收入沒成長。你開始懷疑：是不是我不適合當教練？',
          solution: `問題可能不是「做不夠」，而是「做錯方向」。

檢查這3件事：
1. 你的影片有人看嗎？（如果沒人看，代表內容不對）
2. 你的學生有進步嗎？（如果沒進步，代表訓練不對）
3. 你有主動開發嗎？（如果只等公司給，當然不會成長）`,
          actionSteps: [
            '這週找 Howard 做一次「數據健檢」',
            '找出你最弱的一環，集中火力改善',
            '設定一個「30天小目標」，專注達成',
            '點擊「成長心法」章節，看完整的迷惘4解方',
          ],
          activitiesCount,
          coachLevel,
        };
        break;

      case 'noMotivation':
        diagnosisResult = {
          type: '迷惘 5',
          title: '「我沒有動力了」',
          description: '你累了。一開始很有熱情，但現在每天都在重複一樣的事，感覺不到成長，也看不到未來。',
          solution: `這是正常的。每個人都會經歷這個階段。

但你要知道：動力不是「等」來的，是「做」出來的。

小勝利 → 成就感 → 動力 → 更大的勝利`,
          actionSteps: [
            '設定一個「這週一定能達成」的小目標',
            '達成後，給自己一個獎勵',
            '找回「小勝利」的感覺',
            '點擊「成長心法」章節，看完整的迷惘5解方',
          ],
          activitiesCount,
          coachLevel,
        };
        break;

      default:
        diagnosisResult = {
          type: '狀態良好',
          title: '你的狀態不錯！',
          description: '看起來你沒有明顯的問題，只是想測試一下系統。很好！保持這個狀態。',
          solution: '繼續保持現在的習慣，定期檢視自己的進度。',
          actionSteps: [
            '每週檢視一次「每週清單」',
            '每月做一次「自我評分」',
            '持續學習，不要停下來',
          ],
          activitiesCount,
          coachLevel,
        };
    }

    setResult(diagnosisResult);

    const diagnosisData: DiagnosisData = {
      mainIssue,
      activities,
      timeCommitment,
      result: diagnosisResult.type,
      timestamp: new Date().toISOString(),
    };
    storage.saveDiagnosis(diagnosisData);
    setShowToast(true);

    setTimeout(() => {
      document.getElementById('diagnosis-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
              3. 你每週願意投入多少時間？
            </h3>
            <div className="space-y-3">
              {[
                { value: 'low', label: '< 5 小時（我很忙）' },
                { value: 'medium', label: '5-10 小時（正常範圍）' },
                { value: 'high', label: '> 10 小時（我全力以赴）' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-warning has-[:checked]:bg-yellow-50"
                >
                  <input
                    type="radio"
                    name="timeCommitment"
                    value={option.value}
                    checked={timeCommitment === option.value}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                    className="w-5 h-5 text-warning focus:ring-warning"
                  />
                  <span className="text-gray-700 font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={diagnose}
            className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg"
          >
            🔍 開始診斷
          </button>
        </div>
      </div>

      {result && (
        <div id="diagnosis-result" className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200 mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl">🎯</div>
            <div>
              <div className="text-sm font-semibold text-purple-600 mb-1">{result.type}</div>
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
            <div className="bg-red-50 rounded-xl p-6 border-l-4 border-danger mb-6">
              <h4 className="font-bold text-xl mb-3">⚠️ 額外發現</h4>
              <p className="text-gray-700">
                你目前只在做 {result.activitiesCount} 項活動。4大領先指標都要做，才能提高續約率！
              </p>
              <p className="text-gray-700 mt-2">
                <strong>建議：</strong>看下面的 30 天計畫，跟著做就對了。
              </p>
            </div>
          )}

          <button
            onClick={copyDiagnosis}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-lg mb-8"
          >
            📋 一鍵複製診斷報告
          </button>

          {/* 30 天計畫 */}
          {result.coachLevel && (
            <div className="mt-8">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-6 mb-6">
                <h3 className="font-outfit text-2xl font-bold mb-2">
                  🎯 根據你的狀況，這是你的 30 天行動計畫
                </h3>
                <p className="text-lg opacity-90">
                  {result.coachLevel === 'beginner' 
                    ? '你目前是新手階段，跟著這個計畫走，30天後你會有明顯進步！' 
                    : '你已經有基礎了，這個計畫會幫你建立完整系統！'}
                </p>
              </div>
              <ThirtyDayPlan level={result.coachLevel} />
            </div>
          )}
        </div>
      )}

      {showToast && (
        <Toast
          message="診斷已保存"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
