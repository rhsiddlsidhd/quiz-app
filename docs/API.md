# API & 에러 처리

## API

- 응답 형식: `{ success: boolean, data?: T, error?: string }`

## 에러 처리

- API 에러는 반드시 `AppError` 클래스로 통일 (`@/lib/errors.ts`)
- 에러 처리는 `error.tsx` / `ErrorBoundary` 사용
