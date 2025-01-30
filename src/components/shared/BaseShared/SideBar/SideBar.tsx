import { Layout, Menu } from "antd";
import IMAGES from "@assets/images/images";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/AuthContext";
import { showLoader, hideLoader } from "src/redux/loaderSlice";
import "./SideBar.scss";
import { useDispatch } from "react-redux";

const { Sider } = Layout;

interface SideBarProps {
  collapsed?: boolean;
}

const SideBar = ({ collapsed }: SideBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);
  const { loginData } = useContext(AuthContext);

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
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  function handleClick(e: any) {
    // Consider using proper typing here
    setCurrent(e.key);
  }

  const logout = () => {
    //fireLoader();
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div id="sideBar">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2,
        }}
        breakpoint="lg"
        trigger={null}
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <div className="logo_bx">
          <img src={IMAGES.logoIcon} alt="pic" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
          items={[
            {
              key: "/dashboard",
              icon: <img src={IMAGES.homeIcon} alt="pic" />,
              label: <Link 
              to="/dashboard" 
              onClick={() => {
                fireLoader();
                window.scroll({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              >
                {t('home')}
              </Link>,
            },
            loginData?.userGroup == "SuperAdmin"
              ? {
                  key: "/dashboard/users",
                  icon: <img src={IMAGES.usersIcon} alt="pic" />,
                  label: <Link 
                  to="/dashboard/users" 
                  onClick={() => {
                    fireLoader();
                    window.scroll({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  >
                    {t('users')}
                  </Link>,
                }
              : null,
              {
                key: "/dashboard/recipes",
                icon: <img src={IMAGES.recipesIcon} alt="pic" />,
                label: (
                  <Link 
                    to="/dashboard/recipes" 
                    onClick={() => {
                      fireLoader();
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    {t('recipes')}
                  </Link>
                ),
              },
            loginData?.userGroup == "SuperAdmin"
              ? {
                  key: "/dashboard/categories",
                  icon: <img src={IMAGES.categoriesIcon} alt="pic" />,
                  label: <Link 
                  to="/dashboard/categories" 
                  onClick={() => {
                    fireLoader();
                    window.scroll({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  >
                    {t('categories')}
                  </Link>,
                }
              : null,
            loginData?.userGroup !== "SuperAdmin"
              ? {
                  key: "/dashboard/favorites",
                  icon: <img src={IMAGES.favoritesIcon} alt="pic" />,
                  label: <Link 
                  to="/dashboard/favorites" 
                  onClick={() => {
                    fireLoader();
                    window.scroll({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  >
                    {t('favorites')}
                  </Link>,
                }
              : null,
            {
              key: "/logout", // Ensure key is unique
              icon: <img src={IMAGES.logoutIcon} alt="pic" />,
              label: <div onClick={logout}>{t('logout')}</div>,
            },
          ]}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
