import { useParams } from "react-router-dom";
import { useLesson, useSubmit } from "../api/hooks";
import { v4 as uuid } from "uuid";
import { useUserStore } from "../state/user";
import { useSubmissionStore } from "../state/submission";
import { useState } from "react";
import ProgressReveal from "../components/ProgressReveal";

export default function LessonDetailPage() {
  const { lesson_id } = useParams();
  const id = Number(lesson_id);
  const user_id = useUserStore((s) => s.user_id);
  const setAnswer = useSubmissionStore((s) => s.setAnswer);
  const getAnswersArray = useSubmissionStore((s) => s.getAnswersArray);
  const clearLesson = useSubmissionStore((s) => s.clearLesson);

  const { data: lesson, isLoading, error } = useLesson(id);
  const submit = useSubmit(id);
  const [showResult, setShowResult] = useState(false);

  if (isLoading) return <p>Loading…</p>;
  if (error || !lesson)
    return <p className="text-red-600">Failed to load lesson</p>;

  const choose = (pid, optId, input) =>
    setAnswer(id, {
      problem_id: pid,
      selected_option_id: optId,
      input_value: input,
    });

  const onSubmit = async () => {
    const problemIds = lesson.Problems.map((p) => p.problem_id);
    const answers = getAnswersArray(id, problemIds); // keeps server “full submit” contract
    const payload = { user_id, attempt_id: uuid(), answers };
    await submit.mutateAsync(payload);
    setShowResult(true);
    clearLesson(id); // clear local answers after a successful submission
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{lesson.title}</h1>

      {lesson.Problems.map((p) => (
        <div key={p.problem_id} className="bg-white rounded-2xl p-4 shadow">
          <div className="font-medium mb-2">{p.prompt}</div>
          {p.type === "multiple_choice" ? (
            <div className="grid grid-cols-2 gap-2">
              {p.ProblemOptions?.map((o) => (
                <button
                  key={o.problem_option_id}
                  onClick={() => choose(p.problem_id, o.problem_option_id)}
                  className="rounded-xl border px-3 py-2 text-left border-gray-200 data-[active=true]:border-blue-600 data-[active=true]:bg-blue-50"
                  data-active={
                    false /* could read from store for active styling */
                  }
                >
                  {o.body}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 px-3 py-2"
              placeholder="Type your answer"
              onChange={(e) => choose(p.problem_id, undefined, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        onClick={onSubmit}
        disabled={submit.isPending}
        className="w-full sm:w-auto bg-blue-600 text-white rounded-xl px-4 py-2 disabled:opacity-60"
      >
        {submit.isPending ? "Submitting…" : "Submit"}
      </button>

      {submit.isSuccess && showResult && (
        <div className="mt-4">
          <ProgressReveal
            correct={submit.data.correct_count}
            total={lesson.Problems.length}
            xp={submit.data.earned_xp}
            streak={submit.data.streak.current}
          />
        </div>
      )}

      {submit.isError && <p className="text-red-600">Submit failed.</p>}
    </div>
  );
}
