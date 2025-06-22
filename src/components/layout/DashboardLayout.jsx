import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DashboardLayout() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-24 flex-grow">
          <Outlet />
          <Footer />
        </main>
      </div>
    </>
  );
}
