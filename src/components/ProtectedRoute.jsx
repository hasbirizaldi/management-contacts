import { useLocalStorage } from "react-use";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const [token] = useLocalStorage("token", "");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
