import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import IssueListPage from './pages/IssueList/IssueListPage';
import AdminLayout from './pages/Admin/AdminLayout';

// 초기 기본값 설정 (LocalStorage에 데이터가 없을 경우 사용)
const INITIAL_PROJECT_INFO = {
  title: "FinTech Mobile App v2.4.0 (RC1)",
  version: "0.1.0",
};

const INITIAL_COMMENTS = {
  passRate: "1차(72%) 대비 많이 개선되었습니다. 하지만 아직 목표치 98%까지 갈 길이 멉니다.",
  criticalBugs: "이 숫자가 0이 아니면 절대 출시 불가입니다. 진척률이 99%라도 의미 없습니다. Red Light!",
  fixTime: "개발팀의 속도입니다. 이 시간이 늘어나면 병목이 생겼거나 난이도가 높아진 것입니다.",
  coverage: "우리가 놓치고 있는 영역이 없는지 확인합니다. 목표치 90%를 넘겨 안정적입니다.",
  goldenCross: "\"D-6 지점을 보세요. Closed(초록)가 Opened(빨강)를 뚫고 올라갔습니다. 버그 발생보다 잡는 속도가 빨라진 '안정화 단계' 증거입니다.\"",
  blocked: "\"Blocked에 주목하세요! QA 문제가 아닙니다. 환경 이슈나 선행 개발 지연을 즉시 에스컬레이션 해야 합니다.\"",
  cycleStrategy: "\"1차, 2차의 Pass Rate 숫자보다 중요한 것은 4차 Ad-hoc 단계에서 Critical Bug가 '0'으로 수렴하는지 확인하는 것입니다. 리스크를 0으로 만드는 과정입니다.\"",
  risk: "\"Payment Gateway가 Critical입니다. 다른 모듈 테스트를 일시 중단하고 QA 역량을 결제 모듈에 집중시켜야 합니다.\"",
  action: "\"Critical 버그가 2건 존재합니다. 개발 리드와 즉시 미팅을 잡으세요.\""
};

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: "신규 버그 5건이 보고되었습니다.", date: "2024-02-10" },
  { id: 2, text: "Payment Gateway 모듈 리스크가 상승했습니다.", date: "2024-02-09" },
];

function App() {
  // --- 상태 관리 (States) ---
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'issue-list', 'admin-project', ...
  const [showInsights, setShowInsights] = useState(false);

  // 데이터 상태 (LocalStorage 로드 포함)
  const [projectInfo, setProjectInfo] = useState(() => {
    const saved = localStorage.getItem('qa_project_info');
    return saved ? JSON.parse(saved) : INITIAL_PROJECT_INFO;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('qa_comments');
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('qa_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // --- 저장 (Persistence) ---
  useEffect(() => {
    localStorage.setItem('qa_project_info', JSON.stringify(projectInfo));
  }, [projectInfo]);

  useEffect(() => {
    localStorage.setItem('qa_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('qa_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // --- 핸들러 (Handlers) ---
  const toggleInsights = () => setShowInsights(!showInsights);
  const handleNavigate = (view) => setCurrentView(view);

  // 알림 추가/삭제 로직 (팁: filter와 spread 연산자 사용)
  const addNotification = (text) => {
    const newNoti = { id: Date.now(), text, date: new Date().toISOString().split('T')[0] };
    setNotifications([...notifications, newNoti]); // 기존 배열에 새 객체 추가
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(noti => noti.id !== id)); // ID가 다른 것만 남기기 (삭제 효과)
  };

  const updateComment = (key, value) => {
    setComments({ ...comments, [key]: value }); // 특정 키값만 업데이트
  };

  // 뷰 렌더링 헬퍼
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard showInsights={showInsights} comments={comments} />;
      case 'issue-list':
        return <IssueListPage showInsights={showInsights} comments={comments} />;
      default:
        return (
          <AdminLayout
            currentView={currentView}
            projectInfo={projectInfo}
            setProjectInfo={setProjectInfo}
            comments={comments}
            updateComment={updateComment}
            notifications={notifications}
            addNotification={addNotification}
            removeNotification={removeNotification}
          />
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${showInsights ? 'insight-active' : ''}`}>
      {/* 1. 사이드바 (내비게이션 기능 추가) */}
      <Sidebar onNavigate={handleNavigate} currentView={currentView} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 2. 상단 헤더 (프로젝트명, 알림 연동) */}
        <Header
          projectInfo={projectInfo}
          notifications={notifications}
          onRemoveNotification={removeNotification}
          onToggleInsights={toggleInsights}
          showInsights={showInsights}
        />

        {/* 3. 메인 콘텐츠 (뷰에 따라 전환) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth bg-slate-50/50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;