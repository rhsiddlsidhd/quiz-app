// DB Row 타입
export interface Exam {
  id: string;
  category: string;
  name: string;
  year: number;
  round: number | null;
}

export interface Subject {
  id: string;
  category: string;
  slug: string;
  name: string;
}

export type ViewBlock =
  | { type: "text"; content: string }
  | { type: "list"; style: "korean" | "alpha"; items: string[] }
  | { type: "image"; url: string; alt?: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface QuestionView {
  blocks: ViewBlock[];
}

export interface Question {
  id: string;
  exam_id: string;
  subject_id: string | null;
  number: number;
  content: string;
  view: QuestionView | null;
  explanation: string | null;
}

export interface Option {
  id: string;
  question_id: string;
  number: number;
  value: string;
  is_answer: boolean;
}

// 앱 레벨 조합 타입
export type QuizMode = "mini" | "mock";

export interface QuestionWithOptions extends Question {
  options: Option[];
}

export interface QuizSet {
  exam: Exam;
  subject?: Subject;
  mode: QuizMode;
  questions: QuestionWithOptions[];
}
