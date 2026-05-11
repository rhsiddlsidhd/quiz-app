import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/exam/[id]/route";

vi.mock("@/lib/services/exam", () => ({
  getQuizSet: vi.fn().mockResolvedValue({ exam: { id: "test-exam" }, mode: "mock", questions: [] }),
}));

const makeRequest = (url: string) => new NextRequest(url);

const makeParams = (id: string): { params: Promise<{ id: string }> } => ({
  params: Promise.resolve({ id }),
});

describe("GET /api/exam/[id]", () => {
  it("유효한 examId → { success: true } 반환", async () => {
    const req = makeRequest("http://localhost/api/exam/test-exam?m=mock");
    const res = await GET(req, makeParams("test-exam"));
    const body = await res.json();

    expect(body.success).toBe(true);
  });

  it("빈 examId → success가 false다", async () => {
    const req = makeRequest("http://localhost/api/exam/");
    const res = await GET(req, makeParams(""));
    const body = await res.json();

    expect(body.success).toBe(false);
  });

  it("빈 examId → error 메시지가 반환된다", async () => {
    const req = makeRequest("http://localhost/api/exam/");
    const res = await GET(req, makeParams(""));
    const body = await res.json();

    expect(body.error).toBe("id가 필요합니다.");
  });

  it("빈 examId → 상태 코드가 400이다", async () => {
    const req = makeRequest("http://localhost/api/exam/");
    const res = await GET(req, makeParams(""));

    expect(res.status).toBe(400);
  });
});
