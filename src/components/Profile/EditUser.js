import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { MyContext } from "../Context/context";
import "bootstrap/dist/css/bootstrap.min.css";
export default function EditUser(props) {
  const { user } = useContext(MyContext);
  return (
    <div>
      <div className="user-container ">
        {user ? (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className=" d-flex">
              <div className="w-50 ">
                <img
                  src={user?.image}
                  alt="img"
                  className="border border-dark "
                />
                <input type="file" className="btn btn-primary bg-dark w-100" />
              </div>
              <div className="container border border-dark rounded">
                <h4> {user.firstName.toUpperCase()}</h4>
                <h4>{user.lastName.toUpperCase()}</h4>
                <h4>{user.email}</h4>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <h1>Is Loading...</h1>

            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      );
    </div>
  );
}
