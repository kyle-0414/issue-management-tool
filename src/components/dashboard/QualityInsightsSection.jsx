import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import SeverityChart from '../charts/SeverityChart';

const QualityInsightsSection = ({ showInsights, comments }) => {
    return (
        <section id="section-quality-insights" className="mb-10 pb-10">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">3. QUALITY INSIGHTS</h3>
                <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* [좌측] Reopen / Side-effect */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="mb-6 flex justify-between items-start">
                        <div>
                            <h4 className="text-lg font-bold text-slate-800">Stability Analysis</h4>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Reopen / Side-effect</p>
                        </div>
                        <ShieldAlert className="text-amber-500" size={20} />
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-bold text-slate-600">Reopen</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-slate-800">3</span>
                                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">+2</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm font-bold text-slate-600">Side-effect</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-slate-800">1</span>
                                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">+1</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 italic text-[11px] text-slate-400 font-medium">
                        *이슈 발생 이력 기준(History Based)
                    </div>
                </div>

                {/* [중앙] Top Risk Modules */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800">Top Risk Modules</h4>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Core Feature Risk</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-3 border-l-4 border-rose-500 bg-rose-50/30 rounded-r-lg">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-black text-rose-700">1. Payment Module</span>
                                <span className="text-[10px] font-bold text-rose-600 bg-white px-1.5 rounded">Critical</span>
                            </div>
                            <div className="flex gap-3 text-[10px] font-bold text-rose-500/80 uppercase">
                                <span>Critical: 2</span>
                                <span>Reopen: 1</span>
                                <span>Age: 4.5d</span>
                            </div>
                        </div>

                        <div className="p-3 border-l-4 border-amber-500 bg-amber-50/30 rounded-r-lg">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-black text-amber-700">2. Login Module</span>
                                <span className="text-[10px] font-bold text-amber-600 bg-white px-1.5 rounded">Risk Early</span>
                            </div>
                            <div className="flex gap-3 text-[10px] font-bold text-amber-500/80 uppercase">
                                <span>Side-effect: 1</span>
                            </div>
                        </div>

                        <div className="p-3 border-l-4 border-slate-400 bg-slate-50 rounded-r-lg opacity-60 grayscale">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-black text-slate-600">3. User Auth</span>
                            </div>
                            <div className="flex gap-3 text-[10px] font-bold text-slate-400 uppercase">
                                <span>Minor: 2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* [우측] Severity Distribution */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800">Severity Distribution</h4>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Issue Density</p>
                    </div>
                    <div className="flex-1 h-[180px]">
                        <SeverityChart />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityInsightsSection;
