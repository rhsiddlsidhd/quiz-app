# CLAUDE.md

## 절대규칙

- Supabase 클라이언트는 server-side only (`@/lib/supabase/server.ts`) — 클라이언트 컴포넌트에서 직접 쿼리 금지

---

## 기술 스택

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint (import/order 포함)
- Supabase (PostgreSQL + Storage)
- zustand (전역 상태)

---

## 빌드 & 테스트

```bash
npm run build        # 빌드
npx tsc --noEmit     # 타입 체크
npm run lint         # 린트
npm run test         # 전체 테스트
```

---

## 코딩 컨벤션

**타입 시스템:**

- `interface` — 객체 형태: 도메인 모델, API 응답, Props
- `type` — 유니언, 리터럴, 유틸리티 타입 조합

**타입 파일 구조:**

```
types/
  exam.ts    ← Exam, Subject
  quiz.ts    ← Question, Option, ViewBlock, OptionBlock, QuestionView, QuestionWithOptions, QuizSet
  result.ts  ← QuizResult, WrongQuestion, CategoryStat
  ui.ts      ← 공통 UI Props
  index.ts   ← re-export만
```

- 컴포넌트 전용 Props → 해당 컴포넌트 파일 내 선언

**함수/컴포넌트:**

- 함수: arrow function
- 컴포넌트: `export default`

**네이밍:**

| 대상               | 규칙             | 예시                       |
| ------------------ | ---------------- | -------------------------- |
| 컴포넌트 파일·함수 | PascalCase       | `ExamCard.tsx`, `ExamCard` |
| 상수               | UPPER_SNAKE_CASE | `MAX_QUIZ_COUNT`           |
| 변수·일반 함수     | camelCase        | `examList`, `getExams`     |

**`'use client'` 선언 기준:**

- 이벤트 핸들러 사용 시
- `useState` / `useEffect` 등 React 훅 사용 시
- `window`, `document`, `localStorage` 등 Browser API 직접 사용 시

**Props 인터페이스 위치:**

- 해당 컴포넌트 전용 → 컴포넌트 파일 내 선언
- 여러 곳에서 공유되는 범용 → `@/types/*.ts` 도메인 기준 파일로 이동 또는 생성

**스타일:**

- 클래스 조합은 항상 `cn()` 사용 (`clsx` + `tailwind-merge` 래퍼)

**상태 관리:**

- `useState` → 컴포넌트/훅 내 로컬 상태
- `useContext` → 단일 페이지 트리 내 공유 (리렌더 최적화 불필요한 경우)
- `zustand` → 페이지 간 유지가 필요하거나 리렌더 최적화가 필요한 전역 상태

**훅 설계:**

- 네이밍: camelCase + `use` prefix 필수, 이름만 보고 무엇을 반환하는지 알 수 있어야 한다

추출 기준:

- 상태 + 핸들러가 있을 때
- 상태 + effect가 있을 때
- 하나의 관심사로 묶이는 여러 상태일 때

묶음 기준:

- 두 훅의 output이 서로 의존하면 하나로 묶는다
- 독립적이면 분리한다

컴포넌트 내 허용:

- 단일 상태, 핸들러 없음, 파생 로직 없음

---

## API

- 응답 형식: `{ success: boolean, data?: T, error?: string }`

---

## 에러 처리

- API 에러는 반드시 `AppError` 클래스로 통일 (`@/lib/errors.ts`)
- 에러 처리는 `error.tsx` / `ErrorBoundary` 사용

---

## 프로젝트 개요

@docs/OVERVIEW.md

---

## 아키텍처

@docs/ARCHITECTURE.md

---

## 참조문서

| 파일                                                 | 용도                      | 읽는 시점                   |
| ---------------------------------------------------- | ------------------------- | --------------------------- |
| [`docs/GIT_STRATEGY.md`](docs/GIT_STRATEGY.md)       | Git 전략·브랜치 흐름·worktree 규칙 | Git 작업 시작 전     |
| [`docs/DB_SCHEMA.md`](docs/DB_SCHEMA.md)             | DB 테이블 정의·관계·RLS   | DB·쿼리·스키마 작업 시작 전  |
| [`src/__tests__/CLAUDE.md`](src/__tests__/CLAUDE.md) | 테스트 아키텍처·작성 기준 | 테스트 작성 시작 전          |
