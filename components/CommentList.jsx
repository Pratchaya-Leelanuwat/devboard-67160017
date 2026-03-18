import React, { useEffect, useState } from "react";
import { useFetch } from "../src/hooks/useFetch";

export const CommentList = ({ postId }) => {
  // ใช้ useFetch ดึงข้อมูล comment ของแต่ละโพสต์ แทนที่จากเดิมที่ fetch เอง
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    postId,
  );
  console.log(data);
  if (loading) return <p className="text-gray-500">กำลังโหลดความคิดเห็น...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <strong className="text-red-500">ความคิดเห็น ({data.length})</strong>
      {data.map((comment) => (
        <div
          key={comment.id}
          className="border-2 border-blue-500 rounded-lg p-3 mt-5"
        >
          <div className="text-blue-500 font-bold">{comment.name}</div>
          <div className="text-gray-700 leading-relaxed m-0">
            {comment.body}
          </div>
        </div>
      ))}
    </div>
  );
};
