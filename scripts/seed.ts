import { config } from "dotenv";

config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 가 없습니다.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const EXAM_ID = "exam-sample-01";
const SUBJECT_ID = "00000000-0000-0000-0000-000000000001";
const QUESTION_ID = "00000000-0000-0000-0000-000000000002";

const seed = async () => {
  console.log("시드 데이터 삽입 시작...");

  const { error: examError } = await supabase
    .from("exams")
    .upsert({ id: EXAM_ID, name: "샘플 시험" });
  if (examError) throw new Error(`exams: ${examError.message}`);
  console.log("✓ exams");

  const { error: subjectError } = await supabase
    .from("subjects")
    .upsert({ id: SUBJECT_ID, exam_id: EXAM_ID, slug: "general", name: "일반" });
  if (subjectError) throw new Error(`subjects: ${subjectError.message}`);
  console.log("✓ subjects");

  const { error: questionError } = await supabase.from("questions").upsert({
    id: QUESTION_ID,
    exam_id: EXAM_ID,
    subject_id: SUBJECT_ID,
    year: 2024,
    round: 1,
    number: 1,
    content: "다음 중 옳은 것은?",
    view: null,
    explanation: "정답은 1번입니다.",
  });
  if (questionError) throw new Error(`questions: ${questionError.message}`);
  console.log("✓ questions");

  const options = [
    { id: "00000000-0000-0000-0000-000000000010", question_id: QUESTION_ID, number: 1, value: "보기 1", is_answer: true },
    { id: "00000000-0000-0000-0000-000000000011", question_id: QUESTION_ID, number: 2, value: "보기 2", is_answer: false },
    { id: "00000000-0000-0000-0000-000000000012", question_id: QUESTION_ID, number: 3, value: "보기 3", is_answer: false },
    { id: "00000000-0000-0000-0000-000000000013", question_id: QUESTION_ID, number: 4, value: "보기 4", is_answer: false },
  ];

  const { error: optionsError } = await supabase.from("options").upsert(options);
  if (optionsError) throw new Error(`options: ${optionsError.message}`);
  console.log("✓ options");

  console.log("시드 완료.");
};

seed().catch((err) => {
  console.error("시드 실패:", err.message);
  process.exit(1);
});
