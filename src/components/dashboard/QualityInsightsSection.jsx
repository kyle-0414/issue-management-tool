import React from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import StatusChart from '../charts/StatusChart';

const QualityInsightsSection = ({ showInsights, comments }) => {
    return (
        <section id="section-quality-insights" className="mb-10 pb-10">
            <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">3. QUALITY INSIGHTS</h3>
                <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reopen / Side-effect 분석 카드 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-lg font-bold text-slate-800">Reopen / Side-effect</h4>
                                <p className="text-sm text-slate-500">품질 안정성 심층 분석</p>
                            </div>
                            <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                                <ShieldAlert size={24} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-500 mb-1">Reopen</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-slate-800">3</span>
                                        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                                            +2 vs prev
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-bold text-slate-500 mb-1">Side-effect</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-slate-800">1</span>
                                        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                                            +1 vs prev
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-amber-700 font-bold text-sm bg-amber-50 p-3 rounded-lg">
                            <Activity size={16} />
                            <span>Action Needed: 품질 변동성 관찰 필요</span>
                        </div>
                    </div>
                </div>

                {/* Execution Status 도넛 차트 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative flex flex-col">
                    <div className="mb-4">
                        <h4 className="text-lg font-bold text-slate-800">Execution Status (Current)</h4>
                        <p className="text-sm text-slate-500">Total 1,000 Cases</p>
                    </div>
                    <div className="h-[240px] flex items-center justify-center">
                        <StatusChart />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                            <span className="flex items-center gap-1.5 grayscale opacity-70">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Passed
                            </span>
                            <span className="font-bold text-slate-600">850</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-red-50/50 rounded border border-red-100">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Failed
                            </span>
                            <span className="font-bold text-red-600">125</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-amber-50/50 rounded border border-amber-100">
                            <span className="flex items-center gap-1.5 font-bold">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Blocked
                            </span>
                            <span className="font-bold text-amber-600">25</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-slate-50 rounded grayscale opacity-50">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-slate-400"></span> Not Run
                            </span>
                            <span className="font-bold text-slate-500">0</span>
                        </div>
                    </div>

                    {showInsights && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-6 text-center z-20 animate-fadeIn">
                            <div className="bg-slate-800 text-white p-4 rounded-xl shadow-2xl inline-block max-w-[200px]">
                                <p className="text-xs font-bold mb-1 underline decoration-amber-500 underline-offset-4">"Blocked에 주목하세요!"</p>
                                <div className="text-[10px] mt-1 opacity-90 leading-tight" dangerouslySetInnerHTML={{ __html: comments?.blocked?.replace(/"/g, '') }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default QualityInsightsSection;
