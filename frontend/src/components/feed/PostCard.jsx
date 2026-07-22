import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  AlertCircle, 
  Share2, 
  Bookmark, 
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Database
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const PostCard = ({ post, onOpenObjection, onSelectPost }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [userVote, setUserVote] = useState(null); // 'UP' | 'DOWN' | null
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleVote = (type, e) => {
    e.stopPropagation();
    if (userVote === type) {
      setUserVote(null);
      setUpvotes((prev) => (type === 'UP' ? prev - 1 : prev + 1));
    } else {
      const diff = userVote === null ? 1 : 2;
      setUserVote(type);
      setUpvotes((prev) => (type === 'UP' ? prev + diff : prev - diff));
    }
  };

  return (
    <article
      onClick={() => onSelectPost && onSelectPost(post)}
      className="group p-5 rounded-2xl glass-card border border-slate-800/80 hover:border-slate-700 transition-all duration-200 cursor-pointer space-y-4"
    >
      {/* Post Header: User info, Status Tag */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-bold text-xs text-indigo-300">
              {post.author?.name ? post.author.name.substring(0, 2) : 'US'}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200 hover:text-indigo-300 transition-colors">
                {post.author?.name || '익명 연구원'}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                {post.author?.role || 'Data Analyst'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {post.createdAt || '2시간 전'} · {post.category || '일반 데이터'}
            </span>
          </div>
        </div>

        {/* Verification Tag */}
        <StatusBadge status={post.status} size="sm" />
      </div>

      {/* Title & Body Content */}
      <div className="space-y-2">
        <h2 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed font-normal">
          {post.content}
        </p>
      </div>

      {/* Cross-Verification Metric Bar */}
      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-400">데이터셋 출처:</span>
          <a
            href={post.datasetUrl || '#'}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-indigo-300 hover:underline inline-flex items-center gap-1"
          >
            {post.datasetName || 'OpenDataHub_v2.csv'}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Reliability Score */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400">검증 신뢰도:</span>
          <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                post.verificationScore >= 80
                  ? 'bg-emerald-400'
                  : post.verificationScore < 50
                  ? 'bg-rose-400'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${post.verificationScore || 70}%` }}
            />
          </div>
          <span className="font-mono font-bold text-slate-200">
            {post.verificationScore || 70}%
          </span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          
          {/* Upvote Button */}
          <button
            onClick={(e) => handleVote('UP', e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              userVote === 'UP'
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="font-mono font-bold">{upvotes}</span>
          </button>

          {/* Comments Count */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 text-slate-400 border border-slate-800">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="font-mono">{post.commentsCount || 0}</span>
          </div>

          {/* Raise Objection Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenObjection(post);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all font-medium"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>이의 제기 ({post.objectionsCount || 0})</span>
          </button>
        </div>

        {/* Share & Bookmark */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-2 rounded-xl transition-colors ${
              isBookmarked ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(window.location.href);
              alert('게시글 링크가 복사되었습니다.');
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
