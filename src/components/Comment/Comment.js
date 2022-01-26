import React, { useContext } from "react";
import "./comment.scss";
import { Modal, Button } from "react-bootstrap";
import { MyContext } from "../Context/context";

function Comment(props) {
  const { findBlog } = useContext(MyContext);

  const saveComment = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    // fetch with header token and i have to add authorization middleware in add comment
    // if un
    console.log(formData);
  };
  const addComment = (commentId) => {};

  // console.log(findBlog);
  return (
    <div className="blog-container">
      {findBlog ? (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="ModalHeader ">
            <img src={findBlog?.image} alt="img" />

            <h1>{findBlog?.title}</h1>
          </div>
          <Modal.Body className="ModalBody">
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
                      <span>comment : </span>
                      {com.commentText}
                    </p>
                    <hr />
                  </div>
                );
              })}
              <form className="comment-form">
                <textarea
                  className="form-control"
                  placeholder="Write your Comments here..."
                  cols="30"
                  rows="3"
                  onChange={saveComment}
                />
                <input
                  className="btn btn-primary mt-2"
                  type="submit"
                  value="Comment"
                  // onChange={() => addComment(com._id)}
                />
              </form>
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

export default Comment;
