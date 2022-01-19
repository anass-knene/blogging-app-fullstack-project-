const CommentsCollection = require("../models/commentsSchema");
const createComment = async (req, res, next) => {
  try {
    const comments = new CommentsCollection(req.body);

    await comments.save();
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};
const updateComment = async (req, res, next) => {
  try {
    const comments = await CommentsCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};
const getComment = async (req, res, next) => {
  try {
    const comment = await CommentsCollection.findOne({ _id: req.params.id });
    res.json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};
const getComments = async (req, res, next) => {
  try {
    const comments = await CommentsCollection.find();
    res.json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const comment = await CommentsCollection.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createComment,
  getComment,
  updateComment,
  getComment,
  getComments,
  deleteComment,
};
