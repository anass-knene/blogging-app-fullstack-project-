import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";
function Nav() {
  return (
    <div className="Nav">
      <ul>
        <li>
          <Link to="/join">Join</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/profile">Log In</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
