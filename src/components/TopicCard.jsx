import React from 'react';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

export default function TopicCard({ topic, onSelect, isSelected }) {
  // Pastel badge colors per topic for that vibrant neo-brutalist pop
  const cardAccents = [
    'bg-[#fde047]', // 1. Yellow
    'bg-[#bae6fd]', // 2. Sky Blue
    'bg-[#bbf7d0]', // 3. Mint Green
    'bg-[#fbcfe8]', // 4. Pink
    'bg-[#fed7aa]', // 5. Orange
    'bg-[#e9d5ff]', // 6. Purple
    'bg-[#99f6e4]', // 7. Teal
    'bg-[#fef08a]'  // 8. Lemon
  ];
  const accentColor = cardAccents[(topic.number - 1) % cardAccents.length];

  return (
    <div
      onClick={() => onSelect(topic.number - 1)}
      className={`group relative rounded-xl p-5 transition-all duration-150 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-[#fffbeb] dark:bg-[#22283e] neo-border-thick shadow-[6px_6px_0px_0px_#000000] translate-x-1 translate-y-1'
          : 'bg-white dark:bg-[#151827] text-black dark:text-white neo-border-thick neo-shadow hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000000]'
      }`}
    >
      {/* Top Meta */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded ${accentColor} neo-border text-black font-black flex items-center justify-center text-sm shadow-[1.5px_1.5px_0px_0px_#000]`}>
              #{topic.number}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-black uppercase bg-[#f1ebd8] dark:bg-[#202538] text-black dark:text-white neo-border">
              {topic.category}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#1e2336] px-2 py-0.5 neo-border">
            <Clock className="w-3 h-3 stroke-[2.5]" />
            {topic.duration}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base sm:text-lg font-black text-black dark:text-white group-hover:text-indigo-600 dark:group-hover:text-amber-400 transition-colors mb-1.5 leading-snug">
          {topic.title}
        </h3>
        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {topic.tagline}
        </p>

        {/* Core Subtopics / Concepts list preview */}
        <div className="space-y-1.5 mb-5 border-t-2 border-black dark:border-slate-700 pt-3">
          {topic.keyConcepts.slice(0, 3).map((concept, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className="w-2 h-2 bg-black dark:bg-[#fde047] mt-1 flex-shrink-0" />
              <span className="line-clamp-1">{concept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action footer */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-black dark:border-slate-700 text-xs font-black">
        <span className="flex items-center gap-1.5 text-black dark:text-slate-200 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
          Study Topic
        </span>
        <div className={`w-8 h-8 rounded ${accentColor} neo-border flex items-center justify-center text-black group-hover:translate-x-0.5 transition-transform shadow-[2px_2px_0px_0px_#000]`}>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    </div>
  );
}
