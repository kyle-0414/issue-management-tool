import React, { useState } from 'react';
import { Menu, Lightbulb, Bell, X, Trash2 } from 'lucide-react';

const Header = ({ projectInfo, notifications, onRemoveNotification, onToggleInsights, showInsights }) => {
  const [showNotiDropdown, setShowNotiDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-10 shrink-0 z-10 relative">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-800">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
          {projectInfo?.title || 'QA Insight Pro'}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* 코멘트 토글 버튼 */}
        <button
          onClick={onToggleInsights}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors shadow-sm ${showInsights
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100'
            }`}
        >
          <Lightbulb size={16} />
          <span className="hidden xs:inline">Kyle의 코멘트 ({showInsights ? 'On' : 'Off'})</span>
        </button>

        {/* 알림 센터 */}
        <div className="relative">
          <button
            onClick={() => setShowNotiDropdown(!showNotiDropdown)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors relative ${showNotiDropdown ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                {notifications.length}
              </span>
            )}
          </button>

          {/* 알림 드롭다운 */}
          {showNotiDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                <button onClick={() => setShowNotiDropdown(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    알림이 없습니다.
                  </div>
                ) : (
                  <ul className="divide-y divide-slate-50">
                    {notifications.map((noti) => (
                      <li key={noti.id} className="p-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex justify-between gap-3">
                          <p className="text-sm text-slate-700 leading-snug">{noti.text}</p>
                          <button
                            onClick={() => onRemoveNotification(noti.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400 mt-2 block">{noti.date}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;