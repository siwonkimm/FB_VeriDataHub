import React, { useState } from 'react';
import { X, PlusCircle, Database, Link2, Sparkles, Send, FileText } from 'lucide-react';
import { STATUS_TYPES } from '../feed/StatusBadge';
import { apiClient } from '../../api/axios';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI / 머신러닝');
  const [status, setStatus] = useState(STATUS_TYPES.IN_PROGRESS);
  const [datasetName, setDatasetName] = useState('');
  const [datasetUrl, setDatasetUrl] = useState('');
  const [verificationScore, setVerificationScore] = useState(75);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPostData = {
      title,
      category,
      status,
      datasetName: datasetName || 'public_dataset_v1.csv',
      datasetUrl: datasetUrl || 'https://github.com',
      verificationScore: Number(verificationScore),
      content,
      createdAt: '방금 전',
      upvotes: 1,
      commentsCount: 0,
      objectionsCount: 0,
      author: {
        name: '연구원 (나)',
        role: '데이터 검증원',
      },
    };

    try {
      // Connect to Spring Boot backend http://54.206.127.84:8080/api/posts
      const response = await apiClient.post('/api/posts', newPostData);
      if (onPostCreated) {
        onPostCreated(response || newPostData);
      }
    } catch (err) {
      console.info('Backend server offline during post creation. Adding to local feed state.', err);
      if (onPostCreated) {
        onPostCreated({ ...newPostData, id: Date.now() });
      }
    } finally {
      setIsSubmitting(false);
      onClose();
      // Reset form
      setTitle('');
      setContent('');
      setDatasetName('');
      setDatasetUrl('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">새 데이터 검증 요청 작성</h3>
              <p className="text-xs text-slate-400">새로운 데이터셋이나 분석 모델의 교차검증을 커뮤니티에 요청합니다.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          
          {/* Post Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              게시글 제목 / 검증 대상명
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 2026 수도권 교통량 데이터셋의 시간대별 샘플링 편향 검증"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Category & Initial Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">도메인 분야</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="AI / 머신러닝">🤖 AI / 머신러닝</option>
                <option value="의료 / 바이오">🩺 의료 / 바이오</option>
                <option value="금융 & 증권">📈 금융 & 증권</option>
                <option value="공공 / 환경">🏛️ 공공 / 환경</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">초기 검증 상태 태그</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value={STATUS_TYPES.IN_PROGRESS}>🟡 교차검증 진행중 (In Progress)</option>
                <option value={STATUS_TYPES.SUSPICIOUS}>🔴 편향/오류 의심 (Suspicious)</option>
                <option value={STATUS_TYPES.VERIFIED}>🟢 검증 완료 (Verified)</option>
              </select>
            </div>
          </div>

          {/* Dataset Name & Dataset URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">데이터셋/파일명</label>
              <div className="relative">
                <Database className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="data_sample_v1.csv"
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">출처/원문 URL</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="url"
                  value={datasetUrl}
                  onChange={(e) => setDatasetUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Initial Verification Score Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>초기 자가 검증 신뢰도 점수:</span>
              <span className="font-mono font-bold text-indigo-400">{verificationScore}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={verificationScore}
              onChange={(e) => setVerificationScore(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              검증 요청 상세 설명 및 분석 내용
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="데이터의 수집 경로, 이상치 포착 여부, 교차검증에 필요한 주요 변수들을 작성해주세요..."
              className="w-full p-3 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2 shrink-0">
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
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? (
                <span>등록 중...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>검증 요청 게시글 등록</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
