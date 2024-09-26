import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import post from '../models/post.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const getUser = async (req, res) => {
  try {
    // console.log('Request headers:', req.headers);
    // console.log('Cookies received:', req.cookies);

    const token = req.cookies.token;

    if (!token) {
      console.log('No token found in cookies');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Token found:', token);

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded token:', decoded);
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return res.status(401).json({ message: 'Invalid token', error: jwtError.message });
    }

    const userId = decoded.id;
    console.log('User ID from token:', userId);

    const user = await User.findById(userId).select('name email');

    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);
    
    res.status(200).json({ name: user.name, email: user.email, picture: user.picture, id: user._id});
  }
  catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { id } = req.params;

    const singlePost = await post.find({ author: id });

    if (!singlePost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(singlePost);
  }
  catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch the post: ' + error.message });
  }
};

export const userSavedPost = async (req, res) => {
  try {
    const userId = req.user?._id; 
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedPost: postId } },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: `Failed to save post: ${error.message}` });
  }
};

export const unsavePost = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedPost: postId } }, 
      { new: true }
    );

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Post unsaved successfully" });
  } catch (error) {
    console.error('Error unsaving post:', error);
    res.status(500).json({ message: `Failed to unsave post: ${error.message}` });
  }
}; 

export const getSavedPost = async (req, res) => {
  try {
    const { id } = req.params; 
    const reqUser = await User.findById(id).populate({
      path : 'savedPost',
      populate : {
        path : 'author',
        select : 'name picture'
      }
    });  

    if (!reqUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedPosts = reqUser.savedPost;
    console.log(savedPosts);  
    
    res.status(200).json(savedPosts);
    
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    res.status(500).json({ message: `Failed to fetch saved posts: ${error.message}` });
  }
};
