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

    res.status(200).json({ name: user.name, email: user.email, picture: user.picture, id: user._id });
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

export const editCaption = async (req, res) => {
  try {
    console.log("inside api call - edit caption");
    const  postId  = req.params.id;
    const { caption } = req.body;
    
    console.log(postId);
    console.log(caption);

    const editedPost = await post.findByIdAndUpdate(postId,
      { caption: caption }, {
      new: true
    });
    
    console.log(editedPost);

    if (!editedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(editedPost);
  } 
  catch (error) {
    console.error('Error in updating caption:', error);
    res.status(500).json({ message: 'Failed to update the post: ' + error.message });
  }
}

