import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";
import type { Exam, Option, Question, Subject } from "@/types";

const supabase = createClient();

describe("exams 테이블", () => {
  it("select 결과가 Exam 타입 필드를 포함한다", async () => {
    const { data, error } = await supabase.from("exams").select("*").limit(1);
    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row: Exam = data[0];
      expect(typeof row.id).toBe("string");
      expect(typeof row.category).toBe("string");
      expect(typeof row.name).toBe("string");
      expect(typeof row.year).toBe("number");
      expect(row.round === null || typeof row.round === "number").toBe(true);
    }
  });
});

describe("subjects 테이블", () => {
  it("select 결과가 Subject 타입 필드를 포함한다", async () => {
    const { data, error } = await supabase.from("subjects").select("*").limit(1);
    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row: Subject = data[0];
      expect(typeof row.id).toBe("string");
      expect(typeof row.category).toBe("string");
      expect(typeof row.slug).toBe("string");
      expect(typeof row.name).toBe("string");
    }
  });
});

describe("exam_subjects 테이블", () => {
  it("select 결과가 exam_id·subject_id 필드를 포함한다", async () => {
    const { data, error } = await supabase.from("exam_subjects").select("*").limit(1);
    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row = data[0];
      expect(typeof row.exam_id).toBe("string");
      expect(typeof row.subject_id).toBe("string");
    }
  });
});

describe("questions 테이블", () => {
  it("select 결과가 Question 타입 필드를 포함한다", async () => {
    const { data, error } = await supabase.from("questions").select("*").limit(1);
    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row: Question = data[0];
      expect(typeof row.id).toBe("string");
      expect(typeof row.exam_id).toBe("string");
      expect(typeof row.number).toBe("number");
      expect(typeof row.content).toBe("string");
      expect(row.category === null || typeof row.category === "string").toBe(true);
    }
  });
});

describe("options 테이블", () => {
  it("select 결과가 Option 타입 필드를 포함한다", async () => {
    const { data, error } = await supabase.from("options").select("*").limit(1);
    expect(error).toBeNull();
    if (data && data.length > 0) {
      const row: Option = data[0];
      expect(typeof row.id).toBe("string");
      expect(typeof row.question_id).toBe("string");
      expect(typeof row.number).toBe("number");
      expect(typeof row.value).toBe("string");
      expect(typeof row.is_answer).toBe("boolean");
    }
  });
});
