import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", 
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
