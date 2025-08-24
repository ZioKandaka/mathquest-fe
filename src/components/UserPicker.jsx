import { useUsers } from "../api/hooks";
import { useUserStore } from "../state/user";

export default function UserPicker() {
  const { data: users = [], isLoading } = useUsers();

  const user_id = useUserStore((s) => s.user_id);
  const setUser = useUserStore((s) => s.setUser);

  const onChange = (e) => {
    const uid = Number(e.target.value);
    if (uid === Number(user_id)) return;
    const u = users.find((x) => Number(x.user_id) === uid);
    if (!u) return;
    setUser(u);
  };

  return (
    <select
      value={Number(user_id) || ""}
      onChange={onChange}
      className="ml-auto rounded-lg border border-gray-300 px-2 py-1 text-sm bg-white"
      disabled={isLoading}
      aria-label="Select user"
    >
      {users.map((u) => (
        <option key={u.user_id} value={Number(u.user_id)}>
          {u.display_name}
        </option>
      ))}
    </select>
  );
}
