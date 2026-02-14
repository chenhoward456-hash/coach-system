'use client';

import { useState, useEffect } from 'react';
import DailyChecklist from './DailyChecklist';
import BackButton from './BackButton';

interface DailyChecklistPageProps {
  onBack?: () => void;
  onNavigate?: (section: string) => void;
}

const TOTAL_TASKS = 7;

function getDateStr(date: Date): string {
  return date.toLocaleDateString('zh-TW');
}

function getCompletedCount(dateStr: string): number {
  const saved = localStorage.getItem(`dailyChecklist_${dateStr}`);
  if (!saved) return 0;
  try {
    const arr = JSON.parse(saved);
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

export default function DailyChecklistPage({ onBack, onNavigate }: DailyChecklistPageProps) {
  const [streak, setStreak] = useState(0);
  const [weekStats, setWeekStats] = useState({ totalCompleted: 0, perfectDays: 0, avgCompletion: 0 });
  const [note, setNote] = useState('');
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const dateStr = getDateStr(today);
    setTodayDate(dateStr);

    // 載入今日筆記
    const savedNote = localStorage.getItem(`dailyNote_${dateStr}`);
    if (savedNote) setNote(savedNote);

    // 計算連續天數
    calculateStreak(today);

    // 計算本週統計
    calculateWeekStats(today);
  }, []);

  const calculateStreak = (today: Date) => {
    let count = 0;
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateStr(date);
      const completed = getCompletedCount(dateStr);
      if (completed > 0) {
        count++;
      } else {
        break;
      }
    }
    setStreak(count);
  };

  const calculateWeekStats = (today: Date) => {
    let totalCompleted = 0;
    let perfectDays = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getDateStr(date);
      const completed = getCompletedCount(dateStr);
      totalCompleted += completed;
      if (completed >= TOTAL_TASKS) perfectDays++;
    }
    const avgCompletion = Math.round((totalCompleted / (7 * TOTAL_TASKS)) * 100);
    setWeekStats({ totalCompleted, perfectDays, avgCompletion });
  };

  const saveNote = (value: string) => {
    setNote(value);
    if (todayDate) {
      localStorage.setItem(`dailyNote_${todayDate}`, value);
    }
  };

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            ✅ 今日行動清單
          </h1>
          <p className="text-xl text-gray-600">
            每天上班必做的 7 件事。不求完美，但求持續。
          </p>
        </div>

        {/* 連續天數 + 本週統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* 連續天數 */}
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">連續行動</div>
                <div className="text-4xl font-bold">{streak} 天</div>
              </div>
              <div className="text-5xl">🔥</div>
            </div>
            <p className="mt-2 text-sm opacity-90">
              {streak >= 30 ? '太厲害了！你是大家的榜樣！' :
               streak >= 7 ? '太棒了！你已經養成習慣了！' :
               streak > 0 ? '繼續保持，習慣正在養成中！' :
               '今天開始，第 1 天！'}
            </p>
          </div>

          {/* 本週完成 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">本週完成</div>
            <div className="text-3xl font-bold text-primary">{weekStats.totalCompleted}<span className="text-lg text-gray-500">/{7 * TOTAL_TASKS}</span></div>
            <div className="text-sm text-gray-600 mt-1">項任務</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${weekStats.avgCompletion}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">平均完成率 {weekStats.avgCompletion}%</div>
          </div>

          {/* 滿分天數 */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-gray-200">
            <div className="text-sm text-gray-600 mb-1">本週滿分天數</div>
            <div className="text-3xl font-bold text-yellow-500">{weekStats.perfectDays}<span className="text-lg text-gray-500">/7</span></div>
            <div className="text-sm text-gray-600 mt-1">7 項全部完成</div>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className={`h-3 flex-1 rounded-full ${i < weekStats.perfectDays ? 'bg-yellow-400' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* 每日清單元件 */}
        <DailyChecklist onNavigate={onNavigate} />

        {/* 今日筆記 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <label className="block font-bold text-lg text-gray-900 mb-3">
            📝 今日筆記（選填）
          </label>
          <textarea
            value={note}
            onChange={(e) => saveNote(e.target.value)}
            placeholder="今天有什麼想記錄的？成就感的事？遇到的挑戰？想法反思？"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            rows={3}
          />
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3">💡 使用技巧</h3>
          <ul className="space-y-2 text-blue-800">
            <li>• <strong>每天早上打開：</strong>看看今天要做什麼</li>
            <li>• <strong>做完就勾：</strong>給自己成就感</li>
            <li>• <strong>不用完美：</strong>7 項都做到就很棒了</li>
            <li>• <strong>持續最重要：</strong>每天做一點，比偶爾做很多更有效</li>
          </ul>
        </div>

        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
          <h3 className="font-bold text-green-900 mb-3">🎯 為什麼要做這 7 件事？</h3>
          <div className="space-y-3 text-green-800">
            <p><strong>行政、整潔、上課</strong> → 基本職責，做好了才是專業</p>
            <p><strong>曝光、客情</strong> → 經營自己，學生才會源源不絕</p>
            <p><strong>訓練、學習</strong> → 持續成長，才能帶學生成長</p>
          </div>
        </div>
      </div>
    </div>
  );
}
