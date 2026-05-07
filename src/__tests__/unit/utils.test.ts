import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("여러 클래스를 병합한다", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("falsy 값을 무시한다", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("Tailwind 충돌 클래스를 마지막 값으로 해결한다", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("조건부 클래스를 처리한다", () => {
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
  });
});
