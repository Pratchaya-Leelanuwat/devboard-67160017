import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";

const PostList = ({ posts, favorites, onToggleFavorite }) => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");

  const toggleSortOrder = () => {
    setSortOrder((order) => (order === "oldest" ? "newest" : "oldest"));
  };
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
