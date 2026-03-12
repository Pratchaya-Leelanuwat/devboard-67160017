const Navbar = ({ favoriteCount }) => {
  return (
    <nav className="bg-blue-700 text-white py-5 px-10 flex justify-between items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-lg font-bold">DevBoard</h1>
        <p>กระดานนักพัฒนา</p>
      </div>

      {favoriteCount > 0 && (
        <div className="bg-red-600 rounded-lg py-2 px-5 font-bold border-2 border-white">
          ❤️ {favoriteCount} ถูกใจ
        </div>
      )}
    </nav>
  );
};

export default Navbar;
