import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <nav className="max-w-3xl mx-auto px-4 py-3 flex gap-4 text-sm">
          <NavLink to="/" className="font-semibold">
            Lessons
          </NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
