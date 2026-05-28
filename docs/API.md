# API & 에러 처리

## API

- 응답 형식: `{ success: boolean, data?: T, error?: string }`

## 엔드포인트

| 메서드 | 엔드포인트 | 설명 | 요청 파라미터 | 응답 데이터 |
| ------ | ---------- | ---- | ------------- | ----------- |
| GET | `/api/exams` | 전체 시험 목록 조회 | 없음 | `exams[]` (id, category, name, year, round) |
| GET | `/api/exam/[id]` | 과목 목록 + 과목별 문제 수 조회 | `id`: exam id | `subjects[]` (id, name, category, slug, questionCount) |
| GET | `/api/exam/[id]/quiz?sub=<uuid>` | 퀴즈셋 조회 (문제 + 선택지) | `id`: exam id, `sub`: subject id | `questions[]` (id, number, content, view, explanation, category, options[]) |

## 에러 처리

- API 에러는 반드시 `AppError` 클래스로 통일 (`@/lib/errors.ts`)
- 에러 처리는 `error.tsx` / `ErrorBoundary` 사용
