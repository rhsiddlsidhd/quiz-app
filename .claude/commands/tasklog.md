---
name: tasklog
description: 오케스트레이터가 서브 에이전트에게 작업을 위임하기 전 작업 명세서를 노션에 기록한다. 오케스트레이터가 서브 에이전트 spawning 직전에 반드시 호출한다.
---

서브 에이전트에게 위임할 작업 명세서를 노션 "작업 명세서 로그" 페이지에 기록한다.

## 기록 대상 페이지

- 작업 명세서 로그 ID: `36e3d099-261f-8124-ab3c-c54a6317a730`
- task 단위로 직접 하위 페이지를 생성한다 (Phase 중간 페이지 없음)

```
작업 명세서 로그/
  api-exams
  api-exam-detail
  api-quiz
  types-domain
```

## 절차

### 1. task 명세서 페이지 생성

작업 명세서 로그 하위에 task 단위로 페이지를 생성한다.

**페이지 제목:** `{task-id}` (예: `api-exams`)

**페이지 내용 형식:**

```
| 항목 | 내용 |
| --- | --- |
| 작업명 | GET /api/exams |
| 담당 에이전트 | Agent #1 |
| Phase | 2 |
| 브랜치 | feat/api-exams |
| worktree | ../quiz-app-api-exams |
| 의존성 | Phase 1 완료 (types/) |
| 산출물 | src/app/api/exams/route.ts |
| 완료 기준 | 빌드/타입/린트 통과 + PR → dev |
| PR 링크 | (완료 후 기록) |
| 시작 시각 | {ISO 8601} |
| 완료 시각 | (완료 후 기록) |
```

### 3. PR 링크 및 완료 시각 업데이트

서브 에이전트가 PR을 생성한 후 오케스트레이터가 다시 tasklog를 호출해 PR 링크와 완료 시각을 업데이트한다.

업데이트 시 notion-update-page의 update_content 명령으로 해당 항목만 수정한다.
