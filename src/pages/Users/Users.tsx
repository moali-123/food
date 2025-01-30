import {
  PageBanner,
  UsersContentSection,
  UsersTitleSection,
} from "@components/index";
import IMAGES from "@assets/images/images";
import { useTranslation } from "react-i18next";
import "./Users.scss";

const Users = () => {
  const { t } = useTranslation();
  return (
    <div id="users_page">
      <PageBanner
        main_title={t('users')}
        sub_title={t('list')}
        banner_text={t('pages_welcome_text')}
        img_path={IMAGES.usersBanner}
      />

      <UsersTitleSection />
      <UsersContentSection />
    </div>
  );
};

export default Users;
