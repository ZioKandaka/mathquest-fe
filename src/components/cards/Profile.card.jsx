export default function ProfileCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
