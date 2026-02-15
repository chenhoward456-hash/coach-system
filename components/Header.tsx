interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome = true }: HeaderProps) {
  if (!isHome) {
    return (
      <header className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-4 px-8 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <span className="text-2xl">💪</span>
          <h1 className="font-outfit text-xl font-bold tracking-tight">
            Cool Day Fitness 北屯館
          </h1>
          <span className="text-sm opacity-75">教練培訓系統</span>
        </div>
      </header>
    );
  }

  return (
    <header className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-16 px-8 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,102,255,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,107,53,0.15)_0%,transparent_50%)] animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-6xl mb-4 inline-block animate-bounce-slow">💪</div>
        <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
          Cool Day Fitness 北屯館
        </h1>
        <p className="text-xl md:text-2xl font-semibold opacity-100">
          教練培訓系統 - 從新手到專業的完整路徑
        </p>
      </div>
    </header>
  );
}
