import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";

describe("Supabase 연결", () => {
  it("환경 변수 NEXT_PUBLIC_SUPABASE_URL이 존재한다", () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).not.toBe("");
  });

  it("환경 변수 NEXT_PUBLIC_SUPABASE_ANON_KEY가 존재한다", () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).not.toBe("");
  });

  it("createClient()가 에러 없이 인스턴스를 생성한다", () => {
    expect(() => createClient()).not.toThrow();
  });

  it("exams 테이블 select가 성공한다 (status 200)", async () => {
    const supabase = createClient();
    const { error } = await supabase.from("exams").select("*");
    expect(error).toBeNull();
  });
});
