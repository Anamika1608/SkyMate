import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, 
  comments : [
    {
      type: mongoose.Schema.Types.ObjectId , ref : 'Comment'
    }
  ]
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;
