// ─────────────────────────────────────────────────────────────
// 本週重點設定
// Howard：把下面的 MANUAL_OVERRIDE 改成你想要的主題編號（0–4）
// 改完存檔，push 到 Vercel 就生效。
// 不想手動控制的話，把 MANUAL_OVERRIDE 設成 null，系統自動按週輪換。
// ─────────────────────────────────────────────────────────────

export const MANUAL_OVERRIDE: number | null = null;
//
// 主題對照：
// 0 → 🎯 陌生開發
// 1 → 🔄 續約技巧
// 2 → 💬 關心學員
// 3 → 🎬 內容產出
// 4 → 🛡️ 處理拒絕

export const weeklyFocusItems = [
  {
    icon: '🎯',
    title: '陌生開發',
    desc: '這週找一個開口機會，用「觀察 → 給價值 → 自然提服務」框架試試',
    action: 'frameworks',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: '🔄',
    title: '續約技巧',
    desc: '看看手上快到期的學員，提前 2 週帶入話題，不要等到最後一刻',
    action: 'frameworks',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: '💬',
    title: '關心學員',
    desc: '選一個訊息範本，今天傳給一個很久沒聯絡的學員',
    action: 'messages',
    color: 'from-green-400 to-teal-500',
  },
  {
    icon: '🎬',
    title: '內容產出',
    desc: '選一個影片主題，這週拍一支或至少把腳本寫下來',
    action: 'videos',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: '🛡️',
    title: '處理拒絕',
    desc: '看看「太貴」「考慮一下」怎麼回，這週遇到了就不要迴避',
    action: 'frameworks',
    color: 'from-rose-400 to-pink-600',
  },
];

export function getWeeklyFocus() {
  if (MANUAL_OVERRIDE !== null) {
    return weeklyFocusItems[MANUAL_OVERRIDE % weeklyFocusItems.length];
  }
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );
  return weeklyFocusItems[weekNumber % weeklyFocusItems.length];
}
