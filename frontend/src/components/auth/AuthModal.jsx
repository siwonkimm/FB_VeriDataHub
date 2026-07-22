import React, { useState } from 'react';
import { X, Mail, Lock, User, Briefcase, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('데이터 과학자');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      if (authMode === 'login') {
        await login({ email, password });
      } else {
        await signup({ email, password, name, role });
      }
    } catch (err) {
      setErrorMsg('인증 처리 중 오류가 발생했습니다. 입력값을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-100">
              VeriData Hub {authMode === 'login' ? '로그인' : '검증원 회원가입'}
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-1">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            신규 검증원 가입
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl">
              {errorMsg}
            </div>
          )}

          {authMode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">성함 / 연구원명</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">소속 / 주 연구 분야</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="데이터 과학자">데이터 과학자 (Data Scientist)</option>
                    <option value="AI / ML 엔지니어">AI / ML 엔지니어</option>
                    <option value="통계 분석가">통계 분석가 (Statistician)</option>
                    <option value="의료/임상 연구원">의료/임상 연구원</option>
                    <option value="금융 리스크 분석가">금융 리스크 분석가</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@veridata.io"
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>인증 처리 중...</span>
            ) : (
              <>
                <span>{authMode === 'login' ? '로그인하기' : '검증원 등록 완료'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-500 pt-2">
            Spring Boot 백엔드 (`http://54.206.127.84:8080`) 토큰 연동 Ready
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
