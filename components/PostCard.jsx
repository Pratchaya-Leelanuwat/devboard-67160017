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
          className={`${isFavorite ? "bg-red-500 text-white" : "bg-white text-black"} border border-blue-500 rounded-lg px-3 py-1.5 text-sm hover:bg-red-500 hover:text-white transition active:brightness-80`}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="border border-gray-500 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-500 hover:text-white transition active:brightness-80"
        >
          {showComments ? "▲ ซ่อน" : "▼ ดูความคิดเห็น"}
        </button>
      </div>
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
};

export default PostCard;
