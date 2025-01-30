import i18n from "i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout/BaseLayout";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyAccount from "./pages/Auth/VerifyAccount";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home/Home";
import Users from "./pages/Users/Users";
import Recipes from "./pages/Recipes/Recipes";
import { RecipeData, RecipeUpdate } from "@components/index";
import Categories from "./pages/Categories/Categories";
import Favorites from "./pages/Favorites/Favorites";
import ProtectedRoute from "@components/shared/ProtectedRoute/ProtectedRoute";
import LayoutProtectedRoute from "@components/shared/ProtectedRoute/LayoutProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  document.documentElement.lang = i18n.language;
  
  

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutProtectedRoute>
          <AuthLayout />
        </LayoutProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "forget-pass", element: <ForgetPassword /> },
        { path: "reset-pass", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <BaseLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "users", element: <Users /> },
        { path: "recipes", element: <Recipes /> },
        { path: "recipes-data", element: <RecipeData /> },
        { path: "recipe-update/:id", element: <RecipeUpdate /> },
        { path: "categories", element: <Categories /> },
        { path: "favorites", element: <Favorites /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};

export default App;
