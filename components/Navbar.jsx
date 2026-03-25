import { Link } from "react-router-dom";
import { useFavorites } from "../src/context/FavoritesContext";

const Navbar = () => {
  const { favorites } = useFavorites();
  return (
    <nav className="bg-blue-700 text-white py-5 px-10 flex justify-between items-center">
      <div className="flex flex-col items-center">
        <Link to="/">
          <h1 className="text-5xl font-bold text-white">DevBoard</h1>
        </Link>
        <p>กระดานนักพัฒนา</p>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/profile" className="text-lg font-bold text-white">
          สมาชิก
        </Link>
        <Link to="/favorites" className="text-lg font-bold text-white">
          <div className="bg-red-600 rounded-lg py-2 px-5 font-bold border-2 border-white">
            ❤️ {favorites.length} ถูกใจ
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
