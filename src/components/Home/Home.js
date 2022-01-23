import React, { useContext } from "react";
import { MyContext } from "../Context/context";
import { Button } from "react-bootstrap";
import "./home.scss";
import Blog from "../Blog/Blog";
import "bootstrap/dist/css/bootstrap.min.css";
function Home() {
  const { blogs, modalShow, setModalShow, setFindBlog } = useContext(MyContext);
  const findUserBlog = (ele) => {
    const obUser = blogs.data.find((ob) => ob._id === ele);
    console.log(blogs);
    setFindBlog(obUser);
  };

  return (
    <div className="blogs">
      {blogs &&
        blogs.data.map((blog) => {
          return (
            <div key={blog._id} className="blog">
              <h1>{blog.title}</h1>
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

              <Blog show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          );
        })}
    </div>
  );
}

export default Home;
