import AddPostForm from "../../components/AddPostForm";
import PostList from "../../components/PostList";

function HomePage() {
  return (
    <div className="max-w-3xl my-8 mx-auto px-4">
      <AddPostForm onAddPost={() => {}} />
      <PostList />
    </div>
  );
}

export default HomePage;
