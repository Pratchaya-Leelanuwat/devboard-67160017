import { useState } from "react";
import { CommentList } from "./CommentList";

const PostCard = ({ post, isFavorite, onToggleFavorite }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="border border-blue-300 rounded-lg p-4 mt-4 shadow-md">
      <h3 className="text-blue-600 font-bold">{post.title}</h3>
      <p className="text-gray-700 leading-relaxed m-0">{post.body}</p>
      <div className="flex items-center gap-5 mt-3">
        <button
          onClick={onToggleFavorite}
          style={{
            backgroundColor: isFavorite ? "red" : "white",
            color: isFavorite ? "white" : "black",
            border: "1px solid red",
            borderRadius: "4px",
            padding: "4px 8px",
          }}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid blue",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "4px 8px",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {showComments ? "▲ ซ่อน" : "▼ ดูความคิดเห็น"}
        </button>
      </div>
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
};

export default PostCard;
