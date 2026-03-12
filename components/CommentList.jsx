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
        <div
          key={comment.id}
          className="border-2 border-blue-500 rounded-lg p-3 mt-5"
        >
          <div className="text-blue-500 font-bold">{comment.name}</div>
          <div className="text-gray-700 leading-relaxed m-0">
            {comment.body}
          </div>
        </div>
      ))}
    </div>
  );
};
