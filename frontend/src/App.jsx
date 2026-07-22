import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MainFeedPage from './pages/MainFeedPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostModal from './components/post/CreatePostModal';
import AuthModal from './components/auth/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { STATUS_TYPES } from './components/feed/StatusBadge';
import { ShieldCheck, MessageSquarePlus, Sparkles, Activity, FileText } from 'lucide-react';

function AppContent() {
  const [currentView, setCurrentView] = useState('feed'); // 'feed' | 'admin' | 'profile'
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newlyCreatedPost, setNewlyCreatedPost] = useState(null);

  const handlePostCreated = (newPost) => {
    setNewlyCreatedPost(newPost);
    setCurrentView('feed');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenNewPost={() => setIsCreatePostOpen(true)}
        onNavigateView={(view) => setCurrentView(view)}
      />

      {/* Main Container Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex gap-8">
        
        {/* Left Sidebar */}
        <Sidebar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        {/* Central Dynamic View Area */}
        <main className="flex-1 py-6 min-w-0">
          {currentView === 'feed' && (
            <MainFeedPage
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              currentCategory={currentCategory}
              searchTerm={searchTerm}
              newPostData={newlyCreatedPost}
              setNewPostData={setNewlyCreatedPost}
            />
          )}

          {currentView === 'admin' && (
            <AdminDashboardPage onBackToFeed={() => setCurrentView('feed')} />
          )}

          {currentView === 'profile' && (
            <ProfilePage onBackToFeed={() => setCurrentView('feed')} />
          )}
        </main>

        {/* Right Info Widget Panel (Desktop) */}
        <aside className="w-72 shrink-0 hidden xl:block space-y-6 py-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Quick Guide Box */}
          <div className="glass-panel p-4 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>VeriData 상호검증 참여법</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              공개 데이터셋이나 AI 모델 결과물의 오류가 의심될 경우, <span className="text-slate-200 font-medium">‘이의 제기’</span> 버튼을 통해 반박 근거와 논문/데이터 링크를 등록하세요.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>검증 완료: 3명 이상 전문 검증 승인</span>
              </div>
              <div className="flex items-center gap-2 text-rose-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>편향 의심: 유효한 이의제기 접수 상태</span>
              </div>
            </div>
          </div>

          {/* Top Verification Contributors */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>주간 이달의 검증왕</span>
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
            </h3>
            <div className="space-y-2.5">
              {[
                { name: '김데이터 박사', rank: '1위', score: '24회 검증', badge: '🥇' },
                { name: '이통계 연구원', rank: '2위', score: '19회 검증', badge: '🥈' },
                { name: '박AI 개발자', rank: '3위', score: '15회 검증', badge: '🥉' },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-950/60 border border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span>{user.badge}</span>
                    <span className="font-semibold text-slate-200">{user.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300">{user.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-2 text-[11px] text-slate-600 space-y-1">
            <p>© 2026 VeriData Hub Platform</p>
            <p>Spring Boot Backend Integration Ready</p>
          </div>
        </aside>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPostCreated={handlePostCreated}
      />

      {/* Auth Modal (Login / Signup) */}
      <AuthModal />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
