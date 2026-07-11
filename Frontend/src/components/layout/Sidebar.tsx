import { Link, NavLink, useLocation } from "react-router-dom";
import {
  HiHome,
  HiPlusCircle,
  HiUser,
  HiUsers,
  HiOutlineLogout,
  HiOutlineLogin,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

const navigationItems = [
  { label: "Home", to: "/", icon: <HiHome className="text-xl" /> },
  {
    label: "Create Story",
    to: "/create-story",
    icon: <HiPlusCircle className="text-xl" />,
  },
  { label: "Profile", to: "/profile", icon: <HiUser className="text-xl" /> },
  {
    label: "Following",
    to: "/following",
    icon: <HiUsers className="text-xl" />,
  },
];

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-900 bg-slate-100"
    : "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-150";

const Sidebar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((segment) => segment[0])
        .join("")
        .slice(0, 2)
    : "KV";

  return (
    <aside className="w-64 h-screen shrink-0 border-r border-gray-200 bg-white flex flex-col">
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white text-lg font-semibold">
            K
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">KathaVerse</p>
            <p className="text-xs text-slate-500">Story publishing</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavLinkClass}>
              <span className="text-slate-500">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-gray-200 px-5 py-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-base font-semibold text-white">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <HiOutlineLogout className="text-base" />
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            <HiOutlineLogin className="text-base" />
            {isLoginPage ? "Already on login page" : "Login"}
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
