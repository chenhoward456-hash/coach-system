'use client';

import { useState, useEffect } from 'react';

interface CoachData {
  id: string;
  name: string;
  level: '新手' | '中手' | '資深';
  students: number;
  scores: {
    renewal: number;      // 續約率
    referral: number;     // 轉介紹
    content: number;      // 內容產出
    soft: number;         // 軟實力
    hard: number;         // 硬實力
  };
  weeklyCompletion: number;
  lastActive: string;
  status: 'excellent' | 'good' | 'warning' | 'danger';
}

export default function AdminDashboard() {
  const [coaches, setCoaches] = useState<CoachData[]>([]);
  const [filter, setFilter] = useState<'all' | 'excellent' | 'good' | 'warning' | 'danger'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'completion'>('score');

  useEffect(() => {
    // 模擬數據（實際應該從後端 API 獲取）
    const mockCoaches: CoachData[] = [
      {
        id: '1',
        name: '教練 A',
        level: '新手',
        students: 8,
        scores: { renewal: 85, referral: 75, content: 60, soft: 80, hard: 70 },
        weeklyCompletion: 85,
        lastActive: '2026-01-28',
        status: 'excellent',
      },
      {
        id: '2',
        name: '教練 B',
        level: '中手',
        students: 15,
        scores: { renewal: 90, referral: 85, content: 80, soft: 85, hard: 90 },
        weeklyCompletion: 95,
        lastActive: '2026-01-28',
        status: 'excellent',
      },
      {
        id: '3',
        name: '教練 C',
        level: '新手',
        students: 5,
        scores: { renewal: 65, referral: 55, content: 45, soft: 60, hard: 50 },
        weeklyCompletion: 55,
        lastActive: '2026-01-27',
        status: 'warning',
      },
      {
        id: '4',
        name: '教練 D',
        level: '資深',
        students: 20,
        scores: { renewal: 95, referral: 90, content: 85, soft: 90, hard: 95 },
        weeklyCompletion: 100,
        lastActive: '2026-01-28',
        status: 'excellent',
      },
      {
        id: '5',
        name: '教練 E',
        level: '新手',
        students: 3,
        scores: { renewal: 50, referral: 40, content: 30, soft: 45, hard: 35 },
        weeklyCompletion: 40,
        lastActive: '2026-01-25',
        status: 'danger',
      },
    ];
    setCoaches(mockCoaches);
  }, []);

  const calculateTotalScore = (coach: CoachData) => {
    const { renewal, referral, content, soft, hard } = coach.scores;
    return Math.round(
      renewal * 0.3 + referral * 0.25 + content * 0.15 + soft * 0.1 + hard * 0.2
    );
  };

  const getStatusColor = (status: CoachData['status']) => {
    const colors = {
      excellent: 'bg-green-100 text-green-700 border-green-300',
      good: 'bg-blue-100 text-blue-700 border-blue-300',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      danger: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: CoachData['status']) => {
    const labels = {
      excellent: '🏆 優秀',
      good: '👍 良好',
      warning: '⚠️ 需關注',
      danger: '🚨 需介入',
    };
    return labels[status];
  };

  const filteredCoaches = coaches
    .filter(c => filter === 'all' || c.status === filter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'score') return calculateTotalScore(b) - calculateTotalScore(a);
      if (sortBy === 'completion') return b.weeklyCompletion - a.weeklyCompletion;
      return 0;
    });

  const stats = {
    total: coaches.length,
    excellent: coaches.filter(c => c.status === 'excellent').length,
    warning: coaches.filter(c => c.status === 'warning').length,
    danger: coaches.filter(c => c.status === 'danger').length,
    avgScore: Math.round(coaches.reduce((sum, c) => sum + calculateTotalScore(c), 0) / coaches.length),
    avgCompletion: Math.round(coaches.reduce((sum, c) => sum + c.weeklyCompletion, 0) / coaches.length),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-outfit text-3xl font-bold mb-2">👨‍💼 Howard 管理後台</h2>
        <p className="text-gray-600">一眼掌握所有教練的狀態</p>
      </div>

      {/* 總覽統計 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-200">
          <div className="text-gray-600 mb-2">總教練數</div>
          <div className="text-4xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 shadow-md border-2 border-green-200">
          <div className="text-green-700 mb-2">優秀教練</div>
          <div className="text-4xl font-bold text-green-600">{stats.excellent}</div>
          <div className="text-sm text-green-600 mt-1">{Math.round(stats.excellent / stats.total * 100)}%</div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 shadow-md border-2 border-yellow-200">
          <div className="text-yellow-700 mb-2">需關注</div>
          <div className="text-4xl font-bold text-yellow-600">{stats.warning}</div>
          <div className="text-sm text-yellow-600 mt-1">{Math.round(stats.warning / stats.total * 100)}%</div>
        </div>
        <div className="bg-red-50 rounded-xl p-6 shadow-md border-2 border-red-200">
          <div className="text-red-700 mb-2">需介入</div>
          <div className="text-4xl font-bold text-red-600">{stats.danger}</div>
          <div className="text-sm text-red-600 mt-1">{Math.round(stats.danger / stats.total * 100)}%</div>
        </div>
      </div>

      {/* 團隊平均 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
        <h3 className="font-bold text-xl mb-4">📊 團隊平均表現</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-gray-700 mb-2">平均總分</div>
            <div className="text-5xl font-bold text-primary">{stats.avgScore}</div>
            <div className="text-sm text-gray-600 mt-1">
              {stats.avgScore >= 80 ? '🏆 優秀' : stats.avgScore >= 70 ? '👍 良好' : '⚠️ 需改善'}
            </div>
          </div>
          <div>
            <div className="text-gray-700 mb-2">平均任務完成率</div>
            <div className="text-5xl font-bold text-success">{stats.avgCompletion}%</div>
            <div className="text-sm text-gray-600 mt-1">
              {stats.avgCompletion >= 80 ? '🏆 優秀' : stats.avgCompletion >= 70 ? '👍 良好' : '⚠️ 需改善'}
            </div>
          </div>
        </div>
      </div>

      {/* 篩選和排序 */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            全部 ({coaches.length})
          </button>
          <button
            onClick={() => setFilter('excellent')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'excellent' ? 'bg-success text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            優秀 ({stats.excellent})
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'warning' ? 'bg-warning text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            需關注 ({stats.warning})
          </button>
          <button
            onClick={() => setFilter('danger')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'danger' ? 'bg-danger text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            需介入 ({stats.danger})
          </button>
        </div>

        <div className="flex gap-2 ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold focus:border-primary focus:outline-none"
          >
            <option value="score">按總分排序</option>
            <option value="completion">按完成率排序</option>
            <option value="name">按姓名排序</option>
          </select>
        </div>
      </div>

      {/* 教練列表 */}
      <div className="space-y-4">
        {filteredCoaches.map((coach) => {
          const totalScore = calculateTotalScore(coach);
          
          return (
            <div
              key={coach.id}
              className={`bg-white rounded-xl p-6 shadow-md border-2 transition-all hover:shadow-lg ${
                coach.status === 'danger' ? 'border-red-300' :
                coach.status === 'warning' ? 'border-yellow-300' :
                'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-2xl text-gray-900">{coach.name}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-bold">
                      {coach.level}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getStatusColor(coach.status)}`}>
                      {getStatusLabel(coach.status)}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>👥 {coach.students} 位學員</span>
                    <span>📅 最後活躍：{coach.lastActive}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">{totalScore}</div>
                  <div className="text-sm text-gray-600">總分</div>
                </div>
              </div>

              {/* 5個面向 */}
              <div className="grid grid-cols-5 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">續約率</div>
                  <div className={`text-2xl font-bold ${coach.scores.renewal >= 80 ? 'text-success' : coach.scores.renewal >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {coach.scores.renewal}
                  </div>
                  <div className="text-xs text-gray-500">30%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">轉介紹</div>
                  <div className={`text-2xl font-bold ${coach.scores.referral >= 80 ? 'text-success' : coach.scores.referral >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {coach.scores.referral}
                  </div>
                  <div className="text-xs text-gray-500">25%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">內容產出</div>
                  <div className={`text-2xl font-bold ${coach.scores.content >= 80 ? 'text-success' : coach.scores.content >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {coach.scores.content}
                  </div>
                  <div className="text-xs text-gray-500">15%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">軟實力</div>
                  <div className={`text-2xl font-bold ${coach.scores.soft >= 80 ? 'text-success' : coach.scores.soft >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {coach.scores.soft}
                  </div>
                  <div className="text-xs text-gray-500">10%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">硬實力</div>
                  <div className={`text-2xl font-bold ${coach.scores.hard >= 80 ? 'text-success' : coach.scores.hard >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {coach.scores.hard}
                  </div>
                  <div className="text-xs text-gray-500">20%</div>
                </div>
              </div>

              {/* 任務完成率 */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">本週任務完成率</span>
                  <span className="font-bold text-primary">{coach.weeklyCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      coach.weeklyCompletion >= 80 ? 'bg-success' :
                      coach.weeklyCompletion >= 60 ? 'bg-warning' : 'bg-danger'
                    }`}
                    style={{ width: `${coach.weeklyCompletion}%` }}
                  />
                </div>
              </div>

              {/* 建議和行動 */}
              {coach.status === 'danger' && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-300 mb-3">
                  <strong className="text-red-700 block mb-2">🚨 需要立即介入</strong>
                  <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                    {coach.scores.renewal < 60 && <li>續約率過低，需要加強課後關心</li>}
                    {coach.scores.referral < 60 && <li>轉介紹不足，可能需要調整溝通方式</li>}
                    {coach.scores.content < 60 && <li>內容產出太少，建議使用影片主題庫</li>}
                    {coach.weeklyCompletion < 50 && <li>任務完成率低，可能需要調整工作量</li>}
                  </ul>
                </div>
              )}

              {coach.status === 'warning' && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-warning mb-3">
                  <strong className="text-yellow-700 block mb-2">⚠️ 需要關注</strong>
                  <p className="text-sm text-gray-700">
                    建議本週與 {coach.name} 聊聊，了解是否遇到困難
                  </p>
                </div>
              )}

              {coach.status === 'excellent' && (
                <div className="bg-green-50 p-4 rounded-lg border border-success mb-3">
                  <strong className="text-success block mb-2">🏆 表現優異</strong>
                  <p className="text-sm text-gray-700">
                    可以考慮讓 {coach.name} 分享經驗，或擔任新手教練的導師
                  </p>
                </div>
              )}

              {/* 快速行動 */}
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                  📊 查看詳細數據
                </button>
                <button className="px-4 py-2 bg-success text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                  💬 發送訊息
                </button>
                {(coach.status === 'warning' || coach.status === 'danger') && (
                  <button className="px-4 py-2 bg-warning text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    📅 安排1對1
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCoaches.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">沒有符合條件的教練</p>
        </div>
      )}

      {/* 一鍵生成報告 */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl p-6">
        <h3 className="font-bold text-xl mb-4">📄 快速報告</h3>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-xl transition-all">
            📊 生成本月報告
          </button>
          <button className="px-6 py-3 bg-success text-white font-bold rounded-xl hover:shadow-xl transition-all">
            📈 匯出數據 (CSV)
          </button>
          <button className="px-6 py-3 bg-warning text-gray-900 font-bold rounded-xl hover:shadow-xl transition-all">
            📧 發送週報給所有教練
          </button>
        </div>
      </div>
    </div>
  );
}
