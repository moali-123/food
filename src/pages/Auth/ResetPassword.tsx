import { Link } from "react-router-dom";
import FormCart from "./FormCart";
import { useTranslation } from "react-i18next";
import { ResetPasswordForm } from "@components/index";
import "./Auth.scss";

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormCart
        bx_width="small_bx"
        bx_title={t("reset_password")}
        title_text={t("reset_password_text")}
        content={
          <div>
            <ResetPasswordForm />

            <Link className="back_btn" to='/login'>{t('back_to_login')}</Link>
          </div>
        }
      />
    </>
  );
};

export default ResetPassword;
