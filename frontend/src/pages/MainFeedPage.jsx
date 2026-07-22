import React, { useState, useEffect } from 'react';
import TrendingHighlights from '../components/feed/TrendingHighlights';
import PostCard from '../components/feed/PostCard';
import ObjectionModal from '../components/feed/ObjectionModal';
import PostDetailModal from '../components/post/PostDetailModal';
import { STATUS_TYPES } from '../components/feed/StatusBadge';
import { apiClient } from '../api/axios';
import { Sparkles, SlidersHorizontal, RefreshCw, AlertCircle } from 'lucide-react';

const MOCK_POSTS = [
  {
    id: 101,
    title: '서울시 자율주행 택시 데이터셋 2026 Q1 수집 결과 편향성 검증 요청',
    content: '심야 시간대(23시~04시) 주행 데이터가 전체의 3.2%에 불과하여 야간 자율주행 모델 학습 시 안전사고 판단 알고리즘에 심각한 오류가 발생할 가능성이 높습니다. 추가 데이터 교차검증을 요청합니다.\n\n주요 이슈:\n1. 23시~04시 시각 샘플 편중 결여\n2. 빗길/강우 날씨 데이터의 센서 값 라벨링 누락\n3. 독립 3개 자율주행 연구소 공통 검증 절차 수행 필요',
    category: 'AI / 머신러닝',
    status: STATUS_TYPES.SUSPICIOUS,
    author: { name: '강동원 선임연구원', role: 'Autonomous Lab' },
    createdAt: '10분 전',
    datasetName: 'seoul_autonomous_taxi_2026q1.csv',
    datasetUrl: 'https://data.seoul.go.kr',
    verificationScore: 48,
    upvotes: 42,
    commentsCount: 18,
    objectionsCount: 7,
  },
  {
    id: 102,
    title: '2026 상반기 국내 50대 기업 ESG 경영 이행 데이터 교차 검증 완료 보고',
    content: '공시 데이터 1,200건 및 독립 회계법인 데이터베이스 대조 검증을 수행했습니다. 탄소 배출량 산정 방식의 표준 가이드라인 적용률은 94.8%로 검증되었습니다.',
    category: '금융 & 증권',
    status: STATUS_TYPES.VERIFIED,
    author: { name: '이지은 회계사', role: 'ESG Data Alliance' },
    createdAt: '1시간 전',
    datasetName: 'kr50_esg_metrics_2026.json',
    datasetUrl: 'https://krx.co.kr',
    verificationScore: 96,
    upvotes: 89,
    commentsCount: 24,
    objectionsCount: 0,
  },
  {
    id: 103,
    title: '의료 임상시험 유전자 표적 치료 데이터베이스 분산 교차검증 진행상황',
    content: '분당서울대병원, 세브란스, 서울아산병원 데이터 라벨링 유효성 대조 작업을 진행 중입니다. 현재 1,500건 중 900건 타당성 평가 완료되었습니다.',
    category: '의료 / 바이오',
    status: STATUS_TYPES.IN_PROGRESS,
    author: { name: '박준혁 박사', role: 'Genomics Bio AI' },
    createdAt: '3시간 전',
    datasetName: 'bio_clinical_gene_v4.parquet',
    datasetUrl: 'https://nih.go.kr',
    verificationScore: 78,
    upvotes: 35,
    commentsCount: 9,
    objectionsCount: 2,
  },
  {
    id: 104,
    title: '전국 기후 변화 온실가스 데이터 측정값 딥러닝 보정 정확도 분석',
    content: '온도 및 습도 센서 노이즈 제거 알고리즘 적용 결과 기존 대비 표준오차(RMSE)가 14.2% 개선되었습니다. 교차 검증 알고리즘 코드 및 논문 첨부합니다.',
    category: '공공 / 환경',
    status: STATUS_TYPES.VERIFIED,
    author: { name: '최현우 교수', role: 'Climate Tech Inst' },
    createdAt: '5시간 전',
    datasetName: 'climate_sensor_corrected.csv',
    datasetUrl: 'https://kma.go.kr',
    verificationScore: 92,
    upvotes: 67,
    commentsCount: 15,
    objectionsCount: 1,
  },
];

const MainFeedPage = ({ 
  activeFilter, 
  setActiveFilter, 
  currentCategory, 
  searchTerm, 
  newPostData, 
  setNewPostData 
}) => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [selectedPostForObjection, setSelectedPostForObjection] = useState(null);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState(null);
  const [sortBy, setSortBy] = useState('latest');

  // Insert newly created post into local list
  useEffect(() => {
    if (newPostData) {
      setPosts((prev) => [newPostData, ...prev]);
      setNewPostData(null);
    }
  }, [newPostData, setNewPostData]);

  // Fetch posts from Spring Boot Backend
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        const response = await apiClient.get('/api/posts');
        if (response && Array.isArray(response) && response.length > 0) {
          setPosts(response);
        }
      } catch (err) {
        setApiError('백엔드 API (http://54.206.127.84:8080) 대기 중 — 시연 데이터가 연결되었습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === 'ALL' || post.status === activeFilter;
    const matchesCategory = currentCategory === 'all' || post.category.toLowerCase().includes(currentCategory);
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesCategory && matchesSearch;
  });

  const handleObjectionSubmitted = (objectionData) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === objectionData.postId ? { ...p, objectionsCount: (p.objectionsCount || 0) + 1 } : p
      )
    );
  };

  return (
    <div className="flex-1 space-y-6">
      
      {/* Backend API Connection Status Banner */}
      {apiError && (
        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs text-indigo-200 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{apiError}</span>
          </div>
          <span className="text-[10px] bg-indigo-500/20 px-2 py-0.5 rounded text-indigo-300 font-mono">
            Spring Boot API Ready
          </span>
        </div>
      )}

      {/* Top Highlights */}
      <TrendingHighlights onSelectPost={(post) => setSelectedPostForDetail(post)} />

      {/* Feed Controls */}
      <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: '전체 보기' },
            { id: STATUS_TYPES.VERIFIED, label: '🟢 검증 완료' },
            { id: STATUS_TYPES.SUSPICIOUS, label: '🔴 편향 의심' },
            { id: STATUS_TYPES.IN_PROGRESS, label: '🟡 검증 진행중' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs font-medium px-2.5 py-1.5 rounded-xl border border-slate-800 focus:outline-none"
          >
            <option value="latest">최신 등록순</option>
            <option value="popular">인기/공감순</option>
            <option value="reliability">검증 신뢰도순</option>
          </select>
        </div>
      </div>

      {/* Main Feed Content List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-400" />
            <p className="text-xs">데이터검증 피드를 불러오는 중입니다...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-2xl border border-slate-800 space-y-2">
            <p className="text-sm font-bold text-slate-300">검색 조건에 일치하는 데이터 검증글이 없습니다.</p>
            <p className="text-xs text-slate-500">필터를 변경하거나 새로운 데이터 검증 요청을 작성해보세요.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpenObjection={(targetPost) => setSelectedPostForObjection(targetPost)}
              onSelectPost={(selected) => setSelectedPostForDetail(selected)}
            />
          ))
        )}
      </div>

      {/* Post Detail Modal */}
      <PostDetailModal
        post={selectedPostForDetail}
        isOpen={!!selectedPostForDetail}
        onClose={() => setSelectedPostForDetail(null)}
        onOpenObjection={(targetPost) => setSelectedPostForObjection(targetPost)}
      />

      {/* Objection Modal */}
      <ObjectionModal
        isOpen={!!selectedPostForObjection}
        onClose={() => setSelectedPostForObjection(null)}
        post={selectedPostForObjection}
        onSubmitObjection={handleObjectionSubmitted}
      />
    </div>
  );
};

export default MainFeedPage;
