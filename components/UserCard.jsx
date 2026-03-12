const UserCard = ({ name, email }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const charCode = name.charCodeAt(0);
  const colorIndex = charCode % 3;

  let avatarColor = "";
  switch (colorIndex) {
    case 0:
      avatarColor = "blue";
      break;
    case 1:
      avatarColor = "green";
      break;
    case 2:
      avatarColor = "purple";
      break;
    default:
      avatarColor = "blue";
  }
  return (
    <div className="flex items-center gap-4 border border-blue-200 rounded-lg p-4 mb-4 bg-white shadow-lg">
      <div
        className={`flex items-center justify-center rounded-full text-white font-bold p-2 ${avatarColor === "blue" ? "bg-blue-500" : avatarColor === "green" ? "bg-green-500" : "bg-purple-500"}`}
      >
        {initials}
      </div>
      <div>
        <div className="font-bold text-gray-800">{name}</div>
        <div className="text-gray-600">{email}</div>
      </div>
    </div>
  );
};

export default UserCard;
