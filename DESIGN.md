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

### result/

### ui/
