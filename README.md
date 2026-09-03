# 📡 Similarity-Service API Specification

* **Base URL**: `[https://antikimchunsu.duckdns.org](https://antikimchunsu.duckdns.org)`
* **Data Format**: `JSON`

---

## 1. 👤 회원 API (User)

### ① 회원가입

> 신규 회원 계정을 생성합니다.

* **URL**: `POST /api/user/signup`
* **Request Body**
```json
{
  "username": "coder123",
  "password": "mypassword1",
  "nickname": "코딩천재"
}

```


* **Response**
```text
회원가입이 완료되었습니다!

```



### ② 로그인

> 사용자 인증 및 로그인을 진행합니다.

* **URL**: `POST /api/user/login`
* **Request Body**
```json
{
  "username": "coder123",
  "password": "mypassword1"
}

```


* **Response**
```text
로그인 성공! 환영합니다, 코딩천재님. (권한: USER)

```



---

## 2. 📝 게시글 API (Post)

### ① 게시글 작성

> 새로운 분석 결과 및 게시글을 등록합니다.

* **URL**: `POST /api/posts`
* **Request Body**
```json
{
  "username": "coder123",
  "title": "첫 번째 게시글입니다!",
  "content": "여기에 본문 내용을 채워 넣습니다."
}

```


* **Response**
```text
글이 성공적으로 등록되었습니다!

```



### ② 게시글 전체 목록 조회

> 등록된 전체 게시글 목록을 조회합니다.

* **URL**: `GET /api/posts`
* **Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "첫 번째 게시글입니다!",
    "content": "여기에 본문 내용을 채워 넣습니다.",
    "writerNickname": "코딩천재",
    "createdAt": "2026-07-17T16:35:41"
  }
]

```



---

## 3. 🔍 반론 및 검증 API (Rebuttal)

### ① 반론 작성

> 특정 게시글에 대해 반론 및 검증 의견을 남깁니다.

* **URL**: `POST /api/posts/{postId}/rebuttals`
* **Example**: `POST /api/posts/1/rebuttals`
* **Request Body**
```json
{
  "username": "coder123",
  "content": "이 분석은 오답입니다! 단순 반복되는 인용구까지 유사도로 잡았습니다."
}

```


* **Response**
```text
반론이 성공적으로 제기되었습니다!

```



### ② 반론 목록 조회 (추천순)

> 특정 게시글의 반론 목록을 추천수가 높은 순서대로 조회합니다.

* **URL**: `GET /api/posts/{postId}/rebuttals`
* **Example**: `GET /api/posts/1/rebuttals`
* **Response** `200 OK`
```json
[
  {
    "id": 1,
    "content": "이 분석은 오답입니다! 단순 반복되는 인용구까지 유사도로 잡았습니다.",
    "writerNickname": "코딩천재",
    "agreeCount": 1,
    "createdAt": "2026-07-17T16:19:42"
  }
]

```



### ③ 반론 동의 (추천)

> 제기된 특정 반론에 동의(추천) 표를 던집니다.

* **URL**: `POST /api/posts/{postId}/rebuttals/{rebuttalId}/agree`
* **Example**: `POST /api/posts/1/rebuttals/1/agree`
* **Response**
```text
반론에 동의(추천)하셨습니다! 현재 동의 수: 1

```
> 작성일자: 26.07.20
