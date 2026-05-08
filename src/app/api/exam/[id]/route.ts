import { NextRequest, NextResponse } from "next/server";

import { AppError } from "@/lib/errors";
import { getQuizSet } from "@/lib/services/exam";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const mode = req.nextUrl.searchParams.get("m");
    const subjectId = req.nextUrl.searchParams.get("sub") ?? undefined;

    if (!id) throw new AppError("id가 필요합니다.", 400);

    const data = await getQuizSet(id, mode, subjectId);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: err.status },
      );
    }
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
};
