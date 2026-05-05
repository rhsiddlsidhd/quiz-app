import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";
import type { Exam, Option, Question, Subject } from "@/types";

describe("개별 테이블 read", () => {
  it("exams 테이블이 Exam 타입 필드를 포함한다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("exams").select("*").limit(1);

    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row = data[0] as Exam;
      expect(typeof row.id).toBe("string");
      expect(typeof row.name).toBe("string");
    }
  });

  it("subjects 테이블이 Subject 타입 필드를 포함한다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("subjects").select("*").limit(1);

    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row = data[0] as Subject;
      expect(typeof row.id).toBe("string");
      expect(typeof row.exam_id).toBe("string");
      expect(typeof row.slug).toBe("string");
      expect(typeof row.name).toBe("string");
    }
  });

  it("questions 테이블이 Question 타입 필드를 포함한다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("questions").select("*").limit(1);

    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row = data[0] as Question;
      expect(typeof row.id).toBe("string");
      expect(typeof row.exam_id).toBe("string");
      expect(typeof row.year).toBe("number");
      expect(typeof row.round).toBe("number");
      expect(typeof row.number).toBe("number");
      expect(typeof row.content).toBe("string");
    }
  });

  it("options 테이블이 Option 타입 필드를 포함한다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("options").select("*").limit(5);

    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row = data[0] as Option;
      expect(typeof row.id).toBe("string");
      expect(typeof row.question_id).toBe("string");
      expect(typeof row.number).toBe("number");
      expect(typeof row.value).toBe("string");
      expect(typeof row.is_answer).toBe("boolean");
    }
  });
});
