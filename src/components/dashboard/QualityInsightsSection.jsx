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

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm font-bold text-slate-600">Reopen</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-slate-800">3</span>
                                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                                        +2 vs prev
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm font-bold text-slate-600">Side-effect</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-slate-800">1</span>
                                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
                                        +1 vs prev
                                    </span>
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

                {/* Severity Distribution 차트 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="mb-6">
                        <h4 className="text-lg font-bold text-slate-800">Severity Distribution</h4>
                        <p className="text-sm text-slate-500">잔여 이슈 심각도 분포</p>
                    </div>
                    <div className="flex-1 h-[240px]">
                        <SeverityChart />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityInsightsSection;
