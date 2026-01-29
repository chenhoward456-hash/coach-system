export interface WeekTask {
  id: string;
  task: string;
  description?: string;
  completed?: boolean;
}

export interface WeekPlan {
  week: number;
  title: string;
  goal: string;
  tasks: WeekTask[];
  reflection?: string[];
}

export interface ThirtyDayPlan {
  level: 'beginner' | 'intermediate';
  title: string;
  description: string;
  endGoal: string[];
  weeks: WeekPlan[];
}

export const thirtyDayPlans: Record<string, ThirtyDayPlan> = {
  beginner: {
    level: 'beginner',
    title: '🌱 新手成長地圖 - 30天解鎖計畫',
    description: '這不是考核，而是幫你快速上手的捷徑。迷惘時，跟著做就好。',
    endGoal: [
      '✓ 每週穩定產出1支影片',
      '✓ 課後關心覆蓋率100%',
      '✓ 學生數達到10-15位',
      '✓ 建立基本追蹤系統',
      '✓ 準備好進入進階'
    ],
    weeks: [
      {
        week: 1,
        title: '第一週：解鎖基礎技能',
        goal: '先開始，完美可以慢慢來',
        tasks: [
          {
            id: 'w1-1',
            task: '拍1支影片（任何主題都好）',
            description: '💡 為什麼：建立專業形象，學生會更信任你。不用完美，先開始就贏了一半。'
          },
          {
            id: 'w1-2',
            task: '課後24小時內關心每位學生',
            description: '💡 為什麼：學生會感受到被在乎，續約率直接提升。簡單問候就好，不用長篇大論。'
          },
          {
            id: 'w1-3',
            task: '建立學生名單（Excel或筆記本）',
            description: '💡 為什麼：記不住學生的事會很尷尬。有名單，你就是專業教練。'
          }
        ],
        reflection: [
          '這週做了哪些事？哪些做得好？哪些需要改進？',
          '拍影片時最大的困難是什麼？下週怎麼改善？',
          '學生對你的課後關心有什麼反應？',
          '你發現自己比較適合什麼風格？（參考「個人風格」頁面）'
        ]
      },
      {
        week: 2,
        title: '第二週：建立你的系統',
        goal: '讓重複的事自動化，省下時間做更重要的事',
        tasks: [
          {
            id: 'w2-1',
            task: '固定時間拍影片、發訊息',
            description: '💡 為什麼：固定時間做固定的事，不用每次都想「該做了嗎」，效率直接翻倍。'
          },
          {
            id: 'w2-2',
            task: '使用訊息範本（至少3種）',
            description: '💡 為什麼：不用每次想要說什麼，複製貼上改名字就好。去「救命錦囊」找範本。'
          },
          {
            id: 'w2-3',
            task: '開始記錄學生訓練數據',
            description: '💡 為什麼：學生看到自己的進步數據會超有成就感，續約率大增。'
          }
        ],
        reflection: [
          '固定時間做事有幫助嗎？你的最佳時段是什麼時候？',
          '哪些訊息範本最好用？你有改成自己的風格嗎？',
          '記錄數據後，學生有什麼反應？',
          '這週最大的收穫是什麼？'
        ]
      },
      {
        week: 3,
        title: '第三週：擴大你的影響力',
        goal: '不再只靠公司給學生，開始自己開發',
        tasks: [
          {
            id: 'w3-1',
            task: '請3位學生轉介紹',
            description: '💡 為什麼：轉介紹來的學生最好帶，而且信任度超高。去「救命錦囊」找話術。'
          },
          {
            id: 'w3-2',
            task: '分享1個成功案例',
            description: '💡 為什麼：讓潛在學生看到你的成果，他們會主動來找你。'
          },
          {
            id: 'w3-3',
            task: '持續拍影片（本週至少1支）',
            description: '💡 為什麼：持續曝光，學生才會記得你。不用每支都爆紅，持續就贏了。'
          }
        ],
        reflection: [
          '請學生轉介紹時，你怎麼開口的？學生反應如何？',
          '哪些學生最願意幫你轉介紹？為什麼？',
          '分享案例後，有人主動來找你嗎？',
          '你覺得自己在「主動開發」這件事上進步了嗎？'
        ]
      },
      {
        week: 4,
        title: '第四週：檢視你的成果',
        goal: '看看這個月你變強了多少',
        tasks: [
          {
            id: 'w4-1',
            task: '檢視本月數據',
            description: '💡 為什麼：看到自己的進步會很有成就感，而且知道下個月要改善什麼。'
          },
          {
            id: 'w4-2',
            task: '優化最弱的一環',
            description: '💡 為什麼：補強弱點比加強優點更有效。一次改善一件事就好。'
          },
          {
            id: 'w4-3',
            task: '設定下個月目標',
            description: '💡 為什麼：有目標才知道要往哪走。不用太高，達成比完美更重要。'
          }
        ],
        reflection: [
          '這30天，你最大的成長是什麼？',
          '哪個任務對你幫助最大？為什麼？',
          '你發現了自己的什麼優勢和弱點？',
          '下個月，你想重點改善什麼？',
          '你找到自己的風格了嗎？'
        ]
      }
    ]
  },
  intermediate: {
    level: 'intermediate',
    title: '⚡ 進階成長地圖 - 30天系統化計畫',
    description: '你已經上手了，現在要建立自己的系統。這不是考核，是讓你更輕鬆的方法。',
    endGoal: [
      '✓ 完整的數據追蹤系統',
      '✓ 所有流程自動化',
      '✓ 穩定的內容產出策略',
      '✓ 學生數達到20-30位',
      '✓ 準備好選擇專業方向'
    ],
    weeks: [
      {
        week: 1,
        title: '第一週：建立你的數據系統',
        goal: '用數據看清楚學生的狀況',
        tasks: [
          {
            id: 'i1-1',
            task: '建立完整的學生追蹤系統',
            description: '💡 為什麼：知道每個學生的狀況，你就能提前預防續約問題。系統化追蹤讓你看起來超專業。'
          },
          {
            id: 'i1-2',
            task: '每週數據回顧和分析',
            description: '💡 為什麼：定期回顧才能發現問題，提前介入比事後補救容易太多。'
          },
          {
            id: 'i1-3',
            task: '預測下個月續約狀況',
            description: '💡 為什麼：提前知道誰可能不續約，你就有時間改善關係，續約率會大幅提升。'
          }
        ]
      },
      {
        week: 2,
        title: '第二週：讓系統自動運轉',
        goal: '把重複的事情變成自動的',
        tasks: [
          {
            id: 'i2-1',
            task: '所有訊息使用範本庫',
            description: '💡 為什麼：每天省下30分鐘想訊息的時間，可以拿來做更重要的事。去「救命錦囊」找範本。'
          },
          {
            id: 'i2-2',
            task: '固定時間處理固定事項',
            description: '💡 為什麼：固定時間做固定的事，大腦不用一直切換，效率至少提升50%。'
          },
          {
            id: 'i2-3',
            task: '建立內容素材庫',
            description: '💡 為什麼：不用每次拍影片都從零開始想，有素材庫就像有武器庫，隨時可以出擊。'
          }
        ]
      },
      {
        week: 3,
        title: '第三週：優化你的內容策略',
        goal: '做更少，但更有效的內容',
        tasks: [
          {
            id: 'i3-1',
            task: '分析哪類內容最有效',
            description: '💡 為什麼：專注做有效的內容，不要浪費時間做沒人看的東西。數據會告訴你答案。'
          },
          {
            id: 'i3-2',
            task: '建立內容日曆',
            description: '💡 為什麼：提前規劃好，不用每天想「今天要拍什麼」，壓力直接減半。'
          },
          {
            id: 'i3-3',
            task: '嘗試一種新內容形式',
            description: '💡 為什麼：新形式可能帶來新的學生來源，不試試看怎麼知道哪種最適合你？'
          }
        ]
      },
      {
        week: 4,
        title: '第四週：規劃你的下一步',
        goal: '選擇你想深化的方向',
        tasks: [
          {
            id: 'i4-1',
            task: '回顧30天成果',
            description: '💡 為什麼：看到自己建立的系統在運作，會很有成就感。而且知道下一步要往哪走。'
          },
          {
            id: 'i4-2',
            task: '選擇一條專業路徑',
            description: '💡 為什麼：專注一個方向會比什麼都做一點更快成長。選你最有興趣的就對了。'
          },
          {
            id: 'i4-3',
            task: '設定3個月目標',
            description: '💡 為什麼：有明確目標才知道要往哪走。3個月後回頭看，你會驚訝自己的成長。'
          }
        ]
      }
    ]
  }
};

export function getThirtyDayPlan(level: 'beginner' | 'intermediate'): ThirtyDayPlan {
  return thirtyDayPlans[level];
}
