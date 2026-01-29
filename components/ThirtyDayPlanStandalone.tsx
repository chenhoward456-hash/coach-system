'use client';

import { useState, useEffect } from 'react';
import { getThirtyDayPlan, type ThirtyDayPlan } from '@/data/thirtyDayPlans';
import BackButton from './BackButton';

interface ThirtyDayPlanStandaloneProps {
  level: 'beginner' | 'intermediate';
  onBack?: () => void;
}

export default function ThirtyDayPlanStandalone({ level, onBack }: ThirtyDayPlanStandaloneProps) {
  const plan = getThirtyDayPlan(level);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Load completed tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`thirtyDayPlan_${level}_completed`);
    if (saved) {
      setCompletedTasks(new Set(JSON.parse(saved)));
    }
  }, [level]);

  // Save completed tasks to localStorage
  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
    localStorage.setItem(`thirtyDayPlan_${level}_completed`, JSON.stringify([...newCompleted]));
  };

  // Calculate current week based on completed tasks
  const getCurrentWeek = () => {
    for (const week of plan.weeks) {
      const allTasksCompleted = week.tasks.every(task => completedTasks.has(task.id));
      if (!allTasksCompleted) {
        return week;
      }
    }
    return plan.weeks[0]; // If all completed, return first week
  };

  const currentWeek = getCurrentWeek();

  // Calculate progress
  const totalTasks = plan.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
  const completedCount = completedTasks.size;
  const progress = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-outfit text-4xl font-bold text-gray-900 mb-4">
            {plan.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {plan.description}
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">整體進度</span>
              <span className="text-sm font-semibold text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              已完成 {completedCount} / {totalTasks} 項任務
            </p>
          </div>
        </div>

        {/* 鼓勵文案 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-5 text-center">
          <p className="text-lg font-semibold">
            💪 這不是考核，而是幫你快速上手的捷徑
          </p>
          <p className="text-sm mt-2 opacity-90">
            迷惘時，跟著做就好。每完成一項，你就離目標更近一步。
          </p>
        </div>

        {/* 本週重點任務 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">🎯</div>
            <div>
              <h3 className="font-outfit text-2xl font-bold">本週重點任務</h3>
              <p className="text-lg opacity-90">{currentWeek.title}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-lg font-semibold mb-3">💡 {currentWeek.goal}</p>
            <div className="space-y-2">
              {currentWeek.tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-start gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={completedTasks.has(task.id)}
                    onChange={() => toggleTask(task.id)}
                    className="mt-1 w-5 h-5 rounded border-2 border-white/50 text-orange-500 focus:ring-2 focus:ring-white/50"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${completedTasks.has(task.id) ? 'line-through opacity-75' : ''}`}>
                      {task.task}
                    </p>
                    {task.description && (
                      <p className="text-sm opacity-90 mt-1">{task.description}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 30天後的目標 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6">
          <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            30天後，你能做到
          </h3>
          <ul className="space-y-2">
            {plan.endGoal.map((goal, index) => (
              <li key={index} className="text-lg text-gray-700 flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span>{goal.replace('✓ ', '')}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 完整週計畫 */}
        <div className="space-y-6">
          <h3 className="font-outfit text-2xl font-bold text-gray-900 text-center">
            📅 完整 30 天計畫
          </h3>
          
          {plan.weeks.map((week) => {
            const weekCompleted = week.tasks.every(task => completedTasks.has(task.id));
            const weekProgress = (week.tasks.filter(task => completedTasks.has(task.id)).length / week.tasks.length) * 100;
            
            return (
              <div
                key={week.week}
                className={`border-2 rounded-2xl p-6 transition-all ${
                  week.week === currentWeek.week
                    ? 'border-orange-400 bg-orange-50 shadow-lg'
                    : weekCompleted
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-outfit text-xl font-bold text-gray-900">
                      {week.title}
                    </h4>
                    <p className="text-gray-600 mt-1">💡 {week.goal}</p>
                  </div>
                  {weekCompleted && (
                    <div className="text-4xl">✅</div>
                  )}
                </div>

                {/* Week Progress */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${weekProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {week.tasks.map((task) => (
                    <label
                      key={task.id}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={completedTasks.has(task.id)}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="flex-1">
                        <p className={`font-semibold text-gray-900 ${completedTasks.has(task.id) ? 'line-through opacity-60' : ''}`}>
                          {task.task}
                        </p>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
