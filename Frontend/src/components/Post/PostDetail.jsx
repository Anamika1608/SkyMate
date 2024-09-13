import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [allComments, setallComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getComment?postId=${id}`);
        setallComments(response.data);
      } catch (error) {
        console.log(error);
        setError('Failed to fetch the comments');
      }
    };
    fetchComments();
  }, [id , comment]);

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
      const response = await axios.post("http://localhost:3000/addComment", {
        comment,
        postId: id,
      },
        {
          withCredentials: true,
        });
      console.log(response.data);
      const newComment = response.data.comment;

      setPost(prevPost => ({
        ...prevPost,
        comments: [
          ...prevPost.comments, newComment
        ]
      }));
      console.log(post);
      setComment('');
    }

    catch (error) {
      console.log('error in saving comment', error);
    }
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-detail-container">

      <div className="flex">
        <img
          src={post.author?.picture || 'https://via.placeholder.com/40'}
          alt="Author"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>{post.author?.name || 'Anonymous'}</div>
      </div>

      <img src={post.image} alt="Uploaded" className="h-44 w-44" />

      <p className="post-caption">{post.caption}</p>

      <div>Add comments</div>

      <form onSubmit={addComment} >

        <input type="text"
          placeholder='write anything..'
          value={comment}
          onChange={(e) => setComment(e.target.value)} />

        <button type='submit'>Add</button>
      </form>
      <div>
        <div>Comments</div>
        {allComments.map((comment) => (
          <div key={comment._id}>
            <img
              src={comment.commentor?.picture}
              alt="Commentor"
              className="h-6 w-6 rounded-full"
            />
            <p>
              <strong>{comment.commentor?.name || "Anonymous"}</strong>:{" "}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
