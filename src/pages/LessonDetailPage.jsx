// src/pages/LessonDetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useLesson, useSubmit } from "../api/hooks";
import { v4 as uuid } from "uuid";
import { useUserStore } from "../state/user";
import { useSubmissionStore } from "../state/submission";
import { useResultsStore } from "../state/results";
import getErrorMessage from "../utils/getErrorMessage";
import LessonOptionButton from "../components/buttons/Lesson.option.button";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ErrorModal from "../components/modals/Error.modal";

const EMPTY_OBJ = Object.freeze({});

export default function LessonDetailPage() {
  const { lesson_id } = useParams();
  const id = Number(lesson_id);

  // stores / hooks (all at top)
  const user_id = useUserStore((s) => s.user_id);
  const setAnswer = useSubmissionStore((s) => s.setAnswer);
  const getAnswersArr = useSubmissionStore((s) => s.getAnswersArray);
  const clearLesson = useSubmissionStore((s) => s.clearLesson);
  const rawMap = useSubmissionStore((s) => s.answersByLesson[id]);
  const answersMap = rawMap ?? EMPTY_OBJ;

  const { data: lesson, isLoading, error } = useLesson(id);
  const submit = useSubmit(id);
  const nav = useNavigate();
  const setLastResult = useResultsStore((s) => s.setLastResult);
  const qc = useQueryClient();

  const [submitting, setSubmitting] = useState(false);

  // modal error state
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (submit.isError) {
      setErrorMsg(getErrorMessage(submit.error));
      setErrorOpen(true);
    }
  }, [submit.isError, submit.error]);

  const closeError = () => {
    setErrorOpen(false);
    submit.reset();
  };

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
    const missingNumbers = [];
    lesson.Problems.forEach((p, i) => {
      const ans = answersMap[p.problem_id];
      const mcMissing =
        p.type === "multiple_choice" && !ans?.selected_option_id;
      const inMissing =
        p.type === "input" && !(ans?.input_value ?? "").toString().trim();
      if (mcMissing || inMissing) missingNumbers.push(i + 1); // human-friendly 1-based index
    });

    if (missingNumbers.length) {
      setErrorMsg(
        `Please complete all questions before submitting. Unanswered: ${missingNumbers.join(
          ", "
        )}.`
      );
      setErrorOpen(true);
      return; 
    }

    try {
      setSubmitting(true);
      const problemIds = lesson.Problems.map((p) => p.problem_id);
      const answers = getAnswersArr(id, problemIds);
      const payload = { user_id, attempt_id: uuid(), answers };

      const res = await submit.mutateAsync(payload);

      qc.invalidateQueries({ queryKey: ["lessons", user_id] });
      qc.invalidateQueries({ queryKey: ["profile", user_id] });
      qc.refetchQueries({ queryKey: ["lessons", user_id] });
      qc.refetchQueries({ queryKey: ["profile", user_id] });

      setLastResult(id, res);
      clearLesson(id);
      nav(`/lessons/${id}/result`);
    } finally {
      setSubmitting(false);
    }
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
                <LessonOptionButton
                  key={o.problem_option_id}
                  active={
                    answersMap[p.problem_id]?.selected_option_id ===
                    o.problem_option_id
                  }
                  onClick={() => choose(p.problem_id, o.problem_option_id)}
                >
                  {o.body}
                </LessonOptionButton>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className={`w-full rounded-xl border px-3 py-2 transition-colors ${
                (answersMap[p.problem_id]?.input_value ?? "").trim()
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 focus:border-gray-300"
              }`}
              placeholder="Type your answer"
              onChange={(e) => choose(p.problem_id, undefined, e.target.value)}
            />
          )}
        </div>
      ))}

      <button
        onClick={onSubmit}
        disabled={submit.isPending || submitting}
        className="w-full sm:w-auto bg-blue-600 text-white rounded-xl px-4 py-2 disabled:opacity-60"
      >
        {submit.isPending || submitting ? "Submitting…" : "Submit"}
      </button>

      {/* Error popup */}
      <ErrorModal
        open={errorOpen}
        title="Submission failed"
        onClose={closeError}
      >
        {errorMsg || "Something went wrong. Please try again."}
      </ErrorModal>
    </div>
  );
}
