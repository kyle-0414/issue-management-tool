import React, { useState } from 'react';
import { Search, Filter, Upload, Clock, AlertTriangle, FileText, Download } from 'lucide-react';

const IssueListPage = ({ comments, showInsights, issues, onUpload }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        project: 'All',
        severity: 'All',
        status: 'All',
        reopen: 'All'
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const csvText = event.target.result;
            onUpload(csvText);
        };
        reader.readAsText(file);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({
            project: 'All',
            severity: 'All',
            status: 'All',
            reopen: 'All'
        });
        setSearchTerm('');
    };

    // 필터링된 이슈들
    const filteredIssues = issues.filter(issue => {
        const matchesSearch = issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            issue.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProject = filters.project === 'All' || issue.project === filters.project;
        const matchesSeverity = filters.severity === 'All' || issue.severity === filters.severity;
        const matchesStatus = filters.status === 'All' || issue.status === filters.status;
        const matchesReopen = filters.reopen === 'All' || issue.reopen === filters.reopen;

        return matchesSearch && matchesProject && matchesSeverity && matchesStatus && matchesReopen;
    });

    // 프로젝트 목록 동적 추출
    const projects = ['All', ...new Set(issues.map(i => i.project).filter(Boolean))];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* 헤더 섹션 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">이슈 리스트 현황</h2>
                    <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
                        <Clock size={14} />
                        <span>최근 업데이트: {new Date().toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <a 
                        href="/issue_template.csv"
                        download="issue_template.csv"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
                    >
                        <Download size={16} /> 템플릿 다운로드
                    </a>
                    
                    <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-lg shadow-indigo-900/20 cursor-pointer">
                        <Upload size={16} /> CSV 업로드
                        <input 
                            type="file" 
                            accept=".csv" 
                            className="hidden" 
                            onChange={handleFileChange} 
                        />
                    </label>
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
                        <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={filters.project}
                            onChange={(e) => handleFilterChange('project', e.target.value)}
                        >
                            {projects.map(p => <option key={p} value={p}>{p === 'All' ? 'Project: All' : p}</option>)}
                        </select>
                        <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={filters.severity}
                            onChange={(e) => handleFilterChange('severity', e.target.value)}
                        >
                            <option value="All">Severity: All</option>
                            <option value="Critical">Critical</option>
                            <option value="Major">Major</option>
                            <option value="Minor">Minor</option>
                        </select>
                        <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="All">Status: All</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                            <option value="Reopened">Reopened</option>
                        </select>
                        <select 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={filters.reopen}
                            onChange={(e) => handleFilterChange('reopen', e.target.value)}
                        >
                            <option value="All">Reopen: All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        <button 
                            onClick={resetFilters}
                            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                        >
                            <Filter size={16} /> Reset
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
                            {filteredIssues.map((issue) => (
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
                            {Object.entries(
                                issues.reduce((acc, issue) => {
                                    const mod = issue.module || 'Unknown';
                                    if (!acc[mod]) acc[mod] = { name: mod, openBugs: 0, total: 0 };
                                    if (issue.status !== 'Closed' && issue.status !== 'Resolved') acc[mod].openBugs++;
                                    acc[mod].total++;
                                    return acc;
                                }, {})
                            ).map(([modName, modData]) => {
                                const healthScore = Math.max(0, 100 - (modData.openBugs * 15));
                                const isCritical = modData.openBugs >= 5 || healthScore < 70;
                                
                                return (
                                    <tr key={modName} className={isCritical ? "bg-red-50/30" : ""}>
                                        <td className={`px-6 py-4 font-medium flex items-center gap-2 ${isCritical ? "text-red-700" : ""}`}>
                                            {isCritical && <AlertTriangle className="text-red-500" size={16} />} 
                                            {modName}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full bg-slate-200 rounded-full h-1.5 w-24">
                                                <div className={`h-1.5 rounded-full ${healthScore < 70 ? 'bg-red-500' : healthScore < 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                                     style={{ width: `${healthScore}%` }}></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                healthScore < 70 ? 'bg-red-100 text-red-700' : 
                                                healthScore < 90 ? 'bg-amber-100 text-amber-700' : 
                                                'bg-emerald-100 text-emerald-700'
                                            }`}>
                                                {healthScore < 70 ? 'Critical' : healthScore < 90 ? 'Warning' : 'Stable'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-bold ${modData.openBugs > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                                            {modData.openBugs}
                                        </td>
                                    </tr>
                                );
                            })}
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
