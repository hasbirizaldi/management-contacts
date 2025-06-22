import { Link, NavLink } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userDetail, userLogout } from "../../lib/api/UserApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Navbar() {
  const [name, setname] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function getUser() {
    const response = await userDetail(token);
    const responseBody = await response.json();
    // console.log(responseBody);

    if (response.status === 200) {
      setname(responseBody.data.name);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleLogout() {
    const confirm = await alertConfirm("Are you sure you want to logout?");
    if (!confirm) return;

    try {
      const response = await userLogout(token);
      const responseBody = await response.json();
      if (response.status === 200) {
        setToken("");
        navigate("/login");
        await alertSuccess("You are logged out");
      } else {
        await alertError(responseBody.errors || "Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      await alertError("Logout error: " + error.message);
    }
  }

  useEffectOnce(() => {
    if (token) getUser();
  }, [token]);

  return (
    <header className="fixed z-50 w-full bg-gradient-to-r from-blue-800 to-indigo-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity duration-200">
          <i className="fas fa-address-book text-white text-2xl mr-2" />
          <span className="text-white font-bold text-xl">Contact Management</span>
        </Link>

        {/* Hamburger (Mobile) */}
        <button className="text-white text-4xl md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i
            className={`
              fas ${isMenuOpen ? "fa-times" : "fa-bars"}
              transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-9 ml-auto">
          {token && (
            <>
              <NavLink to="/dashboard/contacts" className="aktif text-gray-100 hover:text-white flex items-center">
                <i className="fas fa-address-book mr-1" />
                <span className="text-md font-semibold">My Contacts</span>
              </NavLink>
              <NavLink to="/dashboard/users/profile" className="aktif text-gray-100 hover:text-white flex items-center">
                <i className="fas fa-user-circle mr-1" />
                <span className="text-md font-semibold">{name}</span>
              </NavLink>
            </>
          )}
          {token ? (
            <button onClick={handleLogout} className="cursor-pointer text-gray-100 hover:text-white flex items-center">
              <i className="fas fa-sign-out-alt mr-2" />
              <span className="text-md font-semibold">Logout</span>
            </button>
          ) : (
            <Link to="/login" className="cursor-pointer text-gray-100 hover:text-white flex items-center">
              <i className="fas fa-sign-in-alt mr-2" />
              <span className="text-md font-semibold">Login</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          transition-all duration-800 ease-in-out
          ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <div className=" pb-22 pt-12 flex flex-col items-start  space-y-8 bg-gray-900 p-6 rounded-b-lg mb-2 mx-2">
          {token && (
            <>
              <NavLink to="/dashboard/contacts" onClick={() => setIsMenuOpen(false)} className="mobile aktif text-gray-100 hover:text-white flex items-center text-xl">
                <i className="fas fa-address-book mr-2" />
                My Contacts
              </NavLink>
              <NavLink to="/dashboard/users/profile" onClick={() => setIsMenuOpen(false)} className="mobile aktif text-gray-100 hover:text-white flex items-center text-xl">
                <i className="fas fa-user-circle mr-2" />
                Profile
              </NavLink>
            </>
          )}
          {token ? (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="text-gray-100 hover:text-white flex items-center text-xl"
            >
              <i className="fas fa-sign-out-alt mr-2" />
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-100 hover:text-white flex items-center text-xl">
              <i className="fas fa-sign-in-alt mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
