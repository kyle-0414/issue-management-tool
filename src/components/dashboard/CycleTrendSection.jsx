import React from 'react';
import { Filter } from 'lucide-react';
import CycleChart from '../charts/CycleChart';

const CycleTrendSection = ({ showInsights, comments }) => {
  return (
    <section id="section-cycle" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">3. Cycle Trend Analysis (차수별 품질 변화)</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-slate-800">Cycle-over-Cycle Quality Improvement</h4>
          <p className="text-sm text-slate-500">1차(전수) → 2차(변경점) → 3차(회귀) → 4차(Ad-hoc) 흐름 분석</p>
        </div>

        <div className="h-[350px]">
          <CycleChart />
        </div>

        {showInsights && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-indigo-900/90 text-white p-4 rounded-xl shadow-lg backdrop-blur z-20 max-w-lg text-center animate-fadeIn">
            <p className="font-bold text-sm mb-2 flex items-center justify-center gap-2">
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