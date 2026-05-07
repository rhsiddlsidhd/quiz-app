import { describe, expect, it } from "vitest";

import { AppError } from "@/lib/errors";

describe("AppError", () => {
  it("message를 올바르게 저장한다", () => {
    const err = new AppError("테스트 오류", 400);
    expect(err.message).toBe("테스트 오류");
  });

  it("status를 올바르게 저장한다", () => {
    const err = new AppError("테스트 오류", 400);
    expect(err.status).toBe(400);
  });

  it("status 기본값은 500이다", () => {
    const err = new AppError("서버 오류");
    expect(err.status).toBe(500);
  });

  it("name이 AppError이다", () => {
    const err = new AppError("오류");
    expect(err.name).toBe("AppError");
  });

  it("instanceof Error를 만족한다", () => {
    const err = new AppError("오류");
    expect(err).toBeInstanceOf(Error);
  });
});
