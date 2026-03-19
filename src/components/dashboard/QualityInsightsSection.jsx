import React from 'react';
import { Activity, ShieldAlert, Zap } from 'lucide-react';
import SeverityChart from '../charts/SeverityChart';

const QualityInsightsSection = ({ showInsights, comments }) => {
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
                            <span className="text-[16px] font-black text-slate-900">3 <span className="text-rose-500 font-bold ml-1 text-[13px]">(+2)</span></span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-[14px] font-bold text-slate-800">Side-effect</span>
                            <span className="text-[16px] font-black text-slate-900">1 <span className="text-orange-500 font-bold ml-1 text-[13px]">(+1)</span></span>
                        </div>
                        <div className="pt-2">
                            <span className="text-[12px] font-bold text-orange-500 uppercase tracking-tight">Action Needed: 회귀 테스트 강화 필요</span>
                        </div>
                    </div>
                </div>

                {/* [CARD 2] Top Risk Modules (30%) */}
                <div className="md:col-span-3 bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] flex flex-col group transition-all duration-300">
                    <div className="mb-8">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Top Risk Modules</h4>
                    </div>

                    <div className="space-y-0 text-slate-900">
                        <div className="pb-5 border-b border-slate-50">
                            <div className="flex items-baseline gap-2 mb-2 font-black">
                                <span className="text-xl text-slate-900">01</span>
                                <span className="text-[14px] text-slate-800 tracking-tight">Payment Module</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 ml-8">
                                <span className="text-[11px] font-bold text-rose-600">Critical 2</span>
                                <span className="text-[11px] font-bold text-orange-500">Major 1</span>
                                <span className="text-[10px] font-bold text-slate-200">Minor 0</span>
                                <span className="text-[10px] font-bold text-slate-200">Trivial 0</span>
                            </div>
                        </div>

                        <div className="py-5 border-b border-slate-50">
                            <div className="flex items-baseline gap-2 mb-2 font-black text-slate-900">
                                <span className="text-xl">02</span>
                                <span className="text-[14px] text-slate-800 tracking-tight">Login Module</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 ml-8">
                                <span className="text-[11px] font-bold text-slate-200">Critical 0</span>
                                <span className="text-[11px] font-bold text-orange-500">Major 1</span>
                                <span className="text-[10px] font-bold text-blue-500">Minor 2</span>
                                <span className="text-[10px] font-bold text-slate-200">Trivial 0</span>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex items-baseline gap-2 mb-2 font-black text-slate-900">
                                <span className="text-xl">03</span>
                                <span className="text-[14px] text-slate-800 tracking-tight">User Auth</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 ml-8">
                                <span className="text-[10px] font-bold text-blue-500">Minor 2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* [CARD 3] Severity Distribution (50%) - COMPACT LEFT VERSION */}
                <div className="md:col-span-5 bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] flex flex-col group transition-all duration-300">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-none">심각도 분포</h4>
                    </div>
                    <div className="flex-1 min-h-[220px]">
                        <SeverityChart />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityInsightsSection;
