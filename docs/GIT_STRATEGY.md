# Git 전략

## 브랜치 전략

브랜치 흐름: `<prefix>/*` → `dev` → `main`

**브랜치 prefix 컨벤션:**

| prefix | 용도 |
|--------|------|
| `feat/` | 새 기능 추가 |
| `fix/` | 버그 수정 |
| `docs/` | 문서 작성·수정 |
| `refactor/` | 코드 리팩토링 |
| `chore/` | 설정·빌드·패키지 등 기타 작업 |
| `test/` | 테스트 추가·수정 |

- 하나의 브랜치에 두 개 이상의 작업을 섞지 않는다
- `feat/*` 브랜치를 `main`에 직접 병합하지 않는다
- `feat/*` 브랜치를 `dev` 검증 없이 `main`으로 올리지 않는다
- `dev`에서 검증이 완료되지 않은 상태로 `main`에 병합하지 않는다
- 충돌 해결을 `main`에서 하지 않는다 — 반드시 `feat/*` → `dev` 단계에서 해결한다
- 로컬에서 `dev`에 병합이 완료된 `feat/*` 브랜치를 남기지 않는다

## Git Worktree

- 순차 작업에 worktree를 사용하지 않는다 — 병렬 작업이 필요할 때만 생성한다
- worktree 디렉토리명에 브랜치명을 반영한다
- 같은 브랜치를 두 worktree에 동시에 체크아웃하지 않는다

### Worktree 정리 워크플로우

```mermaid
flowchart TD
    A[PR 머지 완료] --> B["git worktree remove &lt;경로&gt;"]
    B --> C["Remove-Item -Recurse -Force &lt;경로&gt;"]
    C --> D["git branch -d feat/*"]
    D --> E["git pull — dev"]
```
