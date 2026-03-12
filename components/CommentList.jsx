import React, { useEffect, useState } from "react";

export const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  if (loading) return <p className="text-gray-500">กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <strong className="text-gray-400">ความคิดเห็น ({comments.length})</strong>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>{comment.name}</div>
          <div>{comment.body}</div>
        </div>
      ))}
    </div>
  );
};
