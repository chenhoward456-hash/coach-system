'use client';

import { getThirtyDayPlan } from '@/data/thirtyDayPlans';
import BackButton from './BackButton';

interface ThirtyDayPlanStandaloneProps {
  level: 'beginner' | 'intermediate';
  onBack?: () => void;
}

export default function ThirtyDayPlanStandalone({ level, onBack }: ThirtyDayPlanStandaloneProps) {
  const plan = getThirtyDayPlan(level);

  const totalTasks = plan.weeks.reduce((sum, week) => sum + week.tasks.length, 0);

  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md border-2 border-blue-300">
          <h2 className="font-outfit text-3xl font-bold text-gray-900 mb-3">
            {level === 'beginner' ? '🌱 新手成長參考指南' : '🚀 中階進化參考指南'}
          </h2>
          <p className="text-gray-700 text-lg mb-4">
            {plan.description}
          </p>
          <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500">
            <p className="text-gray-700">
              <strong className="text-blue-600">💡 使用說明：</strong>
              這是參考指南，不是必須完成的清單。遇到問題時，看看對應週次的建議。
            </p>
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
            return (
              <div
                key={week.week}
                className="border-2 rounded-2xl p-6 transition-all border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-outfit text-xl font-bold text-gray-900">
                      {week.title}
                    </h4>
                    <p className="text-gray-600 mt-1">💡 {week.goal}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {week.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <span className="text-primary text-xl mt-1">•</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {task.task}
                        </p>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 每週反思 */}
              {(week as any).reflectionQuestions && (week as any).reflectionQuestions.length > 0 && (
                <div className="mt-6 bg-purple-50 border-2 border-purple-300 rounded-xl p-5">
                  <h5 className="font-bold text-lg text-purple-900 mb-3 flex items-center gap-2">
                    <span className="text-2xl">💭</span>
                    本週反思
                  </h5>
                  <ul className="space-y-2 mb-4">
                    {(week as any).reflectionQuestions.map((question: string, idx: number) => (
                      <li key={idx} className="text-purple-800 flex items-start gap-2">
                        <span className="font-bold">{idx + 1}.</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="text-sm text-purple-900">
                      <strong>💡 提示：</strong>寫完可以截圖存在手機記事本，方便日後回顧自己的成長。
                    </p>
                  </div>
                </div>
              )}  
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
