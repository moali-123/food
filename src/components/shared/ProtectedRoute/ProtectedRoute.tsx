import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Item {
  children: ReactElement;
  loginData?: string;
}
function ProtectedRoute({ loginData, children }: Item) {
  if (localStorage.getItem("userToken") || loginData) return children;
  else return <Navigate to="/login" />;
}

export default ProtectedRoute;
