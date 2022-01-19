const express = require("express");
const router = express.Router();

const {
  createComment,
  updateComment,
  getComment,
  getComments,
  deleteComment,
} = require("../controllers/comments");
const authentications = require("../middleware/auth");

// router.route("/").get(getComments).post(createComment);
// router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);

router.get("/", getComments);
router.post("/", authentications, createComment);
router.get("/:id", getComment);
router.patch("/:id", authentications, updateComment);
router.delete("/:id", authentications, deleteComment);

module.exports = router;
