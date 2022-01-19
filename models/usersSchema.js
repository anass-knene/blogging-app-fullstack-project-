const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName: { type: String, required: true, max: 50 },
  lastName: { type: String, required: true, max: 50 },
  email: { type: String, required: false, max: 50 },
  password: { type: String, required: true, max: true, min: 6 },
  image: {
    type: String,
    default: function () {
      return `https://joeschmoe.io/api/v1/${this.lastName}`;
    },
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogs" }],
  createAt: {
    type: Date,
    default: Date.now,
  },
  // role: { type: String, enum: ["admin", "user"] },
});
const UsersCollection = mongoose.model("users", usersSchema);
module.exports = UsersCollection;
