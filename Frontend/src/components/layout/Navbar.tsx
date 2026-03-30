import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const getClassLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "text-blue-400" : "text-black";
  };

  return (
    <nav className="flex justify-between px-4 py-3">
      <div className="logo">
        <NavLink to="/">Kathaverse</NavLink>
      </div>
      <div className="navigation flex gap-4">
        <NavLink to="/" className={getClassLink}>
          Home
        </NavLink>
        <NavLink to="/login" className={getClassLink}>
          Login
        </NavLink>
        <NavLink to="/register" className={getClassLink}>
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
