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
  const [page, setPage] = useState(1);

  const setPostsInOnePage = (posts) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return posts.slice(start, end);
  };

  const toggleSortOrder = () => {
    setSortOrder((order) => (order === "oldest" ? "newest" : "oldest"));
  };

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
  useEffect(() => {
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
  const allPosts = setPostsInOnePage(sortedPosts);
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
        <button className="bg-yellow-400! text-white" onClick={fetchPosts}>
          รีโหลดโพสต์ใหม่
        </button>
      </div>

      {allPosts.length == 0 && (
        <p className="text-gray-400 text-center p-8">ไม่พบโพสต์ที่ต้องการ</p>
      )}
      {allPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
      <div className="my-5 flex items-center justify-center">
        <button
          className="bg-red-500! text-white px-3 py-1 rounded-lg hover:brightness-120 active:brightness-80"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ก่อนหน้า
        </button>
        <span className="mx-2">หน้า {page}</span>
        <button
          className="bg-blue-500! text-white px-3 py-1 rounded-lg hover:brightness-120 active:brightness-80"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === Math.ceil(sortedPosts.length / 10)}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default PostList;
