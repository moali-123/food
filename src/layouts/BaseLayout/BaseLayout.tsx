import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MainLoader from "../../components/shared/Loaders/MainLoader";
import { LayoutHeader, SideBar } from "@components/index";
const { Content, Footer } = Layout;
import "./BaseLayout.scss";

const BaseLayout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setCollapsed(true);
    } else if (windowWidth < 1200) {
      setCollapsed(false);
    } else {
      setCollapsed(false);
    }
  }, [windowWidth]);

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        document.title = "Home Page";
        break;
      case "/dashboard/home":
        document.title = "Home Page";
        break;
      case "/dashboard/users":
        document.title = "Users Page";
        break;
      case "/dashboard/recipes":
        document.title = "Recipes Page";
        break;
      case "/dashboard/categories":
        document.title = "Categories Page";
        break;
      default:
        document.title = "Food App";
    }
  }, [location.pathname]);

  return (
    <>
      <MainLoader />

      <Layout id="user_layout" className={collapsed ? "closed_bar" : "open_bar"}>
        <SideBar collapsed={collapsed} />

        <Layout>
          <LayoutHeader
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer className="footer_bx">Design ©2024</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default BaseLayout;
