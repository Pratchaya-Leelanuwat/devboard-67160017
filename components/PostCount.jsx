// นับจำนวนโพสต์ทั้งหมดที่แสดงในหน้าแรก
const PostCount = ({ post }) => {
  return (
    <p className="text-red-400 font-bold text-2xl">({post.length} รายการ)</p>
  );
};
export default PostCount;
