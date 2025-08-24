import { Outlet, NavLink } from "react-router-dom";
import UserPicker from "./UserPicker.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <nav className="max-w-3xl mx-auto px-4 py-3 flex gap-4 text-sm items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-1 py-0.5 ${
                isActive
                  ? "font-semibold text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Lessons
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-1 py-0.5 ${
                isActive
                  ? "font-semibold text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Profile
          </NavLink>

          {/* user selector on the right */}
          <UserPicker />
        </nav>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
