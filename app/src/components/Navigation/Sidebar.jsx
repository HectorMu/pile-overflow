import React from "react";
import { NavLink } from "react-router-dom";
import useSession from "../../hooks/useSession";

const Sidebar = ({ setIsActive, isActive }) => {
  const { user } = useSession();

  if (user === null) {
    return <></>;
  }

  return (
    <aside className={`sidebar bg-dark ${isActive ? `active` : ``} `}>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => setIsActive(!isActive)}
          className="btn btn-sm btn-purple d-block d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <nav className="menu">
        <NavLink to="/home" className="menu-item">
          Home
        </NavLink>
        <NavLink to="/me/questions" className="menu-item">
          My questions
        </NavLink>
        <NavLink to="/me/answers" className="menu-item">
          My answers
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
