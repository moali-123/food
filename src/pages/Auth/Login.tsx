import FormCart from "./FormCart";
import { LoginForm } from "@components/index";
import { useTranslation } from "react-i18next";
import "./Auth.scss";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";

interface LoginProps {
  saveLoginData: (data: string) => void; 
}

const Login: React.FC<LoginProps> = () => {
  const { t } = useTranslation();
  const { saveLoginData } = useContext(AuthContext);

  return (
    <>
      <FormCart
        bx_width="small_bx"
        bx_title={t("login")}
        title_text={t("login_text")}
        content={
            <div >
                <LoginForm saveLoginData={saveLoginData} />
            </div>
        }
      />
    </>
  );
};

export default Login;
