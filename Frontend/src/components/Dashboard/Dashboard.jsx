import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get_user', {
          withCredentials: true,
        });
        console.log(response.data);
        setUser(response.data);
      }
      catch (err) {
        console.error('Error fetching user:', err);
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const getUserPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/get_my_posts/${user.id}`);
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Failed to fetch posts');
      }
    };

    getUserPost();
  }, [user]);

  const openForm = () => {
    navigate('/upload');
  };

  const editCaption = (c) => {
    <input type="text" value={c} name='caption'
    onChange={(e) => setCaption(e.target.value)}
    />
  }

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <div>Your Posts</div>
      {(posts.length > 0) ? (
        posts.map((post) => (
          <div key={post._id}>
            <img
              src={post.image}
              alt="Uploaded"
              className="rounded-lg w-full object-cover shadow-md"
            />
            <div>{post.caption}
              <button onClick={() => editCaption(post.caption)}>Edit Caption</button>
              <button>Edit Now</button>
            </div>
          </div>
        ))
      )
        : <div>
          No posts yet !
          <button
            onClick={openForm}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white py-3 px-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mb-6"
          >
            Add Yours
          </button>
        </div>
      }
    </div>
  );
};

export default Dashboard;
