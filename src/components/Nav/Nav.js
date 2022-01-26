import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/context";
import "./nav.scss";
function Nav() {
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useContext(MyContext);
  const signOutUser = () => {
    console.log(user);
    setUser(null);
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <div className="Nav">
      {isLoggedIn ? (
        <ul>
          <li>
            <Link to="/login" onClick={signOutUser}>
              Log Out
            </Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/join">Join</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Nav;
