import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../context/AppContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, location, setLocation } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.post("http://localhost:3000/check_auth", {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
    }
  };

  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.get("http://localhost:3000/logout", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(false);
          navigate("");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-md bg-[#dae9f5] p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a className="text-2xl font-medium text-blue-700 sm:text-3xl" href="/">
            SkyMate
          </a>
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar location={location} setLocation={setLocation} navigate={navigate} />
            <LoginButton isLoggedIn={isLoggedIn} handleLoginLogout={handleLoginLogout} />
            {isLoggedIn && <ProfileIcon navigate={navigate} />}
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <SearchBar location={location} setLocation={setLocation} navigate={navigate} />
          <div className="mt-4 flex flex-col items-center space-y-4">
            <LoginButton isLoggedIn={isLoggedIn} handleLoginLogout={handleLoginLogout} />
            {isLoggedIn && <ProfileIcon navigate={navigate} />}
          </div>
        </div>
      )}
    </nav>
  );
}

const SearchBar = ({ location, setLocation, navigate }) => (
  <form className="flex items-center">
    <input
      type="text"
      placeholder="Enter location"
      className="text-center p-2 rounded-xl w-full md:w-auto"
      onChange={(e) => setLocation(e.target.value)}
      value={location}
    />
    <button
      type="button"
      onClick={() => navigate(`/weather?location=${location}`)}
      className="bg-white p-2 ml-3 hover:bg-[#FFF0DA]"
    >
      Search
    </button>
  </form>
);

const LoginButton = ({ isLoggedIn, handleLoginLogout }) => (
  <button
    className="bg-white px-4 py-2 rounded-xl hover:bg-[#FFF0DA]"
    onClick={handleLoginLogout}
  >
    {isLoggedIn ? "Logout" : "Login"}
  </button>
);

const ProfileIcon = ({ navigate }) => (
  <div
    className="rounded-full h-10 w-10 bg-yellow-200 cursor-pointer overflow-hidden"
    onClick={() => navigate("/profile")}
  >
    <img src="/profile.jpg" alt="Profile" className="h-full w-full object-cover" />
  </div>
);