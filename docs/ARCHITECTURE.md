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
    ui/                 ← 범용 UI 컴포넌트
    layout/             ← 레이아웃 컴포넌트
    {page}/             ← 페이지 전용 컴포넌트 (라우트명과 동일)
  hooks/                ← 클라이언트 상태 훅 (use{Name}.ts)
  lib/
    services/           ← Supabase 쿼리 함수
    supabase/           ← Supabase 클라이언트 (server-side only)
    errors.ts           ← AppError 클래스
    utils.ts            ← 도메인·비즈니스 로직이 없는 순수 헬퍼 함수
  types/
    {domain}.ts         ← 도메인별 타입 (exam, quiz, result, ui 등)
    index.ts            ← re-export만
```

> `types/` 파일은 도메인 기준으로 분리한다.
> 공통 UI Props는 `ui.ts`, 새 도메인이 생기면 파일을 추가한다.

> `hooks/` 파일은 `use{Name}.ts` 형태로 생성한다.
> Name은 훅이 제공하는 output을 명확히 드러내야 한다 — 이름만 보고 무엇을 반환하는지 알 수 있어야 한다.

> `components/` 폴더는 페이지(라우트) 스코프 기준으로 구성한다.
> - 특정 페이지 전용 컴포넌트 → 해당 페이지명 폴더 (`home/`, `exam/`, `play/`, `result/`)
> - 범용 UI 컴포넌트 → `ui/`
> - 여러 페이지에서 공유되는 레이아웃 컴포넌트 → `layout/`
> - 새 라우트 추가 시 동일한 이름의 폴더를 생성한다

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
              └── UI Component ← 범용 UI 컴포넌트
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


