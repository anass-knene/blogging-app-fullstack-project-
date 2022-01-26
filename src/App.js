import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./components/Context/Container";
import Join from "./components/Join/Join";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";

import "./app.scss";
import UserBlogs from "./components/UserBlogs/UserBlogs";
import AddBlog from "./components/AddBlog/AddBlog";
function App() {
  return (
    <Container>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs" element={<UserBlogs />} />
          <Route path="/addBlog" element={<AddBlog />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
