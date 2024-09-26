import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    replier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
}, { timestamps: true });

const Reply  = mongoose.model('Reply' , replySchema);

export default Reply
