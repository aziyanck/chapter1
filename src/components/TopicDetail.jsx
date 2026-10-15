import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Presentation, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import TopicVisuals from './TopicVisuals';
import SlideContent from './SlideContent';

export default function TopicDetail({ topic, onBack, onNext, onPrev, hasNext, hasPrev, onLaunchSlides }) {
  // Slide navigator for topics that have a slide deck
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const hasSlides = topic.slides && topic.slides.length > 0;
  const isTopic1 = topic.number === 1 && hasSlides;
  const currentSlide = hasSlides ? topic.slides[currentSlideIndex] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn text-black dark:text-slate-100">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black dark:border-slate-700">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 neo-btn text-xs font-black uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          Back to 8 Topics
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onLaunchSlides}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#fde047] hover:bg-[#facc15] dark:bg-yellow-400 dark:hover:bg-yellow-300 text-black neo-btn text-xs font-black uppercase tracking-wider"
          >
            <Presentation className="w-4 h-4 stroke-[2.5]" />
            <span>Present in Slides</span>
          </button>

          <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a2035] p-1 neo-border dark:border-slate-700 neo-shadow-sm">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`p-1.5 rounded text-xs font-bold ${
                hasPrev
                  ? 'text-black dark:text-white hover:bg-[#fde047] dark:hover:bg-slate-700 cursor-pointer'
                  : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
              title="Previous Topic"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <span className="text-xs px-2 text-black dark:text-white font-black font-mono">
              {topic.number} / 8
            </span>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`p-1.5 rounded text-xs font-bold ${
                hasNext
                  ? 'text-black dark:text-white hover:bg-[#fde047] dark:hover:bg-slate-700 cursor-pointer'
                  : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
              title="Next Topic"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#fef08a] dark:bg-[#171c2c] neo-border-thick dark:border-slate-700 neo-shadow-lg rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden transition-colors">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-black dark:bg-yellow-400 text-white dark:text-black text-xs font-black uppercase tracking-wider">
              Topic {topic.number} of 8
            </span>
            <span className="px-3 py-1 bg-white dark:bg-[#0f121d] text-black dark:text-white neo-border dark:border-slate-700 text-xs font-black uppercase">
              {topic.category}
            </span>
            {hasSlides && (
              <span className="px-3 py-1 bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white neo-border dark:border-slate-700 text-xs font-black uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Slide Deck ({topic.slides.length} Sections)
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white mb-2 uppercase tracking-tight">
            {topic.title}
          </h2>
          <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-300 max-w-3xl leading-relaxed">
            {topic.tagline}
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SLIDE DECK VIEW (Topic 1 custom layouts, Topic 2+ generic layout) */}
      {/* ===================================================================== */}
      {hasSlides && currentSlide && (
        <div className="space-y-6">
          {/* Slide Progress / Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#141827] p-3 neo-border-thick dark:border-slate-700 neo-shadow rounded-xl">
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
              {topic.slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`px-3 py-1.5 rounded text-xs font-black uppercase transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-[#faf8f5] dark:bg-[#0c0f1a] text-slate-700 dark:text-slate-300 hover:bg-[#f1ebd8] dark:hover:bg-slate-800 border border-black/40 dark:border-slate-700'
                  }`}
                >
                  {idx + 1}. {s.badge}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black bg-[#f1ebd8] dark:bg-[#0c0f1a] text-black dark:text-slate-200 px-2.5 py-1 neo-border dark:border-slate-700">
                Slide {currentSlideIndex + 1} / {topic.slides.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className={`p-1.5 rounded neo-btn ${
                    currentSlideIndex === 0
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
                  }`}
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(topic.slides.length - 1, prev + 1))}
                  disabled={currentSlideIndex === topic.slides.length - 1}
                  className={`p-1.5 rounded neo-btn ${
                    currentSlideIndex === topic.slides.length - 1
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                      : 'bg-[#fde047] dark:bg-yellow-400 text-black'
                  }`}
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Slide Stage Card */}
          <div className="bg-white dark:bg-[#141827] text-black dark:text-white neo-border-thick dark:border-slate-700 neo-shadow-xl rounded-2xl p-6 sm:p-10 transition-all">
            <SlideContent topic={topic} slide={currentSlide} />

            {/* Slide Footer Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-black dark:border-slate-700">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 neo-btn text-xs font-black uppercase rounded ${
                  currentSlideIndex === 0
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                    : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4 stroke-[3]" />
                Previous Section
              </button>

              <div className="flex items-center gap-1.5">
                {topic.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded transition-all neo-border dark:border-slate-700 cursor-pointer ${
                      currentSlideIndex === idx
                        ? 'w-6 bg-[#fde047] dark:bg-yellow-400'
                        : 'w-2.5 bg-white dark:bg-[#1a2035]'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(topic.slides.length - 1, prev + 1))}
                disabled={currentSlideIndex === topic.slides.length - 1}
                className={`flex items-center gap-1.5 px-4 py-2 neo-btn text-xs font-black uppercase rounded ${
                  currentSlideIndex === topic.slides.length - 1
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                    : 'bg-[#fde047] dark:bg-yellow-400 text-black'
                }`}
              >
                Next Section
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Interactive Visualizer */}
          {topic.interactiveVisual !== false && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                {isTopic1 ? 'Interactive Visual Architecture (Transmitter ➔ Channel ➔ Receiver)' : 'Interactive Visual Explorer'}
              </h4>
            </div>
            <TopicVisuals topicNumber={topic.number} />
          </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOPICS WITHOUT A SLIDE DECK: DEFAULT VIEW */}
      {/* ===================================================================== */}
      {!hasSlides && (
        <div className="space-y-6">
          <TopicVisuals topicNumber={topic.number} />

          {/* Key Concepts Recap under visuals */}
          <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow">
            <h4 className="text-sm font-black uppercase tracking-wider text-black dark:text-white mb-4 flex items-center gap-2">
              Key Concept Takeaways
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topic.keyConcepts.map((concept, idx) => (
                <div key={idx} className="p-3 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 text-xs font-bold text-black dark:text-slate-200 flex items-start gap-2.5">
                  <span className="w-5 h-5 bg-[#fde047] dark:bg-yellow-400 text-black neo-border flex items-center justify-center font-black text-[11px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulas if present */}
          {topic.formulas && topic.formulas.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {topic.formulas.map((form, idx) => (
                <div key={idx} className="bg-white dark:bg-[#141827] neo-border-thick dark:border-slate-700 neo-shadow rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-black bg-[#fed7aa] dark:bg-[#9a3412] dark:text-white px-2 py-0.5 neo-border dark:border-slate-700 uppercase tracking-wider">
                      Formula #{idx + 1}
                    </span>
                    <h4 className="text-base font-black text-black dark:text-white mt-2 mb-3">
                      {form.name}
                    </h4>
                    <div className="p-4 bg-[#fef9c3] dark:bg-[#080b14] neo-border dark:border-slate-700 font-mono text-center text-lg font-black text-black dark:text-yellow-300 my-3 shadow-[2px_2px_0px_0px_#000] overflow-x-auto">
                      {form.latex}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-400 leading-relaxed mt-2 pt-2 border-t-2 border-black dark:border-slate-700">
                    {form.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Pager */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t-2 border-black dark:border-slate-700">
        {hasPrev ? (
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700 neo-btn text-xs font-black uppercase"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            Previous Topic
          </button>
        ) : (
          <div />
        )}

        {hasNext ? (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 bg-[#fde047] dark:bg-yellow-400 text-black neo-btn text-xs font-black uppercase"
          >
            Next Topic
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        ) : (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#86efac] dark:bg-emerald-400 text-black neo-btn text-xs font-black uppercase"
          >
            All 8 Topics Completed ➔ Return to Portal
          </button>
        )}
      </div>
    </div>
  );
}
