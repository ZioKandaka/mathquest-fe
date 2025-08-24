import { Link } from "react-router-dom";
import { useLessons } from "../api/hooks.js";
import { useUserStore } from "../state/user";

export default function LessonsPage() {
  const user_id = useUserStore((s) => s.user_id);
  const req = useLessons(user_id);

  let data = req.data
  let isLoading = req.isLoading
  let error = req.error
  

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Failed to load lessons</p>;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {data.map((l) => (
        <li key={l.lesson_id} className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold">{l.title}</h3>
          <p className="text-sm text-gray-600">{l.description}</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span>
              {Math.round((l.progress?.fraction ?? 0) * 100)}% complete
            </span>
            <Link to={`/lessons/${l.lesson_id}`} className="text-blue-600">
              Start
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
