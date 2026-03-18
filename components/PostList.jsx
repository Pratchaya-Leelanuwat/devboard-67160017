import { useState } from "react";
import PostCard from "./PostCard";
import PostCount from "./PostCount";
import LoadingSpinner from "./LoadingSpinner";
import { useFetch } from "../src/hooks/useFetch";
import PostSkeleton from "./PostSkeleton";

const PostList = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [page, setPage] = useState(1);

  const { data, loading, error, reload } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  //เอาไว้แสดงผลข้อมูล skeleton ตอนที่ไม่มีข้อมูล
  const skeletonPosts = [1, 2, 3];

  const setPostsInOnePage = (data) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return data.slice(start, end);
  };

  const toggleSortOrder = () => {
    setSortOrder((order) => (order === "oldest" ? "newest" : "oldest"));
  };

  const filtered = data.filter((post) =>
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
  if (loading)
    return (
      <div>
        <LoadingSpinner />

        {skeletonPosts.map((skeleton) => (
          <PostSkeleton key={skeleton} />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="p-5 bg-white border border-red-500 rounded-lg color-red-500">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  return (
    <div>
      <div className="flex items-center justify-between my-5">
        <h2 className="text-2xl font-bold text-blue-600">โพสต์ล่าสุด</h2>
        <PostCount post={data} />
      </div>
      <input
        type="text"
        placeholder="ค้นหาโพสต์ที่ต้องการ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-gray-700 border p-2 border-blue-600 flex items-center gap-3 mt-2 mb-4 focus:outline-none focus:border-green-500"
      />
      <div className="flex items-center gap-2 text-xl font-bold text-green-500">
        <p>โพสต์เรียงตาม: </p>
        {sortOrder == "newest" ? (
          <button
            onClick={toggleSortOrder}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:brightness-120 active:brightness-80 cursor-pointer text-lg"
          >
            ใหม่สุด
          </button>
        ) : (
          <button
            onClick={toggleSortOrder}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:brightness-120 active:brightness-80 cursor-pointer text-lg"
          >
            เก่าสุด
          </button>
        )}
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:brightness-110 active:brightness-80 cursor-pointer text-lg"
          onClick={reload}
        >
          รีโหลดโพสต์ใหม่
        </button>
      </div>

      {allPosts.length == 0 && (
        <p className="text-gray-400 text-center p-8">ไม่พบโพสต์ที่ต้องการ</p>
      )}
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
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
