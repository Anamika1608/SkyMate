import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Gallery() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);

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

  const eachPost = (post) => {
    navigate(`/post/${post._id}`, { state: { post } });
  };

  const handleSave = async (postId) => {
    try {
      const response = await axios.put('http://localhost:3000/save_my_post',
        {
          postId
        },
        { withCredentials: true }
      );
      console.log(response);
      setSavedPosts((prevSavedPosts) => [...prevSavedPosts, postId]);

    } catch (error) {
      console.log("Error in saving post - ", error);
    }
  };

  const handleUnsave = async (postId) => {
    try {
      const response = await axios.put(
        'http://localhost:3000/unsave_my_post',
        { postId },
        { withCredentials: true }
      );
      console.log(response);

      setSavedPosts((prevSavedPosts) => prevSavedPosts.filter((id) => id !== postId));

    } catch (error) {
      console.log("Error in unsaving post - ", error);
    }
  };


  return (
    <div className="p-4">
      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center p-3 bg-gray-50 border-b border-gray-200">
              <img
                src='/profile.jpg'
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

            <div className="p-4 bg-blue-50 flex justify-between">
              <p className="text-blue-700 font-medium text-lg tracking-wide">
                {post.caption}
              </p>

              {post.author?._id !== user?.id && (
                savedPosts.includes(post._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleUnsave(post._id)}
                  >
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleSave(post._id)}
                  >
                    <path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z" />
                  </svg>
                )
              )}

            </div>
          </div>
        ))}
      </div>
    </div>


  );
}

export default Gallery;
