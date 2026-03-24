import AddPostForm from "../../components/AddPostForm";
import PostList from "../../components/PostList";

// หน้าหลักิเมื่อเปิดเว็บไซต์
function HomePage({ posts, onAddPost, loading, error, reload }) {
  return (
    <div className="max-w-3xl my-8 mx-auto px-4">
      <AddPostForm onAddPost={onAddPost} />
      <PostList posts={posts} loading={loading} error={error} reload={reload} />
    </div>
  );
}

export default HomePage;
