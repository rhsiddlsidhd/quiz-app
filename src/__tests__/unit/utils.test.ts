import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("단일 클래스를 반환한다", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("여러 클래스를 합친다", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("falsy 값을 제거한다", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });

  it("Tailwind 충돌 클래스를 마지막 값으로 병합한다", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("조건부 클래스를 처리한다", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });
});
