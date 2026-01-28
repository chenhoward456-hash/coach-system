'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/localStorage';
import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeeklyData {
  week: string;
  completionRate: number;
  score: number | null;
}

export default function ProgressDashboard() {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [currentScores, setCurrentScores] = useState({
    score1: 0,
    score2: 0,
    score3: 0,
    score4: 0,
  });

  useEffect(() => {
    // 載入歷史數據（這裡先用模擬數據，之後可以從 localStorage 讀取）
    const mockData: WeeklyData[] = [
      { week: '第1週', completionRate: 45, score: null },
      { week: '第2週', completionRate: 60, score: 65 },
      { week: '第3週', completionRate: 75, score: 72 },
      { week: '第4週', completionRate: 80, score: 78 },
    ];
    setWeeklyData(mockData);

    // 載入當前評分
    const scores = storage.getScores();
    if (scores) {
      setCurrentScores(scores);
    }
  }, []);

  // 任務完成率趨勢圖
  const completionTrendData = {
    labels: weeklyData.map(d => d.week),
    datasets: [
      {
        label: '任務完成率 (%)',
        data: weeklyData.map(d => d.completionRate),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 評分趨勢圖
  const scoreTrendData = {
    labels: weeklyData.map(d => d.week),
    datasets: [
      {
        label: '總分',
        data: weeklyData.map(d => d.score),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 5個面向雷達圖
  const radarData = {
    labels: ['續約率', '轉介紹', '內容產出', '軟實力', '硬實力'],
    datasets: [
      {
        label: '當前表現',
        data: [
          currentScores.score1 || 0,
          currentScores.score2 || 0,
          currentScores.score3 || 0,
          currentScores.score4 || 0,
          (currentScores.score1 + currentScores.score2 + currentScores.score3 + currentScores.score4) / 4 || 0,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
      {
        label: '標竿教練 (90分)',
        data: [90, 90, 90, 90, 90],
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  // 計算趨勢
  const getTrend = () => {
    if (weeklyData.length < 2) return null;
    const recent = weeklyData[weeklyData.length - 1].completionRate;
    const previous = weeklyData[weeklyData.length - 2].completionRate;
    const diff = recent - previous;
    
    if (diff > 10) return { text: '大幅進步', color: 'text-success', icon: '📈' };
    if (diff > 0) return { text: '穩定進步', color: 'text-success', icon: '📊' };
    if (diff === 0) return { text: '持平', color: 'text-warning', icon: '➡️' };
    if (diff > -10) return { text: '小幅下降', color: 'text-warning', icon: '📉' };
    return { text: '需要關注', color: 'text-danger', icon: '⚠️' };
  };

  const trend = getTrend();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-outfit text-3xl font-bold mb-2">📊 個人成長儀表板</h2>
        <p className="text-gray-600">追蹤你的進步軌跡，看見自己的成長</p>
      </div>

      {/* 趨勢提示 */}
      {trend && (
        <div className={`bg-white rounded-xl p-6 border-l-4 ${
          trend.color === 'text-success' ? 'border-success' :
          trend.color === 'text-warning' ? 'border-warning' : 'border-danger'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{trend.icon}</span>
            <div>
              <h3 className="font-bold text-lg">本週趨勢：{trend.text}</h3>
              <p className="text-gray-600">
                {trend.color === 'text-success' && '太棒了！繼續保持這個節奏💪'}
                {trend.color === 'text-warning' && '還不錯，可以再加把勁！'}
                {trend.color === 'text-danger' && '需要調整一下，我們一起找出問題'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 圖表區域 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 任務完成率趨勢 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-xl mb-4">📈 任務完成率趨勢</h3>
          <div className="h-64">
            <Line data={completionTrendData} options={chartOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            💡 目標：保持在 70% 以上
          </p>
        </div>

        {/* 評分趨勢 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-xl mb-4">📊 總分趨勢</h3>
          <div className="h-64">
            <Line data={scoreTrendData} options={chartOptions} />
          </div>
          <p className="text-sm text-gray-600 mt-4">
            💡 目標：合格教練 70 分 | 標竿教練 90 分
          </p>
        </div>
      </div>

      {/* 5個面向雷達圖 */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="font-bold text-xl mb-4">🎯 5個面向表現</h3>
        <div className="h-96">
          <Radar data={radarData} options={radarOptions} />
        </div>
        <div className="mt-6 grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{currentScores.score1 || 0}</div>
            <div className="text-sm text-gray-600">續約率</div>
            <div className="text-xs text-gray-500">權重 30%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{currentScores.score2 || 0}</div>
            <div className="text-sm text-gray-600">轉介紹</div>
            <div className="text-xs text-gray-500">權重 25%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{currentScores.score3 || 0}</div>
            <div className="text-sm text-gray-600">內容產出</div>
            <div className="text-xs text-gray-500">權重 15%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{currentScores.score4 || 0}</div>
            <div className="text-sm text-gray-600">軟實力</div>
            <div className="text-xs text-gray-500">權重 10%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((currentScores.score1 + currentScores.score2 + currentScores.score3 + currentScores.score4) / 4) || 0}
            </div>
            <div className="text-sm text-gray-600">硬實力</div>
            <div className="text-xs text-gray-500">權重 20%</div>
          </div>
        </div>
      </div>

      {/* 個人化建議 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="font-bold text-xl mb-4 text-primary">💡 本週建議</h3>
        <div className="space-y-3">
          {currentScores.score1 < 70 && (
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-danger">⚠️ 續約率需要關注</strong>
              <p className="text-gray-700 mt-1">建議：加強課後關心，使用訊息範本每週至少關心 2 次</p>
            </div>
          )}
          {currentScores.score2 < 70 && (
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-warning">📢 轉介紹可以加強</strong>
              <p className="text-gray-700 mt-1">建議：在學員進步明顯時，自然地提到轉介紹</p>
            </div>
          )}
          {currentScores.score3 < 70 && (
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-purple-600">📱 內容產出偏低</strong>
              <p className="text-gray-700 mt-1">建議：本週至少拍 1 支影片，從「技術教學」類別開始</p>
            </div>
          )}
          {currentScores.score1 >= 80 && currentScores.score2 >= 80 && (
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-success">🎉 表現優異！</strong>
              <p className="text-gray-700 mt-1">你的續約率和轉介紹都很棒，繼續保持！可以開始挑戰「標竿教練」目標</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
