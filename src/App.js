import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './components/dashboard/Dashboard';
import IssueListPage from './pages/IssueList/IssueListPage';
import AdminLayout from './pages/Admin/AdminLayout';

// 초기 기본값 설정 (LocalStorage에 데이터가 없을 경우 사용)
const INITIAL_PROJECT_INFO = {
  title: "FinTech Mobile App v2.4.0 (RC1)",
  version: "0.2.6", // Sign-off 및 Blocked 메시지 톤앤매너 최종 보정
};

const INITIAL_COMMENTS = {
  passRate: "대규모 코드 리팩토링 영향으로 1차 통과율이 낮았습니다. 현재 3차 회귀 테스트 단계에서 목표치 98%에 도달하기 위한 집중 검증이 진행 중입니다.",
  criticalBugs: "릴리즈 블로커 이슈인 Critical 이 2건 존재합니다. 해당 이슈는 최대한 우선순위를 높여 대응 부탁드릴게요~",
  fixTime: "평균 수정 소요 시간(MTTR)이 소폭 상승했습니다. 결제 모듈의 복잡도로 인한 현상으로 보이나, 전체 일정에 영향이 없도록 모니터링이 필요합니다.",
  goldenCross: "\"D-6 지점을 보세요. Closed(초록)가 Opened(빨강)를 뚫고 올라갔습니다. 버그 발생보다 잡는 속도가 빨라진 '안정화 단계'의 결정적 증거입니다.\"",
  blocked: "Blocked 이슈들이 존재합니다. QA 가능하도록 빠르게 관련 기능의 개발 부탁드릴게요.",
  cycleStrategy: "\"4차 탐색적 테스팅(Exploratory Testing) 단계의 핵심은 사이드 이펙트 추적입니다. Critical Bug가 모두 해소되지 않으면 Sign-off 를 할 수 없습니다.\"",
  unresolved: "오래된 이슈들이 너무 방치되고 있어요~ 오래된 이슈도 신경써 주시면 감사하겠습니다.",
  reopenRate: "Re-open 이슈가 지속적으로 발생되고 있어서 우려가 됩니다. 수정 시 개발자 테스트에도 조금만 더 신경써 주세요^^",
  risk: "\"Payment Gateway 모듈의 상태가 Critical입니다. 현재 다른 마이너 모듈 테스트를 일시 중단하고 QA 역량을 결제 엔진에 집중시키겠습니다.\"",
  action: "\"Critical 버그 해결을 위해 금일 오후 개발 리드와 긴급 미팅을 가질 예정입니다.\"",
  coverage: "전체 테스트의 92%가 진행된 상태입니다. 이제 릴리즈가 얼마 안남았는데 모두 화이팅입니다!! "
};

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: "신규 버그 5건이 보고되었습니다.", date: "2024-03-24" },
  { id: 2, text: "Payment Gateway 모듈 리스크가 상승했습니다.", date: "2024-03-23" },
];

// 초기 이슈 데이터 (풍성한 트렌드 그래프를 위해 20건 이상 확보)
const INITIAL_ISSUES = [
  { id: 'QA-101', summary: 'Payment gateway timeout on production', severity: 'Critical', status: 'Open', project: 'FinTech App', reopen: 'Yes', module: 'Payment Gateway' },
  { id: 'QA-102', summary: 'Incorrect font size in login page', severity: 'Minor', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'User Auth' },
  { id: 'QA-103', summary: 'Missing translation for KR locale', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Localization' },
  { id: 'QA-104', summary: 'App crashes when switching tabs rapidly', severity: 'Major', status: 'Reopened', project: 'FinTech App', reopen: 'Yes', module: 'Navigation' },
  { id: 'QA-105', summary: 'Slow API response on user profile search', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Search' },
  { id: 'QA-106', summary: 'Security token expiration bug', severity: 'Critical', status: 'Open', project: 'FinTech App', reopen: 'No', module: 'User Auth' },
  { id: 'QA-107', summary: 'Footer overlapping on mobile view', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'User UI' },
  { id: 'QA-108', summary: 'Empty state not showing in list', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'User UI' },
  { id: 'QA-109', summary: 'Double charging on zero-balance accounts', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'Yes', module: 'Payment Gateway' },
  { id: 'QA-110', summary: 'Navigation drawer animation jank', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'Navigation' },
  { id: 'QA-111', summary: 'Wrong currency symbol for JPY', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Localization' },
  { id: 'QA-112', summary: 'User cannot update profile picture', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Profile' },
  { id: 'QA-113', summary: 'Log out button unresponsive', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'User Auth' },
  { id: 'QA-114', summary: 'Search history not persisting', severity: 'Minor', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Search' },
  { id: 'QA-115', summary: 'Terms and conditions typo', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'Localization' },
  { id: 'QA-116', summary: 'Dark mode contrast issues', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'User UI' },
  { id: 'QA-117', summary: 'Push notification deep link failure', severity: 'Major', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'Navigation' },
  { id: 'QA-118', summary: 'Transaction history slow loading', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Payment Gateway' },
  { id: 'QA-119', summary: 'Password requirements text missing', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'User Auth' },
  { id: 'QA-120', summary: 'Cache not clearing on data update', severity: 'Major', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'Navigation' },
  { id: 'QA-121', summary: 'Wrong profile image rendering on Android', severity: 'Major', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'Profile' },
  { id: 'QA-122', summary: 'Session timeout occurs too early', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'User Auth' },
  { id: 'QA-123', summary: 'Search filter categories missing', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'Search' },
  { id: 'QA-124', summary: 'Terms of service link broken', severity: 'Minor', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Localization' },
  { id: 'QA-125', summary: 'Credit card scanner failure', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Payment Gateway' },
  { id: 'QA-126', summary: 'Dark mode toggle is laggy', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'User UI' },
  { id: 'QA-127', summary: 'Biometric login fails on some devices', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'User Auth' },
  { id: 'QA-128', summary: 'Language switcher reset on refresh', severity: 'Major', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Localization' },
  { id: 'QA-129', summary: 'Balance hide icon misaligned', severity: 'Minor', status: 'Closed', project: 'FinTech App', reopen: 'No', module: 'User UI' },
  { id: 'QA-130', summary: 'Direct deposit help text outdated', severity: 'Minor', status: 'Resolved', project: 'FinTech App', reopen: 'No', module: 'Payment Gateway' },
];

function App() {
  // --- 상태 관리 (States) ---
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'issue-list', 'admin-project', ...
  const [showInsights, setShowInsights] = useState(false);
  const [demoToast, setDemoToast] = useState(null); // 데모용 알림 메시지 스테이트 추가

  // 데이터 상태 (버전 체크 포함하여 초기화)
  const [projectInfo, setProjectInfo] = useState(() => {
    const saved = localStorage.getItem('qa_project_info');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.version === INITIAL_PROJECT_INFO.version) return data;
        
        // 버전이 다르면 전체 초기화 (구버전 데이터 오염 방지)
        console.log("Migration: New version detected, clearing storage.");
        localStorage.clear();
      } catch (e) {
        localStorage.clear();
      }
    }
    return INITIAL_PROJECT_INFO;
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('qa_comments');
    // 위에서 projectInfo 초기화 시 clear()를 호출하므로, 
    // 버전이 다르면 saved는 이미 null이거나 clear된 상태일 것임
    return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('qa_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('qa_issues');
    return saved ? JSON.parse(saved) : INITIAL_ISSUES;
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

  useEffect(() => {
    localStorage.setItem('qa_issues', JSON.stringify(issues));
  }, [issues]);

  // --- 핸들러 (Handlers) ---
  const toggleInsights = () => setShowInsights(!showInsights);
  const handleNavigate = (view) => setCurrentView(view);

  // CSV 파싱 및 업데이트 로직
  const handleUploadIssues = (csvText) => {
    try {
      const lines = csvText.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) return;

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const newIssues = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim());
        const issue = {};
        headers.forEach((header, i) => {
          // 필드 매핑 (CSV 헤더가 한글이거나 다를 경우를 대비)
          if (header.includes('id')) issue.id = values[i];
          else if (header.includes('summary') || header.includes('제목')) issue.summary = values[i];
          else if (header.includes('severity') || header.includes('중요도')) issue.severity = values[i];
          else if (header.includes('status') || header.includes('상태')) issue.status = values[i];
          else if (header.includes('project') || header.includes('프로젝트')) issue.project = values[i];
          else if (header.includes('reopen') || header.includes('재오픈')) issue.reopen = values[i];
          else if (header.includes('module') || header.includes('모듈')) issue.module = values[i];
        });
        return issue;
      });

      setIssues(newIssues);
      addNotification(`CSV 업로드 성공: ${newIssues.length}건의 이슈가 반영되었습니다.`);
    } catch (error) {
      console.error("CSV Parsing Error:", error);
      alert("CSV 파일 형식이 올바르지 않습니다.");
    }
  };

  // 알림 추가/삭제 로직 (팁: filter와 spread 연산자 사용)
  const addNotification = (text) => {
    const newNoti = { id: Date.now(), text, date: new Date().toISOString().split('T')[0] };
    setNotifications(prev => [newNoti, ...prev].slice(0, 10)); // 최대 10개 유지
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(noti => noti.id !== id)); // ID가 다른 것만 남기기 (삭제 효과)
  };

  const updateComment = (key, value) => {
    setComments({ ...comments, [key]: value }); // 특정 키값만 업데이트
  };

  // --- Magic Demo Mode (자동화 시나리오) ---
  const scrollRef = useRef(null);
  const startDemo = async () => {
    const showToast = (msg, duration = 3000) => {
      setDemoToast(msg);
      addNotification(msg);
      setTimeout(() => setDemoToast(null), duration);
    };

    showToast("🚀 데모 시나리오를 시작합니다...");
    
    // 1. 이슈리스트 및 CSV 임포트 시뮬레이션 (탐색기 묘사)
    setCurrentView('issue-list');
    await new Promise(r => setTimeout(r, 1200));
    
    showToast("📁 CSV 파일 탐색기를 여는 중...", 2000);
    await new Promise(r => setTimeout(r, 1500));
    
    showToast("✅ 'QA_Standard_Template_30_Issues.csv' 파일이 선택되었습니다.", 2000);
    await new Promise(r => setTimeout(r, 1000));

    // 30개 이슈 CSV 템플릿 데이터 생성
    const mockCSV = [
      "id,summary,severity,status,project,reopen,module",
      ...INITIAL_ISSUES.map(i => `${i.id},${i.summary},${i.severity},${i.status},${i.project},${i.reopen},${i.module}`)
    ].join('\n');

    handleUploadIssues(mockCSV);
    showToast("📋 30개의 이슈 데이터가 성공적으로 로드되었습니다.");
    await new Promise(r => setTimeout(r, 1500));

    // 2. 대시보드로 이동하여 차트 포커스
    setCurrentView('dashboard');
    await new Promise(r => setTimeout(r, 1500));
    
    const section2 = document.getElementById('section-charts');
    if (section2) section2.scrollIntoView({ behavior: 'smooth' });
    
    // Daily/Cumulative 버튼 토글 시뮬레이션
    await new Promise(r => setTimeout(r, 1000));
    showToast("📊 트렌드 차트의 Daily/Cumulative 뷰를 전환하며 실시간 리포트를 확인합니다.");
    await new Promise(r => setTimeout(r, 2000));

    // 3. 스크롤 내리며 하단 확인
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 1200, behavior: 'smooth' });
    }
    await new Promise(r => setTimeout(r, 2000));

    // 4. 최상단 복귀 및 카일 인사이트 활성화
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    await new Promise(r => setTimeout(r, 1200));
    setShowInsights(true);
    showToast("💡 Kyle의 AI 기반 퀄리티 인사이트 모드를 활성화했습니다.");

    // 5. 2초 대기 후 하단으로 천천히 이동하며 코멘트 확인
    await new Promise(r => setTimeout(r, 2000));
    if (scrollRef.current) {
      let currentPos = 0;
      const targetPos = 2000;
      const interval = setInterval(() => {
        if (currentPos >= targetPos) {
          clearInterval(interval);
        } else {
          currentPos += 150;
          scrollRef.current.scrollTo({ top: currentPos, behavior: 'smooth' });
        }
      }, 300);
      
      await new Promise(r => setTimeout(r, 5000));
    }

    // 6. 이슈 리스트로 다시 이동하여 구성 확인
    setCurrentView('issue-list');
    await new Promise(r => setTimeout(r, 1200));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 600, behavior: 'smooth' });
    }
    
    showToast("✅ 모든 데모 시나리오가 완료되었습니다!");
  };

  // 뷰 렌더링 헬퍼
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard showInsights={showInsights} comments={comments} issues={issues} />;
      case 'issue-list':
        return <IssueListPage showInsights={showInsights} comments={comments} issues={issues} onUpload={handleUploadIssues} />;
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
            issues={issues}
            setIssues={setIssues}
          />
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${showInsights ? 'insight-active' : ''}`}>
      {/* 1. 사이드바 (내비게이션 기능 추가 + 데모 트리거) */}
      <Sidebar onNavigate={handleNavigate} currentView={currentView} issues={issues} onStartDemo={startDemo} />

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
        <main 
          ref={scrollRef}
          className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 scroll-smooth bg-slate-50/50 relative"
        >
          {renderContent()}

          {/* 데모용 Toast 알림 바 - 콤팩트한 디자인으로 축소 */}
          {demoToast && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] animate-fadeIn">
              <div className="bg-indigo-600/95 text-white px-5 py-2.5 rounded-full shadow-xl border border-white/20 backdrop-blur-sm flex items-center gap-3 whitespace-nowrap">
                <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full animate-pulse" />
                <span className="font-bold text-sm tracking-tight">{demoToast}</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;