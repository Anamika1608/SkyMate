import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getComment?postId=${id}`);
        setAllComments(response.data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch the comments');
      }
    };
    fetchComments();
  }, [id, comment, reply]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError('Failed to fetch the post');
      }
    };
    fetchPost();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/addComment',
        { comment, postId: id },
        { withCredentials: true }
      );
      const newComment = response.data.comment;
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
      setComment('');
    } catch (error) {
      console.log('Error in saving comment', error);
    }
  };

  const addReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3000/addReply',
        { reply, commentId: replyingTo },
        { withCredentials: true }
      );
      setReply('');
      setReplyingTo(null);
      const updatedComments = await axios.get(`http://localhost:3000/getComment?postId=${id}`);
      setAllComments(updatedComments.data);
    } catch (error) {
      console.log('Error in saving reply', error);
    }
  };

  if (error) {
    return <p className="text-red-500 font-semibold text-center mt-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-gray-500 text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
    {/* Post Section: Image on the left, Comments on the right */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Image and Post Details */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <img
            src={post.author?.picture || 'https://via.placeholder.com/40'}
            alt="Author"
            className="h-12 w-12 rounded-full border-2 border-indigo-400"
          />
          <div className="ml-4">
            <p className="text-lg font-semibold">{post.author?.name || 'Anonymous'}</p>
            <p className="text-gray-500 text-sm">Posted on {new Date(post.created_at).toDateString()}</p>
          </div>
        </div>
        {/* Image */}
        <img
          src={post.image}
          alt="Uploaded"
          className="rounded-lg w-full object-cover shadow-md"
        />
        <p className="text-lg font-medium text-gray-700 mt-6">{post.caption}</p>
      </div>
  
      {/* Comments Section */}
      <div className="bg-gray-50 shadow-lg rounded-lg p-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>
  
        {/* Add Comment Form */}
        <div className="mb-6">
          <form onSubmit={addComment} className="flex flex-col">
            <textarea
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <button
              type="submit"
              className="self-end bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

          {/* List of Comments */}
          {allComments.length > 0 ? (
            allComments.map((comment) => (
              <div key={comment._id} className="mb-6">
                {/* Main Comment with background */}
                <div className="bg-indigo-100 rounded-lg p-4 mb-2 shadow-md">
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.commentor?.picture || 'https://via.placeholder.com/40'}
                      alt="Commentor"
                      className="h-8 w-8 rounded-full"
                    />
                    <p className="ml-4 text-gray-800 font-medium">
                      {comment.commentor?.name || 'Anonymous'}: {comment.comment}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setReplyingTo(comment._id)}
                  className="ml-12 text-sm text-indigo-500 hover:underline"
                >
                  Reply
                </button>

                {/* Reply Input */}
                {replyingTo === comment._id && (
                  <form onSubmit={addReply} className="ml-12 mt-4">
                    <textarea
                      placeholder="Write your reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      className="border border-gray-300 rounded-md p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={2}
                    />
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 transition"
                    >
                      Reply
                    </button>
                  </form>
                )}

                {/* Replies with Wire-Like Connection */}
                {comment.replies?.length > 0 && (
                  <div className="ml-12 border-l-2 border-indigo-300 pl-4 mt-4">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="mb-3">
                        <div className="flex items-center">
                          <img
                            src={reply.replier?.picture || 'https://via.placeholder.com/40'}
                            alt="Replier"
                            className="h-6 w-6 rounded-full"
                          />
                          <p className="ml-3 text-gray-700">
                            <strong>{reply.replier?.name || 'Anonymous'}</strong>: {reply.reply}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
