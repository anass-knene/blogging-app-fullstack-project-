const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  image: {
    type: String,
    default: `https://source.unsplash.com/random/300x200?sig=${Math.random()}`,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const BlogsCollection = mongoose.model("blogs", blogsSchema);
module.exports = BlogsCollection;
