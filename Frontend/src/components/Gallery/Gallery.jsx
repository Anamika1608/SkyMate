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
    <div className="p-4">
      {/* <button
        onClick={openForm}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white py-3 px-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mb-6"
      >
        Add Yours
      </button> */}

      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center p-3 bg-gray-50 border-b border-gray-200">
              <img
                src={post.author?.picture || 'https://via.placeholder.com/40'}
                alt="Author"
                className="h-12 w-12 rounded-full object-cover border-2 border-indigo-500"
              />
              <div className="ml-4 text-gray-700 font-semibold text-xl">
                {post.author?.name || 'Anonymous'}
                {post.author?.verified && (
                  <span className="ml-2 text-sm text-indigo-600 font-bold bg-indigo-100 px-2 py-1 rounded-md">
                    Verified
                  </span>
                )}
              </div>
            </div>

            <img
              src={post.image}
              alt="Uploaded"
              className="h-48 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity duration-300"
              onClick={() => eachPost(post)}
            />

            <div className="p-4 bg-blue-50">
              <p className="text-blue-700 font-medium text-lg tracking-wide">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
