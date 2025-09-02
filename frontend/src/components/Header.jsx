import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">Oralvis Healthcare</h1>
      <nav className="space-x-4">
        {!token ? (
          <>
            <Link
              to="/"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/technician">Technician</Link>
            <Link to="/dentist">Dentist</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded ml-4"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
