Similarity-Service API 명세서
Base URL: http://localhost:8080
Data Format: JSON

1. 👤 회원 API (User)
① 회원가입
URL: POST /api/user/signup
Request Body: {
  "username": "coder123",
  "password": "mypassword1",
  "nickname": "코딩천재"
}

Response: 회원가입이 완료되었습니다!

② 로그인
URL: POST /api/user/login
Request Body: {
  "username": "coder123",
  "password": "mypassword1"
}

Response: 로그인 성공! 환영합니다, 코딩천재님. (권한: USER)

2. 📝 게시글 API (Post)
① 게시글 작성
URL: POST /api/posts
Request Body: {
  "username": "coder123",
  "title": "첫 번째 게시글입니다!",
  "content": "여기에 본문 내용을 채워 넣습니다."
}

Response: 글이 성공적으로 등록되었습니다!

② 게시글 전체 목록 조회
URL: GET /api/posts
Response: [
  {
    "id": 1,
    "title": "첫 번째 게시글입니다!",
    "content": "여기에 본문 내용을 채워 넣습니다.",
    "writerNickname": "코딩천재",
    "createdAt": "2026-07-17T16:35:41"
  }
]

3. 🔍 반론 및 검증 API (Rebuttal)
① 반론 작성
URL: POST /api/posts/{postId}/rebuttals
예시: POST /api/posts/1/rebuttals
Request Body: {
  "username": "coder123",
  "content": "이 분석은 오답입니다! 단순 반복되는 인용구까지 유사도로 잡았습니다."

Response: 반론이 성공적으로 제기되었습니다!

② 반론 목록 조회 (추천순)
URL: GET /api/posts/{postId}/rebuttals
예시: GET /api/posts/1/rebuttals
Response: [
  {
    "id": 1,
    "content": "이 분석은 오답입니다! 단순 반복되는 인용구까지 유사도로 잡았습니다.",
    "writerNickname": "코딩천재",
    "agreeCount": 1,
    "createdAt": "2026-07-17T16:19:42"
  }
]

③ 반론 동의 (추천)
URL: POST /api/posts/{postId}/rebuttals/{rebuttalId}/agree
예시: POST /api/posts/1/rebuttals/1/agree
Response: 반론에 동의(추천)하셨습니다! 현재 동의 수: 1
