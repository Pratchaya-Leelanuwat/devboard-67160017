import { useEffect, useState } from "react";

// สร้าง custom hook สำหรับการ fetch ข้อมูล (id รับเพื่อให้ useEffect รันใหม่เมื่อ id เปลี่ยนตอนแสดงรายละเอียดโพสต์)
export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const data = await res.json();

      // ถ้ามีโพสต์เยอะก็จะโชว์แค่ 20 โพสต์แรก (ในหน้า HomePage) แต่ถ้าหน้า PostDetailPage จะโชว์แค่โพสต์เดียว
      if (Array.isArray(data)) {
        setData(data.slice(0, 20));
      } else {
        setData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // ใช้ useEffect เพื่อเรียก fetchPosts แค่ครั้งเดียว
  useEffect(() => {
    fetchPosts();
  }, []);
  return { data, error, loading, reload: fetchPosts }; // เพิ่มฟังก์ชัน reload เพื่อให้สามารถเรียก fetch ใหม่ได้จาก component อื่นๆ
};
