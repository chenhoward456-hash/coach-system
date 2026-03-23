'use client';

import { useState, useEffect } from 'react';

interface DailyChecklistProps {
  onNavigate?: (section: string) => void;
}

interface DailyTask {
  id: string;
  category: string;
  icon: string;
  task: string;
  description: string;
  link?: string;
  notionUrl?: string;
  notionLabel?: string;
}

const dailyTasks: DailyTask[] = [
  {
    id: 'admin',
    category: '行政',
    icon: '📋',
    task: '處理行政事務',
    description: '回覆訊息、確認明天課表、處理請假補課（10分鐘內處理完）',
  },
  {
    id: 'cleaning',
    category: '整潔',
    icon: '🧹',
    task: '維護環境整潔',
    description: '歸位器材、擦拭器械、整理訓練區（下班前做）',
  },
  {
    id: 'exposure',
    category: '曝光',
    icon: '📱',
    task: '發布內容',
    description: '至少發 1 則限動或貼文（訓練過程、知識分享、學員成果）',
    link: 'videos'
  },
  {
    id: 'training',
    category: '訓練',
    icon: '💪',
    task: '自我訓練',
    description: '至少 30 分鐘（你的狀態就是最好的廣告）',
  },
  {
    id: 'relationship',
    category: '客情 + BR',
    icon: '❤️',
    task: '關心學員 ＋ 找 BR 機會',
    description: '至少關心 3 位學員（課後問候、訓練提醒、生活關心）。今天有沒有學員破紀錄、心情特別好？那就是 BR 開口的時機。',
    link: 'messages',
    notionUrl: 'https://www.notion.so/32beef85c08f812b924dd94286da8895',
    notionLabel: '🍱 外食攻略',
  },
  {
    id: 'teaching',
    category: '上課',
    icon: '🎯',
    task: '專注教學',
    description: '每堂課全心投入、給予正向回饋。課後 30 秒記一筆：學員今天的重量、狀態、下次要注意的事（備忘錄或 LINE 自己都可以）。',
  },
  {
    id: 'learning',
    category: '學習',
    icon: '📚',
    task: '持續進修',
    description: '至少 15 分鐘（看書、看影片、學新知識）',
    link: 'resources',
    notionUrl: 'https://www.notion.so/32ceef85c08f8180acc8e1faf79f00f5',
    notionLabel: '📖 本週新知',
  },
];

export default function DailyChecklist({ onNavigate }: DailyChecklistProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [todayDate, setTodayDate] = useState<string>('');

  useEffect(() => {
    const today = new Date().toLocaleDateString('zh-TW');
    setTodayDate(today);
    
    // Load today's completed tasks
    const saved = localStorage.getItem(`dailyChecklist_${today}`);
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
    localStorage.setItem(`dailyChecklist_${todayDate}`, JSON.stringify([...newCompleted]));
  };

  const completedCount = completedTasks.size;
  const totalCount = dailyTasks.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-outfit text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">✅</span>
            今日行動清單
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {todayDate} · 完成 {completedCount}/{totalCount} 項
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{progress}%</div>
          <div className="text-xs text-gray-600">完成度</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Encouragement Message */}
      {progress === 100 ? (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 mb-6 text-center">
          <p className="text-lg font-bold">🎉 太棒了！今天的任務全部完成！</p>
          <p className="text-sm mt-1">你是最棒的教練！明天繼續加油！</p>
        </div>
      ) : progress >= 50 ? (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded">
          <p className="text-blue-800 font-semibold">💪 做得好！已經完成一半了，繼續加油！</p>
        </div>
      ) : (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-6 rounded">
          <p className="text-orange-800 font-semibold">🔥 開始行動吧！每完成一項，你就離目標更近一步</p>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {dailyTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl p-4 border-2 transition-all ${
              completedTasks.has(task.id)
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={completedTasks.has(task.id)}
                onChange={() => toggleTask(task.id)}
                className="mt-1 w-6 h-6 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/50 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{task.icon}</span>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {task.category}
                  </span>
                </div>
                <p className={`font-bold text-gray-900 ${completedTasks.has(task.id) ? 'line-through opacity-60' : ''}`}>
                  {task.task}
                </p>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                {task.link && onNavigate && (
                  <button
                    onClick={() => onNavigate(task.link!)}
                    className="text-primary hover:text-blue-700 text-sm font-semibold whitespace-nowrap"
                  >
                    前往 →
                  </button>
                )}
                {task.notionUrl && (
                  <a
                    href={task.notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-1 rounded-lg whitespace-nowrap transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {task.notionLabel} ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 bg-white rounded-xl p-4 border-2 border-gray-200">
        <p className="text-sm text-gray-700">
          <strong className="text-primary">💡 使用技巧：</strong>
          這些是每天上班的基本動作。不是每項都要做到完美，但每項都要做到。
          持續做，你就會看到成長。
        </p>
      </div>
    </div>
  );
}
