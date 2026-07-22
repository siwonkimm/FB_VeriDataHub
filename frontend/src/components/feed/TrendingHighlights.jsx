import React from 'react';
import { Flame, ShieldCheck, AlertTriangle, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import StatusBadge, { STATUS_TYPES } from './StatusBadge';

const TrendingHighlights = ({ onSelectPost }) => {
  const highlights = [
    {
      id: 'trend-1',
      title: 'LLM 한국어 인공지능 평가 데이터셋 편향성 검증 보고서',
      category: 'AI / 머신러닝',
      status: STATUS_TYPES.SUSPICIOUS,
      objectionsCount: 14,
      verificationScore: 42,
      trendTag: 'HOT 이의제기',
      summary: '샘플링 과정에서 특정 연령대 응답 비중 78% 편중 사례 포착',
    },
    {
      id: 'trend-2',
      title: '2026년 수도권 미세먼지 측정 센서 수집 데이터 교차검증',
      category: '공공 / 환경',
      status: STATUS_TYPES.VERIFIED,
      objectionsCount: 1,
      verificationScore: 98,
      trendTag: '최다 교차검증',
      summary: '독립 12개 센서 노드 데이터 대조 완료. 신뢰도 98.4% 달성',
    },
    {
      id: 'trend-3',
      title: '암환자 임상시험 유전자 표적 데이터베이스 정밀성 재검증',
      category: '의료 / 바이오',
      status: STATUS_TYPES.IN_PROGRESS,
      objectionsCount: 5,
      verificationScore: 75,
      trendTag: '검증 진행중',
      summary: '국내 3개 대학병원 임상 연구팀 공동 검증 절차 수행 중',
    },
  ];

  return (
    <section className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400/20 animate-pulse" />
          </div>
          <h2 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-2">
            실시간 주목할 주요 검증 결과
            <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
              Trending Top 3
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {highlights.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPost(item)}
            className="group relative p-4 rounded-2xl glass-card border border-slate-800 hover:border-indigo-500/40 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Category & Status Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                  {item.category}
                </span>
                <StatusBadge status={item.status} size="sm" />
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug mb-1.5">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {item.summary}
              </p>
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400">신뢰도:</span>
                <span className={`font-bold ${
                  item.verificationScore >= 80 ? 'text-emerald-400' : item.verificationScore < 50 ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {item.verificationScore}%
                </span>
              </div>

              <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-300 transition-colors font-medium">
                <span>자세히 보기</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingHighlights;
