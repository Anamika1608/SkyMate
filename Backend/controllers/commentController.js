import Comment from "../models/comment.js";
import Post from "../models/post.js";
import Reply from "../models/reply.js";

export const addComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const userId = req.user?._id;

    const newComment = new Comment({
      comment,
      postId,
      commentor: userId
    });

    await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    })

    res.status(200).json({ messgae: "comment saved successfully" });
  }

  catch (error) {
    console.error('Error uploading comment:', error);
    res.status(409).json({ message: `Failed to add comment: ${error.message}` });
  }
}

export const getComment = async (req, res) => {
  try {
    const { postId } = req.query;
    const comments = await Comment.find({ postId })
      .populate('commentor', 'name picture')
      .populate({
        path: 'replies',
        populate: {
          path: 'replier',
          select: 'name picture'
        }
      })
      .sort({ created_at: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};

export const addReply = async (req, res) => {
  try {
    const { reply, commentId } = req.body;

    const userId = req.user?._id;

    const newReply = new Reply({
      replier: userId,
      reply,
      commentId,
    });

    await newReply.save();

    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: newReply._id }
    })

  }
  catch (error) {
    console.error('Error uploading replies:', error);
    res.status(409).json({ message: `Failed to add replies: ${error.message}` });
  }
}

