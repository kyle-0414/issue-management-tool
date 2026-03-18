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
        <div className="mb-4">
          <h4 className="text-lg font-bold text-slate-800">Execution Status (Current)</h4>
          <p className="text-sm text-slate-500">Total 1,000 Cases</p>
        </div>
        <div className="h-[250px] flex items-center justify-center">
          <StatusChart />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Passed
            </span>
            <span className="font-bold text-slate-700">850 (85%)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Failed
            </span>
            <span className="font-bold text-red-600">125 (12.5%)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-100">
            <span className="flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Blocked
            </span>
            <span className="font-bold text-amber-600">25 (2.5%)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg grayscale opacity-50">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Not Run
            </span>
            <span className="font-bold text-slate-500">0 (0%)</span>
          </div>
        </div>

        {showInsights && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-10 text-center z-20 animate-fadeIn pointer-events-none">
            <div className="bg-slate-800 text-white p-4 rounded-xl shadow-2xl inline-block max-w-sm pointer-events-auto">
              <p className="text-xs font-bold mb-1 border-b border-white/20 pb-1">"Blocked에 주목하세요!"</p>
              <div className="text-[10px] mt-2 opacity-90 leading-relaxed" dangerouslySetInnerHTML={{ __html: comments?.blocked?.replace(/"/g, '') }} />
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