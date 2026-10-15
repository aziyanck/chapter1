import React, { useState } from 'react';
import { CheckSquare, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { EXAM_CHECKLIST } from '../data/topicsData';

export default function ExamChecklist() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = EXAM_CHECKLIST.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const resetAll = () => {
    setCheckedItems({});
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn text-black">
      
      {/* Top Header & Progress */}
      <div className="bg-[#fef08a] neo-border-thick neo-shadow-lg rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-black neo-border text-xs font-black uppercase mb-2">
              <CheckSquare className="w-3.5 h-3.5 stroke-[2.5]" />
              Syllabus Study & Viva Tracker
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight">
              Exam Preparation Checklist
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
              Mark off key subtopics, diagrams, and derivations as you study for your semester exam.
            </p>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-black neo-btn text-xs font-black uppercase"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Reset Progress</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black uppercase">
            <span>
              Revision Progress: <strong className="bg-white px-2 py-0.5 neo-border">{completedCount}</strong> of <strong>{totalCount}</strong> Completed
            </span>
            <span className="bg-black text-white px-2 py-0.5 font-mono text-xs">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full bg-[#f1ebd8] neo-border rounded-full h-4 overflow-hidden p-0.5">
            <div
              className="h-full bg-[#22c55e] border-r-2 border-black rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-3">
        {EXAM_CHECKLIST.map((item, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`p-4 rounded-xl neo-border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isDone
                  ? 'bg-[#dcfce7] shadow-[2px_2px_0px_0px_#000] translate-x-1'
                  : 'bg-white hover:bg-[#faf8f5] shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-6 h-6 rounded neo-border flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${
                    isDone
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-[#faf8f5]'
                  }`}
                >
                  {isDone && <CheckCircle className="w-4 h-4 text-black stroke-[3]" />}
                </div>
                <div>
                  <span className="inline-block text-[10px] font-black px-2 py-0.5 bg-[#fef08a] text-black neo-border uppercase mb-1">
                    {item.topic}
                  </span>
                  <p className={`text-xs sm:text-sm font-bold ${isDone ? 'line-through text-slate-500' : 'text-black'}`}>
                    {item.item}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-black text-slate-600 flex-shrink-0 bg-[#f1ebd8] px-2 py-0.5 neo-border">
                #{idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Recommended Strategy Box */}
      <div className="mt-8 p-5 bg-white neo-border-thick neo-shadow rounded-xl flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-black fill-[#facc15] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-black space-y-1">
          <strong className="text-sm font-black uppercase block">Exam Strategy Advice:</strong>
          <p className="font-bold text-slate-800">
            Prepare each topic in this order: <strong>Definition</strong> ➔ <strong>Working principle</strong> ➔ <strong>Types / Classifications</strong> ➔ <strong>Neat labelled diagram</strong> ➔ <strong>Comparison table</strong> ➔ <strong>Formulas and numerical problems</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
