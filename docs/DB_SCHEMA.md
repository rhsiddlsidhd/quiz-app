# DB Schema

## 테이블 관계

```
exams
  ├── exam_subjects (junction)
  │     └── subjects
  └── questions
        └── options
```

---

## 테이블 정의

### exams

| 컬럼 | 타입 | 제약 |
|------|------|------|
| id | text | PK |
| category | text | NOT NULL |
| name | text | NOT NULL |
| year | int | NOT NULL |
| round | int | NULL 허용 |

UNIQUE(category, year, round)

---

### subjects

| 컬럼 | 타입 | 제약 |
|------|------|------|
| id | uuid | PK |
| category | text | NOT NULL |
| slug | text | NOT NULL |
| name | text | NOT NULL |

---

### exam_subjects

| 컬럼 | 타입 | 제약 |
|------|------|------|
| exam_id | text | FK → exams.id |
| subject_id | uuid | FK → subjects.id |

PK(exam_id, subject_id)

---

### questions

| 컬럼 | 타입 | 제약 |
|------|------|------|
| id | uuid | PK |
| exam_id | text | FK → exams.id, NOT NULL |
| subject_id | uuid | FK → subjects.id, NOT NULL |
| number | int | NOT NULL |
| content | text | NOT NULL |
| view | jsonb | NULL 허용 |
| explanation | text | NOT NULL |
| category | text | NOT NULL |

---

### options

| 컬럼 | 타입 | 제약 |
|------|------|------|
| id | uuid | PK |
| question_id | uuid | FK → questions.id, NOT NULL |
| number | int | NOT NULL |
| value | jsonb | NOT NULL |
| is_answer | bool | NOT NULL |

> `value` 컬럼은 OptionBlock 구조를 저장. `{ type: "text", content: string }` 또는 `{ type: "image", url: string, alt?: string }`

---

## RLS 정책

- 전 테이블 read-only public
- 쓰기는 service_role_key로만 허용
