import { useNavigate } from 'react-router-dom';
import IMAGES from "@assets/images/images";
import { RecipeDataForm } from '@components/index';
import { useTranslation } from "react-i18next";
import './RecipeData.scss';

const RecipeData = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
  return (
    <div id='recipe_data_page'>
        <div className="title_bx">
            <div className="text">
            <h3>{t('fill_the')} <span className="color">{t('recipes')} !</span></h3>
            <p>{t('add_recipe_subtext1')} <br /> {t('add_recipe_subtext2')}</p>
            </div>

            <button className="add_btn" onClick={()=> navigate('/dashboard/recipes')}>
            {t('fill_recipes')} <img src={IMAGES.whiteRightArrow} alt="pic" />
            </button>
        </div>

        <RecipeDataForm />
    </div>
  )
}

export default RecipeData