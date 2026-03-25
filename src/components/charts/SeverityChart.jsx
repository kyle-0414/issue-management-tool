import React from 'react';

const SeverityChart = ({ issues = [] }) => {
  const counts = {
    Critical: issues.filter(i => i.severity === 'Critical').length,
    Major: issues.filter(i => i.severity === 'Major').length,
    Minor: issues.filter(i => i.severity === 'Minor' || i.severity === 'Trivial' || !['Critical', 'Major'].includes(i.severity)).length,
  };

  const total = counts.Critical + counts.Major + counts.Minor;
  const max = Math.max(counts.Critical, counts.Major, counts.Minor, 1);

  const data = [
    { label: 'Critical', value: counts.Critical, color: 'bg-rose-500', bgColor: 'bg-rose-50' },
    { label: 'Major', value: counts.Major, color: 'bg-orange-500', bgColor: 'bg-orange-50' },
    { label: 'Minor', value: counts.Minor, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  ];

  return (
    <div className="w-full space-y-6 pt-2">
      {data.map((item) => (
        <div key={item.label} className="group/bar">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
            <span className="text-[14px] font-black text-slate-900">{item.value}</span>
          </div>
          <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full ${item.color} rounded-full`}
              style={{ width: `${(item.value / max) * 100}%` }}
            >
            </div>
          </div>
        </div>
      ))}
      <div className="pt-4 flex justify-between items-center border-t border-slate-50">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Issues</span>
        <span className="text-[12px] font-black text-slate-600">{total}</span>
      </div>
    </div>
  );
};

export default SeverityChart;