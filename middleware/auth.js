const jwt = require("jsonwebtoken");
const UsersCollection = require("../models/usersSchema");
const authentications = async (req, res, next) => {
  try {
    const token = req.header("token");
    console.log(token);

    let decode = jwt.verify(token, "just-token");
    if (decode) {
      const user = await UsersCollection.findById(decode.id);
      req.user = user;
      req.token = token;
      next();
    } else {
      next({ message: "Invalid token" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authentications;
