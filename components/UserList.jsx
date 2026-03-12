import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-blue-800 text-xl font-bold text-center border border-b-4 p-2 mb-2">
        รายชื่อสมาชิก
      </h2>
      {users.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
};

export default UserList;
