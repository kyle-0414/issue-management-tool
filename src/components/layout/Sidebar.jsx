import React, { useState } from 'react';
import { Activity, LineChart, LayoutGrid, AlertTriangle, Settings, MessageSquare, Bell, Shield, ChevronDown } from 'lucide-react';

const Sidebar = ({ onNavigate, currentView }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(true); // 기본적으로 열려있음

  const menuItems = [
    { id: 'dashboard', label: '대시보드 홈', icon: Activity },
    { id: 'charts', label: '트렌드 분석', icon: LineChart },
    { id: 'cycle', label: '차수별 품질 비교', icon: LayoutGrid },
    { id: 'risks', label: '리스크 관리', icon: AlertTriangle },
  ];

  const adminItems = [
    { id: 'admin-project', label: 'Project Info', icon: Settings },
    { id: 'admin-comments', label: 'Comments', icon: MessageSquare },
    { id: 'admin-notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="p-6 border-b border-slate-700 flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold">QA</div>
        <span className="font-bold text-lg tracking-wide">Insight Pro</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-6 mb-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
        </div>
        <ul className="space-y-1 px-3 mb-8">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${currentView === 'dashboard' && item.id === 'dashboard'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Admin 메뉴 아코디언 */}
        <div className="px-3">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-slate-500 hover:text-slate-300 transition-colors group"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <Shield size={12} /> Admin
            </p>
            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${isAdminOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAdminOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
            <ul className="space-y-1">
              {adminItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 pl-8 pr-3 py-2 rounded-md transition-colors text-sm ${currentView === item.id
                      ? 'bg-slate-800 text-indigo-400 font-bold border-l-2 border-indigo-500 rounded-l-none'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 스프린트 진행도 */}
        <div className="mt-12 px-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Sprint Progress</p>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-300">Sprint 24</span>
              <span className="text-emerald-400">D-3</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">QA</div>
          <div>
            <p className="text-sm font-medium">Kyle</p>
            <p className="text-xs text-slate-400">QA Team Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;