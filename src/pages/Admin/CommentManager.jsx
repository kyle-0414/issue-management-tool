import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

const CommentManager = ({ comments, updateComment }) => {
    // 수정 중인 키값을 저장하여 UI에서 강조합니다.
    const [editingKey, setEditingKey] = useState(null);

    const commentLabels = {
        passRate: "Pass Rate (통과율) 코멘트",
        criticalBugs: "Critical Bugs 코멘트",
        fixTime: "Avg. Fix Time 코멘트",
        coverage: "Test Coverage 코멘트",
        goldenCross: "트렌드 차트 Insight",
        blocked: "진척도 차트 Insight",
        cycleStrategy: "차수별 전략 Insight",
        risk: "리스크 테이블 Insight",
        action: "Action Required 알림"
    };

    const handleSave = (key, value) => {
        updateComment(key, value);
        setEditingKey(key);
        setTimeout(() => setEditingKey(null), 2000); // 2초 후 강조 해제
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-bold text-slate-800">Kyle의 코멘트 관리</h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">CRUD</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(commentLabels).map(([key, label]) => (
                    <div key={key} className={`p-5 rounded-xl border transition-all ${editingKey === key ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-indigo-200'}`}>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
                        <textarea
                            value={comments[key]}
                            onChange={(e) => handleSave(key, e.target.value)}
                            className="w-full p-3 text-sm text-slate-700 border border-slate-100 rounded-lg focus:border-indigo-300 outline-none min-h-[80px] bg-slate-50/50 resize-none"
                        />
                        <div className="flex justify-end mt-2">
                            <span className="text-[10px] text-slate-400 italic">입력 시 즉시 반영됩니다 (LocalStorage 저장)</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3 text-amber-800">
                <AlertCircle size={20} className="shrink-0" />
                <p className="text-xs leading-relaxed">
                    <strong>안내:</strong> 이곳에서 수정된 내용은 대시보드의 'Kyle의 코멘트' 버튼이 [On] 상태일 때 각 위치(카드 툴팁, 차트 하단 등)에 즉시 노출됩니다.
                </p>
            </div>
        </div>
    );
};

export default CommentManager;
