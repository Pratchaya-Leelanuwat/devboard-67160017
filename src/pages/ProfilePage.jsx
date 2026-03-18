import UserList from "../../components/UserList";

// แสดงหน้าสมาชิก
function ProfilePage() {
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      <UserList />
    </div>
  );
}
export default ProfilePage;
