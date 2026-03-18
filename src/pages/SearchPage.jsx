import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import PostCard from "../../components/PostCard";

// แสดงหน้า search คือการพิมพ์ url ใน website แล้วจะแสดงหน้านี้
function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // ใช้ useFetch ดึงข้อมูลโพสต์ แทนที่จากเดิมที่ fetch เอง
  const { data } = useFetch("https://jsonplaceholder.typicode.com/posts");
  const filteredPosts = data.filter((post) =>
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
