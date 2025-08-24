import { useUserStore } from "../state/user";
import { useProfile } from "../api/hooks";

export default function ProfilePage() {
  const user_id = useUserStore((s) => s.user_id);
  const { data, isLoading, error } = useProfile(user_id);

  if (isLoading) return <p>Loading…</p>;
  if (error || !data)
    return <p className="text-red-600">Failed to load profile</p>;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card label="Total XP" value={data.total_xp} />
      <Card label="Current Streak" value={`${data.current_streak} days`} />
      <Card label="Best Streak" value={`${data.best_streak} days`} />
    </div>
  );
}
function Card({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
