import React, { useContext } from "react";
import "./blog.scss";
import { Modal, Button } from "react-bootstrap";
import { MyContext } from "../Context/context";

function Blog(props) {
  const { findBlog } = useContext(MyContext);

  return (
    <div>
      {findBlog ? (
        <Modal
          {...props}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div closeButton className="ModalHeader ">
            <img src={findBlog?.image} alt="img" />

            <h1 className="bg-primary">{findBlog?.title}</h1>
          </div>
          <Modal.Body>
            <h4>
              <span>Description :</span> {findBlog?.description}
            </h4>
            <hr />
            <p>
              <span>Content :</span>
              {findBlog?.content}
            </p>
            <hr />
            <div>
              {findBlog?.comments.map((com) => {
                return (
                  <div key={com._id}>
                    <p>
                      <span>comment</span>
                      {com.commentText}
                      <hr />
                    </p>
                  </div>
                );
              })}
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
}

export default Blog;
