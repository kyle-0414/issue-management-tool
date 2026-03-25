import React from 'react';
import { Activity, ShieldAlert, Zap } from 'lucide-react';
import SeverityChart from '../charts/SeverityChart';

const QualityInsightsSection = ({ showInsights, comments, issues = [] }) => {
    // 1. Reopen 데이터 계산
    const reopenCount = issues.filter(i => i.reopen === 'Yes').length;
    // Side-effect 데이터는 현재 없으므로 Reopen에서 파생하거나 0으로 표시 (추후 CSV 확장 가능)
    const sideEffectCount = issues.filter(i => i.reopen === 'Yes' && i.severity === 'Critical').length;

    // 2. 모듈별 리스크 계산 (Open Bug 기준 정렬)
    const moduleRisks = Object.entries(
        issues.reduce((acc, issue) => {
            const mod = issue.module || 'Unknown';
            if (!acc[mod]) acc[mod] = { name: mod, critical: 0, major: 0, minor: 0, total: 0 };
            if (issue.status !== 'Closed' && issue.status !== 'Resolved') {
                if (issue.severity === 'Critical') acc[mod].critical++;
                else if (issue.severity === 'Major') acc[mod].major++;
                else acc[mod].minor++;
                acc[mod].total++;
            }
            return acc;
        }, {})
    )
    .sort((a, b) => (b[1].critical * 10 + b[1].major * 3 + b[1].minor) - (a[1].critical * 10 + a[1].major * 3 + a[1].minor))
    .slice(0, 3);

    return (
        <section id="section-quality-insights" className="mb-12 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-8">
                <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">3. QUALITY INSIGHTS</h3>
                <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                {/* [CARD 1] Reopen / Side-effect (20%) */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] flex flex-col group transition-all duration-300">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Reopen / Side-effect</h4>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-[14px] font-bold text-slate-800">Reopen</span>
                            <span className="text-[16px] font-black text-slate-900">{reopenCount} <span className={`font-bold ml-1 text-[13px] ${reopenCount > 2 ? 'text-rose-500' : 'text-slate-400'}`}>({reopenCount > 0 ? `+${reopenCount}` : '0'})</span></span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-[14px] font-bold text-slate-800">Side-effect</span>
                            <span className="text-[16px] font-black text-slate-900">{sideEffectCount} <span className="text-orange-500 font-bold ml-1 text-[13px]">{sideEffectCount > 0 ? `+${sideEffectCount}` : ''}</span></span>
                        </div>
                        <div className="pt-2">
                            <span className="text-[12px] font-bold text-orange-500 uppercase tracking-tight">
                                {reopenCount > 3 ? 'Action Needed: 회귀 테스트 강화 필요' : 'Status: Stable'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* [CARD 2] Top Risk Modules (30%) */}
                <div className="md:col-span-3 bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] flex flex-col group transition-all duration-300">
                    <div className="mb-8">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Top Risk Modules</h4>
                    </div>

                    <div className="space-y-0 text-slate-900">
                        {moduleRisks.map(([key, mod], idx) => (
                            <div key={key} className={`py-5 ${idx !== 2 ? 'border-b border-slate-50' : ''}`}>
                                <div className="flex items-baseline gap-2 mb-2 font-black">
                                    <span className="text-xl text-slate-900">0{idx + 1}</span>
                                    <span className="text-[14px] text-slate-800 tracking-tight">{mod.name}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 ml-8">
                                    {mod.critical > 0 && <span className="text-[11px] font-bold text-rose-600">Critical {mod.critical}</span>}
                                    {mod.major > 0 && <span className="text-[11px] font-bold text-orange-500">Major {mod.major}</span>}
                                    {mod.minor > 0 && <span className="text-[10px] font-bold text-blue-500">Minor {mod.minor}</span>}
                                    {mod.total === 0 && <span className="text-[10px] font-bold text-slate-200">No Open Bugs</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* [CARD 3] Severity Distribution (50%) */}
                <div className="md:col-span-5 bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] flex flex-col group transition-all duration-300">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-none">심각도 분포</h4>
                    </div>
                    <div className="flex-1 min-h-[220px]">
                        <SeverityChart issues={issues} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityInsightsSection;
