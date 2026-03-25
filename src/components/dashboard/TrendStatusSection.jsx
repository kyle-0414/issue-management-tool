import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TrendChart from '../charts/TrendChart';
import StatusChart from '../charts/StatusChart';

const TrendStatusSection = ({ showInsights, comments, issues }) => {
  const [viewMode, setViewMode] = useState('cumulative');

  const createdCount = issues.length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
  const closedCount = issues.filter(i => i.status === 'Closed').length;
  const gap = createdCount - resolvedCount;

  return (
    <section id="section-charts" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">2. ISSUE RESOLUTION FLOW</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h4 className="text-lg font-bold text-slate-800">Created vs Resolved vs Closed</h4>
          </div>

          <div className="flex items-center gap-8">
            {/* 시안 기반 다크 테마 토글 */}
            <div className="flex p-1 bg-slate-100/80 rounded-lg border border-slate-200/50">
              <button
                onClick={() => setViewMode('cumulative')}
                className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${viewMode === 'cumulative' ? 'bg-[#0f172a] text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Cumulative
              </button>
              <button
                onClick={() => setViewMode('daily')}
                className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${viewMode === 'daily' ? 'bg-[#0f172a] text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Daily
              </button>
            </div>

            <div className="flex flex-col items-end min-w-[90px]">
              <span className="text-[10px] font-bold text-slate-400 leading-none mb-1">
                {viewMode === 'cumulative' ? 'Unresolved Gap' : 'Daily Gap'}
              </span>
              <span className="text-2xl font-black text-slate-900 leading-none tracking-tighter">
                {gap}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[350px]">
          <TrendChart viewMode={viewMode} issues={issues} />
        </div>

        {/* 시안 기반 커스텀 범례 (모서리 곡률 적용) */}
        <div className="mt-4 flex justify-center gap-8 border-t border-slate-50 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-rose-500 shadow-sm shadow-rose-100"></span>
            <span className="text-[13px] font-bold text-slate-600">Created ({createdCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-blue-500 shadow-sm shadow-blue-100"></span>
            <span className="text-[13px] font-bold text-slate-600">Resolved ({resolvedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-emerald-500 shadow-sm shadow-emerald-100"></span>
            <span className="text-[13px] font-bold text-slate-600">Closed ({closedCount})</span>
          </div>
        </div>

        {showInsights && (
          <div className="absolute bottom-4 right-4 z-20 animate-fadeIn transition-all">
            <div className="bg-slate-900/95 text-white p-5 rounded-2xl shadow-2xl backdrop-blur w-[280px] md:w-[320px] border border-white/10">
              <p className="text-amber-400 font-black text-xs mb-2 flex items-center gap-2 border-b border-white/10 pb-2 uppercase tracking-widest">
                <Search size={14} /> 핵심 Insight: 대응 처리 지연
              </p>
              <p className="text-[11px] opacity-90 font-medium leading-relaxed mt-2">
                개발 수정 건 대비 QA 대응 처리가 늦어지고 있습니다. 수정 이슈에 대해 빠르게 대응하도록 하겠습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendStatusSection;