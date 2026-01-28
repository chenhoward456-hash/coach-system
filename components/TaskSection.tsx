'use client';

import { useEffect, useState } from 'react';
import { storage, TaskData } from '@/lib/localStorage';
import BackButton from '@/components/BackButton';
import Toast from '@/components/Toast';

const taskCategories = [
  {
    title: '📹 內容產出（每週至少1次）',
    icon: '📹',
    color: 'from-blue-500 to-blue-600',
    tasks: [
      { id: 'video', label: '拍攝訓練影片或教學短片' },
      { id: 'post', label: '發布健身知識貼文' },
      { id: 'story', label: '分享會員成功案例' },
    ],
  },
  {
    title: '💬 會員互動（每天都要做）',
    icon: '💬',
    color: 'from-green-500 to-green-600',
    tasks: [
      { id: 'followup', label: '課後關心訊息（至少3位會員）' },
      { id: 'progress', label: '記錄會員進步數據' },
      { id: 'birthday', label: '會員生日/重要日子問候' },
    ],
  },
  {
    title: '📚 持續學習（每週至少2次）',
    icon: '📚',
    color: 'from-purple-500 to-purple-600',
    tasks: [
      { id: 'study', label: '閱讀專業文章或觀看教學影片' },
      { id: 'practice', label: '練習新的訓練動作或教學技巧' },
      { id: 'share', label: '分享學習心得給團隊' },
    ],
  },
  {
    title: '🤝 團隊協作（每週至少1次）',
    icon: '🤝',
    color: 'from-orange-500 to-orange-600',
    tasks: [
      { id: 'meeting', label: '參加團隊會議並分享' },
      { id: 'help', label: '協助其他教練解決問題' },
      { id: 'feedback', label: '給予或接受教學回饋' },
    ],
  },
];

interface TaskSectionProps {
  onBack?: () => void;
}

export default function TaskSection({ onBack }: TaskSectionProps) {
  const [tasks, setTasks] = useState<TaskData>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const loadedTasks = storage.getTasks();
    setTasks(loadedTasks);
    setIsLoaded(true);
  }, []);

  const handleTaskToggle = (taskId: string) => {
    const newTasks = { ...tasks, [taskId]: !tasks[taskId] };
    setTasks(newTasks);
    storage.saveTasks(newTasks);
    setShowToast(true);
  };

  const handleResetTasks = () => {
    setTasks({});
    storage.saveTasks({});
    setShowResetConfirm(false);
    setShowToast(true);
  };

  const completedCount = Object.values(tasks).filter(Boolean).length;
  const totalCount = taskCategories.reduce((acc, cat) => acc + cat.tasks.length, 0);
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (!isLoaded) {
    return <div className="text-center py-8">載入中...</div>;
  }

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-outfit text-4xl md:text-5xl font-extrabold text-gray-900">
          每週任務清單
        </h2>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          🔄 重置本週
        </button>
      </div>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        這些是你每週必須完成的核心任務，直接影響你的續約率和專業成長
      </p>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border-l-4 border-primary shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
              本週完成度
            </h3>
            <p className="text-gray-700">
              已完成 <span className="font-bold text-primary text-2xl">{completedCount}</span> / {totalCount} 項任務
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-extrabold text-primary">{completionRate}%</div>
            <div className="text-sm text-gray-600 mt-1">
              {completionRate >= 80 ? '🎉 優秀！' : completionRate >= 60 ? '💪 加油！' : '⚠️ 需要努力'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {taskCategories.map((category) => (
          <div
            key={category.title}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center text-3xl shadow-lg`}>
                {category.icon}
              </div>
              <h3 className="font-outfit text-xl font-bold text-gray-900">
                {category.title}
              </h3>
            </div>

            <div className="space-y-3">
              {category.tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={tasks[task.id] || false}
                    onChange={() => handleTaskToggle(task.id)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-2"
                  />
                  <span className={`text-gray-700 group-hover:text-gray-900 transition-colors ${tasks[task.id] ? 'line-through opacity-60' : ''}`}>
                    {task.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 rounded-2xl p-6 border-l-4 border-warning">
        <h4 className="font-outfit text-xl font-bold text-gray-900 mb-3">
          ⚡ 重要提醒
        </h4>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-warning font-bold">•</span>
            <span>這些任務會自動保存，重新整理頁面後不會消失</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning font-bold">•</span>
            <span>每週一建議重置清單，重新開始</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning font-bold">•</span>
            <span>完成度低於 60% 表示你需要調整工作方式</span>
          </li>
        </ul>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
                確定要重置嗎？
              </h3>
              <p className="text-gray-600">
                這將清除所有已勾選的任務，此操作無法復原。
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleResetTasks}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
              >
                確定重置
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="已自動保存"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
