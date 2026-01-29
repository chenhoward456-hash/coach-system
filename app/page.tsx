'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import TaskSection from '@/components/TaskSection';
import ScoreCalculator from '@/components/ScoreCalculator';
import DiagnosisTool from '@/components/DiagnosisTool';
import MindsetSection from '@/components/MindsetSection';
import ResourcesSection from '@/components/ResourcesSection';
import ProgressDashboard from '@/components/ProgressDashboard';
import GoalTracker from '@/components/GoalTracker';
import VideoLibrary from '@/components/VideoLibrary';
import MessageLibrary from '@/components/MessageLibrary';
import AdminDashboard from '@/components/AdminDashboard';
import ThirtyDayPlanStandalone from '@/components/ThirtyDayPlanStandalone';
import BackToTop from '@/components/BackToTop';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  // ESC 鍵返回首頁
  useKeyboardShortcuts(() => {
    if (activeSection !== 'home') {
      setActiveSection('home');
    }
  });

  return (
    <main className="min-h-screen">
      <Header />
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {activeSection === 'home' && <HomePage onNavigate={setActiveSection} />}
        {activeSection === 'diagnosis' && <DiagnosisTool onBack={() => setActiveSection('home')} />}
        {activeSection === 'plan-beginner' && <ThirtyDayPlanStandalone level="beginner" onBack={() => setActiveSection('home')} />}
        {activeSection === 'plan-intermediate' && <ThirtyDayPlanStandalone level="intermediate" onBack={() => setActiveSection('home')} />}
        {activeSection === 'videos' && <VideoLibrary onBack={() => setActiveSection('home')} />}
        {activeSection === 'messages' && <MessageLibrary onBack={() => setActiveSection('home')} />}
        {activeSection === 'resources' && <ResourcesSection onBack={() => setActiveSection('home')} />}
        {activeSection === 'mindset' && <MindsetSection onBack={() => setActiveSection('home')} />}
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Cool Day Fitness 北屯館 - 教練培訓系統
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with 💪 by Howard
          </p>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}
