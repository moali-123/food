import {
  PageBanner,
  FavoriteContentSection,
  FavoriteTitleSection,
} from "@components/index";
import IMAGES from "@assets/images/images";
import { useTranslation } from "react-i18next";
import "./Favorites.scss";

const Favorites = () => {
  const { t } = useTranslation();

  return (
    <div id="favorite_page">
      <div className="mb-[30px]">
        <PageBanner
          main_title={t('favorite')}
          sub_title={t('items')}
          banner_text={t('pages_welcome_text')}
          img_path={IMAGES.usersBanner}
        />
      </div>

      <FavoriteTitleSection />
      <FavoriteContentSection />
    </div>
  );
};

export default Favorites;
