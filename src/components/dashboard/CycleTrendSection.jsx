import React from 'react';
import { Filter } from 'lucide-react';
import CycleChart from '../charts/CycleChart';
import StatusChart from '../charts/StatusChart';

const CycleTrendSection = ({ showInsights, comments }) => {
  // Test Case 수행 영역 (하드코딩 데이터로 전환)
  const total = 120;
  const passed = 82;
  const failed = 12;
  const blocked = 8;
  const notRun = 18;
  const na = 0;
  
  const passRate = 68;

  return (
    <section id="section-cycle" className="mb-10 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">4. CYCLE TREND ANALYSIS</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      {/* Execution Status (Full Width) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative flex flex-col mb-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h4 className="text-xl font-bold text-slate-800">Execution Status (Current)</h4>
            <p className="text-sm text-slate-500 font-medium">Total {total} Cases</p>
          </div>
          <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
            Current Cycle
          </div>
        </div>

        <div className="h-[280px] flex items-center justify-center mb-10">
          <div className="w-[280px] h-[280px]">
            {/* 하드코딩된 데이터를 넘기기 위한 props 구조 변경이 필요할 수 있으나 
                차트 내부에서 issues 대신 숫자를 쓰도록 StatusChart 수정 예정 */}
            <StatusChart testData={{ passed, failed, blocked, notRun, na }} />
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Passed
            </span>
            <span className="text-sm font-black text-slate-700">{passed} <span className="text-[11px] text-emerald-600">({passRate}%)</span></span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Failed
            </span>
            <span className="text-sm font-black text-slate-700">{failed}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-400 hover:bg-slate-100/30 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span> Block
            </span>
            <span className="text-sm font-black text-slate-700">{blocked}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Not Run
            </span>
            <span className="text-sm font-black text-slate-700">{notRun}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-sky-200 hover:bg-sky-50 transition-all group">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span> NA
            </span>
            <span className="text-sm font-black text-slate-700">{na}</span>
          </div>
        </div>

        {showInsights && (
          <div className="absolute top-[22%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 z-20 animate-fadeIn pointer-events-none">
            <div className="bg-slate-900/95 text-white p-5 rounded-2xl shadow-2xl inline-block w-[min(320px,85vw)] pointer-events-auto border border-white/10 backdrop-blur text-center">
              <p className="text-xs font-bold mb-1 border-b border-white/20 pb-2 text-amber-400 tracking-wider font-black whitespace-nowrap overflow-hidden text-ellipsis">"Blocked에 주목하세요!"</p>
              <div className="text-[10px] mt-3 opacity-90 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: comments?.blocked?.replace(/"/g, '') }} />
            </div>
          </div>
        )}
      </div>

      {/* Cycle Trend Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="mb-6">
          <h4 className="text-lg font-bold text-slate-800">Cycle-over-Cycle Quality Improvement</h4>
          <p className="text-sm text-slate-500 font-medium">QA 1차 테스트(핵심기능 확인) → 2차(변경점) → 3차(회귀) → 4차 탐색적 테스팅(Exploratory Testing) 흐름 분석</p>
        </div>

        <div className="h-[350px]">
          <CycleChart />
        </div>

        {showInsights && (
          <div className="absolute top-20 left-[60%] transform -translate-x-1/2 z-20 animate-fadeIn px-4 pointer-events-none">
            <div className="bg-indigo-900/95 text-white p-6 rounded-2xl shadow-2xl backdrop-blur w-[280px] md:w-[340px] border border-indigo-700/50 pointer-events-auto text-center">
              <p className="font-black text-sm mb-3 flex items-center justify-center gap-2 text-indigo-200 uppercase tracking-widest border-b border-indigo-700 pb-2">
                <Filter size={16} /> Kyle의 전략
              </p>
              <div className="text-[11px] opacity-90 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: comments?.cycleStrategy?.replace(/"/g, '').replace('Sign-off 를 할 수 없습니다', '<span class="text-yellow-300 font-black">Sign-off 를 할 수 없습니다</span>') }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CycleTrendSection;