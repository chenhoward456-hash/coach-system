'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string;
  estimatedTime: string;
}

interface DailyTasksProps {
  onNavigate?: (section: string) => void;
}

export default function DailyTasks({ onNavigate }: DailyTasksProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);

  // 所有可能的任務池
  const taskPool: Task[] = [
    {
      id: 'video-1',
      title: '拍一支 60 秒影片',
      description: '主題：深蹲常見錯誤 Top 3',
      icon: '🎬',
      action: 'videos',
      estimatedTime: '10 分鐘'
    },
    {
      id: 'video-2',
      title: '拍一支訓練日常',
      description: '記錄你今天的訓練過程',
      icon: '🎬',
      action: 'videos',
      estimatedTime: '5 分鐘'
    },
    {
      id: 'followup-1',
      title: '關心 3 位學員',
      description: '用訊息範本發送課後關心',
      icon: '💬',
      action: 'messages',
      estimatedTime: '5 分鐘'
    },
    {
      id: 'followup-2',
      title: '關心久未上課的學員',
      description: '找出超過 2 週未上課的學員並關心',
      icon: '💬',
      action: 'messages',
      estimatedTime: '10 分鐘'
    },
    {
      id: 'learning-1',
      title: '學習一個實戰框架',
      description: '看完「如何處理續約猶豫」',
      icon: '📚',
      action: 'frameworks',
      estimatedTime: '5 分鐘'
    },
    {
      id: 'learning-2',
      title: '看一個成長心法',
      description: '閱讀「迷惘時怎麼辦」',
      icon: '📚',
      action: 'mindset',
      estimatedTime: '5 分鐘'
    },
    {
      id: 'development-1',
      title: '準備轉介紹話術',
      description: '看完轉介紹範本，準備好自己的版本',
      icon: '🤝',
      action: 'messages',
      estimatedTime: '10 分鐘'
    },
    {
      id: 'renewal-1',
      title: '檢查續約名單',
      description: '找出課程剩下 3-5 堂的學員',
      icon: '📋',
      action: 'messages',
      estimatedTime: '5 分鐘'
    }
  ];

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyTasks_date');
    const savedTasks = localStorage.getItem('dailyTasks_tasks');
    const savedCompleted = localStorage.getItem('dailyTasks_completed');

    if (savedDate === today && savedTasks) {
      setTodayTasks(JSON.parse(savedTasks));
      if (savedCompleted) {
        setCompletedTasks(JSON.parse(savedCompleted));
      }
    } else {
      // 每天隨機選 3 個任務
      const shuffled = [...taskPool].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);
      setTodayTasks(selected);
      localStorage.setItem('dailyTasks_date', today);
      localStorage.setItem('dailyTasks_tasks', JSON.stringify(selected));
      localStorage.setItem('dailyTasks_completed', JSON.stringify([]));
      setCompletedTasks([]);
    }
  }, []);

  const toggleTask = (taskId: string) => {
    const newCompleted = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompleted);
    localStorage.setItem('dailyTasks_completed', JSON.stringify(newCompleted));
  };

  const allCompleted = todayTasks.length > 0 && completedTasks.length === todayTasks.length;
  const completionRate = todayTasks.length > 0 ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0;

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-outfit text-2xl font-bold text-gray-900">
            🎯 今日任務
          </h3>
          <div className="text-sm font-semibold text-gray-600">
            {completedTasks.length}/{todayTasks.length} 完成
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          每天只要完成這 3 件事，你就在進步
        </p>

        {/* 進度條 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">今日進度</span>
            <span className="text-sm font-bold text-primary">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* 任務列表 */}
        <div className="space-y-3">
          {todayTasks.map((task, index) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-primary'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleTask(task.id)}
                    className="w-6 h-6 mt-1 text-green-600 focus:ring-green-500 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{task.icon}</span>
                      <span className={`font-bold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {index + 1}. {task.title}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">⏱️ {task.estimatedTime}</span>
                      {!isCompleted && onNavigate && (
                        <button
                          onClick={() => onNavigate(task.action)}
                          className="text-xs font-semibold text-primary hover:text-blue-700 underline"
                        >
                          前往執行 →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 完成慶祝 */}
        {allCompleted && (
          <div className="mt-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl p-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎉</div>
              <div>
                <div className="font-bold text-lg">今日任務全部完成！</div>
                <div className="text-sm opacity-90">你太棒了！明天繼續加油！</div>
              </div>
            </div>
          </div>
        )}

        {/* 提示 */}
        {!allCompleted && completedTasks.length === 0 && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 text-sm">
              💡 <strong>小技巧：</strong>從最簡單的開始，完成一個就有成就感！
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
