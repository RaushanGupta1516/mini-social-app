import Post from "../models/Post.js";


// POST /api/posts — create a new post
export const createPost = async (req, res) => {
  const { textContent } = req.body;

  // if image was uploaded via multer, req.file will have cloudinary url
  const imageUrl = req.file ? req.file.path : "";

  // at least one field required
  if (!textContent && !imageUrl) {
    return res
      .status(400)
      .json({ message: "Post must have text or an image" });
  }

  try {
    const post = await Post.create({
      authorId: req.user.id,
      authorUsername: req.user.username,
      textContent: textContent || "",
      imageUrl: imageUrl || "",
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};




// GET /api/posts — get all posts with pagination
export const getFeed = async (req, res) => {
  // page and limit come from query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (err) {
    console.error("Get feed error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/posts/:id/like — toggle like on a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const username = req.user.username;
    const alreadyLiked = post.likes.includes(username);

    if (alreadyLiked) {
      // unlike — remove username from likes array
      post.likes = post.likes.filter((u) => u !== username);
    } else {
      // like — add username to likes array
      post.likes.push(username);
    }

    await post.save();

    res.json({
      likes: post.likes,
      likeCount: post.likes.length,
    });
  } catch (err) {
    console.error("Like post error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/posts/:id/comment — add a comment to a post
export const commentOnPost = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      username: req.user.username,
      text: text.trim(),
    };

    post.comments.push(newComment);
    await post.save();

    // send back the full updated comments array
    res.status(201).json({
      comments: post.comments,
      commentCount: post.comments.length,
    });
  } catch (err) {
    console.error("Comment error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/posts/:id/comments — get all comments for a post
export const getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select("comments");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ comments: post.comments });
  } catch (err) {
    console.error("Get comments error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};