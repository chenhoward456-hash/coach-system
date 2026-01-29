'use client';

import DailyChecklist from './DailyChecklist';
import BackButton from './BackButton';

interface DailyChecklistPageProps {
  onBack?: () => void;
  onNavigate?: (section: string) => void;
}

export default function DailyChecklistPage({ onBack, onNavigate }: DailyChecklistPageProps) {
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

        <DailyChecklist onNavigate={onNavigate} />

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
