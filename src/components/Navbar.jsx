import React from 'react';
import { Radio, BookOpen, Presentation, Sliders, RotateCcw, Moon, Sun } from 'lucide-react';
import { PRESENTATION_INFO } from '../data/topicsData';

export default function Navbar({ activeView, setActiveView, onReplayIntro, isDark, onToggleDark }) {
  const navItems = [
    { id: 'topics', label: 'Topics Explorer', icon: BookOpen, color: 'hover:bg-[#fde047]' },
    { id: 'presentation', label: 'Slide Mode', icon: Presentation, color: 'hover:bg-[#bae6fd]' },
    { id: 'lab', label: 'Waveform Lab', icon: Sliders, color: 'hover:bg-[#bbf7d0]' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#131622] border-b-[3px] border-black text-black dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand & Subject details */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-[#fde047] neo-border neo-shadow-sm flex items-center justify-center flex-shrink-0">
              <Radio className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-black dark:text-white uppercase tracking-tight truncate">
                  {PRESENTATION_INFO.subject}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-black bg-[#fde047] text-black neo-border uppercase">
                  {PRESENTATION_INFO.unit}
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-400 truncate">
                Presented by <span className="text-black bg-[#bae6fd] px-1 neo-border">Muhammed Rayees</span> & <span className="text-black bg-[#fce7f3] px-1 neo-border">Abdulla Aziyan C K</span>
              </p>
            </div>
          </div>

          {/* Navigation modes & Actions */}
          <nav className="flex items-center gap-2">
            <div className="flex gap-1.5 p-1 bg-[#f7f4eb] dark:bg-[#0d0f18] neo-border rounded-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#fde047] text-black neo-border neo-shadow-sm'
                        : `bg-white dark:bg-[#1c2032] text-black dark:text-white border border-black/40 ${item.color} dark:hover:bg-[#2a304a] hover:border-black`
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Replay Intro button */}
            <button
              onClick={onReplayIntro}
              title="Replay Title / Intro Screen"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fed7aa] dark:bg-[#3d2714] hover:bg-[#fdba74] dark:hover:bg-[#4d321c] text-black dark:text-[#fed7aa] neo-btn rounded text-xs uppercase font-black"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden lg:inline">Title Slide</span>
            </button>

            {/* Dark Mode Switch Button */}
            <button
              onClick={onToggleDark}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark mode"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-black uppercase neo-btn transition-colors ${
                isDark
                  ? 'bg-[#18181b] text-[#facc15] hover:bg-[#27272a]'
                  : 'bg-[#fef08a] text-black hover:bg-[#fde047]'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 stroke-[2.5] text-[#facc15]" />
                  <span className="hidden md:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 stroke-[2.5] text-black" />
                  <span className="hidden md:inline">Dark</span>
                </>
              )}
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
}
