# 테스트 구조

## 테스트 계층

| 계층 | 폴더 | 외부 의존성 | 목적 |
|------|------|------------|------|
| Unit | `unit/` | 없음 | 순수 함수/클래스 동작 확인 |
| Integration | `integration/` | 실제 Supabase 연결 필요 | DB 연결·테이블·RLS·Storage 검증 |
| API | `api/` | 없음 | API 라우트 핸들러 응답 형식 확인 |

---

## 실행 명령어

```bash
npm run test:unit          # Unit 테스트만 (DB 불필요)
npm run test:integration   # Integration 테스트 (Supabase 연결 필요)
npm run test:api           # API 라우트 테스트
npm run test               # 전체 실행 (배포 전)
npm run test:watch         # 변경 감지 모드
npm run test:coverage      # 커버리지 리포트
```

---

## 각 테스트 파일 목적

### Unit
- `errors.test.ts` — `AppError` 클래스가 message/status/name을 올바르게 저장하는지
- `utils.test.ts` — `cn()` 유틸이 클래스 병합·충돌 해결을 올바르게 처리하는지

### Integration
- `connection.test.ts` — 환경 변수 존재 확인, `createClient()` 정상 생성, `exams` select 성공
- `tables.test.ts` — 각 테이블(`exams`, `subjects`, `questions`, `options`) select 후 TypeScript 타입 필드 일치 확인
- `rls.test.ts` — anon key로 insert/update 시 RLS에 의해 거부되는지 확인
- `storage.test.ts` — `question-assets` 버킷 list 접근 및 public URL 형식 확인
- `flow.test.ts` — `exam → subjects → questions → options` 전체 흐름 조회, `QuestionWithOptions` 구조 확인

### API
- `examId.test.ts` — `GET /api/[examId]` 핸들러 직접 호출: 정상/빈 examId 응답 형식 확인

---

## Integration 테스트 전제조건

`.env.local` 파일이 프로젝트 루트에 있어야 합니다.

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 새 테스트 추가 가이드

| 추가할 내용 | 어느 계층에 넣을지 |
|------------|-----------------|
| 순수 함수, 유틸, 클래스 | `unit/` |
| Supabase 쿼리, DB 정책, Storage | `integration/` |
| API 라우트 핸들러 응답 형식 | `api/` |
| 브라우저 유저 플로우 (미래) | `e2e/` (Playwright, Phase 5 예정) |
