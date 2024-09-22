import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [caption, setCaption] = useState('');
  const [savedPosts, setSavedPosts] = useState(null);

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
        const response = await axios.get(`http://localhost:3000/get_my_posts/${user.id}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setError('Failed to fetch posts');
      }
    };

    getUserPost();
  }, [user]);

  useEffect(() => {
    const savedPost = async () => {
     
        const response = await axios.get(`http://localhost:3000/get_saved_post/${user.id}`, {
          withCredentials: true,
        })
        setSavedPosts(response.data);


    };
    savedPost();
  }, [user]);

  const openForm = () => {
    navigate('/upload');
  };

  const handleEdit = (postId, currentCaption) => {
    setEditingPostId(postId);
    setCaption(currentCaption);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete_post/${postId}`,
        { withCredentials: true }
      );
      console.log("post deleted");
      // if(response) {
      //   navigate('/weather-gallery');
      // }
      setPosts((prevPost) => prevPost.filter(post => post._id !== postId));
      alert("your post has been deleted");

      console.log(response);

    } catch (error) {
      console.error('Failed to delete post:', error);
      setError('Failed to delete post');
    }
  };

  const handleSave = async (postId) => {
    try {
      console.log(caption);
      console.log(postId);
      const response = await axios.put(`http://localhost:3000/edit_caption/${postId}`,
        { caption },
        {
          withCredentials: true
        }
      );
      console.log(response);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, caption } : post
        )
      );

      setEditingPostId(null);
    } catch (error) {
      console.error('Failed to update caption:', error);
      setError('Failed to update caption');
    }
  };

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
            <div>
              {editingPostId === post._id ? (
                <div>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="border rounded p-2"
                  />

                  <button onClick={() => handleSave(post._id)} className="bg-green-500 text-white py-2 px-4 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingPostId(null)} className="bg-gray-500 text-white py-2 px-4 rounded">
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  {post.caption}
                  <button
                    onClick={() => handleEdit(post._id, post.caption)}
                    className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
                  >
                    Edit Caption
                  </button>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white py-2 px-4 rounded ml-2"
              >
                Delete Post
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          No posts yet!

        </div>
      )}
      <div>Saved Posts</div>
      {savedPosts && savedPosts.length > 0 ? (
        savedPosts.map((post) => (
          <div key={post._id}>
            <div className='flex'>
            <img
                src={post.author?.picture || 'https://via.placeholder.com/40'}
                alt="Author"
                className="h-12 w-12 rounded-full object-cover border-2 border-indigo-500"
              />
            <div>{post.author?.name}</div>
            </div>
            <img
              src={post.image}
              alt="Saved Post"
              className="rounded-lg w-full object-cover shadow-md"
            />
            <div>{post.caption}</div>

          </div>
        ))
      ) : (
        <div>No saved posts yet!</div>
      )}
      <button
        onClick={openForm}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white py-3 px-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mb-6"
      >
        Add Yours
      </button>
    </div>
  );
};

export default Dashboard;
