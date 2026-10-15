import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Maximize, Minimize, FileText, ChevronLeft, ChevronRight, User, Radio, CheckCircle2 } from 'lucide-react';
import { TOPICS, PRESENTATION_INFO } from '../data/topicsData';
import SlideContent from './SlideContent';

// Position in the deck: topic -1 = title slide, 0..7 = topic slides, TOPICS.length = conclusion.
const TITLE = -1;
const END = TOPICS.length;

export default function SlidePresentation({ initialTopicIndex = 0, onClose }) {
  const [pos, setPos] = useState({ t: initialTopicIndex, s: 0 });
  const [chapterPopup, setChapterPopup] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const topic = pos.t >= 0 && pos.t < END ? TOPICS[pos.t] : null;
  const slides = topic ? topic.slides : [];
  const slide = topic ? slides[pos.s] : null;
  const isLastSlide = topic && pos.s === slides.length - 1;
  const nextTopic = topic && pos.t + 1 < END ? TOPICS[pos.t + 1] : null;

  const goTo = (t, s = 0) => {
    setChapterPopup(false);
    setPos({ t, s });
  };

  const nextChapter = () => goTo(pos.t + 1, 0);

  const next = () => {
    if (chapterPopup) return nextChapter();
    if (pos.t === TITLE) return goTo(0, 0);
    if (!topic) return;
    if (pos.s < slides.length - 1) return goTo(pos.t, pos.s + 1);
    setChapterPopup(true);
  };

  const prev = () => {
    if (chapterPopup) return setChapterPopup(false);
    if (pos.t === END) return goTo(END - 1, TOPICS[END - 1].slides.length - 1);
    if (!topic) return;
    if (pos.s > 0) return goTo(pos.t, pos.s - 1);
    if (pos.t > 0) return goTo(pos.t - 1, TOPICS[pos.t - 1].slides.length - 1);
    goTo(TITLE);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Let sliders, dropdowns and focused buttons keep their own keyboard behaviour
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      if (e.key === ' ' && tag === 'BUTTON') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || (e.key === 'Enter' && chapterPopup)) {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Escape') {
        if (chapterPopup) setChapterPopup(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const atStart = pos.t === TITLE;
  const atEnd = pos.t === END;

  return (
    <div className="fixed inset-0 z-50 bg-[#f7f4eb] dark:bg-[#0b0d14] text-black dark:text-white flex flex-col justify-between overflow-hidden select-none">

      {/* Top Slide Control Header */}
      <header className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 bg-white dark:bg-[#121524] border-b-2 border-black dark:border-slate-700 text-xs font-black">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 neo-btn rounded"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>Exit Slides</span>
          </button>
          <span className="text-black dark:text-slate-500 hidden lg:inline">|</span>
          <span className="text-black dark:text-slate-300 uppercase hidden lg:inline">
            {PRESENTATION_INFO.subject} • {PRESENTATION_INFO.unit}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={pos.t}
            onChange={(e) => goTo(Number(e.target.value))}
            className="bg-[#fef08a] dark:bg-[#1a2035] neo-border dark:border-slate-700 font-bold text-black dark:text-white text-xs rounded px-2.5 py-1.5 focus:outline-none max-w-[180px] sm:max-w-none"
          >
            <option value={TITLE}>Title Slide</option>
            {TOPICS.map((t, idx) => (
              <option key={t.id} value={idx}>
                Topic {t.number}: {t.shortTitle}
              </option>
            ))}
            <option value={END}>Conclusion & Q&A</option>
          </select>

          {topic && (
            <span className="text-black dark:text-white font-mono font-black px-2 hidden sm:inline">
              Slide {pos.s + 1} / {slides.length}
            </span>
          )}

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-2.5 py-1.5 neo-btn rounded text-xs flex items-center gap-1 ${
              showNotes
                ? 'bg-[#fde047] dark:bg-yellow-400 text-black'
                : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
            }`}
            title="Toggle Speaker Notes"
          >
            <FileText className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden md:inline">Notes</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 neo-btn bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 rounded"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4 stroke-[2.5]" /> : <Maximize className="w-4 h-4 stroke-[2.5]" />}
          </button>
        </div>
      </header>

      {/* Main Slide Stage (keyed so each slide starts scrolled to the top) */}
      <main key={`${pos.t}-${pos.s}`} className="flex-1 overflow-y-auto p-4 sm:p-8">
        {/* TITLE SLIDE */}
        {atStart && (
          <div className="min-h-full flex items-center justify-center">
            <div className="text-center max-w-4xl py-12 px-6 sm:px-12 bg-white dark:bg-[#141827] text-black dark:text-white neo-border-thick dark:border-slate-700 neo-shadow-xl rounded-2xl animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white neo-border dark:border-slate-700 text-xs font-black uppercase tracking-widest mb-6">
                <Radio className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                ECE / CSE • Semester 7
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white tracking-tight uppercase leading-none mb-4">
                {PRESENTATION_INFO.subject}
              </h1>
              <div className="inline-block px-6 py-2 bg-[#fde047] dark:bg-yellow-400 neo-border neo-shadow text-black font-black text-2xl uppercase mb-8 rotate-[-1deg]">
                {PRESENTATION_INFO.unit}
              </div>

              <div className="w-full h-1 bg-black dark:bg-slate-700 my-6" />

              <div className="max-w-md mx-auto bg-[#faf8f5] dark:bg-[#0c0f1a] p-5 rounded-xl neo-border dark:border-slate-700 mb-8">
                <p className="text-xs uppercase tracking-widest text-black dark:text-slate-300 font-black mb-3">
                  Presented by
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm font-black text-black dark:text-white">
                  <div className="p-3 bg-[#e0f2fe] dark:bg-[#132238] rounded neo-border dark:border-slate-700">
                    Muhammed Rayees
                  </div>
                  <div className="p-3 bg-[#fce7f3] dark:bg-[#281324] rounded neo-border dark:border-slate-700">
                    Abdulla Aziyan C K
                  </div>
                </div>
              </div>

              <button
                onClick={next}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#fde047] hover:bg-[#facc15] dark:bg-yellow-400 dark:hover:bg-yellow-300 text-black neo-btn font-black text-sm uppercase tracking-wide"
              >
                <span>Begin Presentation</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* TOPIC SLIDES */}
        {topic && slide && (
          <div className="max-w-6xl mx-auto animate-fadeIn">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-black dark:bg-yellow-400 text-white dark:text-black text-xs font-black uppercase tracking-wider">
                Topic {topic.number} of {TOPICS.length}
              </span>
              <span className="text-sm font-black uppercase text-black dark:text-white">{topic.title}</span>
            </div>
            <div className="bg-white dark:bg-[#141827] text-black dark:text-white neo-border-thick dark:border-slate-700 neo-shadow-xl rounded-2xl p-6 sm:p-10">
              <SlideContent topic={topic} slide={slide} />
            </div>
          </div>
        )}

        {/* CONCLUSION & Q&A */}
        {atEnd && (
          <div className="min-h-full flex items-center justify-center">
            <div className="text-center max-w-3xl py-12 px-6 bg-white dark:bg-[#141827] text-black dark:text-white neo-border-thick dark:border-slate-700 neo-shadow-xl rounded-2xl animate-fadeIn">
              <span className="px-4 py-1.5 rounded bg-[#bbf7d0] dark:bg-[#15803d] text-black dark:text-white neo-border dark:border-slate-700 text-xs font-black uppercase tracking-widest mb-6 inline-block">
                Unit 1 Complete
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white uppercase mb-4">
                Thank You! Any Questions?
              </h2>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                We have covered the foundational 8 topics of Wireless Communication Networks — from antennas and propagation to fading channels, signal encoding, digital and analog modulation, and PCM.
              </p>

              <div className="p-5 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl max-w-md mx-auto mb-8 text-left text-xs space-y-2">
                <div className="font-black text-black dark:text-slate-200 uppercase tracking-wider">Presenters:</div>
                <div className="flex items-center gap-2 text-black dark:text-white font-black">
                  <User className="w-4 h-4 stroke-[2.5]" /> Muhammed Rayees
                </div>
                <div className="flex items-center gap-2 text-black dark:text-white font-black">
                  <User className="w-4 h-4 stroke-[2.5]" /> Abdulla Aziyan C K
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => goTo(TITLE)}
                  className="px-5 py-2.5 bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 neo-btn text-xs font-black uppercase"
                >
                  Restart Slides
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#fde047] dark:bg-yellow-400 text-black neo-btn text-xs font-black uppercase"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* NEXT CHAPTER POPUP (shown after the last slide of a topic) */}
      {chapterPopup && topic && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setChapterPopup(false)}>
          <div
            className="w-full max-w-lg bg-white dark:bg-[#141827] text-black dark:text-white neo-border-thick dark:border-slate-700 neo-shadow-xl rounded-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#16a34a] stroke-[2.5]" />
              <span className="text-xs font-black uppercase tracking-wider">
                Topic {topic.number} complete — {topic.title}
              </span>
            </div>

            {nextTopic ? (
              <div className="p-4 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded-xl mb-6">
                <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 block mb-1">Up next</span>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                  Topic {nextTopic.number}: {nextTopic.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1">{nextTopic.tagline}</p>
              </div>
            ) : (
              <div className="p-4 bg-[#dcfce7] dark:bg-[#0f2a1a] neo-border dark:border-slate-700 rounded-xl mb-6">
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">All {TOPICS.length} topics covered!</h3>
                <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-1">Continue to the conclusion and Q&A.</p>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => setChapterPopup(false)}
                className="px-4 py-2.5 bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 neo-btn text-xs font-black uppercase"
              >
                Stay on this slide
              </button>
              <button
                autoFocus
                onClick={nextChapter}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fde047] dark:bg-yellow-400 text-black neo-btn text-xs font-black uppercase"
              >
                {nextTopic ? 'Next Chapter' : 'Finish'}
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-4 text-right">
              Press → or Enter to continue, ← or Esc to stay
            </p>
          </div>
        </div>
      )}

      {/* Presenter Speaker Notes Drawer (Sticky Note Style) */}
      {showNotes && topic && topic.examTips.length > 0 && (
        <div className="bg-[#fef08a] dark:bg-[#182035] border-t-2 border-black dark:border-slate-700 px-6 py-3 max-h-40 overflow-y-auto">
          <div className="max-w-5xl mx-auto flex items-start gap-4 text-xs font-bold text-black dark:text-slate-200">
            <span className="font-black uppercase tracking-wider flex items-center gap-1 flex-shrink-0 bg-black dark:bg-yellow-400 text-white dark:text-black px-2 py-0.5">
              <FileText className="w-3.5 h-3.5" /> Presenter Notes:
            </span>
            <div className="space-y-1">
              {topic.examTips.map((tip, idx) => (
                <p key={idx}>• {tip}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Toolbar */}
      <footer className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white dark:bg-[#121524] border-t-2 border-black dark:border-slate-700 text-xs font-black">
        <button
          onClick={prev}
          disabled={atStart}
          className={`flex items-center gap-1.5 px-4 py-2 rounded neo-btn uppercase ${
            atStart
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-300 dark:border-slate-700 cursor-not-allowed shadow-none'
              : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" />
          <span>Previous</span>
        </button>

        {/* Slide dots for the current topic */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goTo(pos.t, idx)}
              className={`h-3 rounded transition-all cursor-pointer neo-border dark:border-slate-700 flex-shrink-0 ${
                pos.s === idx
                  ? 'w-7 bg-[#fde047] dark:bg-yellow-400'
                  : 'w-3 bg-white dark:bg-[#1a2035] hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={s.title}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={atEnd}
          className={`flex items-center gap-1.5 px-4 py-2 rounded neo-btn uppercase ${
            atEnd
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-300 dark:border-slate-700 cursor-not-allowed shadow-none'
              : 'bg-[#fde047] dark:bg-yellow-400 text-black cursor-pointer'
          }`}
        >
          <span>{isLastSlide ? (nextTopic ? 'Next Chapter' : 'Finish') : 'Next'}</span>
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </footer>
    </div>
  );
}
