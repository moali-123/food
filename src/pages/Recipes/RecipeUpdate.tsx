import { useNavigate } from 'react-router-dom';
import IMAGES from "@assets/images/images";
import { RecipeUpdateForm } from '@components/index';
import './RecipeData.scss';

const RecipeUpdate = () => {
    const navigate = useNavigate();
    
  return (
    <div id='recipe_data_page'>
        <div className="title_bx">
            <div className="text">
            <h3>Update the <span className="color">Recipes !</span></h3>
            <p>you can now fill the meals easily using the table and form , <br/> click here and sill it with the table !</p>
            </div>

            <button className="add_btn" onClick={()=> navigate('/dashboard/recipes')}>
            Fill Recipes <img src={IMAGES.whiteRightArrow} alt="pic" />
            </button>
        </div>

        <RecipeUpdateForm />
    </div>
  )
}

export default RecipeUpdate