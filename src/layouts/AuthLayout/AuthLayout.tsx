import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import { Outlet } from "react-router-dom";
import MainLoader from "../../components/shared/Loaders/MainLoader";
import { LanguageSwitch } from "@components/index";
import "./AuthLayout.scss";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const fireLoader = () => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 800);
  };

  useEffect(() => {
    fireLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/login':
        document.title = 'Login Page';
        break;
      case '/register':
        document.title = 'Register Page';
        break;
        case '/forget-pass':
        document.title = 'Forget Password Page';
        break;
        case '/reset-pass':
        document.title = 'Reset Password Page';
        break;
        case '/verify-account':
        document.title = 'Verify Account Page';
        break;
      default:
        document.title = 'Food App';
    }
  }, [location.pathname]);

  return (
    <>
      <MainLoader />
      <div
        id="auth_container"
        className="flex items-center justify-center flex-col"
      >
        <LanguageSwitch />
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
