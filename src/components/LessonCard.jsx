import { Link } from "react-router-dom";

export default function LessonCard({ lesson }) {
  const up = lesson.UserProgresses?.[0];
  const frac = Number.parseFloat(up?.progress_fraction ?? "0") || 0; // backend sends string
  const pct = Math.round(frac * 100);
  const cta = pct === 0 ? "Start" : pct < 100 ? "Resume" : "Review";

  return (
    <li className="bg-white rounded-2xl p-4 shadow">
      <h3 className="font-semibold">{lesson.title}</h3>
      <p className="text-sm text-gray-600">{lesson.description}</p>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span>{pct}% complete</span>

        {pct === 0 && (
          <Link to={`/lessons/${lesson.lesson_id}`} className="text-blue-600">
            Start
          </Link>
        )}
        {pct > 0 && pct < 100 && (
          <Link to={`/lessons/${lesson.lesson_id}`} className="text-blue-600">
            Resume
          </Link>
        )}
        {pct === 100 && (
          <Link to={`/lessons/${lesson.lesson_id}`} className="text-green-600">
            Review
          </Link>
        )}
      </div>
    </li>
  );
}
