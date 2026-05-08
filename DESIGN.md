# DESIGN.md

## 개요

Claude Design 웹에서 사용할 컴포넌트 디자인 프롬프트 모음.
Spotify 디자인 시스템(`.design/Spotify.md`)을 기반으로 작성.

## 사용 방법

1. Claude Design 웹에 `.design/Spotify.md` 로드
2. 아래 각 컴포넌트 프롬프트를 붙여넣기

## 컴포넌트 프롬프트

### layout/

#### HomeLayout

```
HomeLayout 헤더를 디자인해줘.

헤더:
- Near Black 배경, w-full
- 좌측 20px: 프로젝트 로고 (클릭 시 / 이동)
- 수평 패딩 16px
- 하단 border 1px — Border Gray
```

#### ExamLayout

```
ExamLayout 헤더를 디자인해줘.

헤더:
- Near Black 배경, w-full, sticky
- 좌측 20px: < 뒤로가기 버튼 (클릭 시 / 이동)
- < 바로 옆: 선택한 시험명 (White, 16px, weight 700)
- 하단 border 1px — Border Gray
```

#### PlayLayout

```
PlayLayout 상단바를 디자인해줘.

상단바 (sticky):
- Near Black 배경, w-full
- 선형 프로그레스 바 — Spotify Green fill, Near Black 배경, h-1
- 우측: 현재/전체 문제 수 (Silver 12px) + 카운트다운 타이머 (MM:SS, White weight 700)
- 하단 border 1px — Border Gray
```

#### ResultLayout

```
ResultLayout 헤더를 디자인해줘.

헤더 (sticky):
- Near Black 배경, w-full
- 좌측: 다음/추천 시험명 또는 과목명 (White 14px)
  - 미니퀴즈: 과목명 (예: "다음: 소방원론 2024년 2회")
  - 모의고사: 회차 (예: "다음: 2024년 2회" / 마지막 회차면 이전 연도로)
- 우측: "바로 풀기" CTA — Spotify Green Pill 버튼
- 하단 border 1px — Border Gray
```

### home/

#### Home 본문

```
Home 본문을 디자인해줘.

레이아웃: flex-col, 전체 높이 채움

ad (60%):
- Dark Surface 배경, w-full
- 내부: 16:9 비율 image 또는 타이포그래피가 자동 가로 슬라이딩
- 하단: dot 인디케이터 — ad 배경 위에 오버레이, 활성 dot은 White, 비활성은 Silver

시험 목록 (40%):
- Near Black 배경
- 사용자 가로 스크롤 (스크롤바 숨김)
- 각 항목: Dark Pill 스타일 Badge, 활성 상태는 Spotify Green
```

### exam/

#### exam/ 본문

```
exam/ 본문을 디자인해줘.

레이아웃: flex-col, 수직 패딩 24px

모드 선택:
- 카드 2개 나란히 (미니퀴즈 / 모의고사)
- 선택된 카드: Spotify Green 테두리 + Dark Surface 배경
- 비선택 카드: Border Gray 테두리 + Near Black 배경
- 카드 내부: 모드명 White 16px weight 700, 부제 Silver 12px

과목 선택 (미니퀴즈 선택 시에만 표시):
- 섹션 라벨: Silver 12px weight 700
- 가로 스크롤 (스크롤바 숨김)
- 각 칩: Dark Pill 스타일, 선택 시 Spotify Green

하단 고정 CTA:
- 전체 너비 "시작하기" 버튼 — Spotify Green, pill 형태
- 수평 패딩 16px, 수직 패딩 12px
```

### play/

#### play/ 본문

```
play/ 본문을 디자인해줘.

상단 바 (sticky):
- 선형 프로그레스 바 — Spotify Green fill, Near Black 배경, 현재/전체 문제 수 우측 표시 (Silver 12px)
- 우측: 카운트다운 타이머 (MM:SS) — White weight 700

문제 영역:
- Dark Surface 카드, 8px radius, 수직 패딩 24px
- 문제 번호: Silver 12px
- 문제 텍스트: White 18px weight 600

보기 버튼 (세로 4개):
- Near Black 배경, Border Gray 테두리, 8px radius
- 좌측 라벨: A / B / C / D — Silver 14px weight 700, 우측 보기 내용: White 14px
- 선택 시: Spotify Green 테두리

하단 고정 네비게이션:
- 이전: Outlined Pill 버튼 — White 텍스트, Border Gray 테두리
- 다음: Spotify Green Pill 버튼 — 채워진 버튼
```

### result/

#### result/ 미니퀴즈 뷰

```
result/ 미니퀴즈 뷰를 디자인해줘.

점수 요약 카드:
- Dark Surface 배경, 8px radius, 수직 패딩 24px, 중앙 정렬
- 정답률 % — White 32px weight 700
- 맞은 수 / 전체 — Silver 14px

문제별 결과:
- flex-wrap 레이아웃 (아이템 크기에 따라 자연스럽게 줄바꿈)
- 각 아이템: "N번 ✓" 또는 "N번 ✗" — Dark Surface 배경, 8px radius, 수평 패딩 12px
- 정답 아이콘: Spotify Green / 오답 아이콘: 오답 Red

하단 고정 CTA:
- 좌측: Outlined Pill 버튼 — "다시풀기", White 텍스트, Border Gray 테두리
- 우측: Spotify Green Pill 버튼 — "홈으로"
```

#### result/ 모의고사 뷰

```
result/ 모의고사 뷰를 디자인해줘.

점수 요약 카드:
- Dark Surface 배경, 8px radius, 수직 패딩 24px, 중앙 정렬
- 총점 — White 32px weight 700 + 합격/불합격 Badge (Spotify Green / 오답 Red)
- 합격선 텍스트 — Silver 12px

과목별 점수:
- 섹션 라벨: Silver 12px weight 700
- 각 항목: 과목명 (White 14px) + 점수 (White 14px weight 700) + 진행 바 (Spotify Green fill, Near Black 배경)

문제별 결과 (접기/펼치기 토글):
- 섹션 헤더 클릭 시 토글
- flex-wrap 레이아웃 (아이템 크기에 따라 자연스럽게 줄바꿈)
- 각 아이템: "N번 ✓" 또는 "N번 ✗"

하단 고정 CTA:
- 좌측: Outlined Pill 버튼 — "다시풀기", White 텍스트, Border Gray 테두리
- 우측: Spotify Green Pill 버튼 — "홈으로"
```

### ui/
