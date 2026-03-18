import React, { useState } from 'react';
import { Search, Filter, Upload, Clock, AlertTriangle, FileText, Download } from 'lucide-react';

const IssueListPage = ({ comments, showInsights }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // 더미 데이터
    const issues = [
        { id: 'QA-101', summary: 'Payment gateway timeout on production', severity: 'Critical', status: 'Open', project: 'FinTech App', reopen: 'Yes' },
        { id: 'QA-102', summary: 'Incorrect font size in login page', severity: 'Minor', status: 'In Progress', project: 'FinTech App', reopen: 'No' },
        { id: 'QA-103', summary: 'Missing translation for KR locale', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No' },
        { id: 'QA-104', summary: 'App crashes when switching tabs rapidly', severity: 'Critical', status: 'Reopened', project: 'FinTech App', reopen: 'Yes' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* 헤더 섹션 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">이슈 리스트 현황</h2>
                    <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                        <Clock size={14} />
                        <span>최근 업데이트: 2024-03-18 17:00</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
                        <Download size={16} /> 템플릿 다운로드
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-lg shadow-indigo-900/20">
                        <Upload size={16} /> CSV 업로드
                    </button>
                </div>
            </div>

            {/* 필터 및 검색 바 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Issue ID 또는 Summary 검색..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option>Project: All</option>
                            <option>FinTech App</option>
                            <option>Admin Tool</option>
                        </select>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option>Severity: All</option>
                            <option>Critical</option>
                            <option>Major</option>
                            <option>Minor</option>
                        </select>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option>Status: All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                            <option>Closed</option>
                        </select>
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* 이슈 테이블 */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Issue ID</th>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Summary</th>
                                <th className="px-6 py-4">Severity</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Reopen</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {issues.map((issue) => (
                                <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                    <td className="px-6 py-4 font-bold text-indigo-600">{issue.id}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500 uppercase">{issue.project}</td>
                                    <td className="px-6 py-4 font-medium truncate max-w-xs">{issue.summary}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${issue.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                                                issue.severity === 'Major' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-slate-100 text-slate-700'
                                            }`}>
                                            {issue.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 font-medium ${issue.status === 'Open' ? 'text-red-600' :
                                                issue.status === 'In Progress' ? 'text-blue-600' :
                                                    'text-emerald-600'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${issue.status === 'Open' ? 'bg-red-500' :
                                                    issue.status === 'In Progress' ? 'bg-blue-500' :
                                                        'bg-emerald-500'
                                                }`}></span>
                                            {issue.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-400">{issue.reopen}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Module Risk Assessment (신규 위치) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h4 className="text-lg font-bold text-slate-800">Module Risk Assessment</h4>
                        <p className="text-sm text-slate-500">집중 테스트가 필요한 영역 식별</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Module Name</th>
                                <th className="px-6 py-3">Health Score</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Open Bugs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            <tr className="bg-red-50/30">
                                <td className="px-6 py-4 font-medium flex items-center gap-2 text-red-700">
                                    <AlertTriangle className="text-red-500" size={16} /> Payment Gateway
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-full bg-slate-200 rounded-full h-1.5 w-24">
                                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Critical</span></td>
                                <td className="px-6 py-4 text-right font-bold text-red-600">8</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium">User Auth</td>
                                <td className="px-6 py-4">
                                    <div className="w-full bg-slate-200 rounded-full h-1.5 w-24">
                                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Stable</span></td>
                                <td className="px-6 py-4 text-right">2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {showInsights && (
                    <div className="absolute bottom-4 left-6 bg-slate-800 text-white p-4 rounded-xl shadow-2xl z-10 max-w-lg border border-slate-700 animate-fadeIn">
                        <div className="text-xs">
                            <strong className="text-amber-400 block mb-1 font-bold">전략적 판단:</strong>
                            <span className="opacity-90 leading-relaxed font-medium">{comments?.risk?.replace(/"/g, '')}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueListPage;
