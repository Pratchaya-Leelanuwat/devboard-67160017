import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext";
import { useState, useEffect } from "react";
import { CommentList } from "../../components/CommentList";
import { useFetch } from "../hooks/useFetch";

// แสดงหน้า รายละเอียดแต่ละโพสต์
function PostDetailPage() {
  const { id } = useParams(); // ดึง id จาก url
  const { favorites, toggleFavorite } = useFavorites();

  // fetch จาก api ตาม id โดยใช้ useFetch แทนที่จากเดิมที่ fetch เอง
  const { data, loading } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    id,
  );
  console.log("data", data);
  if (loading) return <LoadingSpinner />;

  const isFavorite = favorites.includes(data.id);

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <Link to="/" className="text-blue-700">
        ← กลับหน้าหลัก
      </Link>

      <div className="border border-gray-200 rounded-lg p-6 my-4 bg-white">
        <h2 className="mb-4 text-blue-700">{data.title}</h2>

        <p className="text-gray-600">{data.body}</p>

        <button
          onClick={() => toggleFavorite(data.id)}
          className={`bg-transparent border-none cursor-pointer text-base ${
            isFavorite ? "text-red-600" : "text-gray-400"
          }`}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      {/* แสดง comment */}
      <CommentList postId={data.id} />
    </div>
  );
}

export default PostDetailPage;
