import React from "react";
import { Link } from "react-router-dom";
import { userLogout } from "../actions";
import { useDispatch } from "react-redux";

const Navbar = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    console.log("handleLogout");
    e.preventDefault();
    dispatch(userLogout());
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand ml-5">
        Harrison Contact Book
      </Link>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link px-3">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link px-3">
                  Sign Up!
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <Link onClick={handleLogout} className="nav-link px-3">
                Log Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
