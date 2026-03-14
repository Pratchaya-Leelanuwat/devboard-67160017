import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";
import PostSkeleton from "../components/PostSkeleton";
import UserList from "../components/UserList";

const INITIAL_POSTS = [
  {
    id: 1,
    title: "React คืออะไร?",
    body: "React เป็น library สำหรับสร้าง UI ที่ทำให้ code อ่านง่ายและดูแลรักษาได้",
  },
  {
    id: 2,
    title: "ทำไมต้องใช้ Components?",
    body: "Components ช่วยให้เราแบ่ง UI ออกเป็นชิ้นเล็ก ๆ ที่ reuse ได้",
  },
  {
    id: 3,
    title: "JSX คืออะไร?",
    body: "JSX คือ syntax ที่ช่วยให้เราเขียน HTML ใน JavaScript ได้อย่างสะดวก",
  },
  {
    id: 4,
    title: "Props ทำงานอย่างไร?",
    body: "Props คือ argument ที่ส่งให้ component เหมือนกับการส่งพารามิเตอร์ให้ฟังก์ชัน",
  },
];
const skeletonPosts = [1, 2, 3];

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [favorites, setFavorites] = useState(() => {
    const favoriteFromStorage = localStorage.getItem("favorites");
    return favoriteFromStorage ? JSON.parse(favoriteFromStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (postId) => {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  const handleAddPost = ({ title, body }) => {
    const newPost = {
      id: Date.now(),
      title,
      body,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <>
      <Navbar favoriteCount={favorites.length} />
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-5 mt-10">
        <div>
          <AddPostForm onAddPost={handleAddPost} />
          {posts.length === 0 ? (
            skeletonPosts.map((skeleton) => <PostSkeleton key={skeleton} />)
          ) : (
            <PostList
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>

        <div>
          <UserList />
        </div>
      </div>
    </>
  );
}
