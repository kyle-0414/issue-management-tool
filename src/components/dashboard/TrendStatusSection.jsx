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

          <div className="flex items-center gap-6">
            {/* 보기 방식 전환용 segmented control */}
            <div className="flex p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setViewMode('cumulative')}
                className={`px-4 py-1.5 text-xs font-black rounded-md transition-all ${viewMode === 'cumulative' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                누적
              </button>
              <button
                onClick={() => setViewMode('daily')}
                className={`px-4 py-1.5 text-xs font-black rounded-md transition-all ${viewMode === 'daily' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                일별
              </button>
            </div>

            <div className="flex flex-col items-end min-w-[70px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                {viewMode === 'cumulative' ? '누적 Gap' : '당일 Gap'}
              </span>
              <span className="text-2xl font-black text-rose-600 leading-none">
                {viewMode === 'cumulative' ? '24' : '5'}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[350px]">
          <TrendChart viewMode={viewMode} />
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