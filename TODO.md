# TODO — 2026-05-05

## 오늘의 작업

- [ ] Quiz-app 만들기
  - [ ] **Phase 1: 프로젝트 초기 세팅 & 기반 구축**

    ### Step 1 — Next.js 프로젝트 생성
    - [x] `npx create-next-app@latest` 실행
          (TypeScript: Yes / Tailwind: Yes / ESLint: Yes / App Router: Yes / src/: Yes / alias @/: Yes)
    - [x] 보일러플레이트 정리 (`app/page.tsx` 내용 비우기, `public/` 샘플 이미지 삭제)
    - [x] `next build` 통과 확인

    ### Step 2 — 추가 패키지 설치
    - [x] `clsx`, `tailwind-merge` 설치
    - [x] `eslint-plugin-import` 설치 및 `.eslintrc` import/order 규칙 설정
    - [x] `@/lib/utils.ts` 생성 — `cn()` 유틸 작성
    - [x] `next lint` 통과 확인

    ### Step 3 — Supabase 환경 설정
    - [x] Supabase 프로젝트 생성 (웹 대시보드)
    - [x] `.env.local` 생성 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
    - [x] `@supabase/supabase-js` 설치
    - [x] `@/lib/supabase/server.ts` 작성 — 서버 전용 클라이언트

    ### Step 4 — Supabase 스키마 생성
    - [x] `exams` 테이블 생성 (`id text PK`, `name text`)
    - [x] `subjects` 테이블 생성 (`id uuid PK`, `exam_id text FK`, `slug text`, `name text`)
    - [x] `questions` 테이블 생성 (`id uuid PK`, `exam_id`, `subject_id`, `year`, `round`, `number`, `content`, `view jsonb nullable`, `explanation text nullable`)
    - [x] `options` 테이블 생성 (`id uuid PK`, `question_id uuid FK`, `number int`, `value text`, `is_answer bool`)
    - [x] Storage 버킷 `question-assets` 생성 (public)
    - [x] 각 테이블 RLS 정책 설정 (read-only public)

    ### Step 5 — TypeScript 타입 정의
    - [x] `@/types/index.ts` 생성 ✓ (snake_case 적용)
          — `Exam`, `Subject`, `Question`, `Option` (DB Row 타입)
          — `ViewBlock` (text / list / image / table 유니언)
          — `QuestionView` ({ blocks: ViewBlock[] })
          — `QuestionWithOptions`, `QuizSet`, `QuizMode`

    ### Step 6 — AppError 및 API 기반 틀
    - [x] `@/lib/errors.ts` 생성 — `AppError` 클래스 ✓
    - [x] `app/api/[examId]/route.ts` 기본 틀 작성 (query param 파싱 + AppError 처리) ✓
    - [x] API 응답 형식 통일: `{ success: boolean, data?: T, error?: string }` ✓

    ### Step 7 — 라우팅 골격 생성
    - [x] `app/page.tsx` — 홈 페이지 빈 껍데기 (Server Component)
    - [x] `app/quiz/[examId]/page.tsx` — 선택 페이지 빈 껍데기
    - [x] `app/quiz/[examId]/play/page.tsx` — 퀴즈 진행 빈 껍데기
    - [x] `app/result/page.tsx` — 결과 페이지 빈 껍데기
    - [x] `app/error.tsx` — 글로벌 에러 바운더리
    - [x] `next build` + `tsc --noEmit` 최종 통과 확인

  - [x] Phase 1.5: 스키마 & 연동 검증 (테스트)

    ### Test 1 — 환경 변수 로드 확인 (최소 단위)
    - [x] `npm run dev` 실행 후 서버 기동 확인
    - [x] `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` 가 undefined 아닌지 확인

    ### Test 2 — Supabase 클라이언트 연결
    - [x] `createClient()` 호출 후 에러 없이 인스턴스 생성되는지 확인
    - [x] `.from("exams").select("*")` 쿼리 실행 → 응답 status 200 확인

    ### Test 3 — 개별 테이블 read (단위별)
    - [x] `exams` 테이블 select → 데이터 구조 Exam 타입과 일치 확인
    - [x] `subjects` 테이블 select → Subject 타입 일치 확인
    - [x] `questions` 테이블 select (limit 1) → Question 타입 일치 확인
    - [x] `options` 테이블 select (limit 5) → Option 타입 일치 확인

    ### Test 4 — RLS 정책 검증
    - [x] anon key로 `exams` insert 시도 → RLS 오류 반환 확인
    - [x] anon key로 `questions` update 시도 → 거부 확인

    ### Test 5 — API 라우트 동작
    - [x] `GET /api/[examId]` 호출 → `{ success: true, data: null }` 반환 확인
    - [x] `examId` 없이 호출 → `{ success: false, error: "examId가 필요합니다." }` 확인

    ### Test 6 — Storage 버킷 접근
    - [x] `question-assets` 버킷 list 호출 → 접근 가능 확인
    - [x] 버킷 public URL 형식 확인

    ### Test 7 — 통합 흐름 (최대 단위)
    - [x] exam → subjects → questions → options 순서로 join 조회
    - [x] `QuestionWithOptions` 타입으로 정상 매핑되는지 확인
    - [x] 전체 흐름이 server component에서 에러 없이 동작하는지 확인

  - [ ] Phase 2: UI 컴포넌트 구현
  - [ ] Phase 3: 로직 & 상태 관리 (훅, 서비스)
  - [ ] Phase 4: 페이지 조립
  - [ ] Phase 5: 시각화 & 마무리
