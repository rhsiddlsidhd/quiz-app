import { NextRequest, NextResponse } from "next/server";

import { AppError } from "@/lib/errors";
import { createClient } from "@/lib/supabase/server";
import type { QuizMode, QuizSet } from "@/types";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const mode = req.nextUrl.searchParams.get("m") as QuizMode | null;
    const subjectId = req.nextUrl.searchParams.get("sub");

    if (!id) throw new AppError("id가 필요합니다.", 400);
    if (!mode || !["mini", "mock"].includes(mode))
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

    if (mode === "mini" && subjectId) {
      questions = questions.filter((q) => q.subject_id === subjectId);
    }

    const data: QuizSet = {
      exam: examResult.data,
      mode,
      questions,
    };

    if (mode === "mini" && subjectId) {
      const { data: subject } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", subjectId)
        .single();

      if (subject) data.subject = subject;
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: err.status },
      );
    }
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
};
