import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";

describe("RLS 정책 검증 (anon key)", () => {
  it("exams 테이블 insert가 거부된다", async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("exams")
      .insert({ id: "test-rls", name: "RLS 테스트" });

    expect(error).not.toBeNull();
  });

  it("questions 테이블 update가 거부된다", async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("questions")
      .update({ content: "RLS 테스트" })
      .eq("id", "non-existent-id");

    expect(error).not.toBeNull();
  });
});
