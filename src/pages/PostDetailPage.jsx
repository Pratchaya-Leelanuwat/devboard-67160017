import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useFavorites } from "../context/FavoritesContext";
import { CommentList } from "../../components/CommentList";

// แสดงหน้า รายละเอียดแต่ละโพสต์
function PostDetailPage({ posts }) {
  const { id } = useParams(); // ดึง id จาก url
  const { favorites, toggleFavorite } = useFavorites();

  // หาโพสต์ที่ id ตรงกัน
  const post = posts.find((post) => post.id === Number(id));

  if (!post) return <LoadingSpinner />;

  const isFavorite = favorites.includes(post.id);

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <Link to="/" className="text-blue-700">
        ← กลับหน้าหลัก
      </Link>

      <div className="border border-gray-200 rounded-lg p-6 my-4 bg-white">
        <h2 className="mb-4 text-blue-700">{post.title}</h2>

        <p className="text-gray-600">{post.body}</p>

        <button
          onClick={() => toggleFavorite(post.id)}
          className={`bg-transparent border-none cursor-pointer text-base ${
            isFavorite ? "text-red-600" : "text-gray-400"
          }`}
        >
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      {/* แสดง comment */}
      <CommentList postId={post.id} />
    </div>
  );
}

export default PostDetailPage;
