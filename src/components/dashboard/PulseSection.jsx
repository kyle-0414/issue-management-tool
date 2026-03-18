import React from 'react';
import { Rocket, Bug, AlertCircle, RefreshCcw, ShieldHalf } from 'lucide-react';
import KPICard from '../ui/KPICard';

const PulseSection = ({ showInsights, comments }) => {
  return (
    <section id="section-pulse" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">1. THE PULSE (핵심 지표)</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* [1] Release Status */}
        <KPICard
          title="Release Status"
          value={
            <div className="flex flex-col">
              <span className="text-2xl font-black text-rose-600">BLOCKED</span>
              <span className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">Stage: LATE</span>
            </div>
          }
          icon={Rocket}
          colorClass="bg-slate-50 text-rose-600"
          highlight={true}
          insight={comments?.action}
          showInsights={showInsights}
        />

        {/* [2] Critical Bugs */}
        <KPICard
          title="Critical Bugs"
          value="2"
          subValue="Avg Age: 4.5d"
          subText=""
          icon={Bug}
          colorClass="bg-red-50 text-red-600"
          insight={comments?.criticalBugs}
          showInsights={showInsights}
        />

        {/* [3] Unresolved */}
        <KPICard
          title="Unresolved"
          value="24"
          subValue={
            <div className="flex flex-col gap-0.5 text-[10px] font-bold text-slate-500 mt-1 uppercase">
              <span className="flex justify-between border-b border-slate-100 pb-0.5">Open <span className="text-slate-800">8</span></span>
              <span className="flex justify-between border-b border-slate-100 pb-0.5">In Progress <span className="text-slate-800">6</span></span>
              <span className="flex justify-between">Dev Done <span className="text-slate-800">10</span></span>
            </div>
          }
          icon={AlertCircle}
          colorClass="bg-slate-50 text-slate-600"
          insight={comments?.unresolved}
          showInsights={showInsights}
        />

        {/* [4] Reopen Rate */}
        <KPICard
          title="Reopen Rate"
          value="12%"
          subValue="+2 vs prev"
          subText="History Based"
          icon={RefreshCcw}
          colorClass="bg-amber-50 text-amber-600"
          insight={comments?.fixTime}
          showInsights={showInsights}
        />

        {/* [5] Test Coverage */}
        <KPICard
          title="Test Coverage"
          value="92%"
          subValue={
            <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">Critical Flow: 70% (risk)</span>
          }
          icon={ShieldHalf}
          colorClass="bg-purple-50 text-purple-600"
          insight={comments?.coverage}
          showInsights={showInsights}
        />
      </div>
    </section>
  );
};

export default PulseSection;