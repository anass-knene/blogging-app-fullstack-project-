import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Context/context";
import "./login.scss";
function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(MyContext);
  const userLogin = (e) => {
    e.preventDefault();
    let loginForm = new FormData(e.target);

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      body: loginForm,
    })
      .then((res) => {
        const token = res.headers.get("token");
        localStorage.setItem("token", token);
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          setIsLoggedIn(true);
          toast.success("Login Successfully ");
          setUser(result.data);
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else {
          toast.error(result.message, result.message);
        }
      });
  };
  return (
    <div>
      <div className="FormDiv">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form onSubmit={userLogin}>
          <h3>Login Here</h3>

          <input type="text" name="email" placeholder="Email..." />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            id="password"
          />
          <input type="submit" className="SignUpButton" />
          <Toaster className="mt5" position="top-center" reverseOrder={false} />
        </form>
      </div>
    </div>
  );
}

export default Login;
