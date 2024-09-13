import Comment from "../models/comment.js";
import Post from "../models/post.js";

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
        console.error('Error uploading image:', error);
        res.status(409).json({ message: `Failed to add comment: ${error.message}` });
    }
}

export const getComment = async (req, res) => {
    try {
      const { postId } = req.query; 
        const comments = await Comment.find({ postId })
        .populate('commentor', 'name picture');
  
      console.log(comments);
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(409).json({ message: error.message });
    }
  };
  