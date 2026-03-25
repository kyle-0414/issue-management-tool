import React from 'react';
import { Rocket } from 'lucide-react';
import PulseSection from './PulseSection';
import TrendStatusSection from './TrendStatusSection';
import QualityInsightsSection from './QualityInsightsSection';
import CycleTrendSection from './CycleTrendSection';

const Dashboard = ({ showInsights, comments, issues }) => {
  // 1. 핵심 지표 데이터 계산 (issues 기반)
  const criticalBugs = issues.filter(i => i.severity === 'Critical' && i.status !== 'Closed').length;
  const unresolved = issues.filter(i => i.status !== 'Closed').length;
  const reopens = issues.filter(i => i.reopen === 'Yes').length;
  const reopenRate = issues.length > 0 ? Math.round((reopens / issues.length) * 100) : 0;
  
  // Dummy coverage calculation for now (or could be part of CSV)
  const coverage = 92;

  const openCount = issues.filter(i => i.status === 'Open' || i.status === 'Reopened').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress').length;
  const devDoneCount = issues.filter(i => i.status === 'Resolved').length;

  const metrics = {
    criticalBugs,
    unresolved,
    reopenRate,
    coverage,
    openCount,
    inProgressCount,
    devDoneCount
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
          <p className="text-slate-600 font-medium max-w-4xl">
            현재 릴리즈 D-3 시점입니다. 본 대시보드는 QA 1차 테스트 (핵심기능 확인)부터 4차 탐색적 테스팅 (Exploratory Testing)까지의 품질 흐름을 추적합니다.
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
      <TrendStatusSection showInsights={showInsights} comments={comments} issues={issues} />
      <QualityInsightsSection showInsights={showInsights} comments={comments} issues={issues} />
      <CycleTrendSection showInsights={showInsights} comments={comments} issues={issues} />
    </div>
  );
};

export default Dashboard;