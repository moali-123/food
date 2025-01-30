import { PageBanner, HomeContent } from "@components/index";
import { useTranslation } from "react-i18next";
import IMAGES from "@assets/images/images";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext"; 
import Lottie from "lottie-react";
import user from './../../assets/json/user2.json';
import "./Home.scss";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  return (
    <div id="home_page">
      <PageBanner
        main_title={t('welcome')}
        sub_title={ loginData?.userName }
        banner_text={t('welcome_text')}
        //img_path={IMAGES.homeBanner}
        json_img={(
          <div className="w-[250px]">
            <Lottie animationData={user} loop={true} />
          </div>
        )}
      />

      <HomeContent />

      <div className="title_bx">
        <div className="text">
          <h3>{t('fill_the')} <span className="color">{t('recipes')} !</span></h3>
          <p>{t('fill_text_1')} <br/> {t('fill_text_2')}</p>
        </div>

        <button className="add_btn" onClick={()=> navigate('/dashboard/recipes')}>
          {t('fill_recipes')} <img src={IMAGES.whiteRightArrow} alt="pic" />
        </button>
      </div>

    </div>
  );
};

export default Home;
