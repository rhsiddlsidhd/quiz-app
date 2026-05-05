import { NextRequest, NextResponse } from "next/server";

import { AppError } from "@/lib/errors";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ examId: string }> },
) => {
  try {
    const { examId } = await params;
    // TODO: query param 파싱 및 Supabase 데이터 조회
    // const m = req.nextUrl.searchParams.get("m");
    // const sub = req.nextUrl.searchParams.get("sub");
    // const year = req.nextUrl.searchParams.get("year");
    // const round = req.nextUrl.searchParams.get("round");

    if (!examId) {
      throw new AppError("examId가 필요합니다.", 400);
    }

    return NextResponse.json({ success: true, data: null });
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
