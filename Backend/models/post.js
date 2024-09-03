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
  //   reviews : [
  //     {
  //        type: Schema.Types.ObjectId , ref : review
  //     }
  //  ]
});

const post = mongoose.model('post', postSchema);

export default post;
