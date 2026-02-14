'use client';

import { useEffect, useState, useRef } from 'react';
import { storage } from '@/lib/localStorage';
import PolygonTheory from '@/components/PolygonTheory';
import WeeklyReflection from './WeeklyReflection';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

// ─── Constants ───────────────────────────────────────────────

const TOTAL_TASKS = 7;

const dailyQuotes = [
  '真誠 > 話術。學生要的不是完美的話術，而是真實的你。',
  '行動 > 完美。先開始，再優化。等到完美再開始，永遠不會開始。',
  '持續 > 爆發。每天進步 1%，一年後你會進步 37 倍。',
  '你的狀態就是最好的廣告。想要學生相信訓練有效？先讓自己成為證明。',
  '學生不會記得你說了什麼，但會記得你讓他們有什麼感覺。',
  '不要和別人比，要和昨天的自己比。每個人的起點不同，重要的是持續進步。',
  '低潮是成長的必經之路。沒有低潮，就沒有突破。',
  '專注你能控制的事。學生數、收入這些結果你無法直接控制，但你可以控制每天的行動。',
];

const videoTopics = [
  { title: '訓練日常 Vlog', description: '記錄一天的訓練和生活', difficulty: '新手友善' },
  { title: '學員成果分享', description: '展示學員的進步和改變', difficulty: '新手友善' },
  { title: '常見錯誤動作', description: '指出並修正常見的訓練錯誤', difficulty: '新手友善' },
  { title: '一個動作教學', description: '深入講解一個訓練動作', difficulty: '進階' },
  { title: '飲食觀念分享', description: '分享實用的飲食知識', difficulty: '新手友善' },
  { title: '訓練迷思破解', description: '破解常見的健身迷思', difficulty: '進階' },
  { title: '我的教練日常', description: '展現真實的教練生活', difficulty: '新手友善' },
  { title: '學員問答', description: '回答學員常問的問題', difficulty: '新手友善' },
];

// ─── State Detection ─────────────────────────────────────────

interface CoachState {
  hour: number;
  dayOfWeek: number;
  todayCompleted: number;
  streak: number;
  hasEverUsedChecklist: boolean;
  hasGoals: boolean;
  hasScores: boolean;
  isNewUser: boolean;
}

function loadCoachState(): CoachState {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay();
  const todayStr = now.toLocaleDateString('zh-TW');

  let todayCompleted = 0;
  const todaySaved = localStorage.getItem(`dailyChecklist_${todayStr}`);
  if (todaySaved) {
    try {
      const arr = JSON.parse(todaySaved);
      if (Array.isArray(arr)) todayCompleted = arr.length;
    } catch { /* ignore */ }
  }

  let streak = 0;
  let hasEverUsedChecklist = false;
  for (let i = 0; i < 365; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('zh-TW');
    const entry = localStorage.getItem(`dailyChecklist_${dateStr}`);
    if (entry) {
      hasEverUsedChecklist = true;
      try {
        const arr = JSON.parse(entry);
        if (Array.isArray(arr) && arr.length > 0) streak++;
        else break;
      } catch { break; }
    } else break;
  }

  let hasGoals = false;
  const goalsData = localStorage.getItem('coach-goals');
  if (goalsData) {
    try { hasGoals = JSON.parse(goalsData).length > 0; } catch { /* ignore */ }
  }

  const hasScores = !!storage.getScores();
  const isNewUser = !hasEverUsedChecklist;

  return { hour, dayOfWeek, todayCompleted, streak, hasEverUsedChecklist, hasGoals, hasScores, isNewUser };
}

// ─── Smart Greeting ──────────────────────────────────────────

function getGreeting(s: CoachState): { emoji: string; text: string; subtitle: string } {
  const { hour, streak, todayCompleted, hasEverUsedChecklist } = s;

  let time = '嗨';
  if (hour < 6) time = '夜深了';
  else if (hour < 12) time = '早安';
  else if (hour < 14) time = '午安';
  else if (hour < 18) time = '下午好';
  else time = '辛苦了';

  if (todayCompleted >= TOTAL_TASKS) {
    return { emoji: '🎉', text: time, subtitle: '今天全部搞定了！好好休息吧' };
  }
  if (!hasEverUsedChecklist) {
    return { emoji: '👋', text: '歡迎', subtitle: '這裡是你的成長工具箱，迷惘時來找答案' };
  }
  if (streak === 0) {
    return { emoji: '🌱', text: '歡迎回來', subtitle: '不管隔了多久，今天就是新的開始' };
  }
  if (streak >= 30) {
    return { emoji: '👑', text: time, subtitle: `連續 ${streak} 天了，你是大家的榜樣` };
  }
  if (streak >= 7) {
    return { emoji: '🔥', text: time, subtitle: `連續 ${streak} 天！習慣已經在你身上了` };
  }
  if (streak >= 3) {
    return { emoji: '💪', text: time, subtitle: `連續 ${streak} 天，正在養成好習慣` };
  }
  return { emoji: '☀️', text: time, subtitle: '新的一天，做一件讓自己進步的事' };
}

// ─── Smart CTA ───────────────────────────────────────────────

interface CTAInfo {
  text: string;
  subtext: string;
  action: string;
  gradient: string;
}

function getPrimaryCTA(s: CoachState): CTAInfo | null {
  const { hour, dayOfWeek, todayCompleted, streak, hasGoals, hasScores } = s;

  // 全部完成 → 引導到新功能或不推
  if (todayCompleted >= TOTAL_TASKS) {
    if (!hasGoals && streak >= 3) {
      return { text: '給自己設一個目標？', subtext: '你已經有行動力了，用目標來引導方向', action: 'goals', gradient: 'from-yellow-400 to-orange-500' };
    }
    return null;
  }

  // 週五晚上 / 週六 → 引導到反思
  if ((dayOfWeek === 5 || dayOfWeek === 6) && hour >= 17) {
    return { text: '回顧一下這週', subtext: '花幾分鐘寫下這週的收穫和想法', action: '_reflection', gradient: 'from-purple-500 to-indigo-600' };
  }

  // 做了一半 → 繼續
  if (todayCompleted > 0) {
    return { text: `繼續完成清單（${todayCompleted}/${TOTAL_TASKS}）`, subtext: `還剩 ${TOTAL_TASKS - todayCompleted} 項，你可以的`, action: 'daily', gradient: 'from-blue-500 to-indigo-600' };
  }

  // 早上還沒開始
  if (hour < 12) {
    return { text: '開始今天的清單', subtext: '7 件事，一件一件來就好', action: 'daily', gradient: 'from-blue-500 to-indigo-600' };
  }

  // 下午還沒開始
  if (hour < 18) {
    return { text: '看看今天的清單', subtext: '下午了，還有時間完成幾項', action: 'daily', gradient: 'from-blue-500 to-cyan-500' };
  }

  // 晚上什麼都沒做 → 最溫柔的推力
  return { text: '今天做了什麼好事？', subtext: '就算只完成一項，也是進步', action: 'daily', gradient: 'from-gray-600 to-gray-700' };
}

// ─── Feature Discovery ──────────────────────────────────────

interface FeatureTip {
  text: string;
  subtext: string;
  action: string;
  icon: string;
}

function getFeatureTip(s: CoachState): FeatureTip | null {
  const tips: FeatureTip[] = [];

  if (!s.hasScores && s.streak >= 3) {
    tips.push({ text: '試試自我健檢', subtext: '花 2 分鐘了解自己目前的狀態，沒有對錯', action: 'score', icon: '📊' });
  }
  if (!s.hasGoals && s.streak >= 5) {
    tips.push({ text: '設定一個小目標', subtext: '不用很大，一個你想達成的事就好', action: 'goals', icon: '🎯' });
  }

  if (tips.length === 0) return null;
  const dayIndex = new Date().getDate() % tips.length;
  return tips[dayIndex];
}

// ─── Main Component ─────────────────────────────────────────

export default function HomePage({ onNavigate }: HomePageProps) {
  const [state, setState] = useState<CoachState | null>(null);
  const [dailyQuote, setDailyQuote] = useState('');
  const [dailyVideo, setDailyVideo] = useState(videoTopics[0]);
  const reflectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState(loadCoachState());

    // 每日金句（每天固定一句）
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyQuote_date');
    const savedQuote = localStorage.getItem('dailyQuote_text');
    if (savedDate === today && savedQuote) {
      setDailyQuote(savedQuote);
    } else {
      const q = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
      localStorage.setItem('dailyQuote_date', today);
      localStorage.setItem('dailyQuote_text', q);
      setDailyQuote(q);
    }

    // 每日影片推薦
    const savedVDate = localStorage.getItem('dailyVideo_date');
    const savedVideo = localStorage.getItem('dailyVideo_data');
    if (savedVDate === today && savedVideo) {
      setDailyVideo(JSON.parse(savedVideo));
    } else {
      const v = videoTopics[Math.floor(Math.random() * videoTopics.length)];
      localStorage.setItem('dailyVideo_date', today);
      localStorage.setItem('dailyVideo_data', JSON.stringify(v));
      setDailyVideo(v);
    }
  }, []);

  if (!state) return null;

  const greeting = getGreeting(state);
  const primaryCTA = getPrimaryCTA(state);
  const featureTip = getFeatureTip(state);
  const isFridayEvening = state.dayOfWeek === 5 && state.hour >= 17;
  const isWeekend = state.dayOfWeek === 0 || state.dayOfWeek === 6;

  return (
    <div className="animate-fade-in">

      {/* ═══════ Smart Greeting ═══════ */}
      <div className="text-center mb-8 pt-4">
        <div className="text-6xl mb-4 animate-bounce-slow">{greeting.emoji}</div>
        <h1 className="font-outfit text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          {greeting.text}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
          {greeting.subtitle}
        </p>
      </div>

      {/* ═══════ Primary CTA ═══════ */}
      {primaryCTA && (
        <button
          onClick={() => {
            if (primaryCTA.action === '_reflection') {
              reflectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            } else {
              onNavigate(primaryCTA.action);
            }
          }}
          className={`w-full bg-gradient-to-r ${primaryCTA.gradient} text-white rounded-2xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left group`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold mb-1">{primaryCTA.text}</div>
              <div className="text-sm opacity-90">{primaryCTA.subtext}</div>
            </div>
            <div className="text-3xl opacity-80 group-hover:translate-x-2 transition-transform">→</div>
          </div>
        </button>
      )}

      {/* ═══════ Today Progress (only when partially done) ═══════ */}
      {state.todayCompleted > 0 && state.todayCompleted < TOTAL_TASKS && (
        <div className="bg-white rounded-xl p-4 mb-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">今日進度</span>
            <div className="flex items-center gap-2">
              {state.streak > 0 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                  🔥 {state.streak} 天
                </span>
              )}
              <span className="text-sm font-bold text-primary">{state.todayCompleted}/{TOTAL_TASKS}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.round((state.todayCompleted / TOTAL_TASKS) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* ═══════ All Done Celebration ═══════ */}
      {state.todayCompleted >= TOTAL_TASKS && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-6 mb-6 shadow-lg text-center">
          <div className="text-4xl mb-2">✅</div>
          <div className="text-xl font-bold">今天的清單全部完成了！</div>
          {state.streak > 1 && (
            <div className="text-sm opacity-90 mt-1">
              已經連續 {state.streak} 天了 🔥
            </div>
          )}
        </div>
      )}

      {/* ═══════ Daily Quote (subtle) ═══════ */}
      {dailyQuote && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8">
          <p className="text-amber-800 text-center text-sm md:text-base">
            💡 {dailyQuote}
          </p>
        </div>
      )}

      {/* ═══════ Feature Discovery ═══════ */}
      {featureTip && (
        <button
          onClick={() => onNavigate(featureTip.action)}
          className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 mb-8 text-left hover:border-primary hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{featureTip.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                {featureTip.text}
              </div>
              <div className="text-sm text-gray-500">{featureTip.subtext}</div>
            </div>
            <div className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all">→</div>
          </div>
        </button>
      )}

      {/* ═══════ Weekly Reflection (highlighted on Fri/weekend) ═══════ */}
      <div
        ref={reflectionRef}
        className={`mb-8 transition-all ${
          isFridayEvening || isWeekend
            ? 'ring-2 ring-purple-300 ring-offset-2 rounded-2xl'
            : ''
        }`}
      >
        <WeeklyReflection />
      </div>

      {/* ═══════ Quick Links + Video Recommendation ═══════ */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
          <h3 className="font-outfit text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            快速入口
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('daily')} className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105">
              ✅ 今日清單
            </button>
            <button onClick={() => onNavigate('videos')} className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105">
              🎬 影片主題
            </button>
            <button onClick={() => onNavigate('messages')} className="bg-green-50 hover:bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105">
              💬 訊息範本
            </button>
            <button onClick={() => onNavigate('frameworks')} className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-3 px-4 rounded-xl transition-all hover:scale-105">
              ⚡ 實戰工具
            </button>
          </div>
        </div>

        <button
          onClick={() => onNavigate('videos')}
          className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left group"
        >
          <h3 className="font-outfit text-xl font-bold mb-3 flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            今日推薦影片主題
          </h3>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-3">
            <h4 className="font-bold text-lg mb-2">{dailyVideo.title}</h4>
            <p className="text-sm opacity-90 mb-2">{dailyVideo.description}</p>
            <span className="inline-block bg-white/30 px-3 py-1 rounded-full text-xs font-semibold">
              {dailyVideo.difficulty}
            </span>
          </div>
          <div className="text-right text-sm font-bold opacity-80 group-hover:translate-x-1 transition-transform">
            查看更多主題 →
          </div>
        </button>
      </div>

      {/* ═══════ 你現在遇到什麼困難？ ═══════ */}
      <div className="mb-12">
        <h2 className="font-outfit text-3xl font-bold text-center mb-4 text-gray-900">
          你現在遇到什麼困難？
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          選擇你的狀況，我們幫你找到解決方法
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={() => onNavigate('videos')} className="bg-white rounded-2xl p-8 shadow-md border-2 border-purple-200 hover:shadow-xl hover:border-purple-400 transition-all text-left group">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">我不知道拍什麼影片</h3>
            <p className="text-gray-700 mb-4">想拍影片但沒靈感、不知道怎麼開始...</p>
            <div className="text-purple-600 font-bold">→ 影片主題庫（30個主題）</div>
          </button>

          <button onClick={() => onNavigate('messages')} className="bg-white rounded-2xl p-8 shadow-md border-2 border-green-200 hover:shadow-xl hover:border-green-400 transition-all text-left group">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-success transition-colors">我不知道怎麼關心學員</h3>
            <p className="text-gray-700 mb-4">想關心但不知道說什麼、怕太制式...</p>
            <div className="text-success font-bold">→ 訊息範本庫（21個範本）</div>
          </button>

          <button onClick={() => onNavigate('frameworks')} className="bg-white rounded-2xl p-8 shadow-md border-2 border-orange-200 hover:shadow-xl hover:border-orange-400 transition-all text-left group">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-warning transition-colors">我遇到實戰問題</h3>
            <p className="text-gray-700 mb-4">不知道怎麼開發、續約、報價、處理拒絕...</p>
            <div className="text-warning font-bold">→ 實戰工具（開發、續約、報價、拒絕）</div>
          </button>

          <button onClick={() => onNavigate('resources')} className="bg-white rounded-2xl p-8 shadow-md border-2 border-blue-200 hover:shadow-xl hover:border-blue-400 transition-all text-left group">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">我想學習但不知道看什麼</h3>
            <p className="text-gray-700 mb-4">想進修但書太多、不知道從哪開始...</p>
            <div className="text-primary font-bold">→ 學習資源庫（53項資源）</div>
          </button>

          <button onClick={() => onNavigate('mindset')} className="bg-white rounded-2xl p-8 shadow-md border-2 border-purple-200 hover:shadow-xl hover:border-purple-400 transition-all text-left group">
            <div className="text-5xl mb-4">💪</div>
            <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">我需要調整心態</h3>
            <p className="text-gray-700 mb-4">遇到瓶頸、需要重新找回動力...</p>
            <div className="text-purple-600 font-bold">→ 成長心法</div>
          </button>
        </div>
      </div>

      {/* ═══════ 30天成長計畫 ═══════ */}
      <div className="mb-12">
        <h2 className="font-outfit text-3xl font-bold text-center mb-4 text-gray-900">
          🚀 30天成長計畫
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          選擇你的階段，開始你的成長之旅
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('plan-beginner')}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border-2 border-green-300 hover:shadow-2xl hover:border-green-500 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3">新手成長地圖</h3>
              <p className="text-gray-700 mb-4 text-lg">適合 <strong className="text-green-600">0-15位學生</strong> 的教練</p>
              <p className="text-gray-600 text-sm mb-4">建立基礎習慣、系統化流程、開始主動開發</p>
              <div className="text-green-600 font-bold text-lg">→ 查看新手計畫</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('plan-intermediate')}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg border-2 border-purple-300 hover:shadow-2xl hover:border-purple-500 transition-all text-left group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-20 group-hover:scale-150 transition-transform"></div>
            <div className="relative">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-3">進階成長地圖</h3>
              <p className="text-gray-700 mb-4 text-lg">適合 <strong className="text-purple-600">15位以上學生</strong> 的教練</p>
              <p className="text-gray-600 text-sm mb-4">數據追蹤、流程自動化、內容策略優化</p>
              <div className="text-purple-600 font-bold text-lg">→ 查看進階計畫</div>
            </div>
          </button>
        </div>
      </div>

      {/* ═══════ 多邊形理論 ═══════ */}
      <div className="mb-12">
        <PolygonTheory />
      </div>

      {/* ═══════ 給教練的話 + 使用指南（新用戶才顯示）═══════ */}
      {state.isNewUser && (
        <>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-10 mb-12 border-2 border-orange-200">
            <h2 className="font-outfit text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              給所有教練的話
            </h2>
            <div className="space-y-6 text-gray-800 leading-relaxed text-lg">
              <p>
                這個系統不是要<strong className="text-gray-900">「要求所有人都一樣」</strong><br />
                而是讓每個人找到自己的成長方式
              </p>
              <p>
                有人擅長內容創作、有人擅長服務深耕、有人擅長專業技術<br />
                <strong className="text-primary">找到你的強項，做出你的價值</strong>
              </p>
              <p className="text-gray-700">
                這裡沒有 KPI、沒有考核、沒有打分數<br />
                只有工具、資源、和你需要的答案
              </p>
              <p className="text-right text-gray-600 italic mt-8">— Howard</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 mb-12 border-l-4 border-primary">
            <h3 className="font-outfit text-2xl font-bold mb-4 text-primary">
              📖 如何使用這個系統？（先看這裡！）
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              這個系統內容很多，但不要被嚇到！根據你的需求，選擇對應的路徑：
            </p>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border-l-4 border-danger">
                <h4 className="font-bold text-xl text-danger mb-3">🆘 如果你遇到問題（迷惘、沒動力、沒成果）</h4>
                <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
                  <li>直接點擊 <strong className="text-danger">「狀態診斷」</strong> → 回答3個問題</li>
                  <li>看看你屬於哪種迷惘 → 系統會給你解方</li>
                  <li>跟著「立刻行動」清單做 → 一步一步解決</li>
                  <li>還是不行就找 Howard 聊 → 不要一個人硬撐</li>
                </ol>
              </div>
              <div className="bg-white p-6 rounded-xl border-l-4 border-success">
                <h4 className="font-bold text-xl text-success mb-3">📚 如果你想學習（看書、看影片）</h4>
                <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
                  <li>點擊 <strong className="text-success">「資源」</strong> → 選擇你的等級</li>
                  <li>跟著「推薦學習順序」看 → 不要亂看一通</li>
                  <li>邊看邊做 → 學到的東西立刻實踐</li>
                  <li>不要貪多 → 看懂1本做到100%，比看10本做到10%有用</li>
                </ol>
              </div>
              <div className="bg-white p-6 rounded-xl border-l-4 border-warning">
                <h4 className="font-bold text-xl text-warning mb-3">💪 如果你需要調整心態</h4>
                <ol className="space-y-2 ml-6 list-decimal text-gray-700 leading-relaxed">
                  <li>去看 <strong className="text-warning">「成長心法」</strong> → 重新找回動力</li>
                  <li>記住：這是馬拉松，不是短跑 → 慢慢來比較快</li>
                  <li>遇到低潮很正常 → 每個人都會遇到</li>
                </ol>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
