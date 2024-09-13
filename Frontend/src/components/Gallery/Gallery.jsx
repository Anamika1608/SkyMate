import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Gallery() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_user', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        setPosts(response.data);
      } catch (error) {
        setError('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  const openForm = () => {
    navigate('/upload');
  };

  const eachPost = (post) => {
    navigate(`/post/${post._id}`, { state: { post } });
  };

  return (
    <div className="gallery-container">
      <button onClick={openForm}>Add Yours</button>

      {error && <p className="error-message">{error}</p>}

      <div className="">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="flex">
              <img
                src={post.author?.picture || 'https://via.placeholder.com/40'}
                alt="Author"
                className="h-10 w-10 rounded-full object-cover "
               
              />

              <div>{post.author?.name || 'Anonymous'}</div>
            </div>

            <img src={post.image} alt="Uploaded" className="h-44 w-44 cursor-pointer" onClick={() => eachPost(post)} />

            <p className="post-caption">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
