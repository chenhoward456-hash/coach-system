'use client';

import { useState } from 'react';

interface OnboardingGuideProps {
  onComplete: () => void;
  onNavigate: (section: string) => void;
}

export default function OnboardingGuide({ onComplete, onNavigate }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '歡迎來到教練成長系統！',
      icon: '👋',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            這個系統是為了<strong className="text-primary">幫助你成長</strong>，不是考核你。
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-900 font-semibold mb-2">系統的核心理念：</p>
            <ul className="space-y-2 text-blue-800">
              <li>• 給你原則和框架，不是標準答案</li>
              <li>• 幫你發展自己的風格，不是變成機器人</li>
              <li>• 提供實戰工具，不是理論知識</li>
            </ul>
          </div>
          <p className="text-gray-600">
            讓我們花 2 分鐘快速了解系統，馬上就能開始使用。
          </p>
        </div>
      ),
    },
    {
      title: '第一步：了解你的狀態',
      icon: '🆘',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            先用<strong className="text-primary">「狀態診斷」</strong>找出你現在遇到的問題。
          </p>
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🆘</span>
              <div>
                <h4 className="font-bold text-xl text-gray-900">狀態診斷</h4>
                <p className="text-sm text-gray-600">3 分鐘找出問題，給你具體建議</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">系統會問你：</p>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• 你有幾位學生？</li>
              <li>• 你現在遇到什麼困難？</li>
              <li>• 你每週做哪些事？</li>
            </ul>
            <p className="text-primary font-semibold mt-3">
              → 診斷後，系統會給你專屬的 30 天成長計畫
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '第二步：開始行動',
      icon: '🚀',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            系統有 4 個核心工具，幫你解決實際問題：
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-300">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-gray-900 mb-1">實戰工具</h4>
              <p className="text-sm text-gray-600">陌生開發、續約、報價、處理拒絕</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border-2 border-purple-300">
              <div className="text-3xl mb-2">🎬</div>
              <h4 className="font-bold text-gray-900 mb-1">影片庫</h4>
              <p className="text-sm text-gray-600">30 個影片主題 + 腳本</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-300">
              <div className="text-3xl mb-2">💡</div>
              <h4 className="font-bold text-gray-900 mb-1">訊息庫</h4>
              <p className="text-sm text-gray-600">21 個訊息範本（記得改成你的風格）</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-300">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-bold text-gray-900 mb-1">每日清單</h4>
              <p className="text-sm text-gray-600">7 項每天要做的事</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '準備好了嗎？',
      icon: '🎯',
      content: (
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            記住這 3 個重點：
          </p>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-4">
              <p className="font-bold text-lg mb-1">1. 真誠 &gt; 話術</p>
              <p className="text-sm opacity-90">系統給的範本要改成你的風格，學生選擇你是因為你是你</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4">
              <p className="font-bold text-lg mb-1">2. 行動 &gt; 完美</p>
              <p className="text-sm opacity-90">先開始做，不用等到完美。做了才會進步</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4">
              <p className="font-bold text-lg mb-1">3. 持續 &gt; 爆發</p>
              <p className="text-sm opacity-90">每天做一點，比偶爾做很多更有效</p>
            </div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 text-center">
            <p className="text-yellow-900 font-semibold text-lg">
              💪 準備好了嗎？點擊下方開始你的成長之旅！
            </p>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('onboarding_completed', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  const handleGoToDiagnosis = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onNavigate('diagnosis');
  };

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{currentStepData.icon}</span>
              <div>
                <h2 className="font-outfit text-2xl font-bold">{currentStepData.title}</h2>
                <p className="text-sm opacity-90">步驟 {currentStep + 1} / {steps.length}</p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white/80 hover:text-white text-sm font-semibold"
            >
              跳過
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {currentStepData.content}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← 上一步
          </button>

          {isLastStep ? (
            <button
              onClick={handleGoToDiagnosis}
              className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              開始診斷 🚀
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              下一步 →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
