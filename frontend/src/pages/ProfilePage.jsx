import React, { useState } from 'react';
import { User, ShieldCheck, Award, FileText, AlertCircle, Edit3, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = ({ onBackToFeed }) => {
  const { user, updateUserProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '김검증 연구원');
  const [role, setRole] = useState(user?.role || '데이터 분석 전문가');
  const [activeTab, setActiveTab] = useState('my-posts'); // 'my-posts' | 'my-objections'

  const myPosts = [
    {
      id: 101,
      title: '서울시 자율주행 택시 데이터셋 2026 Q1 수집 결과 편향성 검증 요청',
      status: 'SUSPICIOUS',
      createdAt: '2026-07-22',
      verificationScore: 48,
    },
    {
      id: 104,
      title: '전국 기후 변화 온실가스 데이터 측정값 딥러닝 보정 정확도 분석',
      status: 'VERIFIED',
      createdAt: '2026-07-20',
      verificationScore: 92,
    },
  ];

  const myObjections = [
    {
      id: 'obj-99',
      postTitle: 'LLM 한국어 인공지능 평가 데이터셋 편향성 검증 보고서',
      type: '데이터 샘플링 편향 (Sampling Bias)',
      createdAt: '2026-07-21',
      status: '승인됨 (Accepted)',
    },
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name, role });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 space-y-6">
      
      {/* Profile Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-xl">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-extrabold text-xl text-indigo-300">
                {name.substring(0, 2).toUpperCase()}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100">{name}</h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full">
                  {user?.trustLevel || 'Lv.4 검증원'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{role} · {user?.email || 'researcher@veridata.io'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                onClick={handleSaveProfile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>저장</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>프로필 수정</span>
              </button>
            )}
            <button
              onClick={onBackToFeed}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-xl transition-all"
            >
              닫기
            </button>
          </div>
        </div>

        {/* Profile Edit Inputs */}
        {isEditing && (
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">성함 / 연구원명</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">소속 / 역할</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800"
              />
            </div>
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-500">검증 신뢰 점수</span>
            <p className="text-base font-extrabold text-emerald-400 font-mono">88 / 100</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-500">작성한 검증 요청</span>
            <p className="text-base font-extrabold text-indigo-400 font-mono">{myPosts.length}건</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
            <span className="text-[10px] text-slate-500">제출한 이의제기</span>
            <p className="text-base font-extrabold text-rose-400 font-mono">{myObjections.length}건</p>
          </div>
        </div>
      </div>

      {/* Activity History Tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('my-posts')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
              activeTab === 'my-posts'
                ? 'bg-slate-900 text-indigo-400 border-t-2 border-indigo-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            내 데이터 검증 요청글 ({myPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('my-objections')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
              activeTab === 'my-objections'
                ? 'bg-slate-900 text-indigo-400 border-t-2 border-indigo-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            내 이의제기 내역 ({myObjections.length})
          </button>
        </div>

        {activeTab === 'my-posts' ? (
          <div className="space-y-3">
            {myPosts.map((p) => (
              <div key={p.id} className="p-4 rounded-xl glass-card border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-bold text-slate-200">{p.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1">등록일: {p.createdAt}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-indigo-300 font-bold">{p.verificationScore}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {myObjections.map((o) => (
              <div key={o.id} className="p-4 rounded-xl glass-card border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-rose-400 font-semibold">{o.type}</span>
                  <h3 className="font-bold text-slate-200 mt-0.5">{o.postTitle}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
