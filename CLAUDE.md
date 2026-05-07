# CLAUDE.md

## 1. 절대규칙

- 승인 없이 파일 생성 금지
- 자동 커밋/푸시 금지
- `as` 타입 단언 사용 금지
- 요청 범위 밖 코드 수정 금지
- 불명확한 요구사항은 구현 전 반드시 질문
- env 파일 접근 금지

---

## 2. 아키텍처

> Mermaid 다이어그램: 추후 사용자가 제공 예정. 폴더 구조는 확정 후 업데이트.

**라우팅:**

| 경로                  | 역할                                           |
| --------------------- | ---------------------------------------------- |
| `/`                   | 홈 — Exam 목록 (exams.json, Server Component)  |
| `/quiz/[examId]`      | 선택 페이지: 모드·연도·과목·회차 선택          |
| `/quiz/[examId]/play` | 퀴즈 진행 (`?m=&sub=&year=&round=` query 포함) |
| `/result`             | 결과 (sessionStorage로 전달)                   |

> `/quiz/[examId]/play?...` 구조 사용. quizsetId 기반 라우팅은 사용하지 않음.

---

## 3. 기술 스택

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint (import/order 포함)
- clsx / cn() 유틸
- Supabase (PostgreSQL + Storage)

---

## Build & Test Commands

- Build: `npm run build`
- Lint: `npm run lint`

---

## 5. 도메인 컨텍스트

---

## 6. 코딩 컨벤션

**타입 시스템:**

- `interface`: 객체 형태 정의 — 도메인 모델, API 응답, Props
  ```ts
  interface QuizCardProps {
    id: number;
    title: string;
  }
  interface Exam {
    id: number;
    name: string;
  }
  ```
- `type`: 유니언, 리터럴, 유틸리티 타입 조합
  ```ts
  type QuizMode = "mini" | "mock";
  type Status = "idle" | "loading" | "error";
  type PartialExam = Pick<Exam, "id" | "name">;
  ```

**함수/컴포넌트:**

- 함수: arrow function
- 컴포넌트: `export default`

**경로/스타일:**

- 경로 alias: `@/`
- 스타일 유틸: `cn()` / `clsx`

**import 순서 (ESLint `import/order`):**

1. React/Next
2. 외부 라이브러리
3. 내부 절대경로 (`@/`)
4. 상대경로

---

## 7. 핵심 패턴

- 데이터 페칭은 Server Component에서만
- 클라이언트 상태는 훅으로 캡슐화
- API 응답 형식: `{ success: boolean, data?: T, error?: string }`
- API 에러는 반드시 `AppError` 클래스로 통일 (`./errors.ts`)
- 에러 처리는 `error.tsx` / `ErrorBoundary` 사용
- Supabase 클라이언트는 server-side only (`@/lib/supabase/server.ts`). 클라이언트 컴포넌트에서 직접 Supabase 쿼리 금지

세부 구현은 각 하위 `CLAUDE.md` 참조.

---

## 8. 참조문서

| 파일 | 용도 |
| ---- | ---- |
| `TODO.md` | 전체 작업 목록 |
| `src/__tests__/CLAUDE.md` | 테스트 아키텍처·작성 기준 (테스트 작업 시 반드시 먼저 읽기) |
