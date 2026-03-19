import React, { useState } from 'react';
import { Search } from 'lucide-react';
import TrendChart from '../charts/TrendChart';
import StatusChart from '../charts/StatusChart';

const TrendStatusSection = ({ showInsights, comments }) => {
  const [viewMode, setViewMode] = useState('cumulative');

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
            <p className="text-sm text-slate-500">최근 10일간의 이슈 해결 흐름 (Gap 관찰)</p>
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
                {viewMode === 'cumulative' ? 'Cumulative Gap' : 'Daily Gap'}
              </span>
              <span className="text-3xl font-black text-rose-600 leading-none tracking-tighter">
                {viewMode === 'cumulative' ? '24' : '5'}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[350px]">
          <TrendChart viewMode={viewMode} />
        </div>

        {/* 시안 기반 커스텀 범례 (모서리 곡률 적용) */}
        <div className="mt-4 flex justify-center gap-8 border-t border-slate-50 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-rose-500 shadow-sm shadow-rose-100"></span>
            <span className="text-[13px] font-bold text-slate-600">Created {viewMode === 'cumulative' ? '(125)' : '(12)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-blue-500 shadow-sm shadow-blue-100"></span>
            <span className="text-[13px] font-bold text-slate-600">Resolved {viewMode === 'cumulative' ? '(108)' : '(10)'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-[4px] bg-emerald-500 shadow-sm shadow-emerald-100"></span>
            <span className="text-[13px] font-bold text-slate-600">Closed {viewMode === 'cumulative' ? '(101)' : '(8)'}</span>
          </div>
        </div>

        {showInsights && (
          <div className="absolute bottom-6 right-6 max-w-sm bg-indigo-900 border border-indigo-700 p-4 rounded-xl shadow-2xl z-20 animate-fadeIn text-white">
            <p className="text-indigo-200 font-bold text-sm mb-1 flex items-center gap-1 border-b border-indigo-700 pb-1">
              <Search size={16} /> 핵심 Insight: 골든 크로스
            </p>
            <p className="text-[11px] opacity-90 font-medium leading-relaxed mt-2">{comments?.goldenCross?.replace(/"/g, '')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendStatusSection;