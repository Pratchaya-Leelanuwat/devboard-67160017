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
        if (!res.ok) throw new Error("fetch failed");
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
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      <div
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <h2>โพสต์ล่าสุด</h2>
        <PostCount post={posts} />
      </div>
      <input
        type="text"
        placeholder="ค้นหาโพสต์ที่ต้องการ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />
      {sortOrder == "newest" ? (
        <button onClick={toggleSortOrder}> ใหม่สุด</button>
      ) : (
        <button onClick={toggleSortOrder}>เก่าสุด</button>
      )}

      {sortedPosts.length == 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ต้องการ
        </p>
      )}
      {sortedPosts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;
