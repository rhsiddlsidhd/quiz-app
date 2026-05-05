import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";
import type { QuestionWithOptions } from "@/types";

describe("통합 흐름: exam → subjects → questions → options", () => {
  it("exams에서 첫 번째 exam을 가져올 수 있다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("exams").select("*").limit(1);

    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
  });

  it("questions를 options와 함께 조회해 QuestionWithOptions 구조를 만족한다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("questions")
      .select("*, options(*)")
      .limit(1);

    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
    if (data && data.length > 0) {
      const row: QuestionWithOptions = data[0];
      expect(typeof row.id).toBe("string");
      expect(typeof row.content).toBe("string");
      expect(Array.isArray(row.options)).toBe(true);
    }
  });

  it("특정 exam_id로 subjects를 필터링할 수 있다", async () => {
    const supabase = createClient();

    const { data: exams, error: examsError } = await supabase.from("exams").select("id").limit(1);
    expect(examsError).toBeNull();
    expect(exams?.length).toBeGreaterThan(0);
    if (!exams || exams.length === 0) return;

    const examId = exams[0].id;
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("exam_id", examId);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });
});
