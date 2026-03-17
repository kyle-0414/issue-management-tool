import React from 'react';
import { Search } from 'lucide-react';
import TrendChart from '../charts/TrendChart';
import StatusChart from '../charts/StatusChart';

const TrendStatusSection = ({ showInsights, comments }) => {
  return (
    <section id="section-charts" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">2. Issue Resolution Flow</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 선 그래프 카드 */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-slate-800">Created vs Resolved vs Closed</h4>
            <p className="text-sm text-slate-500">최근 10일간의 이슈 해결 흐름</p>
          </div>
          <div className="h-[300px]">
            <TrendChart />
          </div>

          {showInsights && (
            <div className="absolute bottom-4 right-4 max-w-sm bg-white/90 border border-indigo-200 p-4 rounded-lg shadow-lg backdrop-blur z-20 animate-fadeIn">
              <p className="text-indigo-700 font-bold text-sm mb-1 flex items-center gap-1">
                <Search size={16} /> 핵심 Insight: 골든 크로스
              </p>
              <p className="text-xs text-slate-600">{comments?.goldenCross}</p>
            </div>
          )}
        </div>

        {/* 도넛 차트 카드 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative flex flex-col">
          <div className="mb-4">
            <h4 className="text-lg font-bold text-slate-800">Execution Status (Current)</h4>
            <p className="text-sm text-slate-500">Total 1,000 Cases</p>
          </div>
          <div className="h-[250px]">
            <StatusChart />
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Blocked
              </span>
              <span className="font-bold text-amber-600">25 (2.5%)</span>
            </div>
          </div>

          {showInsights && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center z-20 animate-fadeIn">
              <div className="bg-slate-800 text-white p-3 rounded-lg shadow-xl inline-block">
                <p className="text-xs font-bold">"Blocked에 주목하세요!"</p>
                <div className="text-[10px] mt-1 opacity-80" dangerouslySetInnerHTML={{ __html: comments?.blocked?.replace(/"/g, '') }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendStatusSection;