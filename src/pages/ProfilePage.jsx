// ProfilePage.jsx
import { Link } from "react-router-dom";
import { useUserStore } from "../state/user";
import { useProfile } from "../api/hooks";
import ProfileCard from "../components/cards/Profile.card";

export default function ProfilePage() {
  const user_id = useUserStore((s) => s.user_id);
  const { data, isLoading, error } = useProfile(user_id);

  if (isLoading) return <p>Loading…</p>;
  if (error || !data)
    return <p className="text-red-600">Failed to load profile</p>;

  const completedCount = (data.progress ?? []).filter(
    (el) => el.completed
  ).length;

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <ProfileCard label="Total XP" value={data.total_xp} />
        <ProfileCard
          label="Current Streak"
          value={`${data.current_streak} days`}
        />
        <ProfileCard label="Best Streak" value={`${data.best_streak} days`} />
        <ProfileCard
          label="Lesson Completed"
          value={`${completedCount} lessons`}
        />
      </div>

      {/* Progress table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-2xl shadow overflow-hidden">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left w-12">#</th>
              <th className="px-4 py-3 text-left">Lesson</th>
              <th className="px-4 py-3 text-left">Progress</th>
              <th className="px-4 py-3 text-left">Last submitted</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {(data.progress ?? []).map((row, idx) => {
              const frac = Number.parseFloat(row.progress_fraction ?? "0") || 0;
              const pct = Math.round(frac * 100);
              const dt = row.last_submitted_at
                ? new Date(row.last_submitted_at)
                : null;

              return (
                <tr key={row.user_progress_id} className="border-t">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">
                    {row.Lesson?.title ?? `Lesson ${row.lesson_id}`}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-28 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span>{pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {dt ? dt.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/lessons/${row.lesson_id}/result`}
                      className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}

            {(!data.progress || data.progress.length === 0) && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                  No progress yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
