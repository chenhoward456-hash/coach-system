# Cool Day Fitness 北屯館 - 教練培訓系統

這是一個專為酷地健身房教練設計的養成系統，幫助教練從新手成長為專業。

## 功能特色

- ✅ **每週任務清單**：追蹤 4 大核心領域的任務完成度
- 📊 **自我評分工具**：計算續約率預測，了解自己的強弱項
- 🔍 **狀態診斷工具**：診斷目前的困境並提供解決方案
- 💾 **數據持久化**：所有數據自動保存在 LocalStorage，重新整理不會遺失
- 📋 **一鍵複製報告**：方便分享給主管或保存記錄

## 技術棧

- **框架**: Next.js 16 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **字體**: Noto Sans TC + Outfit
- **數據存儲**: LocalStorage

## 開始使用

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 查看應用。

### 構建生產版本

```bash
npm run build
npm start
```

## 專案結構

```
coach-system/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根佈局（字體配置）
│   ├── page.tsx           # 主頁面
│   └── globals.css        # 全局樣式
├── components/            # React 組件
│   ├── Header.tsx         # 頁首
│   ├── Navigation.tsx     # 導航欄
│   ├── TaskSection.tsx    # 任務清單
│   ├── ScoreCalculator.tsx # 評分工具
│   └── DiagnosisTool.tsx  # 診斷工具
├── lib/                   # 工具函數
│   └── localStorage.ts    # LocalStorage 管理
└── hooks/                 # 自定義 Hooks
    └── useLocalStorage.ts # LocalStorage Hook
```

## 數據持久化

系統使用 LocalStorage 保存以下數據：

- **任務清單**: `coach-system-tasks`
- **評分記錄**: `coach-system-scores`
- **診斷結果**: `coach-system-diagnosis`

所有數據在瀏覽器本地保存，重新整理頁面或關閉瀏覽器後依然保留。

## 作者

Howard - Cool Day Fitness 北屯館

## 授權

內部使用專案
