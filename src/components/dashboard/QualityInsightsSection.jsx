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
        <section id="section-quality-insights" className="mb-10">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">3. QUALITY INSIGHTS</h3>
                <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* [CARD 1] Reopen / Side-effect */}
                <div className="md:col-span-3 bg-white p-7 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <div>
                        <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-6">Reopen / Side-effect</h4>
                        
                        <div className="space-y-8">
                            {/* Reopen Metric */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[13px] font-bold text-slate-500">Reopen</span>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-slate-900">{reopenCount}</span>
                                    <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100/50">
                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-rose-600"></div>
                                        <span>2</span>
                                        <span className="text-slate-400 font-medium ml-0.5">prev.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Side-effect Metric */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[13px] font-bold text-slate-500">Side-effect</span>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-black text-slate-900">{sideEffectCount}</span>
                                    <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-emerald-600"></div>
                                        <span>1</span>
                                        <span className="text-slate-400 font-medium ml-0.5">prev.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50/50 rounded-full border border-emerald-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                                {reopenCount > 3 ? 'Monitoring' : 'Under Control'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* [CARD 2] Top Risk Modules */}
                <div className="md:col-span-4 bg-white p-7 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-6">Top Risk Modules</h4>

                    <div className="flex-1 flex flex-col justify-center space-y-4">
                        {moduleRisks.map(([key, mod], idx) => (
                            <div key={key} className="relative group/item">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 transition-all group-hover/item:bg-white group-hover/item:shadow-sm group-hover/item:border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase truncate max-w-[20px]">0{idx + 1}</span>
                                        <span className="text-[15px] font-bold text-slate-800 tracking-tight">{mod.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {mod.critical > 0 ? (
                                            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-600 text-[10px] font-black border border-rose-100 uppercase tracking-tight">
                                                Critical · {mod.critical}
                                            </span>
                                        ) : mod.major > 0 ? (
                                            <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[10px] font-black border border-orange-100 uppercase tracking-tight">
                                                Major · {mod.major}
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black border border-blue-100 uppercase tracking-tight">
                                                Minor · {mod.minor || 1}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* [CARD 3] Severity Breakdown */}
                <div className="md:col-span-5 bg-white p-7 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-6">Severity Breakdown</h4>
                    <div className="flex-1 min-h-[180px] w-full mt-2 text-slate-700">
                        <SeverityChart issues={issues} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityInsightsSection;
