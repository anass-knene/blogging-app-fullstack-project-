import React, { useContext } from "react";
import { MyContext } from "../Context/context";
import { Button } from "react-bootstrap";
import "./home.scss";
import Comment from "../Comment/Comment";
import "bootstrap/dist/css/bootstrap.min.css";
function Home() {
  const { blogs, modalShow, setModalShow, setFindBlog } = useContext(MyContext);
  const findUserBlog = (ele) => {
    const obUser = blogs.find((ob) => ob._id === ele);
    setFindBlog(obUser);
  };

  return (
    <div className="blogs">
      {blogs &&
        blogs.map((blog) => {
          return (
            <div key={blog._id} className="blog container w-25">
              <p className="bold">{blog.title}</p>
              <img src={blog.image} alt="img" width="100" />
              <h2>{blog.description}</h2>
              <p>{blog.content}</p>

              {blog.comments.map((text) => {
                return (
                  <div className="commentText" key={text._id}>
                    <hr />
                    <p>{text.commentText}</p>
                  </div>
                );
              })}
              <Button
                id={blog._id}
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  findUserBlog(blog._id);
                }}
              >
                Add a Comment
              </Button>

              <Comment
                show={modalShow}
                onHide={() => setModalShow(false)}
                userId={blog.userId}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Home;
