import mongoose from "mongoose";

// comments are embedded inside post document
// this keeps us within the 2 collections limit as required
const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorUsername: {
      type: String,
      required: true,
    },
    textContent: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    // storing usernames instead of ids
    // makes it easy to check if user already liked
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);