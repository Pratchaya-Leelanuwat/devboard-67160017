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
  const { data, loading, error, reload } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleAddPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: Date.now(),
    };

    setPosts((prev) => [postWithId, ...prev]);
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
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage posts={posts} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
