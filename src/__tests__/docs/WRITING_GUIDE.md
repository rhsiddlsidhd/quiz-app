# WRITING_GUIDE.md — 계층별 테스트 작성 패턴

이 문서는 각 계층별 테스트의 구조적 결정 근거를 정리하고, 실제 예시는 테스트 파일을 참조한다.
테스트 아키텍처·원칙은 `src/__tests__/CLAUDE.md`를 먼저 읽는다.

> **이 문서는 living document다.**
> 테스트 코드를 작성하면서 공통적인 부분을 추상화해 few-shot 방식으로 패턴을 추가해나간다.
> 처음부터 완성된 문서가 아니며, 코드가 쌓일수록 일관성이 좁혀지는 방향으로 지속 업데이트한다.
> **코드 예시는 실제 테스트 파일을 참조한다. 이 문서에 코드를 복사하지 않는다.**

## 목차

1. [Unit](#1-unit)
2. [Integration — Infrastructure / Contract](#2-integration--infrastructure--contract)
3. [Integration — CRUD](#3-integration--crud)
4. [API](#4-api)

---

## 1. Unit

**참조:** `unit/errors.test.ts`, `unit/utils.test.ts`

| 결정 | 이유 |
|------|------|
| `describe` = 검증 대상 클래스·함수명 | 실패 시 어떤 대상이 깨졌는지 즉시 식별 |
| `it()` 하나 = 동작 하나 = `expect` 하나 | 실패 원인을 단일 책임으로 좁힘 |

---

## 2. Integration — Infrastructure / Contract

**참조:** `integration/connection.test.ts`, `integration/tables.test.ts`

| 결정 | 이유 |
|------|------|
| anon key 클라이언트 사용 | 환경 변수·연결·스키마 검증은 실제 서비스 조건과 동일해야 함 |
| 타입 변수 선언 방식 (`const row: Exam = data[0]`) | `as` 단언은 타입 체커를 우회하므로 금지 |
| `data.length > 0` 조건부 필드 검증 | 빈 테이블에서도 테스트가 통과해야 함 |

---

## 3. Integration — CRUD

**참조:** `integration/crud.test.ts`

| 결정 | 이유 |
|------|------|
| service role key 클라이언트 | anon key는 RLS로 쓰기 차단됨 |
| `afterAll`을 파일 최상단 (describe 밖) | D 테스트 실패 시에도 데이터 정리 보장 |
| `ids` 객체를 파일 최상단 선언 | 모든 describe 블록에서 동일한 UUID 공유 |
| FK 순서: exam → subject → question → options | 참조 무결성 제약 위반 방지 |
| Delete: options → question → subject → exam | FK 순서 역순으로 삭제 |
| 삭제 검증: `.toHaveLength(0)` | `.single()`은 0행일 때 error를 반환하므로 금지 |

### Skeleton

```
ids 선언
afterAll (describe 밖)

describe("C — Create")
  beforeAll: insert (FK 순서대로)
  it: error 변수 검증

describe("R — Read")
  it: select → 타입 변수 선언 → 필드 비교

describe("U — Update")
  it: update → select 재조회 → 타입 변수 선언 → 변경 확인

describe("D — Delete")
  it: delete
  it: select → toHaveLength(0)
```

---

## 4. API

**참조:** `api/examId.test.ts`

| 결정 | 이유 |
|------|------|
| `makeRequest`, `makeParams` 헬퍼 분리 | 반복 생성 코드 제거, 테스트 의도에 집중 |
| success / error / status를 각각 별도 `it()` | 응답의 각 계약을 독립적으로 검증 |
| 핸들러 함수 직접 호출 | 실제 HTTP 네트워크 없이 응답 형식만 검증 |
