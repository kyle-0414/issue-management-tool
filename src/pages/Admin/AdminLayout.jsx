import React from 'react';
import ProjectSettings from './ProjectSettings';
import CommentManager from './CommentManager';
import NotificationManager from './NotificationManager';

const AdminLayout = ({
    currentView,
    projectInfo,
    setProjectInfo,
    comments,
    updateComment,
    notifications,
    addNotification,
    removeNotification
}) => {

    // 현재 선택된 서브 메뉴에 따라 다른 컴포넌트를 렌더링합니다.
    const renderContent = () => {
        switch (currentView) {
            case 'admin-project':
                return <ProjectSettings projectInfo={projectInfo} setProjectInfo={setProjectInfo} />;
            case 'admin-comments':
                return <CommentManager comments={comments} updateComment={updateComment} />;
            case 'admin-notifications':
                return <NotificationManager notifications={notifications} addNotification={addNotification} removeNotification={removeNotification} />;
            default:
                return <div>메뉴를 선택해주세요.</div>;
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Admin System</h2>
                <p className="text-slate-500 text-sm mt-1">대시보드의 모든 콘텐츠를 이곳에서 제어할 수 있습니다.</p>
            </div>

            <div className="p-8">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminLayout;
