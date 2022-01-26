import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./join.scss";
import { MyContext } from "../Context/context";
import { useNavigate } from "react-router-dom";
function Join() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(MyContext);
  const createUser = (e) => {
    e.preventDefault();
    let userForm = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch("http://localhost:4000/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForm),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setIsLoggedIn(true);
          toast.success("Registered Successfully !");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          for (const key in result.message) {
            toast.error("check your " + key);
          }
        }
      });
  };
  return (
    <div className="FormDiv">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={createUser}>
        <h3>Join Us</h3>
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="text" name="lastName" placeholder="Last Name" />
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
  );
}

export default Join;
