import React from 'react';
import SlideDiagram from './SlideDiagram';
import ModulationLab from './ModulationLab';

// One slide of a topic deck: header plus body. Shared by the topic page and presentation mode.
export default function SlideContent({ topic, slide }) {
  const isTopic1 = topic.number === 1;
  return (
    <>
      {/* Slide Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b-2 border-black dark:border-slate-700">
        <div>
          <span className={`inline-block px-3 py-1 ${slide.accent} text-black neo-border text-xs font-black uppercase mb-2`}>
            {slide.badge}
          </span>
          <h3 className="text-xl sm:text-3xl font-black text-black dark:text-white uppercase tracking-tight">
            {slide.title}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 mt-1">
            {slide.subtitle}
          </p>
        </div>
        <div className="hidden sm:block">
          <span className="w-12 h-12 rounded-xl bg-[#fde047] dark:bg-yellow-400 text-black neo-border flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_#000]">
            #{slide.number}
          </span>
        </div>
      </div>

      {/* Slide 1: Definition */}
      {isTopic1 && slide.number === 1 && (
        <div className="space-y-6">
          <div className="space-y-3">
            {slide.points.map((pt, idx) => (
              <div key={idx} className="p-4 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex items-start gap-3 shadow-[2px_2px_0px_0px_#000]">
                <span className="w-6 h-6 rounded bg-[#bae6fd] dark:bg-[#0284c7] text-black dark:text-white neo-border dark:border-slate-700 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-200 leading-relaxed">
                  {pt}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded-xl">
            <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 mb-3">
              Everyday Examples of Wireless Communication:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slide.examples.map((ex, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-[#0d101a] neo-border dark:border-slate-700 rounded-lg text-center font-black text-xs text-black dark:text-slate-200 shadow-[2px_2px_0px_0px_#000]">
                  ⚡ {ex}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide 2: Basic Principle & Working */}
      {isTopic1 && slide.number === 2 && (
        <div className="space-y-6">
          <div className="p-4 bg-[#fef08a] dark:bg-[#182035] neo-border dark:border-slate-700 rounded-xl text-sm font-black text-black dark:text-slate-200 leading-relaxed">
            💡 {slide.summary}
          </div>

          {slide.diagram && <SlideDiagram name={slide.diagram} />}

          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider">
              5-Step Signal Transmission Flow:
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {slide.steps.map((st, idx) => (
                <div key={idx} className="p-3.5 bg-[#faf8f5] dark:bg-[#0c0f1a] hover:bg-[#e0f2fe] dark:hover:bg-[#152038] neo-border dark:border-slate-700 rounded-xl flex items-center justify-between gap-4 transition-colors shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-[#fde047] dark:bg-yellow-400 text-black neo-border flex items-center justify-center font-black text-sm flex-shrink-0">
                      {st.step}
                    </span>
                    <div>
                      <span className="font-black text-sm text-black dark:text-white block">
                        {st.title}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-400">
                        {st.desc}
                      </span>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-xs font-black bg-white dark:bg-[#182035] text-black dark:text-slate-300 px-2 py-0.5 neo-border dark:border-slate-700">
                    Step 0{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide 3: Components */}
      {isTopic1 && slide.number === 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {slide.components.map((comp, idx) => (
            <div key={idx} className="p-5 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex flex-col justify-between shadow-[3px_3px_0px_0px_#000]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-black text-black dark:text-white uppercase">
                    {comp.name}
                  </h4>
                  <span className="w-6 h-6 rounded bg-[#bbf7d0] dark:bg-[#15803d] text-black dark:text-white neo-border flex items-center justify-center font-black text-xs">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300 leading-relaxed">
                  {comp.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide 4: Types of Wireless Comm */}
      {isTopic1 && slide.number === 4 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {slide.types.map((type, idx) => (
            <div key={idx} className="p-4 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex flex-col justify-between shadow-[2px_2px_0px_0px_#000]">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-black text-black dark:text-white">
                    {idx + 1}. {type.name}
                  </h4>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-300 leading-relaxed mb-3">
                  {type.desc}
                </p>
              </div>
              <div className="p-2 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded text-[11px] font-black text-black dark:text-slate-200">
                <span className="text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] block">Example:</span>
                {type.example}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide 5: Types of Wireless Networks */}
      {isTopic1 && slide.number === 5 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {slide.networks.map((net, idx) => (
            <div key={idx} className="p-5 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex flex-col justify-between shadow-[3px_3px_0px_0px_#000]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#e9d5ff] dark:bg-[#581c87] text-black dark:text-purple-200 neo-border dark:border-slate-700 font-black text-sm uppercase">
                    {net.code}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#182035] px-2 py-0.5 neo-border dark:border-slate-700">
                    Scale #{idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-1">
                  {net.name}
                </h4>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">
                  <strong>Coverage:</strong> {net.scope}
                </p>
              </div>
              <div className="p-2.5 bg-white dark:bg-[#182035] neo-border dark:border-slate-700 text-xs font-black text-black dark:text-slate-200">
                <span className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] block">Standard Example:</span>
                {net.example}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide 6: Applications */}
      {isTopic1 && slide.number === 6 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {slide.applications.map((app, idx) => (
            <div key={idx} className="p-4 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex items-start gap-3 shadow-[2px_2px_0px_0px_#000]">
              <span className="w-6 h-6 rounded bg-[#fbcfe8] dark:bg-[#9d174d] text-black dark:text-white neo-border dark:border-slate-700 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h4 className="text-sm font-black text-black dark:text-white mb-0.5">
                  {app.title}
                </h4>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                  {app.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Generic slide body (Topic 2 onwards) */}
      {!isTopic1 && <GenericSlideBody slide={slide} />}
    </>
  );
}

// Renders whichever fields a slide provides: definition, diagram, lab, topImage, points, steps, facts, pros/cons, items, types, image, notes, table, formula, example
function GenericSlideBody({ slide }) {
  return (
    <div className="space-y-6">
      {slide.definition && (
        <div className="p-4 bg-[#fef08a] dark:bg-[#182035] neo-border dark:border-slate-700 rounded-xl text-sm sm:text-base font-black text-black dark:text-slate-200 leading-relaxed">
          <span className="text-[10px] uppercase tracking-wider block text-slate-700 dark:text-slate-400 mb-1">Definition</span>
          {slide.definition}
        </div>
      )}

      {slide.diagram && [].concat(slide.diagram).map((name) => <SlideDiagram key={name} name={name} />)}

      {slide.lab && <ModulationLab name={slide.lab} />}

      {slide.topImage && (
        <div className="p-4 bg-white neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000] flex justify-center">
          <img src={slide.topImage.src} alt={slide.topImage.alt} loading="lazy" className="max-w-full h-auto object-contain" />
        </div>
      )}

      {slide.points && (
        <div className="space-y-3">
          {slide.pointsLabel && (
            <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider">
              {slide.pointsLabel}:
            </h4>
          )}
          {slide.points.map((pt, idx) => (
            <div key={idx} className="p-4 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex items-start gap-3 shadow-[2px_2px_0px_0px_#000]">
              <span className="w-6 h-6 rounded bg-[#bae6fd] dark:bg-[#0284c7] text-black dark:text-white neo-border dark:border-slate-700 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-200 leading-relaxed">
                {pt}
              </p>
            </div>
          ))}
        </div>
      )}

      {slide.steps && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider">
            {slide.stepsLabel || 'Working Principle'}:
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {slide.steps.map((st, idx) => (
              <div key={idx} className="p-3.5 bg-[#faf8f5] dark:bg-[#0c0f1a] hover:bg-[#e0f2fe] dark:hover:bg-[#152038] neo-border dark:border-slate-700 rounded-xl flex items-center justify-between gap-4 transition-colors shadow-[2px_2px_0px_0px_#000]">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded bg-[#fde047] dark:bg-yellow-400 text-black neo-border flex items-center justify-center font-black text-sm flex-shrink-0">
                    {st.step}
                  </span>
                  <div>
                    <span className="font-black text-sm text-black dark:text-white block">
                      {st.title}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-400">
                      {st.desc}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs font-black bg-white dark:bg-[#182035] text-black dark:text-slate-300 px-2 py-0.5 neo-border dark:border-slate-700">
                  Step 0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {slide.facts && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {slide.facts.frequency && (
            <div className="p-4 bg-[#e0f2fe] dark:bg-[#132238] neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000]">
              <span className="text-[10px] uppercase font-black text-slate-600 dark:text-slate-400 block mb-1">📶 Frequency</span>
              <p className="text-sm font-bold text-black dark:text-slate-200 leading-relaxed">{slide.facts.frequency}</p>
            </div>
          )}
          {slide.facts.applications && (
            <div className={`p-4 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000] ${slide.facts.frequency ? '' : 'sm:col-span-2'}`}>
              <span className="text-[10px] uppercase font-black text-slate-600 dark:text-slate-400 block mb-1">📡 Applications</span>
              <p className="text-sm font-bold text-black dark:text-slate-200 leading-relaxed">{slide.facts.applications}</p>
            </div>
          )}
        </div>
      )}

      {(slide.pros || slide.cons) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Advantages', list: slide.pros, mark: '✓', bg: 'bg-[#dcfce7] dark:bg-[#0f2a1a]' },
            { label: 'Disadvantages', list: slide.cons, mark: '✕', bg: 'bg-[#fee2e2] dark:bg-[#2a1215]' }
          ].filter((col) => col.list).map((col) => (
            <div key={col.label} className={`p-4 ${col.bg} neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000]`}>
              <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider mb-2">
                {col.label}:
              </h4>
              <ul className="space-y-1.5">
                {col.list.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm font-bold text-slate-900 dark:text-slate-200 leading-relaxed">
                    <span className="font-black flex-shrink-0">{col.mark}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {slide.items && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {slide.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex flex-col justify-between shadow-[2px_2px_0px_0px_#000]">
              <div>
                {item.image && (
                  <div className="mb-3 h-40 bg-white neo-border dark:border-slate-700 rounded-lg flex items-center justify-center overflow-hidden p-2">
                    <img src={item.image} alt={item.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
                <h4 className="text-sm font-black text-black dark:text-white mb-1.5">
                  {idx + 1}. {item.name}
                </h4>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-300 leading-relaxed mb-3">
                  {item.desc}
                </p>
              </div>
              <div className="p-2 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded text-[11px] font-black text-black dark:text-slate-200">
                <span className="text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] block">Used in:</span>
                {item.example}
              </div>
            </div>
          ))}
        </div>
      )}

      {slide.types && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider">
            {slide.typesLabel || 'Types'}:
          </h4>
          <div className={`grid grid-cols-1 gap-4 ${slide.types.length === 2 || slide.types.length === 4 ? 'sm:grid-cols-2' : slide.types.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
            {slide.types.map((type, idx) => (
              <div key={idx} className="p-5 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl shadow-[3px_3px_0px_0px_#000]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-black text-black dark:text-white uppercase">
                    {type.name}
                  </h4>
                  <span className={`w-6 h-6 rounded ${slide.accent} text-black neo-border flex items-center justify-center font-black text-xs`}>
                    {idx + 1}
                  </span>
                </div>
                {type.desc && (
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300 leading-relaxed">
                    {type.desc}
                  </p>
                )}
                {type.example && (
                  <div className="mt-3 p-2 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded text-[11px] font-black text-black dark:text-slate-200">
                    <span className="text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] block">{slide.typeExampleLabel || 'Used in'}:</span>
                    {type.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {slide.image && (
        <div className="p-4 bg-white neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000] flex justify-center">
          <img src={slide.image.src} alt={slide.image.alt} loading="lazy" className="max-w-full h-auto object-contain" />
        </div>
      )}

      {slide.notes && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider">
            {slide.notesLabel || 'Notes'}:
          </h4>
          {slide.notes.map((note, idx) => (
            <div key={idx} className="p-3.5 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl flex items-start gap-3 shadow-[2px_2px_0px_0px_#000]">
              <span className="text-base flex-shrink-0">💡</span>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-200 leading-relaxed">
                {note}
              </p>
            </div>
          ))}
        </div>
      )}

      {slide.table && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 tracking-wider">
            {slide.table.label}:
          </h4>
          <div className="overflow-x-auto neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000]">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className={`${slide.accent} text-black`}>
                <tr>
                  {slide.table.headers.map((h, idx) => (
                    <th key={idx} className="px-3 py-2 font-black uppercase border-b-2 border-black">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="bg-white dark:bg-[#0c0f1a] even:bg-[#faf8f5] dark:even:bg-[#111525]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-3 py-2 border-t border-black/20 dark:border-slate-700 text-black dark:text-slate-200 ${cIdx === row.length - 1 ? 'font-black' : 'font-bold'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {slide.formula && [].concat(slide.formula).map((formula, fIdx) => (
        <div key={fIdx} className="p-5 bg-white dark:bg-[#0c0f1a] neo-border-thick dark:border-slate-700 rounded-xl shadow-[3px_3px_0px_0px_#000]">
          <span className="text-xs font-black text-black bg-[#fed7aa] dark:bg-[#9a3412] dark:text-white px-2 py-0.5 neo-border dark:border-slate-700 uppercase tracking-wider">
            {formula.label || 'Formula'}
          </span>
          <div className="p-4 bg-[#fef9c3] dark:bg-[#080b14] neo-border dark:border-slate-700 font-mono text-center text-lg sm:text-2xl font-black text-black dark:text-yellow-300 my-4 shadow-[2px_2px_0px_0px_#000] overflow-x-auto">
            {formula.expr}
          </div>
          {formula.where && (
            <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 space-y-1">
              <span className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 block">Where:</span>
              {formula.where.map((w, idx) => (
                <p key={idx} className="font-mono">• {w}</p>
              ))}
            </div>
          )}
          {formula.note && (
            <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">{formula.note}</p>
          )}
        </div>
      ))}

      {(slide.examples || slide.example) && (
        <div className="p-5 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 rounded-xl">
          <h4 className="text-xs font-black uppercase text-black dark:text-slate-200 mb-3">
            Example:
          </h4>
          {slide.example && (
            <p className="text-sm font-bold text-black dark:text-slate-200 leading-relaxed">
              {slide.example}
            </p>
          )}
          {slide.examples && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slide.examples.map((ex, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-[#0d101a] neo-border dark:border-slate-700 rounded-lg text-center font-black text-xs text-black dark:text-slate-200 shadow-[2px_2px_0px_0px_#000]">
                  📡 {ex}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
