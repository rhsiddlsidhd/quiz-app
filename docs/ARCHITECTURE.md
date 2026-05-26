# Architecture

## 레이어 구조

Supabase → Service → API/Server Component → UI 순서의 단방향 의존 구조.
데이터 페칭은 Server Component에서 Service를 직접 호출하고, 클라이언트 동적 요청은 API Route를 통한다.

---

## 폴더 구조

```
src/
  app/                  ← Next.js App Router 페이지 및 API
    api/exam/[id]/      ← 퀴즈셋 API Route
    exam/[id]/          ← 과목 선택 페이지
    exam/[id]/play/     ← 퀴즈 진행 페이지
    result/             ← 결과 페이지
  components/
    ui/                 ← shadcn 범용 컴포넌트
    layout/             ← 페이지별 레이아웃
    home/               ← 홈 페이지 컴포넌트
    exam/               ← 과목 선택 페이지 컴포넌트
    play/               ← 퀴즈 진행 페이지 컴포넌트
    result/             ← 결과 페이지 컴포넌트
  hooks/                ← 클라이언트 상태 훅
  lib/
    services/           ← Supabase 쿼리 함수
    supabase/           ← Supabase 클라이언트 (server-side only)
    errors.ts           ← AppError 클래스
    utils.ts            ← cn() 유틸
  types/
    index.ts            ← 도메인 타입 정의
```

---

## 라우팅

| 경로 | 역할 |
| ---- | ---- |
| `/` | 홈 — Exam 목록 (Server Component) |
| `/exam/[id]` | 과목 선택 |
| `/exam/[id]/play?sub=<uuid>` | 퀴즈 진행 |
| `/result` | 결과 확인 |

**쿼리 파라미터:**

| 파라미터 | 타입 | 설명 |
| -------- | ---- | ---- |
| `sub` | uuid | 선택한 Subject id. 필수 |

---

## 컴포넌트 계층

```
Page (Server Component)
  └── Layout Component       ← 페이지 레이아웃
        └── Feature Component ← 페이지별 기능 컴포넌트
              └── UI Component ← shadcn 범용 컴포넌트
```

- Server Component: 데이터 페칭 담당
- Feature Component: 비즈니스 로직·상태 훅 사용
- UI Component: 순수 표현 컴포넌트

---


## 외부 연동

| 서비스 | 용도 | 접근 방식 |
| ------ | ---- | --------- |
| Supabase PostgreSQL | 시험·문제·보기 데이터 | server-side only |
| Supabase Storage | 문제·보기 이미지 | public bucket (question-assets) |

---


