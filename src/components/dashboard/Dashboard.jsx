import React from 'react';
import PulseSection from './PulseSection';
import TrendStatusSection from './TrendStatusSection';
import QualityInsightsSection from './QualityInsightsSection';
import CycleTrendSection from './CycleTrendSection';
import RiskSection from './RiskSection';

const Dashboard = ({ showInsights, comments }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 uppercase tracking-tight">프로젝트 품질 현황 개요</h2>
        <p className="text-slate-600 font-medium">
          현재 릴리즈 D-3 시점입니다. 본 대시보드는 1차 전수 검증부터 4차 Ad-hoc까지의 품질 흐름을 추적합니다.
        </p>
      </div>

      <PulseSection showInsights={showInsights} comments={comments} />
      <TrendStatusSection showInsights={showInsights} comments={comments} />
      <QualityInsightsSection showInsights={showInsights} comments={comments} />
      <CycleTrendSection showInsights={showInsights} comments={comments} />
      <RiskSection showInsights={showInsights} comments={comments} />
    </div>
  );
};

export default Dashboard;