import React, { useState } from 'react';
import { Search, PlusCircle, Bell, Database, Shield, User, Menu, X, LogOut, LogIn, ShieldAlert, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onOpenNewPost, searchTerm, setSearchTerm, onNavigateView }) => {
  const { user, logout, openLogin, openSignup } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateView('feed')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Database className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                    Veri<span className="text-indigo-400">Data</span>
                  </span>
                  <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                    HUB
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  데이터 상호검증 커뮤니티
                </span>
              </div>
            </button>
          </div>

          {/* Central Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검증 게시글, 데이터셋, 편향 제약 조건 검색..."
                className="block w-full pl-10 pr-4 py-2 text-sm bg-slate-900/90 text-slate-200 placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Area: Post Button, Notifications, User Auth */}
          <div className="flex items-center gap-3">
            
            {/* Quick Admin Access Button */}
            <button
              onClick={() => onNavigateView('admin')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>어드민 심사</span>
            </button>

            <button
              onClick={onOpenNewPost}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-95 transition-all duration-200"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">새 검증 요청</span>
              <span className="sm:hidden">글쓰기</span>
            </button>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-4 ring-slate-950 animate-pulse" />
            </button>

            {/* User Profile / Auth Action */}
            <div className="relative pl-2 border-l border-slate-800">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/60 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="hidden lg:flex flex-col text-left">
                      <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                      <span className="text-[10px] text-emerald-400 font-medium">{user.trustLevel || '검증원'}</span>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-panel bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 text-xs space-y-1">
                      <div className="px-3 py-2 border-b border-slate-800">
                        <p className="font-bold text-slate-200">{user.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigateView('profile');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-slate-800 transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>내 마이페이지</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onNavigateView('admin');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-300 hover:bg-rose-500/10 transition-colors"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>어드민 심사 센터</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:bg-slate-800 transition-colors border-t border-slate-800"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        <span>로그아웃</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={openLogin}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
                  >
                    로그인
                  </button>
                  <button
                    onClick={openSignup}
                    className="px-3 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl transition-all"
                  >
                    회원가입
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
