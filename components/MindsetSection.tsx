import BackButton from '@/components/BackButton';

interface MindsetSectionProps {
  onBack?: () => void;
}

export default function MindsetSection({ onBack }: MindsetSectionProps) {
  return (
    <div className="animate-fade-in">
      {onBack && <BackButton onBack={onBack} />}
      
      <h2 className="font-outfit text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
        成長心法
      </h2>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        當你迷惘時，看這裡
      </p>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border-l-4 border-primary">
        <h3 className="font-outfit text-2xl font-bold mb-3">💡 這個章節是什麼？</h3>
        <p className="text-gray-700 mb-2">
          這是 Howard 寫給所有年輕教練的「心法指南」。
        </p>
        <p className="text-gray-700 mb-4">
          給那些感到迷惘，不知道「往哪裡走」的教練
        </p>
      </div>

      <h3 className="font-outfit text-3xl font-bold mb-6 mt-12">
        年輕教練最常遇到的5個迷惘
      </h3>

      <div className="space-y-6">
        {/* 迷惘 1 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">😕</span>
            <h4 className="font-outfit text-2xl font-bold text-gray-900">
              迷惘 1：「我不知道自己要往哪裡走」
            </h4>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-warning">
            <h5 className="font-bold text-lg mb-3">🔍 症狀</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>每天都在做事，但不知道為什麼做</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>看到別人有目標，自己卻沒有</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>不知道3年後的自己會在哪裡</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-6 border-l-4 border-success">
            <h5 className="font-bold text-lg mb-3">💊 解方：找到你的「北極星」</h5>
            <p className="text-gray-700 mb-4">
              <strong>先問自己3個問題：</strong>
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-700">
              <li><strong>我為什麼當教練？</strong>（不要說「喜歡運動」，要更深入）</li>
              <li><strong>我想成為什麼樣的教練？</strong>（技術流？溝通流？網紅流？）</li>
              <li><strong>3年後，我想過什麼樣的生活？</strong>（具體一點）</li>
            </ol>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary">
            <h5 className="font-bold text-lg mb-3">📝 立刻行動</h5>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>今晚拿出紙筆，認真回答上面3個問題（30分鐘）</li>
              <li>這週找 Howard 聊聊你的答案</li>
              <li>根據答案，設定你的6個月目標</li>
            </ol>
          </div>
        </div>

        {/* 迷惘 2 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">😰</span>
            <h4 className="font-outfit text-2xl font-bold text-gray-900">
              迷惘 2：「我覺得自己不夠好」
            </h4>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-warning">
            <h5 className="font-bold text-lg mb-3">🔍 症狀（冒牌者症候群）</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>覺得自己什麼都不會，不敢開始</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>看到別人都很厲害，自己很爛</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>一直拖延，因為「還沒準備好」</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-6 border-l-4 border-success">
            <h5 className="font-bold text-lg mb-3">💊 解方：接受「不完美」，開始「刻意練習」</h5>
            <p className="text-red-600 font-bold text-xl mb-4">
              真相炸彈：你永遠不會「準備好」。
            </p>
            <p className="text-gray-700 mb-2">
              Howard 第一支影片也拍得很爛。差別在於他拍了，然後越來越好。
            </p>
            <p className="text-gray-900 font-bold text-lg mt-4">
              Done is better than perfect.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary">
            <h5 className="font-bold text-lg mb-3">📝 立刻行動</h5>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>今天就拍一支影片，不管好不好（10分鐘）</li>
              <li>找一個「比你資深3個月」的前輩，問他怎麼開始的</li>
              <li>每週只改善1件事，不要一次改10件</li>
            </ol>
          </div>
        </div>

        {/* 迷惘 3 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🤔</span>
            <h4 className="font-outfit text-2xl font-bold text-gray-900">
              迷惘 3：「我不知道為什麼要做這些事」
            </h4>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-warning">
            <h5 className="font-bold text-lg mb-3">🔍 症狀</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>拍影片覺得沒用</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>課後關心覺得很假</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>記錄進步覺得麻煩</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-6 border-l-4 border-success">
            <h5 className="font-bold text-lg mb-3">💊 解方：理解「Why」</h5>
            <div className="space-y-3 text-gray-700">
              <p><strong>拍影片 = 投資未來的自己</strong>（專業形象、個人品牌、持續學習）</p>
              <p><strong>課後關心 = 建立信任</strong>（續約靠關係不是技術）</p>
              <p><strong>記錄進步 = 做對的事</strong>（專業和隨便的差別）</p>
              <p className="font-bold text-gray-900 mt-4">
                你不是在「完成 KPI」，你是在「投資未來」。
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary">
            <h5 className="font-bold text-lg mb-3">📝 立刻行動</h5>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>每次做一件事之前，先問「這對我的未來有什麼幫助？」</li>
              <li>如果答不出來，來問 Howard</li>
              <li>重新思考你做這些事的意義</li>
            </ol>
          </div>
        </div>

        {/* 迷惘 4 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">😔</span>
            <h4 className="font-outfit text-2xl font-bold text-gray-900">
              迷惘 4：「我做了很多，但沒看到結果」
            </h4>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-warning">
            <h5 className="font-bold text-lg mb-3">🔍 症狀</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>已經努力了一段時間，但續約率還是低</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>會員還是流失</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>開始懷疑「是不是我不適合」</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-6 border-l-4 border-success">
            <h5 className="font-bold text-lg mb-3">💊 解方：理解「複利效應」</h5>
            <p className="text-red-600 font-bold text-xl mb-4">
              成長不是線性的，是指數型的。
            </p>
            <p className="text-gray-700 mb-3">
              前3個月看起來沒用，但其實是在「累積」。第4-6個月會突然爆發，因為「信任到了臨界點」。
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Howard 的HTR：</strong>前6個月只有3個客戶，第7個月來了15個。
            </p>
            <p className="text-success font-bold text-lg">
              堅持，就是在等那個臨界點。
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary">
            <h5 className="font-bold text-lg mb-3">📝 立刻行動</h5>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>給自己至少6個月，不要1-2個月沒效果就放棄</li>
              <li>記錄過程，每週寫下你做了什麼</li>
              <li>慶祝小進步：續約率從18%→20%也是進步！</li>
            </ol>
          </div>
        </div>

        {/* 迷惘 5 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔥</span>
            <h4 className="font-outfit text-2xl font-bold text-gray-900">
              迷惘 5：「我沒有動力了」
            </h4>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 mb-6 border-l-4 border-warning">
            <h5 className="font-bold text-lg mb-3">🔍 症狀</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>覺得無聊、不想做事</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>開始擺爛</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">•</span>
                <span>忘記為什麼開始、沒看到進步、一直在舒適圈、或孤軍奮戰</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-6 border-l-4 border-success">
            <h5 className="font-bold text-lg mb-3">💊 解方：重新找回「意義感」</h5>
            <p className="text-gray-700 mb-3"><strong>可能的原因：</strong></p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>忘記為什麼開始 → 重新思考你的北極星</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>沒看到進步 → 做成長紀錄（3個月前 vs 現在）</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>一直在舒適圈 → 給自己一個挑戰</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>孤軍奮戰 → 找同行夥伴一起努力</span>
              </li>
            </ul>
            <p className="text-gray-900 font-bold">
              如果真的累了，休息1週也沒關係。但要設定「回來的日期」。
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-primary">
            <h5 className="font-bold text-lg mb-3">📝 立刻行動</h5>
            <ol className="space-y-2 list-decimal list-inside text-gray-700">
              <li>誠實面對：我為什麼沒動力？（寫下來）</li>
              <li>根據原因，選擇對應的解方</li>
              <li>找一個人聊聊（Howard、前輩、同事）</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Howard 的真心話 */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-2xl p-8 mt-12 shadow-xl">
        <h3 className="font-outfit text-2xl font-bold mb-6">💪 Howard 的真心話</h3>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>我知道當教練不容易。</p>
          <p>要拍影片、要關心會員、要持續學習、要面對客訴、要擔心續約率...</p>
          <p>有時候會覺得「為什麼這麼累」。</p>
          <p className="text-warning font-bold text-xl pt-4">
            但我想告訴你：你現在做的每一件小事，都在為未來的你鋪路。
          </p>
          <p>每一支影片，都在累積你的品牌。</p>
          <p>每一次關心，都在建立你的信任。</p>
          <p>每一次學習，都在提升你的價值。</p>
          <p className="text-success font-bold text-xl pt-4">你也可以。</p>
          <p>給自己6個月。</p>
          <p>相信複利。</p>
          <p>持續做對的事。</p>
          <p>臨界點一定會來。</p>
          <p className="pt-4">迷惘很正常。</p>
          <p>但不要停下來。</p>
          <p className="text-white font-bold text-2xl pt-6">
            加油，未來的你會感謝現在的自己。
          </p>
        </div>
      </div>

      {/* 需要幫助 */}
      <div className="bg-green-50 rounded-2xl p-6 mt-8 border-l-4 border-success">
        <h4 className="font-bold text-xl mb-3">🆘 需要幫助？</h4>
        <p className="text-gray-700 mb-3"><strong>如果你遇到這些迷惘，隨時可以：</strong></p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>找 Howard 一對一聊聊（30分鐘）</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>找你的導師聊聊</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>在團隊分享會提出來</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>跟資深教練請教</span>
          </li>
        </ul>
        <p className="text-gray-900 font-bold mt-4">
          不要一個人悶著。說出來，就會好很多。
        </p>
      </div>
    </div>
  );
}
