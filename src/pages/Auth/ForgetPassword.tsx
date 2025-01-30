import { Link } from "react-router-dom";
import FormCart from "./FormCart";
import { useTranslation } from "react-i18next";
import { ForgetPasswordForm } from "@components/index";
import "./Auth.scss";

const ForgetPassword = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormCart
        bx_width="small_bx"
        bx_title={t("forgot_password")}
        title_text={t("forgot_password_text")}
        content={
          <div>
            <ForgetPasswordForm />

            <Link className="back_btn" to='/login'>{t('back_to_login')}</Link>
          </div>
        }
      />
    </>
  );
};

export default ForgetPassword;
