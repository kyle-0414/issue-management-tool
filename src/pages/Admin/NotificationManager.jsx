import React, { useState } from 'react';
import { Plus, Trash2, Bell, Calendar } from 'lucide-react';

const NotificationManager = ({ notifications, addNotification, removeNotification }) => {
    const [newText, setNewText] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newText.trim()) return;

        // [초보자 가이드] 배열 추가 로직
        // addNotification 함수 내부에서 [...notifications, newNoti] 처럼 
        // 기존 배열을 복사하고 끝에 새 항목을 붙이는 'Spread' 기법을 사용합니다.
        addNotification(newText);
        setNewText(''); // 입력창 초기화
    };

    return (
        <div className="max-w-4xl">
            <h3 className="text-xl font-bold text-slate-800 mb-6">알림 센터 관리 (Notification Manager)</h3>

            {/* 알림 추가 폼 (Create) */}
            <form onSubmit={handleAdd} className="flex gap-2 mb-8 bg-slate-100 p-4 rounded-xl">
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    placeholder="새로운 알림 메시지를 입력하세요 (예: 서버 점검 안내)"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2 transition-all shadow-md"
                >
                    <Plus size={18} /> <span>추가</span>
                </button>
            </form>

            {/* 알림 리스트 테이블 (Read & Delete) */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Notification Message</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {notifications.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic">등록된 알림이 없습니다.</td>
                            </tr>
                        ) : (
                            notifications.map((noti) => (
                                <tr key={noti.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                            <Bell size={14} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 font-medium">{noti.text}</td>
                                    <td className="px-6 py-4 text-slate-400 flex items-center gap-1">
                                        <Calendar size={12} /> {noti.date}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => removeNotification(noti.id)}
                                            className="text-slate-300 hover:text-red-500 transition-colors"
                                            title="삭제"
                                        >
                                            {/* [초보자 가이드] 배열 삭제 로직
                          removeNotification 함수는 filter를 사용하여 
                          선택한 ID만 제외한 '새 배열'을 만듭니다. */}
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NotificationManager;
