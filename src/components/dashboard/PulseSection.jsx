import React from 'react';
import { CheckCircle, Bug, ShieldHalf, AlertCircle } from 'lucide-react';
import KPICard from '../ui/KPICard';

const PulseSection = ({ showInsights, comments }) => {
  return (
    <section id="section-pulse" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">1. The Pulse (핵심 지표)</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Pass Rate (통과율)"
          value="85.0%"
          subValue="↑ 13.0%"
          subText="vs 1차 (72%)"
          icon={CheckCircle}
          colorClass="bg-emerald-50 text-emerald-600"
          insight={comments?.passRate}
          showInsights={showInsights}
        />
        <KPICard
          title="Critical Bugs"
          value="2"
          subValue="Action Required"
          subText=""
          icon={Bug}
          colorClass="bg-red-50 text-red-600"
          highlight={true}
          insight={comments?.criticalBugs}
          showInsights={showInsights}
        />
        <KPICard
          title="Test Coverage"
          value="92%"
          subValue="Stable"
          subText="vs Target 90%"
          icon={ShieldHalf}
          colorClass="bg-purple-50 text-purple-600"
          insight={comments?.coverage}
          showInsights={showInsights}
        />
        <KPICard
          title="Reopen / Side-effect"
          value={
            <div className="flex items-end gap-6 h-9">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Reopen</span>
                <span className="text-2xl font-bold text-slate-800 leading-none">3</span>
              </div>
              <div className="w-[1px] h-6 bg-slate-200 mb-0.5"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Side-effect</span>
                <span className="text-2xl font-bold text-slate-800 leading-none">1</span>
              </div>
            </div>
          }
          subValue="Action Needed"
          subText="Quality Stability"
          icon={AlertCircle}
          colorClass="bg-amber-50 text-amber-600"
          insight={comments?.fixTime} // Reusing the fixTime space for now
          showInsights={showInsights}
        />
      </div>
    </section>
  );
};

export default PulseSection;