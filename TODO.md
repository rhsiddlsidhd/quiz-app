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
    - [x] `exams` 테이블 생성 (`id text PK`, `category text`, `name text`, `year int`, `round int nullable`, UNIQUE(category,year,round))
    - [x] `subjects` 테이블 생성 (`id uuid PK`, `category text`, `slug text`, `name text`)
    - [x] `exam_subjects` junction 테이블 생성 (`exam_id text FK`, `subject_id uuid FK`, 복합 PK)
    - [x] `questions` 테이블 생성 (`id uuid PK`, `exam_id text FK`, `subject_id uuid FK nullable`, `number int`, `content text`, `view jsonb nullable`, `explanation text nullable`)
    - [x] `options` 테이블 생성 (`id uuid PK`, `question_id uuid FK`, `number int`, `value text`, `is_answer bool`)
    - [x] Storage 버킷 `question-assets` 생성 (public)
    - [x] 각 테이블 RLS 정책 설정 (read-only public)

    ### Step 5 — TypeScript 타입 정의
    - [x] `@/types/index.ts` 생성 ✓ (snake_case 적용)
          — `Exam` (category·year·round 포함), `Subject` (category 연결), `Question`, `Option`
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

  - [ ] Phase 1.5: 스키마 & 연동 검증 (테스트)

    ### 테스트 인프라
    - [x] Vitest 환경 설정 (vitest.config.ts, workspace 분리)
    - [x] 테스트 계층 아키텍처 설계 및 문서화 (`src/__tests__/CLAUDE.md`)
    - [ ] 계층별 테스트 작성 가이드 (`src/__tests__/docs/WRITING_GUIDE.md`) 커밋

    ### Unit 테스트
    - [x] `AppError` — message·status·name 검증 (`unit/errors.test.ts`)
    - [x] `cn()` — 클래스 병합·충돌·조건부 처리 검증 (`unit/utils.test.ts`)

    ### Integration 테스트 — 연결 & 스키마
    - [x] 환경 변수 존재 확인 (`connection.test.ts`)
    - [x] `createClient()` 인스턴스 생성 확인 (`connection.test.ts`)
    - [x] `exams` 테이블 select 성공 (`connection.test.ts`)
    - [x] 각 테이블 타입 필드 일치 확인 (`tables.test.ts`: exams, subjects, exam_subjects, questions, options)

    ### Integration 테스트 — CRUD
    - [x] service_role_key로 전 테이블 CRUD 검증 (`crud.test.ts`) — 34 tests pass
    - [ ] `crud.test.ts` · `WRITING_GUIDE.md` 커밋

    ### API 테스트
    - [x] `GET /api/[examId]` 정상 응답 형식 확인 (`api/examId.test.ts`)
    - [x] 빈 `examId` → 400·에러 메시지 확인 (`api/examId.test.ts`)

  - [ ] Phase 1.6: PDF → DB 데이터 파이프라인

    > 대상: 스포츠지도사 시험지 PDF (로컬 `scripts/pdfs/`)

    ### Step 1 — PDF 파싱 환경 구성
    - [ ] `pdf-parse` 또는 `pdfjs-dist` 설치
    - [x] `.pdf/` 폴더 생성 (PDF 파일 저장 위치, gitignore 적용)
    - [ ] `scripts/parse-pdf.ts` 작성 — PDF 텍스트 추출 기본 틀

    ### Step 2 — 텍스트 → 구조화 변환
    - [ ] 문항 번호, 문제 본문, 선택지 파싱 로직 작성
    - [ ] `ViewBlock` 형식에 맞게 변환 (text / list / image)
    - [ ] 중간 JSON 출력 (`scripts/output/[examId].json`) 으로 검토

    ### Step 3 — DB 삽입 스크립트
    - [ ] `scripts/seed-from-json.ts` — JSON → Supabase upsert
          (exams / subjects / exam_subjects / questions / options 순서)
    - [ ] 멱등성 보장 (upsert, 중복 실행 안전)

    ### Step 4 — 검증
    - [ ] 삽입 후 DB 데이터 정합성 확인
    - [ ] 파싱 오류 항목 수동 보정

  - [ ] Phase 2: UI 컴포넌트 구현

    > 디자인 참조: `DESIGN.md` (프롬프트 모음) · `.design/` (출력물)

    ### Step 1 — 디자인 토큰 설정
    - [ ] `tailwind.config.ts` 색상 토큰 확장
          (`navy: #1a1f36`, `accent: #4f6ef7`, `surface: #f8f9fc`)

    ### Step 2 — 공통 컴포넌트
    - [ ] `<Button>` — primary / outline / ghost 변형
    - [ ] `<Badge>` — 카테고리 뱃지
    - [ ] `<Card>` — 흰색 카드 (그림자·모서리 반경)

    ### Step 3 — 홈 화면 `/`
    - [ ] `<ExamCard>` — 시험 제목·배지·문항 수·난이도
    - [ ] `<ExamGrid>` — 2열(데스크탑) / 1열(모바일) 반응형 그리드

    ### Step 4 — 선택 페이지 `/quiz/[examId]`
    - [ ] `<ModeToggle>` — 미니 퀴즈 / 모의고사 토글 카드
    - [ ] `<SubjectChips>` — 가로 스크롤 칩 버튼 (연도·회차는 exam에 내재, 선택 불필요)
    - [ ] 하단 고정 `<StartButton>`

    ### Step 5 — 퀴즈 진행 `/quiz/[examId]/play`
    - [ ] `<ProgressBar>` — 현재/전체 진행률
    - [ ] `<Timer>` — MM:SS 카운트다운
    - [ ] `<QuestionCard>` — 문제 텍스트 카드
    - [ ] `<OptionButton>` — A/B/C/D 라벨 + 선택 상태

    ### Step 6 — 결과 화면 `/result`
    - [ ] `<ScoreGauge>` — 원형 점수 게이지 (카운트업 애니메이션)
    - [ ] `<StatRow>` — 정답·오답·미응답 아이콘+숫자
    - [ ] `<SubjectBarChart>` — 과목별 가로 막대 차트

  - [ ] Phase 3: 로직 & 상태 관리 (훅, 서비스)
  - [ ] Phase 4: 페이지 조립
  - [ ] Phase 5: 시각화 & 마무리
