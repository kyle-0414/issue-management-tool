import React from 'react';
import { Quote } from 'lucide-react';

const KPICard = ({ title, value, subValue, subText, icon: Icon, colorClass, highlight, insight, showInsights }) => {
  return (
    <div className={`bg-white p-6 rounded-xl border shadow-sm relative group transition-all duration-300 card-hover ${highlight ? 'border-2 border-red-500' : 'border-slate-200'}`}>
      {/* 하이라이트 배지 (예: RELEASE BLOCKER) */}
      {highlight && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">
          RELEASE BLOCKER
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className={`text-3xl font-bold mt-1 ${highlight ? 'text-red-600' : 'text-slate-800'}`}>{value}</h4>
        </div>
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Icon size={24} />
        </div>
      </div>

      <div className="flex items-center text-sm">
        <span className={`${subValue.includes('-') || subValue.includes('Required') ? 'text-red-600' : 'text-emerald-600'} font-bold flex items-center gap-1`}>
          {subValue}
        </span>
        <span className="text-slate-400 ml-2">{subText}</span>
      </div>

      {/* Kyle의 코멘트 툴팁 (showInsights가 true일 때만 보임) */}
      {showInsights && insight && (
        <div className={`absolute inset-0 p-4 rounded-xl text-white z-10 backdrop-blur-sm flex flex-col justify-center animate-fadeIn ${highlight ? 'bg-red-700/95' : 'bg-indigo-600/95'}`}>
          <p className="font-bold mb-1 flex items-center gap-2">
            <Quote size={16} /> Kyle의 한마디
          </p>
          <p className="text-sm opacity-90">{insight}</p>
        </div>
      )}
    </div>
  );
};

export default KPICard;