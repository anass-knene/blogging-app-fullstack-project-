import React, { useEffect, useState } from "react";
import { MyContext } from "./context";
function Container(props) {
  const [blogs, setBlogs] = useState();
  const [modalShow, setModalShow] = useState();
  const [findBlog, setFindBlog] = useState();

  useEffect(() => {
    const getAllBlogs = async () => {
      const res = await fetch("http://localhost:4000/blogs");
      const data = await res.json();
      setBlogs(data);
    };

    getAllBlogs();
  }, []);

  return (
    <MyContext.Provider
      value={{
        blogs,
        setBlogs,
        modalShow,
        setModalShow,
        findBlog,
        setFindBlog,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Container;
