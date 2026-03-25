import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg">ขออภัย, ไม่พบหน้าที่คุณกำลังมองหา.</p>
      <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
        กลับไปยังหน้าหลัก
      </Link>
    </div>
  );
}

export default NotFoundPage;
