import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import UserRegister from "./components/user/UserRegister.jsx";
import "./main.css";
import LoginUser from "./components/user/LoginUser.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import ContactCreate from "./components/contact/ContactCreate.jsx";
import Layout from "./components/layout/Layout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import ContactList from "./components/contact/ContactList.jsx";
import ContactEdit from "./components/contact/ContactEdit.jsx";
import ContactDetail from "./components/contact/ContactDetail.jsx";
import AddressCreate from "./components/addresses/AddressCreate.jsx";
import AddrressEdit from "./components/addresses/AddressEdit.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicDashboardLayout from "./components/layout/PublicDashboardLayout.jsx";
import Dashboard from "./components/Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicDashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<LoginUser />} />
        </Route>
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="contacts">
            <Route index element={<ContactList />} />
            <Route path="create" element={<ContactCreate />} />
            <Route path=":id">
              <Route index element={<ContactDetail />} />
              <Route path="edit" element={<ContactEdit />} />
              <Route path="addresses">
                <Route path="create" element={<AddressCreate />} />
                <Route path=":addressId/edit" element={<AddrressEdit />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
