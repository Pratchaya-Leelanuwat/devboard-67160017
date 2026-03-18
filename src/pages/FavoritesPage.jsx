import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

// หน้ากดหัวใจ
function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (favorites.length === 0) return;

    // fetch api ดึงโพสต์ที่กดถูกใจไว้
    async function fetchFavoritePosts() {
      const results = await Promise.all(
        favorites.map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );
      setPosts(results);
    }
    fetchFavoritePosts();
  }, [favorites]);

  if (favorites.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-8 px-4 text-center">
        <p className="text-gray-500 text-lg">ยังไม่มีโพสต์ที่ถูกใจ</p>
        <Link to="/" className="text-blue-700">
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <h2 className="text-gray-800 border-b-2 border-red-600 pb-2">
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>

      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-200 rounded-lg p-4 mb-4 bg-white"
        >
          <h3 className="mb-2 text-blue-700">
            <Link
              to={`/posts/${post.id}`}
              className="text-inherit no-underline"
            >
              {post.title}
            </Link>
          </h3>

          <p className="mb-3 text-gray-600">{post.body}</p>

          <button
            onClick={() => toggleFavorite(post.id)}
            className="bg-transparent border-none cursor-pointer text-red-600 text-sm"
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
