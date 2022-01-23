import React from "react";
import "./join.scss";
function Join() {
  const createUser = (e) => {
    e.preventDefault();
    let user = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch("http://localhost:4000/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          console.log(result.data);
        } else {
          console.log("====================================");
          console.log(result);
          console.log("====================================");
        }
      });
    console.log(user);
  };
  return (
    <div className="FormDiv">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={createUser}>
        <h3>Login Here</h3>
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
      </form>
    </div>
  );
}

export default Join;
