import React, { useState, useEffect } from 'react';
import { TOPICS, PRESENTATION_INFO } from './data/topicsData';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import TopicCard from './components/TopicCard';
import TopicDetail from './components/TopicDetail';
import SlidePresentation from './components/SlidePresentation';
import WaveformLab from './components/WaveformLab';
import { Radio, Presentation, Sliders, Zap } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeView, setActiveView] = useState('topics');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
      {/* 1. Intro Splash Screen */}
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => {
          setActiveView(view);
          if (view === 'topics') setSelectedTopicIndex(null);
        }}
        onReplayIntro={() => setShowIntro(true)}
        isDark={isDark}
        onToggleDark={toggleDarkMode}
      />

      {/* 3. Main View Router */}
      <div className="flex-1">
        {/* Full Slide Presentation Mode */}
        {activeView === 'presentation' && (
          <SlidePresentation
            // from a topic page open that topic; otherwise start on the title slide (-1)
            initialTopicIndex={selectedTopicIndex !== null ? selectedTopicIndex : -1}
            onClose={() => setActiveView('topics')}
          />
        )}

        {/* Waveform Oscilloscope Lab */}
        {activeView === 'lab' && <WaveformLab />}

        {/* Topics Explorer */}
        {activeView === 'topics' && (
          <>
            {selectedTopicIndex !== null ? (
              /* Topic Detail Deep Dive */
              <TopicDetail
                key={TOPICS[selectedTopicIndex].id}
                topic={TOPICS[selectedTopicIndex]}
                onBack={() => setSelectedTopicIndex(null)}
                onNext={() => setSelectedTopicIndex((prev) => Math.min(TOPICS.length - 1, prev + 1))}
                onPrev={() => setSelectedTopicIndex((prev) => Math.max(0, prev - 1))}
                hasNext={selectedTopicIndex < TOPICS.length - 1}
                hasPrev={selectedTopicIndex > 0}
                onLaunchSlides={() => setActiveView('presentation')}
              />
            ) : (
              /* Main Topics Grid View */
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
                
                {/* Hero Banner */}
                <div className="relative rounded-2xl p-6 sm:p-10 neo-border-thick neo-shadow-lg bg-[#fef08a] dark:bg-[#151827] text-black dark:text-white transition-colors">
                  <div className="relative z-10 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#202538] text-black dark:text-white neo-border text-xs font-black uppercase">
                        <Radio className="w-3.5 h-3.5 stroke-[2.5]" />
                        Teaching Platform
                      </span>
                      <span className="px-3 py-1 bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white neo-border text-xs font-black uppercase">
                        {PRESENTATION_INFO.unit}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight uppercase leading-none mb-3">
                      {PRESENTATION_INFO.subject}
                    </h2>
                    
                    <p className="text-xs sm:text-base font-bold text-slate-800 dark:text-slate-300 leading-relaxed mb-6">
                      Explore the foundational 8 syllabus topics with interactive waveform simulators, electromagnetic radiation patterns, channel fading mechanics, and modulation analysis.
                    </p>

                    {/* Presenters Sticker Box */}
                    <div className="inline-flex flex-wrap items-center gap-2 p-2 bg-white dark:bg-[#0e101a] neo-border text-xs font-bold mb-6">
                      <span className="text-black dark:text-white uppercase font-black px-1 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-[#facc15]" />
                        Presented by:
                      </span>
                      <span className="px-2.5 py-1 bg-[#dbeafe] dark:bg-[#1e3a8a] text-black dark:text-white font-black neo-border">
                        Muhammed Rayees
                      </span>
                      <span className="px-2.5 py-1 bg-[#fce7f3] dark:bg-[#831843] text-black dark:text-white font-black neo-border">
                        Abdulla Aziyan C K
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveView('presentation')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-[#fde047] text-white dark:text-black neo-btn text-xs font-black uppercase hover:bg-slate-900 dark:hover:bg-[#facc15]"
                      >
                        <Presentation className="w-4 h-4 stroke-[2.5]" />
                        <span>Launch Slide Deck</span>
                      </button>
                      <button
                        onClick={() => setActiveView('lab')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#bbf7d0] dark:bg-[#065f46] hover:bg-[#86efac] dark:hover:bg-[#047857] text-black dark:text-white neo-btn text-xs font-black uppercase"
                      >
                        <Sliders className="w-4 h-4 stroke-[2.5]" />
                        <span>Waveform Oscilloscope Lab</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between pb-2 border-b-2 border-black dark:border-slate-700">
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-black dark:text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#fde047] neo-border inline-block" />
                    Unit 1 Topics (8 Modules)
                  </h3>
                  <span className="text-xs font-black uppercase px-2.5 py-1 bg-white dark:bg-[#171a29] text-black dark:text-white neo-border">
                    Full Syllabus
                  </span>
                </div>

                {/* 8 Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {TOPICS.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      topic={topic}
                      onSelect={(index) => setSelectedTopicIndex(index)}
                      isSelected={false}
                    />
                  ))}
                </div>
              </main>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-black bg-white dark:bg-[#18181b] dark:text-slate-100 py-6 text-center text-xs font-black transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="uppercase">
            <strong>{PRESENTATION_INFO.subject}</strong> • {PRESENTATION_INFO.unit}
          </div>
          <div>
            Presented by: <span className="bg-[#bae6fd] text-black px-1 neo-border">Muhammed Rayees</span> & <span className="bg-[#fce7f3] text-black px-1 neo-border">Abdulla Aziyan C K</span>
          </div>
          <div className="text-slate-700 dark:text-slate-400">
            {PRESENTATION_INFO.academicYear}
          </div>
        </div>
      </footer>
    </div>
  );
}
