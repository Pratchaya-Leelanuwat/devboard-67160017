import { useSearchParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { usePosts } from "../context/PostsContext";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { posts } = usePosts();
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLocaleLowerCase()),
  );

  return (
    <div className="max-w-3xl mx-auto my-5">
      <h1 className="text-center text-2xl my-5">ผลการค้นหาสำหรับ "{query}"</h1>
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>ไม่พบโพสต์ที่ตรงกับคำค้นหา</p>
      )}
    </div>
  );
}
export default SearchPage;
