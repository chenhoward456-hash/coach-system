'use client';

import { useState, useEffect } from 'react';

interface JournalEntry {
  date: string;
  actions: {
    video: boolean;
    followup: number;
    learning: boolean;
    development: boolean;
  };
  note?: string;
}

interface CoachJournalProps {
  onBack?: () => void;
}

export default function CoachJournal({ onBack }: CoachJournalProps) {
  const [todayEntry, setTodayEntry] = useState<JournalEntry>({
    date: new Date().toDateString(),
    actions: {
      video: false,
      followup: 0,
      learning: false,
      development: false,
    }
  });
  const [streak, setStreak] = useState(0);
  const [weekStats, setWeekStats] = useState({ videos: 0, followups: 0, learnings: 0 });
  const [note, setNote] = useState('');

  useEffect(() => {
    const today = new Date().toDateString();
    const savedEntry = localStorage.getItem(`journal_${today}`);
    
    if (savedEntry) {
      const entry = JSON.parse(savedEntry);
      setTodayEntry(entry);
      setNote(entry.note || '');
    }

    // 計算連續天數
    calculateStreak();
    
    // 計算本週統計
    calculateWeekStats();
  }, []);

  const calculateStreak = () => {
    let count = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const entry = localStorage.getItem(`journal_${dateStr}`);
      
      if (entry) {
        const data = JSON.parse(entry);
        const hasAction = data.actions.video || data.actions.followup > 0 || 
                         data.actions.learning || data.actions.development;
        if (hasAction) {
          count++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    
    setStreak(count);
  };

  const calculateWeekStats = () => {
    let videos = 0, followups = 0, learnings = 0;
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const entry = localStorage.getItem(`journal_${dateStr}`);
      
      if (entry) {
        const data = JSON.parse(entry);
        if (data.actions.video) videos++;
        followups += data.actions.followup || 0;
        if (data.actions.learning) learnings++;
      }
    }
    
    setWeekStats({ videos, followups, learnings });
  };

  const updateAction = (action: keyof JournalEntry['actions'], value: boolean | number) => {
    const updated = {
      ...todayEntry,
      actions: {
        ...todayEntry.actions,
        [action]: value
      }
    };
    setTodayEntry(updated);
    saveEntry(updated);
    calculateStreak();
    calculateWeekStats();
  };

  const saveNote = () => {
    const updated = { ...todayEntry, note };
    setTodayEntry(updated);
    saveEntry(updated);
  };

  const saveEntry = (entry: JournalEntry) => {
    localStorage.setItem(`journal_${entry.date}`, JSON.stringify(entry));
  };

  const hasAnyAction = todayEntry.actions.video || todayEntry.actions.followup > 0 || 
                       todayEntry.actions.learning || todayEntry.actions.development;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h2 className="font-outfit text-4xl font-extrabold mb-4 text-gray-900">
        📔 教練日記
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        記錄每天的行動，看見自己的成長
      </p>

      {/* 連續天數 */}
      {streak > 0 && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">連續行動</div>
              <div className="text-5xl font-bold">{streak} 天</div>
            </div>
            <div className="text-6xl">🔥</div>
          </div>
          <p className="mt-3 text-sm opacity-90">
            {streak >= 7 ? '太棒了！你已經養成習慣了！' : '繼續保持，習慣正在養成中！'}
          </p>
        </div>
      )}

      {/* 本週統計 */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 mb-6">
        <h3 className="font-bold text-xl mb-4">📊 本週成果</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{weekStats.videos}</div>
            <div className="text-sm text-gray-600 mt-1">支影片</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{weekStats.followups}</div>
            <div className="text-sm text-gray-600 mt-1">次關心</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{weekStats.learnings}</div>
            <div className="text-sm text-gray-600 mt-1">次學習</div>
          </div>
        </div>
      </div>

      {/* 今日行動 */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 mb-6">
        <h3 className="font-bold text-xl mb-4">✅ 今天你做了什麼？</h3>
        
        <div className="space-y-4">
          {/* 拍影片 */}
          <label className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
            <input
              type="checkbox"
              checked={todayEntry.actions.video}
              onChange={(e) => updateAction('video', e.target.checked)}
              className="w-6 h-6 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">📹 拍了一支影片</div>
              <div className="text-sm text-gray-600">任何長度都算，重要的是開始</div>
            </div>
          </label>

          {/* 關心學員 */}
          <div className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50">
            <div className="font-semibold text-gray-900 mb-3">💬 關心了幾位學員？</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateAction('followup', Math.max(0, todayEntry.actions.followup - 1))}
                className="w-10 h-10 bg-gray-300 hover:bg-gray-400 rounded-lg font-bold text-xl"
              >
                -
              </button>
              <div className="text-3xl font-bold text-blue-600 min-w-[60px] text-center">
                {todayEntry.actions.followup}
              </div>
              <button
                onClick={() => updateAction('followup', todayEntry.actions.followup + 1)}
                className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-xl"
              >
                +
              </button>
              <div className="text-sm text-gray-600">位學員</div>
            </div>
          </div>

          {/* 學習 */}
          <label className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
            <input
              type="checkbox"
              checked={todayEntry.actions.learning}
              onChange={(e) => updateAction('learning', e.target.checked)}
              className="w-6 h-6 text-green-600 focus:ring-green-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">📚 學了新知識</div>
              <div className="text-sm text-gray-600">看文章、影片、或實戰框架</div>
            </div>
          </label>

          {/* 開發 */}
          <label className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
            <input
              type="checkbox"
              checked={todayEntry.actions.development}
              onChange={(e) => updateAction('development', e.target.checked)}
              className="w-6 h-6 text-orange-600 focus:ring-orange-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">🤝 開發新學員</div>
              <div className="text-sm text-gray-600">聊天、體驗課、或轉介紹</div>
            </div>
          </label>
        </div>

        {/* 今日筆記 */}
        <div className="mt-6">
          <label className="block font-semibold text-gray-900 mb-2">
            📝 今日筆記（選填）
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={saveNote}
            placeholder="今天有什麼想記錄的？成就感的事？遇到的挑戰？"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* 完成慶祝 */}
      {hasAnyAction && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🎉</div>
            <div>
              <div className="font-bold text-xl mb-1">太棒了！</div>
              <div className="text-lg opacity-90">
                你今天有行動，這就是進步！
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 提示 */}
      {!hasAnyAction && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-800">
            💡 <strong>提示：</strong>不用完美，做一件事就夠了。今天拍一支 60 秒影片？或關心 3 位學員？
          </p>
        </div>
      )}
    </div>
  );
}
