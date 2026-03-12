const PostCount = ({ post }) => {
  return (
    <p className="text-red-400 font-bold text-lg">({post.length} รายการ)</p>
  );
};
export default PostCount;
