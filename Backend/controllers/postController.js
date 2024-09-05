import cloudinary from 'cloudinary';
import post from '../models/post.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const upload = async (req, res) => {
   try {
     const { image, caption } = req.body;
 
     console.log('Received data:', req.body);
 
     if (!image || !caption) {
       return res.status(400).json({ message: 'Missing required fields: image or caption' });
     }
 
     const newPost = new post({ image, caption });
 
     await newPost.save();
     console.log('Image saved successfully');
 
     res.status(200).json({ message: 'Image uploaded successfully' });
   } 
   catch (error) {
     console.error('Error uploading image:', error);
     res.status(409).json({ message: `Failed to upload image: ${error.message}` }); // More detailed error message
   }
 };
 

export const posts = async (req, res) => {
   try {
      const allPosts = await post.find({});
      console.log(allPosts);
      res.status(200).json(allPosts);
   }
   catch (error) {
      console.log(error);
      console.error('Error fetching posts:', error);
      res.status(409).json({ message: error.message });
   }
};
