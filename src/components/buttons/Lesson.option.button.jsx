export default function LessonOptionButton({
  active = false,
  onClick,
  className = "",
  children,
}) {
  const base =
    "rounded-xl border px-3 py-2 text-left transition-colors " +
    "border-gray-200 hover:border-gray-300 " +
    "data-[active=true]:border-blue-600 data-[active=true]:bg-blue-50 " +
    "data-[active=true]:text-blue-900 data-[active=true]:ring-2 data-[active=true]:ring-blue-200";

  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active}
      aria-pressed={active}
      className={`${base} ${className}`}
    >
      {children}
    </button>
  );
}
