import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

import type { Exam, Option, Question, Subject } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const ids = {
  exam: crypto.randomUUID(),
  subject: crypto.randomUUID(),
  question: crypto.randomUUID(),
  option1: crypto.randomUUID(),
  option2: crypto.randomUUID(),
};

const CATEGORY = "[CRUD 테스트] 카테고리";

afterAll(async () => {
  await supabase.from("options").delete().in("id", [ids.option1, ids.option2]);
  await supabase.from("questions").delete().eq("id", ids.question);
  await supabase.from("exam_subjects").delete().eq("exam_id", ids.exam);
  await supabase.from("subjects").delete().eq("id", ids.subject);
  await supabase.from("exams").delete().eq("id", ids.exam);
});

describe("C — Create", () => {
  let examError: unknown = undefined;
  let subjectError: unknown = undefined;
  let examSubjectError: unknown = undefined;
  let questionError: unknown = undefined;
  let optionsError: unknown = undefined;

  beforeAll(async () => {
    ({ error: examError } = await supabase.from("exams").insert({
      id: ids.exam,
      category: CATEGORY,
      name: "[CRUD 테스트] 2999 제1회 시험",
      year: 2999,
      round: 1,
    }));

    ({ error: subjectError } = await supabase.from("subjects").insert({
      id: ids.subject,
      category: CATEGORY,
      slug: "crud-test-subject",
      name: "[CRUD 테스트] 과목",
    }));

    ({ error: examSubjectError } = await supabase.from("exam_subjects").insert({
      exam_id: ids.exam,
      subject_id: ids.subject,
    }));

    ({ error: questionError } = await supabase.from("questions").insert({
      id: ids.question,
      exam_id: ids.exam,
      subject_id: ids.subject,
      number: 1,
      content: "[CRUD 테스트] 문항 내용",
      view: null,
      explanation: null,
    }));

    ({ error: optionsError } = await supabase.from("options").insert([
      { id: ids.option1, question_id: ids.question, number: 1, value: "[CRUD 테스트] 선택지 1", is_answer: false },
      { id: ids.option2, question_id: ids.question, number: 2, value: "[CRUD 테스트] 선택지 2", is_answer: true },
    ]));
  });

  it("exam insert가 성공한다", () => { expect(examError).toBeNull(); });
  it("subject insert가 성공한다", () => { expect(subjectError).toBeNull(); });
  it("exam_subjects insert가 성공한다", () => { expect(examSubjectError).toBeNull(); });
  it("question insert가 성공한다", () => { expect(questionError).toBeNull(); });
  it("option insert가 성공한다 (2개)", () => { expect(optionsError).toBeNull(); });
});

describe("R — Read", () => {
  it("삽입된 exam을 id로 조회할 수 있다", async () => {
    const { data, error } = await supabase.from("exams").select("*").eq("id", ids.exam);
    expect(error).toBeNull();
    const row: Exam = data![0];
    expect(row.category).toBe(CATEGORY);
    expect(row.year).toBe(2999);
    expect(row.round).toBe(1);
  });

  it("삽입된 subject를 category로 조회할 수 있다", async () => {
    const { data, error } = await supabase.from("subjects").select("*").eq("category", CATEGORY);
    expect(error).toBeNull();
    const row: Subject = data![0];
    expect(row.name).toBe("[CRUD 테스트] 과목");
    expect(row.slug).toBe("crud-test-subject");
  });

  it("exam_subjects로 해당 exam의 과목을 조회할 수 있다", async () => {
    const { data, error } = await supabase
      .from("exam_subjects")
      .select("*, subjects(*)")
      .eq("exam_id", ids.exam);
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
  });

  it("삽입된 question의 필드 값이 mock 데이터와 일치한다", async () => {
    const { data, error } = await supabase.from("questions").select("*").eq("id", ids.question);
    expect(error).toBeNull();
    const row: Question = data![0];
    expect(row.number).toBe(1);
    expect(row.content).toBe("[CRUD 테스트] 문항 내용");
  });

  it("삽입된 options를 question_id로 조회하면 2개가 반환된다", async () => {
    const { data, error } = await supabase.from("options").select("*").eq("question_id", ids.question);
    expect(error).toBeNull();
    expect(data).toHaveLength(2);
  });

  it("is_answer가 true인 option이 정확히 1개다", async () => {
    const { data, error } = await supabase.from("options").select("*").eq("question_id", ids.question);
    expect(error).toBeNull();
    const answers = data!.filter((o: Option) => o.is_answer === true);
    expect(answers).toHaveLength(1);
  });
});

describe("U — Update", () => {
  it("exam name을 업데이트할 수 있다", async () => {
    const { error } = await supabase.from("exams").update({ name: "[CRUD 수정] 시험" }).eq("id", ids.exam);
    expect(error).toBeNull();

    const { data } = await supabase.from("exams").select("*").eq("id", ids.exam);
    const row: Exam = data![0];
    expect(row.name).toBe("[CRUD 수정] 시험");
  });

  it("subject name을 업데이트할 수 있다", async () => {
    const { error } = await supabase.from("subjects").update({ name: "[CRUD 수정] 과목" }).eq("id", ids.subject);
    expect(error).toBeNull();

    const { data } = await supabase.from("subjects").select("*").eq("id", ids.subject);
    const row: Subject = data![0];
    expect(row.name).toBe("[CRUD 수정] 과목");
  });

  it("question content를 업데이트할 수 있다", async () => {
    const { error } = await supabase.from("questions").update({ content: "[CRUD 수정] 문항 내용" }).eq("id", ids.question);
    expect(error).toBeNull();

    const { data } = await supabase.from("questions").select("*").eq("id", ids.question);
    const row: Question = data![0];
    expect(row.content).toBe("[CRUD 수정] 문항 내용");
  });

  it("option value를 업데이트할 수 있다", async () => {
    const { error } = await supabase.from("options").update({ value: "[CRUD 수정] 선택지 1" }).eq("id", ids.option1);
    expect(error).toBeNull();

    const { data } = await supabase.from("options").select("*").eq("id", ids.option1);
    const row: Option = data![0];
    expect(row.value).toBe("[CRUD 수정] 선택지 1");
  });
});

describe("D — Delete", () => {
  it("options를 삭제할 수 있다", async () => {
    const { error } = await supabase.from("options").delete().in("id", [ids.option1, ids.option2]);
    expect(error).toBeNull();
  });

  it("options 삭제 후 조회하면 빈 배열이다", async () => {
    const { data, error } = await supabase.from("options").select("*").eq("question_id", ids.question);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  it("question을 삭제할 수 있다", async () => {
    const { error } = await supabase.from("questions").delete().eq("id", ids.question);
    expect(error).toBeNull();
  });

  it("question 삭제 후 조회하면 빈 배열이다", async () => {
    const { data, error } = await supabase.from("questions").select("*").eq("id", ids.question);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  it("exam_subjects 행을 삭제할 수 있다", async () => {
    const { error } = await supabase.from("exam_subjects").delete().eq("exam_id", ids.exam);
    expect(error).toBeNull();
  });

  it("exam_subjects 삭제 후 조회하면 빈 배열이다", async () => {
    const { data, error } = await supabase.from("exam_subjects").select("*").eq("exam_id", ids.exam);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  it("subject를 삭제할 수 있다", async () => {
    const { error } = await supabase.from("subjects").delete().eq("id", ids.subject);
    expect(error).toBeNull();
  });

  it("subject 삭제 후 조회하면 빈 배열이다", async () => {
    const { data, error } = await supabase.from("subjects").select("*").eq("id", ids.subject);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  it("exam을 삭제할 수 있다", async () => {
    const { error } = await supabase.from("exams").delete().eq("id", ids.exam);
    expect(error).toBeNull();
  });

  it("exam 삭제 후 조회하면 빈 배열이다", async () => {
    const { data, error } = await supabase.from("exams").select("*").eq("id", ids.exam);
    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });
});
