import React, { useState } from 'react';
import { X, AlertOctagon, Link2, FileText, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

const ObjectionModal = ({ isOpen, onClose, post, onSubmitObjection }) => {
  const [objectionType, setObjectionType] = useState('SAMPLING_BIAS');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to Spring Boot backend
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      if (onSubmitObjection) {
        onSubmitObjection({
          postId: post.id,
          type: objectionType,
          evidenceUrl,
          description,
          createdAt: new Date().toISOString(),
        });
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setEvidenceUrl('');
        setDescription('');
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">데이터 이의 제기 및 오류 제보</h3>
              <p className="text-xs text-slate-400">데이터 편향성이나 논리적 오류를 검증진에 보고합니다.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-100">이의 제기가 접수되었습니다!</h4>
            <p className="text-xs text-slate-400">
              크로스 검증 위원회 및 유저 집단 지성을 통해 해당 건이 재검토됩니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Target Post Info */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">대상 게시글</span>
              <p className="font-bold text-slate-200 truncate mt-0.5">{post.title}</p>
            </div>

            {/* Objection Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                이의 제기 유형 선택
              </label>
              <select
                value={objectionType}
                onChange={(e) => setObjectionType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="SAMPLING_BIAS">데이터 샘플링 편향 (Sampling Bias)</option>
                <option value="LOGICAL_FLAW">통계 해석/논리적 오류 (Logical Flaw)</option>
                <option value="OUTDATED_SOURCE">출처 미비 또는 구버전 데이터 사용</option>
                <option value="FABRICATED_METRIC">지표 왜곡 및 조작 의심</option>
                <option value="OTHER">기타 기타 사유</option>
              </select>
            </div>

            {/* Evidence URL */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                반박 근거 링크 / 논문 / 데이터셋 URL
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="url"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="https://github.com/... or doi.org/..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none placeholder-slate-600"
                  required
                />
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                상세 반박 및 결함 설명
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="어느 지점에서 데이터 왜곡이나 수식 결함이 발생하는지 구체적으로 기술해주세요..."
                className="w-full p-3 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none placeholder-slate-600 resize-none"
                required
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/20 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span>제출 처리중...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>이의 제기 제출하기</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ObjectionModal;
