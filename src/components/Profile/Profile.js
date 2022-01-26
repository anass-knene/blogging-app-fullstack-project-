import React, { useContext } from "react";
import { MyContext } from "../Context/context";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.scss";
import EditUser from "./EditUser";
function Profile() {
  const { user, modalShow, setModalShow } = useContext(MyContext);

  return (
    <>
      {user ? (
        <div className="profile-container">
          <div className="userName">
            <h1>{user.firstName.toUpperCase()}</h1>
            <h1>{user.lastName.toUpperCase()}</h1>
          </div>
          <h3>{user.email}</h3>
          <img src={user.image} alt="img" width="200px" />
          <Button
            id={user._id}
            variant="primary"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Edit Profile
          </Button>

          <EditUser show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      ) : (
        <h1>no user</h1>
      )}
    </>
  );
}

export default Profile;
