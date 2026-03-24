import "./App.css";
import Navbar from "../components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import { useFetch } from "./hooks/useFetch";
import { useEffect, useState } from "react";

export default function App() {
  // ใช้ useFetch ดึงข้อมูลโพสต์ทั้งหมดเพื่อที่จะให้ทุก component เข้าถึงได้เลย
  const { data, loading, error, reload } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleAddPost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
    };

    setPosts((prev) => [post, ...prev]);
  };
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                posts={posts}
                loading={loading}
                error={error}
                reload={reload}
                onAddPost={handleAddPost}
              />
            }
          />
          <Route path="/posts/:id" element={<PostDetailPage posts={posts} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage posts={posts} />} />
          <Route path="/search" element={<SearchPage posts={posts} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
