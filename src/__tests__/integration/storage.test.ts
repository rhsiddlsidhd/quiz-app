import { describe, expect, it } from "vitest";

import { createClient } from "@/lib/supabase/server";

describe("Storage 버킷 접근", () => {
  it("question-assets 버킷 list 호출이 성공한다", async () => {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from("question-assets").list();

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });

  it("question-assets 버킷의 public URL 형식이 올바르다", () => {
    const supabase = createClient();
    const { data } = supabase.storage
      .from("question-assets")
      .getPublicUrl("sample.png");

    expect(data.publicUrl).toContain("question-assets");
    expect(data.publicUrl).toMatch(/^https?:\/\//);
  });
});
