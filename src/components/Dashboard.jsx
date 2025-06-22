import { Link, useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { alertConfirmLogin } from "../lib/alert";

export default function Dashboard() {
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleClick(path) {
    if (!token) {
      const confirm = await alertConfirmLogin("You must be logged in to access contacts. Login now?");
      if (!confirm) return;
      navigate("/login");
    } else {
      navigate(path);
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to Contact Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div onClick={() => handleClick("/dashboard/contacts")} className="cursor-pointer bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in px-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg  transition-all duration-200">
              <div className="flex  items-center ">
                <div className="w-23 h-20 bg-gradient rounded-lg flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i className="fas fa-address-book text-3xl mr-0 text-gradient" />
                </div>
                <div className="flex flex-col justify-start ml-4">
                  <h2 className="text-xl font-semibold text-white mb-3">Manage Contacts</h2>
                  <p className="text-gray-300">View, search, and delete your saved contacts.</p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => handleClick("/dashboard/users/profile")} className="cursor-pointer bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in px-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg  transition-all duration-200">
              <div className="flex  items-center ">
                <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i className="fas fa-user text-3xl mr-0 text-gradient" />
                </div>
                <div className="flex flex-col ml-4">
                  <h2 className="text-xl font-semibold text-white mb-3">Your Profile</h2>
                  <p className="text-gray-300">View or update your account profile.</p>
                </div>
              </div>
            </div>
          </div>
          <div onClick={() => handleClick("/dashboard/contacts")} className="cursor-pointer bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in px-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg  transition-all duration-200">
              <div className="flex  items-center ">
                <div className="w-23 h-20 bg-gradient rounded-lg flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i className="fas fa-address-book text-3xl mr-0 text-gradient" />
                </div>
                <div className="flex flex-col ml-4">
                  <h2 className="text-xl font-semibold text-white mb-3">Manage Contacts Addresses</h2>
                  <p className="text-gray-300">View, search, and delete your saved addresses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
