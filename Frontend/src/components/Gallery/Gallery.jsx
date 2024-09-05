import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Gallery() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts'); 
        setPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const openForm = () => {
    navigate('/upload');
  };

  return (
    <div className="gallery-container">
      <button onClick={openForm}>Add Yours</button>

      <div className="posts-grid">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            <img src={post.image} alt="Uploaded" className="post-image" />

            <p className="post-caption">{post.caption}</p>

            <p className="post-author">Posted by: {post.authorName || 'Anonymous'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
