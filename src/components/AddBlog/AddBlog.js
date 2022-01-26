import axios from "axios";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MyContext } from "../Context/context";
import "./addBlog.sass";
export default function AddBlog() {
  const { user } = useContext(MyContext);
  console.log(user._id);
  const CreateBlog = async (e) => {
    e.preventDefault();

    let data = {
      title: e.target.title.value,
      content: e.target.content.value,
      description: e.target.description.value,
      userId: user._id,
    };
    //   axios fetch //////////////////////////////////////////////////////////////////////////
    //     try {
    //       await axios.post("http://localhost:4000/blogs", data);
    //       toast.success("Blog created Successfully!");
    //     } catch (error) {
    //       toast.error("something went wrong", error.message);
    //     }
    //   //////////////////////////////
    fetch("http://localhost:4000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Blog created Successfully!");
          console.log(result.success);
        } else {
          toast.error("something went wrong");
        }
      });
  };
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={CreateBlog}>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              name="description"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Content
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Content"
              name="content"
            />
          </div>
        </div>
        <input type="submit" value="Add Blog" className="btn btn-primary m-4" />
      </form>
    </div>
  );
}
