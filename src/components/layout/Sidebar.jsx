import React, { useState } from 'react';
import { Activity, LineChart, LayoutGrid, AlertTriangle, Settings, MessageSquare, Bell, Shield, ChevronDown } from 'lucide-react';

const Sidebar = ({ onNavigate, currentView, issues = [], onStartDemo }) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const menuItems = [
    { id: 'dashboard', label: '대시보드 홈', icon: Activity },
    { id: 'issue-list', label: '이슈 리스트 현황', icon: LayoutGrid, count: issues.length },
  ];

  const adminItems = [
    { id: 'admin-project', label: 'Project Info', icon: Settings },
    { id: 'admin-comments', label: 'Comments', icon: MessageSquare },
    { id: 'admin-notifications', label: 'Notifications', icon: Bell },
  ];

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      setClickCount(0);
      onStartDemo();
    } else {
      setClickCount(newCount);
      // 2초 뒤에 안 누르면 초기화
      setTimeout(() => setClickCount(0), 2000);
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col flex-shrink-0 transition-all duration-300">
      <div 
        className="p-6 border-b border-slate-700 flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 transition-colors" 
        onClick={handleTitleClick}
      >
        <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-bold">QA</div>
        <span className="font-bold text-lg tracking-wide">Insight Pro</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3 mb-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${currentView === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    currentView === item.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Admin 메뉴 아코디언 */}
        <div className="px-3">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all group ${adminItems.some(item => currentView === item.id)
                ? 'bg-slate-800/50 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
          >
            <div className="flex items-center gap-3">
              <Shield size={20} className={adminItems.some(item => currentView === item.id) ? 'text-indigo-400' : 'text-slate-400'} />
              <span className="text-sm font-bold uppercase tracking-widest">Admin</span>
            </div>
            <div className={`transition-transform duration-300 ${isAdminOpen ? 'rotate-180' : ''}`}>
              <ChevronDown size={14} />
            </div>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAdminOpen ? 'max-h-48 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
            <ul className="space-y-1">
              {adminItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 pl-11 pr-3 py-2 rounded-md transition-colors text-sm ${currentView === item.id
                      ? 'bg-indigo-600/10 text-indigo-400 font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 스프린트 진행도 - 잠시 숨김 처리
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
        */}
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