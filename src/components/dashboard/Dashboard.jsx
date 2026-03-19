import React from 'react';
import { Rocket } from 'lucide-react';
import PulseSection from './PulseSection';
import TrendStatusSection from './TrendStatusSection';
import QualityInsightsSection from './QualityInsightsSection';
import CycleTrendSection from './CycleTrendSection';

const Dashboard = ({ showInsights, comments }) => {
  // 1. 핵심 지표 데이터 정의 (근거 데이터)
  const metrics = {
    criticalBugs: 2,
    unresolved: 24,
    reopenRate: 12, // % 단위
    coverage: 92     // % 단위
  };

  // 2. Release Status 자동 판단 로직
  const getReleaseStatus = () => {
    if (metrics.criticalBugs >= 1 || metrics.unresolved >= 20 || metrics.reopenRate >= 10) {
      return {
        label: '🔴 BLOCKED',
        reason: `Critical Bugs: ${metrics.criticalBugs} (release 불가)`,
        color: 'text-rose-600'
      };
    }
    if (metrics.unresolved >= 10 || metrics.reopenRate >= 5) {
      return {
        label: '🟠 AT RISK',
        reason: `Unresolved Issues: ${metrics.unresolved}`,
        color: 'text-amber-600'
      };
    }
    if (metrics.criticalBugs === 0 && metrics.unresolved < 10 && metrics.reopenRate < 5 && metrics.coverage >= 90) {
      return {
        label: '🟢 READY',
        reason: '모든 품질 지표 충족',
        color: 'text-emerald-600'
      };
    }
    return { label: '⚪️ PENDING', reason: '실시간 데이터 분석 중', color: 'text-slate-400' };
  };

  const status = getReleaseStatus();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 uppercase tracking-tight tracking-wider">프로젝트 품질 현황 개요</h2>
          <p className="text-slate-600 font-medium max-w-2xl">
            현재 릴리즈 D-3 시점입니다. 본 대시보드는 1차 전수 검증부터 4차 Ad-hoc까지의 품질 흐름을 추적합니다.
          </p>
        </div>

        {/* [Header 우측] Release Status - 텍스트 중심 구조 (카드 형태 금지) */}
        <div className="flex flex-col items-end text-right">
          <span className={`text-2xl font-black ${status.color} tracking-tight mb-1`}>
            {status.label}
          </span>
          <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">
            {status.reason}
          </span>
          <span className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
            Stage: LATE
          </span>
        </div>
      </div>

      <PulseSection showInsights={showInsights} comments={comments} metrics={metrics} />
      <TrendStatusSection showInsights={showInsights} comments={comments} />
      <QualityInsightsSection showInsights={showInsights} comments={comments} />
      <CycleTrendSection showInsights={showInsights} comments={comments} />
    </div>
  );
};

export default Dashboard;