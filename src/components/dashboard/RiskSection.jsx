import React from 'react';
import { AlertTriangle, Bell } from 'lucide-react';
import SeverityChart from '../charts/SeverityChart';

const RiskSection = ({ showInsights, comments }) => {
  return (
    <section id="section-risks" className="pb-12">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-slate-700 uppercase tracking-wide">4. Risk Management (리스크 식별)</h3>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 모듈 리스크 평가 테이블 */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden relative">
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
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <AlertTriangle className="text-red-500" size={16} /> Payment Gateway
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-200 rounded-full h-1.5 w-24">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Critical</span></td>
                  <td className="px-6 py-4 text-right font-bold">8</td>
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
            <div className="absolute bottom-2 left-6 bg-white border border-red-200 p-3 rounded-lg shadow-md z-10 max-w-md animate-fadeIn">
              <div className="text-xs text-slate-700">
                <strong className="text-red-600 block mb-1">전략적 판단:</strong>
                {comments?.risk?.replace(/"/g, '')}
              </div>
            </div>
          )}
        </div>

        {/* 심각도 분포 차트 및 액션 박스 */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-1">
            <h4 className="text-lg font-bold text-slate-800 mb-4">Severity Distribution</h4>
            <div className="h-[200px]">
              <SeverityChart />
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm relative">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0 text-red-600">
                <Bell size={20} />
              </div>
              <div>
                <h5 className="font-bold text-red-800">Action Required</h5>
                <p className="text-sm text-red-700 mt-1 leading-relaxed">
                  {comments?.action?.replace(/"/g, '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskSection;