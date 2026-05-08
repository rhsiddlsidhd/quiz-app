import { AppError } from "@/lib/errors";
import { createClient } from "@/lib/supabase/server";
import type { Exam, QuizMode, QuizSet, Subject } from "@/types";

const isValidMode = (m: string | null): m is QuizMode =>
  m === "mini" || m === "mock";

export const getExams = async (): Promise<Exam[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .order("year", { ascending: false });
  if (error) throw new AppError("시험 목록을 불러올 수 없습니다.", 500);
  return data;
};

export const getExamWithSubjects = async (
  id: string,
): Promise<{ exam: Exam; subjects: Subject[] }> => {
  const supabase = createClient();

  const [examResult, examSubjectsResult] = await Promise.all([
    supabase.from("exams").select("*").eq("id", id).single(),
    supabase.from("exam_subjects").select("subjects(*)").eq("exam_id", id),
  ]);

  if (examResult.error) throw new AppError("시험을 찾을 수 없습니다.", 404);

  const subjects: Subject[] = (examSubjectsResult.data ?? [])
    .map((r) => r.subjects)
    .filter(Boolean);

  return { exam: examResult.data, subjects };
};

export const getQuizSet = async (
  id: string,
  mode: string | null,
  subjectId?: string,
): Promise<QuizSet> => {
  if (!isValidMode(mode))
    throw new AppError("유효한 모드(m)가 필요합니다.", 400);
  if (mode === "mini" && !subjectId)
    throw new AppError("미니모드는 과목(sub)이 필요합니다.", 400);

  const supabase = createClient();

  const [examResult, questionsResult] = await Promise.all([
    supabase.from("exams").select("*").eq("id", id).single(),
    supabase
      .from("questions")
      .select("*, options(*)")
      .eq("exam_id", id)
      .order("number"),
  ]);

  if (examResult.error) throw new AppError("시험을 찾을 수 없습니다.", 404);

  let questions = questionsResult.data ?? [];
  if (mode === "mini" && subjectId)
    questions = questions.filter((q) => q.subject_id === subjectId);

  const quizSet: QuizSet = { exam: examResult.data, mode, questions };

  if (mode === "mini" && subjectId) {
    const { data: subject } = await supabase
      .from("subjects")
      .select("*")
      .eq("id", subjectId)
      .single();
    if (subject) quizSet.subject = subject;
  }

  return quizSet;
};
