import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface Item {
  children: ReactElement;
  loginData?: string;
}
function LayoutProtectedRoute({ loginData, children }: Item) {
  if (!localStorage.getItem("userToken") || loginData) return children;
  else return <Navigate to="/dashboard" />;
}

export default LayoutProtectedRoute;
