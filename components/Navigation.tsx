'use client';

import { useState } from 'react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: '首頁', icon: '🏠' },
  { id: 'daily', label: '每日清單', icon: '✅' },
  { id: 'score', label: '自我評分', icon: '📊' },
  { id: 'goals', label: '目標追蹤', icon: '🎯' },
  { id: 'diagnosis', label: '狀態診斷', icon: '🔍' },
  { id: 'frameworks', label: '實戰工具', icon: '⚡' },
  { id: 'videos', label: '影片主題', icon: '🎬' },
  { id: 'messages', label: '訊息範本', icon: '💬' },
  { id: 'resources', label: '資源', icon: '📚' },
  { id: 'mindset', label: '成長心法', icon: '💡' },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    // Scroll to top smoothly when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center flex-wrap gap-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-7 py-4 rounded-xl font-outfit font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100 hover:-translate-y-0.5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3">
            <span className="font-outfit font-bold text-gray-900">
              {navItems.find(item => item.id === activeSection)?.label || '選單'}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="pb-3 space-y-1 animate-fade-in">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-outfit font-semibold text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
