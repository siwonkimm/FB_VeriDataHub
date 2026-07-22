import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  FileText, 
  TrendingUp, 
  Layers, 
  Award, 
  Users,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { STATUS_TYPES } from '../feed/StatusBadge';

const Sidebar = ({ 
  activeFilter, 
  setActiveFilter, 
  currentCategory, 
  setCurrentCategory,
  currentView,
  setCurrentView
}) => {
  const mainNav = [
    { id: 'ALL', label: '전체 피드 (Feed)', icon: Home },
    { id: STATUS_TYPES.VERIFIED, label: '검증완료 데이터', icon: ShieldCheck, badge: 'Verified', color: 'text-emerald-400' },
    { id: STATUS_TYPES.SUSPICIOUS, label: '편향/오류 의심건', icon: AlertTriangle, badge: 'Issues', color: 'text-rose-400' },
    { id: STATUS_TYPES.IN_PROGRESS, label: '검증 진행중', icon: Clock, badge: 'Reviewing', color: 'text-amber-400' },
  ];

  const categories = [
    { id: 'all', label: '전체 분야' },
    { id: 'ai-ml', label: '🤖 AI / 머신러닝 모델' },
    { id: 'medical', label: '🩺 임상/의료 데이터' },
    { id: 'finance', label: '📈 금융 & 증권 데이터' },
    { id: 'public', label: '🏛️ 공공/통계 통계자료' },
  ];

  const platformStats = [
    { label: '누적 상호검증건', count: '1,428건' },
    { label: '평균 검증 신뢰도', count: '94.2%' },
    { label: '해결된 이의제기', count: '389건' },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block space-y-6 py-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pr-2">
      
      {/* View Mode Switching Navigation */}
      <div className="space-y-1 bg-indigo-950/30 p-2.5 rounded-2xl border border-indigo-500/20">
        <h3 className="px-3 py-1 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
          서비스 대시보드 전환
        </h3>
        <button
          onClick={() => setCurrentView('feed')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            currentView === 'feed'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>메인 검증 피드</span>
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            currentView === 'profile'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>내 마이페이지</span>
        </button>

        <button
          onClick={() => setCurrentView('admin')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            currentView === 'admin'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>어드민 & 이의심사</span>
        </button>
      </div>

      {/* Primary Verification Navigation */}
      <div className="space-y-1 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
        <h3 className="px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          상태별 검증 탐색
        </h3>
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === 'feed' && activeFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView('feed');
                setActiveFilter(item.id);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${item.color || (isActive ? 'text-indigo-400' : 'text-slate-400')}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Domain / Category Filter */}
      <div className="space-y-1 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
        <h3 className="px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          도메인 카테고리
        </h3>
        {categories.map((cat) => {
          const isActive = currentView === 'feed' && currentCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setCurrentView('feed');
                setCurrentCategory(cat.id);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-800 text-white font-semibold border-l-2 border-indigo-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Platform Real-time Metrics Card */}
      <div className="glass-panel p-4 rounded-2xl space-y-3 bg-gradient-to-b from-slate-900/80 to-indigo-950/20 border border-indigo-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>실시간 플랫폼 지표</span>
          </div>
          <span className="text-[10px] text-slate-500">Live</span>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-1">
          {platformStats.map((stat, i) => (
            <div key={i} className="flex justify-between items-center bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800/60">
              <span className="text-[11px] text-slate-400">{stat.label}</span>
              <span className="text-xs font-bold text-indigo-300 font-mono">{stat.count}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1 hover:text-indigo-300 cursor-pointer transition-colors">
          <span>Spring Boot API 연결 중</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
