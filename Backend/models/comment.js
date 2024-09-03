const { string, date } = require("joi");
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment : String,
    created_at : {
        type : Date,
        default : Date.now
    }
});

const comment = mongoose.model("comment",commentSchema);

export default comment;