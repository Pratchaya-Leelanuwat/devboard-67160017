import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";

const PostList = ({ favorites, onToggleFavorite }) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSortOrder = () => {
    setSortOrder((order) => (order === "oldest" ? "newest" : "oldest"));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
        const data = await res.json();
        setPosts(data.slice(0, 20));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  const sortedPosts = [...filtered].sort((a, b) => {
    if (sortOrder === "oldest") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="p-5 bg-white border border-red-300 rounded-lg color-red-500">
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between my-3">
        <h2 className="text-lg font-bold text-blue-600">โพสต์ล่าสุด</h2>
        <PostCount post={posts} />
      </div>
      <input
        type="text"
        placeholder="ค้นหาโพสต์ที่ต้องการ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-gray-700 border p-1 border-blue-600 flex items-center gap-3 my-2"
      />
      <div className="flex items-center gap-2 text-lg font-bold text-green-500">
        <p>โพสต์เรียงตาม: </p>
        {sortOrder == "newest" ? (
          <button
            onClick={toggleSortOrder}
            className="bg-blue-500! text-white px-3 py-1 rounded-lg hover:brightness-120"
          >
            ใหม่สุด
          </button>
        ) : (
          <button
            onClick={toggleSortOrder}
            className="bg-blue-500! text-white px-3 py-1 rounded-lg hover:brightness-120"
          >
            เก่าสุด
          </button>
        )}
      </div>

      {sortedPosts.length == 0 && (
        <p className="text-gray-400 text-center p-8">ไม่พบโพสต์ที่ต้องการ</p>
      )}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;
