import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  });

  
const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;