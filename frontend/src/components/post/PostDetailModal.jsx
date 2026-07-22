import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Send, 
  Database, 
  ExternalLink, 
  AlertCircle, 
  ThumbsUp, 
  ShieldAlert,
  CheckCircle2,
  Clock,
  User
} from 'lucide-react';
import StatusBadge from '../feed/StatusBadge';
import { useAuth } from '../../context/AuthContext';

const PostDetailModal = ({ post, isOpen, onClose, onOpenObjection }) => {
  const { user } = useAuth();
  
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '이영희 연구원',
      role: 'Bio AI Specialist',
      text: '해당 데이터셋 35페이지 표 4에서 제시된 p-value 값 산정에 가중치 보정 미비점이 관찰됩니다.',
      createdAt: '1시간 전',
      upvotes: 4,
    },
    {
      id: 2,
      author: '김철수 개발자',
      role: 'Data Engineer',
      text: '독립 파이썬 재현 스크립트로 돌려본 결과, 100건 샘플 중 12건이 유실된 것으로 확인됩니다.',
      createdAt: '30분 전',
      upvotes: 7,
    },
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  if (!isOpen || !post) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: user?.name || '익명 검증원',
      role: user?.role || '데이터 연구원',
      text: newCommentText,
      createdAt: '방금 전',
      upvotes: 0,
    };

    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center gap-3">
            <StatusBadge status={post.status} size="md" />
            <span className="text-xs font-semibold text-slate-400 font-mono">ID #{post.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Post Header */}
          <div className="space-y-3">
            <h1 className="text-xl font-extrabold text-slate-100 leading-snug">{post.title}</h1>
            
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-indigo-300">{post.author?.name || '익명 연구원'}</span>
                <span>·</span>
                <span>{post.author?.role || 'Data Analyst'}</span>
                <span>·</span>
                <span>{post.createdAt}</span>
              </div>
              
              <button
                onClick={() => {
                  onClose();
                  onOpenObjection(post);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all font-semibold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>이의 제기 제출 ({post.objectionsCount || 0})</span>
              </button>
            </div>
          </div>

          {/* Dataset & Verification Score Panel */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                <span className="text-slate-400">검증 대상 데이터셋:</span>
                <span className="font-mono text-indigo-300 font-bold">{post.datasetName || 'data.csv'}</span>
              </div>

              {post.datasetUrl && (
                <a
                  href={post.datasetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:underline font-medium"
                >
                  <span>원본 데이터 링크</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Score Metric Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-400">커뮤니티 집단지성 검증 신뢰도</span>
                <span className="font-mono font-bold text-emerald-400">{post.verificationScore || 70}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${post.verificationScore || 70}%` }}
                />
              </div>
            </div>
          </div>

          {/* Post Main Body Content */}
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line">
            {post.content}
          </div>

          {/* Comments Section */}
          <div className="pt-4 border-t border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>검증 토론 & 댓글 ({comments.length})</span>
              </h3>
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="전문적 의견이나 검증 의견을 남겨주세요..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-950 text-slate-200 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>등록</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-3 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{comment.author}</span>
                      <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
                        {comment.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
