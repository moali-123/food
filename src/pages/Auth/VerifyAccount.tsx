import FormCart from "./FormCart";
import { useTranslation } from "react-i18next";
import VerifyForm from "@components/pages/Auth/VerifyForm/VerifyForm";
import "./Auth.scss";

const VerifyAccount = () => {
  const { t } = useTranslation();

  return (
    <>
      <FormCart
        bx_width="small_bx"
        bx_title={t("Verify Account")}
        title_text={t("login_text")}
        content={
          <div>
            <VerifyForm />
          </div>
        }
      />
    </>
  );
};

export default VerifyAccount;
