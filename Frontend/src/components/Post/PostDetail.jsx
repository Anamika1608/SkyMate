import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [allComments, setallComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState("");

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
    fetchPost()
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

  const addReply = async (e) => {
    e.preventDefault();
    console.log(reply);
    try {
      const response = axios.post("http://localhost:3000/addReply", {
        reply,
        commentId: replyingTo
      },
        {
          withCredentials: true
        });

      console.log(response);
      setReply('');
      setReplyingTo(null);
      const updatedComments = await axios.get(`http://localhost:3000/getComment?postId=${id}`);
      setAllComments(updatedComments.data);
    }
    catch (error) {
      console.log('error in saving reply', error);
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
          src={post.author?.picture}
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
          <div>
            <div key={comment._id} className='flex'>
              <img
                src={comment.commentor?.picture}
                alt="Commentor"
                className="h-6 w-6 rounded-full"
              />
              <p>
                <strong>{comment.commentor?.name || "Anonymous"}</strong>:{" "}
                {comment.comment}
              </p>
              
              {/* <div>{comment.created_at}</div> */}
            </div>

            <div>
              <button onClick={() => setReplyingTo(comment._id)}>
                Reply
              </button>
              {(replyingTo === comment._id) && (
                <form onSubmit={addReply}>
                  <input type="text" placeholder='Reply now' value={reply} onChange={(e) => setReply(e.target.value)} />
                  <button type='submit'>Add Reply</button>
                </form>
              )}

              {/* render the replies */}
              {comment.replies?.length > 0 && (
                <div className="replies-section">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="reply ml-4">
                      <img
                        src={reply.replier?.picture}
                        alt="Replier"
                        className="h-5 w-5 rounded-full"
                      />
                      <p>
                        <strong>{reply.replier?.name || "Anonymous"}</strong>: {reply.reply}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

      </div>

    </div>


  
  );
}

export default PostDetail;
