const userCollection = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  const user = await userCollection.findOne({ email: req.body.email });
  console.log("=================user===================");
  console.log(user);
  console.log("==================user==================");
  if (user) {
    const check = bcrypt.compareSync(req.body.password, user.password);
    console.log("================check====================");
    console.log(check);
    console.log("==================check==================");
    if (check) {
      const token = jwt.sign({ id: user._id }, "just-token", {
        expiresIn: "5 days",
        issuer: "Anass",
        audience: "DCI",
      });
      user.token = token;
      await user.save();
      res.header("token", token).send({ success: true, data: user });
    } else {
      next({ message: "password does not match" });
    }
  } else {
    next({ message: "email doesn't exist" });
  }
};
module.exports = loginUser;
