import FormCart from "./FormCart";
import { useTranslation } from "react-i18next";
import { RegisterForm } from '@components/index';
import { Link } from "react-router-dom";
import './Auth.scss';

const Register = () => {
  const { t } = useTranslation();

  return (
    <>
    <FormCart
        bx_width="big_bx"
        bx_title={t("register")}
        title_text={t("register_welcome")}
        content={
            <div >
                <RegisterForm />

                <Link className="back_btn" to='/login'>{t('back_to_login')}</Link>
            </div>
        }
      />
    </>
  )
}

export default Register