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
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-orange-200 transition-colors">
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h4 className="text-lg font-bold text-slate-800 tracking-tight">Reopen / Side-effect</h4>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">이슈 발생 이력 기준</p>
                        </div>
                        <ShieldAlert className="text-orange-500" size={20} />
                    </div>

                    <div className="space-y-3 flex-1">
                        <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-lg">
                            <span className="text-sm font-semibold text-slate-600">Reopen</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-800">3</span>
                                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md">+2</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-lg">
                            <span className="text-sm font-semibold text-slate-600">Side-effect</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-800">1</span>
                                <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md">+1</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-orange-600 font-bold text-xs bg-orange-50/50 p-2.5 rounded-lg justify-center border border-orange-100">
                            <Activity size={14} />
                            <span>Reopen 증가 추세</span>
                        </div>
                    </div>
                </div>

                {/* [중앙] Top Risk Modules */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="mb-8">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">Top Risk Modules</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">가장 리스크 높은 모듈</p>
                    </div>

                    <div className="space-y-5">
                        <div className="group">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-lg font-black text-slate-800">1.</span>
                                <span className="text-sm font-bold text-slate-700">Payment Module</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded border border-red-100">Critical 2</span>
                                <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded border border-orange-100">Major 1</span>
                                <span className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded border border-slate-100">Minor 0</span>
                                <span className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded border border-slate-100">Trivial 0</span>
                            </div>
                        </div>

                        <div className="group">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-lg font-black text-slate-400">2.</span>
                                <span className="text-sm font-bold text-slate-600 text-opacity-80">Login Module</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-1.5 py-0.5 bg-slate-50 text-slate-400 text-[10px] font-bold rounded border border-slate-100">Critical 0</span>
                                <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded border border-orange-100">Major 1</span>
                                <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-500 text-[10px] font-bold rounded border border-indigo-100">Minor 2</span>
                            </div>
                        </div>

                        <div className="group opacity-60">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-lg font-black text-slate-300">3.</span>
                                <span className="text-sm font-bold text-slate-500">User Auth</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-500 text-[10px] font-bold rounded border border-indigo-100">Minor 2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* [우측] Severity Distribution */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col opacity-90 lg:opacity-100">
                    <div className="mb-8">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight">심각도 분포</h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5 text-opacity-0">.</p>
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
