import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import UserCard from "./UserCard";
import { useFetch } from "../src/hooks/useFetch";

const UserList = () => {
  // ใช้ useFetch ดึงข้อมูลสมาชิก แทนที่จากเดิมที่ fetch เอง
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
  );

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-5 bg-white border border-red-300 rounded-lg color-red-500">
        เกิดข้อผิดพลาด: {error}
      </div>
    );
  return (
    <div>
      <h2 className="text-blue-800 text-xl font-bold text-center border border-b-4 p-2 mb-2">
        รายชื่อสมาชิก
      </h2>
      {data.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
};

export default UserList;
