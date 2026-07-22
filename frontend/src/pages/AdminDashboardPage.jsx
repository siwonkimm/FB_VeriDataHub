import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import StatusBadge, { STATUS_TYPES } from '../components/feed/StatusBadge';

const MOCK_PENDING_OBJECTIONS = [
  {
    id: 'obj-101',
    postId: 101,
    postTitle: '서울시 자율주행 택시 데이터셋 2026 Q1 수집 결과 편향성 검증 요청',
    reporter: '이영희 연구원 (Bio AI Lab)',
    type: '데이터 샘플링 편향 (Sampling Bias)',
    evidenceUrl: 'https://github.com/seoul-autonomous/bias-report-2026',
    description: '심야 시간대 주행 샘플 데이터가 3.2%로 왜곡되어 야간 판단 모델에 미치는 영향을 검증 논문 표 3과 함께 첨부합니다.',
    createdAt: '2026-07-22 14:20',
    status: 'PENDING',
  },
  {
    id: 'obj-102',
    postId: 103,
    postTitle: '의료 임상시험 유전자 표적 치료 데이터베이스 분산 교차검증 진행상황',
    reporter: '박준혁 박사 (Genomics Lab)',
    type: '통계 해석/논리적 오류 (Logical Flaw)',
    evidenceUrl: 'https://doi.org/10.1038/s41586-026-sample',
    description: 'p-value 보정값 산정 시 벤자미니-호치버그(FDR) 교정 절차가 누락되어 위양성(False Positive) 비율이 높습니다.',
    createdAt: '2026-07-22 11:05',
    status: 'PENDING',
  },
];

const MOCK_USERS = [
  { id: 'usr-1', name: '강동원', email: 'kang@autonomous.io', role: 'AI 연구원', trustLevel: 'Lv.4 고급검증원', posts: 14, objections: 3 },
  { id: 'usr-2', name: '이지은', email: 'lee@esg-alliance.org', role: 'ESG 회계사', trustLevel: 'Lv.5 수석검증위원', posts: 28, objections: 0 },
  { id: 'usr-3', name: '박준혁', email: 'park@genomics.re.kr', role: '의학 박사', trustLevel: 'Lv.3 검증원', posts: 9, objections: 8 },
  { id: 'usr-4', name: '김데이터', email: 'kim@veridata.io', role: '데이터 엔지니어', trustLevel: 'Lv.2 신규검증원', posts: 4, objections: 1 },
];

const AdminDashboardPage = ({ onBackToFeed }) => {
  const [activeTab, setActiveTab] = useState('objections'); // 'objections' | 'users' | 'analytics'
  const [objections, setObjections] = useState(MOCK_PENDING_OBJECTIONS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleResolveObjection = (id, resolution) => {
    // resolution: 'APPROVE_SUSPICIOUS' | 'DISMISS'
    setObjections((prev) => prev.filter((item) => item.id !== id));
    alert(
      resolution === 'APPROVE_SUSPICIOUS'
        ? '이의 제기가 승인되었습니다. 해당 게시글 상태가 🔴 편향/오류 의심으로 업데이트되었습니다.'
        : '이의 제기가 기각 처리되었습니다.'
    );
  };

  const handleUpgradeUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, trustLevel: 'Lv.5 수석검증위원' } : u))
    );
    alert('사용자의 신뢰 등급이 Lv.5 수석검증위원으로 승급 처리되었습니다.');
  };

  return (
    <div className="flex-1 space-y-6">
      
      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Admin Area
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-100">
              VeriData 어드민 & 검증 심사 대시보드
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            커뮤니티에 접수된 이의제기 심사, 회원 신뢰 등급 승인 및 데이터 신뢰성 통합 모니터링
          </p>
        </div>

        <button
          onClick={onBackToFeed}
          className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
        >
          메인 피드로 돌아가기
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('objections')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all ${
            activeTab === 'objections'
              ? 'bg-slate-900 text-indigo-400 border-t-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>이의제기 심사 대기 ({objections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all ${
            activeTab === 'users'
              ? 'bg-slate-900 text-indigo-400 border-t-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>검증원 회원 관리 ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-indigo-400 border-t-2 border-indigo-500'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>플랫폼 시스템 통계</span>
        </button>
      </div>

      {/* Tab 1: Objections Review */}
      {activeTab === 'objections' && (
        <div className="space-y-4">
          {objections.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-slate-200">현재 대기 중인 이의제기가 없습니다.</p>
              <p className="text-xs text-slate-500">모든 제보건이 심사 완료되었습니다.</p>
            </div>
          ) : (
            objections.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl glass-card border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">제보자: {item.reporter}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{item.createdAt}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-100">대상: {item.postTitle}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <a
                    href={item.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-400 hover:underline"
                  >
                    <span>제출된 반박 근거 링크 검토</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResolveObjection(item.id, 'DISMISS')}
                      className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 font-semibold"
                    >
                      기각 (Dismiss)
                    </button>
                    <button
                      onClick={() => handleResolveObjection(item.id, 'APPROVE_SUSPICIOUS')}
                      className="px-3.5 py-1.5 rounded-xl text-white bg-rose-600 hover:bg-rose-500 font-bold shadow-md shadow-rose-600/20"
                    >
                      이의 승인 (편향 상태 변경)
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: User Management */}
      {activeTab === 'users' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200">등록된 데이터 검증원 리스트</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">검증원 정보</th>
                  <th className="p-3.5">소속/직함</th>
                  <th className="p-3.5">신뢰 등급</th>
                  <th className="p-3.5">작성글 / 이의제기</th>
                  <th className="p-3.5 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/60">
                    <td className="p-3.5">
                      <p className="font-bold text-slate-200">{u.name}</p>
                      <p className="text-[10px] text-slate-500">{u.email}</p>
                    </td>
                    <td className="p-3.5 text-slate-300">{u.role}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-mono">
                        {u.trustLevel}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono">
                      {u.posts}건 / {u.objections}건
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleUpgradeUser(u.id)}
                        className="px-2.5 py-1 text-[11px] font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg transition-all"
                      >
                        수석검증원 승급
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: System Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium">총 데이터 교차검증 건수</span>
            <p className="text-2xl font-extrabold text-indigo-400 font-mono">1,428건</p>
            <p className="text-[10px] text-emerald-400">전월 대비 +18.4% 증가</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium">평균 플랫폼 데이터 신뢰도</span>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">94.2%</p>
            <p className="text-[10px] text-slate-500">독립 검증 알고리즘 12개 연동중</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium">Spring Boot 백엔드 서버 상태</span>
            <p className="text-2xl font-extrabold text-cyan-400 font-mono">HEALTHY</p>
            <p className="text-[10px] text-slate-500">http://54.206.127.84:8080</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
