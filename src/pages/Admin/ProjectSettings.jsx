import React, { useState } from 'react';
import { Save } from 'lucide-react';

const ProjectSettings = ({ projectInfo, setProjectInfo }) => {
    // 로컬 상태로 폼 데이터를 관리합니다 (입력 시마다 즉시 저장되기보단 Save 클릭 시 저장)
    const [formData, setFormData] = useState(projectInfo);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProjectInfo(formData);
        alert('프로젝트 정보가 저장되었습니다!');
    };

    return (
        <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-slate-800 mb-6">프로젝트 기본 설정</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">대시보드 타이틀</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="프로젝트 명을 입력하세요"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">시스템 버전</label>
                    <input
                        type="text"
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="v1.0.0"
                    />
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    <Save size={18} />
                    <span>설정 저장하기</span>
                </button>
            </form>
        </div>
    );
};

export default ProjectSettings;
