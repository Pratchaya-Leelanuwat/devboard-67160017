import { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const PostsContext = createContext();

export function PostsProvider({ children }) {
  const { data, loading, error, reload } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleAddPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
    };

    setPosts((prev) => [...prev, newPost]);
  };

  return (
    <PostsContext.Provider
      value={{ posts, loading, error, reload, handleAddPost }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
