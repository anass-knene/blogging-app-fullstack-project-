const BlogsCollection = require("../models/blogsSchema");
const UsersCollection = require("../models/usersSchema");

// get all blogs  /blogs
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogsCollection.find({});
    res.send({ success: true, data: blogs });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// create a new blogs  /blogs
const createBlog = async (req, res, next) => {
  try {
    const newBlog = new BlogsCollection(req.body);
    console.log(newBlog);
    await newBlog.save();
    const user = await UsersCollection.findById(newBlog.userId);
    console.log(user);
    user.blogs.push(newBlog._id);
    await user.save();
    res.json({
      success: true,
      data: newBlog,
      message: "created blog successfully",
    });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// update blog  blogs/:id
const updateBlog = async (req, res, next) => {
  try {
    const user = await BlogsCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      message: "blog updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// get blog  blogs/:id
const getBlog = async (req, res, next) => {
  try {
    const user = await BlogsCollection.findById(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// delete blog   blogs/:id
const deleteBlog = async (req, res, next) => {
  const user = await BlogsCollection.findByIdAndDelete(req.params.id);
  res.json({ success: true, data: user });
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { createBlog, updateBlog, getBlog, getBlogs, deleteBlog };
