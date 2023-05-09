import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions";

const Navbar = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          Harrison Contact Book
        </Link>
        <div id="navbarNav">
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">
                    Sign Up!
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link to={"/"} onClick={handleLogout} className="nav-link">
                  Log Out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
