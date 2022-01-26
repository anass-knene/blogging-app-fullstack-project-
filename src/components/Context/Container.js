import React, { useState } from "react";
import { MyContext } from "./context";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
function Container(props) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState();
  const [findBlog, setFindBlog] = useState();
  const [userBlog, setUserBlog] = useState();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  const { data, err } = useSWR(
    {
      url1: "http://localhost:4000/blogs",
      url2: "http://localhost:4000/comments",
      url3: "http://localhost:4000/verifytoken",
      url4: "http://localhost:4000/users",
    },
    async ({ url1, url2, url3, url4 }) => {
      const res1 = await fetch(url1, {
        method: "GET",
      });
      const result1 = await res1.json();

      // //////////////////////////////////////////////////////////////////////////
      const res2 = await fetch(url2, {
        method: "GET",
      });
      const result2 = await res2.json();
      // //////////////////////////////////////////////////////////////////////////
      const res3 = await fetch(url3, {
        method: "GET",
        headers: { token: token },
      });
      const result3 = await res3.json();
      if (result3.success) {
        setUser(result3.data);
        setIsLoggedIn(true);
      } else {
        navigate("/");
      }
      const res4 = await fetch(url4, {
        method: "GET",
      });
      const result4 = await res4.json();

      if (result4.success) {
        const filterBlogUser = result4.data.filter(
          (item) => item._id === user._id
        );
        setUserBlog(filterBlogUser);
      } else {
        alert(result4.message);
      }

      return {
        blogs: result1.data,
        comments: result2.data,
        blogsErr: err,
        commentsErr: err,
      };
    }
  );

  return (
    <MyContext.Provider
      value={{
        blogs: data && data.blogs,
        comments: data && data.comments,
        modalShow,
        setModalShow,
        findBlog,
        setFindBlog,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        userBlog,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default Container;
