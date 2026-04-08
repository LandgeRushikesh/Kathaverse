import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const getClassLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "text-blue-400" : "text-black";
  };

  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="flex justify-between px-4 py-3">
      <div className="logo">
        <NavLink to="/">Kathaverse</NavLink>
      </div>
      <div className="navigation flex gap-4">
        <NavLink to="/" className={getClassLink}>
          Home
        </NavLink>
        {isAuthenticated ? (
          <>
            <span className="font-medium text-gray-600">{user.name}</span>
            <button
              onClick={logout}
              className="text-red-700 hover:text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={getClassLink}>
              Login
            </NavLink>
            <NavLink to="/register" className={getClassLink}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
