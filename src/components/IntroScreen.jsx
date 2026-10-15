import React, { useState, useEffect, useCallback } from 'react';
import { Radio, Play, Pause, ArrowRight, Sparkles, UserCheck, Zap } from 'lucide-react';
import { PRESENTATION_INFO } from '../data/topicsData';

export default function IntroScreen({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    if (isPaused || isExiting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            handleExit();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isExiting, handleExit]);

  const progressPercentage = ((5 - timeLeft) / 5) * 100;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden transition-all duration-500 ease-in-out intro-bg ${
        isExiting
          ? 'opacity-0 scale-95 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Neo-brutalist floating sticker accents */}
      <div className="absolute top-8 left-8 hidden md:block">
        <div className="px-3 py-1.5 bg-[#fde047] dark:bg-yellow-400 text-black neo-border neo-shadow-sm font-black text-xs uppercase -rotate-6">
          ⚡ Semester 7 ECE / CSE
        </div>
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="px-3 py-1.5 bg-[#86efac] dark:bg-emerald-400 text-black neo-border neo-shadow-sm font-black text-xs uppercase rotate-6">
          📻 8 Core Syllabus Topics
        </div>
      </div>
      <div className="absolute top-12 right-12 hidden md:block">
        <div className="w-8 h-8 rounded-full bg-[#f472b6] dark:bg-pink-500 text-black neo-border neo-shadow-sm flex items-center justify-center font-black text-xs">
          ★
        </div>
      </div>

      {/* Main Neo-Brutalist Presentation Title Card */}
      <div className="relative z-10 max-w-3xl w-full bg-white dark:bg-[#141827] text-black dark:text-white neo-border-thick dark:border-slate-700 neo-shadow-xl rounded-2xl p-6 sm:p-10 text-center flex flex-col items-center">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white neo-border text-xs font-black uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-black dark:text-white" />
            Lecture Presentation
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fed7aa] dark:bg-[#9a3412] text-black dark:text-white neo-border text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
            {PRESENTATION_INFO.academicYear}
          </span>
        </div>

        {/* Giant Subject Name */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight uppercase leading-none my-3">
          {PRESENTATION_INFO.subject}
        </h1>

        {/* Unit 1 Pill Badge */}
        <div className="inline-block px-5 py-2 my-2 bg-[#fde047] dark:bg-yellow-400 neo-border neo-shadow text-black font-black text-xl sm:text-2xl uppercase tracking-wide rotate-[-1deg]">
          {PRESENTATION_INFO.unit}
        </div>

        {/* Divider bar */}
        <div className="w-full h-1 bg-black dark:bg-slate-700 my-5" />

        {/* Presenters Box */}
        <div className="w-full max-w-xl bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 neo-shadow-sm rounded-xl p-4 sm:p-5 mb-6 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-black dark:text-yellow-400 fill-[#facc15]" />
            <span className="text-xs font-black uppercase tracking-widest text-black dark:text-slate-200">
              Presented by
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESENTATION_INFO.presenters.map((pres, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg neo-border dark:border-slate-700 flex items-center gap-3 transition-transform hover:-translate-y-0.5 ${
                  idx === 0
                    ? 'bg-[#e0f2fe] dark:bg-[#132238]'
                    : 'bg-[#fce7f3] dark:bg-[#281324]'
                }`}
              >
                <div className="w-9 h-9 rounded-md bg-white dark:bg-[#1a233b] text-black dark:text-white neo-border dark:border-slate-700 flex items-center justify-center font-bold flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-black dark:text-white leading-snug">
                    {pres.name}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {pres.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topics preview ticker */}
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-6 max-w-lg">
          8 Topics: Wireless Tech • Antennas • Propagation • Mobile Fading • Signal Encoding • Dig→Analog • Analog→Analog • Analog→Digital
        </p>

        {/* Countdown & Progress bar */}
        <div className="w-full max-w-md flex flex-col items-center gap-3">
          <div className="w-full bg-[#f1ebd8] dark:bg-[#1f263d] neo-border dark:border-slate-700 rounded-full h-4 overflow-hidden p-0.5">
            <div
              className="bg-[#22c55e] h-full rounded-full transition-all duration-1000 ease-linear border-r border-black dark:border-slate-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-xs font-bold text-slate-800 dark:text-slate-200 px-1">
            <span>
              {isPaused ? (
                <span className="text-[#b45309] dark:text-yellow-400 font-black uppercase">⏸ Timer Paused</span>
              ) : (
                <>Opening topics in <strong className="text-black bg-[#fde047] dark:bg-yellow-400 px-1.5 py-0.5 neo-border text-xs">{timeLeft}s</strong></>
              )}
            </span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-[#1a233b] text-black dark:text-white neo-border dark:border-slate-700 neo-shadow-sm hover:bg-[#fef9c3] dark:hover:bg-slate-700 transition-colors cursor-pointer text-xs font-bold"
            >
              {isPaused ? <Play className="w-3 h-3 text-black dark:text-white fill-black dark:fill-white" /> : <Pause className="w-3 h-3 text-black dark:text-white fill-black dark:fill-white" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          {/* Enter Button */}
          <button
            onClick={handleExit}
            className="group mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#fde047] hover:bg-[#facc15] dark:bg-yellow-400 dark:hover:bg-yellow-300 text-black neo-btn text-sm uppercase tracking-wide"
          >
            <span>Enter Lecture & Explore Topics</span>
            <ArrowRight className="w-4 h-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}
