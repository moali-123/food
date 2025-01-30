import {
  PageBanner,
  RecipeContentSection,
  RecipeTitleSection,
} from "@components/index";
import IMAGES from "@assets/images/images";
import { useTranslation } from "react-i18next";
import "./Recipes.scss";

const Recipes = () => {
  const { t } = useTranslation();

  return (
    <div id="recipe_page">
      <PageBanner
        main_title={t('recipes')}
        sub_title={t('items')}
        banner_text={t('pages_welcome_text')}
        img_path={IMAGES.usersBanner}
      />

      <RecipeTitleSection />
      <RecipeContentSection />
    </div>
  );
};

export default Recipes;
