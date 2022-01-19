const express = require("express");
const router = express.Router();
const validator = require("../middleware/validators");
const {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/users");
const authentications = require("../middleware/auth");

router.route("/users").get(getUsers).post(validator, createUser);
router
  .route("/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(authentications, deleteUser);
// router.get("/users", getUsers);
// router.post("/users", validator, createUser);
// router.get("/users/:id", authentications, getUser);
// router.patch("/users/:id", authentications, updateUser);
// router.delete("/users/:id", authentications, deleteUser);

module.exports = router;
