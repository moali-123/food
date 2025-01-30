import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RecipeTitleSection = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  return (
    <div className="title_bx">
      <div className="text">
        <h3>{t('recipe_table_details')}</h3>
        <p>{t('user_table_subtitle')}</p>
      </div>

      <button 
      onClick={() => {
        navigate('/dashboard/recipes-data'); 
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="add_btn">{t('add_new_recipe')}</button>
    </div>
  )
}

export default RecipeTitleSection