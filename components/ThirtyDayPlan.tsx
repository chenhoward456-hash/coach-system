'use client';

import { useState, useEffect } from 'react';
import { getThirtyDayPlan, type WeekPlan, type WeekTask } from '@/data/thirtyDayPlans';

interface ThirtyDayPlanProps {
  level: 'beginner' | 'intermediate';
}

export default function ThirtyDayPlan({ level }: ThirtyDayPlanProps) {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const plan = getThirtyDayPlan(level);

  useEffect(() => {
    const saved = localStorage.getItem(`thirtyDayPlan_${level}`);
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, [level]);

  const toggleTask = (taskId: string) => {
    const newCompleted = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId]
    };
    setCompletedTasks(newCompleted);
    localStorage.setItem(`thirtyDayPlan_${level}`, JSON.stringify(newCompleted));
  };

  const getWeekProgress = (week: WeekPlan) => {
    const completed = week.tasks.filter(t => completedTasks[t.id]).length;
    const total = week.tasks.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const totalProgress = () => {
    const allTasks = plan.weeks.flatMap(w => w.tasks);
    const completed = allTasks.filter(t => completedTasks[t.id]).length;
    return { completed, total: allTasks.length, percentage: Math.round((completed / allTasks.length) * 100) };
  };

  const progress = totalProgress();

  return (
    <div className="space-y-6">
      {/* 計畫標題 */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
        <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3">
          {plan.title}
        </h3>
        <p className="text-gray-700 mb-4">{plan.description}</p>
        
        {/* 總進度 */}
        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-gray-900">總進度</span>
            <span className="font-bold text-primary text-xl">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-2">
            已完成 {progress.completed} / {progress.total} 項任務
          </div>
        </div>

        {/* 30天後的目標 */}
        <div className="bg-white rounded-xl p-4">
          <h4 className="font-bold text-gray-900 mb-2">🎯 30天後，你能做到：</h4>
          <ul className="space-y-1 text-gray-700">
            {plan.endGoal.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 週計畫 */}
      <div className="space-y-4">
        {plan.weeks.map((week) => {
          const weekProgress = getWeekProgress(week);
          const isExpanded = expandedWeek === week.week;

          return (
            <div
              key={week.week}
              className="bg-white rounded-xl shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.week)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                        第 {week.week} 週
                      </span>
                      {weekProgress.percentage === 100 && (
                        <span className="text-2xl">✅</span>
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{week.title}</h3>
                    <p className="text-gray-600 mb-3">{week.goal}</p>
                    
                    {/* 週進度條 */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            weekProgress.percentage === 100 ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{ width: `${weekProgress.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-600">
                        {weekProgress.completed}/{weekProgress.total}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl ml-4">
                    {isExpanded ? '▼' : '▶'}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 border-t-2 border-gray-100 animate-fade-in">
                  <div className="space-y-3">
                    {week.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          completedTasks[task.id]
                            ? 'bg-green-50 border-success'
                            : 'bg-gray-50 border-gray-200 hover:border-primary'
                        }`}
                      >
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={completedTasks[task.id] || false}
                            onChange={() => toggleTask(task.id)}
                            className="w-6 h-6 rounded text-success focus:ring-success mt-1 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className={`font-bold text-lg ${
                              completedTasks[task.id] ? 'text-success line-through' : 'text-gray-900'
                            }`}>
                              {task.task}
                            </div>
                            {task.description && (
                              <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 完成慶祝 */}
      {progress.percentage === 100 && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-8 text-center animate-fade-in">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="font-outfit text-3xl font-bold mb-2">恭喜完成 30 天計畫！</h3>
          <p className="text-xl mb-4">你已經建立了良好的習慣，準備好進入下一階段了！</p>
          <p className="text-lg opacity-90">
            {level === 'beginner' ? '現在可以進入中階計畫，或選擇專業發展方向' : '現在可以選擇四條專業路徑之一，繼續深化'}
          </p>
        </div>
      )}
    </div>
  );
}
