import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            {" "}
            <BiDonateBlood color="red" />
            Blood Bank App
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <FaCircleUser /> Welcome{" "}
                {user?.name || user?.hospitalName || user?.organizationName}{" "}
                &nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
