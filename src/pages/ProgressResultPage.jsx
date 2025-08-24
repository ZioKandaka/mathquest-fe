// src/pages/ProgressResultPage.jsx
import { Link, useParams } from "react-router-dom";
import { useResultsStore } from "../state/results";
import { useUserStore } from "../state/user";
import { useProfile } from "../api/hooks";
import ProgressReveal from "../components/ProgressReveal";

export default function ProgressResultPage() {
  const { lesson_id } = useParams();
  const id = Number(lesson_id);
  const user_id = useUserStore((s) => s.user_id);
  const last = useResultsStore((s) => s.lastByLesson[id]);
  const { data: profile } = useProfile(user_id);

  // Fallback to best progress from profile if no recent submit stored
  let correct = last?.correct_count ?? null;
  let total = last?.progress?.problems_total ?? null;
  let xp = last?.earned_xp ?? null;
  let streak = last?.streak?.current ?? profile?.current_streak ?? 0;
  let submittedAt = last?.progress?.last_submitted_at ?? null;

  if (correct == null || total == null) {
    const p = (profile?.progress || []).find((x) => Number(x.lesson_id) === id);
    if (p) {
      correct = p.best_correct_count ?? 0;
      total = p.problems_total ?? 0;
      xp = null; // unknown from profile
      submittedAt = p.last_submitted_at ?? null;
    }
  }

  const showFallbackNotice = !last;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Progress Result</h1>
        <Link to={`/`} className="text-blue-600">
          Try other lesson
        </Link>
      </div>

      {correct != null && total != null ? (
        <>
          <ProgressReveal
            correct={correct}
            total={total}
            xp={xp ?? 0}
            streak={streak}
          />
          <div className="text-sm text-gray-600">
            {submittedAt
              ? `Last submitted: ${new Date(submittedAt).toLocaleString()}`
              : "No recent submission found."}
          </div>
          {showFallbackNotice && (
            <div className="text-xs text-gray-500">
              Showing your <b>best progress</b> for this lesson. Submit again to
              see detailed XP/streak for the latest attempt.
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow">
          <p>No progress yet for this lesson.</p>
          <Link to={`/lessons/${id}`} className="text-blue-600">
            Start the lesson
          </Link>
        </div>
      )}
    </div>
  );
}
