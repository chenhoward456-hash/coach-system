'use client';

import { useState, useEffect } from 'react';
import BackButton from './BackButton';

interface GoalTrackerProps {
  onBack?: () => void;
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: '續約率' | '轉介紹' | '內容產出' | '訓練次數' | '其他';
}

export default function GoalTracker({ onBack }: GoalTrackerProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: 0,
    current: 0,
    unit: '',
    deadline: '',
    category: '內容產出' as Goal['category'],
  });

  useEffect(() => {
    const savedGoals = localStorage.getItem('coach-goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem('coach-goals', JSON.stringify(updatedGoals));
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      alert('請填寫完整資訊');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
    };

    saveGoals([...goals, goal]);
    setNewGoal({
      title: '',
      target: 0,
      current: 0,
      unit: '',
      deadline: '',
      category: '內容產出',
    });
    setShowAddGoal(false);
  };

  const updateProgress = (id: string, newCurrent: number) => {
    const updated = goals.map(g => 
      g.id === id ? { ...g, current: newCurrent } : g
    );
    saveGoals(updated);
  };

  const deleteGoal = (id: string) => {
    if (confirm('確定要刪除這個目標嗎？')) {
      saveGoals(goals.filter(g => g.id !== id));
    }
  };

  const getProgress = (goal: Goal) => {
    return Math.min(Math.round((goal.current / goal.target) * 100), 100);
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  const getCategoryColor = (category: Goal['category']) => {
    const colors = {
      續約率: 'bg-blue-100 text-blue-700',
      轉介紹: 'bg-green-100 text-green-700',
      內容產出: 'bg-purple-100 text-purple-700',
      訓練次數: 'bg-orange-100 text-orange-700',
      其他: 'bg-gray-100 text-gray-700',
    };
    return colors[category];
  };

  return (
    <div className="space-y-6">
      {onBack && <BackButton onBack={onBack} />}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-outfit text-3xl font-bold mb-2">🎯 我的目標</h2>
          <p className="text-gray-600">給自己設個目標，看著自己一步步達成</p>
        </div>
        <button
          onClick={() => setShowAddGoal(!showAddGoal)}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-xl transition-all hover:-translate-y-1"
        >
          ➕ 新增目標
        </button>
      </div>

      {/* 新增目標表單 */}
      {showAddGoal && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary">
          <h3 className="font-bold text-xl mb-4">新增目標</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">目標名稱</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="例如：這個月讀完一本書"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">類別</label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              >
                <option value="內容產出">內容產出</option>
                <option value="訓練次數">訓練次數</option>
                <option value="續約率">續約率</option>
                <option value="轉介紹">轉介紹</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">目標數值</label>
              <input
                type="number"
                value={newGoal.target || ''}
                onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                placeholder="例如：80"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">單位</label>
              <input
                type="text"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                placeholder="例如：%、支、位"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">目前進度</label>
              <input
                type="number"
                value={newGoal.current || ''}
                onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
                placeholder="例如：65"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">截止日期</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={addGoal}
              className="px-6 py-2 bg-success text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              ✓ 新增
            </button>
            <button
              onClick={() => setShowAddGoal(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg hover:shadow-lg transition-all"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 目標列表 */}
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgress(goal);
          const daysLeft = getDaysLeft(goal.deadline);
          const isUrgent = daysLeft <= 7 && progress < 80;
          
          return (
            <div
              key={goal.id}
              className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all hover:shadow-lg ${
                isUrgent ? 'border-danger' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(goal.category)}`}>
                      {goal.category}
                    </span>
                    {isUrgent && (
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700">
                        ⚠️ 緊急
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900">{goal.title}</h3>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-gray-400 hover:text-danger transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* 進度條 */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">進度</span>
                  <span className="font-bold text-primary">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(progress)} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* 數值顯示 */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {goal.current}
                    <span className="text-lg text-gray-500">/{goal.target}</span>
                    <span className="text-lg text-gray-500 ml-1">{goal.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    還需要 <strong>{goal.target - goal.current} {goal.unit}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${daysLeft > 0 ? 'text-primary' : 'text-danger'}`}>
                    {daysLeft > 0 ? daysLeft : 0}
                  </div>
                  <div className="text-sm text-gray-600">天後到期</div>
                </div>
              </div>

              {/* 更新進度 */}
              <div>
                <label className="block text-sm font-semibold mb-2">更新進度</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={goal.current}
                    onChange={(e) => updateProgress(goal.id, Number(e.target.value))}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={() => updateProgress(goal.id, goal.current + 1)}
                    className="px-4 py-2 bg-success text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    +1
                  </button>
                </div>
              </div>

              {/* 建議 */}
              {progress < 50 && daysLeft > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-warning">
                  <p className="text-sm text-gray-700">
                    <strong className="text-warning">💡 建議：</strong>
                    每天需要進步 <strong>{Math.ceil((goal.target - goal.current) / daysLeft)} {goal.unit}</strong> 才能達標
                  </p>
                </div>
              )}

              {progress >= 100 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-success">
                  <p className="text-sm text-success font-bold">
                    🎉 恭喜達成目標！
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-gray-700 text-lg font-semibold">還沒有設定目標</p>
          <p className="text-gray-500 mt-2 mb-6">目標由你自己決定，可以是任何你想達成的事</p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>例如：這個月讀完一本書、每週拍 2 支影片、學會一個新動作...</p>
          </div>
        </div>
      )}

      {/* 使用提示 */}
      <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary">
        <h3 className="font-bold text-lg mb-3">💡 小提醒</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• 不用設太多，1-3 個就夠了，專注比較有效</li>
          <li>• 目標是給自己的，不需要跟任何人比較</li>
          <li>• 偶爾回來更新進度，看到數字在跑會很有成就感</li>
          <li>• 達成了就慶祝一下，然後再挑戰新的！</li>
        </ul>
      </div>
    </div>
  );
}
