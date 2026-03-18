import React from 'react';
import { Search } from 'lucide-react';
import TrendChart from '../charts/TrendChart';
import StatusChart from '../charts/StatusChart';

const TrendStatusSection = ({ showInsights, comments }) => {
  return (
    <section id="section-charts" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">2. ISSUE RESOLUTION FLOW</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-slate-800">Created vs Resolved vs Closed</h4>
          <p className="text-sm text-slate-500">최근 10일간의 이슈 해결 흐름</p>
        </div>
        <div className="h-[350px]">
          <TrendChart />
        </div>

        {showInsights && (
          <div className="absolute bottom-6 right-6 max-w-sm bg-white/90 border border-indigo-200 p-4 rounded-lg shadow-lg backdrop-blur z-20 animate-fadeIn">
            <p className="text-indigo-700 font-bold text-sm mb-1 flex items-center gap-1">
              <Search size={16} /> 핵심 Insight: 골든 크로스
            </p>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">{comments?.goldenCross}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendStatusSection;