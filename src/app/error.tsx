"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <h2>문제가 발생했습니다.</h2>
      <button onClick={reset}>다시 시도</button>
    </main>
  );
}
