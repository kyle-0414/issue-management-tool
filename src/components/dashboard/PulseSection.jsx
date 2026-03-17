import React from 'react';
import { CheckCircle, Bug, Timer, ShieldHalf } from 'lucide-react';
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
          title="Avg. Fix Time"
          value="4.2h"
          subValue="Good"
          subText="Velocity Status"
          icon={Timer}
          colorClass="bg-blue-50 text-blue-600"
          insight={comments?.fixTime}
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
      </div>
    </section>
  );
};

export default PulseSection;