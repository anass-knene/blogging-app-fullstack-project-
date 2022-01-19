const express = require("express");
const router = express.Router();
// const validator = require("../middleware/validators");
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogs");
// router.route("/users").get(getUsers).post(createUser);
// router.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.get("/", getBlogs);
router.post("/", createBlog);
router.get("/:id", getBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
