const PostCard = ({ title, body, isFavorite, onToggleFavorite }) => {
  return (
    <div className="border border-blue-300 rounded-lg p-4 mt-4 shadow-md">
      <h3 className="text-blue-600 font-bold">{title}</h3>
      <p className="text-gray-700 leading-relaxed m-0">{body}</p>
      <button
        onClick={onToggleFavorite}
        style={{
          backgroundColor: isFavorite ? "red" : "white",
          color: isFavorite ? "white" : "black",
          border: "1px solid red",
          borderRadius: "4px",
          padding: "8px 12px",
          marginTop: "10px",
        }}
      >
        {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
      </button>
    </div>
  );
};

export default PostCard;
