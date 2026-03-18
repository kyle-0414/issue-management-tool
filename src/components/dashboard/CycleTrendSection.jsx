import React from 'react';
import { Filter } from 'lucide-react';
import CycleChart from '../charts/CycleChart';
import StatusChart from '../charts/StatusChart';

const CycleTrendSection = ({ showInsights, comments }) => {
  return (
    <section id="section-cycle" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">4. CYCLE TREND ANALYSIS</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      {/* Execution Status (Full Width) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative flex flex-col mb-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h4 className="text-xl font-bold text-slate-800">Execution Status (Current)</h4>
            <p className="text-sm text-slate-500 font-medium">Total 1,000 Cases | Sprint 24 Cycle 4</p>
          </div>
          <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            Real-time Update
          </div>
        </div>

        <div className="h-[280px] flex items-center justify-center mb-10">
          <div className="w-[280px] h-[280px]">
            <StatusChart />
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Passed
            </span>
            <span className="text-sm font-black text-slate-700">850 <span className="text-[11px] text-emerald-600">(85%)</span></span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Failed
            </span>
            <span className="text-sm font-black text-slate-700">125 <span className="text-[11px] text-red-600">(12.5%)</span></span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Blocked
            </span>
            <span className="text-sm font-black text-slate-700">25 <span className="text-[11px] text-amber-600">(2.5%)</span></span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 opacity-60 grayscale transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Not Run
            </span>
            <span className="text-sm font-black text-slate-700">0 <span className="text-[11px] text-slate-400">(0%)</span></span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 opacity-60 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> NA
            </span>
            <span className="text-sm font-black text-slate-700">20 <span className="text-[11px] text-slate-400">(2%)</span></span>
          </div>
        </div>

        {showInsights && (
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-10 text-center z-20 animate-fadeIn pointer-events-none">
            <div className="bg-slate-900/95 text-white p-5 rounded-2xl shadow-2xl inline-block max-w-sm pointer-events-auto border border-white/10 backdrop-blur">
              <p className="text-xs font-bold mb-1 border-b border-white/20 pb-2 text-amber-400 tracking-wider">"Blocked에 주목하세요!"</p>
              <div className="text-[10px] mt-3 opacity-90 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: comments?.blocked?.replace(/"/g, '') }} />
            </div>
          </div>
        )}
      </div>

      {/* Cycle Trend Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-slate-800">Cycle-over-Cycle Quality Improvement</h4>
          <p className="text-sm text-slate-500">1차(전수) → 2차(변경점) → 3차(회귀) → 4차(Ad-hoc) 흐름 분석</p>
        </div>

        <div className="h-[350px]">
          <CycleChart />
        </div>

        {showInsights && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-indigo-900/95 text-white p-5 rounded-2xl shadow-2xl backdrop-blur z-20 max-w-xl text-center animate-fadeIn border border-indigo-700/50">
            <p className="font-bold text-sm mb-2 flex items-center justify-center gap-2 text-indigo-200">
              <Filter size={16} /> Kyle의 검증 전략 (Funnel Model)
            </p>
            <div className="text-xs opacity-90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: comments?.cycleStrategy?.replace(/"/g, '').replace('Critical Bug가 0으로 수렴', '<span class="text-yellow-300 font-bold">Critical Bug가 0으로 수렴</span>') }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default CycleTrendSection;