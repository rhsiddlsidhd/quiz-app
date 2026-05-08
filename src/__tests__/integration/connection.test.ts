import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";

describe("환경 변수", () => {
  it("NEXT_PUBLIC_SUPABASE_URL이 존재한다", () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined();
  });

  it("NEXT_PUBLIC_SUPABASE_ANON_KEY가 존재한다", () => {
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined();
  });
});

describe("Supabase 클라이언트", () => {
  it("createClient()가 정상적으로 생성된다", () => {
    const client = createClient();
    expect(client).toBeDefined();
  });

  it("exams 테이블에 select 요청이 성공한다", async () => {
    const client = createClient();
    const { error } = await client.from("exams").select("*").limit(1);
    expect(error).toBeNull();
  });
});
