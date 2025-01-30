import { useTranslation } from "react-i18next";

const UsersTitleSection = () => {
  const { t } = useTranslation();

  return (
    <div className="title_bx">
      <div className="text">
        <h3>{t('users_table_details')}</h3>
        <p>{t('user_table_subtitle')}</p>
      </div>
    </div>
  )
}

export default UsersTitleSection