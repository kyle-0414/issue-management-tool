import React from 'react';
import { Bug, AlertCircle, RefreshCcw, ShieldHalf } from 'lucide-react';
import KPICard from '../ui/KPICard';

const PulseSection = ({ showInsights, comments, metrics }) => {
  return (
    <section id="section-pulse" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">1. THE PULSE (핵심 지표)</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* [1] Critical Bugs */}
        <KPICard
          title="Critical Bugs"
          value={metrics.criticalBugs}
          subValue="Avg Age: 4.5d"
          subText=""
          icon={Bug}
          colorClass="bg-red-50 text-red-600"
          valueColor="text-red-600"
          insight={comments?.criticalBugs}
          showInsights={showInsights}
        />

        {/* [2] Unresolved */}
        <KPICard
          title="Unresolved"
          value={metrics.unresolved}
          subValue={
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mt-1 uppercase">
              <span className="whitespace-nowrap">Open <span className="font-black text-slate-900 ml-0.5">8</span></span>
              <span className="text-slate-200">•</span>
              <span className="whitespace-nowrap">In Progress <span className="font-black text-slate-900 ml-0.5">6</span></span>
              <span className="text-slate-200">•</span>
              <span className="whitespace-nowrap">Dev Done <span className="font-black text-slate-900 ml-0.5">10</span></span>
            </div>
          }
          icon={AlertCircle}
          colorClass="bg-slate-50 text-slate-600"
          insight={comments?.unresolved}
          showInsights={showInsights}
        />

        {/* [3] Reopen Rate */}
        <KPICard
          title="Reopen Rate"
          value={`${metrics.reopenRate}%`}
          subValue="+2 vs prev"
          subText="History Based"
          icon={RefreshCcw}
          colorClass="bg-amber-50 text-amber-600"
          valueColor="text-orange-500"
          insight={comments?.fixTime}
          showInsights={showInsights}
        />

        {/* [4] Test Coverage */}
        <KPICard
          title="Test Coverage"
          value={`${metrics.coverage}%`}
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