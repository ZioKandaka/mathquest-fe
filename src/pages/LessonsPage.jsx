import { Link } from "react-router-dom";
import { useLessons } from "../api/hooks.js";
import { useUserStore } from "../state/user";
import LessonCard from "../components/cards/Lesson.card.jsx";

export default function LessonsPage() {
  const user_id = useUserStore((s) => s.user_id);
  const req = useLessons(user_id);

  let data = req.data;
  let isLoading = req.isLoading;
  let error = req.error;

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Failed to load lessons</p>;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {data.map((l) => (
        <LessonCard key={l.lesson_id} lesson={l} />
      ))}
    </ul>
  );
}
