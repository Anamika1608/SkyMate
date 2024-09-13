import post from '../models/post.js';
 
export const upload = async (req, res) => {
   try {
      const { image, caption } = req.body;
      const authorId = req.user?._id;

      if (!authorId) {
         return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      }

      if (!image || !caption) {
         return res.status(400).json({ message: 'Missing required fields: image or caption' });
      }

      const newPost = new post({
         image,
         caption,
         author: authorId,
      });

      await newPost.save();
      console.log('Image saved successfully');

      res.status(200).json({ message: 'Image uploaded successfully' });
   }
   catch (error) {
      console.error('Error uploading image:', error);
      res.status(409).json({ message: `Failed to upload image: ${error.message}` }); 
   }
};

export const posts = async (req, res) => {
   try {
      const allPosts = await post.find().populate('author', 'name picture');
      console.log(allPosts);
      res.status(200).json(allPosts);
   }
   catch (error) {
      console.log(error);
      console.error('Error fetching posts:', error);
      res.status(409).json({ message: error.message });
   }
};

export const getPost = async (req, res) => {
   try {
     const { id } = req.params;
     const singlePost = await post.findById(id).populate('author', 'name picture'); 
 
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

export const editPost = async (req, res) => {
   try {

   }
   catch (error) {
      console.log(error);
   }
}

export const deletePost = async (req, res) => {
   try {

   }
   catch (error) {

   }
}
