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

  if (error) return <div className="text-red-600 text-center text-xl font-bold p-4">Error: {error}</div>;
  if (!user) return <div className="text-center text-xl font-bold p-4">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="border-b border-gray-200 py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-teal-800">Welcome, {user.name}</h1>
          <button
            onClick={openForm}
            className="bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            Add New Post
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-teal-800 mb-6">Your Gallery</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
                  <img
                    src={post.image}
                    alt="Uploaded"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    {editingPostId === post._id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          className="w-full border-b-2 border-teal-300 focus:border-teal-500 px-2 py-1 outline-none"
                        />
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => handleSave(post._id)} className="bg-teal-500 hover:bg-teal-600 text-white py-1 px-3 rounded-full text-sm">
                            Save
                          </button>
                          <button onClick={() => setEditingPostId(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded-full text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-3">{post.caption}</p>
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleEdit(post._id, post.caption)}
                            className="text-teal-600 hover:text-teal-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 bg-white rounded-lg p-8 shadow-md">
              <p className="text-xl mb-4">Your gallery is empty!</p>
              <p>Start by adding your first post.</p>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-teal-800 mb-6">Saved Inspirations</h2>
          {savedPosts && savedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedPosts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="flex items-center p-4 bg-teal-50">
                    <img
                      src='/profile.jpg'
                      alt="Author"
                      className="h-10 w-10 rounded-full object-cover border-2 border-teal-400 mr-3"
                    />
                    <div className="font-semibold text-teal-800">{post.author?.name}</div>
                  </div>
                  <img
                    src={post.image}
                    alt="Saved Post"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-gray-700">{post.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 bg-white rounded-lg p-8 shadow-md">
              <p className="text-xl mb-4">No saved inspirations yet!</p>
              <p>Explore and save posts you love.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );

};

export default Dashboard;